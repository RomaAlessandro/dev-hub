import os
import httpx
from fastapi import APIRouter, HTTPException, status, Header
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/github", tags=["GitHub"])

class GistExportPayload(BaseModel):
    title: str
    code: str
    language: Optional[str] = "text"
    description: Optional[str] = ""
    is_public: Optional[bool] = False

def resolve_token(authorization: Optional[str] = None) -> str:
    if authorization and authorization.startswith("Bearer ") and len(authorization) > 7:
        return authorization.split(" ")[1]
    
    env_token = os.getenv("GITHUB_TOKEN")
    if env_token:
        return env_token

    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Nessun Personal Access Token trovato. Inseriscilo nelle impostazioni del frontend o nel file .env."
    )

@router.post("/export-gist", status_code=status.HTTP_201_CREATED)
@router.post("/export-gist/", status_code=status.HTTP_201_CREATED)
async def export_gist(payload: GistExportPayload, authorization: Optional[str] = Header(None)):
    token = resolve_token(authorization)

    ext_map = {
        "javascript": "js", "typescript": "ts", "python": "py", 
        "bash": "sh", "php": "php", "json": "json", 
        "sql": "sql", "html": "html", "css": "css"
    }
    ext = ext_map.get((payload.language or "").lower(), "txt")
    
    safe_title = "".join(c if c.isalnum() else "_" for c in payload.title.lower())
    filename = f"{safe_title}.{ext}"

    gist_payload = {
        "description": payload.description or payload.title,
        "public": payload.is_public,
        "files": {
            filename: {
                "content": payload.code
            }
        }
    }

    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json",
        "Content-Type": "application/json"
    }

    async with httpx.AsyncClient() as client:
        response = await client.post("https://api.github.com/gists", json=gist_payload, headers=headers)
        
        if response.status_code != 201:
            error_data = response.json()
            raise HTTPException(
                status_code=response.status_code,
                detail=error_data.get("message", "Errore durante la creazione del Gist su GitHub.")
            )

        return response.json()