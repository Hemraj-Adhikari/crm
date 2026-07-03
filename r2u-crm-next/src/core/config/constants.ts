/**
 * Centralized Firestore collection names. Never hardcode a collection
 * string in a service/hook — import from here so a rename is a one-line
 * change and typos become compile errors.
 */
export const COLLECTIONS = {
  USERS: "users",
  LEADS: "leads",
  STUDENTS: "students",
  APPLICATIONS: "applications",
  UNIVERSITIES: "universities",
  COURSES: "courses",
  OFFER_LETTERS: "offerLetters",
  CAS: "casRecords",
  VISA_CASES: "visaCases",
  FINANCE_TRANSACTIONS: "financeTransactions",
  HR_EMPLOYEES: "hrEmployees",
  TASKS: "tasks",
  CALENDAR_EVENTS: "calendarEvents",
  CHAT_THREADS: "chatThreads",
  CHAT_MESSAGES: "chatMessages",
  NOTIFICATIONS: "notifications",
  DOCUMENTS: "documents",
  AUDIT_LOGS: "auditLogs",
  DASHBOARD_SNAPSHOTS: "dashboardSnapshots"
} as const;

export const PAGE_SIZE_DEFAULT = 25;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;

export const APP_NAME = "R2U CRM";
export const APP_TAGLINE = "Route2Uni — Overseas Education, Operationalized";
