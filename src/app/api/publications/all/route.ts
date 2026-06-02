import { NextRequest } from "next/server";
import db from "@/lib/db";
import { getBearerToken, verifyToken, jsonError, jsonOk } from "@/lib/auth";

// Admin/directeur route: returns all publications regardless of status
export async function GET(req: NextRequest) {
  const token = getBearerToken(req);
  if (!token) return jsonError("Non authentifié.", 401);
  const payload = await verifyToken(token);
  if (!payload || payload.role !== "directeur") return jsonError("Accès refusé.", 403);

  return jsonOk(Array.from(db.publications.values()));
}
