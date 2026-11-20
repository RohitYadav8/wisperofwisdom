import Link from "next/link";

/* Page title band + breadcrumb, as on the live site's inner pages. */
export function PageHeader({ title }: { title: string }) {
  return (
    <div className="border-b border-(--wow-line) bg-(--wow-paper-2)">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:py-14">
        <h1 className="wow-serif text-3xl font-semibold leading-tight sm:text-4xl">{title}</h1>
        <nav aria-label="Breadcrumb" className="wow-serif text-sm italic text-(--wow-muted)">
          <Link href="/" className="underline-offset-4 hover:text-(--wow-ink) hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-(--wow-brand)">{title}</span>
        </nav>
      </div>
    </div>
  );
}
