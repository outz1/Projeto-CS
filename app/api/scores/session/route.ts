import type { NextRequest } from "next/server";
import { handleInitializeSession } from "@/features/leaderboard/server";

export async function POST(req: NextRequest) {
  return handleInitializeSession(req);
}
