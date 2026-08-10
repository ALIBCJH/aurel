import { Container } from "@/components/layout/container";
import { SectionHead } from "@/components/layout/section-head";
import { testimonials, type Testimonial } from "@/config/testimonials";
import { cn } from "@/lib/utils";

/**
 * One client quote.
 *
 * Attribution is not optional and is not styled as fine print — the name and
 * the organisation are the load-bearing part. A quote with a vague or missing
 * source reads as invented whether or not it is.
 */
export function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "flex flex-col rounded-[var(--radius-xl)] border border-rule bg-paper-deep p-8 sm:p-10",
        className,
      )}
    >
      <blockquote className="flex-1 text-[clamp(1.125rem,2.1vw,1.5rem)] font-medium leading-[1.45] tracking-[-0.02em]">
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-8 border-t border-rule pt-6">
        <span className="block font-medium">{testimonial.name}</span>
        <span className="mt-1 block text-sm text-ink-mute">
          {testimonial.role ? `${testimonial.role}, ` : ""}
          {testimonial.organisation}
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * The testimonials band.
 *
 * Renders nothing when there are no real quotes. Not an empty state, not a
 * "testimonials coming soon" — a section that announces its own absence is
 * worse than the absence, because it draws the eye to the one thing the studio
 * cannot yet show. The section reappears by itself the moment
 * `config/testimonials.ts` has an entry.
 */
export function Testimonials({
  title = "What our clients say",
  deck,
  limit,
}: {
  title?: string;
  deck?: string;
  limit?: number;
}) {
  if (testimonials.length === 0) return null;

  const shown = typeof limit === "number" ? testimonials.slice(0, limit) : testimonials;

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container size="wide">
        <SectionHead title={title} deck={deck} />
        <div
          className={cn(
            "mt-12 grid gap-6 sm:mt-16",
            shown.length > 1 && "lg:grid-cols-2",
          )}
        >
          {shown.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </Container>
    </section>
  );
}
