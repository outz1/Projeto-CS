import { Trophy } from "lucide-react";
import type { ScoreEntry } from "@/features/leaderboard/domain";

type ArcadeLeaderboardPanelProps = {
  scores: ScoreEntry[];
  loadingScores: boolean;
};

export function ArcadeLeaderboardPanel({ scores, loadingScores }: ArcadeLeaderboardPanelProps) {
  return (
    <aside className="rounded-[2rem] border border-white/10 bg-[#071333]/70 p-6 shadow-xl shadow-black/20 backdrop-blur-2xl">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-fuchsia-200/70">Leaderboard</p>
          <h2 className="arcade-readable-title mt-2 text-2xl font-extrabold leading-tight tracking-[-0.01em] text-white">Top pilotos</h2>
        </div>
        <Trophy className="text-fuchsia-200" size={30} />
      </div>

      <div className="space-y-3">
        {loadingScores && <p className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm text-blue-100/65">Carregando ranking...</p>}
        {!loadingScores && scores.length === 0 && <p className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm text-blue-100/65">Ainda não há pontuações. Seja o primeiro piloto da turma.</p>}
        {!loadingScores &&
          scores.map((score, index) => (
            <div key={`${score.id}-${score.score}-${index}`} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-200/10 text-xs font-black text-cyan-100">#{index + 1}</span>
                <div>
                  <p className="text-sm font-black text-white">{score.name}</p>
                  <p className="font-mono text-[10px] tracking-widest text-blue-100/45">{score.id}</p>
                </div>
              </div>
              <p className="font-mono text-sm font-black text-fuchsia-200">{score.score}</p>
            </div>
          ))}
      </div>
    </aside>
  );
}
