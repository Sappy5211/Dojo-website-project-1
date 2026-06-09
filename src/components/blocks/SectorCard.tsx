"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Sector, ui } from "@/content";
import { DUR, EASE_OUT } from "@/lib/motion";
import { Reveal } from "../fx/Reveal";

export function SectorCard({ sector, light: _light = false }: { sector: Sector; light?: boolean }) {
  const reduce = useReducedMotion();

  return (
    <Reveal>
      <Link
        href={`/sectors/${sector.slug}`}
        aria-label={`Explore ${sector.name}`}
        className="motion-stable group relative block overflow-hidden rounded-2xl border border-hairline bg-panel p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:ring-energy"
      >
        {/* accent bar top */}
        <span
          className="mb-6 block h-[3px] w-14 origin-left rounded-full transition-transform duration-300 group-hover:scale-x-[1.7]"
          style={{ backgroundColor: sector.accent }}
          aria-hidden
        />

        {/* name */}
        <h3 className="text-lg font-semibold text-content">{sector.name}</h3>

        {/* statement */}
        <p className="mt-3 text-sm leading-relaxed text-content-muted">{sector.hero.statement}</p>

        {/* explore link */}
        <span
          className="mt-6 inline-flex items-center gap-1 text-sm font-semibold transition-transform duration-200 group-hover:translate-x-1"
          style={{ color: sector.accent }}
        >
          {ui.labels.explore}
        </span>

        {/* "branch line" hover animation */}
        {!reduce && (
          <motion.span
            initial={{ scaleX: 0, opacity: 0 }}
            whileHover={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: DUR.base, ease: EASE_OUT }}
            style={{
              originX: 0,
              background: `linear-gradient(90deg, ${sector.accent}40, ${sector.accent}00)`,
            }}
            className="pointer-events-none absolute bottom-0 left-0 h-px w-full"
            aria-hidden
          />
        )}

        {/* top-right glow spot on hover */}
        <span
          className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30"
          style={{ backgroundColor: sector.accent }}
          aria-hidden
        />

      </Link>
    </Reveal>
  );
}
