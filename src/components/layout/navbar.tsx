"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { navigation } from "../../data/navigation";
import { ThemeToggle } from "../ui/theme-toggle";
import { MagneticButton } from "../animations/magnetic-button";

export function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [booksOpen, setBooksOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ==========================================================
     SCROLL DETECTION
  ========================================================== */

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

  /* ==========================================================
     CLOSE MOBILE MENU ON ROUTE CHANGE
  ========================================================== */

  useEffect(() => {
    setMobileOpen(false);
    setBooksOpen(false);
  }, [pathname]);

  return (
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
        sticky top-0 z-50
        w-full
        border-b
        backdrop-blur-xl
        transition-[background-color,border-color,box-shadow]
        duration-300

        ${
          scrolled
            ? `
              border-slate-200/80
              bg-[#faf9f6]/95
              shadow-[0_10px_40px_rgba(15,23,42,0.07)]

              dark:border-white/10
              dark:bg-[#071725]/95
              dark:shadow-[0_10px_40px_rgba(0,0,0,0.22)]
            `
            : `
              border-slate-200/60
              bg-[#faf9f6]/80

              dark:border-white/10
              dark:bg-[#071725]/80
            `
        }
      `}
    >
      <motion.div
        animate={{
          height: scrolled ? 68 : 76,
        }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          mx-auto
          flex
          max-w-[1400px]
          items-center
          justify-between
          px-5
          sm:px-8
          lg:px-12
        "
      >
        {/* ====================================================
            LOGO
        ==================================================== */}

        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          className="shrink-0"
        >
          <Link href="/" className="block">
            <Image
              src="/Wispers-of-Wisdom-logo.png"
              alt="Whispers of Wisdom"
              width={190}
              height={90}
              priority
              className="
                h-auto
                w-[125px]
                object-contain
                sm:w-[145px]
                lg:w-[160px]
              "
            />
          </Link>
        </motion.div>

        {/* ====================================================
            DESKTOP NAVIGATION
        ==================================================== */}

        <nav className="hidden items-center gap-7 lg:flex">
          {navigation.map((item, index) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            /* =================================================
               BOOKS DROPDOWN
            ================================================= */

            if (item.label === "Books") {
              return (
                <motion.div
                  key={`${item.label}-${item.href}`}
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.08 + index * 0.05,
                    duration: 0.45,
                  }}
                  className="relative"
                  onMouseEnter={() => setBooksOpen(true)}
                  onMouseLeave={() => setBooksOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={`
                      relative
                      flex
                      items-center
                      gap-1
                      py-6
                      text-sm
                      font-medium
                      transition-colors

                      ${
                        isActive
                          ? "text-sky-600 dark:text-sky-400"
                          : `
                            text-slate-700
                            hover:text-sky-600

                            dark:text-slate-300
                            dark:hover:text-sky-400
                          `
                      }
                    `}
                  >
                    {item.label}

                    <motion.span
                      animate={{
                        rotate: booksOpen ? 180 : 0,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                    >
                      <ChevronDown size={14} />
                    </motion.span>

                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-link"
                        className="
                          absolute
                          bottom-0
                          left-0
                          h-[2px]
                          w-full
                          rounded-full
                          bg-sky-500
                        "
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>

                  {/* ===========================================
                      ANIMATED DROPDOWN
                  =========================================== */}

                  <AnimatePresence>
                    {booksOpen && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: -8,
                          scale: 0.96,
                          filter: "blur(6px)",
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          filter: "blur(0px)",
                        }}
                        exit={{
                          opacity: 0,
                          y: -8,
                          scale: 0.97,
                          filter: "blur(5px)",
                        }}
                        transition={{
                          duration: 0.22,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="
                          absolute
                          left-1/2
                          top-[55px]
                          w-[240px]
                          -translate-x-1/2
                          pt-3
                        "
                      >
                        <div
                          className="
                            overflow-hidden
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white/95
                            p-2
                            shadow-[0_20px_60px_rgba(15,23,42,0.14)]
                            backdrop-blur-xl

                            dark:border-white/10
                            dark:bg-[#0b2031]/95
                            dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                          "
                        >
                          <DropdownLink
                            href="/books"
                            label="All Books"
                          />

                          <DropdownLink
                            href="/books/whispers-of-wisdom"
                            label="Whispers of Wisdom"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            }

            /* =================================================
               NORMAL NAV LINK
            ================================================= */

            return (
              <motion.div
                key={`${item.label}-${item.href}`}
                initial={{
                  opacity: 0,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.08 + index * 0.05,
                  duration: 0.45,
                }}
              >
                <Link
                  href={item.href}
                  className={`
                    relative
                    flex
                    items-center
                    py-6
                    text-sm
                    font-medium
                    transition-colors

                    ${
                      isActive
                        ? "text-sky-600 dark:text-sky-400"
                        : `
                          text-slate-700
                          hover:text-sky-600

                          dark:text-slate-300
                          dark:hover:text-sky-400
                        `
                    }
                  `}
                >
                  {item.label}

                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-link"
                      className="
                        absolute
                        bottom-0
                        left-0
                        h-[2px]
                        w-full
                        rounded-full
                        bg-sky-500
                      "
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* ====================================================
            DESKTOP ACTIONS
        ==================================================== */}

        <div className="hidden items-center gap-1.5 lg:flex">
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
              hover:text-sky-600

              dark:text-slate-300
              dark:hover:bg-white/5
              dark:hover:text-sky-400
            "
          >
            <Search size={18} />
          </motion.button>

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
              aria-label="My account"
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
                hover:text-sky-600

                dark:text-slate-300
                dark:hover:bg-white/5
                dark:hover:text-sky-400
              "
            >
              <UserRound size={18} />
            </Link>
          </motion.div>

          <ThemeToggle />

          <div className="ml-3">
            <MagneticButton>
              <Link
                href="/books"
                className="
                  group
                  flex
                  h-11
                  items-center
                  gap-2
                  rounded-lg
                  bg-[#2196F3]
                  px-5
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition-all
                  duration-300

                  hover:bg-[#1976D2]
                  hover:shadow-lg
                  hover:shadow-sky-500/20

                  dark:bg-[#2196F3]
                  dark:hover:bg-[#42A5F5]
                "
              >
                <motion.span
                  whileHover={{
                    rotate: -8,
                  }}
                >
                  <ShoppingBag size={16} />
                </motion.span>

                Shop Now
              </Link>
            </MagneticButton>
          </div>
        </div>

        {/* ====================================================
            MOBILE ACTIONS
        ==================================================== */}

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />

          <motion.button
            type="button"
            onClick={() => setMobileOpen((current) => !current)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
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
              border
              border-slate-200
              bg-white
              text-slate-700

              dark:border-white/10
              dark:bg-white/5
              dark:text-white
            "
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.7,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.7,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>

      {/* ======================================================
          MOBILE MENU
      ====================================================== */}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              overflow-hidden
              border-t
              border-slate-200
              bg-[#faf9f6]/98
              backdrop-blur-xl

              dark:border-white/10
              dark:bg-[#071725]/98

              lg:hidden
            "
          >
            <motion.div
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
              className="px-5 py-5 sm:px-8"
            >
              <nav className="flex flex-col">
                {navigation.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <motion.div
                      key={`${item.label}-${item.href}`}
                      variants={{
                        hidden: {
                          opacity: 0,
                          x: -18,
                        },
                        show: {
                          opacity: 1,
                          x: 0,
                        },
                      }}
                      transition={{
                        duration: 0.35,
                      }}
                    >
                      <Link
                        href={item.href}
                        className={`
                          flex
                          border-b
                          border-slate-200/70
                          py-4
                          text-sm
                          font-medium
                          transition-colors

                          dark:border-white/10

                          ${
                            isActive
                              ? "text-sky-600 dark:text-sky-400"
                              : `
                                text-slate-700
                                dark:text-slate-300
                              `
                          }
                        `}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 15,
                  },
                  show: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                className="mt-5 grid grid-cols-2 gap-3"
              >
                <Link
                  href="/account"
                  className="
                    flex
                    h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    text-sm
                    font-medium
                    text-slate-700

                    dark:border-white/10
                    dark:bg-white/5
                    dark:text-white
                  "
                >
                  <UserRound size={16} />

                  Account
                </Link>

                <Link
                  href="/books"
                  className="
                    flex
                    h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-[#2196F3]
                    text-sm
                    font-semibold
                    text-white

                    dark:bg-[#2196F3]
                  "
                >
                  <ShoppingBag size={16} />

                  Shop Now
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ============================================================
   DROPDOWN LINK
============================================================ */

function DropdownLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <motion.div
      whileHover={{
        x: 4,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      <Link
        href={href}
        className="
          block
          rounded-xl
          px-4
          py-3
          text-sm
          font-medium
          text-slate-700
          transition-colors

          hover:bg-sky-50
          hover:text-sky-600

          dark:text-slate-300
          dark:hover:bg-white/5
          dark:hover:text-sky-400
        "
      >
        {label}
      </Link>
    </motion.div>
  );
}