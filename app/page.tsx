import { Footer } from "./components/home/Footer";
import { Header } from "./components/home/Header";
import { HeroSection } from "./components/home/HeroSection";
import { SnakeSection } from "./components/home/GameBtnSection";

import {
  AreasSection,
  CursoSection,
  EntidadesSection,
  GaleriaSection,
  InfSection,
} from "./components/home/ContentSections";

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
      </main>

      <Footer />
    </div>
  );
}
