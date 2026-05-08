import { matrixColumns } from "./config";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f9fbff] to-[#eef3ff] px-4 pb-12 pt-5 sm:px-6 md:px-8 md:pt-10 lg:px-12">
      <div
        className="matrix-fade-mask pointer-events-none absolute inset-x-0 top-0 h-[72%] overflow-hidden"
        aria-hidden="true"
      >
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

      <div className="mx-auto grid w-full max-w-[1500px] gap-8 md:grid-cols-[56%_44%] md:items-center">
        <div className="grid grid-cols-2 gap-3 md:gap-5">
          <ImagePlaceholder className="h-[35vh] min-h-56 w-full" />
          <ImagePlaceholder className="h-[35vh] min-h-56 w-full" />
          <ImagePlaceholder className="col-span-2 h-[34vh] min-h-52 w-full" />
        </div>

        <div className="flex flex-col items-start justify-center gap-5 md:gap-8 md:pl-3 lg:pl-8">
          <p className="text-sm font-semibold tracking-[0.18em] sm:text-base md:text-lg">
            ^ DÊ O PLAY NO SEU FUTURO:
          </p>
          <h1 className="space-y-1 font-black uppercase leading-[0.95] tracking-[0.16em] text-[#0b1d4d] [text-shadow:0_2px_10px_rgba(255,255,255,0.55)] sm:tracking-[0.2em]">
            <span className="block text-4xl sm:text-5xl md:text-6xl">2026</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl">A PRÓXIMA</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl">TEMPORADA DA SUA</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl">VIDA COMEÇA AQUI!</span>
          </h1>
          <article className="max-w-[680px] rounded-xl border border-[#0b1d4d]/20 bg-white/88 p-4 text-sm leading-relaxed text-[#0b1d4d] shadow-lg sm:p-5 sm:text-base">
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
