# 🛠️ Developer Hub

Un'applicazione Full-Stack per la gestione di **Code Snippet** e **Note Tecniche**, sviluppata con FastAPI (Python) per il backend e React (Vite) per il frontend.

---

## 🚀 Tecnologie Utilizzate

* **Backend**: FastAPI, Python 3.12+, SQLite3, Pydantic, Uvicorn
* **Frontend**: React, Vite, JavaScript (ES6+), CSS3
* **Tools**: Git, Fish Shell

---

## ⚙️ Configurazione ed Esecuzione Locale

### 1. Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Su Fish shell: source venv/bin/activate.fish
pip install fastapi uvicorn
./venv/bin/uvicorn src.main:app --reload --port 8001

Il backend sarà disponibile su http://127.0.0.1:8001.

2. Frontend (React + Vite)
cd frontend
npm install
npm run dev

Il frontend sarà disponibile su http://localhost:5173.
📌 Funzionalità

    Snippet Manager: Salvataggio, consultazione, filtraggio e copia rapida negli appunti di blocchi di codice.

    Note Tecniche: Organizzazione per categoria e consultazione rapida di appunti di sviluppo.

    Database SQLite: Persistenza locale con tabelle relazionali isolate.