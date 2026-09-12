from config.database import get_db_connection
from src.models.note import NoteCreate, NoteResponse
from typing import List

def create_note(note: NoteCreate) -> NoteResponse:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO notes (title, content, category, tags) VALUES (?, ?, ?, ?)",
        (note.title, note.content, note.category, note.tags)
    )
    conn.commit()
    note_id = cursor.lastrowid
    
    cursor.execute("SELECT created_at FROM notes WHERE id = ?", (note_id,))
    created_at = cursor.fetchone()[0]
    conn.close()
    
    return NoteResponse(
        id=note_id, 
        title=note.title, 
        content=note.content, 
        category=note.category, 
        tags=note.tags, 
        created_at=str(created_at)
    )

def get_all_notes() -> List[NoteResponse]:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, content, category, tags, created_at FROM notes ORDER BY id DESC")
    rows = cursor.fetchall()
    conn.close()
    
    return [
        NoteResponse(
            id=r[0], 
            title=r[1], 
            content=r[2], 
            category=r[3], 
            tags=r[4] or "", 
            created_at=str(r[5])
        ) for r in rows
    ]

def delete_note(note_id: int) -> bool:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM notes WHERE id = ?", (note_id,))
    conn.commit()
    affected = cursor.rowcount
    conn.close()
    return affected > 0