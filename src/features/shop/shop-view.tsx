"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  Check,
  ChevronDown,
  ExternalLink,
  Filter,
  Grid2X2,
  Heart,
  List,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { type SortValue, useShop } from "./use-shop";

/* All visible text is unchanged from the previous shop page. */
export function ShopView() {
  const s = useShop();

  const control =
    "h-12 rounded-full border border-(--wow-line) bg-(--wow-paper) text-[14px] text-(--wow-ink) outline-none transition focus:border-(--wow-brand) focus:ring-4 focus:ring-(--wow-brand)/10";

  const chip = (selected: boolean) =>
    `flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
      selected
        ? "border-(--wow-ink) bg-(--wow-ink) text-(--wow-paper)"
        : "border-(--wow-line) bg-(--wow-card) text-(--wow-ink-2) hover:border-(--wow-ink)"
    }`;

  return (
    <section className="mx-auto max-w-[1240px] px-5 py-12 sm:px-10 lg:py-16">
      {/* ---------- TOOLBAR ---------- */}
      <div className="mb-8 rounded-[28px] border border-(--wow-line) bg-(--wow-card) p-3 sm:p-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <p className="wow-serif px-2 text-lg">
            {s.isLoading
              ? "Loading books..."
              : s.filteredBooks.length === 1
                ? "Showing the single result"
                : `Showing ${s.filteredBooks.length} results`}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="relative w-full sm:w-[260px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-(--wow-muted)" />
              <label htmlFor="shop-search" className="sr-only">Search books...</label>
              <input
                id="shop-search"
                type="text"
                value={s.search}
                onChange={(e) => s.setSearch(e.target.value)}
                placeholder="Search books..."
                className={`${control} w-full pl-11 pr-4 placeholder:text-(--wow-muted)`}
              />
            </div>

            <button
              type="button"
              onClick={() => s.setFilterOpen(true)}
              className={`${control} inline-flex items-center justify-center gap-2 px-5 font-semibold hover:border-(--wow-ink)`}
            >
              <Filter className="h-4 w-4" />
              Filters
              {s.activeFilterCount > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-(--wow-gold) px-1.5 text-[10px] font-bold text-white">
                  {s.activeFilterCount}
                </span>
              )}
            </button>

            <div className="relative">
              <label htmlFor="shop-sort" className="sr-only">Sort</label>
              <select
                id="shop-sort"
                value={s.sort}
                onChange={(e) => s.setSort(e.target.value as SortValue)}
                className={`${control} w-full min-w-[190px] appearance-none pl-5 pr-10 font-medium`}
              >
                <option value="default">Default sorting</option>
                <option value="newest">Newest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-(--wow-muted)" />
            </div>

            <div className="flex w-fit items-center gap-1 self-start rounded-full border border-(--wow-line) bg-(--wow-paper) p-1 sm:self-auto">
              {(["grid", "list"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => s.setViewMode(mode)}
                  aria-label={mode === "grid" ? "Grid view" : "List view"}
                  aria-pressed={s.viewMode === mode}
                  className={`grid h-10 w-10 place-items-center rounded-full transition ${
                    s.viewMode === mode ? "bg-(--wow-ink) text-(--wow-paper)" : "text-(--wow-muted) hover:text-(--wow-ink)"
                  }`}
                >
                  {mode === "grid" ? <Grid2X2 className="h-4 w-4" /> : <List className="h-[17px] w-[17px]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- RESULTS ---------- */}
      {s.isLoading ? (
        <div className="rounded-[28px] border border-(--wow-line) bg-(--wow-card) px-6 py-20 text-center text-sm text-(--wow-muted)">
          Loading books...
        </div>
      ) : s.loadError ? (
        <div className="rounded-[28px] border border-red-200 bg-red-50 px-6 py-20 text-center text-sm text-red-600 dark:border-red-400/20 dark:bg-red-400/5 dark:text-red-400">
          Couldn&apos;t load books: {s.loadError}
        </div>
      ) : s.filteredBooks.length > 0 ? (
        <div className={s.viewMode === "grid" ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-5"}>
          {s.filteredBooks.map((book, index) => {
            const isWishlisted = s.wishlist.includes(book.id);
            const list = s.viewMode === "list";
            return (
              <motion.article
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`group overflow-hidden rounded-[28px] border border-(--wow-line) bg-(--wow-card) transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(11,34,51,0.4)] ${
                  list ? "flex flex-col sm:flex-row" : ""
                }`}
              >
                <Link
                  href={`/product/${book.slug}`}
                  className={`relative flex items-center justify-center overflow-hidden bg-(--wow-paper-2) ${
                    list ? "min-h-[320px] sm:w-[300px] sm:min-w-[300px]" : "aspect-[4/5]"
                  }`}
                >
                  <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-(--wow-gold)/45" />
                  <div className={`relative transition-transform duration-500 group-hover:scale-[1.04] ${list ? "h-[260px] w-[210px]" : "h-[74%] w-[74%]"}`}>
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      quality={100}
                      sizes={list ? "210px" : "(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 320px"}
                      className="object-contain drop-shadow-[0_25px_25px_rgba(11,34,51,0.3)]"
                    />
                  </div>
                </Link>

                <div className={`flex flex-1 flex-col p-6 ${list ? "justify-center sm:px-10" : ""}`}>
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <p className="wow-serif text-2xl font-semibold text-(--wow-gold)">£{book.price.toFixed(2)}</p>
                    <button
                      type="button"
                      onClick={() => s.toggleWishlist(book.id)}
                      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                      title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                      className={`grid h-10 w-10 flex-none place-items-center rounded-full border transition ${
                        isWishlisted
                          ? "border-red-200 bg-red-50 text-red-500 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-400"
                          : "border-(--wow-line) text-(--wow-muted) hover:border-red-200 hover:text-red-500"
                      }`}
                    >
                      <Heart className="h-[18px] w-[18px]" fill={isWishlisted ? "currentColor" : "none"} />
                    </button>
                  </div>

                  <Link href={`/product/${book.slug}`}>
                    <h2 className="wow-serif text-[22px] font-semibold leading-snug transition group-hover:text-(--wow-brand)">
                      {book.title}
                    </h2>
                  </Link>
                  <p className="mt-2 text-xs font-semibold tracking-[0.16em] text-(--wow-muted)">BY {book.author}</p>

                  <a
                    href={book.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-(--wow-ink) px-6 text-sm font-semibold text-(--wow-paper) transition hover:opacity-90 ${list ? "sm:w-fit" : "w-full"}`}
                  >
                    Purchase
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-[28px] border border-(--wow-line) bg-(--wow-card) px-6 py-20 text-center">
          <p className="text-sm text-(--wow-muted)">No books found.</p>
          <button type="button" onClick={s.resetFilters} className="mt-5 rounded-full bg-(--wow-ink) px-6 py-3 text-sm font-semibold text-(--wow-paper)">
            Reset Filters
          </button>
        </div>
      )}

      {/* ---------- FILTER DRAWER ---------- */}
      <AnimatePresence>
        {s.filterOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close filters"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => s.setFilterOpen(false)}
              className="fixed inset-0 z-[300] bg-[#07131c]/50 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="fixed right-0 top-0 z-[310] h-full w-full max-w-[420px] overflow-y-auto border-l border-(--wow-line) bg-(--wow-paper) p-6 shadow-2xl sm:p-8"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <SlidersHorizontal className="h-5 w-5 text-(--wow-gold)" />
                  <h2 className="wow-serif text-2xl font-semibold">Filters</h2>
                </div>
                <button
                  type="button"
                  onClick={() => s.setFilterOpen(false)}
                  aria-label="Close"
                  className="grid h-10 w-10 place-items-center rounded-full border border-(--wow-line) bg-(--wow-card) text-(--wow-muted) hover:text-(--wow-ink)"
                >
                  <X className="h-[18px] w-[18px]" />
                </button>
              </div>

              <div className="mt-8 space-y-8">
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-(--wow-gold)">Category</p>
                  <div className="space-y-2">
                    {s.categories.map((item) => (
                      <button type="button" key={item} onClick={() => s.setCategory(item)} className={chip(s.category === item)}>
                        {item}
                        {s.category === item && <Check className="h-4 w-4" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-(--wow-gold)">Author</p>
                  <div className="space-y-2">
                    {s.authors.map((item) => (
                      <button type="button" key={item} onClick={() => s.setAuthor(item)} className={chip(s.author === item)}>
                        {item}
                        {s.author === item && <Check className="h-4 w-4" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--wow-gold)">Price</p>
                    <span className="text-sm font-semibold">Up to £{s.maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={s.highestPrice}
                    step={5}
                    value={s.maxPrice}
                    onChange={(e) => s.setMaxPrice(Number(e.target.value))}
                    aria-label="Price"
                    className="w-full accent-(--wow-gold)"
                  />
                  <div className="mt-2 flex justify-between text-xs text-(--wow-muted)">
                    <span>£0</span>
                    <span>£{s.highestPrice}</span>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-3 border-t border-(--wow-line) pt-6">
                <button type="button" onClick={s.resetFilters} className="h-12 rounded-full border border-(--wow-line) bg-(--wow-card) text-sm font-semibold">
                  Reset
                </button>
                <button type="button" onClick={() => s.setFilterOpen(false)} className="h-12 rounded-full bg-(--wow-ink) text-sm font-semibold text-(--wow-paper)">
                  Apply
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
