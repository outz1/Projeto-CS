import { Footer } from "./components/home/Footer";
import { Header } from "./components/home/Header";
import { HeroSection } from "./components/home/HeroSection";
import {
  AreasSection,
  CursoSection,
  EntidadesSection,
  GaleriaSection,
  InfSection,
} from "./components/home/ContentSections";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-linear-to-b from-[#dfe9ff] via-[#d0e1ff] to-[#c2d8ff] text-[#0b1d4d]">
      <Header />

      <main className="pb-16 pt-20">
        <HeroSection />
        <InfSection />
        <CursoSection />
        <AreasSection />
        <EntidadesSection />
        <GaleriaSection />
      </main>

      <Footer />
    </div>
  );
}
