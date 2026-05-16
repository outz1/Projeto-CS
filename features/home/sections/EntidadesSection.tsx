import { EntidadesCarouselClient } from "@/app/components/home/EntidadesCarouselClient";

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
