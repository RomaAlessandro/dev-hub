import React, { useEffect, useState } from "react";
import { fetchSnippets, createSnippet, deleteSnippet, updateSnippet } from "./services/snippetService";
import { fetchNotes, createNote, deleteNote, updateNote } from "./services/noteService";
import { SnippetCard } from "./components/SnippetCard";
import { SnippetForm } from "./components/SnippetForm";
import { NoteCard } from "./components/NoteCard";
import { NoteForm } from "./components/NoteForm";
import { TagPill } from "./components/TagPill";
import { JsonTool } from "./components/tools/JsonTool";
import { RegexTool } from "./components/tools/RegexTool";
import { BackupTool } from "./components/tools/BackupTool";

export default function App() {
  const [activeTab, setActiveTab] = useState("snippets");
  const [snippets, setSnippets] = useState([]);
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    loadSnippets();
    loadNotes();
  }, []);

  const loadSnippets = async () => setSnippets(await fetchSnippets());
  const loadNotes = async () => setNotes(await fetchNotes());

  const handleAddSnippet = async (s) => { await createSnippet(s); loadSnippets(); };
  const handleDeleteSnippet = async (id) => { if (confirm("Eliminare?")) { await deleteSnippet(id); loadSnippets(); } };
  const handleUpdateSnippet = async (id, updatedSnippet) => { await updateSnippet(id, updatedSnippet); loadSnippets(); };

  const handleAddNote = async (n) => { await createNote(n); loadNotes(); };
  const handleDeleteNote = async (id) => { if (confirm("Eliminare?")) { await deleteNote(id); loadNotes(); } };
  const handleUpdateNote = async (id, updatedNote) => { await updateNote(id, updatedNote); loadNotes(); };

  const allTags = Array.from(new Set([
    ...snippets.flatMap((s) => (s.tags ? s.tags.split(",").map((t) => t.trim()) : [])),
    ...notes.flatMap((n) => (n.tags ? n.tags.split(",").map((t) => t.trim()) : []))
  ])).filter(Boolean);

  const filterItem = (item) => {
    const titleMatch = item.title ? item.title.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const categoryMatch = item.category ? item.category.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const matchesSearch = titleMatch || categoryMatch;

    const itemTags = item.tags ? item.tags.split(",").map((t) => t.trim()) : [];
    const matchesTag = selectedTag ? itemTags.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  };

  const filteredSnippets = snippets.filter(filterItem);
  const filteredNotes = notes.filter(filterItem);

  const handleTagToggle = (tag) => {
    setSelectedTag((prevTag) => (prevTag === tag ? null : tag));
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}>
      <h1 style={{ textAlign: "center" }}>🛠️ Developer Hub</h1>

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
        <button 
          onClick={() => setActiveTab("tools")} 
          style={{ padding: "10px 20px", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: "bold", backgroundColor: activeTab === "tools" ? "#007acc" : "#333", color: "#fff" }}
        >
          🧰 Tools & Utility
        </button>
      </div>

      {activeTab !== "tools" && (
        <>
          <input
            type="text"
            placeholder="🔍 Cerca per titolo o categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #444", backgroundColor: "#1e1e1e", color: "#fff", marginBottom: "12px", boxSizing: "border-box" }}
          />

          {allTags.length > 0 && (
            <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
              <span style={{ fontSize: "0.85rem", color: "#aaa", marginRight: "4px" }}>Filtra per Tag:</span>
              {allTags.map((tag) => (
                <TagPill
                  key={tag}
                  tag={tag}
                  isSelected={selectedTag === tag}
                  onClick={handleTagToggle}
                />
              ))}
              {selectedTag && (
                <button 
                  onClick={() => setSelectedTag(null)} 
                  style={{ backgroundColor: "transparent", color: "#ff6b6b", border: "none", cursor: "pointer", fontSize: "0.8rem", padding: "2px 6px" }}
                >
                  ❌ Rimuovi filtro
                </button>
              )}
            </div>
          )}
        </>
      )}

      {activeTab === "snippets" && (
        <>
          <SnippetForm onSnippetAdded={handleAddSnippet} />
          {filteredSnippets.map((s) => (
            <SnippetCard 
              key={s.id} 
              snippet={s} 
              onDelete={handleDeleteSnippet} 
              onUpdate={handleUpdateSnippet}
              onTagClick={handleTagToggle} 
            />
          ))}
        </>
      )}

      {activeTab === "notes" && (
        <>
          <NoteForm onNoteAdded={handleAddNote} />
          {filteredNotes.map((n) => (
            <NoteCard 
              key={n.id} 
              note={n} 
              onDelete={handleDeleteNote}
              onUpdate={handleUpdateNote}
              onTagClick={handleTagToggle} 
            />
          ))}
        </>
      )}

      {activeTab === "tools" && (
        <>
          <JsonTool />
          <RegexTool />
          <BackupTool snippets={snippets} notes={notes} />
        </>
      )}
    </div>
  );
}