import { NextRequest } from "next/server";
import db from "@/lib/db";
import { getBearerToken, verifyToken, jsonError, jsonOk } from "@/lib/auth";

interface Params { params: Promise<{ id: string }> }

function generateResults(type: string, parametres: Record<string, unknown>) {
  const base: Record<string, unknown> = {
    type,
    completedAt: new Date().toISOString(),
    summary: "Simulation terminée avec succès.",
  };

  if (type === "epidemiologie") {
    const pop = Number(parametres.population) || 10000;
    const beta = Number(parametres.beta) || 0.3;
    const gamma = Number(parametres.gamma) || 0.1;
    const r0 = (beta / gamma).toFixed(2);
    const peakInfected = Math.round(pop * 0.35 * Math.random());
    return {
      ...base,
      r0: parseFloat(r0),
      peakInfected,
      totalCases: Math.round(peakInfected * 2.5),
      durationDays: Math.round(60 + Math.random() * 90),
      herdImmunityThreshold: `${(100 * (1 - 1 / parseFloat(r0))).toFixed(1)}%`,
      timeSeries: Array.from({ length: 10 }, (_, i) => ({
        day: i * 10,
        susceptibles: Math.round(pop * Math.exp(-beta * i * 10 / 100)),
        infectes: Math.round(peakInfected * Math.sin((Math.PI * i) / 9)),
        retablis: Math.round(pop * 0.1 * i),
      })),
    };
  }

  if (type === "hydrologie") {
    return {
      ...base,
      debitMax: `${(50 + Math.random() * 200).toFixed(1)} m³/s`,
      volumeRunoff: `${(1000 + Math.random() * 5000).toFixed(0)} m³`,
      tempsConcentration: `${(2 + Math.random() * 8).toFixed(1)} heures`,
      risqueInondation: Math.random() > 0.5 ? "ÉLEVÉ" : "MODÉRÉ",
      zonesImpactees: ["Keur Massar", "Pikine", "Guédiawaye"].slice(0, Math.ceil(Math.random() * 3)),
    };
  }

  if (type === "erosion") {
    return {
      ...base,
      reculTraitDeCote: `${(2 + Math.random() * 15).toFixed(1)} m/an`,
      surfaceMenacee: `${(500 + Math.random() * 2000).toFixed(0)} m²`,
      horizonProjection: "2030",
      scenariosClimatiques: {
        optimiste: `${(1 + Math.random() * 3).toFixed(1)} m/an`,
        median: `${(3 + Math.random() * 5).toFixed(1)} m/an`,
        pessimiste: `${(6 + Math.random() * 10).toFixed(1)} m/an`,
      },
    };
  }

  return {
    ...base,
    iterations: Math.round(1000 + Math.random() * 9000),
    convergence: (0.95 + Math.random() * 0.05).toFixed(4),
    score: (0.7 + Math.random() * 0.3).toFixed(3),
  };
}

export async function GET(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const token = getBearerToken(req);
  if (!token) return jsonError("Non authentifié.", 401);
  const payload = await verifyToken(token);
  if (!payload) return jsonError("Token invalide.", 401);

  let sim = db.simulations.get(id);
  if (!sim) return jsonError("Simulation introuvable.", 404);
  if (sim.userId !== payload.sub && payload.role !== "directeur") {
    return jsonError("Accès refusé.", 403);
  }

  // Check if results are ready (stateless delay approach)
  if (sim.statut === "en_cours" && Date.now() >= sim.completionTime) {
    const results = generateResults(sim.type, sim.parametres);
    sim = { ...sim, statut: "terminee", resultats: results };
    db.simulations.set(id, sim);
  }

  return jsonOk(sim);
}
