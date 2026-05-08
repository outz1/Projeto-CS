"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CubeItem, useCubeCarousel } from "./useCubeCarousel";

const cubeItems: CubeItem[] = [
  {
    title: "Ciencia da Computacao",
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    accent: "from-[#1f3f91] to-[#2a56c6]",
  },
  {
    title: "Engenharia de Software",
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    accent: "from-[#16427d] to-[#2471b9]",
  },
  {
    title: "Sistemas da Informacao",
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    accent: "from-[#1f4f73] to-[#2f7ca8]",
  },
  {
    title: "Inteligencia Artificial",
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    accent: "from-[#2e3f88] to-[#445fc5]",
  },
];

function getFaceStyle(offset: number) {
  const absOffset = Math.abs(offset);
  const isActive = offset === 0;
  const direction = offset > 0 ? 1 : -1;
  const clampedDepth = Math.min(absOffset, 2);

  return {
    zIndex: isActive ? 30 : 20 - absOffset,
    opacity: isActive ? 1 : absOffset === 1 ? 0.62 : 0.2,
    scale: isActive ? 1.03 : absOffset === 1 ? 0.86 : 0.72,
    rotateY: isActive ? 0 : direction * -44,
    x: isActive ? 0 : direction * (absOffset === 1 ? 210 : 320),
    z: isActive ? 140 : 60 - clampedDepth * 40,
  };
}

export function AreasCorrelatasCube() {
  const { activeIndex, goTo, goNext, goPrev, onDragEnd, visibleOrder } = useCubeCarousel(cubeItems);

  return (
    <section
      id="areas-correlatas"
      className="scroll-mt-24 mx-auto min-h-[85svh] w-full max-w-[1500px] px-4 py-14 sm:px-6 md:px-8 lg:px-12"
    >
      <h2 className="mb-6 text-3xl font-black uppercase tracking-wide sm:mb-8 sm:text-4xl">
        AREAS CORRELATAS
      </h2>

      <div className="w-full overflow-visible">
        <div
          className="relative mx-auto h-[470px] w-[94vw] max-w-[1200px] overflow-visible md:h-[520px]"
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
              const face = getFaceStyle(offset);
              return (
                <motion.article
                  key={item.title}
                  initial={false}
                  animate={face}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute left-1/2 top-1/2 h-[340px] w-[85vw] max-w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-[#0b1d4d]/15 bg-white/95 p-6 shadow-[0_20px_55px_rgba(11,29,77,0.18)] backdrop-blur-sm sm:p-7"
                  style={{
                    transformStyle: "preserve-3d",
                    pointerEvents: offset === 0 ? "auto" : "none",
                  }}
                  aria-hidden={offset !== 0}
                >
                  <div
                    className={`mb-5 h-2.5 w-24 rounded-full bg-gradient-to-r ${item.accent}`}
                    aria-hidden="true"
                  />
                  <h3 className="mb-4 text-2xl font-black uppercase leading-tight tracking-wide text-[#0b1d4d] sm:text-[1.9rem]">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-[#0b1d4d]/90 sm:text-lg">
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
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#0b1d4d]/25 bg-white text-[#0b1d4d] shadow-sm"
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
                activeIndex === index ? "w-8 bg-[#0b1d4d]" : "w-2.5 bg-[#0b1d4d]/30"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Proximo card"
          onClick={goNext}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#0b1d4d]/25 bg-white text-[#0b1d4d] shadow-sm"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
