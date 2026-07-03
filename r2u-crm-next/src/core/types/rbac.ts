/**
 * RBAC — Role-Based Access Control
 * -----------------------------------------------------------------------
 * Single source of truth for roles, permissions, and the role→permission
 * matrix. Every module (Students, Leads, Applications, Finance, etc.)
 * declares its own resource + action pairs here rather than hard-coding
 * role checks inline — this keeps access rules auditable in one file and
 * keeps UI components DRY (`can(role, "students:delete")`).
 *
 * Firestore Security Rules mirror this exact matrix (see
 * /firestore/firestore.rules) so client-side checks are a UX convenience,
 * never the actual security boundary.
 */

export const ROLES = [
  "super_admin",
  "admin",
  "document_officer",
  "counselor",
  "finance_officer",
  "application_user",
  "channel_partner"
] as const;

export type Role = (typeof ROLES)[number];

/** Every resource in the system that permissions are scoped to. */
export const RESOURCES = [
  "dashboard",
  "students",
  "leads",
  "admissions",
  "universities",
  "courses",
  "applications",
  "offer_letters",
  "cas",
  "visa",
  "finance",
  "hr",
  "tasks",
  "calendar",
  "messaging",
  "notifications",
  "documents",
  "reports",
  "audit_logs",
  "users",
  "settings"
] as const;

export type Resource = (typeof RESOURCES)[number];

export const ACTIONS = ["view", "create", "update", "delete", "export", "import", "approve"] as const;
export type Action = (typeof ACTIONS)[number];

/** `"students:delete"`, `"finance:approve"`, etc. */
export type Permission = `${Resource}:${Action}`;

/**
 * Role → allowed permissions. Wildcards ("*") mean "all actions on this
 * resource". super_admin implicitly has everything (short-circuited in `can()`).
 */
export const ROLE_PERMISSIONS: Record<Role, Permission[] | ["*:*"]> = {
  super_admin: ["*:*"],
  admin: [
    "dashboard:view",
    "students:view", "students:create", "students:update", "students:delete", "students:export", "students:import",
    "leads:view", "leads:create", "leads:update", "leads:delete", "leads:export", "leads:import",
    "admissions:view", "admissions:create", "admissions:update", "admissions:delete",
    "universities:view", "universities:create", "universities:update", "universities:delete",
    "courses:view", "courses:create", "courses:update", "courses:delete",
    "applications:view", "applications:create", "applications:update", "applications:delete", "applications:approve",
    "offer_letters:view", "offer_letters:create", "offer_letters:update", "offer_letters:approve",
    "cas:view", "cas:create", "cas:update", "cas:approve",
    "visa:view", "visa:create", "visa:update",
    "finance:view", "finance:create", "finance:update", "finance:approve", "finance:export",
    "hr:view", "hr:create", "hr:update",
    "tasks:view", "tasks:create", "tasks:update", "tasks:delete",
    "calendar:view", "calendar:create", "calendar:update",
    "messaging:view", "messaging:create",
    "notifications:view",
    "documents:view", "documents:create", "documents:update", "documents:delete",
    "reports:view", "reports:export",
    "audit_logs:view",
    "users:view", "users:create", "users:update"
  ],
  document_officer: [
    "dashboard:view",
    "students:view", "students:update",
    "applications:view", "applications:update",
    "offer_letters:view", "offer_letters:create", "offer_letters:update",
    "cas:view", "cas:create", "cas:update",
    "visa:view", "visa:update",
    "documents:view", "documents:create", "documents:update",
    "tasks:view", "tasks:update",
    "calendar:view",
    "messaging:view", "messaging:create",
    "notifications:view"
  ],
  counselor: [
    "dashboard:view",
    "leads:view", "leads:create", "leads:update",
    "students:view", "students:create", "students:update",
    "admissions:view", "admissions:create", "admissions:update",
    "universities:view",
    "courses:view",
    "applications:view", "applications:create", "applications:update",
    "documents:view", "documents:create",
    "tasks:view", "tasks:create", "tasks:update",
    "calendar:view", "calendar:create",
    "messaging:view", "messaging:create",
    "notifications:view"
  ],
  finance_officer: [
    "dashboard:view",
    "finance:view", "finance:create", "finance:update", "finance:export",
    "students:view",
    "reports:view", "reports:export",
    "tasks:view",
    "notifications:view"
  ],
  application_user: [
    "dashboard:view",
    "students:view",
    "applications:view",
    "documents:view", "documents:create",
    "tasks:view", "tasks:update",
    "calendar:view",
    "messaging:view", "messaging:create",
    "notifications:view"
  ],
  channel_partner: [
    "dashboard:view",
    "leads:view", "leads:create",
    "students:view",
    "universities:view",
    "courses:view",
    "applications:view",
    "documents:view", "documents:create",
    "notifications:view"
  ]
};

/** Central permission check used by both UI guards and hooks. */
export function can(role: Role | undefined | null, permission: Permission): boolean {
  if (!role) return false;
  const grants = ROLE_PERMISSIONS[role];
  if (!grants) return false;
  if (grants.includes("*:*" as Permission)) return true;
  if (grants.includes(permission)) return true;

  // Support resource-level wildcard, e.g. "students:*"
  const [resource] = permission.split(":") as [Resource, Action];
  return grants.includes(`${resource}:*` as Permission);
}

export function canAny(role: Role | undefined | null, permissions: Permission[]): boolean {
  return permissions.some((p) => can(role, p));
}
