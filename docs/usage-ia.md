# Traçabilité de l'Usage de l'Intelligence Artificielle (IPDL — Groupe 8)

Conformément aux exigences académiques du module **Ingénierie des Processus de Développement Logiciel (IPDL)** à l'École Supérieure Polytechnique (ESP/UCAD), ce document présente de manière transparente le niveau de contribution de l'IA dans l'élaboration de la démonstration du portail UMMISCO.

---

## 1. Synthèse de l'utilisation de l'IA

Chaque étape du projet a fait l'objet d'une collaboration structurée entre l'équipe humaine du Groupe 8 et les agents d'assistance IA, sous une supervision et une validation constantes des membres du groupe.

| Tâche / Module | IA Utilisée | Rôle / Sous-tâche Déléguée | Niveau de Supervision Humaine | Justification & Valeur Ajoutée |
| :--- | :--- | :--- | :--- | :--- |
| **01 // Extraction des Notes** | Python script & GPT | Extraction de texte depuis les comptes rendus locaux (`.pdf` et `.docx`). | **Totale (100%)** : Définition des règles d'extraction et des fichiers sources. | A permis de digérer rapidement plus de 30 pages de notes pour en extraire la vision. |
| **02 // Modélisation UML & Architecture** | Agents IA | Aide à la mise en forme du code source Mermaid (`.mmd`) pour l'architecture et les cas d'utilisation. | **Haute (80%)** : Les 6 acteurs et les 4 couches de l'architecture ont été conçus par le groupe d'ingénieurs. L'IA a aidé à la syntaxe Mermaid. | Clarté et conformité immédiate avec le moteur de rendu Mermaid. |
| **03 // Conception Graphique & SVG** | Agents IA | Génération et dimensionnement des balises SVG pour reproduire précisément le logo UMMISCO. | **Haute (90%)** : Le groupe a spécifié les couleurs exactes, la disposition asymétrique des rectangles et les arcs de cercle. | Rendu vectoriel parfait et animable directement en CSS. |
| **04 // Portail UMMISCO Réel (Démonstration)** | Agents IA | Écriture des squelettes des pages fonctionnelles du portail d'UMMISCO (recherche globale unifiée, filtres de publications, profil chercheur type, intégration d'iframes doctoraux NetLogo, connexion Keycloak). | **Haute (90%)** : Intégration de la navigation multi-pages Next.js, mise en place des données factuelles réalistes d'UMMISCO (noms de chercheurs sénégalais, publications d'Hann et Keur Massar, etc.) et styles CSS. | Création d'une démonstration fonctionnelle complète qui donne l'impression d'un portail réel livré. |

---

## 1bis. Itération de finalisation (Construction — juin 2026)

Suite à la revue client (séance de démonstration), une itération de construction a
été menée pour lever les remarques et renforcer la dimension « application web ».
L'IA a servi d'accélérateur sous supervision et validation des membres du groupe.

| Tâche / Module | Rôle délégué à l'IA | Supervision humaine | Valeur ajoutée |
| :--- | :--- | :--- | :--- |
| **Identité visuelle** | Intégration du logo officiel UMMISCO (composant `BrandLogo`), favicon, mise en avant dans la navigation et le hero. | **Totale** : choix de la charte et de l'emplacement. | Lisibilité immédiate de la marque (remarque client levée). |
| **Comptes de démonstration** | Connexion en 1 clic par rôle (Directeur, Chercheur, Responsable d'axe, Étudiant, Partenaire). | **Totale** : définition des rôles et de leurs droits. | Le client teste chaque profil sans saisir d'identifiants ni lire de code. |
| **Architecture de l'information** | Allègement de la page d'accueil ; répartition du contenu vers les pages dédiées. | **Haute** : arbitrage des sections à conserver. | Page d'accueil épurée, parcours plus clair. |
| **Modèle ACL** | Permissions atomiques, composition dynamique de rôles, file de demandes d'accès (API + interface directeur). | **Haute** : modèle de permissions défini par le groupe d'après les entretiens. | Concrétise le besoin ACL exprimé par le client. |
| **Référencement Scholar/DOI** | Génération des liens Google Scholar et DOI sur chaque publication. | **Totale** : règle « référencer, ne pas héberger ». | Conforme à la demande d'intégration Google Scholar. |
| **Suivi méthodologique** | Rédaction du document de suivi du Processus Unifié (`SUIVI_PROCESSUS_UNIFIE.md`). | **Haute** : relecture et validation du contenu UP. | Traçabilité phases ↔ application. |



Le Groupe 8 certifie que :
1. **La pensée architecturale** et la conception du portail (modèle de données factuelles avec 4 chercheurs clés d'UMMISCO, division des publications en axes thématiques d'Hann, modèle d'accès granulaire aux datasets public/protégé/privé, isolation par iframe sandbox des simulations, intégration de Keycloak) **est entièrement issue de nos réflexions collectives** et des entretiens avec les chercheurs d'UMMISCO.
2. L'IA a été employée comme un accélérateur de code et un outil de structuration, aucun code n'ayant été déployé sans avoir été relu, compris, et validé par l'équipe.

---
*Document produit à Dakar, Sénégal, le 19 Mai 2026 par le Groupe 8.*
