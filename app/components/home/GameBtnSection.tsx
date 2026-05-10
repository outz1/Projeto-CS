"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Trophy, Gamepad2 } from "lucide-react";
import GameModal from "../../../game/GameModal";

interface ScoreEntry {
  name: string;
  id: string;
  score: number;
}

const MEDALS = ["🥇", "🥈", "🥉"];

const MONTHS = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro",
];

export function SnakeSection() {
  const [gameOpen, setGameOpen] = useState(false);
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loadingScores, setLoadingScores] = useState(true);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const isMountedRef = useRef(false);

  const now = new Date();
  const monthLabel = `${MONTHS[now.getMonth()]} ${now.getFullYear()}`;

  const fetchTopScores = useCallback(async (signal?: AbortSignal) => {
    const res = await fetch("/api/scores", { signal });
    const data = await res.json();
    return data.slice(0, 5) as ScoreEntry[];
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    const controller = new AbortController();
    void (async () => {
      try {
        const topScores = await fetchTopScores(controller.signal);
        if (!isMountedRef.current || controller.signal.aborted) return;
        setScores(topScores);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.error("Erro ao buscar ranking:", error);
      } finally {
        if (!isMountedRef.current || controller.signal.aborted) return;
        setLoadingScores(false);
      }
    })();

    return () => {
      isMountedRef.current = false;
      controller.abort();
    };
  }, [fetchTopScores]);

  const refreshScores = useCallback(async () => {
    try {
      const topScores = await fetchTopScores();
      if (!isMountedRef.current) return;
      setScores(topScores);
    } catch (error) {
      console.error("Erro ao atualizar ranking:", error);
    }
  }, [fetchTopScores]);

  function handleClose() {
    setGameOpen(false);
    void refreshScores();
  }

  function handleGameOver(score: number) {
    setBestScore((prev) => (prev === null || score > prev ? score : prev));
  }

  return (
    <section className="w-full bg-[#d2e2ff]/40">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-8 px-4 py-16 sm:px-6 md:px-8 lg:px-12">

        <div className="flex flex-col gap-2">
          <h2 className="font-minecraft text-3xl uppercase tracking-wide text-[#0b1d4d] sm:text-4xl">
            DESAFIO <span className="text-[#005b9f]">SNAKE</span>
          </h2>
          <p className="text-sm font-medium text-[#0b1d4d]/70">
            Será que você consegue chegar ao topo do ranking? Jogue, desafie seus amigos e mostre quem é o mestre do jogo da cobrinha
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_300px] md:items-stretch">

          {/* Painel do botão */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/50 bg-white/60 p-8 shadow-xl backdrop-blur-md transition-all duration-500 hover:bg-white/80">
            <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
              <div className="rounded-full bg-[#005b9f]/10 p-5 text-[#005b9f] transition-transform duration-500 group-hover:scale-110">
                <Gamepad2 size={48} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-[#0b1d4d] focus:scale-120">PRONTO PARA JOGAR?</h3>
                <p className="max-w-md text-[#0b1d4d]/80">
                  Ajude a cobrinha a comer os algoritmos e crescer sua pontuação no ranking do INF.
                </p>
              </div>
              <button
                onClick={() => setGameOpen(true)}
                className="group relative flex items-center gap-3 overflow-hidden rounded-xl bg-[#005b9f] px-10 py-4 font-bold text-white shadow-lg transition-all hover:bg-[#16367f] hover:shadow-[#005b9f]/40 active:scale-95 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#005b9f]/50"
              >
                <span className="relative z-10">INICIAR JOGO</span>
                <div className="absolute inset-0 z-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-1000 group-hover:translate-x-full" />
              </button>
            </div>
          </div>

          {/* Painel de Scoreboard - TUDO COM FONT-MINECRAFT */}
          <div className="font-minecraft flex flex-col rounded-3xl border border-white/50 bg-[#0b1d4d] p-12 text-white shadow-2xl">
            <div className="mb-1 flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <Trophy className="text-yellow-400" size={24} />
                <span className="text-xl tracking-wider">RANKING</span>
              </div>
              {/* Removido font-mono para manter minecraftia */}
              <span className="pl-2 text-[9px] text-white/40 uppercase tracking-widest">
                {monthLabel}
              </span>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              {loadingScores && (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between gap-4 animate-pulse">
                    <span className="text-[#005b9f] text-xs">0{i + 1}.</span>
                    <div className="h-px flex-1 border-b border-dashed border-white/20" />
                    <span className="text-white/20 text-xs">----</span>
                  </div>
                ))
              )}

              {!loadingScores && scores.length === 0 && (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between gap-4">
                    <span className="text-[#005b9f] text-xs">0{i + 1}.</span>
                    <div className="h-px flex-1 border-b border-dashed border-white/20" />
                    <span className="text-white/40 text-xs">----</span>
                  </div>
                ))
              )}

              {!loadingScores && scores.map((entry, i) => (
                <div key={i} className="flex items-center justify-between gap-3">
                  <span className="text-[11px] w-5 text-center">
                    {MEDALS[i] ?? <span className="text-[#005b9f]">0{i + 1}.</span>}
                  </span>
                  <span className="text-[11px] text-white/80 flex-1 truncate uppercase">
                    {entry.name}
                  </span>
                  <span className="text-[11px] font-bold text-[#4d9fff]">
                    {entry.score}
                  </span>
                </div>
              ))}

              {/* preenche linhas vazias se tiver menos de 5 */}
              {!loadingScores && scores.length > 0 && scores.length < 5 && (
                Array.from({ length: 5 - scores.length }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between gap-4">
                    <span className="text-[#005b9f] text-[11px]">
                      0{scores.length + i + 1}.
                    </span>
                    <div className="h-px flex-1 border-b border-dashed border-white/20" />
                    <span className="text-white/40 text-[11px]">----</span>
                  </div>
                ))
              )}
            </div>

            <div className="mt-auto pt-6">
              <div className="rounded-xl bg-white/5 p-4 text-center">
                <p className="text-[10px] uppercase tracking-[0.1em] text-white/70 mb-1">
                  Sua melhor pontuação
                </p>
                <p className="text-2xl text-[#005b9f]">
                  {bestScore !== null ? bestScore : "--"}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modal do jogo */}
      {gameOpen && (
        <GameModal
          onClose={handleClose}
          onGameOver={handleGameOver}
        />
      )}
    </section>
  );
}
