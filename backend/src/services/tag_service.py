from config.database import get_db_connection
from typing import List

def get_or_create_tags(cursor, tags_input: str) -> List[int]:
    """Riceve una stringa di tag separati da virgola e restituisce gli ID dei tag nel DB."""
    if not tags_input:
        return []
    
    tag_names = list(set([t.strip().lower() for t in tags_input.split(",") if t.strip()]))
    tag_ids = []

    for name in tag_names:
        cursor.execute("INSERT OR IGNORE INTO tags (name) VALUES (?)", (name,))
        cursor.execute("SELECT id FROM tags WHERE name = ? COLLATE NOCASE", (name,))
        tag_ids.append(cursor.fetchone()[0])
        
    return tag_ids

def get_tags_for_entity(cursor, table_name: str, entity_id_col: str, entity_id: int) -> str:
    """Recupera tutti i tag associati a una nota o uno snippet come stringa separata da virgole."""
    query = f'''
        SELECT t.name FROM tags t
        JOIN {table_name} et ON t.id = et.tag_id
        WHERE et.{entity_id_col} = ?
    '''
    cursor.execute(query, (entity_id,))
    rows = cursor.fetchall()
    return ", ".join([r[0] for r in rows])