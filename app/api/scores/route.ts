import { NextRequest, NextResponse } from "next/server";
import { redis, monthKey } from "@/lib/redis";
import { parseArcadeScorePayload } from "@/lib/arcadeSecurity";
import { isValidGame, parseScoreEntry, parseScoreSubmitPayload, type GameType } from "@/lib/leaderboardSecurity";
import {
  generateGameSession,
  validateGameSession,
  markSessionAsUsed,
  checkAdvancedRateLimit,
  detectAnomalies,
} from "@/lib/scoreSecurity";

const TTL_SECONDS = 60 * 60 * 24 * 35; // 35 dias
const TOP_LIMIT = 10;

const CACHE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
};

type ApiErrorCode =
  | "invalid_json"
  | "invalid_payload"
  | "rate_limited"
  | "storage_error"
  | "invalid_session"
  | "anomaly_detected";

interface ApiError {
  code: ApiErrorCode;
  message: string;
  retryAfter?: number;
  anomalies?: string[];
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
  deviceId?: string;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const ips = forwardedFor.split(",");
    const first = ips[0]?.trim();
    if (first && isValidIp(first)) return first;
  }

  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp && isValidIp(realIp)) return realIp;

  return "unknown";
}

function isValidIp(ip: string): boolean {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;
  return parts.every((p) => {
    const num = parseInt(p, 10);
    return num >= 0 && num <= 255;
  });
}

function generateRandomId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
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

// ============================================================================
// POST /api/scores/session - Iniciar nova sessão de jogo SEGURA (NOVO!)
// ============================================================================

async function handleInitializeSession(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    const rawBody = await req.json();
    const { deviceId, gameType } = rawBody as { deviceId?: string; gameType?: string };

    if (!deviceId || typeof deviceId !== "string" || deviceId.length < 10) {
      return jsonError(400, {
        code: "invalid_payload",
        message: "deviceId inválido",
      });
    }

    if (gameType !== "snake" && gameType !== "arcade") {
      return jsonError(400, {
        code: "invalid_payload",
        message: "gameType deve ser 'snake' ou 'arcade'",
      });
    }

    // Gerar playerId temporário (será associado ao score depois)
    const playerId = `temp_${generateRandomId()}`;

    // Criar sessão segura (com IP + device tracking)
    const session = await generateGameSession(playerId, deviceId, ip, gameType as "snake" | "arcade");

    console.log("[scores:session] Nova sessão criada", {
      sessionId: session.sessionId.substring(0, 8) + "...",
      playerId,
      gameType,
      deviceId: deviceId.substring(0, 8) + "...",
      ip,
    });

    return jsonSuccess({
      sessionId: session.sessionId,
      expiresIn: Math.floor((session.expiresAt - Date.now()) / 1000),
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return jsonError(400, {
        code: "invalid_json",
        message: "JSON inválido.",
      });
    }

    console.error("[scores:session] error", error);
    return jsonError(500, {
      code: "storage_error",
      message: "Erro ao criar sessão",
    });
  }
}

// ============================================================================
// GET /api/scores - Listar top scores
// ============================================================================

async function handleGetScores(req: NextRequest) {
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

export async function GET(req: NextRequest) {
  return handleGetScores(req);
}

// ============================================================================
// POST /api/scores - Submeter score com SEGURANÇA COMPLETA (MODIFICADO!)
// ============================================================================

async function handleSubmitScore(req: NextRequest) {
  const ip = getClientIp(req);

  try {
    const rawBody = await req.json();

    // ✅ VALIDAÇÃO 1: Verificar sessionId (CRÍTICO!)
    const sessionId = rawBody.sessionId as string | undefined;
    if (!sessionId || typeof sessionId !== "string") {
      console.warn("[scores:post] Tentativa sem sessionId", { ip });
      return jsonError(401, {
        code: "invalid_session",
        message: "sessionId é obrigatório",
      });
    }

    // ✅ VALIDAÇÃO 2: Validar sessão (verifica IP também)
    const session = await validateGameSession(sessionId, ip);
    if (!session) {
      console.warn("[scores:post] Sessão inválida ou expirada", { sessionId: sessionId.substring(0, 8) + "...", ip });
      return jsonError(401, {
        code: "invalid_session",
        message: "Sessão inválida ou expirada",
      });
    }

    // Determinar tipo de jogo
    const gameRaw: GameType = rawBody?.game === "arcade" ? "arcade" : "snake";
    if (gameRaw !== session.gameType) {
      console.warn("[scores:post] Tipo de jogo não bate com sessão", { expected: session.gameType, got: gameRaw });
      return jsonError(400, {
        code: "invalid_payload",
        message: "Tipo de jogo não corresponde à sessão",
      });
    }

    // ✅ VALIDAÇÃO 3: Rate limiting MULTI-LAYER (muito mais rigoroso!)
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

    // Parse e validação do payload
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

    // ✅ VALIDAÇÃO 4: Detecção de anomalias
    const anomalies = await detectAnomalies(parsedPayload.id, parsedPayload.score, parsedPayload.durationMs);
    if (anomalies.length > 0) {
      console.warn("[scores:post] Anomalias detectadas", { id: parsedPayload.id, anomalies, ip });
    }

    // Verificar se score é melhor que o anterior
    const key = playerKey(gameRaw, parsedPayload.id);
    const existingRaw = await redis.get(key);
    const existing = parseScoreEntry(existingRaw);

    if (existing && parsedPayload.score <= existing.score) {
      // Marcar sessão como usada mesmo assim
      await markSessionAsUsed(sessionId);

      return jsonSuccess({
        accepted: false,
        bestScore: existing.score,
        rankingUpdated: false,
      });
    }

    // Preparar dados para armazenamento
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

    // Salvar no Redis
    await redis.set(key, toStore, { ex: TTL_SECONDS });

    // ✅ CRÍTICO: Marcar sessão como consumida (evita reuso!)
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

export async function POST(req: NextRequest) {
  // Rotear para endpoint correto baseado no path
  const url = new URL(req.url);

  if (url.pathname.endsWith("/session")) {
    return handleInitializeSession(req);
  }

  return handleSubmitScore(req);
}
