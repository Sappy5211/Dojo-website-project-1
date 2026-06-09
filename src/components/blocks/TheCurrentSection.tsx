"use client";

/**
 * "The Current" — full-height section. Large orbital centrepiece on the left; the title block
 * (eyebrow + heading + caption) sits top-right, and hovering/clicking a node reveals its
 * description in a panel directly under the title. State is lifted here so the orbital and the
 * panel stay in sync.
 */

import { useState } from "react";
import { CurrentOrbital } from "@/components/blocks/CurrentOrbital";
import { home } from "@/content";

export function TheCurrentSection() {
  const [active, setActive] = useState<number | null>(null);
  const nodes = home.hero.diagram.nodes;
  const current = active !== null ? nodes[active] : null;

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-mist lg:py-0">
      <div className="container-eneriq relative grid items-center gap-12 lg:min-h-[100svh] lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        {/* Orbital — large centrepiece */}
        <div className="order-2 lg:order-1">
          <CurrentOrbital active={active} setActive={setActive} className="mx-auto w-[min(100%,68vh)]" />
        </div>

        {/* Title + description — top right */}
        <div className="order-1 max-w-md self-start lg:order-2 lg:pt-20">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-energy">{home.hero.diagram.eyebrow}</p>
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold leading-[1.14] tracking-tight">{home.hero.diagram.title}</h2>
          <p className="mt-5 text-base leading-relaxed text-mist/70">{home.hero.diagram.caption}</p>

          {/* Description reveal — sized for a large amount of copy, capped to stay on-page */}
          <div
            className="mt-8 max-h-[46vh] min-h-[12rem] overflow-y-auto rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm"
            aria-live="polite"
          >
            {current ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-energy">{current.label}</p>
                <p className="mt-3 text-lg leading-relaxed text-mist/85">{current.desc}</p>
              </>
            ) : (
              <p className="text-sm leading-relaxed text-mist/45">
                ‹hover or tap a node in the diagram to reveal its role in the flow›
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
