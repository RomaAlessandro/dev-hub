const API_URL = "http://127.0.0.1:8001/snippets";

export const fetchSnippets = async () => {
  const response = await fetch(`${API_URL}/`);
  if (!response.ok) {
    throw new Error("Errore nel recupero degli snippet");
  }
  return response.json();
};

export const createSnippet = async (snippetData) => {
  const response = await fetch(`${API_URL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(snippetData),
  });
  if (!response.ok) {
    throw new Error("Errore durante il salvataggio dello snippet");
  }
  return response.json();
};

export const deleteSnippet = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Errore durante l'eliminazione dello snippet");
  }
  return response.json();
};