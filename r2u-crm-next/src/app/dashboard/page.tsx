"use client";

import { DashboardLayout } from "@/shared/components/layout/DashboardLayout";
import { useAuth } from "@/shared/context/AuthContext";
import { useDashboardStats } from "@/modules/dashboard/hooks/useDashboardStats";
import { KpiCard } from "@/modules/dashboard/components/KpiCard";
import { RevenueChart } from "@/modules/dashboard/components/RevenueChart";
import { LeadsFunnelChart } from "@/modules/dashboard/components/LeadsFunnelChart";
import { ApplicationsStatusChart } from "@/modules/dashboard/components/ApplicationsStatusChart";
import { RecentActivity } from "@/modules/dashboard/components/RecentActivity";
import { ChartCardSkeleton, KpiCardSkeleton } from "@/shared/components/ui/Skeleton";

/**
 * Dashboard + Analytics — Phase 1 module.
 *
 * Data flow: useDashboardStats() subscribes to a single aggregate Firestore
 * document (see dashboardService.ts for why) plus the live audit-log feed.
 * Every visual piece below is a pure presentational component that takes
 * typed props — no component reaches into Firestore directly, which keeps
 * the module testable (each chart can be unit-tested with mock data).
 */
export default function DashboardPage() {
  const { appUser } = useAuth();
  const branchId = appUser?.branch ?? "main";
  const { snapshot, recentActivity, isLoading, error } = useDashboardStats(branchId);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="font-display text-xl font-semibold text-brand-950 dark:text-white">
            Welcome back{appUser?.displayName ? `, ${appUser.displayName.split(" ")[0]}` : ""}
          </h1>
          <p className="text-sm text-status-neutral">Here&apos;s what&apos;s happening across R2U today.</p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-status-danger/20 bg-status-danger/5 px-4 py-3 text-sm text-status-danger">
            Couldn&apos;t load live dashboard data: {error}
          </div>
        )}

        {/* KPI row */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading || !snapshot
            ? Array.from({ length: 4 }).map((_, i) => <KpiCardSkeleton key={i} />)
            : snapshot.kpis.map((kpi) => <KpiCard key={kpi.label} datum={kpi} />)}
        </div>

        {/* Charts row */}
        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {isLoading || !snapshot ? <ChartCardSkeleton /> : <RevenueChart data={snapshot.revenueTrend} />}
          </div>
          <div>{isLoading || !snapshot ? <ChartCardSkeleton /> : <ApplicationsStatusChart data={snapshot.applicationStatus} />}</div>
        </div>

        {/* Funnel + Activity row */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {isLoading || !snapshot ? <ChartCardSkeleton /> : <LeadsFunnelChart data={snapshot.leadFunnel} />}
          </div>
          <div>
            <RecentActivity items={recentActivity} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
