"use client";

import type { ArcadeHudSnapshot } from "@/features/arcade/domain";

interface Props {
  snapshot: ArcadeHudSnapshot;
  playerName: string;
  playerId: string;
  onPauseToggle: () => void;
}

export default function HUD({ snapshot, playerName, playerId, onPauseToggle }: Props) {
  const hpPercent = Math.max(0, Math.min(100, (snapshot.hp / snapshot.maxHp) * 100));
  const xpPercent = Math.max(0, Math.min(100, (snapshot.xp / snapshot.xpToNext) * 100));

  return (
    <div className="rounded-xl border border-violet-400/40 bg-[#130a26]/95 p-3 text-violet-100 shadow-[0_0_16px_rgba(139,92,246,0.2)]">
      <div className="flex items-center justify-between gap-2">
        <p className="font-mono text-[10px] tracking-widest uppercase text-violet-300/80">
          {playerName} · <span className="text-fuchsia-300">#{playerId}</span>
        </p>
        <button
          onClick={onPauseToggle}
          className="rounded-md border border-violet-300/40 px-2 py-1 text-[10px] font-mono tracking-widest text-violet-100 hover:bg-violet-900/40"
        >
          {snapshot.isPaused ? "RETOMAR" : "PAUSAR"}
        </button>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 text-[10px] font-mono sm:grid-cols-4">
        <div className="rounded-md bg-violet-950/40 p-2">
          <p className="text-violet-300/70">SCORE</p>
          <p className="text-sm font-bold text-cyan-300">{snapshot.score}</p>
        </div>
        <div className="rounded-md bg-violet-950/40 p-2">
          <p className="text-violet-300/70">WAVE</p>
          <p className="text-sm font-bold text-fuchsia-300">{snapshot.wave}</p>
        </div>
        <div className="rounded-md bg-violet-950/40 p-2">
          <p className="text-violet-300/70">KILLS</p>
          <p className="text-sm font-bold text-violet-200">{snapshot.kills}</p>
        </div>
        <div className="rounded-md bg-violet-950/40 p-2">
          <p className="text-violet-300/70">COMBO</p>
          <p className="text-sm font-bold text-emerald-300">x{snapshot.combo}</p>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <div>
          <div className="mb-1 flex justify-between text-[10px] font-mono text-violet-300/80">
            <span>HP</span>
            <span>
              {Math.max(0, Math.floor(snapshot.hp))}/{snapshot.maxHp}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded bg-violet-900/40">
            <div className="h-full bg-fuchsia-400 transition-all" style={{ width: `${hpPercent}%` }} />
          </div>
        </div>

        <div>
          <div className="mb-1 flex justify-between text-[10px] font-mono text-violet-300/80">
            <span>NÍVEL {snapshot.level}</span>
            <span>
              {snapshot.xp}/{snapshot.xpToNext}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded bg-violet-900/40">
            <div className="h-full bg-cyan-400 transition-all" style={{ width: `${xpPercent}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
