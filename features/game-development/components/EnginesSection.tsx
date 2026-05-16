import { Wrench } from "lucide-react";
import { engineCards } from "../content";

export function EnginesSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#d8e6ff] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#005b9f]">
            <Wrench size={15} />
            Engines e ferramentas
          </span>
          <h2 className="text-2xl font-semibold leading-[1.3] tracking-[0.015em] text-[#071333] sm:text-4xl">A engine acelera o caminho entre ideia e experiência.</h2>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-[#0b1d4d]/68">
          Engines oferecem editor, física, renderização, animação, áudio, build para plataformas e recursos prontos. Bibliotecas como Raylib ficam mais próximas do código e ajudam a entender a base técnica.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {engineCards.map((engine) => (
          <article key={engine.name} className="flex min-h-64 flex-col rounded-3xl border border-[#c7d9ff] bg-white p-6 shadow-md shadow-[#0b1d4d]/5">
            <div className="mb-5 h-2 w-16 rounded-full bg-gradient-to-r from-[#005b9f] to-[#60a5fa]" />
            <h3 className="text-xl font-semibold leading-snug tracking-[0.015em] text-[#071333]">{engine.name}</h3>
            <p className="mt-2 text-xs font-black uppercase tracking-widest text-[#005b9f]">{engine.tag}</p>
            <p className="mt-4 text-sm leading-relaxed text-[#0b1d4d]/68">{engine.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
