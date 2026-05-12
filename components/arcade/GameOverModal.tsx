"use client";

import type { ScoreEntry } from "@/lib/leaderboardSecurity";
import type { ArcadeRunStats } from "@/lib/arcadeTypes";

const MEDALS = ["🥇", "🥈", "🥉"];

interface Props {
  stats: ArcadeRunStats;
  scores: ScoreEntry[];
  playerId: string;
  loadingScores: boolean;
  onReplay: () => void;
  onClose: () => void;
}

export default function GameOverModal({ stats, scores, playerId, loadingScores, onReplay, onClose }: Props) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-fuchsia-400/40 bg-[#130a26] p-5 text-violet-100 shadow-[0_0_22px_rgba(217,70,239,0.3)]">
        <h3 className="text-center font-mono text-xl font-bold tracking-widest text-fuchsia-300">GAME OVER</h3>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono sm:grid-cols-4">
          <Stat label="Score" value={stats.score} />
          <Stat label="Kills" value={stats.kills} />
          <Stat label="Wave" value={stats.wave} />
          <Stat label="Nível" value={stats.level} />
        </div>

        <div className="mt-4 rounded-xl border border-violet-300/20 bg-violet-950/30 p-3">
          <p className="text-center font-mono text-[10px] tracking-widest text-violet-300/70">🏆 TOP PLAYERS</p>
          <div className="mt-2 space-y-1.5">
            {loadingScores && <p className="text-center text-xs text-violet-300/70">Carregando...</p>}
            {!loadingScores && scores.length === 0 && <p className="text-center text-xs text-violet-300/70">Sem pontuações ainda.</p>}
            {!loadingScores &&
              scores.map((entry, i) => (
                <div
                  key={`${entry.id}-${i}`}
                  className={`flex items-center gap-2 rounded-md px-2 py-1 text-xs font-mono ${entry.id === playerId ? "ring-1 ring-fuchsia-400/60 bg-violet-900/50" : "bg-violet-950/40"}`}
                >
                  <span className="w-5 text-center text-violet-300">{MEDALS[i] ?? `${i + 1}.`}</span>
                  <span className="flex-1 truncate uppercase">
                    {entry.name} <span className="text-violet-300/70">#{entry.id}</span>
                  </span>
                  <span className="font-bold text-cyan-300">{entry.score}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <button onClick={onReplay} className="rounded-md bg-fuchsia-600 py-2 font-mono text-sm font-bold text-white hover:bg-fuchsia-500">
            JOGAR NOVAMENTE
          </button>
          <button onClick={onClose} className="rounded-md border border-violet-300/30 py-2 font-mono text-sm font-bold text-violet-200 hover:bg-violet-900/30">
            FECHAR
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md bg-violet-950/40 p-2 text-center">
      <p className="text-[10px] uppercase tracking-widest text-violet-300/70">{label}</p>
      <p className="mt-1 text-sm font-bold text-violet-100">{value}</p>
    </div>
  );
}
