"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import GameCanvas from "@/components/arcade/GameCanvas";
import GameOverModal from "@/components/arcade/GameOverModal";
import HUD from "@/components/arcade/HUD";
import MobileControls from "@/components/arcade/MobileControls";
import PauseMenu from "@/components/arcade/PauseMenu";
import UpgradeModal from "@/components/arcade/UpgradeModal";
import { SCANLINE_BACKGROUND } from "@/components/arcade/particles/presets";
import { extractRetryAfterSeconds, normalizePlayerName, parseScoresApiResponse, sanitizePlayerId, type ScoreEntry } from "@/lib/leaderboardSecurity";
import type { ArcadeHudSnapshot, ArcadeRunStats, ArcadeUpgradeId } from "@/lib/arcadeTypes";

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

function cooldownKey(id: string) {
  return `arcade:cooldown:${id}`;
}

function setCooldown(id: string, seconds: number) {
  localStorage.setItem(cooldownKey(id), String(Date.now() + seconds * 1000));
}

function getCooldownSeconds(id: string): number {
  const value = localStorage.getItem(cooldownKey(id));
  if (!value) return 0;
  const endsAt = parseInt(value, 10);
  const remaining = Math.ceil((endsAt - Date.now()) / 1000);
  if (remaining <= 0) {
    localStorage.removeItem(cooldownKey(id));
    return 0;
  }
  return remaining;
}

export default function ArcadeGame({ playerName, playerId, onQuit }: Props) {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [restartSignal, setRestartSignal] = useState(0);
  const [dashSignal, setDashSignal] = useState(0);
  const [mobileInput, setMobileInput] = useState({ up: false, down: false, left: false, right: false, shoot: false });
  const [selectedUpgradeId, setSelectedUpgradeId] = useState<ArcadeUpgradeId | null>(null);
  const [upgradeOptions, setUpgradeOptions] = useState<ArcadeUpgradeId[]>([]);
  const [gameOverStats, setGameOverStats] = useState<ArcadeRunStats | null>(null);
  const [ranking, setRanking] = useState<ScoreEntry[]>([]);
  const [loadingScores, setLoadingScores] = useState(false);

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

  const fetchArcadeScores = useCallback(async () => {
    setLoadingScores(true);
    try {
      const res = await fetch("/api/scores?game=arcade");
      const payload: unknown = await res.json().catch(() => null);
      const parsed = parseScoresApiResponse(payload);
      setRanking(parsed.slice(0, 5));
    } finally {
      setLoadingScores(false);
    }
  }, []);

  const submitScore = useCallback(
    async (stats: ArcadeRunStats) => {
      const safeName = normalizePlayerName(playerName);
      const safeId = sanitizePlayerId(playerId);
      if (getCooldownSeconds(safeId) > 0) return;

      try {
        const res = await fetch("/api/scores", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: safeName,
            id: safeId,
            score: stats.score,
            durationMs: stats.durationMs,
            kills: stats.kills,
            wave: stats.wave,
            upgrades: stats.upgrades,
            game: "arcade",
          }),
        });

        const payload: unknown = await res.json().catch(() => null);
        if (res.status === 429) {
          const retryAfter = extractRetryAfterSeconds(payload) ?? 600;
          setCooldown(safeId, retryAfter);
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
      void submitScore(stats).then(fetchArcadeScores);
    },
    [fetchArcadeScores, submitScore],
  );

  const showUpgradeModal = upgradeOptions.length > 0;
  const showGameOver = gameOverStats !== null;
  const effectivePaused = paused || showUpgradeModal || showGameOver || loading;

  const loadingMessage = useMemo(() => LOADING_MESSAGES[loadingMessageIndex], [loadingMessageIndex]);

  return (
    <div className="relative mx-auto w-full max-w-5xl">
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
        onMoveChange={(next) => setMobileInput((prev) => ({ ...prev, ...next }))}
        onShootChange={(shooting) => setMobileInput((prev) => ({ ...prev, shoot: shooting }))}
        onDash={() => setDashSignal((v) => v + 1)}
      />
    </div>
  );
}
