import { NextRequest } from "next/server";
import db, { DBPublication } from "@/lib/db";
import { getBearerToken, verifyToken, jsonError, jsonOk } from "@/lib/auth";

export async function GET() {
  const visible = Array.from(db.publications.values()).filter((p) => p.statut === "validee");
  return jsonOk(visible);
}

export async function POST(req: NextRequest) {
  const token = getBearerToken(req);
  if (!token) return jsonError("Non authentifié.", 401);
  const payload = await verifyToken(token);
  if (!payload) return jsonError("Token invalide.", 401);
  if (!["chercheur", "responsable_axe", "directeur"].includes(payload.role)) {
    return jsonError("Accès refusé.", 403);
  }

  const body = await req.json();
  const {
    titre, resume, auteurs, axe, accessLevel,
    journal, volume, numero, pages, doi, annee,
    motsClefs, fichierPdf, googleScholarUrl, datasetsLies,
    citationApa, citationBibtex,
  } = body;

  if (!titre || !resume || !axe) return jsonError("Champs requis manquants.", 400);

  const id = `pub-${Date.now()}`;
  const pub: DBPublication = {
    id,
    titre,
    resume,
    auteurs: Array.isArray(auteurs) ? auteurs : [payload.nom],
    authorIds: [payload.sub],
    journal:          journal          || undefined,
    volume:           volume           || undefined,
    numero:           numero           || undefined,
    pages:            pages            || undefined,
    doi:              doi              || undefined,
    annee:            Number(annee)    || new Date().getFullYear(),
    datePublication:  new Date().toISOString().split("T")[0],
    motsClefs:        Array.isArray(motsClefs) ? motsClefs : [],
    fichierPdf:       fichierPdf       || undefined,
    googleScholarUrl: googleScholarUrl || undefined,
    datasetsLies:     Array.isArray(datasetsLies) ? datasetsLies : [],
    statut:           payload.role === "directeur" ? "validee" : "en_attente",
    axe:              axe || "epidemiology",
    accessLevel:      accessLevel || "public",
    citationApa:      citationApa  || "",
    citationBibtex:   citationBibtex || "",
  };

  db.publications.set(id, pub);
  return jsonOk(pub, 201);
}
