"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SetPasswordForm() {
  const router = useRouter();
  const token = useSearchParams().get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) return setError("Passwords do not match.");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.message);
      setDone(true);
      setTimeout(() => router.push("/account"), 2000);
    } catch {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  const input =
    "h-12 w-full rounded-xl border border-[#D8DDE5] bg-white px-4 text-sm text-[#172536] outline-none focus:border-[#2196F3]";

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <h1 className="mb-2 font-serif text-3xl">Set your password</h1>
      {done ? (
        <p className="text-green-700">Password set! Redirecting to login...</p>
      ) : !token ? (
        <p className="text-red-600">Invalid link.</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
          <input type="password" required minLength={8} placeholder="New password"
            value={password} onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password" className={input} />
          <input type="password" required minLength={8} placeholder="Confirm password"
            value={confirm} onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password" className={input} />
          <button type="submit" disabled={loading}
            className="h-12 w-full rounded-xl bg-[#2196F3] font-semibold text-white disabled:opacity-60">
            {loading ? "Saving..." : "Set password"}
          </button>
        </form>
      )}
    </main>
  );
}

export default function SetPasswordPage() {
  return (
    <Suspense>
      <SetPasswordForm />
    </Suspense>
  );
}