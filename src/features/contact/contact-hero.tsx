import Image from "next/image";

import { AnimateIn } from "../../components/animations/animate-in";

export function ContactHero() {
  return (
    <section className="relative overflow-hidden border-b border-(--wow-line)">
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-10 px-5 py-14 sm:px-10 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-20">
        <AnimateIn>
          <h1 className="wow-serif text-[42px] font-semibold leading-[1.04] tracking-[-0.02em] sm:text-6xl lg:text-[68px]">
            Keep In Touch With Us
          </h1>
          <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-(--wow-ink-2) sm:text-lg">
            We&apos;d love to hear from you! Whether you have questions,
            feedback, or just want to share your thoughts about “Whispers of
            Wisdom,” feel free to reach out.
          </p>
        </AnimateIn>

        <AnimateIn direction="left" delay={0.15}>
          <div className="relative aspect-[16/11] overflow-hidden rounded-[32px] border border-(--wow-line) shadow-[0_40px_80px_-40px_rgba(11,34,51,0.45)]">
            <Image
              src="/light-slide-2.png"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover object-[68%_center] dark:hidden"
            />
            <Image
              src="/dark-slide-2.png"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 600px, 100vw"
              className="hidden object-cover object-[68%_center] dark:block"
            />
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
