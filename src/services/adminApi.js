const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("adminToken");
}

export async function loginAdmin(password) {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.erreur || "Erreur de connexion");
  }

  const data = await res.json();
  localStorage.setItem("adminToken", data.token);
  return data.token;
}

export function logoutAdmin() {
  localStorage.removeItem("adminToken");
}

export function isLoggedIn() {
  return !!getToken();
}

export async function getRendezVous() {
  const res = await fetch(`${API_URL}/rendezvous`, {
    headers: { "x-admin-token": getToken() },
  });

  if (res.status === 401) {
    logoutAdmin();
    throw new Error("Session expirée, reconnecte-toi");
  }

  if (!res.ok) {
    throw new Error("Erreur lors du chargement des rendez-vous");
  }

  return res.json();
}

export async function updateStatutRendezVous(id, statut) {
  const res = await fetch(`${API_URL}/rendezvous/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-admin-token": getToken(),
    },
    body: JSON.stringify({ statut }),
  });

  if (res.status === 401) {
    logoutAdmin();
    throw new Error("Session expirée, reconnecte-toi");
  }

  if (!res.ok) {
    throw new Error("Erreur lors de la mise à jour");
  }

  return res.json();
}