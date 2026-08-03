import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Eyebrow — the small label above a page title.
 *
 * Gold, and one of the few places the accent appears at rest. The site is
 * otherwise entirely monochrome: a scan of every computed colour on the home
 * page turned up exactly one saturated value, and only on hover. A brand whose
 * colour is invisible unless you move your cursor does not have a colour.
 */
export function Eyebrow({
  children,
  className,
  ...rest
}: { children: ReactNode } & ComponentPropsWithoutRef<"p">) {
  return (
    <p className={cn("text-sm font-medium text-foil", className)} {...rest}>
      {children}
    </p>
  );
}

/**
 * SectionHead — a heading paired with something on the right.
 *
 * Section headers were a heading on the left and, at most, a small outline
 * button on the right, with everything between them empty. Measured on the
 * home page, "What we do" used 21% of the row and "Selected work" 25% — so
 * roughly three quarters of each header was a void, four times per page.
 *
 * This puts a deck in the empty half. It costs a sentence of copy and it makes
 * the row read as composed rather than as a heading somebody stopped writing.
 */
export function SectionHead({
  title,
  deck,
  action,
  className,
}: {
  title: ReactNode;
  /** One or two sentences. This is the thing that fills the row. */
  deck?: ReactNode;
  /** Optional control, sits under the deck so it never floats alone. */
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid items-end gap-6 lg:grid-cols-12 lg:gap-12", className)}>
      <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.038em] lg:col-span-6">
        {title}
      </h2>

      {(deck || action) && (
        <div className="lg:col-span-5 lg:col-start-8">
          {deck && (
            <p className="max-w-md text-[0.9375rem] leading-[1.7] text-ink-soft">
              {deck}
            </p>
          )}
          {/* `deck ? … : undefined` rather than `deck && …`: `deck` is a
              ReactNode, so `&&` can yield 0 or 0n, which `cn`'s ClassValue
              does not accept. */}
          {action && (
            <div className={cn(deck ? "mt-5" : undefined)}>{action}</div>
          )}
        </div>
      )}
    </div>
  );
}
