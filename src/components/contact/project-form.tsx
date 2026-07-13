"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

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

const fieldClass = cn(
  "w-full rounded-lg border border-border bg-surface-muted/40 px-4 py-3 text-sm text-foreground",
  "placeholder:text-muted outline-none transition-colors duration-200",
  "focus:border-accent focus:ring-1 focus:ring-accent",
);

const labelClass = "mb-2 block text-sm font-medium text-foreground/90";

export function ProjectForm() {
  const [needs, setNeeds] = useState<string[]>([]);

  function toggleNeed(need: string) {
    setNeeds((prev) =>
      prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need],
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const lines = [
      `Name: ${name}`,
      `Email: ${data.get("email") ?? ""}`,
      `Company: ${data.get("company") ?? ""}`,
      `Needs: ${needs.join(", ") || "—"}`,
      `Budget: ${data.get("budget") ?? "—"}`,
      "",
      String(data.get("message") ?? ""),
    ];
    const subject = encodeURIComponent(`Project brief — ${name || "New enquiry"}`);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input id="name" name="name" required placeholder="Your name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input id="email" name="email" type="email" required placeholder="you@company.com" className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>
          Company
        </label>
        <input id="company" name="company" placeholder="Company name" className={fieldClass} />
      </div>

      <fieldset>
        <legend className={labelClass}>What do you need?</legend>
        <div className="flex flex-wrap gap-2.5">
          {NEEDS.map((need) => {
            const active = needs.includes(need);
            return (
              <button
                key={need}
                type="button"
                aria-pressed={active}
                onClick={() => toggleNeed(need)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-colors duration-200",
                  active
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border text-foreground/80 hover:border-accent/50 hover:text-foreground",
                )}
              >
                {need}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="budget" className={labelClass}>
          Budget range
        </label>
        <select id="budget" name="budget" defaultValue="" className={cn(fieldClass, "appearance-none")}>
          <option value="" disabled>
            Select a range
          </option>
          {BUDGETS.map((budget) => (
            <option key={budget} value={budget}>
              {budget}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us a little about your project…"
          className={cn(fieldClass, "resize-y")}
        />
      </div>

      <div>
        <Button type="submit" size="lg">
          Send project brief
        </Button>
        <p className="mt-3 text-xs text-muted">
          Opens your email client, pre-filled and ready to send.
        </p>
      </div>
    </form>
  );
}
