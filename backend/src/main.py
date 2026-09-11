from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.controllers.note_controller import router as note_router
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from config.database import init_db
from src.controllers.snippet_controller import router as snippet_router

app = FastAPI(
    title="Developer Hub API",
    description="API per la gestione personale di snippet, note e utility",
    version="1.0.0"
)

# Abilitiamo CORS per permettere al frontend di chiamare le API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In sviluppo permettiamo le chiamate da qualsiasi origine
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(snippet_router)
app.include_router(note_router)

@app.get("/")
def read_root():
    return {"message": "Developer Hub API è attiva e funzionante!"}