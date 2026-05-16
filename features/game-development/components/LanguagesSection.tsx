import { Code2 } from "lucide-react";
import { languageCards } from "../content";

export function LanguagesSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#071333] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white">
            <Code2 size={15} />
            Linguagens
          </span>
          <h2 className="text-2xl font-semibold leading-[1.3] tracking-[0.015em] text-[#071333] sm:text-4xl">A linguagem depende do objetivo.</h2>
          <p className="text-base leading-relaxed text-[#0b1d4d]/70">
            Não existe uma linguagem única para todos os jogos. Projetos educacionais podem começar com ferramentas mais simples; jogos comerciais, multiplataforma ou de alto desempenho exigem decisões técnicas mais rigorosas.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {languageCards.map((language) => (
            <article key={language.name} className="rounded-3xl border border-[#d8e6ff] bg-[#f8fbff] p-6">
              <p className="text-2xl font-semibold leading-snug tracking-[0.015em] text-[#005b9f] sm:text-3xl">{language.name}</p>
              <h3 className="mt-2 text-sm font-semibold uppercase leading-relaxed tracking-[0.14em] text-[#071333]">{language.role}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#0b1d4d]/68">{language.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
