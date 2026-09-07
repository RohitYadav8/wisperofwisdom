"use client";

import { motion } from "motion/react";

import { AnimateIn } from "../animations/animate-in";

export function AuthorSection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-white
        py-20
        transition-colors
        duration-500
        dark:bg-[#061522]
        sm:py-24
        lg:py-28
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          -right-24
          top-20
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
          relative
          z-10
          mx-auto
          grid
          max-w-[1280px]
          items-center
          gap-14
          px-5
          sm:px-8
          lg:grid-cols-[0.9fr_1.1fr]
          lg:gap-20
          lg:px-12
        "
      >
        {/* LEFT CONTENT */}

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
              Meet The Author
            </p>
          </AnimateIn>

          <AnimateIn delay={0.08}>
            <h2
              className="
                mt-4
                max-w-[600px]
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
              Meet The Author
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

          {/* Author bio text later from existing website */}

          <AnimateIn delay={0.24}>
            <div
              className="
                mt-8
                h-[130px]
                w-full
                max-w-[560px]
                rounded-2xl
                border
                border-slate-200
                bg-[#FAFAF7]
                dark:border-white/10
                dark:bg-[#0B2031]
              "
            />
          </AnimateIn>
        </div>

        {/* RIGHT IMAGE PLACEHOLDER */}

        <AnimateIn direction="left">
          <div className="relative flex justify-center lg:justify-end">
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                relative
                h-[460px]
                w-full
                max-w-[430px]
                overflow-hidden
                rounded-[32px]
                border
                border-[#2196F3]/10
                bg-[#FAFAF7]
                shadow-[0_24px_70px_rgba(15,23,42,0.08)]
                dark:border-white/10
                dark:bg-[#0B2031]
                dark:shadow-[0_24px_70px_rgba(0,0,0,0.28)]
                sm:h-[540px]
              "
            >
              <div
                className="
                  absolute
                  inset-0
                  bg-[radial-gradient(circle_at_top_left,rgba(33,150,243,0.16),transparent_35%)]
                "
              />

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute
                  -right-16
                  -top-16
                  h-48
                  w-48
                  rounded-full
                  border
                  border-dashed
                  border-[#2196F3]/20
                  dark:border-[#42A5F5]/15
                "
              />

              <div
                className="
                  absolute
                  bottom-10
                  left-10
                  h-28
                  w-28
                  rounded-full
                  bg-[#2196F3]/10
                  blur-3xl
                "
              />
            </motion.div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}