import type { Metadata } from "next";
import { ArcadePageClient } from "@/features/arcade";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Arcade Universitário",
  description:
    "Experiência interativa e educacional do Espaço das Profissões para estudantes explorarem conceitos de desenvolvimento de jogos, ranking, feedback e pensamento computacional.",
  path: "/arcade",
});

export default function ArcadePage() {
  return <ArcadePageClient />;
}
