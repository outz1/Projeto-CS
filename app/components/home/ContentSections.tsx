import { AreasCorrelatasCube } from "./AreasCorrelatasCube";
import Image from "next/image";
import { EntidadesCarouselClient } from "./EntidadesCarouselClient";
import FAQ from "./FAQ";

// Componente isolado para o efeito de borda Neon Animada
function AnimatedNeonImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl p-[3px] shadow-2xl shadow-[#005b9f]/10 transition-all duration-700 hover:-translate-y-2 hover:shadow-[#005b9f]/30">
      {/* Luz neon giratória primária (linha visível) */}
      <div className="absolute left-1/2 top-1/2 aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_75%,#005b9f_100%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Luz neon secundária com blur (para o efeito de "brilho" / glow externo) */}
      <div className="absolute left-1/2 top-1/2 aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_75%,#005b9f_100%)] blur-xl opacity-40 transition-opacity duration-500 group-hover:opacity-80" />

      {/* Container da imagem que cobre o meio e deixa a "borda" vazar */}
      <div className="relative h-full w-full overflow-hidden rounded-[21px] bg-white">
        <Image
          src={src}
          width={1200}
          height={800}
          alt={alt}
          className="h-[38vh] min-h-64 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 md:h-[56vh]"
          quality={95}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    </div>
  );
}

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

export function AreasSection() {
  return <AreasCorrelatasCube />;
}

export function EntidadesSection() {
  return (
    <section
      id="entidades"
      className="scroll-mt-24 mx-auto w-full max-w-[1500px] px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-12"
    >
      <p className="section-label">Comunidade Acadêmica</p>
      <h2 className="mb-8 text-3xl font-black uppercase tracking-wide sm:text-4xl">
        ENTIDADES
      </h2>
      <EntidadesCarouselClient />
    </section>
  );
}

export function GaleriaSection() {
  const galleryImages = ["p1.jpg", "p2.jpg", "p3.jpg", "p4.jpg", "p5.jpg", "p6.jpg", "p7.jpg", "p8.jpg"];

  return (
    <section
      id="galeria"
      className="scroll-mt-24 mx-auto w-full max-w-[1500px] px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-12"
    >
      <p className="section-label">Instituto de Informática</p>
      <h2 className="mb-4 text-3xl font-black uppercase tracking-wide sm:text-4xl">
        GALERIA
      </h2>
      <p className="mb-10 max-w-3xl text-base leading-relaxed text-[#0b1d4d]/75 sm:text-lg">
        Veja alguns momentos capturados em nossos eventos, laboratórios e atividades. Cada foto é um fragmento da nossa história, mostrando a energia, a inovação e a paixão que definem o Instituto de Informática. Explore nossa galeria e sinta-se parte dessa jornada incrível!
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
        {galleryImages.map((imageName, index) => (
          <div
            key={imageName}
            className="group relative overflow-hidden rounded-2xl bg-[#0b2a67] shadow-md shadow-[#0b1d4d]/10 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-[#005b9f]/25"
          >
            <Image
              width={800}
              height={600}
              src={`/galery/${imageName}`}
              alt={`Galeria ${index + 1}`}
              className="h-44 w-full object-cover transition-all duration-700 ease-out group-hover:scale-110 sm:h-52 md:h-56 lg:h-60"
              quality={85}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1d4d]/55 via-[#0b1d4d]/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
            <div className="absolute bottom-3 left-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="h-px w-8 bg-white/70" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section
      id="faq"
      className="scroll-mt-24 w-full bg-[#dce8ff]/60"
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-12">
        <p className="section-label">Perguntas Frequentes</p>
        <h2 className="mb-3 text-3xl font-black uppercase tracking-wide sm:text-4xl">
          FAQ
        </h2>
        <p className="mb-10 max-w-2xl text-sm leading-relaxed text-[#0b1d4d]/65 sm:text-base">
          Encontre respostas para as dúvidas mais comuns sobre o curso, ingresso e vida acadêmica no INF.
        </p>
        <FAQ />
      </div>
    </section>
  );
}
