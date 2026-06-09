import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTABand } from "@/components/blocks/CTABand";
import { PersonCard } from "@/components/blocks/PersonCard";
import { PressureCard } from "@/components/blocks/PressureCard";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { SectorHowWeHelp } from "@/components/blocks/SectorHowWeHelp";
import { SectorAIOpportunities } from "@/components/blocks/SectorAIOpportunities";
import { CurrentBackground } from "@/components/fx/CurrentBackground";
import { Reveal } from "@/components/fx/Reveal";
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
      {/* ── Hero (always dark) ───────────────────────────────── */}
      <section className="dark relative overflow-hidden bg-ink pt-36 text-mist">
        <CurrentBackground stroke={sector.accent} />

        <div className="container-eneriq relative z-10 py-24">
          <Reveal>
            <p
              className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: sector.accent }}
            >
              {sector.hero.eyebrow}
            </p>
            <h1 className="max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight">
              {sector.name}
            </h1>
            <span
              className="mt-5 block h-1 w-20 rounded-full"
              style={{ backgroundColor: sector.accent }}
              aria-hidden
            />
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-mist/70">
              {sector.hero.statement}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Pressures (editorial — flips) ────────────────────── */}
      <section className="bg-surface-2 py-24 lg:py-32">
        <div className="container-eneriq">
          <Reveal>
            <SectionHeader
              title={ui.sectorDetailSections.pressuresTitle}
              intro={ui.sectorDetailSections.pressuresIntro}
            />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sector.pressures.map((pressure) => (
              <PressureCard key={pressure.title} pressure={pressure} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Key Decisions (editorial — flips) ────────────────── */}
      <section className="bg-surface py-24 lg:py-32">
        <div className="container-eneriq">
          <Reveal>
            <SectionHeader
              title={ui.sectorDetailSections.decisionsTitle}
              intro={ui.sectorDetailSections.decisionsIntro}
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {sector.keyDecisions.map((decision, index) => (
              <Reveal key={`${sector.slug}-decision-${index}`} delay={index * 0.05}>
                <article className="flex h-full flex-col rounded-2xl border border-hairline bg-panel p-6">
                  <span
                    className="mb-4 inline-block h-[3px] w-10 rounded-full"
                    style={{ backgroundColor: sector.accent }}
                    aria-hidden
                  />
                  <h3 className="text-base font-semibold text-content">{decision.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-content-muted">{decision.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Help (editorial — flips) ──────────────────── */}
      <section className="bg-surface-2 py-24 lg:py-32">
        <div className="container-eneriq">
          <Reveal>
            <SectionHeader
              title={ui.sectorDetailSections.helpTitle}
              intro={ui.sectorDetailSections.helpIntro}
            />
          </Reveal>
          <SectorHowWeHelp rows={sector.howWeHelp} accent={sector.accent} />
        </div>
      </section>

      {/* ── AI / Data Opportunities (editorial — flips) ──────── */}
      <section className="bg-surface py-24 lg:py-32">
        <div className="container-eneriq">
          <Reveal>
            <SectionHeader
              title={ui.sectorDetailSections.aiTitle}
              intro={ui.sectorDetailSections.aiIntro}
            />
          </Reveal>
          <SectorAIOpportunities items={sector.aiDataOpportunities} />
        </div>
      </section>

      {/* ── People + Capabilities (editorial — flips) ────────── */}
      <section className="bg-surface-2 py-24 lg:py-32">
        <div className="container-eneriq">
          <Reveal>
            <SectionHeader
              title={ui.sectorDetailSections.peopleTitle}
              intro={ui.sectorDetailSections.peopleIntro}
            />
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-3">
            {leaders.map((person) => (
              <PersonCard key={person.slug} person={person} />
            ))}
          </div>

          {sector.relatedCapabilities.length > 0 && (
            <Reveal delay={0.1}>
              <div className="mt-10 flex flex-wrap gap-3">
                {sector.relatedCapabilities.map((capability, index) => (
                  <Link
                    key={`${sector.slug}-capability-${index}`}
                    href="/what-we-do"
                    className="rounded-full border border-energy/25 bg-energy/8 px-4 py-2 text-sm text-accent-ink transition-colors hover:border-energy/50 hover:text-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy focus-visible:ring-offset-2 focus-visible:ring-offset-surface-2"
                  >
                    {capability}
                  </Link>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── CTA (always dark) ────────────────────────────────── */}
      <CTABand {...sector.cta} />
    </>
  );
}
