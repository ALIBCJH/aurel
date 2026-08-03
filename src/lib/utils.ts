/**
 * Lightweight className combiner.
 *
 * We deliberately avoid pulling in `clsx` / `tailwind-merge` to keep the
 * dependency surface minimal. For our controlled component APIs, filtering
 * falsy values and joining is sufficient — components expose explicit
 * variant props rather than relying on class-override merging.
 *
 * IMPORTANT — this joins, it does not merge. Passing a utility that conflicts
 * with one already in a component's base styles does **not** override it:
 * both land in the stylesheet and the winner is whichever rule Tailwind emits
 * last, which has nothing to do with the order of the arguments here.
 *
 *   <Button className="hidden sm:inline-flex" />   // ✗ base `inline-flex` wins
 *   <span className="hidden sm:inline-flex">       // ✓ uncontested wrapper
 *     <Button />
 *   </span>
 *
 * This shipped a real bug once: the masthead CTA stayed visible on phones,
 * overflowed the row, and pushed the navigation toggle off screen. To change a
 * component's display, position, or width, wrap it or give it a variant prop —
 * do not pass a competing utility through `className`.
 */
export type ClassValue = string | number | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
