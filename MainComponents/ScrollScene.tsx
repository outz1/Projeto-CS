"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FloatingCard, type FloatingCardConfig } from "./FloatingCard";
import { MainContent } from "./MainContent";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const cards: FloatingCardConfig[] = [
  {
    id: "card-01",
    index: "01",
    title: "Strategy layer",
    caption: "Atravesse a interface por cima.",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porttitor lectus at viverra sagittis, libero velit gravida quam, sed commodo nibh risus et justo.",
    accent: "rgba(37, 99, 235, 0.96)",
    width: "clamp(320px, 40vw, 620px)",
    height: "clamp(280px, 34vw, 480px)",
    inputRange: [0, 0.035, 0.09, 0.145, 0.146, 0.205, 0.235],
    x: ["-112vw", "-60vw", "-18vw", "0vw", "0vw", "58vw", "112vw"],
    y: ["-8vh", "-6vh", "-4vh", "-2vh", "-2vh", "0vh", "2vh"],
    rotate: [-5, -3, -1.5, 1.5, 1.5, 3, 5],
    scale: [0.82, 0.98, 1.14, 1.14, 1.04, 0.96, 0.84],
    opacity: [0, 0.98, 1, 1, 0.9, 0.78, 0],
    zIndex: [18, 44, 44, 44, 24, 20, 18],
  },
  {
    id: "card-02",
    index: "02",
    title: "Product signal",
    caption: "Cruze em diagonal e desapareca atras.",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae velit in magna convallis posuere. Sed tempor, urna non cursus luctus, mauris justo pretium.",
    accent: "rgba(124, 58, 237, 0.98)",
    width: "clamp(320px, 38vw, 590px)",
    height: "clamp(270px, 32vw, 460px)",
    inputRange: [0.25, 0.285, 0.34, 0.395, 0.396, 0.455, 0.485],
    x: ["112vw", "60vw", "18vw", "0vw", "0vw", "-58vw", "-112vw"],
    y: ["4vh", "3vh", "2vh", "0vh", "0vh", "-1vh", "-2vh"],
    rotate: [5, 3, 1.5, -1.5, -1.5, -3, -5],
    scale: [0.82, 0.98, 1.14, 1.14, 1.02, 0.94, 0.82],
    opacity: [0, 0.98, 1, 1, 0.88, 0.74, 0],
    zIndex: [18, 44, 44, 44, 24, 20, 18],
  },
  {
    id: "card-03",
    index: "03",
    title: "Data motion",
    caption: "Passe pelo topo do painel sticky.",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat. Praesent pharetra, nibh non cursus tincidunt, ipsum massa tincidunt justo.",
    accent: "rgba(14, 165, 233, 0.96)",
    width: "clamp(310px, 36vw, 560px)",
    height: "clamp(270px, 31vw, 450px)",
    inputRange: [0.5, 0.535, 0.59, 0.645, 0.646, 0.705, 0.735],
    x: ["-112vw", "-60vw", "-18vw", "0vw", "0vw", "58vw", "112vw"],
    y: ["-12vh", "-10vh", "-8vh", "-6vh", "-6vh", "-4vh", "-2vh"],
    rotate: [-5, -3, -1.5, 1.5, 1.5, 3, 5],
    scale: [0.8, 0.96, 1.12, 1.12, 1, 0.92, 0.8],
    opacity: [0, 0.98, 1, 1, 0.88, 0.72, 0],
    zIndex: [18, 44, 44, 44, 24, 20, 18],
  },
  {
    id: "card-04",
    index: "04",
    title: "System depth",
    caption: "Continue o percurso por tras.",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi facilisis, arcu at ultricies posuere, neque lorem pretium orci, ac gravida arcu est.",
    accent: "rgba(79, 70, 229, 0.98)",
    width: "clamp(320px, 39vw, 600px)",
    height: "clamp(280px, 33vw, 470px)",
    inputRange: [0.75, 0.785, 0.84, 0.895, 0.896, 0.955, 0.985],
    x: ["112vw", "60vw", "18vw", "0vw", "0vw", "-58vw", "-112vw"],
    y: ["10vh", "8vh", "6vh", "4vh", "4vh", "2vh", "0vh"],
    rotate: [5, 3, 1.5, -1.5, -1.5, -3, -5],
    scale: [0.82, 0.98, 1.14, 1.14, 1.02, 0.94, 0.82],
    opacity: [0, 0.98, 1, 1, 0.88, 0.74, 0],
    zIndex: [18, 44, 44, 44, 24, 20, 18],
  },
];

export function ScrollScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLElement[]>([]);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set(cardRefs.current, { autoAlpha: 0 });
        return;
      }

      const isMobile = ScrollTrigger.isTouch === 1 || window.innerWidth < 768;
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: isMobile ? 0.35 : true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      cardRefs.current.forEach((element, cardIndex) => {
        const card = cards[cardIndex];
        const duration = card.inputRange.at(-1)! - card.inputRange[0];

        gsap.set(element, {
          x: card.x[0],
          y: card.y[0],
          rotate: card.rotate[0],
          scale: card.scale[0],
          autoAlpha: card.opacity[0],
          zIndex: card.zIndex[0],
          force3D: true,
          transformPerspective: 900,
        });

        card.inputRange.slice(1).forEach((point, pointIndex) => {
          const index = pointIndex + 1;
          timeline.to(
            element,
            {
              x: card.x[index],
              y: card.y[index],
              rotate: card.rotate[index],
              scale: card.scale[index],
              autoAlpha: card.opacity[index],
              zIndex: card.zIndex[index],
              duration: point - card.inputRange[index - 1],
              ease: "none",
            },
            card.inputRange[index - 1],
          );
        });

        timeline.set(
          element,
          { pointerEvents: "none" },
          card.inputRange[0] + duration,
        );
      });

      ScrollTrigger.normalizeScroll({
        allowNestedScroll: true,
        lockAxis: false,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative h-[320vh] bg-[#041239]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(37,99,235,0.24),transparent_30%),radial-gradient(circle_at_50%_78%,rgba(59,130,246,0.2),transparent_34%),linear-gradient(180deg,#061241_0%,#0a2568_48%,#041239_100%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-[11] h-[88vh] w-[min(96vw,1040px)] -translate-x-1/2 -translate-y-1/2 rounded-[38px] border border-[#9ec2ff]/20 bg-[#dbe9ff]/5 shadow-[inset_0_0_80px_rgba(158,194,255,0.08)]" />

        <svg
          className="pointer-events-none absolute inset-0 z-[13] hidden h-full w-full opacity-55 md:block"
          viewBox="0 0 1000 720"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M 0 238 C 250 180 290 360 500 342 C 690 326 690 498 1000 438"
            fill="none"
            stroke="rgba(250, 204, 21, 0.62)"
            strokeDasharray="6 9"
            strokeWidth="2"
          />
        </svg>

        <div className="absolute inset-0">
          {cards.map((card, index) => (
            <FloatingCard
              key={card.id}
              ref={(element) => {
                if (element) {
                  cardRefs.current[index] = element;
                }
              }}
              card={card}
            />
          ))}
        </div>

        <div className="relative z-30 flex h-full items-center justify-center px-4 py-8">
          <MainContent />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[70] flex items-center justify-center gap-4 pb-7 text-sm text-white/72">
          <span className="h-px w-28 bg-gradient-to-r from-transparent via-white/30 to-white/10 sm:w-48" />
          <span>Scroll para baixo</span>
          <span className="text-xl leading-none">↓</span>
          <span className="h-px w-28 bg-gradient-to-l from-transparent via-white/30 to-white/10 sm:w-48" />
        </div>
      </div>
    </section>
  );
}
