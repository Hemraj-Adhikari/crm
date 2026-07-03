"use client";

import {
  LayoutDashboard, Users, UserPlus, GraduationCap, Landmark, BookOpen, FileText,
  Award, Stamp, Plane, Wallet, Briefcase, ListChecks, Calendar, MessageSquare,
  FolderKanban, BarChart3
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/shared/context/AuthContext";
import type { Permission } from "@/core/types/rbac";
import { cn } from "@/core/lib/utils";
import { APP_NAME } from "@/core/config/constants";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  permission: Permission;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, permission: "dashboard:view" },
  { label: "Leads", href: "/leads", icon: UserPlus, permission: "leads:view" },
  { label: "Students", href: "/students", icon: Users, permission: "students:view" },
  { label: "Admissions", href: "/admissions", icon: GraduationCap, permission: "admissions:view" },
  { label: "Universities", href: "/universities", icon: Landmark, permission: "universities:view" },
  { label: "Courses", href: "/courses", icon: BookOpen, permission: "courses:view" },
  { label: "Applications", href: "/applications", icon: FileText, permission: "applications:view" },
  { label: "Offer Letters", href: "/offer-letters", icon: Award, permission: "offer_letters:view" },
  { label: "CAS", href: "/cas", icon: Stamp, permission: "cas:view" },
  { label: "Visa Processing", href: "/visa", icon: Plane, permission: "visa:view" },
  { label: "Finance", href: "/finance", icon: Wallet, permission: "finance:view" },
  { label: "HR", href: "/hr", icon: Briefcase, permission: "hr:view" },
  { label: "Tasks", href: "/tasks", icon: ListChecks, permission: "tasks:view" },
  { label: "Calendar", href: "/calendar", icon: Calendar, permission: "calendar:view" },
  { label: "Messaging", href: "/messaging", icon: MessageSquare, permission: "messaging:view" },
  { label: "Documents", href: "/documents", icon: FolderKanban, permission: "documents:view" },
  { label: "Reports", href: "/reports", icon: BarChart3, permission: "reports:view" }
];

export function Sidebar({ mobileOpen, onCloseMobile }: { mobileOpen: boolean; onCloseMobile: () => void }) {
  const pathname = usePathname();
  const { can } = useAuth();
  const visibleItems = NAV_ITEMS.filter((item) => can(item.permission));

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={onCloseMobile} aria-hidden="true" />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 shrink-0 transform border-r border-black/5 bg-surface-card transition-transform",
          "dark:border-white/5 dark:bg-surface-dark-card",
          "lg:static lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b border-black/5 px-5 dark:border-white/5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 font-display text-sm font-bold text-white">
            R2
          </div>
          <span className="font-display text-sm font-semibold text-brand-950 dark:text-white">{APP_NAME}</span>
        </div>

        <nav className="flex flex-col gap-0.5 overflow-y-auto p-3" aria-label="Primary">
          {visibleItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand-600 text-white"
                    : "text-brand-950/70 hover:bg-brand-50 dark:text-white/70 dark:hover:bg-white/5"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
