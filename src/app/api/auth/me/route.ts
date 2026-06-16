import { NextRequest } from "next/server";
import db from "@/lib/db";
import { getBearerToken, verifyToken, jsonError, jsonOk } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = getBearerToken(req);
  if (!token) return jsonError("Token manquant.", 401);

  const payload = await verifyToken(token);
  if (!payload) return jsonError("Token invalide ou expiré.", 401);

  const user = db.users.get(payload.sub);
  if (!user) return jsonError("Utilisateur introuvable.", 404);

  const { password: _pw, ...safeUser } = user;
  return jsonOk(safeUser);
}

const ALLOWED_FIELDS = [
  "avatar", "biographie", "telephone", "orcid", "lienExterne",
  "affiliation", "centre", "organisation", "domaine", "expertises",
  "estDoctorant", "directeurThese", "anneeThese", "universiteInscription",
  "typeOrganisation", "pays", "siteWeb",
] as const;

export async function PATCH(req: NextRequest) {
  const token = getBearerToken(req);
  if (!token) return jsonError("Token manquant.", 401);

  const payload = await verifyToken(token);
  if (!payload) return jsonError("Token invalide ou expiré.", 401);

  const user = db.users.get(payload.sub);
  if (!user) return jsonError("Utilisateur introuvable.", 404);

  const body = await req.json();
  const patch: Record<string, unknown> = {};
  for (const key of ALLOWED_FIELDS) {
    if (key in body) patch[key] = body[key];
  }

  const updated = { ...user, ...patch };
  db.users.set(user.id, updated);

  const { password: _pw, ...safeUser } = updated;
  return jsonOk(safeUser);
}
