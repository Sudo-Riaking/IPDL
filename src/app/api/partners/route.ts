import db from "@/lib/db";
import { jsonOk } from "@/lib/auth";

export async function GET() {
  return jsonOk(Array.from(db.partners.values()));
}
