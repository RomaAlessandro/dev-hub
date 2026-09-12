from config.database import get_db_connection
from src.models.note import NoteCreate, NoteResponse, NoteUpdate
from src.services.tag_service import get_or_create_tags, get_tags_for_entity
from typing import List

def create_note(note: NoteCreate) -> NoteResponse:
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute(
        "INSERT INTO notes (title, content, category) VALUES (?, ?, ?)",
        (note.title, note.content, note.category)
    )
    note_id = cursor.lastrowid

    # Gestione Tag Many-to-Many
    tag_ids = get_or_create_tags(cursor, note.tags)
    for tag_id in tag_ids:
        cursor.execute("INSERT OR IGNORE INTO note_tags (note_id, tag_id) VALUES (?, ?)", (note_id, tag_id))

    conn.commit()

    cursor.execute("SELECT created_at FROM notes WHERE id = ?", (note_id,))
    created_at = cursor.fetchone()[0]
    
    tags_str = get_tags_for_entity(cursor, "note_tags", "note_id", note_id)
    conn.close()

    return NoteResponse(
        id=note_id,
        title=note.title,
        content=note.content,
        category=note.category,
        tags=tags_str,
        created_at=str(created_at)
    )

def get_all_notes() -> List[NoteResponse]:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, content, category, created_at FROM notes ORDER BY id DESC")
    rows = cursor.fetchall()

    result = []
    for r in rows:
        tags_str = get_tags_for_entity(cursor, "note_tags", "note_id", r[0])
        result.append(NoteResponse(
            id=r[0],
            title=r[1],
            content=r[2],
            category=r[3],
            tags=tags_str,
            created_at=str(r[4])
        ))

    conn.close()
    return result

def delete_note(note_id: int) -> bool:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM note_tags WHERE note_id = ?", (note_id,))
    cursor.execute("DELETE FROM notes WHERE id = ?", (note_id,))
    conn.commit()
    affected = cursor.rowcount
    conn.close()
    return affected > 0

def update_note(note_id: int, note: NoteUpdate):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "UPDATE notes SET title = ?, content = ?, category = ? WHERE id = ?",
        (note.title, note.content, note.category, note_id)
    )

    # Rimuovi vecchi tag e reinserisci
    cursor.execute("DELETE FROM note_tags WHERE note_id = ?", (note_id,))
    tag_ids = get_or_create_tags(cursor, note.tags)
    for tag_id in tag_ids:
        cursor.execute("INSERT OR IGNORE INTO note_tags (note_id, tag_id) VALUES (?, ?)", (note_id, tag_id))

    conn.commit()
    conn.close()

    return get_all_notes()