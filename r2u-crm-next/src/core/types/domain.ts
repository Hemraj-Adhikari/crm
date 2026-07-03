import type { Role } from "./rbac";

/**
 * Domain types shared across modules. Firestore stores Timestamps; on the
 * client we normalize to epoch millis (`number`) at the repository boundary
 * so UI/chart code never has to think about Firestore.Timestamp vs Date.
 */

export interface BaseEntity {
  id: string;
  createdAt: number;
  updatedAt: number;
  createdBy: string;
  updatedBy: string;
  /** Soft-delete flag — records are never hard-deleted so audit trails survive. */
  isDeleted: boolean;
}

export interface AppUser extends BaseEntity {
  displayName: string;
  email: string;
  photoURL?: string;
  role: Role;
  branch?: string;
  isActive: boolean;
  lastLoginAt?: number;
}

export type LeadStage =
  | "new"
  | "contacted"
  | "qualified"
  | "consultation_booked"
  | "converted"
  | "lost";

export interface Lead extends BaseEntity {
  fullName: string;
  email: string;
  phone: string;
  source: "website" | "walk_in" | "referral" | "social_media" | "channel_partner" | "event" | "other";
  stage: LeadStage;
  interestedCountries: string[];
  assignedTo?: string;
  channelPartnerId?: string;
  notes?: string;
}

export type ApplicationStatus =
  | "documents_pending"
  | "submitted"
  | "under_review"
  | "offer_received"
  | "cas_issued"
  | "visa_applied"
  | "visa_approved"
  | "visa_rejected"
  | "enrolled"
  | "withdrawn";

export interface Application extends BaseEntity {
  studentId: string;
  universityId: string;
  courseId: string;
  intake: string; // e.g. "Sep 2026"
  status: ApplicationStatus;
  assignedCounselor?: string;
  assignedDocumentOfficer?: string;
  tuitionFee?: number;
  currency?: string;
}

export interface Student extends BaseEntity {
  fullName: string;
  email: string;
  phone: string;
  dob?: number;
  passportNumber?: string;
  nationality: string;
  leadId?: string;
  activeApplicationIds: string[];
  assignedCounselor?: string;
}

export interface AuditLogEntry extends Pick<BaseEntity, "id" | "createdAt" | "createdBy"> {
  resource: string;
  resourceId: string;
  action: "create" | "update" | "delete" | "approve" | "export" | "import" | "login";
  changes?: Record<string, { before: unknown; after: unknown }>;
  ipAddress?: string;
}

/** Standardized shape for every paginated list query across modules. */
export interface PaginatedResult<T> {
  items: T[];
  cursor: string | null;
  hasMore: boolean;
  totalCount?: number;
}

export interface ListQueryOptions {
  pageSize?: number;
  cursor?: string | null;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  filters?: Record<string, unknown>;
  searchTerm?: string;
}
