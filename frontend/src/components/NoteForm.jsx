import React, { useState } from "react";

export function NoteForm({ onNoteAdded }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Generale");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Titolo e contenuto sono obbligatori!");
    await onNoteAdded({ title, content, category });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>📝 Aggiungi Nuova Nota</h3>
      <input type="text" placeholder="Titolo della nota" value={title} onChange={(e) => setTitle(e.target.value)} style={styles.input} />
      <input type="text" placeholder="Categoria (es. Linux, Database, Architettura)" value={category} onChange={(e) => setCategory(e.target.value)} style={styles.input} />
      <textarea rows="4" placeholder="Contenuto della nota..." value={content} onChange={(e) => setContent(e.target.value)} style={styles.textarea} />
      <button type="submit" style={styles.btn}>Salva Nota</button>
    </form>
  );
}

const styles = {
  form: { backgroundColor: "#252526", padding: "20px", borderRadius: "8px", marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px" },
  input: { padding: "8px", borderRadius: "4px", border: "1px solid #444", backgroundColor: "#1e1e1e", color: "#fff" },
  textarea: { padding: "8px", borderRadius: "4px", border: "1px solid #444", backgroundColor: "#1e1e1e", color: "#fff", fontFamily: "sans-serif" },
  btn: { backgroundColor: "#007acc", color: "#fff", border: "none", padding: "10px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }
};