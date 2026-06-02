import { NextRequest } from "next/server";
import { jsonError, jsonOk } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { nom, email, sujet, message } = await req.json();
  if (!nom || !email || !message) return jsonError("Champs requis manquants.", 400);

  // In production: send via SMTP (nodemailer / sendgrid)
  console.log("[CONTACT FORM]", { nom, email, sujet, message });

  return jsonOk({ message: "Message envoyé avec succès. Nous vous répondrons sous 48h." });
}
