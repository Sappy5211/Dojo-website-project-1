"use client";

/**
 * "The Current" — full-bleed section. On desktop the orbital fills the whole section and the
 * written content (eyebrow → flow title → step rail → description) sits at the CENTRE, in place
 * of the old "ENIRIQ" nucleus, with the four nodes orbiting around it. On mobile it falls back
 * to a stacked layout (content first, orbital below) since the centre has no room there.
 *
 * Accessibility / motion design:
 *  - The active node AUTO-CYCLES through the flow so the description appears with no interaction
 *    (the "current" flowing through the stages). Paused while engaged; disabled for reduced motion.
 *  - The step rail is an ARIA tablist: click OR arrow keys (←/→/↑/↓, Home/End) move between steps.
 *  - Hovering/focusing the widget pauses auto-cycle AND orbital rotation, so the orbiting nodes
 *    become easy static targets.
 *  - The central panel carries the signature GlowCard cursor-spotlight border, with a slow
 *    rotating conic "current" sweep behind it (both reduced-motion safe).
 */

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

  // Auto-advance the active node unless the user is engaging or motion is reduced.
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

  // Arrow-key navigation across the step rail (ARIA tablist roving pattern).
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

  // The written content shown at the centre (desktop) / top (mobile).
  const content = (
    <GlowCard
      glowColor="green"
      className="relative w-full max-w-[24rem] overflow-hidden p-6 text-center sm:p-7"
    >
      {/* Banner: slow rotating conic "current" sweep behind the text. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-2xl motion-reduce:animate-none"
        style={{
          background:
            "conic-gradient(from 0deg, transparent, var(--color-energy), var(--color-cyan), transparent 60%)",
          animation: "spin 16s linear infinite",
        }}
      />

      <div className="relative">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-energy">{home.hero.diagram.eyebrow}</p>
        <h2 className="text-[clamp(1.3rem,2.2vw,1.85rem)] font-semibold leading-[1.18] tracking-tight">{home.hero.diagram.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-mist/60">{home.hero.diagram.caption}</p>

        {/* Step rail — click or arrow-key, with flow arrows between. */}
        <div
          ref={railRef}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2"
          role="tablist"
          aria-label={home.hero.diagram.eyebrow}
          onKeyDown={onRailKey}
          onMouseEnter={pause}
          onMouseLeave={resume}
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
                  className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
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

        {/* Description — crossfades as the active step changes. */}
        <div className="mt-5 min-h-[6.5rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: DUR.base, ease: EASE_OUT }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-energy">{current.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-mist/85">{current.desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </GlowCard>
  );

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-mist lg:flex lg:min-h-svh lg:items-center lg:py-0">
      <div className="container-eneriq relative w-full">
        {/* Canvas: stacked on mobile; a square the orbital fills on desktop, content centred over it. */}
        <div className="relative mx-auto w-full lg:aspect-square lg:w-[min(100%,84svh)]">
          {/* Written content — top on mobile, centre nucleus on desktop. */}
          <div
            className="relative z-10 mx-auto flex max-w-[24rem] justify-center lg:absolute lg:inset-0 lg:max-w-none lg:items-center"
            onMouseEnter={pause}
            onMouseLeave={resume}
            onFocusCapture={pause}
            onBlurCapture={resume}
          >
            {content}
          </div>

          {/* Orbital — below content on mobile, fills the square behind content on desktop. */}
          <div
            className="relative mx-auto mt-12 aspect-square w-[min(100%,78vw)] lg:absolute lg:inset-0 lg:mt-0 lg:w-full"
            onMouseEnter={pause}
            onMouseLeave={resume}
          >
            <CurrentOrbital
              active={active}
              setActive={(u) => setActive((c) => {
                const next = typeof u === "function" ? u(c) : u;
                return next == null ? c : next;
              })}
              paused={engaged || !!reduced}
              radiusFactor={0.46}
              centerClassName="lg:hidden"
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
