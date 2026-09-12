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
  const [currentImage, setCurrentImage] = useState(0);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function rotateBook() {
    setCurrentImage((current) =>
      current === bookImages.length - 1 ? 0 : current + 1
    );
  }

  return (
    <div className="overflow-hidden bg-transparent text-[#26343C] dark:text-white">
      {/* =====================================================
          PRODUCT
      ===================================================== */}

      <section className="relative overflow-hidden bg-transparent py-14 sm:py-16 lg:py-20">
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-[240px]
            top-[5%]
            h-[620px]
            w-[620px]
            rounded-full
            bg-[#42A5F5]/12
            blur-[170px]
            dark:bg-[#2196F3]/[0.07]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-[240px]
            top-[8%]
            h-[620px]
            w-[620px]
            rounded-full
            bg-[#FFD54F]/15
            blur-[170px]
            dark:bg-[#D4A72C]/[0.04]
          "
        />

        <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div
            className="
              overflow-hidden
              rounded-[36px]
              border
              border-white/80
              bg-white/60
              shadow-[0_35px_100px_rgba(15,23,42,0.12)]
              backdrop-blur-2xl
              dark:border-white/[0.08]
              dark:bg-[#071B29]/85
              dark:shadow-[0_40px_110px_rgba(0,0,0,0.38)]
            "
          >
            <div className="grid lg:grid-cols-[1fr_0.95fr]">
              {/* =================================================
                  BOOK
              ================================================= */}

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  relative
                  flex
                  min-h-[550px]
                  items-center
                  justify-center
                  overflow-hidden
                  border-b
                  border-slate-200/70
                  bg-gradient-to-br
                  from-[#EAF7FF]/85
                  via-white/45
                  to-[#FFF3C7]/80
                  dark:border-white/10
                  dark:bg-gradient-to-br
                  dark:from-[#0C2638]
                  dark:via-[#081D2C]
                  dark:to-[#061824]
                  lg:min-h-[650px]
                  lg:border-b-0
                  lg:border-r
                "
              >
                {/* CIRCLE WRAPPER */}

                <div
                  className="
                    relative
                    flex
                    h-[410px]
                    w-[410px]
                    max-w-[92%]
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    sm:h-[470px]
                    sm:w-[470px]
                  "
                >
                  {/* CIRCLE BACKGROUND */}

                  <div
                    aria-hidden="true"
                    className="
                      absolute
                      inset-3
                      rounded-full
                      bg-[radial-gradient(circle,rgba(255,248,215,0.90)_0%,rgba(234,247,255,0.78)_48%,rgba(66,165,245,0.10)_72%,transparent_74%)]
                      dark:bg-[radial-gradient(circle,rgba(212,167,44,0.09)_0%,rgba(33,150,243,0.09)_55%,transparent_73%)]
                    "
                  />

                  {/* OUTER RING */}

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
                      inset-[18px]
                      rounded-full
                      border
                      border-[#D4A72C]/70
                      shadow-[0_0_28px_rgba(212,167,44,0.20),inset_0_0_24px_rgba(212,167,44,0.08)]
                    "
                  >
                    <span
                      className="
                        absolute
                        left-1/2
                        top-[-7px]
                        h-[14px]
                        w-[14px]
                        -translate-x-1/2
                        rounded-full
                        bg-gradient-to-br
                        from-[#FFF5B8]
                        via-[#F6C853]
                        to-[#B77B13]
                        shadow-[0_0_18px_rgba(246,200,83,0.95)]
                      "
                    />
                  </motion.div>

                  {/* INNER RING */}

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
                      inset-[48px]
                      rounded-full
                      border
                      border-[#E5B93F]/40
                    "
                  >
                    <span
                      className="
                        absolute
                        bottom-[17%]
                        right-[1%]
                        h-[10px]
                        w-[10px]
                        rounded-full
                        bg-[#FFD86B]
                        shadow-[0_0_14px_rgba(255,216,107,0.85)]
                      "
                    />
                  </motion.div>

                  {/* DASHED RING */}

                  <motion.div
                    aria-hidden="true"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 28,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="
                      pointer-events-none
                      absolute
                      inset-[70px]
                      rounded-full
                      border
                      border-dashed
                      border-[#D4A72C]/25
                    "
                  />

                  {/* INNER GLOW */}

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      h-[250px]
                      w-[250px]
                      rounded-full
                      bg-[#FFE082]/15
                      blur-[28px]
                      dark:bg-[#D4A72C]/[0.06]
                    "
                  />

                  {/* BOOK */}

                  <button
                    type="button"
                    onClick={rotateBook}
                    aria-label="View next side of the book"
                    className="
                      relative
                      z-20
                      flex
                      h-[340px]
                      w-[255px]
                      cursor-pointer
                      items-center
                      justify-center
                      border-0
                      bg-transparent
                      p-0
                      outline-none
                      sm:h-[390px]
                      sm:w-[290px]
                    "
                    style={{
                      perspective: "1600px",
                    }}
                  >
                    <div
                      className="relative h-full w-full"
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={bookImages[currentImage].id}
                          initial={{
                            opacity: 0,
                            rotateY: 90,
                            scale: 0.94,
                          }}
                          animate={{
                            opacity: 1,
                            rotateY: 0,
                            scale: 1,
                            y: [0, -7, 0],
                          }}
                          exit={{
                            opacity: 0,
                            rotateY: -90,
                            scale: 0.94,
                          }}
                          transition={{
                            rotateY: {
                              duration: 0.6,
                              ease: [0.22, 1, 0.36, 1],
                            },
                            opacity: {
                              duration: 0.28,
                            },
                            scale: {
                              duration: 0.5,
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
                          style={{
                            transformPerspective: 1600,
                            transformStyle: "preserve-3d",
                            backfaceVisibility: "hidden",
                          }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={bookImages[currentImage].src}
                            alt={bookImages[currentImage].alt}
                            fill
                            priority={currentImage === 0}
                            sizes="(max-width: 640px) 255px, 290px"
                            draggable={false}
                            className="
                              select-none
                              object-contain
                              object-center
                              drop-shadow-[0_30px_28px_rgba(15,23,42,0.25)]
                              dark:drop-shadow-[0_30px_32px_rgba(0,0,0,0.5)]
                            "
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </button>
                </div>
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
                className="
                  relative
                  flex
                  flex-col
                  justify-center
                  px-7
                  py-12
                  sm:px-10
                  lg:px-12
                  lg:py-14
                "
              >
                <p className="font-serif text-[22px] text-[#B58A29] dark:text-[#E4C468]">
                  £35.00
                </p>

                <h1
                  className="
                    mt-3
                    max-w-[570px]
                    font-serif
                    text-[42px]
                    font-medium
                    leading-[0.98]
                    tracking-[-0.035em]
                    text-[#26343C]
                    dark:text-white
                    sm:text-[50px]
                    lg:text-[56px]
                  "
                >
                  The Journey of Whispers of Wisdom
                </h1>

                <Link
                  href="#reviews"
                  className="
                    mt-6
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
                    shadow-[0_8px_24px_rgba(15,23,42,0.05)]
                    backdrop-blur-xl
                    dark:border-white/10
                    dark:bg-white/[0.04]
                  "
                >
                  <span className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <Star
                        key={item}
                        size={15}
                        fill="currentColor"
                        strokeWidth={1.5}
                        className="text-[#E6AA20]"
                      />
                    ))}
                  </span>

                  <span className="text-[12px] italic text-slate-500 dark:text-slate-300">
                    (2 customer reviews)
                  </span>
                </Link>

                <p
                  className="
                    mt-7
                    max-w-[580px]
                    text-[14px]
                    leading-[1.9]
                    text-slate-600
                    dark:text-slate-300
                    sm:text-[15px]
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

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    aria-label="Add to wishlist"
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-slate-200/80
                      bg-white/65
                      text-slate-500
                      shadow-[0_8px_24px_rgba(15,23,42,0.07)]
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
                    <Heart size={18} />
                  </button>

                  <a
                    href={AMAZON_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex
                      min-h-[48px]
                      items-center
                      justify-center
                      rounded-full
                      bg-[#2196F3]
                      px-7
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-[0.1em]
                      text-white
                      shadow-[0_12px_30px_rgba(33,150,243,0.24)]
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
                    mt-9
                    rounded-[22px]
                    border
                    border-slate-200/70
                    bg-white/50
                    p-5
                    shadow-[0_12px_35px_rgba(15,23,42,0.05)]
                    backdrop-blur-xl
                    dark:border-white/[0.08]
                    dark:bg-white/[0.035]
                  "
                >
                  <div className="grid grid-cols-[100px_1fr] gap-y-4 text-[13px]">
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

      {/* =====================================================
          AUTHOR
      ===================================================== */}

      <section className="relative overflow-hidden bg-transparent py-16 sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-[220px]
            top-[12%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#FFD54F]/12
            blur-[150px]
            dark:hidden
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-[200px]
            bottom-[5%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#42A5F5]/10
            blur-[150px]
          "
        />

        <div className="relative z-10 mx-auto max-w-[1160px] px-5 sm:px-8 lg:px-12">
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
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#2196F3]">
              About The Author
            </p>

            <h2
              className="
                mt-3
                font-serif
                text-[42px]
                font-medium
                tracking-[-0.035em]
                text-[#26343C]
                dark:text-white
                sm:text-[50px]
              "
            >
              Meet The Author
            </h2>

            <div
              className="
                mx-auto
                mt-5
                h-[3px]
                w-16
                rounded-full
                bg-gradient-to-r
                from-[#2196F3]
                via-[#64B5F6]
                to-[#D4A72C]
              "
            />
          </motion.div>

          <div
            className="
              mt-12
              overflow-hidden
              rounded-[34px]
              border
              border-white/80
              bg-white/60
              shadow-[0_30px_90px_rgba(15,23,42,0.10)]
              backdrop-blur-2xl
              dark:border-white/[0.08]
              dark:bg-[#071B29]/82
              dark:shadow-[0_35px_100px_rgba(0,0,0,0.32)]
              lg:mt-14
            "
          >
            <div className="grid lg:grid-cols-[320px_1fr]">
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
                }}
                className="
                  border-b
                  border-slate-200/70
                  bg-gradient-to-br
                  from-[#EAF7FF]
                  to-[#FFF4CF]
                  p-8
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
                    h-[370px]
                    w-full
                    max-w-[270px]
                    overflow-hidden
                    rounded-[26px]
                    border
                    border-white/80
                    bg-white
                    shadow-[0_25px_65px_rgba(15,23,42,0.16)]
                    dark:border-white/10
                    dark:bg-[#0B2031]
                  "
                >
                  <Image
                    src="/author.jpg"
                    alt="Santosh Kumar"
                    fill
                    sizes="270px"
                    className="object-cover object-top"
                  />
                </div>

                <h3 className="mt-6 text-center font-serif text-[28px] font-medium text-[#26343C] dark:text-white">
                  Santosh Kumar
                </h3>

                <div className="mt-4 flex items-center justify-center gap-2">
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Santosh Kumar on Facebook"
                    className="
                      flex
                      h-10
                      w-10
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
                      h-10
                      w-10
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
                      h-10
                      w-10
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
                }}
                className="
                  relative
                  flex
                  flex-col
                  justify-center
                  px-7
                  py-10
                  sm:px-10
                  sm:py-12
                  lg:px-12
                "
              >
                <div
                  className="
                    absolute
                    left-0
                    top-1/2
                    hidden
                    h-28
                    w-[3px]
                    -translate-y-1/2
                    rounded-r-full
                    bg-gradient-to-b
                    from-[#2196F3]
                    to-[#D4A72C]
                    lg:block
                  "
                />

                <p className="text-[15px] leading-[1.95] text-slate-600 dark:text-slate-300 sm:text-[16px]">
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

                <p className="mt-6 text-[15px] leading-[1.95] text-slate-600 dark:text-slate-300 sm:text-[16px]">
                  By partnering with Santosh Kumar, you gain not just the
                  advantage of aligning with one of the most respected names in
                  strategic business consulting, but you also inherit a legacy
                  of success and a body of knowledge that can elevate your own
                  brand to new heights.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          DESCRIPTION
      ===================================================== */}

      <section
        id="reviews"
        className="
          relative
          scroll-mt-24
          overflow-hidden
          bg-transparent
          py-16
          sm:py-20
        "
      >
        <div className="relative z-10 mx-auto max-w-[1050px] px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
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
            className="
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-white/80
              bg-white/65
              p-7
              shadow-[0_25px_70px_rgba(15,23,42,0.10)]
              backdrop-blur-2xl
              dark:border-white/[0.08]
              dark:bg-[#071B29]/82
              dark:shadow-[0_30px_80px_rgba(0,0,0,0.28)]
              sm:p-9
              lg:p-10
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -left-[100px]
                -top-[100px]
                h-[260px]
                w-[260px]
                rounded-full
                bg-[#FFD54F]/14
                blur-[100px]
                dark:bg-[#D4A72C]/[0.04]
              "
            />

            <div className="relative z-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#2196F3]">
                Description
              </p>

              <h2
                className="
                  mt-3
                  font-serif
                  text-[36px]
                  font-medium
                  leading-[1]
                  tracking-[-0.03em]
                  text-[#26343C]
                  dark:text-white
                  sm:text-[42px]
                "
              >
                The Journey of Whispers of Wisdom
              </h2>

              <div
                className="
                  mt-5
                  h-[3px]
                  w-14
                  rounded-full
                  bg-gradient-to-r
                  from-[#2196F3]
                  to-[#D4A72C]
                "
              />

              <p className="mt-7 max-w-[900px] text-[15px] leading-[1.95] text-slate-600 dark:text-slate-300 sm:text-[16px]">
                Embarking on the journey of entrepreneurship can feel both
                exciting and overwhelming. As you face the challenges and
                opportunities ahead, having a trustworthy guide can make all
                the difference. That&apos;s where &quot;Whispers of Wisdom&quot;
                steps in – it&apos;s a comprehensive handbook crafted to empower
                entrepreneurs like yourself to turn your dreams into reality
                and achieve lasting success in the competitive world of
                business.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          REVIEWS
      ===================================================== */}

      <section className="relative overflow-hidden bg-transparent pb-16 sm:pb-20">
        <div className="relative z-10 mx-auto max-w-[1050px] px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
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
            className="
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-white/80
              bg-white/65
              p-7
              shadow-[0_25px_70px_rgba(15,23,42,0.10)]
              backdrop-blur-2xl
              dark:border-white/[0.08]
              dark:bg-[#071B29]/82
              dark:shadow-[0_30px_80px_rgba(0,0,0,0.28)]
              sm:p-9
              lg:p-10
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-[120px]
                -top-[120px]
                h-[300px]
                w-[300px]
                rounded-full
                bg-[#42A5F5]/10
                blur-[110px]
              "
            />

            <div className="relative z-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#2196F3]">
                Reviews (2)
              </p>

              <h2
                className="
                  mt-3
                  font-serif
                  text-[34px]
                  font-medium
                  leading-[1.05]
                  tracking-[-0.03em]
                  text-[#26343C]
                  dark:text-white
                  sm:text-[40px]
                "
              >
                2 reviews for The Journey of Whispers of Wisdom
              </h2>

              <div
                className="
                  mt-5
                  h-[3px]
                  w-14
                  rounded-full
                  bg-gradient-to-r
                  from-[#2196F3]
                  to-[#D4A72C]
                "
              />

              <div className="mt-8 space-y-5">
                {reviews.map((review) => (
                  <motion.article
                    key={review.id}
                    whileHover={{
                      y: -3,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="
                      rounded-[24px]
                      border
                      border-slate-200/70
                      bg-white/60
                      p-5
                      shadow-[0_14px_38px_rgba(15,23,42,0.06)]
                      backdrop-blur-lg
                      dark:border-white/[0.08]
                      dark:bg-white/[0.035]
                      sm:p-6
                    "
                  >
                    <div className="grid gap-5 sm:grid-cols-[54px_1fr]">
                      <div
                        className="
                          flex
                          h-[50px]
                          w-[50px]
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-[#D4A72C]/25
                          bg-gradient-to-br
                          from-[#EAF7FF]
                          to-[#FFF3C7]
                          text-[18px]
                          font-semibold
                          uppercase
                          text-[#2196F3]
                          shadow-[0_8px_20px_rgba(33,150,243,0.10)]
                          dark:border-white/10
                          dark:bg-none
                          dark:bg-white/[0.06]
                          dark:text-[#64B5F6]
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
                       <div className="flex flex-wrap items-center gap-3">
                            <span className="flex gap-[2px]">
                              {[1, 2, 3, 4, 5].map((item) => (
                                <Star
                                  key={item}
                                  size={13}
                                  fill="currentColor"
                                  strokeWidth={1.5}
                                  className="text-[#E5A91A]"
                                />
                              ))}
                            </span>

                            <strong className="text-[13px] text-[#26343C] dark:text-white">
                              {review.name}
                            </strong>
                          </div>

                          <span className="text-[11px] italic text-slate-400">
                            {review.date}
                          </span>
                        </div>

                        <p className="mt-4 text-[13px] leading-[1.85] text-slate-600 dark:text-slate-300">
                          {review.text}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          ADD REVIEW
      ===================================================== */}

      <section className="relative overflow-hidden bg-transparent pb-20 sm:pb-24">
        <div className="relative z-10 mx-auto max-w-[880px] px-5 sm:px-8">
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
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
            className="
              rounded-[30px]
              border
              border-white/80
              bg-white/65
              p-7
              shadow-[0_25px_70px_rgba(15,23,42,0.09)]
              backdrop-blur-2xl
              dark:border-white/[0.08]
              dark:bg-[#071B29]/82
              dark:shadow-[0_30px_80px_rgba(0,0,0,0.28)]
              sm:p-9
            "
          >
            <h2
              className="
                text-center
                font-serif
                text-[36px]
                font-medium
                tracking-[-0.03em]
                text-[#26343C]
                dark:text-white
                sm:text-[42px]
              "
            >
              Add a review
            </h2>

            <div
              className="
                mx-auto
                mt-4
                h-[3px]
                w-14
                rounded-full
                bg-gradient-to-r
                from-[#2196F3]
                to-[#D4A72C]
              "
            />

            <form onSubmit={handleSubmit} className="mt-9">
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

              <div className="mt-7">
                <label
                  htmlFor="review"
                  className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-600 dark:text-slate-300"
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
                    rounded-[18px]
                    border
                    border-slate-200/80
                    bg-white/65
                    p-4
                    text-sm
                    text-[#26343C]
                    outline-none
                    transition-all
                    duration-300
                    focus:border-[#2196F3]/50
                    focus:shadow-[0_0_0_4px_rgba(33,150,243,0.07)]
                    dark:border-white/10
                    dark:bg-[#0B2031]/70
                    dark:text-white
                  "
                />
              </div>

              {/* NAME EMAIL */}

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
                    required
                    className="
                      mt-2
                      h-12
                      w-full
                      rounded-[16px]
                      border
                      border-slate-200/80
                      bg-white/65
                      px-4
                      text-sm
                      text-[#26343C]
                      outline-none
                      transition-all
                      duration-300
                      focus:border-[#2196F3]/50
                      focus:shadow-[0_0_0_4px_rgba(33,150,243,0.07)]
                      dark:border-white/10
                      dark:bg-[#0B2031]/70
                      dark:text-white
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
                    required
                    className="
                      mt-2
                      h-12
                      w-full
                      rounded-[16px]
                      border
                      border-slate-200/80
                      bg-white/65
                      px-4
                      text-sm
                      text-[#26343C]
                      outline-none
                      transition-all
                      duration-300
                      focus:border-[#2196F3]/50
                      focus:shadow-[0_0_0_4px_rgba(33,150,243,0.07)]
                      dark:border-white/10
                      dark:bg-[#0B2031]/70
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
                <input type="checkbox" className="mt-[2px]" />

                <span>
                  Save my name, email, and website in this browser for the next
                  time I comment.
                </span>
              </label>

              {/* SUBMIT */}

              <div className="mt-8 text-center">
                <button
                  type="submit"
                  className="
                    min-h-[46px]
                    rounded-full
                    bg-[#2196F3]
                    px-8
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-white
                    shadow-[0_12px_30px_rgba(33,150,243,0.24)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-[#1976D2]
                  "
                >
                  Submit
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}