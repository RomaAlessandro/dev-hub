from fastapi import APIRouter, HTTPException
from typing import List
from src.models.note import NoteCreate, NoteResponse
from src.services import note_service

router = APIRouter(prefix="/notes", tags=["Notes"])

@router.post("/", response_model=NoteResponse)
def create_note(note: NoteCreate):
    return note_service.create_note(note)

@router.get("/", response_model=List[NoteResponse])
def get_notes():
    return note_service.get_all_notes()

@router.delete("/{note_id}")
def delete_note(note_id: int):
    if not note_service.delete_note(note_id):
        raise HTTPException(status_code=404, detail="Nota non trovata")
    return {"message": "Nota eliminata"}