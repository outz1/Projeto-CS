import type { CSSProperties } from "react";
import { matrixColumns } from "./config";
import { ChevronDown } from "lucide-react";

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

        <div className="flex flex-col items-start justify-center gap-5 md:gap-7 md:pl-3 lg:pl-8">
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.22em] text-[#93b8ff] sm:text-sm md:text-base">
            <span className="h-px w-6 bg-[#60a5fa]/60" aria-hidden="true" />
            DÊ O PLAY NO SEU FUTURO NO ESPAÇO DAS PROFISSÕES UFG
          </p>
          <h1 className="space-y-1 font-black uppercase leading-[0.95] tracking-[0.16em] text-[#eff5ff] [text-shadow:0_6px_22px_rgba(8,22,60,0.65)] sm:tracking-[0.2em]">
            <span className="block text-4xl sm:text-5xl md:text-6xl pb-5">2026</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl">
              A DECISÃO
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl">
              DO SEU FUTURO
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl">
              COMEÇA AQUI!
            </span>
          </h1>
          <article className="max-w-[680px] rounded-xl border-l-4 border-[#60a5fa] bg-white/10 px-5 py-4 text-sm leading-relaxed text-[#dbe9ff] shadow-lg shadow-[#0b1d4d]/30 backdrop-blur-sm sm:px-6 sm:py-5 sm:text-base">
            O EVENTO ESPAÇO DAS PROFISSÕES DA UFG OCORRE ANUALMENTE NO PRIMEIRO
            SEMESTRE E OFERECE A ESTUDANTES DO ENSINO MÉDIO INFORMAÇÕES SOBRE
            CURSOS, FORMAS DE INGRESSO, APOIO ESTUDANTIL E POSSIBILIDADES DE
            CARREIRA, AUXILIANDO NA ESCOLHA DA GRADUAÇÃO E DA FUTURA PROFISSÃO.
          </article>
          <a
            href="#o-inf"
            className="group flex items-center gap-2.5 rounded-xl border border-[#60a5fa]/40 bg-[#60a5fa]/15 px-6 py-3 text-sm font-bold tracking-wide text-[#c8dcff] shadow-md backdrop-blur-sm transition-all duration-300 hover:border-[#60a5fa]/70 hover:bg-[#60a5fa]/25 hover:text-white hover:shadow-[0_0_20px_rgba(96,165,250,0.25)] active:scale-[0.97]"
          >
            Conheça o INF
            <ChevronDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2" aria-hidden="true">
        <div className="flex animate-bounce flex-col items-center gap-1">
          <ChevronDown size={20} className="text-white/40" />
        </div>
      </div>

    </section>
  );
}
