import React, { useState } from "react";

export function NoteForm({ onNoteAdded }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Titolo e contenuto sono obbligatori!");
    await onNoteAdded({ title, content, category });
    setTitle("");
    setContent("");
    setCategory("");
    setIsOpen(false);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: isOpen ? "#6c757d" : "#007acc",
          color: "#fff",
          border: "none",
          padding: "10px 18px",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "0.95rem",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}
      >
        {isOpen ? "✖ Chiudi Form" : "📝 Aggiungi Nuova Nota"}
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} style={{ ...styles.form, marginTop: "16px" }}>
          <h3 style={{ marginTop: 0 }}>📝 Aggiungi Nuova Nota</h3>
          <input type="text" placeholder="Titolo della nota" value={title} onChange={(e) => setTitle(e.target.value)} style={styles.input} />
          <input type="text" placeholder="Categoria (es. Linux, Database, Architettura)" value={category} onChange={(e) => setCategory(e.target.value)} style={styles.input} />
          <textarea rows="4" placeholder="Contenuto della nota..." value={content} onChange={(e) => setContent(e.target.value)} style={styles.textarea} />
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" style={styles.btn}>Salva Nota</button>
            <button type="button" onClick={() => setIsOpen(false)} style={{ ...styles.btn, backgroundColor: "#444" }}>Annulla</button>
          </div>
        </form>
      )}
    </div>
  );
}

const styles = {
  form: { backgroundColor: "#252526", padding: "20px", borderRadius: "8px", border: "1px solid #007acc", display: "flex", flexDirection: "column", gap: "10px" },
  input: { padding: "8px", borderRadius: "4px", border: "1px solid #444", backgroundColor: "#1e1e1e", color: "#fff" },
  textarea: { padding: "8px", borderRadius: "4px", border: "1px solid #444", backgroundColor: "#1e1e1e", color: "#fff", fontFamily: "sans-serif" },
  btn: { backgroundColor: "#007acc", color: "#fff", border: "none", padding: "10px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }
};