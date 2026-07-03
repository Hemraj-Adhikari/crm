import { initializeApp } from "firebase-admin/app";

initializeApp();

export { onLeadWrite } from "./triggers/onLeadWrite";
export { onApplicationWrite } from "./triggers/onApplicationWrite";

// Roadmap (Phase 2+): onFinanceWrite (revenue trend), onAuditLogWrite
// (fan-out notifications), scheduled nightly reconciliation function that
// recomputes dashboardSnapshots from source-of-truth collections to correct
// any drift from the incremental counters above.
