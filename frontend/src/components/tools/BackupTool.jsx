import React from "react";

export function BackupTool({ snippets, notes, onImportSuccess }) {
  const exportBackup = () => {
    const data = {
      version: "1.0",
      exported_at: new Date().toISOString(),
      snippets,
      notes
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `devhub_backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
  };

  return (
    <div style={{ backgroundColor: "#1e1e1e", padding: "20px", borderRadius: "8px" }}>
      <h3>💾 Backup & Esportazione Dati</h3>
      <p style={{ color: "#ccc" }}>Scarica una copia locale di tutti i tuoi dati in formato JSON.</p>
      <button onClick={exportBackup} style={{ backgroundColor: "#4CAF50", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
        ⬇️ Scarica Backup (.json)
      </button>
    </div>
  );
}