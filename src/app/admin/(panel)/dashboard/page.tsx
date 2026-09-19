"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Loader2,
  MessageSquareText,
  RefreshCw,
  Star,
  Users,
} from "lucide-react";

type DashboardData = {
  stats: {
    totalBooks: number;
    activeBooks: number;
    totalUsers: number;
    totalMessages: number;
    newMessages: number;
  };
};

const quickActions = [
  {
    label: "Manage Books",
    description: "Add or update books",
    href: "/admin/books",
    icon: BookOpen,
  },
  {
    label: "Manage Reviews",
    description: "Review customer feedback",
    href: "/admin/reviews",
    icon: Star,
  },
  {
    label: "Contact Messages",
    description: "View contact enquiries",
    href: "/admin/contact-messages",
    icon: MessageSquareText,
  },
];

export default function AdminDashboardPage() {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchDashboard = useCallback(
    async (manualRefresh = false) => {
      try {
        if (manualRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const response = await fetch(
          "/api/admin/dashboard",
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              "Failed to load dashboard data."
          );
        }

        setDashboard(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load dashboard data."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const stats = [
    {
      label: "Total Books",
      value: dashboard?.stats.totalBooks ?? 0,
      description: "Books available",
      icon: BookOpen,
    },
    {
      label: "Total Reviews",
      value: 0,
      description: "Customer reviews",
      icon: Star,
    },
    {
      label: "Total Users",
      value: dashboard?.stats.totalUsers ?? 0,
      description: "Registered users",
      icon: Users,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1600px]">
      {/* =====================================================
          DASHBOARD HEADER
      ===================================================== */}

      <section
        className="
          mb-7
          flex
          flex-col
          gap-5
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* LEFT */}

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1
              className="
                font-serif
                text-[30px]
                font-semibold
                tracking-[-0.035em]
                text-[#0F172A]
                sm:text-[36px]
                lg:text-[40px]
                dark:text-white
              "
            >
              Welcome back, Admin 👋
            </h1>

            {/* DATABASE STATUS */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-emerald-500/20
                bg-emerald-500/[0.07]
                px-3
                py-1.5
                text-[11px]
                font-semibold
                text-emerald-600
                dark:border-emerald-400/15
                dark:bg-emerald-400/[0.07]
                dark:text-emerald-400
              "
            >
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-500
                  shadow-[0_0_0_4px_rgba(16,185,129,0.10)]
                "
              />

              Database Ready
            </div>
          </div>

          <p
            className="
              mt-2
              max-w-2xl
              text-[13px]
              leading-6
              text-slate-500
              sm:text-[14px]
              dark:text-slate-400
            "
          >
            Here&apos;s an overview of your Whispers of
            Wisdom store.
          </p>
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={refreshing}
            onClick={() => fetchDashboard(true)}
            className="
              inline-flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-[13px]
              border
              border-slate-200
              bg-white
              px-4
              text-[12px]
              font-semibold
              text-slate-600
              shadow-sm
              transition-all
              duration-300
              hover:border-[#2196F3]/30
              hover:text-[#2196F3]
              disabled:cursor-not-allowed
              disabled:opacity-60
              dark:border-white/10
              dark:bg-[#0B2031]
              dark:text-slate-300
              dark:hover:border-[#2196F3]/30
              dark:hover:text-[#64B5F6]
            "
          >
            <RefreshCw
              size={15}
              className={
                refreshing ? "animate-spin" : ""
              }
            />

            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </section>

      {/* ERROR */}

      {error && (
        <div
          className="
            mb-6
            rounded-[14px]
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-[12px]
            font-medium
            text-red-600
            dark:border-red-500/20
            dark:bg-red-500/10
            dark:text-red-400
          "
        >
          {error}
        </div>
      )}

      {/* =====================================================
          STATS
      ===================================================== */}

      <section
        className="
          grid
          gap-4
          sm:grid-cols-2
          xl:grid-cols-3
        "
      >
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.label}
              className="
                group
                relative
                overflow-hidden
                rounded-[20px]
                border
                border-slate-200/80
                bg-white
                p-5
                shadow-[0_8px_30px_rgba(15,23,42,0.04)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#2196F3]/25
                hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]
                dark:border-white/[0.08]
                dark:bg-[#0B2031]
                dark:shadow-[0_12px_35px_rgba(0,0,0,0.18)]
              "
            >
              {/* DECORATION */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -right-12
                  -top-12
                  h-32
                  w-32
                  rounded-full
                  bg-[#7C3AED]/[0.08]
                  blur-2xl
                  dark:bg-[#7C3AED]/[0.12]
                "
              />

              <div className="relative flex items-center gap-4">
                {/* ICON */}

                <div
                  className="
                    flex
                    h-[56px]
                    w-[56px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#7C3AED]/20
                    bg-[#7C3AED]/10
                    text-[#7C3AED]
                    shadow-[0_0_25px_rgba(124,58,237,0.08)]
                    transition-transform
                    duration-300
                    group-hover:scale-105
                    dark:border-[#8B5CF6]/25
                    dark:bg-[#7C3AED]/20
                    dark:text-[#A78BFA]
                    dark:shadow-[0_0_30px_rgba(124,58,237,0.12)]
                  "
                >
                  <Icon
                    size={23}
                    strokeWidth={1.8}
                  />
                </div>

                {/* CONTENT */}

                <div className="min-w-0">
                  <p
                    className="
                      text-[12px]
                      font-medium
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    {item.label}
                  </p>

                  <div className="mt-1 min-h-[38px]">
                    {loading ? (
                      <Loader2
                        size={22}
                        className="
                          mt-2
                          animate-spin
                          text-[#7C3AED]
                          dark:text-[#A78BFA]
                        "
                      />
                    ) : (
                      <p
                        className="
                          text-[29px]
                          font-bold
                          leading-tight
                          tracking-[-0.04em]
                          text-[#0F172A]
                          dark:text-white
                        "
                      >
                        {item.value}
                      </p>
                    )}
                  </div>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      text-slate-400
                      dark:text-slate-500
                    "
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <section
        className="
          mt-6
          rounded-[22px]
          border
          border-slate-200/80
          bg-white
          p-5
          shadow-[0_8px_30px_rgba(15,23,42,0.04)]
          sm:p-6
          dark:border-white/[0.08]
          dark:bg-[#0B2031]
          dark:shadow-[0_12px_35px_rgba(0,0,0,0.18)]
        "
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              className="
                text-[16px]
                font-semibold
                text-[#0F172A]
                dark:text-white
              "
            >
              Quick Actions
            </h2>

            <p
              className="
                mt-1
                text-[12px]
                text-slate-400
              "
            >
              Manage your website
            </p>
          </div>

          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-emerald-500/10
              text-emerald-500
            "
          >
            <CheckCircle2 size={17} />
          </div>
        </div>

        <div
          className="
            mt-5
            grid
            gap-3
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {quickActions.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="
                  group
                  flex
                  min-h-[76px]
                  items-center
                  justify-between
                  gap-4
                  rounded-[16px]
                  border
                  border-slate-200/70
                  bg-slate-50/50
                  px-4
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-[#7C3AED]/25
                  hover:bg-[#7C3AED]/[0.04]
                  dark:border-white/[0.07]
                  dark:bg-white/[0.025]
                  dark:hover:border-[#8B5CF6]/25
                  dark:hover:bg-[#7C3AED]/[0.08]
                "
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#7C3AED]/10
                      text-[#7C3AED]
                      dark:bg-[#7C3AED]/15
                      dark:text-[#A78BFA]
                    "
                  >
                    <Icon size={18} />
                  </div>

                  <div className="min-w-0">
                    <p
                      className="
                        truncate
                        text-[13px]
                        font-semibold
                        text-slate-700
                        dark:text-slate-300
                      "
                    >
                      {item.label}
                    </p>

                    <p
                      className="
                        mt-1
                        truncate
                        text-[10px]
                        text-slate-400
                        dark:text-slate-500
                      "
                    >
                      {item.description}
                    </p>
                  </div>
                </div>

                <ArrowRight
                  size={16}
                  className="
                    shrink-0
                    text-slate-300
                    transition-all
                    duration-300
                    group-hover:translate-x-1
                    group-hover:text-[#7C3AED]
                    dark:text-slate-600
                    dark:group-hover:text-[#A78BFA]
                  "
                />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}