"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Check,
  Clock3,
  Loader2,
  Search,
  Star,
  Trash2,
  X,
} from "lucide-react";

type ReviewStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

type Review = {
  id: number;
  name: string;
  email: string;
  rating: number;
  review: string;
  status: ReviewStatus;
  createdAt: string;
  updatedAt: string;
  book: {
    id: number;
    title: string;
    slug: string;
  } | null;
};

type FilterType = "ALL" | ReviewStatus;

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<number | null>(
    null
  );
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] =
    useState<FilterType>("ALL");

  /* =======================================================
     LOAD REVIEWS
  ======================================================= */

  async function loadReviews() {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch("/api/admin/reviews", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to load reviews."
        );
      }

      setReviews(data.reviews || []);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to load reviews."
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  /* =======================================================
     UPDATE STATUS
  ======================================================= */

  async function updateStatus(
    reviewId: number,
    status: ReviewStatus
  ) {
    try {
      setLoadingId(reviewId);
      setError("");

      const response = await fetch(
        `/api/admin/reviews/${reviewId}`,
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

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to update review."
        );
      }

      setReviews((current) =>
        current.map((review) =>
          review.id === reviewId
            ? data.review
            : review
        )
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to update review."
      );
    } finally {
      setLoadingId(null);
    }
  }

  /* =======================================================
     DELETE REVIEW
  ======================================================= */

  async function deleteReview(reviewId: number) {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this review?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoadingId(reviewId);
      setError("");

      const response = await fetch(
        `/api/admin/reviews/${reviewId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to delete review."
        );
      }

      setReviews((current) =>
        current.filter(
          (review) => review.id !== reviewId
        )
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to delete review."
      );
    } finally {
      setLoadingId(null);
    }
  }

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredReviews = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reviews.filter((review) => {
      const matchesStatus =
        filter === "ALL" || review.status === filter;

      const matchesSearch =
        !query ||
        review.name.toLowerCase().includes(query) ||
        review.email.toLowerCase().includes(query) ||
        review.review.toLowerCase().includes(query) ||
        (review.book?.title || "")
          .toLowerCase()
          .includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [reviews, search, filter]);

  /* =======================================================
     COUNTS
  ======================================================= */

  const pendingCount = reviews.filter(
    (review) => review.status === "PENDING"
  ).length;

  const approvedCount = reviews.filter(
    (review) => review.status === "APPROVED"
  ).length;

  const rejectedCount = reviews.filter(
    (review) => review.status === "REJECTED"
  ).length;

  /* =======================================================
     DATE
  ======================================================= */

  function formatDate(date: string) {
    try {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date(date));
    } catch {
      return "";
    }
  }

  /* =======================================================
     STATUS
  ======================================================= */

  function statusClasses(status: ReviewStatus) {
    if (status === "APPROVED") {
      return `
        border-green-200
        bg-green-50
        text-green-600
        dark:border-green-400/20
        dark:bg-green-400/10
        dark:text-green-400
      `;
    }

    if (status === "REJECTED") {
      return `
        border-red-200
        bg-red-50
        text-red-500
        dark:border-red-400/20
        dark:bg-red-400/10
        dark:text-red-400
      `;
    }

    return `
      border-amber-200
      bg-amber-50
      text-amber-600
      dark:border-amber-400/20
      dark:bg-amber-400/10
      dark:text-amber-400
    `;
  }

  return (
    <div
      className="
        min-h-full
        bg-[#F8FAFC]
        px-4
        py-5
        sm:px-6
        sm:py-7
        lg:px-8
        dark:bg-[#061522]
      "
    >
      <div className="mx-auto max-w-[1500px]">
        {/* ===================================================
            HEADER
        ==================================================== */}

        <div
          className="
            flex
            flex-col
            gap-5
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-[#2196F3]
              "
            >
              Admin Panel
            </p>

            <h1
              className="
                mt-2
                font-serif
                text-[34px]
                font-medium
                tracking-[-0.035em]
                text-[#0F172A]
                sm:text-[40px]
                dark:text-white
              "
            >
              Reviews
            </h1>

            <p
              className="
                mt-2
                max-w-[650px]
                text-sm
                leading-6
                text-slate-500
                dark:text-slate-400
              "
            >
              Manage customer reviews submitted for your
              books.
            </p>
          </div>

          <button
            type="button"
            onClick={loadReviews}
            disabled={isLoading}
            className="
              inline-flex
              h-11
              w-fit
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-5
              text-sm
              font-semibold
              text-slate-600
              shadow-sm
              transition
              hover:border-[#2196F3]/30
              hover:text-[#2196F3]
              disabled:cursor-not-allowed
              disabled:opacity-60
              dark:border-white/10
              dark:bg-[#0B2031]
              dark:text-slate-300
            "
          >
            {isLoading ? (
              <Loader2
                size={16}
                className="animate-spin"
              />
            ) : (
              "Refresh"
            )}
          </button>
        </div>

        {/* ===================================================
            ERROR
        ==================================================== */}

        {error && (
          <div
            className="
              mt-6
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-600
              dark:border-red-400/20
              dark:bg-red-400/10
              dark:text-red-400
            "
          >
            <X size={18} className="mt-0.5 shrink-0" />

            <span>{error}</span>
          </div>
        )}

        {/* ===================================================
            STATS
        ==================================================== */}

        <div
          className="
            mt-7
            grid
            gap-4
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
          <StatCard
            label="Total Reviews"
            value={reviews.length}
            icon={<Star size={19} />}
          />

          <StatCard
            label="Pending"
            value={pendingCount}
            icon={<Clock3 size={19} />}
          />

          <StatCard
            label="Approved"
            value={approvedCount}
            icon={<Check size={19} />}
          />

          <StatCard
            label="Rejected"
            value={rejectedCount}
            icon={<X size={19} />}
          />
        </div>

        {/* ===================================================
            FILTER BAR
        ==================================================== */}

        <div
          className="
            mt-7
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-4
            shadow-[0_10px_35px_rgba(15,23,42,0.04)]
            dark:border-white/10
            dark:bg-[#071A28]
          "
        >
          <div
            className="
              flex
              flex-col
              gap-4
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            {/* SEARCH */}

            <div className="relative w-full lg:max-w-[420px]">
              <Search
                size={17}
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search reviews..."
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  pl-11
                  pr-4
                  text-sm
                  text-slate-700
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-[#2196F3]/40
                  focus:bg-white
                  dark:border-white/10
                  dark:bg-white/[0.04]
                  dark:text-white
                  dark:placeholder:text-slate-500
                  dark:focus:bg-white/[0.06]
                "
              />
            </div>

            {/* STATUS FILTER */}

            <div
              className="
                flex
                flex-wrap
                gap-2
              "
            >
              {(
                [
                  ["ALL", "All"],
                  ["PENDING", "Pending"],
                  ["APPROVED", "Approved"],
                  ["REJECTED", "Rejected"],
                ] as const
              ).map(([value, label]) => {
                const active = filter === value;

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      setFilter(value)
                    }
                    className={`
                      h-10
                      rounded-xl
                      border
                      px-4
                      text-xs
                      font-semibold
                      transition

                      ${
                        active
                          ? `
                            border-[#2196F3]
                            bg-[#2196F3]
                            text-white
                            shadow-[0_8px_20px_rgba(33,150,243,0.18)]
                          `
                          : `
                            border-slate-200
                            bg-white
                            text-slate-500
                            hover:border-[#2196F3]/30
                            hover:text-[#2196F3]
                            dark:border-white/10
                            dark:bg-white/[0.03]
                            dark:text-slate-400
                            dark:hover:text-[#64B5F6]
                          `
                      }
                    `}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ===================================================
            REVIEWS
        ==================================================== */}

        <div className="mt-7">
          {isLoading ? (
            <div
              className="
                flex
                min-h-[300px]
                items-center
                justify-center
                rounded-2xl
                border
                border-slate-200
                bg-white
                dark:border-white/10
                dark:bg-[#071A28]
              "
            >
              <div className="text-center">
                <Loader2
                  size={28}
                  className="
                    mx-auto
                    animate-spin
                    text-[#2196F3]
                  "
                />

                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  Loading reviews...
                </p>
              </div>
            </div>
          ) : filteredReviews.length === 0 ? (
            <div
              className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-6
                py-20
                text-center
                dark:border-white/10
                dark:bg-[#071A28]
              "
            >
              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#2196F3]/10
                  text-[#2196F3]
                  dark:bg-[#2196F3]/15
                "
              >
                <Star size={23} />
              </div>

              <h3 className="mt-5 text-base font-semibold text-slate-800 dark:text-white">
                No reviews found
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                There are no reviews matching your current
                filters.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReviews.map((review) => {
                const isUpdating =
                  loadingId === review.id;

                return (
                  <article
                    key={review.id}
                    className="
                      overflow-hidden
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      shadow-[0_10px_35px_rgba(15,23,42,0.04)]
                      dark:border-white/10
                      dark:bg-[#071A28]
                    "
                  >
                    <div className="p-5 sm:p-6">
                      {/* TOP */}

                      <div
                        className="
                          flex
                          flex-col
                          gap-4
                          lg:flex-row
                          lg:items-start
                          lg:justify-between
                        "
                      >
                        <div className="flex items-start gap-4">
                          {/* AVATAR */}

                          <div
                            className="
                              flex
                              h-11
                              w-11
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              bg-[#2196F3]/10
                              text-sm
                              font-bold
                              uppercase
                              text-[#2196F3]
                              dark:bg-[#2196F3]/15
                              dark:text-[#64B5F6]
                            "
                          >
                            {review.name.charAt(0)}
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-sm font-semibold text-slate-800 dark:text-white">
                                {review.name}
                              </h3>

                              <span
                                className={`
                                  inline-flex
                                  rounded-full
                                  border
                                  px-2.5
                                  py-1
                                  text-[9px]
                                  font-bold
                                  uppercase
                                  tracking-[0.08em]
                                  ${statusClasses(
                                    review.status
                                  )}
                                `}
                              >
                                {review.status}
                              </span>
                            </div>

                            <p className="mt-1 break-all text-xs text-slate-400">
                              {review.email}
                            </p>
                          </div>
                        </div>

                        <div className="text-xs text-slate-400 lg:text-right">
                          {formatDate(review.createdAt)}
                        </div>
                      </div>

                      {/* RATING */}

                      <div className="mt-5 flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(
                          (value) => (
                            <Star
                              key={value}
                              size={16}
                              fill={
                                value <= review.rating
                                  ? "currentColor"
                                  : "none"
                              }
                              className={
                                value <= review.rating
                                  ? "text-[#E5A91A]"
                                  : "text-slate-300 dark:text-slate-600"
                              }
                            />
                          )
                        )}

                        <span className="ml-2 text-xs font-medium text-slate-400">
                          {review.rating}/5
                        </span>
                      </div>

                      {/* BOOK */}

                      {review.book && (
                        <div className="mt-4">
                          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                            Book
                          </span>

                          <p className="mt-1 text-sm font-medium text-[#2196F3] dark:text-[#64B5F6]">
                            {review.book.title}
                          </p>
                        </div>
                      )}

                      {/* REVIEW */}

                      <div
                        className="
                          mt-5
                          rounded-xl
                          border
                          border-slate-100
                          bg-slate-50
                          p-4
                          dark:border-white/[0.06]
                          dark:bg-white/[0.025]
                        "
                      >
                        <p className="whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300">
                          {review.review}
                        </p>
                      </div>

                      {/* ACTIONS */}

                      <div
                        className="
                          mt-5
                          flex
                          flex-wrap
                          gap-2
                          border-t
                          border-slate-100
                          pt-5
                          dark:border-white/[0.06]
                        "
                      >
                        {review.status !==
                          "APPROVED" && (
                          <button
                            type="button"
                            disabled={isUpdating}
                            onClick={() =>
                              updateStatus(
                                review.id,
                                "APPROVED"
                              )
                            }
                            className="
                              inline-flex
                              h-10
                              items-center
                              justify-center
                              gap-2
                              rounded-xl
                              bg-green-500
                              px-4
                              text-xs
                              font-semibold
                              text-white
                              transition
                              hover:bg-green-600
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                            "
                          >
                            {isUpdating ? (
                              <Loader2
                                size={14}
                                className="animate-spin"
                              />
                            ) : (
                              <Check size={14} />
                            )}

                            Approve
                          </button>
                        )}

                        {review.status !==
                          "REJECTED" && (
                          <button
                            type="button"
                            disabled={isUpdating}
                            onClick={() =>
                              updateStatus(
                                review.id,
                                "REJECTED"
                              )
                            }
                            className="
                              inline-flex
                              h-10
                              items-center
                              justify-center
                              gap-2
                              rounded-xl
                              border
                              border-red-200
                              bg-red-50
                              px-4
                              text-xs
                              font-semibold
                              text-red-500
                              transition
                              hover:bg-red-100
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                              dark:border-red-400/20
                              dark:bg-red-400/10
                              dark:text-red-400
                              dark:hover:bg-red-400/15
                            "
                          >
                            {isUpdating ? (
                              <Loader2
                                size={14}
                                className="animate-spin"
                              />
                            ) : (
                              <X size={14} />
                            )}

                            Reject
                          </button>
                        )}

                        {review.status !==
                          "PENDING" && (
                          <button
                            type="button"
                            disabled={isUpdating}
                            onClick={() =>
                              updateStatus(
                                review.id,
                                "PENDING"
                              )
                            }
                            className="
                              inline-flex
                              h-10
                              items-center
                              justify-center
                              gap-2
                              rounded-xl
                              border
                              border-amber-200
                              bg-amber-50
                              px-4
                              text-xs
                              font-semibold
                              text-amber-600
                              transition
                              hover:bg-amber-100
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                              dark:border-amber-400/20
                              dark:bg-amber-400/10
                              dark:text-amber-400
                            "
                          >
                            <Clock3 size={14} />

                            Pending
                          </button>
                        )}

                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() =>
                            deleteReview(review.id)
                          }
                          className="
                            ml-auto
                            inline-flex
                            h-10
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            px-4
                            text-xs
                            font-semibold
                            text-slate-500
                            transition
                            hover:border-red-200
                            hover:bg-red-50
                            hover:text-red-500
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                            dark:border-white/10
                            dark:bg-white/[0.03]
                            dark:text-slate-400
                            dark:hover:border-red-400/20
                            dark:hover:bg-red-400/10
                            dark:hover:text-red-400
                          "
                        >
                          {isUpdating ? (
                            <Loader2
                              size={14}
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2 size={14} />
                          )}

                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ===========================================================
   STAT CARD
=========================================================== */

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-[0_10px_35px_rgba(15,23,42,0.04)]
        dark:border-white/10
        dark:bg-[#071A28]
      "
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-slate-400">
          {label}
        </p>

        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            bg-[#2196F3]/10
            text-[#2196F3]
            dark:bg-[#2196F3]/15
            dark:text-[#64B5F6]
          "
        >
          {icon}
        </div>
      </div>

      <p className="mt-4 text-2xl font-semibold tracking-tight text-slate-800 dark:text-white">
        {value}
      </p>
    </div>
  );
}