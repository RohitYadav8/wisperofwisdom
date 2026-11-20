import Image from "next/image";

import { AnimateIn } from "../../components/animations/animate-in";

/* Text copied unchanged from the previous About Us page. */
const aboutDescription =
  "The book navigates through foundational elements, strategic blueprints, and fundamental building blocks, emphasising preparation, survival, and sustainable growth. From the initial entrepreneurial journey to market sustainability and celebrating success, it delves into scaling, diversification, and continuous improvement. Sections on personal growth, challenges, positivity, and purpose enrich the entrepreneurial spirit. Culminating in planning for the future, succession, mentorship, and a commitment to excellence, the book serves as a holistic compass for entrepreneurs seeking enduring success and significance. It encapsulates the transformative process of translating one’s vision or entrepreneurial aspirations into tangible success and achievement. This journey involves strategic planning, goal setting, adaptability, overcoming challenges, sustaining growth, and ultimately achieving personal and professional fulfilment. It provides a roadmap where entrepreneurs not only conceptualise their vision but actively work towards realising it, navigating obstacles and celebrating victories along the way.";

export function AboutIntro() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-16 sm:px-10 lg:py-24">
      <AnimateIn className="mx-auto max-w-[860px] text-center">
        <Image src="/light-logo.png" alt="Whispers of Wisdom" width={150} height={81} className="mx-auto h-auto w-[130px] dark:hidden" />
        <Image src="/logo-dark.png" alt="Whispers of Wisdom" width={150} height={81} className="mx-auto hidden h-auto w-[130px] dark:block" />

        <h2 className="wow-serif mt-8 text-4xl font-semibold leading-[1.05] tracking-[-0.015em] sm:text-5xl">
          Welcome To Whispers Of Wisdom
        </h2>
        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.3em] text-(--wow-brand)">
          Unlocking The Path
        </p>
        <p className="mt-8 text-left text-[16px] leading-[1.85] text-(--wow-ink-2) sm:text-center">
          {aboutDescription}
        </p>
      </AnimateIn>

      <AnimateIn delay={0.1} className="mx-auto mt-14 max-w-[1000px]">
        <div className="relative aspect-video overflow-hidden rounded-[32px] border border-(--wow-line) bg-black shadow-[0_40px_80px_-40px_rgba(11,34,51,0.55)]">
          <iframe
            src="https://www.youtube.com/embed/VDOcrXhYNbs?start=21"
            title="How to Make a Deal - Santosh on Baljinder Speaks Business"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </AnimateIn>
    </section>
  );
}
