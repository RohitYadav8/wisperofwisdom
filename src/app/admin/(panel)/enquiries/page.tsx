"use client";

import { useState } from "react";
import {
  Building2,
  CheckCircle2,
  Eye,
  Mail,
  MessageCircleQuestion,
  Phone,
  Search,
  X,
} from "lucide-react";

type EnquiryStatus = "NEW" | "READ";

type Enquiry = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  organisation: string | null;
  question: string | null;
  status: EnquiryStatus;
  receiveUpdates: boolean;
  createdAt: string;
};

// Temporary data.
// API connect karne ke baad ye remove kar denge.
const demoEnquiries: Enquiry[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Smith",
    email: "john@example.com",
    mobile: "+44 7123 456789",
    organisation: "ABC Ltd",
    question: "I would like to know more about Whispers of Wisdom.",
    status: "NEW",
    receiveUpdates: true,
    createdAt: "21 Sep 2026, 10:30 AM",
  },
  {
    id: 2,
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah@example.com",
    mobile: "+44 7987 654321",
    organisation: null,
    question: "Where can I purchase the book?",
    status: "READ",
    receiveUpdates: false,
    createdAt: "20 Sep 2026, 04:15 PM",
  },
];

export default function AdminEnquiriesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | EnquiryStatus>("ALL");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const filteredEnquiries = demoEnquiries.filter((enquiry) => {
    const query = search.trim().toLowerCase();

    const matchesSearch =
      !query ||
      `${enquiry.firstName} ${enquiry.lastName}`
        .toLowerCase()
        .includes(query) ||
      enquiry.email.toLowerCase().includes(query) ||
      enquiry.mobile.toLowerCase().includes(query) ||
      enquiry.organisation?.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "ALL" || enquiry.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="space-y-6">
        {/* HEADER */}

        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Enquiries
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage website enquiries.
          </p>
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
          {/* SEARCH */}

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
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search enquiries..."
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

          {/* STATUS */}

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value as "ALL" | EnquiryStatus
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
              sm:min-w-[150px]
            "
          >
            <option value="ALL">All Enquiries</option>
            <option value="NEW">New</option>
            <option value="READ">Read</option>
          </select>
        </div>

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
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
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
                    Organisation
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

              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
                {filteredEnquiries.map((enquiry) => (
                  <tr
                    key={enquiry.id}
                    className="
                      transition-colors
                      hover:bg-slate-50/70
                      dark:hover:bg-white/[0.025]
                    "
                  >
                    {/* NAME */}

                    <td className="px-5 py-4">
                      <div className="font-medium text-slate-900 dark:text-white">
                        {enquiry.firstName} {enquiry.lastName}
                      </div>
                    </td>

                    {/* CONTACT */}

                    <td className="px-5 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <Mail size={14} className="text-slate-400" />
                          {enquiry.email}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <Phone size={14} className="text-slate-400" />
                          {enquiry.mobile}
                        </div>
                      </div>
                    </td>

                    {/* ORGANISATION */}

                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {enquiry.organisation || "—"}
                    </td>

                    {/* DATE */}

                    <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
                      {enquiry.createdAt}
                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-4">
                      {enquiry.status === "NEW" ? (
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
                        onClick={() => setSelectedEnquiry(enquiry)}
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
                          dark:text-slate-400
                          dark:hover:bg-[#2196F3]/10
                          dark:hover:text-[#64B5F6]
                        "
                        aria-label="View enquiry"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* EMPTY */}

          {filteredEnquiries.length === 0 && (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
              <MessageCircleQuestion
                size={38}
                strokeWidth={1.5}
                className="text-slate-300 dark:text-slate-600"
              />

              <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-300">
                No enquiries found.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* VIEW ENQUIRY MODAL */}

      {selectedEnquiry && (
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
              max-w-[620px]
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
              onClick={() => setSelectedEnquiry(null)}
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
              aria-label="Close"
            >
              <X size={19} />
            </button>

            <h2 className="pr-12 text-xl font-semibold text-slate-900 dark:text-white">
              Enquiry Details
            </h2>

            <div className="mt-6 space-y-5">
              {/* NAME */}

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Name
                </p>

                <p className="mt-1.5 text-sm font-medium text-slate-900 dark:text-white">
                  {selectedEnquiry.firstName}{" "}
                  {selectedEnquiry.lastName}
                </p>
              </div>

              {/* EMAIL + PHONE */}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Email
                  </p>

                  <div className="mt-1.5 flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <Mail size={15} />
                    {selectedEnquiry.email}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Mobile / WhatsApp
                  </p>

                  <div className="mt-1.5 flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <Phone size={15} />
                    {selectedEnquiry.mobile}
                  </div>
                </div>
              </div>

              {/* ORGANISATION */}

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Organisation
                </p>

                <div className="mt-1.5 flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <Building2 size={15} />
                  {selectedEnquiry.organisation || "—"}
                </div>
              </div>

              {/* QUESTION */}

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Any Question?
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
                  {selectedEnquiry.question || "—"}
                </div>
              </div>

              {/* UPDATES */}

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Receive Updates
                </p>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  {selectedEnquiry.receiveUpdates ? (
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

              {/* DATE */}

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Submitted
                </p>

                <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
                  {selectedEnquiry.createdAt}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}