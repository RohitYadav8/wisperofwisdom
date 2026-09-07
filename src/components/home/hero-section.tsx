"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import { MagneticButton } from "../animations/magnetic-button";

export function HeroSection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#f7f4ec]
        transition-colors duration-500
        dark:bg-[#041522]
      "
    >
      {/* Background Glow */}

      <div
        className="
          pointer-events-none
          absolute
          -left-20
          top-24
          h-72
          w-72
          rounded-full
          bg-[#2196F3]/10
          blur-[100px]

          dark:bg-[#2196F3]/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-16
          top-10
          h-80
          w-80
          rounded-full
          bg-[#06466B]/10
          blur-[120px]

          dark:bg-[#2196F3]/10
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          min-h-[650px]
          max-w-[1400px]
          items-center
          gap-12
          px-5
          py-16

          sm:px-8
          md:py-20
          lg:grid-cols-2
          lg:px-12
          lg:py-24
        "
      >
        {/* =====================================================
            LEFT CONTENT
        ===================================================== */}

        <div>
          <motion.p
            initial={{
              opacity: 0,
              y: 20,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.22em]
              text-slate-500

              dark:text-slate-400
            "
          >
            For Personal And Professional Success
          </motion.p>

          <motion.h1
            initial={{
              opacity: 0,
              y: 40,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-5
              max-w-xl
              font-serif
              text-5xl
              font-medium
              leading-[1.05]
              tracking-[-0.03em]
              text-slate-900

              dark:text-white

              sm:text-6xl
              lg:text-7xl
            "
          >
            Meet Our New
            <span
              className="
                block
                text-[#2196F3]
              "
            >
              Edition.
            </span>
          </motion.h1>

          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
              delay: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-8"
          >
            <MagneticButton>
              <Link
                href="/books"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#2196F3]
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-[0_12px_30px_rgba(33,150,243,0.25)]
                  transition-colors
                  duration-300

                  hover:bg-[#1976D2]

                  dark:bg-[#2196F3]
                  dark:hover:bg-[#42A5F5]
                "
              >
                Purchase
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* =====================================================
            RIGHT VISUAL
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: 50,
            scale: 0.94,
            filter: "blur(12px)",
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            flex
            min-h-[420px]
            items-center
            justify-center

            lg:min-h-[500px]
          "
        >
          {/* Soft Halo */}

          <div
            className="
              absolute
              h-[320px]
              w-[320px]
              rounded-full
              bg-[#2196F3]/10
              blur-[70px]

              dark:bg-[#2196F3]/15
            "
          />

          {/* Main Visual */}

          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 1, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              relative
              z-10
              w-full
              max-w-[560px]
            "
          >
            <Image
              src="/images/home/hero-new-edition.png"
              alt="Whispers of Wisdom new edition"
              width={800}
              height={650}
              priority
              className="
                h-auto
                w-full
                object-contain
                drop-shadow-[0_30px_50px_rgba(15,23,42,0.18)]

                dark:drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]
              "
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}