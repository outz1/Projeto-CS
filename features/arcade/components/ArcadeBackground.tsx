import { InteractiveParticleBackground } from "./InteractiveParticleBackground";

export function ArcadeBackground() {
  return (
    <>
      <InteractiveParticleBackground />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_18%_12%,rgba(37,99,235,0.36),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(217,70,239,0.24),transparent_32%),radial-gradient(circle_at_50%_88%,rgba(34,211,238,0.18),transparent_35%),linear-gradient(135deg,#040816_0%,#071333_45%,#130a2a_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.10] [background-image:linear-gradient(rgba(255,255,255,.75)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.75)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-32 bg-gradient-to-b from-cyan-300/10 to-transparent" />
    </>
  );
}
