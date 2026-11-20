import { StaggerContainer, StaggerItem } from "../../components/animations/stagger";
import { contactItems } from "./data";

export function ContactInfo() {
  return (
    <StaggerContainer className="grid gap-4">
      {contactItems.map((item, i) => {
        const Icon = item.icon;
        const featured = i === 0;
        return (
          <StaggerItem key={item.title}>
            <article
              className={`flex items-start gap-4 rounded-3xl border p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7 ${
                featured
                  ? "border-transparent bg-(--wow-ink) text-(--wow-paper)"
                  : "border-(--wow-line) bg-(--wow-card)"
              }`}
            >
              <span
                className={`grid h-12 w-12 flex-none place-items-center rounded-2xl ${
                  featured ? "bg-(--wow-gold) text-white" : "bg-(--wow-brand)/12 text-(--wow-brand)"
                }`}
              >
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <div className="min-w-0">
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-(--wow-gold)">
                  {item.title}
                </h3>
                <div className="mt-2.5 space-y-1">
                  {item.lines.map((line) =>
                    "href" in line && line.href ? (
                      <a
                        key={line.text}
                        href={line.href}
                        className={`wow-serif block break-words text-[16px] leading-snug transition hover:text-(--wow-brand) ${featured ? "" : "text-(--wow-ink)"}`}
                      >
                        {line.text}
                      </a>
                    ) : (
                      <p key={line.text} className={`wow-serif text-[16px] leading-snug ${featured ? "" : "text-(--wow-ink)"}`}>
                        {line.text}
                      </p>
                    )
                  )}
                </div>
              </div>
            </article>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
}
