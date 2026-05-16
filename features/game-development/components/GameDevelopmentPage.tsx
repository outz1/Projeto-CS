import { Footer } from "@/components/layout/Footer";
import { CareerSection } from "./CareerSection";
import { CreativeProductionSection } from "./CreativeProductionSection";
import { EnginesSection } from "./EnginesSection";
import { FoundationsSection } from "./FoundationsSection";
import { GameDevelopmentHeader } from "./GameDevelopmentHeader";
import { GameDevelopmentHero } from "./GameDevelopmentHero";
import { GddSection } from "./GddSection";
import { LanguagesSection } from "./LanguagesSection";
import { NextStepSection } from "./NextStepSection";
import { ProductionFlowSection } from "./ProductionFlowSection";
import { PrototypeSection } from "./PrototypeSection";
import { ReferencesSection } from "./ReferencesSection";

export function GameDevelopmentPage() {
  return (
    <div className="min-h-screen bg-[#f4f8ff] text-[#0b1d4d]">
      <GameDevelopmentHeader />

      <main id="page-content">
        <GameDevelopmentHero />
        <FoundationsSection />
        <LanguagesSection />
        <EnginesSection />
        <ProductionFlowSection />
        <GddSection />
        <CreativeProductionSection />
        <PrototypeSection />
        <CareerSection />
        <NextStepSection />
        <ReferencesSection />
      </main>

      <Footer />
    </div>
  );
}
