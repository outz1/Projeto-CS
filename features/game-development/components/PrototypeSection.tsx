import { ArrowRight, Rocket, Timer } from "lucide-react";
import { prototypeSteps, pseudoLoop } from "../content";

export function PrototypeSection() {
  return (
    <section id="mao-na-massa" className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
      <div className="space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#d8e6ff] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#005b9f]">
          <Rocket size={15} />
          Mão na massa
        </span>
        <h2 className="text-2xl font-semibold leading-[1.3] tracking-[0.015em] text-[#071333] sm:text-4xl">Como pensar um primeiro protótipo.</h2>
        <p className="text-base leading-relaxed text-[#0b1d4d]/70">
          Um jogo simples já permite discutir quase tudo que importa: janela, FPS, input, movimento, tempo, colisões, estado de pausa, derrota e feedback para o jogador. O ponto não é começar grande; é começar observável.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {prototypeSteps.map((step) => (
            <div key={step} className="flex gap-3 rounded-2xl border border-[#c7d9ff] bg-white p-4 text-sm font-semibold text-[#0b1d4d]/72 shadow-sm shadow-[#0b1d4d]/5">
              <ArrowRight className="shrink-0 text-[#005b9f]" size={18} />
              {step}
            </div>
          ))}
        </div>
      </div>

      <aside className="overflow-hidden rounded-[2rem] border border-[#071333]/10 bg-[#071333] text-white shadow-2xl shadow-[#071333]/20">
        <div className="border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-blue-100">
              <Timer size={16} />
              roteiro mental do loop
            </div>
            <span className="rounded-full bg-emerald-300/15 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-200">didático</span>
          </div>
        </div>
        <pre className="overflow-x-auto p-6 text-sm leading-7 text-blue-50/85">
          <code>
            {pseudoLoop.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </code>
        </pre>
        <div className="border-t border-white/10 bg-white/[0.04] px-6 py-5 text-sm leading-relaxed text-blue-50/70">
          Este trecho é uma abstração autoral. Ele mostra a lógica central sem reproduzir código externo, servindo como ponte entre teoria e implementação real.
        </div>
      </aside>
    </section>
  );
}
