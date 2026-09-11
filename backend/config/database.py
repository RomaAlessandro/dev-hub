import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "devhub.db")

def get_db_connection():
    """Crea e restituisce una connessione al database SQLite."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # Permette di accedere alle colonne tramite nome
    return conn

def init_db():
    """Inizializza le tabelle del database se non esistono."""
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            category TEXT DEFAULT 'Generale',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
        
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS snippets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            language TEXT NOT NULL,
            code TEXT NOT NULL,
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
        
    conn.commit()
    conn.close()