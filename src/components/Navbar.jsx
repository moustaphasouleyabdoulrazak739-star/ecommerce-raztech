import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

function Navbar({ nombreArticles }) {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">RazShop</Link>
        <ul className="flex gap-6 items-center">
          <li><Link to="/" className="hover:text-indigo-600 transition">Accueil</Link></li>
          <li><Link to="/boutique" className="hover:text-indigo-600 transition">Boutique</Link></li>
          <li>
            <Link to="/panier" className="relative flex items-center gap-1 hover:text-indigo-600 transition">
              <FiShoppingCart className="text-xl" />
              {nombreArticles > 0 && (
                <span className="absolute -top-2 -right-3 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{nombreArticles}</span>
              )}
              <span className="ml-2">Panier</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;