import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Mail, MapPin, Phone, Star } from "lucide-react";
import { FaCcAmex, FaCcMastercard, FaCcVisa, FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

/* Text and links unchanged; only the styling is new. */

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact" },
];

/* Same social links as the floating "connect" button. */
const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/people/Whispers-of-Wisdom/61575102369893/", icon: FaFacebookF },
  { label: "X / Twitter", href: "https://x.com/wisdom6837", icon: FaXTwitter },
  { label: "Instagram", href: "https://www.instagram.com/whispersofwisdom78/", icon: FaInstagram },
  { label: "YouTube", href: "https://www.youtube.com/channel/UC_x6Q4PjN52uNJ4udmN4qKA", icon: FaYoutube },
];

const accountLinks = [
  { label: "Shop", href: "/shop" },
  { label: "My Orders", href: "/account" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0b2233] font-[family-name:var(--font-wow-sans)] text-[#f7f2e8] dark:border-t dark:border-white/[0.08] dark:bg-[#061019]">
      {/* decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[460px] w-[460px] rounded-full border-[1.5px] border-[#c29a52]/35" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 left-1/4 h-[380px] w-[380px] rounded-full bg-[#2f9be0]/15 blur-[120px]" />

      <div className="relative mx-auto max-w-[1300px] px-5 pb-8 pt-16 sm:px-10 lg:pt-20">
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-[1fr_1.35fr_0.65fr_0.75fr_1.3fr]">
          {/* BRAND */}
          <div>
            <Link href="/" aria-label="Whispers of Wisdom Home" className="inline-flex transition hover:-translate-y-0.5">
              <Image src="/logo-dark.png" alt="Whispers of Wisdom" width={230} height={124} className="h-auto w-[160px] object-contain" />
            </Link>
            <p className="mt-6 max-w-[340px] text-[14.5px] leading-[1.8] text-white/65">
              Discover meaningful ideas, inspiring books and thoughtful
              perspectives created to help you grow, reflect and live with
              purpose.
            </p>
          </div>

          {/* CONNECT (as on the live site) */}
          <div>
            <FooterHeading>Connect</FooterHeading>
            <address className="mt-6 flex flex-col gap-4 text-[14.5px] not-italic leading-[1.7] text-white/65">
              <span className="flex gap-3">
                <MapPin className="mt-1 h-4 w-4 flex-none text-[#c29a52]" />
                Level 30, The Leadenhall Building, 122 Leadenhall St, London EC3V 4AB
              </span>
              <a href="mailto:hello@whispersofwisdom.co.uk" className="flex items-center gap-3 text-[13.5px] transition hover:text-white [overflow-wrap:anywhere]">
                <Mail className="h-4 w-4 flex-none text-[#c29a52]" />
                hello@whispersofwisdom.co.uk
              </a>
              <a href="tel:+447454675398" className="flex items-center gap-3 transition hover:text-white">
                <Phone className="h-4 w-4 flex-none text-[#c29a52]" />
                (+44) 7454 675398
              </a>
            </address>
            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition hover:-translate-y-0.5 hover:border-[#c29a52] hover:bg-[#c29a52] hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <FooterHeading>Quick Links</FooterHeading>
            <div className="mt-6 flex flex-col gap-3.5">
              {quickLinks.map((item) => (
                <FooterLink key={item.href} href={item.href}>{item.label}</FooterLink>
              ))}
            </div>
          </div>

          {/* YOUR ACCOUNT */}
          <div>
            <FooterHeading>Your Account</FooterHeading>
            <div className="mt-6 flex flex-col gap-3.5">
              {accountLinks.map((item) => (
                <FooterLink key={item.href} href={item.href}>{item.label}</FooterLink>
              ))}
            </div>
          </div>

          {/* BEST SELLERS */}
          <div>
            <FooterHeading>Best Sellers</FooterHeading>
            <Link
              href="/product/whispers-of-wisdom"
              className="group mt-6 flex items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-[#c29a52]/50 hover:bg-white/[0.07]"
            >
              <div className="relative grid h-[110px] w-[80px] shrink-0 place-items-center">
                <Image
                  src="/books.png"
                  alt="The Journey of Whispers of Wisdom"
                  width={95}
                  height={128}
                  className="h-[106px] w-auto object-contain drop-shadow-[0_14px_14px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:-translate-y-1"
                />
              </div>
              <div className="min-w-0">
                <h4 className="wow-serif text-[17px] font-semibold leading-snug transition group-hover:text-[#d9b572]">
                  The Journey of Whispers of Wisdom
                </h4>
                <div className="mt-2 flex items-center gap-[3px] text-[#d9b572]" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={13} strokeWidth={0} fill="currentColor" />
                  ))}
                </div>
                <p className="wow-serif mt-2 text-[20px] font-semibold text-[#d9b572]">£35.00</p>
              </div>
            </Link>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <PaymentCard title="Visa"><FaCcVisa aria-label="Visa" className="h-[26px] w-[40px] text-[#1A1F71]" /></PaymentCard>
            <PaymentCard title="Mastercard"><FaCcMastercard aria-label="Mastercard" className="h-[26px] w-[40px] text-[#EB001B]" /></PaymentCard>
            <PaymentCard title="Maestro">
              <div className="relative h-[21px] w-[35px]" aria-label="Maestro">
                <span className="absolute left-[2px] top-0 h-[20px] w-[20px] rounded-full bg-[#EB001B]" />
                <span className="absolute right-[2px] top-0 h-[20px] w-[20px] rounded-full bg-[#0099DF]/90" />
                <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 whitespace-nowrap text-[5px] font-bold leading-none text-[#1A1F71]">maestro</span>
              </div>
            </PaymentCard>
            <PaymentCard title="American Express"><FaCcAmex aria-label="American Express" className="h-[26px] w-[40px] text-[#2E77BC]" /></PaymentCard>
          </div>

          <div className="flex flex-wrap items-center gap-4 md:justify-end">
            <p className="text-[13px] text-white/50">
              © {new Date().getFullYear()} Whispers of Wisdom. All Rights Reserved.
            </p>
            <a
              href="#top"
              aria-label="Back to top"
              className="group grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 text-white/70 transition hover:-translate-y-1 hover:border-[#c29a52] hover:bg-[#c29a52] hover:text-white"
            >
              <ArrowUp size={16} strokeWidth={2} className="transition-transform group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="relative w-fit text-[12px] font-semibold uppercase tracking-[0.22em] text-white">
      {children}
      <span className="absolute -bottom-2.5 left-0 h-[2px] w-7 rounded-full bg-[#c29a52]" />
    </h3>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group flex w-fit items-center gap-2 text-[15px] text-white/65 transition hover:translate-x-1 hover:text-white">
      <span className="h-[4px] w-[4px] scale-0 rounded-full bg-[#c29a52] transition group-hover:scale-100" />
      {children}
    </Link>
  );
}

function PaymentCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div title={title} className="grid h-[34px] w-[52px] place-items-center rounded-[8px] bg-white transition hover:-translate-y-0.5">
      {children}
    </div>
  );
}
