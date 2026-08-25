import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Text, DateTime, ForeignKey, Table, JSON, Float
from sqlalchemy.orm import relationship
from pgvector.sqlalchemy import Vector
from .database import Base

# Junction table for Papers & Authors
paper_authors = Table(
    'paper_authors',
    Base.metadata,
    Column('paper_id', String(36), ForeignKey('papers.id', ondelete='CASCADE'), primary_key=True),
    Column('author_id', String(36), ForeignKey('authors.id', ondelete='CASCADE'), primary_key=True)
)

class User(Base):
    __tablename__ = 'users'

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String(255), unique=True, nullable=False, index=True)
    username = Column(String(100), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    papers = relationship("Paper", back_populates="creator")
    comparisons = relationship("Comparison", back_populates="creator")

class Author(Base):
    __tablename__ = 'authors'

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(255), nullable=False, index=True)
    orcid = Column(String(100), nullable=True)
    affiliation = Column(String(255), nullable=True)

    papers = relationship("Paper", secondary=paper_authors, back_populates="authors")

class Paper(Base):
    __tablename__ = 'papers'

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(512), nullable=False, index=True)
    abstract = Column(Text, nullable=True)
    doi = Column(String(100), unique=True, nullable=True)
    arxiv_id = Column(String(100), unique=True, nullable=True)
    year = Column(Integer, nullable=True, index=True)
    venue = Column(String(255), nullable=True, index=True)
    pdf_url = Column(String(512), nullable=True)
    vector = Column(Vector(384), nullable=True) # pgvector column for semantic abstract similarity
    created_by_id = Column(String(36), ForeignKey('users.id'), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    creator = relationship("User", back_populates="papers")
    authors = relationship("Author", secondary=paper_authors, back_populates="papers")
    properties = relationship("Property", back_populates="paper", cascade="all, delete-orphan")
    citations_from = relationship("Citation", foreign_keys="[Citation.citing_paper_id]", back_populates="citing_paper")
    citations_to = relationship("Citation", foreign_keys="[Citation.cited_paper_id]", back_populates="cited_paper")

class Property(Base):
    __tablename__ = 'properties'

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    paper_id = Column(String(36), ForeignKey('papers.id', ondelete='CASCADE'), nullable=False)
    key = Column(String(255), nullable=False, index=True) # e.g. "Method", "Dataset", "Accuracy", "Parameters"
    value = Column(Text, nullable=False)

    paper = relationship("Paper", back_populates="properties")

class Comparison(Base):
    __tablename__ = 'comparisons'

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(512), nullable=False)
    description = Column(Text, nullable=True)
    property_keys = Column(JSON, nullable=False) # Array of string keys
    paper_ids = Column(JSON, nullable=False) # Array of paper UUIDs
    created_by_id = Column(String(36), ForeignKey('users.id'), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    creator = relationship("User", back_populates="comparisons")

class Citation(Base):
    __tablename__ = 'citations'

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    citing_paper_id = Column(String(36), ForeignKey('papers.id', ondelete='CASCADE'), nullable=False)
    cited_paper_id = Column(String(36), ForeignKey('papers.id', ondelete='CASCADE'), nullable=False)

    citing_paper = relationship("Paper", foreign_keys=[citing_paper_id], back_populates="citations_from")
    cited_paper = relationship("Paper", foreign_keys=[cited_paper_id], back_populates="citations_to")
