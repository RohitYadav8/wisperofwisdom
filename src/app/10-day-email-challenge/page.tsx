"use client";

import Link from "next/link";
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
} from "lucide-react";
import { motion } from "motion/react";

import { AnimateIn } from "../../components/animations/animate-in";
import {
  StaggerContainer,
  StaggerItem,
} from "../../components/animations/stagger";
import { MagneticButton } from "../../components/animations/magnetic-button";

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

const steps = [
  {
    title: "Daily Delivery",
    description: "A short, powerful email sent every morning.",
    icon: Mail,
  },
  {
    title: "Reflection",
    description: "One thought-provoking insight to inspire your mindset.",
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

export default function TenDayEmailChallengePage() {
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
          PAGE HEADER
      ========================================================= */}

      <section
        className="
          relative
          overflow-hidden
          border-b
          border-slate-200/70
          bg-[#F5F3EC]
          dark:border-white/10
          dark:bg-[#071725]
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-72
            w-72
            rounded-full
            bg-[#2196F3]/10
            blur-[100px]
          "
        />

        <div
          className="
            relative
            mx-auto
            flex
            max-w-[1400px]
            flex-col
            gap-5
            px-5
            py-12
            sm:px-8
            md:flex-row
            md:items-end
            md:justify-between
            lg:px-12
            lg:py-16
          "
        >
          <AnimateIn direction="right">
            <h1
              className="
                max-w-[700px]
                font-serif
                text-4xl
                font-medium
                leading-[1.05]
                tracking-[-0.035em]
                text-[#162033]
                dark:text-white
                sm:text-5xl
                lg:text-[58px]
              "
            >
              10 Day Email Challenge
            </h1>
          </AnimateIn>

          <AnimateIn direction="left" delay={0.1}>
            <div
              className="
                flex
                items-center
                gap-2
                pb-1
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              <Link
                href="/"
                className="
                  transition-colors
                  duration-300
                  hover:text-[#2196F3]
                "
              >
                Home
              </Link>

              <span className="text-slate-300 dark:text-slate-600">
                /
              </span>

              <span className="text-[#2196F3]">
                10 Day Email Challenge
              </span>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#FCFCFB]
          py-20
          dark:bg-[#041522]
          sm:py-24
          lg:py-28
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-10
            h-[480px]
            w-[480px]
            -translate-x-1/2
            rounded-full
            bg-[#2196F3]/7
            blur-[150px]
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
                max-w-[900px]
                font-serif
                text-[38px]
                font-medium
                leading-[1.08]
                tracking-[-0.035em]
                text-[#111827]
                dark:text-white
                sm:text-5xl
                lg:text-[62px]
              "
            >
              The 10-Day “Whispers of Wisdom” Challenge
            </h2>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <p
              className="
                mx-auto
                mt-6
                max-w-[740px]
                text-base
                leading-8
                text-[#2196F3]
                sm:text-lg
              "
            >
              Unlock daily insights to transform your mindset, habits, and
              life—one email at a time.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <div className="mt-9">
              <MagneticButton>
                <a
                  href="#challenge-form"
                  className="
                    inline-flex
                    min-h-12
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    bg-[#2196F3]
                    px-7
                    text-[13px]
                    font-semibold
                    uppercase
                    tracking-[0.07em]
                    text-white
                    shadow-[0_14px_35px_rgba(33,150,243,0.24)]
                    transition-all
                    duration-300
                    hover:bg-[#1976D2]
                    hover:shadow-[0_18px_45px_rgba(33,150,243,0.3)]
                    dark:hover:bg-[#42A5F5]
                  "
                >
                  Yes! Send Me The 10-Day Challenge

                  <ArrowRight size={16} />
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
          pb-20
          dark:bg-[#041522]
          sm:px-8
          sm:pb-24
          lg:px-12
          lg:pb-28
        "
      >
        <div
          className="
            mx-auto
            max-w-[1280px]
            overflow-hidden
            rounded-[34px]
            border
            border-slate-200/70
            bg-white
            shadow-[0_25px_80px_rgba(15,23,42,0.06)]
            dark:border-white/10
            dark:bg-[#081B2A]
            dark:shadow-[0_25px_80px_rgba(0,0,0,0.22)]
          "
        >
          <div
            className="
              border-b
              border-slate-200/70
              px-6
              py-10
              text-center
              dark:border-white/10
              sm:px-10
              lg:px-14
              lg:py-12
            "
          >
            <AnimateIn>
              <h2
                className="
                  font-serif
                  text-3xl
                  font-medium
                  tracking-[-0.03em]
                  text-[#0F172A]
                  dark:text-white
                  sm:text-4xl
                  lg:text-[46px]
                "
              >
                Why Join This Challenge?
              </h2>

              <p
                className="
                  mx-auto
                  mt-4
                  max-w-[850px]
                  text-sm
                  leading-7
                  text-slate-600
                  dark:text-slate-400
                  sm:text-base
                "
              >
                Each day, you&apos;ll receive a powerful “Whisper of Wisdom” to
                shift your perspective, fuel your growth, and simplify your
                success journey.
              </p>
            </AnimateIn>
          </div>

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
                  className={isLast ? "md:col-span-2" : ""}
                >
                  <motion.div
                    whileHover={{
                      backgroundColor: "rgba(33,150,243,0.035)",
                    }}
                    className={`
                      group
                      flex
                      min-h-[145px]
                      items-center
                      gap-5
                      p-7
                      transition-colors
                      duration-300
                      sm:p-8
                      lg:p-10

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
                    <motion.div
                      whileHover={{
                        scale: 1.08,
                        rotate: -4,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 240,
                        damping: 17,
                      }}
                      className="
                        flex
                        h-14
                        w-14
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-[#2196F3]/15
                        bg-[#2196F3]/8
                        text-[#2196F3]
                        dark:border-[#42A5F5]/20
                        dark:bg-[#2196F3]/12
                      "
                    >
                      <Icon size={22} strokeWidth={1.7} />
                    </motion.div>

                    <div>
                      <h3
                        className="
                          font-serif
                          text-[22px]
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
                          mt-1.5
                          max-w-[440px]
                          text-sm
                          leading-6
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
          py-20
          dark:bg-[#061522]
          sm:py-24
          lg:py-28
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
                  text-3xl
                  font-medium
                  tracking-[-0.03em]
                  text-[#0F172A]
                  dark:text-white
                  sm:text-4xl
                  lg:text-[46px]
                "
              >
                How It Works
              </h2>

              <p
                className="
                  mx-auto
                  mt-4
                  max-w-[720px]
                  text-sm
                  leading-7
                  text-slate-600
                  dark:text-slate-400
                  sm:text-base
                "
              >
                Over 10 days, you&apos;ll receive one powerful email per day to
                inspire action and personal transformation.
              </p>
            </div>
          </AnimateIn>

          <StaggerContainer
            className="
              mt-14
              grid
              gap-5
              md:grid-cols-2
              lg:mt-16
              lg:grid-cols-4
            "
          >
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <StaggerItem key={step.title}>
                  <motion.div
                    whileHover={{
                      y: -7,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 250,
                      damping: 20,
                    }}
                    className="
                      relative
                      h-full
                      min-h-[260px]
                      overflow-hidden
                      rounded-[26px]
                      border
                      border-slate-200/80
                      bg-[#FCFCFB]
                      p-7
                      shadow-[0_12px_35px_rgba(15,23,42,0.04)]
                      transition-colors
                      duration-300
                      hover:border-[#2196F3]/25
                      dark:border-white/10
                      dark:bg-[#0B2031]
                      dark:hover:border-[#2196F3]/30
                    "
                  >
                    <span
                      className="
                        absolute
                        right-6
                        top-5
                        font-serif
                        text-5xl
                        text-slate-100
                        dark:text-white/[0.035]
                      "
                    >
                      0{index + 1}
                    </span>

                    <div
                      className="
                        relative
                        z-10
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-full
                        bg-[#2196F3]/10
                        text-[#2196F3]
                        dark:bg-[#2196F3]/15
                      "
                    >
                      <Icon size={23} strokeWidth={1.7} />
                    </div>

                    <h3
                      className="
                        relative
                        z-10
                        mt-8
                        font-serif
                        text-2xl
                        font-semibold
                        tracking-[-0.02em]
                        text-[#0F172A]
                        dark:text-white
                      "
                    >
                      {step.title}
                    </h3>

                    <p
                      className="
                        relative
                        z-10
                        mt-3
                        text-sm
                        leading-6
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
          pb-5
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
              rounded-[32px]
              bg-[#0D7BC0]
              px-7
              py-12
              text-white
              shadow-[0_25px_60px_rgba(13,123,192,0.24)]
              sm:px-10
              md:px-12
              lg:px-16
              lg:py-14
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                -right-28
                -top-32
                h-[340px]
                w-[340px]
                rounded-full
                border
                border-white/10
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -bottom-40
                left-[35%]
                h-[360px]
                w-[360px]
                rounded-full
                bg-white/[0.06]
                blur-[80px]
              "
            />

            <div
              className="
                relative
                z-10
                flex
                flex-col
                items-start
                justify-between
                gap-8
                md:flex-row
                md:items-center
              "
            >
              <div>
                <h2
                  className="
                    font-serif
                    text-3xl
                    font-medium
                    tracking-[-0.03em]
                    sm:text-4xl
                    lg:text-[46px]
                  "
                >
                  A Journey Worth Starting
                </h2>

                <p
                  className="
                    mt-4
                    max-w-[700px]
                    text-sm
                    leading-7
                    text-white/80
                    sm:text-base
                  "
                >
                  Success is built on small, consistent steps. Let the daily
                  whispers guide you toward your best self—one day at a time.
                </p>
              </div>

              <MagneticButton className="shrink-0">
                <a
                  href="#challenge-form"
                  className="
                    inline-flex
                    min-h-12
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    bg-white
                    px-7
                    text-[13px]
                    font-semibold
                    uppercase
                    tracking-[0.06em]
                    text-[#0D7BC0]
                    shadow-[0_12px_30px_rgba(0,0,0,0.12)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-[0_16px_35px_rgba(0,0,0,0.16)]
                  "
                >
                  Yes! I Want The Challenge

                  <ArrowRight size={16} />
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
          py-20
          dark:bg-[#061522]
          sm:px-8
          sm:py-24
          lg:px-12
          lg:py-28
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1280px]
            overflow-hidden
            rounded-[32px]
            border
            border-slate-200/70
            bg-[#F7FAFC]
            shadow-[0_24px_70px_rgba(15,23,42,0.05)]
            dark:border-white/10
            dark:bg-[#081B2A]
            dark:shadow-[0_24px_70px_rgba(0,0,0,0.2)]
            lg:grid-cols-[0.85fr_1.15fr]
          "
        >
          <AnimateIn direction="right">
            <div
              className="
                flex
                h-full
                flex-col
                justify-center
                border-b
                border-slate-200/70
                px-7
                py-10
                dark:border-white/10
                sm:px-10
                lg:border-b-0
                lg:border-r
                lg:px-12
                lg:py-14
              "
            >
              <h2
                className="
                  font-serif
                  text-4xl
                  font-medium
                  tracking-[-0.035em]
                  text-[#0F172A]
                  dark:text-white
                  lg:text-[48px]
                "
              >
                Ready to Begin?
              </h2>

              <div
                className="
                  mt-5
                  h-[2px]
                  w-14
                  rounded-full
                  bg-[#2196F3]
                "
              />

              <p
                className="
                  mt-6
                  max-w-[480px]
                  text-sm
                  leading-7
                  text-slate-600
                  dark:text-slate-400
                  sm:text-base
                "
              >
                Sign up now to receive your first “Whisper of Wisdom” within
                minutes. It&apos;s free, powerful, and could shift your whole
                perspective.
              </p>
            </div>
          </AnimateIn>

          <AnimateIn direction="left" delay={0.1}>
            <form
              onSubmit={(event) => event.preventDefault()}
              className="
                flex
                h-full
                flex-col
                justify-center
                gap-4
                bg-white
                px-7
                py-10
                dark:bg-[#0B2031]
                sm:px-10
                lg:px-12
                lg:py-14
              "
            >
              <div className="relative">
                <UserRound
                  size={18}
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
                  placeholder="Your name"
                  className="
                    h-14
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-[#FCFCFB]
                    pl-12
                    pr-4
                    text-sm
                    text-slate-900
                    outline-none
                    transition-all
                    placeholder:text-slate-400
                    hover:border-slate-300
                    focus:border-[#2196F3]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#2196F3]/8
                    dark:border-white/10
                    dark:bg-[#081B2A]
                    dark:text-white
                  "
                />
              </div>

              <div className="relative">
                <Mail
                  size={18}
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
                  placeholder="Your email"
                  className="
                    h-14
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-[#FCFCFB]
                    pl-12
                    pr-4
                    text-sm
                    text-slate-900
                    outline-none
                    transition-all
                    placeholder:text-slate-400
                    hover:border-slate-300
                    focus:border-[#2196F3]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#2196F3]/8
                    dark:border-white/10
                    dark:bg-[#081B2A]
                    dark:text-white
                  "
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.985,
                }}
                className="
                  flex
                  h-14
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  bg-[#2196F3]
                  px-6
                  text-[13px]
                  font-semibold
                  uppercase
                  tracking-[0.06em]
                  text-white
                  shadow-[0_14px_35px_rgba(33,150,243,0.22)]
                  transition-all
                  duration-300
                  hover:bg-[#1976D2]
                  hover:shadow-[0_18px_40px_rgba(33,150,243,0.28)]
                  dark:hover:bg-[#42A5F5]
                "
              >
                Start The 10-Day Challenge

                <ArrowRight size={16} />
              </motion.button>

              <p
                className="
                  pt-1
                  text-xs
                  leading-5
                  text-slate-500
                  dark:text-slate-500
                "
              >
                *No spam. Just inspiration &amp; practical tools for your
                growth.
              </p>
            </form>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}