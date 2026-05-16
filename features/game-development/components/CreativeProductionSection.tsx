import { Brush } from "lucide-react";
import { creativeAreas } from "../content";

export function CreativeProductionSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#071333] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white">
            <Brush size={15} />
            Produção visual e sonora
          </span>
          <h2 className="text-2xl font-semibold leading-[1.3] tracking-[0.015em] text-[#071333] sm:text-4xl">Arte, animação e áudio dão identidade ao sistema.</h2>
          <p className="text-base leading-relaxed text-[#0b1d4d]/70">
            A programação estabelece as regras, mas a experiência ganha memória quando imagem, movimento e som comunicam intenção, emoção e feedback.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {creativeAreas.map((area) => {
            const Icon = area.icon;
            return (
              <article key={area.title} className="rounded-3xl border border-[#d8e6ff] bg-[#f8fbff] p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#005b9f] shadow-sm">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-semibold leading-snug tracking-[0.015em] text-[#071333]">{area.title}</h3>
                <ul className="mt-4 space-y-2">
                  {area.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#0b1d4d]/68">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#005b9f]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
