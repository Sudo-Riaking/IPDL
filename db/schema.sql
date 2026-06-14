-- ============================================================================
-- UMMISCO — Schéma MySQL (8.0+)
-- Calqué sur le modèle de données actuel (src/lib/db/index.ts).
-- Les champs « tableau » et « objet » du modèle TypeScript sont stockés en JSON.
-- À exécuter sur une base MySQL hébergée (PlanetScale, Railway, Aiven, TiDB…).
--   mysql -h <host> -u <user> -p <database> < db/schema.sql
-- ============================================================================

SET NAMES utf8mb4;

-- ── Utilisateurs ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            VARCHAR(64)  PRIMARY KEY,
  nom           VARCHAR(191) NOT NULL,
  email         VARCHAR(191) NOT NULL UNIQUE,
  password      VARCHAR(255) NOT NULL,          -- bcrypt en production
  role          VARCHAR(32)  NOT NULL,          -- directeur / chercheur / etudiant / partenaire / responsable_axe / visiteur
  langue        VARCHAR(8)   NOT NULL DEFAULT 'fr',
  biographie    TEXT         NULL,
  expertises    JSON         NULL,              -- string[]
  est_doctorant TINYINT(1)   NULL,
  organisation  VARCHAR(191) NULL,
  domaine       VARCHAR(191) NULL,
  permissions   JSON         NULL,              -- string[] (permissions accordées individuellement)
  active        TINYINT(1)   NOT NULL DEFAULT 1,
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_users_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Rôles ACL (composés de permissions) ────────────────────────────────────
CREATE TABLE IF NOT EXISTS roles (
  id          VARCHAR(64)  PRIMARY KEY,
  name        VARCHAR(191) NOT NULL,
  description TEXT         NULL,
  permissions JSON         NOT NULL,            -- string[] (ids du catalogue PERMISSIONS)
  is_system   TINYINT(1)   NOT NULL DEFAULT 0,
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Demandes d'accès (modèle ACL) ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS access_requests (
  id             VARCHAR(64)  PRIMARY KEY,
  user_id        VARCHAR(64)  NOT NULL,
  user_name      VARCHAR(191) NOT NULL,
  user_email     VARCHAR(191) NOT NULL,
  permission     VARCHAR(64)  NOT NULL,
  resource_label VARCHAR(255) NOT NULL,
  reason         TEXT         NOT NULL,
  status         VARCHAR(16)  NOT NULL DEFAULT 'en_attente', -- en_attente / approuvee / refusee
  created_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  decided_at     DATETIME     NULL,
  decided_by     VARCHAR(191) NULL,
  INDEX idx_req_status (status),
  CONSTRAINT fk_req_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Publications ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS publications (
  id                VARCHAR(64)  PRIMARY KEY,
  titre             TEXT         NOT NULL,
  resume            TEXT         NOT NULL,
  auteurs           JSON         NOT NULL,       -- string[] (noms affichés)
  author_ids        JSON         NOT NULL,       -- string[] (ids users)
  journal           VARCHAR(255) NULL,
  volume            VARCHAR(32)  NULL,
  numero            VARCHAR(32)  NULL,
  pages             VARCHAR(32)  NULL,
  doi               VARCHAR(128) NULL,
  annee             INT          NOT NULL,
  date_publication  DATE         NOT NULL,
  mots_clefs        JSON         NULL,           -- string[]
  fichier_pdf       VARCHAR(512) NULL,
  google_scholar_url VARCHAR(512) NULL,
  datasets_lies     JSON         NULL,           -- string[]
  statut            VARCHAR(16)  NOT NULL DEFAULT 'en_attente', -- en_attente / validee / rejetee
  axe               VARCHAR(32)  NOT NULL,
  access_level      VARCHAR(16)  NOT NULL DEFAULT 'public',     -- public / protected / private
  citation_apa      TEXT         NULL,
  citation_bibtex   TEXT         NULL,
  INDEX idx_pub_statut (statut),
  INDEX idx_pub_axe (axe)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Datasets ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS datasets (
  id          VARCHAR(64)  PRIMARY KEY,
  titre       TEXT         NOT NULL,
  description TEXT         NOT NULL,
  type        VARCHAR(32)  NOT NULL,
  licence     VARCHAR(64)  NOT NULL,
  acces       VARCHAR(16)  NOT NULL DEFAULT 'public', -- public / protected / private
  fichiers    JSON         NULL,                       -- string[]
  metadonnees JSON         NULL,                       -- objet clé→valeur
  creator_id  VARCHAR(64)  NOT NULL,
  size        VARCHAR(32)  NULL,
  downloads   INT          NOT NULL DEFAULT 0,
  date_depot  DATE         NOT NULL,
  INDEX idx_ds_acces (acces)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Simulations ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS simulations (
  id              VARCHAR(64) PRIMARY KEY,
  type            VARCHAR(64) NOT NULL,
  parametres      JSON        NOT NULL,
  resultats       JSON        NULL,
  statut          VARCHAR(16) NOT NULL DEFAULT 'en_cours', -- en_cours / terminee / erreur
  date_lancement  DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completion_time BIGINT      NOT NULL,
  user_id         VARCHAR(64) NOT NULL,
  acces_public    TINYINT(1)  NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Événements ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
  id          VARCHAR(64)  PRIMARY KEY,
  titre       TEXT         NOT NULL,
  description TEXT         NOT NULL,
  date_debut  DATETIME     NOT NULL,
  date_fin    DATETIME     NOT NULL,
  lieu        VARCHAR(255) NOT NULL,
  capacite    INT          NOT NULL DEFAULT 0,
  inscrits    JSON         NULL,                 -- string[] (ids users)
  type        VARCHAR(16)  NOT NULL,             -- seminaire / conference / atelier / autre
  speaker     VARCHAR(191) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Newsletter ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS newsletter (
  id                VARCHAR(64)  PRIMARY KEY,
  email             VARCHAR(191) NOT NULL UNIQUE,
  date_inscription  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Partenaires ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partners (
  id          VARCHAR(64)  PRIMARY KEY,
  nom         VARCHAR(255) NOT NULL,
  type        VARCHAR(32)  NOT NULL,             -- academique / institutionnel / industriel / bailleur
  pays        VARCHAR(64)  NOT NULL,
  description TEXT         NOT NULL,
  website     VARCHAR(512) NULL,
  logo        VARCHAR(512) NULL,
  projets     JSON         NULL                  -- string[]
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
