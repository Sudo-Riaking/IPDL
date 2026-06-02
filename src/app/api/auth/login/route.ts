import { NextRequest } from "next/server";
import db from "@/lib/db";
import { signToken, jsonError, jsonOk } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return jsonError("Email et mot de passe requis.", 400);
  }

  const user = Array.from(db.users.values()).find((u) => u.email === email);

  if (!user || user.password !== password) {
    return jsonError("Identifiants incorrects.", 401);
  }

  const token = await signToken({
    sub: user.id,
    email: user.email,
    role: user.role,
    nom: user.nom,
  });

  const { password: _pw, ...safeUser } = user;

  return jsonOk({ token, user: safeUser });
}
