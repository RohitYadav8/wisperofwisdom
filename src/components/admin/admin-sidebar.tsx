"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  BookOpen,
  Users,
  MessageSquareText,
  MessageCircleQuestion,
  LogOut,
  X,
  NotebookTabs,
  Star,
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
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Reviews",
    href: "/admin/reviews",
    icon: Star,
  },
  {
    label: "Journal Claims",
    href: "/admin/journal-claims",
    icon: NotebookTabs,
  },
  {
    label: "Enquiries",
    href: "/admin/enquiries",
    icon: MessageCircleQuestion,
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

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
    } finally {
      window.location.href = "/admin/login";
    }
  }

  return (
    <>
    

      <div
        onClick={onClose}
        aria-hidden="true"
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

      {/* SIDEBAR */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-[100]
          flex
          h-[100dvh]
          w-[280px]
          max-w-[85vw]
          flex-col
          border-r
          border-slate-200/80
          bg-white/95
          shadow-[12px_0_35px_rgba(15,23,42,0.08)]
          backdrop-blur-2xl
          transition-transform
          duration-300
          ease-out

          dark:border-white/[0.08]
          dark:bg-[#071A28]/95
          dark:shadow-[14px_0_40px_rgba(0,0,0,0.22)]

          lg:translate-x-0
          lg:w-[280px]

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        

        <div
          className="
            flex
            min-h-[76px]
            shrink-0
            items-center
            justify-between
            border-b
            border-slate-200/70
            px-4
            sm:min-h-[84px]
            sm:px-5
            md:px-6
            lg:min-h-[92px]
            dark:border-white/[0.08]
          "
        >
          <Link
            href="/admin/dashboard"
            className="inline-flex min-w-0 items-center"
            onClick={onClose}
          >
            <Image
              src="/light-logo.png"
              alt="Whispers of Wisdom"
              width={190}
              height={90}
              priority
              className="
                h-auto
                w-[135px]
                object-contain
                sm:w-[145px]
                lg:w-[155px]
                dark:hidden
              "
            />

            <Image
              src="/logo-dark.png"
              alt="Whispers of Wisdom"
              width={190}
              height={90}
              priority
              className="
                hidden
                h-auto
                w-[135px]
                object-contain
                sm:w-[145px]
                lg:w-[155px]
                dark:block
              "
            />
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              text-slate-500
              transition-all
              duration-300
              hover:bg-slate-100
              hover:text-[#2196F3]
              sm:h-10
              sm:w-10
              dark:text-slate-400
              dark:hover:bg-white/[0.06]
              dark:hover:text-[#64B5F6]
              lg:hidden
            "
          >
            <X size={19} />
          </button>
        </div>

      

        <nav
          className="
            flex-1
            overflow-y-auto
            overscroll-contain
            px-3
            py-5
            sm:px-4
            sm:py-6
            [scrollbar-width:thin]
          "
        >
          <p
            className="
              mb-3
              px-3
              text-[9px]
              font-bold
              uppercase
              tracking-[0.20em]
              text-slate-400
              sm:text-[10px]
              sm:tracking-[0.22em]
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
                    min-h-[46px]
                    w-full
                    items-center
                    gap-3
                    overflow-hidden
                    rounded-[13px]
                    px-3.5
                    text-[13px]
                    font-medium
                    transition-all
                    duration-300
                    sm:min-h-[50px]
                    sm:gap-3.5
                    sm:px-4
                    sm:text-[14px]

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
                  {active && (
                    <span
                      className="
                        absolute
                        left-0
                        top-1/2
                        h-6
                        w-[3px]
                        -translate-y-1/2
                        rounded-r-full
                        bg-[#2196F3]
                        sm:h-7
                      "
                    />
                  )}

                  <Icon
                    size={18}
                    strokeWidth={active ? 2.3 : 2}
                    className="
                      shrink-0
                      transition-transform
                      duration-300
                      group-hover:scale-105
                      sm:size-[19px]
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

        {/* LOGOUT */}

        <div
          className="
            shrink-0
            border-t
            border-slate-200/70
            p-3
            sm:p-4
            dark:border-white/[0.08]
          "
        >
          <button
            type="button"
            onClick={handleLogout}
            className="
              group
              flex
              min-h-[46px]
              w-full
              items-center
              gap-3
              rounded-[13px]
              px-3.5
              text-[13px]
              font-medium
              text-slate-600
              transition-all
              duration-300
              hover:bg-red-50
              hover:text-red-500
              sm:min-h-[50px]
              sm:gap-3.5
              sm:px-4
              sm:text-[14px]
              dark:text-slate-400
              dark:hover:bg-red-500/10
              dark:hover:text-red-400
            "
          >
            <LogOut
              size={18}
              className="
                shrink-0
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                sm:size-[19px]
              "
            />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}               