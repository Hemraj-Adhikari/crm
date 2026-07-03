import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { formatRelativeTime } from "@/core/lib/utils";
import type { ActivityItem } from "../types";

function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function RecentActivity({ items }: { items: ActivityItem[] }) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Live feed across all modules</CardDescription>
        </div>
      </CardHeader>
      <div className="max-h-[340px] overflow-y-auto px-5 pb-5">
        {items.length === 0 && <p className="py-6 text-center text-xs text-status-neutral">No activity yet.</p>}
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex items-start gap-3 animate-fade-in">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[11px] font-semibold text-brand-700 dark:bg-brand-900 dark:text-brand-200">
                {initials(item.actorName)}
              </div>
              <div className="min-w-0">
                <p className="text-sm text-brand-950 dark:text-white">
                  <span className="font-medium">{item.actorName}</span> {item.action}{" "}
                  <span className="font-medium">{item.resourceLabel}</span>
                </p>
                <p className="text-xs text-status-neutral">{formatRelativeTime(item.timestamp)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
