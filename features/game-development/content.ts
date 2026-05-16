import {
  Binary,
  Boxes,
  Headphones,
  Layers3,
  MonitorPlay,
  MousePointerClick,
  Palette,
  ShieldCheck,
} from "lucide-react";
import type { CreativeArea, EngineCard, ExternalReference, IconTextCard, LanguageCard, ProductionStep, QuickStat } from "./types";

export const quickStats: QuickStat[] = [
  { value: "8", label: "áreas essenciais" },
  { value: "2D/3D", label: "estilos de produção" },
  { value: "GDD", label: "documento central" },
  { value: "Loop", label: "coração do jogo" },
];

export const learningGoals = [
  "Entender como jogos conectam lógica, arte, som, narrativa e engenharia.",
  "Reconhecer as principais etapas de produção de um jogo digital.",
  "Comparar linguagens, bibliotecas e engines de acordo com o objetivo do projeto.",
  "Visualizar como um protótipo simples evolui para um produto testável.",
];

export const foundations: IconTextCard[] = [
  {
    icon: Binary,
    title: "Programação",
    text: "Define regras, estados, pontuação, colisões, entrada do jogador e tudo que transforma uma ideia em comportamento interativo.",
  },
  {
    icon: MonitorPlay,
    title: "Game loop",
    text: "É o ciclo que lê comandos, atualiza o mundo, verifica eventos e redesenha a tela várias vezes por segundo.",
  },
  {
    icon: MousePointerClick,
    title: "Interação",
    text: "Teclado, mouse, toque e controle viram sinais que o sistema interpreta para mover personagens e acionar mecânicas.",
  },
  {
    icon: ShieldCheck,
    title: "Qualidade",
    text: "Testes, balanceamento, acessibilidade e estabilidade garantem que a experiência seja divertida, justa e confiável.",
  },
];

export const languageCards: LanguageCard[] = [
  {
    name: "C++",
    role: "performance e controle fino",
    description: "Muito usado em engines e sistemas que exigem alto desempenho, como renderização, física e jogos de grande escala.",
  },
  {
    name: "C#",
    role: "produtividade em engines",
    description: "Popular em ambientes como Unity, combina boa organização de código com uma curva de aprendizado mais amigável.",
  },
  {
    name: "JavaScript",
    role: "web e protótipos navegáveis",
    description: "Ajuda a criar jogos para navegador, experiências educacionais e protótipos rápidos integrados a páginas web.",
  },
  {
    name: "Python",
    role: "aprendizado e experimentação",
    description: "Excelente para estudar lógica, eventos, sprites e protótipos didáticos com bibliotecas como Pygame.",
  },
];

export const engineCards: EngineCard[] = [
  {
    name: "Unity",
    tag: "C# · 2D/3D · multiplataforma",
    text: "Boa escolha para protótipos, jogos mobile, projetos independentes e experiências com grande comunidade de aprendizagem.",
  },
  {
    name: "Unreal Engine",
    tag: "C++ · Blueprints · alto realismo",
    text: "Muito forte em gráficos, simulação, mundos 3D e pipelines profissionais de grande escala.",
  },
  {
    name: "Godot / GameMaker",
    tag: "indie · modular · acessível",
    text: "Alternativas interessantes para equipes menores, protótipos 2D e projetos com foco em simplicidade de produção.",
  },
  {
    name: "Raylib",
    tag: "C/C++ · biblioteca · mão no código",
    text: "Ótima para entender janelas, desenho, input, colisões e loop de jogo sem depender de uma interface visual pesada.",
  },
];

export const productionFlow: ProductionStep[] = [
  {
    phase: "01",
    title: "Pré-produção",
    text: "Define conceito, público, gênero, mecânicas, referências, riscos técnicos, escopo e viabilidade do projeto.",
  },
  {
    phase: "02",
    title: "Documentação",
    text: "Organiza o Game Design Document, fluxos de tela, regras, personagens, arte, áudio, monetização e critérios de sucesso.",
  },
  {
    phase: "03",
    title: "Produção",
    text: "Transforma planejamento em assets, código, fases, interface, animações, efeitos, sistemas e versões jogáveis.",
  },
  {
    phase: "04",
    title: "Testes e publicação",
    text: "Valida bugs, desempenho, balanceamento, acessibilidade, experiência do usuário e entrega para a plataforma escolhida.",
  },
];

export const creativeAreas: CreativeArea[] = [
  {
    icon: Palette,
    title: "Arte 2D",
    items: ["Pixel art", "Flat design", "Sprites", "UI e ícones"],
  },
  {
    icon: Boxes,
    title: "Arte 3D",
    items: ["Modelagem", "Texturização", "Materiais", "Otimização"],
  },
  {
    icon: Layers3,
    title: "Animação",
    items: ["Frame a frame", "Rigging", "Spritesheet", "Movimento expressivo"],
  },
  {
    icon: Headphones,
    title: "Áudio",
    items: ["Trilha", "Efeitos", "Feedback sonoro", "Mixagem"],
  },
];

export const gddSections = [
  "Visão geral do jogo e público-alvo",
  "Regras, objetivos e condições de vitória ou derrota",
  "Mecânicas principais e sistemas de progressão",
  "Personagens, narrativa, mundo e direção de arte",
  "Requisitos técnicos, plataformas e limitações",
  "Cronograma, marcos, testes e critérios de qualidade",
];

export const prototypeSteps = [
  "Abrir uma janela e configurar FPS",
  "Ler entradas do teclado ou controle",
  "Atualizar posição, tempo, vida e pontuação",
  "Detectar colisões e regras de derrota",
  "Desenhar formas, textos, sprites e feedback visual",
  "Repetir o ciclo até o jogador encerrar a sessão",
];

export const pseudoLoop = [
  "iniciar_recursos()",
  "enquanto jogo_ativo:",
  "  entrada = ler_controles()",
  "  estado = atualizar_mundo(entrada)",
  "  verificar_colisoes(estado)",
  "  desenhar_frame(estado)",
  "encerrar_recursos()",
];

export const careerRoles = [
  "Game Designer",
  "Programador(a) de Gameplay",
  "Artista 2D/3D",
  "Animador(a)",
  "Sound Designer",
  "QA Tester",
  "UX/UI Designer",
  "Produtor(a)",
  "Roteirista",
  "Technical Artist",
];

export const references: ExternalReference[] = [
  { label: "Artigo original consultado", href: "https://rfunctions.blogspot.com/p/uma-breve-introducao-ao-desenvolvimento.html" },
  { label: "Pygame Documentation", href: "https://www.pygame.org/docs/" },
  { label: "Real Python · Pygame Primer", href: "https://realpython.com/pygame-a-primer/" },
  { label: "Unity Learn", href: "https://learn.unity.com/" },
  { label: "Unreal Engine · C++", href: "https://dev.epicgames.com/documentation/unreal-engine/programming-with-cplusplus-in-unreal-engine" },
  { label: "Raylib", href: "https://www.raylib.com/" },
  { label: "Raylib Cheatsheet", href: "https://www.raylib.com/cheatsheet/cheatsheet.html" },
  { label: "Game Engine Comparison", href: "https://game-ace.com/blog/game-engine-comparison/" },
];
