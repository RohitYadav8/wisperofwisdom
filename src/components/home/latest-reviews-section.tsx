"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";

import {
  StaggerContainer,
  StaggerItem,
} from "../animations/stagger";

import { AnimateIn } from "../animations/animate-in";

const reviews = [
  {
    id: 1,
    title: "The Journey of Whispers of Wisdom",
    author: "ANTHONY & HANNAH WIGGINS",
    image: "/books.png",
    text: `Whispers of Wisdom has arrived at a perfect time for our business Creative Living Property. As we grow and scale our business the lessons and guidance within the book provide a navigation compass whilst inspiring us with the infectious entrepreneurial spirit of the author. We were lucky enough the meet the author earlier this year on a property training mastermind in Dubai. He took time out of a busy schedule to sit down with myself and family and passed on some amazing life lessons from his extensive experience in business. He went onto explain the importance of laying strong business foundations and structuring even small start up business’s with the same mindset and structure as a large successful corporation. We took his advice to heart and have since continued to grow our business based on many principles within Whispers of Wisdom which have held us in good stead. We are excited to dive deeper into the depths of knowledge within this book whilst applying the principle’s to our business and life in general.`,
  },
  {
    id: 2,
    title: "The Journey of Whispers of Wisdom",
    author: "SWAPNIL.RAJWADKAR",
    image: "/books.png",
    text: `Whispers of Wisdom has arrived at a perfect time for our business Creative Living Property. As we grow and scale our business the lessons and guidance within the book provide a navigation compass whilst inspiring us with the infectious entrepreneurial spirit of the author. We were lucky enough the meet the author earlier this year on a property training mastermind in Dubai. He took time out of a busy schedule to sit down with myself and family and passed on some amazing life lessons from his extensive experience in business. He went onto explain the importance of laying strong business foundations and structuring even small start up business’s with the same mindset and structure as a large successful corporation. We took his advice to heart and have since continued to grow our business based on many principles within Whispers of Wisdom which have held us in good stead. We are excited to dive deeper into the depths of knowledge within this book whilst applying the principle’s to our business and life in general.`,
  },
];

export function LatestReviewsSection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-transparent
        py-16
        sm:py-20
        lg:py-24
      "
    >
      {/* =====================================================
          BACKGROUND GLOWS
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-[260px]
          top-[10%]
          h-[620px]
          w-[620px]
          rounded-full
          bg-[#42A5F5]/12
          blur-[170px]
          dark:bg-[#2196F3]/[0.08]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-[260px]
          bottom-[4%]
          h-[620px]
          w-[620px]
          rounded-full
          bg-[#FFD54F]/18
          blur-[170px]
          dark:hidden
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[-220px]
          h-[480px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-[#2196F3]/[0.07]
          blur-[160px]
          dark:bg-[#2196F3]/[0.06]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1260px]
          px-5
          sm:px-8
          lg:px-12
        "
      >
        {/* =====================================================
            HEADING
        ===================================================== */}

        <div className="mx-auto max-w-[720px] text-center">
          <AnimateIn>
            <p
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-[#2196F3]
              "
            >
              Book Review
            </p>
          </AnimateIn>

          <AnimateIn delay={0.08}>
            <h2
              className="
                mt-3
                font-serif
                text-[40px]
                font-normal
                leading-[1.05]
                tracking-[-0.035em]
                text-[#26343C]

                dark:text-white

                sm:text-[48px]
                lg:text-[56px]
              "
            >
              Latest reviews
            </h2>
          </AnimateIn>

          <AnimateIn delay={0.14}>
            <div
              className="
                mx-auto
                mt-5
                h-[3px]
                w-16
                rounded-full
                bg-gradient-to-r
                from-[#2196F3]
                via-[#64B5F6]
                to-[#FFD54F]

                shadow-[0_4px_16px_rgba(33,150,243,0.28)]
              "
            />
          </AnimateIn>
        </div>

        {/* =====================================================
            REVIEWS
        ===================================================== */}

        <StaggerContainer
          className="
            mt-14
            space-y-10

            lg:mt-16
            lg:space-y-12
          "
        >
          {reviews.map((review, index) => (
            <StaggerItem key={review.id}>
              <motion.article
                whileHover={{
                  y: -6,
                }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 22,
                }}
                className="
                  group
                  relative
                  mx-auto
                  max-w-[1160px]
                "
              >
                {/* OUTER GLOW BORDER */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -inset-[1px]
                    rounded-[36px]

                    bg-gradient-to-br
                    from-[#2196F3]/30
                    via-white/30
                    to-[#FFD54F]/35

                    opacity-70
                    blur-[1px]

                    transition-opacity
                    duration-500

                    group-hover:opacity-100

                    dark:from-[#2196F3]/30
                    dark:via-white/[0.05]
                    dark:to-[#D4A72C]/15
                  "
                />

                {/* MAIN CARD */}
                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-[36px]
                    border
                    border-white/80

                    bg-white/72

                    shadow-[0_28px_80px_rgba(15,23,42,0.13),0_8px_26px_rgba(33,150,243,0.08)]

                    backdrop-blur-2xl

                    transition-all
                    duration-500

                    group-hover:shadow-[0_40px_110px_rgba(15,23,42,0.20),0_12px_38px_rgba(33,150,243,0.14)]

                    dark:border-white/[0.08]
                    dark:bg-[#071B29]/90
                    dark:shadow-[0_32px_90px_rgba(0,0,0,0.42)]
                  "
                >
                  {/* CARD GLOW */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      -left-[120px]
                      top-1/2
                      h-[380px]
                      w-[380px]
                      -translate-y-1/2
                      rounded-full
                      bg-[#42A5F5]/13
                      blur-[120px]

                      dark:bg-[#2196F3]/10
                    "
                  />

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      -right-[120px]
                      bottom-[-120px]
                      h-[360px]
                      w-[360px]
                      rounded-full
                      bg-[#FFD54F]/14
                      blur-[120px]

                      dark:bg-[#D4A72C]/[0.05]
                    "
                  />

                  {/* TOP LINE */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      left-1/2
                      top-0
                      h-px
                      w-[65%]
                      -translate-x-1/2

                      bg-gradient-to-r
                      from-transparent
                      via-[#D4A72C]/80
                      to-transparent
                    "
                  />

                  <div
                    className="
                      relative
                      z-10
                      grid

                      lg:grid-cols-[360px_1fr]
                    "
                  >
                    {/* =================================================
                        BOOK / GOLDEN ORBIT AREA
                    ================================================= */}

                    <div
                      className="
                        relative
                        flex
                        min-h-[420px]
                        items-center
                        justify-center
                        overflow-hidden

                        border-b
                        border-slate-200/70

                        bg-gradient-to-br
                        from-[#EEF8FF]
                        via-white/70
                        to-[#FFF8DC]/75

                        dark:border-white/10
                        dark:bg-gradient-to-br
                        dark:from-[#0C2638]
                        dark:via-[#081D2C]
                        dark:to-[#071925]

                        lg:min-h-[100%]
                        lg:border-b-0
                        lg:border-r
                      "
                    >
                      {/* BLUE HALO */}
                      <div
                        aria-hidden="true"
                        className="
                          absolute
                          h-[320px]
                          w-[320px]
                          rounded-full
                          bg-[#42A5F5]/10
                          blur-[25px]

                          dark:bg-[#2196F3]/[0.08]
                        "
                      />

                      {/* GOLDEN OUTER RING */}
                      <motion.div
                        aria-hidden="true"
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 18,
                          ease: "linear",
                          repeat: Infinity,
                        }}
                        className="
                          absolute
                          h-[320px]
                          w-[320px]
                          rounded-full

                          border
                          border-[#D4A72C]/60

                          shadow-[0_0_25px_rgba(212,167,44,0.22),inset_0_0_22px_rgba(212,167,44,0.08)]

                          sm:h-[340px]
                          sm:w-[340px]
                        "
                      >
                        {/* GOLDEN DOT */}
                        <div
                          className="
                            absolute
                            left-1/2
                            top-[-7px]

                            h-[14px]
                            w-[14px]

                            -translate-x-1/2

                            rounded-full

                            bg-gradient-to-br
                            from-[#FFF2A8]
                            via-[#F6C453]
                            to-[#B67A13]

                            shadow-[0_0_18px_rgba(246,196,83,0.85)]
                          "
                        />
                      </motion.div>

                      {/* SECOND RING */}
                      <motion.div
                        aria-hidden="true"
                        animate={{
                          rotate: -360,
                        }}
                        transition={{
                          duration: 14,
                          ease: "linear",
                          repeat: Infinity,
                        }}
                        className="
                          absolute
                          h-[280px]
                          w-[280px]
                          rounded-full

                          border
                          border-[#E5B93F]/40

                          sm:h-[300px]
                          sm:w-[300px]
                        "
                      >
                        <div
                          className="
                            absolute
                            bottom-[22px]
                            right-[16px]

                            h-[10px]
                            w-[10px]

                            rounded-full

                            bg-[#FFD86B]

                            shadow-[0_0_14px_rgba(255,216,107,0.8)]
                          "
                        />
                      </motion.div>

                      {/* TILTED ORBIT */}
                      <motion.div
                        aria-hidden="true"
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 22,
                          ease: "linear",
                          repeat: Infinity,
                        }}
                        className="
                          absolute
                          h-[210px]
                          w-[350px]

                          rounded-[50%]

                          border
                          border-[#D4A72C]/30

                          rotate-[-18deg]

                          sm:w-[370px]
                        "
                      />

                      {/* INNER GOLD HALO */}
                      <div
                        aria-hidden="true"
                        className="
                          absolute
                          h-[245px]
                          w-[245px]
                          rounded-full

                          bg-[radial-gradient(circle,#FFF7D6_0%,rgba(255,229,143,0.28)_35%,transparent_72%)]

                          dark:bg-[radial-gradient(circle,rgba(212,167,44,0.12)_0%,transparent_70%)]
                        "
                      />

                      {/* BOOK */}
                      <Link
                        href="/product/whispers-of-wisdom"
                        aria-label="View The Journey of Whispers of Wisdom"
                        className="
                          group/book
                          relative
                          z-20
                          block

                          h-[295px]
                          w-[220px]

                          sm:h-[315px]
                          sm:w-[235px]
                        "
                      >
                        <motion.div
                          animate={{
                            y: [0, -8, 0],
                          }}
                          whileHover={{
                            scale: 1.045,
                            rotate: index % 2 === 0 ? -1.5 : 1.5,
                          }}
                          transition={{
                            y: {
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                            scale: {
                              type: "spring",
                              stiffness: 240,
                              damping: 20,
                            },
                          }}
                          className="
                            relative
                            h-full
                            w-full
                          "
                        >
                          <Image
                            src={review.image}
                            alt={review.title}
                            fill
                            sizes="235px"
                            className="
                              object-contain

                              drop-shadow-[0_30px_24px_rgba(15,23,42,0.28)]

                              transition-all
                              duration-500

                              group-hover/book:drop-shadow-[0_38px_28px_rgba(15,23,42,0.36)]

                              dark:drop-shadow-[0_32px_26px_rgba(0,0,0,0.50)]
                            "
                          />
                        </motion.div>
                      </Link>

                      {/* PLATFORM */}
                      <div
                        aria-hidden="true"
                        className="
                          absolute
                          bottom-[35px]
                          left-1/2

                          h-[22px]
                          w-[220px]

                          -translate-x-1/2

                          rounded-[50%]

                          bg-gradient-to-r
                          from-[#B98216]/30
                          via-[#FFD76A]/75
                          to-[#B98216]/30

                          shadow-[0_12px_28px_rgba(180,125,21,0.28)]

                          blur-[0.3px]
                        "
                      />

                      {/* FLOOR SHADOW */}
                      <div
                        aria-hidden="true"
                        className="
                          absolute
                          bottom-[22px]
                          left-1/2

                          h-[32px]
                          w-[190px]

                          -translate-x-1/2

                          rounded-[50%]

                          bg-slate-900/15

                          blur-[18px]

                          dark:bg-black/35
                        "
                      />
                    </div>

                    {/* =================================================
                        REVIEW CONTENT
                    ================================================= */}

                    <div
                      className="
                        relative

                        flex
                        flex-col
                        justify-center

                        px-6
                        py-9

                        sm:px-9
                        sm:py-11

                        lg:px-12
                        lg:py-12
                      "
                    >
                      <div
                        aria-hidden="true"
                        className="
                          pointer-events-none
                          absolute
                          right-[-100px]
                          top-[-100px]

                          h-[260px]
                          w-[260px]

                          rounded-full

                          bg-[#2196F3]/[0.05]

                          blur-[100px]
                        "
                      />

                      <div className="relative z-10">
                        <h3
                          className="
                            max-w-[700px]

                            font-serif

                            text-[30px]
                            font-normal
                            leading-[1.08]
                            tracking-[-0.03em]

                            text-[#26343C]

                            dark:text-white

                            sm:text-[35px]
                            lg:text-[39px]
                          "
                        >
                          {review.title}
                        </h3>

                        <p
                          className="
                            mt-4

                            text-[12px]
                            font-semibold
                            uppercase
                            tracking-[0.12em]

                            text-[#2196F3]

                            dark:text-[#64B5F6]
                          "
                        >
                          By {review.author}
                        </p>

                        <div
                          className="
                            mt-6
                            h-px
                            w-full
                            max-w-[620px]

                            bg-gradient-to-r
                            from-[#D4A72C]/45
                            via-slate-200
                            to-transparent

                            dark:via-white/10
                          "
                        />

                        <p
                          className="
                            mt-6
                            max-w-[760px]

                            text-[14px]
                            leading-[1.85]

                            text-[#626B72]

                            dark:text-slate-300

                            sm:text-[15px]
                          "
                        >
                          {review.text}
                        </p>

                        <Link
                          href="/product/whispers-of-wisdom#reviews"
                          className="
                            mt-8

                            inline-flex
                            items-center
                            gap-2

                            rounded-full

                            border
                            border-[#D4A72C]/35

                            bg-gradient-to-r
                            from-[#FFF8DC]
                            to-[#EEF8FF]

                            px-5
                            py-3

                            text-[12px]
                            font-semibold
                            uppercase
                            tracking-[0.1em]

                            text-[#1976D2]

                            shadow-[0_9px_24px_rgba(33,150,243,0.10)]

                            transition-all
                            duration-300

                            hover:-translate-y-0.5
                            hover:border-[#D4A72C]/60
                            hover:shadow-[0_14px_34px_rgba(212,167,44,0.18)]

                            dark:border-[#D4A72C]/30
                            dark:bg-none
                            dark:bg-[#2196F3]/10
                            dark:text-[#42A5F5]
                          "
                        >
                          Read The Review

                          <ChevronRight
                            size={17}
                            strokeWidth={1.8}
                            className="
                              transition-transform
                              duration-300

                              group-hover:translate-x-1
                            "
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}