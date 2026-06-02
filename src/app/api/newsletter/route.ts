import { NextRequest } from "next/server";
import db, { DBNewsletter } from "@/lib/db";
import { jsonError, jsonOk } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email || !email.includes("@")) return jsonError("Email invalide.", 400);

  const exists = Array.from(db.newsletter.values()).some((n) => n.email === email);
  if (exists) return jsonOk({ message: "Déjà inscrit." });

  const id = `nl-${Date.now()}`;
  const entry: DBNewsletter = { id, email, dateInscription: new Date().toISOString() };
  db.newsletter.set(id, entry);
  return jsonOk({ message: "Inscription confirmée." }, 201);
}

export async function GET() {
  return jsonOk({ count: db.newsletter.size });
}
