const metrics = [
  ["Layer", "Sticky panel"],
  ["Cards", "Front to back"],
  ["Motion", "Curved paths"],
];

export function MainContent() {
  return (
    <article className="main-panel relative z-30 mx-auto flex h-[82vh] min-h-[640px] w-[min(90vw,460px)] flex-col justify-between overflow-hidden rounded-[34px] border border-[#9ec2ff]/45 bg-[#08256a]/52 px-8 py-9 text-white shadow-[0_30px_140px_rgba(0,0,0,0.68),0_0_90px_rgba(37,99,235,0.25)] backdrop-blur-2xl sm:w-[520px] sm:px-11 sm:py-12 lg:w-[560px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(96,165,250,0.35),transparent_25%),radial-gradient(circle_at_50%_108%,rgba(59,130,246,0.24),transparent_35%),linear-gradient(180deg,rgba(16,64,152,0.62),rgba(15,23,42,0.72))]" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#dbe9ff]/70 to-transparent" />
      <div className="pointer-events-none absolute inset-y-10 left-0 w-px bg-gradient-to-b from-transparent via-[#9ec2ff]/55 to-transparent" />
      <div className="pointer-events-none absolute inset-y-10 right-0 w-px bg-gradient-to-b from-transparent via-[#9ec2ff]/55 to-transparent" />

      <div className="relative">
        <p className="mb-7 w-fit rounded-full border border-[#dbe9ff]/25 bg-[#dbe9ff]/12 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-[#dbe9ff]">
          Conteudo fixo
        </p>
        <h1 className="text-6xl font-semibold uppercase leading-[0.9] tracking-normal text-[#eff5ff] sm:text-7xl">
          Conteudo principal
        </h1>
        <p className="mt-8 text-base leading-7 text-[#e6eeff]/78 sm:text-lg sm:leading-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          porttitor, lectus at viverra sagittis, libero velit gravida quam, sed
          commodo nibh risus et justo. Vestibulum ante ipsum primis in faucibus
          orci luctus et ultrices posuere cubilia curae.
        </p>
      </div>

      <div className="relative">
        <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-[#dbe9ff]/30 to-transparent" />
        <div className="grid gap-3">
          {metrics.map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-[#dbe9ff]/14 bg-[#dbe9ff]/10 p-4 backdrop-blur"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-[#dbe9ff]/52">
                {label}
              </p>
              <p className="mt-2 text-sm font-medium text-[#eff5ff]">{value}</p>
            </div>
          ))}
        </div>

        <button className="mt-6 h-12 w-full rounded-full bg-[#dbe9ff] px-6 text-sm font-semibold text-[#0b2a67] transition hover:bg-[#eff5ff]">
          Fake button
        </button>
      </div>
    </article>
  );
}
