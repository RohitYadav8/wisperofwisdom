import { Check, Download, Mail, Send, Star } from "lucide-react";

import { AnimateIn } from "../../components/animations/animate-in";
import { StaggerContainer, StaggerItem } from "../../components/animations/stagger";
import { journalBenefits, journalInside, readerReviews } from "./data";

function JumpButton({ children, icon }: { children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <a
      href="#journal-form"
      className="mt-8 inline-flex h-13 items-center gap-2.5 rounded-full bg-(--wow-ink) px-7 text-[14px] font-semibold text-(--wow-paper) transition hover:opacity-90"
    >
      {icon}
      {children}
    </a>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="wow-serif text-3xl font-semibold leading-tight tracking-[-0.015em] sm:text-4xl">
      {children}
    </h2>
  );
}

export function MoreThanPages() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 pt-16 sm:px-10 lg:pt-24">
      <AnimateIn>
        <div className="grid gap-10 rounded-[32px] border border-(--wow-line) bg-(--wow-card) p-7 sm:p-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <Heading>This Journal Is More Than Just Pages</Heading>
            <p className="mt-5 text-[16px] leading-relaxed text-(--wow-ink-2)">
              It&apos;s a daily companion that helps you turn whispers of wisdom
              into <b className="font-semibold text-(--wow-ink)">real transformation</b>.
              With guided prompts, reflection space, and simple action steps,
              you&apos;ll finally have the structure to:
            </p>
            <JumpButton icon={<Download className="h-4 w-4" />}>Claim My Free Journal Now</JumpButton>
          </div>

          <StaggerContainer className="grid content-center gap-3">
            {journalBenefits.map((b) => (
              <StaggerItem key={b}>
                <div className="flex items-center gap-4 rounded-2xl border border-(--wow-line) bg-(--wow-paper) px-5 py-4">
                  <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-(--wow-gold)/15 text-(--wow-gold)">
                    <Star className="h-4 w-4 fill-current" strokeWidth={0} />
                  </span>
                  <span className="text-[15px]">{b}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimateIn>
    </section>
  );
}

export function InsideJournal() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 pt-16 sm:px-10 lg:pt-24">
      <AnimateIn className="mb-8 text-center">
        <Heading>What&apos;s Inside the Journal</Heading>
      </AnimateIn>

      {/* desktop table */}
      <AnimateIn>
        <div className="hidden overflow-hidden rounded-[28px] border border-(--wow-line) bg-(--wow-card) md:block">
          <table className="w-full text-left text-[15px]">
            <thead className="bg-(--wow-ink) text-(--wow-paper)">
              <tr>
                <th className="px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em]">Feature</th>
                <th className="px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em]">Benefit</th>
                <th className="px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em]">Emotional Outcome</th>
              </tr>
            </thead>
            <tbody>
              {journalInside.map((row) => (
                <tr key={row.feature} className="border-t border-(--wow-line) transition hover:bg-(--wow-paper)">
                  <td className="wow-serif px-7 py-5 text-[17px] font-semibold">{row.feature}</td>
                  <td className="px-7 py-5 text-(--wow-ink-2)">{row.benefit}</td>
                  <td className="px-7 py-5 text-(--wow-ink-2)">{row.outcome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimateIn>

      {/* mobile cards */}
      <div className="grid gap-3 md:hidden">
        {journalInside.map((row) => (
            <dl key={row.feature} className="rounded-2xl border border-(--wow-line) bg-(--wow-card) p-5 text-[14.5px]">
              <dt className="sr-only">Feature</dt>
              <dd className="wow-serif text-lg font-semibold">{row.feature}</dd>
              <dt className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-(--wow-gold)">Benefit</dt>
              <dd className="text-(--wow-ink-2)">{row.benefit}</dd>
              <dt className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-(--wow-gold)">Emotional Outcome</dt>
              <dd className="text-(--wow-ink-2)">{row.outcome}</dd>
            </dl>
        ))}
      </div>

      <div className="text-center">
        <JumpButton icon={<Send className="h-4 w-4" />}>Yes, I&apos;m Ready to Start My Journey</JumpButton>
      </div>
    </section>
  );
}

export function ReadersLove() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 pt-16 sm:px-10 lg:pt-24">
      <AnimateIn className="mb-8 text-center">
        <Heading>Why Readers Love It</Heading>
      </AnimateIn>
      <StaggerContainer className="grid gap-4 md:grid-cols-3">
        {readerReviews.map((r) => (
          <StaggerItem key={r.author}>
            <figure className="flex h-full flex-col rounded-3xl border border-(--wow-line) bg-(--wow-card) p-7">
              <span className="h-1 w-10 rounded-full bg-(--wow-gold)" aria-hidden="true" />
              <blockquote className="wow-serif mt-5 flex-1 text-lg italic leading-relaxed">{r.text}</blockquote>
              <figcaption className="mt-5 text-sm font-semibold text-(--wow-ink-2)">– {r.author}</figcaption>
            </figure>
          </StaggerItem>
        ))}
      </StaggerContainer>
      <div className="text-center">
        <JumpButton icon={<Mail className="h-4 w-4" />}>Send Me My Free Journal</JumpButton>
      </div>
    </section>
  );
}

export function DontMissOut() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 pb-20 sm:px-10 lg:pb-28">
      <AnimateIn>
        <div className="relative overflow-hidden rounded-[36px] border border-(--wow-line) bg-(--wow-paper-2) p-8 text-center sm:p-14">
          <Heading>Don&apos;t Miss Out</Heading>
          <p className="mx-auto mt-4 max-w-[760px] text-[16px] leading-relaxed text-(--wow-ink-2)">
            Stop pushing, procrastinating, and putting up with the same old
            stories. This journal is free for a limited time — grab it now and
            begin transforming the future, not just dreaming about it.
          </p>
          <JumpButton icon={<Check className="h-4 w-4" />}>Get My Free Journal</JumpButton>
        </div>
      </AnimateIn>
    </section>
  );
}
