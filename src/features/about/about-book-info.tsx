import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

import { AnimateIn } from "../../components/animations/animate-in";

/* Text copied unchanged from the previous About Us page. */
const details = [
  {
    title: "Address",
    icon: MapPin,
    text: "Level 30, The Leadenhall Building, 122 Leadenhall St, London EC3V 4AB",
  },
  {
    title: "Phone",
    icon: Phone,
    text: "Mobile: (+44) - 7454 - 675398",
    href: "tel:+447454675398",
  },
  {
    title: "Email",
    icon: Mail,
    text: "hello@whispersofwisdom.co.uk",
    href: "mailto:hello@whispersofwisdom.co.uk",
  },
];

export function AboutBookInfo() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 pb-16 sm:px-10 lg:pb-28">
      <div className="grid items-center gap-10 rounded-[36px] border border-(--wow-line) bg-(--wow-paper-2) p-7 sm:p-12 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:p-16">
        <AnimateIn direction="right" className="flex items-end justify-center gap-5">
          <Image src="/book-2.png" alt="Whispers of Wisdom" width={220} height={300} className="h-auto w-[44%] max-w-[220px] -rotate-3 drop-shadow-[0_30px_30px_rgba(11,34,51,0.3)]" />
          <Image src="/book-3.png" alt="Whispers of Wisdom" width={220} height={300} className="h-auto w-[44%] max-w-[220px] rotate-3 drop-shadow-[0_30px_30px_rgba(11,34,51,0.3)]" />
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <p className="text-[15px] font-medium uppercase leading-[1.8] tracking-[0.06em] text-(--wow-ink-2)">
            Whispers Of Wisdom is a book written for entrepreneurial odyssey
            that unfolds as an invaluable guide, combining the author&apos;s
            personal narrative with profound wisdom from mentors.
          </p>
          <div className="mt-6 h-0.5 w-12 rounded-full bg-(--wow-gold)" />

          <div className="mt-7 grid gap-3">
            {details.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.title} className="flex items-start gap-4 rounded-2xl border border-(--wow-line) bg-(--wow-card) p-4">
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-(--wow-brand)/12 text-(--wow-brand)">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--wow-gold)">{d.title}</p>
                    {d.href ? (
                      <a href={d.href} className="mt-1 block break-words text-[15px] text-(--wow-ink) hover:text-(--wow-brand)">
                        {d.text}
                      </a>
                    ) : (
                      <p className="mt-1 text-[15px] text-(--wow-ink)">{d.text}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
