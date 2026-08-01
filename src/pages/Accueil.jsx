import { Link } from "react-router-dom";

function Accueil() {
  return (
    <div>
      <section className="bg-gradient-to-br from-yamba-dark to-yamba-blue-dark text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Bienvenue chez YAMBA<span className="text-yamba-blue-light">-TECH</span>
        </h1>
        <p className="text-xl mb-8 text-gray-200">Materiel informatique, telephonie et services de proximite a Niamey</p>
        <Link to="/boutique" className="bg-white text-yamba-dark px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition text-lg">Voir la boutique</Link>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Nos categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="text-4xl mb-3">💻</div>
            <p className="font-semibold text-gray-700">Ordinateurs & Tablettes</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="text-4xl mb-3">📱</div>
            <p className="font-semibold text-gray-700">Telephones</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="text-4xl mb-3">🖱️</div>
            <p className="font-semibold text-gray-700">Accessoires</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="text-4xl mb-3">🛠️</div>
            <p className="font-semibold text-gray-700">Maintenance & Installation</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Pourquoi choisir YAMBA-TECH</h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">Chaque ordinateur achete chez nous inclut installation complete, sac, souris sans fil et garantie.</p>
        <div className="flex justify-center gap-12 flex-wrap">
          <div className="text-center">
            <div className="text-4xl mb-2">🎁</div>
            <p className="font-semibold text-gray-700">Bonus inclus</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🤝</div>
            <p className="font-semibold text-gray-700">Paiement a la livraison</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🔧</div>
            <p className="font-semibold text-gray-700">Installation Windows/Office</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Accueil;