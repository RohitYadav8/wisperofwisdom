"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { AnimateIn } from "../animations/animate-in";
import { MagneticButton } from "../animations/magnetic-button";

const AMAZON_URL = "https://www.amazon.co.uk/dp/B0F5GXGHF8";

export function JourneySection() {
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setQuickViewOpen(false);
      }
    }

    if (quickViewOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [quickViewOpen]);

  return (
    <>
      {/* =====================================================
          JOURNEY SECTION
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#FAFAF7]
          py-16
          transition-colors
          duration-500

          dark:bg-[#041522]

          sm:py-20
          lg:py-24
        "
      >
        {/* BACKGROUND GLOW - LEFT */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-24
            top-1/3
            h-[320px]
            w-[320px]
            rounded-full
            bg-[#2196F3]/7
            blur-[110px]

            dark:bg-[#2196F3]/10
          "
        />

        {/* BACKGROUND GLOW - RIGHT */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-20
            bottom-10
            h-[300px]
            w-[300px]
            rounded-full
            bg-[#06466B]/7
            blur-[110px]

            dark:bg-[#2196F3]/8
          "
        />

        {/* MAIN CONTAINER */}

        <div
          className="
            relative
            z-10
            mx-auto
            grid
            max-w-[1450px]
            items-center
            gap-14
            px-5

            sm:px-8

            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-16
            lg:px-12

            xl:gap-20
            xl:px-16
          "
        >
          {/* =====================================================
              LEFT CONTENT
          ===================================================== */}

          <div>
            {/* EYEBROW */}

            <AnimateIn>
              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-[#2196F3]

                  sm:text-xs
                "
              >
                New Editions
              </p>
            </AnimateIn>

            {/* HEADING */}

            <AnimateIn delay={0.08}>
              <h2
                className="
                  mt-4
                  max-w-[590px]
                  font-serif
                  text-[42px]
                  font-normal
                  leading-[1.05]
                  tracking-[-0.035em]
                  text-[#273740]

                  dark:text-white

                  sm:text-[50px]
                  lg:text-[54px]
                  xl:text-[60px]
                "
              >
                The Journey of Whispers of Wisdom
              </h2>
            </AnimateIn>

            {/* BLUE LINE */}

            <AnimateIn delay={0.14}>
              <div
                className="
                  mt-6
                  h-[2px]
                  w-16
                  rounded-full
                  bg-[#2196F3]
                "
              />
            </AnimateIn>

            {/* DESCRIPTION */}

            <AnimateIn delay={0.2}>
              <p
                className="
                  mt-7
                  max-w-[610px]
                  text-[15px]
                  leading-[1.9]
                  text-slate-600

                  dark:text-slate-300

                  sm:text-[16px]
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
            </AnimateIn>

            {/* PRICE */}

            <AnimateIn delay={0.26}>
              <p
                className="
                  mt-7
                  font-serif
                  text-[42px]
                  leading-none
                  text-[#C8A46A]

                  dark:text-[#D9B978]

                  sm:text-[46px]
                "
              >
                £35.00
              </p>
            </AnimateIn>

            {/* BUTTONS */}

            <AnimateIn delay={0.32}>
              <div
                className="
                  mt-8
                  flex
                  flex-col
                  items-start
                  gap-4
                "
              >
                {/* QUICK VIEW */}

                <MagneticButton>
                  <button
                    type="button"
                    onClick={() => setQuickViewOpen(true)}
                    className="
                      inline-flex
                      min-h-[52px]
                      min-w-[190px]
                      cursor-pointer
                      items-center
                      justify-center

                      bg-[#2196F3]

                      px-7

                      text-[12px]
                      font-bold
                      uppercase
                      tracking-[0.09em]
                      text-white

                      shadow-[0_14px_30px_-16px_rgba(33,150,243,0.65)]

                      transition-all
                      duration-300

                      hover:-translate-y-[2px]
                      hover:bg-[#1976D2]

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#2196F3]
                      focus-visible:ring-offset-2
                      focus-visible:ring-offset-[#FAFAF7]

                      dark:bg-[#2196F3]
                      dark:hover:bg-[#42A5F5]
                      dark:focus-visible:ring-offset-[#041522]

                      sm:text-[13px]
                    "
                  >
                    Quick View
                  </button>
                </MagneticButton>

                {/* PURCHASE FROM AMAZON */}

                <MagneticButton>
                  <a
                    href={AMAZON_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex
                      min-h-[54px]
                      min-w-[280px]
                      items-center
                      justify-center

                      bg-[#2196F3]

                      px-8

                      text-[12px]
                      font-bold
                      uppercase
                      tracking-[0.08em]
                      text-white

                      shadow-[0_14px_30px_-16px_rgba(33,150,243,0.65)]

                      transition-all
                      duration-300

                      hover:-translate-y-[2px]
                      hover:bg-[#1976D2]

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#2196F3]
                      focus-visible:ring-offset-2
                      focus-visible:ring-offset-[#FAFAF7]

                      dark:bg-[#2196F3]
                      dark:hover:bg-[#42A5F5]
                      dark:focus-visible:ring-offset-[#041522]

                      sm:min-w-[360px]
                      sm:text-[13px]
                    "
                  >
                    Purchase From Amazon
                  </a>
                </MagneticButton>
              </div>
            </AnimateIn>
          </div>

          {/* =====================================================
              RIGHT BOOK IMAGE
          ===================================================== */}

          <AnimateIn direction="left">
            <div
              className="
                relative
                flex
                min-h-[400px]
                w-full
                items-center
                justify-center

                sm:min-h-[470px]

                lg:min-h-[540px]
                lg:justify-end

                xl:min-h-[580px]
              "
            >
              {/* BOOK GLOW */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/2
                  h-[70%]
                  w-[80%]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-[#2196F3]/7
                  blur-[90px]

                  dark:bg-[#2196F3]/10
                "
              />

              {/* BOOKS IMAGE */}

              <motion.div
                animate={{
                  y: [0, -7, 0],
                }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  relative
                  h-[360px]
                  w-full
                  max-w-[620px]

                  sm:h-[430px]
                  sm:max-w-[680px]

                  lg:h-[500px]
                  lg:max-w-[720px]

                  xl:h-[540px]
                  xl:max-w-[760px]
                "
              >
                <Image
                  src="/books.png"
                  alt="Whispers of Wisdom book editions"
                  fill
                  sizes="(max-width: 640px) 95vw, (max-width: 1024px) 85vw, 760px"
                  className="
                    object-contain
                    object-center
                  "
                />
              </motion.div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* =====================================================
          QUICK VIEW MODAL
      ===================================================== */}

      <AnimatePresence>
        {quickViewOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            onMouseDown={() => setQuickViewOpen(false)}
            className="
              fixed
              inset-0
              z-[9999]

              flex
              items-center
              justify-center

              bg-black/65

              px-4
              py-8

              backdrop-blur-[3px]
            "
          >
            {/* MODAL */}

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="quick-view-title"
              initial={{
                opacity: 0,
                y: 35,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.97,
              }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseDown={(event) => event.stopPropagation()}
              className="
                relative
                max-h-[90vh]
                w-full
                max-w-[820px]
                overflow-y-auto

                bg-white

                shadow-[0_30px_100px_rgba(0,0,0,0.35)]

                dark:bg-[#0B2031]
                dark:shadow-[0_30px_100px_rgba(0,0,0,0.6)]
              "
            >
              {/* CLOSE BUTTON */}

              <button
                type="button"
                onClick={() => setQuickViewOpen(false)}
                aria-label="Close quick view"
                className="
                  absolute
                  right-3
                  top-3
                  z-30

                  flex
                  h-9
                  w-9
                  cursor-pointer
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-slate-200

                  bg-white/90

                  text-slate-600

                  shadow-sm

                  backdrop-blur

                  transition-all
                  duration-200

                  hover:border-slate-300
                  hover:bg-slate-100
                  hover:text-slate-900

                  dark:border-white/10
                  dark:bg-[#061522]/90
                  dark:text-slate-300

                  dark:hover:bg-[#10283a]
                  dark:hover:text-white
                "
              >
                <X size={17} />
              </button>

              {/* =================================================
                  MODAL CONTENT
              ================================================= */}

              <div
                className="
                  grid
                  grid-cols-1

                  md:grid-cols-[0.85fr_1.15fr]
                "
              >
                {/* LEFT BOOK IMAGE */}

                <div
                  className="
                    relative
                    flex
                    min-h-[320px]
                    items-center
                    justify-center

                    bg-[#F7F6F1]

                    p-8

                    dark:bg-[#061522]
                  "
                >
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="
                      relative
                      h-[280px]
                      w-full
                      max-w-[240px]

                      sm:h-[330px]
                    "
                  >
                    <Image
                      src="/books.png"
                      alt="The Journey of Whispers of Wisdom"
                      fill
                      sizes="240px"
                      className="
                        object-contain
                        object-center
                      "
                    />
                  </motion.div>
                </div>

                {/* RIGHT DETAILS */}

                <div
                  className="
                    flex
                    flex-col

                    p-7

                    sm:p-9
                    md:p-10
                  "
                >
                  {/* EYEBROW */}

                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.24em]
                      text-[#2196F3]
                    "
                  >
                    New Editions
                  </p>

                  {/* TITLE */}

                  <h3
                    id="quick-view-title"
                    className="
                      mt-3

                      font-serif

                      text-[32px]
                      font-normal

                      leading-[1.08]

                      tracking-[-0.03em]

                      text-[#26343c]

                      dark:text-white

                      sm:text-[38px]
                    "
                  >
                    The Journey of Whispers of Wisdom
                  </h3>

                  {/* PRICE */}

                  <p
                    className="
                      mt-4

                      font-serif

                      text-[27px]

                      text-[#C8A46A]

                      dark:text-[#D9B978]
                    "
                  >
                    £35.00
                  </p>

                  {/* DIVIDER */}

                  <div
                    className="
                      my-6
                      h-px
                      w-full

                      bg-slate-200

                      dark:bg-white/10
                    "
                  />

                  {/* DESCRIPTION */}

                  <p
                    className="
                      text-[14px]
                      leading-[1.8]
                      text-slate-600

                      dark:text-slate-300
                    "
                  >
                    Embarking on the journey of entrepreneurship can feel both
                    exciting and overwhelming. As you face the challenges and
                    opportunities ahead, having a trustworthy guide can make all
                    the difference. That&apos;s where &quot;Whispers of
                    Wisdom&quot; steps in – it&apos;s a comprehensive handbook
                    crafted to empower entrepreneurs like yourself to turn your
                    dreams into reality and achieve lasting success in the
                    competitive world of business.
                  </p>

                  {/* PRODUCT META */}

                  <div
                    className="
                      mt-7

                      border-t
                      border-slate-200

                      pt-5

                      dark:border-white/10
                    "
                  >
                    <div
                      className="
                        grid
                        grid-cols-[90px_1fr]
                        gap-y-3

                        text-[12px]
                      "
                    >
                      <span
                        className="
                          font-semibold
                          uppercase
                          tracking-[0.08em]
                          text-slate-400
                        "
                      >
                        Author
                      </span>

                      <span
                        className="
                          text-slate-700

                          dark:text-slate-200
                        "
                      >
                        Santosh Kumar
                      </span>

                      <span
                        className="
                          font-semibold
                          uppercase
                          tracking-[0.08em]
                          text-slate-400
                        "
                      >
                        Title
                      </span>

                      <span
                        className="
                          text-slate-700

                          dark:text-slate-200
                        "
                      >
                        Whispers of Wisdom
                      </span>
                    </div>
                  </div>

                  {/* AMAZON BUTTON */}

                  <div className="mt-8">
                    <a
                      href={AMAZON_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex

                        min-h-[52px]
                        w-full

                        items-center
                        justify-center

                        bg-[#2196F3]

                        px-7

                        text-[12px]
                        font-bold
                        uppercase

                        tracking-[0.1em]

                        text-white

                        shadow-[0_14px_30px_-16px_rgba(33,150,243,0.65)]

                        transition-all
                        duration-300

                        hover:-translate-y-[2px]
                        hover:bg-[#1976D2]

                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[#2196F3]
                        focus-visible:ring-offset-2
                        focus-visible:ring-offset-white

                        dark:hover:bg-[#42A5F5]
                        dark:focus-visible:ring-offset-[#0B2031]
                      "
                    >
                      Purchase From Amazon
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}