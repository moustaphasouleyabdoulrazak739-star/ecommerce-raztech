const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function creerCommande(nom, telephone, panier, total) {
  const articles = panier.map((p) => ({
    nom: p.nom,
    prix: p.prix,
    quantite: p.quantite,
  }));

  const res = await fetch(`${API_URL}/commandes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nom, telephone, articles, total }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.erreur || "Erreur lors de la commande");
  }

  return res.json();
}