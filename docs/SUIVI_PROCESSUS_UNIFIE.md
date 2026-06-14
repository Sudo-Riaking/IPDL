# Suivi du Processus Unifié — Portail UMMISCO

> Module **IPDL** — Ingénierie des Processus de Développement Logiciel
> Département Génie Informatique, École Supérieure Polytechnique (ESP / UCAD)
> Année académique 2025‑2026

Ce document trace l'application du **Processus Unifié (UP)** — inspiré de RUP — au
développement du portail institutionnel UMMISCO, et fait le lien explicite entre
chaque artefact méthodologique et la **plateforme livrée**.

---

## 1. Rappel du cadre UP

Le Processus Unifié est **itératif, incrémental, centré sur l'architecture et
piloté par les cas d'utilisation**. Il s'organise en 4 phases, chacune clôturée
par un jalon, et fait progresser en parallèle 5 enchaînements d'activités
(G — Gestion, B — Besoins, C — Conception, I — Implémentation, D — Déploiement).

| Phase | Jalon | Question centrale | État |
|-------|-------|-------------------|------|
| **Inception (Création)** | Objectifs du cycle de vie | Le projet vaut‑il la peine d'être lancé ? | ✅ Terminée (Rapport d'inception) |
| **Élaboration** | Architecture du cycle de vie | L'architecture est‑elle stable et les risques maîtrisés ? | ✅ Atteinte (architecture validée, maquette exécutable) |
| **Construction** | Capacité opérationnelle initiale | Le produit est‑il prêt pour les utilisateurs ? | 🟡 En cours (portail fonctionnel démontré) |
| **Transition** | Mise à disposition du produit | Le client est‑il satisfait ? | ⏳ À venir (déploiement Vercel + recette) |

---

## 2. Phase d'Inception — rappel (déjà livrée)

La phase d'inception a été conduite en **trois itérations** (cf. *Rapport de la
phase d'inception*) :

1. **Comprendre le problème** — analyse critique de `ummisco.ucad.sn`, benchmark
   (ResearchGate, HAL, Zenodo, portail INRIA), rédaction du document de vision.
2. **Valider les besoins** — entretiens avec les acteurs, diagrammes de cas
   d'utilisation par acteur, diagramme de classes (9 entités), décisions actées :
   modèle **ACL**, données **public / protégé / privé**, flux de publication
   différencié, simulations par **intégration d'outils** (iframes).
3. **Évaluer la faisabilité** — architecture 4 couches, maquette de la page
   d'accueil, priorisation des fonctionnalités. **Jalon 1 franchi : projet faisable.**

---

## 3. Phase d'Élaboration — architecture de référence

L'objectif de l'élaboration est de **stabiliser l'architecture** et de lever les
risques majeurs en réalisant un **squelette exécutable** couvrant les cas
d'utilisation les plus structurants.

### 3.1 Architecture mise en œuvre

Conforme à la cible 4 couches décidée en inception, adaptée à la stack retenue :

```
┌─────────────────────────────────────────────────────────────┐
│  Front-office (public)            Back-office (espace connecté)│
│  Next.js 16 App Router · React 19 · Tailwind v4 · Framer Motion│
├─────────────────────────────────────────────────────────────┤
│  API REST — Route Handlers Next.js (/src/app/api/*)           │
│  Auth JWT (jose) · ACL · validation publications · datasets   │
├─────────────────────────────────────────────────────────────┤
│  Couche données (store en mémoire, prêt à brancher PostgreSQL)│
│  Modèle : User, Role, Permission, Publication, Dataset,       │
│           Simulation, Event, Partner, AccessRequest           │
├─────────────────────────────────────────────────────────────┤
│  Services externes intégrés (sans redirection) :              │
│  Google Scholar / DOI · Assistant IA (GROQ) · iframes          │
└─────────────────────────────────────────────────────────────┘
```

> Séparation **front-office / back-office** assurée par le contrôle d'accès :
> les routes `/admin` et `/dashboard` vérifient l'authentification et le rôle.

### 3.2 Risques levés en élaboration

| Risque (inception) | Traitement en élaboration | Statut |
|--------------------|---------------------------|--------|
| Sécurité de l'interface admin | Auth JWT + garde de rôle serveur sur chaque route sensible | ✅ Levé |
| Modèle ACL réalisable ? | Permissions atomiques + composition de rôles + demandes d'accès | ✅ Prouvé |
| Multilingue | Contexte i18n FR/EN avec hook `t()` | ✅ Levé |
| Intégration sans redirection | iframes + liens référencés (Scholar/DOI) conservés dans le portail | ✅ Démontré |

---

## 4. Phase de Construction — incréments réalisés

La construction produit le système par **incréments** ajoutés au modèle à chaque
itération. Voici la traçabilité **cas d'utilisation → réalisation**.

| Acteur | Cas d'utilisation (diagramme UC) | Réalisation dans la plateforme |
|--------|----------------------------------|--------------------------------|
| Visiteur | Consulter publications & projets | Page d'accueil + `/publications` (référencement Scholar/DOI) |
| Visiteur | Recherche globale instantanée | Barre de recherche unifiée (publications, chercheurs, datasets) |
| Visiteur | Contact / offres de doctorat | Formulaire de contact, `/actualites` |
| Étudiant/Doctorant | Soumettre une publication (validation requise) | Espace `/dashboard` → file de validation `/admin` |
| Étudiant/Doctorant | Demander l'accès à une ressource | Demande d'accès ACL → traitée par le directeur |
| Chercheur | Publier directement (sans validation) | Permission `pub.publish_direct` |
| Chercheur | Déposer / consulter des datasets | `/datasets` + permissions `data.*` (public/protégé/privé) |
| Responsable d'axe | Animer un axe thématique | Permission `axe.manage` |
| Partenaire | Lancer des simulations sans contrainte | `/simulations` (outils intégrés par iframe) |
| **Directeur** | **Composer les rôles ACL** | **`/admin` → onglet ACL : permissions → rôles** |
| **Directeur** | **Traiter les demandes d'accès** | **File des demandes : approuver = accorder la permission** |
| Directeur | Valider les publications des étudiants | File de validation (valider / rejeter) |
| Directeur | Consulter le tableau de bord | Statistiques globales `/admin` |

### 4.1 Itérations de construction (hors heures de cours)

| Itération | Objectif | Incrément livré |
|-----------|----------|-----------------|
| C‑1 | Identité & navigation | Logo officiel, charte, navigation, thème clair/sombre, i18n |
| C‑2 | Valorisation scientifique | Publications + datasets + référencement Google Scholar / DOI |
| C‑3 | Sécurité & rôles | Authentification JWT, comptes de démonstration, séparation front/back‑office |
| C‑4 | **Modèle ACL** | Permissions, composition de rôles, demandes d'accès (cœur du besoin client) |
| C‑5 | Vie de l'unité | Actualités, séminaires, partenaires, assistant IA |

---

## 5. Phase de Transition — à venir

- **Déploiement** sur Vercel (URL publique, redéploiement continu sur push Git).
- **Recette** avec le client (le professeur référent UMMISCO) via les comptes de
  démonstration en 1 clic.
- Bascule du store en mémoire vers **PostgreSQL** pour la persistance.

---

## 6. Intensité des enchaînements par phase (G B C I D)

| Enchaînement | Inception | Élaboration | Construction | Transition |
|--------------|:---------:|:-----------:|:------------:|:----------:|
| G — Gestion | ▓▓░░░ | ▓▓░░░ | ▓▓▓░░ | ▓▓░░░ |
| B — Besoins | ▓▓▓▓▓ | ▓▓▓░░ | ▓▓░░░ | ▓░░░░ |
| C — Conception | ▓░░░░ | ▓▓▓▓▓ | ▓▓▓░░ | ▓░░░░ |
| I — Implémentation | ░░░░░ | ▓▓░░░ | ▓▓▓▓▓ | ▓▓░░░ |
| D — Déploiement | ░░░░░ | ▓░░░░ | ▓▓░░░ | ▓▓▓▓▓ |

---

## 7. Conformité aux décisions du client

- ✅ **« Ce n'est pas une vitrine, c'est une application web »** — back‑office réel,
  authentification, ACL, validation, demandes d'accès.
- ✅ **Modèle ACL** (permissions composées en rôles, pas de rôles figés).
- ✅ **Trois niveaux de données** : public / protégé / privé.
- ✅ **Publications via Google Scholar** : référencement par liens Scholar + DOI,
  sans hébergement de PDF.
- ✅ **Intégration sans redirection externe** : iframes + liens conservés dans le portail.
- ✅ **Dark mode** présent (exigence explicite).
- ✅ **Traçabilité de l'usage de l'IA** documentée (cf. `usage-ia.md`).

---

_Document de suivi méthodologique — Groupe IPDL, ESP/UCAD, 2025‑2026._
