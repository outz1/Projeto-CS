type ImagePlaceholderProps = {
  className?: string;
};

export function ImagePlaceholder({ className }: ImagePlaceholderProps) {
  return (
    <div
      className={`border border-[#8eb1ff]/70 bg-[#2e5fc7]/85 shadow-[0_0_0_1px_rgba(219,233,255,0.22)] ${className ?? ""}`}
    />
  );
}
