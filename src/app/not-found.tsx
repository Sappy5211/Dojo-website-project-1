import Link from "next/link";
import { ui } from "@/content";

export default function NotFound() {
  return (
    <section className="bg-ink pt-36 text-mist">
      <div className="container-eneriq py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-energy">{ui.notFound.eyebrow}</p>
        <h1 className="mt-4 text-[clamp(2.5rem,6vw,4.5rem)] font-semibold tracking-tight">{ui.notFound.title}</h1>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-gradient-to-r from-energy via-energy-bright to-cyan px-7 py-3 font-semibold text-ink">
          {ui.labels.home}
        </Link>
      </div>
    </section>
  );
}
