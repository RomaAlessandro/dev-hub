from pydantic import BaseModel
from typing import Optional

class NoteCreate(BaseModel):
    title: str
    content: str
    category: Optional[str] = "Generale"

class NoteResponse(NoteCreate):
    id: int
    created_at: str