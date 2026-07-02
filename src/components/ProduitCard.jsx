import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

function ProduitCard({ produit, ajouterAuPanier }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">
      <Link to={"/produit/" + produit.id}>
        <img src={produit.image} alt={produit.nom} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <span className="text-xs text-indigo-600 font-semibold uppercase">{produit.categorie}</span>
        <h3 className="text-lg font-bold text-gray-800 mt-1 mb-1">{produit.nom}</h3>
        <p className="text-gray-500 text-sm mb-3">{produit.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-indigo-600">{produit.prix} FCFA</span>
          <button onClick={() => ajouterAuPanier(produit)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2">
            <FiShoppingCart />
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProduitCard;