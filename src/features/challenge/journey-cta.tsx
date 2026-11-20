import { ArrowRight } from "lucide-react";

import { AnimateIn } from "../../components/animations/animate-in";

export function JourneyCta() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 pt-16 sm:px-10 lg:pt-28">
      <AnimateIn>
        <div className="relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-[36px] bg-[#0b2233] p-8 text-[#f7f2e8] sm:p-12 md:flex-row md:items-center lg:p-16 dark:border dark:border-(--wow-line) dark:bg-(--wow-card)">
          <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-28 h-[360px] w-[360px] rounded-full border-[1.5px] border-(--wow-gold)/60" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/3 h-[320px] w-[320px] rounded-full bg-(--wow-brand)/20 blur-[90px]" />

          <div className="relative">
            <h2 className="wow-serif text-4xl font-semibold leading-[1.05] sm:text-5xl">
              A Journey Worth Starting
            </h2>
            <p className="mt-4 max-w-[620px] text-[16px] text-[#f7f2e8]/75">
              Success is built on small, consistent steps. Let the daily
              whispers guide you toward your best self—one day at a time.
            </p>
          </div>

          <a
            href="#challenge-form"
            className="group relative inline-flex h-13 flex-none items-center gap-2.5 rounded-full bg-(--wow-gold) px-7 text-[15px] font-semibold text-white transition hover:brightness-105"
          >
            Yes! I Want The Challenge
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </AnimateIn>
    </section>
  );
}
