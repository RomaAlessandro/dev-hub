const GITHUB_API_BASE = "https://api.github.com";

export const githubService = {
  // Salva o recupera il token dal localStorage
  getToken: () => localStorage.getItem("github_pat") || "",
  setToken: (token) => localStorage.setItem("github_pat", token),
  clearToken: () => localStorage.removeItem("github_pat"),

  // Esporta uno snippet come GitHub Gist
  exportSnippetToGist: async (snippet, isPublic = false) => {
    const token = githubService.getToken();
    if (!token) throw new Error("Token GitHub non configurato.");

    // Determina estensione file in base al linguaggio
    const extMap = { javascript: "js", python: "py", bash: "sh", php: "php", json: "json", sql: "sql", html: "html", css: "css" };
    const ext = extMap[(snippet.language || "").toLowerCase()] || "txt";
    const filename = `${snippet.title.toLowerCase().replace(/[^a-z0-9]/g, "_")}.${ext}`;

    const response = await fetch(`${GITHUB_API_BASE}/gists`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({
        description: snippet.description || snippet.title,
        public: isPublic,
        files: {
          [filename]: {
            content: snippet.code,
          },
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Errore durante la creazione del Gist.");
    }

    return await response.json();
  },

  // Recupera i Gist dell'utente autenticato
  getUserGists: async () => {
    const token = githubService.getToken();
    if (!token) throw new Error("Token GitHub non configurato.");

    const response = await fetch(`${GITHUB_API_BASE}/gists`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) throw new Error("Errore nel recupero dei Gist da GitHub.");
    return await response.json();
  },
};