"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EntityCard, type EntityItem } from "./EntityCards";

const entities: EntityItem[] = [
  {
    name: "DrACo",
    logo: "/draco.png",
    description:
      "O DrACo (Diretório Acadêmico da Computação) representa os estudantes do INF-UFG. Atua na defesa dos direitos dos discentes, promovendo integração, discussões e melhorias na jornada acadêmica e infraestrutura.",
  },
  {
    name: "Unificada",
    logo: "/unificada.png",
    description:
      "A Atlética Unificada é a Associação Atlética Acadêmica da Computação. É responsável por promover a prática esportiva, organizar equipes, participar de campeonatos universitários e realizar eventos de integração.",
  },
  {
    name: "CEIA",
    logo: "/ceia.jpg",
    description:
      "O CEIA (Centro de Excelência em Inteligência Artificial) é um hub de pesquisa e inovação focado em IA. Conecta a academia ao mercado desenvolvendo projetos de ponta, soluções tecnológicas e pesquisas aplicadas.",
  },
  {
    name: "AKCIT",
    logo: "/akcit.png",
    description:
      "O AKCIT atua como um laboratório/projeto voltado à inovação e capacitação técnica, promovendo o engajamento dos alunos em projetos práticos, estudo de novas metodologias e desenvolvimento de soluções.",
  },
  {
    name: "WMDG",
    logo: "/wmdg.jpeg",
    description:
      "A We Make Digital Games (WMDG) é um projeto de extensão do INF focado no estudo, design e desenvolvimento de jogos digitais, fortalecendo a comunidade gamedev e conectando estudantes à indústria.",
  },
  {
    name: "Level 5 Junior",
    logo: "/level5.png",
    description:
      "A Level 5 Junior é a Empresa Júnior do Instituto de Informática. Aproxima os estudantes do mercado de trabalho por meio da execução de projetos reais de software, consultoria e vivência empresarial.",
  },
  {
    name: "Dex Hub",
    logo: "/dexhub.jpeg",
    description:
      "O Dex Hub é um espaço de inovação focado em conectar estudantes, tecnologias e o ecossistema empreendedor, proporcionando experiências práticas no desenvolvimento de produtos digitais e networking.",
  },
];

export function EntidadesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < entities.length - 1;

  const goPrev = () => setActiveIndex((prev) => Math.max(0, prev - 1));
  const goNext = () => setActiveIndex((prev) => Math.min(entities.length - 1, prev + 1));

  return (
    <div className="carousel-safe mx-auto w-full max-w-[920px]">
      <div className="w-full overflow-hidden rounded-xl py-2">
        <div
          className="flex items-start transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {entities.map((entity) => (
            <div key={entity.name} className="w-full flex-[0_0_100%] px-1">
              <EntityCard entity={entity} />
            </div>
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