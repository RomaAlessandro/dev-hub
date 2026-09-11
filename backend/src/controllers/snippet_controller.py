from fastapi import APIRouter, HTTPException
from typing import List
from src.models.snippet import SnippetCreate, SnippetResponse
from src.services import snippet_service

router = APIRouter(prefix="/snippets", tags=["Snippets"])

@router.post("/", response_model=SnippetResponse)
def create_new_snippet(snippet: SnippetCreate):
    return snippet_service.create_snippet(snippet)

@router.get("/", response_model=List[SnippetResponse])
def fetch_all_snippets():
    return snippet_service.get_all_snippets()

@router.delete("/{snippet_id}")
def delete_snippet(snippet_id: int):
    success = snippet_service.delete_snippet(snippet_id)
    if not success:
        raise HTTPException(status_code=404, detail="Snippet non trovato")
    return {"message": "Snippet eliminato con successo"}