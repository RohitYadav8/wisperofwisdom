import Link from "next/link";

import {
  ArrowRight,
  BookOpen,
  MessageSquareText,
  ShoppingBag,
  Star,
  Users,
} from "lucide-react";

const stats = [
  {
    label: "Total Books",
    value: "0",
    icon: BookOpen,
  },
  {
    label: "Total Orders",
    value: "0",
    icon: ShoppingBag,
  },
  {
    label: "Reviews",
    value: "0",
    icon: Star,
  },
  {
    label: "Users",
    value: "0",
    icon: Users,
  },
];

const quickActions = [
  {
    label: "Manage Books",
    href: "/admin/books",
    icon: BookOpen,
  },
  {
    label: "View Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    label: "Manage Reviews",
    href: "/admin/reviews",
    icon: Star,
  },
  {
    label: "Contact Messages",
    href: "/admin/contact-messages",
    icon: MessageSquareText,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-[1600px]">
      {/* PAGE HEADER */}

      <div
        className="
          mb-7
          flex
          flex-col
          gap-4

          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div>
          <p
            className="
              text-[11px]
              font-bold
              uppercase
              tracking-[0.2em]

              text-[#2196F3]
            "
          >
            Overview
          </p>

          <h1
            className="
              mt-2

              font-serif
              text-[32px]
              font-medium
              tracking-[-0.03em]

              text-[#0F172A]

              sm:text-[38px]

              dark:text-white
            "
          >
            Dashboard
          </h1>
        </div>
      </div>

      {/* STATS */}

      <div
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
            <div
              key={item.label}
              className="
                group

                rounded-[22px]

                border
                border-slate-200/70

                bg-white/80

                p-5

                shadow-[0_12px_35px_rgba(15,23,42,0.04)]

                backdrop-blur-xl

                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-[#2196F3]/20
                hover:shadow-[0_18px_45px_rgba(15,23,42,0.07)]

                dark:border-white/[0.08]
                dark:bg-[#0B2031]/70
                dark:shadow-none
              "
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className="
                      text-[13px]
                      font-medium

                      text-slate-500

                      dark:text-slate-400
                    "
                  >
                    {item.label}
                  </p>

                  <p
                    className="
                      mt-3

                      text-[32px]
                      font-bold
                      tracking-[-0.04em]

                      text-[#0F172A]

                      dark:text-white
                    "
                  >
                    {item.value}
                  </p>
                </div>

                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center

                    rounded-[14px]

                    bg-[#2196F3]/10

                    text-[#2196F3]

                    transition-transform
                    duration-300

                    group-hover:scale-105

                    dark:bg-[#2196F3]/15
                    dark:text-[#64B5F6]
                  "
                >
                  <Icon size={21} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* LOWER SECTION */}

      <div
        className="
          mt-6
          grid
          gap-6

          xl:grid-cols-[1.4fr_0.8fr]
        "
      >
        {/* RECENT ORDERS */}

        <section
          className="
            overflow-hidden
            rounded-[24px]

            border
            border-slate-200/70

            bg-white/80

            shadow-[0_12px_35px_rgba(15,23,42,0.04)]

            backdrop-blur-xl

            dark:border-white/[0.08]
            dark:bg-[#0B2031]/70
            dark:shadow-none
          "
        >
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
                flex
                items-center
                gap-1.5

                text-[12px]
                font-semibold

                text-[#2196F3]

                transition-all

                hover:gap-2.5
              "
            >
              View All
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* EMPTY STATE */}

          <div
            className="
              flex
              min-h-[310px]
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
                h-16
                w-16
                items-center
                justify-center

                rounded-[18px]

                bg-[#2196F3]/8

                text-[#2196F3]

                dark:bg-[#2196F3]/10
              "
            >
              <ShoppingBag size={27} />
            </div>

            <p
              className="
                mt-5
                text-[14px]
                font-semibold

                text-[#0F172A]

                dark:text-white
              "
            >
              No orders yet
            </p>
          </div>
        </section>

        {/* QUICK ACTIONS */}

        <section
          className="
            rounded-[24px]

            border
            border-slate-200/70

            bg-white/80

            p-5

            shadow-[0_12px_35px_rgba(15,23,42,0.04)]

            backdrop-blur-xl

            sm:p-6

            dark:border-white/[0.08]
            dark:bg-[#0B2031]/70
            dark:shadow-none
          "
        >
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
                    min-h-[60px]
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

                    hover:border-[#2196F3]/25
                    hover:bg-[#2196F3]/[0.04]

                    dark:border-white/[0.07]
                    dark:bg-white/[0.025]

                    dark:hover:border-[#2196F3]/25
                    dark:hover:bg-[#2196F3]/[0.07]
                  "
                >
                  <div className="flex items-center gap-3">
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

                    <span
                      className="
                        text-[13px]
                        font-semibold

                        text-slate-700

                        dark:text-slate-300
                      "
                    >
                      {item.label}
                    </span>
                  </div>

                  <ArrowRight
                    size={16}
                    className="
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