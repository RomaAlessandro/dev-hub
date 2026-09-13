# 🛠️ Developer Hub

Un'applicazione Full-Stack per la gestione di **Code Snippet** e **Note Tecniche**, sviluppata con FastAPI (Python) per il backend e React (Vite) per il frontend.

---

## 🚀 Tecnologie Utilizzate

* **Backend:** FastAPI, Python 3.12+, SQLite3, Pydantic, Uvicorn, HTTPX
* **Frontend:** React, Vite, JavaScript (ES6+), PrismJS, CSS3
* **Tools & Environment:** Git, Fish Shell, Linux (CachyOS)

---

## 📌 Funzionalità Principali

* 📝 **Snippet Manager:** Salvataggio, modifica, ricerca per titolo/tag e copia rapida del codice negli appunti.
* 🎨 **Syntax Highlighting:** Evidenziazione automatica del codice in base al linguaggio tramite PrismJS.
* 🐙 **GitHub Gist Export:** Esportazione diretta dei tuoi snippet di codice su GitHub Gist via API REST.
* 🔑 **Gestione Autenticazione:** Configurazione del Personal Access Token di GitHub direttamente da UI o tramite file `.env`.
* 📚 **Note Tecniche:** Organizzazione e consultazione rapida di appunti e concetti di sviluppo.
* 💾 **Database SQLite:** Persistenza dei dati locale con tabelle relazionali isolate.

---

## ⚙️ Configurazione ed Esecuzione Locale

### 1. Backend (FastAPI)

```fish
cd backend
python -m venv venv
source venv/bin/activate.fish   # Su Bash/Zsh usa: source venv/bin/activate
pip install -r requirements.txt # Oppure: pip install fastapi uvicorn httpx pydantic
./venv/bin/uvicorn src.main:app --reload --port 8001
