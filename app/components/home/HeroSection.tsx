import type { CSSProperties } from "react";
import { matrixColumns } from "./config";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden pt-20">
      
      {/* 1. Imagem de Fundo (Preenchendo a tela toda) */}
      <img
        src="/IMG_1490.PNG"
        alt="Instituto de Informática - UFG"
        className="absolute inset-0 z-0 h-full w-full object-cover object-top"
      />

      {/* 2. Máscaras de Gradiente e Overlay (Escurecimento moderado para integrar texto sem esconder a imagem) */}
      <div className="absolute inset-0 z-0 bg-[#071333]/50" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#071333]/90 via-[#071333]/50 to-transparent" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#071333]/90 via-[#071333]/30 to-transparent" />

      {/* 3. Chuva Matrix Criptografada (Na FRENTE da Imagem e com Transparência) */}
      <div
        className="matrix-layer matrix-fade-mask pointer-events-none absolute inset-0 z-10 bg-transparent opacity-80"
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

      {/* 4. Conteúdo Principal Institucional */}
      <div className="relative z-20 mx-auto flex w-full max-w-[1500px] flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex max-w-[850px] flex-col items-start justify-center gap-6 py-12 md:gap-7 lg:py-24">
          <p className="flex items-center gap-3 text-xs font-bold tracking-[0.25em] text-[#93b8ff] sm:text-sm md:text-base">
            <span className="h-0.5 w-8 bg-[#60a5fa]" aria-hidden="true" />
            DÊ O PLAY NO SEU FUTURO NO ESPAÇO DAS PROFISSÕES UFG
          </p>
          
          <h1 className="space-y-1 font-black uppercase leading-[1.05] tracking-[0.16em] text-[#eff5ff] drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] sm:tracking-[0.2em] md:leading-tight">
            <span className="block text-5xl text-[#60a5fa] drop-shadow-md sm:text-6xl md:text-7xl lg:text-8xl pb-3">2026</span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              A DECISÃO
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              DO SEU FUTURO
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              COMEÇA AQUI!
            </span>
          </h1>

          <article className="mt-2 max-w-[700px] rounded-xl border-l-4 border-[#60a5fa] bg-[#071333]/40 px-6 py-5 text-sm leading-relaxed text-[#dbe9ff] shadow-xl backdrop-blur-md sm:text-base md:p-8 md:text-lg">
            O EVENTO ESPAÇO DAS PROFISSÕES DA UFG OCORRE ANUALMENTE NO PRIMEIRO
            SEMESTRE E OFERECE A ESTUDANTES DO ENSINO MÉDIO INFORMAÇÕES SOBRE
            CURSOS, FORMAS DE INGRESSO, APOIO ESTUDANTIL E POSSIBILIDADES DE
            CARREIRA, AUXILIANDO NA ESCOLHA DA GRADUAÇÃO E DA FUTURA PROFISSÃO.
          </article>

          <div className="mt-4">
            <a
              href="#o-inf"
              className="group flex w-fit items-center gap-3 rounded-lg border border-[#60a5fa]/50 bg-[#60a5fa]/15 px-8 py-4 text-sm font-bold tracking-widest text-[#c8dcff] shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#60a5fa] hover:bg-[#60a5fa]/30 hover:text-white hover:shadow-[0_0_25px_rgba(96,165,250,0.3)] active:scale-95 sm:text-base"
            >
              Conheça o INF
              <ChevronDown size={18} className="transition-transform duration-300 group-hover:translate-y-1" />
            </a>
          </div>
        </div>
      </div>

      {/* 5. Legenda Institucional Preservando o Copy Original do Card Anterior */}
      <div className="absolute bottom-10 right-6 z-20 hidden max-w-[340px] rounded-xl border border-white/5 bg-[#071333]/40 p-5 shadow-2xl backdrop-blur-md lg:block lg:right-12 xl:right-16 transition-transform hover:-translate-y-1">
        <h3 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#60a5fa]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#60a5fa] animate-pulse" aria-hidden="true" />
          Instituto de Informática
        </h3>
        <p className="text-xs leading-relaxed text-slate-300">
          Venha conhecer nossos espaços de aprendizado e inovação. A sua
          jornada na tecnologia ganha vida aqui!
        </p>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2" aria-hidden="true">
        <div className="flex animate-bounce flex-col items-center gap-1">
          <ChevronDown size={24} className="text-white/40" />
        </div>
      </div>

    </section>
  );
}
