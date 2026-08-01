import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { creerCommande } from "../services/commandesApi";

function Panier({ panier, supprimerDuPanier }) {
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [statutEnvoi, setStatutEnvoi] = useState(null); // null | "envoi" | "succes" | "erreur"
  const [erreur, setErreur] = useState("");

  const total = panier.reduce((acc, p) => acc + p.prix * p.quantite, 0);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatutEnvoi("envoi");
    setErreur("");

    try {
      await creerCommande(nom, telephone, panier, total);
      setStatutEnvoi("succes");
    } catch (err) {
      setErreur(err.message);
      setStatutEnvoi("erreur");
    }
  }

  if (panier.length === 0 && statutEnvoi !== "succes") {
    return (
      <div className="text-center py-24 px-4">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Votre panier est vide</h2>
        <p className="text-gray-500 mb-8">Ajoutez des produits pour commencer vos achats.</p>
        <Link to="/boutique" className="bg-yamba-blue text-white px-6 py-3 rounded-xl hover:bg-yamba-blue-dark transition font-semibold">Voir la boutique</Link>
      </div>
    );
  }

  if (statutEnvoi === "succes") {
    return (
      <div className="text-center py-24 px-4">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Commande enregistrée !</h2>
        <p className="text-gray-500 mb-2">Nous vous contacterons bientôt pour confirmer.</p>
        <p className="text-gray-500 mb-8">Paiement à la livraison ou en boutique.</p>
        <Link to="/boutique" className="bg-yamba-blue text-white px-6 py-3 rounded-xl hover:bg-yamba-blue-dark transition font-semibold">Continuer mes achats</Link>
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
              <p className="text-yamba-blue font-semibold">{p.prix.toLocaleString()} FCFA</p>
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
          <span className="text-gray-600">Paiement</span>
          <span className="font-semibold text-yamba-blue">À la livraison ou en boutique</span>
        </div>
        <div className="border-t pt-4 flex justify-between items-center mb-6">
          <span className="text-xl font-bold text-gray-800">Total</span>
          <span className="text-xl font-bold text-yamba-blue">{total.toLocaleString()} FCFA</span>
        </div>

        {!afficherFormulaire ? (
          <button
            onClick={() => setAfficherFormulaire(true)}
            className="w-full bg-yamba-blue text-white py-3 rounded-xl hover:bg-yamba-blue-dark transition font-semibold text-lg"
          >
            Passer la commande
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nom complet *</label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-yamba-blue"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Telephone *</label>
              <input
                type="tel"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-yamba-blue"
              />
            </div>
            <p className="text-sm text-gray-500 text-center">
              Paiement à la livraison ou directement en boutique. Aucun paiement en ligne requis.
            </p>
            {statutEnvoi === "erreur" && (
              <p className="text-red-600 text-sm text-center">{erreur}</p>
            )}
            <button
              type="submit"
              disabled={statutEnvoi === "envoi"}
              className="w-full bg-yamba-blue text-white py-3 rounded-xl hover:bg-yamba-blue-dark transition font-semibold text-lg disabled:opacity-50"
            >
              {statutEnvoi === "envoi" ? "Envoi en cours..." : "Confirmer la commande"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Panier;