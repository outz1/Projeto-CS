"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImagePlaceholder } from "./ImagePlaceholder";

type EntityItem = {
  name: string;
  description: string;
};

const entities: EntityItem[] = [
  {
    name: "DrACo",
    description:
      "O DrACo (Diretorio Academico da Computacao) representa os discentes de graduacao do INF, promovendo integracao, discussoes e melhorias na jornada academica.",
  },
  {
    name: "WMDG",
    description:
      "A We Make Digital Games (WMDG) e um projeto de extensao com foco em vitrine dos projetos, conexao com o mercado e fortalecimento da comunidade de desenvolvimento.",
  },
  {
    name: "PETComp",
    description:
      "O PETComp desenvolve atividades de ensino, pesquisa e extensao para complementar a formacao dos estudantes, incentivando protagonismo e impacto academico.",
  },
  {
    name: "CJR",
    description:
      "A CJR e a empresa junior da Computacao, aproximando estudantes de projetos reais, clientes e desafios de mercado para desenvolvimento tecnico e profissional.",
  },
  {
    name: "INFO Jr",
    description:
      "A INFO Jr conecta inovacao e empreendedorismo, promovendo experiencias praticas em produtos digitais, colaboracao multidisciplinar e cultura de aprendizado continuo.",
  },
];

export function EntidadesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < entities.length - 1;

  const goPrev = () => setActiveIndex((prev) => Math.max(0, prev - 1));
  const goNext = () => setActiveIndex((prev) => Math.min(entities.length - 1, prev + 1));

  return (
    <div className="mx-auto w-full max-w-[920px]">
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {entities.map((entity) => (
            <article
              key={entity.name}
              className="w-full shrink-0 rounded-xl border border-[#0b1d4d]/20 bg-white/85 p-5 sm:p-6"
            >
              <div className="mb-5 flex items-center gap-4 sm:mb-6 sm:gap-5">
                <ImagePlaceholder className="h-20 w-20 rounded-full sm:h-24 sm:w-24" />
                <div>
                  <h3 className="text-xl font-black uppercase tracking-wide text-[#0b1d4d] sm:text-2xl">
                    {entity.name}
                  </h3>
                  <ImagePlaceholder className="mt-2 h-2 w-28 rounded-md sm:w-40" />
                </div>
              </div>
              <p className="text-base leading-relaxed text-[#0b1d4d]/90 sm:text-lg">
                {entity.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={goPrev}
          disabled={!canGoPrev}
          aria-label="Entidade anterior"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#0b1d4d]/25 text-[#0b1d4d] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2">
          {entities.map((entity, index) => (
            <button
              key={entity.name}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Ir para ${entity.name}`}
              aria-current={activeIndex === index}
              className={`h-2.5 rounded-full transition-all ${
                activeIndex === index ? "w-7 bg-[#0b1d4d]" : "w-2.5 bg-[#0b1d4d]/30"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          disabled={!canGoNext}
          aria-label="Proxima entidade"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#0b1d4d]/25 text-[#0b1d4d] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
