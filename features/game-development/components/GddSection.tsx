import { CheckCircle2, FileText } from "lucide-react";
import { gddSections } from "../content";

export function GddSection() {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <div className="rounded-[2rem] border border-[#c7d9ff] bg-white p-6 shadow-lg shadow-[#0b1d4d]/5 sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-2xl bg-[#e8f0fe] p-3 text-[#005b9f]">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#005b9f]">GDD</p>
            <h2 className="text-xl font-semibold leading-snug tracking-[0.015em] text-[#071333] sm:text-2xl">Documento de Design de Jogo</h2>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[#0b1d4d]/70">
          O Game Design Document é o mapa do projeto. Ele reduz ambiguidade, alinha a equipe e transforma uma ideia solta em um plano que pode ser testado, estimado e melhorado.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {gddSections.map((item) => (
          <div key={item} className="flex gap-3 rounded-2xl border border-[#d8e6ff] bg-white p-4 text-sm font-semibold text-[#0b1d4d]/72">
            <CheckCircle2 className="shrink-0 text-[#005b9f]" size={18} />
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
