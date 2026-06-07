import type { Metadata } from "next";
import { ContactForm } from "@/components/blocks/ContactForm";
import { IconGlyph } from "@/components/blocks/IconGlyph";
import { SectionHeader } from "@/components/blocks/SectionHeader";
import { CurrentBackground } from "@/components/fx/CurrentBackground";
import { contact, meta, ui } from "@/content";

export const metadata: Metadata = {
  title: meta.contact.title,
  description: meta.contact.description,
  openGraph: { title: meta.contact.title, images: ["/og/contact.png"] },
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-36 text-mist">
        <CurrentBackground />
        <div className="container-eneriq relative z-10 py-24">
          <SectionHeader eyebrow={ui.contactSections.eyebrow} title={contact.hero.title} intro={contact.hero.line} />
        </div>
      </section>

      <section className="bg-ink py-24 text-mist lg:py-32">
        <div className="container-eneriq">
          <SectionHeader title={ui.contactSections.routingTitle} intro={ui.contactSections.routingIntro} />
          <ContactForm />
        </div>
      </section>

      <section className="bg-paper py-24 text-ink-soft lg:py-32">
        <div className="container-eneriq">
          <SectionHeader title={ui.contactSections.detailsTitle} intro={contact.reassurance} light />
          <div className="grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-ink-soft/10 bg-white p-6">
              <IconGlyph name="Mail" className="mb-5 h-5 w-5 text-energy" />
              <p>{contact.directDetails.email}</p>
            </article>
            <article className="rounded-2xl border border-ink-soft/10 bg-white p-6">
              <IconGlyph name="ExternalLink" className="mb-5 h-5 w-5 text-energy" />
              <p>{contact.directDetails.linkedin}</p>
            </article>
            <article className="rounded-2xl border border-ink-soft/10 bg-white p-6">
              <IconGlyph name="MapPin" className="mb-5 h-5 w-5 text-energy" />
              <p>{contact.directDetails.location}</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
