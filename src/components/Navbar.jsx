import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

function Navbar({ nombreArticles }) {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-yamba-dark">
          YAMBA<span className="text-yamba-blue">-TECH</span>
        </Link>
        <ul className="flex gap-6 items-center">
          <li><Link to="/" className="hover:text-yamba-blue transition">Accueil</Link></li>
          <li><Link to="/boutique" className="hover:text-yamba-blue transition">Boutique</Link></li>
          <li><Link to="/rendez-vous" className="hover:text-yamba-blue transition">Rendez-vous</Link></li>
          <li>
            <Link to="/panier" className="relative flex items-center gap-1 hover:text-yamba-blue transition">
              <FiShoppingCart className="text-xl" />
              {nombreArticles > 0 && (
                <span className="absolute -top-2 -right-3 bg-yamba-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{nombreArticles}</span>
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