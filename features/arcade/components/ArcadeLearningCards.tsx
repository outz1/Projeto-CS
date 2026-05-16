import { arcadeLearningCards } from "../content";

export function ArcadeLearningCards() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {arcadeLearningCards.map((card) => {
        const Icon = card.icon;
        return (
          <article key={card.title} className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-xl shadow-black/15 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-cyan-200/30 hover:bg-white/[0.10]">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-200/10 text-cyan-100">
              <Icon size={24} />
            </div>
            <h3 className="arcade-readable-title text-xl font-extrabold leading-snug tracking-[-0.01em] text-white">{card.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-blue-50/68">{card.text}</p>
          </article>
        );
      })}
    </div>
  );
}
