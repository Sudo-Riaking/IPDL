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
