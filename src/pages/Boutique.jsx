import { useState } from "react";
import ProduitCard from "../components/ProduitCard";
import { produits } from "../data/produits";

const categories = ["Tous", "Informatique", "Telephonie", "Tablette", "Accessoires"];

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
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-80 focus:outline-none focus:border-yamba-blue"
        />
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategorieActive(cat)}
              className={cat === categorieActive ? "bg-yamba-blue text-white px-4 py-2 rounded-lg" : "bg-white text-gray-600 border border-gray-300 px-4 py-2 rounded-lg hover:border-yamba-blue transition"}
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