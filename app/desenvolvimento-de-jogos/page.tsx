import type { Metadata } from "next";
import { GameDevelopmentPage } from "@/features/game-development";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Desenvolvimento de Jogos Digitais",
  description:
    "Página autoral e educativa sobre desenvolvimento de jogos digitais: programação, engines, documentação, arte, animação, áudio e prototipagem para estudantes universitários.",
  path: "/desenvolvimento-de-jogos",
});

export default function DesenvolvimentoDeJogosRoute() {
  return <GameDevelopmentPage />;
}
