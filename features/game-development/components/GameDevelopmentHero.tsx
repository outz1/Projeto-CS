import { BookOpenCheck, CheckCircle2, Gamepad2, GraduationCap, PlayCircle } from "lucide-react";
import { learningGoals, quickStats } from "../content";

export function GameDevelopmentHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#071333] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_20%,rgba(96,165,250,0.35),transparent_34%),radial-gradient(circle_at_85%_15%,rgba(14,165,233,0.22),transparent_34%),linear-gradient(135deg,#071333_0%,#0b1d4d_52%,#123c7c_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-8 lg:py-20">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/20 bg-blue-200/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-blue-100">
            <GraduationCap size={16} />
            Trilha universitária de gamedev
          </div>

          <div className="space-y-5">
            <h1 className="max-w-5xl text-3xl font-semibold leading-[1.22] tracking-[0.015em] sm:text-5xl lg:text-6xl">
              Desenvolvimento de Jogos Digitais
              <span className="block bg-gradient-to-r from-blue-200 via-cyan-100 to-white bg-clip-text text-transparent">
                da ideia ao protótipo jogável.
              </span>
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-blue-50/78 sm:text-lg">
              Uma página autoral para estudantes entenderem como jogos nascem: programação, engines, documentação, arte, animação, áudio, testes e colaboração. O objetivo é mostrar que criar games é uma prática completa de Computação, design e produção audiovisual.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#trilha"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-400 active:scale-95"
            >
              <BookOpenCheck size={18} />
              Começar trilha
            </a>
            <a
              href="#mao-na-massa"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-sm font-bold uppercase tracking-widest text-blue-50 transition hover:bg-white/15 active:scale-95"
            >
              <PlayCircle size={18} />
              Ver protótipo
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-4">
            {quickStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-blue-100/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-blue-200/70">Mapa da jornada</p>
              <h2 className="mt-2 text-xl font-semibold leading-snug tracking-[0.015em] text-white sm:text-2xl">O que você vai aprender</h2>
            </div>
            <div className="rounded-2xl border border-cyan-200/20 bg-cyan-200/10 p-4 text-cyan-100">
              <Gamepad2 size={30} />
            </div>
          </div>

          <ul className="space-y-3">
            {learningGoals.map((goal) => (
              <li key={goal} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm leading-relaxed text-blue-50/78">
                <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={18} />
                {goal}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
