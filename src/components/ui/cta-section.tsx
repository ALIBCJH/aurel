import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "@/components/icons";
import { primaryCta } from "@/config/site";

/**
 * The closing call to action, shared by every page that ends in one.
 *
 * Set on the tinted band rather than the page ground. It is the one warm
 * surface allowed per page, and spending it here means the last thing on the
 * screen is also the only thing that changed temperature — which is the
 * cheapest possible way to make a CTA the loudest object on the page without
 * reaching for a gradient or a glow.
 */
export function CtaSection({
  title = "Your next digital chapter starts here.",
  body = "Tell us where your business is going. We'll help you build the digital experience to get there.",
  action = primaryCta,
  secondary,
}: {
  title?: string;
  body?: string;
  action?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="pb-20 sm:pb-24 lg:pb-32">
      <Container size="wide">
        <div className="rounded-[var(--radius-card)] border border-rule bg-tint px-7 py-16 text-center sm:px-10 sm:py-20 lg:py-28">
          <h2
            data-reveal="fade"
            className="mx-auto max-w-[20ch] text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.04] tracking-[-0.04em]"
          >
            {title}
          </h2>

          <p
            data-reveal="fade"
            style={{ ["--reveal-delay" as string]: "0.08s" }}
            className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.65] text-ink-soft"
          >
            {body}
          </p>

          <div
            data-reveal="fade"
            style={{ ["--reveal-delay" as string]: "0.16s" }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <Button href={action.href} size="lg">
              {action.label}
              <ArrowUpRightIcon width={15} height={15} />
            </Button>
            {secondary && (
              <Button href={secondary.href} variant="secondary" size="lg">
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
