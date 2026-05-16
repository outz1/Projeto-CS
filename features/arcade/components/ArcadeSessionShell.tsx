"use client";

import dynamic from "next/dynamic";
import { BadgeCheck } from "lucide-react";

const ArcadeGame = dynamic(() => import("@/features/arcade/game").then((module) => module.ArcadeGame), {
  ssr: false,
  loading: () => (
    <div className="rounded-3xl border border-cyan-300/25 bg-[#071333]/85 p-6 text-center text-sm font-black uppercase tracking-[0.22em] text-cyan-100 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
      Carregando laboratório arcade...
    </div>
  ),
});

type ArcadeSessionShellProps = {
  playerName: string;
  safeId: string;
  onQuit: () => void;
};

export function ArcadeSessionShell({ playerName, safeId, onQuit }: ArcadeSessionShellProps) {
  return (
    <section className="space-y-5 py-4">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-4 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-cyan-200/20 bg-cyan-200/10 p-3 text-cyan-100">
              <BadgeCheck size={24} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200/70">Sessão ativa</p>
              <h1 className="arcade-readable-title mt-1 text-2xl font-extrabold leading-tight tracking-[-0.01em] text-white">Boa missão, {playerName}</h1>
            </div>
          </div>
          <p className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 font-mono text-xs font-bold tracking-widest text-blue-100/70">
            ID #{safeId}
          </p>
        </div>
      </div>

      <div className="rounded-[2.2rem] border border-cyan-200/15 bg-[#040816]/70 p-3 shadow-2xl shadow-cyan-950/20 backdrop-blur-2xl sm:p-4">
        <ArcadeGame playerName={playerName} playerId={safeId} onQuit={onQuit} />
      </div>
    </section>
  );
}
