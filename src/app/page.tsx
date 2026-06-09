import type { Metadata } from "next";
import Link from "next/link";
import { CapabilityCard } from "@/components/blocks/CapabilityCard";
import { CTABand } from "@/components/blocks/CTABand";
import { FocusAreaCard } from "@/components/blocks/FocusAreaCard";
import { HomePeopleShowcase } from "@/components/blocks/HomePeopleShowcase";
import { TheCurrentSection } from "@/components/blocks/TheCurrentSection";
import { PressureCard } from "@/components/blocks/PressureCard";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { SectorCard } from "@/components/blocks/SectorCard";
import { StepCard } from "@/components/blocks/StepCard";
import { ValuesNetwork } from "@/components/blocks/ValuesNetwork";
import { CurrentLine } from "@/components/fx/CurrentLine";
import { HeroBlurText } from "@/components/fx/HeroBlurText";
import { ParticleHeroBackground } from "@/components/fx/ParticleHeroBackground";
import { Reveal } from "@/components/fx/Reveal";
import { RotatingEarth } from "@/components/fx/RotatingEarth";
import { getPeopleBySlugs, home, meta, sectors, ui } from "@/content";

export const metadata: Metadata = {
  title: meta.home.title,
  description: meta.home.description,
  openGraph: { title: meta.home.title },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const leaders = getPeopleBySlugs(home.peopleTeaser.peopleSlugs);
  const sectorTeasers = sectors.sectorList.filter((sector) => home.sectorsTeaser.sectorSlugs.includes(sector.slug));

  return (
    <>
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink pt-24 text-mist">
        <ParticleHeroBackground />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,15,13,0.4),rgba(10,15,13,0.08)_44%,rgba(10,15,13,0.92))]"
          aria-hidden
        />
        <div className="container-eneriq pointer-events-none relative z-10 flex flex-col items-center py-24 text-center">
          <Reveal>
            <p className="mb-7 text-xs font-semibold uppercase tracking-[0.3em] text-energy">{home.hero.eyebrow}</p>
          </Reveal>
          <h1 className="mx-auto max-w-5xl text-[clamp(2.75rem,6.5vw,5rem)] font-semibold leading-[1.04] tracking-tight">
            <HeroBlurText
              segments={[
                { text: home.hero.h1Start },
                { text: `${home.hero.h1Accent}${home.hero.h1End}`, accent: true },
              ]}
            />
          </h1>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-mist/72">{home.hero.subline}</p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="pointer-events-auto mt-11 flex flex-wrap justify-center gap-4">
              <Link href={home.hero.primary.href} className="cta-lift rounded-full bg-gradient-to-r from-energy via-energy-bright to-cyan px-7 py-3 font-semibold text-ink shadow-[0_1rem_2.5rem_rgba(16,185,129,0.24)]">{home.hero.primary.label}</Link>
              <Link href={home.hero.secondary.href} className="cta-lift rounded-full border border-white/10 bg-white/5 px-7 py-3 font-semibold text-mist hover:border-energy/40 hover:bg-white/10">{home.hero.secondary.label}</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-24 text-mist lg:py-32">
        <div className="container-eneriq relative z-10 grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeader title={home.purpose.title} intro={home.purpose.body} />
            <Reveal>
              <p className="mt-6 max-w-xl text-xl leading-relaxed text-mist/80">{home.purpose.belief}</p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <RotatingEarth />
          </Reveal>
        </div>
      </section>

      <TheCurrentSection />

      <section className="relative bg-ink py-24 text-mist lg:py-32">
        <CurrentLine className="pointer-events-none absolute left-1/2 top-16 h-[calc(100%-8rem)] w-32 -translate-x-1/2 opacity-30" d="M50 0 C20 120 80 220 50 350 C20 460 80 520 50 600" />
        <div className="container-eneriq">
          <SectionHeader eyebrow={ui.homeSections.whyEyebrow} title={ui.homeSections.whyTitle} intro={ui.homeSections.whyIntro} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {home.pressures.map((pressure) => <PressureCard key={pressure.title} pressure={pressure} />)}
          </div>
        </div>
      </section>

      <ValuesNetwork values={home.values} />

      <section className="bg-paper py-24 text-ink-soft lg:py-32">
        <div className="container-eneriq">
          <SectionHeader title={home.peopleTeaser.title} intro={home.peopleTeaser.statement} light />
          <HomePeopleShowcase people={leaders} />
        </div>
      </section>

      <section className="bg-ink py-24 text-mist lg:py-32">
        <div className="container-eneriq">
          <SectionHeader title={ui.homeSections.focusTitle} intro={ui.homeSections.focusIntro} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {home.focusAreas.map((area) => <FocusAreaCard key={area.title} area={area} />)}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 text-ink-soft lg:py-32">
        <div className="container-eneriq">
          <SectionHeader title={ui.homeSections.capabilityTitle} intro={ui.homeSections.capabilityIntro} light />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {home.capabilitiesTeaser.map((capability, index) => <CapabilityCard key={capability.title} capability={capability} index={index} light />)}
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-mist lg:py-32">
        <div className="container-eneriq">
          <SectionHeader title={home.sectorsTeaser.title} intro={ui.homeSections.sectorIntro} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectorTeasers.map((sector) => <SectorCard key={sector.slug} sector={sector} />)}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 text-ink-soft lg:py-32">
        <div className="container-eneriq">
          <SectionHeader title={ui.homeSections.methodTitle} intro={ui.homeSections.methodIntro} light />
          <div className="grid gap-6 md:grid-cols-4">
            {home.howWeWorkTeaser.map((step, index) => <StepCard key={step.id} step={step} index={index} light />)}
          </div>
        </div>
      </section>

      <CTABand {...home.closingCTA} aurora />
    </>
  );
}
