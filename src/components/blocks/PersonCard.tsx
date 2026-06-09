"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Person } from "@/content";
import { DUR, EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function PersonCard({ person, light = false }: { person: Person; light?: boolean }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: DUR.micro, ease: EASE_OUT }}
      className={cn("motion-stable flex min-h-[23rem] flex-col rounded-2xl border p-6", light ? "light-panel text-ink-soft" : "premium-panel")}
    >
      <div className="mb-6 h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br from-energy to-energy-bright">
        {person.avatar ? (
          <Image src={person.avatar} alt={person.name} width={96} height={96} className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full w-full place-items-center text-xl font-bold text-ink">{person.initials}</div>
        )}
      </div>
      <h3 className="text-base font-semibold">{person.name}</h3>
      <p className="mt-1 text-sm text-energy">{person.role}</p>
      <p className={cn("mt-1 text-xs", light ? "text-ink-soft/55" : "text-mist/55")}>{person.specialism}</p>
      <p className={cn("mt-5 line-clamp-3 text-sm leading-relaxed", light ? "text-ink-soft/70" : "text-mist/68")}>{person.bio}</p>
      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <Badge variant="outline" className="border-energy/30 text-energy">{person.responsibility}</Badge>
        <a href={person.linkedin} aria-label="LinkedIn" className="text-energy hover:text-cyan">
          <ExternalLink size={18} />
        </a>
      </div>
    </motion.article>
  );
}
