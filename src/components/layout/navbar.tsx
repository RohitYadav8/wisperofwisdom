"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Search,
  UserRound,
  X,
  ArrowUpRight,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { ThemeToggle } from "../ui/theme-toggle";

const navigation = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about-us",
  },
  {
    label: "Journal",
    href: "/journal",
  },
  {
    label: "Shop",
    href: "/shop",
  },
  {
    label: "Challenge",
    href: "/10-day-email-challenge",
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
];

export function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // =========================================================
  // SCROLL
  // =========================================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =========================================================
  // CLOSE MOBILE MENU ON ROUTE CHANGE
  // =========================================================

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // =========================================================
  // LOCK BODY SCROLL
  // =========================================================

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // =========================================================
  // ESCAPE KEY
  // =========================================================

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    if (mobileOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  // =========================================================
  // ACTIVE LINK
  // =========================================================

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <motion.header
        initial={{
          y: -80,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`
          sticky
          top-0
          z-[100]
          w-full
          border-b
          transition-all
          duration-300

          ${
            scrolled
              ? `
                border-white/[0.08]
                bg-[#071725]/95
                shadow-[0_12px_45px_rgba(0,0,0,0.25)]
                backdrop-blur-2xl
              `
              : `
                border-white/[0.06]
                bg-[#071725]
              `
          }

          dark:bg-[#071725]
        `}
      >
        {/* =====================================================
            NAVBAR INNER
        ====================================================== */}

        <motion.div
          animate={{
            height: scrolled ? 72 : 88,
          }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto
            flex
            w-full
            max-w-[1500px]
            items-center
            px-5
            sm:px-8
            lg:px-10
            xl:px-14
          "
        >
          {/* =================================================
              MOBILE HAMBURGER
          ================================================== */}

          <motion.button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            whileTap={{
              scale: 0.9,
            }}
            className="
              mr-3
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              text-white
              transition-all
              duration-300
              hover:border-[#2196F3]/50
              hover:bg-[#2196F3]/10
              hover:text-[#42A5F5]

              lg:hidden
            "
          >
            <Menu size={21} strokeWidth={1.7} />
          </motion.button>

          {/* =================================================
              LOGO
          ================================================== */}

          <motion.div
            whileHover={{
              scale: 1.025,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="shrink-0"
          >
            <Link
              href="/"
              aria-label="Whispers of Wisdom Home"
              className="
                flex
                items-center
                justify-center
              "
            >
              {/* LIGHT LOGO */}

              <Image
                src="/logo-dark.png"
                alt="Whispers of Wisdom"
                width={190}
                height={90}
                priority
                className={`
                  h-auto
                  object-contain
                  transition-all
                  duration-300

                  ${
                    scrolled
                      ? "w-[92px] sm:w-[100px]"
                      : "w-[100px] sm:w-[110px]"
                  }
                `}
              />
            </Link>
          </motion.div>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================== */}

          <nav
            className="
              ml-auto
              flex
              items-center
              gap-1
              lg:gap-2
              xl:gap-4
            "
          >
            {navigation.map((item, index) => {
              const active = isActiveLink(item.href);

              return (
                <motion.div
                  key={item.href}
                  initial={{
                    opacity: 0,
                    y: -8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.05 + index * 0.04,
                    duration: 0.4,
                  }}
                  className="hidden lg:block"
                >
                  <Link
                    href={item.href}
                    className={`
                      group
                      relative
                      flex
                      items-center
                      px-3
                      py-4
                      text-[12px]
                      font-semibold
                      uppercase
                      tracking-[0.055em]
                      transition-colors
                      duration-300
                      xl:px-4
                      xl:text-[13px]

                      ${
                        active
                          ? "text-white"
                          : "text-slate-300 hover:text-white"
                      }
                    `}
                  >
                    {/* TOP DOT */}

                    <span
                      className={`
                        absolute
                        -top-0.5
                        left-1/2
                        h-1
                        w-1
                        -translate-x-1/2
                        rounded-full
                        bg-[#2196F3]
                        transition-all
                        duration-300

                        ${
                          active
                            ? "scale-100 opacity-100"
                            : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                        }
                      `}
                    />

                    {item.label}

                    {/* UNDERLINE */}

                    <span
                      className={`
                        absolute
                        bottom-1.5
                        left-3
                        right-3
                        h-[1.5px]
                        origin-left
                        rounded-full
                        bg-[#2196F3]
                        transition-transform
                        duration-300
                        xl:left-4
                        xl:right-4

                        ${
                          active
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }
                      `}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* =================================================
              DESKTOP ACTIONS
          ================================================== */}

          <div
            className="
              ml-4
              hidden
              items-center
              gap-1
              border-l
              border-white/10
              pl-4
              lg:flex
              xl:ml-5
              xl:pl-5
            "
          >
            {/* SEARCH */}

            <motion.button
              type="button"
              aria-label="Search"
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.9,
              }}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                text-slate-300
                transition-all
                duration-300
                hover:bg-white/[0.06]
                hover:text-white
              "
            >
              <Search
                size={19}
                strokeWidth={1.7}
              />
            </motion.button>

            {/* ACCOUNT */}

            <motion.div
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.9,
              }}
            >
              <Link
                href="/account"
                aria-label="My Account"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  text-slate-300
                  transition-all
                  duration-300
                  hover:bg-white/[0.06]
                  hover:text-white
                "
              >
                <UserRound
                  size={19}
                  strokeWidth={1.7}
                />
              </Link>
            </motion.div>

            {/* THEME */}

            <div
              className="
                ml-1
                border-l
                border-white/10
                pl-2
              "
            >
              <ThemeToggle />
            </div>
          </div>

          {/* =================================================
              MOBILE ACTIONS
          ================================================== */}

          <div
            className="
              ml-auto
              flex
              items-center
              gap-0.5
              lg:hidden
            "
          >
            {/* SEARCH */}

            <motion.button
              type="button"
              aria-label="Search"
              whileTap={{
                scale: 0.9,
              }}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                text-slate-300
                transition-colors
                hover:bg-white/[0.06]
                hover:text-white
              "
            >
              <Search
                size={18}
                strokeWidth={1.7}
              />
            </motion.button>

            {/* ACCOUNT */}

            <Link
              href="/account"
              aria-label="My Account"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                text-slate-300
                transition-colors
                hover:bg-white/[0.06]
                hover:text-white
              "
            >
              <UserRound
                size={18}
                strokeWidth={1.7}
              />
            </Link>

            {/* THEME */}

            <ThemeToggle />
          </div>
        </motion.div>
      </motion.header>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* =================================================
                OVERLAY
            ================================================== */}

            <motion.button
              type="button"
              aria-label="Close navigation"
              onClick={() => setMobileOpen(false)}
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
              className="
                fixed
                inset-0
                z-[200]
                bg-black/60
                backdrop-blur-sm
              "
            />

            {/* =================================================
                MOBILE DRAWER
            ================================================== */}

            <motion.aside
              initial={{
                x: "-100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "-100%",
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                fixed
                left-0
                top-0
                z-[210]
                flex
                h-[100dvh]
                w-[88%]
                max-w-[390px]
                flex-col
                overflow-y-auto
                border-r
                border-white/10
                bg-[#071725]
                shadow-[15px_0_50px_rgba(0,0,0,0.4)]
              "
            >
              {/* =================================================
                  DRAWER HEADER
              ================================================== */}

              <div
                className="
                  flex
                  h-[90px]
                  shrink-0
                  items-center
                  justify-between
                  border-b
                  border-white/10
                  px-6
                "
              >
                {/* LOGO */}

                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Whispers of Wisdom Home"
                  className="flex items-center"
                >
                  <Image
                    src="/logo-dark-1.png"
                    alt="Whispers of Wisdom"
                    width={150}
                    height={80}
                    priority
                    className="
                      h-auto
                      w-[105px]
                      object-contain
                    "
                  />
                </Link>

                {/* CLOSE */}

                <motion.button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  whileHover={{
                    rotate: 90,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  aria-label="Close menu"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    text-slate-300
                    transition-all
                    duration-300
                    hover:border-[#2196F3]/50
                    hover:bg-[#2196F3]/10
                    hover:text-white
                  "
                >
                  <X
                    size={19}
                    strokeWidth={1.7}
                  />
                </motion.button>
              </div>

              {/* =================================================
                  MOBILE LINKS
              ================================================== */}

              <motion.nav
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.07,
                    },
                  },
                }}
                className="
                  px-6
                  pt-5
                "
              >
                {navigation.map((item) => {
                  const active = isActiveLink(item.href);

                  return (
                    <motion.div
                      key={item.href}
                      variants={{
                        hidden: {
                          opacity: 0,
                          x: -20,
                        },
                        show: {
                          opacity: 1,
                          x: 0,
                        },
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`
                          group
                          flex
                          items-center
                          justify-between
                          border-b
                          border-white/[0.08]
                          py-5
                          text-[14px]
                          font-semibold
                          uppercase
                          tracking-[0.07em]
                          transition-all
                          duration-300

                          ${
                            active
                              ? "text-[#42A5F5]"
                              : "text-slate-300 hover:pl-2 hover:text-white"
                          }
                        `}
                      >
                        <span>{item.label}</span>

                        <ArrowUpRight
                          size={16}
                          strokeWidth={1.6}
                          className={`
                            transition-all
                            duration-300

                            ${
                              active
                                ? "translate-x-0 opacity-100"
                                : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                            }
                          `}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>

              {/* =================================================
                  DRAWER FOOTER
              ================================================== */}

              <div
                className="
                  mt-auto
                  border-t
                  border-white/[0.08]
                  px-6
                  py-7
                "
              >
                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-[#42A5F5]
                  "
                >
                  Whispers of Wisdom
                </p>

                <p
                  className="
                    mt-2
                    max-w-[260px]
                    text-xs
                    leading-5
                    text-slate-400
                  "
                >
                  Explore ideas, stories and wisdom.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}