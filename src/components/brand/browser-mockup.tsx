import { cn } from "@/lib/utils";
import { GemPanel } from "./gem-panel";

/**
 * BrowserMockup — a minimal browser window frame wrapping an abstract screen.
 * Used on Work cards to suggest a shipped site without stock photography.
 */
export function BrowserMockup({
  className,
  index = 0,
}: {
  className?: string;
  index?: number;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-surface",
        className,
      )}
    >
      {/* chrome */}
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted/20" />
        <span className="ml-3 h-4 w-1/2 max-w-40 rounded-full bg-surface-muted" />
      </div>
      {/* screen */}
      <div className="relative aspect-[16/10]">
        <GemPanel index={index} className="absolute inset-0 rounded-none border-0" />
      </div>
    </div>
  );
}
