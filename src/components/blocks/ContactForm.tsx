"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { GlowCard } from "@/components/fx/GlowCard";
import { IconGlyph } from "@/components/blocks/IconGlyph";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contact, sectors, ui } from "@/content";

// Routing-option icon names aligned with content order
const ROUTING_ICONS = ["Compass", "BrainCircuit", "Landmark", "Network"] as const;

const STAGGER_BASE = 0.07;

export function ContactForm() {
  const [area, setArea] = useState(contact.routingOptions[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [sent, setSent] = useState(false);
  const reduce = useReducedMotion();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextErrors: typeof errors = {};
    const emailVal = String(form.get("email") ?? "").trim();
    const nameVal = String(form.get("name") ?? "").trim();

    if (!nameVal) nextErrors.name = contact.formFields.nameError;
    if (!emailVal || !emailVal.includes("@") || !emailVal.includes("."))
      nextErrors.email = contact.formFields.emailError;
    if (!message.trim()) nextErrors.message = contact.formFields.messageError;

    setErrors(nextErrors);
    setSent(false);

    if (Object.keys(nextErrors).length > 0) {
      if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.email) emailRef.current?.focus();
      else messageRef.current?.focus();
      return;
    }
    setSent(true);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
      {/* ── Routing tiles ──────────────────────────────────────── */}
      <div className="grid content-start gap-3" role="radiogroup" aria-label="Choose conversation topic">
        {contact.routingOptions.map((option, i) => {
          const selected = area === option;
          return (
            <motion.div
              key={option}
              initial={reduce ? {} : { opacity: 0, x: -16 }}
              animate={reduce ? {} : { opacity: 1, x: 0 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1], delay: i * STAGGER_BASE }}
            >
              <GlowCard
                glowColor="green"
                className={
                  selected
                    ? "ring-2 ring-energy/60 ring-offset-1 ring-offset-ink"
                    : ""
                }
              >
                <button
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setArea(option)}
                  className="flex w-full items-center gap-4 rounded-2xl p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  <span
                    className={
                      selected
                        ? "text-energy"
                        : "text-mist/40"
                    }
                    aria-hidden
                  >
                    <IconGlyph name={ROUTING_ICONS[i] ?? "Compass"} className="h-5 w-5" />
                  </span>
                  <span
                    className={
                      selected
                        ? "text-sm font-semibold text-mist"
                        : "text-sm text-mist/60"
                    }
                  >
                    {option}
                  </span>
                  {selected && (
                    <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-energy" aria-hidden />
                  )}
                </button>
              </GlowCard>
            </motion.div>
          );
        })}
      </div>

      {/* ── Form ───────────────────────────────────────────────── */}
      <motion.form
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8"
        onSubmit={handleSubmit}
        noValidate
        initial={reduce ? {} : { opacity: 0, y: 20 }}
        animate={reduce ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        {/* Global error summary */}
        {Object.keys(errors).length > 0 && (
          <p
            className="mb-5 rounded-2xl border border-amber/30 bg-amber/10 px-4 py-3 text-sm text-amber"
            role="alert"
            aria-live="assertive"
          >
            {ui.labels.formError}
          </p>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="mb-2 block text-sm font-medium text-mist/80">
              {contact.formFields.name}{" "}
              <span className="text-energy" aria-label={ui.labels.required}>*</span>
            </Label>
            <Input
              ref={nameRef}
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder={`${contact.formFields.name}…`}
              aria-required="true"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="min-h-11 border-white/10 bg-ink/60 text-mist placeholder:text-mist/30 focus-visible:ring-energy"
            />
            {errors.name && (
              <p id="name-error" role="alert" className="mt-1.5 text-xs text-amber">
                {errors.name}
              </p>
            )}
          </div>

          {/* Organisation */}
          <div>
            <Label htmlFor="organisation" className="mb-2 block text-sm font-medium text-mist/80">
              {contact.formFields.organisation}
            </Label>
            <Input
              id="organisation"
              name="organisation"
              type="text"
              autoComplete="organization"
              placeholder={`${contact.formFields.organisation}…`}
              className="min-h-11 border-white/10 bg-ink/60 text-mist placeholder:text-mist/30 focus-visible:ring-energy"
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="mb-2 block text-sm font-medium text-mist/80">
              {contact.formFields.email}{" "}
              <span className="text-energy" aria-label={ui.labels.required}>*</span>
            </Label>
            <Input
              ref={emailRef}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder={`${contact.formFields.email}…`}
              aria-required="true"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="min-h-11 border-white/10 bg-ink/60 text-mist placeholder:text-mist/30 focus-visible:ring-energy"
            />
            {errors.email && (
              <p id="email-error" role="alert" className="mt-1.5 text-xs text-amber">
                {errors.email}
              </p>
            )}
          </div>

          {/* Sector */}
          <div>
            <Label htmlFor="sector" className="mb-2 block text-sm font-medium text-mist/80">
              {contact.formFields.sector}
            </Label>
            <select
              id="sector"
              name="sector"
              autoComplete="off"
              className="mt-0 min-h-11 w-full rounded-md border border-white/10 bg-ink/60 px-3 py-2 text-sm text-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              {sectors.sectorList.map((sector) => (
                <option key={sector.slug} value={sector.slug}>
                  {sector.name}
                </option>
              ))}
            </select>
          </div>

          {/* Area of interest */}
          <div className="md:col-span-2">
            <Label htmlFor="area" className="mb-2 block text-sm font-medium text-mist/80">
              {contact.formFields.area}
            </Label>
            <select
              id="area"
              name="area"
              value={area}
              autoComplete="off"
              onChange={(e) => setArea(e.target.value)}
              className="mt-0 min-h-11 w-full rounded-md border border-white/10 bg-ink/60 px-3 py-2 text-sm text-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              {contact.routingOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <Label htmlFor="message" className="mb-2 block text-sm font-medium text-mist/80">
              {contact.formFields.message}{" "}
              <span className="text-energy" aria-label={ui.labels.required}>*</span>
            </Label>
            <Textarea
              ref={messageRef}
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`${contact.formFields.message}…`}
              aria-required="true"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              className="min-h-36 border-white/10 bg-ink/60 text-mist placeholder:text-mist/30 focus-visible:ring-energy"
            />
            {errors.message && (
              <p id="message-error" role="alert" className="mt-1.5 text-xs text-amber">
                {errors.message}
              </p>
            )}
          </div>
        </div>

        {/* Success */}
        {sent && (
          <p
            className="mt-5 rounded-2xl border border-energy/30 bg-energy/10 px-4 py-3 text-sm text-energy"
            role="status"
            aria-live="polite"
          >
            {ui.labels.messageSent} {contact.reassurance}
          </p>
        )}

        {/* Submit — always enabled, dark text on green */}
        <Button
          type="submit"
          className="cta-lift mt-6 min-h-11 rounded-full bg-gradient-to-r from-energy via-energy-bright to-cyan px-7 font-semibold text-ink hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          {contact.formFields.submit}
        </Button>
      </motion.form>
    </div>
  );
}
