import { AnimateIn } from "../../components/animations/animate-in";
import { StaggerContainer, StaggerItem } from "../../components/animations/stagger";
import { steps } from "./data";

export function HowItWorks() {
  return (
    <section className="border-y border-(--wow-line) bg-(--wow-paper-2)">
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-10 lg:py-28">
        <AnimateIn className="mx-auto mb-12 max-w-[700px] text-center lg:mb-16">
          <h2 className="wow-serif text-4xl font-semibold leading-[1.05] tracking-[-0.015em] sm:text-5xl">
            How It Works
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-(--wow-ink-2)">
            Over 10 days, you&apos;ll receive one powerful email per day to
            inspire action and personal transformation.
          </p>
        </AnimateIn>

        <div className="relative">
          {/* connecting line (desktop) */}
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-[repeating-linear-gradient(90deg,var(--wow-gold)_0_8px,transparent_8px_16px)] lg:block"
          />

          <StaggerContainer className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={step.title}>
                  <div className="flex gap-5 lg:flex-col lg:items-center lg:text-center">
                    <span className="relative grid h-14 w-14 flex-none place-items-center rounded-full border border-(--wow-line) bg-(--wow-card) text-(--wow-brand) shadow-[0_10px_30px_-12px_rgba(11,34,51,0.35)]">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                      <span className="wow-serif absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full bg-(--wow-gold) text-[11px] font-semibold text-white">
                        {i + 1}
                      </span>
                    </span>
                    <div className="lg:mt-6">
                      <h3 className="wow-serif text-[22px] font-semibold leading-tight">{step.title}</h3>
                      <p className="mt-2 max-w-[260px] text-[14.5px] lg:mx-auto text-(--wow-ink-2)">{step.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
