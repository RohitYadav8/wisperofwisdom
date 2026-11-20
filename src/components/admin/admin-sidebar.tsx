"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  LayoutDashboard,
  LogOut,
  MessageCircleQuestion,
  MessageSquareText,
  NotebookTabs,
  Star,
  Users,
  X,
} from "lucide-react";

type AdminSidebarProps = {
  open?: boolean;
  onClose?: () => void;
};

const sidebarItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Books", href: "/admin/books", icon: BookOpen },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Reviews", href: "/admin/reviews", icon: Star },
  { label: "Journal Claims", href: "/admin/journal-claims", icon: NotebookTabs },
  { label: "Enquiries", href: "/admin/enquiries", icon: MessageCircleQuestion },
  { label: "Contact Messages", href: "/admin/contact-messages", icon: MessageSquareText },
];

export function AdminSidebar({ open = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin/dashboard") return pathname === href;
    return pathname.startsWith(href);
  }

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
    } finally {
      window.location.href = "/admin/login";
    }
  }

  return (
    <>
      {/* mobile overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[90] bg-[#07131c]/50 backdrop-blur-[2px] transition-opacity lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed left-0 top-0 z-[100] flex h-[100dvh] w-[272px] max-w-[85vw] flex-col bg-[#0b2233] text-[#f7f2e8] transition-transform duration-300 lg:translate-x-0 dark:border-r dark:border-(--wow-line) dark:bg-(--wow-card) ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex min-h-[80px] shrink-0 items-center justify-between px-6 lg:min-h-[88px]">
          <Link href="/admin/dashboard" onClick={onClose}>
            <Image src="/logo-dark.png" alt="Whispers of Wisdom" width={190} height={102} priority className="h-auto w-[140px] object-contain" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="grid h-10 w-10 place-items-center rounded-xl text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 [scrollbar-width:thin]">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">Admin Menu</p>
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={`group relative flex min-h-[48px] items-center gap-3.5 rounded-2xl px-4 text-[14px] font-medium transition ${
                    active ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {active && <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-(--wow-gold)" />}
                  <Icon className={`h-[18px] w-[18px] shrink-0 ${active ? "text-(--wow-gold)" : ""}`} strokeWidth={active ? 2.2 : 1.9} />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="shrink-0 border-t border-white/10 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="group flex min-h-[48px] w-full items-center gap-3.5 rounded-2xl px-4 text-[14px] font-medium text-white/60 transition hover:bg-red-500/15 hover:text-red-300"
          >
            <LogOut className="h-[18px] w-[18px] shrink-0 transition-transform group-hover:translate-x-0.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
