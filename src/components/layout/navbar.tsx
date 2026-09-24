"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, UserRound, X } from "lucide-react";
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
  // SCROLL STATE
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
  // PREVENT BODY SCROLL WHEN MOBILE MENU IS OPEN
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
  // ESCAPE KEY CLOSE
  // =========================================================

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    if (mobileOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileOpen]);

  return (
    <>
      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <motion.header
        initial={{
          y: -90,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`
          sticky
          top-0
          z-50
          w-full
          border-b
          backdrop-blur-xl
          transition-[background-color,border-color,box-shadow]
          duration-300

          ${
            scrolled
              ? `
                border-slate-200/80
                bg-white/95
                shadow-[0_10px_40px_rgba(15,23,42,0.07)]
                dark:border-white/10
                dark:bg-[#071725]/95
                dark:shadow-[0_10px_40px_rgba(0,0,0,0.22)]
              `
              : `
                border-slate-200/60
                bg-white/90
                dark:border-white/10
                dark:bg-[#071725]/90
              `
          }
        `}
      >
        {/* =====================================================
            NAVBAR INNER
        ====================================================== */}

        <motion.div
          animate={{
            height: scrolled ? 76 : 88,
          }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto
            flex
            max-w-[1500px]
            items-center
            gap-4
            px-5
            sm:px-8
            lg:px-10
            xl:px-12
          "
        >
          {/* =================================================
              MOBILE HAMBURGER
          ================================================== */}

          <motion.button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            whileHover={{
              scale: 1.06,
            }}
            whileTap={{
              scale: 0.92,
            }}
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              text-slate-700
              transition-colors
              hover:bg-slate-100
              hover:text-[#2196F3]
              dark:text-white
              dark:hover:bg-white/5
              dark:hover:text-[#42A5F5]

              lg:hidden
            "
          >
            <Menu size={22} strokeWidth={1.8} />
          </motion.button>

          {/* =================================================
              LOGO
          ================================================== */}

          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="
              ml-1
              shrink-0
              sm:ml-2
            "
          >
            <Link
              href="/"
              aria-label="Whispers of Wisdom Home"
              className="
                relative
                flex
                items-center
                justify-center
              "
            >
              {/* LIGHT THEME LOGO */}

              <Image
                src="/Wispers-of-Wisdom-logo.png"
                alt="Whispers of Wisdom"
                width={190}
                height={90}
                priority
                className={`
                  h-auto
                  object-contain
                  transition-all
                  duration-300
                  dark:hidden

                  ${
                    scrolled
                      ? "w-[100px] sm:w-[105px]"
                      : "w-[108px] sm:w-[118px]"
                  }
                `}
              />

              {/* DARK THEME LOGO */}

              <Image
                src="/logo-dark-1.png"
                alt="Whispers of Wisdom"
                width={190}
                height={90}
                priority
                className={`
                  hidden
                  h-auto
                  object-contain
                  transition-all
                  duration-300
                  dark:block

                  ${
                    scrolled
                      ? "w-[100px] sm:w-[105px]"
                      : "w-[108px] sm:w-[118px]"
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
              hidden
              items-center
              gap-5
              lg:flex
              xl:gap-7
            "
          >
            {navigation.map((item, index) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <motion.div
                  key={item.href}
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.06 + index * 0.04,
                    duration: 0.45,
                  }}
                >
                  <Link
                    href={item.href}
                    className={`
                      relative
                      flex
                      items-center
                      py-7
                      text-[13px]
                      font-semibold
                      uppercase
                      tracking-[0.04em]
                      transition-colors

                      ${
                        isActive
                          ? `
                            text-[#2196F3]
                            dark:text-[#42A5F5]
                          `
                          : `
                            text-slate-700
                            hover:text-[#2196F3]
                            dark:text-slate-300
                            dark:hover:text-[#42A5F5]
                          `
                      }
                    `}
                  >
                    {item.label}

                    {isActive && <ActiveUnderline />}
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
              ml-3
              hidden
              items-center
              gap-1
              lg:flex
            "
          >
            {/* SEARCH */}

            <motion.button
              type="button"
              aria-label="Search"
              whileHover={{
                y: -2,
                scale: 1.06,
              }}
              whileTap={{
                scale: 0.92,
              }}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                text-slate-600
                transition-colors
                hover:bg-slate-100
                hover:text-[#2196F3]
                dark:text-slate-300
                dark:hover:bg-white/5
                dark:hover:text-[#42A5F5]
              "
            >
              <Search size={18} />
            </motion.button>

            {/* ACCOUNT */}

            <motion.div
              whileHover={{
                y: -2,
                scale: 1.06,
              }}
              whileTap={{
                scale: 0.92,
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
                  text-slate-600
                  transition-colors
                  hover:bg-slate-100
                  hover:text-[#2196F3]
                  dark:text-slate-300
                  dark:hover:bg-white/5
                  dark:hover:text-[#42A5F5]
                "
              >
                <UserRound size={18} />
              </Link>
            </motion.div>

            {/* THEME TOGGLE */}

            <ThemeToggle />
          </div>

          {/* =================================================
              MOBILE RIGHT ACTIONS
          ================================================== */}

          <div
            className="
              ml-auto
              flex
              items-center
              gap-1
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
                text-slate-700
                transition-colors
                hover:bg-slate-100
                hover:text-[#2196F3]
                dark:text-white
                dark:hover:bg-white/5
              "
            >
              <Search size={18} />
            </motion.button>

            {/* THEME */}

            <ThemeToggle />

            {/* ACCOUNT */}

            <motion.div
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
                  text-slate-700
                  transition-colors
                  hover:bg-slate-100
                  hover:text-[#2196F3]
                  dark:text-white
                  dark:hover:bg-white/5
                "
              >
                <UserRound size={18} />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* =====================================================
            MOBILE SIDE MENU
        ====================================================== */}

        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* =================================================
                  OVERLAY
              ================================================== */}

              <motion.button
                type="button"
                aria-label="Close menu overlay"
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
                  z-[80]
                  cursor-default
                  bg-black/50
                  backdrop-blur-[2px]
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
                  z-[90]
                  flex
                  h-[100dvh]
                  w-[88%]
                  max-w-[390px]
                  flex-col
                  overflow-y-auto
                  border-r
                  border-slate-200
                  bg-white
                  shadow-[10px_0_40px_rgba(0,0,0,0.12)]

                  dark:border-white/10
                  dark:bg-[#071725]
                  dark:shadow-[10px_0_40px_rgba(0,0,0,0.35)]
                "
              >
                {/* =================================================
                    DRAWER HEADER
                ================================================== */}

                <div
                  className="
                    flex
                    min-h-[88px]
                    shrink-0
                    items-center
                    justify-between
                    border-b
                    border-slate-200/80
                    px-6

                    dark:border-white/10
                  "
                >
                  {/* LOGO */}

                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Whispers of Wisdom Home"
                    className="
                      relative
                      flex
                      items-center
                      justify-center
                    "
                  >
                    {/* LIGHT LOGO */}

                    <Image
                      src="/Wispers-of-Wisdom-logo.png"
                      alt="Whispers of Wisdom"
                      width={140}
                      height={80}
                      priority
                      className="
                        h-auto
                        w-[105px]
                        object-contain
                        dark:hidden
                      "
                    />

                    {/* DARK LOGO */}

                    <Image
                      src="/logo-dark-1.png"
                      alt="Whispers of Wisdom"
                      width={140}
                      height={80}
                      priority
                      className="
                        hidden
                        h-auto
                        w-[105px]
                        object-contain
                        dark:block
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
                      border-slate-200
                      text-slate-700
                      transition-colors
                      hover:bg-slate-100
                      hover:text-[#2196F3]

                      dark:border-white/10
                      dark:text-white
                      dark:hover:bg-white/5
                      dark:hover:text-[#42A5F5]
                    "
                  >
                    <X size={19} />
                  </motion.button>
                </div>

                {/* =================================================
                    MOBILE NAVIGATION
                ================================================== */}

                <motion.nav
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.06,
                      },
                    },
                  }}
                  className="
                    px-6
                    pb-8
                    pt-4
                  "
                >
                  {navigation.map((item) => {
                    const isActive =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);

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
                            flex
                            items-center
                            border-b
                            border-slate-200/80
                            py-5
                            text-[14px]
                            font-semibold
                            uppercase
                            tracking-[0.06em]
                            transition-all
                            duration-200

                            dark:border-white/10

                            ${
                              isActive
                                ? `
                                  text-[#2196F3]
                                  dark:text-[#42A5F5]
                                `
                                : `
                                  text-slate-700
                                  hover:pl-2
                                  hover:text-[#2196F3]
                                  dark:text-slate-300
                                  dark:hover:text-[#42A5F5]
                                `
                            }
                          `}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.nav>

                {/* =================================================
                    MOBILE DRAWER FOOTER
                ================================================== */}

                <div
                  className="
                    mt-auto
                    border-t
                    border-slate-200/80
                    px-6
                    py-6
                    dark:border-white/10
                  "
                >
                  <p
                    className="
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-slate-400
                    "
                  >
                    Whispers of Wisdom
                  </p>

                  <p
                    className="
                      mt-2
                      text-xs
                      leading-5
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Explore ideas, stories and wisdom.
                  </p>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

// =========================================================
// ACTIVE UNDERLINE
// =========================================================

function ActiveUnderline() {
  return (
    <motion.span
      layoutId="navbar-active-link"
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 30,
      }}
      className="
        absolute
        bottom-[18px]
        left-0
        h-[2px]
        w-full
        rounded-full
        bg-[#2196F3]
      "
    />
  );
}