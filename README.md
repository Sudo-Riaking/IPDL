# Portail Scientifique Institutionnel UMMISCO (Démonstration Interactive)

Ce projet est la proposition de portail web interactif et fonctionnel du **Groupe 8** pour l'**UMMISCO** (Unité Mixte Internationale de Modélisation Mathématique et Informatique des Systèmes Complexes), développée dans le cadre du module **IPDL** (Ingénierie des Processus de Développement Logiciel) à l'**École Supérieure Polytechnique (ESP / UCAD)**.

Contrairement aux présentations PowerPoint statiques, cette proposition offre au corps professoral et aux chercheurs d'UMMISCO une **démonstration en conditions réelles** de ce à quoi ressemblera le portail final une fois livré.

---

## 🚀 Démarrage Rapide

### Prérequis
- [Node.js](https://nodejs.org/) (version 18 ou supérieure)
- npm (fourni avec Node.js)

### Installation des dépendances
```bash
npm install
```

### Lancement du serveur de développement
```bash
npm run dev
```
Ouvrez ensuite [http://localhost:3000](http://localhost:3000) dans votre navigateur pour naviguer sur le portail interactif.

### Compilation pour la production (Build)
```bash
npm run build
```

---

## 🛠️ Stack Technique

- **Framework** : [Next.js 15 (App Router)](https://nextjs.org/) & React 19.
- **Styling** : [Tailwind CSS v4](https://tailwindcss.com/) (Charte UMMISCO : Bleu `#1e40af` et Vert `#16803d` sur fond sombre premium).
- **Animations** : [Framer Motion](https://www.framer.com/motion/) pour les modales de citation et les transitions fluides.
- **Modélisation** : Code [Mermaid.js](https://mermaid.js.org/) pour les diagrammes d'architecture et de cas d'utilisation (éditables sous `docs/diagrams/`).

---

## 📐 Architecture et Routes de la Démonstration

L'application Next.js propose de vraies pages dynamiques :
1. **Accueil (`/`)** :
   - **Moteur de recherche unifiée** filtrant instantanément publications, chercheurs et datasets.
   - **Axes de recherche** cliquables filtrant dynamiquement les publications liées.
   - **Dernières publications** scientifiques avec citation automatique (APA & BibTeX).
   - **Datasets** classés par visibilité (Public, Protégé, Privé) avec simulation de téléchargement sécurisé.
   - **Actualités et séminaires** scientifiques.
2. **Publications (`/publications`)** :
   - Interface de recherche multicritère (filtre par chercheur, par année de parution, par axe thématique, et recherche textuelle).
   - Générateur de citation au format APA/BibTeX avec copie dans le presse-papier en un clic.
3. **Simulations (`/simulations`)** :
   - Intégration de simulateurs NetLogo réels dans des iframes sandboxés pour modéliser la transmission des maladies (SIRS, paludisme).
4. **Chercheurs (`/chercheurs/[id]`)** :
   - Fiche d'identité d'un chercheur (biographie, e-mail de contact).
   - Badge ORCID synchronisé de manière visuelle réaliste.
   - Liste des publications et datasets associés à ce chercheur.
5. **Connexion (`/connexion`)** :
   - Formulaire sobre de connexion Keycloak (SSO sécurisé).

---

## 💎 Nos Différenciateurs Techniques

* **Recherche globale instantanée** : Unification de l'accès aux données dès la page d'accueil.
* **Génération automatique de citations** : Export en un clic vers BibTeX et APA.
* **Niveaux de visibilité des données** : Restriction d'accès avec authentification pour les datasets protégés/privés.
* **Simulations embarquées fonctionnelles** : Utilisation de NetLogo Web pour exécuter des modèles scientifiques réels dans le navigateur.
* **PWA & Conception hors-ligne** : Résilience réseau dans un contexte de connectivité fluctuante.

---
*Conçu avec rigueur par le Groupe 8 (DIC1 GI, ESP UCAD).*

---

## 🔐 Configuration des variables d'environnement

L'application utilise un endpoint GROQ pour le service d'assistant. Créez un fichier `.env` à partir de `.env.example` et définissez au minimum :

```
GROQ_API_URL=https://api.example.com/groq
GROQ_API_KEY=your_groq_api_key_here
```

- `GROQ_API_URL` : URL complète de l'endpoint vers lequel l'API enverra les messages.
- `GROQ_API_KEY` : clé secrète pour authentifier les requêtes (passée dans l'entête `Authorization: Bearer ...`).

Si votre fournisseur nécessite un format de requête différent (autres paramètres JSON), adaptez `src/app/api/chat/route.ts` en conséquence.
