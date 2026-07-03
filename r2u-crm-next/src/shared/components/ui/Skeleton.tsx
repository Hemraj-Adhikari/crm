import { cn } from "@/core/lib/utils";

/**
 * Shimmer skeleton block. Used everywhere loading states are needed —
 * dashboard KPI cards, tables, charts — so every module gets a consistent
 * "loading" feel instead of ad-hoc spinners.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-black/5 dark:bg-white/5",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:bg-gradient-to-r before:from-transparent before:via-black/10 before:to-transparent",
        "dark:before:via-white/10 before:animate-shimmer",
        className
      )}
    />
  );
}

export function KpiCardSkeleton() {
  return (
    <div className="rounded-2xl border border-black/5 bg-surface-card p-5 shadow-card dark:border-white/5 dark:bg-surface-dark-card">
      <Skeleton className="mb-3 h-3 w-24" />
      <Skeleton className="mb-2 h-7 w-32" />
      <Skeleton className="h-3 w-16" />
    </div>
  );
}

export function ChartCardSkeleton({ height = 280 }: { height?: number }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-surface-card p-5 shadow-card dark:border-white/5 dark:bg-surface-dark-card">
      <Skeleton className="mb-4 h-4 w-40" />
      <Skeleton className="w-full" style={{ height }} />
    </div>
  );
}
