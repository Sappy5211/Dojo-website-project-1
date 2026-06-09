"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import type { Person } from "@/content";
import { ui } from "@/content";
import { cn } from "@/lib/utils";

export function HomePeopleShowcase({ people }: { people: Person[] }) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const columns = [
    people.filter((_, index) => index % 3 === 0),
    people.filter((_, index) => index % 3 === 1),
    people.filter((_, index) => index % 3 === 2),
  ];

  return (
    <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)]">
      <div className="flex min-w-0 gap-3 overflow-x-auto pb-2 sm:gap-4 lg:overflow-visible lg:pb-0">
        {columns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className={cn(
              "flex shrink-0 flex-col gap-3 sm:gap-4",
              columnIndex === 1 && "pt-12 sm:pt-16",
              columnIndex === 2 && "pt-6 sm:pt-8",
            )}
          >
            {column.map((person, personIndex) => (
              <PeoplePhotoTile
                key={person.slug}
                person={person}
                className={cn(
                  columnIndex === 1 ? "h-48 w-40 sm:h-60 sm:w-52 lg:h-[18rem] lg:w-56" : "h-44 w-36 sm:h-52 sm:w-44 lg:h-64 lg:w-48",
                  personIndex > 0 && "lg:translate-x-4",
                )}
                hoveredSlug={hoveredSlug}
                onHover={setHoveredSlug}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:block lg:space-y-5 lg:pt-8">
        {people.map((person) => (
          <PeopleNameRow key={person.slug} person={person} hoveredSlug={hoveredSlug} onHover={setHoveredSlug} />
        ))}
        <Link href="/people" className="inline-flex w-fit items-center gap-2 pt-2 font-semibold text-energy transition-colors duration-200 hover:text-cyan">
          {ui.labels.people}
          <ExternalLink size={16} aria-hidden />
        </Link>
      </div>
    </div>
  );
}

function PeoplePhotoTile({
  person,
  className,
  hoveredSlug,
  onHover,
}: {
  person: Person;
  className: string;
  hoveredSlug: string | null;
  onHover: (slug: string | null) => void;
}) {
  const isActive = hoveredSlug === person.slug;
  const isDimmed = hoveredSlug !== null && !isActive;

  return (
    <button
      type="button"
      className={cn(
        "group relative shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-ink-soft text-left shadow-[0_1.25rem_3rem_rgba(6,10,9,0.45)] transition-[opacity,transform,border-color] duration-300 hover:-translate-y-1 hover:border-energy/45 focus-visible:-translate-y-1",
        className,
        isDimmed ? "opacity-55" : "opacity-100",
      )}
      onMouseEnter={() => onHover(person.slug)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(person.slug)}
      onBlur={() => onHover(null)}
      aria-label={person.name}
    >
      {person.avatar ? (
        <Image src={person.avatar} alt={person.name} fill sizes="(min-width: 1024px) 14rem, 45vw" className={cn("object-cover transition-[filter,transform] duration-500 group-hover:scale-105", isActive ? "grayscale-0 brightness-100" : "grayscale brightness-[0.78]")} />
      ) : (
        <div className={cn("grid h-full w-full place-items-center bg-[radial-gradient(circle_at_28%_18%,rgba(56,189,248,0.26),transparent_34%),linear-gradient(135deg,#0A0F0D,#16201C_58%,#0f3a2b)] transition-[filter,transform] duration-500 group-hover:scale-105", isActive ? "grayscale-0 brightness-110" : "grayscale brightness-[0.84]")}>
          <span className="text-4xl font-semibold tracking-tight text-mist sm:text-5xl">{person.initials}</span>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-4">
        <p className="text-sm font-semibold text-mist">{person.name}</p>
        <p className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-energy">{person.responsibility}</p>
      </div>
    </button>
  );
}

function PeopleNameRow({
  person,
  hoveredSlug,
  onHover,
}: {
  person: Person;
  hoveredSlug: string | null;
  onHover: (slug: string | null) => void;
}) {
  const isActive = hoveredSlug === person.slug;
  const isDimmed = hoveredSlug !== null && !isActive;

  return (
    <div
      className={cn("group cursor-default transition-opacity duration-300", isDimmed ? "opacity-45" : "opacity-100")}
      onMouseEnter={() => onHover(person.slug)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center gap-3">
        <span className={cn("h-3 w-4 rounded-[5px] bg-white/10 transition-[width,background-color] duration-300", isActive && "w-6 bg-energy")} />
        <h3 className={cn("text-lg font-semibold leading-none tracking-tight transition-colors duration-300", isActive ? "text-mist" : "text-mist/70")}>{person.name}</h3>
        <a href={person.linkedin} aria-label={`${person.name} LinkedIn`} className={cn("ml-0.5 rounded-full p-1 text-mist/40 transition-[transform,opacity,color,background-color] duration-200 hover:bg-white/10 hover:text-energy", isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0")}>
          <ExternalLink size={13} />
        </a>
      </div>
      <p className="mt-2 pl-7 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-mist/50">{person.role}</p>
      <p className="mt-3 max-w-md pl-7 text-sm leading-relaxed text-mist/60">{person.specialism}</p>
      <div className="mt-4 border-t border-white/10 pl-0" />
    </div>
  );
}
