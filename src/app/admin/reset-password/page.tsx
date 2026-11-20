import { AdminAuthShell } from "../../../components/admin/admin-auth-shell";
import { AdminResetPasswordForm } from "../../../components/admin/admin-password-forms";

export default async function AdminResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <AdminAuthShell title="Reset Password" subtitle="Choose a new password for your admin account.">
      <AdminResetPasswordForm token={typeof token === "string" ? token : ""} />
    </AdminAuthShell>
  );
}
