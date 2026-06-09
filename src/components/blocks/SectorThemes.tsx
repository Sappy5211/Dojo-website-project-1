"use client";

import { motion, useReducedMotion } from "motion/react";
import { DUR, EASE_OUT, STAGGER, VIEWPORT } from "@/lib/motion";

export function SectorThemes({ themes }: { themes: string[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative mt-10">
      {/* connecting line behind chips */}
      <div
        className="pointer-events-none absolute left-0 top-1/2 hidden h-px w-full -translate-y-1/2 bg-gradient-to-r from-energy/0 via-energy/20 to-cyan/0 lg:block"
        aria-hidden
      />
      <ul
        className="relative flex flex-wrap gap-3 lg:flex-nowrap lg:gap-0 lg:items-center lg:justify-between"
        role="list"
        aria-label="Cross-sector themes"
      >
        {themes.map((theme, i) => (
          <motion.li
            key={theme}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{
              duration: DUR.base,
              ease: EASE_OUT,
              delay: reduce ? 0 : i * STAGGER.card,
            }}
            className="flex-shrink-0 lg:flex-1 lg:flex lg:justify-center"
          >
            {/* connector dot on desktop */}
            <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-2">
              <motion.div
                initial={reduce ? false : { scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={VIEWPORT}
                transition={{ delay: reduce ? 0 : i * STAGGER.card + 0.1, duration: DUR.micro }}
                className="h-2 w-2 rounded-full bg-energy"
                aria-hidden
              />
            </div>
            <span className="group relative flex items-center gap-2 rounded-full border border-hairline bg-panel px-5 py-2.5 text-sm font-medium text-content-muted transition-colors hover:border-energy/50 hover:bg-energy/10 hover:text-accent-ink lg:mx-2">
              {theme}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
