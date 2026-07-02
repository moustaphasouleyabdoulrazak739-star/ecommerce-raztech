import { useParams, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiArrowLeft } from "react-icons/fi";

const produits = [
  { id: 1, nom: "Laptop Pro 15", prix: 450000, categorie: "Informatique", description: "Ordinateur portable haute performance avec processeur Intel Core i7, 16Go RAM et 512Go SSD. Ideal pour le developpement et le design.", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400" },
  { id: 2, nom: "Smartphone Galaxy", prix: 185000, categorie: "Telephonie", description: "Smartphone Android derniere generation avec ecran AMOLED 6.5 pouces, camera 108MP et batterie 5000mAh.", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400" },
  { id: 3, nom: "Casque Bluetooth", prix: 35000, categorie: "Audio", description: "Casque sans fil avec reduction de bruit active, autonomie 30h et son haute fidelite.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
  { id: 4, nom: "Montre Connectee", prix: 75000, categorie: "Accessoires", description: "Smartwatch avec suivi de sante, GPS integre, etanche et autonomie 7 jours.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
  { id: 5, nom: "Tablette 10 pouces", prix: 120000, categorie: "Informatique", description: "Tablette Android ideale pour le travail et les loisirs avec ecran Full HD et 64Go de stockage.", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400" },
  { id: 6, nom: "Ecouteurs Sans Fil", prix: 25000, categorie: "Audio", description: "Ecouteurs True Wireless avec etui de charge, autonomie 24h et resistance a l'eau IPX5.", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400" },
  { id: 7, nom: "iPhone 14", prix: 350000, categorie: "Telephonie", description: "Apple iPhone 14 128Go avec puce A15 Bionic, camera 12MP et ecran Super Retina XDR.", image: "https://images.unsplash.com/photo-1664478546384-d57edd2b8e28?w=400" },
  { id: 8, nom: "Clavier Mecanique", prix: 45000, categorie: "Accessoires", description: "Clavier mecanique RGB pour gaming avec switches Cherry MX Red et repose-poignet inclus.", image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400" },
];

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
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-indigo-600 hover:underline mb-8">
        <FiArrowLeft />
        Retour
      </button>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden grid md:grid-cols-2 gap-0">
        <img src={produit.image} alt={produit.nom} className="w-full h-72 md:h-full object-cover" />
        <div className="p-8 flex flex-col justify-center">
          <span className="text-xs text-indigo-600 font-semibold uppercase mb-2">{produit.categorie}</span>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{produit.nom}</h1>
          <p className="text-gray-600 mb-6">{produit.description}</p>
          <p className="text-3xl font-bold text-indigo-600 mb-6">{produit.prix.toLocaleString()} FCFA</p>
          <button onClick={() => { ajouterAuPanier(produit); navigate("/panier"); }} className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition flex items-center gap-2 justify-center font-semibold">
            <FiShoppingCart />
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detail;