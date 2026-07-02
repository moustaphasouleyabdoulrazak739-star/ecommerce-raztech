import { Link } from "react-router-dom";

function Accueil() {
  return (
    <div>
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Bienvenue sur RazShop</h1>
        <p className="text-xl mb-8 text-indigo-200">Decouvrez nos produits de qualite au meilleur prix</p>
        <Link to="/boutique" className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition text-lg">Voir la boutique</Link>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Nos categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="text-4xl mb-3">💻</div>
            <p className="font-semibold text-gray-700">Informatique</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="text-4xl mb-3">📱</div>
            <p className="font-semibold text-gray-700">Telephonie</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="text-4xl mb-3">🎧</div>
            <p className="font-semibold text-gray-700">Audio</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="text-4xl mb-3">⌚</div>
            <p className="font-semibold text-gray-700">Accessoires</p>
          </div>
        </div>
      </section>

      <section className="bg-indigo-50 py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Livraison rapide a Niamey</h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">Commandez en ligne et recevez vos produits directement chez vous dans les 24 heures.</p>
        <div className="flex justify-center gap-12 flex-wrap">
          <div className="text-center">
            <div className="text-4xl mb-2">🚀</div>
            <p className="font-semibold text-gray-700">Livraison rapide</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🔒</div>
            <p className="font-semibold text-gray-700">Paiement securise</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">↩️</div>
            <p className="font-semibold text-gray-700">Retour facile</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Accueil;