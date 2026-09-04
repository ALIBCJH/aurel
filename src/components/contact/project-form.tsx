"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "@/components/icons";
import { businessInfo, siteConfig } from "@/config/site";

/**
 * ProjectForm — the brief.
 *
 * Fields are numbered and ruled rather than boxed: fewer borders, less visual
 * work per field, and a form that reads as a short list of questions rather
 * than a database entry screen.
 *
 * Submitting posts to `/api/contact`, which validates the brief and forwards it
 * to whatever delivery channel is configured. If that request cannot be made at
 * all — offline, blocked, the route down — the form falls back to composing a
 * `mailto:` so the visitor still has a way through. The fallback is the last
 * resort, not the mechanism: on its own it loses every lead whose device has no
 * mail client configured, and tells neither party that anything went missing.
 */
// Mirrors the disciplines actually sold, plus an escape hatch. This list has
// twice drifted out of step with `services.ts` and offered things nobody could
// buy, so: keep it in step whenever a service is added or dropped.
//
// Hand-written rather than mapped from `services`, because these are phrased
// as the thing a customer wants ("Repair a machine") rather than as the
// discipline ("Hardware Supply & Repair"). Somebody with a dead laptop does
// not recognise themselves in a service name.
const NEEDS = [
  "Repair a machine",
  "Buy equipment",
  "Network or Wi-Fi",
  "CCTV or security",
  "Software",
  "Website",
  "Move or upgrade a system",
  "Not sure yet",
];

// KES. Optional, and deliberately wide at the bottom: a great deal of what
// comes through here is a single repair, and a lowest band of "Under KES
// 50,000" would put almost every enquiry in one bucket and tell us nothing.
// If published prices ever land in `services.ts`, check these still straddle
// them — a visitor reads a price and then picks a band.
const BUDGETS = [
  "Under KES 10,000",
  "KES 10,000 – 50,000",
  "KES 50,000 – 150,000",
  "KES 150,000+",
  "Not sure yet",
];

type Status = "idle" | "sending" | "sent" | "error";

/** A numbered field: rule, mono label, and the control beneath it. */
function Field({
  index,
  label,
  htmlFor,
  error,
  children,
  className,
}: {
  index: number;
  label: string;
  htmlFor?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border-t border-rule pt-5", className)}>
      <div className="flex items-baseline gap-3">
        <span className="text-sm tabular-nums text-ink-mute">
          {String(index).padStart(2, "0")}
        </span>
        <label htmlFor={htmlFor} className="text-[0.9375rem] font-medium">
          {label}
        </label>
      </div>
      <div className="mt-2">{children}</div>
      {error && (
        <p
          id={htmlFor ? `${htmlFor}-error` : undefined}
          role="alert"
          className="mt-2 text-sm text-ink-soft"
        >
          <span aria-hidden className="mr-1.5 text-ink-mute">
            ↳
          </span>
          {error}
        </p>
      )}
    </div>
  );
}

export function ProjectForm() {
  const [needs, setNeeds] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState<string | null>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);

  function toggleNeed(need: string) {
    setNeeds((prev) =>
      prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need],
    );
  }

  /**
   * Last resort when the network is unreachable — see the component note.
   *
   * Returns false when there is no address to send to, so the caller can offer
   * the phone number instead. Opening `mailto:?subject=…` with no recipient
   * hands the visitor a blank compose window and looks like a bug, which is
   * the worst possible thing to show somebody whose enquiry has just failed.
   */
  function openMailClient(payload: Record<string, string>): boolean {
    if (!siteConfig.email) return false;

    const lines = [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone || "—"}`,
      `Company: ${payload.company}`,
      `Needs: ${needs.join(", ") || "—"}`,
      `Budget: ${payload.budget || "—"}`,
      "",
      payload.message,
    ];
    const subject = encodeURIComponent(
      `Enquiry — ${payload.name || "New enquiry"}`,
    );
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    return true;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      company: String(data.get("company") ?? ""),
      budget: String(data.get("budget") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
    };

    setStatus("sending");
    setErrors({});
    setNotice(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, needs }),
      });

      if (response.ok) {
        setStatus("sent");
        // Move the reader to the confirmation rather than leaving them looking
        // at a form that has silently emptied itself.
        requestAnimationFrame(() => confirmationRef.current?.focus());
        return;
      }

      const result = await response.json().catch(() => ({}));

      if (response.status === 422 && result.errors) {
        setErrors(result.errors);
        setStatus("idle");
        return;
      }

      setStatus("error");
      setNotice(
        result.error ??
          `Something went wrong sending that. Please try again, or call ${businessInfo.telephone}.`,
      );
    } catch {
      // The request never left the device. Hand the visitor their mail client
      // so the enquiry is not simply lost — or, where there is no address to
      // send to, the phone number, which is never not an option.
      setStatus("error");
      const opened = openMailClient(payload);
      setNotice(
        opened
          ? "We couldn't reach us from here. We've opened your email client instead."
          : `We couldn't reach us from here — your connection may be down. Please call ${businessInfo.telephone} or send us a WhatsApp message instead.`,
      );
    }
  }

  if (status === "sent") {
    return (
      <div
        ref={confirmationRef}
        tabIndex={-1}
        className="rounded-[var(--radius-xl)] bg-paper-deep p-8 outline-none sm:p-10"
      >
        <span className="text-sm font-medium text-ink-mute">Received</span>
        <h3 className="mt-4 text-[clamp(1.5rem,3.4vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
          Thank you — your enquiry is with us.
        </h3>
        {/* The urgent route is whichever channel exists. Email is blank in
            config until Mojah supplies an address, so this falls back to the
            phone rather than rendering an empty `mailto:`. */}
        <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-ink-soft">
          We read every enquiry ourselves and reply within one business day. If
          it is urgent,{" "}
          {siteConfig.email ? (
            <>
              write to{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="tap font-medium text-ink underline underline-offset-4"
              >
                {siteConfig.email}
              </a>
            </>
          ) : (
            <>
              call{" "}
              <a
                href={`tel:${businessInfo.telephone}`}
                className="tap font-medium text-ink underline underline-offset-4"
              >
                {businessInfo.telephone}
              </a>
            </>
          )}
          .
        </p>
      </div>
    );
  }

  const busy = status === "sending";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      {/* Honeypot. Hidden from sight and from assistive tech, but present in
          the DOM for anything that fills fields indiscriminately. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field index={1} label="Your name" htmlFor="name" error={errors.name}>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            enterKeyHint="next"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="Jane Mwangi"
            className="field-rule text-lg"
          />
        </Field>
        <Field index={2} label="Your email" htmlFor="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            enterKeyHint="next"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder="you@company.com"
            className="field-rule text-lg"
          />
        </Field>
      </div>

      <Field index={3} label="Phone" htmlFor="phone">
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          enterKeyHint="next"
          placeholder="+254 700 000 000"
          className="field-rule text-lg"
        />
      </Field>

      <Field index={4} label="Company or organisation" htmlFor="company">
        <input
          id="company"
          name="company"
          autoComplete="organization"
          enterKeyHint="next"
          placeholder="Company name"
          className="field-rule text-lg"
        />
      </Field>

      <fieldset className="border-t border-rule pt-5">
        <div className="flex items-baseline gap-3">
          <span className="text-sm tabular-nums text-ink-mute">05</span>
          <legend className="text-[0.9375rem] font-medium">What do you need?</legend>
        </div>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {NEEDS.map((need) => {
            const active = needs.includes(need);
            return (
              <button
                key={need}
                type="button"
                aria-pressed={active}
                onClick={() => toggleNeed(need)}
                className={cn(
                  "flex min-h-11 items-center rounded-full border px-4 text-[0.9375rem] transition-colors duration-200",
                  "ease-[cubic-bezier(0.2,0.7,0.2,1)]",
                  active
                    ? "border-transparent bg-contrast text-contrast-ink"
                    : "border-rule text-ink-soft hover:bg-field",
                )}
              >
                {need}
              </button>
            );
          })}
        </div>
      </fieldset>

      <Field index={6} label="Budget range" htmlFor="budget">
        <select
          id="budget"
          name="budget"
          defaultValue=""
          className="field-rule field-select text-lg"
        >
          <option value="" disabled>
            Select a range
          </option>
          {BUDGETS.map((budget) => (
            <option key={budget} value={budget}>
              {budget}
            </option>
          ))}
        </select>
      </Field>

      <Field index={7} label="What do you need?" htmlFor="message">
        <textarea
          id="message"
          name="message"
          rows={4}
          enterKeyHint="enter"
          placeholder="What has stopped working, or what you are trying to set up…"
          className="field-rule resize-y leading-relaxed"
        />
      </Field>

      <div className="border-t border-rule pt-8">
        <Button
          type="submit"
          size="lg"
          disabled={busy}
          aria-busy={busy}
          className="w-full sm:w-auto"
        >
          {busy ? "Sending…" : "Send enquiry"}
          {!busy && <ArrowUpRightIcon width={14} height={14} />}
        </Button>

        {/* Sentence case, not the mono label style: this is a sentence, and
            uppercase mono with wide tracking is unreadable at sentence length
            — on a phone it wrapped to two lines of shouting. */}
        <p
          role={status === "error" ? "alert" : undefined}
          className={cn(
            "mt-4 max-w-sm text-sm leading-relaxed",
            status === "error" ? "text-ink" : "text-ink-mute",
          )}
        >
          {notice ?? "We read every enquiry ourselves and reply within one business day."}
        </p>
      </div>
    </form>
  );
}
