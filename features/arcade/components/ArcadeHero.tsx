import Link from "next/link";
import { ArrowRight, GraduationCap, MousePointer2, Sparkles } from "lucide-react";
import { arcadeMetrics } from "../content";

export function ArcadeHero() {
  return (
    <div className="space-y-8">
      <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200/20 bg-fuchsia-200/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-fuchsia-100 shadow-lg shadow-fuchsia-950/20 backdrop-blur-xl">
        <Sparkles size={16} />
        Experimento interativo de Computação
      </div>

      <div className="space-y-5">
        <h1 className="arcade-readable-title max-w-5xl text-4xl font-extrabold leading-[1.06] tracking-[-0.025em] text-white sm:text-6xl lg:text-7xl">
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
  );
}
