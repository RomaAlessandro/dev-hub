from config.database import get_db_connection
from src.models.snippet import SnippetCreate

def create_snippet(snippet: SnippetCreate):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO snippets (title, language, code, description, tags) VALUES (?, ?, ?, ?, ?)",
        (snippet.title, snippet.language, snippet.code, snippet.description, snippet.tags)
    )
    conn.commit()
    snippet_id = cursor.lastrowid
    
    cursor.execute("SELECT id, title, language, code, description, tags, created_at FROM snippets WHERE id = ?", (snippet_id,))
    row = cursor.fetchone()
    conn.close()
    return dict(row)

def get_all_snippets():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, language, code, description, tags, created_at FROM snippets ORDER BY id DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def delete_snippet(snippet_id: int) -> bool:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM snippets WHERE id = ?", (snippet_id,))
    conn.commit()
    rows_affected = cursor.rowcount
    conn.close()
    return rows_affected > 0