"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Eye,
  Inbox,
  Loader2,
  Mail,
  MessageSquare,
  RefreshCw,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";

type SubmissionSource =
  | "COMMUNITY"
  | "CONTACT"
  | "TEN_DAY_CHALLENGE";

type SubmissionStatus =
  | "NEW"
  | "READ"
  | "RESOLVED";

type ContactSubmission = {
  id: number;
  name: string | null;
  email: string;
  message: string | null;
  source: SubmissionSource;
  status: SubmissionStatus;
  createdAt: string;
  updatedAt: string;
};

type TabValue =
  | "ALL"
  | "COMMUNITY"
  | "CONTACT"
  | "TEN_DAY_CHALLENGE";

const tabs: {
  label: string;
  value: TabValue;
}[] = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "Community",
    value: "COMMUNITY",
  },
  {
    label: "10-Day Challenge",
    value: "TEN_DAY_CHALLENGE",
  },
  {
    label: "Contact",
    value: "CONTACT",
  },
];

const statuses: SubmissionStatus[] = [
  "NEW",
  "READ",
  "RESOLVED",
];

export default function AdminContactMessagesPage() {
  const [submissions, setSubmissions] = useState<
    ContactSubmission[]
  >([]);

  const [activeTab, setActiveTab] =
    useState<TabValue>("ALL");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState<"ALL" | SubmissionStatus>("ALL");

  const [selectedSubmission, setSelectedSubmission] =
    useState<ContactSubmission | null>(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [updatingId, setUpdatingId] = useState<
    number | null
  >(null);

  const [deletingId, setDeletingId] = useState<
    number | null
  >(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================================================
     FETCH SUBMISSIONS
  ========================================================= */

  const fetchSubmissions = useCallback(
    async (showRefresh = false) => {
      try {
        setError("");

        if (showRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const params = new URLSearchParams();

        if (activeTab !== "ALL") {
          params.set("source", activeTab);
        }

        if (statusFilter !== "ALL") {
          params.set("status", statusFilter);
        }

        if (search.trim()) {
          params.set("search", search.trim());
        }

        const query = params.toString();

        const response = await fetch(
          `/api/admin/contact-messages${
            query ? `?${query}` : ""
          }`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              "Unable to load contact messages."
          );
        }

        setSubmissions(
          Array.isArray(data) ? data : data.submissions ?? []
        );
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to load contact messages."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [activeTab, search, statusFilter]
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchSubmissions();
    }, 300);

    return () => {
      window.clearTimeout(timer);
    };
  }, [fetchSubmissions]);

  /* =========================================================
     UPDATE STATUS
  ========================================================= */

  async function updateStatus(
    submission: ContactSubmission,
    status: SubmissionStatus
  ) {
    if (submission.status === status) {
      return;
    }

    try {
      setUpdatingId(submission.id);
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/admin/contact-messages/${submission.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to update status."
        );
      }

      setSubmissions((current) =>
        current.map((item) =>
          item.id === submission.id
            ? {
                ...item,
                status,
              }
            : item
        )
      );

      setSelectedSubmission((current) =>
        current?.id === submission.id
          ? {
              ...current,
              status,
            }
          : current
      );

      setSuccess("Status updated successfully.");

      window.setTimeout(() => {
        setSuccess("");
      }, 2500);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to update status."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  /* =========================================================
     DELETE
  ========================================================= */

  async function deleteSubmission(
    submission: ContactSubmission
  ) {
    const confirmed = window.confirm(
      `Delete submission from ${submission.email}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(submission.id);
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/admin/contact-messages/${submission.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to delete submission."
        );
      }

      setSubmissions((current) =>
        current.filter(
          (item) => item.id !== submission.id
        )
      );

      if (selectedSubmission?.id === submission.id) {
        setSelectedSubmission(null);
      }

      setSuccess("Submission deleted successfully.");

      window.setTimeout(() => {
        setSuccess("");
      }, 2500);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to delete submission."
      );
    } finally {
      setDeletingId(null);
    }
  }

  /* =========================================================
     OPEN DETAILS
  ========================================================= */

  function openDetails(
    submission: ContactSubmission
  ) {
    setSelectedSubmission(submission);

    if (submission.status === "NEW") {
      void updateStatus(submission, "READ");
    }
  }

  /* =========================================================
     COUNTS
  ========================================================= */

  const counts = useMemo(() => {
    return {
      total: submissions.length,

      new: submissions.filter(
        (item) => item.status === "NEW"
      ).length,

      read: submissions.filter(
        (item) => item.status === "READ"
      ).length,

      resolved: submissions.filter(
        (item) => item.status === "RESOLVED"
      ).length,
    };
  }, [submissions]);

  return (
    <>
      <div className="min-h-screen">
        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2196F3]">
              Communication
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Contact Messages
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Manage community signups, 10-day challenge
              registrations, and contact form messages.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void fetchSubmissions(true)}
            disabled={refreshing}
            className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:border-[#2196F3]/30 hover:text-[#2196F3] disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-[#0B2031] dark:text-slate-300"
          >
            <RefreshCw
              size={16}
              className={
                refreshing ? "animate-spin" : ""
              }
            />

            Refresh
          </button>
        </div>

        {/* =====================================================
            ALERTS
        ===================================================== */}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span>{success}</span>
          </div>
        )}

        {/* =====================================================
            STATS
        ===================================================== */}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total"
            value={counts.total}
            icon={Inbox}
          />

          <StatCard
            title="New"
            value={counts.new}
            icon={Mail}
          />

          <StatCard
            title="Read"
            value={counts.read}
            icon={Eye}
          />

          <StatCard
            title="Resolved"
            value={counts.resolved}
            icon={CheckCircle2}
          />
        </div>

        {/* =====================================================
            MAIN CARD
        ===================================================== */}

        <div className="mt-7 overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.04)] dark:border-white/[0.07] dark:bg-[#0B2031] dark:shadow-none">
          {/* TABS */}

          <div className="border-b border-slate-200/80 px-5 pt-5 dark:border-white/[0.07]">
            <div className="flex gap-2 overflow-x-auto pb-4">
              {tabs.map((tab) => {
                const active =
                  activeTab === tab.value;

                return (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() =>
                      setActiveTab(tab.value)
                    }
                    className={`
                      whitespace-nowrap
                      rounded-xl
                      px-4
                      py-2.5
                      text-sm
                      font-medium
                      transition
                      ${
                        active
                          ? "bg-[#2196F3] text-white shadow-[0_8px_20px_rgba(33,150,243,0.22)]"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-white/[0.04] dark:text-slate-400 dark:hover:bg-white/[0.07]"
                      }
                    `}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* FILTERS */}

          <div className="flex flex-col gap-4 border-b border-slate-200/80 p-5 dark:border-white/[0.07] lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-[420px]">
              <Search
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search name, email or message..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#2196F3]/50 focus:ring-4 focus:ring-[#2196F3]/10 dark:border-white/10 dark:bg-[#071B29] dark:text-white"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value as
                    | "ALL"
                    | SubmissionStatus
                )
              }
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#2196F3]/50 dark:border-white/10 dark:bg-[#071B29] dark:text-slate-300"
            >
              <option value="ALL">
                All Statuses
              </option>

              <option value="NEW">New</option>

              <option value="READ">Read</option>

              <option value="RESOLVED">
                Resolved
              </option>
            </select>
          </div>

          {/* ===================================================
              TABLE
          =================================================== */}

          {loading ? (
            <div className="flex min-h-[360px] items-center justify-center">
              <div className="text-center">
                <Loader2 className="mx-auto h-7 w-7 animate-spin text-[#2196F3]" />

                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  Loading messages...
                </p>
              </div>
            </div>
          ) : submissions.length === 0 ? (
            <div className="flex min-h-[360px] items-center justify-center px-6">
              <div className="max-w-md text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2196F3]/10 text-[#2196F3]">
                  <Inbox size={24} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
                  No messages found
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  There are currently no submissions matching
                  your selected filters.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px]">
                <thead>
                  <tr className="border-b border-slate-200/80 bg-slate-50/70 dark:border-white/[0.07] dark:bg-white/[0.02]">
                    <TableHeading>
                      User
                    </TableHeading>

                    <TableHeading>
                      Source
                    </TableHeading>

                    <TableHeading>
                      Message
                    </TableHeading>

                    <TableHeading>
                      Date
                    </TableHeading>

                    <TableHeading>
                      Status
                    </TableHeading>

                    <TableHeading align="right">
                      Actions
                    </TableHeading>
                  </tr>
                </thead>

                <tbody>
                  {submissions.map((submission) => (
                    <tr
                      key={submission.id}
                      className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50/70 dark:border-white/[0.05] dark:hover:bg-white/[0.025]"
                    >
                      {/* USER */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2196F3]/10 text-sm font-semibold text-[#2196F3]">
                            {getInitial(
                              submission.name,
                              submission.email
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="max-w-[200px] truncate text-sm font-semibold text-slate-800 dark:text-white">
                              {submission.name ||
                                "Community Member"}
                            </p>

                            <p className="mt-1 max-w-[220px] truncate text-xs text-slate-500 dark:text-slate-400">
                              {submission.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* SOURCE */}

                      <td className="px-5 py-4">
                        <SourceBadge
                          source={submission.source}
                        />
                      </td>

                      {/* MESSAGE */}

                      <td className="px-5 py-4">
                        <p className="max-w-[280px] truncate text-sm text-slate-500 dark:text-slate-400">
                          {submission.message ||
                            getDefaultMessage(
                              submission.source
                            )}
                        </p>
                      </td>

                      {/* DATE */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <Clock3
                            size={14}
                            className="shrink-0"
                          />

                          {formatDate(
                            submission.createdAt
                          )}
                        </div>
                      </td>

                      {/* STATUS */}

                      <td className="px-5 py-4">
                        <select
                          value={submission.status}
                          disabled={
                            updatingId ===
                            submission.id
                          }
                          onChange={(event) =>
                            void updateStatus(
                              submission,
                              event.target
                                .value as SubmissionStatus
                            )
                          }
                          className={`
                            h-9
                            rounded-lg
                            border
                            px-3
                            text-xs
                            font-semibold
                            outline-none
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                            ${getStatusClass(
                              submission.status
                            )}
                          `}
                        >
                          {statuses.map((status) => (
                            <option
                              key={status}
                              value={status}
                            >
                              {formatStatus(status)}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* ACTIONS */}

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              openDetails(
                                submission
                              )
                            }
                            title="View details"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-[#2196F3]/30 hover:bg-[#2196F3]/5 hover:text-[#2196F3] dark:border-white/10 dark:text-slate-400"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              void deleteSubmission(
                                submission
                              )
                            }
                            disabled={
                              deletingId ===
                              submission.id
                            }
                            title="Delete"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-500/20 dark:hover:bg-red-500/10"
                          >
                            {deletingId ===
                            submission.id ? (
                              <Loader2
                                size={16}
                                className="animate-spin"
                              />
                            ) : (
                              <Trash2 size={16} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* =======================================================
          DETAILS MODAL
      ======================================================= */}

      {selectedSubmission && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              setSelectedSubmission(null);
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-[650px] overflow-y-auto rounded-[26px] border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0B2031]">
            {/* MODAL HEADER */}

            <div className="flex items-start justify-between border-b border-slate-200/80 px-6 py-5 dark:border-white/[0.07]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2196F3]">
                  Submission Details
                </p>

                <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                  {selectedSubmission.name ||
                    "Community Member"}
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedSubmission(null)
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/[0.06] dark:hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            {/* MODAL CONTENT */}

            <div className="space-y-6 p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <DetailItem
                  label="Name"
                  value={
                    selectedSubmission.name || "—"
                  }
                />

                <DetailItem
                  label="Email"
                  value={selectedSubmission.email}
                />

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Source
                  </p>

                  <div className="mt-2">
                    <SourceBadge
                      source={
                        selectedSubmission.source
                      }
                    />
                  </div>
                </div>

                <DetailItem
                  label="Submitted"
                  value={formatDateTime(
                    selectedSubmission.createdAt
                  )}
                />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  Message
                </p>

                <div className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600 dark:border-white/10 dark:bg-[#071B29] dark:text-slate-300">
                  {selectedSubmission.message ||
                    getDefaultMessage(
                      selectedSubmission.source
                    )}
                </div>
              </div>

              {/* STATUS */}

              <div>
                <label
                  htmlFor="submission-status"
                  className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400"
                >
                  Status
                </label>

                <select
                  id="submission-status"
                  value={selectedSubmission.status}
                  disabled={
                    updatingId ===
                    selectedSubmission.id
                  }
                  onChange={(event) =>
                    void updateStatus(
                      selectedSubmission,
                      event.target
                        .value as SubmissionStatus
                    )
                  }
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-[#2196F3]/50 dark:border-white/10 dark:bg-[#071B29] dark:text-white"
                >
                  {statuses.map((status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {formatStatus(status)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end border-t border-slate-200/80 pt-5 dark:border-white/[0.07]">
                <button
                  type="button"
                  onClick={() =>
                    void deleteSubmission(
                      selectedSubmission
                    )
                  }
                  disabled={
                    deletingId ===
                    selectedSubmission.id
                  }
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-red-200 px-4 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-500/20 dark:hover:bg-red-500/10"
                >
                  {deletingId ===
                  selectedSubmission.id ? (
                    <Loader2
                      size={15}
                      className="animate-spin"
                    />
                  ) : (
                    <Trash2 size={15} />
                  )}

                  Delete Submission
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: typeof Inbox;
}) {
  return (
    <div className="rounded-[20px] border border-slate-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.04)] dark:border-white/[0.07] dark:bg-[#0B2031] dark:shadow-none">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2196F3]/10 text-[#2196F3]">
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   TABLE HEADING
========================================================= */

function TableHeading({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-5 py-3.5 text-${align} text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400`}
    >
      {children}
    </th>
  );
}

/* =========================================================
   SOURCE BADGE
========================================================= */

function SourceBadge({
  source,
}: {
  source: SubmissionSource;
}) {
  const config = {
    COMMUNITY: {
      label: "Community",
      icon: Users,
      className:
        "border-violet-200 bg-violet-50 text-violet-600 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-400",
    },

    TEN_DAY_CHALLENGE: {
      label: "10-Day Challenge",
      icon: Clock3,
      className:
        "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400",
    },

    CONTACT: {
      label: "Contact",
      icon: MessageSquare,
      className:
        "border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400",
    },
  }[source];

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-semibold ${config.className}`}
    >
      <Icon size={12} />

      {config.label}
    </span>
  );
}

/* =========================================================
   DETAIL ITEM
========================================================= */

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-medium text-slate-700 dark:text-slate-200">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function getInitial(
  name: string | null,
  email: string
) {
  if (name?.trim()) {
    return name.trim().charAt(0).toUpperCase();
  }

  return email.charAt(0).toUpperCase();
}

function getDefaultMessage(
  source: SubmissionSource
) {
  if (source === "COMMUNITY") {
    return "Joined the Whispers of Wisdom community.";
  }

  if (source === "TEN_DAY_CHALLENGE") {
    return "Registered for the 10-Day Whispers of Wisdom Challenge.";
  }

  return "No message provided.";
}

function formatStatus(
  status: SubmissionStatus
) {
  if (status === "NEW") {
    return "New";
  }

  if (status === "READ") {
    return "Read";
  }

  return "Resolved";
}

function getStatusClass(
  status: SubmissionStatus
) {
  if (status === "NEW") {
    return "border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400";
  }

  if (status === "READ") {
    return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400";
  }

  return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400";
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatDateTime(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}