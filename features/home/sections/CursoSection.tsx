import { AnimatedNeonImage } from "@/features/home/shared/AnimatedNeonImage";

export function CursoSection() {
  return (
    <section
      id="nosso-curso"
      className="scroll-mt-24 mx-auto grid w-full max-w-[1500px] gap-10 bg-[#dce8ff]/50 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:px-8 md:py-20 lg:px-12 lg:gap-20"
    >
      <div className="space-y-5 text-base leading-relaxed text-[#0b1d4d]/90 sm:text-lg">
        <p className="section-label">Bacharelado — Ciências da Computação</p>
        <h2 className="text-3xl font-black uppercase tracking-wide sm:text-4xl">
          NOSSO <span className="text-[#005b9f]">CURSO</span>
        </h2>
        <p>
          O curso de Bacharelado em Ciências da Computação (BCC) do Instituto de
          Informática (INF) tem por objetivo formar profissionais para acelerar
          o desenvolvimento do Brasil, com base no avanço científico e
          tecnológico por meio da Computação.
        </p>
        <p>
          A proposta é formar profissionais com sólidos conhecimentos, visão
          crítica e espírito empreendedor para resolver problemas complexos e
          gerar impacto real.
        </p>
      </div>
      <div className="order-first p-4 md:order-last">
        <AnimatedNeonImage src="/photo3.jpg" alt="NOSSO CURSO" />
      </div>
    </section>
  );
}
