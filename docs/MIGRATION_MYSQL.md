# Migration vers MySQL — Guide prêt à l'emploi

> **État actuel** : la base est **en mémoire** (`src/lib/db/index.ts`), seedée au
> démarrage. C'est parfait pour la démo (rien à provisionner). Ce guide permet de
> **brancher MySQL plus tard**, sans pression, en suivant des étapes testées.
>
> ⚠️ Ne lance cette migration **qu'après** la démo/évaluation : tant que tout
> fonctionne en mémoire, ne casse rien.

---

## 1. Provisionner une base MySQL hébergée

Vercel étant *serverless*, il n'héberge pas MySQL. Choisis un hébergeur (offre
gratuite) :

| Service | Note |
|---------|------|
| **Railway** (railway.app) | Le plus simple : crée un service MySQL, copie la `MYSQL_URL`. |
| **Aiven** (aiven.io) | MySQL managé, plan gratuit. |
| **PlanetScale** | MySQL-compatible (attention : pas de clés étrangères classiques). |
| **TiDB Cloud** | MySQL-compatible, généreux en gratuit. |

Récupère une **connection string** de la forme :
`mysql://user:password@host:3306/database`

---

## 2. Appliquer le schéma

```bash
mysql -h <host> -P 3306 -u <user> -p <database> < db/schema.sql
```

(Ou colle le contenu de `db/schema.sql` dans la console SQL de l'hébergeur.)

---

## 3. Installer le client

```bash
npm install mysql2
```

Ajoute la variable d'environnement (local : `.env.local` ; Vercel : Settings →
Environment Variables → **Production**) :

```
DATABASE_URL=mysql://user:password@host:3306/database
```

---

## 4. Module de connexion — `src/lib/db/mysql.ts`

Crée ce fichier (pool réutilisé entre invocations *serverless* « chaudes ») :

```ts
import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      uri: process.env.DATABASE_URL,
      connectionLimit: 5,
      // PlanetScale/Aiven exigent souvent TLS :
      // ssl: { rejectUnauthorized: true },
      enableKeepAlive: true,
    });
  }
  return pool;
}

/** true si une base MySQL est configurée (sinon on reste en mémoire). */
export const USE_MYSQL = Boolean(process.env.DATABASE_URL);

export async function query<T = unknown>(sql: string, params: unknown[] = []): Promise<T[]> {
  const [rows] = await getPool().execute(sql, params);
  return rows as T[];
}
```

> `mysql2` parse automatiquement les colonnes `JSON` en objets JS, et accepte un
> objet/tableau JS comme paramètre d'une colonne `JSON` (il le sérialise).

---

## 5. Patron de bascule des routes (sync → async)

La couche actuelle est **synchrone** (`db.users.get(id)`). MySQL est
**asynchrone** : chaque accès devient `await`. Convertis **route par route** —
l'app continue de tourner en mémoire pour les routes non encore migrées.

### Exemple — `src/app/api/users/route.ts`

**Avant (en mémoire) :**
```ts
const users = Array.from(db.users.values()).map(({ password, ...u }) => u);
return jsonOk(users);
```

**Après (MySQL) :**
```ts
import { query } from "@/lib/db/mysql";

const rows = await query<DBUser>("SELECT * FROM users ORDER BY created_at DESC");
const users = rows.map(({ password, ...u }) => u);
return jsonOk(users);
```

**Mise à jour du rôle (PUT) :**
```ts
await query("UPDATE users SET role = ? WHERE id = ?", [role, userId]);
```

### Exemple — Demande d'accès approuvée (cœur ACL)

```ts
// Marquer la demande
await query(
  "UPDATE access_requests SET status = ?, decided_at = NOW(), decided_by = ? WHERE id = ?",
  [decision, payload.nom, id]
);
// Si approuvée, ajouter la permission à l'utilisateur (colonne JSON)
if (decision === "approuvee") {
  await query(
    "UPDATE users SET permissions = JSON_ARRAY_APPEND(COALESCE(permissions, JSON_ARRAY()), '$', ?) WHERE id = ?",
    [req.permission, req.userId]
  );
}
```

### Mapping colonnes ↔ TypeScript

Le SQL utilise `snake_case` (`author_ids`, `date_publication`), le TS utilise
`camelCase` (`authorIds`, `datePublication`). Soit tu fais le mapping dans
chaque requête (`SELECT author_ids AS authorIds`), soit tu ajoutes un petit
adaptateur de lignes. Garde une seule convention.

---

## 6. Seed initial de la base

Le plus simple : insère les données du seed actuel **une fois**. Crée
`scripts/seed-mysql.mjs` (exécuté avec `node scripts/seed-mysql.mjs`, hors build
Next) qui ouvre une connexion `mysql2` et fait les `INSERT` à partir des mêmes
valeurs que `src/lib/db/index.ts` (users de démo, publications, datasets,
événements, partenaires, rôles ACL, demandes d'accès).

> Astuce : tu peux copier les tableaux d'objets du seed actuel et générer les
> `INSERT ... VALUES` en bouclant dessus, en passant les champs tableau/objet via
> `JSON.stringify(...)`.

---

## 7. Stratégie recommandée

1. Migrer d'abord les routes **lecture seule** publiques (`/api/partners`,
   `/api/publications/all`) → faible risque, vérifie que la connexion marche.
2. Puis l'**auth** (`/api/auth/login`, `register`, `me`).
3. Puis l'**ACL** (`/api/acl/*`) et la **validation** des publications.
4. Garder `USE_MYSQL` comme garde : si `DATABASE_URL` est absent, conserver le
   comportement en mémoire (utile en local sans base).

Ainsi la bascule est **progressive et réversible** — aucun « big bang ».
