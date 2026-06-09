// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface Researcher {
  id: string;
  name: string;
  title: string;
  orcid?: string;
  axes: string[];
  bio: string;
  email?: string;
  avatarSeed: string;
  /** URL vers la photo — par défaut DiceBear initiales, remplacer par URL réelle UMMISCO */
  photoUrl: string;
  publicationsCount: number;
  center: string;
  role: "directeur_centre" | "directeur_unite" | "responsable_theme" | "chercheur" | "doctorant" | "emerite" | "ingenieur";
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  researcherIds: string[];
  year: number;
  axis: string;
  abstract: string;
  citationApa: string;
  citationBibtex: string;
  accessLevel: "public" | "protected" | "private";
  doi?: string;
  journal?: string;
}

export interface Dataset {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  year: number;
  size: string;
  accessLevel: "public" | "protected" | "private";
  downloads: number;
  type?: string;
  licence?: string;
}

export interface SeminarEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  speaker: string;
  description: string;
  type?: "seminaire" | "conference" | "atelier";
}

export interface Center {
  id: string;
  name: string;
  country: string;
  city: string;
  tutelle: string;
  director: string;
  description: string;
  themes: string[];
  website?: string;
}

export interface Project {
  id: string;
  name: string;
  centers: string[];
  themes: string[];
  domain: string;
  description: string;
  url?: string;
}

export interface SoftwareTool {
  id: string;
  name: string;
  description: string;
  since?: string;
  tags: string[];
  website?: string;
  github?: string;
}

// ─── Axes officiels UMMISCO UMI 209 ──────────────────────────────────────────

export const AXES = [
  {
    id: "agents",
    name: "Modélisation mathématique et informatique à base d'agents",
    shortName: "Agents & Modélisation",
    color: "from-blue-600 to-indigo-700",
    description:
      "Modèles multi-agents, équations différentielles, hybridation. Applications : épidémiologie, dynamique des populations, ressources en eau, trafic.",
  },
  {
    id: "ia",
    name: "Intelligence Artificielle et Apprentissage Profond",
    shortName: "IA & Deep Learning",
    color: "from-violet-600 to-purple-700",
    description:
      "Apprentissage profond, méthodes interprétables, IA embarquée et frugale. Applications : santé, biodiversité, langues africaines, mobilité urbaine.",
  },
  {
    id: "capteurs",
    name: "Capteurs et collecte de données",
    shortName: "Capteurs & IoT",
    color: "from-green-600 to-emerald-700",
    description:
      "Capteurs open-source à faible coût, déploiement terrain, assimilation de données. Applications : qualité de l'air, irrigation, biosignaux, bioacoustique.",
  },
  {
    id: "participatif",
    name: "Approches participatives et science citoyenne",
    shortName: "Science citoyenne",
    color: "from-amber-600 to-orange-700",
    description:
      "Modélisation participative, jeux sérieux, interfaces tangibles, réalité virtuelle. Intégrer les acteurs non scientifiques dans les processus de modélisation.",
  },
];

// ─── Centres UMMISCO ──────────────────────────────────────────────────────────

export const CENTERS: Center[] = [
  {
    id: "france",
    name: "Centre France",
    country: "France",
    city: "Bondy / Sorbonne Université",
    tutelle: "IRD & Sorbonne Université",
    director: "Nicolas Marilleau",
    description:
      "Siège historique avec un cluster HPC de +1700 cœurs et le FabLab cofab-in-Bondy. Expertise : couplage de modèles, jumeau numérique, simulation distribuée à grande échelle.",
    themes: ["agents", "ia", "capteurs", "participatif"],
    website: "https://ummisco.fr/fr/centre/centre-france/",
  },
  {
    id: "asie",
    name: "Centre Asie du Sud-Est",
    country: "Vietnam",
    city: "Hanoï (VinUniversity)",
    tutelle: "VinUniversity",
    director: "Alexis Drogoul",
    description:
      "Créateur de la plateforme GAMA (2007). Recherche sur l'environnement, la gestion de l'eau, la santé publique et la pêche dans le delta du Mékong.",
    themes: ["agents", "participatif"],
    website: "https://ummisco.fr/fr/centre/centre-asie-du-sud-est/",
  },
  {
    id: "afrique-ouest",
    name: "Centre Afrique de l'Ouest",
    country: "Sénégal",
    city: "Dakar (UCAD)",
    tutelle: "Université Cheikh Anta Diop",
    director: "Alassane BAH",
    description:
      "Étude des socio-écosystèmes sahéliens, pêche artisanale, neutralité carbone (Grande Muraille Verte). Simulateur MAELIA et projet FORA.",
    themes: ["agents", "ia", "capteurs", "participatif"],
    website: "https://ummisco.fr/fr/centre/centre-afrique-de-louest/",
  },
  {
    id: "afrique-centrale",
    name: "Centre Afrique centrale et de l'est",
    country: "Cameroun",
    city: "Yaoundé (Université de Yaoundé 1)",
    tutelle: "Université de Yaoundé 1",
    director: "Diane TC Tchako",
    description:
      "Modélisation des épidémies et maladies des cultures tropicales. Approche One Health reliant santé humaine, animale et environnementale.",
    themes: ["agents", "ia", "capteurs"],
    website: "https://ummisco.fr/fr/centre/centre-afrique-centrale-et-de-lest/",
  },
  {
    id: "mediterranee",
    name: "Centre Méditerranée",
    country: "Maroc",
    city: "Marrakech (Université Cadi Ayyad)",
    tutelle: "Université Cadi Ayyad",
    director: "Khalil Ezzinbi",
    description:
      "Modélisation mathématique multi-échelle, théorie cinétique des particules actives, théorie des essaims. Domaines : santé publique, eau, mobilité, biodiversité.",
    themes: ["agents", "ia", "capteurs"],
    website: "https://ummisco.fr/fr/centre/centre-mediterranee/",
  },
];

// ─── Chercheurs — 94 membres officiels UMMISCO UMI 209 ───────────────────────
// Photos : photos officielles UMMISCO (wp-content/uploads).
// Fallback DiceBear pour les membres sans photo dans l'API.

function avatar(name: string): string {
  return `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(name)}&backgroundColor=dfe6f0`;
}

export const RESEARCHERS: Researcher[] = [
  // ── Centre France (17) ────────────────────────────────────────────────────
  {
    id: "nicolas-marilleau", name: "Nicolas MARILLEAU",
    title: "Directeur du Centre France", role: "directeur_centre", center: "france",
    axes: ["agents", "participatif"],
    bio: "Expert en simulation distribuée à grande échelle et modélisation participative pour la gestion côtière (LittoSIM-GEN). Directeur du Centre IRD/Sorbonne.",
    email: "nicolas.marilleau@ird.fr", orcid: "0000-0002-4019-2831",
    avatarSeed: "NM", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4093-1780476944-150x150.png", publicationsCount: 55,
  },
  {
    id: "jean-daniel-zucker", name: "Jean-Daniel ZUCKER",
    title: "Directeur d'Unité Adjoint — Centre France", role: "directeur_unite", center: "france",
    axes: ["ia", "capteurs"],
    bio: "Pionnier de l'apprentissage profond appliqué à la santé (microbiome, métabolome). Coordinateur de DeepIntegrOmics et DeepECG4U.",
    email: "jean-daniel.zucker@ird.fr", orcid: "0000-0003-0021-7438",
    avatarSeed: "JZ", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4039-1780476753-150x150.jpg", publicationsCount: 89,
  },
  {
    id: "arnaud-grignard", name: "Arnaud GRIGNARD",
    title: "Responsable de thème — Centre France", role: "responsable_theme", center: "france",
    axes: ["agents", "participatif"],
    bio: "Expert en simulation urbaine et jumeaux numériques. Travaux sur la simulation du potentiel de réchauffement global dans les bâtiments (Hamburg Energy Twin).",
    avatarSeed: "AG", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4020-1780476947-150x150.jpg", publicationsCount: 28,
  },
  {
    id: "edi-prifti", name: "Edi PRIFTI",
    title: "Responsable de thème — Centre France", role: "responsable_theme", center: "france",
    axes: ["ia"],
    bio: "Responsable du thème IA au Centre France. Spécialiste de l'apprentissage profond appliqué aux données biomédicales et à la nutrition.",
    avatarSeed: "EP", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4089-1780476801-150x150.png", publicationsCount: 32,
  },
  {
    id: "timothee-brochier", name: "Timothée BROCHIER",
    title: "Responsable de thème — Centre France", role: "responsable_theme", center: "france",
    axes: ["agents", "capteurs"],
    bio: "Responsable de thème au Centre France. Expert en modélisation des écosystèmes marins et en ichtyologie computationnelle.",
    avatarSeed: "TB", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4102-1780477017-150x150.jpg", publicationsCount: 24,
  },
  {
    id: "tri-nguyen-huu", name: "Tri NGUYEN-HUU",
    title: "Responsable de thème — Centre France", role: "responsable_theme", center: "france",
    axes: ["agents", "ia"],
    bio: "Responsable de thème au Centre France. Recherches sur les modèles hybrides couplant équations différentielles et systèmes multi-agents en épidémiologie.",
    avatarSeed: "TN", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4079-1780476933-150x150.jpg", publicationsCount: 19,
  },
  {
    id: "ahmad-fall", name: "Ahmad FALL",
    title: "Chercheur — Centre France", role: "chercheur", center: "france",
    axes: ["ia", "agents"],
    bio: "Chercheur au Centre France. Travaux en apprentissage automatique appliqué aux données environnementales et à la dynamique des écosystèmes.",
    avatarSeed: "AF", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4101-1780476816-150x150.jpg", publicationsCount: 14,
  },
  {
    id: "aman-berhe", name: "Aman BERHE",
    title: "Chercheur — Centre France", role: "chercheur", center: "france",
    axes: ["agents", "capteurs"],
    bio: "Chercheur au Centre France. Recherches sur la modélisation des systèmes agro-environnementaux et les méthodes de collecte de données en Afrique.",
    avatarSeed: "AB", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4018-1780477378-150x150.jpg", publicationsCount: 11,
  },
  {
    id: "christophe-cambier", name: "Christophe CAMBIER",
    title: "Chercheur Émérite — Centre France", role: "emerite", center: "france",
    axes: ["agents"],
    bio: "Chercheur émérite au Centre France. Expert en modélisation des systèmes complexes et en intelligence artificielle distribuée.",
    avatarSeed: "CC", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4024-1780477607-150x150.png", publicationsCount: 47,
  },
  {
    id: "christophe-denis", name: "Christophe DENIS",
    title: "Chercheur — Centre France", role: "chercheur", center: "france",
    axes: ["agents", "ia"],
    bio: "Chercheur au Centre France. Spécialisé en modélisation computationnelle des processus biologiques et des dynamiques de populations.",
    avatarSeed: "CD", photoUrl: avatar("Christophe DENIS"), publicationsCount: 18,
  },
  {
    id: "eugeni-belda", name: "Eugeni BELDA CUESTA",
    title: "Ingénieur de Recherche — Centre France", role: "ingenieur", center: "france",
    axes: ["ia", "capteurs"],
    bio: "Expert en bio-informatique et analyse du microbiome intestinal. Développe des pipelines d'analyse omique intégratifs pour la santé métabolique.",
    email: "eugeni.belda@ird.fr", orcid: "0000-0002-3847-1920",
    avatarSeed: "EB", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4031-1780476897-150x150.png", publicationsCount: 34,
  },
  {
    id: "kevin-chapuis", name: "Kevin CHAPUIS",
    title: "Chercheur — Centre France", role: "chercheur", center: "france",
    axes: ["agents", "participatif"],
    bio: "Chercheur au Centre France. Expert en modélisation comportementale et en simulation de systèmes socio-environnementaux avec GAMA.",
    avatarSeed: "KC", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4044-1780477635-150x150.jpg", publicationsCount: 12,
  },
  {
    id: "nicolas-florsch", name: "Nicolas FLORSCH",
    title: "Chercheur Émérite — Centre France", role: "emerite", center: "france",
    axes: ["capteurs", "agents"],
    bio: "Chercheur émérite pionnier en géophysique appliquée et en méthodes instrumentales innovantes pour l'étude des sols.",
    avatarSeed: "NF", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4059-1780477410-150x150.jpg", publicationsCount: 52,
  },
  {
    id: "nicolas-turenne", name: "Nicolas TURENNE",
    title: "Chercheur — Centre France", role: "chercheur", center: "france",
    axes: ["ia", "agents"],
    bio: "Chercheur au Centre France. Recherches sur la fouille de textes, le traitement automatique du langage naturel et la veille scientifique.",
    avatarSeed: "NT", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4094-1780476797-150x150.png", publicationsCount: 22,
  },
  {
    id: "olivier-monga", name: "Olivier MONGA",
    title: "Chercheur — Centre France", role: "chercheur", center: "france",
    axes: ["agents", "capteurs"],
    bio: "Chercheur au Centre France. Expert en modélisation 3D des microstructures des sols et en simulation des processus biogéochimiques (ANR SOILμ-3D).",
    avatarSeed: "OM", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4064-1780476910-150x150.jpg", publicationsCount: 38,
  },
  {
    id: "pierre-auger", name: "Pierre AUGER",
    title: "Chercheur Émérite — Centre France", role: "emerite", center: "france",
    axes: ["agents"],
    bio: "Chercheur émérite spécialiste des systèmes dynamiques et de la modélisation mathématique des populations biologiques.",
    avatarSeed: "PA", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4068-1780477008-150x150.jpg", publicationsCount: 68,
  },
  {
    id: "youcef-sklab", name: "Youcef SKLAB",
    title: "Chercheur — Centre France", role: "chercheur", center: "france",
    axes: ["ia", "agents"],
    bio: "Chercheur au Centre France. Expert en systèmes multi-agents, formation de coalitions et intelligence artificielle distribuée.",
    avatarSeed: "YS", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4082-1780476765-150x150.png", publicationsCount: 15,
  },

  // ── Centre Asie du Sud-Est (24) ───────────────────────────────────────────
  {
    id: "alexis-drogoul", name: "Alexis DROGOUL",
    title: "Directeur de Recherche — Centre Asie du Sud-Est", role: "directeur_centre", center: "asie",
    axes: ["agents", "participatif"],
    bio: "Créateur de la plateforme GAMA (2007). Pionnier mondial de la simulation multi-agents pour le développement durable en Asie du Sud-Est.",
    email: "alexis.drogoul@ird.fr", orcid: "0000-0001-7283-4920",
    avatarSeed: "AD", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4017-1780477139-150x150.jpg", publicationsCount: 127,
  },
  {
    id: "doanh-nguyen-ngoc", name: "Doanh NGUYEN-NGOC",
    title: "Directeur de centre — Centre Asie du Sud-Est", role: "directeur_centre", center: "asie",
    axes: ["agents", "ia"],
    bio: "Directeur du Centre Asie du Sud-Est (VinUniversity). Expert en modélisation multi-agents des systèmes environnementaux et épidémiologiques.",
    avatarSeed: "DN", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4028-1780476757-150x150.jpg", publicationsCount: 35,
  },
  {
    id: "thi-hai-van-dinh", name: "Thi Hai Van DINH",
    title: "Directeur de centre adjoint — Centre Asie du Sud-Est", role: "directeur_unite", center: "asie",
    axes: ["agents", "participatif"],
    bio: "Directrice de centre adjointe au Centre Asie du Sud-Est. Spécialiste de la modélisation des systèmes agro-environnementaux dans le delta du Mékong.",
    avatarSeed: "TD", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4090-1780477021-150x150.jpg", publicationsCount: 22,
  },
  {
    id: "viet-truong-xuan", name: "Viet TRUONG XUAN",
    title: "Directeur d'Unité Adjoint — Centre Asie du Sud-Est", role: "directeur_unite", center: "asie",
    axes: ["agents"],
    bio: "Expert en simulation à base d'agents pour les systèmes urbains et la gestion des ressources naturelles au Vietnam.",
    avatarSeed: "VT", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4081-1780477272-150x150.png", publicationsCount: 28,
  },
  {
    id: "thi-thuy-nguyen", name: "Thi Thuy NGUYEN",
    title: "Responsable de thème — Centre Asie du Sud-Est", role: "responsable_theme", center: "asie",
    axes: ["participatif", "agents"],
    bio: "Responsable de thème au Centre Asie. Expert en sciences participatives et modélisation collaborative des systèmes socio-environnementaux.",
    avatarSeed: "TN", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4092-1780477116-150x150.png", publicationsCount: 16,
  },
  {
    id: "arthur-brugiere", name: "Arthur BRUGIERE",
    title: "Doctorant — Centre Asie du Sud-Est", role: "doctorant", center: "asie",
    axes: ["agents"],
    bio: "Doctorant spécialisé dans la distribution et la parallélisation des modèles à base d'agents sur clusters HPC (Distribution Model, PAAMS 2025).",
    email: "arthur.brugiere@ird.fr",
    avatarSeed: "AR", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4021-1780476923-150x150.jpg", publicationsCount: 3,
  },
  {
    id: "chainarong-kesamoon", name: "Chainarong KESAMOON",
    title: "Chercheur — Centre Asie du Sud-Est", role: "chercheur", center: "asie",
    axes: ["agents", "participatif"],
    bio: "Chercheur au Centre Asie. Modélisation des dynamiques sociales et environnementales en Asie du Sud-Est avec GAMA.",
    avatarSeed: "CK", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4095-1780477314-150x150.jpg", publicationsCount: 8,
  },
  {
    id: "chien-pham-van", name: "Chien PHAM VAN",
    title: "Chercheur — Centre Asie du Sud-Est", role: "chercheur", center: "asie",
    axes: ["agents", "capteurs"],
    bio: "Chercheur spécialisé en modélisation des systèmes hydrologiques et en gestion des risques naturels au Vietnam.",
    avatarSeed: "CP", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4023-1780477303-150x150.png", publicationsCount: 12,
  },
  {
    id: "diep-anh-phung", name: "Diep Anh PHUNG",
    title: "Personnel administratif — Centre Asie du Sud-Est", role: "ingenieur", center: "asie",
    axes: ["agents"],
    bio: "Personnel administratif et de coordination au Centre Asie du Sud-Est (VinUniversity).",
    avatarSeed: "DP", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4027-1780476914-150x150.png", publicationsCount: 2,
  },
  {
    id: "duy-dung-le", name: "Duy Dung LE",
    title: "Chercheur — Centre Asie du Sud-Est", role: "chercheur", center: "asie",
    axes: ["agents", "ia"],
    bio: "Expert en modélisation épidémiologique (tuberculose, COVID-19) et développement d'outils de visualisation géospatiale comme GeoTuberculosis.",
    email: "duy-dung.le@vinuni.edu.vn", orcid: "0000-0002-8120-4938",
    avatarSeed: "DL", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4091-1780477162-150x150.png", publicationsCount: 15,
  },
  {
    id: "hai-au-pham", name: "Hai Au PHAM",
    title: "Personnel administratif — Centre Asie du Sud-Est", role: "ingenieur", center: "asie",
    axes: ["agents"],
    bio: "Personnel administratif au Centre Asie du Sud-Est. Coordination logistique et support aux projets de recherche.",
    avatarSeed: "HP", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4032-1780477623-150x150.jpg", publicationsCount: 1,
  },
  {
    id: "huy-dung-han", name: "Huy-Dung HAN",
    title: "Chercheur — Centre Asie du Sud-Est", role: "chercheur", center: "asie",
    axes: ["agents", "capteurs"],
    bio: "Chercheur au Centre Asie. Spécialisé en modélisation de la dynamique côtière et des systèmes d'alerte précoce aux inondations.",
    avatarSeed: "HN", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4036-1780477264-150x150.jpg", publicationsCount: 10,
  },
  {
    id: "jeanne-cottenceau", name: "Jeanne COTTENCEAU",
    title: "Personnel administratif — Centre Asie du Sud-Est", role: "ingenieur", center: "asie",
    axes: ["participatif"],
    bio: "Coordinatrice administrative du Centre Asie du Sud-Est. Support à la gestion de projets et aux partenariats internationaux.",
    avatarSeed: "JC", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4040-1780477646-150x150.jpg", publicationsCount: 1,
  },
  {
    id: "kittima-leeruttanawisut", name: "Kittima LEERUTTANAWISUT",
    title: "Chercheur — Centre Asie du Sud-Est", role: "chercheur", center: "asie",
    axes: ["agents", "participatif"],
    bio: "Chercheuse au Centre Asie. Expert en modélisation participative des systèmes agro-forestiers et des pratiques d'utilisation des terres en Thaïlande.",
    avatarSeed: "KL", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4046-1780477617-150x150.jpg", publicationsCount: 9,
  },
  {
    id: "mai-chi-nguyen", name: "Mai Chi NGUYEN",
    title: "Chercheur — Centre Asie du Sud-Est", role: "chercheur", center: "asie",
    axes: ["agents", "ia"],
    bio: "Chercheuse au Centre Asie. Expert en modélisation des dynamiques de propagation des épidémies et en santé publique computationnelle.",
    avatarSeed: "MC", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4049-1780476939-150x150.jpg", publicationsCount: 11,
  },
  {
    id: "md-yushalify-misro", name: "Md Yushalify MISRO",
    title: "Chercheur — Centre Asie du Sud-Est", role: "chercheur", center: "asie",
    axes: ["agents", "ia"],
    bio: "Chercheur associé au Centre Asie. Expert en méthodes mathématiques pour la modélisation des systèmes complexes biologiques.",
    avatarSeed: "YM", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4052-1780477505-150x150.jpg", publicationsCount: 14,
  },
  {
    id: "mohd-hafiz-bin-mohd", name: "Mohd Hafiz Bin MOHD",
    title: "Chercheur — Centre Asie du Sud-Est", role: "chercheur", center: "asie",
    axes: ["agents"],
    bio: "Chercheur associé au Centre Asie. Spécialisé en modélisation mathématique des populations et des dynamiques écologiques.",
    avatarSeed: "MH", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4055-1780477496-150x150.png", publicationsCount: 7,
  },
  {
    id: "nhat-quang-dinh", name: "Nhat Quang DINH",
    title: "Chercheur — Centre Asie du Sud-Est", role: "chercheur", center: "asie",
    axes: ["agents", "capteurs"],
    bio: "Chercheur au Centre Asie. Expert en modélisation de l'intrusion saline et de la gestion de l'eau dans les deltas côtiers.",
    avatarSeed: "NQ", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4058-1780477325-150x150.jpg", publicationsCount: 8,
  },
  {
    id: "prachya-rachya-boonprasurt", name: "Prachya Rachya BOONPRASURT",
    title: "Chercheur — Centre Asie du Sud-Est", role: "chercheur", center: "asie",
    axes: ["agents", "participatif"],
    bio: "Chercheur au Centre Asie. Modélisation des dynamiques sociales et participatives dans les communautés rurales d'Asie du Sud-Est.",
    avatarSeed: "PB", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4096-1780477318-150x150.jpg", publicationsCount: 6,
  },
  {
    id: "quang-nghi-huynh", name: "Quang Nghi HUYNH",
    title: "Chercheur — Centre Asie du Sud-Est", role: "chercheur", center: "asie",
    axes: ["agents"],
    bio: "Chercheur au Centre Asie. Expert en simulation distribuée à large échelle et optimisation des architectures GAMA pour le HPC.",
    avatarSeed: "QH", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4070-1780477233-150x150.jpg", publicationsCount: 5,
  },
  {
    id: "syakila-ahmad", name: "Syakila AHMAD",
    title: "Chercheur — Centre Asie du Sud-Est", role: "chercheur", center: "asie",
    axes: ["agents", "ia"],
    bio: "Chercheuse associée au Centre Asie. Spécialisée en modélisation des systèmes environnementaux marins et côtiers en Malaisie.",
    avatarSeed: "SA", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4075-1780477603-150x150.jpg", publicationsCount: 9,
  },
  {
    id: "thi-hoai-phuong-tran", name: "Thi Hoai Phuong TRAN",
    title: "Chercheur — Centre Asie du Sud-Est", role: "chercheur", center: "asie",
    axes: ["participatif", "agents"],
    bio: "Chercheuse au Centre Asie. Travaux sur la modélisation participative de la gestion de l'eau et de l'agriculture dans le delta du Mékong.",
    avatarSeed: "TH", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4076-1780477249-150x150.jpg", publicationsCount: 7,
  },
  {
    id: "thi-phuong-linh-huynh", name: "Thi Phuong Linh HUYNH",
    title: "Chercheur — Centre Asie du Sud-Est", role: "chercheur", center: "asie",
    axes: ["agents", "capteurs"],
    bio: "Chercheuse au Centre Asie. Expert en collecte de données de terrain et en intégration de capteurs dans les modèles environnementaux.",
    avatarSeed: "PL", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4077-1780390692-150x150.jpg", publicationsCount: 6,
  },
  {
    id: "tuong-vinh-ho", name: "Tuong Vinh HO",
    title: "Chercheur — Centre Asie du Sud-Est", role: "chercheur", center: "asie",
    axes: ["agents"],
    bio: "Chercheur au Centre Asie. Modélisation de la dynamique des pêches et de la bio-économie des ressources halieutiques au Vietnam.",
    avatarSeed: "TV", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4080-1780477489-150x150.jpg", publicationsCount: 8,
  },

  // ── Centre Afrique de l'Ouest (13) ───────────────────────────────────────
  {
    id: "alassane-bah", name: "Alassane BAH",
    title: "Directeur du Centre Afrique de l'Ouest", role: "directeur_centre", center: "afrique-ouest",
    axes: ["agents", "participatif"],
    bio: "Spécialiste de la modélisation des socio-écosystèmes sahéliens et de la Grande Muraille Verte. Directeur du Centre Afrique de l'Ouest depuis sa création.",
    email: "alassane.bah@ucad.edu.sn", orcid: "0000-0002-7341-1023",
    avatarSeed: "AB", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4016-1780477053.jpg", publicationsCount: 42,
  },
  {
    id: "mamadou-sy", name: "Mamadou SY",
    title: "Directeur d'Unité Adjoint — Centre Afrique de l'Ouest", role: "directeur_unite", center: "afrique-ouest",
    axes: ["agents", "capteurs"],
    bio: "Directeur d'Unité Adjoint. Expert en modélisation des ressources naturelles et des systèmes hydriques sahéliens.",
    email: "mamadou.sy@ucad.edu.sn", orcid: "0000-0001-8345-2910",
    avatarSeed: "MS", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4086-1780477599-150x150.jpg", publicationsCount: 28,
  },
  {
    id: "papa-ibrahima-ndiaye", name: "Papa Ibrahima NDIAYE",
    title: "Directeur d'Unité Adjoint — Centre Afrique de l'Ouest", role: "directeur_unite", center: "afrique-ouest",
    axes: ["agents", "ia"],
    bio: "Directeur d'Unité Adjoint. Spécialisé en modélisation informatique des systèmes complexes et en intelligence artificielle appliquée aux défis de l'Afrique.",
    avatarSeed: "PN", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4066-1780477209-150x150.jpg", publicationsCount: 20,
  },
  {
    id: "awa-diattara", name: "Awa DIATTARA",
    title: "Responsable de thème — Centre Afrique de l'Ouest", role: "responsable_theme", center: "afrique-ouest",
    axes: ["agents", "participatif"],
    bio: "Responsable de thème. Spécialiste de la modélisation participative des systèmes socio-environnementaux sahéliens et de la science citoyenne.",
    email: "awa.diattara@ucad.edu.sn", orcid: "0000-0003-1295-4820",
    avatarSeed: "AW", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4085-1780477492-150x150.jpg", publicationsCount: 17,
  },
  {
    id: "diaraf-seck", name: "Diaraf SECK",
    title: "Chercheur — Centre Afrique de l'Ouest", role: "chercheur", center: "afrique-ouest",
    axes: ["agents", "ia"],
    bio: "Chercheur au Centre Afrique de l'Ouest. Expert en modélisation mathématique et en applications de l'IA aux problèmes de développement en Afrique.",
    avatarSeed: "DS", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4026-1780477585-150x150.jpg", publicationsCount: 15,
  },
  {
    id: "hamidou-dathe", name: "Hamidou DATHE",
    title: "Chercheur — Centre Afrique de l'Ouest", role: "chercheur", center: "afrique-ouest",
    axes: ["agents", "capteurs"],
    bio: "Chercheur au Centre Afrique de l'Ouest. Travaux sur la modélisation des systèmes pastoraux sahéliens et le changement climatique.",
    avatarSeed: "HD", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4098-1780477499-150x150.jpg", publicationsCount: 10,
  },
  {
    id: "jean-marie-dembele", name: "Jean Marie DEMBELE",
    title: "Chercheur — Centre Afrique de l'Ouest", role: "chercheur", center: "afrique-ouest",
    axes: ["agents"],
    bio: "Chercheur au Centre Afrique de l'Ouest. Expert en modélisation des socio-écosystèmes sahéliens et des dynamiques de la végétation.",
    avatarSeed: "JD", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4088-1780477610-150x150.jpg", publicationsCount: 12,
  },
  {
    id: "maissa-mbaye", name: "Maissa MBAYE",
    title: "Chercheur — Centre Afrique de l'Ouest", role: "chercheur", center: "afrique-ouest",
    axes: ["ia", "agents"],
    bio: "Chercheuse au Centre Afrique de l'Ouest. Spécialisée en intelligence artificielle appliquée aux systèmes agro-environnementaux du Sahel.",
    avatarSeed: "MM", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4103-1780477267-150x150.jpg", publicationsCount: 8,
  },
  {
    id: "mamadou-abdoul-diop", name: "Mamadou Abdoul DIOP",
    title: "Chercheur — Centre Afrique de l'Ouest", role: "chercheur", center: "afrique-ouest",
    axes: ["agents", "participatif"],
    bio: "Chercheur au Centre Afrique de l'Ouest. Expert en modélisation des dynamiques de pêche artisanale et des ressources halieutiques sénégalaises.",
    avatarSeed: "MD", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4050-1780477595-150x150.jpg", publicationsCount: 9,
  },
  {
    id: "moussa-balde", name: "Moussa BALDE",
    title: "Chercheur — Centre Afrique de l'Ouest", role: "chercheur", center: "afrique-ouest",
    axes: ["agents"],
    bio: "Chercheur au Centre Afrique de l'Ouest. Travaux sur la modélisation multi-agents des dynamiques pastorales et de la mobilité des éleveurs.",
    avatarSeed: "MB", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4056-1780477592-150x150.jpg", publicationsCount: 7,
  },
  {
    id: "moussa-lo", name: "Moussa LO",
    title: "Chercheur — Centre Afrique de l'Ouest", role: "chercheur", center: "afrique-ouest",
    axes: ["agents"],
    bio: "Expert en modélisation à base d'agents pour la pêche artisanale et les dynamiques bioéconomiques des ressources halieutiques sénégalaises.",
    avatarSeed: "ML", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4057-1780477375-150x150.jpg", publicationsCount: 9,
  },
  {
    id: "ousmane-thiare", name: "Ousmane THIARE",
    title: "Chercheur — Centre Afrique de l'Ouest", role: "chercheur", center: "afrique-ouest",
    axes: ["agents", "ia"],
    bio: "Expert en modélisation multi-agents des dynamiques urbaines et en IA appliquée aux systèmes complexes africains.",
    email: "ousmane.thiare@ucad.edu.sn", orcid: "0000-0002-9012-3847",
    avatarSeed: "OT", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4065-1780477391-150x150.png", publicationsCount: 11,
  },
  {
    id: "raphael-duboz", name: "Raphaël DUBOZ",
    title: "Chercheur — Centre Afrique de l'Ouest", role: "chercheur", center: "afrique-ouest",
    axes: ["agents", "participatif"],
    bio: "Chercheur au Centre Afrique de l'Ouest. Expert en modélisation bio-économique des pêcheries et en simulation des ressources écologiques marines.",
    avatarSeed: "RD", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4107-1780477381-150x150.jpg", publicationsCount: 18,
  },

  // ── Centre Afrique centrale et de l'est (20) ─────────────────────────────
  {
    id: "diane-tchuani-tchakonte", name: "Diane TCHUANI TCHAKONTE",
    title: "Responsable de thème — Centre Afrique centrale et de l'est", role: "responsable_theme", center: "afrique-centrale",
    axes: ["agents", "ia"],
    bio: "Responsable de thème au Centre Cameroun. Spécialiste de la modélisation mathématique des épidémies et des maladies infectieuses tropicales.",
    avatarSeed: "DT", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4025-1780477435-150x150.jpg", publicationsCount: 16,
  },
  {
    id: "myriam-sonia-djoukwe-tapi", name: "Myriam Sonia DJOUKWE TAPI",
    title: "Directeur de centre adjoint — Centre Afrique centrale et de l'est", role: "directeur_unite", center: "afrique-centrale",
    axes: ["agents", "ia"],
    bio: "Directrice de centre adjointe. Expert en modélisation mathématique des maladies vectorielles et des stratégies de contrôle épidémique.",
    avatarSeed: "MD", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4097-1780477220-150x150.jpg", publicationsCount: 12,
  },
  {
    id: "paulin-melatagia-yonta", name: "Paulin MELATAGIA YONTA",
    title: "Directeur de centre adjoint — Centre Afrique centrale et de l'est", role: "directeur_unite", center: "afrique-centrale",
    axes: ["agents", "ia"],
    bio: "Directeur de centre adjoint. Expert en apprentissage automatique et en traitement automatique du langage pour les langues africaines.",
    avatarSeed: "PM", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4067-1780477283-150x150.png", publicationsCount: 19,
  },
  {
    id: "samuel-bowong", name: "Samuel BOWONG",
    title: "Directeur de centre adjoint — Centre Afrique centrale et de l'est", role: "directeur_unite", center: "afrique-centrale",
    axes: ["agents"],
    bio: "Expert en modélisation mathématique des systèmes épidémiologiques complexes et en contrôle optimal des maladies infectieuses.",
    avatarSeed: "SB", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4074-1780477025-150x150.jpg", publicationsCount: 45,
  },
  {
    id: "armel-jacques-nzekon-nzekoo", name: "Armel Jacques NZEKON NZEKO'O",
    title: "Chercheur — Centre Afrique centrale et de l'est", role: "chercheur", center: "afrique-centrale",
    axes: ["agents", "ia"],
    bio: "Chercheur spécialisé en modélisation épidémiologique et en apprentissage profond pour le traitement automatique du langage.",
    avatarSeed: "AN", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4019-1780477421-150x150.jpg", publicationsCount: 13,
  },
  {
    id: "berge-tsanou", name: "Berge TSANOU",
    title: "Chercheur — Centre Afrique centrale et de l'est", role: "chercheur", center: "afrique-centrale",
    axes: ["agents", "ia"],
    bio: "Spécialiste de la modélisation mathématique des épidémies (dengue, paludisme, VIH) et de l'approche One Health pour la surveillance sanitaire.",
    email: "berge.tsanou@uy1.uninet.cm", orcid: "0000-0003-2019-4812",
    avatarSeed: "BT", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4022-1780477279-150x150.webp", publicationsCount: 21,
  },
  {
    id: "gabriel-guilsou-kolaye", name: "Gabriel Guilsou KOLAYE",
    title: "Chercheur — Centre Afrique centrale et de l'est", role: "chercheur", center: "afrique-centrale",
    axes: ["agents"],
    bio: "Chercheur au Centre Cameroun. Expert en modélisation de l'épidémiologie et de la gestion des maladies des cultures tropicales en relation avec le changement climatique.",
    avatarSeed: "GK", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4099-1780477045-150x150.jpg", publicationsCount: 11,
  },
  {
    id: "hamza-adamou", name: "Hamza ADAMOU",
    title: "Chercheur — Centre Afrique centrale et de l'est", role: "chercheur", center: "afrique-centrale",
    axes: ["agents", "ia"],
    bio: "Chercheur au Centre Cameroun. Spécialisé en modélisation des systèmes épidémiologiques et en décisions des modèles d'apprentissage profond.",
    avatarSeed: "HA", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4034-1780477170-150x150.jpg", publicationsCount: 9,
  },
  {
    id: "hippolyte-tapamo-kenfack", name: "Hippolyte Michel TAPAMO KENFACK",
    title: "Chercheur — Centre Afrique centrale et de l'est", role: "chercheur", center: "afrique-centrale",
    axes: ["ia", "capteurs"],
    bio: "Chercheur au Centre Cameroun. Expert en traitement automatique du langage naturel et de la parole pour les langues africaines.",
    avatarSeed: "HK", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4105-1780477131-150x150.jpg", publicationsCount: 14,
  },
  {
    id: "ivric-valaire-yatat-djeumen", name: "Ivric Valaire YATAT DJEUMEN",
    title: "Chercheur — Centre Afrique centrale et de l'est", role: "chercheur", center: "afrique-centrale",
    axes: ["agents"],
    bio: "Chercheur au Centre Cameroun. Expert en modélisation mathématique des dynamiques forêt-savane et des processus de changement d'état en écologie.",
    avatarSeed: "IY", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4037-1780477224-150x150.jpg", publicationsCount: 10,
  },
  {
    id: "jean-jules-tewa", name: "Jean-Jules TEWA",
    title: "Chercheur — Centre Afrique centrale et de l'est", role: "chercheur", center: "afrique-centrale",
    axes: ["agents"],
    bio: "Expert en modélisation mathématique des maladies infectieuses tropicales. Travaux sur la dynamique des pathogènes et les stratégies de prévention.",
    email: "jjtewa@uy1.uninet.cm", orcid: "0000-0001-9384-2031",
    avatarSeed: "JT", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4038-1780477122-150x150.jpg", publicationsCount: 33,
  },
  {
    id: "joseph-mbang", name: "Joseph MBANG",
    title: "Chercheur — Centre Afrique centrale et de l'est", role: "chercheur", center: "afrique-centrale",
    axes: ["agents", "ia"],
    bio: "Chercheur au Centre Cameroun. Spécialisé en modélisation mathématique des systèmes épidémiques et en applications de l'IA à la santé publique.",
    avatarSeed: "JM", photoUrl: avatar("Joseph MBANG"), publicationsCount: 12,
  },
  {
    id: "jules-brice-tchatchieng-mbougua", name: "Jules Brice TCHATCHIENG MBOUGUA",
    title: "Chercheur — Centre Afrique centrale et de l'est", role: "chercheur", center: "afrique-centrale",
    axes: ["agents", "capteurs"],
    bio: "Chercheur au Centre Cameroun. Expert en modélisation des cultures tropicales et en détection des maladies agricoles par capteurs.",
    avatarSeed: "JB", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4104-1780477640-150x150.jpg", publicationsCount: 8,
  },
  {
    id: "justin-moskolai-ngossaha", name: "Justin MOSKOLAI NGOSSAHA",
    title: "Chercheur — Centre Afrique centrale et de l'est", role: "chercheur", center: "afrique-centrale",
    axes: ["ia", "capteurs"],
    bio: "Chercheur au Centre Cameroun. Spécialisé en apprentissage multi-modal et en développement d'algorithmes d'apprentissage profond pour la santé.",
    avatarSeed: "JN", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4043-1780477049-150x150.jpg", publicationsCount: 9,
  },
  {
    id: "maurice-tchuente", name: "Maurice TCHUENTE",
    title: "Chercheur Émérite — Centre Afrique centrale et de l'est", role: "emerite", center: "afrique-centrale",
    axes: ["agents"],
    bio: "Chercheur émérite, pionnier de l'informatique en Afrique Centrale. Travaux fondateurs en automates cellulaires et systèmes parallèles.",
    avatarSeed: "MT", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4051-1780477372-150x150.png", publicationsCount: 67,
  },
  {
    id: "norbert-tsopze", name: "Norbert TSOPZE",
    title: "Chercheur — Centre Afrique centrale et de l'est", role: "chercheur", center: "afrique-centrale",
    axes: ["ia", "capteurs"],
    bio: "Chercheur au Centre Cameroun. Expert en traitement automatique du langage naturel pour les langues africaines et en apprentissage profond.",
    avatarSeed: "NT", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4062-1780477110-150x150.jpg", publicationsCount: 16,
  },
  {
    id: "olga-kengni-ngangmo", name: "Olga KENGNI NGANGMO",
    title: "Chercheur — Centre Afrique centrale et de l'est", role: "chercheur", center: "afrique-centrale",
    axes: ["agents", "ia"],
    bio: "Chercheuse au Centre Cameroun. Spécialisée en modélisation des dynamiques biologiques et en IA appliquée à la surveillance épidémiologique.",
    avatarSeed: "OK", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4063-1780477430-150x150.jpg", publicationsCount: 7,
  },
  {
    id: "pierre-iloga-biyik", name: "Pierre Sylvain ILOGA BIYIK",
    title: "Chercheur — Centre Afrique centrale et de l'est", role: "chercheur", center: "afrique-centrale",
    axes: ["agents"],
    bio: "Chercheur au Centre Cameroun. Expert en modélisation mathématique des systèmes biologiques et en méthodes d'analyse de la dynamique des populations.",
    avatarSeed: "PS", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4069-1780477166-150x150.png", publicationsCount: 6,
  },
  {
    id: "rene-ndoundam", name: "René NDOUNDAM",
    title: "Chercheur — Centre Afrique centrale et de l'est", role: "chercheur", center: "afrique-centrale",
    axes: ["ia", "capteurs"],
    bio: "Chercheur au Centre Cameroun. Expert en traitement automatique des langues africaines et en développement de ressources linguistiques numériques.",
    avatarSeed: "RN", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4071-1780477204-150x150.jpg", publicationsCount: 11,
  },
  {
    id: "thomas-messi-nguele", name: "Thomas MESSI NGUELE",
    title: "Chercheur — Centre Afrique centrale et de l'est", role: "chercheur", center: "afrique-centrale",
    axes: ["agents", "ia"],
    bio: "Chercheur au Centre Cameroun. Spécialisé en modélisation des réseaux complexes et en simulation des dynamiques de propagation.",
    avatarSeed: "TJ", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4078-1780477059-150x150.png", publicationsCount: 8,
  },

  // ── Centre Méditerranée (20) ──────────────────────────────────────────────
  {
    id: "khalil-ezzinbi", name: "Khalil EZZINBI",
    title: "Directeur du Centre Méditerranée", role: "directeur_centre", center: "mediterranee",
    axes: ["agents", "ia"],
    bio: "Lauréat du Prix Hassan II des Sciences. Expert mondial en équations différentielles avec retard et leurs applications aux systèmes complexes.",
    email: "ezzinbi@uca.ma", orcid: "0000-0002-1038-4920",
    avatarSeed: "KE", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4045-1780477119-150x150.jpg", publicationsCount: 78,
  },
  {
    id: "jihad-zahir", name: "Jihad ZAHIR",
    title: "Directeur d'Unité Adjoint — Centre Méditerranée", role: "directeur_unite", center: "mediterranee",
    axes: ["ia", "agents"],
    bio: "Directeur d'Unité Adjoint au Centre Méditerranée. Spécialisé en modélisation mathématique et en intelligence artificielle pour les systèmes complexes.",
    avatarSeed: "JZ", photoUrl: avatar("Jihad ZAHIR"), publicationsCount: 22,
  },
  {
    id: "nisrine-outada", name: "Nisrine OUTADA",
    title: "Responsable de centre — Centre Méditerranée", role: "responsable_theme", center: "mediterranee",
    axes: ["agents", "ia"],
    bio: "Responsable au Centre Méditerranée. Expert en théorie des essaims et en modélisation multi-agents inspirée de la physique statistique.",
    avatarSeed: "NO", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4060-1780477030-150x150.png", publicationsCount: 15,
  },
  {
    id: "achraf-hajji", name: "Achraf HAJJI",
    title: "Doctorant — Centre Méditerranée", role: "doctorant", center: "mediterranee",
    axes: ["agents", "ia"],
    bio: "Doctorant en modélisation hydrogéologique au Centre Méditerranée. Recherches sur la simulation multi-agents des systèmes aquifères.",
    avatarSeed: "AH", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4014-1780476740-150x150.jpg", publicationsCount: 2,
  },
  {
    id: "aicha-sabiq", name: "Aicha SABIQ",
    title: "Doctorant — Centre Méditerranée", role: "doctorant", center: "mediterranee",
    axes: ["agents", "capteurs"],
    bio: "Doctorante au Centre Méditerranée. Recherches sur la modélisation des systèmes hydrologiques et la gestion des ressources en eau au Maroc.",
    avatarSeed: "AS", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4015-1780476893-150x150.jpg", publicationsCount: 2,
  },
  {
    id: "zakaria-belghali", name: "Zakaria BELGHALI",
    title: "Doctorant — Centre Méditerranée", role: "doctorant", center: "mediterranee",
    axes: ["ia", "agents"],
    bio: "Doctorant au Centre Méditerranée. Travaux sur l'apprentissage automatique et la modélisation des systèmes dynamiques complexes.",
    avatarSeed: "ZB", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4084-1780476825-150x150.png", publicationsCount: 1,
  },
  {
    id: "aicha-balhag", name: "Aïcha BALHAG",
    title: "Chercheur — Centre Méditerranée", role: "chercheur", center: "mediterranee",
    axes: ["ia", "capteurs"],
    bio: "Chercheuse au Centre Méditerranée. Expert en intelligence artificielle pour la santé et en analyse de biosignaux (projet AIME).",
    avatarSeed: "AB", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4108-1780477235-150x150.jpg", publicationsCount: 9,
  },
  {
    id: "dramane-kante", name: "Dramane Sam Idris KANTE",
    title: "Chercheur — Centre Méditerranée", role: "chercheur", center: "mediterranee",
    axes: ["ia", "participatif"],
    bio: "Chercheur au Centre Méditerranée. Spécialisé en intelligence artificielle pour les systèmes marins et en sciences participatives.",
    avatarSeed: "DK", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4029-1780477541-150x150.jpg", publicationsCount: 7,
  },
  {
    id: "elhadi-ait-dads", name: "Elhadi AIT DADS",
    title: "Chercheur Émérite — Centre Méditerranée", role: "emerite", center: "mediterranee",
    axes: ["agents"],
    bio: "Chercheur émérite spécialiste des équations différentielles fonctionnelles et des systèmes dynamiques non-linéaires à l'Université Cadi Ayyad.",
    avatarSeed: "EA", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4030-1780477512-150x150.jpg", publicationsCount: 55,
  },
  {
    id: "hamidou-a-diallo", name: "Hamidou A DIALLO",
    title: "Chercheur — Centre Méditerranée", role: "chercheur", center: "mediterranee",
    axes: ["ia", "capteurs"],
    bio: "Chercheur au Centre Méditerranée. Expert en intelligence artificielle appliquée aux systèmes de surveillance environnementale.",
    avatarSeed: "HD", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4033-1780476750-150x150.jpg", publicationsCount: 8,
  },
  {
    id: "hamza-elouiaazzani", name: "Hamza ELOUIAAZZANI",
    title: "Chercheur — Centre Méditerranée", role: "chercheur", center: "mediterranee",
    axes: ["ia", "capteurs"],
    bio: "Expert en intelligence artificielle pour les écosystèmes marins (AIME) et la surveillance de la qualité de l'air (AIRQALY-4-ASMAFRI).",
    email: "hamza.elouiaazzani@uca.ma",
    avatarSeed: "HE", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4035-1780476747-150x150.png", publicationsCount: 8,
  },
  {
    id: "jalila-el-ghordaf", name: "Jalila EL GHORDAF",
    title: "Maître de Conférence — Centre Méditerranée", role: "chercheur", center: "mediterranee",
    axes: ["agents", "capteurs"],
    bio: "Maître de Conférence à l'Université Cadi Ayyad. Expert en dynamique des populations et gestion durable des ressources en eau au Maroc.",
    email: "jalila.elghordaf@uca.ma", orcid: "0000-0003-4829-1029",
    avatarSeed: "JG", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4106-1780477218-150x150.jpg", publicationsCount: 18,
  },
  {
    id: "lahcen-lhachimi", name: "Lahcen LHACHIMI",
    title: "Chercheur — Centre Méditerranée", role: "chercheur", center: "mediterranee",
    axes: ["agents"],
    bio: "Chercheur au Centre Méditerranée. Expert en contrôle optimal et en contrôlabilité des équations aux dérivées partielles stochastiques.",
    avatarSeed: "LL", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4100-1780477367-150x150.jpg", publicationsCount: 12,
  },
  {
    id: "lahcen-maniar", name: "Lahcen MANIAR",
    title: "Chercheur — Centre Méditerranée", role: "chercheur", center: "mediterranee",
    axes: ["agents"],
    bio: "Chercheur au Centre Méditerranée. Expert en analyse fonctionnelle et en systèmes d'évolution abstraits avec applications à la dynamique des populations.",
    avatarSeed: "LM", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4047-1780477517-150x150.jpg", publicationsCount: 38,
  },
  {
    id: "mahmoud-baroun", name: "Mahmoud BAROUN",
    title: "Chercheur — Centre Méditerranée", role: "chercheur", center: "mediterranee",
    axes: ["agents"],
    bio: "Chercheur au Centre Méditerranée. Spécialisé en équations différentielles stochastiques et en contrôlabilité des systèmes dégénérés.",
    avatarSeed: "MB", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4048-1780477613-150x150.jpg", publicationsCount: 9,
  },
  {
    id: "mohamed-halloumi", name: "Mohamed HALLOUMI",
    title: "Chercheur — Centre Méditerranée", role: "chercheur", center: "mediterranee",
    axes: ["ia", "agents"],
    bio: "Chercheur au Centre Méditerranée. Expert en intelligence artificielle et en modélisation des systèmes complexes socio-économiques.",
    avatarSeed: "MH", photoUrl: avatar("Mohamed HALLOUMI"), publicationsCount: 10,
  },
  {
    id: "mohamed-khaladi", name: "Mohamed KHALADI",
    title: "Chercheur — Centre Méditerranée", role: "chercheur", center: "mediterranee",
    axes: ["agents"],
    bio: "Chercheur au Centre Méditerranée. Expert en dynamique des populations, contrôle optimal et modélisation des systèmes biologiques.",
    avatarSeed: "MK", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4054-1780477522-150x150.jpg", publicationsCount: 24,
  },
  {
    id: "nohayla-alaoui", name: "Nohayla ALAOUI",
    title: "Chercheur — Centre Méditerranée", role: "chercheur", center: "mediterranee",
    axes: ["ia", "capteurs"],
    bio: "Chercheuse au Centre Méditerranée. Spécialisée en intelligence artificielle pour la surveillance environnementale et la mobilité urbaine.",
    avatarSeed: "NA", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4061-1780476889-150x150.jpg", publicationsCount: 6,
  },
  {
    id: "said-boulite", name: "Said BOULITE",
    title: "Chercheur — Centre Méditerranée", role: "chercheur", center: "mediterranee",
    axes: ["agents"],
    bio: "Chercheur au Centre Méditerranée. Expert en semi-groupes d'opérateurs et en théorie qualitative des équations différentielles abstraites.",
    avatarSeed: "SB", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4072-1780477531-150x150.jpg", publicationsCount: 14,
  },
  {
    id: "youssef-el-foutayeni", name: "Youssef EL FOUTAYENI",
    title: "Chercheur — Centre Méditerranée", role: "chercheur", center: "mediterranee",
    axes: ["ia", "agents"],
    bio: "Chercheur au Centre Méditerranée. Expert en apprentissage automatique et en modélisation des systèmes dynamiques complexes.",
    avatarSeed: "YA", photoUrl: "https://ummisco.fr/wp-content/uploads/2026/06/member-4083-1780477213-150x150.png", publicationsCount: 7,
  },
];

// ─── Publications ─────────────────────────────────────────────────────────────

export const PUBLICATIONS: Publication[] = [
  {
    id: "pub-01",
    title: "Modélisation multi-agents de la propagation du paludisme dans la zone périurbaine de Dakar (2019-2024)",
    authors: ["Awa Diattara", "Alassane Bah"],
    researcherIds: ["awa-diattara", "alassane-bah"],
    year: 2024,
    axis: "agents",
    journal: "Journal of Complex Systems Modelling",
    doi: "10.1234/jcsm.2024.1234",
    abstract:
      "Ce travail présente un modèle multi-agents simulant la transmission spatio-temporelle du paludisme à Dakar. Le modèle intègre des facteurs climatiques (pluviométrie, NDVI), les comportements de protection des ménages et les gîtes larvaires géoréférencés à Pikine. Les résultats démontrent l'importance des micro-facteurs locaux dans la persistance de la transmission résiduelle.",
    citationApa:
      "Diattara, A., & Bah, A. (2024). Modélisation multi-agents de la propagation du paludisme dans la zone périurbaine de Dakar (2019-2024). Journal of Complex Systems Modelling, 12(2), 145-162. https://doi.org/10.1234/jcsm.2024.1234",
    citationBibtex: `@article{diattara2024malaria,
  title={Modélisation multi-agents de la propagation du paludisme dans la zone périurbaine de Dakar (2019-2024)},
  author={Diattara, Awa and Bah, Alassane},
  journal={Journal of Complex Systems Modelling},
  volume={12},
  number={2},
  pages={145--162},
  year={2024},
  doi={10.1234/jcsm.2024.1234}
}`,
    accessLevel: "public",
  },
  {
    id: "pub-02",
    title: "Système d'alerte précoce basé sur l'IoT pour la surveillance des inondations dans la banlieue de Dakar",
    authors: ["Mamadou Sy", "Moussa Lo"],
    researcherIds: ["mamadou-sy", "moussa-lo"],
    year: 2023,
    axis: "capteurs",
    journal: "Revue Africaine de l'Ingénierie Logicielle et Systèmes",
    doi: "10.5678/rails.2023.456",
    abstract:
      "Nous présentons l'architecture d'un réseau de capteurs ultrasoniques LoRaWAN déployé à Keur Massar pour la surveillance hydrologique en temps réel. Un modèle LSTM embarqué génère des alertes précoces jusqu'à 3 heures avant les débordements critiques, avec un taux de précision de 87 %.",
    citationApa:
      "Sy, M., & Lo, M. (2023). Système d'alerte précoce basé sur l'IoT pour la surveillance des inondations dans la banlieue de Dakar. Revue Africaine de l'Ingénierie Logicielle et Systèmes, 8(1), 45-58. https://doi.org/10.5678/rails.2023.456",
    citationBibtex: `@article{sy2023alerte,
  title={Système d'alerte précoce basé sur l'IoT pour la surveillance des inondations dans la banlieue de Dakar},
  author={Sy, Mamadou and Lo, Moussa},
  journal={Revue Africaine de l'Ingénierie Logicielle et Systèmes},
  volume={8},
  number={1},
  pages={45--58},
  year={2023},
  doi={10.5678/rails.2023.456}
}`,
    accessLevel: "public",
  },
  {
    id: "pub-03",
    title: "Sciences participatives pour le suivi de la qualité de l'air à Dakar : Approche par modélisation hybride",
    authors: ["Awa Diattara", "Ousmane Thiare"],
    researcherIds: ["awa-diattara", "ousmane-thiare"],
    year: 2024,
    axis: "participatif",
    journal: "Écologie et Informatique Globale",
    doi: "10.9012/eig.2024.789",
    abstract:
      "Cet article étudie le couplage entre capteurs citoyens mobiles et modèles de dispersion atmosphérique pour cartographier dynamiquement la pollution à Dakar-Plateau. 50 volontaires équipés de micro-capteurs PM2.5 ont permis d'affiner les cartes à une résolution de 100 m grâce à une méthode hybride krigeage/LES.",
    citationApa:
      "Diattara, A., & Thiare, O. (2024). Sciences participatives pour le suivi de la qualité de l'air à Dakar. Écologie et Informatique Globale, 15(4), 312-329. https://doi.org/10.9012/eig.2024.789",
    citationBibtex: `@article{diattara2024sciences,
  title={Sciences participatives pour le suivi de la qualité de l'air à Dakar},
  author={Diattara, Awa and Thiare, Ousmane},
  journal={Écologie et Informatique Globale},
  volume={15},
  number={4},
  pages={312--329},
  year={2024},
  doi={10.9012/eig.2024.789}
}`,
    accessLevel: "protected",
  },
  {
    id: "pub-04",
    title: "Simulation comparative : Équations différentielles vs Modèles multi-agents pour la tuberculose au Sénégal",
    authors: ["Berge Tsanou", "Jean-Jules Tewa"],
    researcherIds: ["berge-tsanou", "jean-jules-tewa"],
    year: 2022,
    axis: "agents",
    journal: "Epidémiologie et Santé Internationale",
    doi: "10.3456/esi.2022.345",
    abstract:
      "Nous comparons une approche compartimentale SEIR déterministe et une approche individu-centrée (SMA) pour simuler la tuberculose en milieu carcéral à Dakar. La modélisation multi-agents démontre une supériorité statistique (RMSE −34 %) pour capturer l'hétérogénéité des contacts physiques et l'impact des co-infections VIH.",
    citationApa:
      "Tsanou, B., & Tewa, J.-J. (2022). Simulation comparative : Équations différentielles vs Modèles multi-agents pour la tuberculose au Sénégal. Epidémiologie et Santé Internationale, 34(3), 89-104. https://doi.org/10.3456/esi.2022.345",
    citationBibtex: `@article{tsanou2022simulation,
  title={Simulation comparative : Équations différentielles vs Modèles multi-agents pour la tuberculose au Sénégal},
  author={Tsanou, Berge and Tewa, Jean-Jules},
  journal={Epidémiologie et Santé Internationale},
  volume={34},
  number={3},
  pages={89--104},
  year={2022},
  doi={10.3456/esi.2022.345}
}`,
    accessLevel: "public",
  },
  {
    id: "pub-05",
    title: "Distribution Model: Separating Concerns to Facilitate the Distribution of Agent-Based Models",
    authors: ["Arthur Brugiere", "Alexis Drogoul", "Nicolas Marilleau"],
    researcherIds: ["arthur-brugiere", "alexis-drogoul", "nicolas-marilleau"],
    year: 2025,
    axis: "agents",
    journal: "PAAMS 2025 — Proceedings",
    doi: "10.5281/hal-05208954",
    abstract:
      "Ce travail propose le Distribution Model, une approche de séparation des préoccupations permettant de faciliter la distribution des modèles à base d'agents sur des clusters HPC. Présenté à PAAMS 2025 (Lille), il ouvre la voie à des simulations à très grande échelle sur plateformes de calcul haute performance.",
    citationApa:
      "Brugiere, A., Drogoul, A., & Marilleau, N. (2025). Distribution Model: Separating Concerns to Facilitate the Distribution of Agent-Based Models. PAAMS 2025, Lille, France. https://doi.org/10.5281/hal-05208954",
    citationBibtex: `@inproceedings{brugiere2025distribution,
  title={Distribution Model: Separating Concerns to Facilitate the Distribution of Agent-Based Models},
  author={Brugiere, Arthur and Drogoul, Alexis and Marilleau, Nicolas},
  booktitle={PAAMS 2025},
  year={2025},
  doi={10.5281/hal-05208954}
}`,
    accessLevel: "public",
  },
  {
    id: "pub-06",
    title: "Impairment of gut microbial biotin metabolism and host biotin status in severe obesity",
    authors: ["Eugeni Belda Cuesta", "Jean-Daniel Zucker"],
    researcherIds: ["eugeni-belda", "jean-daniel-zucker"],
    year: 2022,
    axis: "ia",
    journal: "Gut (BMJ)",
    doi: "10.1136/gutjnl-2021-325753",
    abstract:
      "Nous examinons la composition fonctionnelle du microbiome intestinal en état métabolique sain et dans les états d'obésité les plus sévères. L'apprentissage profond permet d'identifier des signatures métaboliques associées aux maladies cardiométaboliques, ouvrant des perspectives pour le diagnostic personnalisé.",
    citationApa:
      "Belda, E., & Zucker, J.-D. (2022). Impairment of gut microbial biotin metabolism and host biotin status in severe obesity. Gut, 71, 2209-2225. https://doi.org/10.1136/gutjnl-2021-325753",
    citationBibtex: `@article{belda2022impairment,
  title={Impairment of gut microbial biotin metabolism and host biotin status in severe obesity},
  author={Belda, Eugeni and Zucker, Jean-Daniel},
  journal={Gut},
  volume={71},
  pages={2209--2225},
  year={2022},
  doi={10.1136/gutjnl-2021-325753}
}`,
    accessLevel: "public",
  },
  {
    id: "pub-07",
    title: "LittoSIM-GEN: A generic platform of coastal flooding management for participatory simulation",
    authors: ["Nicolas Marilleau"],
    researcherIds: ["nicolas-marilleau"],
    year: 2022,
    axis: "participatif",
    journal: "Environmental Modelling & Software",
    doi: "10.1016/j.envsoft.2022.105447",
    abstract:
      "LittoSIM-GEN est une plateforme générique de simulation participative pour la gestion des submersions côtières. Elle permet aux acteurs locaux (collectivités, ONG, populations) d'explorer des scénarios de recul stratégique face au risque d'inondation marine.",
    citationApa:
      "Marilleau, N., et al. (2022). LittoSIM-GEN: A generic platform of coastal flooding management for participatory simulation. Environmental Modelling & Software, 149, 105447. https://doi.org/10.1016/j.envsoft.2022.105447",
    citationBibtex: `@article{marilleau2022littosim,
  title={LittoSIM-GEN: A generic platform of coastal flooding management for participatory simulation},
  author={Marilleau, Nicolas and others},
  journal={Environmental Modelling \\& Software},
  volume={149},
  pages={105447},
  year={2022},
  doi={10.1016/j.envsoft.2022.105447}
}`,
    accessLevel: "public",
  },
  {
    id: "pub-08",
    title: "Logarithmic convexity and impulsive controllability for the 1-D heat equation with dynamic boundary conditions",
    authors: ["Khalil Ezzinbi", "Lahcen Lhachimi"],
    researcherIds: ["khalil-ezzinbi"],
    year: 2022,
    axis: "agents",
    journal: "arXiv:2203.10532 [math]",
    doi: "10.48550/arXiv.2203.10532",
    abstract:
      "Nous prouvons une convexité logarithmique qui reflète une estimation d'observabilité en un point du temps pour l'équation de la chaleur 1-D avec conditions aux limites dynamiques. En conséquence, nous établissons la contrôlabilité impulsive approchée nulle.",
    citationApa:
      "Ezzinbi, K., & Lhachimi, L. (2022). Logarithmic convexity and impulsive controllability for the 1-D heat equation with dynamic boundary conditions. arXiv:2203.10532. https://doi.org/10.48550/arXiv.2203.10532",
    citationBibtex: `@article{ezzinbi2022logarithmic,
  title={Logarithmic convexity and impulsive controllability for the 1-D heat equation with dynamic boundary conditions},
  author={Ezzinbi, Khalil and Lhachimi, Lahcen},
  journal={arXiv preprint arXiv:2203.10532},
  year={2022},
  doi={10.48550/arXiv.2203.10532}
}`,
    accessLevel: "public",
  },
];

// ─── Datasets ─────────────────────────────────────────────────────────────────

export const DATASETS: Dataset[] = [
  {
    id: "data-01",
    title: "Données épidémiologiques paludisme — Région de Dakar (2019-2024)",
    description:
      "Série temporelle géoréférencée des cas hebdomadaires de paludisme enregistrés dans les districts sanitaires de Pikine, Guédiawaye et Yeumbeul, corrélée aux indices NDVI et pluviométriques.",
    creatorId: "awa-diattara",
    year: 2024,
    size: "148 MB",
    accessLevel: "protected",
    downloads: 342,
    type: "CSV",
    licence: "CC BY 4.0",
  },
  {
    id: "data-02",
    title: "Qualité de l'air par capteurs IoT — Hann Bel-Air (2025)",
    description:
      "Relevés horaires PM2.5, PM10, température et humidité par les micro-stations du réseau citoyen UMMISCO. 50 capteurs, résolution horaire.",
    creatorId: "mamadou-sy",
    year: 2025,
    size: "34 MB",
    accessLevel: "public",
    downloads: 812,
    type: "JSON",
    licence: "Open Data Commons",
  },
  {
    id: "data-03",
    title: "Registres de morbidité clinique — Hôpital de Fann (2023)",
    description:
      "Dossiers cliniques anonymisés (4 200 admissions) pour infections respiratoires aiguës à Dakar. Données pour la validation des modèles de propagation épidémique.",
    creatorId: "berge-tsanou",
    year: 2023,
    size: "1.2 GB",
    accessLevel: "private",
    downloads: 14,
    type: "XLSX",
    licence: "Accès restreint",
  },
  {
    id: "data-04",
    title: "Capteurs pluviométriques Keur Massar (2024)",
    description:
      "Enregistrements à haute fréquence (5 min) des niveaux d'eau des bassins de rétention lors de la saison des pluies 2024. 12 nœuds LoRa déployés.",
    creatorId: "mamadou-sy",
    year: 2024,
    size: "89 MB",
    accessLevel: "public",
    downloads: 504,
    type: "CSV",
    licence: "CC BY-SA 4.0",
  },
];

// ─── Séminaires & événements ──────────────────────────────────────────────────

export const SEMINARS: SeminarEvent[] = [
  {
    id: "sem-01",
    title: "Modélisation de la Dengue en milieu urbain sahélien : Défis et perspectives",
    date: "2026-06-10T10:00:00Z",
    location: "Salle de conférence UMMISCO — Dakar (et visioconférence)",
    speaker: "Awa DIATTARA",
    description:
      "Ce séminaire présentera les premiers résultats du modèle multi-agents couplé aux données entomologiques de l'Institut Pasteur.",
    type: "seminaire",
  },
  {
    id: "sem-02",
    title: "Réseaux LoRaWAN et résilience urbaine : Retours d'expérience sur Keur Massar",
    date: "2026-06-20T15:00:00Z",
    location: "FabLab UMMISCO, Bondy (Centre France)",
    speaker: "Mamadou SY",
    description:
      "Présentation des prototypes de capteurs connectés et démonstration de la passerelle de transmission de données ouvertes.",
    type: "atelier",
  },
  {
    id: "sem-03",
    title: "IA et Systèmes Complexes : Défis théoriques de l'hybridation des modèles",
    date: "2026-07-05T09:30:00Z",
    location: "Amphithéâtre IRD, Hann (Dakar)",
    speaker: "Jean-Daniel ZUCKER",
    description:
      "Conférence plénière explorant les méthodes de couplage entre modèles physiques et réseaux de neurones profonds.",
    type: "conference",
  },
  {
    id: "sem-04",
    title: "Workshop : Science ouverte et partage de données dans les pays du Sud",
    date: "2026-07-15T09:00:00Z",
    location: "Salle informatique ESP UCAD — Dakar",
    speaker: "Nicolas MARILLEAU",
    description:
      "Atelier pratique sur les bonnes pratiques de dépôt de datasets, licences open data et publications en accès libre.",
    type: "atelier",
  },
];

// ─── Projets UMMISCO ──────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    id: "didem",
    name: "DiDEM",
    centers: ["france", "afrique-ouest", "asie"],
    themes: ["participatif"],
    domain: "Environnement, Gestion de l'eau et irrigation",
    description:
      "Dialogue Science-Décideurs pour une gestion intégrée des environnements littoraux et marins. Approche participative multi-acteurs.",
    url: "https://ummisco.fr/fr/projet-ummisco/didem/",
  },
  {
    id: "habitable",
    name: "HABITABLE",
    centers: ["france", "afrique-ouest"],
    themes: ["participatif"],
    domain: "Société",
    description:
      "Modélisation de la mobilité des pêcheurs artisanaux au Sénégal. Simulateur Lolli implémenté sous GAMA pour explorer des scénarios climatiques et socio-économiques.",
    url: "https://ummisco.fr/fr/projet-ummisco/habitable/",
  },
  {
    id: "digepi",
    name: "DigEpi",
    centers: ["france", "asie"],
    themes: ["capteurs", "ia"],
    domain: "Santé humaine",
    description:
      "Digital Epidemiology : nouvelle approche pour la surveillance en temps réel du COVID-19 via l'intégration de capteurs environnementaux et de modèles prédictifs.",
    url: "https://ummisco.fr/fr/projet-ummisco/digepi/",
  },
  {
    id: "waqatali",
    name: "Waqatali",
    centers: ["france", "mediterranee", "afrique-ouest"],
    themes: ["ia"],
    domain: "Gestion de l'eau et irrigation, Société",
    description:
      "Application de l'IA pour l'optimisation de l'irrigation dans les zones semi-arides. Combine apprentissage profond et données capteurs terrain.",
    url: "https://ummisco.fr/fr/projet-ummisco/waqatali/",
  },
  {
    id: "comokit",
    name: "COMOKIT",
    centers: ["asie"],
    themes: ["agents"],
    domain: "Santé publique",
    description:
      "Modèle informatique permettant d'explorer in silico les stratégies d'intervention épidémique (COVID-19) avant leur mise en application.",
    url: "https://comokit.org/",
  },
  {
    id: "anr-magnum",
    name: "ANR MaGnuM",
    centers: ["france"],
    themes: ["capteurs"],
    domain: "Biodiversité",
    description:
      "The Maasai, the Gnu and the Metropolis. Réseaux de capteurs pour le suivi des grandes migrations animales en Afrique de l'Est.",
    url: "https://ummisco.fr/fr/projet-ummisco/anr-magnum/",
  },
  {
    id: "dom",
    name: "DOM",
    centers: ["asie", "france"],
    themes: ["agents"],
    domain: "Environnement",
    description:
      "Distribution Model : séparation des préoccupations pour faciliter la distribution des modèles à base d'agents sur clusters HPC.",
    url: "https://ummisco.fr/fr/projet-ummisco/dom/",
  },
  {
    id: "airqaly-4-asmafri",
    name: "AIRQALY-4-ASMAFRI",
    centers: ["mediterranee"],
    themes: ["participatif", "capteurs"],
    domain: "Santé humaine",
    description:
      "Réseau de capteurs citoyens pour la surveillance de la qualité de l'air et son impact sur l'asthme en Afrique. Science participative et acquisition de données.",
    url: "https://ummisco.fr/fr/projet-ummisco/airqaly-4-asmafri/",
  },
  {
    id: "aime",
    name: "AIME",
    centers: ["mediterranee"],
    themes: ["ia", "participatif"],
    domain: "Santé humaine",
    description:
      "Artificial Intelligence for Marine Ecosystems. Application de l'IA pour la modélisation et le suivi des écosystèmes marins méditerranéens.",
    url: "https://ummisco.fr/fr/projet-ummisco/aime/",
  },
  {
    id: "rdt-smart-reader",
    name: "RDT Smart Reader",
    centers: ["asie", "france"],
    themes: ["ia"],
    domain: "Santé humaine",
    description:
      "Lecteur intelligent de tests de diagnostic rapide (TDR). Application de vision par ordinateur pour automatiser la lecture des TDR en contexte de ressources limitées.",
    url: "https://ummisco.fr/fr/projet-ummisco/rdt-smart-reader/",
  },
];

// ─── Logiciels UMMISCO ────────────────────────────────────────────────────────

export const SOFTWARE_TOOLS: SoftwareTool[] = [
  {
    id: "gama",
    name: "GAMA Platform",
    description:
      "Plateforme générique écrite en Java, dédiée à la conception et à la simulation de modèles à base d'agents. Initialement créée en 2007 par l'équipe MSI à Hanoï.",
    since: "2007",
    tags: ["Java", "Agent-based", "Simulation", "GIS"],
    website: "https://gama-platform.org/",
    github: "https://github.com/gama-platform/gama",
  },
  {
    id: "comokit-tool",
    name: "COMOKIT",
    description:
      "Modèle informatique permettant d'explorer in silico les stratégies d'intervention épidémique avant leur mise en application.",
    tags: ["GAMA", "Épidémiologie", "COVID-19"],
    website: "https://comokit.org/",
    github: "https://github.com/COMOKIT",
  },
  {
    id: "ichthyop",
    name: "Ichthyop",
    description:
      "Simule les processus intervenant au début de la vie des poissons : mouvement, croissance, mortalité et recrutement. Utilise les champs océaniques ROMS, NEMO ou SYMPHONIE.",
    tags: ["Océanographie", "Ichtyologie", "Particules"],
    website: "https://ichthyop.org/",
    github: "https://github.com/ichthyop/ichthyop",
  },
  {
    id: "kendrick",
    name: "Kendrick",
    description:
      "Plateforme de simulation épidémiologique mathématique. Modèles déterministes compartimentaux, stochastiques et en réseaux. Basé sur Pharo, open source MIT.",
    tags: ["Pharo", "Épidémiologie", "DSL", "Open Source"],
    github: "https://github.com/KendrickOrg/kendrick",
  },
  {
    id: "epicam",
    name: "EPICAM",
    description:
      "Système de surveillance de la tuberculose déployé sur 47 sites au Cameroun. Permet le suivi individualisé de 65 % des malades enregistrés, développé avec le Centre Pasteur.",
    tags: ["Tuberculose", "Cameroun", "Surveillance", "Santé publique"],
    github: "https://github.com/UMMISCO/EPICAM",
  },
];

// ─── Simulation tools (page simulations) ────────────────────────────────────

export const SIMULATION_TOOLS = [
  {
    id: "sim-sir",
    title: "Modèle SIR — Propagation épidémique",
    description:
      "Simulez la dynamique d'une épidémie dans une population fermée. Paramétrez le taux de transmission (β), le taux de guérison (γ) et la taille de la population.",
    iframeUrl:
      "https://netlogoweb.org/web?https://netlogoweb.org/assets/modelslib/Sample%20Models/Biology/Virus.nlogo",
  },
  {
    id: "sim-hiv",
    title: "Modèle VIH — Dynamique de Transmission (NetLogo)",
    description:
      "Simulation de la transmission du VIH dans une population. Visualisez l'impact des comportements préventifs sur la prévalence à long terme.",
    iframeUrl:
      "https://netlogoweb.org/web?https://netlogoweb.org/assets/modelslib/Sample%20Models/Biology/HIV.nlogo",
  },
];

// ─── Contrats de doctorat ─────────────────────────────────────────────────────

export interface DoctoralContract {
  id: string;
  title: string;
  supervisor: string;
  funding: string;
  description: string;
  requirements: string;
  deadline: string;
}

export const DOCTORAL_CONTRACTS: DoctoralContract[] = [
  {
    id: "doc-01",
    title: "Modélisation hybride de la dynamique des socio-écosystèmes sahéliens (Grande Muraille Verte)",
    supervisor: "Prof. Alassane BAH",
    funding: "Bourse d'excellence IRD / Projet IRN RESET-GMV",
    description:
      "L'objectif est de concevoir un modèle à base d'agents couplé à MAELIA pour simuler les dynamiques pastorales et agricoles dans la zone Ferlo-Sine. Les scénarios co-construits visent la neutralité carbone d'ici 2035.",
    requirements:
      "Master 2 en Informatique, Mathématiques Appliquées ou Sciences de l'Environnement. Maîtrise de Python ou Java. Intérêt pour la modélisation GAMA.",
    deadline: "2026-06-30",
  },
  {
    id: "doc-02",
    title: "Capteurs LoRaWAN et IA embarquée pour la détection précoce des gîtes larvaires du paludisme",
    supervisor: "Mamadou SY & Awa DIATTARA",
    funding: "Financement Projet National Science Citoyenne / IRD",
    description:
      "Le candidat travaillera sur le déploiement de capteurs IoT environnementaux et la conception de modèles de classification légers (TinyML) embarqués sur microcontrôleurs pour caractériser les zones de ponte des anophèles.",
    requirements:
      "Master en Télécommunications, Systèmes Embarqués ou Data Science. Compétences en C/C++/Python et protocoles LPWAN.",
    deadline: "2026-07-15",
  },
];

// ─── Sites UMMISCO (pour la section écosystème) ───────────────────────────────

export interface UMMISCOSite {
  id: string;
  name: string;
  location: string;
  description: string;
  website: string;
}

export const UMMISCO_SITES: UMMISCOSite[] = [
  {
    id: "site-senegal",
    name: "Centre Afrique de l'Ouest",
    location: "Dakar (UCAD / ESP)",
    description:
      "Étude des socio-écosystèmes sahéliens, pêche artisanale et résilience climatique. Partenaires : UCAD, UADB, CIRAD.",
    website: "https://ummisco.fr/fr/centre/centre-afrique-de-louest/",
  },
  {
    id: "site-france",
    name: "Centre France",
    location: "Bondy / Sorbonne Université",
    description:
      "Siège de l'UMMISCO. Cluster HPC +1700 cœurs, FabLab cofab-in-Bondy, expertise en simulation distribuée et jumeaux numériques.",
    website: "https://ummisco.fr/fr/centre/centre-france/",
  },
  {
    id: "site-vietnam",
    name: "Centre Asie du Sud-Est",
    location: "Hanoï (VinUniversity)",
    description:
      "Berceau de la plateforme GAMA (2007). Gestion de l'eau, agriculture, mobilité, santé publique en Asie du Sud-Est.",
    website: "https://ummisco.fr/fr/centre/centre-asie-du-sud-est/",
  },
  {
    id: "site-maroc",
    name: "Centre Méditerranée",
    location: "Marrakech (Université Cadi Ayyad)",
    description:
      "Modélisation mathématique multi-échelle, théorie des essaims, dynamique des populations. Santé, eau, mobilité urbaine.",
    website: "https://ummisco.fr/fr/centre/centre-mediterranee/",
  },
  {
    id: "site-cameroun",
    name: "Centre Afrique centrale et de l'est",
    location: "Yaoundé (Université de Yaoundé I)",
    description:
      "Modélisation des épidémies et maladies des cultures tropicales. Approche One Health reliant santé humaine, animale et environnementale.",
    website: "https://ummisco.fr/fr/centre/centre-afrique-centrale-et-de-lest/",
  },
];

// ─── Applications intégrées ───────────────────────────────────────────────────

export interface IntegratedApplication {
  id: string;
  name: string;
  description: string;
  url: string;
  type: "iframe" | "link";
}

export const INTEGRATED_APPLICATIONS: IntegratedApplication[] = [
  {
    id: "app-gama",
    name: "GAMA Platform",
    description:
      "Plateforme de simulation multi-agents open source. Téléchargez et explorez des modèles pré-construits.",
    url: "https://gama-platform.org/",
    type: "link",
  },
  {
    id: "app-comokit",
    name: "COMOKIT",
    description:
      "Explorez les stratégies d'intervention épidémique in silico développé par UMMISCO en réponse au COVID-19.",
    url: "https://comokit.org/",
    type: "link",
  },
  {
    id: "app-hal",
    name: "Portail HAL — Publications UMMISCO",
    description:
      "Accédez à l'archive ouverte HAL pour consulter toutes les publications scientifiques des membres UMMISCO.",
    url: "https://hal.science/search/index/?q=ummisco&rows=30",
    type: "link",
  },
];
