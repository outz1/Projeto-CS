/**
 * EXEMPLO: Como usar o novo sistema seguro de scores
 * 
 * Este arquivo mostra exemplos práticos de como integrar a nova API
 * segura em seus componentes de jogo.
 */

// ============================================================================
// 1. SETUP INICIAL - Gerar Device ID (roda uma única vez)
// ============================================================================

const DEVICE_ID_KEY = "device_fingerprint";

function generateDeviceFingerprint(): string {
  // Combinação de características do dispositivo
  const userAgent = navigator.userAgent;
  const language = navigator.language;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Combinar tudo num string
  const combined = `${userAgent}|${language}|${timezone}|${Date.now()}`;

  // Gerar hash
  return btoa(combined).substring(0, 64); // Base64 truncado para use como ID
}

function getOrCreateDeviceId(): string {
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);

  if (!deviceId) {
    deviceId = generateDeviceFingerprint();
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }

  return deviceId;
}

// ============================================================================
// 2. INICIALIZAR SESSÃO - Quando o jogo começa
// ============================================================================

interface GameSessionResponse {
  sessionId: string;
  expiresIn: number; // segundos
}

async function initializeGameSession(gameType: "snake" | "arcade"): Promise<string | null> {
  try {
    const deviceId = getOrCreateDeviceId();

    const response = await fetch("/api/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "session",
        deviceId,
        gameType,
      }),
    });

    if (!response.ok) {
      console.error("Erro ao inicializar sessão:", response.status);
      return null;
    }

    const data = (await response.json()) as { ok: boolean; data: GameSessionResponse };

    if (!data.ok) {
      console.error("Sessão inválida:", data);
      return null;
    }

    console.log("✅ Sessão iniciada! Válida por", data.data.expiresIn, "segundos");
    return data.data.sessionId;
  } catch (error) {
    console.error("Erro ao chamar /api/scores/session:", error);
    return null;
  }
}

// ============================================================================
// 3. ENVIAR SCORE - Quando o jogo termina
// ============================================================================

interface SubmitScorePayload {
  sessionId: string;
  deviceId: string;
  name: string;
  id: string;
  score: number;
  durationMs: number;
  game: "snake" | "arcade";
  kills?: number;
  wave?: number;
  upgrades?: string[];
}

interface SubmitScoreResponse {
  accepted: boolean;
  bestScore: number;
  rankingUpdated: boolean;
  anomalies?: string[];
}

async function submitScore(payload: SubmitScorePayload): Promise<SubmitScoreResponse | null> {
  try {
    // ✅ IMPORTANTE: O sessionId DEVE estar presente
    if (!payload.sessionId) {
      console.error("❌ sessionId é obrigatório! Inicie uma nova sessão primeiro.");
      return null;
    }

    // ✅ IMPORTANTE: O deviceId DEVE estar presente
    if (!payload.deviceId) {
      console.error("❌ deviceId é obrigatório!");
      return null;
    }

    const response = await fetch("/api/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Erro ao enviar score:", error);

      // Verificar se foi rate limited
      if (response.status === 429) {
        const retryAfter = error.error?.retryAfter || 60;
        console.warn(`⏳ Rate limited. Tente novamente em ${retryAfter}s`);
      }

      // Verificar se há anomalias
      if (error.error?.anomalies) {
        console.warn("⚠️ Anomalias detectadas:", error.error.anomalies);
        console.warn(
          "Score foi aceito, mas será investigado. " +
          "Se você realmente jogou, não se preocupe! " +
          "Se foi suspeito, você pode ser banido."
        );
      }

      return null;
    }

    const data = (await response.json()) as { ok: boolean; data: SubmitScoreResponse };

    if (!data.ok) {
      console.error("Resposta inválida:", data);
      return null;
    }

    if (data.data.accepted) {
      console.log("✅ Score aceito! Melhor score:", data.data.bestScore);
    } else {
      console.log("❌ Score não foi melhor que o anterior. Melhor:", data.data.bestScore);
    }

    return data.data;
  } catch (error) {
    console.error("Erro ao enviar score:", error);
    return null;
  }
}

// ============================================================================
// 4. EXEMPLO DE USO EM UM COMPONENTE REACT
// ============================================================================

/*
import { useState, useEffect } from "react";

interface GameState {
  sessionId: string | null;
  isPlaying: boolean;
  score: number;
  duration: number;
}

export function SnakeGame() {
  const [gameState, setGameState] = useState<GameState>({
    sessionId: null,
    isPlaying: false,
    score: 0,
    duration: 0,
  });

  const playerName = "JOGADOR"; // Pega do localStorage ou input
  const playerId = "PLY001"; // ID único do jogador

  // Quando o jogo inicia
  const handleGameStart = async () => {
    console.log("🎮 Iniciando jogo...");

    // 1. Inicializar sessão segura
    const sessionId = await initializeGameSession("snake");

    if (!sessionId) {
      alert("Erro ao iniciar sessão. Tente novamente.");
      return;
    }

    // 2. Começar o jogo
    setGameState({
      sessionId,
      isPlaying: true,
      score: 0,
      duration: 0,
    });

    console.log("✅ Jogo iniciado com sessão:", sessionId.substring(0, 8) + "...");
  };

  // Quando o jogo termina
  const handleGameEnd = async (finalScore: number, finalDuration: number) => {
    console.log("🏁 Jogo terminou");

    if (!gameState.sessionId) {
      console.error("Sem sessionId! Não é possível enviar score.");
      return;
    }

    // 3. Enviar score com sessionId
    const deviceId = getOrCreateDeviceId();
    const result = await submitScore({
      sessionId: gameState.sessionId,
      deviceId,
      name: playerName,
      id: playerId,
      score: finalScore,
      durationMs: finalDuration,
      game: "snake",
    });

    if (result?.accepted) {
      console.log("🏆 Score enviado com sucesso!");
      setGameState((prev) => ({ ...prev, isPlaying: false, score: finalScore }));
    } else {
      console.log("Score não foi aceito ou houve um erro.");
    }
  };

  return (
    <div className="game-container">
      <button onClick={handleGameStart} disabled={gameState.isPlaying}>
        🎮 Iniciar Jogo
      </button>

      {gameState.isPlaying && (
        <div className="game-info">
          <p>Score: {gameState.score}</p>
          <p>Sessão: {gameState.sessionId?.substring(0, 8)}...</p>
          <button onClick={() => handleGameEnd(gameState.score, 60000)}>
            Terminar Jogo
          </button>
        </div>
      )}
    </div>
  );
}
*/

// ============================================================================
// 5. TESTANDO COM CURL
// ============================================================================

/*

# 1. Inicializar sessão
curl -X POST http://localhost:3000/api/scores \
  -H "Content-Type: application/json" \
  -d '{
    "action": "session",
    "deviceId": "dev-12345-device-id",
    "gameType": "snake"
  }'

# Resposta:
# {
#   "ok": true,
#   "data": {
#     "sessionId": "token123456789...",
#     "expiresIn": 3600
#   }
# }

# 2. Enviar score usando o sessionId recebido
curl -X POST http://localhost:3000/api/scores \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "token123456789...",
    "deviceId": "dev-12345-device-id",
    "name": "JOGADOR",
    "id": "PLY001",
    "score": 1234,
    "durationMs": 120000,
    "game": "snake"
  }'

# Resposta:
# {
#   "ok": true,
#   "data": {
#     "accepted": true,
#     "bestScore": 1234,
#     "rankingUpdated": true
#   }
# }

# 3. Tentar reusar a mesma sessão (será rejeitado!)
curl -X POST http://localhost:3000/api/scores \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "token123456789...",
    "deviceId": "dev-12345-device-id",
    "name": "HACKER",
    "id": "PLY001",
    "score": 9999,
    "durationMs": 10000,
    "game": "snake"
  }'

# Resposta:
# {
#   "ok": false,
#   "error": {
#     "code": "invalid_session",
#     "message": "Session already used"
#   }
# }

*/

// ============================================================================
// 6. TESTES DE SEGURANÇA
// ============================================================================

/*

✅ TEST 1: Sessão requerida
curl -X POST http://localhost:3000/api/scores \
  -H "Content-Type: application/json" \
  -d '{"name":"HACKER","id":"HAK001","score":5000,"durationMs":1000,"game":"snake"}'

ESPERADO: ❌ 401 - sessionId is required


✅ TEST 2: Mudança de IP na mesma sessão
# Mesma sessão, IP diferente (será rejeitado)
curl -X POST http://localhost:3000/api/scores \
  -H "X-Forwarded-For: 192.168.1.99" \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"token...","deviceId":"dev...","score":5000,...}'

ESPERADO: ❌ 401 - Session invalid


✅ TEST 3: Rate limiting rigoroso
# Enviar múltiplas requisições rápido
for i in {1..20}; do
  curl -X POST http://localhost:3000/api/scores \
    -H "Content-Type: application/json" \
    -d "{\"sessionId\":\"sess$i\",\"deviceId\":\"dev\",\"score\":100,...}"
done

ESPERADO: ❌ 429 - Rate limited após 5 tentativas


✅ TEST 4: Session não pode ser reutilizada
# Usar a mesma sessão 2 vezes
SESSAO=$(curl -s ... | jq -r '.data.sessionId')
curl -X POST http://localhost:3000/api/scores \
  -H "Content-Type: application/json" \
  -d "{\"sessionId\":\"$SESSAO\",...}"

# Segunda tentativa com a mesma sessão
curl -X POST http://localhost:3000/api/scores \
  -H "Content-Type: application/json" \
  -d "{\"sessionId\":\"$SESSAO\",...}"

ESPERADO: Primeira OK, segunda ❌ 401 - Session already used

*/

export { initializeGameSession, submitScore, getOrCreateDeviceId };
