"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Edit3,
  Loader2,
  Plus,
  Search,
  Trash2,
  X,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type Book = {
  id: number;
  title: string;
  slug: string;
  author: string;
  price: string | number;
  coverImage: string;
  category: string;
  shortDescription: string | null;
  description: string | null;
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
};

type BookForm = {
  title: string;
  slug: string;
  author: string;
  price: string;
  coverImage: string;
  category: string;
  shortDescription: string;
  description: string;
  stock: string;
  isActive: boolean;
  isFeatured: boolean;
};

const EMPTY_FORM: BookForm = {
  title: "",
  slug: "",
  author: "",
  price: "",
  coverImage: "",
  category: "",
  shortDescription: "",
  description: "",
  stock: "0",
  isActive: true,
  isFeatured: false,
};

export default function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingBook, setEditingBook] =
    useState<Book | null>(null);

  const [form, setForm] =
    useState<BookForm>(EMPTY_FORM);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/books", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to load books."
        );
      }

      setBooks(data.books ?? []);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to load books."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const filteredBooks = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return books;
    }

    return books.filter((book) => {
      return (
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query) ||
        book.slug.toLowerCase().includes(query)
      );
    });
  }, [books, search]);

  const totalBooks = books.length;

  const activeBooks = books.filter(
    (book) => book.isActive
  ).length;

  const inactiveBooks = books.filter(
    (book) => !book.isActive
  ).length;

  const featuredBooks = books.filter(
    (book) => book.isFeatured
  ).length;

  function createSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function handleTitleChange(value: string) {
    setForm((current) => ({
      ...current,
      title: value,

      slug:
        editingBook &&
        current.slug !== createSlug(current.title)
          ? current.slug
          : createSlug(value),
    }));
  }

  function openAddModal() {
    setEditingBook(null);
    setForm(EMPTY_FORM);
    setError("");
    setSuccess("");
    setModalOpen(true);
  }

  function openEditModal(book: Book) {
    setEditingBook(book);

    setForm({
      title: book.title,
      slug: book.slug,
      author: book.author,
      price: String(book.price),
      coverImage: book.coverImage,
      category: book.category,
      shortDescription:
        book.shortDescription ?? "",
      description: book.description ?? "",
      stock: String(book.stock),
      isActive: book.isActive,
      isFeatured: book.isFeatured,
    });

    setError("");
    setSuccess("");
    setModalOpen(true);
  }

  function closeModal() {
    if (saving) {
      return;
    }

    setModalOpen(false);
    setEditingBook(null);
    setForm(EMPTY_FORM);
    setError("");
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !form.title.trim() ||
      !form.slug.trim() ||
      !form.author.trim() ||
      !form.category.trim() ||
      !form.coverImage.trim()
    ) {
      setError(
        "Title, slug, author, category and cover image are required."
      );

      return;
    }

    const price = Number(form.price);
    const stock = Number(form.stock);

    if (!Number.isFinite(price) || price < 0) {
      setError("Please enter a valid price.");
      return;
    }

    if (
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      setError("Please enter valid stock.");
      return;
    }

    try {
      setSaving(true);

      const url = editingBook
        ? `/api/admin/books/${editingBook.id}`
        : "/api/admin/books";

      const response = await fetch(url, {
        method: editingBook ? "PUT" : "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title: form.title.trim(),
          slug: form.slug.trim(),
          author: form.author.trim(),
          price,
          coverImage: form.coverImage.trim(),
          category: form.category.trim(),

          shortDescription:
            form.shortDescription.trim(),

          description:
            form.description.trim(),

          stock,

          isActive: form.isActive,
          isFeatured: form.isFeatured,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to save the book."
        );
      }

      setModalOpen(false);
      setEditingBook(null);
      setForm(EMPTY_FORM);

      setSuccess(
        editingBook
          ? "Book updated successfully."
          : "Book added successfully."
      );

      await fetchBooks();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to save the book."
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(book: Book) {
    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/admin/books/${book.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            title: book.title,
            slug: book.slug,
            author: book.author,
            price: Number(book.price),
            coverImage: book.coverImage,
            category: book.category,

            shortDescription:
              book.shortDescription ?? "",

            description:
              book.description ?? "",

            stock: book.stock,

            isActive: !book.isActive,
            isFeatured: book.isFeatured,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to update book."
        );
      }

      setBooks((current) =>
        current.map((item) =>
          item.id === book.id
            ? {
                ...item,
                isActive: !book.isActive,
              }
            : item
        )
      );

      setSuccess(
        !book.isActive
          ? "Book activated."
          : "Book deactivated."
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to update book."
      );
    }
  }

  async function deleteBook(book: Book) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${book.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/admin/books/${book.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to delete book."
        );
      }

      setBooks((current) =>
        current.filter(
          (item) => item.id !== book.id
        )
      );

      setSuccess("Book deleted successfully.");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to delete book."
      );
    }
  }

  return (
    <>
      <div className="space-y-6">
        {/* HEADER */}

        <div
          className="
            flex
            flex-col
            gap-4
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          <div>
            <h1
              className="
                text-2xl
                font-semibold
                tracking-[-0.03em]
                text-slate-950
                dark:text-white
                sm:text-3xl
              "
            >
              Books
            </h1>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              Manage books displayed on your website.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="
              inline-flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#2196F3]
              px-5
              text-sm
              font-semibold
              text-white
              shadow-[0_10px_30px_rgba(33,150,243,0.2)]
              transition
              hover:bg-[#1976D2]
            "
          >
            <Plus size={17} />

            Add New Book
          </button>
        </div>

        {/* MESSAGES */}

        {success && (
          <div
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-emerald-200
              bg-emerald-50
              px-4
              py-3
              text-sm
              text-emerald-700
              dark:border-emerald-500/20
              dark:bg-emerald-500/10
              dark:text-emerald-400
            "
          >
            <CheckCircle2 size={18} />

            {success}
          </div>
        )}

        {error && !modalOpen && (
          <div
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-600
              dark:border-red-500/20
              dark:bg-red-500/10
              dark:text-red-400
            "
          >
            <XCircle size={18} />

            {error}
          </div>
        )}

        {/* STATS */}

        <div
          className="
            grid
            gap-4
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
          <StatCard
            title="Total Books"
            value={totalBooks}
          />

          <StatCard
            title="Active"
            value={activeBooks}
          />

          <StatCard
            title="Inactive"
            value={inactiveBooks}
          />

          <StatCard
            title="Featured"
            value={featuredBooks}
          />
        </div>

        {/* BOOK TABLE */}

        <div
          className="
            overflow-hidden
            rounded-[24px]
            border
            border-slate-200/70
            bg-white
            shadow-[0_16px_50px_rgba(15,23,42,0.04)]
            dark:border-white/10
            dark:bg-[#0B2031]
          "
        >
          {/* SEARCH */}

          <div
            className="
              flex
              flex-col
              gap-4
              border-b
              border-slate-200/70
              p-5
              dark:border-white/10
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <h2
                className="
                  font-semibold
                  text-slate-900
                  dark:text-white
                "
              >
                All Books
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                {books.length} books in database
              </p>
            </div>

            <div className="relative w-full sm:w-[300px]">
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
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search books..."
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
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
                "
              />
            </div>
          </div>

          {loading ? (
            <div
              className="
                flex
                min-h-[300px]
                items-center
                justify-center
              "
            >
              <Loader2
                size={28}
                className="
                  animate-spin
                  text-[#2196F3]
                "
              />
            </div>
          ) : filteredBooks.length === 0 ? (
            <div
              className="
                flex
                min-h-[320px]
                flex-col
                items-center
                justify-center
                px-6
                text-center
              "
            >
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#2196F3]/10
                  text-[#2196F3]
                "
              >
                <BookOpen size={24} />
              </div>

              <h3
                className="
                  mt-4
                  font-semibold
                  text-slate-900
                  dark:text-white
                "
              >
                No books found
              </h3>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Add your first book to get started.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead
                  className="
                    bg-slate-50
                    dark:bg-white/[0.025]
                  "
                >
                  <tr>
                    <TableHeading>Book</TableHeading>
                    <TableHeading>
                      Category
                    </TableHeading>
                    <TableHeading>
                      Price
                    </TableHeading>
                    <TableHeading>
                      Stock
                    </TableHeading>
                    <TableHeading>
                      Featured
                    </TableHeading>
                    <TableHeading>
                      Status
                    </TableHeading>
                    <TableHeading align="right">
                      Actions
                    </TableHeading>
                  </tr>
                </thead>

                <tbody
                  className="
                    divide-y
                    divide-slate-100
                    dark:divide-white/[0.06]
                  "
                >
                  {filteredBooks.map((book) => (
                    <tr
                      key={book.id}
                      className="
                        transition
                        hover:bg-slate-50/70
                        dark:hover:bg-white/[0.025]
                      "
                    >
                      <td className="px-5 py-4">
                        <div>
                          <p
                            className="
                              max-w-[280px]
                              truncate
                              text-sm
                              font-semibold
                              text-slate-900
                              dark:text-white
                            "
                          >
                            {book.title}
                          </p>

                          <p
                            className="
                              mt-1
                              text-xs
                              text-slate-500
                              dark:text-slate-400
                            "
                          >
                            {book.author}
                          </p>

                          <p
                            className="
                              mt-1
                              text-[11px]
                              text-slate-400
                            "
                          >
                            /{book.slug}
                          </p>
                        </div>
                      </td>

                      <td
                        className="
                          px-5
                          py-4
                          text-sm
                          text-slate-600
                          dark:text-slate-300
                        "
                      >
                        {book.category}
                      </td>

                      <td
                        className="
                          px-5
                          py-4
                          text-sm
                          font-semibold
                          text-slate-900
                          dark:text-white
                        "
                      >
                        £{Number(book.price).toFixed(2)}
                      </td>

                      <td
                        className="
                          px-5
                          py-4
                          text-sm
                          text-slate-600
                          dark:text-slate-300
                        "
                      >
                        {book.stock}
                      </td>

                      <td className="px-5 py-4">
                        {book.isFeatured ? (
                          <Badge variant="blue">
                            Featured
                          </Badge>
                        ) : (
                          <span
                            className="
                              text-xs
                              text-slate-400
                            "
                          >
                            —
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            toggleActive(book)
                          }
                        >
                          {book.isActive ? (
                            <Badge variant="green">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="gray">
                              Inactive
                            </Badge>
                          )}
                        </button>
                      </td>

                      <td className="px-5 py-4">
                        <div
                          className="
                            flex
                            items-center
                            justify-end
                            gap-2
                          "
                        >
                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(book)
                            }
                            aria-label="Edit book"
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-lg
                              border
                              border-slate-200
                              text-slate-500
                              transition
                              hover:border-[#2196F3]/30
                              hover:bg-[#2196F3]/5
                              hover:text-[#2196F3]
                              dark:border-white/10
                              dark:text-slate-400
                            "
                          >
                            <Edit3 size={15} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteBook(book)
                            }
                            aria-label="Delete book"
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-lg
                              border
                              border-slate-200
                              text-slate-500
                              transition
                              hover:border-red-200
                              hover:bg-red-50
                              hover:text-red-500
                              dark:border-white/10
                              dark:text-slate-400
                              dark:hover:border-red-500/20
                              dark:hover:bg-red-500/10
                              dark:hover:text-red-400
                            "
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================
          ADD / EDIT MODAL
      ========================================================= */}

      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="
                fixed
                inset-0
                z-[100]
                bg-slate-950/50
                backdrop-blur-sm
              "
            />

            <div
              className="
                pointer-events-none
                fixed
                inset-0
                z-[110]
                flex
                items-center
                justify-center
                p-4
              "
            >
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: 15,
                  scale: 0.98,
                }}
                className="
                  pointer-events-auto
                  flex
                  max-h-[92vh]
                  w-full
                  max-w-[850px]
                  flex-col
                  overflow-hidden
                  rounded-[26px]
                  border
                  border-slate-200
                  bg-white
                  shadow-2xl
                  dark:border-white/10
                  dark:bg-[#081B2A]
                "
              >
                {/* MODAL HEADER */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-slate-200
                    px-6
                    py-5
                    dark:border-white/10
                  "
                >
                  <div>
                    <h2
                      className="
                        text-xl
                        font-semibold
                        text-slate-950
                        dark:text-white
                      "
                    >
                      {editingBook
                        ? "Edit Book"
                        : "Add New Book"}
                    </h2>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-slate-500
                        dark:text-slate-400
                      "
                    >
                      Enter your book information below.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={saving}
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-slate-200
                      text-slate-500
                      transition
                      hover:bg-slate-50
                      hover:text-slate-900
                      disabled:opacity-50
                      dark:border-white/10
                      dark:hover:bg-white/5
                      dark:hover:text-white
                    "
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* FORM */}

                <form
                  onSubmit={handleSubmit}
                  className="
                    flex
                    min-h-0
                    flex-1
                    flex-col
                  "
                >
                  <div
                    className="
                      min-h-0
                      flex-1
                      overflow-y-auto
                      p-6
                    "
                  >
                    {error && (
                      <div
                        className="
                          mb-5
                          flex
                          items-center
                          gap-2
                          rounded-xl
                          border
                          border-red-200
                          bg-red-50
                          px-4
                          py-3
                          text-sm
                          text-red-600
                          dark:border-red-500/20
                          dark:bg-red-500/10
                          dark:text-red-400
                        "
                      >
                        <XCircle size={17} />

                        {error}
                      </div>
                    )}

                    <div
                      className="
                        grid
                        gap-5
                        md:grid-cols-2
                      "
                    >
                      <FormField
                        label="Book Title"
                        required
                      >
                        <input
                          value={form.title}
                          onChange={(event) =>
                            handleTitleChange(
                              event.target.value
                            )
                          }
                          placeholder="Book title"
                          className={inputClass}
                        />
                      </FormField>

                      <FormField
                        label="Slug"
                        required
                      >
                        <input
                          value={form.slug}
                          onChange={(event) =>
                            setForm((current) => ({
                              ...current,
                              slug: createSlug(
                                event.target.value
                              ),
                            }))
                          }
                          placeholder="book-slug"
                          className={inputClass}
                        />
                      </FormField>

                      <FormField
                        label="Author"
                        required
                      >
                        <input
                          value={form.author}
                          onChange={(event) =>
                            setForm((current) => ({
                              ...current,
                              author:
                                event.target.value,
                            }))
                          }
                          placeholder="Author name"
                          className={inputClass}
                        />
                      </FormField>

                      <FormField
                        label="Category"
                        required
                      >
                        <input
                          value={form.category}
                          onChange={(event) =>
                            setForm((current) => ({
                              ...current,
                              category:
                                event.target.value,
                            }))
                          }
                          placeholder="Book category"
                          className={inputClass}
                        />
                      </FormField>

                      <FormField
                        label="Price (£)"
                        required
                      >
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={form.price}
                          onChange={(event) =>
                            setForm((current) => ({
                              ...current,
                              price:
                                event.target.value,
                            }))
                          }
                          placeholder="35.00"
                          className={inputClass}
                        />
                      </FormField>

                      <FormField label="Stock">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={form.stock}
                          onChange={(event) =>
                            setForm((current) => ({
                              ...current,
                              stock:
                                event.target.value,
                            }))
                          }
                          placeholder="0"
                          className={inputClass}
                        />
                      </FormField>

                      <div className="md:col-span-2">
                        <FormField
                          label="Cover Image"
                          required
                        >
                          <input
                            value={form.coverImage}
                            onChange={(event) =>
                              setForm((current) => ({
                                ...current,
                                coverImage:
                                  event.target.value,
                              }))
                            }
                            placeholder="/books.png"
                            className={inputClass}
                          />

                          <p
                            className="
                              mt-2
                              text-xs
                              text-slate-400
                            "
                          >
                            For now enter an image path such as
                            /books.png. We can connect image
                            upload later.
                          </p>
                        </FormField>
                      </div>

                      <div className="md:col-span-2">
                        <FormField label="Short Description">
                          <textarea
                            value={
                              form.shortDescription
                            }
                            onChange={(event) =>
                              setForm((current) => ({
                                ...current,
                                shortDescription:
                                  event.target.value,
                              }))
                            }
                            rows={3}
                            placeholder="Short description..."
                            className={`${inputClass} h-auto min-h-[100px] py-3`}
                          />
                        </FormField>
                      </div>

                      <div className="md:col-span-2">
                        <FormField label="Full Description">
                          <textarea
                            value={form.description}
                            onChange={(event) =>
                              setForm((current) => ({
                                ...current,
                                description:
                                  event.target.value,
                              }))
                            }
                            rows={6}
                            placeholder="Full book description..."
                            className={`${inputClass} h-auto min-h-[150px] py-3`}
                          />
                        </FormField>
                      </div>

                      <div className="md:col-span-2">
                        <div
                          className="
                            grid
                            gap-3
                            sm:grid-cols-2
                          "
                        >
                          <ToggleCard
                            checked={form.isActive}
                            onChange={(checked) =>
                              setForm((current) => ({
                                ...current,
                                isActive: checked,
                              }))
                            }
                            title="Active"
                            description="Show this book on the website."
                          />

                          <ToggleCard
                            checked={
                              form.isFeatured
                            }
                            onChange={(checked) =>
                              setForm((current) => ({
                                ...current,
                                isFeatured: checked,
                              }))
                            }
                            title="Featured"
                            description="Mark this as a featured book."
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FOOTER */}

                  <div
                    className="
                      flex
                      items-center
                      justify-end
                      gap-3
                      border-t
                      border-slate-200
                      px-6
                      py-4
                      dark:border-white/10
                    "
                  >
                    <button
                      type="button"
                      onClick={closeModal}
                      disabled={saving}
                      className="
                        h-11
                        rounded-xl
                        border
                        border-slate-200
                        px-5
                        text-sm
                        font-semibold
                        text-slate-600
                        transition
                        hover:bg-slate-50
                        disabled:opacity-50
                        dark:border-white/10
                        dark:text-slate-300
                        dark:hover:bg-white/5
                      "
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={saving}
                      className="
                        inline-flex
                        h-11
                        min-w-[130px]
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-[#2196F3]
                        px-5
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-[#1976D2]
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    >
                      {saving ? (
                        <>
                          <Loader2
                            size={16}
                            className="animate-spin"
                          />

                          Saving...
                        </>
                      ) : editingBook ? (
                        "Update Book"
                      ) : (
                        "Add Book"
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

const inputClass = `
  h-12
  w-full
  rounded-xl
  border
  border-slate-200
  bg-white
  px-4
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
`;

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div
      className="
        rounded-[20px]
        border
        border-slate-200/70
        bg-white
        p-5
        shadow-[0_12px_35px_rgba(15,23,42,0.04)]
        dark:border-white/10
        dark:bg-[#0B2031]
      "
    >
      <p
        className="
          text-xs
          font-medium
          text-slate-500
          dark:text-slate-400
        "
      >
        {title}
      </p>

      <p
        className="
          mt-3
          text-3xl
          font-semibold
          tracking-[-0.04em]
          text-slate-950
          dark:text-white
        "
      >
        {value}
      </p>
    </div>
  );
}

function TableHeading({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`
        px-5
        py-3.5
        text-xs
        font-semibold
        uppercase
        tracking-[0.08em]
        text-slate-400
        ${
          align === "right"
            ? "text-right"
            : "text-left"
        }
      `}
    >
      {children}
    </th>
  );
}

function Badge({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "green" | "gray" | "blue";
}) {
  const styles = {
    green:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400",

    gray:
      "border-slate-200 bg-slate-50 text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400",

    blue:
      "border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400",
  };

  return (
    <span
      className={`
        inline-flex
        rounded-full
        border
        px-2.5
        py-1
        text-[11px]
        font-semibold
        ${styles[variant]}
      `}
    >
      {children}
    </span>
  );
}

function FormField({
  label,
  required = false,       
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span
        className="
          mb-2
          block
          text-xs
          font-semibold
          text-slate-600
          dark:text-slate-300
        "
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </span>

      {children}
    </label>
  );
}

function ToggleCard({
  checked,
  onChange,
  title,
  description,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  title: string;
  description: string;
}) {
  return (
    <label
      className="
        flex
        cursor-pointer
        items-center
        justify-between
        gap-4
        rounded-xl
        border
        border-slate-200
        p-4
        transition
        hover:border-[#2196F3]/30
        dark:border-white/10
      "
    >
      <div>
        <p
          className="
            text-sm
            font-semibold
            text-slate-900
            dark:text-white
          "
        >
          {title}
        </p>

        <p
          className="
            mt-1
            text-xs
            text-slate-500
            dark:text-slate-400
          "
        >
          {description}
        </p>
      </div>

      <input
        type="checkbox"
        checked={checked}
        onChange={(event) =>
          onChange(event.target.checked)
        }
        className="
          h-4
          w-4
          shrink-0
          accent-[#2196F3]
        "
      />
    </label>
  );
}