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