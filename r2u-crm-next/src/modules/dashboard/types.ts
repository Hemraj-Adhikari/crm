export interface KpiDatum {
  label: string;
  value: number;
  previousValue: number;
  format: "number" | "currency" | "percent";
  /** Lower-is-better metrics (e.g. avg. visa processing days) invert the trend color. */
  invertTrend?: boolean;
}

export interface FunnelStageDatum {
  stage: string;
  count: number;
}

export interface StatusBreakdownDatum {
  status: string;
  count: number;
  color: string;
}

export interface RevenueTrendPoint {
  month: string; // "Jan", "Feb", ...
  revenue: number;
  target: number;
}

export interface ActivityItem {
  id: string;
  actorName: string;
  actorPhotoURL?: string;
  action: string; // human-readable: "moved lead to Qualified"
  resourceLabel: string; // "Sujata Karki"
  timestamp: number;
}

export interface DashboardSnapshot {
  kpis: KpiDatum[];
  leadFunnel: FunnelStageDatum[];
  applicationStatus: StatusBreakdownDatum[];
  revenueTrend: RevenueTrendPoint[];
  recentActivity: ActivityItem[];
}
