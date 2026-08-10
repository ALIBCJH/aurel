import { siteConfig } from "@/config/site";

/**
 * Enquiry intake.
 *
 * The brief used to be handed straight to `mailto:` from the browser, which
 * meant every lead depended on the visitor having a configured mail client —
 * and produced no record, no confirmation, and no way to know a submission had
 * been lost. This route takes the brief server-side, validates it, and forwards
 * it to whichever delivery channel is configured.
 *
 * Delivery is chosen by environment, in this order:
 *
 *   RESEND_API_KEY       → email via the Resend REST API (no SDK dependency)
 *   CONTACT_WEBHOOK_URL  → POST the JSON payload (Slack, Zapier, a CRM, …)
 *   neither              → log and accept, so local development works offline
 *
 * `CONTACT_TO_EMAIL` overrides the recipient; it defaults to the address in
 * site config. `CONTACT_FROM_EMAIL` must be a domain you have verified with
 * Resend — their sandbox sender only delivers to your own account address.
 */

export const runtime = "nodejs";

/** Shape accepted from the client. Everything arrives as unknown. */
type Payload = {
  name: string;
  email: string;
  /** Optional. In this market a phone number is often the fastest reply path. */
  phone: string;
  company: string;
  needs: string[];
  budget: string;
  message: string;
  /** Honeypot — must be empty. Never shown to a human. */
  website?: string;
};

const MAX = { name: 120, email: 200, phone: 40, company: 160, budget: 60, message: 5000 };

function str(value: unknown, limit: number): string {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

/**
 * Deliberately permissive: the job here is to reject obvious nonsense, not to
 * adjudicate the RFC. Over-strict email regexes turn away real addresses, and a
 * bad address costs us one bounced reply while a rejected one costs a client.
 */
function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function render(payload: Payload): string {
  return [
    `Name:    ${payload.name}`,
    `Email:   ${payload.email}`,
    `Phone:   ${payload.phone || "—"}`,
    `Company: ${payload.company || "—"}`,
    `Needs:   ${payload.needs.join(", ") || "—"}`,
    `Budget:  ${payload.budget || "—"}`,
    "",
    payload.message || "(no message)",
  ].join("\n");
}

async function deliver(payload: Payload): Promise<void> {
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;
  const body = render(payload);

  if (process.env.RESEND_API_KEY) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Nexora <onboarding@resend.dev>",
        to: [to],
        reply_to: payload.email,
        subject: `Project brief — ${payload.name}`,
        text: body,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Resend rejected the message (${response.status}): ${await response.text()}`,
      );
    }
    return;
  }

  if (process.env.CONTACT_WEBHOOK_URL) {
    const response = await fetch(process.env.CONTACT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, text: body }),
    });

    if (!response.ok) {
      throw new Error(`Webhook rejected the message (${response.status})`);
    }
    return;
  }

  // No channel configured. Accept the brief rather than fail in front of the
  // visitor, but make the gap loud in the server log.
  console.warn(
    "[contact] No RESEND_API_KEY or CONTACT_WEBHOOK_URL set — brief not delivered:\n" +
      body,
  );
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  const input = (raw ?? {}) as Record<string, unknown>;

  // Bots fill every field they find. Humans never see this one, so anything in
  // it is automated — accept it silently so the sender learns nothing.
  if (str(input.website, 100)) {
    return Response.json({ ok: true });
  }

  const payload: Payload = {
    name: str(input.name, MAX.name),
    email: str(input.email, MAX.email),
    phone: str(input.phone, MAX.phone),
    company: str(input.company, MAX.company),
    needs: Array.isArray(input.needs)
      ? input.needs.filter((n): n is string => typeof n === "string").slice(0, 12)
      : [],
    budget: str(input.budget, MAX.budget),
    message: str(input.message, MAX.message),
  };

  const errors: Record<string, string> = {};
  if (!payload.name) errors.name = "Please tell us your name.";
  if (!payload.email) errors.email = "Please leave an email so we can reply.";
  else if (!looksLikeEmail(payload.email))
    errors.email = "That email address doesn't look right.";

  if (Object.keys(errors).length > 0) {
    return Response.json({ errors }, { status: 422 });
  }

  try {
    await deliver(payload);
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return Response.json(
      { error: "We couldn't send that just now." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
