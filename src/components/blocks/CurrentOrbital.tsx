"use client";

import { useEffect, useRef } from "react";
import { IconGlyph } from "@/components/blocks/IconGlyph";
import { home } from "@/content";

const NODE_ICONS = ["Zap", "Network", "BrainCircuit", "Workflow"];

export function CurrentOrbital({
  active,
  setActive,
  paused = false,
  className = "",
}: {
  active: number | null;
  setActive: (updater: number | null | ((current: number | null) => number | null)) => void;
  paused?: boolean;
  className?: string;
}) {
  const nodes = home.hero.diagram.nodes;
  const total = nodes.length;

  const wrapRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const angleRef = useRef(0);
  const pausedRef = useRef(paused);
  const activeRef = useRef<number | null>(null);

  useEffect(() => { activeRef.current = active; }, [active]);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let onScreen = true;
    let raf = 0;

    const apply = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const radius = wrap.clientWidth * 0.38;
      for (let i = 0; i < total; i++) {
        const el = nodeRefs.current[i];
        if (!el) continue;
        const angle = ((i / total) * 360 + angleRef.current) % 360;
        const rad = (angle * Math.PI) / 180;
        const x = radius * Math.cos(rad);
        const y = radius * Math.sin(rad);
        const isActive = activeRef.current === i;
        el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        el.style.opacity = String(isActive ? 1 : Math.max(0.5, 0.5 + 0.5 * ((1 + Math.sin(rad)) / 2)));
        el.style.zIndex = String(isActive ? 50 : Math.round(20 + 10 * Math.cos(rad)));
      }
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!onScreen) return;
      if (!pausedRef.current) angleRef.current = (angleRef.current + 0.18) % 360;
      apply();
    };

    apply();
    if (!reduced) raf = requestAnimationFrame(loop);

    let io: IntersectionObserver | undefined;
    if (wrapRef.current) {
      io = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; }, { rootMargin: "120px" });
      io.observe(wrapRef.current);
    }

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [total]);

  const isNeighbor = (i: number) =>
    active !== null && ((i === (active - 1 + total) % total) || (i === (active + 1) % total));

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <div className="absolute inset-[16%] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.16),transparent_70%)] blur-2xl" aria-hidden />

      <div ref={wrapRef} className="absolute inset-0">
        <div className="absolute inset-[8%] rounded-full border border-white/10" aria-hidden />
        <div className="absolute inset-[26%] rounded-full border border-white/[0.06]" aria-hidden />

        {/* Centre nucleus */}
        <div className="absolute left-1/2 top-1/2 z-[40] -translate-x-1/2 -translate-y-1/2">
          <div className="relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-energy via-energy-bright to-cyan shadow-[0_0_32px_rgba(16,185,129,0.4)]">
            <span className="text-[10px] font-bold tracking-[0.15em] text-ink">S</span>
            <span className="absolute inset-0 animate-ping rounded-full bg-energy/20" aria-hidden />
          </div>
        </div>

        {/* Orbiting nodes */}
        {nodes.map((node, i) => {
          const isActive = active === i;
          return (
            <button
              key={node.label}
              ref={(el) => { nodeRefs.current[i] = el; }}
              type="button"
              aria-label={node.label}
              aria-pressed={isActive}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={(e) => { e.stopPropagation(); setActive(i); }}
              className="absolute left-1/2 top-1/2 rounded-full will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <span
                className={`relative grid h-11 w-11 place-items-center rounded-full border-2 transition-[background-color,border-color,transform,box-shadow] duration-300 ${
                  isActive
                    ? "scale-125 border-energy bg-energy text-ink shadow-[0_0_24px_rgba(16,185,129,0.5)]"
                    : isNeighbor(i)
                      ? "animate-pulse border-cyan/60 bg-ink text-cyan"
                      : "border-white/25 bg-ink text-energy hover:border-energy/60"
                }`}
              >
                <IconGlyph name={NODE_ICONS[i]} className="h-5 w-5" />
                <span
                  className={`absolute left-1/2 top-[140%] -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold tracking-wide transition-colors ${
                    isActive ? "text-mist" : "text-mist/55"
                  }`}
                >
                  {node.label}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
