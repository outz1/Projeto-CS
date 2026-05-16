import { FAQ } from "../components";

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
