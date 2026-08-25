# Open Research Knowledge Graph (ORKG) Clone - Master Plan

## Executive Overview
This document outlines the architecture, database schema, API design, frontend hierarchy, and deployment strategy for building a production-ready Open Research Knowledge Graph (ORKG) platform clone.

---

## 1. System Architecture
```
                         +-----------------------------------+
                         |    React + Vite + Tailwind CSS    |
                         |        (GitHub Dark Theme)        |
                         +-----------------+-----------------+
                                           |
                                      HTTP / REST
                                           v
                         +-----------------------------------+
                         |          FastAPI Backend          |
                         |      (JWT Auth + CORS + Async)    |
                         +--------+-----------------+--------+
                                  |                 |
                         SQLAlchemy / pgvector   Groq API (Llama 3 70B)
                                  v                 v
                 +------------------+     +-------------------+
                 | PostgreSQL 16 DB |     | AI Structuring &  |
                 |   (+ pgvector)   |     | Abstract Embeddings|
                 +------------------+     +-------------------+
```

---

## 2. Database Schema (PostgreSQL 16 + pgvector)

### Data Models
1. **User**:
   - `id`: UUID (PK)
   - `email`: String (Unique)
   - `username`: String (Unique)
   - `hashed_password`: String
   - `created_at`: DateTime

2. **Author**:
   - `id`: UUID (PK)
   - `name`: String
   - `orcid`: String (Optional)
   - `affiliation`: String (Optional)

3. **Paper**:
   - `id`: UUID (PK)
   - `title`: String
   - `abstract`: Text
   - `doi`: String (Optional, Unique)
   - `arxiv_id`: String (Optional, Unique)
   - `year`: Integer
   - `venue`: String (Optional)
   - `pdf_url`: String (Optional)
   - `vector`: Vector(384) (`pgvector` column for semantic abstract similarity)
   - `created_by_id`: UUID (FK -> User.id)
   - `created_at`: DateTime

4. **PaperAuthorLink** (Junction Table):
   - `paper_id`: UUID (FK -> Paper.id)
   - `author_id`: UUID (FK -> Author.id)

5. **Property** (Key-Value structured statement):
   - `id`: UUID (PK)
   - `paper_id`: UUID (FK -> Paper.id)
   - `key`: String (e.g., "Method", "Dataset", "Accuracy", "Parameters", "Hardware")
   - `value`: String (e.g., "Transformer", "SQuAD v2", "93.2%", "340M", "8x A100 GPUs")

6. **Comparison**:
   - `id`: UUID (PK)
   - `title`: String
   - `description`: Text
   - `property_keys`: JSONB (Array of string property keys compared)
   - `paper_ids`: JSONB (Array of paper UUIDs included)
   - `created_by_id`: UUID (FK -> User.id)
   - `created_at`: DateTime

7. **Citation**:
   - `id`: UUID (PK)
   - `citing_paper_id`: UUID (FK -> Paper.id)
   - `cited_paper_id`: UUID (FK -> Paper.id)

---

## 3. Backend API Endpoints (FastAPI)

### Authentication
- `POST /api/auth/register` - Create user account
- `POST /api/auth/login` - Obtain JWT access token
- `GET /api/auth/me` - Get current user profile

### Papers
- `POST /api/papers/` - Add paper manually or fetch metadata via DOI/arXiv ID (Triggers Groq AI extraction & abstract vector embedding)
- `GET /api/papers/` - List papers with pagination
- `GET /api/papers/{id}` - Get paper details + structured properties
- `GET /api/papers/search` - Hybrid search (Keyword text match + pgvector similarity)
- `GET /api/papers/{id}/graph` - Returns node-edge payload for interactive network visualization (Co-authors, citations, shared properties)

### Comparisons
- `POST /api/comparisons/` - Create a side-by-side comparison matrix for selected papers & property keys
- `GET /api/comparisons/` - List saved research comparisons
- `GET /api/comparisons/{id}` - Fetch single comparison matrix with property evaluation rows

---

## 4. Frontend Component Hierarchy (React + Vite + Tailwind)

```
[App]
 ├── [Navbar] (GitHub Dark Theme, Logo, Search, Navigation Links, Auth Controls)
 ├── [Routes]
 │     ├── [Homepage]
 │     │     ├── [HeroSection] (Search bar & pitch)
 │     │     ├── [TopContributors]
 │     │     └── [RecentUpdatesFeed]
 │     ├── [SearchPage]
 │     │     ├── [FilterSidebar] (Year, venue, field)
 │     │     └── [ResultsTable] (Hybrid search results)
 │     ├── [PaperDetail]
 │     │     ├── [PaperHeader] (Metadata, DOI, PDF link)
 │     │     ├── [PropertyGrid] (Extracted key-value cards)
 │     │     ├── [GraphViewModal] (Interactive network visualization using vis.js/reactflow)
 │     │     └── [CitationList]
 │     ├── [ComparisonBuilder]
 │     │     ├── [PaperSelector]
 │     │     ├── [PropertyPicker]
 │     │     ├── [MatrixTable] (Sortable comparison matrix)
 │     │     └── [RechartsBarChart] (Comparative property visualization)
 │     └── [AuthPages] (Login / Signup)
 └── [Footer]
```

---

## 5. AI Integration & Extraction Strategy
- **Groq AI (Llama 3 70B)**: Call Groq API with prompt parsing paper abstract to extract JSON structured key-value property arrays: `[{"key": "Dataset", "value": "..."}, {"key": "Metric", "value": "..."}]`.
- **Abstract Vector Embeddings**: Generate normalized vector embeddings for paper abstracts to perform cosine similarity queries via `pgvector`.

---

## 6. Deployment & Container Orchestration
- `docker-compose.yml`:
  - `db`: `pgvector/pgvector:pg16` on port `5432`
  - `backend`: FastAPI app running with Uvicorn on port `8000`
  - `frontend`: Vite React app / Nginx on port `5173`
- `seed.py`: Automation script to seed 10+ research papers across AI, Medicine, and Physics with embeddings & properties.
