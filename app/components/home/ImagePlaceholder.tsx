type ImagePlaceholderProps = {
  className?: string;
};

export function ImagePlaceholder({ className }: ImagePlaceholderProps) {
  return (
    <div
      className={`bg-red-600/95 border border-red-400 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] ${className ?? ""}`}
    />
  );
}
