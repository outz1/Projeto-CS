/**
 * Sistema de Segurança para API de Scores
 * Implementa:
 * - Tokens de sessão validados
 * - Assinatura criptográfica
 * - Rate limiting mais robusto
 * - Anti-cheat melhorado
 */

import { createHmac, randomBytes } from "crypto";
import { redis } from "@/lib/redis";

// Chave secreta - DEVE ser carregada de uma variável de ambiente
const SIGNING_SECRET = process.env.SIGNING_SECRET || "dev-secret-change-in-production";
const SESSION_TTL = 60 * 60; // 1 hora
const DEVICE_TTL = 60 * 60 * 24 * 7; // 7 dias

/**
 * Interface para sessão de jogo
 */
export interface GameSession {
  sessionId: string; // Token único para esta sessão
  playerId: string; // ID do jogador
  deviceId: string; // Fingerprint do dispositivo
  startedAt: number; // Timestamp de início
  expiresAt: number; // Timestamp de expiração
  gameType: "snake" | "arcade"; // Tipo de jogo
  ipHash: string; // Hash do IP para verificação
}

/**
 * Gera uma sessão de jogo segura (server-side)
 * Chamado quando o jogo inicia no servidor
 */
export async function generateGameSession(
  playerId: string,
  deviceId: string,
  ipAddress: string,
  gameType: "snake" | "arcade"
): Promise<GameSession> {
  const sessionId = randomBytes(32).toString("hex");
  const now = Date.now();
  const expiresAt = now + SESSION_TTL * 1000;

  const ipHash = createHmac("sha256", SIGNING_SECRET).update(ipAddress).digest("hex");

  const session: GameSession = {
    sessionId,
    playerId,
    deviceId,
    startedAt: now,
    expiresAt,
    gameType,
    ipHash,
  };

  // Armazenar sessão no Redis
  const key = `game:session:${sessionId}`;
  await redis.set(key, JSON.stringify(session), { ex: SESSION_TTL });

  return session;
}

/**
 * Valida a sessão antes de aceitar um score
 */
export async function validateGameSession(
  sessionId: string,
  ipAddress: string
): Promise<GameSession | null> {
  const key = `game:session:${sessionId}`;
  const raw = await redis.get<string>(key);

  if (!raw) return null;

  try {
    const session = JSON.parse(raw) as GameSession;

    // Verificar se não expirou
    if (Date.now() > session.expiresAt) {
      await redis.del(key);
      return null;
    }

    // Verificar IP (hash)
    const ipHash = createHmac("sha256", SIGNING_SECRET).update(ipAddress).digest("hex");
    if (ipHash !== session.ipHash) {
      console.warn("[security] IP mismatch for session", { sessionId });
      return null;
    }

    return session;
  } catch (error) {
    console.error("[security] Error validating session", error);
    return null;
  }
}

/**
 * Marca uma sessão como "consumida" (score já foi enviado)
 * Previne reuso de sessão
 */
export async function markSessionAsUsed(sessionId: string): Promise<void> {
  const key = `game:session:${sessionId}`;
  const usedKey = `game:session:used:${sessionId}`;

  // Verificar se já foi usada
  if (await redis.exists(usedKey)) {
    throw new Error("Session already used");
  }

  // Marcar como usada
  await redis.set(usedKey, "1", { ex: SESSION_TTL });
}

/**
 * Assina os dados do score com HMAC
 */
export function signScorePayload(payload: Record<string, unknown>): string {
  const data = JSON.stringify(payload);
  return createHmac("sha256", SIGNING_SECRET).update(data).digest("hex");
}

/**
 * Valida a assinatura do score
 */
export function verifyScorePayload(payload: Record<string, unknown>, signature: string): boolean {
  const expectedSignature = signScorePayload(payload);
  return expectedSignature === signature;
}

/**
 * Device Fingerprinting - gera um ID único do dispositivo
 * Deve ser chamado no cliente e enviado a cada requisição
 */
export function generateDeviceFingerprint(userAgent: string, acceptLanguage: string): string {
  const combined = `${userAgent}|${acceptLanguage}`;
  return createHmac("sha256", SIGNING_SECRET).update(combined).digest("hex");
}

/**
 * Rate limiting mais robusto baseado em múltiplos fatores
 */
export async function checkAdvancedRateLimit(
  ipAddress: string,
  playerId: string,
  deviceId: string
): Promise<{ allowed: boolean; retryAfter?: number }> {
  // Rate limit por IP (mais permissivo)
  const ipKey = `ratelimit:ip:${ipAddress}`;
  const ipAttempts = await redis.incr(ipKey);
  if (ipAttempts === 1) await redis.expire(ipKey, 600); // 10 minutos

  if (ipAttempts > 50) {
    const ttl = await redis.ttl(ipKey);
    return { allowed: false, retryAfter: ttl };
  }

  // Rate limit por Player ID
  const playerKey = `ratelimit:player:${playerId}`;
  const playerAttempts = await redis.incr(playerKey);
  if (playerAttempts === 1) await redis.expire(playerKey, 600);

  if (playerAttempts > 10) {
    const ttl = await redis.ttl(playerKey);
    return { allowed: false, retryAfter: ttl };
  }

  // Rate limit por Device
  const deviceKey = `ratelimit:device:${deviceId}`;
  const deviceAttempts = await redis.incr(deviceKey);
  if (deviceAttempts === 1) await redis.expire(deviceKey, 600);

  if (deviceAttempts > 15) {
    const ttl = await redis.ttl(deviceKey);
    return { allowed: false, retryAfter: ttl };
  }

  // Rate limit por combinação (mais rigoroso)
  const combinationKey = `ratelimit:combination:${ipAddress}:${playerId}:${deviceId}`;
  const combinationAttempts = await redis.incr(combinationKey);
  if (combinationAttempts === 1) await redis.expire(combinationKey, 600);

  if (combinationAttempts > 5) {
    const ttl = await redis.ttl(combinationKey);
    return { allowed: false, retryAfter: ttl };
  }

  return { allowed: true };
}

/**
 * Detecção de anomalias - flags suspeitas
 */
export async function detectAnomalies(playerId: string, score: number, durationMs: number): Promise<string[]> {
  const flags: string[] = [];

  // Verificar histórico de scores
  const playerKey = `anomaly:player:${playerId}`;
  const historyRaw = await redis.get<string>(playerKey);
  
  if (historyRaw) {
    const history = JSON.parse(historyRaw) as Array<{ score: number; timestamp: number }>;

    // Flag: aumento muito rápido
    if (history.length > 0) {
      const lastScore = history[history.length - 1]!.score;
      const improvement = ((score - lastScore) / lastScore) * 100;

      if (improvement > 500) {
        flags.push("suspicious_improvement_500%");
      }
      if (improvement > 200 && improvement <= 500) {
        flags.push("suspicious_improvement_200%");
      }
    }

    // Flag: padrão muito regular (possível bot)
    if (history.length >= 3) {
      const scores = history.slice(-3).map((h) => h.score);
      const diffs = [scores[1]! - scores[0]!, scores[2]! - scores[1]!];

      if (diffs[0] === diffs[1] && diffs[0] === score - scores[2]!) {
        flags.push("suspicious_regular_pattern");
      }
    }
  }

  // Salvar no histórico
  const newEntry = { score, timestamp: Date.now() };
  const newHistory = historyRaw ? JSON.parse(historyRaw) : [];
  newHistory.push(newEntry);
  // Manter últimos 100 scores
  if (newHistory.length > 100) newHistory.shift();

  await redis.set(playerKey, JSON.stringify(newHistory), { ex: 60 * 60 * 24 * 30 }); // 30 dias

  return flags;
}
