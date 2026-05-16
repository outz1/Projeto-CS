import type { NextRequest } from "next/server";
import { handleInitializeSession } from "../_handlers/session";

export async function POST(req: NextRequest) {
  return handleInitializeSession(req);
}
