// server/index.js

require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ---- Connexion MongoDB ----

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connecte a MongoDB Atlas"))
  .catch((err) => console.error("Erreur de connexion MongoDB :", err.message));

// ---- Modeles ----

const rendezVousSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  telephone: { type: String, required: true },
  service: { type: String, default: "Non precise" },
  dateSouhaitee: { type: String, required: true },
  message: { type: String, default: "" },
  statut: { type: String, default: "en attente" },
  creeLe: { type: Date, default: Date.now },
});
const RendezVous = mongoose.model("RendezVous", rendezVousSchema);

const commandeSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  telephone: { type: String, required: true },
  articles: { type: Array, required: true },
  total: { type: Number, required: true },
  statut: { type: String, default: "en attente" },
  creeLe: { type: Date, default: Date.now },
});
const Commande = mongoose.model("Commande", commandeSchema);

// ---- Authentification admin (mot de passe simple, un seul admin) ----

let adminToken = null;

function requireAdmin(req, res, next) {
  const token = req.headers["x-admin-token"];
  if (!token || token !== adminToken) {
    return res.status(401).json({ erreur: "Non autorisé" });
  }
  next();
}

app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ erreur: "Mot de passe incorrect" });
  }
  adminToken = crypto.randomBytes(24).toString("hex");
  res.json({ token: adminToken });
});

app.post("/api/admin/logout", requireAdmin, (req, res) => {
  adminToken = null;
  res.json({ succes: true });
});

// ---- Routes RDV ----

app.get("/api/rendezvous", requireAdmin, async (req, res) => {
  const rendezVous = await RendezVous.find().sort({ creeLe: -1 });
  res.json(rendezVous);
});

app.post("/api/rendezvous", async (req, res) => {
  const { nom, telephone, service, dateSouhaitee, message } = req.body;

  if (!nom || !telephone || !dateSouhaitee) {
    return res.status(400).json({ erreur: "Nom, telephone et date sont obligatoires." });
  }

  try {
    const nouveauRdv = await RendezVous.create({ nom, telephone, service, dateSouhaitee, message });
    res.status(201).json(nouveauRdv);
  } catch (err) {
    res.status(500).json({ erreur: "Erreur lors de la creation du rendez-vous." });
  }
});

app.patch("/api/rendezvous/:id", requireAdmin, async (req, res) => {
  const { statut } = req.body;

  try {
    const rdv = await RendezVous.findByIdAndUpdate(req.params.id, { statut }, { new: true });
    if (!rdv) {
      return res.status(404).json({ erreur: "Rendez-vous introuvable." });
    }
    res.json(rdv);
  } catch (err) {
    res.status(500).json({ erreur: "Erreur lors de la mise a jour." });
  }
});

// ---- Routes Commandes ----

app.get("/api/commandes", requireAdmin, async (req, res) => {
  const commandes = await Commande.find().sort({ creeLe: -1 });
  res.json(commandes);
});

app.post("/api/commandes", async (req, res) => {
  const { nom, telephone, articles, total } = req.body;

  if (!nom || !telephone || !articles || articles.length === 0) {
    return res.status(400).json({ erreur: "Nom, telephone et au moins un article sont obligatoires." });
  }

  try {
    const nouvelleCommande = await Commande.create({ nom, telephone, articles, total });
    res.status(201).json(nouvelleCommande);
  } catch (err) {
    res.status(500).json({ erreur: "Erreur lors de la creation de la commande." });
  }
});

app.patch("/api/commandes/:id", requireAdmin, async (req, res) => {
  const { statut } = req.body;

  try {
    const commande = await Commande.findByIdAndUpdate(req.params.id, { statut }, { new: true });
    if (!commande) {
      return res.status(404).json({ erreur: "Commande introuvable." });
    }
    res.json(commande);
  } catch (err) {
    res.status(500).json({ erreur: "Erreur lors de la mise a jour." });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur RDV demarre sur http://localhost:${PORT}`);
});

