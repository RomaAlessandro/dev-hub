const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8001/api";

export async function fetchNotes() {
  const res = await fetch(`${API_BASE_URL}/notes`);
  return await res.json();
}

export async function createNote(note) {
  const res = await fetch(`${API_BASE_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return await res.json();
}

export async function deleteNote(id) {
  const res = await fetch(`${API_BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });
  return res.ok;
}

export async function updateNote(id, note) {
  const res = await fetch(`${API_BASE_URL}/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return await res.json();
}