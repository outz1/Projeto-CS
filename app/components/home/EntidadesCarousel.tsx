"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EntityCard, type EntityItem } from "./EntityCards";

const entities: EntityItem[] = [
  {
    name: "DrACo",
    logo: "/draco.png",
    description:
      "O DrACo (Diretório Acadêmico da Computação) é o órgão de representação máxima legal dos discentes de graduação no INF. Ele é o principal instrumento político e de ação dos próprios estudantes para lutar pelos interesses estudantis, promover eventos acadêmicos de integração, conhecimento e politização. Na prática, o DrACo atua para melhorar a jornada acadêmica, seja buscando oferta de turmas requisitadas, negociando com coordenações e direção do INF ou movimentando discussões sobre a qualidade do ensino e da infraestrutura no instituto.",
  },
  {
    name: "Unificada",
    logo: "/entidades/unificada.png",
    description:
    "A Atlética Unificada é a Associação Atlética Acadêmica da Computação. É responsável por promover a prática esportiva, organizar equipes, participar de campeonatos universitários e realizar eventos de integração.",
  },
  {
    name: "ADAS",
    logo: "/entidades/ada.jpg",
    description:
      "O projeto Adas visa incentivar as meninas a ingressarem e permanecerem nos cursos oferecidos pelo Instituto de Informática. A luta do projeto é contra qualquer diferenciação de oportunidades de trabalho e de reconhecimento com relação ao gênero, e tem como finalidade valorizar as mulheres que fizeram e fazem história na computação, contribuindo para a disseminação da ideia de que computação também é para mulheres. Esse projeto também tem como objetivo mostrar que o gênero não determina a capacidade cognitiva da pessoa e que as mulheres são capazes de grandes feitos, seja em computação ou em qualquer outra área.",
  },
  {
    name: "Pequi Mecânico",
    logo: "/entidades/pequi3.jpg",
    description:
      "Em 2010, quatro alunos da Universidade Federal de Goiás (UFG) participaram do Torneio de Robótica Universitária (TRU), realizado na Universidade Federal de Uberlândia (UFU). Inspirados pela experiência, decidiram criar um núcleo de robótica com o objetivo de reunir mais pessoas com interesses semelhantes e ampliar a participação em competições. Assim, nasceu o Pequi Mecânico! Nesse jornada conquistamos muitos títulos dentre as categorias das competições brasileiras de robótica e ainda continuamos nossa caminhada hoje conseguindo participar do Mundial de Robótica em Três categorias diferentes.",
  },
  {
    name: "GDG",
    logo: "/entidades/gdg.png",
    description:
      "As Comunidades Google em Goiânia são formadas pelo GDG Goiânia (Google Developer Groups) e pelo WTM Goiânia (Women Techmakers) — programas globais do Google conduzidos de forma totalmente voluntária por organizadores e embaixadoras locais. O GDG Goiânia reúne pessoas desenvolvedoras e entusiastas de tecnologia para promover aprendizado e networking por meio de eventos como o DevFest Cerrado, o International Women's Day Cerrado e o Build With AI. Já o WTM tem foco na inclusão e no fortalecimento de mulheres na tecnologia. Juntas, as comunidades reúnem mais de 1.500 participantes e oferecem anualmente mais de 60 atividades nas áreas de 60 atividades nas áreas de Desenvolvimento Web/Mobile, IA Generativa, Cloud, UX/UI e Desenvolvimento de Carreira — abertas a estudantes, profissionais e pesquisadores.",
  },
  {
    name: "WMDG",
    logo: "/entidades/wmdg.jpeg",
    description:
      "A We Make Digital Games (WMDG) é um projeto de extensão do INF-UFG que evoluiu de uma disciplina para uma forte comunidade de desenvolvedores. Nosso foco é dar vitrine aos projetos e conectar os alunos ao mercado e a pesquisadores da pós-graduação. Já contamos com um portfólio de 31 jogos e, para expandir, planejamos organizar uma Game Jam na UFG e lançar o WMDG Awards para premiar os talentos da nossa comunidade.",
  },
  {
    name: "Level 5 Junior",
    logo: "/entidades/level5.png",
    description:
      "A Level 5 é a Empresa Júnior do Instituto de Informática da UFG, fundada em 5 de maio de 2015. Desde sua criação, a EJ atua no desenvolvimento de sites e soluções web, sempre guiada por três pilares: tecnologia, colaboração e aprendizado contínuo.",
  },
  {
    name: "Dex Hub",
    logo: "/entidades/dexhub.jpeg",
    description:
      "Nascida no INF-UFG, a DEX é um hub de inovação focado em construir e acelerar perfis empreendedores. Através de workshops, palestras e imersões, criamos um palco dinâmico para o intercâmbio de ideias, aproximando os estudantes de grandes especialistas do mercado e da academia, além de ajudar e incentivar startups dentro do próprio INF/UFG. Participar da DEX é estar no centro do networking da universidade e desenvolver as soft skills que serão o seu maior diferencial competitivo. Mais do que formar empreendedores, nós formamos protagonistas: profissionais com a autonomia necessária para liderar projetos de impacto, seja criando uma startup, revolucionando a pesquisa ou assumindo a frente em gigantes da tecnologia.",
  },
  {
    name: "Monkeys",
    logo: "/entidades/monke.png",
    description:
      "Nosso grupo é dedicado ao estudo e à prática da programação competitiva, com foco na preparação para competições, como a Olimpíada Brasileira de Informática (OBI) e a Maratona de Programação. Realizamos aulas sobre algoritmos e estruturas de dados avançadas, participamos ativamente de torneios (Maratona do Cerrado, Monkeys Contest e etc.) e promovemos debates constantes sobre a resolução de problemas algorítmicos. Nosso foco é desenvolver a habilidade de solucionar desafios lógicos de forma otimizada usando o computador.",
  },
];

export function EntidadesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < entities.length - 1;

  const goPrev = () => setActiveIndex((prev) => Math.max(0, prev - 1));
  const goNext = () => setActiveIndex((prev) => Math.min(entities.length - 1, prev + 1));

  return (
    <div className="carousel-safe mx-auto w-full max-w-[920px]">
      <div className="w-full overflow-hidden rounded-xl py-2">
        <div
          className="flex items-start transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {entities.map((entity) => (
            <div key={entity.name} className="w-full flex-[0_0_100%] px-1">
              <EntityCard entity={entity} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={goPrev}
          disabled={!canGoPrev}
          aria-label="Entidade anterior"
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#0b1d4d]/25 text-[#0b1d4d] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2">
          {entities.map((entity, index) => (
            <button
              key={entity.name}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Ir para ${entity.name}`}
              aria-current={activeIndex === index}
              className={`h-2.5 rounded-full transition-all ${
                activeIndex === index ? "w-7 bg-[#0b1d4d]" : "w-2.5 bg-[#0b1d4d]/30"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          disabled={!canGoNext}
          aria-label="Proxima entidade"
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#0b1d4d]/25 text-[#0b1d4d] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
