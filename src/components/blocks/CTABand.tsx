import Link from "next/link";
import { AuroraShaderBackground } from "../fx/AuroraShaderBackground";
import { CurrentLine } from "../fx/CurrentLine";

export function CTABand({ heading, line, cta, aurora = false }: { heading: string; line: string; cta: { label: string; href: string }; aurora?: boolean }) {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-mist lg:py-32">
      {aurora ? <AuroraShaderBackground opacity={0.35} /> : null}
      <div className="absolute inset-0 dark-scrim" aria-hidden />
      <CurrentLine className="pointer-events-none absolute left-1/2 top-8 h-28 w-40 -translate-x-1/2 opacity-70" viewBox="0 0 120 120" d="M10 10 C55 40 65 78 110 108" nodes={[{ x: 110, y: 108 }]} />
      <div className="container-eneriq relative z-10 text-center">
        <h2 className="mx-auto max-w-3xl text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1] tracking-tight">{heading}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-mist/70">{line}</p>
        <Link href={cta.href} className="mt-9 inline-flex rounded-full bg-gradient-to-r from-energy via-energy-bright to-cyan px-7 py-3 font-semibold text-white transition-transform hover:scale-[1.03]">
          {cta.label}
        </Link>
      </div>
    </section>
  );
}
