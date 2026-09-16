"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Edit3,
  Loader2,
  Mail,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  UserRound,
  Users,
  X,
  XCircle,
} from "lucide-react";

type User = {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type UserForm = {
  name: string;
  email: string;
};

const emptyForm: UserForm = {
  name: "",
  email: "",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [form, setForm] = useState<UserForm>(emptyForm);
  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [statusUpdatingId, setStatusUpdatingId] = useState<number | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================================================
  // FETCH USERS
  // =========================================================

  const fetchUsers = useCallback(async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch("/api/admin/users", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch users.");
      }

      setUsers(data.users ?? []);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to fetch users.";

      setError(message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // =========================================================
  // FILTER USERS
  // =========================================================

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return users;
    }

    return users.filter((user) => {
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    });
  }, [users, search]);

  // =========================================================
  // COUNTS
  // =========================================================

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.isActive
  ).length;

  const inactiveUsers = totalUsers - activeUsers;

  // =========================================================
  // OPEN ADD MODAL
  // =========================================================

  function openAddModal() {
    setEditingUser(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setIsModalOpen(true);
  }

  // =========================================================
  // OPEN EDIT MODAL
  // =========================================================

  function openEditModal(user: User) {
    setEditingUser(user);

    setForm({
      name: user.name,
      email: user.email,
    });

    setError("");
    setSuccess("");
    setIsModalOpen(true);
  }

  // =========================================================
  // CLOSE MODAL
  // =========================================================

  function closeModal() {
    if (saving) {
      return;
    }

    setIsModalOpen(false);
    setEditingUser(null);
    setForm(emptyForm);
  }

  // =========================================================
  // CREATE / UPDATE USER
  // =========================================================

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (!name || !email) {
      setError("Name and email are required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const url = editingUser
        ? `/api/admin/users/${editingUser.id}`
        : "/api/admin/users";

      const response = await fetch(url, {
        method: editingUser ? "PUT" : "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          name,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            (editingUser
              ? "Failed to update user."
              : "Failed to create user.")
        );
      }

      setIsModalOpen(false);
      setEditingUser(null);
      setForm(emptyForm);

      setSuccess(
        editingUser
          ? "User updated successfully."
          : "User created successfully."
      );

      await fetchUsers();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong.";

      setError(message);
    } finally {
      setSaving(false);
    }
  }

  // =========================================================
  // ACTIVE / INACTIVE
  // =========================================================

  async function handleStatusChange(user: User) {
    try {
      setStatusUpdatingId(user.id);
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/admin/users/${user.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            isActive: !user.isActive,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update user status."
        );
      }

      setUsers((currentUsers) =>
        currentUsers.map((currentUser) =>
          currentUser.id === user.id
            ? {
                ...currentUser,
                isActive: !currentUser.isActive,
              }
            : currentUser
        )
      );

      setSuccess(
        user.isActive
          ? "User deactivated successfully."
          : "User activated successfully."
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to update user status.";

      setError(message);
    } finally {
      setStatusUpdatingId(null);
    }
  }

  // =========================================================
  // DELETE USER
  // =========================================================

  async function handleDelete(user: User) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${user.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(user.id);
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/admin/users/${user.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete user."
        );
      }

      setUsers((currentUsers) =>
        currentUsers.filter(
          (currentUser) => currentUser.id !== user.id
        )
      );

      setSuccess("User deleted successfully.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to delete user.";

      setError(message);
    } finally {
      setDeletingId(null);
    }
  }

  // =========================================================
  // DATE FORMAT
  // =========================================================

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  }

  return (
    <div className="min-h-full">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#2196F3]">
            <Users size={16} />
            User Management
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            Users
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage your Whispers of Wisdom users.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => fetchUsers(true)}
            disabled={refreshing}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-[#0B2031] dark:text-slate-200 dark:hover:bg-white/5"
          >
            <RefreshCw
              size={17}
              className={refreshing ? "animate-spin" : ""}
            />

            Refresh
          </button>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#2196F3] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1976D2]"
          >
            <Plus size={18} />
            Add User
          </button>
        </div>
      </div>

      {/* =====================================================
          MESSAGES
      ====================================================== */}

      {error && (
        <div className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
          <div className="flex items-center gap-2">
            <XCircle size={18} />
            {error}
          </div>

          <button
            type="button"
            onClick={() => setError("")}
          >
            <X size={17} />
          </button>
        </div>
      )}

      {success && (
        <div className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} />
            {success}
          </div>

          <button
            type="button"
            onClick={() => setSuccess("")}
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* =====================================================
          STATS
      ====================================================== */}

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Total Users"
          value={totalUsers}
          description="All registered users"
          icon={<Users size={20} />}
        />

        <StatCard
          title="Active Users"
          value={activeUsers}
          description="Currently active"
          icon={<CheckCircle2 size={20} />}
        />

        <StatCard
          title="Inactive Users"
          value={inactiveUsers}
          description="Currently inactive"
          icon={<XCircle size={20} />}
        />
      </div>

      {/* =====================================================
          USERS TABLE CARD
      ====================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0B2031]">
        {/* SEARCH */}

        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
          <div>
            <h2 className="font-semibold text-slate-950 dark:text-white">
              All Users
            </h2>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {filteredUsers.length} user
              {filteredUsers.length === 1 ? "" : "s"} found
            </p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search name or email..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#2196F3] focus:ring-2 focus:ring-[#2196F3]/10 dark:border-white/10 dark:bg-[#061522] dark:text-white"
            />
          </div>
        </div>

        {/* LOADING */}

        {loading ? (
          <div className="flex min-h-80 flex-col items-center justify-center gap-3">
            <Loader2
              size={30}
              className="animate-spin text-[#2196F3]"
            />

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Loading users...
            </p>
          </div>
        ) : filteredUsers.length === 0 ? (
          /* EMPTY STATE */

          <div className="flex min-h-80 flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#2196F3] dark:bg-[#2196F3]/10">
              <UserRound size={26} />
            </div>

            <h3 className="font-semibold text-slate-950 dark:text-white">
              {search ? "No users found" : "No users yet"}
            </h3>

            <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
              {search
                ? "Try searching with another name or email."
                : "Users will appear here once they are added."}
            </p>

            {!search && (
              <button
                type="button"
                onClick={openAddModal}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#2196F3] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1976D2]"
              >
                <Plus size={17} />
                Add First User
              </button>
            )}
          </div>
        ) : (
          /* TABLE */

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead className="bg-slate-50/80 dark:bg-[#061522]/70">
                <tr className="border-b border-slate-200 dark:border-white/10">
                  <TableHeading>User</TableHeading>
                  <TableHeading>Email</TableHeading>
                  <TableHeading>Status</TableHeading>
                  <TableHeading>Joined</TableHeading>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="transition hover:bg-slate-50/70 dark:hover:bg-white/[0.025]"
                  >
                    {/* USER */}

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2196F3] to-[#06466B] text-sm font-bold text-white">
                          {user.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {user.name}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-400">
                            ID #{user.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* EMAIL */}

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <Mail
                          size={15}
                          className="text-slate-400"
                        />

                        {user.email}
                      </div>
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-4">
                      <button
                        type="button"
                        disabled={
                          statusUpdatingId === user.id
                        }
                        onClick={() =>
                          handleStatusChange(user)
                        }
                        className={`inline-flex min-w-24 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                          user.isActive
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-400"
                        }`}
                      >
                        {statusUpdatingId === user.id ? (
                          <Loader2
                            size={13}
                            className="animate-spin"
                          />
                        ) : (
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              user.isActive
                                ? "bg-emerald-500"
                                : "bg-slate-400"
                            }`}
                          />
                        )}

                        {user.isActive
                          ? "Active"
                          : "Inactive"}
                      </button>
                    </td>

                    {/* DATE */}

                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                      {formatDate(user.createdAt)}
                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(user)
                          }
                          title="Edit user"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-[#2196F3]/30 hover:bg-blue-50 hover:text-[#2196F3] dark:border-white/10 dark:hover:bg-[#2196F3]/10"
                        >
                          <Edit3 size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(user)
                          }
                          disabled={
                            deletingId === user.id
                          }
                          title="Delete user"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:hover:border-red-500/20 dark:hover:bg-red-500/10"
                        >
                          {deletingId === user.id ? (
                            <Loader2
                              size={16}
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2 size={16} />
                          )}
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

      {/* =====================================================
          ADD / EDIT MODAL
      ====================================================== */}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0B2031]">
            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-white/10">
              <div>
                <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                  {editingUser
                    ? "Edit User"
                    : "Add New User"}
                </h2>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {editingUser
                    ? "Update the user information."
                    : "Create a new user."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/5 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="p-6"
            >
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="user-name"
                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Full Name
                  </label>

                  <input
                    id="user-name"
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Enter full name"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#2196F3] focus:ring-2 focus:ring-[#2196F3]/10 dark:border-white/10 dark:bg-[#061522] dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="user-email"
                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Email Address
                  </label>

                  <input
                    id="user-email"
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    placeholder="user@example.com"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#2196F3] focus:ring-2 focus:ring-[#2196F3]/10 dark:border-white/10 dark:bg-[#061522] dark:text-white"
                  />
                </div>
              </div>

              {/* BUTTONS */}

              <div className="mt-7 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex h-11 min-w-32 items-center justify-center gap-2 rounded-xl bg-[#2196F3] px-5 text-sm font-semibold text-white transition hover:bg-[#1976D2] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />

                      Saving...
                    </>
                  ) : editingUser ? (
                    <>
                      <Edit3 size={16} />
                      Update User
                    </>
                  ) : (
                    <>
                      <Plus size={17} />
                      Add User
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================
// STAT CARD
// =========================================================

function StatCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-[#0B2031]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {description}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#2196F3] dark:bg-[#2196F3]/10">
          {icon}
        </div>
      </div>
    </div>
  );
}

// =========================================================
// TABLE HEADING
// =========================================================

function TableHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
      {children}
    </th>
  );
}