"use client";

import { useState } from "react";
import Image from "next/image";
import { AlertCircle, ArrowRight, Loader2, Mail, UserRound } from "lucide-react";

import { AnimateIn } from "../../components/animations/animate-in";
import { TenDayChallengeSuccessModal } from "../../components/ten-day-challenge-success-modal";

/* Submit logic and messages unchanged from the previous challenge page. */
export function ChallengeForm() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const name = form.name.trim();
    const email = form.email.trim();

    if (!name || !email) {
      setError("Please enter your name and email address.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, source: "TEN_DAY_CHALLENGE" }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to join the challenge. Please try again.");
      }

      setForm({ name: "", email: "" });
      setShowSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputWrap = "relative";
  const iconClass = "pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-(--wow-muted)";
  const inputClass =
    "h-14 w-full rounded-2xl border border-(--wow-line) bg-(--wow-paper) pl-12 pr-4 text-[15px] text-(--wow-ink) outline-none transition placeholder:text-(--wow-muted) focus:border-(--wow-brand) focus:ring-4 focus:ring-(--wow-brand)/10";

  return (
    <section id="challenge-form" className="mx-auto max-w-[1240px] scroll-mt-28 px-5 py-16 sm:px-10 lg:py-28">
      <AnimateIn>
        <div className="grid overflow-hidden rounded-[36px] border border-(--wow-line) bg-(--wow-card) lg:grid-cols-[1fr_1fr]">
          {/* ---------- LEFT: image + heading ---------- */}
          <div className="relative min-h-[320px] overflow-hidden lg:min-h-[560px]">
            <Image src="/light-slide-3.png" alt="" fill sizes="(min-width: 1024px) 620px, 100vw" className="object-cover object-[70%_center] dark:hidden" />
            <Image src="/dark-slide-3.png" alt="" fill sizes="(min-width: 1024px) 620px, 100vw" className="hidden object-cover object-[70%_center] dark:block" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,34,51,0.15)_0%,rgba(11,34,51,0.85)_100%)]" />

            <div className="absolute inset-x-0 bottom-0 p-7 text-[#f7f2e8] sm:p-10">
              <h2 className="wow-serif text-4xl font-semibold leading-[1.05] sm:text-5xl">
                Ready to Begin?
              </h2>
              <div className="mt-4 h-0.5 w-12 rounded-full bg-(--wow-gold)" />
              <p className="mt-5 max-w-[440px] text-[15.5px] leading-relaxed text-[#f7f2e8]/85">
                Sign up now to receive your first “Whisper of Wisdom” within
                minutes. It&apos;s free, powerful, and could shift your whole
                perspective.
              </p>
            </div>
          </div>

          {/* ---------- RIGHT: form ---------- */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col justify-center gap-4 p-7 sm:p-10 lg:p-14">
            <div className={inputWrap}>
              <label htmlFor="challenge-name" className="mb-2 block text-[13px] font-semibold text-(--wow-ink-2)">Your name</label>
              <div className="relative">
              <UserRound className={iconClass} strokeWidth={1.7} />
              <input
                id="challenge-name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(e) => {
                  setForm((c) => ({ ...c, name: e.target.value }));
                  setError("");
                }}
                className={inputClass}
              />
              </div>
            </div>

            <div className={inputWrap}>
              <label htmlFor="challenge-email" className="mb-2 block text-[13px] font-semibold text-(--wow-ink-2)">Your email</label>
              <div className="relative">
              <Mail className={iconClass} strokeWidth={1.7} />
              <input
                id="challenge-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => {
                  setForm((c) => ({ ...c, email: e.target.value }));
                  setError("");
                }}
                className={inputClass}
              />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group mt-1 inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-(--wow-ink) text-[15px] font-semibold text-(--wow-paper) transition hover:opacity-90 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Joining...
                </>
              ) : (
                <>
                  Start The 10-Day Challenge
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            {error && (
              <div role="alert" className="flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
                <span>{error}</span>
              </div>
            )}

            <p className="text-[12.5px] text-(--wow-muted)">
              *No spam. Just inspiration &amp; practical tools for your growth.
            </p>
          </form>
        </div>
      </AnimateIn>

      <TenDayChallengeSuccessModal open={showSuccess} onClose={() => setShowSuccess(false)} />
    </section>
  );
}
