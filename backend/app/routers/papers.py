from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import or_, text
from typing import List, Optional
import httpx

from ..database import get_db
from ..models import Paper, Author, Property, User, Citation
from ..schemas import PaperCreate, PaperOut, PropertyCreate
from ..auth import get_optional_user
from ..services.ai import extract_properties_with_groq, generate_mock_embedding

router = APIRouter(prefix="/api/papers", tags=["papers"])

@router.post("/", response_model=PaperOut, status_code=status.HTTP_201_CREATED)
async def create_paper(
    paper_in: PaperCreate, 
    db: Session = Depends(get_db), 
    user: Optional[User] = Depends(get_optional_user)
):
    """
    1. POST /api/papers/ - Add paper. Handles arXiv/DOI fetching if provided,
       runs Groq AI property extraction, generates vector embedding, and saves to DB.
    """
    # If arXiv ID is provided and title/abstract are empty, fetch from arXiv API
    title = paper_in.title
    abstract = paper_in.abstract or ""
    pdf_url = paper_in.pdf_url
    year = paper_in.year
    venue = paper_in.venue

    if paper_in.arxiv_id and (not title or title == "string"):
        try:
            clean_id = paper_in.arxiv_id.strip().replace("https://arxiv.org/abs/", "").replace("https://arxiv.org/pdf/", "").replace(".pdf", "")
            arxiv_url = f"http://export.arxiv.org/api/query?id_list={clean_id}"
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.get(arxiv_url)
                if res.status_code == 200:
                    xml = res.text
                    title_match = xml.split("<title>")
                    summary_match = xml.split("<summary>")
                    if len(title_match) > 2:
                        title = title_match[2].split("</title>")[0].replace("\n", " ").strip()
                    if len(summary_match) > 1:
                        abstract = summary_match[1].split("</summary>")[0].replace("\n", " ").strip()
                    pdf_url = f"https://arxiv.org/pdf/{clean_id}.pdf"
                    venue = venue or "arXiv Preprint"
        except Exception as e:
            print(f"arXiv fetch error: {e}")

    if not title or title == "string":
        title = "Untitled Research Paper"

    # Generate abstract vector embedding (384 dim) for pgvector cosine search
    vector_embedding = generate_mock_embedding(f"{title} {abstract}")

    db_paper = Paper(
        title=title,
        abstract=abstract,
        doi=paper_in.doi,
        arxiv_id=paper_in.arxiv_id,
        year=year or 2024,
        venue=venue or "Open Access Journal",
        pdf_url=pdf_url,
        vector=vector_embedding,
        created_by_id=user.id if user else None
    )

    # Link authors
    if paper_in.authors:
        for author_name in paper_in.authors:
            if author_name and author_name.strip():
                author = db.query(Author).filter(Author.name == author_name.strip()).first()
                if not author:
                    author = Author(name=author_name.strip())
                    db.add(author)
                    db.flush()
                db_paper.authors.append(author)

    db.add(db_paper)
    db.commit()
    db.refresh(db_paper)

    # AI Property Extraction (Groq API or fallback)
    extracted_props = await extract_properties_with_groq(abstract, title)
    
    # Merge manual properties with AI extracted properties
    manual_keys = set()
    if paper_in.properties:
        for p in paper_in.properties:
            manual_keys.add(p.key.lower())
            db_prop = Property(paper_id=db_paper.id, key=p.key, value=p.value)
            db.add(db_prop)

    for ai_p in extracted_props:
        if ai_p["key"].lower() not in manual_keys:
            db_prop = Property(paper_id=db_paper.id, key=ai_p["key"], value=ai_p["value"])
            db.add(db_prop)

    db.commit()
    db.refresh(db_paper)
    return db_paper

@router.get("/", response_model=List[PaperOut])
def list_papers(
    skip: int = 0, 
    limit: int = 20, 
    year: Optional[int] = None,
    venue: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Paper)
    if year:
        query = query.filter(Paper.year == year)
    if venue:
        query = query.filter(Paper.venue.ilike(f"%{venue}%"))
    
    return query.order_by(Paper.created_at.desc()).offset(skip).limit(limit).all()

@router.get("/search", response_model=List[PaperOut])
def search_papers(
    q: str = Query(..., min_length=1),
    year: Optional[int] = None,
    venue: Optional[str] = None,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    """
    2. GET /api/papers/search?q= - Hybrid Search combining Full-Text Keyword
       matching and pgvector cosine distance similarity.
    """
    query_vector = generate_mock_embedding(q)

    try:
        # Cosine distance search using pgvector operator <=>
        results = (
            db.query(Paper)
            .filter(
                or_(
                    Paper.title.ilike(f"%{q}%"),
                    Paper.abstract.ilike(f"%{q}%"),
                    Paper.venue.ilike(f"%{q}%")
                )
            )
            .order_by(Paper.vector.l2_distance(query_vector))
            .limit(limit)
            .all()
        )
        if results:
            return results
    except Exception as e:
        print(f"pgvector query fallback: {e}")

    # Fallback to standard ILIKE search if vector ordering encounters exception
    fallback_query = db.query(Paper).filter(
        or_(
            Paper.title.ilike(f"%{q}%"),
            Paper.abstract.ilike(f"%{q}%")
        )
    )
    if year:
        fallback_query = fallback_query.filter(Paper.year == year)
    if venue:
        fallback_query = fallback_query.filter(Paper.venue.ilike(f"%{venue}%"))
        
    return fallback_query.limit(limit).all()

@router.get("/{paper_id}", response_model=PaperOut)
def get_paper(paper_id: str, db: Session = Depends(get_db)):
    paper = db.query(Paper).filter(Paper.id == paper_id).first()
    if not paper:
        raise HTTPException(status_code=404, detail="Paper not found")
    return paper

@router.get("/{paper_id}/graph")
def get_paper_graph(paper_id: str, db: Session = Depends(get_db)):
    """
    4. GET /api/papers/{id}/graph - Returns nodes and edges representing:
       - Target paper (center node)
       - Co-authors (author nodes)
       - Structured properties (property nodes)
       - Citations / Related papers (paper nodes)
    """
    paper = db.query(Paper).filter(Paper.id == paper_id).first()
    if not paper:
        raise HTTPException(status_code=404, detail="Paper not found")

    nodes = []
    edges = []
    node_set = set()

    # Center Paper Node
    nodes.append({
        "id": paper.id,
        "label": paper.title,
        "type": "paper",
        "details": {"year": paper.year, "venue": paper.venue, "doi": paper.doi}
    })
    node_set.add(paper.id)

    # Co-authors
    for author in paper.authors:
        if author.id not in node_set:
            nodes.append({
                "id": author.id,
                "label": author.name,
                "type": "author",
                "details": {"affiliation": author.affiliation or "Researcher"}
            })
            node_set.add(author.id)
        edges.append({
            "source": author.id,
            "target": paper.id,
            "label": "authored"
        })

    # Properties
    for prop in paper.properties:
        prop_node_id = f"prop-{prop.id}"
        nodes.append({
            "id": prop_node_id,
            "label": f"{prop.key}: {prop.value}",
            "type": "property",
            "details": {"key": prop.key, "value": prop.value}
        })
        edges.append({
            "source": paper.id,
            "target": prop_node_id,
            "label": "has_property"
        })

    # Related Papers with shared properties
    shared_props = (
        db.query(Property)
        .filter(Property.key.in_([p.key for p in paper.properties]))
        .filter(Property.paper_id != paper.id)
        .limit(10)
        .all()
    )

    for sp in shared_props:
        rel_paper = db.query(Paper).filter(Paper.id == sp.paper_id).first()
        if rel_paper and rel_paper.id not in node_set:
            nodes.append({
                "id": rel_paper.id,
                "label": rel_paper.title,
                "type": "related_paper",
                "details": {"year": rel_paper.year, "venue": rel_paper.venue}
            })
            node_set.add(rel_paper.id)
            edges.append({
                "source": paper.id,
                "target": rel_paper.id,
                "label": f"shares_{sp.key.lower()}"
            })

    return {"nodes": nodes, "edges": edges}
