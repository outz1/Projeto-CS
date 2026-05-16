import type { NextRequest } from "next/server";
import { handleGetScores, handlePostScores } from "@/features/leaderboard/server";

export async function GET(req: NextRequest) {
  return handleGetScores(req);
}

export async function POST(req: NextRequest) {
  return handlePostScores(req);
}
