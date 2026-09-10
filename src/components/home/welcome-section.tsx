"use client";

import Image from "next/image";
import { BookOpen, FilePenLine, Lightbulb } from "lucide-react";
import { motion } from "motion/react";

import {
  StaggerContainer,
  StaggerItem,
} from "../animations/stagger";

const items = [
  {
    eyebrow: "Trending",
    title: "Book review",
    icon: FilePenLine,
    description:
      "“Whispers of Wisdom” is an inspiring journey from dreams to triumph. The author beautifully captures the essence of perseverance, resilience, and strategic thinking, making it a compelling read for aspiring achievers.",
  },
  {
    eyebrow: "Featured",
    title: "Top picks",
    icon: Lightbulb,
    description:
      "Discover the most inspiring stories of triumph and resilience, showcasing visionary leaders and their paths to success. Unlock the secrets to turning dreams into victorious realities.",
  },
  {
    eyebrow: "Explore",
    title: "Whispers of Wisdom",
    icon: BookOpen,
    description:
      "Explore “Whispers of Wisdom,” a compelling journey of triumph, resilience, and transformation. Delve into inspiring stories that illuminate the path from challenges to success.",
  },
];

export function WelcomeSection() {
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
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

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
          bg-[#2196F3]/5
          blur-[110px]

          dark:bg-[#2196F3]/8
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-20
          bottom-0
          h-[300px]
          w-[300px]
          rounded-full
          bg-[#2196F3]/5
          blur-[120px]

          dark:bg-[#2196F3]/8
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1380px]
          px-5

          sm:px-8
          lg:px-12
          xl:px-16
        "
      >
        {/* =====================================================
            TOP CONTENT
        ===================================================== */}

        <div className="mx-auto max-w-[940px] text-center">
         

          {/* HEADING */}

          <motion.h2
            initial={{
              opacity: 0,
              y: 26,
              filter: "blur(7px)",
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
              duration: 0.7,
              delay: 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-8
              font-serif
              text-[38px]
              font-normal
              leading-[1.08]
              tracking-[-0.035em]
              text-[#26343C]

              dark:text-white

              sm:text-[48px]
              lg:text-[56px]
            "
          >
            Welcome to Whispers of Wisdom
          </motion.h2>

          {/* SUBTITLE */}

          <motion.p
            initial={{
              opacity: 0,
              y: 16,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.55,
              delay: 0.14,
            }}
            className="
              mt-7
              text-[13px]
              font-medium
              uppercase
              tracking-[0.4em]
              text-[#2196F3]

              sm:text-[15px]
            "
          >
            Unlocking The Path
          </motion.p>

          {/* DESCRIPTION */}

          <motion.p
            initial={{
              opacity: 0,
              y: 14,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.55,
              delay: 0.2,
            }}
            className="
              mx-auto
              mt-6
              max-w-[760px]
              text-[14px]
              leading-7
              text-slate-500

              dark:text-slate-400

              sm:text-[16px]
            "
          >
            Business Growth Strategies: Building a solid foundation for
            sustainable growth
          </motion.p>
        </div>

        {/* =====================================================
            THREE COLUMN CONTENT
        ===================================================== */}

        <StaggerContainer
          className="
            mt-16
            grid
            grid-cols-1

            md:grid-cols-3

            lg:mt-20
          "
        >
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <StaggerItem key={item.title}>
                <motion.article
                  whileHover={{
                    y: -5,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 22,
                  }}
                  className={`
                    group
                    relative
                    h-full
                    px-2
                    py-7

                    sm:px-5

                    md:px-7

                    lg:px-8

                    ${
                      index !== items.length - 1
                        ? "md:border-r md:border-slate-200 dark:md:border-white/10"
                        : ""
                    }
                  `}
                >
                  {/* CARD TOP */}

                  <div
                    className="
                      flex
                      items-start
                      gap-5

                      lg:gap-6
                    "
                  >
                    {/* ICON */}

                    <motion.div
                      whileHover={{
                        rotate: index === 1 ? 5 : 0,
                        scale: 1.06,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="
                        flex
                        h-[72px]
                        w-[72px]
                        shrink-0
                        items-center
                        justify-center

                        text-[#2196F3]

                        sm:h-[76px]
                        sm:w-[76px]
                      "
                    >
                      <Icon
                        strokeWidth={1.45}
                        className="
                          h-[56px]
                          w-[56px]

                          sm:h-[62px]
                          sm:w-[62px]
                        "
                      />
                    </motion.div>

                    {/* TITLE */}

                    <div className="pt-1">
                      <p
                        className="
                          text-[11px]
                          font-semibold
                          uppercase
                          tracking-[0.3em]
                          text-slate-500

                          dark:text-slate-400

                          sm:text-[12px]
                        "
                      >
                        {item.eyebrow}
                      </p>

                      <h3
                        className="
                          mt-2
                          max-w-[250px]
                          font-serif
                          text-[31px]
                          font-normal
                          leading-[1.08]
                          tracking-[-0.025em]
                          text-[#26343C]

                          transition-colors
                          duration-300

                          group-hover:text-[#2196F3]

                          dark:text-white
                          dark:group-hover:text-[#42A5F5]

                          lg:text-[36px]
                        "
                      >
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* DESCRIPTION */}

                  <p
                    className="
                      mt-8
                      text-[14px]
                      leading-[1.9]
                      text-slate-600

                      dark:text-slate-300

                      sm:text-[15px]
                    "
                  >
                    {item.description}
                  </p>

                  {/* HOVER LINE */}

                  <div
                    className="
                      mt-7
                      h-[2px]
                      w-8
                      rounded-full
                      bg-[#2196F3]

                      transition-all
                      duration-300

                      group-hover:w-14
                    "
                  />
                </motion.article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}