"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { heroSlides } from "./data";
import { Eyebrow, PillLink } from "./ui";

const SLIDE_TIME = 7000;
const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const slide = heroSlides[index];

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + heroSlides.length) % heroSlides.length),
    []
  );

  /* autoplay — restarts whenever the slide changes, pauses while hovered */
  useEffect(() => {
    if (paused || reduceMotion) return;
    const t = window.setTimeout(() => go(1), SLIDE_TIME);
    return () => window.clearTimeout(t);
  }, [index, paused, reduceMotion, go]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      className="relative isolate overflow-hidden border-b border-(--wow-line)"
    >
      {/* ---------------- IMAGES ---------------- */}
      <div className="relative aspect-[16/10] w-full sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            drag={reduceMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              if (info.offset.x > 60) go(-1);
            }}
          >
            {/* slow zoom (ken burns) */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: reduceMotion ? 1 : 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: SLIDE_TIME / 1000 + 1, ease: "linear" }}
            >
              <Image
                src={slide.lightImage}
                alt={slide.alt}
                fill
                priority={index === 0}
                quality={100}
                sizes="100vw"
                className="object-cover object-[72%_center] dark:hidden"
              />
              <Image
                src={slide.darkImage}
                alt={slide.alt}
                fill
                priority={index === 0}
                quality={100}
                sizes="100vw"
                className="hidden object-cover object-[72%_center] dark:block"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* fade so the text on the left stays readable (desktop overlay only) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,var(--wow-paper)_0%,color-mix(in_srgb,var(--wow-paper)_85%,transparent)_30%,transparent_58%)] lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(0deg,var(--wow-paper),transparent)] lg:hidden"
        />
      </div>

      {/* ---------------- TEXT ---------------- */}
      <div className="relative mx-auto flex max-w-[1240px] flex-col justify-center px-5 pb-10 pt-2 sm:px-10 lg:min-h-[640px] lg:py-24 xl:min-h-[700px]">
        <div className="max-w-[560px]" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.id}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease }}
            >
              <Eyebrow>{slide.eyebrow}</Eyebrow>
              <h1 className="wow-serif mb-5 mt-4 text-[42px] font-semibold leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-[72px]">
                {slide.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PillLink href={slide.href} arrow>
                  {slide.button}
                </PillLink>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ---------------- CONTROLS ---------------- */}
        <div className="mt-10 flex items-center gap-5 lg:mt-14">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="grid h-11 w-11 place-items-center rounded-full border border-(--wow-line) bg-(--wow-card)/70 text-(--wow-ink) backdrop-blur transition hover:border-(--wow-ink)"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next slide"
              className="grid h-11 w-11 place-items-center rounded-full border border-(--wow-line) bg-(--wow-card)/70 text-(--wow-ink) backdrop-blur transition hover:border-(--wow-ink)"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            {heroSlides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className="relative h-1.5 overflow-hidden rounded-full bg-(--wow-ink)/15 transition-all duration-500"
                style={{ width: i === index ? 56 : 18 }}
              >
                {i === index && (
                  <motion.span
                    key={`${s.id}-${paused}`}
                    className="absolute inset-y-0 left-0 rounded-full bg-(--wow-gold)"
                    initial={{ width: reduceMotion || paused ? "100%" : "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: reduceMotion || paused ? 0 : SLIDE_TIME / 1000, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>

          <span className="wow-serif text-sm text-(--wow-muted)">
            0{index + 1} / 0{heroSlides.length}
          </span>
        </div>
      </div>
    </section>
  );
}
