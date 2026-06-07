"use client";

import { useState } from "react";
import { ArrowRight, BrainCircuit, Database, Lightbulb, Zap } from "lucide-react";
import { home } from "@/content";

const icons = [Zap, Database, BrainCircuit, Lightbulb];
const nodePositions = [
  "left-1/2 top-0 -translate-x-1/2",
  "right-0 top-1/2 -translate-y-1/2",
  "bottom-0 left-1/2 -translate-x-1/2",
  "left-0 top-1/2 -translate-y-1/2",
];

export function HeroCurrentOrbit() {
  const [activeIndex, setActiveIndex] = useState(0);
  const nodes = home.hero.diagram.nodes;
  const activeNode = nodes[activeIndex] ?? nodes[0];

  return (
    <div className="mt-7" aria-label={home.hero.diagram.caption}>
      <div className="hero-current-orbit motion-stable relative mx-auto aspect-square w-full max-w-[22rem] rounded-full">
        <div className="absolute inset-7 rounded-full border border-cyan/10 bg-ink/30 shadow-[inset_0_0_2.5rem_rgba(56,189,248,0.08)]" aria-hidden />
        <div className="absolute inset-14 rounded-full border border-energy/15" aria-hidden />

        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 320 320" aria-hidden>
          <defs>
            <linearGradient id="hero-current-flow" x1="32" y1="30" x2="288" y2="290" gradientUnits="userSpaceOnUse">
              <stop stopColor="#16A34A" />
              <stop offset="0.55" stopColor="#10B981" />
              <stop offset="1" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
          <circle cx="160" cy="160" r="116" fill="none" stroke="url(#hero-current-flow)" strokeDasharray="7 13" strokeLinecap="round" strokeWidth="1.5" opacity="0.55" />
          <path className="hero-current-flow-line" d="M160 44 C228 58 276 92 276 160 C276 226 226 262 160 276 C92 262 44 226 44 160 C44 92 92 58 160 44Z" fill="none" stroke="url(#hero-current-flow)" strokeLinecap="round" strokeWidth="2" />
        </svg>

        <div className="absolute left-1/2 top-1/2 grid h-32 w-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-ink/85 p-4 text-center shadow-[0_1rem_3rem_rgba(0,0,0,0.32)] backdrop-blur-xl">
          <span className="absolute inset-[-0.45rem] rounded-full border border-energy/20 hero-current-pulse" aria-hidden />
          <span className="text-[0.66rem] font-semibold uppercase leading-snug tracking-[0.18em] text-energy">{home.hero.diagram.caption}</span>
          <ArrowRight className="mt-2 h-4 w-4 text-cyan" aria-hidden />
        </div>

        {nodes.map((node, index) => {
          const Icon = icons[index] ?? Lightbulb;
          const isActive = activeIndex === index;

          return (
            <button
              key={`${node}-${index}`}
              type="button"
              className={`absolute ${nodePositions[index]} group grid w-28 place-items-center gap-2 text-center transition-transform duration-200 hover:scale-[1.04] focus-visible:scale-[1.04]`}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              aria-pressed={isActive}
            >
              <span
                className={`grid h-14 w-14 place-items-center rounded-2xl border backdrop-blur-xl transition-colors duration-200 ${
                  isActive ? "border-energy/60 bg-energy/20 text-energy shadow-[0_0_2rem_rgba(16,185,129,0.2)]" : "border-white/12 bg-ink/75 text-mist/70 group-hover:border-cyan/35 group-hover:text-cyan"
                }`}
              >
                <Icon size={20} strokeWidth={1.7} />
              </span>
              <span className={`max-w-28 text-balance text-xs font-medium leading-snug transition-colors duration-200 ${isActive ? "text-mist" : "text-mist/58"}`}>{node}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-ink/70 px-4 py-3 backdrop-blur-xl">
        <p className="text-sm font-medium leading-relaxed text-mist/82">{home.hero.diagram.title}</p>
        <p className="mt-1 text-xs leading-relaxed text-mist/55">{activeNode}</p>
      </div>
    </div>
  );
}
