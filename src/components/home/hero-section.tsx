"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/* ============================================================
   SLIDES
   bookImage  -> transparent PNG (clean layout: glow + ring + float)
   lightImage / darkImage -> purani full background (fallback)
   Slide 2 aur 3 ki PNG ready hone par bookImage line uncomment karo.
============================================================ */

type Slide = {
  id: number;
  eyebrow: string;
  title: string[];
  accentLine: number;
  button: string;
  href: string;
  bookImage?: string;
  lightImage: string;
  darkImage: string;
  alt: string;
};

const slides: Slide[] = [
  {
    id: 1,
    eyebrow: "For Personal And Professional Success",
    title: ["Meet Our New", "Edition."],
    accentLine: 1,
    button: "Purchase",
    href: "https://www.amazon.co.uk/dp/B0F5GXGHF8",
  
    lightImage: "/light-slide-1.png",
    darkImage: "/dark-slide-1.png",
    alt: "Whispers of Wisdom new edition",
  },
  {
    id: 2,
    eyebrow: "For Personal And Professional Success",
    title: ["Feature books", "of the month"],
    accentLine: 1,
    button: "Purchase",
    href: "https://www.amazon.co.uk/dp/B0F5GXGHF8",
    // bookImage: "/books-slide-2.png",
    lightImage: "/light-slide-2.png",
    darkImage: "/dark-slide-2.png",
    alt: "Whispers of Wisdom featured books",
  },
  {
    id: 3,
    eyebrow: "For Personal And Professional Success",
    title: ["The Most-Read", "Book Reviews", "of 2024"],
    accentLine: 2,
    button: "Learn More",
    href: "/shop",
    // bookImage: "/books-slide-3.png",
    lightImage: "/light-slide-3.png",
    darkImage: "/dark-slide-3.png",
    alt: "Whispers of Wisdom book reviews",
  },
];

const SLIDE_TIME = 9000;
const ease = [0.16, 1, 0.3, 1] as const;
const isExternal = (href: string) => href.startsWith("http");

const wordVariants = {
  hidden: { y: "105%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, ease },
  },
  exit: {
    y: "-95%",
    opacity: 0,
    transition: { duration: 0.34, ease: [0.7, 0, 0.84, 0] as const },
  },
};

const fallbackPos = `
  object-cover object-[78%_center]
  sm:object-[76%_center] md:object-[74%_center]
  lg:object-[68%_center] xl:object-[66%_center]
`;

/* ============================================================
   HERO SECTION
============================================================ */

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  const reduceMotion = useReducedMotion();
  const slide = slides[currentSlide];

  const totalWords = useMemo(
    () => slide.title.reduce((t, l) => t + l.split(" ").length, 0),
    [slide]
  );

  const underlineDelay = reduceMotion ? 0 : 0.3 + totalWords * 0.21;
  const buttonDelay = reduceMotion ? 0 : underlineDelay + 0.1;

  const goNext = useCallback(
    () => setCurrentSlide((c) => (c + 1) % slides.length),
    []
  );

  const goPrev = useCallback(
    () => setCurrentSlide((c) => (c - 1 + slides.length) % slides.length),
    []
  );

  /* auto slider (hover par pause) */
  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(goNext, SLIDE_TIME);
    return () => window.clearTimeout(timer);
  }, [currentSlide, paused, goNext]);

  /* keyboard arrows */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="
        relative isolate overflow-hidden
        min-h-[540px] lg:min-h-[560px] xl:min-h-[580px]
        border-b border-black/[0.04] bg-[#f7f3ea]
        dark:border-white/[0.05] dark:bg-[#06131d]
      "
    >
      {/* ====================== SLIDES ====================== */}
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={slide.id}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease: "easeInOut" }}
          drag={reduceMotion ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) goNext();
            if (info.offset.x > 60) goPrev();
          }}
          className="absolute inset-0 h-full w-full"
        >
          {/* ---------------- BACKGROUND ---------------- */}
          <div className="absolute inset-0 z-0">
            {slide.bookImage ? (
              <>
                {/* glow */}
                <div
                  aria-hidden="true"
                  className="
                    absolute inset-0
                    bg-[radial-gradient(ellipse_50%_65%_at_74%_52%,rgba(28,159,210,0.25),transparent_70%)]
                    dark:bg-[radial-gradient(ellipse_50%_65%_at_74%_52%,rgba(41,181,236,0.28),transparent_70%)]
                  "
                />

                {/* soft blobs */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#1c9fd2]/10 blur-3xl dark:bg-[#29b5ec]/10"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-[-130px] left-[34%] h-80 w-80 rounded-full bg-[#e8d9b5]/60 blur-3xl dark:bg-[#0e3a52]/60"
                />

                {/* book art (right side) */}
                <div
                  className="
                    absolute bottom-0 right-0 top-0
                    flex w-[58%] items-center justify-center
                    opacity-40
                    sm:w-[52%]
                    md:w-[50%] md:opacity-100
                    lg:w-[48%]
                    xl:mr-6
                  "
                >
                  {/* ring */}
                  <div
                    aria-hidden="true"
                    className="
                      absolute aspect-square w-[78%] max-w-[420px] rounded-full
                      border border-[#1c9fd2]/20
                      shadow-[inset_0_0_0_38px_rgba(28,159,210,0.08)]
                      dark:border-[#29b5ec]/25
                      dark:shadow-[inset_0_0_0_38px_rgba(41,181,236,0.09)]
                    "
                  />

                  <motion.div
                    animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative h-[78%] w-full"
                  >
                    <Image
                      src={slide.bookImage}
                      alt={slide.alt}
                      fill
                      quality={90}
                      sizes="(min-width: 768px) 48vw, 58vw"
                      priority={currentSlide === 0}
                      className="object-contain object-center drop-shadow-[0_30px_28px_rgba(0,0,0,0.28)]"
                    />
                  </motion.div>
                </div>
              </>
            ) : (
              <>
                {/* fallback: purani full background image */}
                <div className="absolute inset-0 dark:hidden">
                  <Image
                    src={slide.lightImage}
                    alt={slide.alt}
                    fill
                    quality={90}
                    sizes="100vw"
                    className={fallbackPos}
                  />
                </div>

                <div className="absolute inset-0 hidden dark:block">
                  <Image
                    src={slide.darkImage}
                    alt={slide.alt}
                    fill
                    quality={90}
                    sizes="100vw"
                    className={fallbackPos}
                  />
                </div>

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r from-[#f7f3ea]/96 via-[#f7f3ea]/42 via-[27%] to-transparent dark:hidden"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 hidden bg-gradient-to-r from-[#06131d]/95 via-[#06131d]/45 via-[27%] to-transparent dark:block"
                />
              </>
            )}
          </div>

          {/* ---------------- CONTENT ---------------- */}
          <div
            className="
              relative z-20 mx-auto flex h-full w-full max-w-[1500px] items-center
              px-5 pb-20 pt-10
              sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20
            "
          >
            <div className="w-full max-w-[560px] sm:max-w-[600px] lg:max-w-[560px]">
              {/* EYEBROW */}
              <div className="overflow-hidden">
                <motion.p
                  initial={reduceMotion ? false : { y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduceMotion ? undefined : { y: -12, opacity: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: reduceMotion ? 0 : 0.04,
                    ease,
                  }}
                  className="
                    flex items-center gap-3
                    text-[10px] font-semibold uppercase leading-relaxed tracking-[0.25em]
                    text-[#1c9fd2] sm:text-[11px] lg:text-[12px]
                    dark:text-[#29b5ec]
                  "
                >
                  <span className="h-px w-8 shrink-0 bg-current opacity-70" />
                  {slide.eyebrow}
                </motion.p>
              </div>

              {/* HEADING */}
              <motion.div
                initial={reduceMotion ? false : "hidden"}
                animate="visible"
                exit={reduceMotion ? undefined : "exit"}
                variants={{
                  hidden: {},
                  visible: {
                    transition: { delayChildren: 0.26, staggerChildren: 0.21 },
                  },
                  exit: {
                    transition: { staggerChildren: 0.025, staggerDirection: -1 },
                  },
                }}
                className="
                  mt-4 max-w-[600px] font-serif
                  text-[clamp(2.5rem,4.4vw,4.6rem)]
                  font-normal leading-[1.03] tracking-[-0.045em]
                  text-[#26333b] dark:text-[#f8f3e9]
                "
              >
                {slide.title.map((line, lineIndex) => {
                  const accent = lineIndex === slide.accentLine;

                  return (
                    <div
                      key={`${slide.id}-${lineIndex}`}
                      className="flex flex-wrap gap-x-[0.22em] overflow-hidden pb-[0.14em]"
                    >
                      {line.split(" ").map((word, wordIndex) => (
                        <span
                          key={`${slide.id}-${lineIndex}-${wordIndex}`}
                          className="overflow-hidden"
                        >
                          <motion.span
                            variants={reduceMotion ? undefined : wordVariants}
                            className={`inline-block ${
                              accent
                                ? "italic text-[#1c9fd2] dark:text-[#29b5ec]"
                                : ""
                            }`}
                          >
                            {word}
                          </motion.span>
                        </span>
                      ))}
                    </div>
                  );
                })}
              </motion.div>

              {/* SWASH UNDERLINE */}
              <svg
                aria-hidden="true"
                viewBox="0 0 200 12"
                className="mt-1 h-3 w-40 text-[#1c9fd2] dark:text-[#29b5ec]"
                fill="none"
              >
                <motion.path
                  d="M2 8 C 40 1, 110 1, 198 7"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={reduceMotion ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    delay: underlineDelay,
                    duration: 0.8,
                    ease,
                  }}
                />
              </svg>

              {/* BUTTON */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                transition={{ duration: 0.55, delay: buttonDelay, ease }}
                className="mt-7"
              >
                <Link
                  href={slide.href}
                  target={isExternal(slide.href) ? "_blank" : undefined}
                  rel={isExternal(slide.href) ? "noopener noreferrer" : undefined}
                  className="
                    group inline-flex min-h-[50px] min-w-[164px] items-center justify-center gap-2.5
                    border border-[#1597cb] bg-[#1c9fd2] px-6
                    text-[10px] font-bold uppercase tracking-[0.15em] text-white
                    shadow-[0_16px_30px_-16px_rgba(25,157,209,0.9)]
                    transition-all duration-300
                    hover:-translate-y-[2px] hover:border-[#087da8] hover:bg-[#087da8]
                    hover:shadow-[0_18px_34px_-16px_rgba(8,124,167,0.8)]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500
                    focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f3ea]
                    dark:border-[#26a9df] dark:bg-[#159bd5] dark:text-[#04202f]
                    dark:hover:border-[#3cbced] dark:hover:bg-[#21aae2]
                    dark:focus-visible:ring-offset-[#06131d]
                  "
                >
                  {slide.button}
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ================== CONTROLS ================== */}
      <div
        className="
          absolute inset-x-0 bottom-0 z-40 mx-auto flex max-w-[1500px]
          items-center justify-between px-5 pb-5
          sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20
        "
      >
        {/* dots with progress */}
        <div className="flex items-center gap-2">
          {slides.map((item, index) => {
            const active = currentSlide === index;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={active ? "true" : undefined}
                className="
                  relative flex h-6 cursor-pointer items-center justify-center
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400
                "
              >
                <span
                  className={`
                    relative block h-[3px] overflow-hidden rounded-full
                    bg-black/15 transition-all duration-500 dark:bg-white/20
                    ${active ? "w-14" : "w-6"}
                  `}
                >
                  {active && (
                    <motion.span
                      key={`progress-${slide.id}-${paused}`}
                      initial={{ scaleX: paused ? 1 : 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: paused ? 0 : SLIDE_TIME / 1000,
                        ease: "linear",
                      }}
                      className="block h-full w-full origin-left rounded-full bg-[#159bd2] dark:bg-[#29b5ec]"
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* arrows */}
        <div className="flex gap-2">
          {[
            { label: "Previous slide", onClick: goPrev, d: "M15 6l-6 6 6 6" },
            { label: "Next slide", onClick: goNext, d: "M9 6l6 6-6 6" },
          ].map((btn) => (
            <button
              key={btn.label}
              type="button"
              onClick={btn.onClick}
              aria-label={btn.label}
              className="
                flex h-10 w-10 cursor-pointer items-center justify-center
                border border-black/10 bg-white/80 text-[#1c9fd2]
                shadow-[0_8px_20px_-12px_rgba(6,19,29,0.35)] backdrop-blur-md
                transition-all duration-300
                hover:-translate-y-px hover:bg-[#1c9fd2] hover:text-white
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400
                dark:border-white/15 dark:bg-white/5 dark:text-[#29b5ec]
                dark:hover:bg-[#29b5ec] dark:hover:text-[#06131d]
              "
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d={btn.d} />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}