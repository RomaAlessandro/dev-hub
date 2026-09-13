import React, { useState } from "react";

const COMMON_LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "bash",
  "html",
  "css",
  "sql",
  "java",
  "json",
  "php",
  "csharp",
  "cpp"
];

export function SnippetForm({ onSnippetAdded }) {
  // Stato per mostrare/nascondere il form
  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [customLanguage, setCustomLanguage] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !code) return alert("Titolo e codice sono obbligatori!");

    const finalLanguage =
      selectedLanguage === "custom"
        ? customLanguage.trim().toLowerCase()
        : selectedLanguage;

    if (!finalLanguage) return alert("Inserisci un linguaggio valido!");

    await onSnippetAdded({
      title,
      language: finalLanguage,
      code,
      description,
      tags
    });

    // Reset dei campi e chiusura form
    setTitle("");
    setCode("");
    setDescription("");
    setTags("");
    setSelectedLanguage("javascript");
    setCustomLanguage("");
    setIsOpen(false);
  };

  return (
    <div style={{ marginBottom: "24px" }}>
      {/* Tasto principale per aprire/chiudere */}
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
        {isOpen ? "✖ Chiudi Form" : "➕ Aggiungi Nuovo Snippet"}
      </button>

      {/* Form mostrato solo se isOpen è true */}
      {isOpen && (
        <form onSubmit={handleSubmit} style={{ ...styles.form, marginTop: "16px" }}>
          <h3 style={{ marginTop: 0 }}>➕ Nuovo Snippet</h3>

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
            <div style={{ display: "flex", gap: "10px" }}>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                style={{ ...styles.input, flex: 1 }}
              >
                {COMMON_LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
                <option value="custom">✏️ Altro / Personalizzato...</option>
              </select>

              {selectedLanguage === "custom" && (
                <input
                  type="text"
                  value={customLanguage}
                  onChange={(e) => setCustomLanguage(e.target.value)}
                  placeholder="Es. rust, go, dockerfile"
                  style={{ ...styles.input, flex: 1 }}
                  autoFocus
                />
              )}
            </div>
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

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button type="submit" style={styles.btn}>
              Salva Snippet
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{ ...styles.btn, backgroundColor: "#444" }}
            >
              Annulla
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

const styles = {
  form: {
    backgroundColor: "#252526",
    color: "#fff",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #007acc",
    boxShadow: "0 4px 6px rgba(0,0,0,0.3)"
  },
  field: { marginBottom: "12px", display: "flex", flexDirection: "column", gap: "6px" },
  input: { padding: "8px", borderRadius: "4px", border: "1px solid #444", backgroundColor: "#1e1e1e", color: "#fff" },
  textarea: { padding: "8px", borderRadius: "4px", border: "1px solid #444", backgroundColor: "#1e1e1e", color: "#80d4ff", fontFamily: "monospace" },
  btn: { backgroundColor: "#28a745", color: "#fff", border: "none", padding: "10px 16px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }
};