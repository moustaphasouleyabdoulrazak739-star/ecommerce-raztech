# YAMBA-TECH — Site e-commerce & prise de rendez-vous

Site vitrine et boutique en ligne pour **YAMBA-TECH** (Niamey, Niger — vente de matériel informatique, téléphonie, tablettes et accessoires). Les visiteurs parcourent le catalogue, ajoutent des produits au panier et peuvent prendre rendez-vous en boutique ; un back-office admin permet de gérer les commandes et rendez-vous reçus.

> Projet client réel — livré pour YAMBA-TECH.

## Fonctionnalités

- Catalogue produits filtrable par catégorie (Informatique, Téléphonie, Tablette, Accessoires) et par recherche texte
- Panier et détail produit
- Formulaire de prise de rendez-vous en boutique
- Espace admin protégé (`/admin`) : connexion par mot de passe, consultation et mise à jour du statut des commandes et rendez-vous
- Notification par e-mail (via l'API Brevo) à chaque nouvelle commande ou nouveau rendez-vous

## Stack technique

**Frontend**
- React 19 + Vite
- React Router 7
- Tailwind CSS 3
- React Icons

**Backend** (dossier [`server/`](./server))
- Node.js + Express 5
- MongoDB Atlas via Mongoose
- Brevo (API HTTPS) pour l'envoi d'e-mails de notification
- Authentification admin par token

**Déploiement**
- Frontend : Vercel (`vercel.json` inclus, rewrites SPA + headers de sécurité)
- Backend : Render

## Lancer le projet en local

Le frontend et le backend sont deux applications séparées, à lancer chacune dans son propre terminal.

### 1. Frontend

```bash
npm install
npm run dev
```
L'application est servie sur `http://localhost:5173`.

### 2. Backend

```bash
cd server
npm install
npm run start
```
L'API écoute par défaut sur `http://localhost:5000`.

Crée un fichier `server/.env` (non versionné) avec :

```env
MONGO_URI=mongodb+srv://...        # cluster MongoDB Atlas
PORT=5000
SITE_URL=http://localhost:5173
ADMIN_PASSWORD=...                 # mot de passe de connexion admin
BREVO_API_KEY=...                  # clé API Brevo (envoi d'e-mails)
GMAIL_USER=...                     # adresse recevant les notifications
```

Côté frontend, si l'API n'est pas sur `http://localhost:5000/api`, définis `VITE_API_URL` dans un `.env` à la racine.

## Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Démarre le frontend en mode développement |
| `npm run build` | Build de production du frontend |
| `npm run lint` | Vérifie le code avec Oxlint |
| `npm run preview` | Prévisualise le build de production |

## Capture d'écran

*(à ajouter — placer une image dans `docs/screenshot.png` et la référencer ici : `![Aperçu](docs/screenshot.png)`)*
