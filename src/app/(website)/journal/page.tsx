"use client";

import {
  ArrowRight,
  BookOpen,
  Check,
  Download,
  Mail,
  Send,
  Sparkles,
  Target,
} from "lucide-react";

import { motion } from "motion/react";

import { AnimateIn } from "../../../components/animations/animate-in";

import { MagneticButton } from "../../../components/animations/magnetic-button";

import {
  StaggerContainer,
  StaggerItem,
} from "../../../components/animations/stagger";

/* ============================================================
   JOURNAL BENEFITS
============================================================ */

const journalBenefits = [
  "Break free from overwhelm and confusion",
  "Define and pursue meaningful goals",
  "Build habits that last",
  "Stay motivated and inspired, even on hard days",
  "Record your growth so you can see how far you've come",
];

/* ============================================================
   JOURNAL INSIDE
============================================================ */

const journalInside = [
  {
    feature: "Daily Reflection Pages",
    benefit: "Capture thoughts and insights",
    outcome: "Feel calm, centered, and self-aware",
  },
  {
    feature: "Action Step Tracker",
    benefit: "Build consistent small habits",
    outcome: "Gain confidence from progress",
  },
  {
    feature: "Goal Setting Framework",
    benefit: "Set achievable 3-6 month goals",
    outcome: "Feel motivated and future-focused",
  },
  {
    feature: "Mindset Boosters",
    benefit: "Stay inspired when energy dips",
    outcome: "Feel encouraged and resilient",
  },
  {
    feature: "Progress Checkpoints",
    benefit: "Review wins and lessons weekly",
    outcome: "Feel proud and unstoppable",
  },
];

/* ============================================================
   READER REVIEWS
============================================================ */

const readerReviews = [
  {
    text: `"This journal kept me accountable to my actions and helped me finally achieve my 3-month goals."`,
    author: "Sarah B.",
  },
  {
    text: `"I never realised how powerful reflection could be until I started writing daily. Game changer."`,
    author: "Alex M.",
  },
  {
    text: `"It feels like a coach in my pocket — guiding me every day."`,
    author: "Priya R.",
  },
];

/* ============================================================
   JOURNAL PAGE
============================================================ */

export default function JournalPage() {
  return (
    <main
      className="
        overflow-hidden
        bg-[#fbfcfd]
        text-[#0f172a]
        transition-colors
        duration-500
        dark:bg-[#041522]
        dark:text-white
      "
    >
      {/* ==========================================================
          JOURNAL HERO
      ========================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-[#38a7e5]
          via-[#238ecb]
          to-[#073b5c]
          px-5
          py-12
          text-white

          sm:px-8
          sm:py-14

          lg:px-12
          lg:py-16
        "
      >
        {/* DECORATION */}

        <div
          className="
            pointer-events-none
            absolute
            -right-[120px]
            -top-[140px]
            h-[420px]
            w-[420px]
            rounded-full
            border
            border-white/10
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-[-170px]
            left-[20%]
            h-[420px]
            w-[420px]
            rounded-full
            bg-white/[0.08]
            blur-[100px]
          "
        />

        {/* HERO CONTENT */}

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-[980px]
            text-center
          "
        >
          <AnimateIn>
            <div
              className="
                mx-auto
                mb-4
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-white/15
                bg-white/10
                backdrop-blur-sm
              "
            >
              <Sparkles size={17} />
            </div>
          </AnimateIn>

          <AnimateIn delay={0.05}>
            <h1
              className="
                font-serif
                text-[34px]
                font-medium
                leading-[1.08]
                tracking-[-0.035em]

                sm:text-[44px]

                lg:text-[54px]
              "
            >
              Unlock Your Free Whispers of Wisdom Journal
            </h1>
          </AnimateIn>

          <AnimateIn delay={0.12}>
            <p
              className="
                mx-auto
                mt-4
                max-w-[700px]
                text-[13px]
                leading-6
                text-white/80

                sm:text-[14px]
              "
            >
              Imagine waking up each day with clarity, confidence, and a
              simple plan for success. This free journal is your first step.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.22}>
            <div className="mt-6">
              <MagneticButton>
                <a
                  href="#journal-form"
                  className="
                    inline-flex
                    min-h-[46px]
                    items-center
                    justify-center
                    gap-2.5
                    rounded-full
                    bg-[#061522]
                    px-6
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.07em]
                    text-white
                    shadow-[0_14px_32px_rgba(0,0,0,0.20)]
                    transition-all
                    duration-300

                    hover:-translate-y-0.5
                    hover:bg-white
                    hover:text-[#061522]
                    hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)]
                  "
                >
                  <BookOpen size={14} />
                  Yes, I Want My Free Journal
                  <ArrowRight size={14} />
                </a>
              </MagneticButton>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ==========================================================
          QUOTE
      ========================================================== */}

      <section
        className="
          border-b
          border-[#2196F3]/10
          bg-[#edf8ff]
          px-5
          py-4
          text-center

          dark:border-white/10
          dark:bg-[#061b2a]
        "
      >
        <AnimateIn>
          <p
            className="
              font-serif
              text-[14px]
              italic
              text-[#2196F3]

              sm:text-[15px]

              dark:text-[#42A5F5]
            "
          >
            “Clarity creates focus. Focus creates results.”
          </p>
        </AnimateIn>
      </section>

      {/* ==========================================================
          MAIN CONTENT AREA
      ========================================================== */}

      <section
        className="
          bg-[#edf8ff]
          px-5
          py-10

          dark:bg-[#061b2a]

          sm:px-8
          sm:py-12

          lg:px-12
          lg:py-14
        "
      >
        <div className="mx-auto max-w-[1180px]">
          {/* ======================================================
              MORE THAN JUST PAGES
          ====================================================== */}

          <AnimateIn>
            <div
              className="
                rounded-[26px]
                border
                border-white
                bg-white
                p-6
                shadow-[0_20px_55px_rgba(15,23,42,0.07)]

                dark:border-white/10
                dark:bg-[#0B2031]
                dark:shadow-[0_20px_55px_rgba(0,0,0,0.22)]

                sm:p-8

                lg:p-9
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-6

                  lg:grid
                  lg:grid-cols-[0.8fr_1.2fr]
                  lg:items-start
                  lg:gap-10
                "
              >
                {/* LEFT */}

                <div>
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#2196F3]/10
                      text-[#2196F3]
                    "
                  >
                    <BookOpen size={20} />
                  </div>

                  <h2
                    className="
                      mt-4
                      font-serif
                      text-[27px]
                      font-medium
                      leading-[1.08]
                      tracking-[-0.03em]
                      text-[#2196F3]

                      sm:text-[32px]
                    "
                  >
                    This Journal Is More Than Just Pages
                  </h2>
                </div>

                {/* RIGHT */}

                <div>
                  <p
                    className="
                      text-[13px]
                      leading-6
                      text-slate-600

                      dark:text-slate-400

                      sm:text-[14px]
                    "
                  >
                    It&apos;s a daily companion that helps you turn whispers
                    of wisdom into real transformation. With guided prompts,
                    reflection space, and simple action steps, you&apos;ll
                    finally have the structure to:
                  </p>

                  <StaggerContainer className="mt-5 space-y-2.5">
                    {journalBenefits.map((benefit) => (
                      <StaggerItem key={benefit}>
                        <div
                          className="
                            flex
                            items-start
                            gap-2.5
                            text-[13px]
                            leading-5.5
                            text-slate-700

                            dark:text-slate-300
                          "
                        >
                          <span
                            className="
                              mt-0.5
                              flex
                              h-5
                              w-5
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              bg-[#2196F3]/10
                              text-[#2196F3]
                            "
                          >
                            <Check size={11} />
                          </span>

                          {benefit}
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </div>

              <div className="mt-7 flex justify-center">
                <MagneticButton>
                  <a
                    href="#journal-form"
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
                      tracking-[0.06em]
                      text-white
                      shadow-[0_10px_25px_rgba(33,150,243,0.18)]
                      transition-all
                      duration-300

                      hover:-translate-y-0.5
                      hover:bg-[#1976D2]
                      hover:shadow-[0_14px_32px_rgba(33,150,243,0.25)]
                    "
                  >
                    Claim My Free Journal Now
                    <ArrowRight size={14} />
                  </a>
                </MagneticButton>
              </div>
            </div>
          </AnimateIn>

          {/* ======================================================
              WHAT'S INSIDE
          ====================================================== */}

          <AnimateIn delay={0.06}>
            <div
              className="
                mt-6
                overflow-hidden
                rounded-[26px]
                border
                border-white
                bg-white
                p-6
                shadow-[0_20px_55px_rgba(15,23,42,0.07)]

                dark:border-white/10
                dark:bg-[#0B2031]

                sm:p-8

                lg:p-9
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-2

                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <h2
                  className="
                    font-serif
                    text-[27px]
                    font-medium
                    tracking-[-0.03em]
                    text-[#2196F3]

                    sm:text-[32px]
                  "
                >
                  What&apos;s Inside the Journal
                </h2>

                <div
                  className="
                    hidden
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-[#2196F3]/10
                    text-[#2196F3]

                    sm:flex
                  "
                >
                  <Target size={18} />
                </div>
              </div>

              {/* TABLE */}

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse">
                  <thead>
                    <tr
                      className="
                        bg-[#f5f9fc]
                        text-left

                        dark:bg-white/[0.04]
                      "
                    >
                      <th
                        className="
                          rounded-l-lg
                          px-4
                          py-3
                          text-[11px]
                          font-semibold
                          uppercase
                          tracking-[0.05em]
                          text-[#2196F3]
                        "
                      >
                        Feature
                      </th>

                      <th
                        className="
                          px-4
                          py-3
                          text-[11px]
                          font-semibold
                          uppercase
                          tracking-[0.05em]
                          text-[#2196F3]
                        "
                      >
                        Benefit
                      </th>

                      <th
                        className="
                          rounded-r-lg
                          px-4
                          py-3
                          text-[11px]
                          font-semibold
                          uppercase
                          tracking-[0.05em]
                          text-[#2196F3]
                        "
                      >
                        Emotional Outcome
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {journalInside.map((item) => (
                      <tr
                        key={item.feature}
                        className="
                          border-b
                          border-slate-200/70
                          transition-colors
                          duration-300

                          hover:bg-[#2196F3]/[0.025]

                          dark:border-white/10
                          dark:hover:bg-white/[0.025]
                        "
                      >
                        <td
                          className="
                            px-4
                            py-3.5
                            text-[13px]
                            font-semibold
                            text-slate-800

                            dark:text-white
                          "
                        >
                          {item.feature}
                        </td>

                        <td
                          className="
                            px-4
                            py-3.5
                            text-[13px]
                            text-slate-600

                            dark:text-slate-400
                          "
                        >
                          {item.benefit}
                        </td>

                        <td
                          className="
                            px-4
                            py-3.5
                            text-[13px]
                            text-slate-600

                            dark:text-slate-400
                          "
                        >
                          {item.outcome}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-7 flex justify-center">
                <MagneticButton>
                  <a
                    href="#journal-form"
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
                      tracking-[0.06em]
                      text-white
                      shadow-[0_10px_25px_rgba(33,150,243,0.18)]
                      transition-all
                      duration-300

                      hover:-translate-y-0.5
                      hover:bg-[#1976D2]
                    "
                  >
                    <Send size={14} />
                    Yes, I&apos;m Ready to Start My Journey
                  </a>
                </MagneticButton>
              </div>
            </div>
          </AnimateIn>

          {/* ======================================================
              WHY READERS LOVE IT
          ====================================================== */}

          <AnimateIn delay={0.08}>
            <div
              className="
                mt-6
                rounded-[26px]
                border
                border-white
                bg-white
                p-6
                shadow-[0_20px_55px_rgba(15,23,42,0.07)]

                dark:border-white/10
                dark:bg-[#0B2031]

                sm:p-8

                lg:p-9
              "
            >
              <h2
                className="
                  font-serif
                  text-[27px]
                  font-medium
                  tracking-[-0.03em]
                  text-[#2196F3]

                  sm:text-[32px]
                "
              >
                Why Readers Love It
              </h2>

              <StaggerContainer
                className="
                  mt-6
                  grid
                  gap-4

                  lg:grid-cols-3
                "
              >
                {readerReviews.map((review) => (
                  <StaggerItem key={review.author}>
                    <motion.div
                      whileHover={{
                        y: -4,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 250,
                        damping: 20,
                      }}
                      className="
                        h-full
                        rounded-[20px]
                        border
                        border-slate-200/80
                        bg-[#fbfcfd]
                        p-5
                        transition-colors
                        duration-300

                        hover:border-[#2196F3]/25

                        dark:border-white/10
                        dark:bg-[#081B2A]
                      "
                    >
                      <p
                        className="
                          font-serif
                          text-[15px]
                          italic
                          leading-6
                          text-slate-700

                          dark:text-slate-300
                        "
                      >
                        {review.text}
                      </p>

                      <p
                        className="
                          mt-4
                          text-[12px]
                          font-semibold
                          text-[#2196F3]
                        "
                      >
                        — {review.author}
                      </p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <div className="mt-7 flex justify-center">
                <a
                  href="#journal-form"
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
                    tracking-[0.06em]
                    text-white
                    transition-colors
                    duration-300

                    hover:bg-[#1976D2]
                  "
                >
                  <Mail size={14} />
                  Send Me My Free Journal
                </a>
              </div>
            </div>
          </AnimateIn>

          {/* ======================================================
              JOURNAL FORM
          ====================================================== */}

          <AnimateIn delay={0.1}>
            <div
              id="journal-form"
              className="
                mt-6
                rounded-[26px]
                border
                border-white
                bg-white
                p-6
                shadow-[0_20px_55px_rgba(15,23,42,0.07)]

                dark:border-white/10
                dark:bg-[#0B2031]

                sm:p-8

                lg:p-9
              "
            >
              <div className="mx-auto max-w-[900px]">
                {/* FORM HEADING */}

                <div className="text-center">
                  <h2
                    className="
                      font-serif
                      text-[27px]
                      font-medium
                      tracking-[-0.03em]
                      text-[#2196F3]

                      sm:text-[32px]
                    "
                  >
                    Claim Your Free Journal Now
                  </h2>

                  <p
                    className="
                      mx-auto
                      mt-3
                      max-w-[740px]
                      text-[13px]
                      leading-6
                      text-slate-600

                      dark:text-slate-400

                      sm:text-[14px]
                    "
                  >
                    <span
                      className="
                        font-semibold
                        text-slate-800

                        dark:text-white
                      "
                    >
                      Limited-Time Free Download:
                    </span>{" "}
                    Join thousands who are using this journal to create
                    clarity and momentum in their lives.
                  </p>
                </div>

                {/* FORM */}

                <form
                  onSubmit={(event) =>
                    event.preventDefault()
                  }
                  className="mt-7 space-y-4"
                >
                  {/* NAME + LAST NAME */}

                  <div
                    className="
                      grid
                      gap-4

                      md:grid-cols-2
                    "
                  >
                    <FormField
                      label="First Name *"
                      name="firstName"
                      type="text"
                    />

                    <FormField
                      label="Last Name *"
                      name="lastName"
                      type="text"
                    />
                  </div>

                  {/* EMAIL */}

                  <FormField
                    label="Email Address *"
                    name="email"
                    type="email"
                  />

                  {/* PHONE */}

                  <FormField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                  />

                  {/* CHALLENGE */}

                  <div>
                    <label
                      htmlFor="challenge"
                      className="
                        mb-1.5
                        block
                        text-[13px]
                        font-medium
                        text-slate-700

                        dark:text-slate-300
                      "
                    >
                      What&apos;s your biggest
                      personal/professional challenge? *
                    </label>

                    <textarea
                      id="challenge"
                      name="challenge"
                      rows={4}
                      className="
                        w-full
                        resize-none
                        rounded-xl
                        border
                        border-slate-300
                        bg-[#fbfcfd]
                        px-4
                        py-3
                        text-[13px]
                        text-slate-900
                        outline-none
                        transition-all
                        duration-300

                        hover:border-slate-400

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

                  {/* GOALS */}

                  <div>
                    <label
                      htmlFor="goals"
                      className="
                        mb-1.5
                        block
                        text-[13px]
                        font-medium
                        text-slate-700

                        dark:text-slate-300
                      "
                    >
                      What are your key goals for the next
                      3-6 months? *
                    </label>

                    <textarea
                      id="goals"
                      name="goals"
                      rows={4}
                      className="
                        w-full
                        resize-none
                        rounded-xl
                        border
                        border-slate-300
                        bg-[#fbfcfd]
                        px-4
                        py-3
                        text-[13px]
                        text-slate-900
                        outline-none
                        transition-all
                        duration-300

                        hover:border-slate-400

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

                  {/* TERMS */}

                  <label
                    className="
                      flex
                      cursor-pointer
                      items-start
                      gap-2.5
                      text-[13px]
                      leading-5
                      text-slate-600

                      dark:text-slate-400
                    "
                  >
                    <input
                      type="checkbox"
                      required
                      className="
                        mt-0.5
                        h-4
                        w-4
                        accent-[#2196F3]
                      "
                    />

                    <span>
                      I agree to the Standard Terms and
                      Conditions *
                    </span>
                  </label>

                  {/* MARKETING */}

                  <label
                    className="
                      flex
                      cursor-pointer
                      items-start
                      gap-2.5
                      text-[13px]
                      leading-5
                      text-slate-600

                      dark:text-slate-400
                    "
                  >
                    <input
                      type="checkbox"
                      className="
                        mt-0.5
                        h-4
                        w-4
                        accent-[#2196F3]
                      "
                    />

                    <span>
                      I consent to receive occasional offers and
                      marketing communications from Whispers of
                      Wisdom and its associated companies and
                      partners.
                    </span>
                  </label>

                  {/* GDPR */}

                  <div
                    className="
                      rounded-xl
                      border
                      border-cyan-200
                      bg-cyan-50
                      px-3.5
                      py-2.5
                      text-[11px]
                      leading-5
                      text-slate-600

                      dark:border-cyan-400/10
                      dark:bg-cyan-400/[0.05]
                      dark:text-slate-400
                    "
                  >
                    <span
                      className="
                        font-semibold
                        text-slate-700

                        dark:text-slate-300
                      "
                    >
                      GDPR Disclaimer:
                    </span>{" "}
                    We respect your privacy. Your data will never
                    be sold to third parties. You can unsubscribe
                    at any time.
                  </div>

                  {/* SUBMIT */}

                  <div className="pt-1 text-center">
                    <motion.button
                      type="submit"
                      whileHover={{
                        y: -2,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      className="
                        inline-flex
                        min-h-[48px]
                        items-center
                        justify-center
                        gap-2.5
                        rounded-full
                        bg-[#2196F3]
                        px-7
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-[0.06em]
                        text-white
                        shadow-[0_12px_28px_rgba(33,150,243,0.20)]

                        transition-all
                        duration-300

                        hover:bg-[#1976D2]
                      "
                    >
                      <Download size={14} />
                      Download My Free Journal
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </AnimateIn>

          {/* ======================================================
              FINAL CTA
          ====================================================== */}

          <AnimateIn delay={0.12}>
            <div
              className="
                mt-6
                rounded-[26px]
                border
                border-white
                bg-white
                px-6
                py-8
                text-center
                shadow-[0_20px_55px_rgba(15,23,42,0.07)]

                dark:border-white/10
                dark:bg-[#0B2031]

                sm:px-8
                sm:py-9

                lg:px-10
              "
            >
              <h2
                className="
                  font-serif
                  text-[28px]
                  font-medium
                  tracking-[-0.03em]
                  text-[#2196F3]

                  sm:text-[32px]
                "
              >
                Don&apos;t Miss Out
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
                Stop pushing, procrastinating, and putting up with
                the same old stories. This journal is free for a
                limited time — grab it now and begin transforming
                the future, not just dreaming about it.
              </p>

              <div className="mt-6">
                <MagneticButton>
                  <a
                    href="#journal-form"
                    className="
                      inline-flex
                      min-h-[46px]
                      items-center
                      justify-center
                      gap-2.5
                      rounded-full
                      bg-[#2196F3]
                      px-7
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.06em]
                      text-white
                      shadow-[0_10px_25px_rgba(33,150,243,0.18)]
                      transition-all
                      duration-300

                      hover:-translate-y-0.5
                      hover:bg-[#1976D2]
                    "
                  >
                    Get My Free Journal
                    <ArrowRight size={14} />
                  </a>
                </MagneticButton>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>
    </main>
  );
}

/* ============================================================
   FORM FIELD
============================================================ */

function FormField({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: "text" | "email" | "tel";
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="
          mb-1.5
          block
          text-[13px]
          font-medium
          text-slate-700

          dark:text-slate-300
        "
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        className="
          h-12
          w-full
          rounded-xl
          border
          border-slate-300
          bg-[#fbfcfd]
          px-4
          text-[13px]
          text-slate-900
          outline-none
          transition-all
          duration-300

          hover:border-slate-400

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
  );
}