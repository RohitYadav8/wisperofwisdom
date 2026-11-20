import { StaggerContainer, StaggerItem } from "../../components/animations/stagger";
import { stats } from "./data";

export function Stats() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 pb-20 sm:px-10 lg:pb-28">
      <StaggerContainer className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
        {stats.map((stat) => (
          <StaggerItem key={stat.label}>
            <div className="rounded-3xl border border-(--wow-line) bg-(--wow-card) px-6 py-8 text-center">
              <p className="wow-serif text-5xl font-semibold leading-none lg:text-6xl">{stat.value}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-(--wow-muted)">{stat.label}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
