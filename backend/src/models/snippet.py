from pydantic import BaseModel
from typing import Optional

class SnippetCreate(BaseModel):
    title: str
    language: str
    code: str
    description: Optional[str] = None
    tags: Optional[str] = ""

class SnippetResponse(SnippetCreate):
    id: int
    created_at: str