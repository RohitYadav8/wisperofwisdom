"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Mail, MapPin, Phone } from "lucide-react";

import { TestimonialsSection } from "../../components/home/testimonials-section";
import { CommunitySection } from "../../components/home/community-section";
import { StatsSection } from "../../components/home/stats-section";

const aboutDescription = `
The book navigates through foundational elements, strategic blueprints, and
fundamental building blocks, emphasizing preparation, survival, and sustainable
growth. From the initial entrepreneurial journey to market sustainability and
celebrating success, it delves into scaling, diversification, and continuous
improvement. Sections on personal growth, challenges, positivity, and purpose
enrich the entrepreneurial spirit. Culminating in planning for the future,
succession, mentorship, and a commitment to excellence, the book serves as a
holistic compass for entrepreneurs seeking enduring success and significance.
It encapsulates the transformative process of translating one's vision or
entrepreneurial aspirations into tangible success and achievement. This journey
involves strategic planning, goal setting, adaptability, overcoming challenges,
sustaining growth, and ultimately achieving personal and professional
fulfillment. It provides a roadmap where entrepreneurs not only conceptualize
their vision but actively work towards realizing it, navigating obstacles and
celebrating victories along the way.
`;

export default function AboutPage() {
  return (
    <div
      className="
        overflow-hidden
        bg-[#FAFAF7]
        text-[#26343C]
        transition-colors
        duration-500

        dark:bg-[#041522]
        dark:text-white
      "
    >
      {/* =====================================================
          ABOUT INTRO
      ===================================================== */}
      <section
        className="
          relative
          overflow-hidden
          bg-[#F7FAFC]
          py-14
          transition-colors
          duration-500

          dark:bg-[#041522]

          sm:py-16
          lg:py-20
        "
      >
        {/* BACKGROUND GRID */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.035]

            dark:opacity-[0.055]
          "
          style={{
            backgroundImage:
              "linear-gradient(to right, #2196F3 1px, transparent 1px), linear-gradient(to bottom, #2196F3 1px, transparent 1px)",
            backgroundSize: "58px 58px",
          }}
        />

        {/* TOP GLOW */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[-260px]
            h-[560px]
            w-[760px]
            -translate-x-1/2
            rounded-full
            bg-[#2196F3]/10
            blur-[150px]

            dark:bg-[#2196F3]/18
          "
        />

        {/* LEFT GLOW */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-44
            top-[250px]
            h-[440px]
            w-[440px]
            rounded-full
            bg-cyan-400/10
            blur-[140px]

            dark:bg-cyan-400/[0.08]
          "
        />

        {/* RIGHT GLOW */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-44
            bottom-0
            h-[440px]
            w-[440px]
            rounded-full
            bg-[#2196F3]/10
            blur-[140px]

            dark:bg-[#2196F3]/10
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-[1240px]
            px-5

            sm:px-8
            lg:px-12
          "
        >
          {/* MAIN PREMIUM PANEL */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.985,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              overflow-hidden
              rounded-[32px]
              border
              border-white/90
              bg-white/80
              px-6
              py-11

              shadow-[0_25px_80px_rgba(15,23,42,0.12)]

              backdrop-blur-xl

              dark:border-white/10
              dark:bg-[#071B29]/85
              dark:shadow-[0_32px_100px_rgba(0,0,0,0.45)]

              sm:px-10
              sm:py-14

              lg:px-16
              lg:py-16
            "
          >
            {/* TOP LIGHT */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-1/2
                top-[-220px]
                h-[430px]
                w-[650px]
                -translate-x-1/2
                rounded-full
                bg-[#2196F3]/8
                blur-[115px]

                dark:bg-[#2196F3]/14
              "
            />

            {/* TOP EDGE */}
            <div
              aria-hidden="true"
              className="
                absolute
                left-1/2
                top-0
                h-px
                w-[55%]
                -translate-x-1/2
                bg-gradient-to-r
                from-transparent
                via-[#2196F3]/70
                to-transparent
              "
            />

            {/* SIDE DECORATION */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -left-24
                top-1/2
                h-56
                w-56
                -translate-y-1/2
                rounded-full
                border
                border-[#2196F3]/10

                dark:border-[#2196F3]/10
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-20
                top-[18%]
                h-44
                w-44
                rounded-full
                border
                border-[#2196F3]/10

                dark:border-[#2196F3]/10
              "
            />

            <div className="relative z-10">
             

              {/* HEADING */}
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 22,
                  filter: "blur(6px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 0.75,
                  delay: 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  mx-auto
                  mt-7
                  max-w-[1000px]
                  text-center
                  font-serif
                  text-[35px]
                  font-normal
                  leading-[1.06]
                  tracking-[-0.04em]
                  text-[#1E293B]

                  dark:text-white

                  sm:text-[46px]
                  lg:text-[58px]
                "
              >
                Welcome To Whispers Of Wisdom
              </motion.h1>

              {/* SUB TITLE */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 14,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                }}
                className="
                  mt-7
                  flex
                  items-center
                  justify-center
                  gap-4

                  sm:gap-6
                "
              >
                <span
                  className="
                    h-px
                    w-10
                    bg-gradient-to-r
                    from-transparent
                    to-[#2196F3]/70

                    sm:w-20
                  "
                />

                <p
                  className="
                    text-center
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.38em]
                    text-[#2196F3]

                    sm:text-[13px]
                  "
                >
                  Unlocking The Path
                </p>

                <span
                  className="
                    h-px
                    w-10
                    bg-gradient-to-l
                    from-transparent
                    to-[#2196F3]/70

                    sm:w-20
                  "
                />
              </motion.div>

              {/* DESCRIPTION PANEL */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.27,
                }}
                className="
                  relative
                  mx-auto
                  mt-10
                  max-w-[900px]
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-slate-200/80
                  bg-white/65
                  px-6
                  py-7

                  shadow-[0_18px_55px_rgba(15,23,42,0.07)]

                  dark:border-white/[0.08]
                  dark:bg-white/[0.035]
                  dark:shadow-[0_20px_60px_rgba(0,0,0,0.22)]

                  sm:px-9
                  sm:py-8
                "
              >
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-[-100px]
                    h-[180px]
                    w-[400px]
                    -translate-x-1/2
                    rounded-full
                    bg-[#2196F3]/5
                    blur-[80px]

                    dark:bg-[#2196F3]/7
                  "
                />

                <p
                  className="
                    relative
                    z-10
                    whitespace-pre-line
                    text-center
                    text-[14px]
                    leading-[1.9]
                    text-slate-600

                    dark:text-slate-300

                    sm:text-[15px]
                    lg:text-[16px]
                  "
                >
                  {aboutDescription}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* =====================================================
              YOUTUBE VIDEO
          ===================================================== */}
          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              mx-auto
              mt-14
              max-w-[980px]
              overflow-hidden
              rounded-[28px]
              border
              border-slate-200/80
              bg-white
              p-[5px]

              shadow-[0_28px_80px_rgba(15,23,42,0.14)]

              dark:border-white/10
              dark:bg-[#0B2031]
              dark:shadow-[0_32px_90px_rgba(0,0,0,0.40)]

              sm:mt-16
            "
          >
            <div
              className="
                relative
                aspect-video
                w-full
                overflow-hidden
                rounded-[23px]
              "
            >
              <iframe
                src="https://www.youtube.com/embed/VDOcrXhYNbs?start=21"
                title="How to Make a Deal - Santosh on Baljinder Speaks Business"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                "
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          BOOK + CONTACT
      ===================================================== */}
      <section
        className="
          relative
          overflow-hidden
          bg-white
          py-16
          transition-colors
          duration-500

          dark:bg-[#061522]

          sm:py-20
          lg:py-24
        "
      >
        {/* BACKGROUND GLOW */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-40
            top-1/2
            h-[400px]
            w-[400px]
            -translate-y-1/2
            rounded-full
            bg-[#2196F3]/5
            blur-[130px]

            dark:bg-[#2196F3]/7
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            grid
            max-w-[1180px]
            items-center
            gap-14
            px-5

            sm:px-8

            lg:grid-cols-[1fr_0.9fr]
            lg:px-12
          "
        >
          {/* BOOKS */}
          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
            }}
            className="
              grid
              grid-cols-2
              items-end
              gap-5

              sm:gap-8
            "
          >
            <motion.div
              whileHover={{
                y: -8,
                rotate: -1,
              }}
              transition={{
                duration: 0.3,
              }}
              className="
                relative
                aspect-[4/5]
                overflow-hidden
                rounded-[24px]
                border
                border-slate-200/70
                bg-[#F7FBFE]
                p-5

                shadow-[0_20px_60px_rgba(15,23,42,0.08)]

                dark:border-white/10
                dark:bg-[#0B2031]
                dark:shadow-[0_20px_60px_rgba(0,0,0,0.20)]
              "
            >
              <Image
                src="/book-2.png"
                alt="Whispers of Wisdom"
                fill
                sizes="(max-width: 1024px) 45vw, 280px"
                className="
                  object-contain
                  p-5
                "
              />
            </motion.div>

            <motion.div
              whileHover={{
                y: -8,
                rotate: 1,
              }}
              transition={{
                duration: 0.3,
              }}
              className="
                relative
                aspect-[4/5]
                overflow-hidden
                rounded-[24px]
                border
                border-slate-200/70
                bg-[#F7FBFE]
                p-5

                shadow-[0_20px_60px_rgba(15,23,42,0.08)]

                dark:border-white/10
                dark:bg-[#0B2031]
                dark:shadow-[0_20px_60px_rgba(0,0,0,0.20)]
              "
            >
              <Image
                src="/book-3.png"
                alt="Whispers of Wisdom"
                fill
                sizes="(max-width: 1024px) 45vw, 280px"
                className="
                  object-contain
                  p-5
                "
              />
            </motion.div>
          </motion.div>

          {/* CONTACT INFO */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
            }}
            className="
              rounded-[26px]
              border
              border-slate-200/80
              bg-[#FAFCFE]
              p-7

              shadow-[0_20px_65px_rgba(15,23,42,0.07)]

              dark:border-white/10
              dark:bg-[#0B2031]
              dark:shadow-[0_24px_70px_rgba(0,0,0,0.24)]

              sm:p-9
            "
          >
            <p
              className="
                text-[13px]
                uppercase
                leading-[1.9]
                tracking-[0.06em]
                text-slate-600

                dark:text-slate-300
              "
            >
              Whispers Of Wisdom is a book written for entrepreneurial
              odyssey that unfolds as an invaluable guide, combining the
              author&apos;s personal narrative with profound wisdom from
              mentors.
            </p>

            <div
              className="
                mt-8
                h-[2px]
                w-10
                rounded-full
                bg-[#2196F3]
              "
            />

            <div className="mt-8 space-y-7">
              {/* ADDRESS */}
              <div
                className="
                  flex
                  items-start
                  gap-4
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-[14px]
                    bg-[#2196F3]/10
                    text-[#2196F3]

                    dark:bg-[#2196F3]/15
                  "
                >
                  <MapPin size={18} />
                </div>

                <div>
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-slate-400
                    "
                  >
                    Address
                  </p>

                  <p
                    className="
                      mt-2
                      text-[14px]
                      leading-6
                      text-slate-600

                      dark:text-slate-300
                    "
                  >
                    Level 30, The Leadenhall Building, 122 Leadenhall St,
                    London EC3V 4AB
                  </p>
                </div>
              </div>

              {/* PHONE */}
              <div
                className="
                  flex
                  items-start
                  gap-4
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-[14px]
                    bg-[#2196F3]/10
                    text-[#2196F3]

                    dark:bg-[#2196F3]/15
                  "
                >
                  <Phone size={18} />
                </div>

                <div>
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-slate-400
                    "
                  >
                    Phone
                  </p>

                  <p
                    className="
                      mt-2
                      text-[14px]
                      text-slate-600

                      dark:text-slate-300
                    "
                  >
                    Mobile: (+44) - 7454 - 675398
                  </p>
                </div>
              </div>

              {/* EMAIL */}
              <div
                className="
                  flex
                  items-start
                  gap-4
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-[14px]
                    bg-[#2196F3]/10
                    text-[#2196F3]

                    dark:bg-[#2196F3]/15
                  "
                >
                  <Mail size={18} />
                </div>

                <div>
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-slate-400
                    "
                  >
                    Email
                  </p>

                  <a
                    href="mailto:hello@whispersofwisdom.co.uk"
                    className="
                      mt-2
                      inline-block
                      text-[14px]
                      text-slate-600
                      transition-colors

                      hover:text-[#2196F3]

                      dark:text-slate-300
                      dark:hover:text-[#42A5F5]
                    "
                  >
                    hello@whispersofwisdom.co.uk
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          EXISTING REUSED COMPONENTS
      ===================================================== */}
      <TestimonialsSection />

      <CommunitySection />

      <StatsSection />
    </div>
  );
}