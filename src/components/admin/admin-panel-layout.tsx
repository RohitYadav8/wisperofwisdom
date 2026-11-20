"use client";

import { ReactNode, useState } from "react";

import { AdminSidebar } from "./admin-sidebar";
import { AdminTopbar } from "./admin-topbar";

type AdminPanelLayoutProps = {
  children: ReactNode;
};

/* Colours/fonts come from the .wow-home tokens (see HomeShell in the admin layout). */
export function AdminPanelLayout({ children }: AdminPanelLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-(--wow-paper-2) text-(--wow-ink)">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="min-h-screen lg:pl-[272px]">
        <AdminTopbar onMenuClick={() => setSidebarOpen(true)} />
        <div className="min-h-[calc(100vh-80px)] px-4 py-6 sm:px-6 lg:px-10 lg:py-9">{children}</div>
      </div>
    </div>
  );
}
