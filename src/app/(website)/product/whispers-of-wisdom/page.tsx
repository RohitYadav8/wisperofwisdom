
"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const AMAZON_URL = "https://www.amazon.co.uk/dp/B0F5GXGHF8";

const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/santoshkmis/",
  facebook: "https://www.facebook.com/santkmis",
  whatsapp: "https://chat.whatsapp.com/FnCKsmkw3Q596m2AQ2rZPk",
};

const PRODUCT_SLUG = "whispers-of-wisdom";

const bookImages = [
  {
    id: 1,
    src: "/books.png",
    alt: "Whispers of Wisdom book",
  },
  {
    id: 2,
    src: "/book-2.png",
    alt: "Whispers of Wisdom front cover",
  },
  {
    id: 3,
    src: "/book-3.png",
    alt: "Whispers of Wisdom back cover",
  },
  {
    id: 4,
    src: "/books-4.png",
    alt: "Whispers of Wisdom inside pages",
  },
];

function FacebookIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.563v1.877h2.773l-.443 2.91h-2.33V22c4.781-.756 8.438-4.92 8.438-9.94Z" />
    </svg>
  );
}

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6.5 8.5H3.2V19h3.3V8.5ZM4.85 3A1.92 1.92 0 1 0 4.85 6.84 1.92 1.92 0 0 0 4.85 3ZM19.8 13c0-3.17-1.69-4.65-3.95-4.65-1.82 0-2.63 1-3.08 1.7V8.5H9.48V19h3.29v-5.2c0-1.37.26-2.7 1.96-2.7 1.68 0 1.7 1.57 1.7 2.79V19h3.29L19.8 13Z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.52 2 2.05 6.46 2.05 11.96c0 1.75.46 3.46 1.34 4.97L2 22l5.2-1.36a10 10 0 0 0 4.83 1.23h.01c5.51 0 9.99-4.46 9.99-9.96A9.9 9.9 0 0 0 19.1 4.9 9.9 9.9 0 0 0 12.04 2Zm0 18.18h-.01a8.3 8.3 0 0 1-4.23-1.16l-.3-.18-3.09.81.83-3-.2-.31a8.2 8.2 0 0 1-1.27-4.38c0-4.56 3.72-8.27 8.29-8.27 2.21 0 4.29.86 5.85 2.42a8.2 8.2 0 0 1 2.43 5.84c-.01 4.56-3.73 8.27-8.3 8.27Zm4.55-6.19c-.25-.12-1.47-.72-1.7-.8-.23-.08-.4-.12-.57.12-.17.25-.65.8-.8.97-.15.17-.3.19-.55.06-.25-.12-1.05-.39-2-1.23a7.5 7.5 0 0 1-1.38-1.71c-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.57-1.37-.78-1.87-.21-.5-.42-.43-.57-.44h-.49c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09 0 1.23.9 2.42 1.02 2.59.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
    </svg>
  );
}

type Review = {
  id: number;
  name: string;
  rating: number;
  review: string;
  createdAt: string;
};

export default function WhispersOfWisdomProductPage() {
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

    async function loadReviews() {
      try {
        setIsLoadingReviews(true);
        setReviewLoadError("");

        const response = await fetch(
          `/api/reviews?productSlug=${PRODUCT_SLUG}`,
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to load reviews.");
        }

        if (!cancelled) {
          setReviews(data.reviews || []);
        }
      } catch (error) {
        if (!cancelled) {
          setReviewLoadError(
            error instanceof Error
              ? error.message
              : "Failed to load reviews."
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoadingReviews(false);
        }
      }
    }

    loadReviews();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setReviewSuccess("");
    setReviewSubmitError("");

    if (rating < 1) {
      setReviewSubmitError("Please select a rating.");
      return;
    }

    if (!name.trim()) {
      setReviewSubmitError("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      setReviewSubmitError("Please enter your email.");
      return;
    }

    if (!reviewText.trim()) {
      setReviewSubmitError("Please write your review.");
      return;
    }

    try {
      setIsSubmittingReview(true);

      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productSlug: PRODUCT_SLUG,
          name: name.trim(),
          email: email.trim(),
          rating,
          review: reviewText.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to submit review."
        );
      }

      setName("");
      setEmail("");
      setReviewText("");
      setRating(0);
      setHoverRating(0);

      setReviewSuccess(
        "Thank you! Your review has been submitted and is waiting for approval."
      );
    } catch (error) {
      setReviewSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting your review."
      );
    } finally {
      setIsSubmittingReview(false);
    }
  }

  function rotateBook() {
    setCurrentImage((current) =>
      current === bookImages.length - 1 ? 0 : current + 1
    );
  }

  function formatReviewDate(date: string) {
    try {
      return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date(date));
    } catch {
      return "";
    }
  }

  return (
    <main className="overflow-hidden bg-transparent text-[#26343C] dark:text-white">

      {/* =========================================================
          PRODUCT HERO
      ========================================================= */}

      <section className="relative overflow-hidden py-10 sm:py-14 lg:py-16">
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-56
            top-0
            h-[520px]
            w-[520px]
            rounded-full
            bg-[#42A5F5]/10
            blur-[150px]
            dark:bg-[#2196F3]/[0.06]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-56
            top-10
            h-[520px]
            w-[520px]
            rounded-full
            bg-[#FFD54F]/10
            blur-[150px]
            dark:bg-[#D4A72C]/[0.04]
          "
        />

        <div className="relative z-10 mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <div
            className="
              overflow-hidden
              rounded-[28px]
              border
              border-white/80
              bg-white/60
              shadow-[0_25px_80px_rgba(15,23,42,0.10)]
              backdrop-blur-2xl
              dark:border-white/[0.08]
              dark:bg-[#071B29]/85
              dark:shadow-[0_30px_90px_rgba(0,0,0,0.32)]
            "
          >
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">

              {/* BOOK */}

              <motion.div
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  relative
                  flex
                  min-h-[470px]
                  items-center
                  justify-center
                  overflow-hidden
                  border-b
                  border-slate-200/70
                  bg-gradient-to-br
                  from-[#EAF7FF]/90
                  via-white/50
                  to-[#FFF3C7]/70
                  px-5
                  py-10
                  dark:border-white/10
                  dark:bg-gradient-to-br
                  dark:from-[#0C2638]
                  dark:via-[#081D2C]
                  dark:to-[#061824]
                  sm:min-h-[540px]
                  lg:min-h-[590px]
                  lg:border-b-0
                  lg:border-r
                "
              >
                <div
                  className="
                    relative
                    flex
                    h-[350px]
                    w-[350px]
                    items-center
                    justify-center
                    sm:h-[410px]
                    sm:w-[410px]
                  "
                >
                  <div
                    aria-hidden="true"
                    className="
                      absolute
                      inset-2
                      rounded-full
                      bg-[radial-gradient(circle,rgba(255,248,215,0.90)_0%,rgba(234,247,255,0.78)_48%,rgba(66,165,245,0.10)_72%,transparent_74%)]
                      dark:bg-[radial-gradient(circle,rgba(212,167,44,0.09)_0%,rgba(33,150,243,0.09)_55%,transparent_73%)]
                    "
                  />

                  <motion.div
                    aria-hidden="true"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="
                      pointer-events-none
                      absolute
                      inset-5
                      rounded-full
                      border
                      border-[#D4A72C]/60
                      shadow-[0_0_25px_rgba(212,167,44,0.15)]
                    "
                  >
                    <span
                      className="
                        absolute
                        left-1/2
                        top-[-6px]
                        h-3
                        w-3
                        -translate-x-1/2
                        rounded-full
                        bg-[#F6C853]
                        shadow-[0_0_14px_rgba(246,200,83,0.9)]
                      "
                    />
                  </motion.div>

                  <motion.div
                    aria-hidden="true"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="
                      pointer-events-none
                      absolute
                      inset-12
                      rounded-full
                      border
                      border-[#E5B93F]/35
                    "
                  />

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      h-[210px]
                      w-[210px]
                      rounded-full
                      bg-[#FFE082]/10
                      blur-[28px]
                    "
                  />

                  <button
                    type="button"
                    onClick={rotateBook}
                    aria-label="View next side of the book"
                    className="
                      relative
                      z-20
                      h-[310px]
                      w-[225px]
                      cursor-pointer
                      border-0
                      bg-transparent
                      p-0
                      outline-none
                      sm:h-[365px]
                      sm:w-[260px]
                    "
                    style={{
                      perspective: "1400px",
                    }}
                  >
                    <div
                      className="relative h-full w-full"
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <AnimatePresence
                        mode="wait"
                        initial={false}
                      >
                        <motion.div
                          key={bookImages[currentImage].id}
                          initial={{
                            opacity: 0,
                            rotateY: 90,
                            scale: 0.95,
                          }}
                          animate={{
                            opacity: 1,
                            rotateY: 0,
                            scale: 1,
                            y: [0, -5, 0],
                          }}
                          exit={{
                            opacity: 0,
                            rotateY: -90,
                            scale: 0.95,
                          }}
                          transition={{
                            rotateY: {
                              duration: 0.55,
                              ease: [0.22, 1, 0.36, 1],
                            },
                            opacity: {
                              duration: 0.25,
                            },
                            scale: {
                              duration: 0.45,
                            },
                            y: {
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                          }}
                          whileHover={{
                            scale: 1.025,
                          }}
                          className="absolute inset-0"
                          style={{
                            transformPerspective: 1400,
                            transformStyle: "preserve-3d",
                            backfaceVisibility: "hidden",
                          }}
                        >
                          <Image
                            src={bookImages[currentImage].src}
                            alt={bookImages[currentImage].alt}
                            fill
                            priority={currentImage === 0}
                            sizes="(max-width: 640px) 225px, 260px"
                            draggable={false}
                            className="
                              select-none
                              object-contain
                              object-center
                              drop-shadow-[0_25px_25px_rgba(15,23,42,0.24)]
                              dark:drop-shadow-[0_25px_28px_rgba(0,0,0,0.5)]
                            "
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </button>
                </div>
              </motion.div>

              {/* PRODUCT DETAILS */}

              <motion.div
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.65,
                  delay: 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  flex
                  flex-col
                  justify-center
                  px-6
                  py-9
                  sm:px-9
                  sm:py-11
                  lg:px-12
                  lg:py-12
                "
              >
                <p className="font-serif text-[20px] text-[#B58A29] dark:text-[#E4C468]">
                  £35.00
                </p>

                <h1
                  className="
                    mt-3
                    max-w-[540px]
                    font-serif
                    text-[38px]
                    font-medium
                    leading-[1.02]
                    tracking-[-0.035em]
                    text-[#26343C]
                    dark:text-white
                    sm:text-[46px]
                    lg:text-[52px]
                  "
                >
                  The Journey of Whispers of Wisdom
                </h1>

                <Link
                  href="#reviews"
                  className="
                    mt-5
                    inline-flex
                    w-fit
                    items-center
                    gap-3
                    rounded-full
                    border
                    border-[#D4A72C]/20
                    bg-white/55
                    px-4
                    py-2.5
                    shadow-[0_8px_22px_rgba(15,23,42,0.05)]
                    backdrop-blur-xl
                    dark:border-white/10
                    dark:bg-white/[0.04]
                  "
                >
                  <span className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <Star
                        key={item}
                        size={14}
                        fill="currentColor"
                        strokeWidth={1.5}
                        className="text-[#E6AA20]"
                      />
                    ))}
                  </span>

                  <span className="text-[12px] italic text-slate-500 dark:text-slate-300">
                    ({reviews.length}{" "}
                    {reviews.length === 1 ? "customer review" : "customer reviews"})
                  </span>
                </Link>

                <p
                  className="
                    mt-6
                    max-w-[560px]
                    text-[14px]
                    leading-[1.85]
                    text-slate-600
                    dark:text-slate-300
                    sm:text-[15px]
                  "
                >
                  Embarking on the journey of entrepreneurship can feel both
                  exciting and overwhelming. As you face the challenges and
                  opportunities ahead, having a trustworthy guide can make all
                  the difference. That&apos;s where &quot;Whispers of
                  Wisdom&quot; steps in – a comprehensive handbook crafted to
                  empower entrepreneurs to turn their dreams into reality and
                  achieve lasting success.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    aria-label="Add to wishlist"
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-slate-200/80
                      bg-white/65
                      text-slate-500
                      shadow-[0_8px_22px_rgba(15,23,42,0.06)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-[#2196F3]/40
                      hover:text-[#2196F3]
                      dark:border-white/10
                      dark:bg-white/[0.04]
                      dark:text-slate-300
                    "
                  >
                    <Heart size={17} />
                  </button>

                  <a
                    href={AMAZON_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex
                      min-h-[44px]
                      items-center
                      justify-center
                      rounded-full
                      bg-[#2196F3]
                      px-6
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.1em]
                      text-white
                      shadow-[0_10px_26px_rgba(33,150,243,0.22)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-[#1976D2]
                    "
                  >
                    Purchase From Amazon
                  </a>
                </div>

                <div
                  className="
                    mt-8
                    rounded-[20px]
                    border
                    border-slate-200/70
                    bg-white/50
                    p-4
                    shadow-[0_10px_30px_rgba(15,23,42,0.04)]
                    backdrop-blur-xl
                    dark:border-white/[0.08]
                    dark:bg-white/[0.035]
                  "
                >
                  <div className="grid grid-cols-[90px_1fr] gap-y-3 text-[12px]">
                    <span className="text-slate-400">Author:</span>
                    <span className="font-medium text-[#26343C] dark:text-slate-200">
                      Santosh Kumar
                    </span>

                    <span className="text-slate-400">SKU:</span>
                    <span className="text-[#26343C] dark:text-slate-200">
                      1399993070
                    </span>

                    <span className="text-slate-400">Category:</span>
                    <span className="text-[#26343C] dark:text-slate-200">
                      Whispers of Wisdom
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          AUTHOR
      ========================================================= */}

      <section className="relative overflow-hidden py-14 sm:py-18 lg:py-20">
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-48
            top-10
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#FFD54F]/10
            blur-[130px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-48
            bottom-0
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#42A5F5]/10
            blur-[130px]
          "
        />

        <div className="relative z-10 mx-auto max-w-[1080px] px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#2196F3]">
              About The Author
            </p>

            <h2
              className="
                mt-2
                font-serif
                text-[38px]
                font-medium
                tracking-[-0.035em]
                text-[#26343C]
                dark:text-white
                sm:text-[46px]
              "
            >
              Meet The Author
            </h2>

            <div className="mx-auto mt-4 h-[3px] w-14 rounded-full bg-gradient-to-r from-[#2196F3] via-[#64B5F6] to-[#D4A72C]" />
          </motion.div>

          <div
            className="
              mt-9
              overflow-hidden
              rounded-[28px]
              border
              border-white/80
              bg-white/60
              shadow-[0_25px_75px_rgba(15,23,42,0.08)]
              backdrop-blur-2xl
              dark:border-white/[0.08]
              dark:bg-[#071B29]/82
              dark:shadow-[0_30px_85px_rgba(0,0,0,0.28)]
              lg:mt-11
            "
          >
            <div className="grid lg:grid-cols-[280px_1fr]">

              {/* AUTHOR IMAGE */}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="
                  border-b
                  border-slate-200/70
                  bg-gradient-to-br
                  from-[#EAF7FF]
                  to-[#FFF4CF]
                  p-7
                  dark:border-white/10
                  dark:bg-gradient-to-br
                  dark:from-[#0C2638]
                  dark:to-[#071A28]
                  lg:border-b-0
                  lg:border-r
                "
              >
                <div
                  className="
                    relative
                    mx-auto
                    h-[300px]
                    w-full
                    max-w-[220px]
                    overflow-hidden
                    rounded-[22px]
                    border
                    border-white/80
                    bg-white
                    shadow-[0_20px_50px_rgba(15,23,42,0.13)]
                    dark:border-white/10
                    dark:bg-[#0B2031]
                    sm:h-[330px]
                  "
                >
                  <Image
                    src="/author.jpg"
                    alt="Santosh Kumar"
                    fill
                    sizes="220px"
                    className="object-cover object-top"
                  />
                </div>

                <h3 className="mt-5 text-center font-serif text-[25px] font-medium text-[#26343C] dark:text-white">
                  Santosh Kumar
                </h3>

                <div className="mt-3 flex items-center justify-center gap-2">
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Santosh Kumar on Facebook"
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-slate-300
                      bg-white/50
                      text-slate-500
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-[#2196F3]
                      hover:bg-[#2196F3]
                      hover:text-white
                      dark:border-white/10
                      dark:bg-white/[0.04]
                      dark:text-slate-400
                    "
                  >
                    <FacebookIcon />
                  </a>

                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Santosh Kumar on LinkedIn"
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-slate-300
                      bg-white/50
                      text-slate-500
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-[#2196F3]
                      hover:bg-[#2196F3]
                      hover:text-white
                      dark:border-white/10
                      dark:bg-white/[0.04]
                      dark:text-slate-400
                    "
                  >
                    <LinkedinIcon />
                  </a>

                  <a
                    href={SOCIAL_LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Join WhatsApp community"
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-slate-300
                      bg-white/50
                      text-slate-500
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-[#2196F3]
                      hover:bg-[#2196F3]
                      hover:text-white
                      dark:border-white/10
                      dark:bg-white/[0.04]
                      dark:text-slate-400
                    "
                  >
                    <WhatsAppIcon />
                  </a>
                </div>
              </motion.div>

              {/* AUTHOR BIO */}

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.05,
                }}
                className="
                  relative
                  flex
                  flex-col
                  justify-center
                  px-6
                  py-9
                  sm:px-9
                  sm:py-11
                  lg:px-11
                "
              >
                <div
                  className="
                    absolute
                    left-0
                    top-1/2
                    hidden
                    h-24
                    w-[3px]
                    -translate-y-1/2
                    rounded-r-full
                    bg-gradient-to-b
                    from-[#2196F3]
                    to-[#D4A72C]
                    lg:block
                  "
                />

                <p className="text-[14px] leading-[1.9] text-slate-600 dark:text-slate-300 sm:text-[15px]">
                  Santosh Kumar has dedicated the entirety of his professional
                  life to mastering and teaching the intricacies of strategic
                  business management and execution. His journey over the years
                  has culminated in a wealth of knowledge and a series of
                  successful ventures that have helped businesses grow from the
                  ground up.
                </p>

                <p className="mt-5 text-[14px] leading-[1.9] text-slate-600 dark:text-slate-300 sm:text-[15px]">
                  Santosh&apos;s teachings on strategy development, execution,
                  and business growth have reached entrepreneurs across the SME
                  and startup sectors, providing practical insights for people
                  looking for meaningful transformation.
                </p>

                <p className="mt-5 text-[14px] leading-[1.9] text-slate-600 dark:text-slate-300 sm:text-[15px]">
                  By partnering with Santosh Kumar, you gain access to a body
                  of knowledge built around strategy, execution, and sustainable
                  business growth.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          DESCRIPTION
      ========================================================= */}

      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="
              relative
              overflow-hidden
              rounded-[26px]
              border
              border-white/80
              bg-white/65
              p-6
              shadow-[0_20px_60px_rgba(15,23,42,0.08)]
              backdrop-blur-2xl
              dark:border-white/[0.08]
              dark:bg-[#071B29]/82
              dark:shadow-[0_25px_70px_rgba(0,0,0,0.25)]
              sm:p-8
              lg:p-9
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -left-24
                -top-24
                h-52
                w-52
                rounded-full
                bg-[#FFD54F]/10
                blur-[90px]
              "
            />

            <div className="relative z-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#2196F3]">
                Description
              </p>

              <h2
                className="
                  mt-2
                  font-serif
                  text-[32px]
                  font-medium
                  leading-[1.05]
                  tracking-[-0.03em]
                  text-[#26343C]
                  dark:text-white
                  sm:text-[38px]
                "
              >
                The Journey of Whispers of Wisdom
              </h2>

              <div className="mt-4 h-[3px] w-14 rounded-full bg-gradient-to-r from-[#2196F3] to-[#D4A72C]" />

              <p className="mt-6 max-w-[900px] text-[14px] leading-[1.9] text-slate-600 dark:text-slate-300 sm:text-[15px]">
                Embarking on the journey of entrepreneurship can feel both
                exciting and overwhelming. As you face the challenges and
                opportunities ahead, having a trustworthy guide can make all
                the difference. That&apos;s where &quot;Whispers of
                Wisdom&quot; steps in – it&apos;s a comprehensive handbook
                crafted to empower entrepreneurs to turn their dreams into
                reality and achieve lasting success in the competitive world
                of business.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          REVIEWS
      ========================================================= */}

      <section
        id="reviews"
        className="relative scroll-mt-24 overflow-hidden pb-12 sm:pb-16"
      >
        <div className="relative z-10 mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="
              relative
              overflow-hidden
              rounded-[26px]
              border
              border-white/80
              bg-white/65
              p-6
              shadow-[0_20px_60px_rgba(15,23,42,0.08)]
              backdrop-blur-2xl
              dark:border-white/[0.08]
              dark:bg-[#071B29]/82
              dark:shadow-[0_25px_70px_rgba(0,0,0,0.25)]
              sm:p-8
              lg:p-9
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-24
                -top-24
                h-60
                w-60
                rounded-full
                bg-[#42A5F5]/10
                blur-[100px]
              "
            />

            <div className="relative z-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#2196F3]">
                Reviews ({reviews.length})
              </p>

              <h2
                className="
                  mt-2
                  max-w-[700px]
                  font-serif
                  text-[31px]
                  font-medium
                  leading-[1.08]
                  tracking-[-0.03em]
                  text-[#26343C]
                  dark:text-white
                  sm:text-[38px]
                "
              >
                {reviews.length}{" "}
                {reviews.length === 1 ? "review" : "reviews"} for The Journey
                of Whispers of Wisdom
              </h2>

              <div className="mt-4 h-[3px] w-14 rounded-full bg-gradient-to-r from-[#2196F3] to-[#D4A72C]" />

              {/* LOADING */}

              {isLoadingReviews && (
                <div className="mt-7 rounded-[20px] border border-slate-200/70 bg-white/50 p-7 text-center dark:border-white/10 dark:bg-white/[0.035]">
                  <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-[#2196F3]/20 border-t-[#2196F3]" />

                  <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                    Loading reviews...
                  </p>
                </div>
              )}

              {/* ERROR */}

              {!isLoadingReviews && reviewLoadError && (
                <div className="mt-7 rounded-[20px] border border-red-200 bg-red-50/70 p-5 text-center dark:border-red-500/20 dark:bg-red-500/[0.06]">
                  <p className="text-sm text-red-600 dark:text-red-300">
                    {reviewLoadError}
                  </p>
                </div>
              )}

              {/* EMPTY */}

              {!isLoadingReviews &&
                !reviewLoadError &&
                reviews.length === 0 && (
                  <div className="mt-7 rounded-[20px] border border-slate-200/70 bg-white/50 p-7 text-center dark:border-white/10 dark:bg-white/[0.035]">
                    <div className="flex justify-center gap-1">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <Star
                          key={item}
                          size={17}
                          strokeWidth={1.5}
                          className="text-slate-300 dark:text-slate-600"
                        />
                      ))}
                    </div>

                    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                      No reviews yet. Be the first to share your experience.
                    </p>
                  </div>
                )}

              {/* REVIEW LIST */}

              {!isLoadingReviews &&
                !reviewLoadError &&
                reviews.length > 0 && (
                  <div className="mt-7 space-y-4">
                    {reviews.map((review) => (
                      <motion.article
                        key={review.id}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                        className="
                          rounded-[20px]
                          border
                          border-slate-200/70
                          bg-white/60
                          p-5
                          shadow-[0_12px_30px_rgba(15,23,42,0.05)]
                          backdrop-blur-lg
                          dark:border-white/[0.08]
                          dark:bg-white/[0.035]
                        "
                      >
                        <div className="grid gap-4 sm:grid-cols-[48px_1fr]">
                          <div
                            className="
                              flex
                              h-11
                              w-11
                              items-center
                              justify-center
                              rounded-full
                              border
                              border-[#D4A72C]/25
                              bg-gradient-to-br
                              from-[#EAF7FF]
                              to-[#FFF3C7]
                              text-base
                              font-semibold
                              uppercase
                              text-[#2196F3]
                              dark:border-white/10
                              dark:bg-white/[0.06]
                              dark:text-[#64B5F6]
                            "
                          >
                            {review.name.charAt(0)}
                          </div>

                          <div>
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex flex-wrap items-center gap-3">
                                <span className="flex gap-[2px]">
                                  {[1, 2, 3, 4, 5].map((item) => (
                                    <Star
                                      key={item}
                                      size={13}
                                      fill={
                                        item <= review.rating
                                          ? "currentColor"
                                          : "none"
                                      }
                                      strokeWidth={1.5}
                                      className={
                                        item <= review.rating
                                          ? "text-[#E5A91A]"
                                          : "text-slate-300 dark:text-slate-600"
                                      }
                                    />
                                  ))}
                                </span>

                                <strong className="text-[13px] text-[#26343C] dark:text-white">
                                  {review.name}
                                </strong>
                              </div>

                              <span className="text-[11px] italic text-slate-400">
                                {formatReviewDate(review.createdAt)}
                              </span>
                            </div>

                            <p className="mt-3 whitespace-pre-line text-[13px] leading-[1.8] text-slate-600 dark:text-slate-300">
                              {review.review}
                            </p>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          ADD REVIEW
      ========================================================= */}

      <section className="relative overflow-hidden pb-16 sm:pb-20">
        <div className="relative z-10 mx-auto max-w-[820px] px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="
              rounded-[26px]
              border
              border-white/80
              bg-white/65
              p-6
              shadow-[0_20px_60px_rgba(15,23,42,0.08)]
              backdrop-blur-2xl
              dark:border-white/[0.08]
              dark:bg-[#071B29]/82
              dark:shadow-[0_25px_70px_rgba(0,0,0,0.25)]
              sm:p-8
              lg:p-9
            "
          >
            <h2
              className="
                text-center
                font-serif
                text-[34px]
                font-medium
                tracking-[-0.03em]
                text-[#26343C]
                dark:text-white
                sm:text-[40px]
              "
            >
              Add a review
            </h2>

            <div className="mx-auto mt-3 h-[3px] w-14 rounded-full bg-gradient-to-r from-[#2196F3] to-[#D4A72C]" />

            <form onSubmit={handleSubmit} className="mt-8">

              {/* RATING */}

              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-600 dark:text-slate-300">
                  Your Rating *
                </label>

                <div className="mt-3 flex gap-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onMouseEnter={() => setHoverRating(value)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(value)}
                      aria-label={`Rate ${value} stars`}
                      className="transition-transform duration-200 hover:scale-110"
                    >
                      <Star
                        size={20}
                        fill={
                          value <= (hoverRating || rating)
                            ? "currentColor"
                            : "none"
                        }
                        strokeWidth={1.5}
                        className={
                          value <= (hoverRating || rating)
                            ? "text-[#E5A91A]"
                            : "text-slate-300 dark:text-slate-600"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* REVIEW */}

              <div className="mt-6">
                <label
                  htmlFor="review"
                  className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-600 dark:text-slate-300"
                >
                  Your Review *
                </label>

                <textarea
                  id="review"
                  value={reviewText}
                  onChange={(event) =>
                    setReviewText(event.target.value)
                  }
                  required
                  minLength={5}
                  maxLength={5000}
                  rows={6}
                  placeholder="Write your review..."
                  className="
                    mt-2
                    w-full
                    resize-none
                    rounded-[16px]
                    border
                    border-slate-200/80
                    bg-white/65
                    p-4
                    text-sm
                    text-[#26343C]
                    outline-none
                    transition-all
                    duration-300
                    placeholder:text-slate-400
                    focus:border-[#2196F3]/50
                    focus:shadow-[0_0_0_4px_rgba(33,150,243,0.07)]
                    dark:border-white/10
                    dark:bg-[#0B2031]/70
                    dark:text-white
                    dark:placeholder:text-slate-500
                  "
                />
              </div>

              {/* NAME + EMAIL */}

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-600 dark:text-slate-300"
                  >
                    Name *
                  </label>

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    minLength={2}
                    maxLength={100}
                    placeholder="Your name"
                    className="
                      mt-2
                      h-11
                      w-full
                      rounded-[14px]
                      border
                      border-slate-200/80
                      bg-white/65
                      px-4
                      text-sm
                      text-[#26343C]
                      outline-none
                      transition-all
                      duration-300
                      placeholder:text-slate-400
                      focus:border-[#2196F3]/50
                      focus:shadow-[0_0_0_4px_rgba(33,150,243,0.07)]
                      dark:border-white/10
                      dark:bg-[#0B2031]/70
                      dark:text-white
                      dark:placeholder:text-slate-500
                    "
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-600 dark:text-slate-300"
                  >
                    Email *
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    placeholder="Your email"
                    className="
                      mt-2
                      h-11
                      w-full
                      rounded-[14px]
                      border
                      border-slate-200/80
                      bg-white/65
                      px-4
                      text-sm
                      text-[#26343C]
                      outline-none
                      transition-all
                      duration-300
                      placeholder:text-slate-400
                      focus:border-[#2196F3]/50
                      focus:shadow-[0_0_0_4px_rgba(33,150,243,0.07)]
                      dark:border-white/10
                      dark:bg-[#0B2031]/70
                      dark:text-white
                      dark:placeholder:text-slate-500
                    "
                  />
                </div>
              </div>

              {/* SAVE */}

              <label
                className="
                  mt-5
                  flex
                  items-start
                  gap-2
                  text-[10px]
                  uppercase
                  tracking-[0.05em]
                  text-slate-500
                  dark:text-slate-400
                "
              >
                <input type="checkbox" className="mt-[2px]" />

                <span>
                  Save my name, email, and website in this browser for the
                  next time I comment.
                </span>
              </label>

              {/* SUCCESS */}

              {reviewSuccess && (
                <div
                  role="status"
                  className="
                    mt-5
                    rounded-[14px]
                    border
                    border-green-200
                    bg-green-50
                    px-4
                    py-3
                    text-sm
                    text-green-700
                    dark:border-green-500/20
                    dark:bg-green-500/[0.08]
                    dark:text-green-300
                  "
                >
                  {reviewSuccess}
                </div>
              )}

              {/* ERROR */}

              {reviewSubmitError && (
                <div
                  role="alert"
                  className="
                    mt-5
                    rounded-[14px]
                    border
                    border-red-200
                    bg-red-50
                    px-4
                    py-3
                    text-sm
                    text-red-600
                    dark:border-red-500/20
                    dark:bg-red-500/[0.08]
                    dark:text-red-300
                  "
                >
                  {reviewSubmitError}
                </div>
              )}

              {/* SUBMIT */}

              <div className="mt-7 text-center">
                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="
                    min-h-[44px]
                    rounded-full
                    bg-[#2196F3]
                    px-8
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-white
                    shadow-[0_10px_26px_rgba(33,150,243,0.22)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-[#1976D2]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    disabled:hover:translate-y-0
                  "
                >
                  {isSubmittingReview ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

