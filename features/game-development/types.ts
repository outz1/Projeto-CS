import type { LucideIcon } from "lucide-react";

export type QuickStat = {
  value: string;
  label: string;
};

export type IconTextCard = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export type LanguageCard = {
  name: string;
  role: string;
  description: string;
};

export type EngineCard = {
  name: string;
  tag: string;
  text: string;
};

export type ProductionStep = {
  phase: string;
  title: string;
  text: string;
};

export type CreativeArea = {
  icon: LucideIcon;
  title: string;
  items: string[];
};

export type ExternalReference = {
  label: string;
  href: string;
};
