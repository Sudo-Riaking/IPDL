import type { UserRole } from "@/context/AuthContext";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DBUser {
  id: string;
  nom: string;
  email: string;
  password: string; // plain text in dev mock — use bcrypt in production
  role: UserRole;
  langue: "fr" | "en";
  biographie?: string;
  expertises?: string[];
  estDoctorant?: boolean;
  organisation?: string;
  domaine?: string;
  createdAt: string;
}

export type PubStatus = "en_attente" | "validee" | "rejetee";
export type AccessLevel = "public" | "protected" | "private";
export type SimStatus = "en_cours" | "terminee" | "erreur";

export interface DBPublication {
  id: string;
  titre: string;
  resume: string;
  auteurs: string[];          // noms affichés
  authorIds: string[];        // IDs user (pour liens profil)
  journal?: string;           // nom de la revue ou conférence
  volume?: string;
  numero?: string;
  pages?: string;
  doi?: string;               // ex: 10.1234/jmsc.2024.001
  annee: number;
  datePublication: string;
  motsClefs: string[];
  fichierPdf?: string;        // URL ou nom de fichier (future: stockage serveur)
  googleScholarUrl?: string;
  datasetsLies: string[];     // IDs datasets associés
  statut: PubStatus;
  axe: string;
  accessLevel: AccessLevel;
  citationApa: string;
  citationBibtex: string;
}

export interface DBDataset {
  id: string;
  titre: string;
  description: string;
  type: string;
  licence: string;
  acces: AccessLevel;
  fichiers: string[];
  metadonnees: Record<string, string>;
  creatorId: string;
  size: string;
  downloads: number;
  dateDepot: string;
}

export interface DBSimulation {
  id: string;
  type: string;
  parametres: Record<string, unknown>;
  resultats?: Record<string, unknown>;
  statut: SimStatus;
  dateLancement: string;
  completionTime: number; // Unix ms when results will be ready
  userId: string;
  accesPublic: boolean;
}

export interface DBEvent {
  id: string;
  titre: string;
  description: string;
  dateDebut: string;
  dateFin: string;
  lieu: string;
  capacite: number;
  inscrits: string[];
  type: "seminaire" | "conference" | "atelier" | "autre";
  speaker?: string;
}

export interface DBNewsletter {
  id: string;
  email: string;
  dateInscription: string;
}

export interface DBPartner {
  id: string;
  nom: string;
  type: "academique" | "institutionnel" | "industriel" | "bailleur";
  pays: string;
  description: string;
  website: string;
  logo?: string;
  projets: string[];
}

// ─── In-memory store (module singleton) ──────────────────────────────────────

const db = {
  users: new Map<string, DBUser>(),
  publications: new Map<string, DBPublication>(),
  datasets: new Map<string, DBDataset>(),
  simulations: new Map<string, DBSimulation>(),
  events: new Map<string, DBEvent>(),
  newsletter: new Map<string, DBNewsletter>(),
  partners: new Map<string, DBPartner>(),
};

// ─── Seed data ────────────────────────────────────────────────────────────────

function seed() {
  // Users
  const now = new Date().toISOString();
  const users: DBUser[] = [
    {
      id: "u-admin", nom: "Prof. Cheikh Diallo", email: "admin@ummisco.sn",
      password: "admin123", role: "directeur" as UserRole, langue: "fr",
      biographie: "Directeur d'UMMISCO Dakar. Pionnier de la modélisation multi-agents en Afrique de l'Ouest.",
      expertises: ["Modélisation multi-agents", "Systèmes complexes", "Épidémiologie"],
      createdAt: now,
    },
    {
      id: "u-chercheur", nom: "Dr. Fatou Diop", email: "chercheur@ummisco.sn",
      password: "chercheur123", role: "chercheur" as UserRole, langue: "fr",
      biographie: "Spécialiste de la modélisation mathématique des maladies infectieuses.",
      expertises: ["Bio-Mathématiques", "Paludisme", "Science citoyenne"],
      estDoctorant: false, createdAt: now,
    },
    {
      id: "u-etudiant", nom: "Mamadou Sarr", email: "etudiant@ummisco.sn",
      password: "etudiant123", role: "etudiant" as UserRole, langue: "fr", createdAt: now,
    },
    {
      id: "u-partenaire", nom: "IRD France", email: "partenaire@ird.fr",
      password: "partenaire123", role: "partenaire" as UserRole, langue: "fr",
      organisation: "Institut de Recherche pour le Développement",
      domaine: "Recherche scientifique", createdAt: now,
    },
    {
      id: "u-respaxe", nom: "Dr. Moussa Ndiaye", email: "respaxe@ummisco.sn",
      password: "respaxe123", role: "responsable_axe" as UserRole, langue: "fr",
      expertises: ["IoT", "Systèmes embarqués", "FabLab"], createdAt: now,
    },
  ];

  users.forEach((u) => db.users.set(u.id, u));

  // Publications
  const publications: DBPublication[] = [
    {
      id: "pub-01",
      titre: "Modélisation multi-agents de la propagation du paludisme dans la zone périurbaine de Dakar (2019-2024)",
      resume: "Ce travail présente un modèle multi-agents (SMA) simulant la transmission spatio-temporelle du paludisme à Dakar. Le modèle intègre des facteurs climatiques (pluviométrie, température, NDVI), les comportements de protection des ménages (moustiquaires imprégnées, répulsifs) et les gîtes larvaires géoréférencés à Pikine. Les résultats démontrent l'importance des micro-facteurs locaux dans la persistance de la transmission résiduelle et permettent de calibrer des interventions ciblées à l'échelle des quartiers.",
      auteurs: ["Fatou Diop", "Cheikh Diallo"],
      authorIds: ["u-chercheur", "u-admin"],
      journal: "Journal de Modélisation des Systèmes Complexes",
      volume: "12",
      numero: "2",
      pages: "145-162",
      doi: "10.1234/jmsc.2024.1234",
      annee: 2024,
      datePublication: "2024-03-15",
      motsClefs: ["paludisme", "modèle multi-agents", "Dakar", "épidémiologie", "NDVI", "Pikine"],
      googleScholarUrl: "https://scholar.google.com/scholar?q=Mod%C3%A9lisation+multi-agents+paludisme+Dakar",
      datasetsLies: ["data-01"],
      statut: "validee",
      axe: "agents",
      accessLevel: "public",
      citationApa: "Diop, F., & Diallo, C. (2024). Modélisation multi-agents de la propagation du paludisme dans la zone périurbaine de Dakar (2019-2024). Journal de Modélisation des Systèmes Complexes, 12(2), 145-162. https://doi.org/10.1234/jmsc.2024.1234",
      citationBibtex: `@article{diop2024modelisation,
  title={Modélisation multi-agents de la propagation du paludisme dans la zone périurbaine de Dakar (2019-2024)},
  author={Diop, Fatou and Diallo, Cheikh},
  journal={Journal de Modélisation des Systèmes Complexes},
  volume={12},
  number={2},
  pages={145--162},
  year={2024},
  doi={10.1234/jmsc.2024.1234}
}`,
    },
    {
      id: "pub-02",
      titre: "Système d'alerte précoce basé sur l'Internet des objets pour la surveillance des inondations dans la banlieue de Dakar",
      resume: "Nous présentons l'architecture complète d'un réseau de capteurs ultrasoniques LoRaWAN déployé à Keur Massar pour la surveillance hydrologique en temps réel. Le système mesure le niveau des nappes et canaux de drainage toutes les 5 minutes via 12 nœuds LoRa. Un modèle de prédiction local (LSTM léger embarqué sur microcontrôleur) génère des alertes précoces jusqu'à 3 heures avant les débordements critiques, avec un taux de précision de 87 % lors des tests de la saison 2024.",
      auteurs: ["Moussa Ndiaye", "Amadou Faye"],
      authorIds: ["u-respaxe"],
      journal: "Revue Africaine de l'Ingénierie Logicielle et Systèmes",
      volume: "8",
      numero: "1",
      pages: "45-58",
      doi: "10.5678/rails.2023.456",
      annee: 2023,
      datePublication: "2023-09-01",
      motsClefs: ["LoRaWAN", "IoT", "inondations", "Dakar", "alerte précoce", "LSTM"],
      googleScholarUrl: "https://scholar.google.com/scholar?q=alerte+pr%C3%A9coce+IoT+inondations+Dakar",
      datasetsLies: ["data-04"],
      statut: "validee",
      axe: "capteurs",
      accessLevel: "public",
      citationApa: "Ndiaye, M., & Faye, A. (2023). Système d'alerte précoce basé sur l'IoT pour la surveillance des inondations dans la banlieue de Dakar. Revue Africaine de l'Ingénierie Logicielle et Systèmes, 8(1), 45-58. https://doi.org/10.5678/rails.2023.456",
      citationBibtex: `@article{ndiaye2023systeme,
  title={Système d'alerte précoce basé sur l'IoT pour la surveillance des inondations dans la banlieue de Dakar},
  author={Ndiaye, Moussa and Faye, Amadou},
  journal={Revue Africaine de l'Ingénierie Logicielle et Systèmes},
  volume={8},
  number={1},
  pages={45--58},
  year={2023},
  doi={10.5678/rails.2023.456}
}`,
    },
    {
      id: "pub-03",
      titre: "Sciences participatives pour le suivi de la qualité de l'air à Dakar : Approche par modélisation hybride",
      resume: "Cet article étudie le couplage entre capteurs citoyens mobiles et modèles de dispersion atmosphérique pour cartographier dynamiquement la pollution à Dakar-Plateau. En équipant 50 volontaires de micro-capteurs PM2.5 connectés, nous avons constitué un jeu de données dense permettant d'affiner les cartes de pollution à une résolution de 100 m. La méthode hybride couplant krigeage et simulation LES (Large Eddy Simulation) identifie des pics de pollution horaires non captés par les 4 stations fixes officielles.",
      auteurs: ["Amadou Faye", "Fatou Diop"],
      authorIds: ["u-chercheur"],
      journal: "Écologie et Informatique Globale",
      volume: "15",
      numero: "4",
      pages: "312-329",
      doi: "10.9012/eig.2024.789",
      annee: 2024,
      datePublication: "2024-06-01",
      motsClefs: ["PM2.5", "science citoyenne", "pollution atmosphérique", "krigeage", "LES", "Dakar"],
      googleScholarUrl: "https://scholar.google.com/scholar?q=sciences+participatives+qualit%C3%A9+air+Dakar",
      datasetsLies: ["data-02"],
      statut: "en_attente",
      axe: "participatif",
      accessLevel: "protected",
      citationApa: "Faye, A., & Diop, F. (2024). Sciences participatives pour le suivi de la qualité de l'air à Dakar. Écologie et Informatique Globale, 15(4), 312-329. https://doi.org/10.9012/eig.2024.789",
      citationBibtex: `@article{faye2024sciences,
  title={Sciences participatives pour le suivi de la qualité de l'air à Dakar},
  author={Faye, Amadou and Diop, Fatou},
  journal={Écologie et Informatique Globale},
  volume={15},
  number={4},
  pages={312--329},
  year={2024},
  doi={10.9012/eig.2024.789}
}`,
    },
    {
      id: "pub-04",
      titre: "Simulation comparative : Équations différentielles vs Modèles multi-agents pour la tuberculose au Sénégal",
      resume: "Nous comparons une approche classique compartimentale SEIR déterministe et une approche individu-centrée (SMA NetLogo) pour simuler la propagation de la tuberculose en milieu carcéral à Dakar. Sur 6 mois de simulation calibrée sur données SMIT 2021-2022, la modélisation multi-agents démontre une supériorité statistique (RMSE −34 %) pour capturer l'hétérogénéité des contacts physiques rapprochés et l'impact des co-infections VIH. Nos résultats orientent les politiques de dépistage systématique trimestriel.",
      auteurs: ["Fatou Diop", "Cheikh Diallo"],
      authorIds: ["u-chercheur", "u-admin"],
      journal: "Epidémiologie et Santé Internationale",
      volume: "34",
      numero: "3",
      pages: "89-104",
      doi: "10.3456/esi.2022.345",
      annee: 2022,
      datePublication: "2022-11-20",
      motsClefs: ["tuberculose", "SEIR", "SMA", "comparaison", "Sénégal", "milieu carcéral"],
      googleScholarUrl: "https://scholar.google.com/scholar?q=tuberculose+SEIR+SMA+S%C3%A9n%C3%A9gal",
      datasetsLies: [],
      statut: "validee",
      axe: "agents",
      accessLevel: "public",
      citationApa: "Diop, F., & Diallo, C. (2022). Simulation comparative : SEIR vs SMA pour la tuberculose au Sénégal. Epidémiologie et Santé Internationale, 34(3), 89-104. https://doi.org/10.3456/esi.2022.345",
      citationBibtex: `@article{diop2022simulation,
  title={Simulation comparative : Équations différentielles vs SMA pour la tuberculose au Sénégal},
  author={Diop, Fatou and Diallo, Cheikh},
  journal={Epidémiologie et Santé Internationale},
  volume={34},
  number={3},
  pages={89--104},
  year={2022},
  doi={10.3456/esi.2022.345}
}`,
    },
    {
      id: "pub-05",
      titre: "Modélisation multi-échelle de la dynamique sédimentaire et de l'érosion côtière sur la Langue de Barbarie",
      resume: "La rupture anthropique de la Langue de Barbarie en 2003 a reconfiguré profondément la morphodynamique de la côte nord du Sénégal. Ce travail propose un modèle hydro-sédimentaire couplant un automate cellulaire 2D (résolution 5 m) et un modèle de vagues spectraux (SWAN) pour projeter le recul du trait de côte sur l'horizon 2025-2035 sous trois scénarios de hausse du niveau marin (RCP 2.6, 4.5, 8.5). Les résultats montrent un recul moyen de 4,2 à 12,7 m/an selon le scénario, avec des zones d'accrétion paradoxale dans les secteurs sous influence lagunaire.",
      auteurs: ["Cheikh Diallo", "Amadou Faye"],
      authorIds: ["u-admin"],
      journal: "Journal Océanographique d'Afrique de l'Ouest",
      volume: "29",
      numero: "1",
      pages: "12-28",
      doi: "10.7890/joao.2023.123",
      annee: 2023,
      datePublication: "2023-04-10",
      motsClefs: ["érosion côtière", "Langue de Barbarie", "Saint-Louis", "RCP", "automate cellulaire", "SWAN"],
      googleScholarUrl: "https://scholar.google.com/scholar?q=%C3%A9rosion+c%C3%B4ti%C3%A8re+Langue+de+Barbarie",
      datasetsLies: [],
      statut: "validee",
      axe: "agents",
      accessLevel: "public",
      citationApa: "Diallo, C., & Faye, A. (2023). Modélisation multi-échelle de la dynamique sédimentaire sur la Langue de Barbarie. Journal Océanographique d'Afrique de l'Ouest, 29(1), 12-28. https://doi.org/10.7890/joao.2023.123",
      citationBibtex: `@article{diallo2023modelisation,
  title={Modélisation multi-échelle de la dynamique sédimentaire sur la Langue de Barbarie},
  author={Diallo, Cheikh and Faye, Amadou},
  journal={Journal Océanographique d'Afrique de l'Ouest},
  volume={29},
  number={1},
  pages={12--28},
  year={2023},
  doi={10.7890/joao.2023.123}
}`,
    },
    {
      id: "pub-06",
      titre: "Conception de stations pluviométriques ouvertes et reproductibles à faible coût au FabLab de l'ESP",
      resume: "Ce travail documente la conception complète d'un pluviomètre électronique à augets basculants imprimé en 3D et équipé d'une carte ESP32 LoRa pour transmission sans fil. Le coût matériel total (28 €) est réduit d'un facteur 10 par rapport aux équipements industriels du marché (Campbell CS700 : ~280 €), tout en maintenant un taux d'erreur de calibration inférieur à 3 % testé sur 6 mois en conditions sahéliennes. Les fichiers de fabrication (STL, PCB, code Arduino) sont publiés sous licence CERN-OHL-S v2.",
      auteurs: ["Moussa Ndiaye"],
      authorIds: ["u-respaxe"],
      journal: "Technologies Ouvertes pour le Développement",
      volume: "6",
      numero: "1",
      pages: "101-115",
      doi: "10.2345/tod.2024.567",
      annee: 2024,
      datePublication: "2024-02-28",
      motsClefs: ["pluviomètre", "open hardware", "ESP32", "LoRa", "impression 3D", "FabLab"],
      googleScholarUrl: "https://scholar.google.com/scholar?q=pluviom%C3%A8tre+open+source+FabLab+ESP",
      fichierPdf: "https://example.org/publications/ndiaye2024_pluviometre.pdf",
      datasetsLies: ["data-04"],
      statut: "validee",
      axe: "capteurs",
      accessLevel: "public",
      citationApa: "Ndiaye, M. (2024). Conception de stations pluviométriques ouvertes au FabLab de l'ESP. Technologies Ouvertes pour le Développement, 6(1), 101-115. https://doi.org/10.2345/tod.2024.567",
      citationBibtex: `@article{ndiaye2024pluvio,
  title={Conception de stations pluviométriques ouvertes et reproductibles au FabLab de l'ESP},
  author={Ndiaye, Moussa},
  journal={Technologies Ouvertes pour le Développement},
  volume={6},
  number={1},
  pages={101--115},
  year={2024},
  doi={10.2345/tod.2024.567}
}`,
    },
  ];

  publications.forEach((p) => db.publications.set(p.id, p));

  // Datasets
  const datasets: DBDataset[] = [
    {
      id: "data-01",
      titre: "Données épidémiologiques paludisme — Région de Dakar (2019-2024)",
      description: "Série temporelle géoréférencée des cas hebdomadaires de paludisme enregistrés dans les districts sanitaires de Pikine, Guédiawaye et Yeumbeul.",
      type: "csv",
      licence: "CC BY 4.0",
      acces: "protected",
      fichiers: ["malaria_dakar_2019_2024.csv"],
      metadonnees: { format: "CSV", crs: "WGS84", frequency: "weekly" },
      creatorId: "u-chercheur",
      size: "148 MB",
      downloads: 342,
      dateDepot: "2024-01-10",
    },
    {
      id: "data-02",
      titre: "Qualité de l'air par capteurs IoT — Hann Bel-Air (2025)",
      description: "Relevés horaires PM2.5, PM10, température et humidité par les micro-stations du réseau citoyen UMMISCO.",
      type: "json",
      licence: "Open Data Commons",
      acces: "public",
      fichiers: ["air_quality_hann_2025.json"],
      metadonnees: { format: "JSON", sensors: "50", interval: "hourly" },
      creatorId: "u-chercheur",
      size: "34 MB",
      downloads: 812,
      dateDepot: "2025-02-15",
    },
    {
      id: "data-03",
      titre: "Registres de morbidité clinique — Hôpital de Fann (2023)",
      description: "Dossiers cliniques anonymisés des admissions pour infections respiratoires aiguës à Dakar.",
      type: "xlsx",
      licence: "Accès restreint",
      acces: "private",
      fichiers: [],
      metadonnees: { records: "4200", anonymized: "true" },
      creatorId: "u-chercheur",
      size: "1.2 GB",
      downloads: 14,
      dateDepot: "2023-11-05",
    },
    {
      id: "data-04",
      titre: "Capteurs pluviométriques Keur Massar (2024)",
      description: "Enregistrements à haute fréquence (5 min) des niveaux d'eau des bassins de rétention lors de la saison des pluies 2024.",
      type: "csv",
      licence: "CC BY-SA 4.0",
      acces: "public",
      fichiers: ["hydro_keur_massar_2024.csv"],
      metadonnees: { frequency: "5min", sensors: "12" },
      creatorId: "u-respaxe",
      size: "89 MB",
      downloads: 504,
      dateDepot: "2024-10-20",
    },
  ];

  datasets.forEach((d) => db.datasets.set(d.id, d));

  // Events
  const events: DBEvent[] = [
    {
      id: "ev-01",
      titre: "Modélisation de la Dengue en milieu urbain sahélien : Défis et perspectives",
      description: "Ce séminaire présentera les premiers résultats du modèle multi-agents couplé aux données entomologiques de l'Institut Pasteur.",
      dateDebut: "2026-06-10T10:00:00Z",
      dateFin: "2026-06-10T12:00:00Z",
      lieu: "Salle de conférence UMMISCO — ESP Dakar",
      capacite: 60,
      inscrits: [],
      type: "seminaire",
      speaker: "Dr. Fatou Diop",
    },
    {
      id: "ev-02",
      titre: "Réseaux LoRaWAN et résilience urbaine : Retours d'expérience sur Keur Massar",
      description: "Présentation des prototypes de pluviomètres connectés et démonstration de la passerelle de transmission de données ouvertes.",
      dateDebut: "2026-06-20T15:00:00Z",
      dateFin: "2026-06-20T17:00:00Z",
      lieu: "FabLab UMMISCO, ESP UCAD",
      capacite: 30,
      inscrits: [],
      type: "atelier",
      speaker: "Dr. Moussa Ndiaye",
    },
    {
      id: "ev-03",
      titre: "IA et Systèmes Complexes : Défis théoriques de l'hybridation des modèles",
      description: "Conférence plénière explorant les méthodes de couplage entre modèles physiques et réseaux de neurones profonds.",
      dateDebut: "2026-07-05T09:30:00Z",
      dateFin: "2026-07-05T12:00:00Z",
      lieu: "Amphithéâtre IRD, Route des Pères Maristes, Hann",
      capacite: 150,
      inscrits: [],
      type: "conference",
      speaker: "Prof. Cheikh Diallo",
    },
    {
      id: "ev-04",
      titre: "Workshop : Science ouverte et partage de données dans les pays du Sud",
      description: "Atelier pratique sur les bonnes pratiques de dépôt de datasets, licences open data et publications en accès libre.",
      dateDebut: "2026-07-15T09:00:00Z",
      dateFin: "2026-07-16T17:00:00Z",
      lieu: "Salle informatique ESP UCAD",
      capacite: 25,
      inscrits: [],
      type: "atelier",
    },
  ];

  events.forEach((e) => db.events.set(e.id, e));

  // Partners
  const partners: DBPartner[] = [
    {
      id: "p-ird",
      nom: "IRD — Institut de Recherche pour le Développement",
      type: "institutionnel",
      pays: "France",
      description: "Partenaire fondateur d'UMMISCO. Fournit des financements et accueille les chercheurs dans les laboratoires français.",
      website: "https://www.ird.fr",
      projets: ["UMMISCO UMI", "ANR-ModSystèmes"],
    },
    {
      id: "p-ucad",
      nom: "UCAD — Université Cheikh Anta Diop",
      type: "academique",
      pays: "Sénégal",
      description: "Université hôte principale d'UMMISCO Dakar. Rattachement administratif à l'École Supérieure Polytechnique.",
      website: "https://www.ucad.sn",
      projets: ["ESP-UMMISCO", "Formation doctorale"],
    },
    {
      id: "p-pasteur",
      nom: "Institut Pasteur de Dakar",
      type: "academique",
      pays: "Sénégal",
      description: "Partenaire scientifique clé pour les recherches épidémiologiques et entomologiques sur le paludisme et la dengue.",
      website: "https://www.pasteur.sn",
      projets: ["Modélisation Paludisme Pikine", "Surveillance Dengue"],
    },
    {
      id: "p-anr",
      nom: "ANR — Agence Nationale de la Recherche",
      type: "bailleur",
      pays: "France",
      description: "Bailleur de fonds principal pour les projets franco-sénégalais de modélisation des systèmes complexes.",
      website: "https://anr.fr",
      projets: ["ANR-ModSystèmes", "ANR-IoT-Resilience"],
    },
    {
      id: "p-saed",
      nom: "SAED — Société d'Aménagement et d'Exploitation du Delta",
      type: "institutionnel",
      pays: "Sénégal",
      description: "Partenaire terrain pour les données hydrologiques du Fleuve Sénégal et les modèles de gestion de l'eau.",
      website: "https://www.saed.sn",
      projets: ["Hydrologie Fleuve Sénégal"],
    },
    {
      id: "p-inrae",
      nom: "INRAE — Institut National de Recherche pour l'Agriculture",
      type: "academique",
      pays: "France",
      description: "Collaborations sur la modélisation des agro-écosystèmes et la gestion durable des ressources naturelles.",
      website: "https://www.inrae.fr",
      projets: ["Agro-systèmes Afrique Sahel"],
    },
  ];

  partners.forEach((p) => db.partners.set(p.id, p));
}

// Seed only once
let seeded = false;
if (!seeded) {
  seed();
  seeded = true;
}

export default db;
