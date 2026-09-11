"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronDown,
  Filter,
  Grid2X2,
  Heart,
  List,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type Book = {
  id: number;
  title: string;
  slug: string;
  author: string;
  price: number;
  image: string;
  category: string;
};

const books: Book[] = [
  {
    id: 1,
    title: "The Journey of Whispers of Wisdom",
    slug: "whispers-of-wisdom",
    author: "SANTOSH KUMAR",
    price: 35,
    image: "/books.png",
    category: "Whispers of Wisdom",
  },
];

function getHighestPrice(items: Book[]) {
  if (!items.length) {
    return 100;
  }

  return (
    Math.ceil(
      Math.max(...items.map((book) => book.price)) / 10
    ) * 10
  );
}

const INITIAL_MAX_PRICE = getHighestPrice(books);

type ViewMode = "grid" | "list";

type SortValue =
  | "default"
  | "newest"
  | "price-low-high"
  | "price-high-low";

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [author, setAuthor] = useState("All");
  const [maxPrice, setMaxPrice] = useState(INITIAL_MAX_PRICE);
  const [sort, setSort] = useState<SortValue>("default");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filterOpen, setFilterOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(books.map((book) => book.category))
      ),
    ];
  }, []);

  const authors = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(books.map((book) => book.author))
      ),
    ];
  }, []);

  const highestPrice = INITIAL_MAX_PRICE;

  const filteredBooks = useMemo(() => {
    let result = [...books];

    if (search.trim()) {
      const query = search.trim().toLowerCase();

      result = result.filter((book) => {
        return (
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
        );
      });
    }

    if (category !== "All") {
      result = result.filter(
        (book) => book.category === category
      );
    }

    if (author !== "All") {
      result = result.filter(
        (book) => book.author === author
      );
    }

    result = result.filter(
      (book) => book.price <= maxPrice
    );

    switch (sort) {
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;

      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;

      default:
        break;
    }

    return result;
  }, [
    search,
    category,
    author,
    maxPrice,
    sort,
  ]);

  const toggleWishlist = (id: number) => {
    setWishlist((current) => {
      if (current.includes(id)) {
        return current.filter(
          (bookId) => bookId !== id
        );
      }

      return [...current, id];
    });
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setAuthor("All");
    setMaxPrice(highestPrice);
    setSort("default");
  };

  const activeFilterCount = [
    category !== "All",
    author !== "All",
    maxPrice < highestPrice,
  ].filter(Boolean).length;

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#faf9f6]
        text-slate-900
        transition-colors
        duration-300
        dark:bg-[#041522]
        dark:text-white
      "
    >
      {/* BACKGROUND GRID */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]
          dark:opacity-[0.05]
        "
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* LEFT GLOW */}
      <div
        className="
          pointer-events-none
          absolute
          left-[-180px]
          top-[100px]
          h-[380px]
          w-[380px]
          rounded-full
          bg-[#2196F3]/10
          blur-[120px]
          dark:bg-[#2196F3]/10
        "
      />

      {/* RIGHT GLOW */}
      <div
        className="
          pointer-events-none
          absolute
          right-[-150px]
          top-[420px]
          h-[340px]
          w-[340px]
          rounded-full
          bg-cyan-400/10
          blur-[120px]
          dark:bg-cyan-400/10
        "
      />

      <section
        className="
          relative
          z-10
          py-12
          sm:py-16
          lg:py-20
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1400px]
            px-4
            sm:px-6
            lg:px-8
          "
        >
          {/* TITLE */}
          <div className="mb-8 sm:mb-10">
            <h1
              className="
                text-3xl
                font-semibold
                tracking-[-0.03em]
                text-[#0F172A]
                sm:text-4xl
                lg:text-[46px]
                dark:text-white
              "
            >
              Shop
            </h1>
          </div>

          {/* TOOLBAR */}
          <div
            className="
              mb-8
              rounded-[24px]
              border
              border-slate-200/70
              bg-white/80
              p-3
              shadow-[0_16px_50px_rgba(15,23,42,0.05)]
              backdrop-blur-xl
              dark:border-white/10
              dark:bg-[#0B2031]/80
              dark:shadow-[0_16px_50px_rgba(0,0,0,0.18)]
              sm:p-4
            "
          >
            <div
              className="
                flex
                flex-col
                gap-4
                xl:flex-row
                xl:items-center
                xl:justify-between
              "
            >
              {/* RESULTS */}
              <div className="px-1">
                <p
                  className="
                    text-sm
                    font-medium
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  {filteredBooks.length === 1
                    ? "Showing the single result"
                    : `Showing ${filteredBooks.length} results`}
                </p>
              </div>

              {/* ACTIONS */}
              <div
                className="
                  flex
                  flex-col
                  gap-3
                  sm:flex-row
                  sm:flex-wrap
                  sm:items-center
                "
              >
                {/* SEARCH */}
                <div
                  className="
                    relative
                    w-full
                    sm:w-[260px]
                  "
                >
                  <Search
                    size={17}
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search books..."
                    className="
                      h-11
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      pl-10
                      pr-4
                      text-sm
                      text-slate-900
                      outline-none
                      transition
                      placeholder:text-slate-400
                      focus:border-[#2196F3]
                      focus:ring-4
                      focus:ring-[#2196F3]/10
                      dark:border-white/10
                      dark:bg-[#071A29]
                      dark:text-white
                      dark:placeholder:text-slate-500
                    "
                  />
                </div>

                {/* FILTERS */}
                <button
                  type="button"
                  onClick={() =>
                    setFilterOpen(true)
                  }
                  className="
                    inline-flex
                    h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    text-sm
                    font-semibold
                    text-slate-700
                    transition
                    hover:border-[#2196F3]/40
                    hover:text-[#1976D2]
                    dark:border-white/10
                    dark:bg-[#071A29]
                    dark:text-slate-200
                    dark:hover:border-[#42A5F5]/40
                    dark:hover:text-[#42A5F5]
                  "
                >
                  <Filter size={16} />

                  Filters

                  {activeFilterCount > 0 && (
                    <span
                      className="
                        flex
                        h-5
                        min-w-5
                        items-center
                        justify-center
                        rounded-full
                        bg-[#2196F3]
                        px-1.5
                        text-[10px]
                        font-bold
                        text-white
                      "
                    >
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* SORT */}
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) =>
                      setSort(
                        e.target
                          .value as SortValue
                      )
                    }
                    className="
                      h-11
                      w-full
                      min-w-[185px]
                      appearance-none
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      pl-4
                      pr-10
                      text-sm
                      font-medium
                      text-slate-700
                      outline-none
                      transition
                      focus:border-[#2196F3]
                      dark:border-white/10
                      dark:bg-[#071A29]
                      dark:text-slate-200
                    "
                  >
                    <option value="default">
                      Default sorting
                    </option>

                    <option value="newest">
                      Newest
                    </option>

                    <option value="price-low-high">
                      Price: Low to High
                    </option>

                    <option value="price-high-low">
                      Price: High to Low
                    </option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="
                      pointer-events-none
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />
                </div>

                {/* VIEW SWITCH */}
                <div
                  className="
                    flex
                    h-11
                    items-center
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    p-1
                    dark:border-white/10
                    dark:bg-[#071A29]
                  "
                >
                  <button
                    type="button"
                    onClick={() =>
                      setViewMode("grid")
                    }
                    aria-label="Grid view"
                    className={`
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      transition

                      ${
                        viewMode === "grid"
                          ? `
                            bg-[#2196F3]
                            text-white
                            shadow-sm
                          `
                          : `
                            text-slate-400
                            hover:text-slate-700
                            dark:hover:text-white
                          `
                      }
                    `}
                  >
                    <Grid2X2 size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setViewMode("list")
                    }
                    aria-label="List view"
                    className={`
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      transition

                      ${
                        viewMode === "list"
                          ? `
                            bg-[#2196F3]
                            text-white
                            shadow-sm
                          `
                          : `
                            text-slate-400
                            hover:text-slate-700
                            dark:hover:text-white
                          `
                      }
                    `}
                  >
                    <List size={17} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* PRODUCTS */}
          {filteredBooks.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? `
                    grid
                    grid-cols-1
                    gap-6
                    sm:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                  `
                  : `
                    flex
                    flex-col
                    gap-5
                  `
              }
            >
              {filteredBooks.map(
                (book, index) => {
                  const isWishlisted =
                    wishlist.includes(book.id);

                  return (
                    <motion.article
                      key={book.id}
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.05,
                      }}
                      className={`
                        group
                        relative
                        overflow-hidden
                        rounded-[26px]
                        border
                        border-slate-200/70
                        bg-white/90
                        shadow-[0_18px_60px_rgba(15,23,42,0.06)]
                        backdrop-blur
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-[#2196F3]/30
                        hover:shadow-[0_24px_70px_rgba(33,150,243,0.10)]

                        dark:border-white/10
                        dark:bg-[#0B2031]/90
                        dark:shadow-[0_18px_60px_rgba(0,0,0,0.18)]
                        dark:hover:border-[#42A5F5]/30

                        ${
                          viewMode ===
                          "list"
                            ? `
                              flex
                              flex-col
                              sm:flex-row
                              sm:items-stretch
                            `
                            : ""
                        }
                      `}
                    >
                      {/* IMAGE */}
                      <Link
                        href={`/product/${book.slug}`}
                        className={`
                          relative
                          flex
                          items-center
                          justify-center
                          overflow-hidden
                          bg-gradient-to-b
                          from-[#F7FBFF]
                          to-[#EEF7FD]

                          dark:from-[#071A29]
                          dark:to-[#061522]

                          ${
                            viewMode ===
                            "list"
                              ? `
                                min-h-[330px]
                                sm:w-[290px]
                                sm:min-w-[290px]
                              `
                              : `
                                aspect-[4/5]
                              `
                          }
                        `}
                      >
                        {/* IMAGE GLOW */}
                        <div
                          className="
                            pointer-events-none
                            absolute
                            inset-x-[14%]
                            bottom-[5%]
                            h-[22%]
                            rounded-full
                            bg-[#2196F3]/15
                            blur-3xl
                            transition
                            duration-500
                            group-hover:bg-[#2196F3]/25
                          "
                        />

                        <div
                          className={`
                            relative
                            transition-transform
                            duration-500
                            group-hover:scale-[1.035]

                            ${
                              viewMode ===
                              "list"
                                ? `
                                  h-[270px]
                                  w-[220px]
                                `
                                : `
                                  h-[78%]
                                  w-[80%]
                                `
                            }
                          `}
                        >
                          <Image
                            src={book.image}
                            alt={book.title}
                            fill
                            quality={100}
                            sizes={
                              viewMode ===
                              "list"
                                ? "220px"
                                : "(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 320px"
                            }
                            className="
                              object-contain
                            "
                          />
                        </div>
                      </Link>

                      {/* DETAILS */}
                      <div
                        className={`
                          flex
                          flex-1
                          flex-col
                          p-5
                          sm:p-6

                          ${
                            viewMode ===
                            "list"
                              ? `
                                justify-center
                                sm:px-8
                              `
                              : ""
                          }
                        `}
                      >
                        {/* PRICE + WISHLIST */}
                        <div
                          className="
                            mb-4
                            flex
                            items-start
                            justify-between
                            gap-4
                          "
                        >
                          <p
                            className="
                              text-lg
                              font-semibold
                              text-[#1976D2]
                              dark:text-[#42A5F5]
                            "
                          >
                            £
                            {book.price.toFixed(
                              2
                            )}
                          </p>

                          <button
                            type="button"
                            onClick={() =>
                              toggleWishlist(
                                book.id
                              )
                            }
                            aria-label={
                              isWishlisted
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                            }
                            title={
                              isWishlisted
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                            }
                            className={`
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              border
                              transition-all
                              duration-300

                              ${
                                isWishlisted
                                  ? `
                                    border-red-200
                                    bg-red-50
                                    text-red-500

                                    dark:border-red-400/20
                                    dark:bg-red-400/10
                                    dark:text-red-400
                                  `
                                  : `
                                    border-slate-200
                                    bg-slate-50
                                    text-slate-400

                                    hover:border-red-200
                                    hover:bg-red-50
                                    hover:text-red-500

                                    dark:border-white/10
                                    dark:bg-white/[0.04]
                                    dark:text-slate-400

                                    dark:hover:border-red-400/20
                                    dark:hover:bg-red-400/10
                                    dark:hover:text-red-400
                                  `
                              }
                            `}
                          >
                            <Heart
                              size={18}
                              fill={
                                isWishlisted
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          </button>
                        </div>

                        {/* TITLE */}
                        <Link
                          href={`/product/${book.slug}`}
                        >
                          <h2
                            className="
                              text-[20px]
                              font-semibold
                              leading-[1.35]
                              tracking-[-0.02em]
                              text-[#0F172A]
                              transition
                              group-hover:text-[#1976D2]
                              dark:text-white
                              dark:group-hover:text-[#42A5F5]
                              sm:text-[21px]
                            "
                          >
                            {book.title}
                          </h2>
                        </Link>

                        {/* AUTHOR */}
                        <p
                          className="
                            mt-3
                            text-xs
                            font-semibold
                            tracking-[0.16em]
                            text-slate-400
                            dark:text-slate-500
                          "
                        >
                          BY {book.author}
                        </p>
                      </div>
                    </motion.article>
                  );
                }
              )}
            </div>
          ) : (
            /* EMPTY RESULT */
            <div
              className="
                rounded-[26px]
                border
                border-slate-200
                bg-white/80
                px-6
                py-20
                text-center
                shadow-[0_16px_50px_rgba(15,23,42,0.04)]
                dark:border-white/10
                dark:bg-[#0B2031]/80
              "
            >
              <p
                className="
                  text-sm
                  text-slate-500
                  dark:text-slate-400
                "
              >
                No books found.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="
                  mt-5
                  rounded-xl
                  bg-[#2196F3]
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#1976D2]
                "
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FILTER DRAWER */}
      <AnimatePresence>
        {filterOpen && (
          <>
            {/* OVERLAY */}
            <motion.button
              type="button"
              aria-label="Close filters"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setFilterOpen(false)
              }
              className="
                fixed
                inset-0
                z-[80]
                bg-slate-950/40
                backdrop-blur-sm
              "
            />

            {/* DRAWER */}
            <motion.aside
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 30,
              }}
              className="
                fixed
                right-0
                top-0
                z-[90]
                h-full
                w-full
                max-w-[420px]
                overflow-y-auto
                border-l
                border-slate-200
                bg-[#FAF9F6]
                p-5
                shadow-2xl

                dark:border-white/10
                dark:bg-[#061522]

                sm:p-7
              "
            >
              {/* FILTER HEADER */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2.5
                  "
                >
                  <SlidersHorizontal
                    size={19}
                    className="
                      text-[#2196F3]
                    "
                  />

                  <h2
                    className="
                      text-xl
                      font-semibold
                      tracking-[-0.02em]
                      text-[#0F172A]
                      dark:text-white
                    "
                  >
                    Filters
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setFilterOpen(false)
                  }
                  aria-label="Close"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-slate-200
                    bg-white
                    text-slate-500
                    transition
                    hover:text-slate-900

                    dark:border-white/10
                    dark:bg-[#0B2031]
                    dark:text-slate-400
                    dark:hover:text-white
                  "
                >
                  <X size={18} />
                </button>
              </div>

              <div
                className="
                  mt-8
                  space-y-8
                "
              >
                {/* CATEGORY */}
                <div>
                  <p
                    className="
                      mb-3
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-slate-400
                    "
                  >
                    Category
                  </p>

                  <div className="space-y-2">
                    {categories.map(
                      (item) => {
                        const selected =
                          category === item;

                        return (
                          <button
                            type="button"
                            key={item}
                            onClick={() =>
                              setCategory(
                                item
                              )
                            }
                            className={`
                              flex
                              w-full
                              items-center
                              justify-between
                              rounded-xl
                              border
                              px-4
                              py-3
                              text-left
                              text-sm
                              font-medium
                              transition

                              ${
                                selected
                                  ? `
                                    border-[#2196F3]/30
                                    bg-[#2196F3]/10
                                    text-[#1976D2]

                                    dark:text-[#42A5F5]
                                  `
                                  : `
                                    border-slate-200
                                    bg-white
                                    text-slate-600

                                    hover:border-[#2196F3]/30

                                    dark:border-white/10
                                    dark:bg-[#0B2031]
                                    dark:text-slate-300
                                  `
                              }
                            `}
                          >
                            {item}

                            {selected && (
                              <Check
                                size={
                                  15
                                }
                              />
                            )}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* AUTHOR */}
                <div>
                  <p
                    className="
                      mb-3
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-slate-400
                    "
                  >
                    Author
                  </p>

                  <div className="space-y-2">
                    {authors.map(
                      (item) => {
                        const selected =
                          author === item;

                        return (
                          <button
                            type="button"
                            key={item}
                            onClick={() =>
                              setAuthor(
                                item
                              )
                            }
                            className={`
                              flex
                              w-full
                              items-center
                              justify-between
                              rounded-xl
                              border
                              px-4
                              py-3
                              text-left
                              text-sm
                              font-medium
                              transition

                              ${
                                selected
                                  ? `
                                    border-[#2196F3]/30
                                    bg-[#2196F3]/10
                                    text-[#1976D2]

                                    dark:text-[#42A5F5]
                                  `
                                  : `
                                    border-slate-200
                                    bg-white
                                    text-slate-600

                                    hover:border-[#2196F3]/30

                                    dark:border-white/10
                                    dark:bg-[#0B2031]
                                    dark:text-slate-300
                                  `
                              }
                            `}
                          >
                            {item}

                            {selected && (
                              <Check
                                size={
                                  15
                                }
                              />
                            )}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* PRICE */}
                <div>
                  <div
                    className="
                      mb-4
                      flex
                      items-center
                      justify-between
                      gap-4
                    "
                  >
                    <p
                      className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.16em]
                        text-slate-400
                      "
                    >
                      Price
                    </p>

                    <span
                      className="
                        text-sm
                        font-semibold
                        text-[#1976D2]
                        dark:text-[#42A5F5]
                      "
                    >
                      Up to £
                      {maxPrice}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={
                      highestPrice
                    }
                    step={5}
                    value={maxPrice}
                    onChange={(e) =>
                      setMaxPrice(
                        Number(
                          e.target
                            .value
                        )
                      )
                    }
                    className="
                      w-full
                      accent-[#2196F3]
                    "
                  />

                  <div
                    className="
                      mt-2
                      flex
                      justify-between
                      text-xs
                      text-slate-400
                    "
                  >
                    <span>£0</span>

                    <span>
                      £{highestPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* FILTER ACTIONS */}
              <div
                className="
                  mt-10
                  grid
                  grid-cols-2
                  gap-3
                  border-t
                  border-slate-200
                  pt-6
                  dark:border-white/10
                "
              >
                <button
                  type="button"
                  onClick={
                    resetFilters
                  }
                  className="
                    h-12
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    text-sm
                    font-semibold
                    text-slate-700
                    transition
                    hover:border-slate-300

                    dark:border-white/10
                    dark:bg-[#0B2031]
                    dark:text-white
                  "
                >
                  Reset
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFilterOpen(
                      false
                    )
                  }
                  className="
                    h-12
                    rounded-xl
                    bg-[#2196F3]
                    text-sm
                    font-semibold
                    text-white
                    shadow-[0_10px_30px_rgba(33,150,243,0.22)]
                    transition
                    hover:bg-[#1976D2]
                  "
                >
                  Apply
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}