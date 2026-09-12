"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Share2, X as CloseIcon } from "lucide-react";

const socialLinks = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/people/Whispers-of-Wisdom/61575102369893/",
    x: -72,
    y: -155,
    icon: <FacebookIcon />,
  },
  {
    id: "twitter",
    label: "X / Twitter",
    href: "https://x.com/wisdom6837",
    x: -128,
    y: -105,
    icon: <XIcon />,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/whispersofwisdom78/",
    x: -138,
    y: -35,
    icon: <InstagramIcon />,
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/channel/UC_x6Q4PjN52uNJ4udmN4qKA",
    x: -80,
    y: 22,
    icon: <YoutubeIcon />,
  },
];

export function FloatingConnect() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-7 right-5 z-[100] sm:bottom-9 sm:right-8">
      <div className="relative h-[64px] w-[64px]">
        {/* SOCIAL ICONS */}

        <AnimatePresence>
          {open &&
            socialLinks.map((social, index) => (
              <motion.div
                key={social.id}
                initial={{
                  opacity: 0,
                  x: 0,
                  y: 0,
                  scale: 0.3,
                }}
                animate={{
                  opacity: 1,
                  x: social.x,
                  y: social.y,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: 0,
                  y: 0,
                  scale: 0.3,
                }}
                transition={{
                  duration: 0.38,
                  delay: index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute left-[6px] top-[6px]"
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  onClick={() => setOpen(false)}
                  className="
                    group
                    relative
                    flex
                    h-[52px]
                    w-[52px]
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/50
                    bg-gradient-to-br
                    from-[#7048E8]
                    via-[#6547DF]
                    to-[#4F7FE7]
                    text-white
                    shadow-[0_12px_28px_rgba(91,70,210,0.30)]
                    transition-all
                    duration-300

                    hover:scale-110
                    hover:shadow-[0_16px_34px_rgba(91,70,210,0.45)]

                    dark:border-white/15
                  "
                >
                  {social.icon}

                  {/* TOOLTIP */}

                  <span
                    className="
                      pointer-events-none
                      absolute
                      right-[62px]
                      whitespace-nowrap
                      rounded-lg
                      bg-[#0F172A]
                      px-3
                      py-1.5
                      text-[11px]
                      font-medium
                      text-white
                      opacity-0
                      shadow-lg
                      transition-all
                      duration-200

                      group-hover:-translate-x-1
                      group-hover:opacity-100

                      dark:bg-white
                      dark:text-[#0F172A]
                    "
                  >
                    {social.label}
                  </span>
                </a>
              </motion.div>
            ))}
        </AnimatePresence>

        {/* GLOW */}

        <motion.div
          aria-hidden="true"
          animate={{
            scale: open ? 1.4 : 1,
            opacity: open ? 0.3 : 0.16,
          }}
          className="
            pointer-events-none
            absolute
            inset-[-12px]
            rounded-full
            bg-violet-500
            blur-xl
          "
        />

        {/* MAIN BUTTON */}

        <motion.button
          type="button"
          aria-label={open ? "Close social links" : "Open social links"}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="
            relative
            z-20
            flex
            h-[64px]
            w-[64px]
            items-center
            justify-center
            overflow-hidden
            rounded-full
            border
            border-white/60
            bg-gradient-to-br
            from-[#7048E8]
            via-[#6947E2]
            to-[#39A7EA]
            text-white
            shadow-[0_18px_45px_rgba(97,70,220,0.38)]

            dark:border-white/15
          "
        >
          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[radial-gradient(circle_at_28%_22%,rgba(255,255,255,0.35),transparent_36%)]
            "
          />

          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{
                  opacity: 0,
                  rotate: -90,
                  scale: 0.5,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotate: 90,
                  scale: 0.5,
                }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                <CloseIcon size={27} strokeWidth={2} />
              </motion.span>
            ) : (
              <motion.span
                key="share"
                initial={{
                  opacity: 0,
                  rotate: 90,
                  scale: 0.5,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotate: -90,
                  scale: 0.5,
                }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                <Share2 size={25} strokeWidth={2} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* PULSE */}

        {!open && (
          <motion.span
            aria-hidden="true"
            animate={{
              scale: [1, 1.5],
              opacity: [0.4, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-full
              border
              border-violet-400/50
            "
          />
        )}
      </div>
    </div>
  );
}

/* ============================================================
   FACEBOOK
============================================================ */

function FacebookIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.5 22v-9h3l.5-3.5h-3.5V7.25c0-1 .28-1.75 1.78-1.75H17V2.14C16.7 2.1 15.65 2 14.4 2 11.8 2 10 3.58 10 6.5v3H7V13h3v9h3.5Z" />
    </svg>
  );
}

/* ============================================================
   X / TWITTER
============================================================ */

function XIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2H21.552L14.325 10.26L22.827 22H16.17L10.956 15.183L4.99 22H1.68L9.413 13.165L1.254 2H8.08L12.793 8.231L18.244 2ZM17.083 19.932H18.916L7.084 3.96H5.117L17.083 19.932Z" />
    </svg>
  );
}

/* ============================================================
   INSTAGRAM
============================================================ */

function InstagramIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

/* ============================================================
   YOUTUBE
============================================================ */

function YoutubeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23 12s0-3.4-.44-5.03a3 3 0 0 0-2.12-2.12C18.8 4.4 12 4.4 12 4.4s-6.8 0-8.44.45a3 3 0 0 0-2.12 2.12C1 8.6 1 12 1 12s0 3.4.44 5.03a3 3 0 0 0 2.12 2.12c1.64.45 8.44.45 8.44.45s6.8 0 8.44-.45a3 3 0 0 0 2.12-2.12C23 15.4 23 12 23 12Zm-13.2 3.2V8.8l5.6 3.2-5.6 3.2Z" />
    </svg>
  );
}