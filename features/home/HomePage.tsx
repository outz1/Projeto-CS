import { Footer } from "@/components/layout/Footer";
import { BackToTop, CareerMindMapSection, HardSnakeSection, Header, HeroSection, NeutralGameCard, SnakeSection } from "./components";
import {
  AreasSection,
  CursoSection,
  EntidadesSection,
  FAQSection,
  GaleriaSection,
  InfSection,
} from "./sections";

export function HomePage() {
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
