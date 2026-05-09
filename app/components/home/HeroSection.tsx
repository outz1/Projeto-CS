import type { CSSProperties } from "react";
import { matrixColumns } from "./config";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-linear-to-b from-[#0b2a67] to-[#0e3b8a] px-4 pb-12 pt-20 sm:px-6 sm:pt-24 md:px-8 md:pt-28 lg:px-12">
      <div
        className="matrix-layer matrix-fade-mask pointer-events-none absolute inset-0 z-10 bg-blue-900/35"
        aria-hidden="true"
      >
        <div className="matrix-rain">
          {matrixColumns.map((column) => (
            <span
              key={column.id}
              className="matrix-column"
              style={
                {
                  left: `${column.left}%`,
                  animationDuration: `${column.duration}s`,
                  animationDelay: `-${column.delay}s`,
                  "--matrix-opacity": column.opacity,
                } as CSSProperties
              }
            >
              {column.stream}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-20 mx-auto grid w-full max-w-[1500px] gap-8 md:grid-cols-[56%_44%] md:items-center">
        
        {/* Card Envelopado com Animação de Borda e Hover */}
        <div className="group relative mx-auto mt-4 flex overflow-hidden rounded-[18px] p-[3px] shadow-2xl shadow-[#0b1d4d]/40 transition-transform duration-500 ease-out hover:-translate-y-2 md:mx-0">
          
          {/* Luz neon giratória (linha principal) */}
          <div className="absolute left-1/2 top-1/2 aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_75%,#60a5fa_100%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
          
          {/* Luz neon com blur (brilho difuso) */}
          <div className="absolute left-1/2 top-1/2 aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_75%,#60a5fa_100%)] blur-lg opacity-40 transition-opacity duration-500 group-hover:opacity-80" />

          {/* Container interno (O Card Real) */}
          <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-[#d9e7ff]/95">
            <div className="overflow-hidden">
              <img
                src="/IMG_1490.PNG"
                alt="Instituto de Informática - UFG"
                className="h-[35vh] min-h-[250px] w-full object-cover object-[10%_50%] transition-transform duration-700 ease-out group-hover:scale-105 md:h-[55vh] md:object-center"
              />
            </div>
            
            <div className="relative z-10 flex flex-col justify-center bg-[#d9e7ff] p-6 sm:p-8">
              <h3 className="text-xl font-bold uppercase tracking-wide text-[#0b1d4d] sm:text-2xl">
                Instituto de Informática
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#0b1d4d]/80 sm:text-base">
                Venha conhecer nossos espaços de aprendizado e inovação. A sua
                jornada na tecnologia ganha vida aqui!
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-center gap-5 md:gap-8 md:pl-3 lg:pl-8">
          <p className="text-sm font-semibold tracking-[0.18em] text-[#dbe9ff] sm:text-base md:text-lg">
            ^ DÊ O PLAY NO SEU FUTURO:
          </p>
          <h1 className="space-y-1 font-black uppercase leading-[0.95] tracking-[0.16em] text-[#eff5ff] [text-shadow:0_6px_22px_rgba(8,22,60,0.65)] sm:tracking-[0.2em]">
            <span className="block text-4xl sm:text-5xl md:text-6xl">2026</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl">
              A PRÓXIMA
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl">
              TEMPORADA DA SUA
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl">
              VIDA COMEÇA AQUI!
            </span>
          </h1>
          <article className="max-w-[680px] rounded-xl border border-[#9ab9ff]/55 bg-[#d6e5ff]/90 p-4 text-sm leading-relaxed text-[#0b1d4d] shadow-lg shadow-[#0b1d4d]/20 sm:p-5 sm:text-base">
            O EVENTO ESPAÇO DAS PROFISSÕES DA UFG OCORRE ANUALMENTE NO PRIMEIRO
            SEMESTRE E OFERECE A ESTUDANTES DO ENSINO MÉDIO INFORMAÇÕES SOBRE
            CURSOS, FORMAS DE INGRESSO, APOIO ESTUDANTIL E POSSIBILIDADES DE
            CARREIRA, AUXILIANDO NA ESCOLHA DA GRADUAÇÃO E DA FUTURA PROFISSÃO.
          </article>
        </div>
      </div>
    </section>
  );
}