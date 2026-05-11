import type { Metadata } from "next";
import { Footer } from "./components/home/Footer";
import { Header } from "./components/home/Header";
import { HeroSection } from "./components/home/HeroSection";
import { SnakeSection } from "./components/home/GameBtnSection";
import { buildPageMetadata } from "@/lib/seo";

import {
  AreasSection,
  CursoSection,
  EntidadesSection,
  FAQSection,
  GaleriaSection,
  InfSection,
} from "./components/home/ContentSections";

export const metadata: Metadata = buildPageMetadata({
  title: "Início",
  description:
    "Conheça cursos, áreas correlatas, entidades estudantis e atividades do Instituto de Informática.",
  path: "/",
});

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white text-[#0b1d4d]">
      <Header />

        <HeroSection />
      <main className="pb-16 pt-20">
        <InfSection />
        <CursoSection />
        <AreasSection />
        <EntidadesSection />
        <SnakeSection />
        <GaleriaSection />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
