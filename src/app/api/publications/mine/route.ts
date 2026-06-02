import { NextRequest } from "next/server";
import db from "@/lib/db";
import { getBearerToken, verifyToken, jsonError, jsonOk } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = getBearerToken(req);
  if (!token) return jsonError("Non authentifié.", 401);
  const payload = await verifyToken(token);
  if (!payload) return jsonError("Token invalide.", 401);

  const mine = Array.from(db.publications.values()).filter(
    (p) => p.authorIds.includes(payload.sub)
  );
  return jsonOk(mine);
}
