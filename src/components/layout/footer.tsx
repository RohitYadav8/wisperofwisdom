import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";

/* ============================================================
   FOOTER DATA
============================================================ */

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Me", href: "/about-me" },
  { label: "Books", href: "/books" },
  { label: "Articles", href: "/articles" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

const accountLinks = [
  { label: "My Account", href: "/account" },
  { label: "My Orders", href: "/account/orders" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Login / Register", href: "/account" },
];

/* ============================================================
   FOOTER
============================================================ */

export function Footer() {
  return (
    <footer
      className="
        relative
        overflow-hidden
        border-t
        border-slate-200/70
        bg-[#f3efe6]
        text-[#29425A]
        transition-colors
        duration-300

        dark:border-white/10
        dark:bg-[#04111c]
        dark:text-slate-300
      "
    >
      {/* ======================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-[220px]
          top-[-220px]
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#FFD54F]/10
          blur-[150px]

          dark:bg-[#2196F3]/[0.04]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-[220px]
          bottom-[-240px]
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#42A5F5]/10
          blur-[150px]

          dark:bg-[#2196F3]/[0.05]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1680px]
          px-6
          py-14

          sm:px-10

          lg:px-16
          lg:py-16

          xl:px-24
        "
      >
        {/* =====================================================
            MAIN FOOTER GRID
        ===================================================== */}

        <div
          className="
            grid
            gap-x-12
            gap-y-12

            md:grid-cols-2

            lg:grid-cols-[1.15fr_0.8fr_0.8fr_1.15fr]
            lg:gap-x-16
          "
        >
          {/* ===================================================
              BRAND
          =================================================== */}

          <div>
            <Link
              href="/"
              aria-label="Whispers of Wisdom Home"
              className="
                relative
                inline-flex
                items-center
              "
            >
              {/* LIGHT LOGO */}

              <Image
                src="/Wispers-of-Wisdom-logo.png"
                alt="Whispers of Wisdom"
                width={220}
                height={100}
                className="
                  h-auto
                  w-[170px]
                  object-contain

                  sm:w-[190px]

                  dark:hidden
                "
              />

              {/* DARK LOGO */}

              <Image
                src="/logo-dark-1.png"
                alt="Whispers of Wisdom"
                width={220}
                height={100}
                className="
                  hidden
                  h-auto
                  w-[170px]
                  object-contain

                  sm:w-[190px]

                  dark:block
                "
              />
            </Link>

            <p
              className="
                mt-7
                max-w-[370px]
                text-[15px]
                leading-[2]
                text-[#35506A]

                dark:text-slate-400
              "
            >
              Discover meaningful ideas, inspiring books and thoughtful
              perspectives created to help you grow, reflect and live with
              purpose.
            </p>

            {/* SOCIALS */}

            <div className="mt-7 flex items-center gap-3">
              <SocialIcon href="#" label="Facebook">
                <FacebookIcon />
              </SocialIcon>

              <SocialIcon href="#" label="Instagram">
                <InstagramIcon />
              </SocialIcon>

              <SocialIcon href="#" label="LinkedIn">
                <LinkedinIcon />
              </SocialIcon>

              <SocialIcon href="#" label="YouTube">
                <YoutubeIcon />
              </SocialIcon>
            </div>
          </div>

          {/* ===================================================
              QUICK LINKS
          =================================================== */}

          <div>
            <FooterHeading>Quick Links</FooterHeading>

            <div className="mt-6 flex flex-col gap-4">
              {quickLinks.map((item) => (
                <Link
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  className="
                    group
                    relative
                    w-fit
                    text-[15px]
                    text-[#35506A]
                    transition-all
                    duration-300

                    hover:translate-x-1
                    hover:text-[#2196F3]

                    dark:text-slate-400
                    dark:hover:text-[#64B5F6]
                  "
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ===================================================
              YOUR ACCOUNT
          =================================================== */}

          <div>
            <FooterHeading>Your Account</FooterHeading>

            <div className="mt-6 flex flex-col gap-4">
              {accountLinks.map((item) => (
                <Link
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  className="
                    w-fit
                    text-[15px]
                    text-[#35506A]
                    transition-all
                    duration-300

                    hover:translate-x-1
                    hover:text-[#2196F3]

                    dark:text-slate-400
                    dark:hover:text-[#64B5F6]
                  "
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ===================================================
              STAY INSPIRED
          =================================================== */}

          <div>
            <FooterHeading>Stay Inspired</FooterHeading>

            <p
              className="
                mt-6
                max-w-[380px]
                text-[15px]
                leading-[2]
                text-[#35506A]

                dark:text-slate-400
              "
            >
              Join our newsletter for new articles, book updates and inspiring
              thoughts.
            </p>

            {/* NEWSLETTER */}

            <form
              className="
                mt-6
                w-full
                max-w-[390px]
              "
            >
              <div
                className="
                  flex
                  min-h-[64px]
                  items-center
                  gap-2
                  rounded-[16px]
                  border
                  border-slate-200/90
                  bg-white/90
                  p-[7px]
                  shadow-[0_8px_25px_rgba(15,23,42,0.08)]
                  backdrop-blur-xl
                  transition-all
                  duration-300

                  focus-within:border-[#2196F3]/50
                  focus-within:shadow-[0_10px_30px_rgba(33,150,243,0.10)]

                  dark:border-white/10
                  dark:bg-white/[0.05]
                  dark:shadow-[0_8px_25px_rgba(0,0,0,0.18)]
                "
              >
                <Mail
                  size={18}
                  strokeWidth={1.7}
                  className="
                    ml-4
                    shrink-0
                    text-slate-400

                    dark:text-slate-500
                  "
                />

                <input
                  type="email"
                  placeholder="Your email"
                  aria-label="Email address"
                  className="
                    min-w-0
                    flex-1
                    bg-transparent
                    px-2
                    py-3
                    text-[14px]
                    text-slate-900
                    outline-none

                    placeholder:text-slate-400

                    dark:text-white
                    dark:placeholder:text-slate-500
                  "
                />

                <button
                  type="submit"
                  className="
                    min-h-[46px]
                    shrink-0
                    rounded-[12px]
                    bg-[#078DD1]
                    px-5
                    text-[12px]
                    font-semibold
                    text-white
                    shadow-[0_8px_20px_rgba(7,141,209,0.18)]
                    transition-all
                    duration-300

                    hover:-translate-y-0.5
                    hover:bg-[#057FC0]

                    dark:bg-[#2196F3]
                    dark:hover:bg-[#42A5F5]
                  "
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* =====================================================
            BOTTOM FOOTER
        ===================================================== */}

        <div
          className="
            mt-14
            flex
            flex-col
            gap-5
            border-t
            border-slate-300/60
            pt-7
            text-[13px]

            dark:border-white/10

            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <p className="text-slate-500 dark:text-slate-500">
            © {new Date().getFullYear()} Whispers of Wisdom. All rights
            reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/privacy-policy"
              className="
                text-slate-500
                transition-colors
                duration-300

                hover:text-[#2196F3]

                dark:hover:text-[#64B5F6]
              "
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="
                text-slate-500
                transition-colors
                duration-300

                hover:text-[#2196F3]

                dark:hover:text-[#64B5F6]
              "
            >
              Terms & Conditions
            </Link>

            {/* BACK TO TOP */}

            <a
              href="#top"
              aria-label="Back to top"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-slate-200
                bg-white/80
                text-slate-500
                shadow-sm
                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-[#2196F3]/40
                hover:text-[#2196F3]

                dark:border-white/10
                dark:bg-white/[0.05]
                dark:text-slate-300
                dark:hover:border-[#42A5F5]/40
                dark:hover:text-[#64B5F6]
              "
            >
              <ArrowUp size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   FOOTER HEADING
============================================================ */

function FooterHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h3
      className="
        text-[13px]
        font-semibold
        uppercase
        tracking-[0.26em]
        text-[#0F172A]

        dark:text-white
      "
    >
      {children}
    </h3>
  );
}

/* ============================================================
   SOCIAL ICON
============================================================ */

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        border
        border-slate-200
        bg-white/80
        text-[#52677D]
        shadow-[0_6px_18px_rgba(15,23,42,0.05)]
        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-[#2196F3]/40
        hover:bg-[#2196F3]
        hover:text-white
        hover:shadow-[0_10px_25px_rgba(33,150,243,0.18)]

        dark:border-white/10
        dark:bg-white/[0.05]
        dark:text-slate-300
        dark:hover:border-[#42A5F5]/40
        dark:hover:bg-[#2196F3]
        dark:hover:text-white
      "
    >
      {children}
    </Link>
  );
}

/* ============================================================
   FACEBOOK
============================================================ */

function FacebookIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.5 22v-9h3l.5-3.5h-3.5V7.25c0-1 .28-1.75 1.78-1.75H17V2.14C16.7 2.1 15.65 2 14.4 2 11.8 2 10 3.58 10 6.5v3H7V13h3v9h3.5Z" />
    </svg>
  );
}

/* ============================================================
   INSTAGRAM
============================================================ */

function InstagramIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
      />

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
   LINKEDIN
============================================================ */

function LinkedinIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6.5 8.5H3V21h3.5V8.5ZM4.75 3A2.05 2.05 0 1 0 4.75 7.1 2.05 2.05 0 0 0 4.75 3ZM21 13.8c0-3.75-2-5.5-4.67-5.5a4.02 4.02 0 0 0-3.63 2V8.5H9.2V21h3.5v-6.2c0-1.64.31-3.23 2.34-3.23 2 0 2.03 1.87 2.03 3.34V21H21v-7.2Z" />
    </svg>
  );
}


function YoutubeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23 12s0-3.4-.44-5.03a3 3 0 0 0-2.12-2.12C18.8 4.4 12 4.4 12 4.4s-6.8 0-8.44.45a3 3 0 0 0-2.12 2.12C1 8.6 1 12 1 12s0 3.4.44 5.03a3 3 0 0 0 2.12 2.12c1.64.45 8.44.45 8.44.45s6.8 0 8.44-.45a3 3 0 0 0 2.12-2.12C23 15.4 23 12 23 12Zm-13.2 3.2V8.8l5.6 3.2-5.6 3.2Z" />
    </svg>
  );
}