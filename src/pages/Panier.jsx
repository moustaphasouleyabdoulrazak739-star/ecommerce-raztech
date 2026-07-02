import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

function Panier({ panier, supprimerDuPanier }) {
  const total = panier.reduce((acc, p) => acc + p.prix * p.quantite, 0);

  if (panier.length === 0) {
    return (
      <div className="text-center py-24 px-4">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Votre panier est vide</h2>
        <p className="text-gray-500 mb-8">Ajoutez des produits pour commencer vos achats.</p>
        <Link to="/boutique" className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition font-semibold">Voir la boutique</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Mon Panier</h1>

      <div className="space-y-4 mb-8">
        {panier.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4">
            <img src={p.image} alt={p.nom} className="w-20 h-20 object-cover rounded-xl" />
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">{p.nom}</h3>
              <p className="text-indigo-600 font-semibold">{p.prix.toLocaleString()} FCFA</p>
              <p className="text-gray-500 text-sm">Quantite : {p.quantite}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800 mb-2">{(p.prix * p.quantite).toLocaleString()} FCFA</p>
              <button onClick={() => supprimerDuPanier(p.id)} className="text-red-500 hover:text-red-700 transition">
                <FiTrash2 className="text-xl" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Sous-total</span>
          <span className="font-semibold">{total.toLocaleString()} FCFA</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Livraison</span>
          <span className="font-semibold text-green-600">Gratuite</span>
        </div>
        <div className="border-t pt-4 flex justify-between items-center mb-6">
          <span className="text-xl font-bold text-gray-800">Total</span>
          <span className="text-xl font-bold text-indigo-600">{total.toLocaleString()} FCFA</span>
        </div>
        <button className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition font-semibold text-lg">
          Passer la commande
        </button>
      </div>
    </div>
  );
}

export default Panier;