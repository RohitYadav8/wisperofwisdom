import Image from "next/image";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";

import { AnimateIn } from "../../components/animations/animate-in";
import { StaggerContainer, StaggerItem } from "../../components/animations/stagger";
import { PRODUCT_URL, latestReviews, testimonials } from "./data";
import { SectionHeading, Stars } from "./ui";

export function LatestReviews() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 pb-16 sm:px-10 lg:pb-28">
      <AnimateIn className="mb-10 lg:mb-14">
        <SectionHeading eyebrow="Book Review" title="Latest reviews" center />
      </AnimateIn>

      <StaggerContainer className="grid gap-5 lg:grid-cols-2">
        {latestReviews.map((review) => (
          <StaggerItem key={review.author}>
            <article className="flex h-full flex-col gap-6 rounded-3xl border border-(--wow-line) bg-(--wow-card) p-6 sm:flex-row sm:p-8">
              <div className="w-[110px] flex-none sm:w-[130px]">
                <Image
                  src="/books.png"
                  alt={review.title}
                  width={130}
                  height={180}
                  className="h-auto w-full drop-shadow-[0_18px_18px_rgba(11,34,51,0.25)]"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="wow-serif text-2xl font-semibold leading-tight">{review.title}</h3>
                <p className="mt-2 text-[13px] text-(--wow-muted)">By {review.author}</p>
                <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-(--wow-ink-2)">{review.text}</p>
                <Link
                  href={`${PRODUCT_URL}#reviews`}
                  className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-(--wow-brand) hover:underline"
                >
                  Read The Review
                  <ChevronsRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="border-y border-(--wow-line) bg-(--wow-paper-2)">
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-10 lg:py-28">
        <AnimateIn className="mb-10 lg:mb-14">
          <SectionHeading eyebrow="Testimonials" title="Read Reviews by My Readers" center />
        </AnimateIn>

        <StaggerContainer className="grid gap-5 lg:grid-cols-2">
          {testimonials.map((t, i) => (
            <StaggerItem key={i}>
              <figure className="flex h-full flex-col items-center rounded-3xl border border-(--wow-line) bg-(--wow-card) p-8 text-center lg:p-12">
                <span className="wow-serif text-6xl leading-none text-(--wow-gold)" aria-hidden="true">“</span>
                <blockquote className="wow-serif mt-2 flex-1 text-xl italic leading-relaxed lg:text-[22px]">
                  {t.text}
                </blockquote>
                <figcaption className="mt-8 flex flex-col items-center gap-2">
                  <Stars />
                  <b className="wow-serif text-lg">{t.name}</b>
                  <small className="text-(--wow-muted)">{t.role}</small>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
