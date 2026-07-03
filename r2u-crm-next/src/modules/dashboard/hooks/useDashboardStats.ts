"use client";

import { useEffect, useState } from "react";
import { subscribeDashboardSnapshot, subscribeRecentActivity } from "../services/dashboardService";
import type { ActivityItem, DashboardSnapshot } from "../types";

interface UseDashboardStatsResult {
  snapshot: DashboardSnapshot | null;
  recentActivity: ActivityItem[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Subscribes to the branch dashboard snapshot + recent activity feed in
 * real time. Both listeners are cleaned up on unmount / branch change to
 * avoid leaking Firestore connections (a common bug in dashboards that
 * mount/unmount frequently via tab navigation).
 */
export function useDashboardStats(branchId: string): UseDashboardStatsResult {
  const [snapshot, setSnapshot] = useState<DashboardSnapshot | null>(null);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const unsubSnapshot = subscribeDashboardSnapshot(
      branchId,
      (data) => {
        setSnapshot(data);
        setIsLoading(false);
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
      }
    );

    const unsubActivity = subscribeRecentActivity(
      (items) => setRecentActivity(items),
      (err) => setError((prev) => prev ?? err.message)
    );

    return () => {
      unsubSnapshot();
      unsubActivity();
    };
  }, [branchId]);

  return { snapshot, recentActivity, isLoading, error };
}
