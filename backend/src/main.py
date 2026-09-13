import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from config.database import init_db
from src.controllers import snippet_controller, note_controller, github_controller

load_dotenv()

app = FastAPI(title="Developer Hub API")

init_db()

allowed_origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(snippet_controller.router, prefix="/api", tags=["Snippets"])
app.include_router(note_controller.router, prefix="/api", tags=["Notes"])
app.include_router(github_controller.router, prefix="/api", tags=["GitHub"])

@app.get("/")
def root():
    return {"message": "Developer Hub API in esecuzione"}