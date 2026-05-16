"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";

type Entity = {
  name: string;
  logo: string;
  description: string;
  badge: string;
  gradientFrom: string;
  gradientTo: string;
  accentBar: string;
};

const entities: Entity[] = [
  {
    name: "DrACo",
    logo: "/draco.png",
    description:
      "O DrACo (Diretório Acadêmico da Computação) é o órgão de representação máxima legal dos discentes de graduação no INF. Ele é o principal instrumento político e de ação dos próprios estudantes para lutar pelos interesses estudantis, promover eventos acadêmicos de integração, conhecimento e politização. Na prática, o DrACo atua para melhorar a jornada acadêmica, seja buscando oferta de turmas requisitadas, negociando com coordenações e direção do INF ou movimentando discussões sobre a qualidade do ensino e da infraestrutura no instituto.",
    badge: "Diretório Acadêmico",
    gradientFrom: "#0b2a67",
    gradientTo: "#1e4d9b",
    accentBar: "#3b82f6",
  },
  {
    name: "Unificada",
    logo: "/entidades/unificada.png",
    description:
      "A Atlética Unificada é a Associação Atlética Acadêmica da Computação. É responsável por promover a prática esportiva, organizar equipes, participar de campeonatos universitários e realizar eventos de integração.",
    badge: "Associação Atlética",
    gradientFrom: "#064e3b",
    gradientTo: "#065f46",
    accentBar: "#10b981",
  },
  {
    name: "ADAS",
    logo: "/entidades/ada.jpg",
    description:
      "O projeto Adas visa incentivar as meninas a ingressarem e permanecerem nos cursos oferecidos pelo Instituto de Informática. A luta do projeto é contra qualquer diferenciação de oportunidades de trabalho e de reconhecimento com relação ao gênero, e tem como finalidade valorizar as mulheres que fizeram e fazem história na computação, contribuindo para a disseminação da ideia de que computação também é para mulheres. Esse projeto também tem como objetivo mostrar que o gênero não determina a capacidade cognitiva da pessoa e que as mulheres são capazes de grandes feitos, seja em computação ou em qualquer outra área.",
    badge: "Diversidade & Inclusão",
    gradientFrom: "#4c1d95",
    gradientTo: "#6d28d9",
    accentBar: "#a78bfa",
  },
  {
    name: "Pequi Mecânico",
    logo: "/entidades/pequi3.jpg",
    description:
      "Em 2010, quatro alunos da Universidade Federal de Goiás (UFG) participaram do Torneio de Robótica Universitária (TRU), realizado na Universidade Federal de Uberlândia (UFU). Inspirados pela experiência, decidiram criar um núcleo de robótica com o objetivo de reunir mais pessoas com interesses semelhantes e ampliar a participação em competições. Assim, nasceu o Pequi Mecânico! Nesse jornada conquistamos muitos títulos dentre as categorias das competições brasileiras de robótica e ainda continuamos nossa caminhada hoje conseguindo participar do Mundial de Robótica em Três categorias diferentes.",
    badge: "Robótica",
    gradientFrom: "#78350f",
    gradientTo: "#b45309",
    accentBar: "#f59e0b",
  },
  {
    name: "GDG",
    logo: "/entidades/gdg.png",
    description:
      "As Comunidades Google em Goiânia são formadas pelo GDG Goiânia (Google Developer Groups) e pelo WTM Goiânia (Women Techmakers) — programas globais do Google conduzidos de forma totalmente voluntária por organizadores e embaixadoras locais. O GDG Goiânia reúne pessoas desenvolvedoras e entusiastas de tecnologia para promover aprendizado e networking por meio de eventos como o DevFest Cerrado, o International Women's Day Cerrado e o Build With AI. Já o WTM tem foco na inclusão e no fortalecimento de mulheres na tecnologia. Juntas, as comunidades reúnem mais de 1.500 participantes e oferecem anualmente mais de 60 atividades nas áreas de Desenvolvimento Web/Mobile, IA Generativa, Cloud, UX/UI e Desenvolvimento de Carreira — abertas a estudantes, profissionais e pesquisadores.",
    badge: "Comunidade Google",
    gradientFrom: "#1d4ed8",
    gradientTo: "#1e40af",
    accentBar: "#60a5fa",
  },
  {
    name: "WMDG",
    logo: "/entidades/wmdg.jpeg",
    description:
      "A We Make Digital Games (WMDG) é um projeto de extensão do INF-UFG que evoluiu de uma disciplina para uma forte comunidade de desenvolvedores. Nosso foco é dar vitrine aos projetos e conectar os alunos ao mercado e a pesquisadores da pós-graduação. Já contamos com um portfólio de 31 jogos e, para expandir, planejamos organizar uma Game Jam na UFG e lançar o WMDG Awards para premiar os talentos da nossa comunidade.",
    badge: "Jogos Digitais",
    gradientFrom: "#1e1b4b",
    gradientTo: "#3730a3",
    accentBar: "#818cf8",
  },
  {
    name: "Level 5 Junior",
    logo: "/entidades/level5.png",
    description:
      "A Level 5 é a Empresa Júnior do Instituto de Informática da UFG, fundada em 5 de maio de 2015. Desde sua criação, a EJ atua no desenvolvimento de sites e soluções web, sempre guiada por três pilares: tecnologia, colaboração e aprendizado contínuo.",
    badge: "Empresa Júnior",
    gradientFrom: "#7c2d12",
    gradientTo: "#c2410c",
    accentBar: "#fb923c",
  },
  {
    name: "Dex Hub",
    logo: "/entidades/dexhub.jpeg",
    description:
      "Nascida no INF-UFG, a DEX é um hub de inovação focado em construir e acelerar perfis empreendedores. Através de workshops, palestras e imersões, criamos um palco dinâmico para o intercâmbio de ideias, aproximando os estudantes de grandes especialistas do mercado e da academia, além de ajudar e incentivar startups dentro do próprio INF/UFG. Participar da DEX é estar no centro do networking da universidade e desenvolver as soft skills que serão o seu maior diferencial competitivo. Mais do que formar empreendedores, nós formamos protagonistas: profissionais com a autonomia necessária para liderar projetos de impacto, seja criando uma startup, revolucionando a pesquisa ou assumindo a frente em gigantes da tecnologia.",
    badge: "Hub de Inovação",
    gradientFrom: "#134e4a",
    gradientTo: "#0f766e",
    accentBar: "#2dd4bf",
  },
  {
    name: "Monkeys",
    logo: "/entidades/monke.png",
    description:
      "Nosso grupo é dedicado ao estudo e à prática da programação competitiva, com foco na preparação para competições, como a Olimpíada Brasileira de Informática (OBI) e a Maratona de Programação. Realizamos aulas sobre algoritmos e estruturas de dados avançadas, participamos ativamente de torneios (Maratona do Cerrado, Monkeys Contest e etc.) e promovemos debates constantes sobre a resolução de problemas algorítmicos. Nosso foco é desenvolver a habilidade de solucionar desafios lógicos de forma otimizada usando o computador.",
    badge: "Prog. Competitiva",
    gradientFrom: "#0f172a",
    gradientTo: "#1e293b",
    accentBar: "#94a3b8",
  },
];

/* ── Individual card ─────────────────────────────────────────────── */
function EntityCard({ entity }: { entity: Entity }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#8eb1ff]/25 bg-white shadow-sm shadow-[#0b1d4d]/8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#0b1d4d]/12">

      {/* Gradient header */}
      <div
        className="relative flex h-36 shrink-0 flex-col items-center justify-center gap-3"
        style={{
          background: `linear-gradient(135deg, ${entity.gradientFrom} 0%, ${entity.gradientTo} 100%)`,
        }}
      >
        {/* Subtle grid pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 23px,rgba(255,255,255,1) 23px,rgba(255,255,255,1) 24px)," +
              "repeating-linear-gradient(90deg,transparent,transparent 23px,rgba(255,255,255,1) 23px,rgba(255,255,255,1) 24px)",
          }}
          aria-hidden="true"
        />

        {/* Logo */}
        <div className="relative z-10 h-16 w-16 overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/30 ring-2 ring-white/25 transition-transform duration-300 group-hover:scale-105">
          <Image
            src={entity.logo}
            alt={`Logo ${entity.name}`}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>

        {/* Badge pill */}
        <span
          className="relative z-10 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
          style={{
            background: "rgba(255,255,255,0.13)",
            color: "rgba(255,255,255,0.88)",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(4px)",
          }}
        >
          {entity.badge}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <h3 className="text-lg font-black uppercase tracking-wide text-[#0b1d4d]">
          {entity.name}
        </h3>

        {/* Accent bar — grows on hover */}
        <div
          className="mb-3 mt-2 h-1 w-10 rounded-full transition-all duration-300 group-hover:w-16"
          style={{ backgroundColor: entity.accentBar }}
          aria-hidden="true"
        />

        {/* Description */}
        <p
          className={`flex-1 text-sm leading-relaxed text-[#0b1d4d]/70 transition-all duration-300 ${
            expanded ? "" : "line-clamp-3"
          }`}
        >
          {entity.description}
        </p>

        {/* Toggle button */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 flex items-center gap-1.5 self-start text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:gap-2.5"
          style={{ color: entity.accentBar }}
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              Recolher <ChevronUp size={13} />
            </>
          ) : (
            <>
              Ver mais <ChevronDown size={13} />
            </>
          )}
        </button>
      </div>
    </article>
  );
}

/* ── Swiper container ────────────────────────────────────────────── */
export function EntidadesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  /* Sync nav state with scroll position */
  const syncState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScroll - 4);

    // Infer active index from first card's width
    const firstCard = el.firstElementChild as HTMLElement | null;
    if (firstCard) {
      const cardStep = firstCard.offsetWidth + 20; // 20 = gap-5
      const idx = Math.round(el.scrollLeft / cardStep);
      setActiveIndex(Math.max(0, Math.min(idx, entities.length - 1)));
    }
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    syncState();
    el.addEventListener("scroll", syncState, { passive: true });
    const ro = new ResizeObserver(syncState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", syncState);
      ro.disconnect();
    };
  }, [syncState]);

  /* Scroll helpers */
  const scrollByCard = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const step = firstCard ? firstCard.offsetWidth + 20 : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  const scrollToIndex = useCallback((idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild as HTMLElement | null;
    const step = firstCard ? firstCard.offsetWidth + 20 : el.clientWidth;
    el.scrollTo({ left: idx * step, behavior: "smooth" });
  }, []);

  /* Mouse drag — desktop */
  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    isDragging.current = true;
    dragStartX.current = e.pageX - el.offsetLeft;
    dragScrollLeft.current = el.scrollLeft;
    el.style.scrollSnapType = "none";
    el.style.cursor = "grabbing";
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const el = trackRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - dragStartX.current) * 1.6;
    el.scrollLeft = dragScrollLeft.current - walk;
  }, []);

  const stopDrag = useCallback(() => {
    const el = trackRef.current;
    if (!el || !isDragging.current) return;
    isDragging.current = false;
    el.style.cursor = "grab";
    // Snap to nearest card after drag ends
    el.style.scrollSnapType = "x mandatory";
    const firstCard = el.firstElementChild as HTMLElement | null;
    if (firstCard) {
      const step = firstCard.offsetWidth + 20;
      const nearest = Math.round(el.scrollLeft / step);
      el.scrollTo({ left: nearest * step, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="relative select-none">

      {/* ── Track ── */}
      <div className="relative overflow-hidden">
        <div
          ref={trackRef}
          role="region"
          aria-label="Entidades estudantis do INF"
          className="swiper-track flex cursor-grab gap-5 overflow-x-auto pb-3 active:cursor-grabbing"
          style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          {entities.map((entity) => (
            <div
              key={entity.name}
              className="h-auto w-[82%] shrink-0 sm:w-[46%] lg:w-[30%]"
              style={{ scrollSnapAlign: "start" }}
            >
              <EntityCard entity={entity} />
            </div>
          ))}
          {/* Trailing spacer so the last card isn't flush against the edge */}
          <div className="w-2 shrink-0" aria-hidden="true" />
        </div>

        {/* Left fade — visible when scrolled past start */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 transition-opacity duration-300"
          style={{
            opacity: canScrollLeft ? 1 : 0,
            background: "linear-gradient(to right, var(--background) 10%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Right fade — visible when more content exists on the right */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 transition-opacity duration-300"
          style={{
            opacity: canScrollRight ? 1 : 0,
            background: "linear-gradient(to left, var(--background) 10%, transparent 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── Navigation bar ── */}
      <div className="mt-6 flex items-center justify-between gap-4">

        {/* Prev */}
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={!canScrollLeft}
          aria-label="Entidade anterior"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#8eb1ff]/50 bg-white text-[#0b1d4d] shadow-sm transition-all duration-200 hover:border-[#005b9f]/50 hover:bg-[#e8f0fe] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-25"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Dots */}
        <div
          className="flex flex-wrap items-center justify-center gap-1.5"
          role="tablist"
          aria-label="Navegação de entidades"
        >
          {entities.map((entity, i) => (
            <button
              key={entity.name}
              type="button"
              role="tab"
              aria-selected={activeIndex === i}
              aria-label={`Ir para ${entity.name}`}
              onClick={() => scrollToIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? "w-7 bg-[#005b9f]"
                  : "w-2 bg-[#8eb1ff]/50 hover:bg-[#8eb1ff] hover:w-4"
              }`}
            />
          ))}
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={!canScrollRight}
          aria-label="Próxima entidade"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#8eb1ff]/50 bg-white text-[#0b1d4d] shadow-sm transition-all duration-200 hover:border-[#005b9f]/50 hover:bg-[#e8f0fe] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-25"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
