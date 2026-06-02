import { NextRequest } from "next/server";
import db from "@/lib/db";
import { getBearerToken, verifyToken, jsonError, jsonOk } from "@/lib/auth";

export async function GET() {
  const events = Array.from(db.events.values()).sort(
    (a, b) => new Date(a.dateDebut).getTime() - new Date(b.dateDebut).getTime()
  );
  return jsonOk(events);
}

export async function POST(req: NextRequest) {
  const token = getBearerToken(req);
  if (!token) return jsonError("Non authentifié.", 401);
  const payload = await verifyToken(token);
  if (!payload || !["responsable_axe", "directeur"].includes(payload.role)) {
    return jsonError("Accès refusé.", 403);
  }

  const body = await req.json();
  const { titre, description, dateDebut, dateFin, lieu, capacite, type } = body;
  if (!titre || !dateDebut || !lieu) return jsonError("Champs requis manquants.", 400);

  const id = `ev-${Date.now()}`;
  const event = {
    id, titre, description: description || "",
    dateDebut, dateFin: dateFin || dateDebut,
    lieu, capacite: capacite || 50,
    inscrits: [], type: type || "autre",
  };

  db.events.set(id, event);
  return jsonOk(event, 201);
}
