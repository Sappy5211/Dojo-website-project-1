"use client";

/**
 * WwdEngagementCard — styled engagement model card with GlowCard border.
 * Each card has a left accent bar, title, description, and an optional
 * visual indicator pill showing the engagement type.
 */

import { GlowCard } from "@/components/fx/GlowCard";
import { Reveal } from "@/components/fx/Reveal";

const MODEL_ICONS = ["◈", "◉", "◎", "⬡"] as const;

// Cycle through green→cyan palette for card accent bars
const MODEL_ACCENTS = [
  { bar: "#18E27B", pill: "bg-energy/15 text-energy" },
  { bar: "#5DFFA8", pill: "bg-energy-bright/15 text-energy-bright" },
  { bar: "#1FE3CF", pill: "bg-cyan/15 text-cyan" },
  { bar: "#F2C24E", pill: "bg-amber/15 text-amber" },
] as const;

interface EngagementModel {
  title: string;
  desc: string;
}

export function WwdEngagementCard({
  model,
  index,
}: {
  model: EngagementModel;
  index: number;
}) {
  const accent = MODEL_ACCENTS[index % MODEL_ACCENTS.length];
  const icon = MODEL_ICONS[index % MODEL_ICONS.length];

  return (
    <Reveal delay={index * 0.07}>
      <GlowCard glowColor="green" className="h-full p-6">
        {/* Accent top bar */}
        <span
          className="mb-5 block h-0.5 w-10 rounded-full"
          style={{ backgroundColor: accent.bar }}
          aria-hidden
        />
        {/* Pill badge */}
        <span
          className={`mb-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${accent.pill}`}
        >
          <span aria-hidden>{icon}</span>
          <span className="font-mono uppercase tracking-wider">
            {String(index + 1).padStart(2, "0")}
          </span>
        </span>

        <h3 className="text-base font-semibold text-mist leading-snug">{model.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-mist/65">{model.desc}</p>

        {/* Bottom line accent */}
        <span
          className="pointer-events-none absolute inset-x-6 bottom-0 h-px opacity-50"
          style={{
            background: `linear-gradient(to right, ${accent.bar}, transparent)`,
          }}
          aria-hidden
        />
      </GlowCard>
    </Reveal>
  );
}
