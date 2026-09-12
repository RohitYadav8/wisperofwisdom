"use client";

import { ReactNode, useState } from "react";

import { AdminSidebar } from "./admin-sidebar";
import { AdminTopbar } from "../../components/admin/admin-topbar";

type AdminPanelLayoutProps = {
  children: ReactNode;
};

export function AdminPanelLayout({
  children,
}: AdminPanelLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="
        min-h-screen
        bg-[#F7FAFC]
        text-[#0F172A]

        dark:bg-[#041522]
        dark:text-white
      "
    >
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:pl-[280px]">
        <AdminTopbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div
          className="
            min-h-[calc(100vh-72px)]
            px-4
            py-6

            sm:px-6

            lg:px-8
            lg:py-8

            xl:px-10
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
}