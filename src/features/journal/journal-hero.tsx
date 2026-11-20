import Image from "next/image";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

import { AnimateIn } from "../../components/animations/animate-in";
import { FloatingElement } from "../../components/animations/floating-element";

export function JournalHero() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 pt-12 sm:px-10 lg:pt-16">
      <AnimateIn>
        <div className="relative grid items-center gap-10 overflow-hidden rounded-[36px] bg-[#0b2233] p-8 text-[#f7f2e8] sm:p-12 lg:grid-cols-[1.25fr_0.75fr] lg:p-16 dark:border dark:border-(--wow-line) dark:bg-(--wow-card)">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full border-[1.5px] border-(--wow-gold)/60" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/4 h-[340px] w-[340px] rounded-full bg-(--wow-brand)/25 blur-[100px]" />

          <div className="relative">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-(--wow-gold) text-white">
              <Sparkles className="h-5 w-5" />
            </span>
            <h2 className="wow-serif mt-6 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-[58px]">
              Unlock Your Free Whispers of Wisdom Journal
            </h2>
            <p className="mt-5 max-w-[560px] text-[16px] leading-relaxed text-[#f7f2e8]/75">
              Imagine waking up each day with clarity, confidence, and a simple
              plan for success. This free journal is your first step.
            </p>
            <a
              href="#journal-form"
              className="group mt-8 inline-flex h-13 items-center gap-2.5 rounded-full bg-(--wow-gold) px-7 text-[15px] font-semibold text-white transition hover:brightness-105"
            >
              <BookOpen className="h-4 w-4" />
              Yes, I Want My Free Journal
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <FloatingElement className="relative mx-auto w-[180px] sm:w-[220px]">
            <Image
              src="/books.png"
              alt=""
              width={220}
              height={300}
              className="h-auto w-full rotate-6 drop-shadow-[0_30px_30px_rgba(0,0,0,0.45)]"
            />
          </FloatingElement>
        </div>
      </AnimateIn>

      <p className="wow-serif mt-8 text-center text-lg italic text-(--wow-brand)">
        “Clarity creates focus. Focus creates results.”
      </p>
    </section>
  );
}
