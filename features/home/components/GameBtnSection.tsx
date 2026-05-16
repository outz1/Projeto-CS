"use client";

import { useState } from "react";
import { Trophy, Gamepad2, Rocket } from "lucide-react";
import { GameModal } from "@/features/snake";
import { useLeaderboardScores } from "@/features/leaderboard/hooks/useLeaderboardScores";
import Link from "next/link";

const MEDALS = ["🥇", "🥈", "🥉"];

const MONTHS = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro",
];

export function SnakeSection() {
  const [gameOpen, setGameOpen] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const { scores, loading: loadingScores, refresh: refreshScores } = useLeaderboardScores("snake", 5);

  const now = new Date();
  const monthLabel = `${MONTHS[now.getMonth()]} ${now.getFullYear()}`;

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
          <div className="font-minecraft flex min-h-[31rem] flex-col rounded-3xl border border-white/50 bg-[#0b1d4d] px-6 py-8 text-white shadow-2xl sm:min-h-0 sm:p-8 lg:p-10">
            <div className="mb-1 flex min-w-0 items-center justify-between gap-3 border-b border-white/10 pb-6 sm:pb-4">
              <div className="flex min-w-0 items-center gap-2.5">
                <Trophy className="text-yellow-400" size={24} />
                <span className="text-base leading-[1.2] tracking-wider sm:text-xl">RANKING</span>
              </div>
              <span className="shrink-0 pl-2 text-[10px] leading-[1.2] text-white/40 uppercase tracking-widest sm:text-[10px]">
                {monthLabel}
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:mt-4 sm:gap-3">
              {loadingScores && (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex min-w-0 items-center justify-between gap-3 px-1 py-2.5 animate-pulse sm:px-0 sm:py-0">
                    <span className="shrink-0 text-xs leading-[1.2] text-[#005b9f]">0{i + 1}.</span>
                    <div className="h-px flex-1 border-b border-dashed border-white/20" />
                    <span className="shrink-0 text-xs leading-[1.2] text-white/20">----</span>
                  </div>
                ))
              )}

              {!loadingScores && scores.length === 0 && (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex min-w-0 items-center justify-between gap-3 px-1 py-2.5 sm:px-0 sm:py-0">
                    <span className="shrink-0 text-xs leading-[1.2] text-[#005b9f]">0{i + 1}.</span>
                    <div className="h-px flex-1 border-b border-dashed border-white/20" />
                    <span className="shrink-0 text-xs leading-[1.2] text-white/40">----</span>
                  </div>
                ))
              )}

              {!loadingScores && scores.map((entry, i) => (
                <div key={i} className="flex min-w-0 items-center justify-between gap-2.5 px-1 py-2.5 sm:px-0 sm:py-0">
                  <span className="w-6 shrink-0 text-center text-xs leading-[1.2]">
                    {MEDALS[i] ?? <span className="text-[#005b9f]">0{i + 1}.</span>}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-xs leading-normal py-1 text-white/80 uppercase">
                    {entry.name}
                  </span>
                  <span className="shrink-0 text-xs font-bold leading-[1.2] text-[#4d9fff]">
                    {entry.score}
                  </span>
                </div>
              ))}

              {/* preenche linhas vazias se tiver menos de 5 */}
              {!loadingScores && scores.length > 0 && scores.length < 5 && (
                Array.from({ length: 5 - scores.length }).map((_, i) => (
                  <div key={i} className="flex min-w-0 items-center justify-between gap-3 px-1 py-2.5 sm:px-0 sm:py-0">
                    <span className="shrink-0 text-xs leading-[1.2] text-[#005b9f]">
                      0{scores.length + i + 1}.
                    </span>
                    <div className="h-px flex-1 border-b border-dashed border-white/20" />
                    <span className="shrink-0 text-xs leading-[1.2] text-white/40">----</span>
                  </div>
                ))
              )}
            </div>

            <div className="mt-auto pt-7 sm:pt-6">
              <div className="rounded-xl bg-white/5 px-4 py-5 text-center sm:p-4">
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

export function HardSnakeSection() {
  const { scores: hardScores, loading: loadingHardScores } = useLeaderboardScores("arcade", 5);
  const now = new Date();
  const monthLabel = `${MONTHS[now.getMonth()]} ${now.getFullYear()}`;
  const hardBestScore: number | null = null;

  return (
    <section className="w-full bg-radial-[at_20%_20%] bg-[#d2e2ff]/40">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-8 px-4 py-12 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col gap-2">
          <h2 className="font-minecraft text-3xl uppercase tracking-wide text-violet-950 sm:text-4xl">
            DESAFIO <span className="text-fuchsia-600 drop-shadow-[0_0_6px_rgba(217,70,239,0.4)]">SPACE ARCADE</span>
          </h2>
          <p className="text-sm font-medium text-violet-950/75">
            Entrou na zona cósmica: visual espacial em roxo e neon para a vitrine do próximo jogo, agora com um pouco de desafio extra para os jogadores mais experientes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_300px] md:items-stretch">
          <div className="group relative overflow-hidden rounded-3xl border border-violet-300/50 bg-linear-to-br from-violet-950/90 via-fuchsia-900/60 to-indigo-950/90 p-8 shadow-[0_0_24px_rgba(147,51,234,0.22)] backdrop-blur-md transition-all duration-500 hover:shadow-[0_0_30px_rgba(217,70,239,0.3)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(217,70,239,0.35),transparent_45%),radial-gradient(circle_at_80%_85%,rgba(34,211,238,0.25),transparent_40%)]" />
            <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
              <div className="rounded-full bg-fuchsia-400/20 p-5 text-fuchsia-300 shadow-[0_0_14px_rgba(217,70,239,0.32)] transition-transform duration-500 group-hover:scale-110">
                <Rocket size={48} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-fuchsia-100 drop-shadow-[0_0_6px_rgba(217,70,239,0.35)]">PRONTO PARA A ÓRBITA ARCADE?</h3>
                <p className="max-w-md text-fuchsia-100/80">
                  Space Invaders roguelike com ondas progressivas, upgrades e ranking competitivo.
                </p>
              </div>

              <Link
                href="/arcade"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-xl border border-fuchsia-300/50 bg-fuchsia-500/75 px-10 py-4 font-bold text-white shadow-[0_0_16px_rgba(217,70,239,0.4)] transition-all hover:bg-fuchsia-500 hover:shadow-[0_0_22px_rgba(217,70,239,0.55)] active:scale-95 cursor-pointer focus:outline-none focus:ring-4 focus:ring-fuchsia-400/50"
              >
                <span className="relative z-10">ABRIR ARCADE MODE</span>
                <div className="absolute inset-0 z-0 bg-linear-to-r from-transparent via-cyan-200/30 to-transparent -translate-x-full transition-transform duration-1000 group-hover:translate-x-full" />
              </Link>
            </div>
          </div>

          <div className="font-minecraft flex min-h-[31rem] flex-col rounded-3xl border border-violet-400/40 bg-[#130a26] px-6 py-8 text-white shadow-2xl sm:min-h-0 sm:p-8 lg:p-10">
            <div className="mb-1 flex min-w-0 items-center justify-between gap-3 border-b border-violet-300/20 pb-6 sm:pb-4">
              <div className="flex min-w-0 items-center gap-2.5">
                <Trophy className="text-violet-300" size={24} />
                <span className="text-base leading-[1.2] tracking-wider text-violet-200 sm:text-xl">ARCADE RANKING</span>
              </div>
              <span className="shrink-0 pl-2 text-[10px] leading-[1.2] text-violet-200/50 uppercase tracking-widest sm:text-[10px]">
                {monthLabel}
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:mt-4 sm:gap-3">
              {loadingHardScores && (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex min-w-0 items-center justify-between gap-3 px-1 py-2.5 animate-pulse sm:px-0 sm:py-0">
                    <span className="shrink-0 text-xs leading-[1.2] text-violet-400">0{i + 1}.</span>
                    <div className="h-px flex-1 border-b border-dashed border-violet-300/20" />
                    <span className="shrink-0 text-xs leading-[1.2] text-violet-200/20">----</span>
                  </div>
                ))
              )}

              {!loadingHardScores && hardScores.length === 0 && (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex min-w-0 items-center justify-between gap-3 px-1 py-2.5 sm:px-0 sm:py-0">
                    <span className="shrink-0 text-xs leading-[1.2] text-violet-400">0{i + 1}.</span>
                    <div className="h-px flex-1 border-b border-dashed border-violet-300/20" />
                    <span className="shrink-0 text-xs leading-[1.2] text-violet-200/40">----</span>
                  </div>
                ))
              )}

              {!loadingHardScores && hardScores.map((entry, i) => (
                <div key={i} className="flex min-w-0 items-center justify-between gap-2.5 px-1 py-2.5 sm:px-0 sm:py-0">
                  <span className="w-6 shrink-0 text-center text-xs leading-[1.2]">
                    {MEDALS[i] ?? <span className="text-violet-400">0{i + 1}.</span>}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-xs leading-normal py-1 text-violet-100/80 uppercase">
                    {entry.name}
                  </span>
                  <span className="shrink-0 text-xs font-bold leading-[1.2] text-fuchsia-300">
                    {entry.score}
                  </span>
                </div>
              ))}

              {!loadingHardScores && hardScores.length > 0 && hardScores.length < 5 && (
                Array.from({ length: 5 - hardScores.length }).map((_, i) => (
                  <div key={i} className="flex min-w-0 items-center justify-between gap-3 px-1 py-2.5 sm:px-0 sm:py-0">
                    <span className="shrink-0 text-xs leading-[1.2] text-violet-400">
                      0{hardScores.length + i + 1}.
                    </span>
                    <div className="h-px flex-1 border-b border-dashed border-violet-300/20" />
                    <span className="shrink-0 text-xs leading-[1.2] text-violet-200/40">----</span>
                  </div>
                ))
              )}
            </div>

            <div className="mt-auto pt-7 sm:pt-6">
              <div className="rounded-xl bg-white/5 px-4 py-5 text-center sm:p-4">
                <p className="text-[10px] uppercase tracking-[0.1em] text-violet-200/70 mb-1">
                  Sua melhor pontuação
                </p>
                <p className="text-2xl text-violet-300">
                  {hardBestScore !== null ? hardBestScore : "--"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const NEUTRAL_GAME_CARD_TITLE = "GOSTA DE JOGOS?";
const NEUTRAL_GAME_CARD_BUTTON_LABEL = "SAIBA MAIS";
const NEUTRAL_GAME_CARD_HREF = "https://rfunctions.blogspot.com/p/uma-breve-introducao-ao-desenvolvimento.html";

export function NeutralGameCard() {
  return (
    <section className="w-full bg-[#d2e2ff]/40">
      <div className="mx-auto w-full max-w-[1500px] px-4 py-10 sm:px-6 md:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-2xl border border-[#8eb1ff]/50 bg-white px-6 py-8 shadow-md shadow-[#0b1d4d]/8 sm:px-8 sm:py-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_5%_50%,rgba(0,91,159,0.06),transparent_50%),radial-gradient(circle_at_95%_50%,rgba(96,165,250,0.06),transparent_50%)]" />

          <div className="relative flex flex-col items-center gap-5 text-center sm:flex-row sm:gap-8 sm:text-left">
            <div className="flex shrink-0 items-center justify-center gap-2.5 text-[#005b9f]">
              <span className="rounded-full border border-[#8eb1ff]/50 bg-[#e8f0fe] p-3 animate-[bounce_1.4s_ease-in-out_infinite] [animation-delay:0ms]">
                <Gamepad2 size={22} />
              </span>
              <span className="rounded-full border border-[#8eb1ff]/50 bg-[#e8f0fe] p-3 animate-[bounce_1.4s_ease-in-out_infinite] [animation-delay:200ms]">
                <Trophy size={22} />
              </span>
              <span className="rounded-full border border-[#8eb1ff]/50 bg-[#e8f0fe] p-3 animate-[bounce_1.4s_ease-in-out_infinite] [animation-delay:400ms]">
                <Rocket size={22} />
              </span>
            </div>

            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-black uppercase tracking-wide text-[#0b1d4d] sm:text-2xl">
                {NEUTRAL_GAME_CARD_TITLE}
              </h3>
              <p className="text-xs leading-relaxed text-[#0b1d4d]/65 sm:text-sm">
                QUER SABER MAIS DE COMO FUNCIONA A CRIAÇÃO DE JOGOS? CLIQUE NO BOTÃO ABAIXO E SAIBA MAIS!
              </p>
            </div>

            <Link
              href={NEUTRAL_GAME_CARD_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative shrink-0 inline-flex items-center gap-2 overflow-hidden rounded-xl bg-[#0b1d4d] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#16367f] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#005b9f]/40 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">{NEUTRAL_GAME_CARD_BUTTON_LABEL}</span>
              <div className="absolute inset-0 z-0 bg-linear-to-r from-transparent via-white/15 to-transparent -translate-x-full transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
