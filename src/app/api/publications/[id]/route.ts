import { NextRequest } from "next/server";
import db from "@/lib/db";
import { getBearerToken, verifyToken, jsonError, jsonOk } from "@/lib/auth";

interface Params { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const pub = db.publications.get(id);
  if (!pub) return jsonError("Publication introuvable.", 404);
  return jsonOk(pub);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const token = getBearerToken(req);
  if (!token) return jsonError("Non authentifié.", 401);
  const payload = await verifyToken(token);
  if (!payload || payload.role !== "directeur") return jsonError("Accès refusé.", 403);

  const pub = db.publications.get(id);
  if (!pub) return jsonError("Publication introuvable.", 404);

  const { statut } = await req.json();
  if (!["validee", "rejetee", "en_attente"].includes(statut)) {
    return jsonError("Statut invalide.", 400);
  }

  const updated = { ...pub, statut };
  db.publications.set(id, updated);
  return jsonOk(updated);
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const token = getBearerToken(req);
  if (!token) return jsonError("Non authentifié.", 401);
  const payload = await verifyToken(token);
  if (!payload || payload.role !== "directeur") return jsonError("Accès refusé.", 403);

  db.publications.delete(id);
  return jsonOk({ deleted: id });
}
