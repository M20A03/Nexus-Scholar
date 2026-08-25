from pydantic import BaseModel, EmailStr
from typing import List, Optional, Any, Dict
from datetime import datetime

# Auth Schemas
class UserRegister(BaseModel):
    email: EmailStr
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class UserOut(BaseModel):
    id: str
    email: EmailStr
    username: str
    created_at: datetime

    class Config:
        from_attributes = True

# Author Schema
class AuthorOut(BaseModel):
    id: str
    name: str
    orcid: Optional[str] = None
    affiliation: Optional[str] = None

    class Config:
        from_attributes = True

# Property Schemas
class PropertyCreate(BaseModel):
    key: str
    value: str

class PropertyOut(BaseModel):
    id: str
    key: str
    value: str

    class Config:
        from_attributes = True

# Paper Schemas
class PaperCreate(BaseModel):
    title: str
    abstract: Optional[str] = None
    doi: Optional[str] = None
    arxiv_id: Optional[str] = None
    year: Optional[int] = None
    venue: Optional[str] = None
    pdf_url: Optional[str] = None
    authors: Optional[List[str]] = [] # Names of authors
    properties: Optional[List[PropertyCreate]] = []

class PaperOut(BaseModel):
    id: str
    title: str
    abstract: Optional[str] = None
    doi: Optional[str] = None
    arxiv_id: Optional[str] = None
    year: Optional[int] = None
    venue: Optional[str] = None
    pdf_url: Optional[str] = None
    created_at: datetime
    authors: List[AuthorOut] = []
    properties: List[PropertyOut] = []

    class Config:
        from_attributes = True

# Comparison Schemas
class ComparisonCreate(BaseModel):
    title: str
    description: Optional[str] = None
    property_keys: List[str]
    paper_ids: List[str]

class ComparisonOut(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    property_keys: List[str]
    paper_ids: List[str]
    created_at: datetime
    papers: Optional[List[PaperOut]] = []

    class Config:
        from_attributes = True
