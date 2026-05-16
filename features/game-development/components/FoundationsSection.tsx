import { Sparkles } from "lucide-react";
import { foundations } from "../content";

export function FoundationsSection() {
  return (
    <section id="trilha" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl space-y-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#d8e6ff] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#005b9f]">
          <Sparkles size={15} />
          Fundamentos
        </span>
        <h2 className="text-2xl font-semibold leading-[1.3] tracking-[0.015em] text-[#071333] sm:text-4xl">Jogo digital é um sistema interativo.</h2>
        <p className="text-base leading-relaxed text-[#0b1d4d]/70">
          O game parece diversão na superfície, mas por baixo dele existem decisões de arquitetura: como representar estado, como processar entrada, como atualizar regras e como entregar feedback visual e sonoro em tempo real.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {foundations.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="rounded-3xl border border-[#c7d9ff] bg-white p-6 shadow-lg shadow-[#0b1d4d]/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0b1d4d]/10">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f0fe] text-[#005b9f]">
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-semibold leading-snug tracking-[0.015em] text-[#071333]">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#0b1d4d]/68">{item.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
