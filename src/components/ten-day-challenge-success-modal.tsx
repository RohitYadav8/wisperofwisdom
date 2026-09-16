"use client";

import {
  ArrowRight,
  Lightbulb,
  Mail,
  ThumbsUp,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type TenDayChallengeSuccessModalProps = {
  open: boolean;
  onClose: () => void;
};

export function TenDayChallengeSuccessModal({
  open,
  onClose,
}: TenDayChallengeSuccessModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
          className="
            fixed inset-0 z-[200]
            flex items-center justify-center
            overflow-y-auto
            bg-[#03101D]/75
            p-3
            backdrop-blur-md
            sm:p-5
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 24,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.97,
              y: 16,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 24,
            }}
            className="
              relative
              grid
              max-h-[94vh]
              w-full
              max-w-[1120px]
              overflow-y-auto
              rounded-[28px]
              border
              border-white/20
              bg-white
              shadow-[0_35px_100px_rgba(0,0,0,0.35)]
              dark:border-white/10
              dark:bg-[#081B2A]
              lg:grid-cols-[300px_1fr]
            "
          >
            {/* ==========================================
                LEFT BRAND PANEL
            ========================================== */}

            <div
              className="
                relative
                hidden
                min-h-[690px]
                overflow-hidden
                bg-gradient-to-b
                from-[#79BFF2]
                via-[#4B9ED9]
                to-[#063B62]
                p-9
                text-white
                lg:flex
                lg:flex-col
                lg:justify-between
              "
            >
              {/* Decorative glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -left-20
                  -top-16
                  h-64
                  w-64
                  rounded-full
                  bg-white/25
                  blur-[80px]
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-20
                  -right-20
                  h-72
                  w-72
                  rounded-full
                  bg-[#041522]/40
                  blur-[70px]
                "
              />

              {/* Decorative circles */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-[-80px]
                  top-[43%]
                  h-[230px]
                  w-[230px]
                  rounded-full
                  border
                  border-white/10
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  left-[-35px]
                  top-[48%]
                  h-[150px]
                  w-[150px]
                  rounded-full
                  border
                  border-white/10
                "
              />

              {/* Main text */}

              <div className="relative z-10 pt-20">
                <p
                  className="
                    font-serif
                    text-[43px]
                    font-medium
                    italic
                    leading-[1.08]
                    tracking-[-0.03em]
                  "
                >
                  Small
                  <br />
                  Steps
                  <br />
                  Big
                  <br />
                  Transformation
                </p>

                <div className="mt-8 h-px w-24 bg-white/50" />

                <p
                  className="
                    mt-7
                    max-w-[190px]
                    text-[11px]
                    font-semibold
                    uppercase
                    leading-6
                    tracking-[0.28em]
                    text-white/75
                  "
                >
                  A brighter you begins today
                </p>
              </div>

              {/* Brand */}

              <div className="relative z-10">
                <p
                  className="
                    font-serif
                    text-[30px]
                    italic
                    leading-none
                  "
                >
                  Whispers
                  <br />
                  <span className="ml-8">of Wisdom</span>
                </p>

                <p
                  className="
                    mt-5
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.3em]
                    text-white/65
                  "
                >
                  Inspire · Reflect · Grow
                </p>
              </div>
            </div>

            {/* ==========================================
                RIGHT CONTENT
            ========================================== */}

            <div
              className="
                relative
                overflow-hidden
                bg-white
                p-5
                dark:bg-[#081B2A]
                sm:p-8
                lg:p-10
              "
            >
              {/* Background decoration */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-32
                  -right-28
                  h-[330px]
                  w-[330px]
                  rounded-full
                  bg-[#2196F3]/5
                  blur-[20px]
                  dark:bg-[#2196F3]/8
                "
              />

              {/* CLOSE */}

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="
                  absolute
                  right-4
                  top-4
                  z-20
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-100
                  text-slate-500
                  transition-all
                  duration-200
                  hover:rotate-90
                  hover:bg-slate-200
                  hover:text-slate-800
                  dark:bg-white/[0.07]
                  dark:text-slate-400
                  dark:hover:bg-white/[0.12]
                  dark:hover:text-white
                  sm:right-6
                  sm:top-6
                "
              >
                <X size={19} />
              </button>

              <div className="relative z-10">
                {/* ======================================
                    HEADING
                ====================================== */}

                <div className="flex items-start gap-4 pr-10">
                  <div
                    className="
                      hidden
                      h-14
                      w-14
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      bg-amber-50
                      text-2xl
                      shadow-sm
                      dark:bg-amber-500/10
                      sm:flex
                    "
                  >
                    ☀️
                  </div>

                  <div>
                    <h2
                      className="
                        max-w-[650px]
                        font-serif
                        text-[28px]
                        font-semibold
                        leading-[1.08]
                        tracking-[-0.025em]
                        text-[#0F172A]
                        dark:text-white
                        sm:text-[35px]
                        lg:text-[39px]
                      "
                    >
                      Thank You for Joining the Whispers of Wisdom
                      Challenge!
                    </h2>

                    <p
                      className="
                        mt-3
                        text-sm
                        leading-6
                        text-slate-500
                        dark:text-slate-400
                        sm:text-base
                      "
                    >
                      Your journey to clarity, confidence, and
                      transformation begins now.
                    </p>
                  </div>
                </div>

                {/* ======================================
                    WHAT HAPPENS NEXT
                ====================================== */}

                <div
                  className="
                    mt-7
                    rounded-[20px]
                    border
                    border-[#2196F3]/20
                    bg-gradient-to-r
                    from-[#2196F3]/[0.07]
                    to-[#2196F3]/[0.025]
                    p-5
                    dark:border-[#2196F3]/20
                    dark:from-[#2196F3]/10
                    dark:to-transparent
                    sm:p-6
                  "
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#2196F3]/12
                        text-[#2196F3]
                        dark:bg-[#2196F3]/15
                      "
                    >
                      <Mail size={21} />
                    </div>

                    <div>
                      <h3 className="text-[16px] font-bold text-[#0F172A] dark:text-white">
                        What happens next?
                      </h3>

                      <div
                        className="
                          mt-2
                          space-y-1
                          text-[14px]
                          leading-6
                          text-slate-600
                          dark:text-slate-300
                          sm:text-[15px]
                        "
                      >
                        <p>
                          In the next few minutes, you&apos;ll receive
                          your Day 1 email:{" "}
                          <strong className="font-semibold text-[#0F172A] dark:text-white">
                            The Power of Clarity.
                          </strong>
                        </p>

                        <p>
                          Over the next 10 days, you&apos;ll get one
                          powerful “Whisper of Wisdom” each morning to
                          inspire action and reflection.
                        </p>

                        <p>
                          Each email will include a simple, practical
                          action step to help you move forward.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ======================================
                    PRO TIP
                ====================================== */}

                <div
                  className="
                    mt-4
                    flex
                    items-start
                    gap-4
                    rounded-[18px]
                    border
                    border-amber-200/80
                    bg-amber-50/80
                    p-4
                    dark:border-amber-500/20
                    dark:bg-amber-500/[0.08]
                    sm:p-5
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-amber-100
                      text-amber-500
                      dark:bg-amber-500/15
                    "
                  >
                    <Lightbulb size={20} />
                  </div>

                  <p className="text-[14px] leading-6 text-slate-600 dark:text-slate-300 sm:text-[15px]">
                    <strong className="font-bold text-[#0F172A] dark:text-white">
                      Pro Tip:
                    </strong>{" "}
                    To make the most of this journey, take 5–10
                    minutes each day to reflect and complete your
                    action step. Small daily shifts create
                    life-changing results.
                  </p>
                </div>

                {/* ======================================
                    INBOX NOTE
                ====================================== */}

                <div className="mt-5 flex items-start gap-4 px-1">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#2196F3]/10
                      text-[#2196F3]
                    "
                  >
                    <ThumbsUp size={19} />
                  </div>

                  <p className="pt-0.5 text-[14px] leading-6 text-slate-600 dark:text-slate-300 sm:text-[15px]">
                    While you wait for your first whisper, check
                    your inbox (and your promotions/spam folder,
                    just in case) and whitelist our email so you
                    don&apos;t miss a single message.
                  </p>
                </div>

                <div className="my-6 h-px bg-slate-200 dark:bg-white/10" />

                {/* ======================================
                    CLOSING
                ====================================== */}

                <div className="text-[14px] leading-6 text-slate-600 dark:text-slate-300 sm:text-[15px]">
                  <p>
                    This is more than just an email series. It&apos;s
                    the beginning of a transformation.
                  </p>

                  <p>
                    Welcome aboard — I&apos;m excited to walk this
                    path with you.
                  </p>

                  <p className="mt-3">
                    With gratitude and wisdom,
                  </p>

                  <p
                    className="
                      mt-1
                      font-serif
                      text-xl
                      font-semibold
                      text-[#0F172A]
                      dark:text-white
                    "
                  >
                    Santosh Kumar
                  </p>
                </div>

                {/* ======================================
                    OK BUTTON
                ====================================== */}

                <div className="mt-7 flex justify-center">
                  <motion.button
                    type="button"
                    onClick={onClose}
                    whileHover={{
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className="
                      inline-flex
                      min-h-[50px]
                      min-w-[190px]
                      items-center
                      justify-center
                      gap-3
                      rounded-full
                      bg-gradient-to-r
                      from-[#2196F3]
                      to-[#1976D2]
                      px-8
                      text-sm
                      font-semibold
                      uppercase
                      tracking-[0.08em]
                      text-white
                      shadow-[0_14px_35px_rgba(33,150,243,0.3)]
                      transition-shadow
                      hover:shadow-[0_18px_45px_rgba(33,150,243,0.4)]
                    "
                  >
                    OK
                    <ArrowRight size={17} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}