import type { Metadata } from "next";
import { BackToTop } from "./components/home/BackToTop";
import { Footer } from "./components/home/Footer";
import { Header } from "./components/home/Header";
import { HeroSection } from "./components/home/HeroSection";
import { HardSnakeSection, NeutralGameCard, SnakeSection } from "./components/home/GameBtnSection";
import { CareerMindMapSection } from "./components/home/CareerMindMapSection";
import { buildPageMetadata } from "@/lib/seo";

import {
  AreasSection,
  CursoSection,
  EntidadesSection,
  FAQSection,
  GaleriaSection,
  InfSection,
} from "@/features/home/sections";

export const metadata: Metadata = buildPageMetadata({
  title: "Espaço das Profissões - Computação e Sociedade",
  description:
    "Conheça cursos, áreas correlatas, entidades estudantis e atividades do Instituto de Informática, projeto da matéria de Computação e Sociedade da UFG",
  path: "/",
});

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-[#0b1d4d]">
      <Header readerTargetId="page-content" />

      <div id="page-content">
        <HeroSection />
        <main className="pt-20">
          <InfSection />
          <CursoSection />
          <AreasSection />
          <EntidadesSection />
          <CareerMindMapSection />
          <SnakeSection />
          <HardSnakeSection />
          <NeutralGameCard />
          <GaleriaSection />
          <FAQSection />
        </main>
      </div>

      <Footer />
      <BackToTop />
    </div>
  );
}
