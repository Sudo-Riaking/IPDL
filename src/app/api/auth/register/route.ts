import { NextRequest } from "next/server";
import db, { DBUser } from "@/lib/db";
import { signToken, jsonError, jsonOk } from "@/lib/auth";
import { UserRole } from "@/context/AuthContext";

const ALLOWED_ROLES: UserRole[] = ["etudiant", "chercheur", "partenaire"];

export async function POST(req: NextRequest) {
  const { nom, email, password, role } = await req.json();

  if (!nom || !email || !password || !role) {
    return jsonError("Tous les champs sont requis.", 400);
  }

  if (!ALLOWED_ROLES.includes(role)) {
    return jsonError("Rôle non autorisé.", 400);
  }

  const exists = Array.from(db.users.values()).some((u) => u.email === email);
  if (exists) {
    return jsonError("Un compte avec cet email existe déjà.", 409);
  }

  const id = `u-${Date.now()}`;
  const newUser: DBUser = {
    id,
    nom,
    email,
    password,
    role: role as UserRole,
    langue: "fr",
    createdAt: new Date().toISOString(),
  };

  db.users.set(id, newUser);

  const token = await signToken({
    sub: newUser.id,
    email: newUser.email,
    role: newUser.role,
    nom: newUser.nom,
  });

  const { password: _pw, ...safeUser } = newUser;
  return jsonOk({ token, user: safeUser }, 201);
}
