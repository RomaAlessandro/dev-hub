import React from "react";

export function NoteCard({ note, onDelete }) {
  return (
    <div style={{ backgroundColor: "#1e1e1e", padding: "16px", borderRadius: "8px", marginBottom: "12px", borderLeft: "4px solid #007acc" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0 }}>{note.title}</h3>
        <span style={{ fontSize: "0.8rem", backgroundColor: "#333", padding: "4px 8px", borderRadius: "4px" }}>{note.category}</span>
      </div>
      <p style={{ whiteSpace: "pre-wrap", color: "#ccc", margin: "12px 0" }}>{note.content}</p>
      <button onClick={() => onDelete(note.id)} style={{ backgroundColor: "#d9534f", color: "#fff", border: "none", padding: "4px 8px", borderRadius: "4px", cursor: "pointer" }}>🗑️ Elimina</button>
    </div>
  );
}