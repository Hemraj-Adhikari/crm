import { doc, onSnapshot, collection, query, orderBy, limit, type Unsubscribe } from "firebase/firestore";
import { db } from "@/core/config/firebase";
import { COLLECTIONS } from "@/core/config/constants";
import type { ActivityItem, DashboardSnapshot } from "../types";

/**
 * ARCHITECTURE NOTE — why this doesn't just run COUNT queries client-side:
 * -----------------------------------------------------------------------
 * At enterprise scale (millions of leads/applications) computing KPIs by
 * reading whole collections on every dashboard load is prohibitively slow
 * and expensive. Instead we use the "precomputed snapshot" pattern:
 *
 *   1. A Cloud Function (see /functions/src/triggers/onLeadWrite.ts,
 *      onApplicationWrite.ts, onFinanceWrite.ts) listens to writes on the
 *      source collections and incrementally updates a single aggregate
 *      document at dashboardSnapshots/{branchId}.
 *   2. The client subscribes to that ONE document in real time — O(1)
 *      reads regardless of collection size, and still live-updating.
 *
 * `recentActivity` is the one exception: it's a genuinely small, naturally
 * time-ordered query (last 20 audit log entries) so a direct indexed
 * query is appropriate there instead of aggregation.
 */

export function subscribeDashboardSnapshot(
  branchId: string,
  onData: (snapshot: DashboardSnapshot | null) => void,
  onError: (error: Error) => void
): Unsubscribe {
  const ref = doc(db, COLLECTIONS.DASHBOARD_SNAPSHOTS, branchId);
  return onSnapshot(
    ref,
    (snap) => {
      if (!snap.exists()) {
        onData(null);
        return;
      }
      onData(snap.data() as DashboardSnapshot);
    },
    (err) => onError(err as Error)
  );
}

export function subscribeRecentActivity(
  onData: (items: ActivityItem[]) => void,
  onError: (error: Error) => void,
  take = 12
): Unsubscribe {
  const q = query(collection(db, COLLECTIONS.AUDIT_LOGS), orderBy("createdAt", "desc"), limit(take));
  return onSnapshot(
    q,
    (snap) => {
      const items: ActivityItem[] = snap.docs.map((d) => {
        const data = d.data() as Record<string, unknown>;
        return {
          id: d.id,
          actorName: (data.actorName as string) ?? "Unknown",
          actorPhotoURL: data.actorPhotoURL as string | undefined,
          action: (data.action as string) ?? "updated",
          resourceLabel: (data.resourceLabel as string) ?? (data.resource as string) ?? "record",
          timestamp: (data.createdAt as number) ?? Date.now()
        };
      });
      onData(items);
    },
    (err) => onError(err as Error)
  );
}
