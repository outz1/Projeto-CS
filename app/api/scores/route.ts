import { NextRequest, NextResponse } from "next/server";
import { redis, monthKey } from "@/lib/redis";
import { parseArcadeScorePayload } from "@/lib/arcadeSecurity";
import { isValidGame, parseScoreEntry, parseScoreSubmitPayload, type GameType } from "@/lib/leaderboardSecurity";

const TTL_SECONDS = 60 * 60 * 24 * 35; // 35 dias
const TOP_LIMIT = 10;

const IP_RATE_LIMIT = Number(process.env.SNAKE_RATE_LIMIT_PER_IP ?? 40);
const PLAYER_RATE_LIMIT = Number(process.env.SNAKE_RATE_LIMIT_PER_PLAYER ?? 8);
const RATE_WINDOW_SECONDS = Number(process.env.SNAKE_RATE_WINDOW_SECONDS ?? 60 * 10);

const CACHE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
};

type ApiErrorCode = "invalid_json" | "invalid_payload" | "rate_limited" | "storage_error";

interface ApiError {
  code: ApiErrorCode;
  message: string;
  retryAfter?: number;
}

interface StoredScore {
  name: string;
  id: string;
  score: number;
  game: GameType;
  updatedAt: number;
  durationMs: number;
  kills?: number;
  wave?: number;
  upgrades?: string[];
}

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  return "unknown";
}

function scoresPattern(game: GameType): string {
  if (game === "snake") return `${monthKey()}:player:*`;
  return `${monthKey()}:${game}:player:*`;
}

function playerKey(game: GameType, id: string): string {
  if (game === "snake") return `${monthKey()}:player:${id}`;
  return `${monthKey()}:${game}:player:${id}`;
}

function jsonError(status: number, error: ApiError) {
  return NextResponse.json({ ok: false, error }, { status, headers: CACHE_HEADERS });
}

function jsonSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ ok: true, data }, { status, headers: CACHE_HEADERS });
}

async function applyRateLimit(key: string, limit: number, windowSec: number) {
  const attempts = await redis.incr(key);
  if (attempts === 1) await redis.expire(key, windowSec);

  if (attempts > limit) {
    const ttl = await redis.ttl(key);
    return {
      allowed: false,
      retryAfter: ttl > 0 ? ttl : windowSec,
    };
  }

  return {
    allowed: true,
    retryAfter: 0,
  };
}

export async function GET(req: NextRequest) {
  try {
    const gameRaw = req.nextUrl.searchParams.get("game") ?? "snake";
    if (!isValidGame(gameRaw)) {
      return jsonError(400, {
        code: "invalid_payload",
        message: "Jogo inválido.",
      });
    }

    const keys = await redis.keys(scoresPattern(gameRaw));
    if (!keys.length) return jsonSuccess([]);

    const entries = await Promise.all(keys.map((k) => redis.get(k)));
    const scores = entries
      .map(parseScoreEntry)
      .filter((entry): entry is NonNullable<ReturnType<typeof parseScoreEntry>> => entry !== null)
      .filter((entry) => (entry.game ?? "snake") === gameRaw)
      .sort((a, b) => b.score - a.score)
      .slice(0, TOP_LIMIT);

    return jsonSuccess(scores);
  } catch (error) {
    console.error("[scores:get] storage_error", { message: error instanceof Error ? error.message : "unknown" });
    return jsonError(500, {
      code: "storage_error",
      message: "Erro ao buscar scores",
    });
  }
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  try {
    const rawBody = await req.json();
    const gameRaw: GameType = rawBody?.game === "arcade" ? "arcade" : "snake";

    const ipRate = await applyRateLimit(`${gameRaw}:ratelimit:ip:${ip}`, IP_RATE_LIMIT, RATE_WINDOW_SECONDS);
    if (!ipRate.allowed) {
      return jsonError(429, {
        code: "rate_limited",
        message: "Muitas tentativas. Aguarde para enviar novamente.",
        retryAfter: ipRate.retryAfter,
      });
    }

    const parsedPayloadSnake = gameRaw === "snake" ? parseScoreSubmitPayload(rawBody) : null;
    const parsedPayloadArcade = gameRaw === "arcade" ? parseArcadeScorePayload(rawBody) : null;
    const parsedPayload = parsedPayloadSnake ?? parsedPayloadArcade;

    if (parsedPayload === null) {
      return jsonError(400, {
        code: "invalid_payload",
        message: "Dados inválidos para submissão de score.",
      });
    }

    const playerRate = await applyRateLimit(`${gameRaw}:ratelimit:player:${parsedPayload.id}`, PLAYER_RATE_LIMIT, RATE_WINDOW_SECONDS);
    if (!playerRate.allowed) {
      return jsonError(429, {
        code: "rate_limited",
        message: "Muitas tentativas para este jogador.",
        retryAfter: playerRate.retryAfter,
      });
    }

    const key = playerKey(gameRaw, parsedPayload.id);
    const existingRaw = await redis.get(key);
    const existing = parseScoreEntry(existingRaw);

    if (existing && parsedPayload.score <= existing.score) {
      return jsonSuccess({
        accepted: false,
        bestScore: existing.score,
        rankingUpdated: false,
      });
    }

    let toStore: StoredScore;
    if (gameRaw === "arcade" && parsedPayloadArcade) {
      toStore = {
        name: parsedPayloadArcade.name,
        id: parsedPayloadArcade.id,
        score: parsedPayloadArcade.score,
        game: "arcade",
        updatedAt: Date.now(),
        durationMs: parsedPayloadArcade.durationMs,
        kills: parsedPayloadArcade.kills,
        wave: parsedPayloadArcade.wave,
        upgrades: parsedPayloadArcade.upgrades,
      };
    } else {
      const snakePayload = parsedPayloadSnake ?? parsedPayload;
      toStore = {
        name: snakePayload.name,
        id: snakePayload.id,
        score: snakePayload.score,
        game: "snake",
        updatedAt: Date.now(),
        durationMs: snakePayload.durationMs,
      };
    }

    await redis.set(key, toStore, { ex: TTL_SECONDS });

    return jsonSuccess({
      accepted: true,
      bestScore: parsedPayload.score,
      rankingUpdated: true,
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return jsonError(400, {
        code: "invalid_json",
        message: "JSON inválido.",
      });
    }

    console.error("[scores:post] storage_error", { ip, message: error instanceof Error ? error.message : "unknown" });
    return jsonError(500, {
      code: "storage_error",
      message: "Erro ao salvar score",
    });
  }
}
