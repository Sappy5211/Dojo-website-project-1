"use client";

/**
 * "The Current" — full-height section. Large orbital centrepiece on the left; the title block
 * (eyebrow + heading + caption), an accessible step rail, and a description panel sit on the
 * right. State is lifted here so the orbital, the rail and the panel stay in sync.
 *
 * Accessibility / motion design:
 *  - The active node AUTO-CYCLES through the flow so the description appears with no interaction
 *    (the "current" flowing through the stages). Paused while the user engages, and disabled for
 *    prefers-reduced-motion (which simply shows the first step).
 *  - A clickable step rail with arrow separators gives always-visible, keyboard-accessible,
 *    static targets — the orbiting nodes are no longer the only way in.
 *  - Hovering/focusing anywhere in the widget pauses both auto-cycle and orbital rotation, so the
 *    orbiting nodes become easy static targets too.
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { CurrentOrbital } from "@/components/blocks/CurrentOrbital";
import { EASE_OUT, DUR } from "@/lib/motion";
import { home } from "@/content";

const CYCLE_MS = 3400;

export function TheCurrentSection() {
  const nodes = home.hero.diagram.nodes;
  const reduced = useReducedMotion();

  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const current = nodes[active] ?? nodes[0];

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

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-mist lg:py-0">
      <div className="container-eneriq relative grid items-center gap-12 lg:min-h-[100svh] lg:grid-cols-[1.45fr_1fr] lg:gap-16">
        {/* Orbital — large centrepiece. Engaging here pauses rotation + auto-cycle. */}
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
            className="mx-auto w-[min(100%,78vh)]"
          />
        </div>

        {/* Title + step rail + description — right column */}
        <div className="order-1 max-w-md self-start lg:order-2 lg:pt-20">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-energy">{home.hero.diagram.eyebrow}</p>
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold leading-[1.14] tracking-tight">{home.hero.diagram.title}</h2>
          <p className="mt-5 text-base leading-relaxed text-mist/70">{home.hero.diagram.caption}</p>

          {/* Step rail — accessible, always-visible targets with flow arrows between them. */}
          <div
            className="mt-8 flex flex-wrap items-center gap-x-1.5 gap-y-2"
            role="tablist"
            aria-label={home.hero.diagram.eyebrow}
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

          {/* Description reveal — kept populated; crossfades as the active step changes. */}
          <div
            className="mt-6 max-h-[46vh] min-h-[10rem] overflow-y-auto rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm"
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: DUR.base, ease: EASE_OUT }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-energy">{current.label}</p>
                <p className="mt-3 text-lg leading-relaxed text-mist/85">{current.desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
