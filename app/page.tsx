import type { Metadata } from "next";
import { HomePage } from "@/features/home";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Espaço das Profissões - Computação e Sociedade",
  description:
    "Conheça cursos, áreas correlatas, entidades estudantis e atividades do Instituto de Informática, projeto da matéria de Computação e Sociedade da UFG",
  path: "/",
});

export default function Home() {
  return <HomePage />;
}
