import { NextRequest } from "next/server";
import db from "@/lib/db";
import { getBearerToken, verifyToken, jsonError, jsonOk } from "@/lib/auth";

interface Params { params: Promise<{ id: string }> }

export async function POST(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const token = getBearerToken(req);
  if (!token) return jsonError("Non authentifié.", 401);
  const payload = await verifyToken(token);
  if (!payload) return jsonError("Token invalide.", 401);

  const event = db.events.get(id);
  if (!event) return jsonError("Événement introuvable.", 404);

  if (event.inscrits.includes(payload.sub)) {
    return jsonOk({ message: "Déjà inscrit." });
  }

  if (event.inscrits.length >= event.capacite) {
    return jsonError("Capacité maximale atteinte.", 409);
  }

  const updated = { ...event, inscrits: [...event.inscrits, payload.sub] };
  db.events.set(id, updated);
  return jsonOk({ message: "Inscription confirmée." });
}
