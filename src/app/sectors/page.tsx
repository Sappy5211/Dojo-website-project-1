import type { Metadata } from "next";
import { CTABand } from "@/components/blocks/CTABand";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { SectorCard } from "@/components/blocks/SectorCard";
import { CurrentLine } from "@/components/fx/CurrentLine";
import { home, meta, sectors, ui } from "@/content";

export const metadata: Metadata = {
  title: meta.sectors.title,
  description: meta.sectors.description,
  openGraph: { title: meta.sectors.title, images: ["/og/sectors.png"] },
  alternates: { canonical: "/sectors" },
};

export default function SectorsPage() {
  return (
    <>
      <section className="bg-ink pt-36 text-mist">
        <div className="container-eneriq py-24">
          <SectionHeader eyebrow={ui.sectorsSections.eyebrow} title={sectors.landing.hero.title} intro={sectors.landing.hero.intro} />
          <div className="relative mt-12">
            <CurrentLine className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-80 -translate-x-1/2 opacity-40 lg:block" viewBox="0 0 220 520" d="M110 20 C20 100 30 200 70 250 M110 20 C210 120 190 220 150 250 M110 20 C100 210 120 360 110 500" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sectors.sectorList.map((sector) => <SectorCard key={sector.slug} sector={sector} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 text-ink-soft lg:py-32">
        <div className="container-eneriq">
          <SectionHeader title={ui.sectorsSections.themesTitle} intro={ui.sectorsSections.themesIntro} light />
          <div className="flex flex-wrap gap-3">
            {sectors.landing.crossThemes.map((theme) => (
              <span key={theme} className="rounded-full border border-ink-soft/10 bg-white px-4 py-2 text-sm text-ink-soft/75">{theme}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-mist lg:py-32">
        <div className="container-eneriq">
          <SectionHeader title={ui.sectorsSections.decisionTitle} intro={ui.sectorsSections.decisionIntro} />
          <div className="grid gap-6 md:grid-cols-3">
            {sectors.landing.decisionMap.map((decision, index) => (
              <article key={`decision-${index}`} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-semibold">{decision.title}</h3>
                <p className="mt-3 text-sm text-mist/68">{decision.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand {...home.closingCTA} />
    </>
  );
}
