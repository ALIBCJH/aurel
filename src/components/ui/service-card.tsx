import Link from "next/link";
import { ServiceIcon } from "@/components/brand/service-icons";
import { ArrowUpRightIcon } from "@/components/icons";
import { hasPublishedFloor, type Service } from "@/config/services";
import { cn } from "@/lib/utils";

/**
 * One discipline, as a card.
 *
 * The whole card is the link rather than a "learn more" at the bottom: a
 * 44px text target inside a 300px card is a worse hit area than the card
 * itself, and it puts two competing affordances in the same box.
 *
 * Gold appears exactly twice here — the icon and the index — and only reaches
 * the border on hover. That is the accent budget for this component; adding a
 * gold heading or a gold rule would push the page past the 5% the palette
 * allows and make the grid read as a pricing table.
 */
export function ServiceCard({
  service,
  className,
}: {
  service: Service;
  className?: string;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group/card flex flex-col rounded-[var(--radius-xl)] border border-rule bg-paper-deep p-7 sm:p-8",
        "transition-colors duration-300 hover:border-rule-foil focus-visible:border-rule-foil",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="text-foil transition-transform duration-300 group-hover/card:-translate-y-0.5">
          <ServiceIcon slug={service.slug} />
        </span>
        <span className="text-label-sm tabular-nums text-foil/70">
          {service.index}
        </span>
      </div>

      <h3 className="mt-7 text-[1.375rem] font-semibold leading-[1.2] tracking-[-0.025em]">
        {service.name}
      </h3>

      <p className="mt-3 flex-1 text-[0.9375rem] leading-[1.7] text-ink-soft">
        {service.summary}
      </p>

      <span className="mt-7 flex items-center justify-between gap-4 border-t border-rule pt-5 text-sm">
        <span className="text-ink-mute">
          {hasPublishedFloor(service)
            ? `From ${service.pricing.from}`
            : service.pricing.from}
        </span>
        <ArrowUpRightIcon
          width={14}
          height={14}
          className="shrink-0 text-ink-mute transition-all duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 group-hover/card:text-foil"
        />
      </span>
    </Link>
  );
}
