import { NextRequest } from "next/server";
import db, { DBSimulation } from "@/lib/db";
import { getBearerToken, verifyToken, jsonError, jsonOk } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = getBearerToken(req);
  if (!token) return jsonError("Non authentifié.", 401);
  const payload = await verifyToken(token);
  if (!payload) return jsonError("Token invalide.", 401);

  const userSims = Array.from(db.simulations.values()).filter(
    (s) => s.userId === payload.sub || payload.role === "directeur"
  );
  return jsonOk(userSims);
}

export async function POST(req: NextRequest) {
  const token = getBearerToken(req);
  if (!token) return jsonError("Non authentifié.", 401);
  const payload = await verifyToken(token);
  if (!payload) return jsonError("Token invalide.", 401);
  if (!["chercheur", "responsable_axe", "directeur", "partenaire", "etudiant"].includes(payload.role)) {
    return jsonError("Accès refusé.", 403);
  }

  const body = await req.json();
  const { type, parametres, accesPublic } = body;
  if (!type) return jsonError("Type de simulation requis.", 400);

  const id = `sim-${Date.now()}`;
  // Results will be ready after a random delay of 4-10 seconds
  const delay = 4000 + Math.random() * 6000;
  const completionTime = Date.now() + delay;

  const sim: DBSimulation = {
    id,
    type,
    parametres: parametres || {},
    statut: "en_cours",
    dateLancement: new Date().toISOString(),
    completionTime,
    userId: payload.sub,
    accesPublic: accesPublic || false,
  };

  db.simulations.set(id, sim);
  return jsonOk(sim, 201);
}
