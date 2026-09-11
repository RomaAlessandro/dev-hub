import React, { useEffect, useState } from "react";
import { fetchSnippets, createSnippet, deleteSnippet } from "./services/snippetService";
import { fetchNotes, createNote, deleteNote } from "./services/noteService";
import { SnippetCard } from "./components/SnippetCard";
import { SnippetForm } from "./components/SnippetForm";
import { NoteCard } from "./components/NoteCard";
import { NoteForm } from "./components/NoteForm";

export default function App() {
  const [activeTab, setActiveTab] = useState("snippets");
  const [snippets, setSnippets] = useState([]);
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadSnippets();
    loadNotes();
  }, []);

  const loadSnippets = async () => setSnippets(await fetchSnippets());
  const loadNotes = async () => setNotes(await fetchNotes());

  const handleAddSnippet = async (s) => { await createSnippet(s); loadSnippets(); };
  const handleDeleteSnippet = async (id) => { if (confirm("Eliminare?")) { await deleteSnippet(id); loadSnippets(); } };

  const handleAddNote = async (n) => { await createNote(n); loadNotes(); };
  const handleDeleteNote = async (id) => { if (confirm("Eliminare?")) { await deleteNote(id); loadNotes(); } };

  const filteredSnippets = snippets.filter((s) => s.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredNotes = notes.filter((n) => n.title.toLowerCase().includes(searchTerm.toLowerCase()) || n.category.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}>
      <h1 style={{ textAlign: "center" }}>🛠️ Developer Hub</h1>

      {/* Tab Navigation */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", justifyContent: "center" }}>
        <button 
          onClick={() => setActiveTab("snippets")} 
          style={{ padding: "10px 20px", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: "bold", backgroundColor: activeTab === "snippets" ? "#007acc" : "#333", color: "#fff" }}
        >
          💻 Snippet ({snippets.length})
        </button>
        <button 
          onClick={() => setActiveTab("notes")} 
          style={{ padding: "10px 20px", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: "bold", backgroundColor: activeTab === "notes" ? "#007acc" : "#333", color: "#fff" }}
        >
          📝 Note Tecniche ({notes.length})
        </button>
      </div>

      <input
        type="text"
        placeholder="🔍 Cerca..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #444", backgroundColor: "#1e1e1e", color: "#fff", marginBottom: "20px", boxSizing: "border-box" }}
      />

      {activeTab === "snippets" ? (
        <>
          <SnippetForm onSnippetAdded={handleAddSnippet} />
          {filteredSnippets.map((s) => <SnippetCard key={s.id} snippet={s} onDelete={handleDeleteSnippet} />)}
        </>
      ) : (
        <>
          <NoteForm onNoteAdded={handleAddNote} />
          {filteredNotes.map((n) => <NoteCard key={n.id} note={n} onDelete={handleDeleteNote} />)}
        </>
      )}
    </div>
  );
}