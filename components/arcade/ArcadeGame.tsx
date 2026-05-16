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
    <div className="arcade-mobile-no-select relative mx-auto w-full max-w-6xl">
      <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-cyan-200/15 bg-white/[0.06] p-3 shadow-lg shadow-black/10 backdrop-blur-xl">
        <p className="font-mono text-xs font-black uppercase tracking-[0.18em] text-cyan-100/80">
          ARCADE MODE · <span className="text-fuchsia-300">#{playerId}</span>
        </p>
        <button onClick={onQuit} className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-blue-50 transition hover:border-fuchsia-200/40 hover:bg-fuchsia-200/10">
          FECHAR
        </button>
      </div>

      <HUD snapshot={{ ...snapshot, isPaused: paused }} playerName={playerName} playerId={playerId} onPauseToggle={() => setPaused((p) => !p)} />

      <div className="relative mt-4 overflow-hidden rounded-[2rem] border border-cyan-200/20 bg-gradient-to-br from-[#050816] via-[#07040f] to-[#130a2a] p-3 shadow-[0_0_45px_rgba(34,211,238,0.14)] sm:p-4">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_90%_0%,rgba(217,70,239,0.15),transparent_32%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: SCANLINE_BACKGROUND }} />
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
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#040816]/95 backdrop-blur-xl">
            <div className="w-full max-w-sm rounded-3xl border border-cyan-200/20 bg-white/[0.08] p-6 text-center shadow-2xl shadow-cyan-950/25">
              <p className="font-mono text-sm font-black uppercase tracking-[0.2em] text-fuchsia-200">{loadingMessage}</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 transition-all" style={{ width: `${loadingProgress}%` }} />
              </div>
              <p className="mt-3 font-mono text-xs font-bold text-blue-100/70">{loadingProgress}%</p>
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
