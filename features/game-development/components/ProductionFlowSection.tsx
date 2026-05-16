import { ClipboardList } from "lucide-react";
import { productionFlow } from "../content";

export function ProductionFlowSection() {
  return (
    <section className="bg-[#071333] py-16 text-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-100">
            <ClipboardList size={15} />
            Processo profissional
          </span>
          <h2 className="text-2xl font-semibold leading-[1.3] tracking-[0.015em] sm:text-4xl">Criar um jogo também é gerenciar projeto.</h2>
          <p className="text-base leading-relaxed text-blue-50/72">
            Uma boa produção não começa pelo código final. Ela passa por intenção, escopo, documentação, prototipagem, testes, revisão e entrega.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {productionFlow.map((step) => (
            <article key={step.phase} className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur-md">
              <p className="text-sm font-black text-cyan-200">{step.phase}</p>
              <h3 className="mt-4 text-xl font-semibold leading-snug tracking-[0.015em]">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-blue-50/68">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
