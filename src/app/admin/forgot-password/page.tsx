import { AdminAuthShell } from "../../../components/admin/admin-auth-shell";
import { AdminForgotPasswordForm } from "../../../components/admin/admin-password-forms";

export default function AdminForgotPasswordPage() {
  return (
    <AdminAuthShell
      title="Forgot Password"
      subtitle="Enter your admin email and we'll send you a link to reset your password."
    >
      <AdminForgotPasswordForm />
    </AdminAuthShell>
  );
}
