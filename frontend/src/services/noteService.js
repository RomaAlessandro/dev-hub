const API_URL = "http://127.0.0.1:8001/notes";

export const fetchNotes = async () => {
  const res = await fetch(`${API_URL}/`);
  return res.json();
};

export const createNote = async (noteData) => {
  const res = await fetch(`${API_URL}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteData),
  });
  return res.json();
};

export const deleteNote = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return res.json();
};