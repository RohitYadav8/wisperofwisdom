"use client";

import Image from "next/image";
import Link from "next/link";
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
      {/* BACKGROUND GLOW */}

      <div
        aria-hidden="true"
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
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-24
          bottom-10
          h-[260px]
          w-[260px]
          rounded-full
          bg-[#2196F3]/5
          blur-[100px]

          dark:bg-[#2196F3]/8
        "
      />

      {/* MAIN CONTAINER */}

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

          lg:grid-cols-[1.15fr_0.85fr]
          lg:gap-16
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

          {/* AUTHOR BIO */}

          <AnimateIn delay={0.24}>
            <div className="mt-8 max-w-[650px]">
              <p
                className="
                  text-[15px]
                  leading-[1.85]
                  text-slate-600

                  dark:text-slate-300

                  sm:text-[16px]
                "
              >
                Santosh Kumar has dedicated the entirety of his professional
                life to mastering and teaching the intricacies of strategic
                business management and execution. His journey over the years
                has culminated in a wealth of knowledge and a series of
                successful ventures that have not only propelled businesses
                from the ground up into six-figure successes but have also
                established a legacy that will continue to influence the
                business world for generations to come. Santosh’s teachings on
                strategy development, execution, and business growth have
                penetrated every level of the SME and startup sectors, reaching
                a global audience eager for transformation.
              </p>

              <p
                className="
                  mt-6
                  text-[15px]
                  leading-[1.85]
                  text-slate-600

                  dark:text-slate-300

                  sm:text-[16px]
                "
              >
                By partnering with Santosh Kumar, you gain not just the
                advantage of aligning with one of the most respected names in
                strategic business consulting, but you also inherit a legacy
                of success and a body of knowledge that can elevate your own
                brand to new heights.
              </p>
            </div>
          </AnimateIn>

          {/* BUTTON */}

          <AnimateIn delay={0.32}>
            <div className="mt-8">
              <Link
                href="/about-me"
                className="
                  group
                  inline-flex
                  min-h-[54px]
                  items-center
                  justify-center

                  bg-[#2196F3]

                  px-8

                  text-[12px]
                  font-bold
                  uppercase
                  tracking-[0.1em]
                  text-white

                  shadow-[0_14px_32px_-18px_rgba(33,150,243,0.8)]

                  transition-all
                  duration-300

                  hover:-translate-y-[2px]
                  hover:bg-[#1976D2]
                  hover:shadow-[0_18px_36px_-18px_rgba(25,118,210,0.8)]

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#2196F3]
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-white

                  dark:focus-visible:ring-offset-[#061522]

                  sm:text-[13px]
                "
              >
                <span
                  className="
                    transition-transform
                    duration-300

                    group-hover:translate-x-[1px]
                  "
                >
                  Know More About Santosh Kumar
                </span>
              </Link>
            </div>
          </AnimateIn>
        </div>

        {/* RIGHT AUTHOR IMAGE */}

        <AnimateIn direction="left">
          <div
            className="
              relative
              flex
              justify-center

              lg:justify-end
            "
          >
            {/* IMAGE BACK GLOW */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[78%]
                w-[78%]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[#2196F3]/10
                blur-[80px]

                dark:bg-[#2196F3]/12
              "
            />

            {/* ROTATING DECORATIVE CIRCLE */}

            <motion.div
              aria-hidden="true"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                pointer-events-none
                absolute
                -right-4
                -top-5
                hidden
                h-40
                w-40
                rounded-full
                border
                border-dashed
                border-[#2196F3]/20

                dark:border-[#42A5F5]/15

                sm:block
              "
            />

            {/* AUTHOR IMAGE CARD */}

            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                relative
                h-[430px]
                w-full
                max-w-[390px]
                overflow-hidden
                rounded-[30px]

                border
                border-[#2196F3]/10

                bg-[#FAFAF7]

                shadow-[0_24px_70px_rgba(15,23,42,0.10)]

                dark:border-white/10
                dark:bg-[#0B2031]
                dark:shadow-[0_24px_70px_rgba(0,0,0,0.30)]

                sm:h-[500px]
                sm:max-w-[420px]

                lg:h-[530px]
                lg:max-w-[430px]
              "
            >
              <Image
                src="/author.jpg"
                alt="Santosh Kumar"
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 420px, 430px"
                className="
                  object-cover
                  object-top
                "
              />

              {/* TOP HIGHLIGHT */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  top-0
                  h-[18%]

                  bg-gradient-to-b
                  from-white/10
                  to-transparent

                  dark:from-white/5
                "
              />

              {/* BOTTOM DEPTH */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  h-[20%]

                  bg-gradient-to-t
                  from-black/20
                  to-transparent
                "
              />

              {/* INNER BORDER */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  rounded-[30px]
                  ring-1
                  ring-inset
                  ring-white/10
                "
              />
            </motion.div>

            {/* SMALL DECORATION */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -bottom-5
                left-8
                h-24
                w-24
                rounded-full
                bg-[#2196F3]/10
                blur-3xl

                dark:bg-[#42A5F5]/10
              "
            />
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}