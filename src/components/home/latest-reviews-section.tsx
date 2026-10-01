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
    text: `Whispers of Wisdom has arrived at a perfect time for our business Creative Living Property. As we grow and scale our business the lessons and guidance within the book provide a navigation compass whilst inspiring us with the infectious entrepreneurial spirit of the author. We were lucky enough to meet the author earlier this year on a property training mastermind in Dubai. He took time out of a busy schedule to sit down with myself and family and passed on some amazing life lessons from his extensive experience in business. He went onto explain the importance of laying strong business foundations and structuring even small start up business’s with the same mindset and structure as a large successful corporation. We took his advice to heart and have since continued to grow our business based on many principles within Whispers of Wisdom which have held us in good stead. We are excited to dive deeper into the depths of knowledge within this book whilst applying the principle’s to our business and life in general.`,
  },
];

export function LatestReviewsSection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-transparent
        py-10

        sm:py-12

        lg:py-14
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
          -left-[220px]
          top-[10%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#42A5F5]/10
          blur-[150px]
          dark:bg-[#2196F3]/[0.08]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-[220px]
          bottom-[4%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#FFD54F]/14
          blur-[150px]
          dark:hidden
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[-180px]
          h-[400px]
          w-[600px]
          -translate-x-1/2
          rounded-full
          bg-[#2196F3]/[0.06]
          blur-[140px]
          dark:bg-[#2196F3]/[0.06]
        "
      />

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

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
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#2196F3]
              "
            >
              Book Review
            </p>
          </AnimateIn>

          <AnimateIn delay={0.08}>
            <h2
              className="
                mt-2
                font-serif
                text-[36px]
                font-normal
                leading-[1.05]
                tracking-[-0.035em]
                text-[#26343C]

                dark:text-white

                sm:text-[42px]
                lg:text-[48px]
              "
            >
              Latest reviews
            </h2>
          </AnimateIn>

          <AnimateIn delay={0.14}>
            <div
              className="
                mx-auto
                mt-4
                h-[2px]
                w-14
                rounded-full
                bg-gradient-to-r
                from-[#2196F3]
                via-[#64B5F6]
                to-[#FFD54F]
                shadow-[0_3px_12px_rgba(33,150,243,0.22)]
              "
            />
          </AnimateIn>
        </div>

        {/* =====================================================
            REVIEWS
        ===================================================== */}

        <StaggerContainer
          className="
            mt-9

            lg:mt-10
          "
        >
          {reviews.map((review, index) => (
            <StaggerItem key={review.id}>
              <motion.article
                whileHover={{
                  y: -4,
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
                  max-w-[1120px]
                "
              >
                {/* =================================================
                    OUTER GLOW BORDER
                ================================================= */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -inset-[1px]
                    rounded-[30px]
                    bg-gradient-to-br
                    from-[#2196F3]/25
                    via-white/25
                    to-[#FFD54F]/30
                    opacity-70
                    blur-[1px]
                    transition-opacity
                    duration-500
                    group-hover:opacity-100

                    dark:from-[#2196F3]/25
                    dark:via-white/[0.05]
                    dark:to-[#D4A72C]/15
                  "
                />

                {/* =================================================
                    MAIN CARD
                ================================================= */}

                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-[30px]
                    border
                    border-white/80
                    bg-white/72
                    shadow-[0_22px_60px_rgba(15,23,42,0.11),0_6px_20px_rgba(33,150,243,0.06)]
                    backdrop-blur-2xl
                    transition-all
                    duration-500

                    group-hover:shadow-[0_30px_80px_rgba(15,23,42,0.16),0_10px_30px_rgba(33,150,243,0.10)]

                    dark:border-white/[0.08]
                    dark:bg-[#071B29]/90
                    dark:shadow-[0_26px_70px_rgba(0,0,0,0.38)]
                  "
                >
                  {/* CARD GLOW */}

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      -left-[100px]
                      top-1/2
                      h-[320px]
                      w-[320px]
                      -translate-y-1/2
                      rounded-full
                      bg-[#42A5F5]/11
                      blur-[110px]
                      dark:bg-[#2196F3]/10
                    "
                  />

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      -right-[100px]
                      bottom-[-100px]
                      h-[300px]
                      w-[300px]
                      rounded-full
                      bg-[#FFD54F]/12
                      blur-[110px]
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
                      w-[60%]
                      -translate-x-1/2
                      bg-gradient-to-r
                      from-transparent
                      via-[#D4A72C]/80
                      to-transparent
                    "
                  />

                  {/* =================================================
                      CARD GRID
                  ================================================= */}

                  <div
                    className="
                      relative
                      z-10
                      grid

                      lg:grid-cols-[320px_1fr]
                    "
                  >
                    {/* =================================================
                        BOOK / GOLDEN ORBIT AREA
                    ================================================= */}

                    <div
                      className="
                        relative
                        flex
                        min-h-[340px]
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

                        lg:min-h-[390px]
                        lg:border-b-0
                        lg:border-r
                      "
                    >
                      {/* BLUE HALO */}

                      <div
                        aria-hidden="true"
                        className="
                          absolute
                          h-[270px]
                          w-[270px]
                          rounded-full
                          bg-[#42A5F5]/10
                          blur-[22px]

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
                          h-[285px]
                          w-[285px]
                          rounded-full
                          border
                          border-[#D4A72C]/60
                          shadow-[0_0_22px_rgba(212,167,44,0.20),inset_0_0_18px_rgba(212,167,44,0.07)]

                          sm:h-[300px]
                          sm:w-[300px]
                        "
                      >
                        {/* GOLDEN DOT */}

                        <div
                          className="
                            absolute
                            left-1/2
                            top-[-6px]
                            h-[12px]
                            w-[12px]
                            -translate-x-1/2
                            rounded-full
                            bg-gradient-to-br
                            from-[#FFF2A8]
                            via-[#F6C453]
                            to-[#B67A13]
                            shadow-[0_0_16px_rgba(246,196,83,0.80)]
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
                          h-[250px]
                          w-[250px]
                          rounded-full
                          border
                          border-[#E5B93F]/40

                          sm:h-[265px]
                          sm:w-[265px]
                        "
                      >
                        <div
                          className="
                            absolute
                            bottom-[18px]
                            right-[13px]
                            h-[9px]
                            w-[9px]
                            rounded-full
                            bg-[#FFD86B]
                            shadow-[0_0_12px_rgba(255,216,107,0.78)]
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
                          h-[185px]
                          w-[310px]
                          rounded-[50%]
                          border
                          border-[#D4A72C]/30
                          rotate-[-18deg]
                        "
                      />

                      {/* INNER GOLD HALO */}

                      <div
                        aria-hidden="true"
                        className="
                          absolute
                          h-[215px]
                          w-[215px]
                          rounded-full
                          bg-[radial-gradient(circle,#FFF7D6_0%,rgba(255,229,143,0.25)_35%,transparent_72%)]

                          dark:bg-[radial-gradient(circle,rgba(212,167,44,0.11)_0%,transparent_70%)]
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
                          h-[270px]
                          w-[200px]

                          sm:h-[285px]
                          sm:w-[215px]
                        "
                      >
                        <motion.div
                          animate={{
                            y: [0, -6, 0],
                          }}
                          whileHover={{
                            scale: 1.04,
                            rotate:
                              index % 2 === 0
                                ? -1.5
                                : 1.5,
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
                            sizes="215px"
                            className="
                              object-contain
                              drop-shadow-[0_26px_22px_rgba(15,23,42,0.25)]
                              transition-all
                              duration-500

                              group-hover/book:drop-shadow-[0_34px_26px_rgba(15,23,42,0.34)]

                              dark:drop-shadow-[0_28px_24px_rgba(0,0,0,0.48)]
                            "
                          />
                        </motion.div>
                      </Link>

                      {/* PREMIUM FLOATING PEDESTAL */}

                      <div
                        aria-hidden="true"
                        className="
                          pointer-events-none
                          absolute
                          bottom-[22px]
                          left-1/2
                          z-10
                          h-[22px]
                          w-[205px]
                          -translate-x-1/2
                          rounded-[50%]
                          border
                          border-[#FFD86B]/60
                          bg-gradient-to-r
                          from-[#6B4A0F]/40
                          via-[#FFD86B]/80
                          to-[#6B4A0F]/40
                          shadow-[0_0_15px_rgba(255,216,107,0.25),0_12px_26px_rgba(0,0,0,0.20)]
                        "
                      >
                        <div
                          className="
                            absolute
                            inset-[3px]
                            rounded-[50%]
                            bg-gradient-to-r
                            from-transparent
                            via-[#FFF3B0]/80
                            to-transparent
                          "
                        />
                      </div>

                      {/* PEDESTAL REFLECTION */}

                      <div
                        aria-hidden="true"
                        className="
                          pointer-events-none
                          absolute
                          bottom-[14px]
                          left-1/2
                          h-[14px]
                          w-[160px]
                          -translate-x-1/2
                          rounded-[50%]
                          bg-[#D4A72C]/22
                          blur-[10px]
                        "
                      />

                      {/* FLOOR SHADOW */}

                      <div
                        aria-hidden="true"
                        className="
                          absolute
                          bottom-[10px]
                          left-1/2
                          h-[22px]
                          w-[175px]
                          -translate-x-1/2
                          rounded-[50%]
                          bg-black/13
                          blur-[15px]

                          dark:bg-black/40
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
                        py-7

                        sm:px-8
                        sm:py-8

                        lg:px-10
                        lg:py-10
                      "
                    >
                      {/* CONTENT GLOW */}

                      <div
                        aria-hidden="true"
                        className="
                          pointer-events-none
                          absolute
                          right-[-80px]
                          top-[-80px]
                          h-[220px]
                          w-[220px]
                          rounded-full
                          bg-[#2196F3]/[0.05]
                          blur-[90px]
                        "
                      />

                      <div className="relative z-10">
                        {/* TITLE */}

                        <h3
                          className="
                            max-w-[680px]
                            font-serif
                            text-[27px]
                            font-normal
                            leading-[1.08]
                            tracking-[-0.03em]
                            text-[#26343C]

                            dark:text-white

                            sm:text-[32px]

                            lg:text-[36px]
                          "
                        >
                          {review.title}
                        </h3>

                        {/* AUTHOR */}

                        <p
                          className="
                            mt-3
                            text-[11px]
                            font-semibold
                            uppercase
                            tracking-[0.11em]
                            text-[#2196F3]

                            dark:text-[#64B5F6]
                          "
                        >
                          By {review.author}
                        </p>

                        {/* DIVIDER */}

                        <div
                          className="
                            mt-5
                            h-px
                            w-full
                            max-w-[580px]
                            bg-gradient-to-r
                            from-[#D4A72C]/45
                            via-slate-200
                            to-transparent

                            dark:via-white/10
                          "
                        />

                        {/* REVIEW TEXT */}

                        <p
                          className="
                            mt-5
                            max-w-[740px]
                            text-[13px]
                            leading-[1.8]
                            text-[#626B72]

                            dark:text-slate-300

                            sm:text-[14px]
                          "
                        >
                          {review.text}
                        </p>

                        {/* BUTTON */}

                        <Link
                          href="/product/whispers-of-wisdom#reviews"
                          className="
                            mt-6
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-[#D4A72C]/35
                            bg-gradient-to-r
                            from-[#FFF8DC]
                            to-[#EEF8FF]
                            px-4
                            py-2.5
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.1em]
                            text-[#1976D2]
                            shadow-[0_8px_20px_rgba(33,150,243,0.08)]
                            transition-all
                            duration-300

                            hover:-translate-y-0.5
                            hover:border-[#D4A72C]/60
                            hover:shadow-[0_12px_28px_rgba(212,167,44,0.16)]

                            dark:border-[#D4A72C]/30
                            dark:bg-[#2196F3]/10
                            dark:text-[#42A5F5]
                          "
                        >
                          Read The Review

                          <ChevronRight
                            size={16}
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