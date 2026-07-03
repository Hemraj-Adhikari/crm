import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely (last conflicting utility wins, no dupes). */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "NPR"): string {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

export function formatDate(epochMs: number): string {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(
    new Date(epochMs)
  );
}

export function formatRelativeTime(epochMs: number): string {
  const diffSec = Math.round((epochMs - Date.now()) / 1000);
  const divisions: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
    ["second", 1]
  ];
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  for (const [unit, secondsInUnit] of divisions) {
    if (Math.abs(diffSec) >= secondsInUnit || unit === "second") {
      return rtf.format(Math.round(diffSec / secondsInUnit), unit);
    }
  }
  return "just now";
}

/** Percentage change helper used across KPI cards. Returns null if baseline is 0. */
export function percentChange(current: number, previous: number): number | null {
  if (previous === 0) return null;
  return ((current - previous) / previous) * 100;
}
