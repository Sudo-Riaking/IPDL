import { NextRequest } from "next/server";
import db, { type DBAccessRequest, type AccessRequestStatus } from "@/lib/db";
import { getBearerToken, verifyToken, jsonError, jsonOk } from "@/lib/auth";

// List access requests. The director sees every request; a regular user sees
// only their own.
export async function GET(req: NextRequest) {
  const token = getBearerToken(req);
  if (!token) return jsonError("Non authentifié.", 401);
  const payload = await verifyToken(token);
  if (!payload) return jsonError("Non authentifié.", 401);

  let requests = Array.from(db.accessRequests.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  if (payload.role !== "directeur") {
    requests = requests.filter((r) => r.userId === payload.sub);
  }
  return jsonOk(requests);
}

// Any authenticated user can request access to a resource / feature.
export async function POST(req: NextRequest) {
  const token = getBearerToken(req);
  if (!token) return jsonError("Non authentifié.", 401);
  const payload = await verifyToken(token);
  if (!payload) return jsonError("Non authentifié.", 401);

  const { permission, resourceLabel, reason } = await req.json();
  if (!permission || !resourceLabel) {
    return jsonError("Permission et ressource requises.", 400);
  }

  const id = `req-${Date.now()}`;
  const request: DBAccessRequest = {
    id,
    userId: payload.sub,
    userName: payload.nom,
    userEmail: payload.email,
    permission,
    resourceLabel: String(resourceLabel).trim(),
    reason: String(reason ?? "").trim(),
    status: "en_attente",
    createdAt: new Date().toISOString(),
  };
  db.accessRequests.set(id, request);
  return jsonOk(request, 201);
}

// Director decides on a request. Approving GRANTS the requested permission to
// the user individually — the heart of the ACL model (no fixed roles needed).
export async function PUT(req: NextRequest) {
  const token = getBearerToken(req);
  if (!token) return jsonError("Non authentifié.", 401);
  const payload = await verifyToken(token);
  if (!payload || payload.role !== "directeur") {
    return jsonError("Accès refusé. Réservé au directeur.", 403);
  }

  const { id, decision } = await req.json() as { id: string; decision: AccessRequestStatus };
  const request = db.accessRequests.get(id);
  if (!request) return jsonError("Demande introuvable.", 404);
  if (decision !== "approuvee" && decision !== "refusee") {
    return jsonError("Décision invalide.", 400);
  }

  const updated: DBAccessRequest = {
    ...request,
    status: decision,
    decidedAt: new Date().toISOString(),
    decidedBy: payload.nom,
  };
  db.accessRequests.set(id, updated);

  // On approval, grant the requested permission to the requesting user.
  if (decision === "approuvee") {
    const u = db.users.get(request.userId);
    if (u) {
      const perms = new Set(u.permissions ?? []);
      perms.add(request.permission);
      db.users.set(u.id, { ...u, permissions: Array.from(perms) });
    }
  }

  return jsonOk(updated);
}
