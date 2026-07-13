/**
 * Lightweight className combiner.
 *
 * We deliberately avoid pulling in `clsx` / `tailwind-merge` to keep the
 * dependency surface minimal. For our controlled component APIs, filtering
 * falsy values and joining is sufficient — components expose explicit
 * variant props rather than relying on class-override merging.
 */
export type ClassValue = string | number | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
