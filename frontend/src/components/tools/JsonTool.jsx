import React, { useState } from "react";

export function JsonTool() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);

  const formatJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const minifyJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={toolStyles.container}>
      <h3>🛠️ JSON Formatter & Validator</h3>
      <textarea
        rows="10"
        placeholder="Incolla il tuo JSON grezzo qui..."
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setError(null);
        }}
        style={toolStyles.textarea}
      />
      {error && <div style={toolStyles.error}>❌ JSON non valido: {error}</div>}
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <button onClick={formatJson} style={toolStyles.btnPrimary}>Formatta (Prettify)</button>
        <button onClick={minifyJson} style={toolStyles.btnSecondary}>Minifica</button>
        <button onClick={() => setInput("")} style={toolStyles.btnDanger}>Pulisci</button>
      </div>
    </div>
  );
}

const toolStyles = {
  container: { backgroundColor: "#1e1e1e", padding: "20px", borderRadius: "8px", marginBottom: "20px" },
  textarea: { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #444", backgroundColor: "#252526", color: "#fff", fontFamily: "monospace", boxSizing: "border-box" },
  error: { color: "#ff6b6b", backgroundColor: "#3a1e1e", padding: "10px", borderRadius: "4px", marginTop: "10px", fontFamily: "monospace", fontSize: "0.9rem" },
  btnPrimary: { backgroundColor: "#007acc", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" },
  btnSecondary: { backgroundColor: "#3c3c3c", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer" },
  btnDanger: { backgroundColor: "#d9534f", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer" }
};