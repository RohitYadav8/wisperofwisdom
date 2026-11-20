import { ReactNode } from "react";

import { AdminPanelLayout } from "../../../components/admin/admin-panel-layout";
import { HomeShell } from "../../../features/home/home-shell";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <HomeShell>
      <AdminPanelLayout>{children}</AdminPanelLayout>
    </HomeShell>
  );
}
