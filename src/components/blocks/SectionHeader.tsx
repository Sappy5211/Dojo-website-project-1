import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={cn("mb-12", align === "center" && "mx-auto max-w-3xl text-center")}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-energy">{eyebrow}</p>
      ) : null}
      <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1] tracking-tight">{title}</h2>
      {intro ? (
        <p className={cn("mt-5 max-w-2xl text-base leading-relaxed md:text-[1.0625rem]", light ? "text-ink-soft/70" : "text-mist/70", align === "center" && "mx-auto")}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}
