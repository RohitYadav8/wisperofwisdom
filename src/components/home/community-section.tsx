"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { AnimateIn } from "../animations/animate-in";

export function CommunitySection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
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

      const response = await fetch(
        "/api/contact-submissions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: cleanEmail,
            source: "COMMUNITY",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Something went wrong."
        );
      }

      setSuccess(
        "Welcome to the community! You're successfully subscribed."
      );

      setEmail("");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#FAFAF7]
        py-16
        transition-colors
        duration-500
        dark:bg-[#061522]
        sm:py-20
        lg:py-24
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[360px]
          w-[360px]
          -translate-x-1/2
          rounded-full
          bg-[#2196F3]/6
          blur-[120px]
          dark:bg-[#2196F3]/10
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1180px]
          px-5
          sm:px-8
          lg:px-12
        "
      >
        <div
          className="
            relative
            overflow-hidden
            rounded-[32px]
            border
            border-slate-200/80
            bg-white
            px-6
            py-12
            text-center
            shadow-[0_24px_70px_rgba(15,23,42,0.06)]
            dark:border-white/[0.07]
            dark:bg-[#0B2031]
            dark:shadow-[0_28px_80px_rgba(0,0,0,0.22)]
            sm:px-10
            sm:py-14
            lg:px-16
            lg:py-16
          "
        >
          
          <div
            aria-hidden="true"
            className="
              absolute
              left-1/2
              top-0
              h-[3px]
              w-20
              -translate-x-1/2
              rounded-b-full
              bg-[#2196F3]
            "
          />

          <AnimateIn>
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-[#2196F3]
              "
            >
              Stay Connected
            </p>
          </AnimateIn>

          <AnimateIn delay={0.08}>
            <h2
              className="
                mx-auto
                mt-3
                max-w-[760px]
                font-serif
                text-[38px]
                font-normal
                leading-[1.08]
                tracking-[-0.035em]
                text-[#26343C]
                dark:text-white
                sm:text-[46px]
                lg:text-[52px]
              "
            >
              Join the community
            </h2>
          </AnimateIn>

          <AnimateIn delay={0.14}>
            <p
              className="
                mx-auto
                mt-5
                max-w-[650px]
                text-[14px]
                leading-7
                text-slate-500
                dark:text-slate-400
                sm:text-[16px]
              "
            >
              Stay connected with Whispers of Wisdom and receive
              the latest updates.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="
                mx-auto
                mt-8
                flex
                max-w-[620px]
                flex-col
                gap-3
                sm:flex-row
              "
            >
              <div
                className="
                  flex
                  flex-1
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-slate-200
                  bg-[#FAFAF7]
                  px-5
                  transition
                  focus-within:border-[#2196F3]/60
                  focus-within:ring-4
                  focus-within:ring-[#2196F3]/10
                  dark:border-white/10
                  dark:bg-[#071B29]
                "
              >
                <Mail
                  size={17}
                  strokeWidth={1.6}
                  className="shrink-0 text-slate-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="Enter your email"
                  disabled={loading}
                  required
                  className="
                    h-14
                    w-full
                    bg-transparent
                    text-[14px]
                    text-slate-800
                    outline-none
                    placeholder:text-slate-400
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    dark:text-white
                    dark:placeholder:text-slate-500
                  "
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={
                  loading ? undefined : { y: -2 }
                }
                whileTap={
                  loading ? undefined : { scale: 0.98 }
                }
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 22,
                }}
                className="
                  inline-flex
                  h-14
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-[#2196F3]
                  px-7
                  text-[12px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-white
                  transition-colors
                  hover:bg-[#1976D2]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  sm:min-w-[180px]
                "
              >
                {loading ? (
                  <>
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                    Joining...
                  </>
                ) : (
                  <>
                    Join Now
                    <ArrowRight
                      size={16}
                      strokeWidth={1.8}
                    />
                  </>
                )}
              </motion.button>
            </form>

            {success && (
              <div className="mx-auto mt-4 flex max-w-[620px] items-center justify-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={17} />
                <span>{success}</span>
              </div>
            )}

            {error && (
              <div className="mx-auto mt-4 flex max-w-[620px] items-center justify-center gap-2 text-sm text-red-500">
                <AlertCircle size={17} />
                <span>{error}</span>
              </div>
            )}
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}