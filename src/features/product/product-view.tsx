"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Heart, Loader2, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";

import { AnimateIn } from "../../components/animations/animate-in";
import { Eyebrow } from "../home/ui";

/* All text and behaviour copied unchanged from the previous product page. */

const AMAZON_URL = "https://www.amazon.co.uk/dp/B0F5GXGHF8";
const PRODUCT_SLUG = "whispers-of-wisdom";

const SOCIAL_LINKS = [
  { label: "Santosh Kumar on Facebook", href: "https://www.facebook.com/santkmis", icon: FaFacebookF },
  { label: "Santosh Kumar on LinkedIn", href: "https://www.linkedin.com/in/santoshkmis/", icon: FaLinkedinIn },
  { label: "Join WhatsApp community", href: "https://chat.whatsapp.com/FnCKsmkw3Q596m2AQ2rZPk", icon: FaWhatsapp },
];

const bookImages = [
  { id: 1, src: "/books.png", alt: "Whispers of Wisdom book" },
  { id: 2, src: "/book-2.png", alt: "Whispers of Wisdom front cover" },
  { id: 3, src: "/book-3.png", alt: "Whispers of Wisdom back cover" },
  { id: 4, src: "/books-4.png", alt: "Whispers of Wisdom inside pages" },
];

type Review = {
  id: number;
  name: string;
  rating: number;
  review: string;
  createdAt: string;
};

async function requestReviews(): Promise<{ reviews: Review[] | null; error: string }> {
  try {
    const response = await fetch(`/api/reviews?productSlug=${PRODUCT_SLUG}`, { cache: "no-store" });
    const data = await response.json();
    if (!response.ok || !data.success) throw new Error(data.message || "Failed to load reviews.");
    return { reviews: data.reviews || [], error: "" };
  } catch (error) {
    return { reviews: null, error: error instanceof Error ? error.message : "Failed to load reviews." };
  }
}

function formatReviewDate(date: string) {
  try {
    return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(date));
  } catch {
    return "";
  }
}

function StarRow({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="flex gap-[2px]">
      {[1, 2, 3, 4, 5].map((item) => (
        <Star
          key={item}
          size={size}
          strokeWidth={1.5}
          fill={item <= value ? "currentColor" : "none"}
          className={item <= value ? "text-(--wow-gold)" : "text-(--wow-line)"}
        />
      ))}
    </span>
  );
}

export function ProductView() {
  const [currentImage, setCurrentImage] = useState(0);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [reviewLoadError, setReviewLoadError] = useState("");

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState("");
  const [reviewSubmitError, setReviewSubmitError] = useState("");

  useEffect(() => {
    let cancelled = false;
    requestReviews().then((result) => {
      if (cancelled) return;
      if (result.reviews) setReviews(result.reviews);
      setReviewLoadError(result.error);
      setIsLoadingReviews(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReviewSuccess("");
    setReviewSubmitError("");

    if (rating < 1) return setReviewSubmitError("Please select a rating.");
    if (!name.trim()) return setReviewSubmitError("Please enter your name.");
    if (!email.trim()) return setReviewSubmitError("Please enter your email.");
    if (!reviewText.trim()) return setReviewSubmitError("Please write your review.");

    try {
      setIsSubmittingReview(true);
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug: PRODUCT_SLUG, name: name.trim(), email: email.trim(), rating, review: reviewText.trim() }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Failed to submit review.");

      setName("");
      setEmail("");
      setReviewText("");
      setRating(0);
      setHoverRating(0);
      setReviewSuccess("Thank you! Your review has been submitted and is waiting for approval.");
    } catch (error) {
      setReviewSubmitError(error instanceof Error ? error.message : "Something went wrong while submitting your review.");
    } finally {
      setIsSubmittingReview(false);
    }
  }

  const go = (dir: 1 | -1) => setCurrentImage((c) => (c + dir + bookImages.length) % bookImages.length);
  const image = bookImages[currentImage];

  const field =
    "w-full rounded-2xl border border-(--wow-line) bg-(--wow-paper) px-4 text-[15px] text-(--wow-ink) outline-none transition placeholder:text-(--wow-muted) focus:border-(--wow-brand) focus:ring-4 focus:ring-(--wow-brand)/10";
  const label = "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-(--wow-ink-2)";

  return (
    <>
      {/* ================= PRODUCT HERO ================= */}
      <section className="mx-auto grid max-w-[1240px] items-center gap-10 px-5 py-12 sm:px-10 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-20">
        {/* gallery */}
        <AnimateIn direction="right">
          <div className="relative grid aspect-square place-items-center overflow-hidden rounded-[36px] border border-(--wow-line) bg-(--wow-paper-2)">
            <div aria-hidden="true" className="absolute h-[72%] w-[72%] rounded-full border-[1.5px] border-(--wow-gold)/45" />
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="View next side of the book"
              className="relative h-[72%] w-[62%] [perspective:1400px]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, rotateY: 90, scale: 0.95 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, rotateY: -90, scale: 0.95 }}
                  transition={{ duration: 0.45 }}
                  className="absolute inset-0"
                >
                  <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 380px, 70vw" priority className="object-contain drop-shadow-[0_30px_30px_rgba(11,34,51,0.3)]" />
                </motion.div>
              </AnimatePresence>
            </button>

            <div className="absolute inset-x-5 bottom-5 flex items-center justify-between">
              <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="grid h-10 w-10 place-items-center rounded-full border border-(--wow-line) bg-(--wow-card) text-(--wow-ink) transition hover:border-(--wow-ink)">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {bookImages.map((img, i) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setCurrentImage(i)}
                    aria-label={img.alt}
                    aria-current={i === currentImage}
                    className={`h-1.5 rounded-full transition-all ${i === currentImage ? "w-8 bg-(--wow-gold)" : "w-3 bg-(--wow-ink)/20"}`}
                  />
                ))}
              </div>
              <button type="button" onClick={() => go(1)} aria-label="Next image" className="grid h-10 w-10 place-items-center rounded-full border border-(--wow-line) bg-(--wow-card) text-(--wow-ink) transition hover:border-(--wow-ink)">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-3">
            {bookImages.map((img, i) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setCurrentImage(i)}
                aria-label={img.alt}
                className={`relative aspect-square overflow-hidden rounded-2xl border bg-(--wow-card) transition ${i === currentImage ? "border-(--wow-ink)" : "border-(--wow-line) hover:border-(--wow-ink)/40"}`}
              >
                <Image src={img.src} alt="" fill sizes="120px" className="object-contain p-2" />
              </button>
            ))}
          </div>
        </AnimateIn>

        {/* details */}
        <AnimateIn delay={0.1}>
          <p className="wow-serif text-3xl font-semibold text-(--wow-gold)">£35.00</p>
          <h1 className="wow-serif mt-3 text-[40px] font-semibold leading-[1.03] tracking-[-0.02em] sm:text-[52px]">
            The Journey of Whispers of Wisdom
          </h1>

          <Link href="#reviews" className="mt-5 inline-flex items-center gap-3 rounded-full border border-(--wow-line) bg-(--wow-card) px-4 py-2.5 transition hover:border-(--wow-ink)">
            <StarRow value={5} />
            <span className="text-[13px] italic text-(--wow-ink-2)">
              ({reviews.length} {reviews.length === 1 ? "customer review" : "customer reviews"})
            </span>
          </Link>

          <p className="mt-6 max-w-[560px] text-[16px] leading-[1.85] text-(--wow-ink-2)">
            Embarking on the journey of entrepreneurship can feel both exciting
            and overwhelming. As you face the challenges and opportunities ahead,
            having a trustworthy guide can make all the difference. That&apos;s
            where &quot;Whispers of Wisdom&quot; steps in – a comprehensive
            handbook crafted to empower entrepreneurs to turn their dreams into
            reality and achieve lasting success.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-13 items-center gap-2.5 rounded-full bg-(--wow-ink) px-7 text-[15px] font-semibold text-(--wow-paper) transition hover:opacity-90"
            >
              Purchase From Amazon
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <button type="button" aria-label="Add to wishlist" className="grid h-13 w-13 place-items-center rounded-full border border-(--wow-line) text-(--wow-ink-2) transition hover:border-red-300 hover:text-red-500">
              <Heart className="h-[18px] w-[18px]" />
            </button>
          </div>

          <dl className="mt-9 grid grid-cols-[110px_1fr] gap-y-3 rounded-3xl border border-(--wow-line) bg-(--wow-card) p-6 text-[14px]">
            <dt className="text-(--wow-muted)">Author:</dt>
            <dd className="font-semibold">Santosh Kumar</dd>
            <dt className="text-(--wow-muted)">SKU:</dt>
            <dd>1399993070</dd>
            <dt className="text-(--wow-muted)">Category:</dt>
            <dd>Whispers of Wisdom</dd>
          </dl>
        </AnimateIn>
      </section>

      {/* ================= AUTHOR ================= */}
      <section className="mx-auto max-w-[1240px] px-5 pb-16 sm:px-10 lg:pb-24">
        <AnimateIn className="mb-10 text-center">
          <Eyebrow>About The Author</Eyebrow>
          <h2 className="wow-serif mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.015em] sm:text-5xl">Meet The Author</h2>
        </AnimateIn>

        <AnimateIn>
          <div className="grid items-center gap-10 rounded-[36px] border border-(--wow-line) bg-(--wow-card) p-7 sm:p-12 lg:grid-cols-[300px_1fr] lg:gap-14">
            <div className="mx-auto w-full max-w-[300px] text-center">
              <div className="relative h-[330px] overflow-hidden rounded-[26px] bg-[#111]">
                <Image src="/author.jpg" alt="Santosh Kumar" fill sizes="300px" className="object-cover object-[center_25%]" />
              </div>
              <h3 className="wow-serif mt-5 text-2xl font-semibold">Santosh Kumar</h3>
              <div className="mt-3 flex items-center justify-center gap-2">
                {SOCIAL_LINKS.map(({ label: l, href, icon: Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={l}
                    className="grid h-10 w-10 place-items-center rounded-full border border-(--wow-line) text-(--wow-ink-2) transition hover:border-(--wow-gold) hover:bg-(--wow-gold) hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="relative lg:border-l lg:border-(--wow-line) lg:pl-14">
              <p className="text-[16px] leading-[1.9] text-(--wow-ink-2)">
                Santosh Kumar has dedicated the entirety of his professional life
                to mastering and teaching the intricacies of strategic business
                management and execution. His journey over the years has
                culminated in a wealth of knowledge and a series of successful
                ventures that have helped businesses grow from the ground up.
              </p>
              <p className="mt-5 text-[16px] leading-[1.9] text-(--wow-ink-2)">
                Santosh&apos;s teachings on strategy development, execution, and
                business growth have reached entrepreneurs across the SME and
                startup sectors, providing practical insights for people looking
                for meaningful transformation.
              </p>
              <p className="mt-5 text-[16px] leading-[1.9] text-(--wow-ink-2)">
                By partnering with Santosh Kumar, you gain access to a body of
                knowledge built around strategy, execution, and sustainable
                business growth.
              </p>
            </div>
          </div>
        </AnimateIn>
      </section>

      {/* ================= DESCRIPTION ================= */}
      <section className="mx-auto max-w-[1240px] px-5 pb-16 sm:px-10 lg:pb-24">
        <AnimateIn>
          <div className="relative overflow-hidden rounded-[36px] bg-[#0b2233] p-8 text-[#f7f2e8] sm:p-12 lg:p-16 dark:border dark:border-(--wow-line) dark:bg-(--wow-card)">
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-[340px] w-[340px] rounded-full border-[1.5px] border-(--wow-gold)/50" />
            <p className="relative text-xs font-semibold uppercase tracking-[0.22em] text-(--wow-gold)">Description</p>
            <h2 className="wow-serif relative mt-3 text-4xl font-semibold leading-[1.05] sm:text-5xl">The Journey of Whispers of Wisdom</h2>
            <p className="relative mt-6 max-w-[900px] text-[16px] leading-[1.9] text-[#f7f2e8]/75">
              Embarking on the journey of entrepreneurship can feel both exciting
              and overwhelming. As you face the challenges and opportunities ahead,
              having a trustworthy guide can make all the difference. That&apos;s
              where &quot;Whispers of Wisdom&quot; steps in – it&apos;s a
              comprehensive handbook crafted to empower entrepreneurs to turn
              their dreams into reality and achieve lasting success in the
              competitive world of business.
            </p>
          </div>
        </AnimateIn>
      </section>

      {/* ================= REVIEWS ================= */}
      <section id="reviews" className="mx-auto max-w-[1240px] scroll-mt-28 px-5 pb-16 sm:px-10 lg:pb-24">
        <AnimateIn>
          <Eyebrow>Reviews ({reviews.length})</Eyebrow>
          <h2 className="wow-serif mt-3 max-w-[760px] text-4xl font-semibold leading-[1.08] tracking-[-0.015em] sm:text-5xl">
            {reviews.length} {reviews.length === 1 ? "review" : "reviews"} for The Journey of Whispers of Wisdom
          </h2>
        </AnimateIn>

        {isLoadingReviews && (
          <div className="mt-8 rounded-3xl border border-(--wow-line) bg-(--wow-card) p-8 text-center">
            <Loader2 className="mx-auto h-7 w-7 animate-spin text-(--wow-gold)" />
            <p className="mt-3 text-sm text-(--wow-muted)">Loading reviews...</p>
          </div>
        )}

        {!isLoadingReviews && reviewLoadError && (
          <div role="alert" className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/[0.06] dark:text-red-300">
            {reviewLoadError}
          </div>
        )}

        {!isLoadingReviews && !reviewLoadError && reviews.length === 0 && (
          <div className="mt-8 rounded-3xl border border-(--wow-line) bg-(--wow-card) p-8 text-center">
            <div className="flex justify-center"><StarRow value={0} size={17} /></div>
            <p className="mt-3 text-sm text-(--wow-muted)">No reviews yet. Be the first to share your experience.</p>
          </div>
        )}

        {!isLoadingReviews && !reviewLoadError && reviews.length > 0 && (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {reviews.map((review) => (
              <article key={review.id} className="flex gap-4 rounded-3xl border border-(--wow-line) bg-(--wow-card) p-6">
                <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-(--wow-ink) text-base font-semibold uppercase text-(--wow-paper)">
                  {review.name.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-3">
                      <StarRow value={review.rating} size={13} />
                      <strong className="text-[14px]">{review.name}</strong>
                    </div>
                    <span className="text-[12px] italic text-(--wow-muted)">{formatReviewDate(review.createdAt)}</span>
                  </div>
                  <p className="mt-3 whitespace-pre-line text-[14.5px] leading-[1.8] text-(--wow-ink-2)">{review.review}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ================= ADD REVIEW ================= */}
      <section className="mx-auto max-w-[900px] px-5 pb-20 sm:px-10 lg:pb-28">
        <AnimateIn>
          <div className="rounded-[36px] border border-(--wow-line) bg-(--wow-card) p-7 sm:p-12">
            <h2 className="wow-serif text-center text-4xl font-semibold sm:text-5xl">Add a review</h2>
            <div className="mx-auto mt-4 h-0.5 w-12 rounded-full bg-(--wow-gold)" />

            <form onSubmit={handleSubmit} noValidate className="mt-9">
              <div>
                <p className={label}>Your Rating *</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onMouseEnter={() => setHoverRating(value)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(value)}
                      aria-label={`Rate ${value} stars`}
                      className="p-0.5"
                    >
                      <Star
                        size={24}
                        strokeWidth={1.5}
                        fill={value <= (hoverRating || rating) ? "currentColor" : "none"}
                        className={value <= (hoverRating || rating) ? "text-(--wow-gold)" : "text-(--wow-muted)/50"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="review" className={label}>Your Review *</label>
                <textarea id="review" required rows={6} value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Write your review..." className={`${field} resize-none py-4 leading-relaxed`} />
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={label}>Name *</label>
                  <input id="name" type="text" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={`${field} h-13`} />
                </div>
                <div>
                  <label htmlFor="email" className={label}>Email *</label>
                  <input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className={`${field} h-13`} />
                </div>
              </div>

              <label className="mt-5 flex items-start gap-3 text-[13px] text-(--wow-ink-2)">
                <input type="checkbox" className="mt-0.5 h-4 w-4 accent-(--wow-brand)" />
                <span>Save my name, email, and website in this browser for the next time I comment.</span>
              </label>

              {reviewSuccess && (
                <div role="status" className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                  {reviewSuccess}
                </div>
              )}
              {reviewSubmitError && (
                <div role="alert" className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                  {reviewSubmitError}
                </div>
              )}

              <div className="mt-8 text-center">
                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-(--wow-ink) px-10 text-[15px] font-semibold text-(--wow-paper) transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmittingReview && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isSubmittingReview ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </AnimateIn>
      </section>
    </>
  );
}
