from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from ..database import get_db
from ..models import Comparison, Paper, Property, User
from ..schemas import ComparisonCreate, ComparisonOut
from ..auth import get_optional_user

router = APIRouter(prefix="/api/comparisons", tags=["comparisons"])

@router.post("/", response_model=ComparisonOut, status_code=status.HTTP_201_CREATED)
def create_comparison(
    comp_in: ComparisonCreate, 
    db: Session = Depends(get_db), 
    user: Optional[User] = Depends(get_optional_user)
):
    """
    3. POST /api/comparisons/ - Create comparisons by selecting papers and specific property keys.
    """
    if not comp_in.paper_ids:
        raise HTTPException(status_code=400, detail="At least one paper ID is required for a comparison")

    comparison = Comparison(
        title=comp_in.title,
        description=comp_in.description,
        property_keys=comp_in.property_keys,
        paper_ids=comp_in.paper_ids,
        created_by_id=user.id if user else None
    )

    db.add(comparison)
    db.commit()
    db.refresh(comparison)

    # Fetch referenced papers for response
    papers = db.query(Paper).filter(Paper.id.in_(comp_in.paper_ids)).all()
    comparison_dict = ComparisonOut.from_orm(comparison)
    comparison_dict.papers = papers
    return comparison_dict

@router.get("/", response_model=List[ComparisonOut])
def list_comparisons(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    comparisons = db.query(Comparison).order_by(Comparison.created_at.desc()).offset(skip).limit(limit).all()
    result = []
    for c in comparisons:
        comp_out = ComparisonOut.from_orm(c)
        if c.paper_ids:
            comp_out.papers = db.query(Paper).filter(Paper.id.in_(c.paper_ids)).all()
        result.append(comp_out)
    return result

@router.get("/{comparison_id}", response_model=ComparisonOut)
def get_comparison(comparison_id: str, db: Session = Depends(get_db)):
    comparison = db.query(Comparison).filter(Comparison.id == comparison_id).first()
    if not comparison:
        raise HTTPException(status_code=404, detail="Comparison not found")
    
    comp_out = ComparisonOut.from_orm(comparison)
    if comparison.paper_ids:
        comp_out.papers = db.query(Paper).filter(Paper.id.in_(comparison.paper_ids)).all()
    return comp_out
