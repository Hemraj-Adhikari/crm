import type { HTMLAttributes } from "react";
import { cn } from "@/core/lib/utils";

/**
 * Base Card primitive. Every dashboard widget, table wrapper, and form
 * panel in the app composes this rather than re-declaring border/shadow
 * styles — keeps the visual language consistent (DRY design system).
 */
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-black/5 bg-surface-card shadow-card",
        "dark:border-white/5 dark:bg-surface-dark-card dark:shadow-card-dark",
        "transition-colors",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-start justify-between gap-3 p-5 pb-3", className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-display text-sm font-semibold tracking-tight text-brand-950 dark:text-white", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs text-status-neutral", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-5 pb-5", className)} {...props} />;
}
