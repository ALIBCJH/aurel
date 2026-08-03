"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

/**
 * ProjectForm — the brief, set as a printed form.
 *
 * Fields are numbered and ruled rather than boxed, the way a paper form on a
 * studio desk would be.
 *
 * Submitting posts to `/api/contact`, which validates the brief and forwards it
 * to whatever delivery channel is configured. If that request cannot be made at
 * all — offline, blocked, the route down — the form falls back to composing a
 * `mailto:` so the visitor still has a way through. The fallback is the last
 * resort, not the mechanism: on its own it loses every lead whose device has no
 * mail client configured, and tells neither party that anything went missing.
 */
const NEEDS = [
  "Website",
  "Software",
  "AI automation",
  "Strategy",
  "Branding",
  "SEO",
  "Other",
];

const BUDGETS = [
  "Under $5k",
  "$5k – $15k",
  "$15k – $50k",
  "$50k+",
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
        <span className="text-label-sm text-foil/70">
          {String(index).padStart(2, "0")}
        </span>
        <label htmlFor={htmlFor} className="text-label text-ink-soft">
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
          <span aria-hidden className="mr-1.5 text-foil">
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

  /** Last resort when the network is unreachable — see the component note. */
  function openMailClient(payload: Record<string, string>) {
    const lines = [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Company: ${payload.company}`,
      `Needs: ${needs.join(", ") || "—"}`,
      `Budget: ${payload.budget || "—"}`,
      "",
      payload.message,
    ];
    const subject = encodeURIComponent(
      `Project brief — ${payload.name || "New enquiry"}`,
    );
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
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
          "Something went wrong sending that. Please try again, or email us directly.",
      );
    } catch {
      // The request never left the device. Hand the visitor their mail client
      // so the brief is not simply lost.
      setStatus("error");
      setNotice(
        "We couldn't reach the studio from here. We've opened your email client instead.",
      );
      openMailClient(payload);
    }
  }

  if (status === "sent") {
    return (
      <div
        ref={confirmationRef}
        tabIndex={-1}
        className="border-t border-rule-foil pt-8 outline-none"
      >
        <span className="text-label text-foil">Received</span>
        <h3 className="font-display mt-5 text-[clamp(1.75rem,4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em]">
          Thank you — your brief is with us.
        </h3>
        <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-ink-soft">
          We read every enquiry ourselves and reply within one business day. If
          it is urgent, write to{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="link-rule link-rule-on text-ink"
          >
            {siteConfig.email}
          </a>
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
            className="field-rule font-display text-lg font-light"
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
            className="field-rule font-display text-lg font-light"
          />
        </Field>
      </div>

      <Field index={3} label="Company" htmlFor="company">
        <input
          id="company"
          name="company"
          autoComplete="organization"
          enterKeyHint="next"
          placeholder="Company name"
          className="field-rule font-display text-lg font-light"
        />
      </Field>

      <fieldset className="border-t border-rule pt-5">
        <div className="flex items-baseline gap-3">
          <span className="text-label-sm text-foil/70">04</span>
          <legend className="text-label text-ink-soft">What do you need?</legend>
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
                  "text-label-sm flex min-h-11 items-center border px-4 transition-all duration-300",
                  "ease-[cubic-bezier(0.2,0.7,0.2,1)]",
                  active
                    ? "border-foil bg-foil text-[color:var(--foil-ink)]"
                    : "border-rule text-ink-soft hover:border-foil hover:text-foil",
                )}
              >
                {need}
              </button>
            );
          })}
        </div>
      </fieldset>

      <Field index={5} label="Budget range" htmlFor="budget">
        <select
          id="budget"
          name="budget"
          defaultValue=""
          className="field-rule field-select font-display text-lg font-light"
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

      <Field index={6} label="Where you want to go" htmlFor="message">
        <textarea
          id="message"
          name="message"
          rows={4}
          enterKeyHint="enter"
          placeholder="Tell us a little about your project…"
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
          {busy ? "Sending…" : "Send project brief"}
          {!busy && <ArrowUpRightIcon width={14} height={14} />}
        </Button>

        {/* Sentence case, not the mono label style: this is a sentence, and
            uppercase mono with wide tracking is unreadable at sentence length
            — on a phone it wrapped to two lines of shouting. */}
        <p
          role={status === "error" ? "alert" : undefined}
          className={cn(
            "mt-4 max-w-sm text-sm leading-relaxed",
            status === "error" ? "text-foil" : "text-ink-mute",
          )}
        >
          {notice ?? "We read every enquiry ourselves and reply within one business day."}
        </p>
      </div>
    </form>
  );
}
