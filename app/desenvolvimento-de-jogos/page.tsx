import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Binary,
  BookOpenCheck,
  Boxes,
  BrainCircuit,
  Brush,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Code2,
  FileText,
  Gamepad2,
  GraduationCap,
  Headphones,
  Layers3,
  MonitorPlay,
  MousePointerClick,
  Palette,
  PlayCircle,
  Rocket,
  ShieldCheck,
  Sparkles,
  Timer,
  Trophy,
  Users,
  Wrench,
} from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { Footer } from "../components/home/Footer";

export const metadata: Metadata = buildPageMetadata({
  title: "Desenvolvimento de Jogos Digitais",
  description:
    "Página autoral e educativa sobre desenvolvimento de jogos digitais: programação, engines, documentação, arte, animação, áudio e prototipagem para estudantes universitários.",
  path: "/desenvolvimento-de-jogos",
});

const quickStats = [
  { value: "8", label: "áreas essenciais" },
  { value: "2D/3D", label: "estilos de produção" },
  { value: "GDD", label: "documento central" },
  { value: "Loop", label: "coração do jogo" },
];

const learningGoals = [
  "Entender como jogos conectam lógica, arte, som, narrativa e engenharia.",
  "Reconhecer as principais etapas de produção de um jogo digital.",
  "Comparar linguagens, bibliotecas e engines de acordo com o objetivo do projeto.",
  "Visualizar como um protótipo simples evolui para um produto testável.",
];

const foundations = [
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

const languageCards = [
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

const engineCards = [
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

const productionFlow = [
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

const creativeAreas = [
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

const gddSections = [
  "Visão geral do jogo e público-alvo",
  "Regras, objetivos e condições de vitória ou derrota",
  "Mecânicas principais e sistemas de progressão",
  "Personagens, narrativa, mundo e direção de arte",
  "Requisitos técnicos, plataformas e limitações",
  "Cronograma, marcos, testes e critérios de qualidade",
];

const prototypeSteps = [
  "Abrir uma janela e configurar FPS",
  "Ler entradas do teclado ou controle",
  "Atualizar posição, tempo, vida e pontuação",
  "Detectar colisões e regras de derrota",
  "Desenhar formas, textos, sprites e feedback visual",
  "Repetir o ciclo até o jogador encerrar a sessão",
];

const pseudoLoop = [
  "iniciar_recursos()",
  "enquanto jogo_ativo:",
  "  entrada = ler_controles()",
  "  estado = atualizar_mundo(entrada)",
  "  verificar_colisoes(estado)",
  "  desenhar_frame(estado)",
  "encerrar_recursos()",
];

const careerRoles = [
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

const references = [
  { label: "Artigo original consultado", href: "https://rfunctions.blogspot.com/p/uma-breve-introducao-ao-desenvolvimento.html" },
  { label: "Pygame Documentation", href: "https://www.pygame.org/docs/" },
  { label: "Real Python · Pygame Primer", href: "https://realpython.com/pygame-a-primer/" },
  { label: "Unity Learn", href: "https://learn.unity.com/" },
  { label: "Unreal Engine · C++", href: "https://dev.epicgames.com/documentation/unreal-engine/programming-with-cplusplus-in-unreal-engine" },
  { label: "Raylib", href: "https://www.raylib.com/" },
  { label: "Raylib Cheatsheet", href: "https://www.raylib.com/cheatsheet/cheatsheet.html" },
  { label: "Game Engine Comparison", href: "https://game-ace.com/blog/game-engine-comparison/" },
];

export default function DesenvolvimentoDeJogosPage() {
  return (
    <div className="min-h-screen bg-[#f4f8ff] text-[#0b1d4d]">
      <header className="sticky top-0 z-40 border-b border-[#d8e6ff] bg-[#071333]/95 text-white shadow-lg shadow-[#071333]/10 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-200 transition-colors hover:text-white">
            <ChevronRight className="rotate-180" size={18} />
            Voltar ao Espaço das Profissões
          </Link>
          <Link
            href="/arcade"
            className="hidden rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-100 transition hover:bg-white/15 sm:inline-flex"
          >
            Experimentar Arcade
          </Link>
        </div>
      </header>

      <main id="page-content">
        <section className="relative isolate overflow-hidden bg-[#071333] text-white">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_20%,rgba(96,165,250,0.35),transparent_34%),radial-gradient(circle_at_85%_15%,rgba(14,165,233,0.22),transparent_34%),linear-gradient(135deg,#071333_0%,#0b1d4d_52%,#123c7c_100%)]" />
          <div className="absolute inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:48px_48px]" />

          <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-8 lg:py-20">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/20 bg-blue-200/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-blue-100">
                <GraduationCap size={16} />
                Trilha universitária de gamedev
              </div>

              <div className="space-y-5">
                <h1 className="max-w-5xl text-4xl font-black leading-[1.04] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                  Desenvolvimento de Jogos Digitais
                  <span className="block bg-gradient-to-r from-blue-200 via-cyan-100 to-white bg-clip-text text-transparent">
                    da ideia ao protótipo jogável.
                  </span>
                </h1>
                <p className="max-w-3xl text-base leading-relaxed text-blue-50/78 sm:text-lg">
                  Uma página autoral para estudantes entenderem como jogos nascem: programação, engines, documentação, arte, animação, áudio, testes e colaboração. O objetivo é mostrar que criar games é uma prática completa de Computação, design e produção audiovisual.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#trilha"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-400 active:scale-95"
                >
                  <BookOpenCheck size={18} />
                  Começar trilha
                </a>
                <a
                  href="#mao-na-massa"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-sm font-bold uppercase tracking-widest text-blue-50 transition hover:bg-white/15 active:scale-95"
                >
                  <PlayCircle size={18} />
                  Ver protótipo
                </a>
              </div>

              <div className="grid gap-3 sm:grid-cols-4">
                {quickStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                    <p className="text-2xl font-black text-white">{stat.value}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-blue-100/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-8">
              <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-blue-200/70">Mapa da jornada</p>
                  <h2 className="mt-2 text-2xl font-black text-white">O que você vai aprender</h2>
                </div>
                <div className="rounded-2xl border border-cyan-200/20 bg-cyan-200/10 p-4 text-cyan-100">
                  <Gamepad2 size={30} />
                </div>
              </div>

              <ul className="space-y-3">
                {learningGoals.map((goal) => (
                  <li key={goal} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm leading-relaxed text-blue-50/78">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={18} />
                    {goal}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section id="trilha" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#d8e6ff] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#005b9f]">
              <Sparkles size={15} />
              Fundamentos
            </span>
            <h2 className="text-3xl font-black tracking-[-0.03em] text-[#071333] sm:text-5xl">Jogo digital é um sistema interativo.</h2>
            <p className="text-base leading-relaxed text-[#0b1d4d]/70">
              O game parece diversão na superfície, mas por baixo dele existem decisões de arquitetura: como representar estado, como processar entrada, como atualizar regras e como entregar feedback visual e sonoro em tempo real.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {foundations.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-3xl border border-[#c7d9ff] bg-white p-6 shadow-lg shadow-[#0b1d4d]/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0b1d4d]/10">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f0fe] text-[#005b9f]">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-black text-[#071333]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#0b1d4d]/68">{item.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#071333] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white">
                <Code2 size={15} />
                Linguagens
              </span>
              <h2 className="text-3xl font-black tracking-[-0.03em] text-[#071333] sm:text-5xl">A linguagem depende do objetivo.</h2>
              <p className="text-base leading-relaxed text-[#0b1d4d]/70">
                Não existe uma linguagem única para todos os jogos. Projetos educacionais podem começar com ferramentas mais simples; jogos comerciais, multiplataforma ou de alto desempenho exigem decisões técnicas mais rigorosas.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {languageCards.map((language) => (
                <article key={language.name} className="rounded-3xl border border-[#d8e6ff] bg-[#f8fbff] p-6">
                  <p className="text-3xl font-black text-[#005b9f]">{language.name}</p>
                  <h3 className="mt-2 text-sm font-black uppercase tracking-widest text-[#071333]">{language.role}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#0b1d4d]/68">{language.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div className="max-w-3xl space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#d8e6ff] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#005b9f]">
                <Wrench size={15} />
                Engines e ferramentas
              </span>
              <h2 className="text-3xl font-black tracking-[-0.03em] text-[#071333] sm:text-5xl">A engine acelera o caminho entre ideia e experiência.</h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-[#0b1d4d]/68">
              Engines oferecem editor, física, renderização, animação, áudio, build para plataformas e recursos prontos. Bibliotecas como Raylib ficam mais próximas do código e ajudam a entender a base técnica.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {engineCards.map((engine) => (
              <article key={engine.name} className="flex min-h-64 flex-col rounded-3xl border border-[#c7d9ff] bg-white p-6 shadow-md shadow-[#0b1d4d]/5">
                <div className="mb-5 h-2 w-16 rounded-full bg-gradient-to-r from-[#005b9f] to-[#60a5fa]" />
                <h3 className="text-xl font-black text-[#071333]">{engine.name}</h3>
                <p className="mt-2 text-xs font-black uppercase tracking-widest text-[#005b9f]">{engine.tag}</p>
                <p className="mt-4 text-sm leading-relaxed text-[#0b1d4d]/68">{engine.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#071333] py-16 text-white">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-100">
                <ClipboardList size={15} />
                Processo profissional
              </span>
              <h2 className="text-3xl font-black tracking-[-0.03em] sm:text-5xl">Criar um jogo também é gerenciar projeto.</h2>
              <p className="text-base leading-relaxed text-blue-50/72">
                Uma boa produção não começa pelo código final. Ela passa por intenção, escopo, documentação, prototipagem, testes, revisão e entrega.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {productionFlow.map((step) => (
                <article key={step.phase} className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur-md">
                  <p className="text-sm font-black text-cyan-200">{step.phase}</p>
                  <h3 className="mt-4 text-xl font-black">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-blue-50/68">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="rounded-[2rem] border border-[#c7d9ff] bg-white p-6 shadow-lg shadow-[#0b1d4d]/5 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-2xl bg-[#e8f0fe] p-3 text-[#005b9f]">
                <FileText size={24} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#005b9f]">GDD</p>
                <h2 className="text-2xl font-black text-[#071333]">Documento de Design de Jogo</h2>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[#0b1d4d]/70">
              O Game Design Document é o mapa do projeto. Ele reduz ambiguidade, alinha a equipe e transforma uma ideia solta em um plano que pode ser testado, estimado e melhorado.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {gddSections.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-[#d8e6ff] bg-white p-4 text-sm font-semibold text-[#0b1d4d]/72">
                <CheckCircle2 className="shrink-0 text-[#005b9f]" size={18} />
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#071333] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white">
                <Brush size={15} />
                Produção visual e sonora
              </span>
              <h2 className="text-3xl font-black tracking-[-0.03em] text-[#071333] sm:text-5xl">Arte, animação e áudio dão identidade ao sistema.</h2>
              <p className="text-base leading-relaxed text-[#0b1d4d]/70">
                A programação estabelece as regras, mas a experiência ganha memória quando imagem, movimento e som comunicam intenção, emoção e feedback.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {creativeAreas.map((area) => {
                const Icon = area.icon;
                return (
                  <article key={area.title} className="rounded-3xl border border-[#d8e6ff] bg-[#f8fbff] p-6">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#005b9f] shadow-sm">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-black text-[#071333]">{area.title}</h3>
                    <ul className="mt-4 space-y-2">
                      {area.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-[#0b1d4d]/68">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#005b9f]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="mao-na-massa" className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#d8e6ff] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#005b9f]">
              <Rocket size={15} />
              Mão na massa
            </span>
            <h2 className="text-3xl font-black tracking-[-0.03em] text-[#071333] sm:text-5xl">Como pensar um primeiro protótipo.</h2>
            <p className="text-base leading-relaxed text-[#0b1d4d]/70">
              Um jogo simples já permite discutir quase tudo que importa: janela, FPS, input, movimento, tempo, colisões, estado de pausa, derrota e feedback para o jogador. O ponto não é começar grande; é começar observável.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {prototypeSteps.map((step) => (
                <div key={step} className="flex gap-3 rounded-2xl border border-[#c7d9ff] bg-white p-4 text-sm font-semibold text-[#0b1d4d]/72 shadow-sm shadow-[#0b1d4d]/5">
                  <ArrowRight className="shrink-0 text-[#005b9f]" size={18} />
                  {step}
                </div>
              ))}
            </div>
          </div>

          <aside className="overflow-hidden rounded-[2rem] border border-[#071333]/10 bg-[#071333] text-white shadow-2xl shadow-[#071333]/20">
            <div className="border-b border-white/10 px-6 py-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-blue-100">
                  <Timer size={16} />
                  roteiro mental do loop
                </div>
                <span className="rounded-full bg-emerald-300/15 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-200">didático</span>
              </div>
            </div>
            <pre className="overflow-x-auto p-6 text-sm leading-7 text-blue-50/85">
              <code>
                {pseudoLoop.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </code>
            </pre>
            <div className="border-t border-white/10 bg-white/[0.04] px-6 py-5 text-sm leading-relaxed text-blue-50/70">
              Este trecho é uma abstração autoral. Ele mostra a lógica central sem reproduzir código externo, servindo como ponte entre teoria e implementação real.
            </div>
          </aside>
        </section>

        <section className="bg-[#e8f0fe] py-16">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#005b9f]">
                <Users size={15} />
                Mercado e papéis
              </span>
              <h2 className="text-3xl font-black tracking-[-0.03em] text-[#071333] sm:text-5xl">Gamedev é trabalho em equipe.</h2>
              <p className="text-base leading-relaxed text-[#0b1d4d]/70">
                Mesmo jogos pequenos podem envolver muitas especialidades. Em projetos maiores, as funções se dividem para acelerar produção, melhorar qualidade e manter coerência entre tecnologia e experiência.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {careerRoles.map((role) => (
                <div key={role} className="rounded-2xl border border-[#c7d9ff] bg-white px-5 py-4 text-sm font-black text-[#071333] shadow-sm shadow-[#0b1d4d]/5">
                  {role}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-[#c7d9ff] bg-white p-6 shadow-xl shadow-[#0b1d4d]/6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#d8e6ff] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#005b9f]">
                  <Trophy size={15} />
                  Próximo passo
                </span>
                <h2 className="text-3xl font-black tracking-[-0.03em] text-[#071333] sm:text-5xl">Da leitura para a experimentação.</h2>
                <p className="text-base leading-relaxed text-[#0b1d4d]/70">
                  Depois de entender os fundamentos, a melhor forma de aprender é jogar criticamente: observe regras, feedback, dificuldade, interfaces e escolhas de design. Depois, tente transformar uma ideia pequena em protótipo.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Link
                  href="/arcade"
                  className="group rounded-3xl bg-[#071333] p-6 text-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#071333]/20"
                >
                  <Gamepad2 className="mb-5 text-blue-200" size={30} />
                  <h3 className="text-xl font-black">Entrar no Arcade</h3>
                  <p className="mt-2 text-sm leading-relaxed text-blue-50/68">Experimente uma atividade gamificada do projeto e observe os conceitos em ação.</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-200">
                    Acessar <ArrowRight className="transition group-hover:translate-x-1" size={16} />
                  </span>
                </Link>

                <Link
                  href="/"
                  className="group rounded-3xl border border-[#c7d9ff] bg-[#f8fbff] p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0b1d4d]/10"
                >
                  <BrainCircuit className="mb-5 text-[#005b9f]" size={30} />
                  <h3 className="text-xl font-black text-[#071333]">Voltar ao portal</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#0b1d4d]/68">Continue explorando cursos, áreas, entidades e possibilidades em Computação.</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#005b9f]">
                    Voltar <ArrowRight className="transition group-hover:translate-x-1" size={16} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#d8e6ff] bg-white py-12">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-2xl bg-[#e8f0fe] p-3 text-[#005b9f]">
                <BookOpenCheck size={22} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#005b9f]">Curadoria</p>
                <h2 className="text-2xl font-black text-[#071333]">Referências para aprofundar</h2>
              </div>
            </div>

            <p className="mb-6 max-w-4xl text-sm leading-relaxed text-[#0b1d4d]/68">
              Esta página foi escrita de forma autoral a partir de pesquisa e curadoria sobre desenvolvimento de jogos digitais. As referências abaixo ajudam estudantes a explorar ferramentas, documentação e materiais complementares.
            </p>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {references.map((reference) => (
                <a
                  key={reference.href}
                  href={reference.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-[#d8e6ff] bg-[#f8fbff] px-4 py-4 text-sm font-bold text-[#071333] transition hover:border-[#005b9f]/35 hover:bg-[#e8f0fe]"
                >
                  <span>{reference.label}</span>
                  <ArrowRight className="shrink-0 text-[#005b9f] transition group-hover:translate-x-1" size={16} />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
