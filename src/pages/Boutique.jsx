import { useState } from "react";
import ProduitCard from "../components/ProduitCard";

const produits = [
  { id: 1, nom: "Laptop Pro 15", prix: 450000, categorie: "Informatique", description: "Ordinateur portable haute performance.", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400" },
  { id: 2, nom: "Smartphone Galaxy", prix: 185000, categorie: "Telephonie", description: "Smartphone Android derniere generation.", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400" },
  { id: 3, nom: "Casque Bluetooth", prix: 35000, categorie: "Audio", description: "Casque sans fil avec reduction de bruit.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
  { id: 4, nom: "Montre Connectee", prix: 75000, categorie: "Accessoires", description: "Smartwatch avec suivi de sante.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
  { id: 5, nom: "Tablette 10 pouces", prix: 120000, categorie: "Informatique", description: "Tablette Android ideale pour le travail.", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400" },
  { id: 6, nom: "Ecouteurs Sans Fil", prix: 25000, categorie: "Audio", description: "Ecouteurs True Wireless avec etui de charge.", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400" },
  { id: 7, nom: "iPhone 14", prix: 350000, categorie: "Telephonie", description: "Apple iPhone 14 128Go.", image: "https://images.unsplash.com/photo-1664478546384-d57edd2b8e28?w=400" },
  { id: 8, nom: "Clavier Mecanique", prix: 45000, categorie: "Accessoires", description: "Clavier mecanique RGB pour gaming.", image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400" },
];

const categories = ["Tous", "Informatique", "Telephonie", "Audio", "Accessoires"];

function Boutique({ ajouterAuPanier }) {
  const [categorieActive, setCategorieActive] = useState("Tous");
  const [recherche, setRecherche] = useState("");

  const produitsFiltres = produits.filter((p) => {
    const matchCategorie = categorieActive === "Tous" || p.categorie === categorieActive;
    const matchRecherche = p.nom.toLowerCase().includes(recherche.toLowerCase());
    return matchCategorie && matchRecherche;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Notre Boutique</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-80 focus:outline-none focus:border-indigo-600"
        />
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategorieActive(cat)}
              className={cat === categorieActive ? "bg-indigo-600 text-white px-4 py-2 rounded-lg" : "bg-white text-gray-600 border border-gray-300 px-4 py-2 rounded-lg hover:border-indigo-600 transition"}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {produitsFiltres.map((produit) => (
          <ProduitCard key={produit.id} produit={produit} ajouterAuPanier={ajouterAuPanier} />
        ))}
      </div>

      {produitsFiltres.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl">Aucun produit trouve.</p>
        </div>
      )}
    </div>
  );
}

export default Boutique;