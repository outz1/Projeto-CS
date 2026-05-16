"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  ChevronRight,
  Gamepad2,
  GraduationCap,
  Keyboard,
  MousePointer2,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { InteractiveParticleBackground } from "@/components/arcade/InteractiveParticleBackground";
import { useLeaderboardScores } from "@/features/leaderboard/hooks/useLeaderboardScores";
import { generateId } from "@/utils/generateId";
import { isValidPlayerId, leaderboardSecurityConfig, normalizePlayerName, sanitizePlayerId, sanitizePlayerNameInput } from "@/lib/leaderboardSecurity";

const ArcadeGame = dynamic(() => import("@/components/arcade/ArcadeGame"), {
  ssr: false,
  loading: () => (
    <div className="rounded-3xl border border-cyan-300/25 bg-[#071333]/85 p-6 text-center text-sm font-black uppercase tracking-[0.22em] text-cyan-100 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
      Carregando laboratório arcade...
    </div>
  ),
});

const arcadeMetrics = [
  { value: "2D", label: "gameplay responsivo" },
  { value: "Live", label: "ranking competitivo" },
  { value: "XP", label: "progressão por ondas" },
  { value: "Lab", label: "aprendizado prático" },
];

const learningCards = [
  {
    icon: BrainCircuit,
    title: "Pensamento computacional",
    text: "O estudante observa loop, estado, colisão, pontuação e feedback como um sistema interativo real.",
  },
  {
    icon: ShieldCheck,
    title: "Qualidade e segurança",
    text: "A experiência usa sessão segura, normalização de nome e proteção básica para submissão de score.",
  },
  {
    icon: Users,
    title: "Aprendizagem social",
    text: "O ranking transforma a partida em conversa sobre estratégia, melhoria contínua e tomada de decisão.",
  },
];

const controlTips = [
  { icon: Keyboard, label: "Movimento", value: "WASD / setas" },
  { icon: MousePointer2, label: "Mira", value: "mouse ou toque" },
  { icon: Zap, label: "Ritmo", value: "ondas e upgrades" },
];

export default function ArcadePage() {
  const [started, setStarted] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [playerId, setPlayerId] = useState("");
  const { scores, loading: loadingScores } = useLeaderboardScores("arcade", 5);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPlayerId(generateId());
  }, []);

  const safeId = sanitizePlayerId(playerId);
  const previewName = useMemo(() => normalizePlayerName(nameInput), [nameInput]);
  const canStart = isValidPlayerId(safeId);

  return (
    <div className="arcade-mobile-no-select relative min-h-screen overflow-hidden bg-[#040816] text-blue-50">
      <InteractiveParticleBackground />

      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_18%_12%,rgba(37,99,235,0.36),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(217,70,239,0.24),transparent_32%),radial-gradient(circle_at_50%_88%,rgba(34,211,238,0.18),transparent_35%),linear-gradient(135deg,#040816_0%,#071333_45%,#130a2a_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.10] [background-image:linear-gradient(rgba(255,255,255,.75)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.75)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-32 bg-gradient-to-b from-cyan-300/10 to-transparent" />

      <header className="relative z-10 border-b border-white/10 bg-[#040816]/60 backdrop-blur-2xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-100 transition hover:border-cyan-200/40 hover:bg-white/[0.10]">
            <ChevronRight className="rotate-180 transition group-hover:-translate-x-0.5" size={16} />
            Voltar ao site
          </Link>

          <div className="hidden items-center gap-2 rounded-full border border-cyan-200/15 bg-cyan-200/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100 sm:inline-flex">
            <RadioTower size={14} />
            Arcade universitário online
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {!started ? (
          <div className="space-y-8">
            <section className="grid min-h-[calc(100vh-8rem)] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200/20 bg-fuchsia-200/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-fuchsia-100 shadow-lg shadow-fuchsia-950/20 backdrop-blur-xl">
                  <Sparkles size={16} />
                  Experimento interativo de Computação
                </div>

                <div className="space-y-5">
                  <h1 className="max-w-5xl font-sans text-4xl font-extrabold leading-[1.06] tracking-[-0.025em] text-white sm:text-6xl lg:text-7xl">
                    Space Arcade
                    <span className="block bg-gradient-to-r from-cyan-200 via-blue-100 to-fuchsia-200 bg-clip-text text-transparent">
                      um laboratório jogável.
                    </span>
                  </h1>
                  <p className="max-w-3xl text-base leading-relaxed text-blue-50/78 sm:text-lg">
                    Uma experiência premium para transformar curiosidade em aprendizagem: jogue, observe padrões, entenda decisões de design e conecte pontuação, feedback, risco e progressão com conceitos reais de desenvolvimento de jogos.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-4">
                  {arcadeMetrics.map((metric) => (
                    <div key={metric.label} className="rounded-3xl border border-white/10 bg-white/[0.07] p-4 shadow-xl shadow-black/10 backdrop-blur-xl">
                      <p className="text-2xl font-black text-white">{metric.value}</p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-blue-100/62">{metric.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <a href="#entrar" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-black uppercase tracking-widest text-[#071333] shadow-2xl shadow-cyan-950/30 transition hover:-translate-y-0.5 hover:bg-cyan-300 active:scale-95">
                    Preparar piloto <ArrowRight size={18} />
                  </a>
                  <Link href="/desenvolvimento-de-jogos" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/[0.07] px-6 py-3 text-sm font-black uppercase tracking-widest text-blue-50 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/[0.12] active:scale-95">
                    Entender gamedev <GraduationCap size={18} />
                  </Link>
                </div>

                <div className="rounded-[2rem] border border-cyan-200/15 bg-[#071333]/52 p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200/70">Dica curiosa</p>
                      <p className="mt-2 text-sm leading-relaxed text-blue-50/78">
                        Mova o mouse pelo fundo: as partículas reagem como um pequeno sistema de forças, atração e órbita. É física visual para despertar aquela vontade de investigar “como isso foi feito?”.
                      </p>
                    </div>
                    <MousePointer2 className="shrink-0 text-cyan-200" size={34} />
                  </div>
                </div>
              </div>

              <aside id="entrar" className="rounded-[2.2rem] border border-white/10 bg-white/[0.08] p-4 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-6">
                <div className="rounded-[1.8rem] border border-cyan-200/15 bg-[#071333]/78 p-5 shadow-inner shadow-cyan-950/20 sm:p-6">
                  <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200/70">Central de lançamento</p>
                      <h2 className="mt-2 font-sans text-3xl font-extrabold leading-tight tracking-[-0.015em] text-white">Entrar no Arcade</h2>
                    </div>
                    <div className="rounded-3xl border border-fuchsia-200/20 bg-fuchsia-200/10 p-4 text-fuchsia-100 shadow-lg shadow-fuchsia-950/20">
                      <Gamepad2 size={30} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-black uppercase tracking-[0.18em] text-blue-100/68">Nome do piloto</label>
                      <input
                        type="text"
                        maxLength={leaderboardSecurityConfig.NAME_MAX_LENGTH}
                        value={nameInput}
                        onChange={(event) => setNameInput(sanitizePlayerNameInput(event.target.value))}
                        className="mt-2 w-full rounded-2xl border border-cyan-200/18 bg-white/[0.07] px-4 py-3 text-base font-bold text-white outline-none transition placeholder:text-blue-100/35 focus:border-cyan-200/55 focus:bg-white/[0.10] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.10)]"
                        placeholder="Digite seu nome"
                      />
                      <p className="mt-2 text-xs leading-relaxed text-blue-100/50">
                        No ranking você aparecerá como <span className="font-black text-cyan-200">{previewName}</span>.
                      </p>
                    </div>

                    <div>
                      <label className="text-xs font-black uppercase tracking-[0.18em] text-blue-100/68">Identificador seguro</label>
                      <div className="mt-2 flex items-center justify-between gap-3 rounded-2xl border border-cyan-200/18 bg-white/[0.07] px-4 py-3">
                        <span className="font-mono text-sm font-bold tracking-widest text-cyan-200">{safeId || "gerando..."}</span>
                        <span className="rounded-full border border-emerald-200/20 bg-emerald-200/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-200">auto</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (!canStart) return;
                        setPlayerName(normalizePlayerName(nameInput));
                        setStarted(true);
                      }}
                      disabled={!canStart}
                      className={`group inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-black uppercase tracking-[0.2em] shadow-2xl transition active:scale-95 ${
                        canStart
                          ? "bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 text-[#071333] shadow-cyan-950/35 hover:-translate-y-0.5"
                          : "cursor-not-allowed bg-white/10 text-blue-100/35 shadow-black/10"
                      }`}
                    >
                      Iniciar missão <ArrowRight className="transition group-hover:translate-x-1" size={18} />
                    </button>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {controlTips.map((tip) => {
                      const Icon = tip.icon;
                      return (
                        <div key={tip.label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-3">
                          <Icon className="mb-3 text-cyan-200" size={18} />
                          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-100/45">{tip.label}</p>
                          <p className="mt-1 text-xs font-bold text-white">{tip.value}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </aside>
            </section>

            <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="grid gap-5 md:grid-cols-3">
                {learningCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <article key={card.title} className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-xl shadow-black/15 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-cyan-200/30 hover:bg-white/[0.10]">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-200/10 text-cyan-100">
                        <Icon size={24} />
                      </div>
                      <h3 className="font-sans text-xl font-extrabold leading-snug tracking-[-0.01em] text-white">{card.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-blue-50/68">{card.text}</p>
                    </article>
                  );
                })}
              </div>

              <aside className="rounded-[2rem] border border-white/10 bg-[#071333]/70 p-6 shadow-xl shadow-black/20 backdrop-blur-2xl">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-fuchsia-200/70">Leaderboard</p>
                    <h2 className="mt-2 font-sans text-2xl font-extrabold leading-tight tracking-[-0.01em] text-white">Top pilotos</h2>
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
            </section>
          </div>
        ) : (
          <section className="space-y-5 py-4">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-4 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-cyan-200/20 bg-cyan-200/10 p-3 text-cyan-100">
                    <BadgeCheck size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200/70">Sessão ativa</p>
                    <h1 className="mt-1 font-sans text-2xl font-extrabold leading-tight tracking-[-0.01em] text-white">Boa missão, {playerName}</h1>
                  </div>
                </div>
                <p className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 font-mono text-xs font-bold tracking-widest text-blue-100/70">
                  ID #{safeId}
                </p>
              </div>
            </div>

            <div className="rounded-[2.2rem] border border-cyan-200/15 bg-[#040816]/70 p-3 shadow-2xl shadow-cyan-950/20 backdrop-blur-2xl sm:p-4">
              <ArcadeGame playerName={playerName} playerId={safeId} onQuit={() => setStarted(false)} />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
