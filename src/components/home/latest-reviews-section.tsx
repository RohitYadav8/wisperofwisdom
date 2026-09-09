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
        bg-[#FAFAF7]
        py-16
        transition-colors
        duration-500

        dark:bg-[#041522]

        sm:py-20
        lg:py-24
      "
    >
      {/* BACKGROUND GLOW */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[340px]
          w-[340px]
          -translate-x-1/2
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
                h-[2px]
                w-14
                rounded-full
                bg-[#2196F3]
              "
            />
          </AnimateIn>
        </div>

        {/* =====================================================
            REVIEWS GRID
        ===================================================== */}

        <StaggerContainer
          className="
            mt-14
            grid
            gap-12

            md:grid-cols-2

            lg:mt-16
            lg:gap-16
          "
        >
          {reviews.map((review) => (
            <StaggerItem key={review.id}>
              <motion.article
                whileHover={{
                  y: -4,
                }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 22,
                }}
                className="
                  group
                  relative
                  h-full
                "
              >
                <div
                  className="
                    grid
                    gap-7

                    sm:grid-cols-[120px_1fr]
                    sm:items-start
                  "
                >
                  {/* =================================================
                      CLICKABLE BOOK IMAGE
                  ================================================= */}

                  <Link
                    href="/product/whispers-of-wisdom"
                    aria-label="View The Journey of Whispers of Wisdom"
                    className="
                      group/book
                      relative
                      mx-auto
                      block
                      h-[180px]
                      w-[115px]
                      shrink-0

                      sm:mx-0
                    "
                  >
                    <motion.div
                      whileHover={{
                        y: -5,
                        scale: 1.04,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
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
                        sizes="115px"
                        className="
                          object-contain
                          object-center

                          transition-all
                          duration-300

                          group-hover/book:drop-shadow-[0_15px_18px_rgba(0,0,0,0.14)]
                        "
                      />
                    </motion.div>
                  </Link>

                  {/* =================================================
                      REVIEW CONTENT
                  ================================================= */}

                  <div className="min-w-0">
                    {/* TITLE */}

                    <h3
                      className="
                        font-serif
                        text-[28px]
                        font-normal
                        leading-[1.08]
                        tracking-[-0.02em]
                        text-[#2D2D2D]

                        dark:text-white

                        sm:text-[31px]
                      "
                    >
                      {review.title}
                    </h3>

                    {/* AUTHOR */}

                    <p
                      className="
                        mt-3
                        text-[14px]
                        uppercase
                        tracking-[0.02em]
                        text-slate-500

                        dark:text-slate-400
                      "
                    >
                      By {review.author}
                    </p>

                    {/* REVIEW TEXT */}

                    <p
                      className="
                        mt-7
                        text-[15px]
                        leading-[1.75]
                        text-[#6B6B6B]

                        dark:text-slate-300
                      "
                    >
                      {review.text}
                    </p>

                    {/* READ REVIEW */}

                    <Link
                      href="/product/whispers-of-wisdom#reviews"
                      className="
                        mt-7
                        inline-flex
                        items-center
                        gap-2

                        text-[13px]
                        font-semibold
                        uppercase
                        tracking-[0.08em]
                        text-[#2196F3]

                        transition-colors
                        duration-300

                        hover:text-[#1976D2]

                        dark:hover:text-[#42A5F5]
                      "
                    >
                      Read The Review

                      <ChevronRight
                        size={18}
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
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}