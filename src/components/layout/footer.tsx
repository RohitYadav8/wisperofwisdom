import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Star } from "lucide-react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
} from "react-icons/fa";

/* ============================================================
   FOOTER DATA
============================================================ */

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact" },
];

const accountLinks = [
  { label: "Shop", href: "/shop" },
  { label: "My Orders", href: "/account" },
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
        bg-white/45
        text-[#29425A]
        backdrop-blur-2xl
        transition-colors
        duration-300

        dark:border-white/[0.08]
        dark:bg-[#04131F]/95
        dark:text-slate-300
      "
    >
      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          bg-[linear-gradient(135deg,rgba(255,248,216,0.50)_0%,rgba(255,255,255,0.25)_40%,rgba(223,243,255,0.48)_100%)]

          dark:bg-[linear-gradient(135deg,rgba(4,19,31,0.98)_0%,rgba(6,27,42,0.98)_55%,rgba(5,35,52,0.96)_100%)]
        "
      />

      {/* LIGHT YELLOW GLOW */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-[220px]
          -top-[250px]
          h-[560px]
          w-[560px]
          rounded-full
          bg-[#FFD54F]/10
          blur-[160px]

          dark:hidden
        "
      />

      {/* BLUE GLOW */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-[220px]
          -top-[230px]
          h-[560px]
          w-[560px]
          rounded-full
          bg-[#42A5F5]/10
          blur-[160px]

          dark:bg-[#2196F3]/[0.08]
        "
      />

      {/* DARK CENTER GLOW */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[42%]
          top-[20%]
          hidden
          h-[420px]
          w-[420px]
          rounded-full
          bg-cyan-400/[0.035]
          blur-[150px]

          dark:block
        "
      />

      {/* ======================================================
          FOOTER CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1580px]
          px-6
          py-14

          sm:px-10
          sm:py-16

          lg:px-14
          lg:py-20

          xl:px-20
        "
      >
        {/* ====================================================
            MAIN GRID
        ==================================================== */}

        <div
          className="
            grid
            gap-x-12
            gap-y-14

            sm:grid-cols-2

            lg:grid-cols-[1.15fr_0.7fr_0.7fr_1.25fr]
            lg:gap-x-14

            xl:gap-x-20
          "
        >
          {/* ==================================================
              BRAND
          ================================================== */}

          <div>
            <Link
              href="/"
              aria-label="Whispers of Wisdom Home"
              className="inline-flex"
            >
              {/* LIGHT LOGO */}

              <Image
                src="/Wispers-of-Wisdom-logo.png"
                alt="Whispers of Wisdom"
                width={230}
                height={110}
                className="
                  h-auto
                  w-[180px]
                  object-contain

                  sm:w-[195px]

                  dark:hidden
                "
              />

              {/* DARK LOGO */}

              <Image
                src="/logo-dark-1.png"
                alt="Whispers of Wisdom"
                width={230}
                height={110}
                className="
                  hidden
                  h-auto
                  w-[180px]
                  object-contain

                  sm:w-[195px]

                  dark:block
                "
              />
            </Link>

            <p
              className="
                mt-7
                max-w-[360px]

                font-sans
                text-[15px]
                leading-[1.95]
                text-[#4C6175]

                dark:text-slate-400
              "
            >
              Discover meaningful ideas, inspiring books and thoughtful
              perspectives created to help you grow, reflect and live with
              purpose.
            </p>
          </div>

          {/* ==================================================
              QUICK LINKS
          ================================================== */}

          <div>
            <FooterHeading>Quick Links</FooterHeading>

            <div className="mt-7 flex flex-col gap-[18px]">
              {quickLinks.map((item) => (
                <FooterLink
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                >
                  {item.label}
                </FooterLink>
              ))}
            </div>
          </div>

          {/* ==================================================
              YOUR ACCOUNT
          ================================================== */}

          <div>
            <FooterHeading>Your Account</FooterHeading>

            <div className="mt-7 flex flex-col gap-[18px]">
              {accountLinks.map((item) => (
                <FooterLink
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                >
                  {item.label}
                </FooterLink>
              ))}
            </div>
          </div>

          {/* ==================================================
              BEST SELLERS
          ================================================== */}

          <div>
            <FooterHeading>Best Sellers</FooterHeading>

            <Link
              href="/product/whispers-of-wisdom"
              className="
                group
                mt-7
                grid
                grid-cols-[92px_1fr]
                items-center
                gap-5

                sm:grid-cols-[100px_1fr]

                lg:grid-cols-[105px_1fr]
              "
            >
              {/* BOOK */}

              <div
                className="
                  relative
                  flex
                  h-[142px]
                  items-center
                  justify-center
                "
              >
                {/* BOOK HALO */}

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    h-[105px]
                    w-[105px]
                    rounded-full

                    bg-[radial-gradient(circle,rgba(33,150,243,0.16)_0%,rgba(255,213,79,0.08)_45%,transparent_72%)]

                    blur-[2px]

                    dark:bg-[radial-gradient(circle,rgba(66,165,245,0.18)_0%,rgba(66,165,245,0.04)_45%,transparent_72%)]
                  "
                />

                {/* FLOOR SHADOW */}

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    bottom-[7px]
                    h-[12px]
                    w-[68px]
                    rounded-full
                    bg-slate-900/15
                    blur-[8px]

                    dark:bg-black/45
                  "
                />

                <Image
                  src="/books.png"
                  alt="The Journey of Whispers of Wisdom"
                  width={105}
                  height={140}
                  className="
                    relative
                    z-10
                    h-[132px]
                    w-auto
                    object-contain

                    drop-shadow-[0_16px_16px_rgba(15,23,42,0.18)]

                    transition-transform
                    duration-500

                    group-hover:-translate-y-2
                    group-hover:scale-[1.03]

                    dark:drop-shadow-[0_18px_18px_rgba(0,0,0,0.38)]
                  "
                />
              </div>

              {/* BOOK DETAILS */}

              <div className="min-w-0">
                <h4
                  className="
                    font-sans
                    text-[15px]
                    font-semibold
                    leading-[1.5]
                    text-[#0F172A]

                    transition-colors
                    duration-300

                    group-hover:text-[#2196F3]

                    dark:text-white
                    dark:group-hover:text-[#64B5F6]
                  "
                >
                  The Journey of Whispers of Wisdom
                </h4>

                {/* RATING */}

                <div
                  className="
                    mt-3
                    flex
                    items-center
                    gap-[3px]
                    text-[#E4A817]
                  "
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={14}
                      strokeWidth={1.8}
                      fill="currentColor"
                    />
                  ))}
                </div>

                {/* PRICE */}

                <p
                  className="
                    mt-3
                    font-sans
                    text-[17px]
                    font-bold
                    text-[#078DD1]

                    dark:text-[#42A5F5]
                  "
                >
                  £35.00
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* ====================================================
            DIVIDER
        ==================================================== */}

        <div
          className="
            mt-14
            h-px
            w-full

            bg-gradient-to-r
            from-transparent
            via-slate-300/70
            to-transparent

            dark:via-white/10

            lg:mt-16
          "
        />

        {/* ====================================================
            BOTTOM FOOTER
        ==================================================== */}

        <div
          className="
            mt-7
            flex
            flex-col
            gap-6

            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          {/* ==================================================
              PAYMENT METHODS
          ================================================== */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-3
            "
          >
            {/* VISA */}

            <div
              className="
                flex
                h-[38px]
                w-[58px]
                items-center
                justify-center
                rounded-[6px]
                border
                border-slate-200/80
                bg-white
                shadow-[0_4px_12px_rgba(15,23,42,0.06)]
              "
              title="Visa"
            >
              <FaCcVisa
                aria-label="Visa"
                className="
                  h-[30px]
                  w-[44px]
                  text-[#1A1F71]
                "
              />
            </div>

            {/* MASTERCARD */}

            <div
              className="
                flex
                h-[38px]
                w-[58px]
                items-center
                justify-center
                rounded-[6px]
                border
                border-slate-200/80
                bg-white
                shadow-[0_4px_12px_rgba(15,23,42,0.06)]
              "
              title="Mastercard"
            >
              <FaCcMastercard
                aria-label="Mastercard"
                className="
                  h-[30px]
                  w-[44px]
                  text-[#EB001B]
                "
              />
            </div>

            {/* MAESTRO */}

            <div
              className="
                flex
                h-[38px]
                w-[58px]
                items-center
                justify-center
                rounded-[6px]
                border
                border-slate-200/80
                bg-white
                shadow-[0_4px_12px_rgba(15,23,42,0.06)]
              "
              title="Maestro"
              aria-label="Maestro"
            >
              <div className="relative h-[23px] w-[38px]">
                <span
                  className="
                    absolute
                    left-[3px]
                    top-0
                    h-[22px]
                    w-[22px]
                    rounded-full
                    bg-[#EB001B]
                  "
                />

                <span
                  className="
                    absolute
                    right-[3px]
                    top-0
                    h-[22px]
                    w-[22px]
                    rounded-full
                    bg-[#0099DF]/90
                  "
                />

                <span
                  className="
                    absolute
                    bottom-[-5px]
                    left-1/2
                    -translate-x-1/2
                    whitespace-nowrap
                    font-sans
                    text-[6px]
                    font-bold
                    leading-none
                    text-[#1A1F71]
                  "
                >
                  maestro
                </span>
              </div>
            </div>

            {/* AMERICAN EXPRESS */}

            <div
              className="
                flex
                h-[38px]
                w-[58px]
                items-center
                justify-center
                rounded-[6px]
                border
                border-slate-200/80
                bg-white
                shadow-[0_4px_12px_rgba(15,23,42,0.06)]
              "
              title="American Express"
            >
              <FaCcAmex
                aria-label="American Express"
                className="
                  h-[30px]
                  w-[44px]
                  text-[#2E77BC]
                "
              />
            </div>
          </div>

          {/* ==================================================
              COPYRIGHT + BACK TO TOP
          ================================================== */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-5

              md:justify-end
            "
          >
            <p
              className="
                font-sans
                text-[13px]
                text-slate-500

                dark:text-slate-500
              "
            >
              © {new Date().getFullYear()} Whispers of Wisdom. All Rights
              Reserved.
            </p>

            {/* BACK TO TOP */}

            <a
              href="#top"
              aria-label="Back to top"
              className="
                flex
                h-[44px]
                w-[44px]
                shrink-0
                items-center
                justify-center

                rounded-[13px]

                border
                border-slate-200/80

                bg-white/70

                text-[#52677D]

                shadow-[0_8px_22px_rgba(15,23,42,0.07)]

                backdrop-blur-xl

                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-[#2196F3]/40
                hover:bg-[#2196F3]
                hover:text-white
                hover:shadow-[0_12px_28px_rgba(33,150,243,0.18)]

                dark:border-white/10
                dark:bg-white/[0.05]
                dark:text-slate-300

                dark:hover:border-[#42A5F5]/40
                dark:hover:bg-[#2196F3]
                dark:hover:text-white
              "
            >
              <ArrowUp size={17} strokeWidth={2} />
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
        relative
        w-fit

        font-sans
        text-[13px]
        font-bold
        uppercase
        tracking-[0.24em]

        text-[#0F172A]

        dark:text-white
      "
    >
      {children}

      <span
        aria-hidden="true"
        className="
          absolute
          -bottom-3
          left-0

          h-[2px]
          w-8

          rounded-full

          bg-gradient-to-r
          from-[#2196F3]
          to-[#FFD54F]

          dark:from-[#42A5F5]
          dark:to-[#2196F3]
        "
      />
    </h3>
  );
}

/* ============================================================
   FOOTER LINK
============================================================ */

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        group
        flex
        w-fit
        items-center
        gap-2

        font-sans
        text-[15px]

        text-[#4C6175]

        transition-all
        duration-300

        hover:translate-x-1
        hover:text-[#2196F3]

        dark:text-slate-400
        dark:hover:text-[#64B5F6]
      "
    >
      <span
        className="
          h-[5px]
          w-[5px]
          scale-0
          rounded-full
          bg-[#2196F3]
          opacity-0

          transition-all
          duration-300

          group-hover:scale-100
          group-hover:opacity-100
        "
      />

      {children}
    </Link>
  );
}