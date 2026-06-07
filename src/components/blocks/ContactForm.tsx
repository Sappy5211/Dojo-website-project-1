"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contact, sectors, ui } from "@/content";

export function ContactForm() {
  const [area, setArea] = useState(contact.routingOptions[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [sent, setSent] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="grid gap-3">
        {contact.routingOptions.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setArea(option)}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left text-sm text-mist/75 transition-colors hover:border-energy/40 hover:text-mist"
          >
            {option}
          </button>
        ))}
      </div>
      <form
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8"
        onSubmit={(event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          const nextErrors: typeof errors = {};
          const email = String(form.get("email") ?? "");
          if (!String(form.get("name") ?? "").trim()) nextErrors.name = contact.formFields.nameError;
          if (!email.includes("@")) nextErrors.email = contact.formFields.emailError;
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
        }}
      >
        {Object.keys(errors).length > 0 ? (
          <p className="mb-5 rounded-2xl border border-amber/30 bg-amber/10 px-4 py-3 text-sm text-amber" role="alert">
            {ui.labels.formError}
          </p>
        ) : null}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <Label htmlFor="name">{contact.formFields.name} <span className="text-energy">{ui.labels.required}</span></Label>
            <Input ref={nameRef} id="name" name="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} className="mt-2 min-h-11 border-white/10 bg-ink/60" />
            {errors.name ? <p id="name-error" className="mt-2 text-sm text-amber">{errors.name}</p> : null}
          </div>
          <div>
            <Label htmlFor="organisation">{contact.formFields.organisation}</Label>
            <Input id="organisation" name="organisation" className="mt-2 min-h-11 border-white/10 bg-ink/60" />
          </div>
          <div>
            <Label htmlFor="email">{contact.formFields.email} <span className="text-energy">{ui.labels.required}</span></Label>
            <Input ref={emailRef} id="email" name="email" type="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} className="mt-2 min-h-11 border-white/10 bg-ink/60" />
            {errors.email ? <p id="email-error" className="mt-2 text-sm text-amber">{errors.email}</p> : null}
          </div>
          <div>
            <Label htmlFor="sector">{contact.formFields.sector}</Label>
            <select id="sector" name="sector" className="mt-2 min-h-11 w-full rounded-md border border-white/10 bg-ink/60 px-3 text-sm">
              {sectors.sectorList.map((sector) => (
                <option key={sector.slug}>{sector.name}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="area">{contact.formFields.area}</Label>
            <select id="area" name="area" value={area} onChange={(event) => setArea(event.target.value)} className="mt-2 min-h-11 w-full rounded-md border border-white/10 bg-ink/60 px-3 text-sm">
              {contact.routingOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="message">{contact.formFields.message} <span className="text-energy">{ui.labels.required}</span></Label>
            <Textarea ref={messageRef} id="message" name="message" value={message} onChange={(event) => setMessage(event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} className="mt-2 min-h-36 border-white/10 bg-ink/60" />
            {errors.message ? <p id="message-error" className="mt-2 text-sm text-amber">{errors.message}</p> : null}
          </div>
        </div>
        {sent ? (
          <p className="mt-5 rounded-2xl border border-energy/30 bg-energy/10 px-4 py-3 text-sm text-energy" role="status" aria-live="polite">
            {ui.labels.messageSent} {contact.reassurance}
          </p>
        ) : null}
        <Button className="cta-lift mt-6 min-h-11 rounded-full bg-gradient-to-r from-energy via-energy-bright to-cyan px-7 text-white hover:opacity-95">
          {contact.formFields.submit}
        </Button>
      </form>
    </div>
  );
}
