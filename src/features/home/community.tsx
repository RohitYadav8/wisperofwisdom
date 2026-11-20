"use client";

import { useState } from "react";
import Image from "next/image";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { AnimateIn } from "../../components/animations/animate-in";
import { WHATSAPP_URL } from "./data";

/* Text matches the live site. Submits to the same API as before (source: COMMUNITY). */
export function Community() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess("");
    setError("");

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: cleanEmail, source: "COMMUNITY" }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setSuccess("Welcome to the community! You're successfully subscribed.");
      setName("");
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const field =
    "h-13 w-full rounded-2xl border border-(--wow-line) bg-(--wow-paper) px-4 text-[15px] text-(--wow-ink) outline-none transition placeholder:text-(--wow-muted) focus:border-(--wow-brand)";

  return (
    <section className="mx-auto max-w-[1240px] px-5 py-16 sm:px-10 lg:py-28">
      <AnimateIn>
        <div className="relative grid items-center gap-10 overflow-hidden rounded-[36px] bg-[#0b2233] p-7 text-[#f7f2e8] sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:p-[72px] dark:border dark:border-(--wow-line) dark:bg-(--wow-card)">
          <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full border-[1.5px] border-(--wow-gold)/60" />

          <div className="relative">
            <h2 className="wow-serif text-4xl font-semibold leading-[1.05] sm:text-5xl">Join the community</h2>
            <p className="mt-3 text-[#f7f2e8]/70">Newsletter to get in touch</p>

            <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-3">
              <label htmlFor="community-name" className="sr-only">Enter your name</label>
              <input id="community-name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className={field} />
              <label htmlFor="community-email" className="sr-only">Enter your email</label>
              <input id="community-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className={field} />

              {error && (
                <p role="alert" className="flex items-center gap-2 text-sm text-red-300">
                  <AlertCircle className="h-4 w-4 flex-none" /> {error}
                </p>
              )}
              {success && (
                <p role="status" className="flex items-center gap-2 text-sm text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 flex-none" /> {success}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-1 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-(--wow-gold) text-[15px] font-semibold uppercase tracking-[0.12em] text-white transition hover:brightness-105 disabled:opacity-70"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Subscribe
              </button>
            </form>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex h-13 w-full items-center justify-center gap-2.5 rounded-full bg-[#1f9d55] px-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:brightness-110"
            >
              Click here to join the WhatsApp community
              <FaWhatsapp className="h-5 w-5" />
            </a>
          </div>

          <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10">
            <Image
              src="/books2.png"
              alt=""
              width={1509}
              height={1042}
              sizes="(min-width: 1024px) 480px, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </AnimateIn>
    </section>
  );
}
