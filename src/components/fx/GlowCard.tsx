"use client";

/**
 * GlowCard — cursor-tracking spotlight border (the GlowCard / spotlight-card pattern).
 *
 * Brand adaptations:
 *  - Hue is PINNED to green→cyan (the donor's green preset base:120 spread:200 drifts to
 *    magenta as the cursor moves; here base:150 spread:40 keeps it in brand).
 *  - One shared pointermove listener writes --x/--y to :root; every card inherits them
 *    (the donor attached a listener per card). Cheap, and the fixed-attachment spotlight
 *    stays continuous across cards.
 *  - The border-mask glow lives in globals.css under [data-glow].
 */

import { useEffect, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlowColor = "green" | "cyan" | "amber";

const glowMap: Record<GlowColor, { base: number; spread: number }> = {
  green: { base: 150, spread: 40 }, // emerald → cyan
  cyan: { base: 188, spread: 26 },
  amber: { base: 36, spread: 22 },
};

let listenerAttached = false;
function ensurePointerListener() {
  if (listenerAttached || typeof window === "undefined") return;
  listenerAttached = true;
  const root = document.documentElement;
  window.addEventListener(
    "pointermove",
    (e) => {
      root.style.setProperty("--x", e.clientX.toFixed(1));
      root.style.setProperty("--xp", (e.clientX / window.innerWidth).toFixed(3));
      root.style.setProperty("--y", e.clientY.toFixed(1));
      root.style.setProperty("--yp", (e.clientY / window.innerHeight).toFixed(3));
    },
    { passive: true }
  );
}

export function GlowCard({
  children,
  className = "",
  glowColor = "green",
}: {
  children: ReactNode;
  className?: string;
  glowColor?: GlowColor;
}) {
  useEffect(() => {
    ensurePointerListener();
  }, []);

  const { base, spread } = glowMap[glowColor];

  const style = {
    "--base": String(base),
    "--spread": String(spread),
    "--radius": "16",
    "--border": "3",
    "--backdrop": "hsl(150 14% 7% / 0.55)",
    "--backup-border": "rgba(245,247,245,0.10)",
    "--size": "240",
    "--outer": "1",
    "--saturation": "85",
    "--lightness": "60",
    "--bg-spot-opacity": "0.12",
    "--border-spot-opacity": "1",
    "--border-light-opacity": "0.8",
    "--border-size": "calc(var(--border, 2) * 1px)",
    "--spotlight-size": "calc(var(--size, 150) * 1px)",
    "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
    backgroundImage:
      "radial-gradient(var(--spotlight-size) var(--spotlight-size) at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px), hsl(var(--hue, 150) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 60) * 1%) / var(--bg-spot-opacity, 0.1)), transparent)",
    backgroundColor: "var(--backdrop, transparent)",
    backgroundSize: "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
    backgroundPosition: "50% 50%",
    backgroundAttachment: "fixed",
    border: "var(--border-size) solid var(--backup-border)",
    touchAction: "none",
  } as CSSProperties;

  return (
    <div data-glow style={style} className={cn("relative rounded-2xl", className)}>
      <div data-glow />
      {children}
    </div>
  );
}
