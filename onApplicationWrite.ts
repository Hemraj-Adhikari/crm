import { onDocumentWritten } from "firebase-functions/v2/firestore";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

/** Mirrors onLeadWrite's incremental-diff strategy for application status counts. */
export const onApplicationWrite = onDocumentWritten("applications/{applicationId}", async (event) => {
  const db = getFirestore();
  const before = event.data?.before.data();
  const after = event.data?.after.data();

  const branchId = (after?.branch as string) ?? (before?.branch as string) ?? "main";
  const snapshotRef = db.collection("dashboardSnapshots").doc(branchId);

  const beforeStatus = before?.status as string | undefined;
  const afterStatus = after?.status as string | undefined;
  if (beforeStatus === afterStatus) return;

  const updates: Record<string, unknown> = {};
  if (beforeStatus) updates[`applicationStatusCounts.${beforeStatus}`] = FieldValue.increment(-1);
  if (afterStatus) updates[`applicationStatusCounts.${afterStatus}`] = FieldValue.increment(1);
  updates.updatedAt = Date.now();

  await snapshotRef.set(updates, { merge: true });
});
