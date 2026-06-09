import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { GlowCard } from "@/components/fx/GlowCard";
import type { Person } from "@/content";

/**
 * People-page person card: a full-bleed photo (or branded initials placeholder, since real
 * photos aren't in yet) fills the whole widget, with bio + name + specialism overlaid on a
 * bottom gradient, a responsibility chip, and a LinkedIn link. Wrapped in the GlowCard border.
 */
export function PersonGlowCard({ person }: { person: Person }) {
  return (
    <GlowCard className="h-full p-1.5">
      <div className="relative h-full min-h-[26rem] overflow-hidden rounded-[14px] bg-ink">
        {/* Fill */}
        {person.avatar ? (
          <Image src={person.avatar} alt={person.name} fill className="object-cover object-top" sizes="(max-width:1024px) 100vw, 33vw" />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(120%_90%_at_50%_0%,rgba(16,185,129,0.32),transparent_60%),radial-gradient(120%_90%_at_50%_100%,rgba(56,189,248,0.22),transparent_55%)]">
            <span className="text-7xl font-bold tracking-[0.2em] text-white/85">{person.initials}</span>
          </div>
        )}

        {/* Bottom gradient for legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-transparent" />

        {/* LinkedIn — top right */}
        <a
          href={person.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label={`${person.name} on LinkedIn`}
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-ink/60 text-mist backdrop-blur-sm transition-colors hover:border-energy/60 hover:text-energy"
        >
          <ExternalLink size={16} />
        </a>

        {/* Text overlay */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="border-b border-white/15 pb-4 text-sm leading-relaxed text-mist/90">{person.bio}</p>
          <p className="mt-4 font-medium text-white">— {person.name}</p>
          <p className="text-gradient text-sm font-medium">{person.specialism}</p>
          <span className="mt-3 inline-flex rounded-full border border-energy/30 bg-energy/10 px-3 py-1 text-xs font-medium text-energy">
            {person.responsibility}
          </span>
        </div>
      </div>
    </GlowCard>
  );
}
