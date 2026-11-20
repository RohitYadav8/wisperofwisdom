import Image from "next/image";

import { AnimateIn } from "../../components/animations/animate-in";
import { AUTHOR_URL, authorBio } from "./data";
import { PillLink } from "./ui";

export function Author() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 pb-16 sm:px-10 lg:pb-28">
      <AnimateIn className="mb-10 text-center lg:mb-14">
        <h2 className="wow-serif text-4xl font-semibold leading-[1.05] tracking-[-0.015em] sm:text-5xl">
          Meet The Author
        </h2>
      </AnimateIn>

      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <AnimateIn direction="right" className="relative h-[460px] overflow-hidden rounded-[28px] bg-[#111] ring-1 ring-(--wow-gold)/40 ring-offset-8 ring-offset-(--wow-paper) sm:h-[560px] lg:h-[620px]">
          <Image
            src="/author.jpg"
            alt="Santosh Kumar"
            fill
            sizes="(min-width: 1024px) 520px, 100vw"
            className="object-cover object-[center_30%]"
          />
        </AnimateIn>

        <AnimateIn delay={0.1}>
          {authorBio.map((para) => (
            <p key={para.slice(0, 20)} className="mb-5 max-w-[580px] text-[16px] leading-relaxed text-(--wow-ink-2)">
              {para}
            </p>
          ))}
          <PillLink href={AUTHOR_URL} arrow className="mt-4">
            Know More About Santosh Kumar
          </PillLink>
        </AnimateIn>
      </div>
    </section>
  );
}
