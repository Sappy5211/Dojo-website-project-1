"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { CurrentOrbital } from "@/components/blocks/CurrentOrbital";
import { GlowCard } from "@/components/fx/GlowCard";
import { EASE_OUT, DUR } from "@/lib/motion";
import { home } from "@/content";

const CYCLE_MS = 3400;

export function TheCurrentSection() {
  const nodes = home.hero.diagram.nodes;
  const reduced = useReducedMotion();

  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const current = nodes[active] ?? nodes[0];
  const railRef = useRef<HTMLDivElement>(null);

  const engagedRef = useRef(engaged);
  useEffect(() => { engagedRef.current = engaged; }, [engaged]);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      if (engagedRef.current) return;
      setActive((i) => (i + 1) % nodes.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [reduced, nodes.length]);

  const pause = () => setEngaged(true);
  const resume = () => setEngaged(false);

  // Arrow-key ARIA tablist roving pattern
  const onRailKey = (e: React.KeyboardEvent) => {
    const last = nodes.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (active + 1) % nodes.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (active - 1 + nodes.length) % nodes.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(next);
    const tabs = railRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]");
    tabs?.[next]?.focus();
  };

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-mist lg:py-0">
      <div className="container-eneriq relative grid items-center gap-12 lg:min-h-[100svh] lg:grid-cols-[1fr_1.1fr] lg:gap-16">

        {/* Orbital — smaller so the text column has breathing room */}
        <div
          className="order-2 lg:order-1"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocusCapture={pause}
          onBlurCapture={resume}
        >
          <CurrentOrbital
            active={active}
            setActive={(u) => setActive((c) => {
              const next = typeof u === "function" ? u(c) : u;
              return next == null ? c : next;
            })}
            paused={engaged || !!reduced}
            className="mx-auto w-[min(100%,52vh)]"
          />
        </div>

        {/* Title + step rail + description panel */}
        <div
          className="order-1 lg:order-2"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocusCapture={pause}
          onBlurCapture={resume}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-energy">
            {home.hero.diagram.eyebrow}
          </p>
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold leading-[1.14] tracking-tight">
            {home.hero.diagram.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-mist/70">
            {home.hero.diagram.caption}
          </p>

          {/* Step rail — click or arrow-key */}
          <div
            ref={railRef}
            className="mt-7 flex flex-wrap items-center gap-x-1.5 gap-y-2"
            role="tablist"
            aria-label={home.hero.diagram.eyebrow}
            onKeyDown={onRailKey}
          >
            {nodes.map((node, i) => {
              const isActive = active === i;
              return (
                <div key={node.label} className="flex items-center gap-x-1.5">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(i)}
                    onFocus={pause}
                    onBlur={resume}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                      isActive
                        ? "border-energy bg-energy text-ink"
                        : "border-white/15 bg-white/[0.03] text-mist/70 hover:border-energy/50 hover:text-mist"
                    }`}
                  >
                    {node.label}
                  </button>
                  {i < nodes.length - 1 && (
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-mist/30" aria-hidden />
                  )}
                </div>
              );
            })}
          </div>

          {/* Description — GlowCard with crossfade */}
          <GlowCard glowColor="green" className="mt-6 min-h-[10rem] p-6">
            <div aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: DUR.base, ease: EASE_OUT }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-energy">
                    {current.label}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-mist/85">
                    {current.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </GlowCard>
        </div>

      </div>
    </section>
  );
}
