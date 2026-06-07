import { CurrentLine } from "./CurrentLine";

export function CurrentBackground({ className = "", stroke }: { className?: string; stroke?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden opacity-[0.16] ${className}`} aria-hidden>
      <CurrentLine
        className="absolute left-1/2 top-0 h-full w-[42rem] -translate-x-1/2"
        viewBox="0 0 200 800"
        d="M20 40 C120 120 80 210 160 280 C40 380 90 460 150 560 C110 640 60 700 180 760"
        nodes={[
          { x: 20, y: 40 },
          { x: 160, y: 280 },
          { x: 150, y: 560 },
          { x: 180, y: 760 },
        ]}
        stroke={stroke}
        width={1.2}
      />
    </div>
  );
}
