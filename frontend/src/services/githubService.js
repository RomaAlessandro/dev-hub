const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8001/api";

export const githubService = {
  getToken: () => localStorage.getItem("github_token") || "",
  setToken: (token) => localStorage.setItem("github_token", token.trim()),
  clearToken: () => localStorage.removeItem("github_token"),

  exportSnippetToGist: async (snippet, isPublic = false) => {
    const token = localStorage.getItem("github_token");
    const headers = { "Content-Type": "application/json" };
    
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/github/export-gist/`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        title: snippet.title,
        code: snippet.code,
        language: snippet.language,
        description: snippet.description || "",
        is_public: isPublic,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Errore durante l'export del Gist.");
    }

    return await response.json();
  },
};