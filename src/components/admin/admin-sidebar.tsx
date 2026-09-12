"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  BookOpen,
  ShoppingBag,
  Star,
  Users,
  MessageSquareText,
  LogOut,
  X,
} from "lucide-react";

type AdminSidebarProps = {
  open?: boolean;
  onClose?: () => void;
};

const sidebarItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Books",
    href: "/admin/books",
    icon: BookOpen,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    label: "Reviews",
    href: "/admin/reviews",
    icon: Star,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Contact Messages",
    href: "/admin/contact-messages",
    icon: MessageSquareText,
  },
];

export function AdminSidebar({
  open = false,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin/dashboard") {
      return pathname === href;
    }

    return pathname.startsWith(href);
  }

  return (
    <>
      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
          z-[90]

          bg-black/40
          backdrop-blur-[2px]

          transition-opacity
          duration-300

          lg:hidden

          ${
            open
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-[100]

          flex
          h-screen
          w-[280px]
          flex-col

          border-r
          border-slate-200/80

          bg-white/90

          shadow-[12px_0_35px_rgba(15,23,42,0.05)]

          backdrop-blur-2xl

          transition-transform
          duration-300

          dark:border-white/[0.08]
          dark:bg-[#071A28]/95
          dark:shadow-[14px_0_40px_rgba(0,0,0,0.22)]

          lg:translate-x-0

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* ==================================================
            LOGO
        ================================================== */}

        <div
          className="
            flex
            min-h-[92px]
            items-center
            justify-between

            border-b
            border-slate-200/70

            px-6

            dark:border-white/[0.08]
          "
        >
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center"
            onClick={onClose}
          >
            <Image
              src="/Wispers-of-Wisdom-logo.png"
              alt="Whispers of Wisdom"
              width={190}
              height={90}
              className="
                h-auto
                w-[155px]
                object-contain

                dark:hidden
              "
            />

            <Image
              src="/logo-dark-1.png"
              alt="Whispers of Wisdom"
              width={190}
              height={90}
              className="
                hidden
                h-auto
                w-[155px]
                object-contain

                dark:block
              "
            />
          </Link>

          {/* MOBILE CLOSE */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center

              rounded-xl

              text-slate-500

              transition-all
              duration-300

              hover:bg-slate-100
              hover:text-[#2196F3]

              dark:text-slate-400
              dark:hover:bg-white/[0.06]
              dark:hover:text-[#64B5F6]

              lg:hidden
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* ==================================================
            NAVIGATION
        ================================================== */}

        <nav
          className="
            flex-1
            overflow-y-auto

            px-4
            py-6
          "
        >
          <p
            className="
              mb-3
              px-3

              text-[10px]
              font-bold
              uppercase
              tracking-[0.22em]

              text-slate-400

              dark:text-slate-500
            "
          >
            Admin Menu
          </p>

          <div className="space-y-1.5">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    group
                    relative

                    flex
                    min-h-[50px]
                    items-center
                    gap-3.5

                    overflow-hidden

                    rounded-[14px]

                    px-4

                    text-[14px]
                    font-medium

                    transition-all
                    duration-300

                    ${
                      active
                        ? `
                          bg-[#2196F3]/10
                          text-[#1976D2]

                          dark:bg-[#2196F3]/15
                          dark:text-[#64B5F6]
                        `
                        : `
                          text-slate-600

                          hover:bg-slate-100/80
                          hover:text-[#2196F3]

                          dark:text-slate-400
                          dark:hover:bg-white/[0.05]
                          dark:hover:text-[#64B5F6]
                        `
                    }
                  `}
                >
                  {/* ACTIVE LEFT BAR */}

                  {active && (
                    <span
                      className="
                        absolute
                        left-0
                        top-1/2

                        h-7
                        w-[3px]

                        -translate-y-1/2

                        rounded-r-full

                        bg-[#2196F3]
                      "
                    />
                  )}

                  <Icon
                    size={19}
                    strokeWidth={active ? 2.3 : 2}
                    className="
                      shrink-0
                      transition-transform
                      duration-300

                      group-hover:scale-105
                    "
                  />

                  <span className="truncate">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* ==================================================
            LOGOUT
        ================================================== */}

        <div
          className="
            border-t
            border-slate-200/70

            p-4

            dark:border-white/[0.08]
          "
        >
          <button
            type="button"
            className="
              group

              flex
              min-h-[50px]
              w-full
              items-center
              gap-3.5

              rounded-[14px]

              px-4

              text-[14px]
              font-medium

              text-slate-600

              transition-all
              duration-300

              hover:bg-red-50
              hover:text-red-500

              dark:text-slate-400
              dark:hover:bg-red-500/10
              dark:hover:text-red-400
            "
          >
            <LogOut
              size={19}
              className="
                transition-transform
                duration-300

                group-hover:translate-x-0.5
              "
            />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}