"use client";

interface Props {
  onMoveChange: (next: { up: boolean; down: boolean; left: boolean; right: boolean }) => void;
  onShootChange: (shooting: boolean) => void;
  onDash: () => void;
}

export default function MobileControls({ onMoveChange, onShootChange, onDash }: Props) {
  return (
    <div className="mt-3 grid grid-cols-2 gap-3 sm:hidden">
      <div className="grid grid-cols-3 gap-1">
        <div />
        <DirBtn
          label="▲"
          onDown={() => onMoveChange({ up: true, down: false, left: false, right: false })}
          onUp={() => onMoveChange({ up: false, down: false, left: false, right: false })}
        />
        <div />
        <DirBtn
          label="◀"
          onDown={() => onMoveChange({ up: false, down: false, left: true, right: false })}
          onUp={() => onMoveChange({ up: false, down: false, left: false, right: false })}
        />
        <DirBtn
          label="▼"
          onDown={() => onMoveChange({ up: false, down: true, left: false, right: false })}
          onUp={() => onMoveChange({ up: false, down: false, left: false, right: false })}
        />
        <DirBtn
          label="▶"
          onDown={() => onMoveChange({ up: false, down: false, left: false, right: true })}
          onUp={() => onMoveChange({ up: false, down: false, left: false, right: false })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <button
          onPointerDown={(e) => {
            e.preventDefault();
            onShootChange(true);
          }}
          onPointerUp={(e) => {
            e.preventDefault();
            onShootChange(false);
          }}
          onPointerLeave={() => onShootChange(false)}
          className="h-14 rounded-xl border border-fuchsia-300/40 bg-fuchsia-800/30 font-mono text-xs font-bold tracking-widest text-fuchsia-200"
        >
          TIRO
        </button>
        <button onClick={onDash} className="h-14 rounded-xl border border-cyan-300/30 bg-cyan-900/20 font-mono text-xs font-bold tracking-widest text-cyan-200">
          DASH
        </button>
      </div>
    </div>
  );
}

function DirBtn({
  label,
  onDown,
  onUp,
}: {
  label: string;
  onDown: () => void;
  onUp: () => void;
}) {
  return (
    <button
      onPointerDown={(e) => {
        e.preventDefault();
        onDown();
      }}
      onPointerUp={(e) => {
        e.preventDefault();
        onUp();
      }}
      onPointerLeave={onUp}
      className="h-12 rounded-lg border border-violet-300/30 bg-violet-900/30 font-mono text-sm font-bold text-violet-100"
    >
      {label}
    </button>
  );
}
