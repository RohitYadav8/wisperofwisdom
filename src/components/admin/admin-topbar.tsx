"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import {
  Bell,
  ChevronDown,
  Menu,
} from "lucide-react";

import { ThemeToggle } from "../ui/theme-toggle";

type AdminTopbarProps = {
  onMenuClick: () => void;
};

type DashboardResponse = {
  stats?: {
    newMessages?: number;
  };
};

export function AdminTopbar({
  onMenuClick,
}: AdminTopbarProps) {
  const [notificationCount, setNotificationCount] =
    useState(0);

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await fetch(
        "/api/admin/dashboard",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      if (!response.ok) {
        return;
      }

      const data: DashboardResponse =
        await response.json();

      setNotificationCount(
        Number(data.stats?.newMessages ?? 0)
      );
    } catch (error) {
      console.error(
        "NOTIFICATION COUNT ERROR:",
        error
      );
    }
  }, []);

  useEffect(() => {
    fetchNotifications();

    const interval = window.setInterval(() => {
      fetchNotifications();
    }, 30000);

    return () => {
      window.clearInterval(interval);
    };
  }, [fetchNotifications]);

  return (
    <header
      className="
        sticky
        top-0
        z-50
        flex
        h-[86px]
        items-center
        border-b
        border-slate-200/80
        bg-white/85
        px-4
        backdrop-blur-2xl
        sm:px-6
        lg:px-8
        xl:px-10
        dark:border-white/[0.08]
        dark:bg-[#071522]/90
      "
    >
      <div className="flex w-full items-center justify-between gap-4">
        {/* =====================================================
            LEFT
        ===================================================== */}

        <div className="flex min-w-0 flex-1 items-center gap-4">
          {/* MOBILE MENU */}

          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open sidebar"
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-600
              shadow-sm
              transition-all
              duration-300
              hover:border-[#2196F3]/30
              hover:bg-[#2196F3]/5
              hover:text-[#2196F3]
              dark:border-white/10
              dark:bg-white/[0.05]
              dark:text-slate-300
              dark:hover:bg-[#2196F3]/10
              dark:hover:text-[#64B5F6]
              lg:hidden
            "
          >
            <Menu size={20} />
          </button>

          {/* =================================================
              MOBILE TITLE
          ================================================= */}

          <div className="min-w-0 lg:hidden">
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#2196F3]
              "
            >
              Admin Panel
            </p>

            <p
              className="
                truncate
                text-[14px]
                font-semibold
                text-[#0F172A]
                dark:text-white
              "
            >
              Whispers of Wisdom
            </p>
          </div>
        </div>

        {/* =====================================================
            RIGHT
        ===================================================== */}

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* =================================================
              THEME TOGGLE
          ================================================= */}

          <ThemeToggle />

          {/* =================================================
              NOTIFICATIONS
          ================================================= */}

          <Link
            href="/admin/contact-messages"
            aria-label={
              notificationCount > 0
                ? `${notificationCount} new notifications`
                : "Notifications"
            }
            title="Contact Messages"
            className="
              group
              relative
              flex
              h-[44px]
              w-[44px]
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white
              text-slate-500
              shadow-sm
              transition-all
              duration-300
              hover:border-[#2196F3]/30
              hover:bg-[#2196F3]/5
              hover:text-[#2196F3]
              dark:border-white/10
              dark:bg-white/[0.05]
              dark:text-slate-300
              dark:hover:bg-[#2196F3]/10
              dark:hover:text-[#64B5F6]
            "
          >
            <Bell
              size={18}
              className="
                transition-transform
                duration-300
                group-hover:rotate-6
              "
            />

            {/* REAL NOTIFICATION COUNT */}

            {notificationCount > 0 && (
              <span
                className="
                  absolute
                  -right-0.5
                  -top-0.5
                  flex
                  h-[17px]
                  min-w-[17px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[#2196F3]
                  px-1
                  text-[9px]
                  font-bold
                  leading-none
                  text-white
                  ring-[3px]
                  ring-white
                  dark:ring-[#071522]
                "
              >
                {notificationCount > 99
                  ? "99+"
                  : notificationCount}
              </span>
            )}
          </Link>

          {/* =================================================
              DIVIDER
          ================================================= */}

          <div
            className="
              mx-1
              hidden
              h-8
              w-px
              bg-slate-200
              dark:bg-white/10
              xl:block
            "
          />

          {/* =================================================
              ADMIN PROFILE
          ================================================= */}

          <button
            type="button"
            className="
              group
              flex
              items-center
              gap-3
              rounded-[14px]
              p-1.5
              pr-2
              transition-all
              duration-300
              hover:bg-slate-100/80
              dark:hover:bg-white/[0.05]
              sm:pr-3
            "
          >
            {/* AVATAR */}

            <div
              className="
                relative
                flex
                h-[42px]
                w-[42px]
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-[#2196F3]
                to-[#06466B]
                text-[13px]
                font-bold
                text-white
                shadow-[0_8px_20px_rgba(33,150,243,0.20)]
                ring-2
                ring-white
                dark:ring-white/10
              "
            >
              A

              {/* ONLINE STATUS */}

              <span
                className="
                  absolute
                  bottom-0
                  right-0
                  h-[10px]
                  w-[10px]
                  rounded-full
                  border-2
                  border-white
                  bg-emerald-500
                  dark:border-[#071522]
                "
              />
            </div>

            {/* ADMIN DETAILS */}

            <div
              className="
                hidden
                min-w-[100px]
                text-left
                xl:block
              "
            >
              <p
                className="
                  truncate
                  text-[13px]
                  font-semibold
                  leading-tight
                  text-[#0F172A]
                  dark:text-white
                "
              >
                Admin User
              </p>

              <p
                className="
                  mt-1
                  text-[11px]
                  leading-none
                  text-slate-400
                  dark:text-slate-500
                "
              >
                Administrator
              </p>
            </div>

            {/* DROPDOWN */}

            <ChevronDown
              size={15}
              className="
                hidden
                text-slate-400
                transition-transform
                duration-300
                group-hover:translate-y-0.5
                xl:block
              "
            />
          </button>
        </div>
      </div>
    </header>
  );
}                                           