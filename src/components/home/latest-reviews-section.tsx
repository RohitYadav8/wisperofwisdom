"use client";

import { motion } from "motion/react";

import {
  StaggerContainer,
  StaggerItem,
} from "../animations/stagger";
import { AnimateIn } from "../animations/animate-in";

export function LatestReviewsSection() {
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
      {/* Background glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[360px]
          w-[360px]
          -translate-x-1/2
          rounded-full
          bg-[#2196F3]/7
          blur-[120px]
          dark:bg-[#2196F3]/10
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1280px]
          px-5
          sm:px-8
          lg:px-12
        "
      >
        {/* Heading */}
        <div className="mx-auto max-w-[720px] text-center">
          <AnimateIn>
            <h2
              className="
                font-serif
                text-4xl
                font-semibold
                tracking-[-0.03em]
                text-[#0F172A]
                dark:text-white
                sm:text-5xl
                lg:text-[58px]
              "
            >
              Latest Reviews
            </h2>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <div
              className="
                mx-auto
                mt-6
                h-[2px]
                w-16
                rounded-full
                bg-[#2196F3]
              "
            />
          </AnimateIn>
        </div>

        {/* Review cards */}
        <StaggerContainer
          className="
            mt-14
            grid
            gap-6
            md:grid-cols-2
            lg:mt-16
            lg:grid-cols-3
          "
        >
          {[1, 2, 3].map((item) => (
            <StaggerItem key={item}>
              <motion.article
                whileHover={{
                  y: -8,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className="
                  group
                  relative
                  min-h-[390px]
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-slate-200/80
                  bg-white
                  shadow-[0_16px_45px_rgba(15,23,42,0.05)]
                  transition-colors
                  duration-300
                  hover:border-[#2196F3]/25
                  dark:border-white/10
                  dark:bg-[#0B2031]
                  dark:shadow-[0_20px_50px_rgba(0,0,0,0.22)]
                  dark:hover:border-[#2196F3]/30
                "
              >
                {/* Image area - actual image later */}
                <div
                  className="
                    relative
                    h-[220px]
                    overflow-hidden
                    border-b
                    border-slate-200/70
                    bg-[#F4F8FB]
                    dark:border-white/10
                    dark:bg-[#081B2A]
                  "
                >
                  <div
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      h-32
                      w-32
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-full
                      bg-[#2196F3]/10
                      blur-2xl
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
                      left-1/2
                      top-1/2
                      h-28
                      w-28
                      -translate-x-1/2
                      -translate-y-1/2
                      rounded-full
                      border
                      border-dashed
                      border-[#2196F3]/15
                    "
                  />
                </div>

                {/* Content area */}
                <div className="p-7">
                  <div
                    className="
                      h-3
                      w-20
                      rounded-full
                      bg-[#2196F3]/15
                      dark:bg-[#2196F3]/20
                    "
                  />

                  <div
                    className="
                      mt-5
                      h-6
                      w-[85%]
                      rounded-full
                      bg-slate-200/80
                      dark:bg-white/10
                    "
                  />

                  <div
                    className="
                      mt-3
                      h-6
                      w-[62%]
                      rounded-full
                      bg-slate-200/60
                      dark:bg-white/[0.07]
                    "
                  />

                  <motion.div
                    initial={{ width: 30 }}
                    whileHover={{ width: 52 }}
                    className="
                      mt-7
                      h-[2px]
                      rounded-full
                      bg-[#2196F3]
                    "
                  />
                </div>

                {/* Hover glow */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-52
                    w-52
                    rounded-full
                    bg-[#2196F3]/0
                    blur-[60px]
                    transition-all
                    duration-500
                    group-hover:bg-[#2196F3]/8
                  "
                />
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}