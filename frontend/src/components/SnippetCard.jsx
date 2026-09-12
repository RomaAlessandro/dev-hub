import React, { useState } from "react";
import { TagPill } from "./TagPill";

export function SnippetCard({ snippet, onDelete, onUpdate, onTagClick }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(snippet.title);
  const [language, setLanguage] = useState(snippet.language);
  const [description, setDescription] = useState(snippet.description || "");
  const [tags, setTags] = useState(snippet.tags || "");
  const [code, setCode] = useState(snippet.code);

  const handleSave = async () => {
    await onUpdate(snippet.id, { title, language, description, tags, code });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div style={{ backgroundColor: "#2d2d2d", padding: "16px", borderRadius: "8px", marginBottom: "16px", border: "1px solid #007acc" }}>
        <h4>✏️ Modifica Snippet</h4>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} placeholder="Titolo" />
        <input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} style={inputStyle} placeholder="Linguaggio" />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} style={inputStyle} placeholder="Descrizione" />
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} style={inputStyle} placeholder="Tag" />
        <textarea rows="4" value={code} onChange={(e) => setCode(e.target.value)} style={{ ...inputStyle, fontFamily: "monospace" }} />
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button onClick={handleSave} style={{ backgroundColor: "#28a745", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>💾 Salva</button>
          <button onClick={() => setIsEditing(false)} style={{ backgroundColor: "#6c757d", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>Annulla</button>
        </div>
      </div>
    );
  }

  const tagsArray = snippet.tags ? snippet.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];

  return (
    <div style={{ backgroundColor: "#1e1e1e", padding: "16px", borderRadius: "8px", marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0 }}>{snippet.title}</h3>
        <span style={{ backgroundColor: "#007acc", padding: "2px 8px", borderRadius: "4px", fontSize: "0.8rem", color: "#fff" }}>{snippet.language}</span>
      </div>

      {snippet.description && <p style={{ color: "#aaa", fontSize: "0.9rem" }}>{snippet.description}</p>}

      {tagsArray.length > 0 && (
        <div style={{ display: "flex", gap: "6px", margin: "8px 0" }}>
          {tagsArray.map((tag) => (
            <TagPill key={tag} tag={tag} onClick={onTagClick} />
          ))}
        </div>
      )}

      <pre style={{ backgroundColor: "#111", padding: "12px", borderRadius: "4px", color: "#80d4ff", overflowX: "auto" }}>
        <code>{snippet.code}</code>
      </pre>

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => setIsEditing(true)} style={{ backgroundColor: "#ffc107", color: "#000", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>✏️ Modifica</button>
        <button onClick={() => onDelete(snippet.id)} style={{ backgroundColor: "#dc3545", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>🗑️ Elimina</button>
      </div>
    </div>
  );
}

const inputStyle = { width: "100%", padding: "8px", marginBottom: "8px", borderRadius: "4px", border: "1px solid #444", backgroundColor: "#1e1e1e", color: "#fff", boxSizing: "border-box" };