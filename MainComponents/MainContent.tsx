const metrics = [
  ["Layer", "Sticky panel"],
  ["Cards", "Front to back"],
  ["Motion", "Curved paths"],
];

export function MainContent() {
  return (
    <article className="main-panel relative z-30 mx-auto flex h-[82vh] min-h-[640px] w-[min(90vw,460px)] flex-col justify-between overflow-hidden rounded-[34px] border border-red-400/45 bg-red-950/42 px-8 py-9 text-white shadow-[0_30px_140px_rgba(0,0,0,0.68),0_0_90px_rgba(239,68,68,0.18)] backdrop-blur-2xl sm:w-[520px] sm:px-11 sm:py-12 lg:w-[560px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(248,113,113,0.36),transparent_25%),radial-gradient(circle_at_50%_108%,rgba(239,68,68,0.24),transparent_35%),linear-gradient(180deg,rgba(127,29,29,0.62),rgba(15,23,42,0.68))]" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-red-100/70 to-transparent" />
      <div className="pointer-events-none absolute inset-y-10 left-0 w-px bg-gradient-to-b from-transparent via-red-300/55 to-transparent" />
      <div className="pointer-events-none absolute inset-y-10 right-0 w-px bg-gradient-to-b from-transparent via-red-300/55 to-transparent" />

      <div className="relative">
        <p className="mb-7 w-fit rounded-full border border-red-100/15 bg-white/8 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-red-100">
          Conteudo fixo
        </p>
        <h1 className="text-6xl font-semibold uppercase leading-[0.9] tracking-normal text-red-50 sm:text-7xl">
          Conteudo principal
        </h1>
        <p className="mt-8 text-base leading-7 text-red-50/70 sm:text-lg sm:leading-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          porttitor, lectus at viverra sagittis, libero velit gravida quam, sed
          commodo nibh risus et justo. Vestibulum ante ipsum primis in faucibus
          orci luctus et ultrices posuere cubilia curae.
        </p>
      </div>

      <div className="relative">
        <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-red-100/30 to-transparent" />
        <div className="grid gap-3">
          {metrics.map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-red-100/12 bg-white/[0.065] p-4 backdrop-blur"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-red-100/48">
                {label}
              </p>
              <p className="mt-2 text-sm font-medium text-red-50">{value}</p>
            </div>
          ))}
        </div>

        <button className="mt-6 h-12 w-full rounded-full bg-red-50 px-6 text-sm font-semibold text-red-950 transition hover:bg-white">
          Fake button
        </button>
      </div>
    </article>
  );
}
