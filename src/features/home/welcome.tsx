import { StaggerContainer, StaggerItem } from "../../components/animations/stagger";
import { AnimateIn } from "../../components/animations/animate-in";
import { welcomeItems } from "./data";

export function Welcome() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-16 sm:px-10 lg:py-28">
      <AnimateIn className="mx-auto mb-10 max-w-[760px] text-center lg:mb-14">
        <h2 className="wow-serif text-4xl font-semibold leading-[1.05] tracking-[-0.015em] sm:text-5xl">
          Welcome to Whispers of Wisdom
        </h2>
        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.3em] text-(--wow-brand)">
          Unlocking The Path
        </p>
        <p className="mt-3 text-(--wow-ink-2)">
          Business Growth Strategies: Building a solid foundation for
          sustainable growth
        </p>
      </AnimateIn>

      <StaggerContainer className="grid gap-4 md:grid-cols-3 lg:gap-5">
        {welcomeItems.map((item, i) => {
          const featured = i === 0;
          return (
            <StaggerItem key={item.title}>
              <article
                className={`flex h-full flex-col rounded-3xl border p-6 transition-transform duration-300 hover:-translate-y-1 lg:min-h-[300px] lg:p-8 ${
                  featured
                    ? "border-transparent bg-(--wow-ink) text-(--wow-paper)"
                    : "border-(--wow-line) bg-(--wow-card)"
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-(--wow-gold)">
                  {item.eyebrow}
                </span>
                <h3 className="wow-serif mb-3 mt-6 text-2xl font-semibold leading-tight lg:mt-12">
                  {item.title}
                </h3>
                <p className={`text-[14.5px] ${featured ? "opacity-70" : "text-(--wow-ink-2)"}`}>
                  {item.text}
                </p>
              </article>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
}
