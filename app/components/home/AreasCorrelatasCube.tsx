"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CubeItem, useCubeCarousel } from "./useCubeCarousel";

const starField = [
  { top: "8%", left: "6%", size: 2, opacity: 0.9 },
  { top: "14%", left: "20%", size: 2, opacity: 0.7 },
  { top: "10%", left: "38%", size: 1, opacity: 0.8 },
  { top: "18%", left: "55%", size: 2, opacity: 0.75 },
  { top: "9%", left: "72%", size: 1, opacity: 0.85 },
  { top: "16%", left: "88%", size: 2, opacity: 0.7 },
  { top: "28%", left: "12%", size: 1, opacity: 0.7 },
  { top: "24%", left: "30%", size: 2, opacity: 0.8 },
  { top: "32%", left: "48%", size: 1, opacity: 0.9 },
  { top: "26%", left: "66%", size: 2, opacity: 0.8 },
  { top: "34%", left: "82%", size: 1, opacity: 0.75 },
  { top: "45%", left: "7%", size: 2, opacity: 0.75 },
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

const cubeItems: CubeItem[] = [
  {
    title: "Sistemas da Informacao",
    description: "Focado na aplicação da tecnologia para otimizar processos organizacionais. Une fundamentos da computação e princípios de gestão para projetar, desenvolver e administrar sistemas de TI alinhados aos objetivos de negócios.",
    accent: "from-[#1f4f73] to-[#2f7ca8]",
  },
  {
    title: "Engenharia de Software",
    description: "Voltado para o ciclo de vida completo de aplicações complexas. Envolve projeto, desenvolvimento, testes e manutenção de software utilizando metodologias ágeis e arquiteturas robustas para garantir qualidade e escalabilidade.",
    accent: "from-[#16427d] to-[#2471b9]",
  },
  {
    title: "Inteligencia Artificial",
    description: "Direcionado ao desenvolvimento de sistemas capazes de aprender, analisar dados e automatizar decisões. Engloba aprendizado de máquina, redes neurais e processamento de linguagem natural para criar soluções inovadoras.",
    accent: "from-[#2e3f88] to-[#445fc5]",
  },
];

function getFaceStyle(offset: number, isMobile: boolean) {
  const absOffset = Math.abs(offset);
  const isActive = offset === 0;
  const direction = offset > 0 ? 1 : -1;
  const clampedDepth = Math.min(absOffset, 2);
  const sideOffset = isMobile
    ? absOffset === 1 ? 96 : 150
    : absOffset === 1 ? 210 : 320;

  return {
    zIndex: isActive ? 30 : 20 - absOffset,
    opacity: isActive ? 1 : absOffset === 1 ? 0.62 : 0.2,
    scale: isActive ? 1.03 : absOffset === 1 ? 0.86 : 0.72,
    rotateY: isActive ? 0 : direction * -44,
    x: isActive ? 0 : direction * sideOffset,
    z: isActive ? 140 : 60 - clampedDepth * 40,
  };
}

export function AreasCorrelatasCube() {
  const { activeIndex, goTo, goNext, goPrev, onDragEnd, visibleOrder } = useCubeCarousel(cubeItems);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 47.99rem)");
    const syncMobileState = (event?: MediaQueryListEvent) => {
      setIsMobile(event ? event.matches : mediaQuery.matches);
    };

    syncMobileState();
    mediaQuery.addEventListener("change", syncMobileState);
    return () => mediaQuery.removeEventListener("change", syncMobileState);
  }, []);

  return (
    <section
      id="areas-correlatas"
      className="relative w-full overflow-hidden bg-linear-to-b from-[#0b2a67] to-[#0e3b8a]"
    >
      <div className="pointer-events-none absolute inset-0">
        {starField.map((star, index) => (
          <span
            key={index}
            className="absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              boxShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
              animation: `star-twinkle ${1.8 + (index % 5) * 0.35}s ease-in-out -${(index % 7) * 0.4}s infinite`,
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="scroll-mt-24 relative z-10 mx-auto min-h-[85svh] w-full max-w-[1500px] overflow-x-hidden px-4 py-14 sm:px-6 md:px-8 lg:px-12">
        
        {/* CORREÇÃO: Título alterado para text-white para contrastar com o fundo azul */}
        <h2 className="mb-6 text-3xl font-black uppercase tracking-wide text-white sm:mb-8 sm:text-4xl">
          AREAS CORRELATAS
        </h2>

        <div className="w-full">
          <div
            className="relative mx-auto h-[380px] w-full max-w-[1200px] sm:h-[470px] md:h-[520px]"
            style={{ perspective: "1600px", transformStyle: "preserve-3d" }}
          >
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={onDragEnd}
              className="relative h-full w-full cursor-grab active:cursor-grabbing"
              style={{ transformStyle: "preserve-3d" }}
            >
              {visibleOrder.map(({ item, idx, offset }) => {
                const face = getFaceStyle(offset, isMobile);
                return (
                  <motion.article
                    key={item.title}
                    initial={false}
                    animate={face}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-y-0 left-0 right-0 mx-auto my-auto h-[280px] w-[82vw] max-w-[22rem] rounded-[1.5rem] border border-white/60 bg-white/85 p-5 shadow-2xl backdrop-blur-xl sm:h-[340px] sm:w-full sm:max-w-[28.75rem] sm:rounded-[2rem] sm:p-7"
                    style={{
                      transformStyle: "preserve-3d",
                      pointerEvents: offset === 0 ? "auto" : "none",
                    }}
                    aria-hidden={offset !== 0}
                  >
                    <div
                      className={`mb-4 h-2.5 w-24 rounded-full bg-gradient-to-r sm:mb-5 ${item.accent}`}
                      aria-hidden="true"
                    />
                    <h3 className="mb-3 text-xl font-black uppercase leading-tight tracking-wide text-[#0b1d4d] sm:mb-4 sm:text-[1.9rem]">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#0b1d4d]/90 sm:text-lg">
                      {item.description}
                    </p>
                    <button
                      type="button"
                      className="sr-only"
                      onClick={() => goTo(idx)}
                      aria-label={`Ir para ${item.title}`}
                    >
                      {item.title}
                    </button>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Card anterior"
            onClick={goPrev}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/80 text-[#0b1d4d] shadow-sm backdrop-blur-md transition-all hover:bg-white"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {cubeItems.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Selecionar ${item.title}`}
                aria-current={activeIndex === index}
                className={`h-2.5 rounded-full transition-all ${
                  activeIndex === index ? "w-8 bg-white" : "w-2.5 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Proximo card"
            onClick={goNext}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/80 text-[#0b1d4d] shadow-sm backdrop-blur-md transition-all hover:bg-white"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
