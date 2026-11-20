"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bell, ChevronDown, Menu } from "lucide-react";

import { ThemeToggle } from "../ui/theme-toggle";

type AdminTopbarProps = {
  onMenuClick: () => void;
};

type DashboardResponse = {
  stats?: { newMessages?: number };
};

type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type AdminMeResponse = {
  success?: boolean;
  user?: AdminUser;
  message?: string;
};

/* Pure requests: they return data instead of setting state, so effects can await them. */
async function requestNotificationCount(): Promise<number | null> {
  try {
    const response = await fetch("/api/admin/dashboard", { method: "GET", cache: "no-store" });
    if (!response.ok) return null;
    const data: DashboardResponse = await response.json();
    return Number(data.stats?.newMessages ?? 0);
  } catch (error) {
    console.error("NOTIFICATION COUNT ERROR:", error);
    return null;
  }
}

async function requestAdmin(): Promise<AdminUser | null> {
  try {
    const response = await fetch("/api/admin/me", { method: "GET", cache: "no-store", credentials: "include" });
    if (!response.ok) return null;
    const data: AdminMeResponse = await response.json();
    return data.success && data.user ? data.user : null;
  } catch (error) {
    console.error("ADMIN PROFILE ERROR:", error);
    return null;
  }
}

/* Behaviour unchanged (count refreshes every 30s); only the styling is new. */
export function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
  const [notificationCount, setNotificationCount] = useState(0);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = () =>
      requestNotificationCount().then((count) => {
        if (!cancelled && count !== null) setNotificationCount(count);
      });
    load();
    const interval = window.setInterval(load, 30000);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    requestAdmin().then((user) => {
      if (cancelled) return;
      setAdmin(user);
      setAdminLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const displayName = admin?.name?.trim() || "Admin";
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const displayRole = admin?.role || "Administrator";

  const iconBtn =
    "relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-(--wow-line) bg-(--wow-card) text-(--wow-ink-2) transition hover:border-(--wow-ink) hover:text-(--wow-ink)";

  return (
    <header className="sticky top-0 z-50 flex h-[76px] w-full items-center border-b border-(--wow-line) bg-(--wow-paper-2)/85 px-4 backdrop-blur-xl sm:px-6 lg:h-[88px] lg:px-10">
      <div className="flex w-full min-w-0 items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button type="button" onClick={onMenuClick} aria-label="Open sidebar" className={`${iconBtn} lg:hidden`}>
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <p className="truncate text-[10px] font-semibold uppercase tracking-[0.2em] text-(--wow-gold)">Admin Panel</p>
            <p className="wow-serif mt-0.5 truncate text-[17px] font-semibold">Whispers of Wisdom</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <Link
            href="/admin/contact-messages"
            aria-label={notificationCount > 0 ? `${notificationCount} new notifications` : "Notifications"}
            title="Contact Messages"
            className={`${iconBtn} group`}
          >
            <Bell className="h-[18px] w-[18px] transition-transform group-hover:rotate-6" />
            {notificationCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-(--wow-gold) px-1 text-[9px] font-bold text-white ring-[3px] ring-(--wow-paper-2)">
                {notificationCount > 99 ? "99+" : notificationCount}
              </span>
            )}
          </Link>

          <div className="mx-1 hidden h-8 w-px bg-(--wow-line) xl:block" />

          <button type="button" className="group flex shrink-0 items-center gap-3 rounded-full p-1 transition hover:bg-(--wow-card)">
            <div className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-(--wow-ink) text-[13px] font-bold text-(--wow-paper)">
              {adminLoading ? "..." : avatarLetter}
              <span className="absolute bottom-0 right-0 h-[10px] w-[10px] rounded-full border-2 border-(--wow-paper-2) bg-emerald-500" />
            </div>
            <div className="hidden min-w-0 max-w-[180px] text-left xl:block">
              <p className="truncate text-[13px] font-semibold leading-tight">{adminLoading ? "Loading..." : displayName}</p>
              <p className="mt-1 truncate text-[11px] leading-none text-(--wow-muted)">{displayRole}</p>
            </div>
            <ChevronDown className="mr-2 hidden h-4 w-4 text-(--wow-muted) transition-transform group-hover:translate-y-0.5 xl:block" />
          </button>
        </div>
      </div>
    </header>
  );
}
