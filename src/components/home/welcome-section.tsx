"use client";

import { motion } from "motion/react";

import {
  StaggerContainer,
  StaggerItem,
} from "../animations/stagger";

const items = [
  {
    title: "Finding Book Review",
  },
  {
    title: "Healthy Top Picks",
  },
  {
    title: "Explore Whispers of Wisdom",
  },
];

export function WelcomeSection() {
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
      {/* subtle background glow */}
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
          bg-[#2196F3]/5
          blur-[110px]

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
        {/* ===============================
            HEADING
        =============================== */}

        <div className="mx-auto max-w-[760px] text-center">
          <motion.p
            initial={{
              opacity: 0,
              y: 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              text-[12px]
              font-semibold
              uppercase
              tracking-[0.25em]
              text-[#2196F3]
            "
          >
            Unlocking The Path
          </motion.p>

          <motion.h2
            initial={{
              opacity: 0,
              y: 30,
              filter: "blur(8px)",
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.75,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-4
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
            Welcome to Whispers of Wisdom
          </motion.h2>
        </div>

        {/* ===============================
            THREE ITEMS
        =============================== */}

        <StaggerContainer
          className="
            mt-14
            grid
            gap-5

            md:grid-cols-3
            lg:mt-16
          "
        >
          {items.map((item, index) => (
            <StaggerItem key={item.title}>
              <motion.div
                whileHover={{
                  y: -8,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 20,
                }}
                className="
                  group
                  relative
                  flex
                  min-h-[220px]
                  flex-col
                  justify-end
                  overflow-hidden
                  rounded-[26px]
                  border
                  border-slate-200/80
                  bg-[#FAFAF7]
                  p-7
                  shadow-[0_15px_40px_rgba(15,23,42,0.05)]
                  transition-colors
                  duration-300

                  hover:border-[#2196F3]/30

                  dark:border-white/10
                  dark:bg-[#0B2031]
                  dark:shadow-[0_18px_45px_rgba(0,0,0,0.20)]
                  dark:hover:border-[#2196F3]/30
                "
              >
                {/* card glow */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-16
                    -top-16
                    h-40
                    w-40
                    rounded-full
                    bg-[#2196F3]/0
                    blur-[45px]
                    transition-all
                    duration-500

                    group-hover:bg-[#2196F3]/10

                    dark:group-hover:bg-[#2196F3]/10
                  "
                />

                {/* number */}
                <span
                  className="
                    absolute
                    left-7
                    top-6
                    text-xs
                    font-semibold
                    tracking-[0.2em]
                    text-slate-400

                    dark:text-slate-500
                  "
                >
                  0{index + 1}
                </span>

                {/* temporary visual area */}
                <div
                  className="
                    absolute
                    left-7
                    top-16
                    h-10
                    w-10
                    rounded-full
                    border
                    border-[#2196F3]/15
                    bg-[#2196F3]/8

                    dark:border-[#2196F3]/20
                    dark:bg-[#2196F3]/10
                  "
                />

                <h3
                  className="
                    relative
                    z-10
                    max-w-[240px]
                    font-serif
                    text-[24px]
                    font-semibold
                    leading-tight
                    text-[#0F172A]
                    transition-colors

                    group-hover:text-[#2196F3]

                    dark:text-white
                    dark:group-hover:text-[#42A5F5]
                  "
                >
                  {item.title}
                </h3>

                <motion.div
                  initial={{ width: 28 }}
                  whileHover={{ width: 52 }}
                  className="
                    relative
                    z-10
                    mt-5
                    h-[2px]
                    rounded-full
                    bg-[#2196F3]
                  "
                />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}