
"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Bell, ChevronDown, Menu } from "lucide-react";
import { ThemeToggle } from "../ui/theme-toggle";

type AdminTopbarProps = {
  onMenuClick: () => void;
};

type DashboardResponse = {
  stats?: {
    newMessages?: number;
  };
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

export function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
  const [notificationCount, setNotificationCount] = useState(0);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [adminLoading, setAdminLoading] = useState(true);

  /* ---------------------------------------------
     FETCH NOTIFICATIONS
  --------------------------------------------- */

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/dashboard", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        return;
      }

      const data: DashboardResponse = await response.json();

      setNotificationCount(Number(data.stats?.newMessages ?? 0));
    } catch (error) {
      console.error("NOTIFICATION COUNT ERROR:", error);
    }
  }, []);

  /* ---------------------------------------------
     FETCH LOGGED-IN ADMIN
  --------------------------------------------- */

  const fetchAdmin = useCallback(async () => {
    try {
      setAdminLoading(true);

      const response = await fetch("/api/admin/me", {
        method: "GET",
        cache: "no-store",
        credentials: "include",
      });

      if (!response.ok) {
        setAdmin(null);
        return;
      }

      const data: AdminMeResponse = await response.json();

      if (data.success && data.user) {
        setAdmin(data.user);
      } else {
        setAdmin(null);
      }
    } catch (error) {
      console.error("ADMIN PROFILE ERROR:", error);
      setAdmin(null);
    } finally {
      setAdminLoading(false);
    }
  }, []);

  /* ---------------------------------------------
     NOTIFICATION INTERVAL
  --------------------------------------------- */

  useEffect(() => {
    fetchNotifications();

    const interval = window.setInterval(() => {
      fetchNotifications();
    }, 30000);

    return () => {
      window.clearInterval(interval);
    };
  }, [fetchNotifications]);

  /* ---------------------------------------------
     ADMIN PROFILE
  --------------------------------------------- */

  useEffect(() => {
    fetchAdmin();
  }, [fetchAdmin]);

  /* ---------------------------------------------
     ADMIN DISPLAY DATA
  --------------------------------------------- */

  const displayName = admin?.name?.trim() || "Admin";

  const avatarLetter = displayName.charAt(0).toUpperCase();

  const displayRole = admin?.role || "Administrator";

  return (
    <header
      className="
        sticky
        top-0
        z-50
        flex
        h-[72px]
        w-full
        items-center
        border-b
        border-slate-200/80
        bg-white/90
        px-3
        backdrop-blur-2xl

        sm:h-[78px]
        sm:px-5

        md:px-6

        lg:h-[86px]
        lg:px-8

        xl:px-10

        dark:border-white/[0.08]
        dark:bg-[#071522]/90
      "
    >
      <div className="flex w-full min-w-0 items-center justify-between gap-2 sm:gap-4">
        {/* =====================================================
            LEFT SIDE
        ====================================================== */}

        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 md:gap-4">
          {/* MOBILE / TABLET MENU */}

          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open sidebar"
            className="
              flex
              h-10
              w-10
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

              sm:h-11
              sm:w-11

              dark:border-white/10
              dark:bg-white/[0.05]
              dark:text-slate-300
              dark:hover:bg-[#2196F3]/10
              dark:hover:text-[#64B5F6]

              lg:hidden
            "
          >
            <Menu size={19} className="sm:size-20" />
          </button>

          {/* MOBILE / TABLET TITLE */}

          <div className="min-w-0 lg:hidden">
            <p
              className="
                truncate
                text-[8px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#2196F3]

                sm:text-[9px]
                sm:tracking-[0.18em]
              "
            >
              Admin Panel
            </p>

            <p
              className="
                max-w-[150px]
                truncate
                text-[13px]
                font-semibold
                text-[#0F172A]

                sm:max-w-[240px]
                sm:text-[14px]

                dark:text-white
              "
            >
              Whispers of Wisdom
            </p>
          </div>

          {/* DESKTOP TITLE */}

          <div className="hidden min-w-0 lg:block">
            <p
              className="
                text-[10px]
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
                mt-1
                truncate
                text-[15px]
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
            RIGHT SIDE
        ====================================================== */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-1.5

            sm:gap-2

            md:gap-3
          "
        >
          {/* =================================================
              THEME TOGGLE
          ================================================== */}

          <div className="shrink-0">
            <ThemeToggle />
          </div>

          {/* =================================================
              NOTIFICATIONS
          ================================================== */}

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
              h-10
              w-10
              shrink-0
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

              sm:h-11
              sm:w-11

              dark:border-white/10
              dark:bg-white/[0.05]
              dark:text-slate-300
              dark:hover:bg-[#2196F3]/10
              dark:hover:text-[#64B5F6]
            "
          >
            <Bell
              size={17}
              className="
                transition-transform
                duration-300
                group-hover:rotate-6

                sm:size-[18px]
              "
            />

            {/* NOTIFICATION BADGE */}

            {notificationCount > 0 && (
              <span
                className="
                  absolute
                  -right-0.5
                  -top-0.5
                  flex
                  h-[16px]
                  min-w-[16px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[#2196F3]
                  px-1
                  text-[8px]
                  font-bold
                  leading-none
                  text-white
                  ring-2
                  ring-white

                  sm:h-[17px]
                  sm:min-w-[17px]
                  sm:text-[9px]
                  sm:ring-[3px]

                  dark:ring-[#071522]
                "
              >
                {notificationCount > 99 ? "99+" : notificationCount}
              </span>
            )}
          </Link>

          {/* =================================================
              DESKTOP DIVIDER
          ================================================== */}

          <div
            className="
              mx-1
              hidden
              h-8
              w-px
              bg-slate-200

              xl:block

              dark:bg-white/10
            "
          />

          {/* =================================================
              ADMIN PROFILE
          ================================================== */}

          <button
            type="button"
            className="
              group
              flex
              shrink-0
              items-center
              gap-1.5
              rounded-[13px]
              p-1
              transition-all
              duration-300

              hover:bg-slate-100/80

              sm:gap-2
              sm:p-1.5

              md:gap-3

              dark:hover:bg-white/[0.05]
            "
          >
            {/* AVATAR */}

            <div
              className="
                relative
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-[#2196F3]
                to-[#06466B]
                text-[12px]
                font-bold
                text-white
                shadow-[0_8px_20px_rgba(33,150,243,0.20)]
                ring-2
                ring-white

                sm:h-[42px]
                sm:w-[42px]
                sm:text-[13px]

                dark:ring-white/10
              "
            >
              {adminLoading ? "..." : avatarLetter}

              {/* ONLINE STATUS */}

              <span
                className="
                  absolute
                  bottom-0
                  right-0
                  h-[8px]
                  w-[8px]
                  rounded-full
                  border-2
                  border-white
                  bg-emerald-500

                  sm:h-[10px]
                  sm:w-[10px]

                  dark:border-[#071522]
                "
              />
            </div>

            {/* ADMIN DETAILS
                Hidden on mobile/tablet.
                Visible on large screens.
            */}

            <div
              className="
                hidden
                min-w-0
                max-w-[180px]
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
                {adminLoading ? "Loading..." : displayName}
              </p>

              <p
                className="
                  mt-1
                  truncate
                  text-[11px]
                  leading-none
                  text-slate-400
                  dark:text-slate-500
                "
              >
                {displayRole}
              </p>
            </div>

            {/* DROPDOWN ICON */}

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


