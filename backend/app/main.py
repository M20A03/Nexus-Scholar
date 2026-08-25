from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from .database import init_db
from .routers import papers, comparisons, auth

app = FastAPI(
    title="Open Research Knowledge Graph (ORKG) API",
    description="Production-grade API for structured scientific research papers, pgvector similarity search, and AI property extraction.",
    version="1.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router)
app.include_router(papers.router)
app.include_router(comparisons.router)

@app.on_event("startup")
def on_startup():
    try:
        init_db()
    except Exception as e:
        print(f"Startup DB init warning: {e}")

@app.get("/")
def root():
    return {"message": "Open Research Knowledge Graph (ORKG) API operational"}

@app.get("/health")
def health():
    return {"status": "healthy", "service": "ORKG FastAPI Backend", "pgvector": "enabled"}
