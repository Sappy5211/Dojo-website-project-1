import type { Metadata } from "next";
import { CTABand } from "@/components/blocks/CTABand";
import { FocusAreaCard } from "@/components/blocks/FocusAreaCard";
import { PersonCard } from "@/components/blocks/PersonCard";
import { ResponsibilityMap } from "@/components/blocks/ResponsibilityMap";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { CurrentBackground } from "@/components/fx/CurrentBackground";
import { home, meta, people, ui } from "@/content";

export const metadata: Metadata = {
  title: meta.people.title,
  description: meta.people.description,
  openGraph: { title: meta.people.title, images: ["/og/people.png"] },
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

      <section className="bg-paper py-24 text-ink-soft lg:py-32">
        <div className="container-eneriq">
          <SectionHeader title={ui.peopleSections.leadershipTitle} intro={ui.peopleSections.leadershipIntro} light />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {people.leadership.map((person) => <PersonCard key={person.slug} person={person} light />)}
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-mist lg:py-32">
        <div className="container-eneriq">
          <SectionHeader title={ui.peopleSections.responsibilityTitle} intro={ui.peopleSections.responsibilityIntro} />
          <ResponsibilityMap people={people.leadership} responsibilities={people.responsibilities} />
        </div>
      </section>

      <section className="bg-paper py-24 text-ink-soft lg:py-32">
        <div className="container-eneriq">
          <SectionHeader title={ui.peopleSections.philosophyTitle} intro={ui.peopleSections.philosophyIntro} light />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {people.philosophy.map((item) => (
              <FocusAreaCard key={item.title} area={{ title: item.title, desc: item.desc, icon: item.icon }} light />
            ))}
          </div>
        </div>
      </section>

      <CTABand {...home.closingCTA} />
    </>
  );
}
