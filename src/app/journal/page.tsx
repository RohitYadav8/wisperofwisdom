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

import { AnimateIn } from "../../components/animations/animate-in";
import { MagneticButton } from "../../components/animations/magnetic-button";
import {
  StaggerContainer,
  StaggerItem,
} from "../../components/animations/stagger";

const journalBenefits = [
  "Break free from overwhelm and confusion",
  "Define and pursue meaningful goals",
  "Build habits that last",
  "Stay motivated and inspired, even on hard days",
  "Record your growth so you can see how far you've come",
];

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
          py-20
          text-white
          sm:px-8
          sm:py-24
          lg:px-12
          lg:py-28
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            -right-[130px]
            -top-[150px]
            h-[500px]
            w-[500px]
            rounded-full
            border
            border-white/10
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-[-200px]
            left-[20%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-white/[0.08]
            blur-[120px]
          "
        />

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
                mb-6
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-white/15
                bg-white/10
                backdrop-blur-sm
              "
            >
              <Sparkles size={20} />
            </div>
          </AnimateIn>

          <AnimateIn delay={0.05}>
            <h1
              className="
                font-serif
                text-4xl
                font-medium
                leading-[1.08]
                tracking-[-0.035em]
                sm:text-5xl
                lg:text-[62px]
              "
            >
              Unlock Your Free Whispers of Wisdom Journal
            </h1>
          </AnimateIn>

          <AnimateIn delay={0.12}>
            <p
              className="
                mx-auto
                mt-6
                max-w-[760px]
                text-sm
                leading-7
                text-white/80
                sm:text-base
                sm:leading-8
              "
            >
              Imagine waking up each day with clarity, confidence, and a simple
              plan for success. This free journal is your first step.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.22}>
            <div className="mt-9">
              <MagneticButton>
                <a
                  href="#journal-form"
                  className="
                    inline-flex
                    min-h-12
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    bg-[#061522]
                    px-7
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.07em]
                    text-white
                    shadow-[0_16px_40px_rgba(0,0,0,0.22)]
                    transition-all
                    duration-300
                    hover:bg-white
                    hover:text-[#061522]
                    hover:shadow-[0_20px_50px_rgba(0,0,0,0.24)]
                  "
                >
                  <BookOpen size={15} />
                  Yes, I Want My Free Journal
                  <ArrowRight size={15} />
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
          py-6
          text-center
          dark:border-white/10
          dark:bg-[#061b2a]
        "
      >
        <AnimateIn>
          <p
            className="
              font-serif
              text-base
              italic
              text-[#2196F3]
              sm:text-lg
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
          py-16
          dark:bg-[#061b2a]
          sm:px-8
          sm:py-20
          lg:px-12
          lg:py-24
        "
      >
        <div className="mx-auto max-w-[1180px]">
          {/* ======================================================
              MORE THAN JUST PAGES
          ====================================================== */}

          <AnimateIn>
            <div
              className="
                rounded-[30px]
                border
                border-white
                bg-white
                p-7
                shadow-[0_25px_70px_rgba(15,23,42,0.08)]
                dark:border-white/10
                dark:bg-[#0B2031]
                dark:shadow-[0_25px_70px_rgba(0,0,0,0.25)]
                sm:p-10
                lg:p-12
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-8
                  lg:grid
                  lg:grid-cols-[0.8fr_1.2fr]
                  lg:items-start
                  lg:gap-12
                "
              >
                <div>
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[#2196F3]/10
                      text-[#2196F3]
                    "
                  >
                    <BookOpen size={22} />
                  </div>

                  <h2
                    className="
                      mt-5
                      font-serif
                      text-3xl
                      font-medium
                      leading-tight
                      tracking-[-0.03em]
                      text-[#2196F3]
                      sm:text-4xl
                    "
                  >
                    This Journal Is More Than Just Pages
                  </h2>
                </div>

                <div>
                  <p
                    className="
                      text-sm
                      leading-7
                      text-slate-600
                      dark:text-slate-400
                      sm:text-base
                    "
                  >
                    It&apos;s a daily companion that helps you turn whispers of
                    wisdom into real transformation. With guided prompts,
                    reflection space, and simple action steps, you&apos;ll
                    finally have the structure to:
                  </p>

                  <StaggerContainer className="mt-7 space-y-3">
                    {journalBenefits.map((benefit) => (
                      <StaggerItem key={benefit}>
                        <div
                          className="
                            flex
                            items-start
                            gap-3
                            text-sm
                            leading-6
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
                            <Check size={12} />
                          </span>

                          {benefit}
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </div>

              <div className="mt-10 flex justify-center">
                <MagneticButton>
                  <a
                    href="#journal-form"
                    className="
                      inline-flex
                      min-h-12
                      items-center
                      justify-center
                      gap-3
                      rounded-full
                      bg-[#2196F3]
                      px-7
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.06em]
                      text-white
                      shadow-[0_12px_30px_rgba(33,150,243,0.2)]
                      transition-all
                      duration-300
                      hover:bg-[#1976D2]
                      hover:shadow-[0_16px_38px_rgba(33,150,243,0.28)]
                    "
                  >
                    Claim My Free Journal Now
                    <ArrowRight size={15} />
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
                mt-8
                overflow-hidden
                rounded-[30px]
                border
                border-white
                bg-white
                p-7
                shadow-[0_25px_70px_rgba(15,23,42,0.08)]
                dark:border-white/10
                dark:bg-[#0B2031]
                sm:p-10
                lg:p-12
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-3
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <h2
                  className="
                    font-serif
                    text-3xl
                    font-medium
                    tracking-[-0.03em]
                    text-[#2196F3]
                    sm:text-4xl
                  "
                >
                  What&apos;s Inside the Journal
                </h2>

                <div
                  className="
                    hidden
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-[#2196F3]/10
                    text-[#2196F3]
                    sm:flex
                  "
                >
                  <Target size={19} />
                </div>
              </div>

              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[780px] border-collapse">
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
                          rounded-l-xl
                          px-5
                          py-4
                          text-xs
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
                          px-5
                          py-4
                          text-xs
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
                          rounded-r-xl
                          px-5
                          py-4
                          text-xs
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
                            px-5
                            py-5
                            text-sm
                            font-semibold
                            text-slate-800
                            dark:text-white
                          "
                        >
                          {item.feature}
                        </td>

                        <td
                          className="
                            px-5
                            py-5
                            text-sm
                            text-slate-600
                            dark:text-slate-400
                          "
                        >
                          {item.benefit}
                        </td>

                        <td
                          className="
                            px-5
                            py-5
                            text-sm
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

              <div className="mt-9 flex justify-center">
                <MagneticButton>
                  <a
                    href="#journal-form"
                    className="
                      inline-flex
                      min-h-12
                      items-center
                      justify-center
                      gap-3
                      rounded-full
                      bg-[#2196F3]
                      px-7
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.06em]
                      text-white
                      shadow-[0_12px_30px_rgba(33,150,243,0.2)]
                      transition-all
                      duration-300
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
                mt-8
                rounded-[30px]
                border
                border-white
                bg-white
                p-7
                shadow-[0_25px_70px_rgba(15,23,42,0.08)]
                dark:border-white/10
                dark:bg-[#0B2031]
                sm:p-10
                lg:p-12
              "
            >
              <h2
                className="
                  font-serif
                  text-3xl
                  font-medium
                  tracking-[-0.03em]
                  text-[#2196F3]
                  sm:text-4xl
                "
              >
                Why Readers Love It
              </h2>

              <StaggerContainer
                className="
                  mt-8
                  grid
                  gap-4
                  lg:grid-cols-3
                "
              >
                {readerReviews.map((review) => (
                  <StaggerItem key={review.author}>
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
                        h-full
                        rounded-[22px]
                        border
                        border-slate-200/80
                        bg-[#fbfcfd]
                        p-6
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
                          text-[17px]
                          italic
                          leading-7
                          text-slate-700
                          dark:text-slate-300
                        "
                      >
                        {review.text}
                      </p>

                      <p
                        className="
                          mt-5
                          text-sm
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

              <div className="mt-9 flex justify-center">
                <a
                  href="#journal-form"
                  className="
                    inline-flex
                    min-h-12
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    bg-[#2196F3]
                    px-7
                    text-xs
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
                mt-8
                rounded-[30px]
                border
                border-white
                bg-white
                p-7
                shadow-[0_25px_70px_rgba(15,23,42,0.08)]
                dark:border-white/10
                dark:bg-[#0B2031]
                sm:p-10
                lg:p-12
              "
            >
              <div className="mx-auto max-w-[900px]">
                <div className="text-center">
                  <h2
                    className="
                      font-serif
                      text-3xl
                      font-medium
                      tracking-[-0.03em]
                      text-[#2196F3]
                      sm:text-4xl
                    "
                  >
                    Claim Your Free Journal Now
                  </h2>

                  <p
                    className="
                      mx-auto
                      mt-4
                      max-w-[760px]
                      text-sm
                      leading-7
                      text-slate-600
                      dark:text-slate-400
                      sm:text-base
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
                    Join thousands who are using this journal to create clarity
                    and momentum in their lives.
                  </p>
                </div>

                <form
                  onSubmit={(event) => event.preventDefault()}
                  className="mt-10 space-y-5"
                >
                  <div
                    className="
                      grid
                      gap-5
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

                  <FormField
                    label="Email Address *"
                    name="email"
                    type="email"
                  />

                  <FormField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                  />

                  <div>
                    <label
                      htmlFor="challenge"
                      className="
                        mb-2
                        block
                        text-sm
                        font-medium
                        text-slate-700
                        dark:text-slate-300
                      "
                    >
                      What&apos;s your biggest personal/professional challenge? *
                    </label>

                    <textarea
                      id="challenge"
                      name="challenge"
                      rows={5}
                      className="
                        w-full
                        resize-none
                        rounded-xl
                        border
                        border-slate-300
                        bg-[#fbfcfd]
                        px-4
                        py-3
                        text-sm
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

                  <div>
                    <label
                      htmlFor="goals"
                      className="
                        mb-2
                        block
                        text-sm
                        font-medium
                        text-slate-700
                        dark:text-slate-300
                      "
                    >
                      What are your key goals for the next 3-6 months? *
                    </label>

                    <textarea
                      id="goals"
                      name="goals"
                      rows={5}
                      className="
                        w-full
                        resize-none
                        rounded-xl
                        border
                        border-slate-300
                        bg-[#fbfcfd]
                        px-4
                        py-3
                        text-sm
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

                  <label
                    className="
                      flex
                      cursor-pointer
                      items-start
                      gap-3
                      text-sm
                      leading-6
                      text-slate-600
                      dark:text-slate-400
                    "
                  >
                    <input
                      type="checkbox"
                      required
                      className="
                        mt-1
                        h-4
                        w-4
                        accent-[#2196F3]
                      "
                    />

                    <span>
                      I agree to the Standard Terms and Conditions *
                    </span>
                  </label>

                  <label
                    className="
                      flex
                      cursor-pointer
                      items-start
                      gap-3
                      text-sm
                      leading-6
                      text-slate-600
                      dark:text-slate-400
                    "
                  >
                    <input
                      type="checkbox"
                      className="
                        mt-1
                        h-4
                        w-4
                        accent-[#2196F3]
                      "
                    />

                    <span>
                      I consent to receive occasional offers and marketing
                      communications from Whispers of Wisdom and its associated
                      companies and partners.
                    </span>
                  </label>

                  <div
                    className="
                      rounded-xl
                      border
                      border-cyan-200
                      bg-cyan-50
                      px-4
                      py-3
                      text-xs
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
                    We respect your privacy. Your data will never be sold to
                    third parties. You can unsubscribe at any time.
                  </div>

                  <div className="pt-2 text-center">
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
                        min-h-13
                        items-center
                        justify-center
                        gap-3
                        rounded-full
                        bg-[#2196F3]
                        px-8
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.06em]
                        text-white
                        shadow-[0_14px_35px_rgba(33,150,243,0.22)]
                        transition-all
                        duration-300
                        hover:bg-[#1976D2]
                        hover:shadow-[0_18px_42px_rgba(33,150,243,0.28)]
                      "
                    >
                      <Download size={15} />
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
                mt-8
                rounded-[30px]
                border
                border-white
                bg-white
                px-7
                py-10
                text-center
                shadow-[0_25px_70px_rgba(15,23,42,0.08)]
                dark:border-white/10
                dark:bg-[#0B2031]
                sm:px-10
                sm:py-12
                lg:px-14
              "
            >
              <h2
                className="
                  font-serif
                  text-3xl
                  font-medium
                  tracking-[-0.03em]
                  text-[#2196F3]
                  sm:text-4xl
                "
              >
                Don&apos;t Miss Out
              </h2>

              <p
                className="
                  mx-auto
                  mt-4
                  max-w-[820px]
                  text-sm
                  leading-7
                  text-slate-600
                  dark:text-slate-400
                  sm:text-base
                "
              >
                Stop pushing, procrastinating, and putting up with the same old
                stories. This journal is free for a limited time — grab it now
                and begin transforming the future, not just dreaming about it.
              </p>

              <div className="mt-8">
                <MagneticButton>
                  <a
                    href="#journal-form"
                    className="
                      inline-flex
                      min-h-12
                      items-center
                      justify-center
                      gap-3
                      rounded-full
                      bg-[#2196F3]
                      px-8
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.06em]
                      text-white
                      shadow-[0_12px_30px_rgba(33,150,243,0.2)]
                      transition-all
                      duration-300
                      hover:bg-[#1976D2]
                      hover:shadow-[0_16px_38px_rgba(33,150,243,0.28)]
                    "
                  >
                    Get My Free Journal
                    <ArrowRight size={15} />
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
          mb-2
          block
          text-sm
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
          h-13
          w-full
          rounded-xl
          border
          border-slate-300
          bg-[#fbfcfd]
          px-4
          text-sm
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