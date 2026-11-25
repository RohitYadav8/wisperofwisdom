"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, LogOut, Menu, Search, UserRound, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { ThemeToggle } from "../ui/theme-toggle";

/* Links, text and behaviour unchanged; only the styling is new.
   Colours come from the .wow-tokens set on the website layout. */

const navigation = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Journal", href: "/journal" },
  { label: "Shop", href: "/shop" },
  { label: "Challenge", href: "/10-day-email-challenge" },
  { label: "Contact Us", href: "/contact" },
];

const BOOK_TITLE = "The Journey of Whispers of Wisdom";
const BOOK_PRICE = "£35.00";
const BOOK_IMAGE = "/books.png";

type SessionUser = { id: number; name: string | null; email: string };

const iconButton =
  "grid h-10 w-10 shrink-0 place-items-center rounded-full border border-(--wow-line) text-(--wow-ink-2) transition hover:border-(--wow-ink) hover:text-(--wow-ink)";

function AccountButton({ user, onLogout }: { user: SessionUser | null; onLogout: () => void }) {
  if (!user) {
    return (
      <Link href="/account" aria-label="Login or register" className={iconButton}>
        <UserRound size={18} strokeWidth={1.7} />
      </Link>
    );
  }

  const initial = (user.name || user.email).charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-1">
      <span title={user.email} className="grid h-10 w-10 place-items-center rounded-full bg-(--wow-ink) text-sm font-semibold text-(--wow-paper)">
        {initial}
      </span>
      <button type="button" onClick={onLogout} aria-label="Logout" title="Logout" className={iconButton}>
        <LogOut size={17} strokeWidth={1.7} />
      </button>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  /* The menu remembers which page it was opened on, so it closes itself on navigation. */
  const [menuOpenOn, setMenuOpenOn] = useState<string | null>(null);
  const mobileOpen = menuOpenOn === pathname;
  const setMobileOpen = (open: boolean) => setMenuOpenOn(open ? pathname : null);

  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<SessionUser | null>(null);

  // CHECK LOGIN STATUS ON EVERY PAGE CHANGE
  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setUser(data.loggedIn ? data.user : null);
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.refresh();
    router.push("/");
  }

  // SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // LOCK BODY SCROLL
  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen]);

  // ESCAPE KEY
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpenOn(null);
        setSearchOpen(false);
      }
    };
    if (mobileOpen || searchOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, searchOpen]);

  const isActiveLink = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // SEARCH RESULT
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const showBookResult = normalizedSearch.length >= 3 && BOOK_TITLE.toLowerCase().includes(normalizedSearch);

  const openSearch = () => {
    setMobileOpen(false);
    setSearchOpen(true);
  };
  const closeSearch = () => setSearchOpen(false);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <motion.header
        id="top"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-[100] w-full border-b font-[family-name:var(--font-wow-sans)] text-(--wow-ink) transition-all duration-300 ${
          scrolled
            ? "border-(--wow-line) bg-(--wow-paper)/85 shadow-[0_12px_40px_-24px_rgba(11,34,51,0.35)] backdrop-blur-xl"
            : "border-transparent bg-(--wow-paper)"
        }`}
      >
        <div className={`mx-auto flex w-full max-w-[1300px] items-center px-5 transition-all duration-300 sm:px-10 ${scrolled ? "h-[68px]" : "h-[84px]"}`}>
          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            className={`${iconButton} mr-3 lg:hidden`}
          >
            <Menu size={19} strokeWidth={1.7} />
          </button>

          {/* LOGO */}
          <Link href="/" aria-label="Whispers of Wisdom Home" className="shrink-0">
            <Image src="/light-logo.png" alt="Whispers of Wisdom" width={190} height={102} priority className={`h-auto object-contain transition-all duration-300 dark:hidden ${scrolled ? "w-[88px]" : "w-[104px]"}`} />
            <Image src="/logo-dark.png" alt="Whispers of Wisdom" width={190} height={102} priority className={`hidden h-auto object-contain transition-all duration-300 dark:block ${scrolled ? "w-[88px]" : "w-[104px]"}`} />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav aria-label="Main" className="ml-auto hidden items-center gap-1 lg:flex xl:gap-2">
            {navigation.map((item) => {
              const active = isActiveLink(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative px-3 py-2 text-[14px] font-medium transition xl:px-4 ${
                    active ? "text-(--wow-ink)" : "text-(--wow-ink-2) hover:text-(--wow-ink)"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-[2px] origin-left rounded-full bg-(--wow-gold) transition-transform duration-300 xl:inset-x-4 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ACTIONS */}
          <div className="ml-auto flex items-center gap-2 lg:ml-6 lg:border-l lg:border-(--wow-line) lg:pl-6">
            <button type="button" aria-label="Search" onClick={openSearch} className={iconButton}>
              <Search size={17} strokeWidth={1.7} />
            </button>
            <AccountButton user={user} onLogout={handleLogout} />
            <ThemeToggle />
          </div>
        </div>
      </motion.header>

      {/* ================= SEARCH OVERLAY ================= */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close search"
              onClick={closeSearch}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[150] bg-[#07131c]/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-x-0 top-0 z-[160] border-b border-(--wow-line) bg-(--wow-paper) px-5 pb-10 pt-8 font-[family-name:var(--font-wow-sans)] text-(--wow-ink) sm:px-10"
            >
              <div className="mx-auto max-w-[900px]">
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (showBookResult) window.location.href = "/shop";
                  }}
                  className="flex items-center gap-4 border-b-2 border-(--wow-ink) pb-3"
                >
                  <input
                    autoFocus
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Type at least 3 characters to search"
                    aria-label="Search books"
                    className="wow-serif min-w-0 flex-1 bg-transparent text-2xl outline-none placeholder:text-(--wow-muted) sm:text-4xl"
                  />
                  <button type="submit" aria-label="Search" className="text-(--wow-ink)">
                    <Search size={28} strokeWidth={1.5} />
                  </button>
                </form>

                <AnimatePresence mode="wait">
                  {showBookResult && (
                    <motion.div key="book-search-result" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                      <Link
                        href="/shop"
                        onClick={closeSearch}
                        className="group mt-6 flex items-center gap-5 rounded-2xl border border-(--wow-line) bg-(--wow-card) p-4 transition hover:border-(--wow-ink)"
                      >
                        <div className="relative h-[75px] w-[52px] shrink-0 overflow-hidden">
                          <Image src={BOOK_IMAGE} alt={BOOK_TITLE} fill sizes="52px" className="object-contain" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h2 className="wow-serif text-[19px] font-semibold leading-snug transition group-hover:text-(--wow-brand) sm:text-[24px]">{BOOK_TITLE}</h2>
                          <p className="mt-1 text-[15px] font-semibold text-(--wow-gold) sm:text-[17px]">{BOOK_PRICE}</p>
                        </div>
                        <ArrowUpRight size={20} className="text-(--wow-muted) transition group-hover:text-(--wow-ink)" />
                      </Link>
                    </motion.div>
                  )}
                  {normalizedSearch.length >= 3 && !showBookResult && (
                    <motion.div key="no-search-result" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="mt-6 text-[15px] text-(--wow-muted)">
                      No books found for &quot;{searchQuery.trim()}&quot;.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-[#07131c]/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="fixed left-0 top-0 z-[210] flex h-[100dvh] w-[320px] max-w-[86vw] flex-col bg-[#0b2233] font-[family-name:var(--font-wow-sans)] text-[#f7f2e8] lg:hidden"
            >
              <div className="flex h-[84px] shrink-0 items-center justify-between border-b border-white/10 px-6">
                <Link href="/" onClick={() => setMobileOpen(false)} aria-label="Whispers of Wisdom Home">
                  <Image src="/logo-dark.png" alt="Whispers of Wisdom" width={150} height={81} priority className="h-auto w-[104px] object-contain" />
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 hover:text-white"
                >
                  <X size={18} strokeWidth={1.7} />
                </button>
              </div>

              <motion.nav initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }} className="flex flex-col px-4 py-6">
                {navigation.map((item) => {
                  const active = isActiveLink(item.href);
                  return (
                    <motion.div key={item.href} variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 transition ${
                          active ? "bg-white/10 text-white" : "text-white/65 hover:bg-white/[0.06] hover:text-white"
                        }`}
                      >
                        <span className="wow-serif text-[20px]">{item.label}</span>
                        <ArrowUpRight size={16} strokeWidth={1.6} className={active ? "text-(--wow-gold)" : "opacity-0 transition group-hover:opacity-100"} />
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>

              <div className="mt-auto border-t border-white/10 px-6 py-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-(--wow-gold)">Whispers of Wisdom</p>
                <p className="mt-2 max-w-[260px] text-xs leading-5 text-white/55">Explore ideas, stories and wisdom.</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
