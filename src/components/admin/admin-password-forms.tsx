"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { AlertCircle, ArrowLeft, CheckCircle2, Eye, EyeOff, Loader2, LockKeyhole, Mail } from "lucide-react";

const inputClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-white/80 pl-11 pr-4 text-[14px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#2196F3] focus:ring-4 focus:ring-[#2196F3]/10 dark:border-white/10 dark:bg-[#071A29] dark:text-white";
const labelClass = "mb-2 block text-[13px] font-semibold text-slate-700 dark:text-slate-300";
const buttonClass =
  "inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2196F3] text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#1976D2] disabled:cursor-not-allowed disabled:opacity-60";

function Notice({ type, children }: { type: "error" | "success"; children: React.ReactNode }) {
  const styles =
    type === "error"
      ? "border-red-200 bg-red-50 text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
      : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400";
  const Icon = type === "error" ? AlertCircle : CheckCircle2;
  return (
    <p role={type === "error" ? "alert" : "status"} className={`flex items-start gap-2 rounded-xl border px-4 py-3 text-[13px] ${styles}`}>
      <Icon className="mt-0.5 h-4 w-4 flex-none" />
      <span>{children}</span>
    </p>
  );
}

function BackToLogin() {
  return (
    <Link href="/admin/login" className="mx-auto mt-6 flex w-fit items-center gap-1.5 text-[13px] font-semibold text-[#2196F3] hover:underline dark:text-[#64B5F6]">
      <ArrowLeft className="h-4 w-4" />
      Back to login
    </Link>
  );
}

/* ---------------- FORGOT PASSWORD ---------------- */
export function AdminForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("/api/admin/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Something went wrong. Please try again.");
        return;
      }
      setSuccess(data.message);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label htmlFor="email" className={labelClass}>Email</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter admin email" disabled={loading} className={inputClass} />
          </div>
        </div>

        {error && <Notice type="error">{error}</Notice>}
        {success && <Notice type="success">{success}</Notice>}

        <button type="submit" disabled={loading} className={buttonClass}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Sending..." : "Send reset link"}
        </button>
      </form>
      <BackToLogin />
    </>
  );
}

/* ---------------- RESET PASSWORD ---------------- */
export function AdminResetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(token ? "" : "This reset link is invalid or has expired. Please request a new one.");
  const [done, setDone] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (password.length < 8 || password.length > 72) {
      setError("Password must be 8 to 72 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Something went wrong. Please try again.");
        return;
      }
      setDone(data.message);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="space-y-5">
        <Notice type="success">{done}</Notice>
        <Link href="/admin/login" className={buttonClass}>Go to login</Link>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {[
          { id: "password", label: "New password", value: password, set: setPassword },
          { id: "confirm", label: "Confirm new password", value: confirm, set: setConfirm },
        ].map((f) => (
          <div key={f.id}>
            <label htmlFor={f.id} className={labelClass}>{f.label}</label>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id={f.id}
                type={show ? "text" : "password"}
                autoComplete="new-password"
                value={f.value}
                onChange={(e) => f.set(e.target.value)}
                disabled={loading || !token}
                className={`${inputClass} pr-12`}
              />
              {f.id === "password" && (
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  aria-label={show ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              )}
            </div>
          </div>
        ))}
        <p className="-mt-2 text-[12px] text-slate-500 dark:text-slate-400">At least 8 characters.</p>

        {error && <Notice type="error">{error}</Notice>}

        <button type="submit" disabled={loading || !token} className={buttonClass}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Saving..." : "Reset password"}
        </button>
      </form>
      <BackToLogin />
    </>
  );
}
