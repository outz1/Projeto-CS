"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Code2, Brain, ChevronRight } from "lucide-react";

/* ── Starfield (keep original decorative background) ─────────────── */
const starField = [
  { top: "8%",  left: "6%",  size: 2, opacity: 0.9 },
  { top: "14%", left: "20%", size: 2, opacity: 0.7 },
  { top: "10%", left: "38%", size: 1, opacity: 0.8 },
  { top: "18%", left: "55%", size: 2, opacity: 0.75 },
  { top: "9%",  left: "72%", size: 1, opacity: 0.85 },
  { top: "16%", left: "88%", size: 2, opacity: 0.7 },
  { top: "28%", left: "12%", size: 1, opacity: 0.7 },
  { top: "24%", left: "30%", size: 2, opacity: 0.8 },
  { top: "32%", left: "48%", size: 1, opacity: 0.9 },
  { top: "26%", left: "66%", size: 2, opacity: 0.8 },
  { top: "34%", left: "82%", size: 1, opacity: 0.75 },
  { top: "45%", left: "7%",  size: 2, opacity: 0.75 },
  { top: "40%", left: "24%", size: 1, opacity: 0.85 },
  { top: "48%", left: "41%", size: 2, opacity: 0.9 },
  { top: "42%", left: "58%", size: 1, opacity: 0.75 },
  { top: "50%", left: "74%", size: 2, opacity: 0.85 },
  { top: "44%", left: "91%", size: 1, opacity: 0.8 },
  { top: "61%", left: "15%", size: 1, opacity: 0.75 },
  { top: "66%", left: "33%", size: 2, opacity: 0.8 },
  { top: "60%", left: "50%", size: 1, opacity: 0.9 },
  { top: "68%", left: "67%", size: 2, opacity: 0.7 },
  { top: "62%", left: "84%", size: 1, opacity: 0.8 },
  { top: "78%", left: "10%", size: 2, opacity: 0.75 },
  { top: "82%", left: "27%", size: 1, opacity: 0.85 },
  { top: "76%", left: "44%", size: 2, opacity: 0.8 },
  { top: "84%", left: "60%", size: 1, opacity: 0.9 },
  { top: "80%", left: "77%", size: 2, opacity: 0.75 },
  { top: "86%", left: "92%", size: 1, opacity: 0.8 },
];

/* ── Area data ───────────────────────────────────────────────────── */
type AreaIcon = typeof Database;

type Area = {
  id: string;
  title: string;
  description: string;
  icon: AreaIcon;
  gradientFrom: string;
  gradientTo: string;
  barFrom: string;
  barTo: string;
  tags: string[];
};

const areas: Area[] = [
  {
    id: "01",
    title: "Sistemas de Informação",
    description:
      "Focado na aplicação da tecnologia para otimizar processos organizacionais. Une fundamentos da computação e princípios de gestão para projetar, desenvolver e administrar sistemas de TI alinhados aos objetivos de negócios.",
    icon: Database,
    gradientFrom: "#1f4f73",
    gradientTo: "#2f7ca8",
    barFrom: "#38bdf8",
    barTo: "#7dd3fc",
    tags: ["Gestão de TI", "Análise de Sistemas", "Business Intelligence", "Banco de Dados"],
  },
  {
    id: "02",
    title: "Engenharia de Software",
    description:
      "Voltado para o ciclo de vida completo de aplicações complexas. Envolve projeto, desenvolvimento, testes e manutenção de software utilizando metodologias ágeis e arquiteturas robustas para garantir qualidade e escalabilidade.",
    icon: Code2,
    gradientFrom: "#16427d",
    gradientTo: "#2471b9",
    barFrom: "#60a5fa",
    barTo: "#93c5fd",
    tags: ["Metodologias Ágeis", "Arquitetura de Software", "Testes & Qualidade", "DevOps"],
  },
  {
    id: "03",
    title: "Inteligência Artificial",
    description:
      "Direcionado ao desenvolvimento de sistemas capazes de aprender, analisar dados e automatizar decisões. Engloba aprendizado de máquina, redes neurais e processamento de linguagem natural para criar soluções inovadoras.",
    icon: Brain,
    gradientFrom: "#2e3f88",
    gradientTo: "#445fc5",
    barFrom: "#818cf8",
    barTo: "#a5b4fc",
    tags: ["Machine Learning", "Deep Learning", "Proc. de Linguagem", "Visão Computacional"],
  },
];

/* ── Detail panel (shared between mobile & desktop) ─────────────── */
function DetailPanel({ area }: { area: Area }) {
  const Icon = area.icon;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">

      {/* Header strip with gradient */}
      <div
        className="relative flex items-center gap-5 overflow-hidden px-7 py-6 sm:px-8 sm:py-7"
        style={{
          background: `linear-gradient(135deg, ${area.gradientFrom}cc 0%, ${area.gradientTo}88 100%)`,
        }}
      >
        {/* Subtle dot-grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
          aria-hidden="true"
        />

        {/* Icon container */}
        <div
          className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-sm"
        >
          <Icon size={28} className="text-white" />
        </div>

        {/* Title + badge */}
        <div className="relative z-10 min-w-0">
          <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
            {area.id} — Área Correlata
          </p>
          <h3 className="text-xl font-black uppercase leading-tight tracking-wide text-white sm:text-2xl">
            {area.title}
          </h3>
        </div>
      </div>

      {/* Content body */}
      <div className="flex flex-1 flex-col gap-6 px-7 py-6 sm:px-8 sm:py-7">

        {/* Accent bar */}
        <div
          className="h-1 w-14 rounded-full"
          style={{
            background: `linear-gradient(to right, ${area.barFrom}, ${area.barTo})`,
          }}
          aria-hidden="true"
        />

        {/* Description */}
        <p className="text-sm leading-relaxed text-white/70 sm:text-base">
          {area.description}
        </p>

        {/* Competency tags */}
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
            Principais Competências
          </p>
          <div className="flex flex-wrap gap-2">
            {area.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-xs font-semibold text-white/65 transition-colors duration-200 hover:border-white/30 hover:text-white/90"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main section component ──────────────────────────────────────── */
export function AreasCorrelatasCube() {
  const [activeIdx, setActiveIdx] = useState(0);

  const panelVariants = {
    enter: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  };

  return (
    <section
      id="areas-correlatas"
      className="relative w-full overflow-hidden bg-linear-to-b from-[#0b2a67] to-[#0e3b8a]"
    >
      {/* ── Starfield ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {starField.map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              boxShadow: "0 0 8px rgba(255,255,255,0.8)",
              animation: `star-twinkle ${1.8 + (i % 5) * 0.35}s ease-in-out -${(i % 7) * 0.4}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Content ── */}
      <div className="scroll-mt-24 relative z-10 mx-auto w-full max-w-[1500px] px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-12">

        {/* Section header */}
        <div className="mb-10 sm:mb-12">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/40">
            Instituto de Informática — UFG
          </p>
          <h2 className="text-3xl font-black uppercase tracking-wide text-white sm:text-4xl">
            ÁREAS CORRELATAS
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
            Conheça os cursos oferecidos pelo INF e as possibilidades de formação
            dentro do Instituto de Informática da UFG.
          </p>
        </div>

        {/* ── MOBILE: horizontal tab pills ── */}
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1 lg:hidden">
          {areas.map((area, i) => (
            <button
              key={area.id}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wide transition-all duration-200 ${
                activeIdx === i
                  ? "border-white/30 bg-white/15 text-white"
                  : "border-white/12 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80"
              }`}
            >
              {area.id} · {area.title}
            </button>
          ))}
        </div>

        {/* ── DESKTOP: master-detail grid / MOBILE: panel only ── */}
        <div className="grid gap-5 lg:grid-cols-[280px_1fr] lg:gap-6 xl:grid-cols-[300px_1fr]">

          {/* Left nav — desktop only */}
          <nav
            className="hidden flex-col gap-2 lg:flex"
            aria-label="Selecionar área correlata"
          >
            {areas.map((area, i) => {
              const Icon = area.icon;
              const isActive = activeIdx === i;
              return (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className={`group flex items-center gap-4 rounded-xl border px-5 py-4 text-left transition-all duration-300 ${
                    isActive
                      ? "border-white/20 bg-white/10 shadow-lg shadow-black/20"
                      : "border-transparent bg-white/0 hover:border-white/10 hover:bg-white/5"
                  }`}
                >
                  {/* Number */}
                  <span
                    className={`shrink-0 text-xs font-bold tabular-nums transition-colors duration-200 ${
                      isActive ? "text-white/60" : "text-white/25 group-hover:text-white/40"
                    }`}
                  >
                    {area.id}
                  </span>

                  {/* Icon + title */}
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-white/15 text-white"
                          : "bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white/60"
                      }`}
                    >
                      <Icon size={16} />
                    </div>
                    <span
                      className={`text-sm font-bold uppercase leading-tight tracking-wide transition-colors duration-200 ${
                        isActive ? "text-white" : "text-white/50 group-hover:text-white/75"
                      }`}
                    >
                      {area.title}
                    </span>
                  </div>

                  {/* Active indicator arrow */}
                  <ChevronRight
                    size={14}
                    className={`shrink-0 transition-all duration-300 ${
                      isActive
                        ? "translate-x-0 text-white/60 opacity-100"
                        : "-translate-x-1 text-white/20 opacity-0 group-hover:translate-x-0 group-hover:opacity-50"
                    }`}
                  />
                </button>
              );
            })}

            {/* Divider + institutional note */}
            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="text-[11px] leading-relaxed text-white/30">
                Todos os cursos são reconhecidos pelo MEC e ofertados no Campus
                Samambaia, Goiânia — GO.
              </p>
            </div>
          </nav>

          {/* Detail panel — animated on area change */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              variants={panelVariants}
              initial="enter"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="min-h-[400px] sm:min-h-[360px]"
            >
              <DetailPanel area={areas[activeIdx]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Bottom dot navigator ── */}
        <div
          className="mt-8 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Áreas correlatas"
        >
          {areas.map((area, i) => (
            <button
              key={area.id}
              type="button"
              role="tab"
              aria-selected={activeIdx === i}
              aria-label={area.title}
              onClick={() => setActiveIdx(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIdx === i
                  ? "w-8 bg-white"
                  : "w-2 bg-white/30 hover:w-4 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
