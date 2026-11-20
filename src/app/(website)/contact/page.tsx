import { AnimateIn } from "../../../components/animations/animate-in";
import { HomeShell } from "../../../features/home/home-shell";
import { ContactHero } from "../../../features/contact/contact-hero";
import { ContactInfo } from "../../../features/contact/contact-info";
import { ContactForm } from "../../../features/contact/contact-form";

export default function ContactPage() {
  return (
    <HomeShell>
      <ContactHero />

      <section className="mx-auto grid max-w-[1240px] items-start gap-8 px-5 py-16 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10 lg:py-24">
        <ContactInfo />
        <AnimateIn delay={0.1}>
          <ContactForm />
        </AnimateIn>
      </section>
    </HomeShell>
  );
}
