import type { Metadata } from "next";
import { CTABand } from "@/components/blocks/CTABand";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { SectorCard } from "@/components/blocks/SectorCard";
import { SectorThemes } from "@/components/blocks/SectorThemes";
import { SectorDecisionMap } from "@/components/blocks/SectorDecisionMap";
import { CurrentLine } from "@/components/fx/CurrentLine";
import { home, meta, sectors, ui } from "@/content";

export const metadata: Metadata = {
  title: meta.sectors.title,
  description: meta.sectors.description,
  openGraph: { title: meta.sectors.title },
  alternates: { canonical: "/sectors" },
};

export default function SectorsPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink pt-36 text-mist">
        {/* subtle background current */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.12]" aria-hidden>
          <CurrentLine
            className="absolute left-1/2 top-0 h-full w-[36rem] -translate-x-1/2"
            viewBox="0 0 200 800"
            d="M30 0 C130 80 70 200 150 310 C50 430 110 530 160 680 C100 730 60 770 170 800"
            nodes={[
              { x: 30, y: 0 },
              { x: 150, y: 310 },
              { x: 160, y: 680 },
            ]}
            width={1.2}
          />
        </div>

        <div className="container-eneriq relative z-10 py-24">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-energy">
            {ui.sectorsSections.eyebrow}
          </p>
          <h1 className="max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight">
            {sectors.landing.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist/70">
            {sectors.landing.hero.intro}
          </p>

          {/* sector grid */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.sectorList.map((sector) => (
              <SectorCard key={sector.slug} sector={sector} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Cross-themes ─────────────────────────────────── */}
      <section className="bg-ink-soft py-24 text-mist lg:py-32">
        <div className="container-eneriq">
          <SectionHeader
            title={ui.sectorsSections.themesTitle}
            intro={ui.sectorsSections.themesIntro}
          />
          <SectorThemes themes={sectors.landing.crossThemes} />
        </div>
      </section>

      {/* ── Decision map ─────────────────────────────────── */}
      <section className="bg-ink py-24 text-mist lg:py-32">
        <div className="container-eneriq">
          <SectionHeader
            title={ui.sectorsSections.decisionTitle}
            intro={ui.sectorsSections.decisionIntro}
          />
          <SectorDecisionMap decisions={sectors.landing.decisionMap} />
        </div>
      </section>

      <CTABand {...home.closingCTA} />
    </>
  );
}
