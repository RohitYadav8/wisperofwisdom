"use client";

import { useEffect, useMemo, useState } from "react";

/* Data + filter logic moved unchanged from the previous shop page. */

export type Book = {
  id: number;
  title: string;
  slug: string;
  author: string;
  price: number;
  image: string;
  category: string;
  amazonUrl: string;
};

export type ViewMode = "grid" | "list";
export type SortValue = "default" | "newest" | "price-low-high" | "price-high-low";

export function getHighestPrice(items: Book[]) {
  if (!items.length) return 100;
  return Math.ceil(Math.max(...items.map((book) => book.price)) / 10) * 10;
}

export function useShop() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [author, setAuthor] = useState("All");
  const [maxPrice, setMaxPrice] = useState(100);
  const [sort, setSort] = useState<SortValue>("default");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filterOpen, setFilterOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    let isCancelled = false;
    async function loadBooks() {
      try {
        setIsLoading(true);
        setLoadError(null);
        const res = await fetch("/api/books", { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load books (${res.status})`);
        const data: Book[] = await res.json();
        if (!isCancelled) {
          setBooks(data);
          if (data.length > 0) setMaxPrice(getHighestPrice(data));
        }
      } catch (err) {
        if (!isCancelled) setLoadError(err instanceof Error ? err.message : "Failed to load books");
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }
    loadBooks();
    return () => {
      isCancelled = true;
    };
  }, []);

  const categories = useMemo(() => ["All", ...Array.from(new Set(books.map((b) => b.category)))], [books]);
  const authors = useMemo(() => ["All", ...Array.from(new Set(books.map((b) => b.author)))], [books]);
  const highestPrice = useMemo(() => getHighestPrice(books), [books]);

  const filteredBooks = useMemo(() => {
    let result = [...books];
    if (search.trim()) {
      const query = search.trim().toLowerCase();
      result = result.filter((b) => b.title.toLowerCase().includes(query) || b.author.toLowerCase().includes(query));
    }
    if (category !== "All") result = result.filter((b) => b.category === category);
    if (author !== "All") result = result.filter((b) => b.author === author);
    result = result.filter((b) => b.price <= maxPrice);
    switch (sort) {
      case "newest":
        result.reverse();
        break;
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
    }
    return result;
  }, [books, search, category, author, maxPrice, sort]);

  const toggleWishlist = (id: number) =>
    setWishlist((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]));

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setAuthor("All");
    setMaxPrice(highestPrice);
    setSort("default");
  };

  const activeFilterCount = [category !== "All", author !== "All", maxPrice < highestPrice].filter(Boolean).length;

  return {
    isLoading, loadError, filteredBooks,
    search, setSearch, category, setCategory, author, setAuthor,
    maxPrice, setMaxPrice, sort, setSort, viewMode, setViewMode,
    filterOpen, setFilterOpen, wishlist, toggleWishlist,
    categories, authors, highestPrice, resetFilters, activeFilterCount,
  };
}
