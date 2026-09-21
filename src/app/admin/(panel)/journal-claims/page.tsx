"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Eye,
  Loader2,
  Mail,
  NotebookTabs,
  Phone,
  RefreshCw,
  Search,
  X,
} from "lucide-react";

type JournalClaimStatus = "NEW" | "READ";

type JournalClaim = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  challenge: string;
  goals: string;
  termsAccepted: boolean;
  marketingConsent: boolean;
  status: JournalClaimStatus;
  createdAt: string;
  updatedAt: string;
};

export default function AdminJournalClaimsPage() {
  const [claims, setClaims] = useState<JournalClaim[]>([]);
  const [selectedClaim, setSelectedClaim] =
    useState<JournalClaim | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | JournalClaimStatus
  >("ALL");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const fetchClaims = useCallback(async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch("/api/admin/journal-claims", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to fetch journal claims."
        );
      }

      setClaims(data.journalClaims ?? []);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to fetch journal claims."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void fetchClaims();
  }, [fetchClaims]);

  async function updateStatus(
    claimId: number,
    status: JournalClaimStatus
  ) {
    try {
      setUpdatingId(claimId);
      setError("");

      const response = await fetch(
        `/api/admin/journal-claims/${claimId}`,
        {
          method: "PATCH",
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
          data.message || "Unable to update journal claim."
        );
      }

      setClaims((currentClaims) =>
        currentClaims.map((claim) =>
          claim.id === claimId
            ? {
                ...claim,
                status,
              }
            : claim
        )
      );

      setSelectedClaim((currentClaim) => {
        if (!currentClaim || currentClaim.id !== claimId) {
          return currentClaim;
        }

        return {
          ...currentClaim,
          status,
        };
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to update journal claim."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  async function openClaim(claim: JournalClaim) {
    setSelectedClaim(claim);

    if (claim.status === "NEW") {
      await updateStatus(claim.id, "READ");
    }
  }

  const filteredClaims = useMemo(() => {
    const query = search.trim().toLowerCase();

    return claims.filter((claim) => {
      const fullName =
        `${claim.firstName} ${claim.lastName}`.toLowerCase();

      const matchesSearch =
        !query ||
        fullName.includes(query) ||
        claim.email.toLowerCase().includes(query) ||
        claim.phone?.toLowerCase().includes(query) ||
        claim.challenge.toLowerCase().includes(query) ||
        claim.goals.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "ALL" ||
        claim.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [claims, search, statusFilter]);

  function formatDate(value: string) {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  }

  return (
    <>
      <div className="space-y-6">
        {/* HEADER */}

        <div
          className="
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <h1
              className="
                text-2xl
                font-semibold
                tracking-tight
                text-slate-900
                dark:text-white
                sm:text-3xl
              "
            >
              Journal Claims
            </h1>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              Manage free journal requests.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void fetchClaims(true)}
            disabled={refreshing}
            className="
              inline-flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              text-sm
              font-medium
              text-slate-600
              transition
              hover:border-[#2196F3]/30
              hover:text-[#2196F3]
              disabled:cursor-not-allowed
              disabled:opacity-60
              dark:border-white/[0.08]
              dark:bg-[#0B2031]
              dark:text-slate-300
              dark:hover:text-[#64B5F6]
            "
          >
            <RefreshCw
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />

            Refresh
          </button>
        </div>

        {/* FILTERS */}

        <div
          className="
            flex
            flex-col
            gap-4
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-4
            shadow-sm
            dark:border-white/[0.08]
            dark:bg-[#0B2031]
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div className="relative w-full sm:max-w-md">
            <Search
              size={17}
              className="
                pointer-events-none
                absolute
                left-3.5
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search journal claims..."
              className="
                h-11
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                pl-10
                pr-4
                text-sm
                text-slate-900
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-[#2196F3]
                focus:ring-2
                focus:ring-[#2196F3]/10
                dark:border-white/[0.08]
                dark:bg-[#071A28]
                dark:text-white
                dark:placeholder:text-slate-500
              "
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value as
                  | "ALL"
                  | JournalClaimStatus
              )
            }
            className="
              h-11
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              text-sm
              text-slate-700
              outline-none
              transition
              focus:border-[#2196F3]
              dark:border-white/[0.08]
              dark:bg-[#071A28]
              dark:text-slate-300
              sm:min-w-[160px]
            "
          >
            <option value="ALL">All Claims</option>
            <option value="NEW">New</option>
            <option value="READ">Read</option>
          </select>
        </div>

        {/* ERROR */}

        {error && (
          <div
            className="
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-600
              dark:border-red-500/20
              dark:bg-red-500/10
              dark:text-red-400
            "
          >
            {error}
          </div>
        )}

        {/* TABLE */}

        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-sm
            dark:border-white/[0.08]
            dark:bg-[#0B2031]
          "
        >
          {loading ? (
            <div
              className="
                flex
                min-h-[360px]
                items-center
                justify-center
              "
            >
              <Loader2
                size={28}
                className="
                  animate-spin
                  text-[#2196F3]
                "
              />
            </div>
          ) : filteredClaims.length === 0 ? (
            <div
              className="
                flex
                min-h-[340px]
                flex-col
                items-center
                justify-center
                px-6
                text-center
              "
            >
              <NotebookTabs
                size={40}
                strokeWidth={1.5}
                className="
                  text-slate-300
                  dark:text-slate-600
                "
              />

              <p
                className="
                  mt-4
                  text-sm
                  font-medium
                  text-slate-600
                  dark:text-slate-300
                "
              >
                No journal claims found.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px]">
                <thead>
                  <tr
                    className="
                      border-b
                      border-slate-200
                      bg-slate-50/80
                      dark:border-white/[0.08]
                      dark:bg-white/[0.025]
                    "
                  >
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Name
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Contact
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Challenge
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Date
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody
                  className="
                    divide-y
                    divide-slate-100
                    dark:divide-white/[0.06]
                  "
                >
                  {filteredClaims.map((claim) => (
                    <tr
                      key={claim.id}
                      className="
                        transition-colors
                        hover:bg-slate-50/70
                        dark:hover:bg-white/[0.025]
                      "
                    >
                      {/* NAME */}

                      <td className="px-5 py-4">
                        <p
                          className="
                            font-medium
                            text-slate-900
                            dark:text-white
                          "
                        >
                          {claim.firstName}{" "}
                          {claim.lastName}
                        </p>
                      </td>

                      {/* CONTACT */}

                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          <div
                            className="
                              flex
                              items-center
                              gap-2
                              text-sm
                              text-slate-600
                              dark:text-slate-300
                            "
                          >
                            <Mail
                              size={14}
                              className="text-slate-400"
                            />

                            {claim.email}
                          </div>

                          {claim.phone && (
                            <div
                              className="
                                flex
                                items-center
                                gap-2
                                text-sm
                                text-slate-500
                                dark:text-slate-400
                              "
                            >
                              <Phone
                                size={14}
                                className="text-slate-400"
                              />

                              {claim.phone}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* CHALLENGE */}

                      <td className="max-w-[280px] px-5 py-4">
                        <p
                          className="
                            truncate
                            text-sm
                            text-slate-600
                            dark:text-slate-300
                          "
                          title={claim.challenge}
                        >
                          {claim.challenge}
                        </p>
                      </td>

                      {/* DATE */}

                      <td
                        className="
                          whitespace-nowrap
                          px-5
                          py-4
                          text-sm
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        {formatDate(claim.createdAt)}
                      </td>

                      {/* STATUS */}

                      <td className="px-5 py-4">
                        {claim.status === "NEW" ? (
                          <span
                            className="
                              inline-flex
                              rounded-full
                              bg-[#2196F3]/10
                              px-2.5
                              py-1
                              text-xs
                              font-semibold
                              text-[#1976D2]
                              dark:bg-[#2196F3]/15
                              dark:text-[#64B5F6]
                            "
                          >
                            New
                          </span>
                        ) : (
                          <span
                            className="
                              inline-flex
                              rounded-full
                              bg-emerald-50
                              px-2.5
                              py-1
                              text-xs
                              font-semibold
                              text-emerald-600
                              dark:bg-emerald-500/10
                              dark:text-emerald-400
                            "
                          >
                            Read
                          </span>
                        )}
                      </td>

                      {/* ACTION */}

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            void openClaim(claim)
                          }
                          disabled={updatingId === claim.id}
                          aria-label="View journal claim"
                          className="
                            inline-flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            text-slate-500
                            transition
                            hover:bg-[#2196F3]/10
                            hover:text-[#2196F3]
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                            dark:text-slate-400
                            dark:hover:bg-[#2196F3]/10
                            dark:hover:text-[#64B5F6]
                          "
                        >
                          {updatingId === claim.id ? (
                            <Loader2
                              size={17}
                              className="animate-spin"
                            />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* DETAILS MODAL */}

      {selectedClaim && (
        <div
          className="
            fixed
            inset-0
            z-[200]
            flex
            items-center
            justify-center
            overflow-y-auto
            bg-black/50
            px-4
            py-6
            backdrop-blur-[2px]
          "
        >
          <div
            className="
              relative
              w-full
              max-w-[680px]
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-2xl
              dark:border-white/[0.08]
              dark:bg-[#0B2031]
              sm:p-7
            "
          >
            {/* CLOSE */}

            <button
              type="button"
              onClick={() => setSelectedClaim(null)}
              aria-label="Close"
              className="
                absolute
                right-4
                top-4
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                text-slate-400
                transition
                hover:bg-slate-100
                hover:text-slate-700
                dark:hover:bg-white/[0.06]
                dark:hover:text-white
              "
            >
              <X size={19} />
            </button>

            <h2
              className="
                pr-12
                text-xl
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              Journal Claim Details
            </h2>

            <div className="mt-6 space-y-5">
              {/* NAME */}

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Name
                </p>

                <p
                  className="
                    mt-1.5
                    text-sm
                    font-medium
                    text-slate-900
                    dark:text-white
                  "
                >
                  {selectedClaim.firstName}{" "}
                  {selectedClaim.lastName}
                </p>
              </div>

              {/* EMAIL PHONE */}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Email
                  </p>

                  <div
                    className="
                      mt-1.5
                      flex
                      items-center
                      gap-2
                      text-sm
                      text-slate-700
                      dark:text-slate-300
                    "
                  >
                    <Mail size={15} />
                    {selectedClaim.email}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Phone
                  </p>

                  <div
                    className="
                      mt-1.5
                      flex
                      items-center
                      gap-2
                      text-sm
                      text-slate-700
                      dark:text-slate-300
                    "
                  >
                    <Phone size={15} />
                    {selectedClaim.phone || "—"}
                  </div>
                </div>
              </div>

              {/* CHALLENGE */}

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Biggest Challenge
                </p>

                <div
                  className="
                    mt-2
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    p-4
                    text-sm
                    leading-6
                    text-slate-600
                    dark:border-white/[0.07]
                    dark:bg-[#071A28]
                    dark:text-slate-300
                  "
                >
                  {selectedClaim.challenge}
                </div>
              </div>

              {/* GOALS */}

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Goals For Next 3-6 Months
                </p>

                <div
                  className="
                    mt-2
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    p-4
                    text-sm
                    leading-6
                    text-slate-600
                    dark:border-white/[0.07]
                    dark:bg-[#071A28]
                    dark:text-slate-300
                  "
                >
                  {selectedClaim.goals}
                </div>
              </div>

              {/* CONSENT */}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Terms Accepted
                  </p>

                  <div
                    className="
                      mt-2
                      flex
                      items-center
                      gap-2
                      text-sm
                      text-slate-700
                      dark:text-slate-300
                    "
                  >
                    {selectedClaim.termsAccepted ? (
                      <>
                        <CheckCircle2
                          size={16}
                          className="text-emerald-500"
                        />
                        Yes
                      </>
                    ) : (
                      "No"
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Marketing Consent
                  </p>

                  <div
                    className="
                      mt-2
                      flex
                      items-center
                      gap-2
                      text-sm
                      text-slate-700
                      dark:text-slate-300
                    "
                  >
                    {selectedClaim.marketingConsent ? (
                      <>
                        <CheckCircle2
                          size={16}
                          className="text-emerald-500"
                        />
                        Yes
                      </>
                    ) : (
                      "No"
                    )}
                  </div>
                </div>
              </div>

              {/* SUBMITTED */}

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Submitted
                </p>

                <p
                  className="
                    mt-1.5
                    text-sm
                    text-slate-600
                    dark:text-slate-300
                  "
                >
                  {formatDate(selectedClaim.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}