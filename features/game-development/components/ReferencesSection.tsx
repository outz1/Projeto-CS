import { ArrowRight, BookOpenCheck } from "lucide-react";
import { references } from "../content";

export function ReferencesSection() {
  return (
    <section className="border-t border-[#d8e6ff] bg-white py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-2xl bg-[#e8f0fe] p-3 text-[#005b9f]">
            <BookOpenCheck size={22} />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#005b9f]">Curadoria</p>
            <h2 className="text-xl font-semibold leading-snug tracking-[0.015em] text-[#071333] sm:text-2xl">Referências para aprofundar</h2>
          </div>
        </div>

        <p className="mb-6 max-w-4xl text-sm leading-relaxed text-[#0b1d4d]/68">
          Esta página foi escrita de forma autoral a partir de pesquisa e curadoria sobre desenvolvimento de jogos digitais. As referências abaixo ajudam estudantes a explorar ferramentas, documentação e materiais complementares.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {references.map((reference) => (
            <a
              key={reference.href}
              href={reference.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-3 rounded-2xl border border-[#d8e6ff] bg-[#f8fbff] px-4 py-4 text-sm font-bold text-[#071333] transition hover:border-[#005b9f]/35 hover:bg-[#e8f0fe]"
            >
              <span>{reference.label}</span>
              <ArrowRight className="shrink-0 text-[#005b9f] transition group-hover:translate-x-1" size={16} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
