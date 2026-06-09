"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Capability, ui } from "@/content";
import { EASE_OUT, DUR } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function CapabilityCard({
  capability,
  index = 0,
  light: _light = false, // kept for API compat — semantic tokens handle theming
  featured = false,
  className = "",
}: {
  capability: Capability;
  index?: number;
  light?: boolean;
  featured?: boolean;
  className?: string;
}) {
  return (
    <motion.article
      onPointerMove={(event) => {
        const target = event.currentTarget;
        const rect = target.getBoundingClientRect();
        target.style.setProperty("--x", `${event.clientX - rect.left}`);
        target.style.setProperty("--y", `${event.clientY - rect.top}`);
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: DUR.micro, ease: EASE_OUT }}
      className={cn(
        "motion-stable group relative overflow-hidden rounded-2xl border border-hairline bg-panel p-6 text-content",
        featured ? "min-h-[24rem]" : "min-h-[18rem]",
        className,
      )}
      style={{
        backgroundImage:
          "radial-gradient(360px circle at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px), rgba(24,226,123,0.10), transparent 42%)",
      }}
    >
      <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-full border border-energy/30 bg-energy/10 font-mono text-sm text-accent-ink">
        {String(index + 1).padStart(2, "0")}
      </div>
      <h3 className={cn("font-semibold text-content", featured ? "text-2xl md:text-3xl" : "text-lg md:text-xl")}>{capability.title}</h3>
      <p className={cn("mt-3 leading-relaxed text-content-muted", featured ? "text-base" : "text-sm")}>{capability.desc}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {capability.sub.map((item, itemIndex) => (
          <span key={`${capability.title}-sub-${itemIndex}`} className="rounded-full border border-hairline px-3 py-1 text-xs text-content-muted">
            {item}
          </span>
        ))}
      </div>
      {capability.sectorsHref ? (
        <Link href={capability.sectorsHref} className="mt-7 inline-flex text-sm font-semibold text-accent-ink">
          {ui.labels.relatedSectors}
        </Link>
      ) : null}
      <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-energy via-energy-bright to-cyan opacity-60" />
    </motion.article>
  );
}
