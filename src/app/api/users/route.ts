import { NextRequest } from "next/server";
import db from "@/lib/db";
import { getBearerToken, verifyToken, jsonError, jsonOk } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = getBearerToken(req);
  if (!token) return jsonError("Non authentifié.", 401);
  const payload = await verifyToken(token);
  if (!payload || payload.role !== "directeur") return jsonError("Accès refusé.", 403);

  const users = Array.from(db.users.values()).map(({ password: _pw, ...u }) => u);
  return jsonOk(users);
}

export async function PUT(req: NextRequest) {
  const token = getBearerToken(req);
  if (!token) return jsonError("Non authentifié.", 401);
  const payload = await verifyToken(token);
  if (!payload || payload.role !== "directeur") return jsonError("Accès refusé.", 403);

  const { userId, role } = await req.json();
  const user = db.users.get(userId);
  if (!user) return jsonError("Utilisateur introuvable.", 404);

  const updated = { ...user, role };
  db.users.set(userId, updated);
  const { password: _pw, ...safe } = updated;
  return jsonOk(safe);
}
