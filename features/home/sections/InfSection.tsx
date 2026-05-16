import { AnimatedNeonImage } from "@/features/home/shared/AnimatedNeonImage";

export function InfSection() {
  return (
    <section
      id="o-inf"
      className="scroll-mt-24 mx-auto grid w-full max-w-[1500px] gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:px-8 md:py-20 lg:px-12 lg:gap-20"
    >
      <div className="p-4">
        <AnimatedNeonImage src="/photo2.jpg" alt="O INF" />
      </div>
      <div className="space-y-5 text-base leading-relaxed text-[#0b1d4d]/90 sm:text-lg">
        <p className="section-label">Instituto de Informática — UFG</p>
        <h2 className="text-3xl font-black uppercase tracking-wide sm:text-4xl">
          O <span className="text-[#005b9f]">INF</span>
        </h2>
        <p>
          Alicerçados na ética, buscamos realizar todas as nossas atividades com
          integridade e responsabilidade. O profissionalismo é o nosso padrão,
          assegurando que cada ação seja conduzida com competência e
          comprometimento.
        </p>
        <p>
          Respeitamos e celebramos a diversidade, reconhecendo o valor das
          diferentes perspectivas e experiências. Valorizamos a dedicação
          individual e a colaboração entre pessoas para atingir os resultados
          esperados.
        </p>
      </div>
    </section>
  );
}
