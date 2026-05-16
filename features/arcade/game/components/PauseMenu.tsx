"use client";

interface Props {
  onResume: () => void;
  onRestart: () => void;
  onQuit: () => void;
}

export default function PauseMenu({ onResume, onRestart, onQuit }: Props) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-violet-400/40 bg-[#130a26] p-5 text-center">
        <h3 className="arcade-readable-title text-2xl font-extrabold tracking-[-0.01em] text-violet-100">Pausado</h3>
        <div className="mt-4 flex flex-col gap-2">
          <button onClick={onResume} className="rounded-md bg-violet-600 py-2 font-mono text-sm font-bold text-white hover:bg-violet-500">
            RETOMAR
          </button>
          <button
            onClick={onRestart}
            className="rounded-md border border-fuchsia-400/40 bg-fuchsia-900/20 py-2 font-mono text-sm font-bold text-fuchsia-200 hover:bg-fuchsia-900/30"
          >
            REINICIAR RUN
          </button>
          <button
            onClick={onQuit}
            className="rounded-md border border-violet-300/30 bg-transparent py-2 font-mono text-sm font-bold text-violet-200 hover:bg-violet-900/20"
          >
            SAIR
          </button>
        </div>
      </div>
    </div>
  );
}
