import type { LucideIcon } from "lucide-react";

export type ArcadeMetric = {
  value: string;
  label: string;
};

export type ArcadeLearningCard = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export type ArcadeControlTip = {
  icon: LucideIcon;
  label: string;
  value: string;
};
