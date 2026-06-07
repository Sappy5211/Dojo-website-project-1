import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTABand } from "@/components/blocks/CTABand";
import { PersonCard } from "@/components/blocks/PersonCard";
import { PressureCard } from "@/components/blocks/PressureCard";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { CurrentBackground } from "@/components/fx/CurrentBackground";
import { getPeopleBySlugs, getSectorBySlug, sectors, ui } from "@/content";

export function generateStaticParams() {
  return sectors.sectorList.map((sector) => ({ slug: sector.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSectorBySlug(slug);
  return {
    title: sector?.name ?? ui.sectorDetailSections.fallbackTitle,
    description: ui.sectorDetailSections.fallbackDescription,
    alternates: { canonical: `/sectors/${slug}` },
  };
}

export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sector = getSectorBySlug(slug);
  if (!sector) notFound();
  const leaders = getPeopleBySlugs(sector.relevantPeople);

  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-36 text-mist">
        <CurrentBackground stroke={sector.accent} />
        <div className="container-eneriq relative z-10 py-24">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: sector.accent }}>{sector.hero.eyebrow}</p>
          <h1 className="max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight">{sector.name}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-mist/70">{sector.hero.statement}</p>
        </div>
      </section>

      <section className="bg-paper py-24 text-ink-soft lg:py-32">
        <div className="container-eneriq">
          <SectionHeader title={ui.sectorDetailSections.pressuresTitle} intro={ui.sectorDetailSections.pressuresIntro} light />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sector.pressures.map((pressure) => <PressureCard key={pressure.title} pressure={pressure} light />)}
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-mist lg:py-32">
        <div className="container-eneriq">
          <SectionHeader title={ui.sectorDetailSections.decisionsTitle} intro={ui.sectorDetailSections.decisionsIntro} />
          <div className="grid gap-6 md:grid-cols-3">
            {sector.keyDecisions.map((decision, index) => (
              <article key={`${sector.slug}-decision-${index}`} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-semibold">{decision.title}</h3>
                <p className="mt-3 text-sm text-mist/68">{decision.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 text-ink-soft lg:py-32">
        <div className="container-eneriq">
          <SectionHeader title={ui.sectorDetailSections.helpTitle} intro={ui.sectorDetailSections.helpIntro} light />
          <div className="overflow-hidden rounded-3xl border border-ink-soft/10 bg-white">
            {sector.howWeHelp.map((row, index) => (
              <div key={`${sector.slug}-help-${index}`} className="grid gap-4 border-b border-ink-soft/10 p-5 last:border-b-0 md:grid-cols-3">
                <p>{row.challenge}</p>
                <p className="text-ink-soft/70">{row.capability}</p>
                <p className="text-ink-soft/70">{row.outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-mist lg:py-32">
        <div className="container-eneriq">
          <SectionHeader title={ui.sectorDetailSections.aiTitle} intro={ui.sectorDetailSections.aiIntro} />
          <div className="grid gap-6 md:grid-cols-2">
            {sector.aiDataOpportunities.map((item, index) => (
              <article key={`${sector.slug}-ai-${index}`} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-semibold">{item.opportunity}</h3>
                <p className="mt-3 text-sm text-mist/68">{item.dataNote}</p>
                <p className="mt-3 text-sm text-energy">{item.oversightNote}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 text-ink-soft lg:py-32">
        <div className="container-eneriq">
          <SectionHeader title={ui.sectorDetailSections.peopleTitle} intro={ui.sectorDetailSections.peopleIntro} light />
          <div className="grid gap-6 lg:grid-cols-3">
            {leaders.map((person) => <PersonCard key={person.slug} person={person} light />)}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {sector.relatedCapabilities.map((capability, index) => (
              <Link key={`${sector.slug}-capability-${index}`} href="/what-we-do" className="rounded-full border border-ink-soft/10 bg-white px-4 py-2 text-sm text-ink-soft/75">{capability}</Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand {...sector.cta} />
    </>
  );
}
