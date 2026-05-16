import { GaleriaClient } from "@/app/components/home/GaleriaClient";

export function GaleriaSection() {
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
      <GaleriaClient />
    </section>
  );
}
