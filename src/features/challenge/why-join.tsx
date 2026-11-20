import { AnimateIn } from "../../components/animations/animate-in";
import { StaggerContainer, StaggerItem } from "../../components/animations/stagger";
import { challengeBenefits } from "./data";

export function WhyJoin() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-16 sm:px-10 lg:py-28">
      <AnimateIn className="mx-auto mb-10 max-w-[760px] text-center lg:mb-14">
        <h2 className="wow-serif text-4xl font-semibold leading-[1.05] tracking-[-0.015em] sm:text-5xl">
          Why Join This Challenge?
        </h2>
        <p className="mt-4 text-[16px] leading-relaxed text-(--wow-ink-2)">
          Each day, you&apos;ll receive a powerful “Whisper of Wisdom” to shift
          your perspective, fuel your growth, and simplify your success journey.
        </p>
      </AnimateIn>

      {/* bento: first card large & dark */}
      <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:gap-5">
        {challengeBenefits.map((benefit, i) => {
          const Icon = benefit.icon;
          const featured = i === 0;
          return (
            <StaggerItem key={benefit.title} className={featured ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""}>
              <article
                className={`group flex h-full flex-col rounded-3xl border p-6 transition-transform duration-300 hover:-translate-y-1 lg:p-8 ${
                  featured
                    ? "justify-between border-transparent bg-(--wow-ink) text-(--wow-paper) lg:min-h-[420px]"
                    : "border-(--wow-line) bg-(--wow-card)"
                }`}
              >
                <span
                  className={`grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-300 group-hover:rotate-6 ${
                    featured ? "bg-(--wow-gold) text-white" : "bg-(--wow-brand)/12 text-(--wow-brand)"
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div className={featured ? "mt-10" : "mt-6"}>
                  <h3 className={`wow-serif font-semibold leading-tight ${featured ? "text-4xl lg:text-5xl" : "text-2xl"}`}>
                    {benefit.title}
                  </h3>
                  <p className={`mt-2 ${featured ? "text-[16px] opacity-75" : "text-[14.5px] text-(--wow-ink-2)"}`}>
                    {benefit.description}
                  </p>
                </div>
              </article>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
}
