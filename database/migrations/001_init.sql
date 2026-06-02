-- ============================================================
--  UMMISCO Portal — Migration initiale
--  Compatible : PostgreSQL 14+ / MySQL 8+
--  Créé le : 2026-05-29
-- ============================================================

-- ── Types énumérés (PostgreSQL) ──────────────────────────────
-- Pour MySQL : remplacer par ENUM('val1','val2') directement
--              dans la définition de colonne.
CREATE TYPE user_role AS ENUM (
  'visiteur', 'etudiant', 'chercheur',
  'responsable_axe', 'partenaire', 'directeur'
);

CREATE TYPE pub_status AS ENUM (
  'en_attente', 'validee', 'rejetee'
);

CREATE TYPE access_level AS ENUM (
  'public', 'protected', 'private'
);

CREATE TYPE sim_status AS ENUM (
  'en_cours', 'terminee', 'erreur'
);

CREATE TYPE event_type AS ENUM (
  'seminaire', 'conference', 'atelier', 'autre'
);

CREATE TYPE partner_type AS ENUM (
  'academique', 'institutionnel', 'industriel', 'bailleur'
);

-- ── Table : users ────────────────────────────────────────────
CREATE TABLE users (
  id            VARCHAR(50)   PRIMARY KEY,
  nom           VARCHAR(150)  NOT NULL,
  email         VARCHAR(254)  NOT NULL UNIQUE,
  password_hash VARCHAR(255)  NOT NULL,               -- bcrypt hash
  role          user_role     NOT NULL DEFAULT 'etudiant',
  langue        CHAR(2)       NOT NULL DEFAULT 'fr',
  biographie    TEXT,
  expertises    TEXT[],                               -- PostgreSQL array
  -- MySQL alt : expertises JSON
  est_doctorant BOOLEAN       DEFAULT FALSE,
  directeur_these VARCHAR(150),
  organisation  VARCHAR(200),
  domaine       VARCHAR(150),
  active        BOOLEAN       NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email  ON users (email);
CREATE INDEX idx_users_role   ON users (role);

-- ── Table : axes ─────────────────────────────────────────────
CREATE TABLE axes (
  id          VARCHAR(50)  PRIMARY KEY,
  nom         VARCHAR(150) NOT NULL,
  description TEXT,
  mots_clefs  TEXT[],
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ── Table : publications ──────────────────────────────────────
CREATE TABLE publications (
  id                 VARCHAR(50)   PRIMARY KEY,
  titre              TEXT          NOT NULL,
  resume             TEXT          NOT NULL,
  journal            VARCHAR(255),
  volume             VARCHAR(20),
  numero             VARCHAR(20),
  pages              VARCHAR(50),
  doi                VARCHAR(150)  UNIQUE,
  annee              SMALLINT      NOT NULL,
  date_publication   DATE          NOT NULL,
  mots_clefs         TEXT[],
  fichier_pdf        VARCHAR(500),                   -- URL ou chemin stockage
  google_scholar_url VARCHAR(500),
  axe_id             VARCHAR(50)   REFERENCES axes(id) ON DELETE SET NULL,
  access_level       access_level  NOT NULL DEFAULT 'public',
  statut             pub_status    NOT NULL DEFAULT 'en_attente',
  citation_apa       TEXT,
  citation_bibtex    TEXT,
  created_at         TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_pub_axe     ON publications (axe_id);
CREATE INDEX idx_pub_statut  ON publications (statut);
CREATE INDEX idx_pub_annee   ON publications (annee);
-- Full-text search (PostgreSQL)
CREATE INDEX idx_pub_fts ON publications
  USING GIN (to_tsvector('french', titre || ' ' || resume));

-- ── Table : publication_auteurs (relation N:N) ───────────────
CREATE TABLE publication_auteurs (
  publication_id VARCHAR(50) REFERENCES publications(id) ON DELETE CASCADE,
  user_id        VARCHAR(50) REFERENCES users(id)        ON DELETE CASCADE,
  nom_affiche    VARCHAR(150) NOT NULL,               -- nom tel qu'affiché
  ordre          SMALLINT    NOT NULL DEFAULT 1,
  PRIMARY KEY (publication_id, user_id)
);

-- ── Table : publication_datasets (relation N:N) ──────────────
CREATE TABLE publication_datasets (
  publication_id VARCHAR(50) REFERENCES publications(id) ON DELETE CASCADE,
  dataset_id     VARCHAR(50) REFERENCES datasets(id)     ON DELETE CASCADE,
  PRIMARY KEY (publication_id, dataset_id)
);
-- NOTE : forward reference vers datasets, créée après

-- ── Table : datasets ─────────────────────────────────────────
CREATE TABLE datasets (
  id            VARCHAR(50)  PRIMARY KEY,
  titre         TEXT         NOT NULL,
  description   TEXT,
  type          VARCHAR(20)  NOT NULL DEFAULT 'csv',  -- csv, json, xlsx...
  licence       VARCHAR(100),
  acces         access_level NOT NULL DEFAULT 'public',
  taille        VARCHAR(30),
  nb_downloads  INTEGER      NOT NULL DEFAULT 0,
  metadonnees   JSONB,
  creator_id    VARCHAR(50)  REFERENCES users(id) ON DELETE SET NULL,
  date_depot    DATE         NOT NULL DEFAULT CURRENT_DATE,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Contrainte FK différée pour résoudre la référence circulaire
ALTER TABLE publication_datasets
  ADD CONSTRAINT fk_pd_dataset
  FOREIGN KEY (dataset_id) REFERENCES datasets(id) ON DELETE CASCADE;

CREATE INDEX idx_ds_creator ON datasets (creator_id);
CREATE INDEX idx_ds_acces   ON datasets (acces);

-- ── Table : dataset_fichiers ─────────────────────────────────
CREATE TABLE dataset_fichiers (
  id         SERIAL      PRIMARY KEY,
  dataset_id VARCHAR(50) NOT NULL REFERENCES datasets(id) ON DELETE CASCADE,
  nom        VARCHAR(255) NOT NULL,
  url        VARCHAR(500),
  taille     VARCHAR(30),
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Table : simulations ───────────────────────────────────────
CREATE TABLE simulations (
  id              VARCHAR(50)  PRIMARY KEY,
  type            VARCHAR(50)  NOT NULL,              -- epidemiologie, hydrologie...
  parametres      JSONB        NOT NULL DEFAULT '{}',
  resultats       JSONB,
  statut          sim_status   NOT NULL DEFAULT 'en_cours',
  completion_time BIGINT,                             -- Unix ms
  user_id         VARCHAR(50)  REFERENCES users(id) ON DELETE CASCADE,
  acces_public    BOOLEAN      NOT NULL DEFAULT FALSE,
  date_lancement  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sim_user   ON simulations (user_id);
CREATE INDEX idx_sim_statut ON simulations (statut);

-- ── Table : events (séminaires, conférences...) ───────────────
CREATE TABLE events (
  id          VARCHAR(50)  PRIMARY KEY,
  titre       TEXT         NOT NULL,
  description TEXT,
  type        event_type   NOT NULL DEFAULT 'autre',
  date_debut  TIMESTAMPTZ  NOT NULL,
  date_fin    TIMESTAMPTZ,
  lieu        VARCHAR(300),
  capacite    INTEGER      NOT NULL DEFAULT 50,
  speaker     VARCHAR(150),
  axe_id      VARCHAR(50)  REFERENCES axes(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ── Table : event_inscrits (N:N) ─────────────────────────────
CREATE TABLE event_inscrits (
  event_id  VARCHAR(50) REFERENCES events(id)  ON DELETE CASCADE,
  user_id   VARCHAR(50) REFERENCES users(id)   ON DELETE CASCADE,
  inscrit_le TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (event_id, user_id)
);

-- ── Table : partners ──────────────────────────────────────────
CREATE TABLE partners (
  id          VARCHAR(50)   PRIMARY KEY,
  nom         VARCHAR(200)  NOT NULL,
  type        partner_type  NOT NULL,
  pays        VARCHAR(100),
  description TEXT,
  website     VARCHAR(500),
  logo_url    VARCHAR(500),
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ── Table : partner_projets ───────────────────────────────────
CREATE TABLE partner_projets (
  id         SERIAL      PRIMARY KEY,
  partner_id VARCHAR(50) NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  titre      VARCHAR(200) NOT NULL
);

-- ── Table : newsletter ────────────────────────────────────────
CREATE TABLE newsletter (
  id                SERIAL      PRIMARY KEY,
  email             VARCHAR(254) NOT NULL UNIQUE,
  date_inscription  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  active            BOOLEAN      NOT NULL DEFAULT TRUE
);

-- ── Table : contact_messages ──────────────────────────────────
CREATE TABLE contact_messages (
  id         SERIAL      PRIMARY KEY,
  nom        VARCHAR(150) NOT NULL,
  email      VARCHAR(254) NOT NULL,
  sujet      VARCHAR(300),
  message    TEXT         NOT NULL,
  lu         BOOLEAN      NOT NULL DEFAULT FALSE,
  cree_le    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ── Trigger : updated_at automatique ─────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_publications_updated_at
  BEFORE UPDATE ON publications
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_datasets_updated_at
  BEFORE UPDATE ON datasets
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── Données initiales : axes ──────────────────────────────────
INSERT INTO axes (id, nom, description) VALUES
  ('epidemiology',    'Épidémiologie & Santé',   'Modélisation des maladies infectieuses'),
  ('iot',             'IoT & Systèmes Embarqués', 'Capteurs connectés et résilience urbaine'),
  ('citizen-science', 'Science Citoyenne',        'Données participatives et environnement'),
  ('environment',     'Environnement & Risques',  'Érosion côtière et changement climatique'),
  ('fablab',          'FabLab & Prototypage',     'Open hardware et matériel scientifique');

-- ── Compte admin initial ──────────────────────────────────────
-- IMPORTANT : remplacer le hash par un vrai hash bcrypt en production
-- Générer avec : SELECT crypt('motdepasse', gen_salt('bf', 12));
INSERT INTO users (id, nom, email, password_hash, role) VALUES
  ('u-admin', 'Administrateur UMMISCO', 'admin@ummisco.sn',
   '$2b$12$REMPLACER_PAR_HASH_BCRYPT', 'directeur');
