const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8001/api";

export async function fetchSnippets() {
  const res = await fetch(`${API_BASE_URL}/snippets`);
  return await res.json();
}

export async function createSnippet(snippet) {
  const res = await fetch(`${API_BASE_URL}/snippets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(snippet),
  });
  return await res.json();
}

export async function deleteSnippet(id) {
  const res = await fetch(`${API_BASE_URL}/snippets/${id}`, {
    method: "DELETE",
  });
  return res.ok;
}