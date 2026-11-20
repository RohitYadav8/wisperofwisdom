import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--wow-brand)">
      {children}
    </p>
  );
}

export function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`flex gap-0.5 text-(--wow-gold) ${className}`} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
      ))}
    </span>
  );
}

/* Optional eyebrow above a single-style serif heading (text is shown exactly as passed). */
export function SectionHeading({
  eyebrow,
  title,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="wow-serif mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.015em] sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}

type PillLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  arrow?: boolean;
  className?: string;
};

export function PillLink({
  href,
  children,
  variant = "solid",
  arrow = false,
  className = "",
}: PillLinkProps) {
  const external = href.startsWith("http");
  const styles =
    variant === "solid"
      ? "bg-(--wow-ink) text-(--wow-paper) hover:opacity-90"
      : "border-[1.5px] border-(--wow-line) text-(--wow-ink) hover:border-(--wow-ink)";

  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex h-13 items-center justify-center gap-2.5 rounded-full px-7 text-[15px] font-semibold transition ${styles} ${className}`}
    >
      {children}
      {arrow && (
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      )}
    </Link>
  );
}
