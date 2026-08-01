import { useParams, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import { produits } from "../data/produits";

function Detail({ ajouterAuPanier }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const produit = produits.find((p) => p.id === parseInt(id));

  if (!produit) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-500">Produit introuvable.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-yamba-blue hover:underline mb-8">
        <FiArrowLeft />
        Retour
      </button>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden grid md:grid-cols-2 gap-0">
        <img src={produit.image} alt={produit.nom} className="w-full h-72 md:h-full object-cover" />
        <div className="p-8 flex flex-col justify-center">
          <span className="text-xs text-yamba-blue font-semibold uppercase mb-2">{produit.categorie}</span>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{produit.nom}</h1>
          <p className="text-gray-600 mb-6">{produit.description}</p>
          <p className="text-3xl font-bold text-yamba-blue mb-6">
            {produit.prix ? `${produit.prix.toLocaleString()} FCFA` : "Prix sur demande"}
          </p>
          <button onClick={() => { ajouterAuPanier(produit); navigate("/panier"); }} className="bg-yamba-blue text-white px-6 py-3 rounded-xl hover:bg-yamba-blue-dark transition flex items-center gap-2 justify-center font-semibold">
            <FiShoppingCart />
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detail;