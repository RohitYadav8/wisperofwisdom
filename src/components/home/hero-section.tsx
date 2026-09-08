"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

const slides = [
  {
    id: 1,
    eyebrow: "For Personal And Professional Success",
    title: ["Meet Our New", "Edition."],
    button: "Purchase",
    href: "/books",
    lightImage: "/light-slide-1.png",
    darkImage: "/dark-slide-1.png",
    alt: "Whispers of Wisdom new edition",
  },
  {
    id: 2,
    eyebrow: "For Personal And Professional Success",
    title: ["Feature books", "of the month"],
    button: "Purchase",
    href: "/books",
    lightImage: "/light-slide-2.png",
    darkImage: "/dark-slide-2.png",
    alt: "Whispers of Wisdom featured books",
  },
  {
    id: 3,
    eyebrow: "For Personal And Professional Success",
    title: ["The Most-Read", "Book Reviews", "of 2024"],
    button: "Learn More",
    href: "/reviews",
    lightImage: "/light-slide-3.png",
    darkImage: "/dark-slide-3.png",
    alt: "Whispers of Wisdom book reviews",
  },
];

const SLIDE_TIME = 9000;

const wordVariants = {
  hidden: {
    y: "105%",
    opacity: 0,
  },

  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },

  exit: {
    y: "-95%",
    opacity: 0,
    transition: {
      duration: 0.34,
      ease: [0.7, 0, 0.84, 0] as const,
    },
  },
};

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const reduceMotion = useReducedMotion();

  const slide = slides[currentSlide];

  const totalWords = useMemo(() => {
    return slide.title.reduce(
      (total, line) => total + line.split(" ").length,
      0
    );
  }, [slide]);

  const buttonDelay = reduceMotion
    ? 0
    : 0.34 + totalWords * 0.21;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCurrentSlide(
        (current) => (current + 1) % slides.length
      );
    }, SLIDE_TIME);

    return () => window.clearTimeout(timer);
  }, [currentSlide]);

  function changeSlide(index: number) {
    if (index === currentSlide) return;

    setCurrentSlide(index);
  }

  return (
    <section
      className="
        relative
        isolate
        overflow-hidden

        border-b
        border-black/[0.04]

        bg-[#f7f3ea]

        dark:border-white/[0.05]
        dark:bg-[#06131d]
      "
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          className="
            relative

            min-h-[470px]

            sm:min-h-[490px]

            md:min-h-[510px]

            lg:min-h-[500px]

            xl:min-h-[520px]

            2xl:min-h-[530px]
          "
        >
          {/* =====================================================
              FULL WIDTH BACKGROUND IMAGE
          ===================================================== */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 1.035,
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={
              reduceMotion
                ? undefined
                : {
                    opacity: 0,
                    scale: 1.012,
                  }
            }
            transition={{
              duration: reduceMotion ? 0 : 1.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              absolute
              inset-0
              z-0
            "
          >
            {/* LIGHT THEME IMAGE */}

            <div className="absolute inset-0 dark:hidden">
              <Image
                src={slide.lightImage}
                alt={slide.alt}
                fill
                priority={slide.id === 1}
                sizes="100vw"
                className="
                  object-cover

                  object-[78%_center]

                  sm:object-[76%_center]

                  md:object-[74%_center]

                  lg:object-[68%_center]

                  xl:object-[66%_center]
                "
              />
            </div>

            {/* DARK THEME IMAGE */}

            <div className="absolute inset-0 hidden dark:block">
              <Image
                src={slide.darkImage}
                alt={slide.alt}
                fill
                priority={slide.id === 1}
                sizes="100vw"
                className="
                  object-cover

                  object-[78%_center]

                  sm:object-[76%_center]

                  md:object-[74%_center]

                  lg:object-[68%_center]

                  xl:object-[66%_center]
                "
              />
            </div>

            {/* =====================================================
                LIGHT THEME LEFT OVERLAY
            ===================================================== */}

            <div
              aria-hidden="true"
              className="
                absolute
                inset-0

                bg-gradient-to-r

                from-[#f7f3ea]/98
                via-[#f7f3ea]/78
                via-[34%]
                to-transparent

                dark:hidden
              "
            />

            {/* =====================================================
                DARK THEME LEFT OVERLAY
            ===================================================== */}

            <div
              aria-hidden="true"
              className="
                absolute
                inset-0

                hidden

                bg-gradient-to-r

                from-[#06131d]/98
                via-[#06131d]/82
                via-[34%]
                to-transparent

                dark:block
              "
            />

            {/* =====================================================
                MOBILE EXTRA OVERLAY
            ===================================================== */}

            <div
              aria-hidden="true"
              className="
                absolute
                inset-0

                bg-gradient-to-b

                from-transparent
                via-transparent
                to-[#f7f3ea]/10

                lg:hidden

                dark:to-[#06131d]/12
              "
            />

            {/* =====================================================
                TOP SOFTNESS
            ===================================================== */}

            <div
              aria-hidden="true"
              className="
                absolute
                inset-x-0
                top-0

                h-[8%]

                bg-gradient-to-b

                from-black/[0.02]
                to-transparent

                dark:from-black/10
              "
            />

            {/* =====================================================
                BOTTOM SOFTNESS
            ===================================================== */}

            <div
              aria-hidden="true"
              className="
                absolute
                inset-x-0
                bottom-0

                h-[12%]

                bg-gradient-to-t

                from-black/[0.025]
                to-transparent

                dark:from-black/14
              "
            />
          </motion.div>

          {/* =====================================================
              CONTENT
          ===================================================== */}

          <div
            className="
              relative
              z-20

              mx-auto

              flex

              min-h-[470px]
              w-full
              max-w-[1500px]

              items-center

              px-5
              py-10

              sm:min-h-[490px]
              sm:px-8
              sm:py-11

              md:min-h-[510px]
              md:px-10

              lg:min-h-[500px]
              lg:px-12
              lg:py-10

              xl:min-h-[520px]
              xl:px-16

              2xl:min-h-[530px]
              2xl:px-20
            "
          >
            <div
              className="
                w-full

                max-w-[560px]

                sm:max-w-[590px]

                lg:max-w-[520px]

                xl:max-w-[560px]
              "
            >
              {/* =====================================================
                  EYEBROW
              ===================================================== */}

              <div className="overflow-hidden">
                <motion.p
                  initial={
                    reduceMotion
                      ? false
                      : {
                          y: 18,
                          opacity: 0,
                        }
                  }
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  exit={
                    reduceMotion
                      ? undefined
                      : {
                          y: -12,
                          opacity: 0,
                        }
                  }
                  transition={{
                    duration: 0.55,
                    delay: reduceMotion ? 0 : 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="
                    text-[10px]
                    font-semibold
                    uppercase

                    leading-relaxed

                    tracking-[0.26em]

                    text-[#52636d]

                    sm:text-[11px]

                    lg:text-[12px]

                    dark:text-[#bfd1dc]
                  "
                >
                  {slide.eyebrow}
                </motion.p>
              </div>

              {/* =====================================================
                  HEADING
              ===================================================== */}

              <motion.div
                initial={reduceMotion ? false : "hidden"}
                animate="visible"
                exit={reduceMotion ? undefined : "exit"}
                variants={{
                  hidden: {},

                  visible: {
                    transition: {
                      delayChildren: 0.26,
                      staggerChildren: 0.21,
                    },
                  },

                  exit: {
                    transition: {
                      staggerChildren: 0.025,
                      staggerDirection: -1,
                    },
                  },
                }}
                className="
                  mt-4

                  max-w-[570px]

                  font-serif

                  text-[clamp(2.45rem,3.7vw,4rem)]

                  font-normal

                  leading-[1.01]

                  tracking-[-0.045em]

                  text-[#26333b]

                  sm:mt-5

                  dark:text-[#f8f3e9]
                "
              >
                {slide.title.map((line, lineIndex) => (
                  <div
                    key={`${slide.id}-${lineIndex}`}
                    className="
                      flex
                      flex-wrap

                      gap-x-[0.2em]

                      overflow-hidden

                      pb-[0.09em]
                    "
                  >
                    {line.split(" ").map(
                      (word, wordIndex) => (
                        <span
                          key={`${slide.id}-${lineIndex}-${wordIndex}`}
                          className="overflow-hidden"
                        >
                          <motion.span
                            variants={
                              reduceMotion
                                ? undefined
                                : wordVariants
                            }
                            className="inline-block"
                          >
                            {word}
                          </motion.span>
                        </span>
                      )
                    )}
                  </div>
                ))}
              </motion.div>

              {/* =====================================================
                  CTA
              ===================================================== */}

              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 14,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: 8,
                      }
                }
                transition={{
                  duration: 0.55,
                  delay: buttonDelay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  mt-7

                  sm:mt-8

                  lg:mt-9
                "
              >
                <Link
                  href={slide.href}
                  className="
                    group

                    inline-flex

                    min-h-[48px]
                    min-w-[156px]

                    items-center
                    justify-center

                    border
                    border-[#1597cb]

                    bg-[#1c9fd2]

                    px-7

                    text-[11px]
                    font-bold
                    uppercase

                    tracking-[0.14em]

                    text-white

                    shadow-[0_14px_30px_-18px_rgba(25,157,209,0.85)]

                    transition-all
                    duration-300

                    hover:-translate-y-[2px]

                    hover:border-[#087da8]
                    hover:bg-[#087da8]

                    hover:shadow-[0_18px_36px_-18px_rgba(8,124,167,0.75)]

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-sky-500
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-[#f7f3ea]

                    dark:border-[#26a9df]
                    dark:bg-[#159bd5]

                    dark:hover:border-[#3cbced]
                    dark:hover:bg-[#21aae2]

                    dark:focus-visible:ring-offset-[#06131d]
                  "
                >
                  <span
                    className="
                      transition-transform
                      duration-300

                      group-hover:translate-x-[1px]
                    "
                  >
                    {slide.button}
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* =====================================================
          SLIDER PROGRESS
      ===================================================== */}

      <div
        className="
          absolute

          bottom-3
          left-1/2

          z-40

          flex

          -translate-x-1/2

          items-center

          gap-2
        "
      >
        {slides.map((item, index) => {
          const active = currentSlide === index;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => changeSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={active ? "true" : undefined}
              className="
                relative

                flex

                h-7
                w-11

                cursor-pointer

                items-center
                justify-center

                sm:w-12

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-sky-400
              "
            >
              <span
                className="
                  relative

                  block

                  h-[2px]
                  w-full

                  overflow-hidden

                  rounded-full

                  bg-black/15

                  dark:bg-white/20
                "
              >
                {active && (
                  <motion.span
                    key={`progress-${slide.id}`}
                    initial={{
                      scaleX: 0,
                    }}
                    animate={{
                      scaleX: 1,
                    }}
                    transition={{
                      duration: SLIDE_TIME / 1000,
                      ease: "linear",
                    }}
                    className="
                      block

                      h-full
                      w-full

                      origin-left

                      rounded-full

                      bg-[#159bd2]

                      dark:bg-[#29b5ec]
                    "
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}