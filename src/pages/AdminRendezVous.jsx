import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getRendezVous,
  updateStatutRendezVous,
  logoutAdmin,
} from "../services/adminApi";

const STATUTS = ["en attente", "confirmé", "annulé", "terminé"];

function AdminRendezVous() {
  const [rendezVous, setRendezVous] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    chargerRendezVous();
  }, []);

  async function chargerRendezVous() {
    setChargement(true);
    setErreur("");
    try {
      const data = await getRendezVous();
      data.sort((a, b) => new Date(b.creeLe) - new Date(a.creeLe));
      setRendezVous(data);
    } catch (err) {
      setErreur(err.message);
      if (err.message.includes("expirée")) {
        navigate("/admin");
      }
    } finally {
      setChargement(false);
    }
  }

  async function handleChangerStatut(id, nouveauStatut) {
    try {
      await updateStatutRendezVous(id, nouveauStatut);
      setRendezVous((prev) =>
        prev.map((rdv) =>
          rdv._id === id ? { ...rdv, statut: nouveauStatut } : rdv
        )
      );
    } catch (err) {
      setErreur(err.message);
      if (err.message.includes("expirée")) {
        navigate("/admin");
      }
    }
  }

  function handleLogout() {
    logoutAdmin();
    navigate("/admin");
  }

  if (chargement) {
    return <p className="text-center mt-10">Chargement des rendez-vous...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-yamba-dark">Gestion des rendez-vous</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:underline"
        >
          Se déconnecter
        </button>
      </div>

      {erreur && <p className="text-red-600 mb-4">{erreur}</p>}

      {rendezVous.length === 0 ? (
        <p>Aucun rendez-vous pour le moment.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-left text-sm">
              <tr>
                <th className="p-3">Nom</th>
                <th className="p-3">Téléphone</th>
                <th className="p-3">Service</th>
                <th className="p-3">Date souhaitée</th>
                <th className="p-3">Message</th>
                <th className="p-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {rendezVous.map((rdv) => (
                <tr key={rdv._id} className="border-t text-sm">
                  <td className="p-3">{rdv.nom}</td>
                  <td className="p-3">{rdv.telephone}</td>
                  <td className="p-3">{rdv.service}</td>
                  <td className="p-3">{rdv.dateSouhaitee}</td>
                  <td className="p-3 max-w-xs truncate" title={rdv.message}>
                    {rdv.message || "-"}
                  </td>
                  <td className="p-3">
                    <select
                      value={rdv.statut}
                      onChange={(e) =>
                        handleChangerStatut(rdv._id, e.target.value)
                      }
                      className="border rounded px-2 py-1 text-sm focus:outline-none focus:border-yamba-blue"
                    >
                      {STATUTS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminRendezVous;