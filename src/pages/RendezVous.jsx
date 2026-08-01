// src/pages/RendezVous.jsx

import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function RendezVous() {
  const [formData, setFormData] = useState({
    nom: "",
    telephone: "",
    service: "",
    dateSouhaitee: "",
    message: "",
  });
  const [statutEnvoi, setStatutEnvoi] = useState(null); // null | "envoi" | "succes" | "erreur"

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatutEnvoi("envoi");

    try {
      const reponse = await fetch(`${API_URL}/rendezvous`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!reponse.ok) throw new Error("Erreur serveur");

      setStatutEnvoi("succes");
      setFormData({ nom: "", telephone: "", service: "", dateSouhaitee: "", message: "" });
    } catch (err) {
      setStatutEnvoi("erreur");
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Maintenance & Installation</h1>
      <p className="text-gray-600 mb-8">
        Diagnostic, reparation, installation Windows/Office et tout autre service informatique.
        Prenez rendez-vous ci-dessous.
      </p>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nom complet *</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-yamba-blue"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Telephone *</label>
          <input
            type="tel"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-yamba-blue"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Service souhaite</label>
          <input
            type="text"
            name="service"
            placeholder="Ex: Installation Windows, reparation, diagnostic..."
            value={formData.service}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-yamba-blue"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Date souhaitee *</label>
          <input
            type="date"
            name="dateSouhaitee"
            value={formData.dateSouhaitee}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-yamba-blue"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Message (optionnel)</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-yamba-blue"
          />
        </div>

        <button
          type="submit"
          disabled={statutEnvoi === "envoi"}
          className="bg-yamba-blue text-white px-6 py-3 rounded-xl hover:bg-yamba-blue-dark transition font-semibold w-full disabled:opacity-50"
        >
          {statutEnvoi === "envoi" ? "Envoi en cours..." : "Prendre rendez-vous"}
        </button>

        {statutEnvoi === "succes" && (
          <p className="text-green-600 font-semibold text-center">Rendez-vous enregistre ! Nous vous contacterons bientot.</p>
        )}
        {statutEnvoi === "erreur" && (
          <p className="text-red-600 font-semibold text-center">Erreur : verifiez que le serveur est bien demarre.</p>
        )}
      </form>
    </div>
  );
}

export default RendezVous;