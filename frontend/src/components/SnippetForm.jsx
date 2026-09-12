import React, { useState } from "react";

export function SnippetForm({ onSnippetAdded }) {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !code) return alert("Titolo e codice sono obbligatori!");

    await onSnippetAdded({ title, language, code, description, tags });

    setTitle("");
    setCode("");
    setDescription("");
    setTags("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3 style={{ marginTop: 0 }}>➕ Aggiungi Nuovo Snippet</h3>
      
      <div style={styles.field}>
        <label>Titolo:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Es. Connessione Database Python"
          style={styles.input}
        />
      </div>

      <div style={styles.field}>
        <label>Linguaggio:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)} style={styles.input}>
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="bash">Bash / Shell</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="sql">SQL</option>
          <option value="java">Java</option>
        </select>
      </div>

      <div style={styles.field}>
        <label>Descrizione (opzionale):</label>
        <input 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Breve spiegazione del codice..."
          style={styles.input}
        />
      </div>

      <div style={styles.field}>
        <label>Tag (separati da virgola):</label>
        <input 
          type="text" 
          value={tags} 
          onChange={(e) => setTags(e.target.value)} 
          placeholder="Es. react, hooks, async"
          style={styles.input}
        />
      </div>

      <div style={styles.field}>
        <label>Codice:</label>
        <textarea 
          rows="5" 
          value={code} 
          onChange={(e) => setCode(e.target.value)} 
          placeholder="Incolla qui il codice..."
          style={styles.textarea}
        />
      </div>

      <button type="submit" style={styles.btn}>Salva Snippet</button>
    </form>
  );
}

const styles = {
  form: {
    backgroundColor: "#252526",
    color: "#fff",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "24px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
  },
  field: { marginBottom: "12px", display: "flex", flexDirection: "column", gap: "6px" },
  input: { padding: "8px", borderRadius: "4px", border: "1px solid #444", backgroundColor: "#1e1e1e", color: "#fff" },
  textarea: { padding: "8px", borderRadius: "4px", border: "1px solid #444", backgroundColor: "#1e1e1e", color: "#80d4ff", fontFamily: "monospace" },
  btn: { backgroundColor: "#28a745", color: "#fff", border: "none", padding: "10px 16px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }
};