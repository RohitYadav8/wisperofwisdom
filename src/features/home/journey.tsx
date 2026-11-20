import Image from "next/image";

import { AnimateIn } from "../../components/animations/animate-in";
import { AMAZON_URL, PRODUCT_URL, journeyPrice, journeyText } from "./data";
import { Eyebrow, PillLink } from "./ui";

export function Journey() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 pb-16 sm:px-10 lg:pb-28">
      <div className="grid items-center gap-10 rounded-[36px] border border-(--wow-line) bg-(--wow-paper-2) p-7 sm:p-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:p-16">
        <AnimateIn>
          <Eyebrow>New Editions</Eyebrow>
          <h2 className="wow-serif mb-5 mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.015em] sm:text-5xl">
            The Journey of Whispers of Wisdom
          </h2>
          <p className="max-w-[600px] text-[16px] leading-relaxed text-(--wow-ink-2)">
            {journeyText}
          </p>
          <p className="wow-serif mt-6 text-4xl font-semibold text-(--wow-gold)">{journeyPrice}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <PillLink href={PRODUCT_URL} variant="ghost">
              Quick View
            </PillLink>
            <PillLink href={AMAZON_URL} arrow>
              Purchase From Amazon
            </PillLink>
          </div>
        </AnimateIn>

        <AnimateIn direction="left" className="relative mx-auto w-[220px] sm:w-[280px]">
          <Image
            src="/books.png"
            alt="The Journey of Whispers of Wisdom"
            width={280}
            height={380}
            className="h-auto w-full rotate-3 drop-shadow-[0_30px_30px_rgba(11,34,51,0.3)]"
          />
        </AnimateIn>
      </div>
    </section>
  );
}
