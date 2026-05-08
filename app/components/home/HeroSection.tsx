import { matrixColumns } from "./config";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#0b2a67] to-[#0e3b8a] px-4 pb-12 pt-5 sm:px-6 md:px-8 md:pt-10 lg:px-12">
      <div className="matrix-layer matrix-fade-mask pointer-events-none absolute inset-0 z-10 bg-blue-900/35" aria-hidden="true">
        <div className="matrix-rain">
          {matrixColumns.map((column) => (
            <span
              key={column.id}
              className="matrix-column"
              style={{
                left: `${column.left}%`,
                animationDuration: `${column.duration}s`,
                animationDelay: `-${column.delay}s`,
                opacity: column.opacity,
              }}
            >
              {column.stream}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-20 mx-auto grid w-full max-w-[1500px] gap-8 md:grid-cols-[56%_44%] md:items-center">
        <div className="flex flex-col overflow-hidden rounded-2xl border border-[#93b4ff]/45 bg-[#d9e7ff]/92 shadow-xl shadow-[#0b1d4d]/20">
          <img
            src="/IMG_1490.PNG"
            alt="Instituto de Informática - UFG"
            className="h-[55vh] min-h-75 w-full object-cover"
          />
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <h3 className="text-xl font-bold uppercase tracking-wide text-[#0b1d4d] sm:text-2xl">
              Instituto de Informática
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#0b1d4d]/80 sm:text-base">
              Venha conhecer nossos espaços de aprendizado e inovação. A sua jornada na tecnologia ganha vida aqui!
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start justify-center gap-5 md:gap-8 md:pl-3 lg:pl-8">
          <p className="text-sm font-semibold tracking-[0.18em] text-[#dbe9ff] sm:text-base md:text-lg">
            ^ DÊ O PLAY NO SEU FUTURO:
          </p>
          <h1 className="space-y-1 font-black uppercase leading-[0.95] tracking-[0.16em] text-[#eff5ff] [text-shadow:0_6px_22px_rgba(8,22,60,0.65)] sm:tracking-[0.2em]">
            <span className="block text-4xl sm:text-5xl md:text-6xl">2026</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl">A PRÓXIMA</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl">TEMPORADA DA SUA</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl">VIDA COMEÇA AQUI!</span>
          </h1>
          <article className="max-w-[680px] rounded-xl border border-[#9ab9ff]/55 bg-[#d6e5ff]/90 p-4 text-sm leading-relaxed text-[#0b1d4d] shadow-lg shadow-[#0b1d4d]/20 sm:p-5 sm:text-base">
            O EVENTO “ESPAÇO DAS PROFISSÕES” DA UFG OCORRE ANUALMENTE NO PRIMEIRO SEMESTRE E
            OFERECE A ESTUDANTES DO ENSINO MÉDIO INFORMAÇÕES SOBRE CURSOS, FORMAS DE INGRESSO,
            APOIO ESTUDANTIL E POSSIBILIDADES DE CARREIRA, AUXILIANDO NA ESCOLHA DA GRADUAÇÃO E
            DA FUTURA PROFISSÃO.
          </article>
        </div>
      </div>
    </section>
  );
}
