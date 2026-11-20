"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, BookOpen, CheckCircle2, Loader2, MessageSquareText, RefreshCw, Users } from "lucide-react";

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
  { label: "Manage Books", description: "Add or update books", href: "/admin/books", icon: BookOpen },
  { label: "Contact Messages", description: "View contact enquiries", href: "/admin/contact-messages", icon: MessageSquareText },
];

type DashboardResult = { data: DashboardData; error: "" } | { data: null; error: string };

/* Pure request: no state updates, so it is safe to call from an effect. */
async function requestDashboard(): Promise<DashboardResult> {
  try {
    const response = await fetch("/api/admin/dashboard", { method: "GET", cache: "no-store" });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to load dashboard data.");
    return { data, error: "" };
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : "Failed to load dashboard data." };
  }
}

/* Text and behaviour unchanged; only the styling is new. */
export default function AdminDashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const applyResult = useCallback((result: DashboardResult) => {
    if (result.data) setDashboard(result.data);
    setError(result.error);
  }, []);

  /* first load (state is only set after the request finishes) */
  useEffect(() => {
    let cancelled = false;
    requestDashboard().then((result) => {
      if (cancelled) return;
      applyResult(result);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [applyResult]);

  /* Refresh button */
  const fetchDashboard = useCallback(async () => {
    setRefreshing(true);
    setError("");
    applyResult(await requestDashboard());
    setRefreshing(false);
  }, [applyResult]);

  const stats = [
    { label: "Total Books", value: dashboard?.stats.totalBooks ?? 0, description: "Books available", icon: BookOpen },
    { label: "Total Users", value: dashboard?.stats.totalUsers ?? 0, description: "Registered users", icon: Users },
  ];

  return (
    <div className="mx-auto w-full max-w-[1400px]">
      {/* ---------- HEADER ---------- */}
      <section className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="wow-serif text-[34px] font-semibold leading-tight tracking-[-0.02em] sm:text-[42px]">
              Welcome back, Admin 👋
            </h1>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.15)]" />
              Database Ready
            </span>
          </div>
          <p className="mt-2 text-[15px] text-(--wow-ink-2)">Here&apos;s an overview of your Whispers of Wisdom store.</p>
        </div>

        <button
          type="button"
          disabled={refreshing}
          onClick={() => fetchDashboard()}
          className="inline-flex h-12 items-center justify-center gap-2 self-start rounded-full bg-(--wow-ink) px-6 text-[14px] font-semibold text-(--wow-paper) transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 lg:self-auto"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </section>

      {error && (
        <div role="alert" className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-3.5 text-[13px] font-medium text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </div>
      )}

      {/* ---------- STATS ---------- */}
      <section className="grid gap-5 sm:grid-cols-2">
        {stats.map((item, i) => {
          const Icon = item.icon;
          const featured = i === 0;
          return (
            <article
              key={item.label}
              className={`relative overflow-hidden rounded-[28px] border p-7 transition duration-300 hover:-translate-y-1 ${
                featured ? "border-transparent bg-(--wow-ink) text-(--wow-paper)" : "border-(--wow-line) bg-(--wow-card)"
              }`}
            >
              {featured && <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border-[1.5px] border-(--wow-gold)/50" />}
              <div className="relative flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className={`text-[13px] font-medium ${featured ? "opacity-70" : "text-(--wow-ink-2)"}`}>{item.label}</p>
                  <div className="mt-2 min-h-[56px]">
                    {loading ? (
                      <Loader2 className="mt-3 h-6 w-6 animate-spin text-(--wow-gold)" />
                    ) : (
                      <p className="wow-serif text-5xl font-semibold leading-none tracking-[-0.02em]">{item.value}</p>
                    )}
                  </div>
                  <p className={`mt-3 text-[12.5px] ${featured ? "opacity-60" : "text-(--wow-muted)"}`}>{item.description}</p>
                </div>
                <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${featured ? "bg-(--wow-gold) text-white" : "bg-(--wow-brand)/12 text-(--wow-brand)"}`}>
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </span>
              </div>
            </article>
          );
        })}
      </section>

      {/* ---------- QUICK ACTIONS ---------- */}
      <section className="mt-6 rounded-[28px] border border-(--wow-line) bg-(--wow-card) p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="wow-serif text-2xl font-semibold">Quick Actions</h2>
            <p className="mt-1 text-[13px] text-(--wow-muted)">Manage your website</p>
          </div>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-[18px] w-[18px]" />
          </span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {quickActions.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex min-h-20 items-center justify-between gap-4 rounded-2xl border border-(--wow-line) bg-(--wow-paper) px-5 transition hover:-translate-y-0.5 hover:border-(--wow-ink)"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-(--wow-gold)/15 text-(--wow-gold)">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-semibold">{item.label}</p>
                    <p className="mt-0.5 truncate text-[12.5px] text-(--wow-muted)">{item.description}</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-(--wow-muted) transition group-hover:translate-x-1 group-hover:text-(--wow-ink)" />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
