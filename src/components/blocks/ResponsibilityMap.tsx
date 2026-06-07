"use client";

import { Person } from "@/content";
import { CurrentLine } from "../fx/CurrentLine";

export function ResponsibilityMap({ people, responsibilities }: { people: Person[]; responsibilities: string[] }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-10">
      <div className="hidden min-h-[30rem] md:block">
        <CurrentLine
          className="absolute inset-8 h-[calc(100%-4rem)] w-[calc(100%-4rem)]"
          viewBox="0 0 100 100"
          d="M15 20 C40 20 42 36 70 28 M15 50 C42 50 48 48 72 50 M15 80 C42 80 44 68 70 72"
          nodes={[
            { x: 15, y: 20 },
            { x: 70, y: 28 },
            { x: 15, y: 50 },
            { x: 72, y: 50 },
            { x: 15, y: 80 },
            { x: 70, y: 72 },
          ]}
        />
        <div className="absolute left-10 top-12 space-y-16">
          {people.map((person) => (
            <div key={person.slug} className="flex items-center gap-3 rounded-full border border-white/10 bg-ink px-4 py-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-energy to-cyan text-sm font-bold text-white">{person.initials}</span>
              <span>{person.name}</span>
            </div>
          ))}
        </div>
        <div className="absolute right-10 top-10 grid max-w-xs gap-4">
          {responsibilities.map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-ink/80 px-5 py-4 text-sm text-mist/75">{item}</div>
          ))}
        </div>
      </div>
      <div className="space-y-3 md:hidden">
        {people.map((person) => (
          <div key={person.slug} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="font-semibold">{person.name}</p>
            <p className="mt-1 text-sm text-energy">{person.responsibility}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
