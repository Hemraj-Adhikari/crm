import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { Card } from "@/shared/components/ui/Card";
import { cn, formatCompactNumber, formatCurrency, percentChange } from "@/core/lib/utils";
import type { KpiDatum } from "../types";

function formatValue(value: number, format: KpiDatum["format"]): string {
  if (format === "currency") return formatCurrency(value);
  if (format === "percent") return `${value.toFixed(1)}%`;
  return formatCompactNumber(value);
}

export function KpiCard({ datum }: { datum: KpiDatum }) {
  const change = percentChange(datum.value, datum.previousValue);
  const isFlat = change === null || Math.abs(change) < 0.05;
  const isPositive = !isFlat && change! > 0;
  // For "lower is better" metrics (e.g. avg visa processing time), invert coloring.
  const isGood = isFlat ? null : datum.invertTrend ? !isPositive : isPositive;

  return (
    <Card className="animate-fade-in p-5">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-status-neutral">{datum.label}</p>
      <p className="font-display text-2xl font-semibold text-brand-950 dark:text-white">
        {formatValue(datum.value, datum.format)}
      </p>
      <div
        className={cn(
          "mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
          isFlat && "bg-status-neutral/10 text-status-neutral",
          !isFlat && isGood && "bg-status-success/10 text-status-success",
          !isFlat && !isGood && "bg-status-danger/10 text-status-danger"
        )}
      >
        {isFlat ? <Minus size={12} /> : isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
        {isFlat ? "No change" : `${Math.abs(change!).toFixed(1)}% vs last period`}
      </div>
    </Card>
  );
}
