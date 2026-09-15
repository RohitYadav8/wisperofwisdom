import Link from "next/link";

import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  MessageSquareText,
  RefreshCw,
  ShoppingBag,
  Star,
  Users,
} from "lucide-react";

/* =====================================================
   DASHBOARD STATS
   API integration ke baad values database se aayengi.
===================================================== */

const stats = [
  {
    label: "Total Books",
    value: "0",
    description: "Books available",
    icon: BookOpen,
  },
  {
    label: "Total Orders",
    value: "0",
    description: "Customer orders",
    icon: ShoppingBag,
  },
  {
    label: "Total Reviews",
    value: "0",
    description: "Customer reviews",
    icon: Star,
  },
  {
    label: "Total Users",
    value: "0",
    description: "Registered users",
    icon: Users,
  },
];

/* =====================================================
   QUICK ACTIONS
===================================================== */

const quickActions = [
  {
    label: "Manage Books",
    description: "Add or update books",
    href: "/admin/books",
    icon: BookOpen,
  },
  {
    label: "View Orders",
    description: "Manage customer orders",
    href: "/admin/orders",
    icon: ShoppingBag,
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
            Here&apos;s an overview of your Whispers of Wisdom store.
          </p>
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-3">
          <button
            type="button"
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
              dark:border-white/10
              dark:bg-white/[0.045]
              dark:text-slate-300
              dark:hover:border-[#2196F3]/30
              dark:hover:text-[#64B5F6]
            "
          >
            <RefreshCw size={15} />
            Refresh
          </button>
        </div>
      </section>

      {/* =====================================================
          STATS
      ===================================================== */}

      <section
        className="
          grid
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
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
                bg-white/85
                p-5
                shadow-[0_8px_30px_rgba(15,23,42,0.04)]
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#2196F3]/20
                hover:shadow-[0_16px_40px_rgba(15,23,42,0.07)]
                dark:border-white/[0.08]
                dark:bg-[#0B2031]/75
                dark:shadow-none
              "
            >
              {/* DECORATION */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-12
                  -top-12
                  h-32
                  w-32
                  rounded-full
                  bg-[#2196F3]/[0.05]
                  blur-2xl
                "
              />

              <div className="relative flex items-start gap-4">
                {/* ICON */}

                <div
                  className="
                    flex
                    h-[52px]
                    w-[52px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-[16px]
                    border
                    border-[#2196F3]/10
                    bg-[#2196F3]/10
                    text-[#2196F3]
                    transition-transform
                    duration-300
                    group-hover:scale-105
                    dark:border-[#2196F3]/15
                    dark:bg-[#2196F3]/15
                    dark:text-[#64B5F6]
                  "
                >
                  <Icon size={22} strokeWidth={1.9} />
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

                  <p
                    className="
                      mt-1
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
          MAIN CONTENT
      ===================================================== */}

      <div
        className="
          mt-6
          grid
          gap-6
          xl:grid-cols-[minmax(0,1.55fr)_minmax(330px,0.75fr)]
        "
      >
        {/* =================================================
            ORDERS OVERVIEW
        ================================================= */}

        <section
          className="
            overflow-hidden
            rounded-[22px]
            border
            border-slate-200/80
            bg-white/85
            shadow-[0_8px_30px_rgba(15,23,42,0.04)]
            backdrop-blur-xl
            dark:border-white/[0.08]
            dark:bg-[#0B2031]/75
            dark:shadow-none
          "
        >
          {/* HEADER */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-4
              border-b
              border-slate-200/70
              px-5
              py-5
              sm:px-6
              dark:border-white/[0.08]
            "
          >
            <div>
              <h2
                className="
                  text-[16px]
                  font-semibold
                  text-[#0F172A]
                  dark:text-white
                "
              >
                Recent Orders
              </h2>

              <p
                className="
                  mt-1
                  text-[12px]
                  text-slate-400
                "
              >
                Latest customer orders
              </p>
            </div>

            <Link
              href="/admin/orders"
              className="
                group
                inline-flex
                items-center
                gap-1.5
                text-[12px]
                font-semibold
                text-[#2196F3]
              "
            >
              View All

              <ArrowRight
                size={14}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>

          {/* EMPTY STATE */}

          <div
            className="
              flex
              min-h-[365px]
              flex-col
              items-center
              justify-center
              px-6
              py-12
              text-center
            "
          >
            <div
              className="
                flex
                h-[68px]
                w-[68px]
                items-center
                justify-center
                rounded-[20px]
                border
                border-[#2196F3]/10
                bg-[#2196F3]/[0.07]
                text-[#2196F3]
                dark:border-[#2196F3]/15
                dark:bg-[#2196F3]/10
                dark:text-[#64B5F6]
              "
            >
              <ShoppingBag size={28} strokeWidth={1.8} />
            </div>

            <h3
              className="
                mt-5
                text-[15px]
                font-semibold
                text-[#0F172A]
                dark:text-white
              "
            >
              No orders yet
            </h3>

            <p
              className="
                mt-2
                max-w-[300px]
                text-[12px]
                leading-5
                text-slate-400
                dark:text-slate-500
              "
            >
              New customer orders will appear here once orders are
              placed.
            </p>
          </div>
        </section>

        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <section
          className="
            rounded-[22px]
            border
            border-slate-200/80
            bg-white/85
            p-5
            shadow-[0_8px_30px_rgba(15,23,42,0.04)]
            backdrop-blur-xl
            sm:p-6
            dark:border-white/[0.08]
            dark:bg-[#0B2031]/75
            dark:shadow-none
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

          <div className="mt-5 space-y-3">
            {quickActions.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="
                    group
                    flex
                    min-h-[68px]
                    items-center
                    justify-between
                    gap-4
                    rounded-[16px]
                    border
                    border-slate-200/70
                    bg-white/60
                    px-4
                    transition-all
                    duration-300
                    hover:translate-x-1
                    hover:border-[#2196F3]/25
                    hover:bg-[#2196F3]/[0.04]
                    dark:border-white/[0.07]
                    dark:bg-white/[0.025]
                    dark:hover:border-[#2196F3]/25
                    dark:hover:bg-[#2196F3]/[0.07]
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
                        bg-[#2196F3]/10
                        text-[#2196F3]
                        dark:bg-[#2196F3]/15
                        dark:text-[#64B5F6]
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
                      group-hover:text-[#2196F3]
                      dark:text-slate-600
                    "
                  />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}