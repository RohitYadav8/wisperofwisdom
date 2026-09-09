"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

/* =========================================================
   LINKS
========================================================= */

const AMAZON_URL = "https://www.amazon.co.uk/dp/B0F5GXGHF8";

const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/santoshkmis/",
  facebook: "https://www.facebook.com/santkmis",
  whatsapp: "https://chat.whatsapp.com/FnCKsmkw3Q596m2AQ2rZPk",
};

/* =========================================================
   BOOK IMAGES
========================================================= */

const bookImages = [
  {
    id: 1,
    src: "/books.png",
    alt: "Whispers of Wisdom book",
  },
  {
    id: 2,
    src: "/books-2.png",
    alt: "Whispers of Wisdom front cover",
  },
  {
    id: 3,
    src: "/books-3.png",
    alt: "Whispers of Wisdom back cover",
  },
  {
    id: 4,
    src: "/books-4.png",
    alt: "Whispers of Wisdom inside pages",
  },
];

/* =========================================================
   SOCIAL ICONS
========================================================= */

function FacebookIcon({ size = 13 }: { size?: number }) {
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

function LinkedinIcon({ size = 13 }: { size?: number }) {
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

function WhatsAppIcon({ size = 13 }: { size?: number }) {
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

/* =========================================================
   REVIEWS
========================================================= */

const reviewText = `Whispers of Wisdom has arrived at a perfect time for our business Creative Living Property. As we grow and scale our business the lessons and guidance within the book provide a navigation compass whilst inspiring us with the infectious entrepreneurial spirit of the author. We were lucky enough the meet the author earlier this year on a property training mastermind in Dubai. He took time out of a busy schedule to sit down with myself and family and passed on some amazing life lessons from his extensive experience in business. He went onto explain the importance of laying strong business foundations and structuring even small start up business’s with the same mindset and structure as a large successful corporation. We took his advice to heart and have since continued to grow our business based on many principles within Whispers of Wisdom which have held us in good stead. We are excited to dive deeper into the depths of knowledge within this book whilst applying the principle’s to our business and life in general.`;

const reviews = [
  {
    id: 1,
    name: "swapnil.rajwadkar",
    date: "July 25, 2024",
    text: reviewText,
  },
  {
    id: 2,
    name: "Anthony & Hannah Wiggins",
    date: "July 25, 2024",
    text: reviewText,
  },
];

export default function WhispersOfWisdomProductPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const [activeTab, setActiveTab] = useState<
    "description" | "reviews"
  >("reviews");

  const [currentImage, setCurrentImage] = useState(0);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  /* =========================================================
     BOOK ROTATION
  ========================================================= */

  function rotateBook() {
    setCurrentImage((current) =>
      current === bookImages.length - 1 ? 0 : current + 1
    );
  }

  return (
    <>
      <main
        className="
          min-h-screen
          bg-white
          text-[#26343C]
          transition-colors
          duration-500
          dark:bg-[#041522]
          dark:text-white
        "
      >
        {/* =====================================================
            PRODUCT
        ===================================================== */}

        <section
          className="
            relative
            overflow-hidden
            bg-white
            py-14
            dark:bg-[#061522]
            sm:py-16
            lg:py-20
          "
        >
          {/* BACKGROUND GLOW */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-[18%]
              top-20
              h-[380px]
              w-[380px]
              rounded-full
              bg-[#2196F3]/5
              blur-[120px]
              dark:bg-[#2196F3]/8
            "
          />

          <div
            className="
              relative
              z-10
              mx-auto
              grid
              max-w-[1250px]
              items-center
              gap-12
              px-5
              sm:px-8
              lg:grid-cols-[1fr_0.95fr]
              lg:gap-16
              lg:px-12
            "
          >
            {/* =================================================
                BOOK
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                flex
                items-center
                justify-center
              "
            >
              <button
                type="button"
                onClick={rotateBook}
                aria-label="View next side of the book"
                className="
                  relative
                  flex
                  h-[470px]
                  w-full
                  max-w-[520px]
                  cursor-pointer
                  items-center
                  justify-center
                  border-0
                  bg-transparent
                  p-0
                  outline-none
                  sm:h-[520px]
                  lg:h-[560px]
                "
                style={{
                  perspective: "1600px",
                }}
              >
                {/* FLOOR SHADOW */}

                <motion.div
                  aria-hidden="true"
                  animate={{
                    scaleX: currentImage === 3 ? 1.12 : 0.85,
                    opacity: currentImage === 3 ? 0.07 : 0.15,
                  }}
                  transition={{
                    duration: 0.45,
                  }}
                  className="
                    pointer-events-none
                    absolute
                    bottom-[4%]
                    left-1/2
                    h-12
                    w-[45%]
                    -translate-x-1/2
                    rounded-full
                    bg-black
                    blur-2xl
                  "
                />

                {/* ROTATING BOOK */}

                <div
                  className="
                    relative
                    h-full
                    w-full
                  "
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
                        rotateY: 92,
                        scale: 0.94,
                      }}
                      animate={{
                        opacity: 1,
                        rotateY: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        rotateY: -92,
                        scale: 0.94,
                      }}
                      transition={{
                        rotateY: {
                          duration: 0.6,
                          ease: [0.22, 1, 0.36, 1],
                        },
                        scale: {
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        },
                        opacity: {
                          duration: 0.28,
                        },
                      }}
                      whileHover={{
                        y: -5,
                        scale: 1.015,
                      }}
                      style={{
                        transformPerspective: 1600,
                        transformStyle: "preserve-3d",
                        backfaceVisibility: "hidden",
                      }}
                      className="
                        absolute
                        inset-0
                      "
                    >
                      <Image
                        src={bookImages[currentImage].src}
                        alt={bookImages[currentImage].alt}
                        fill
                        priority={currentImage === 0}
                        sizes="(max-width: 1024px) 90vw, 520px"
                        draggable={false}
                        className="
                          select-none
                          object-contain
                          object-center
                          drop-shadow-[0_28px_32px_rgba(15,23,42,0.16)]
                          dark:drop-shadow-[0_30px_36px_rgba(0,0,0,0.42)]
                        "
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </button>
            </motion.div>

            {/* =================================================
                PRODUCT DETAILS
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="lg:py-5"
            >
              {/* PRICE */}

              <p
                className="
                  font-serif
                  text-[20px]
                  text-[#C8A46A]
                  dark:text-[#D9B978]
                "
              >
                £35.00
              </p>

              {/* TITLE */}

              <h1
                className="
                  mt-3
                  max-w-[560px]
                  font-serif
                  text-[40px]
                  font-normal
                  leading-[1.03]
                  tracking-[-0.035em]
                  text-[#26343C]
                  dark:text-white
                  sm:text-[48px]
                  lg:text-[52px]
                "
              >
                The Journey of Whispers of Wisdom
              </h1>

              {/* RATING */}

              <Link
                href="#reviews"
                onClick={() => setActiveTab("reviews")}
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-3
                "
              >
                <span className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Star
                      key={item}
                      size={15}
                      fill="currentColor"
                      strokeWidth={1.5}
                      className="text-[#F15B40]"
                    />
                  ))}
                </span>

                <span
                  className="
                    text-[12px]
                    italic
                    text-[#F15B40]
                  "
                >
                  (2 customer reviews)
                </span>
              </Link>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-6
                  max-w-[580px]
                  text-[14px]
                  leading-[1.85]
                  text-slate-600
                  dark:text-slate-300
                "
              >
                Embarking on the journey of entrepreneurship can feel both
                exciting and overwhelming. As you face the challenges and
                opportunities ahead, having a trustworthy guide can make all
                the difference. That&apos;s where &quot;Whispers of Wisdom&quot;
                steps in – it&apos;s a comprehensive handbook crafted to empower
                entrepreneurs like yourself to turn your dreams into reality
                and achieve lasting success in the competitive world of
                business.
              </p>

              {/* ACTIONS */}

              <div
                className="
                  mt-7
                  flex
                  flex-wrap
                  items-center
                  gap-3
                "
              >
                <button
                  type="button"
                  aria-label="Add to wishlist"
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    border
                    border-slate-200
                    text-slate-500
                    transition-all
                    duration-300
                    hover:border-[#2196F3]
                    hover:text-[#2196F3]
                    dark:border-white/10
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
                    bg-[#2196F3]
                    px-7
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.1em]
                    text-white
                    transition-colors
                    duration-300
                    hover:bg-[#1976D2]
                  "
                >
                  Purchase From Amazon
                </a>
              </div>

              {/* META */}

              <div
                className="
                  mt-8
                  border-t
                  border-slate-200
                  pt-6
                  dark:border-white/10
                "
              >
                <div
                  className="
                    grid
                    grid-cols-[100px_1fr]
                    gap-y-4
                    text-[13px]
                  "
                >
                  <span className="text-slate-400">
                    Author:
                  </span>

                  <span
                    className="
                      font-medium
                      text-[#26343C]
                      dark:text-slate-200
                    "
                  >
                    Santosh Kumar
                  </span>

                  <span className="text-slate-400">
                    SKU:
                  </span>

                  <span
                    className="
                      text-[#26343C]
                      dark:text-slate-200
                    "
                  >
                    1399993070
                  </span>

                  <span className="text-slate-400">
                    Category:
                  </span>

                  <span
                    className="
                      text-[#26343C]
                      dark:text-slate-200
                    "
                  >
                    Whispers of Wisdom
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            AUTHOR
        ===================================================== */}

        <section
          className="
            relative
            overflow-hidden
            bg-[#F5F2E9]
            py-16
            transition-colors
            duration-500
            dark:bg-[#071B29]
            sm:py-20
            lg:py-24
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              right-[-100px]
              top-[-100px]
              h-[350px]
              w-[350px]
              rounded-full
              bg-[#2196F3]/5
              blur-[120px]
              dark:bg-[#2196F3]/8
            "
          />

          <div
            className="
              relative
              z-10
              mx-auto
              max-w-[1120px]
              px-5
              sm:px-8
              lg:px-12
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
              className="text-center"
            >
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-[#2196F3]
                "
              >
                About The Author
              </p>

              <h2
                className="
                  mt-3
                  font-serif
                  text-[40px]
                  font-normal
                  tracking-[-0.03em]
                  text-[#3A3A3A]
                  dark:text-white
                  sm:text-[48px]
                "
              >
                Meet The Author
              </h2>
            </motion.div>

            <div
              className="
                mt-12
                grid
                gap-10
                lg:mt-14
                lg:grid-cols-[260px_1fr]
                lg:items-start
                lg:gap-16
              "
            >
              {/* AUTHOR IMAGE */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: -25,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  mx-auto
                  w-full
                  max-w-[260px]
                  lg:mx-0
                "
              >
                <div
                  className="
                    relative
                    h-[350px]
                    w-full
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-[#2196F3]/20
                    bg-white
                    shadow-[0_25px_60px_rgba(15,23,42,0.12)]
                    dark:border-white/10
                    dark:bg-[#0B2031]
                    dark:shadow-[0_30px_70px_rgba(0,0,0,0.28)]
                  "
                >
                  <Image
                    src="/author.jpg"
                    alt="Santosh Kumar"
                    fill
                    sizes="260px"
                    className="
                      object-cover
                      object-top
                    "
                  />
                </div>

                <h3
                  className="
                    mt-5
                    font-serif
                    text-[24px]
                    text-[#3A3A3A]
                    dark:text-white
                  "
                >
                  Santosh Kumar
                </h3>

                {/* SOCIAL LINKS */}

                <div
                  className="
                    mt-3
                    flex
                    items-center
                    gap-2
                  "
                >
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
                      text-slate-500
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:border-[#2196F3]
                      hover:bg-[#2196F3]
                      hover:text-white
                      dark:border-white/10
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
                      text-slate-500
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:border-[#2196F3]
                      hover:bg-[#2196F3]
                      hover:text-white
                      dark:border-white/10
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
                      text-slate-500
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:border-[#2196F3]
                      hover:bg-[#2196F3]
                      hover:text-white
                      dark:border-white/10
                      dark:text-slate-400
                    "
                  >
                    <WhatsAppIcon />
                  </a>
                </div>
              </motion.div>

              {/* AUTHOR BIO */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: 25,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.65,
                  delay: 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  relative
                  rounded-[28px]
                  border
                  border-black/[0.05]
                  bg-white/65
                  p-7
                  shadow-[0_20px_60px_rgba(15,23,42,0.06)]
                  backdrop-blur-sm
                  dark:border-white/[0.07]
                  dark:bg-white/[0.035]
                  dark:shadow-[0_20px_60px_rgba(0,0,0,0.16)]
                  sm:p-9
                  lg:p-10
                "
              >
                <div
                  className="
                    absolute
                    left-0
                    top-10
                    h-20
                    w-[3px]
                    rounded-r-full
                    bg-[#2196F3]
                  "
                />

                <p
                  className="
                    text-[15px]
                    leading-[1.9]
                    text-slate-600
                    dark:text-slate-300
                    sm:text-[16px]
                  "
                >
                  Santosh Kumar has dedicated the entirety of his professional
                  life to mastering and teaching the intricacies of strategic
                  business management and execution. His journey over the years
                  has culminated in a wealth of knowledge and a series of
                  successful ventures that have not only propelled businesses
                  from the ground up into six-figure successes but have also
                  established a legacy that will continue to influence the
                  business world for generations to come. Santosh’s teachings
                  on strategy development, execution, and business growth have
                  penetrated every level of the SME and startup sectors,
                  reaching a global audience eager for transformation.
                </p>

                <p
                  className="
                    mt-6
                    text-[15px]
                    leading-[1.9]
                    text-slate-600
                    dark:text-slate-300
                    sm:text-[16px]
                  "
                >
                  By partnering with Santosh Kumar, you gain not just the
                  advantage of aligning with one of the most respected names in
                  strategic business consulting, but you also inherit a legacy
                  of success and a body of knowledge that can elevate your own
                  brand to new heights.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =====================================================
            REVIEWS
        ===================================================== */}

        <section
          id="reviews"
          className="
            scroll-mt-24
            bg-white
            py-16
            dark:bg-[#041522]
            sm:py-20
            lg:py-24
          "
        >
          <div
            className="
              mx-auto
              max-w-[920px]
              px-5
              sm:px-8
            "
          >
            {/* TABS */}

            <div
              className="
                flex
                justify-center
                gap-7
                border-b
                border-slate-200
                dark:border-white/10
              "
            >
              <button
                type="button"
                onClick={() => setActiveTab("description")}
                className={`
                  relative
                  pb-4
                  font-serif
                  text-[22px]
                  transition-colors
                  duration-300
                  sm:text-[24px]

                  ${
                    activeTab === "description"
                      ? "text-[#26343C] dark:text-white"
                      : "text-slate-400"
                  }
                `}
              >
                Description

                {activeTab === "description" && (
                  <motion.span
                    layoutId="product-tab"
                    className="
                      absolute
                      bottom-0
                      left-0
                      h-[2px]
                      w-full
                      bg-[#2196F3]
                    "
                  />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("reviews")}
                className={`
                  relative
                  pb-4
                  font-serif
                  text-[22px]
                  transition-colors
                  duration-300
                  sm:text-[24px]

                  ${
                    activeTab === "reviews"
                      ? "text-[#26343C] dark:text-white"
                      : "text-slate-400"
                  }
                `}
              >
                Reviews (2)

                {activeTab === "reviews" && (
                  <motion.span
                    layoutId="product-tab"
                    className="
                      absolute
                      bottom-0
                      left-0
                      h-[2px]
                      w-full
                      bg-[#2196F3]
                    "
                  />
                )}
              </button>
            </div>

            {/* DESCRIPTION */}

            {activeTab === "description" && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="
                  py-12
                  text-[15px]
                  leading-[1.9]
                  text-slate-600
                  dark:text-slate-300
                "
              >
                Embarking on the journey of entrepreneurship can feel both
                exciting and overwhelming. As you face the challenges and
                opportunities ahead, having a trustworthy guide can make all
                the difference. That&apos;s where &quot;Whispers of Wisdom&quot;
                steps in – it&apos;s a comprehensive handbook crafted to empower
                entrepreneurs like yourself to turn your dreams into reality
                and achieve lasting success in the competitive world of
                business.
              </motion.div>
            )}

            {/* REVIEWS */}

            {activeTab === "reviews" && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                }}
              >
                <h2
                  className="
                    mt-10
                    font-serif
                    text-[25px]
                    font-semibold
                    text-[#26343C]
                    dark:text-white
                  "
                >
                  2 reviews for The Journey of Whispers of Wisdom
                </h2>

                <div className="mt-7">
                  {reviews.map((review) => (
                    <article
                      key={review.id}
                      className="
                        border-b
                        border-slate-200
                        py-8
                        dark:border-white/10
                      "
                    >
                      <div
                        className="
                          grid
                          gap-5
                          sm:grid-cols-[56px_1fr]
                        "
                      >
                        {/* AVATAR */}

                        <div
                          className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-full
                            bg-slate-200
                            text-[18px]
                            font-semibold
                            uppercase
                            text-slate-500
                            dark:bg-white/10
                            dark:text-slate-300
                          "
                        >
                          {review.name.charAt(0)}
                        </div>

                        <div>
                          <div
                            className="
                              flex
                              flex-col
                              gap-3
                              sm:flex-row
                              sm:items-center
                              sm:justify-between
                            "
                          >
                            <div
                              className="
                                flex
                                flex-wrap
                                items-center
                                gap-3
                              "
                            >
                              <span className="flex gap-[2px]">
                                {[1, 2, 3, 4, 5].map((item) => (
                                  <Star
                                    key={item}
                                    size={13}
                                    fill="currentColor"
                                    strokeWidth={1.5}
                                    className="text-[#F15B40]"
                                  />
                                ))}
                              </span>

                              <strong
                                className="
                                  text-[13px]
                                  text-[#26343C]
                                  dark:text-white
                                "
                              >
                                {review.name}
                              </strong>
                            </div>

                            <span
                              className="
                                text-[11px]
                                italic
                                text-slate-400
                              "
                            >
                              {review.date}
                            </span>
                          </div>

                          <p
                            className="
                              mt-4
                              text-[13px]
                              leading-[1.8]
                              text-slate-600
                              dark:text-slate-300
                            "
                          >
                            {review.text}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* ADD REVIEW */}

                <div
                  className="
                    mx-auto
                    mt-14
                    max-w-[700px]
                  "
                >
                  <h2
                    className="
                      text-center
                      font-serif
                      text-[30px]
                      font-semibold
                      text-[#26343C]
                      dark:text-white
                    "
                  >
                    Add a review
                  </h2>

                  <form
                    onSubmit={handleSubmit}
                    className="mt-10"
                  >
                    {/* RATING */}

                    <div>
                      <label
                        className="
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.1em]
                          text-slate-600
                          dark:text-slate-300
                        "
                      >
                        Your Rating *
                      </label>

                      <div
                        className="
                          mt-3
                          flex
                          gap-1
                        "
                      >
                        {[1, 2, 3, 4, 5].map((value) => (
                          <button
                            key={value}
                            type="button"
                            onMouseEnter={() =>
                              setHoverRating(value)
                            }
                            onMouseLeave={() =>
                              setHoverRating(0)
                            }
                            onClick={() =>
                              setRating(value)
                            }
                            aria-label={`Rate ${value} stars`}
                          >
                            <Star
                              size={18}
                              fill={
                                value <= (hoverRating || rating)
                                  ? "currentColor"
                                  : "none"
                              }
                              className={
                                value <= (hoverRating || rating)
                                  ? "text-[#F15B40]"
                                  : "text-slate-300 dark:text-slate-600"
                              }
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* REVIEW */}

                    <div className="mt-7">
                      <label
                        htmlFor="review"
                        className="
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.1em]
                          text-slate-600
                          dark:text-slate-300
                        "
                      >
                        Your Review *
                      </label>

                      <textarea
                        id="review"
                        required
                        rows={7}
                        className="
                          mt-3
                          w-full
                          resize-none
                          border
                          border-slate-200
                          bg-[#FAFAFA]
                          p-4
                          text-sm
                          text-[#26343C]
                          outline-none
                          transition-colors
                          focus:border-[#2196F3]
                          dark:border-white/10
                          dark:bg-[#0B2031]
                          dark:text-white
                        "
                      />
                    </div>

                    {/* NAME EMAIL */}

                    <div
                      className="
                        mt-5
                        grid
                        gap-5
                        sm:grid-cols-2
                      "
                    >
                      <div>
                        <label
                          htmlFor="name"
                          className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.1em]
                            text-slate-600
                            dark:text-slate-300
                          "
                        >
                          Name *
                        </label>

                        <input
                          id="name"
                          type="text"
                          required
                          className="
                            mt-2
                            h-11
                            w-full
                            border
                            border-slate-200
                            bg-[#FAFAFA]
                            px-4
                            text-sm
                            text-[#26343C]
                            outline-none
                            transition-colors
                            focus:border-[#2196F3]
                            dark:border-white/10
                            dark:bg-[#0B2031]
                            dark:text-white
                          "
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.1em]
                            text-slate-600
                            dark:text-slate-300
                          "
                        >
                          Email *
                        </label>

                        <input
                          id="email"
                          type="email"
                          required
                          className="
                            mt-2
                            h-11
                            w-full
                            border
                            border-slate-200
                            bg-[#FAFAFA]
                            px-4
                            text-sm
                            text-[#26343C]
                            outline-none
                            transition-colors
                            focus:border-[#2196F3]
                            dark:border-white/10
                            dark:bg-[#0B2031]
                            dark:text-white
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
                        tracking-[0.06em]
                        text-slate-500
                        dark:text-slate-400
                      "
                    >
                      <input
                        type="checkbox"
                        className="mt-[2px]"
                      />

                      <span>
                        Save my name, email, and website in this browser for the
                        next time I comment.
                      </span>
                    </label>

                    {/* SUBMIT */}

                    <div
                      className="
                        mt-8
                        text-center
                      "
                    >
                      <button
                        type="submit"
                        className="
                          min-h-[44px]
                          bg-[#F15B40]
                          px-7
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.12em]
                          text-white
                          transition-colors
                          duration-300
                          hover:bg-[#DC4934]
                        "
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}