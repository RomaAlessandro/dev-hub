import React, { useState } from "react";
import { githubService } from "../services/githubService";

export function GitHubSettings() {
  const [token, setToken] = useState(githubService.getToken());
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    githubService.setToken(token);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClear = () => {
    githubService.clearToken();
    setToken("");
  };

  return (
    <div style={{ backgroundColor: "#1e1e1e", padding: "16px", borderRadius: "8px", border: "1px solid #333", marginTop: "16px" }}>
      <h3 style={{ margin: "0 0 12px 0", color: "#fff" }}>🐙 Configurazione GitHub Gist</h3>
      <p style={{ color: "#aaa", fontSize: "0.85rem", marginBottom: "12px" }}>
        Inserisci un <strong>Personal Access Token (classic)</strong> con permesso <code>gist</code> per consentire l'export/import diretto dei tuoi snippet.
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
          style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #444", backgroundColor: "#111", color: "#fff" }}
        />
        <button onClick={handleSave} style={{ backgroundColor: "#28a745", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer" }}>
          {saved ? "✓ Salvato!" : "Salva Token"}
        </button>
        {token && (
          <button onClick={handleClear} style={{ backgroundColor: "#dc3545", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "4px", cursor: "pointer" }}>
            Rimuovi
          </button>
        )}
      </div>
    </div>
  );
}