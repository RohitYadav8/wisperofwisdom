"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Mail, Send } from "lucide-react";

/* Submit logic and messages unchanged from the previous contact page. */
export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (error) setError("");
    if (success) setSuccess("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess("");
    setError("");

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setError("Please complete all fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, source: "CONTACT" }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send your message.");
      }

      setSuccess("Thank you! Your message has been sent successfully.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const field =
    "w-full rounded-2xl border border-(--wow-line) bg-(--wow-paper) text-[15px] text-(--wow-ink) outline-none transition placeholder:text-(--wow-muted) focus:border-(--wow-brand) focus:ring-4 focus:ring-(--wow-brand)/10 disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <div className="rounded-[32px] border border-(--wow-line) bg-(--wow-card) p-6 shadow-[0_40px_80px_-50px_rgba(11,34,51,0.45)] sm:p-10">
      <h2 className="wow-serif text-4xl font-semibold leading-[1.05] tracking-[-0.015em] sm:text-5xl">
        Send A Message
      </h2>
      <div className="mt-4 h-0.5 w-12 rounded-full bg-(--wow-gold)" />

      <form onSubmit={handleSubmit} noValidate className="mt-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="sr-only">Name</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              required
              disabled={loading}
              autoComplete="name"
              className={`${field} h-14 px-4`}
            />
          </div>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-(--wow-muted)" strokeWidth={1.7} />
            <label htmlFor="contact-email" className="sr-only">Email</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              disabled={loading}
              autoComplete="email"
              className={`${field} h-14 pl-11 pr-4`}
            />
          </div>
        </div>

        <label htmlFor="contact-message" className="sr-only">Message</label>
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
          rows={6}
          required
          disabled={loading}
          className={`${field} mt-4 resize-none px-4 py-4 leading-relaxed`}
        />

        <button
          type="submit"
          disabled={loading}
          className="group mt-5 inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-(--wow-ink) px-8 text-[15px] font-semibold text-(--wow-paper) transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Submit
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.8} />
            </>
          )}
        </button>

        {success && (
          <p role="status" className="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13px] text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4 flex-none" />
            <span>{success}</span>
          </p>
        )}
        {error && (
          <p role="alert" className="mt-4 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
            <AlertCircle className="h-4 w-4 flex-none" />
            <span>{error}</span>
          </p>
        )}
      </form>
    </div>
  );
}
