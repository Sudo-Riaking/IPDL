# PLAN.md — Portail UMMISCO UMI 209

> Portail institutionnel Next.js 16 / React 19 / Tailwind v4  
> Version améliorée de ummisco.fr : contenu réel + espace connecté, dark mode,
> datasets, simulations, chatbot IA.  
> _Mis à jour le 2026-05-31 après audit complet du code et des PDFs UMMISCO._

---

## 1. Audit de l'existant — Ce qui est déjà construit

### Couche données (`src/data/ummiscoData.ts` + `src/lib/db/index.ts`)
- Interfaces TypeScript complètes : `Researcher`, `Publication`, `Dataset`,
  `SeminarEvent`, `DBUser`, `DBPublication`, `DBDataset`, `DBSimulation`, `DBEvent`,
  `DBPartner`
- Store in-memory (singleton `Map`) avec seed : 5 users, 6 publications, 4 datasets,
  4 événements, 6 partenaires
- **Problème** : les 5 AXES locaux (`epidemiology`, `iot`, `citizen-science`,
  `environment`, `fablab`) ne correspondent **pas** aux 4 axes officiels UMMISCO UMI 209
  documentés dans les PDFs fournis.

### Backend (`src/app/api/`)
Toutes les routes sont présentes et fonctionnelles :
`auth/login`, `auth/register`, `auth/me`, `publications` (CRUD + mine + all),
`datasets` (list + download ACL), `simulations` (list + run + [id] polling),
`events` (list + register), `newsletter`, `contact`, `chat`, `users`, `partners`

### Frontend — Pages
| Page | État réel |
|------|-----------|
| `/` (homepage) | ✅ Complet : Hero, search temps réel, stats, axes, publications, datasets, chercheurs, events, doctorats, écosystème, ACL form, contact, newsletter |
| `/axes` | ⚠️ À vérifier |
| `/publications` | ⚠️ À vérifier |
| `/datasets` | ⚠️ À vérifier |
| `/simulations` | ⚠️ À vérifier |
| `/equipe` | ⚠️ À vérifier |
| `/partenaires` | ⚠️ À vérifier |
| `/actualites` | ⚠️ À vérifier |
| `/connexion` | ✅ Formulaire login/register avec JWT |
| `/dashboard` | ⚠️ Incomplet (onglets publications/datasets/simulations en cours) |
| `/admin` | ⚠️ À vérifier |
| `/chercheurs/[id]` | ⚠️ À vérifier |

### Composants
`Navigation` (sticky, dark mode toggle, fr/en, auth state, mobile menu),
`Footer`, `LogoUmmisco` (SVG animé), `ChatWidget` (streaming GROQ endpoint),
`StatsCounter` (animation count-up), `PublicationCard`, `Providers`

### Contextes
`ThemeContext` (dark/light + localStorage), `LangContext` (fr/en + `t()` hook),
`AuthContext` (JWT + 5 rôles : directeur / chercheur / etudiant / partenaire /
responsable_axe)

### Thème
`globals.css` définit correctement les custom properties pour dark/light.
**Problème critique** : `page.tsx` utilise des classes Tailwind hardcodées
(`bg-slate-950`, `text-slate-100`) qui n'utilisent pas ces custom properties —
le mode clair est donc brisé sur la homepage.

---

## 2. Problèmes identifiés par priorité

### P1 — Critique (visible immédiatement)

| # | Problème | Localisation |
|---|----------|-------------|
| P1-1 | **Light mode brisé** : classes hardcodées `bg-slate-950/text-slate-100` dans `page.tsx` ne s'adaptent pas aux CSS custom properties | `src/app/page.tsx` |
| P1-2 | **AXES incorrects** : 5 axes locaux au lieu des 4 axes officiels UMMISCO UMI 209 | `src/data/ummiscoData.ts` |
| P1-3 | **Données fictives** : chercheurs, publications et centres ne reflètent pas les membres réels (94 membres, 5 centres, 29 projets) | `src/data/ummiscoData.ts`, `src/lib/db/index.ts` |

### P2 — Important (qualité perçue)

| # | Problème | Localisation |
|---|----------|-------------|
| P2-1 | **Chatbot system prompt générique** — ne connaît pas UMMISCO | `src/app/api/chat/route.ts` |
| P2-2 | **Pages incomplètes** : simulations, admin, actualites retournent contenu vide | pages concernées |
| P2-3 | **Dashboard** : onglets publications/datasets/simulations non finalisés | `src/app/dashboard/page.tsx` |
| P2-4 | **Profil chercheur** : ORCID non cliquable, publications liées absentes | `src/app/chercheurs/[id]/page.tsx` |
| P2-5 | **Navigation mobile** : liens auth/rôle non affichés correctement | `src/components/Navigation.tsx` |

### P3 — Mineur (polish final)

| # | Problème | Localisation |
|---|----------|-------------|
| P3-1 | Stats homepage : valeurs locales (6 pubs) vs réels UMMISCO (1972 pubs, 94 membres) | `src/app/page.tsx` |
| P3-2 | Footer : copyright hardcodé 2024, liens réseaux sociaux morts | `src/components/Footer.tsx` |
| P3-3 | Traductions manquantes en `en.json` (clés brutes affichées) | `src/locales/en.json` |
| P3-4 | Grille axes homepage : 5 colonnes fixes, écrasées sur tablette | `src/app/page.tsx` |
| P3-5 | `bg-blue-600` hardcodé au lieu de `bg-ummisco-blue` | Plusieurs composants |

---

## 3. Données UMMISCO réelles (d'après les PDFs)

### Les 4 axes officiels (à remplacer dans `AXES`)
```typescript
{ id: "agents",       name: "Modélisation mathématique et informatique à base d'agents" }
{ id: "ia",          name: "Intelligence Artificielle et Apprentissage Profond" }
{ id: "capteurs",    name: "Capteurs et collecte de données" }
{ id: "participatif",name: "Approches participatives et science citoyenne" }
```

### Les 5 centres
| Centre | Pays | Tutelle | Directeur |
|--------|------|---------|-----------|
| Centre France | France | IRD + Sorbonne Université | Nicolas Marilleau |
| Centre Asie du Sud-Est | Vietnam | VinUniversity | Alexis Drogoul |
| Centre Afrique de l'Ouest | Sénégal | UCAD | Alassane BAH |
| Centre Afrique centrale et de l'est | Cameroun | Université de Yaoundé 1 | — |
| Centre Méditerranée | Maroc | Université Cadi Ayyad | Khalil Ezzinbi |

### Chiffres réels (homepage stats)
- **1972 publications** · **94 membres** · **29 projets** · **5 centres**

### Projets clés à inclure dans le seed
DiDEM · HABITABLE · DigEpi · Waqatali · COMOKIT · ANR MaGnuM · RDT Smart Reader ·
U2worm · AIRQALY-4-ASMAFRI · DOM · SIMPLE · ESCAPE · GENSTAR · AIME · I-MAROC

### Logiciels développés par UMMISCO
GAMA Platform · COMOKIT · Ichthyop · Kendrick · EPICAM

---

## 4. Plan d'exécution

### Phase A — Fondations données (P1-2, P1-3) — ~2h

**A1. Mettre à jour `src/data/ummiscoData.ts`**
- Remplacer les 5 axes par les 4 axes officiels UMMISCO
- Ajouter une interface `Center` avec les 5 centres géographiques
- Ajouter une interface `Project` avec les projets réels
- Enrichir `RESEARCHERS` avec au moins 2–3 membres réels par centre (issus des PDFs)
- Mettre à jour `PUBLICATIONS` pour référencer les nouveaux axes
- Ajouter `SOFTWARE_TOOLS` (GAMA, COMOKIT, Ichthyop…)

**A2. Mettre à jour le seed `src/lib/db/index.ts`**
- Aligner les `DBPublication` existantes sur les nouveaux axes
- Ajouter des projets et partenaires tirés des PDFs
- Mettre à jour les chiffres stats : 1972 publications, 94 membres, 29 projets

---

### Phase B — Correction thème (P1-1) — ~1h

**B1. Corriger `src/app/page.tsx`**
- Remplacer les classes hardcodées dark-only par des classes qui utilisent les
  custom properties de `globals.css`
- Stratégie : utiliser `bg-[var(--background)]`, `text-[var(--foreground)]` là où
  le dark/light doit s'adapter, ou ajouter des classes utilitaires dans `globals.css`

**B2. Vérifier les autres pages**
- S'assurer que `axes`, `publications`, `datasets`, `simulations`, etc.
  utilisent aussi les classes adaptatives

---

### Phase C — Pages incomplètes (P2-2, P2-3) — ~3h

**C1. Finaliser `/simulations`**
- Formulaire paramétrage (type SIR/SEIR, N population, β, γ, durée en jours)
- Graphe de résultats (canvas/SVG ou bibliothèque légère)
- Polling statut `en_cours` → `terminee`
- Export CSV

**C2. Finaliser `/admin`**
- Queue publications `en_attente` → valider / rejeter (appel API PUT)
- Liste utilisateurs avec modification de rôle
- Compteurs globaux

**C3. Finaliser `/actualites`**
- Timeline événements (séminaires, conférences, ateliers)
- Filtres type + date
- Inscription en ligne (appel API POST `/api/events/[id]/register`)

**C4. Finaliser `/dashboard`**
- Onglet publications : validation formulaire + retours erreur
- Onglet datasets : dépôt avec métadonnées
- Onglet simulations : historique + relance
- Édition profil (bio, expertises, ORCID)

---

### Phase D — Enrichissements qualité (P2-1, P2-4, P3-x) — ~2h

**D1. System prompt chatbot UMMISCO (`/api/chat/route.ts`)**
Injecter un prompt système couvrant :
- Les 4 axes, 5 centres, 29 projets, 94 membres
- Les logiciels (GAMA, COMOKIT, Ichthyop, Kendrick, EPICAM)
- Ton : assistant scientifique francophone, factuel, précis
- Langues : répond dans la langue de l'utilisateur (fr/en)

**D2. Page `/chercheurs/[id]`**
- Publications filtrées par `authorIds`
- Datasets créés (filtrés par `creatorId`)
- ORCID cliquable → `https://orcid.org/{orcid}`
- Centre de rattachement affiché

**D3. Footer — copyright dynamique**
```tsx
© {new Date().getFullYear()} UMMISCO UMI 209
```

**D4. Stats homepage — chiffres réels**
`value={1972}` · `value={94}` · `value={29}` · `value={5}`

**D5. Traductions `en.json`**
Auditer toutes les clés utilisées dans les nouvelles pages et les compléter.

**D6. Responsive axes**
Grille : `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` (4 axes = 4 colonnes max)

---

## 5. Architecture conservée

```
Next.js 16 App Router
├── src/app/api/          # Route Handlers (backend Node.js)
├── src/app/(pages)/      # Pages (Client/Server Components)
├── src/components/       # UI réutilisables
├── src/context/          # Auth + Theme + Lang
├── src/data/             # Seed statique (ummiscoData.ts)
├── src/lib/db/           # In-memory store (dev)
├── src/lib/auth.ts       # JWT helpers (jose)
└── src/locales/          # fr.json / en.json
```

**Pas de base de données externe** pour la démo (in-memory Map).  
**Pas de nouveaux packages** — la stack est complète.

---

## 6. Conventions

- **Thème** : toujours via CSS custom properties — pas de classes slate-*
  hardcodées dans les pages.
- **Traductions** : toute chaîne visible passe par `t("clé")`.
- **Auth** : dashboard/admin vérifient `isAuthenticated` et redirigent si nécessaire.
- **Commentaires** : uniquement si la logique est non évidente.
- **Server Components** par défaut — `"use client"` seulement si hooks/events/animation.

---

## 7. Ordre d'exécution recommandé

```
A1 → A2   (données UMMISCO réelles)
B1 → B2   (thème light corrigé)
C1 → C3   (pages haute visibilité)
C2 → C4   (back-office + dashboard)
D1 → D6   (polish et qualité)
```

_Durée estimée totale : 3–4 sessions de travail._

