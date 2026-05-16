import type { NextRequest } from "next/server";
import { getClientIp, jsonError, jsonSuccess } from "@/lib/api/http";
import { redis, monthKey } from "../../../lib/redis";
import { parseArcadeScorePayload } from "@/lib/arcadeSecurity";
import { isValidGame, parseScoreEntry, parseScoreSubmitPayload, type GameType } from "@/lib/leaderboardSecurity";
import {
  validateGameSession,
  markSessionAsUsed,
  checkAdvancedRateLimit,
  detectAnomalies,
} from "@/lib/scoreSecurity";
import { handleInitializeSession, isSessionInitPayload } from "./sessionHandler";

const TTL_SECONDS = 60 * 60 * 24 * 35;
const TOP_LIMIT = 10;

type ParsedScoreEntry = NonNullable<ReturnType<typeof parseScoreEntry>>;

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
  deviceId?: string;
}

function scoresPattern(game: GameType): string {
  if (game === "snake") return `${monthKey()}:player:*`;
  return `${monthKey()}:${game}:player:*`;
}

function playerKey(game: GameType, id: string): string {
  if (game === "snake") return `${monthKey()}:player:${id}`;
  return `${monthKey()}:${game}:player:${id}`;
}

export async function handleGetScores(req: NextRequest) {
  try {
    const gameRaw = req.nextUrl.searchParams.get("game") ?? "snake";
    if (!isValidGame(gameRaw)) {
      return jsonError(400, {
        code: "invalid_payload",
        message: "Jogo inválido.",
      });
    }

    const keys: string[] = await redis.keys(scoresPattern(gameRaw));
    if (!keys.length) return jsonSuccess([]);

    const entries: unknown[] = await Promise.all(keys.map((key: string) => redis.get(key)));
    const scores = entries
      .map(parseScoreEntry)
      .filter((entry): entry is ParsedScoreEntry => entry !== null)
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

async function handleSubmitScore(req: NextRequest) {
  const ip = getClientIp(req);

  try {
    const rawBody = await req.json();

    const sessionId = rawBody.sessionId as string | undefined;
    if (!sessionId || typeof sessionId !== "string") {
      console.warn("[scores:post] Tentativa sem sessionId", { ip });
      return jsonError(401, {
        code: "invalid_session",
        message: "sessionId é obrigatório",
      });
    }

    const session = await validateGameSession(sessionId, ip);
    if (!session) {
      console.warn("[scores:post] Sessão inválida ou expirada", { sessionId: sessionId.substring(0, 8) + "...", ip });
      return jsonError(401, {
        code: "invalid_session",
        message: "Sessão inválida ou expirada",
      });
    }

    const gameRaw: GameType = rawBody?.game === "arcade" ? "arcade" : "snake";
    if (gameRaw !== session.gameType) {
      console.warn("[scores:post] Tipo de jogo não bate com sessão", { expected: session.gameType, got: gameRaw });
      return jsonError(400, {
        code: "invalid_payload",
        message: "Tipo de jogo não corresponde à sessão",
      });
    }

    const deviceId = rawBody.deviceId as string | undefined;
    if (!deviceId || typeof deviceId !== "string") {
      console.warn("[scores:post] deviceId faltando", { sessionId: sessionId.substring(0, 8) + "..." });
      return jsonError(400, {
        code: "invalid_payload",
        message: "deviceId é obrigatório",
      });
    }

    const rateLimit = await checkAdvancedRateLimit(ip, session.playerId, deviceId);
    if (!rateLimit.allowed) {
      console.warn("[scores:post] Rate limited", { ip, playerId: session.playerId, retryAfter: rateLimit.retryAfter });
      return jsonError(429, {
        code: "rate_limited",
        message: "Muitas tentativas. Aguarde para enviar novamente.",
        retryAfter: rateLimit.retryAfter,
      });
    }

    const parsedPayloadSnake = gameRaw === "snake" ? parseScoreSubmitPayload(rawBody) : null;
    const parsedPayloadArcade = gameRaw === "arcade" ? parseArcadeScorePayload(rawBody) : null;
    const parsedPayload = parsedPayloadSnake ?? parsedPayloadArcade;

    if (parsedPayload === null) {
      console.warn("[scores:post] Payload inválido", { ip, playerId: session.playerId });
      return jsonError(400, {
        code: "invalid_payload",
        message: "Dados inválidos para submissão de score.",
      });
    }

    const anomalies = await detectAnomalies(parsedPayload.id, parsedPayload.score, parsedPayload.durationMs);
    if (anomalies.length > 0) {
      console.warn("[scores:post] Anomalias detectadas", { id: parsedPayload.id, anomalies, ip });
    }

    const key = playerKey(gameRaw, parsedPayload.id);
    const existingRaw = await redis.get(key);
    const existing = parseScoreEntry(existingRaw);

    if (existing && parsedPayload.score <= existing.score) {
      await markSessionAsUsed(sessionId);

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
        deviceId,
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
        deviceId,
      };
    }

    await redis.set(key, toStore, { ex: TTL_SECONDS });
    await markSessionAsUsed(sessionId);

    console.log("[scores:post] Score aceito", {
      id: parsedPayload.id,
      score: parsedPayload.score,
      game: gameRaw,
      anomalies: anomalies.length > 0 ? anomalies : undefined,
    });

    return jsonSuccess({
      accepted: true,
      bestScore: parsedPayload.score,
      rankingUpdated: true,
      anomalies: anomalies.length > 0 ? anomalies : undefined,
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

export async function handlePostScores(req: NextRequest) {
  const url = new URL(req.url);

  if (url.pathname.endsWith("/session")) {
    return handleInitializeSession(req);
  }

  try {
    const rawBody = await req.clone().json();
    if (isSessionInitPayload(rawBody)) {
      return handleInitializeSession(req, rawBody);
    }
  } catch {
    // O handler de submissão ainda fará o parsing do body original e retornará invalid_json se necessário.
  }

  return handleSubmitScore(req);
}
