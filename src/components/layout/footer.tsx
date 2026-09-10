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
        border-t
        border-slate-200
        bg-[#f3efe6]
        text-slate-700
        transition-colors
        duration-300

        dark:border-white/10
        dark:bg-[#04111c]
        dark:text-slate-300
      "
    >
      <div
        className="
          mx-auto
          max-w-[1400px]
          px-5
          py-14

          sm:px-8

          lg:px-12
          lg:py-16
        "
      >
        {/* =====================================================
            MAIN FOOTER GRID
        ===================================================== */}

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
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
              {/* LIGHT THEME LOGO */}

              <Image
                src="/Wispers-of-Wisdom-logo.png"
                alt="Whispers of Wisdom"
                width={200}
                height={90}
                className="
                  h-auto
                  w-[155px]
                  object-contain

                  sm:w-[170px]

                  dark:hidden
                "
              />

              {/* DARK THEME LOGO */}

              <Image
                src="/logo-dark-1.png"
                alt="Whispers of Wisdom"
                width={200}
                height={90}
                className="
                  hidden
                  h-auto
                  w-[155px]
                  object-contain

                  sm:w-[170px]

                  dark:block
                "
              />
            </Link>

            <p
              className="
                mt-5
                max-w-sm
                text-sm
                leading-7
                text-slate-600

                dark:text-slate-400
              "
            >
              Discover meaningful ideas, inspiring books and thoughtful
              perspectives created to help you grow, reflect and live with
              purpose.
            </p>

            {/* SOCIAL ICONS */}

            <div className="mt-6 flex items-center gap-3">
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

            <div className="mt-5 flex flex-col gap-3">
              {quickLinks.map((item) => (
                <Link
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  className="
                    w-fit
                    text-sm
                    text-slate-600
                    transition-colors
                    duration-200

                    hover:text-sky-600

                    dark:text-slate-400
                    dark:hover:text-sky-400
                  "
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ===================================================
              ACCOUNT LINKS
          =================================================== */}

          <div>
            <FooterHeading>Your Account</FooterHeading>

            <div className="mt-5 flex flex-col gap-3">
              {accountLinks.map((item) => (
                <Link
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  className="
                    w-fit
                    text-sm
                    text-slate-600
                    transition-colors
                    duration-200

                    hover:text-sky-600

                    dark:text-slate-400
                    dark:hover:text-sky-400
                  "
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ===================================================
              NEWSLETTER
          =================================================== */}

          <div>
            <FooterHeading>Stay Inspired</FooterHeading>

            <p
              className="
                mt-5
                text-sm
                leading-7
                text-slate-600

                dark:text-slate-400
              "
            >
              Join our newsletter for new articles, book updates and inspiring
              thoughts.
            </p>

            <form className="mt-5">
              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  p-1.5
                  shadow-sm
                  transition-colors

                  focus-within:border-sky-400

                  dark:border-white/10
                  dark:bg-white/5
                  dark:focus-within:border-sky-400/60
                "
              >
                <Mail
                  size={17}
                  className="
                    ml-3
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
                    px-1
                    py-2
                    text-sm
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
                    shrink-0
                    rounded-lg
                    bg-sky-600
                    px-4
                    py-2.5
                    text-xs
                    font-semibold
                    text-white
                    transition-all
                    duration-200

                    hover:bg-sky-700

                    dark:bg-sky-500
                    dark:hover:bg-sky-400
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
            mt-12
            flex
            flex-col
            gap-5
            border-t
            border-slate-200
            pt-6
            text-sm

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

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link
              href="/privacy-policy"
              className="
                text-slate-500
                transition-colors

                hover:text-sky-600

                dark:hover:text-sky-400
              "
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="
                text-slate-500
                transition-colors

                hover:text-sky-600

                dark:hover:text-sky-400
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
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-slate-200
                bg-white
                text-slate-600
                transition-all
                duration-200

                hover:-translate-y-0.5
                hover:border-sky-400
                hover:text-sky-600

                dark:border-white/10
                dark:bg-white/5
                dark:text-slate-300
                dark:hover:border-sky-400/50
                dark:hover:text-sky-400
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
        text-sm
        font-semibold
        uppercase
        tracking-[0.18em]
        text-slate-900

        dark:text-white
      "
    >
      {children}
    </h3>
  );
}

/* ============================================================
   SOCIAL ICON WRAPPER
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
        h-9
        w-9
        items-center
        justify-center
        rounded-full
        border
        border-slate-200
        bg-white
        text-slate-600
        transition-all
        duration-200

        hover:-translate-y-0.5
        hover:border-sky-400
        hover:text-sky-600
        hover:shadow-sm

        dark:border-white/10
        dark:bg-white/5
        dark:text-slate-300
        dark:hover:border-sky-400/50
        dark:hover:bg-sky-400/10
        dark:hover:text-sky-400
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

/* ============================================================
   YOUTUBE
============================================================ */

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