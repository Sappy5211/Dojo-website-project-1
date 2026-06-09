"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Capability, ui } from "@/content";
import { EASE_OUT, DUR } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function CapabilityCard({
  capability,
  index = 0,
  light = false,
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
        "motion-stable group relative overflow-hidden rounded-2xl border p-6",
        featured ? "min-h-[24rem]" : "min-h-[18rem]",
        light ? "border-ink-soft/10 bg-white text-ink-soft shadow-sm" : "glass-surface text-mist",
        className,
      )}
      style={{
        backgroundImage: light
          ? "radial-gradient(360px circle at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px), rgba(24,226,123,0.16), transparent 42%)"
          : "radial-gradient(360px circle at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px), rgba(31,227,207,0.16), transparent 42%)",
      }}
    >
      <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-full border border-energy/30 bg-energy/10 font-mono text-sm text-energy">
        {String(index + 1).padStart(2, "0")}
      </div>
      <h3 className={cn("font-semibold", featured ? "text-2xl md:text-3xl" : "text-lg md:text-xl")}>{capability.title}</h3>
      <p className={cn("mt-3 leading-relaxed", featured ? "text-base" : "text-sm", light ? "text-ink-soft/70" : "text-mist/68")}>{capability.desc}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {capability.sub.map((item, itemIndex) => (
          <span key={`${capability.title}-sub-${itemIndex}`} className={cn("rounded-full border px-3 py-1 text-xs", light ? "border-ink-soft/10 text-ink-soft/70" : "border-white/10 text-mist/65")}>
            {item}
          </span>
        ))}
      </div>
      {capability.sectorsHref ? (
        <Link href={capability.sectorsHref} className="mt-7 inline-flex text-sm font-semibold text-energy">
          {ui.labels.relatedSectors}
        </Link>
      ) : null}
      <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-energy via-energy-bright to-cyan opacity-60" />
    </motion.article>
  );
}
