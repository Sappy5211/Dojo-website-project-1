"use client";

/**
 * Cinematic blur-in headline. Words rise + de-blur + scale into place, staggered,
 * ONCE on mount (a looping headline reads as a glitch, so the donor's auto-replay
 * loop is removed). Reduced-motion renders fully resolved instantly.
 *
 * Pass `segments` so an accent run can carry the brand gradient:
 *   [{ text: "From ambition to a working" }, { text: "clean-energy system", accent: true }]
 */

import { useEffect, useMemo, useState } from "react";

export type HeroTextSegment = { text: string; accent?: boolean };

type Word = { text: string; accent: boolean; delay: number; duration: number; blur: number; scale: number };

export function HeroBlurText({
  segments,
  className = "",
  accentClassName = "text-gradient",
}: {
  segments: HeroTextSegment[];
  className?: string;
  accentClassName?: string;
}) {
  const [on, setOn] = useState(false);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const words = useMemo<Word[]>(() => {
    const out: Word[] = [];
    let i = 0;
    for (const seg of segments) {
      for (const raw of seg.text.split(" ")) {
        if (!raw) continue;
        out.push({
          text: raw,
          accent: Boolean(seg.accent),
          delay: i * 0.075 + Math.pow(i / 14, 0.85) * 0.35,
          duration: 1.6 + Math.cos(i * 0.3) * 0.25,
          blur: 12 + (i % 4) * 2,
          scale: 0.92 + Math.sin(i * 0.2) * 0.04,
        });
        i += 1;
      }
    }
    return out;
  }, [segments]);

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setOn(true), 120);
    return () => clearTimeout(t);
  }, [reduced]);

  const active = reduced || on;

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span
          key={`${word.text}-${index}`}
          className={`inline-block whitespace-pre ${word.accent ? accentClassName : ""}`}
          style={{
            transition: reduced
              ? undefined
              : `opacity ${word.duration}s cubic-bezier(0.25,0.46,0.45,0.94) ${word.delay}s, filter ${word.duration}s cubic-bezier(0.25,0.46,0.45,0.94) ${word.delay}s, transform ${word.duration}s cubic-bezier(0.25,0.46,0.45,0.94) ${word.delay}s`,
            opacity: active ? 1 : 0,
            filter: active ? "blur(0px)" : `blur(${word.blur}px)`,
            transform: active ? "translateY(0) scale(1)" : `translateY(18px) scale(${word.scale})`,
            willChange: "opacity, filter, transform",
            marginRight: "0.28em",
          }}
        >
          {word.text}
        </span>
      ))}
    </span>
  );
}
