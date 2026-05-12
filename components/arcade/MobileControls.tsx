"use client";

import { useMemo, useRef, useState } from "react";

interface Props {
  onMoveChange: (next: { x: number; y: number }) => void;
  onAimChange: (next: { x: number; y: number; active: boolean }) => void;
  onDash: () => void;
}

const STICK_SIZE = 112;
const KNOB_SIZE = 42;
const MAX_RADIUS = (STICK_SIZE - KNOB_SIZE) / 2;

export default function MobileControls({ onMoveChange, onAimChange, onDash }: Props) {
  return (
    <div className="mt-3 grid grid-cols-2 gap-3 sm:hidden">
      <div className="flex justify-start">
        <Joystick label="MOV" onChange={onMoveChange} onActiveChange={(active) => !active && onMoveChange({ x: 0, y: 0 })} />
      </div>

      <div className="flex flex-col items-end gap-2">
        <Joystick label="MIRA" onChange={({ x, y }) => onAimChange({ x, y, active: true })} onActiveChange={(active, x, y) => onAimChange({ x, y, active })} />
        <button
          onClick={onDash}
          className="h-11 w-[112px] rounded-xl border border-cyan-300/30 bg-cyan-900/20 font-mono text-xs font-bold tracking-widest text-cyan-200"
        >
          DASH
        </button>
      </div>
    </div>
  );
}

function Joystick({
  label,
  onChange,
  onActiveChange,
}: {
  label: string;
  onChange: (next: { x: number; y: number }) => void;
  onActiveChange: (active: boolean, x: number, y: number) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const activePointerId = useRef<number | null>(null);
  const [knob, setKnob] = useState({ x: 0, y: 0 });

  const knobStyle = useMemo(
    () => ({
      transform: `translate(calc(-50% + ${knob.x}px), calc(-50% + ${knob.y}px))`,
    }),
    [knob.x, knob.y],
  );

  const updateFromClient = (clientX: number, clientY: number) => {
    const root = rootRef.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rawX = clientX - centerX;
    const rawY = clientY - centerY;
    const distance = Math.hypot(rawX, rawY);
    const scale = distance > MAX_RADIUS ? MAX_RADIUS / distance : 1;
    const clampedX = rawX * scale;
    const clampedY = rawY * scale;
    const nx = clampedX / MAX_RADIUS;
    const ny = clampedY / MAX_RADIUS;
    setKnob({ x: clampedX, y: clampedY });
    onChange({ x: nx, y: ny });
    onActiveChange(true, nx, ny);
  };

  const resetStick = () => {
    setKnob({ x: 0, y: 0 });
    onChange({ x: 0, y: 0 });
    onActiveChange(false, 0, 0);
  };

  return (
    <div
      ref={rootRef}
      onPointerDown={(e) => {
        e.preventDefault();
        activePointerId.current = e.pointerId;
        e.currentTarget.setPointerCapture(e.pointerId);
        updateFromClient(e.clientX, e.clientY);
      }}
      onPointerMove={(e) => {
        if (activePointerId.current !== e.pointerId) return;
        e.preventDefault();
        updateFromClient(e.clientX, e.clientY);
      }}
      onPointerUp={(e) => {
        if (activePointerId.current !== e.pointerId) return;
        e.preventDefault();
        activePointerId.current = null;
        resetStick();
      }}
      onPointerCancel={(e) => {
        if (activePointerId.current !== e.pointerId) return;
        activePointerId.current = null;
        resetStick();
      }}
      className="relative h-28 w-28 rounded-full border border-violet-300/35 bg-violet-900/25"
      style={{ touchAction: "none" }}
    >
      <div className="absolute inset-2 rounded-full border border-violet-300/20" />
      <div className="absolute left-1/2 top-1/2 h-[42px] w-[42px] rounded-full border border-fuchsia-300/40 bg-fuchsia-900/55" style={knobStyle} />
      <span className="pointer-events-none absolute inset-x-0 bottom-2 text-center font-mono text-[9px] tracking-widest text-violet-200/80">{label}</span>
    </div>
  );
}
