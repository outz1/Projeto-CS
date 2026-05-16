import { BrainCircuit, Keyboard, MousePointer2, ShieldCheck, Users, Zap } from "lucide-react";
import type { ArcadeControlTip, ArcadeLearningCard, ArcadeMetric } from "./types";

export const arcadeMetrics: ArcadeMetric[] = [
  { value: "2D", label: "gameplay responsivo" },
  { value: "Live", label: "ranking competitivo" },
  { value: "XP", label: "progressão por ondas" },
  { value: "Lab", label: "aprendizado prático" },
];

export const arcadeLearningCards: ArcadeLearningCard[] = [
  {
    icon: BrainCircuit,
    title: "Pensamento computacional",
    text: "O estudante observa loop, estado, colisão, pontuação e feedback como um sistema interativo real.",
  },
  {
    icon: ShieldCheck,
    title: "Qualidade e segurança",
    text: "A experiência usa sessão segura, normalização de nome e proteção básica para submissão de score.",
  },
  {
    icon: Users,
    title: "Aprendizagem social",
    text: "O ranking transforma a partida em conversa sobre estratégia, melhoria contínua e tomada de decisão.",
  },
];

export const arcadeControlTips: ArcadeControlTip[] = [
  { icon: Keyboard, label: "Movimento", value: "WASD / setas" },
  { icon: MousePointer2, label: "Mira", value: "mouse ou toque" },
  { icon: Zap, label: "Ritmo", value: "ondas e upgrades" },
];
