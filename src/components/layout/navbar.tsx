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

import { ThemeToggle } from "../ui/theme-toggle";
import { MagneticButton } from "../animations/magnetic-button";

const navigation = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about-me",
  },
  {
    label: "Journal",
    href: "/journal",
  },
  {
    label: "Books",
    href: "/books",
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
  const [booksOpen, setBooksOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        {/* =====================================================
            HAMBURGER
        ===================================================== */}

        <motion.button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
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
          "
        >
          <Menu size={22} />
        </motion.button>

        {/* =====================================================
            LOGO
        ===================================================== */}

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
            ml-2
            shrink-0
          "
        >
          <Link
            href="/"
            aria-label="Whispers of Wisdom Home"
            className="block"
          >
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

                ${
                  scrolled
                    ? "w-[105px]"
                    : "w-[118px]"
                }
              `}
            />
          </Link>
        </motion.div>

        {/* =====================================================
            DESKTOP NAVIGATION
        ===================================================== */}

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

            /* =================================================
               BOOKS DROPDOWN
            ================================================= */

            if (item.label === "Books") {
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

                    <motion.span
                      animate={{
                        rotate: booksOpen ? 180 : 0,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                    >
                      <ChevronDown size={13} />
                    </motion.span>

                    {isActive && (
                      <ActiveUnderline />
                    )}
                  </Link>

                  <AnimatePresence>
                    {booksOpen && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: -8,
                          scale: 0.96,
                          filter: "blur(5px)",
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
                        }}
                        transition={{
                          duration: 0.22,
                        }}
                        className="
                          absolute
                          left-1/2
                          top-[58px]
                          w-[230px]
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
                            dark:bg-[#0B2031]/95
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

                  {isActive && (
                    <ActiveUnderline />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* =====================================================
            DESKTOP ACTIONS
        ===================================================== */}

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

          {/* SHOP NOW */}

          <div className="ml-2">
            <MagneticButton>
              <Link
                href="/books"
                className="
                  group
                  flex
                  h-10
                  items-center
                  gap-2
                  rounded-lg
                  bg-[#2196F3]
                  px-4
                  text-[12px]
                  font-semibold
                  uppercase
                  tracking-[0.04em]
                  text-white
                  shadow-sm
                  transition-all
                  duration-300

                  hover:bg-[#1976D2]
                  hover:shadow-lg
                  hover:shadow-sky-500/20

                  dark:hover:bg-[#42A5F5]
                "
              >
                <motion.span
                  whileHover={{
                    rotate: -8,
                  }}
                >
                  <ShoppingBag size={15} />
                </motion.span>

                Shop Now
              </Link>
            </MagneticButton>
          </div>
        </div>

        {/* =====================================================
            MOBILE RIGHT ACTIONS
        ===================================================== */}

        <div
          className="
            ml-auto
            flex
            items-center
            gap-1
            lg:hidden
          "
        >
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

              dark:text-white
            "
          >
            <Search size={18} />
          </motion.button>

          <ThemeToggle />

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

                dark:text-white
              "
            >
              <UserRound size={18} />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* =====================================================
          MOBILE / SIDE MENU
      ===================================================== */}

      <AnimatePresence>
        {mobileOpen && (
          <>
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
              className="
                fixed
                inset-0
                z-[80]
                bg-black/40
                backdrop-blur-[2px]
              "
            />

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
                bottom-0
                left-0
                top-0
                z-[90]
                w-[88%]
                max-w-[390px]
                border-r
                border-slate-200
                bg-white
                p-6

                dark:border-white/10
                dark:bg-[#071725]
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                >
                  <Image
                    src="/Wispers-of-Wisdom-logo.png"
                    alt="Whispers of Wisdom"
                    width={140}
                    height={80}
                    className="
                      h-auto
                      w-[105px]
                      object-contain
                    "
                  />
                </Link>

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

                    dark:border-white/10
                    dark:text-white
                  "
                >
                  <X size={19} />
                </motion.button>
              </div>

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
                className="mt-9"
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
                          border-b
                          border-slate-200/80
                          py-5
                          text-[14px]
                          font-semibold
                          uppercase
                          tracking-[0.06em]
                          transition-colors

                          dark:border-white/10

                          ${
                            isActive
                              ? `
                                text-[#2196F3]
                              `
                              : `
                                text-slate-700
                                hover:text-[#2196F3]

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
              </motion.nav>

              <div
                className="
                  mt-7
                  grid
                  grid-cols-2
                  gap-3
                "
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
                    text-sm
                    font-medium
                    text-slate-700

                    dark:border-white/10
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
                  "
                >
                  <ShoppingBag size={16} />

                  Shop Now
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

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
          hover:text-[#2196F3]

          dark:text-slate-300
          dark:hover:bg-white/5
          dark:hover:text-[#42A5F5]
        "
      >
        {label}
      </Link>
    </motion.div>
  );
}