import { ImagePlaceholder } from "./ImagePlaceholder";
import { AreasCorrelatasCube } from "./AreasCorrelatasCube";
import { EntidadesCarousel } from "./EntidadesCarousel";

export function InfSection() {
  return (
    <section
      id="o-inf"
      className="scroll-mt-24 mx-auto grid min-h-[85svh] w-full max-w-[1500px] gap-7 px-4 py-14 sm:px-6 md:grid-cols-2 md:items-center md:px-8 lg:px-12"
    >
      <ImagePlaceholder className="h-[38vh] min-h-64 w-full md:h-[56vh]" />
      <div className="space-y-5 text-base leading-relaxed text-[#0b1d4d]/90 sm:text-lg">
        <h2 className="text-3xl font-black uppercase tracking-wide sm:text-4xl">O INF</h2>
        <p>
          Alicerçados na ética, buscamos realizar todas as nossas atividades com integridade e
          responsabilidade. O profissionalismo é o nosso padrão, assegurando que cada ação seja
          conduzida com competência e comprometimento.
        </p>
        <p>
          Respeitamos e celebramos a diversidade, reconhecendo o valor das diferentes perspectivas
          e experiências. Valorizamos a dedicação individual e a colaboração entre pessoas para
          atingir os resultados esperados.
        </p>
      </div>
    </section>
  );
}

export function CursoSection() {
  return (
    <section
      id="nosso-curso"
      className="scroll-mt-24 mx-auto grid min-h-[85svh] w-full max-w-[1500px] gap-7 px-4 py-14 sm:px-6 md:grid-cols-2 md:items-center md:px-8 lg:px-12"
    >
      <div className="space-y-5 text-base leading-relaxed text-[#0b1d4d]/90 sm:text-lg">
        <h2 className="text-3xl font-black uppercase tracking-wide sm:text-4xl">NOSSO CURSO</h2>
        <p>
          O curso de Bacharelado em Ciências da Computação (BCC) do Instituto de Informática (INF)
          tem por objetivo formar profissionais para acelerar o desenvolvimento do Brasil, com base
          no avanço científico e tecnológico por meio da Computação.
        </p>
        <p>
          A proposta é formar profissionais com sólidos conhecimentos, visão crítica e espírito
          empreendedor para resolver problemas complexos e gerar impacto real.
        </p>
      </div>
      <ImagePlaceholder className="order-first h-[38vh] min-h-64 w-full md:order-last md:h-[56vh]" />
    </section>
  );
}

export function AreasSection() {
  return <AreasCorrelatasCube />;
}

export function EntidadesSection() {
  return (
    <section
      id="entidades"
      className="scroll-mt-24 mx-auto min-h-[85svh] w-full max-w-[1500px] px-4 py-14 sm:px-6 md:px-8 lg:px-12"
    >
      <h2 className="mb-6 text-3xl font-black uppercase tracking-wide sm:mb-8 sm:text-4xl">
        ENTIDADES
      </h2>
      <EntidadesCarousel />
    </section>
  );
}

export function GaleriaSection() {
  return (
    <section
      id="galeria"
      className="scroll-mt-24 mx-auto min-h-[75svh] w-full max-w-[1500px] px-4 py-14 sm:px-6 md:px-8 lg:px-12"
    >
      <h2 className="mb-6 text-3xl font-black uppercase tracking-wide sm:mb-8 sm:text-4xl">
        GALERIA
      </h2>
      <p className="mb-8 max-w-5xl text-base leading-relaxed text-[#0b1d4d]/90 sm:mb-10 sm:text-lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nibh magna, sollicitudin
        vitae consectetur et, interdum et magna. Curabitur vehicula consequat nulla vel bibendum.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ImagePlaceholder key={index} className="h-32 w-full sm:h-40 md:h-48" />
        ))}
      </div>
    </section>
  );
}
