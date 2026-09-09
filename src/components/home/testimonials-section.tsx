"use client";

import { Star } from "lucide-react";
import { motion } from "motion/react";

import { AnimateIn } from "../animations/animate-in";
import {
  StaggerContainer,
  StaggerItem,
} from "../animations/stagger";

const testimonials = [
  {
    id: 1,
    logo: "W",
    text: `In “Whispers of Wisdom,” entrepreneur Santosh Kumar offers a compelling and personal guide for those seeking independence, self-improvement, and entrepreneurial success. This inspirational read stands out for its authenticity and reader-focused approach.`,
    rating: 5,
    source: "Press Weekly",
  },
  {
    id: 2,
    logo: "W",
    text: `Kumar’s storytelling presents wisdom throughout the book, as he weaves his own experiences into a narrative that feels intimate and relatable. The use of vivid visual examples helps to illustrate realistic concepts, making the path to happiness seem more accessible for readers.`,
    rating: 5,
    source: "Press Weekly",
  },
];

export function TestimonialsSection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-white
        py-16
        transition-colors
        duration-500
        dark:bg-[#071B29]
        sm:py-20
        lg:py-24
      "
    >
      {/* BACKGROUND DECORATION */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-14
          h-[300px]
          w-[300px]
          -translate-x-1/2
          rounded-full
          bg-[#2196F3]/5
          blur-[110px]
          dark:bg-[#2196F3]/8
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1180px]
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
                tracking-[0.3em]
                text-[#2196F3]
              "
            >
              Testimonials
            </p>
          </AnimateIn>

          <AnimateIn delay={0.08}>
            <h2
              className="
                mt-3
                font-serif
                text-[38px]
                font-normal
                leading-[1.08]
                tracking-[-0.035em]
                text-[#2D3439]
                dark:text-white
                sm:text-[46px]
                lg:text-[52px]
              "
            >
              Read Reviews by My Readers
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
            TESTIMONIALS
        ===================================================== */}

        <StaggerContainer
          className="
            mt-14
            grid
            gap-8
            md:grid-cols-2
            lg:mt-16
            lg:gap-10
          "
        >
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <motion.article
                whileHover={{
                  y: -5,
                }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 22,
                }}
                className="
                  group
                  relative
                  h-full
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-slate-200/80
                  bg-[#FCFCFA]
                  px-7
                  py-9
                  shadow-[0_20px_50px_rgba(15,23,42,0.05)]
                  transition-colors
                  duration-300
                  dark:border-white/[0.07]
                  dark:bg-[#0B2031]
                  dark:shadow-[0_22px_60px_rgba(0,0,0,0.18)]
                  sm:px-9
                  sm:py-10
                "
              >
                {/* TOP ACCENT */}

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    left-0
                    top-0
                    h-[3px]
                    w-full
                    origin-left
                    scale-x-0
                    bg-[#2196F3]
                    transition-transform
                    duration-500
                    group-hover:scale-x-100
                  "
                />

                {/* LOGO */}

                <div
                  className="
                    mx-auto
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    font-serif
                    text-[36px]
                    font-black
                    leading-none
                    text-black
                    shadow-sm
                    dark:border-white/10
                    dark:bg-white/[0.04]
                    dark:text-white
                  "
                >
                  {testimonial.logo}
                </div>

                {/* REVIEW TEXT */}

                <p
                  className="
                    mx-auto
                    mt-7
                    max-w-[430px]
                    text-center
                    font-serif
                    text-[16px]
                    italic
                    leading-[1.8]
                    text-slate-600
                    dark:text-slate-300
                    sm:text-[17px]
                  "
                >
                  “{testimonial.text}”
                </p>

                {/* RATING */}

                <div
                  className="
                    mt-7
                    flex
                    justify-center
                    gap-1
                  "
                >
                  {Array.from({
                    length: testimonial.rating,
                  }).map((_, index) => (
                    <Star
                      key={index}
                      size={14}
                      fill="currentColor"
                      strokeWidth={1.4}
                      className="text-[#C8A46A]"
                    />
                  ))}
                </div>

                {/* SOURCE */}

                <div className="mt-4 text-center">
                  <p
                    className="
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-[#26343C]
                      dark:text-white
                    "
                  >
                    {testimonial.source}
                  </p>

                  <p
                    className="
                      mt-1
                      text-[10px]
                      text-slate-400
                      dark:text-slate-500
                    "
                  >
                    Review
                  </p>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}