import { AdminAuthShell } from "../../../components/admin/admin-auth-shell";
import { AdminLoginForm } from "../../../components/admin/admin-login-form";

export default function AdminLoginPage() {
  return (
    <AdminAuthShell title="Admin Portal">
      <AdminLoginForm />
    </AdminAuthShell>
  );
}
