import React, { useState } from "react";
import { TagPill } from "./TagPill";

export function NoteCard({ note, onDelete, onUpdate, onTagClick }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [category, setCategory] = useState(note.category || "");
  const [content, setContent] = useState(note.content);
  const [tags, setTags] = useState(note.tags || "");

  const handleSave = async () => {
    await onUpdate(note.id, { title, category, content, tags });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div style={{ backgroundColor: "#2d2d2d", padding: "16px", borderRadius: "8px", marginBottom: "16px", border: "1px solid #007acc" }}>
        <h4>✏️ Modifica Nota</h4>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} placeholder="Titolo" />
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle} placeholder="Categoria" />
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} style={inputStyle} placeholder="Tag" />
        <textarea rows="4" value={content} onChange={(e) => setContent(e.target.value)} style={inputStyle} placeholder="Contenuto..." />
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button onClick={handleSave} style={{ backgroundColor: "#28a745", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>💾 Salva</button>
          <button onClick={() => setIsEditing(false)} style={{ backgroundColor: "#6c757d", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>Annulla</button>
        </div>
      </div>
    );
  }

  const tagsArray = note.tags ? note.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];

  return (
    <div style={{ backgroundColor: "#1e1e1e", padding: "16px", borderRadius: "8px", marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0 }}>{note.title}</h3>
        {note.category && <span style={{ backgroundColor: "#6c757d", padding: "2px 8px", borderRadius: "4px", fontSize: "0.8rem", color: "#fff" }}>{note.category}</span>}
      </div>

      <p style={{ color: "#ddd", whiteSpace: "pre-wrap", margin: "12px 0" }}>{note.content}</p>

      {tagsArray.length > 0 && (
        <div style={{ display: "flex", gap: "6px", margin: "8px 0" }}>
          {tagsArray.map((tag) => (
            <TagPill key={tag} tag={tag} onClick={onTagClick} />
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
        <button onClick={() => setIsEditing(true)} style={{ backgroundColor: "#ffc107", color: "#000", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>✏️ Modifica</button>
        <button onClick={() => onDelete(note.id)} style={{ backgroundColor: "#dc3545", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>🗑️ Elimina</button>
      </div>
    </div>
  );
}

const inputStyle = { width: "100%", padding: "8px", marginBottom: "8px", borderRadius: "4px", border: "1px solid #444", backgroundColor: "#1e1e1e", color: "#fff", boxSizing: "border-box" };