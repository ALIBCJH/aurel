import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { GemMark } from "@/components/brand/gem-mark";

/**
 * Brand lockup — the faceted "A" gem beside the "AUREL" wordmark
 * (uppercase, thin, wide letter-spacing).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        "group inline-flex items-center gap-3 rounded-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background",
        className,
      )}
    >
      <GemMark
        className="h-7 w-7 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5"
        strokeWidth={2.2}
      />
      <span className="text-lg font-light uppercase tracking-[0.34em] text-foreground">
        {siteConfig.name}
      </span>
    </Link>
  );
}
