"use client";

import { motion } from "motion/react";

import { AnimateIn } from "../animations/animate-in";
import { MagneticButton } from "../animations/magnetic-button";

export function JourneySection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#FAFAF7]
        py-20
        transition-colors
        duration-500
        dark:bg-[#041522]
        sm:py-24
        lg:py-28
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          -left-24
          top-1/3
          h-[320px]
          w-[320px]
          rounded-full
          bg-[#2196F3]/8
          blur-[110px]
          dark:bg-[#2196F3]/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          bottom-10
          h-[300px]
          w-[300px]
          rounded-full
          bg-[#06466B]/8
          blur-[110px]
          dark:bg-[#2196F3]/8
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          max-w-[1280px]
          items-center
          gap-14
          px-5
          sm:px-8
          lg:grid-cols-2
          lg:gap-20
          lg:px-12
        "
      >
        {/* LEFT VISUAL PLACEHOLDER */}
        <AnimateIn direction="right">
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                relative
                h-[420px]
                w-full
                max-w-[500px]
                overflow-hidden
                rounded-[32px]
                border
                border-[#2196F3]/10
                bg-white
                shadow-[0_25px_70px_rgba(15,23,42,0.08)]
                dark:border-white/10
                dark:bg-[#0B2031]
                dark:shadow-[0_25px_70px_rgba(0,0,0,0.28)]
                sm:h-[500px]
              "
            >
              <div
                className="
                  absolute
                  inset-0
                  bg-[radial-gradient(circle_at_top_right,rgba(33,150,243,0.14),transparent_35%)]
                "
              />

              <div
                className="
                  absolute
                  left-8
                  top-8
                  h-20
                  w-20
                  rounded-full
                  border
                  border-[#2196F3]/15
                  dark:border-[#2196F3]/20
                "
              />

              <div
                className="
                  absolute
                  bottom-10
                  right-10
                  h-32
                  w-32
                  rounded-full
                  bg-[#2196F3]/8
                  blur-2xl
                "
              />
            </motion.div>
          </div>
        </AnimateIn>

        {/* RIGHT CONTENT */}
        <div>
          <AnimateIn>
            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.24em]
                text-[#2196F3]
              "
            >
              New Editions
            </p>
          </AnimateIn>

          <AnimateIn delay={0.08}>
            <h2
              className="
                mt-4
                max-w-[620px]
                font-serif
                text-4xl
                font-semibold
                leading-[1.08]
                tracking-[-0.03em]
                text-[#0F172A]
                dark:text-white
                sm:text-5xl
                lg:text-[58px]
              "
            >
              The Journey of Whispers of Wisdom
            </h2>
          </AnimateIn>

          <AnimateIn delay={0.16}>
            <div
              className="
                mt-7
                h-[2px]
                w-16
                rounded-full
                bg-[#2196F3]
              "
            />
          </AnimateIn>

          <AnimateIn delay={0.24}>
            <div className="mt-8">
              <MagneticButton>
                <a
                  href="/books"
                  className="
                    inline-flex
                    min-w-[140px]
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#2196F3]
                    px-6
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-[0_14px_34px_rgba(33,150,243,0.22)]
                    transition-all
                    duration-300
                    hover:bg-[#1976D2]
                    hover:shadow-[0_18px_40px_rgba(33,150,243,0.28)]
                    dark:hover:bg-[#42A5F5]
                  "
                >
                  Explore
                </a>
              </MagneticButton>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}