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

// ─── Chercheurs (sélection représentative des 94 membres) ────────────────────

export const RESEARCHERS: Researcher[] = [
  // Centre Afrique de l'Ouest
  {
    id: "alassane-bah",
    name: "Prof. Alassane BAH",
    title: "Directeur du Centre Afrique de l'Ouest",
    orcid: "0000-0002-7341-1023",
    axes: ["agents", "participatif"],
    bio: "Directeur du Centre Afrique de l'Ouest. Spécialiste de la modélisation des socio-écosystèmes sahéliens et de la dynamique de la Grande Muraille Verte.",
    email: "alassane.bah@ucad.edu.sn",
    avatarSeed: "AB",
    publicationsCount: 42,
    center: "afrique-ouest",
    role: "directeur_centre",
  },
  {
    id: "mamadou-sy",
    name: "Mamadou SY",
    title: "Directeur d'Unité Adjoint",
    orcid: "0000-0001-8345-2910",
    axes: ["agents", "capteurs"],
    bio: "Directeur d'Unité Adjoint au Centre Afrique de l'Ouest. Recherches sur la modélisation des systèmes hydriques et la gestion des ressources naturelles.",
    email: "mamadou.sy@ucad.edu.sn",
    avatarSeed: "MS",
    publicationsCount: 28,
    center: "afrique-ouest",
    role: "directeur_unite",
  },
  {
    id: "awa-diattara",
    name: "Awa DIATTARA",
    title: "Responsable de thème — Centre Afrique de l'Ouest",
    orcid: "0000-0003-1295-4820",
    axes: ["agents", "participatif"],
    bio: "Responsable de thème au Centre Afrique de l'Ouest. Spécialiste de la modélisation participative des systèmes socio-environnementaux sahéliens.",
    email: "awa.diattara@ucad.edu.sn",
    avatarSeed: "AD",
    publicationsCount: 17,
    center: "afrique-ouest",
    role: "responsable_theme",
  },
  {
    id: "ousmane-thiare",
    name: "Ousmane THIARE",
    title: "Chercheur — Modélisation & Intelligence Artificielle",
    orcid: "0000-0002-9012-3847",
    axes: ["agents", "ia"],
    bio: "Chercheur au Centre Afrique de l'Ouest. Travaux sur la modélisation multi-agents des dynamiques urbaines et l'application de l'IA aux systèmes complexes africains.",
    email: "ousmane.thiare@ucad.edu.sn",
    avatarSeed: "OT",
    publicationsCount: 11,
    center: "afrique-ouest",
    role: "chercheur",
  },
  {
    id: "moussa-lo",
    name: "Moussa LO",
    title: "Chercheur — Systèmes Multi-Agents",
    orcid: "0000-0001-5034-8291",
    axes: ["agents"],
    bio: "Chercheur au Centre Afrique de l'Ouest. Expert en modélisation à base d'agents pour la pêche artisanale et les dynamiques bioéconomiques des ressources halieutiques.",
    email: "moussa.lo@ucad.edu.sn",
    avatarSeed: "ML",
    publicationsCount: 9,
    center: "afrique-ouest",
    role: "chercheur",
  },
  // Centre France
  {
    id: "nicolas-marilleau",
    name: "Nicolas MARILLEAU",
    title: "Directeur du Centre France",
    orcid: "0000-0002-4019-2831",
    axes: ["agents", "participatif"],
    bio: "Directeur du Centre France (IRD/Sorbonne). Expert en simulation distribuée à grande échelle et en modélisation participative pour la gestion côtière (projet LittoSIM-GEN).",
    email: "nicolas.marilleau@ird.fr",
    avatarSeed: "NM",
    publicationsCount: 55,
    center: "france",
    role: "directeur_centre",
  },
  {
    id: "jean-daniel-zucker",
    name: "Jean-Daniel ZUCKER",
    title: "Directeur d'Unité Adjoint — Centre France",
    orcid: "0000-0003-0021-7438",
    axes: ["ia", "capteurs"],
    bio: "Directeur d'Unité Adjoint. Pionnier de l'apprentissage profond appliqué à la santé : microbiome, métabolome, maladies chroniques. Coordinateur du projet DeepIntegrOmics.",
    email: "jean-daniel.zucker@ird.fr",
    avatarSeed: "JZ",
    publicationsCount: 89,
    center: "france",
    role: "directeur_unite",
  },
  {
    id: "eugeni-belda",
    name: "Eugeni BELDA CUESTA",
    title: "Ingénieur de Recherche — Centre France",
    orcid: "0000-0002-3847-1920",
    axes: ["ia", "capteurs"],
    bio: "Ingénieur de Recherche spécialisé en bio-informatique et analyse du microbiome intestinal. Développe des pipelines d'analyse omique intégratifs.",
    email: "eugeni.belda@ird.fr",
    avatarSeed: "EB",
    publicationsCount: 34,
    center: "france",
    role: "ingenieur",
  },
  // Centre Asie du Sud-Est
  {
    id: "alexis-drogoul",
    name: "Alexis DROGOUL",
    title: "Directeur de Recherche — Centre Asie du Sud-Est",
    orcid: "0000-0001-7283-4920",
    axes: ["agents", "participatif"],
    bio: "Directeur de Recherche IRD et créateur de la plateforme GAMA (2007). Pionnier mondial de la simulation à base d'agents appliquée au développement durable en Asie du Sud-Est.",
    email: "alexis.drogoul@ird.fr",
    avatarSeed: "AG",
    publicationsCount: 127,
    center: "asie",
    role: "directeur_centre",
  },
  {
    id: "arthur-brugiere",
    name: "Arthur BRUGIERE",
    title: "Doctorant — Centre Asie du Sud-Est",
    axes: ["agents"],
    bio: "Doctorant au Centre Asie du Sud-Est. Recherches sur la distribution et la parallélisation des modèles à base d'agents à grande échelle sur clusters HPC.",
    email: "arthur.brugiere@ird.fr",
    avatarSeed: "AR",
    publicationsCount: 3,
    center: "asie",
    role: "doctorant",
  },
  {
    id: "duy-dung-le",
    name: "Duy Dung LE",
    title: "Chercheur — Centre Asie du Sud-Est",
    orcid: "0000-0002-8120-4938",
    axes: ["agents", "ia"],
    bio: "Chercheur spécialisé dans la modélisation épidémiologique (tuberculose, COVID-19) et le développement d'outils de visualisation géospatiale comme GeoTuberculosis.",
    email: "duy-dung.le@vinuni.edu.vn",
    avatarSeed: "DL",
    publicationsCount: 15,
    center: "asie",
    role: "chercheur",
  },
  // Centre Afrique centrale et de l'est
  {
    id: "berge-tsanou",
    name: "Berge TSANOU",
    title: "Chercheur — Centre Afrique centrale et de l'est",
    orcid: "0000-0003-2019-4812",
    axes: ["agents", "ia"],
    bio: "Chercheur au Centre Cameroun. Spécialiste de la modélisation mathématique des épidémies (dengue, paludisme, VIH) et de l'approche One Health pour la surveillance sanitaire.",
    email: "berge.tsanou@uy1.uninet.cm",
    avatarSeed: "BT",
    publicationsCount: 21,
    center: "afrique-centrale",
    role: "chercheur",
  },
  {
    id: "jean-jules-tewa",
    name: "Jean-Jules TEWA",
    title: "Chercheur — Centre Afrique centrale et de l'est",
    orcid: "0000-0001-9384-2031",
    axes: ["agents"],
    bio: "Chercheur en modélisation mathématique des maladies infectieuses. Expert en équations différentielles pour l'étude de la dynamique des pathogènes tropicaux.",
    email: "jjtewa@uy1.uninet.cm",
    avatarSeed: "JT",
    publicationsCount: 33,
    center: "afrique-centrale",
    role: "chercheur",
  },
  // Centre Méditerranée
  {
    id: "khalil-ezzinbi",
    name: "Khalil EZZINBI",
    title: "Directeur du Centre Méditerranée",
    orcid: "0000-0002-1038-4920",
    axes: ["agents", "ia"],
    bio: "Directeur du Centre Méditerranée (Université Cadi Ayyad). Lauréat du Prix Hassan II des Sciences et Techniques. Expert mondial en équations différentielles avec retard.",
    email: "ezzinbi@uca.ma",
    avatarSeed: "KE",
    publicationsCount: 78,
    center: "mediterranee",
    role: "directeur_centre",
  },
  {
    id: "jalila-el-ghordaf",
    name: "Jalila EL GHORDAF",
    title: "Maître de Conférence — Centre Méditerranée",
    orcid: "0000-0003-4829-1029",
    axes: ["agents", "capteurs"],
    bio: "Maître de Conférence à l'Université Cadi Ayyad. Recherches sur la modélisation de la dynamique des populations et la gestion durable des ressources en eau au Maroc.",
    email: "jalila.elghordaf@uca.ma",
    avatarSeed: "JG",
    publicationsCount: 18,
    center: "mediterranee",
    role: "chercheur",
  },
  {
    id: "hamza-elouiaazzani",
    name: "Hamza ELOUIAAZZANI",
    title: "Chercheur — Centre Méditerranée",
    axes: ["ia", "capteurs"],
    bio: "Chercheur au Centre Méditerranée. Spécialisé en intelligence artificielle appliquée aux écosystèmes marins (projet AIME) et à la qualité de l'air (AIRQALY-4-ASMAFRI).",
    email: "hamza.elouiaazzani@uca.ma",
    avatarSeed: "HE",
    publicationsCount: 8,
    center: "mediterranee",
    role: "chercheur",
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
