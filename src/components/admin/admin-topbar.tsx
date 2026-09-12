"use client";

import { Bell, Menu, Search } from "lucide-react";

import { ThemeToggle } from "../ui/theme-toggle";

type AdminTopbarProps = {
  onMenuClick: () => void;
};

export function AdminTopbar({
  onMenuClick,
}: AdminTopbarProps) {
  return (
    <header
      className="
        sticky
        top-0
        z-50

        flex
        h-[72px]
        items-center
        justify-between
        gap-4

        border-b
        border-slate-200/70

        bg-white/80

        px-4

        backdrop-blur-xl

        sm:px-6

        lg:px-8

        xl:px-10

        dark:border-white/[0.08]
        dark:bg-[#061824]/85
      "
    >
      {/* LEFT */}

      <div className="flex min-w-0 items-center gap-3">
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

            transition-all

            hover:border-[#2196F3]/30
            hover:text-[#2196F3]

            dark:border-white/10
            dark:bg-white/[0.05]
            dark:text-slate-300

            lg:hidden
          "
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0">
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

          <h2
            className="
              truncate
              text-[16px]
              font-semibold

              text-[#0F172A]

              dark:text-white
            "
          >
            Whispers of Wisdom
          </h2>
        </div>
      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-2 sm:gap-3">
        {/* SEARCH */}

        <div
          className="
            relative
            hidden

            md:block
          "
        >
          <Search
            size={17}
            className="
              absolute
              left-4
              top-1/2

              -translate-y-1/2

              text-slate-400
            "
          />

          <input
            type="search"
            placeholder="Search..."
            className="
              h-[42px]
              w-[220px]

              rounded-xl

              border
              border-slate-200

              bg-slate-50/80

              pl-11
              pr-4

              text-[13px]

              text-slate-700

              outline-none

              transition-all

              placeholder:text-slate-400

              focus:w-[250px]
              focus:border-[#2196F3]/40
              focus:bg-white
              focus:ring-4
              focus:ring-[#2196F3]/5

              dark:border-white/10
              dark:bg-white/[0.04]
              dark:text-white
              dark:placeholder:text-slate-500

              dark:focus:bg-white/[0.06]
            "
          />
        </div>

        {/* THEME */}

        <ThemeToggle />

        {/* NOTIFICATION */}

        <button
          type="button"
          aria-label="Notifications"
          className="
            relative

            flex
            h-[42px]
            w-[42px]
            items-center
            justify-center

            rounded-xl

            border
            border-slate-200

            bg-white

            text-slate-500

            transition-all

            hover:border-[#2196F3]/30
            hover:text-[#2196F3]

            dark:border-white/10
            dark:bg-white/[0.05]
            dark:text-slate-300
          "
        >
          <Bell size={18} />

          <span
            className="
              absolute
              right-[9px]
              top-[8px]

              h-[6px]
              w-[6px]

              rounded-full

              bg-[#2196F3]

              ring-2
              ring-white

              dark:ring-[#0B2031]
            "
          />
        </button>

        {/* ADMIN */}

        <div
          className="
            ml-1
            flex
            items-center
            gap-3

            sm:ml-2
          "
        >
          <div
            className="
              flex
              h-[42px]
              w-[42px]
              shrink-0
              items-center
              justify-center

              rounded-xl

              bg-gradient-to-br
              from-[#2196F3]
              to-[#06466B]

              text-[13px]
              font-bold
              text-white

              shadow-[0_8px_20px_rgba(33,150,243,0.18)]
            "
          >
            A
          </div>

          <div className="hidden xl:block">
            <p
              className="
                text-[13px]
                font-semibold

                text-[#0F172A]

                dark:text-white
              "
            >
              Admin
            </p>

            <p
              className="
                mt-0.5
                text-[11px]

                text-slate-400
              "
            >
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}