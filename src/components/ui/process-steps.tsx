import { cn } from "@/lib/utils";

export type ProcessStep = {
  step: string;
  title: string;
  body: string;
};

/**
 * The five-stage engagement, as a ruled list.
 *
 * A numbered list rather than a row of cards. Five cards across a desktop
 * container gives each one about 200px, which forces the body copy into a
 * column three words wide; and a process is a sequence, which a horizontal
 * rank of equal boxes actively works against. Rules carry the order instead.
 */
export function ProcessSteps({
  steps,
  className,
}: {
  steps: readonly ProcessStep[];
  className?: string;
}) {
  return (
    <ol className={cn("border-t border-rule", className)}>
      {steps.map((step, index) => (
        <li
          key={step.step}
          data-reveal="fade"
          style={{ ["--reveal-delay" as string]: `${index * 0.06}s` }}
          className="grid gap-3 border-b border-rule py-7 sm:py-9 lg:grid-cols-12 lg:gap-8"
        >
          <span className="text-label-sm tabular-nums text-foil lg:col-span-2">
            {step.step}
          </span>
          <h3 className="text-[1.25rem] font-semibold leading-[1.25] tracking-[-0.022em] sm:text-[1.4rem] lg:col-span-4">
            {step.title}
          </h3>
          <p className="max-w-2xl text-[0.9375rem] leading-[1.75] text-ink-soft lg:col-span-6">
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
