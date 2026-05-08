import { ScrollScene } from "@/components/ScrollScene";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="relative z-50 flex min-h-screen items-start justify-center bg-[#050713] px-4 pt-5 sm:pt-8">
        <nav className="fixed top-5 flex w-[min(92vw,440px)] items-center justify-between rounded-full border border-white/12 bg-white/10 px-4 py-3 shadow-2xl shadow-black/35 backdrop-blur-2xl sm:px-5">
          <a className="text-sm font-semibold tracking-tight text-white" href="#">
            LayerFlow
          </a>
          <div className="flex items-center gap-1 text-xs font-medium text-white/72">
            <a className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white" href="#scene">
              Cena
            </a>
            <a className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white" href="#footer">
              Final
            </a>
          </div>
        </nav>

        <section className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center text-center">
          <p className="rounded-full border border-cyan-200/20 bg-cyan-200/8 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-cyan-100">
            Mobile-first cinematic scroll
          </p>
          <h1 className="mt-6 text-5xl font-semibold leading-[0.95] sm:text-7xl">
            Cards grandes atravessando uma interface central.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Uma cena sticky com profundidade, cards em primeiro plano e
            segundo plano, e um painel central que funciona como objeto
            dominante da composicao.
          </p>
        </section>
      </header>

      <div id="scene">
        <ScrollScene />
      </div>

      <footer
        id="footer"
        className="flex min-h-screen items-center justify-center bg-[#05070d] px-6 py-24"
      >
        <div className="max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/70">
            End frame
          </p>
          <h2 className="mt-5 text-3xl font-semibold sm:text-5xl">
            Os cards atravessaram o painel central.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-400">
            A secao extra marca o fim do trecho sticky e deixa claro quando o
            fluxo cinematografico termina.
          </p>
          <div className="mt-10 flex justify-center gap-3 text-sm text-slate-500">
            <span>LayerFlow</span>
            <span>/</span>
            <span>Footer</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
