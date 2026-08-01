import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Accueil from "./pages/Accueil";
import Boutique from "./pages/Boutique";
import Panier from "./pages/Panier";
import Detail from "./pages/Detail";
import RendezVous from "./pages/RendezVous";
import AdminLogin from "./pages/AdminLogin";
import AdminRendezVous from "./pages/AdminRendezVous";
import { isLoggedIn } from "./services/adminApi";
import { useState } from "react";

function RouteProtegee({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}

function App() {
  const [panier, setPanier] = useState([]);

  function ajouterAuPanier(produit) {
    const existe = panier.find((p) => p.id === produit.id);
    if (existe) {
      setPanier(panier.map((p) => p.id === produit.id ? { ...p, quantite: p.quantite + 1 } : p));
    } else {
      setPanier([...panier, { ...produit, quantite: 1 }]);
    }
  }

  function supprimerDuPanier(id) {
    setPanier(panier.filter((p) => p.id !== id));
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar nombreArticles={panier.reduce((acc, p) => acc + p.quantite, 0)} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/boutique" element={<Boutique ajouterAuPanier={ajouterAuPanier} />} />
            <Route path="/panier" element={<Panier panier={panier} supprimerDuPanier={supprimerDuPanier} />} />
            <Route path="/produit/:id" element={<Detail ajouterAuPanier={ajouterAuPanier} />} />
            <Route path="/rendez-vous" element={<RendezVous />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route
              path="/admin/rendezvous"
              element={
                <RouteProtegee>
                  <AdminRendezVous />
                </RouteProtegee>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;