import React, { useState, useEffect } from "react";
import { TagPill } from "./TagPill";
import { githubService } from "../services/githubService";
import Prism from "prismjs";

// Theme scuro per il codice
import "prismjs/themes/prism-tomorrow.css";

// Import dei linguaggi più comuni
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-python";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-php";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-json";

export function SnippetCard({ snippet, onDelete, onUpdate, onTagClick }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(snippet.title);
  const [language, setLanguage] = useState(snippet.language);
  const [description, setDescription] = useState(snippet.description || "");
  const [tags, setTags] = useState(snippet.tags || "");
  const [code, setCode] = useState(snippet.code);
  
  // Stato per la copia del codice e l'export su Gist
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);

  // Esegue l'highlighting ogni volta che cambia il codice o il linguaggio
  useEffect(() => {
    if (!isEditing) {
      Prism.highlightAll();
    }
  }, [snippet.code, snippet.language, isEditing]);

  const handleSave = async () => {
    await onUpdate(snippet.id, { title, language, description, tags, code });
    setIsEditing(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Errore durante la copia del codice:", err);
    }
  };

  const handleExportGist = async () => {
    setExporting(true);
    try {
      const gistData = await githubService.exportSnippetToGist(snippet, false);
      alert(`Gist creato con successo!\nURL: ${gistData.html_url}`);
    } catch (err) {
      alert(`Errore Export Gist: ${err.message}`);
    } finally {
      setExporting(false);
    }
  };

  if (isEditing) {
    return (
      <div style={{ backgroundColor: "#2d2d2d", padding: "16px", borderRadius: "8px", marginBottom: "16px", border: "1px solid #007acc" }}>
        <h4>✏️ Modifica Snippet</h4>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} placeholder="Titolo" />
        <input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} style={inputStyle} placeholder="Linguaggio" />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} style={inputStyle} placeholder="Descrizione" />
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} style={inputStyle} placeholder="Tag" />
        <textarea rows="6" value={code} onChange={(e) => setCode(e.target.value)} style={{ ...inputStyle, fontFamily: "monospace" }} />
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button onClick={handleSave} style={{ backgroundColor: "#28a745", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>💾 Salva</button>
          <button onClick={() => setIsEditing(false)} style={{ backgroundColor: "#6c757d", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>Annulla</button>
        </div>
      </div>
    );
  }

  const tagsArray = snippet.tags ? snippet.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const normalizedLang = (snippet.language || "javascript").toLowerCase();

  return (
    <div style={{ backgroundColor: "#1e1e1e", padding: "16px", borderRadius: "8px", marginBottom: "16px", border: "1px solid #333" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0, color: "#fff" }}>{snippet.title}</h3>
        <span style={{ backgroundColor: "#007acc", padding: "2px 8px", borderRadius: "4px", fontSize: "0.8rem", color: "#fff" }}>{snippet.language}</span>
      </div>

      {snippet.description && <p style={{ color: "#aaa", fontSize: "0.9rem", margin: "8px 0" }}>{snippet.description}</p>}

      {tagsArray.length > 0 && (
        <div style={{ display: "flex", gap: "6px", margin: "8px 0 12px 0" }}>
          {tagsArray.map((tag) => (
            <TagPill key={tag} tag={tag} onClick={onTagClick} />
          ))}
        </div>
      )}

      {/* Blocco Codice con Syntax Highlighting e Tasto Copia integrato */}
      <div style={{ position: "relative", marginTop: "8px", marginBottom: "12px" }}>
        <button
          onClick={handleCopy}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            backgroundColor: copied ? "#28a745" : "#3a3d41",
            color: "#fff",
            border: "none",
            padding: "4px 10px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px",
            zIndex: 10,
            transition: "background-color 0.2s ease"
          }}
        >
          {copied ? "✓ Copiato!" : "📋 Copia"}
        </button>

        <pre style={{ margin: 0, padding: "12px", borderRadius: "6px", overflowX: "auto" }}>
          <code className={`language-${normalizedLang}`}>
            {snippet.code}
          </code>
        </pre>
      </div>

      {/* Azioni Snippet */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => setIsEditing(true)} style={{ backgroundColor: "#ffc107", color: "#000", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>✏️ Modifica</button>
        <button onClick={() => onDelete(snippet.id)} style={{ backgroundColor: "#dc3545", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>🗑️ Elimina</button>
        <button
          onClick={handleExportGist}
          disabled={exporting}
          style={{ backgroundColor: "#24292e", color: "#fff", border: "1px solid #444", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}
        >
          {exporting ? "Inviando..." : "🐙 Export Gist"}
        </button>
      </div>
    </div>
  );
}

const inputStyle = { width: "100%", padding: "8px", marginBottom: "8px", borderRadius: "4px", border: "1px solid #444", backgroundColor: "#1e1e1e", color: "#fff", boxSizing: "border-box" };