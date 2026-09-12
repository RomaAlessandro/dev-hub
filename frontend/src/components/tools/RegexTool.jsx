import React, { useState } from "react";

export function RegexTool() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testText, setTestText] = useState("");

  const getMatches = () => {
    if (!pattern) return [];
    try {
      const regex = new RegExp(pattern, flags);
      const matches = [...testText.matchAll(regex)];
      return matches.map((m) => m[0]);
    } catch (e) {
      return null; // Regex non valida
    }
  };

  const matches = getMatches();

  return (
    <div style={toolStyles.container}>
      <h3>🧪 Regex Tester</h3>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Espressione Regolare (es. [a-z]+)"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          style={{ ...toolStyles.input, flex: 1 }}
        />
        <input
          type="text"
          placeholder="Flag (es. g, i)"
          value={flags}
          onChange={(e) => setFlags(e.target.value)}
          style={{ ...toolStyles.input, width: "80px" }}
        />
      </div>

      <textarea
        rows="5"
        placeholder="Inserisci il testo di prova..."
        value={testText}
        onChange={(e) => setTestText(e.target.value)}
        style={toolStyles.textarea}
      />

      <div style={{ marginTop: "15px" }}>
        <h4>Risultati ({matches === null ? "Regex non valida" : matches.length})</h4>
        {matches === null ? (
          <p style={{ color: "#ff6b6b" }}>Sintassi dell'espressione regolare errata.</p>
        ) : matches.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {matches.map((m, index) => (
              <span key={index} style={toolStyles.matchBadge}>{m}</span>
            ))}
          </div>
        ) : (
          <p style={{ color: "#888" }}>Nessuna corrispondenza trovata.</p>
        )}
      </div>
    </div>
  );
}

const toolStyles = {
  container: { backgroundColor: "#1e1e1e", padding: "20px", borderRadius: "8px", marginBottom: "20px" },
  input: { padding: "8px", borderRadius: "4px", border: "1px solid #444", backgroundColor: "#252526", color: "#fff", fontFamily: "monospace" },
  textarea: { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", backgroundColor: "#252526", color: "#fff", fontFamily: "monospace", boxSizing: "border-box" },
  matchBadge: { backgroundColor: "#264f78", color: "#4ec9b0", padding: "4px 8px", borderRadius: "4px", fontFamily: "monospace" }
};