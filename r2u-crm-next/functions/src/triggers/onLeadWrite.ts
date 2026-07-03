import { onDocumentWritten } from "firebase-functions/v2/firestore";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

/**
 * Maintains dashboardSnapshots/{branchId}.leadFunnel in real time.
 *
 * Strategy: rather than recomputing counts from scratch on every write
 * (which doesn't scale), we diff the previous and new `stage` values and
 * apply a targeted increment/decrement. This keeps the write cost O(1)
 * per lead change regardless of total lead volume.
 */
export const onLeadWrite = onDocumentWritten("leads/{leadId}", async (event) => {
  const db = getFirestore();
  const before = event.data?.before.data();
  const after = event.data?.after.data();

  const branchId = (after?.branch as string) ?? (before?.branch as string) ?? "main";
  const snapshotRef = db.collection("dashboardSnapshots").doc(branchId);

  const beforeStage = before?.stage as string | undefined;
  const afterStage = after?.stage as string | undefined;

  if (beforeStage === afterStage) return; // no funnel-relevant change

  const updates: Record<string, unknown> = {};
  if (beforeStage) {
    updates[`leadFunnelCounts.${beforeStage}`] = FieldValue.increment(-1);
  }
  if (afterStage) {
    updates[`leadFunnelCounts.${afterStage}`] = FieldValue.increment(1);
  }

  if (Object.keys(updates).length > 0) {
    updates.updatedAt = Date.now();
    await snapshotRef.set(updates, { merge: true });
  }
});
