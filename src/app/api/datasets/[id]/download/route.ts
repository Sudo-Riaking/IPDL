import { NextRequest } from "next/server";
import db from "@/lib/db";
import { getBearerToken, verifyToken } from "@/lib/auth";

interface Params { params: Promise<{ id: string }> }

// ─── Mock content generators ──────────────────────────────────────────────────

function csvMalaria(): string {
  const header = "date,district,cas_confirmes,cas_suspects,ndvi_index,pluviometrie_mm,temperature_moy_c";
  const districts = ["Pikine", "Guédiawaye", "Yeumbeul", "Thiaroye", "Keur Massar"];
  const rows: string[] = [header];
  const start = new Date("2023-01-02");
  for (let w = 0; w < 52; w++) {
    const d = new Date(start);
    d.setDate(d.getDate() + w * 7);
    const date = d.toISOString().split("T")[0];
    districts.forEach((dist) => {
      const saison = d.getMonth() >= 6 && d.getMonth() <= 10;
      const cas = saison ? Math.floor(Math.random() * 180 + 20) : Math.floor(Math.random() * 15);
      const suspects = cas + Math.floor(Math.random() * 40);
      const ndvi = (0.1 + Math.random() * 0.7).toFixed(3);
      const pluie = saison ? (Math.random() * 120).toFixed(1) : "0.0";
      const temp = (27 + Math.random() * 8).toFixed(1);
      rows.push(`${date},${dist},${cas},${suspects},${ndvi},${pluie},${temp}`);
    });
  }
  return rows.join("\n");
}

function jsonAirQuality(): string {
  const stations = ["HANN-01", "HANN-02", "HANN-03", "HANN-04", "HANN-05"];
  const records: object[] = [];
  const start = new Date("2025-01-01T00:00:00Z");
  for (let h = 0; h < 72; h++) {
    const ts = new Date(start.getTime() + h * 3_600_000).toISOString();
    stations.slice(0, 3).forEach((station) => {
      records.push({
        timestamp: ts,
        station_id: station,
        pm25: parseFloat((5 + Math.random() * 120).toFixed(1)),
        pm10: parseFloat((10 + Math.random() * 200).toFixed(1)),
        temperature_c: parseFloat((22 + Math.random() * 12).toFixed(1)),
        humidity_pct: parseFloat((35 + Math.random() * 55).toFixed(1)),
        no2_ppb: parseFloat((5 + Math.random() * 60).toFixed(1)),
      });
    });
  }
  return JSON.stringify({ dataset: "air_quality_hann_2025", unit: "SI", records }, null, 2);
}

function csvHydro(): string {
  const header = "timestamp,capteur_id,niveau_eau_m,debit_m3s,pluviometrie_mm,statut_alerte";
  const capteurs = ["KM-C01", "KM-C02", "KM-C03", "KM-C04", "KM-C05", "KM-C06"];
  const rows: string[] = [header];
  const start = new Date("2024-07-15T00:00:00Z");
  for (let i = 0; i < 200; i++) {
    const ts = new Date(start.getTime() + i * 300_000).toISOString();
    capteurs.forEach((cap) => {
      const niveau = (0.2 + Math.random() * 2.8).toFixed(2);
      const debit = (parseFloat(niveau) * (0.5 + Math.random())).toFixed(3);
      const pluie = Math.random() > 0.85 ? (Math.random() * 35).toFixed(1) : "0.0";
      const alerte = parseFloat(niveau) > 2.2 ? "ALERTE" : parseFloat(niveau) > 1.5 ? "VIGILANCE" : "NORMAL";
      rows.push(`${ts},${cap},${niveau},${debit},${pluie},${alerte}`);
    });
  }
  return rows.join("\n");
}

function generateMockContent(id: string, type: string): { content: string; mime: string; ext: string } {
  if (id === "data-01") return { content: csvMalaria(),   mime: "text/csv",         ext: "csv" };
  if (id === "data-02") return { content: jsonAirQuality(), mime: "application/json", ext: "json" };
  if (id === "data-04") return { content: csvHydro(),     mime: "text/csv",         ext: "csv" };

  if (type === "csv") {
    const content = "id,valeur,date\n1,42.5,2024-01-01\n2,37.2,2024-01-02\n3,51.0,2024-01-03";
    return { content, mime: "text/csv", ext: "csv" };
  }
  if (type === "json") {
    const content = JSON.stringify({ data: [{ id: 1, valeur: 42.5 }, { id: 2, valeur: 37.2 }] }, null, 2);
    return { content, mime: "application/json", ext: "json" };
  }
  const content = "Jeu de données UMMISCO\nFichier de démonstration.";
  return { content, mime: "text/plain", ext: "txt" };
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function GET(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const ds = db.datasets.get(id);

  if (!ds) {
    return new Response("Dataset introuvable.", { status: 404 });
  }

  // Access control
  if (ds.acces !== "public") {
    const token = getBearerToken(req);
    if (!token) {
      return new Response("Authentification requise.", { status: 401 });
    }
    const payload = await verifyToken(token);
    if (!payload) {
      return new Response("Token invalide ou expiré.", { status: 401 });
    }
    if (ds.acces === "private") {
      const isOwner = ds.creatorId === payload.sub;
      const isAdmin = payload.role === "directeur";
      if (!isOwner && !isAdmin) {
        return new Response("Accès refusé.", { status: 403 });
      }
    }
    // "protected" = any authenticated user → pass
  }

  // Increment downloads counter
  db.datasets.set(id, { ...ds, downloads: ds.downloads + 1 });

  // Generate file content
  const { content, mime, ext } = generateMockContent(id, ds.type);

  // Safe filename from title
  const filename = ds.titre
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]/gi, "_")
    .replace(/_+/g, "_")
    .toLowerCase()
    .slice(0, 60) + `.${ext}`;

  return new Response(content, {
    headers: {
      "Content-Type":        `${mime}; charset=utf-8`,
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control":       "no-store",
    },
  });
}
