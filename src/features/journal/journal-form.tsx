"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Download, Loader2 } from "lucide-react";

import { AnimateIn } from "../../components/animations/animate-in";

const empty = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  challenge: "",
  goals: "",
  termsAccepted: false,
  marketingConsent: false,
};

/* Labels/text unchanged. Now actually submits to the existing /api/journal-claims route. */
export function JournalForm() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function update<K extends keyof typeof empty>(key: K, value: (typeof empty)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setError("");
    setSuccess("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      const response = await fetch("/api/journal-claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong. Please try again.");
      setSuccess(data.message || "Journal claim submitted successfully.");
      setForm(empty);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const label = "mb-2 block text-[13px] font-semibold text-(--wow-ink-2)";
  const field =
    "w-full rounded-2xl border border-(--wow-line) bg-(--wow-paper) px-4 text-[15px] text-(--wow-ink) outline-none transition focus:border-(--wow-brand) focus:ring-4 focus:ring-(--wow-brand)/10 disabled:opacity-60";

  const input = (key: "firstName" | "lastName" | "email" | "phone", text: string, type = "text", autoComplete?: string) => (
    <div>
      <label htmlFor={key} className={label}>{text}</label>
      <input
        id={key}
        name={key}
        type={type}
        autoComplete={autoComplete}
        value={form[key]}
        onChange={(e) => update(key, e.target.value)}
        disabled={loading}
        className={`${field} h-13`}
      />
    </div>
  );

  return (
    <section id="journal-form" className="mx-auto max-w-[1240px] scroll-mt-28 px-5 py-16 sm:px-10 lg:py-24">
      <AnimateIn>
        <div className="mx-auto max-w-[900px] rounded-[36px] border border-(--wow-line) bg-(--wow-card) p-7 shadow-[0_40px_80px_-50px_rgba(11,34,51,0.45)] sm:p-12">
          <div className="text-center">
            <h2 className="wow-serif text-4xl font-semibold leading-[1.05] tracking-[-0.015em] sm:text-5xl">
              Claim Your Free Journal Now
            </h2>
            <p className="mx-auto mt-4 max-w-[640px] text-[15.5px] text-(--wow-ink-2)">
              <b className="font-semibold text-(--wow-ink)">Limited-Time Free Download:</b>{" "}
              Join thousands who are using this journal to create clarity and
              momentum in their lives.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="mt-9 grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              {input("firstName", "First Name *", "text", "given-name")}
              {input("lastName", "Last Name *", "text", "family-name")}
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {input("email", "Email Address *", "email", "email")}
              {input("phone", "Phone Number", "tel", "tel")}
            </div>

            <div>
              <label htmlFor="challenge" className={label}>
                What&apos;s your biggest personal/professional challenge? *
              </label>
              <textarea id="challenge" name="challenge" rows={4} value={form.challenge} onChange={(e) => update("challenge", e.target.value)} disabled={loading} className={`${field} resize-y py-3.5`} />
            </div>

            <div>
              <label htmlFor="goals" className={label}>
                What are your key goals for the next 3-6 months? *
              </label>
              <textarea id="goals" name="goals" rows={4} value={form.goals} onChange={(e) => update("goals", e.target.value)} disabled={loading} className={`${field} resize-y py-3.5`} />
            </div>

            <div className="grid gap-3">
              <label className="flex cursor-pointer items-start gap-3 text-[14px] text-(--wow-ink-2)">
                <input type="checkbox" checked={form.termsAccepted} onChange={(e) => update("termsAccepted", e.target.checked)} disabled={loading} className="mt-0.5 h-5 w-5 flex-none accent-(--wow-brand)" />
                I agree to the Standard Terms and Conditions *
              </label>
              <label className="flex cursor-pointer items-start gap-3 text-[14px] text-(--wow-ink-2)">
                <input type="checkbox" checked={form.marketingConsent} onChange={(e) => update("marketingConsent", e.target.checked)} disabled={loading} className="mt-0.5 h-5 w-5 flex-none accent-(--wow-brand)" />
                I consent to receive occasional offers and marketing communications from Whispers of Wisdom and its associated companies and partners.
              </label>
            </div>

            <p className="rounded-2xl border border-(--wow-brand)/20 bg-(--wow-brand)/8 px-5 py-4 text-[13.5px] text-(--wow-ink-2)">
              <b className="font-semibold text-(--wow-ink)">GDPR Disclaimer:</b>{" "}
              We respect your privacy. Your data will never be sold to third
              parties. You can unsubscribe at any time.
            </p>

            {error && (
              <p role="alert" className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                <AlertCircle className="h-4 w-4 flex-none" /> {error}
              </p>
            )}
            {success && (
              <p role="status" className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13px] text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4 flex-none" /> {success}
              </p>
            )}

            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-(--wow-brand) px-9 text-[15px] font-semibold text-white transition hover:brightness-105 disabled:opacity-70"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                Download My Free Journal
              </button>
            </div>
          </form>
        </div>
      </AnimateIn>
    </section>
  );
}
