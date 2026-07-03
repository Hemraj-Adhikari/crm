"use client";

import { Bell, Menu, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "@/shared/context/ThemeContext";
import { useAuth } from "@/shared/context/AuthContext";

export function Topbar({ onOpenMobile }: { onOpenMobile: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const { appUser } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-black/5 bg-surface-card/80 px-4 backdrop-blur-md dark:border-white/5 dark:bg-surface-dark-card/80 sm:px-6">
      <button
        type="button"
        onClick={onOpenMobile}
        className="rounded-lg p-2 text-brand-950/70 hover:bg-brand-50 dark:text-white/70 dark:hover:bg-white/5 lg:hidden"
        aria-label="Open navigation menu"
      >
        <Menu size={20} />
      </button>

      <div className="relative hidden flex-1 max-w-md sm:block">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-status-neutral" />
        <input
          type="search"
          placeholder="Search students, leads, applications…"
          className="w-full rounded-xl border border-black/5 bg-surface-light py-2 pl-9 pr-3 text-sm outline-none ring-brand-500/40 transition focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-lg p-2 text-brand-950/70 hover:bg-brand-50 dark:text-white/70 dark:hover:bg-white/5"
          aria-label="Toggle dark mode"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <button
          type="button"
          className="relative rounded-lg p-2 text-brand-950/70 hover:bg-brand-50 dark:text-white/70 dark:hover:bg-white/5"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-status-danger" />
        </button>

        <div className="ml-1 flex items-center gap-2 border-l border-black/5 pl-3 dark:border-white/10">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-white">
            {appUser?.displayName?.slice(0, 2).toUpperCase() ?? "?"}
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-medium leading-tight text-brand-950 dark:text-white">
              {appUser?.displayName ?? "Loading…"}
            </p>
            <p className="text-[11px] capitalize leading-tight text-status-neutral">
              {appUser?.role?.replace("_", " ") ?? ""}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
