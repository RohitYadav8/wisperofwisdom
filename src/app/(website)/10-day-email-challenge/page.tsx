"use client";

import { useState } from "react";

import { TenDayChallengeSuccessModal } from "../../../components/ten-day-challenge-success-modal";

import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  Heart,
  Lightbulb,
  Mail,
  Sprout,
  Target,
  UserRound,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { motion } from "motion/react";

import { AnimateIn } from "../../../components/animations/animate-in";

import {
  StaggerContainer,
  StaggerItem,
} from "../../../components/animations/stagger";

import { MagneticButton } from "../../../components/animations/magnetic-button";

/* ============================================================
   CHALLENGE BENEFITS
============================================================ */

const challengeBenefits = [
  {
    title: "Clarity",
    description:
      "Discover new perspectives that shift the way you see challenges.",
    icon: BookOpen,
  },
  {
    title: "Consistency",
    description: "Build momentum with simple daily actions.",
    icon: BarChart3,
  },
  {
    title: "Confidence",
    description: "Strengthen your mindset with proven principles.",
    icon: Heart,
  },
  {
    title: "Balance",
    description: "Apply success strategies in life and work.",
    icon: Target,
  },
  {
    title: "Lasting Growth",
    description: "Walk away with habits and tools that stick.",
    icon: Sprout,
  },
];

/* ============================================================
   STEPS
============================================================ */

const steps = [
  {
    title: "Daily Delivery",
    description: "A short, powerful email sent every morning.",
    icon: Mail,
  },
  {
    title: "Reflection",
    description:
      "One thought-provoking insight to inspire your mindset.",
    icon: Lightbulb,
  },
  {
    title: "Action Step",
    description: "A simple task you can implement immediately.",
    icon: Check,
  },
  {
    title: "Momentum",
    description:
      "Real progress in just 10 days—both mentally and practically.",
    icon: BarChart3,
  },
];

/* ============================================================
   PAGE
============================================================ */

export default function TenDayEmailChallengePage() {
  const [challengeForm, setChallengeForm] = useState({
    name: "",
    email: "",
  });

  const [challengeLoading, setChallengeLoading] =
    useState(false);

  const [challengeError, setChallengeError] =
    useState("");

  const [showSuccessModal, setShowSuccessModal] =
    useState(false);

  /* ==========================================================
     SUBMIT
  ========================================================== */

  async function handleChallengeSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setChallengeError("");

    const name = challengeForm.name.trim();
    const email = challengeForm.email.trim();

    if (!name || !email) {
      setChallengeError(
        "Please enter your name and email address."
      );
      return;
    }

    try {
      setChallengeLoading(true);

      const response = await fetch(
        "/api/contact-submissions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            source: "TEN_DAY_CHALLENGE",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to join the challenge. Please try again."
        );
      }

      setChallengeForm({
        name: "",
        email: "",
      });

      setShowSuccessModal(true);
    } catch (error) {
      setChallengeError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setChallengeLoading(false);
    }
  }

  return (
    <div
      className="
        overflow-hidden
        bg-[#FCFCFB]
        text-[#0F172A]
        transition-colors
        duration-500

        dark:bg-[#041522]
        dark:text-white
      "
    >
      {/* =========================================================
          INTRO
      ========================================================= */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#FCFCFB]
          py-10

          dark:bg-[#041522]

          sm:py-12
          lg:py-14
        "
      >
        {/* BACKGROUND GLOW */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-8
            h-[320px]
            w-[320px]
            -translate-x-1/2
            rounded-full
            bg-[#2196F3]/7
            blur-[110px]

            dark:bg-[#2196F3]/10
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-[1050px]
            px-5
            text-center

            sm:px-8
          "
        >
          <AnimateIn>
            <h2
              className="
                mx-auto
                max-w-[880px]
                font-serif
                text-[35px]
                font-medium
                leading-[1.08]
                tracking-[-0.035em]
                text-[#111827]

                dark:text-white

                sm:text-[44px]

                lg:text-[54px]
              "
            >
              The 10-Day “Whispers of Wisdom” Challenge
            </h2>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <p
              className="
                mx-auto
                mt-4
                max-w-[700px]
                text-[14px]
                leading-6
                text-[#2196F3]

                sm:text-[15px]
              "
            >
              Unlock daily insights to transform your mindset,
              habits, and life—one email at a time.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <div className="mt-6">
              <MagneticButton>
                <a
                  href="#challenge-form"
                  className="
                    inline-flex
                    min-h-[46px]
                    items-center
                    justify-center
                    gap-2.5
                    rounded-full
                    bg-[#2196F3]
                    px-6
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.07em]
                    text-white
                    shadow-[0_12px_30px_rgba(33,150,243,0.20)]

                    transition-all
                    duration-300

                    hover:-translate-y-0.5
                    hover:bg-[#1976D2]
                    hover:shadow-[0_16px_38px_rgba(33,150,243,0.26)]

                    dark:hover:bg-[#42A5F5]
                  "
                >
                  Yes! Send Me The 10-Day Challenge
                  <ArrowRight size={15} />
                </a>
              </MagneticButton>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* =========================================================
          WHY JOIN
      ========================================================= */}

      <section
        className="
          bg-[#FCFCFB]
          px-5
          pb-12

          dark:bg-[#041522]

          sm:px-8
          sm:pb-14

          lg:px-12
          lg:pb-16
        "
      >
        <div
          className="
            mx-auto
            max-w-[1280px]
            overflow-hidden
            rounded-[28px]
            border
            border-slate-200/70
            bg-white
            shadow-[0_20px_60px_rgba(15,23,42,0.05)]

            dark:border-white/10
            dark:bg-[#081B2A]
            dark:shadow-[0_20px_65px_rgba(0,0,0,0.20)]
          "
        >
          {/* HEADING */}

          <div
            className="
              border-b
              border-slate-200/70
              px-6
              py-7
              text-center

              dark:border-white/10

              sm:px-10
              sm:py-8

              lg:px-14
              lg:py-9
            "
          >
            <AnimateIn>
              <h2
                className="
                  font-serif
                  text-[29px]
                  font-medium
                  leading-[1.1]
                  tracking-[-0.03em]
                  text-[#0F172A]

                  dark:text-white

                  sm:text-[34px]

                  lg:text-[40px]
                "
              >
                Why Join This Challenge?
              </h2>

              <p
                className="
                  mx-auto
                  mt-3
                  max-w-[800px]
                  text-[13px]
                  leading-6
                  text-slate-600

                  dark:text-slate-400

                  sm:text-[14px]
                "
              >
                Each day, you&apos;ll receive a powerful
                “Whisper of Wisdom” to shift your perspective,
                fuel your growth, and simplify your success
                journey.
              </p>
            </AnimateIn>
          </div>

          {/* BENEFITS */}

          <StaggerContainer
            className="
              grid
              md:grid-cols-2
            "
          >
            {challengeBenefits.map((benefit, index) => {
              const Icon = benefit.icon;

              const isLast =
                index === challengeBenefits.length - 1;

              return (
                <StaggerItem
                  key={benefit.title}
                  className={
                    isLast ? "md:col-span-2" : ""
                  }
                >
                  <motion.div
                    whileHover={{
                      backgroundColor:
                        "rgba(33,150,243,0.035)",
                    }}
                    className={`
                      group
                      flex
                      min-h-[125px]
                      items-center
                      gap-4
                      p-5
                      transition-colors
                      duration-300

                      sm:p-6

                      lg:p-7

                      ${
                        index === 0
                          ? "border-b border-slate-200/70 dark:border-white/10 md:border-r"
                          : ""
                      }

                      ${
                        index === 1
                          ? "border-b border-slate-200/70 dark:border-white/10"
                          : ""
                      }

                      ${
                        index === 2
                          ? "border-b border-slate-200/70 dark:border-white/10 md:border-r"
                          : ""
                      }

                      ${
                        index === 3
                          ? "border-b border-slate-200/70 dark:border-white/10"
                          : ""
                      }
                    `}
                  >
                    {/* ICON */}

                    <motion.div
                      whileHover={{
                        scale: 1.07,
                        rotate: -4,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 240,
                        damping: 17,
                      }}
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-[#2196F3]/15
                        bg-[#2196F3]/8
                        text-[#2196F3]

                        dark:border-[#42A5F5]/20
                        dark:bg-[#2196F3]/12
                      "
                    >
                      <Icon
                        size={20}
                        strokeWidth={1.7}
                      />
                    </motion.div>

                    {/* TEXT */}

                    <div>
                      <h3
                        className="
                          font-serif
                          text-[20px]
                          font-semibold
                          tracking-[-0.015em]
                          text-[#0F172A]

                          dark:text-white
                        "
                      >
                        {benefit.title}
                      </h3>

                      <p
                        className="
                          mt-1
                          max-w-[440px]
                          text-[13px]
                          leading-5.5
                          text-slate-600

                          dark:text-slate-400
                        "
                      >
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}

      <section
        className="
          relative
          bg-white
          py-12

          dark:bg-[#061522]

          sm:py-14

          lg:py-16
        "
      >
        <div
          className="
            mx-auto
            max-w-[1250px]
            px-5

            sm:px-8

            lg:px-12
          "
        >
          <AnimateIn>
            <div className="text-center">
              <h2
                className="
                  font-serif
                  text-[29px]
                  font-medium
                  tracking-[-0.03em]
                  text-[#0F172A]

                  dark:text-white

                  sm:text-[34px]

                  lg:text-[40px]
                "
              >
                How It Works
              </h2>

              <p
                className="
                  mx-auto
                  mt-3
                  max-w-[700px]
                  text-[13px]
                  leading-6
                  text-slate-600

                  dark:text-slate-400

                  sm:text-[14px]
                "
              >
                Over 10 days, you&apos;ll receive one powerful
                email per day to inspire action and personal
                transformation.
              </p>
            </div>
          </AnimateIn>

          {/* STEPS */}

          <StaggerContainer
            className="
              mt-8
              grid
              gap-4

              md:grid-cols-2

              lg:mt-10
              lg:grid-cols-4
            "
          >
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <StaggerItem key={step.title}>
                  <motion.div
                    whileHover={{
                      y: -5,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 250,
                      damping: 20,
                    }}
                    className="
                      relative
                      h-full
                      min-h-[220px]
                      overflow-hidden
                      rounded-[22px]
                      border
                      border-slate-200/80
                      bg-[#FCFCFB]
                      p-6
                      shadow-[0_10px_30px_rgba(15,23,42,0.035)]
                      transition-colors
                      duration-300

                      hover:border-[#2196F3]/25

                      dark:border-white/10
                      dark:bg-[#0B2031]
                      dark:hover:border-[#2196F3]/30
                    "
                  >
                    {/* NUMBER */}

                    <span
                      className="
                        absolute
                        right-5
                        top-4
                        font-serif
                        text-4xl
                        text-slate-100

                        dark:text-white/[0.035]
                      "
                    >
                      0{index + 1}
                    </span>

                    {/* ICON */}

                    <div
                      className="
                        relative
                        z-10
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        bg-[#2196F3]/10
                        text-[#2196F3]

                        dark:bg-[#2196F3]/15
                      "
                    >
                      <Icon
                        size={21}
                        strokeWidth={1.7}
                      />
                    </div>

                    {/* TITLE */}

                    <h3
                      className="
                        relative
                        z-10
                        mt-6
                        font-serif
                        text-[21px]
                        font-semibold
                        tracking-[-0.02em]
                        text-[#0F172A]

                        dark:text-white
                      "
                    >
                      {step.title}
                    </h3>

                    {/* DESCRIPTION */}

                    <p
                      className="
                        relative
                        z-10
                        mt-2
                        text-[13px]
                        leading-5.5
                        text-slate-600

                        dark:text-slate-400
                      "
                    >
                      {step.description}
                    </p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}

      <section
        className="
          bg-white
          px-5
          pb-4

          dark:bg-[#061522]

          sm:px-8

          lg:px-12
        "
      >
        <AnimateIn>
          <div
            className="
              relative
              mx-auto
              max-w-[1280px]
              overflow-hidden
              rounded-[28px]
              bg-[#0D7BC0]
              px-6
              py-9
              text-white
              shadow-[0_20px_55px_rgba(13,123,192,0.20)]

              sm:px-9
              sm:py-10

              md:px-11

              lg:px-14
              lg:py-11
            "
          >
            {/* DECORATION */}

            <div
              className="
                pointer-events-none
                absolute
                -right-24
                -top-28
                h-[300px]
                w-[300px]
                rounded-full
                border
                border-white/10
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -bottom-32
                left-[35%]
                h-[320px]
                w-[320px]
                rounded-full
                bg-white/[0.06]
                blur-[70px]
              "
            />

            {/* CONTENT */}

            <div
              className="
                relative
                z-10
                flex
                flex-col
                items-start
                justify-between
                gap-6

                md:flex-row
                md:items-center
              "
            >
              <div>
                <h2
                  className="
                    font-serif
                    text-[29px]
                    font-medium
                    tracking-[-0.03em]

                    sm:text-[34px]

                    lg:text-[40px]
                  "
                >
                  A Journey Worth Starting
                </h2>

                <p
                  className="
                    mt-2.5
                    max-w-[680px]
                    text-[13px]
                    leading-6
                    text-white/80

                    sm:text-[14px]
                  "
                >
                  Success is built on small, consistent steps.
                  Let the daily whispers guide you toward your
                  best self—one day at a time.
                </p>
              </div>

              <MagneticButton className="shrink-0">
                <a
                  href="#challenge-form"
                  className="
                    inline-flex
                    min-h-[46px]
                    items-center
                    justify-center
                    gap-2.5
                    rounded-full
                    bg-white
                    px-6
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.06em]
                    text-[#0D7BC0]
                    shadow-[0_10px_25px_rgba(0,0,0,0.10)]

                    transition-all
                    duration-300

                    hover:-translate-y-0.5
                    hover:shadow-[0_14px_30px_rgba(0,0,0,0.14)]
                  "
                >
                  Yes! I Want The Challenge
                  <ArrowRight size={15} />
                </a>
              </MagneticButton>
            </div>
          </div>
        </AnimateIn>
      </section>

      {/* =========================================================
          FORM
      ========================================================= */}

      <section
        id="challenge-form"
        className="
          bg-white
          px-5
          py-12

          dark:bg-[#061522]

          sm:px-8
          sm:py-14

          lg:px-12
          lg:py-16
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1280px]
            overflow-hidden
            rounded-[28px]
            border
            border-slate-200/70
            bg-[#F7FAFC]
            shadow-[0_20px_60px_rgba(15,23,42,0.045)]

            dark:border-white/10
            dark:bg-[#081B2A]
            dark:shadow-[0_20px_60px_rgba(0,0,0,0.18)]

            lg:grid-cols-[0.85fr_1.15fr]
          "
        >
          {/* LEFT */}

          <AnimateIn direction="right">
            <div
              className="
                flex
                h-full
                flex-col
                justify-center
                border-b
                border-slate-200/70
                px-6
                py-8

                dark:border-white/10

                sm:px-8

                lg:border-b-0
                lg:border-r
                lg:px-10
                lg:py-11
              "
            >
              <h2
                className="
                  font-serif
                  text-[32px]
                  font-medium
                  tracking-[-0.035em]
                  text-[#0F172A]

                  dark:text-white

                  lg:text-[42px]
                "
              >
                Ready to Begin?
              </h2>

              <div
                className="
                  mt-4
                  h-[2px]
                  w-12
                  rounded-full
                  bg-[#2196F3]
                "
              />

              <p
                className="
                  mt-5
                  max-w-[470px]
                  text-[13px]
                  leading-6
                  text-slate-600

                  dark:text-slate-400

                  sm:text-[14px]
                "
              >
                Sign up now to receive your first “Whisper of
                Wisdom” within minutes. It&apos;s free, powerful,
                and could shift your whole perspective.
              </p>
            </div>
          </AnimateIn>

          {/* RIGHT FORM */}

          <AnimateIn direction="left" delay={0.1}>
            <form
              onSubmit={handleChallengeSubmit}
              className="
                flex
                h-full
                flex-col
                justify-center
                gap-3
                bg-white
                px-6
                py-8

                dark:bg-[#0B2031]

                sm:px-8

                lg:px-10
                lg:py-11
              "
            >
              {/* NAME */}

              <div className="relative">
                <UserRound
                  size={17}
                  strokeWidth={1.7}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="text"
                  name="name"
                  value={challengeForm.name}
                  onChange={(event) => {
                    setChallengeForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }));

                    setChallengeError("");
                  }}
                  placeholder="Your name"
                  required
                  disabled={challengeLoading}
                  autoComplete="name"
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-[#FCFCFB]
                    pl-11
                    pr-4
                    text-[13px]
                    text-slate-900
                    outline-none
                    transition-all

                    placeholder:text-slate-400

                    hover:border-slate-300

                    focus:border-[#2196F3]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#2196F3]/8

                    disabled:cursor-not-allowed
                    disabled:opacity-60

                    dark:border-white/10
                    dark:bg-[#081B2A]
                    dark:text-white
                  "
                />
              </div>

              {/* EMAIL */}

              <div className="relative">
                <Mail
                  size={17}
                  strokeWidth={1.7}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="email"
                  name="email"
                  value={challengeForm.email}
                  onChange={(event) => {
                    setChallengeForm((current) => ({
                      ...current,
                      email: event.target.value,
                    }));

                    setChallengeError("");
                  }}
                  placeholder="Your email"
                  required
                  disabled={challengeLoading}
                  autoComplete="email"
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-[#FCFCFB]
                    pl-11
                    pr-4
                    text-[13px]
                    text-slate-900
                    outline-none
                    transition-all

                    placeholder:text-slate-400

                    hover:border-slate-300

                    focus:border-[#2196F3]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#2196F3]/8

                    disabled:cursor-not-allowed
                    disabled:opacity-60

                    dark:border-white/10
                    dark:bg-[#081B2A]
                    dark:text-white
                  "
                />
              </div>

              {/* SUBMIT */}

              <motion.button
                type="submit"
                disabled={challengeLoading}
                whileHover={
                  challengeLoading
                    ? undefined
                    : {
                        y: -2,
                      }
                }
                whileTap={
                  challengeLoading
                    ? undefined
                    : {
                        scale: 0.985,
                      }
                }
                className="
                  flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  gap-2.5
                  rounded-xl
                  bg-[#2196F3]
                  px-5
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.06em]
                  text-white
                  shadow-[0_12px_28px_rgba(33,150,243,0.20)]
                  transition-all
                  duration-300

                  hover:bg-[#1976D2]
                  hover:shadow-[0_16px_34px_rgba(33,150,243,0.25)]

                  disabled:cursor-not-allowed
                  disabled:opacity-60

                  dark:hover:bg-[#42A5F5]
                "
              >
                {challengeLoading ? (
                  <>
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                    Joining...
                  </>
                ) : (
                  <>
                    Start The 10-Day Challenge
                    <ArrowRight size={15} />
                  </>
                )}
              </motion.button>

              {/* ERROR */}

              {challengeError && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
                    flex
                    items-start
                    gap-2
                    rounded-xl
                    border
                    border-red-200
                    bg-red-50
                    px-3.5
                    py-2.5
                    text-[12px]
                    leading-5
                    text-red-600

                    dark:border-red-500/20
                    dark:bg-red-500/10
                    dark:text-red-400
                  "
                >
                  <AlertCircle
                    size={17}
                    className="mt-0.5 shrink-0"
                  />

                  <span>{challengeError}</span>
                </motion.div>
              )}

              {/* NOTE */}

              <p
                className="
                  pt-0.5
                  text-[11px]
                  leading-5
                  text-slate-500

                  dark:text-slate-500
                "
              >
                *No spam. Just inspiration &amp; practical tools
                for your growth.
              </p>
            </form>
          </AnimateIn>
        </div>
      </section>

      {/* =========================================================
          SUCCESS MODAL
      ========================================================= */}

      <TenDayChallengeSuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}