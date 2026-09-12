import { ReactNode } from "react";

import { AdminPanelLayout } from "../../../components/admin/admin-panel-layout";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AdminPanelLayout>
      {children}
    </AdminPanelLayout>
  );
}