import Image from "next/image";
import { Mail, Sun } from "lucide-react";

import { AnimateIn } from "../../components/animations/animate-in";
import { FloatingElement } from "../../components/animations/floating-element";
import { PillLink } from "../home/ui";

export function ChallengeHero() {
  return (
    <section className="relative overflow-hidden border-b border-(--wow-line)">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-(--wow-brand)/10 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-5 py-14 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-24">
        {/* ---------- TEXT ---------- */}
        <AnimateIn>
          <Sun className="mb-5 h-9 w-9 text-(--wow-gold)" strokeWidth={1.6} aria-hidden="true" />
          <h2 className="wow-serif text-[40px] font-semibold leading-[1.04] tracking-[-0.02em] sm:text-6xl lg:text-[68px]">
            The 10-Day “Whispers of Wisdom” Challenge
          </h2>
          <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-(--wow-ink-2) sm:text-lg">
            Unlock daily insights to transform your mindset, habits, and
            life—one email at a time.
          </p>
          <PillLink href="#challenge-form" arrow className="mt-9">
            Yes! Send Me The 10-Day Challenge
          </PillLink>
        </AnimateIn>

        {/* ---------- VISUAL: 10 days + book ---------- */}
        <AnimateIn direction="left" delay={0.15} className="relative mx-auto mb-16 w-full max-w-[460px] lg:mb-0">
          <div className="relative rounded-[32px] border border-(--wow-line) bg-(--wow-card) p-6 shadow-[0_40px_80px_-40px_rgba(11,34,51,0.45)] sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-(--wow-brand)/12 text-(--wow-brand)">
                <Mail className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <span className="h-2 w-28 rounded-full bg-(--wow-ink)/10" />
            </div>

            <div className="grid grid-cols-5 gap-2.5 sm:gap-3" aria-hidden="true">
              {Array.from({ length: 10 }).map((_, i) => (
                <span
                  key={i}
                  className={`wow-serif grid aspect-square place-items-center rounded-2xl text-lg font-semibold sm:text-xl ${
                    i < 3
                      ? "bg-(--wow-ink) text-(--wow-paper)"
                      : i === 3
                        ? "border-2 border-(--wow-gold) text-(--wow-gold)"
                        : "border border-(--wow-line) text-(--wow-muted)"
                  }`}
                >
                  {i + 1}
                </span>
              ))}
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-(--wow-ink)/10">
              <div className="h-full w-[35%] rounded-full bg-[linear-gradient(90deg,var(--wow-brand),var(--wow-gold))]" />
            </div>
          </div>

          <FloatingElement className="absolute -bottom-20 -right-2 w-[110px] sm:-bottom-24 sm:-right-16 sm:w-[150px]">
            <Image
              src="/books.png"
              alt="Whispers of Wisdom book"
              width={170}
              height={235}
              className="h-auto w-full rotate-6 drop-shadow-[0_30px_30px_rgba(11,34,51,0.35)]"
            />
          </FloatingElement>
        </AnimateIn>
      </div>
    </section>
  );
}
