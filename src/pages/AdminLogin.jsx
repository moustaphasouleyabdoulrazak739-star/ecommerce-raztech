import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/adminApi";

function AdminLogin() {
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErreur("");
    setChargement(true);

    try {
      await loginAdmin(password);
      navigate("/admin/rendezvous");
    } catch (err) {
      setErreur(err.message);
    } finally {
      setChargement(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4 text-center text-yamba-dark">Connexion Admin</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:border-yamba-blue"
          required
        />

        {erreur && <p className="text-red-600 text-sm">{erreur}</p>}

        <button
          type="submit"
          disabled={chargement}
          className="bg-yamba-blue text-white rounded px-3 py-2 hover:bg-yamba-blue-dark disabled:opacity-50"
        >
          {chargement ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;