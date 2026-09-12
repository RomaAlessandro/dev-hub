from config.database import get_db_connection
from src.models.snippet import SnippetCreate, SnippetUpdate
from src.services.tag_service import get_or_create_tags, get_tags_for_entity

def create_snippet(snippet: SnippetCreate):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute(
        "INSERT INTO snippets (title, language, code, description) VALUES (?, ?, ?, ?)",
        (snippet.title, snippet.language, snippet.code, snippet.description)
    )
    snippet_id = cursor.lastrowid

    # Gestione Tag Many-to-Many
    tag_ids = get_or_create_tags(cursor, snippet.tags)
    for tag_id in tag_ids:
        cursor.execute("INSERT OR IGNORE INTO snippet_tags (snippet_id, tag_id) VALUES (?, ?)", (snippet_id, tag_id))

    conn.commit()

    cursor.execute("SELECT id, title, language, code, description, created_at FROM snippets WHERE id = ?", (snippet_id,))
    row = dict(cursor.fetchone())
    row["tags"] = get_tags_for_entity(cursor, "snippet_tags", "snippet_id", snippet_id)
    
    conn.close()
    return row

def get_all_snippets():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, language, code, description, created_at FROM snippets ORDER BY id DESC")
    rows = [dict(r) for r in cursor.fetchall()]

    for snippet in rows:
        snippet["tags"] = get_tags_for_entity(cursor, "snippet_tags", "snippet_id", snippet["id"])

    conn.close()
    return rows

def delete_snippet(snippet_id: int) -> bool:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM snippet_tags WHERE snippet_id = ?", (snippet_id,))
    cursor.execute("DELETE FROM snippets WHERE id = ?", (snippet_id,))
    conn.commit()
    affected = cursor.rowcount
    conn.close()
    return affected > 0

def update_snippet(snippet_id: int, snippet: SnippetUpdate):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "UPDATE snippets SET title = ?, language = ?, code = ?, description = ? WHERE id = ?",
        (snippet.title, snippet.language, snippet.code, snippet.description, snippet_id)
    )

    # Rimuovi i vecchi legami con i tag e reinserisci i nuovi
    cursor.execute("DELETE FROM snippet_tags WHERE snippet_id = ?", (snippet_id,))
    tag_ids = get_or_create_tags(cursor, snippet.tags)
    for tag_id in tag_ids:
        cursor.execute("INSERT OR IGNORE INTO snippet_tags (snippet_id, tag_id) VALUES (?, ?)", (snippet_id, tag_id))

    conn.commit()
    conn.close()

    return get_all_snippets() # Restituisce i dati aggiornati