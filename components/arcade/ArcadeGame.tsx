"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import GameCanvas from "@/components/arcade/GameCanvas";
import GameOverModal from "@/components/arcade/GameOverModal";
import HUD from "@/components/arcade/HUD";
import MobileControls from "@/components/arcade/MobileControls";
import PauseMenu from "@/components/arcade/PauseMenu";
import UpgradeModal from "@/components/arcade/UpgradeModal";
import { SCANLINE_BACKGROUND } from "@/components/arcade/particles/presets";
import { normalizePlayerName, sanitizePlayerId } from "@/lib/leaderboardSecurity";
import type { ArcadeHudSnapshot, ArcadeRunStats, ArcadeUpgradeId } from "@/lib/arcadeTypes";
import { getScoreCooldownSeconds, setScoreCooldown } from "@/features/leaderboard/services/cooldownStorage";
import { getOrCreateDeviceId, initializeGameSession, submitScore as submitSecureScore } from "@/features/leaderboard/services/scoreSubmissionClient";
import { useLeaderboardScores } from "@/features/leaderboard/hooks/useLeaderboardScores";

interface Props {
  playerName: string;
  playerId: string;
  onQuit: () => void;
}

const LOADING_MESSAGES = [
  "Inicializando sistema...",
  "Carregando inimigos...",
  "Preparando arsenal...",
  "Sincronizando HUD...",
];

export default function ArcadeGame({ playerName, playerId, onQuit }: Props) {
  const sessionIdRef = useRef<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [restartSignal, setRestartSignal] = useState(0);
  const [dashSignal, setDashSignal] = useState(0);
  const [mobileInput, setMobileInput] = useState({
    moveX: 0,
    moveY: 0,
    aimX: 0,
    aimY: -1,
    aiming: false,
    autoShoot: false,
  });
  const [selectedUpgradeId, setSelectedUpgradeId] = useState<ArcadeUpgradeId | null>(null);
  const [upgradeOptions, setUpgradeOptions] = useState<ArcadeUpgradeId[]>([]);
  const [gameOverStats, setGameOverStats] = useState<ArcadeRunStats | null>(null);
  const { scores: ranking, loading: loadingScores, refresh: refreshArcadeScores } = useLeaderboardScores("arcade", 5);

  const [snapshot, setSnapshot] = useState<ArcadeHudSnapshot>({
    hp: 100,
    maxHp: 100,
    score: 0,
    kills: 0,
    wave: 1,
    level: 1,
    xp: 0,
    xpToNext: 100,
    combo: 1,
    isPaused: false,
  });

  useEffect(() => {
    if (!loading) return;
    const startedAt = performance.now();
    const interval = setInterval(() => {
      const elapsed = performance.now() - startedAt;
      const progress = Math.min(100, Math.floor((elapsed / 1800) * 100));
      setLoadingProgress(progress);
      setLoadingMessageIndex(Math.min(LOADING_MESSAGES.length - 1, Math.floor(progress / 30)));
      if (progress >= 100) {
        clearInterval(interval);
        setLoading(false);
      }
    }, 70);
    return () => clearInterval(interval);
  }, [loading, restartSignal]);

  useEffect(() => {
    const media = window.matchMedia("(hover: none), (pointer: coarse)");
    const updateAutoShoot = () => {
      setMobileInput((prev) => ({ ...prev, autoShoot: media.matches }));
    };
    updateAutoShoot();
    media.addEventListener("change", updateAutoShoot);
    return () => media.removeEventListener("change", updateAutoShoot);
  }, []);

  useEffect(() => {
    let active = true;
    sessionIdRef.current = null;

    void initializeGameSession("arcade").then((sessionId) => {
      if (active) sessionIdRef.current = sessionId;
    });

    return () => {
      active = false;
      sessionIdRef.current = null;
    };
  }, [restartSignal]);

  const submitScore = useCallback(
    async (stats: ArcadeRunStats) => {
      const safeName = normalizePlayerName(playerName);
      const safeId = sanitizePlayerId(playerId);
      if (getScoreCooldownSeconds("arcade", safeId) > 0) return;

      try {
        let sessionId = sessionIdRef.current;
        if (!sessionId) {
          sessionId = await initializeGameSession("arcade");
          sessionIdRef.current = sessionId;
        }

        if (!sessionId) {
          console.warn("[arcade] não foi possível iniciar sessão segura para envio do score");
          return;
        }

        const result = await submitSecureScore({
          sessionId,
          deviceId: getOrCreateDeviceId(),
          name: safeName,
          id: safeId,
          score: stats.score,
          durationMs: stats.durationMs,
          kills: stats.kills,
          wave: stats.wave,
          upgrades: stats.upgrades,
          game: "arcade",
        });

        if (result.ok) {
          sessionIdRef.current = null;
          return;
        }

        if (result.status === 429) {
          const retryAfter = result.retryAfter ?? 600;
          setScoreCooldown("arcade", safeId, retryAfter);
          return;
        }

        if (result.status === 401) {
          sessionIdRef.current = null;
        }
      } catch (error) {
        console.error("Erro ao enviar score do arcade:", error);
      }
    },
    [playerId, playerName],
  );

  const handleGameOver = useCallback(
    (stats: ArcadeRunStats) => {
      setGameOverStats(stats);
      setPaused(false);
      void submitScore(stats).then(refreshArcadeScores);
    },
    [refreshArcadeScores, submitScore],
  );

  const showUpgradeModal = upgradeOptions.length > 0;
  const showGameOver = gameOverStats !== null;
  const effectivePaused = paused || showUpgradeModal || showGameOver || loading;

  const loadingMessage = useMemo(() => LOADING_MESSAGES[loadingMessageIndex], [loadingMessageIndex]);

  return (
    <div className="arcade-mobile-no-select relative mx-auto w-full max-w-5xl">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-xs tracking-widest text-violet-200/80">
          ARCADE MODE · <span className="text-fuchsia-300">#{playerId}</span>
        </p>
        <button onClick={onQuit} className="rounded-md border border-violet-400/40 px-2 py-1 font-mono text-xs text-violet-100 hover:bg-violet-900/30">
          FECHAR
        </button>
      </div>

      <HUD snapshot={{ ...snapshot, isPaused: paused }} playerName={playerName} playerId={playerId} onPauseToggle={() => setPaused((p) => !p)} />

      <div className="relative mt-3 rounded-2xl border border-violet-400/40 bg-[#07040f] p-3 shadow-[0_0_16px_rgba(139,92,246,0.22)]">
        <div className="pointer-events-none absolute inset-0 opacity-15" style={{ backgroundImage: SCANLINE_BACKGROUND }} />
        <GameCanvas
          paused={effectivePaused}
          restartSignal={restartSignal}
          selectedUpgradeId={selectedUpgradeId}
          mobileInput={mobileInput}
          dashSignal={dashSignal}
          onUpgradeConsumed={() => setSelectedUpgradeId(null)}
          onHudUpdate={setSnapshot}
          onLevelUp={(options) => setUpgradeOptions(options)}
          onGameOver={handleGameOver}
        />

        {loading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#090513]/95">
            <div className="w-full max-w-sm rounded-xl border border-violet-300/30 bg-violet-950/40 p-5 text-center">
              <p className="font-mono text-sm tracking-widest text-fuchsia-300">{loadingMessage}</p>
              <div className="mt-3 h-2 overflow-hidden rounded bg-violet-900/50">
                <div className="h-full bg-fuchsia-400 transition-all" style={{ width: `${loadingProgress}%` }} />
              </div>
              <p className="mt-2 font-mono text-xs text-violet-200/70">{loadingProgress}%</p>
            </div>
          </div>
        )}

        {showUpgradeModal && (
          <UpgradeModal
            options={upgradeOptions}
            onSelect={(id) => {
              setSelectedUpgradeId(id);
              setUpgradeOptions([]);
            }}
          />
        )}

        {paused && !showUpgradeModal && !showGameOver && (
          <PauseMenu
            onResume={() => setPaused(false)}
            onRestart={() => {
              setPaused(false);
              setGameOverStats(null);
              setUpgradeOptions([]);
              setSelectedUpgradeId(null);
              setLoading(true);
              setLoadingProgress(0);
              setLoadingMessageIndex(0);
              setRestartSignal((v) => v + 1);
            }}
            onQuit={onQuit}
          />
        )}

        {showGameOver && (
          <GameOverModal
            stats={gameOverStats}
            scores={ranking}
            playerId={playerId}
            loadingScores={loadingScores}
            onReplay={() => {
              setGameOverStats(null);
              setUpgradeOptions([]);
              setSelectedUpgradeId(null);
              setLoading(true);
              setLoadingProgress(0);
              setLoadingMessageIndex(0);
              setRestartSignal((v) => v + 1);
            }}
            onClose={onQuit}
          />
        )}
      </div>

      <MobileControls
        onMoveChange={({ x, y }) => setMobileInput((prev) => ({ ...prev, moveX: x, moveY: y }))}
        onAimChange={({ x, y, active }) =>
          setMobileInput((prev) => ({
            ...prev,
            aimX: active ? x : prev.aimX,
            aimY: active ? y : prev.aimY,
            aiming: active,
          }))
        }
        onDash={() => setDashSignal((v) => v + 1)}
      />
    </div>
  );
}
