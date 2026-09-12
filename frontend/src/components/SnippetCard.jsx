import React from "react";
import { TagPill } from "./TagPill";

export function SnippetCard({ snippet, onDelete, onTagClick }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet.code);
    alert("Codice copiato negli appunti!");
  };

  const tagsList = snippet.tags 
    ? snippet.tags.split(",").map((t) => t.trim()).filter(Boolean) 
    : [];

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>{snippet.title}</h3>
        <span style={styles.badge}>{snippet.language}</span>
      </div>
      
      {snippet.description && <p style={styles.desc}>{snippet.description}</p>}

      {tagsList.length > 0 && (
        <div style={styles.tagsContainer}>
          {tagsList.map((tag, idx) => (
            <TagPill key={idx} tag={tag} onClick={onTagClick} />
          ))}
        </div>
      )}

      <pre style={styles.codeBlock}>
        <code>{snippet.code}</code>
      </pre>

      <div style={styles.actions}>
        <button style={styles.copyBtn} onClick={copyToClipboard}>
          📋 Copia
        </button>
        <button style={styles.deleteBtn} onClick={() => onDelete(snippet.id)}>
          🗑️ Elimina
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "16px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  title: { margin: 0, fontSize: "1.2rem" },
  badge: { backgroundColor: "#007acc", padding: "4px 8px", borderRadius: "4px", fontSize: "0.8rem", fontWeight: "bold" },
  desc: { color: "#aaa", fontSize: "0.9rem", margin: "8px 0" },
  tagsContainer: { marginBottom: "10px", marginTop: "4px" },
  codeBlock: { backgroundColor: "#2d2d2d", padding: "12px", borderRadius: "6px", overflowX: "auto", fontSize: "0.9rem" },
  actions: { display: "flex", gap: "10px", marginTop: "12px" },
  copyBtn: { backgroundColor: "#333", color: "#fff", border: "1px solid #555", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" },
  deleteBtn: { backgroundColor: "#d9534f", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" },
};