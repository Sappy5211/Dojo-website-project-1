import type { Metadata } from "next";
import { CTABand } from "@/components/blocks/CTABand";
import { IconGlyph } from "@/components/blocks/IconGlyph";
import { PersonGlowCard } from "@/components/blocks/PersonGlowCard";
import { ResponsibilityMap } from "@/components/blocks/ResponsibilityMap";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { GlowCard } from "@/components/fx/GlowCard";
import { CurrentBackground } from "@/components/fx/CurrentBackground";
import { home, meta, people, ui } from "@/content";

export const metadata: Metadata = {
  title: meta.people.title,
  description: meta.people.description,
  openGraph: { title: meta.people.title },
  alternates: { canonical: "/people" },
};

export default function PeoplePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-36 text-mist">
        <CurrentBackground />
        <div className="container-eneriq relative z-10 py-24">
          <SectionHeader eyebrow={ui.peopleSections.eyebrow} title={people.hero.title} intro={people.hero.intro} />
        </div>
      </section>

      {/* Leadership — photo-fill glow cards */}
      <section className="bg-ink py-24 text-mist lg:py-32">
        <div className="container-eneriq">
          <SectionHeader title={ui.peopleSections.leadershipTitle} intro={ui.peopleSections.leadershipIntro} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {people.leadership.map((person) => (
              <PersonGlowCard key={person.slug} person={person} />
            ))}
          </div>
        </div>
      </section>

      {/* Areas of responsibility */}
      <section className="bg-ink py-24 text-mist lg:py-32">
        <div className="container-eneriq">
          <SectionHeader title={ui.peopleSections.responsibilityTitle} intro={ui.peopleSections.responsibilityIntro} />
          <ResponsibilityMap people={people.leadership} responsibilities={people.responsibilities} />
        </div>
      </section>

      {/* Decision-making philosophy — glow cards */}
      <section className="bg-ink py-24 text-mist lg:py-32">
        <div className="container-eneriq">
          <SectionHeader title={ui.peopleSections.philosophyTitle} intro={ui.peopleSections.philosophyIntro} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {people.philosophy.map((item) => (
              <GlowCard key={item.title} className="h-full p-6">
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-energy/10 text-energy">
                  <IconGlyph name={item.icon} />
                </div>
                <h3 className="text-lg font-semibold text-mist">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist/65">{item.desc}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      <CTABand {...home.closingCTA} />
    </>
  );
}
