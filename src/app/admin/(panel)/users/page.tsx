"use client";

import {
  FormEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CheckCircle2,
  Edit3,
  Loader2,
  Mail,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
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

type AdminUser = {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type AdminForm = {
  name: string;
  email: string;
  password: string;
};

const emptyAdminForm: AdminForm = {
  name: "",
  email: "",
  password: "",
};

export default function AdminUsersPage() {
  // =========================================================
  // PUBLIC WEBSITE USERS
  // =========================================================

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  // =========================================================
  // ADMIN USERS
  // =========================================================

  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [adminLoading, setAdminLoading] = useState(true);

  // =========================================================
  // ADMIN USER MODAL
  // =========================================================

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminForm, setAdminForm] =
    useState<AdminForm>(emptyAdminForm);
  const [savingAdmin, setSavingAdmin] = useState(false);

  // =========================================================
  // PUBLIC USER ACTIONS
  // =========================================================

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
  });

  const [savingUser, setSavingUser] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [statusUpdatingId, setStatusUpdatingId] =
    useState<number | null>(null);

  // =========================================================
  // MESSAGES
  // =========================================================

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================================================
  // FETCH PUBLIC USERS
  // =========================================================

  const fetchUsers = useCallback(
    async (showRefresh = false) => {
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
          throw new Error(
            data.message || "Failed to fetch users."
          );
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
    },
    []
  );

  // =========================================================
  // FETCH ADMIN USERS
  // =========================================================

  const fetchAdminUsers = useCallback(async () => {
    try {
      setAdminLoading(true);

      const response = await fetch("/api/admin/admin-users", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch admin users."
        );
      }

      setAdminUsers(data.adminUsers ?? []);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to fetch admin users.";

      setError(message);
    } finally {
      setAdminLoading(false);
    }
  }, []);

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchUsers();
    fetchAdminUsers();
  }, [fetchUsers, fetchAdminUsers]);

  // =========================================================
  // FILTER PUBLIC USERS
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
  // REFRESH EVERYTHING
  // =========================================================

  async function handleRefresh() {
    setRefreshing(true);
    setError("");

    try {
      await Promise.all([
        fetchUsers(true),
        fetchAdminUsers(),
      ]);
    } finally {
      setRefreshing(false);
    }
  }

  // =========================================================
  // OPEN ADMIN MODAL
  // =========================================================

  function openAdminModal() {
    setAdminForm(emptyAdminForm);
    setError("");
    setSuccess("");
    setIsAdminModalOpen(true);
  }

  // =========================================================
  // CLOSE ADMIN MODAL
  // =========================================================

  function closeAdminModal() {
    if (savingAdmin) {
      return;
    }

    setIsAdminModalOpen(false);
    setAdminForm(emptyAdminForm);
  }

  // =========================================================
  // CREATE ADMIN USER
  // =========================================================

  async function handleAdminSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const name = adminForm.name.trim();
    const email = adminForm.email.trim().toLowerCase();
    const password = adminForm.password;

    if (!name || !email || !password) {
      setError(
        "Name, email and password are required."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Admin password must be at least 6 characters."
      );
      return;
    }

    try {
      setSavingAdmin(true);
      setError("");
      setSuccess("");

      const response = await fetch(
        "/api/admin/admin-users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to create admin user."
        );
      }

      // Add newly created admin immediately to UI
      if (data.adminUser) {
        setAdminUsers((currentAdmins) => [
          data.adminUser,
          ...currentAdmins,
        ]);
      } else {
        // Fallback: reload admin users
        await fetchAdminUsers();
      }

      setIsAdminModalOpen(false);
      setAdminForm(emptyAdminForm);

      setSuccess(
        `Admin user "${name}" was created successfully.`
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to create admin user.";

      setError(message);
    } finally {
      setSavingAdmin(false);
    }
  }

  // =========================================================
  // OPEN EDIT USER MODAL
  // =========================================================

  function openEditModal(user: User) {
    setEditingUser(user);

    setEditForm({
      name: user.name,
      email: user.email,
    });

    setError("");
    setSuccess("");
    setIsEditModalOpen(true);
  }

  // =========================================================
  // CLOSE EDIT MODAL
  // =========================================================

  function closeEditModal() {
    if (savingUser) {
      return;
    }

    setIsEditModalOpen(false);
    setEditingUser(null);

    setEditForm({
      name: "",
      email: "",
    });
  }

  // =========================================================
  // UPDATE PUBLIC USER
  // =========================================================

  async function handleUserUpdate(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!editingUser) {
      return;
    }

    const name = editForm.name.trim();
    const email = editForm.email.trim().toLowerCase();

    if (!name || !email) {
      setError("Name and email are required.");
      return;
    }

    try {
      setSavingUser(true);
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/admin/users/${editingUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name,
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update user."
        );
      }

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                name,
                email,
              }
            : user
        )
      );

      setIsEditModalOpen(false);
      setEditingUser(null);

      setEditForm({
        name: "",
        email: "",
      });

      setSuccess("User updated successfully.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to update user.";

      setError(message);
    } finally {
      setSavingUser(false);
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
          data.message ||
            "Failed to update user status."
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
  // DELETE PUBLIC USER
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
            Manage registered Whispers of Wisdom members.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-[#0B2031] dark:text-slate-200 dark:hover:bg-white/5"
          >
            <RefreshCw
              size={17}
              className={
                refreshing ? "animate-spin" : ""
              }
            />
            Refresh
          </button>

          <button
            type="button"
            onClick={openAdminModal}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#2196F3] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1976D2]"
          >
            <Plus size={18} />
            Add Admin User
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
          description="All registered members"
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
          PUBLIC USERS TABLE
      ====================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0B2031]">
        {/* SEARCH */}

        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
          <div>
            <h2 className="font-semibold text-slate-950 dark:text-white">
              All Registered Users
            </h2>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {filteredUsers.length} user
              {filteredUsers.length === 1
                ? ""
                : "s"}{" "}
              found
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
              {search
                ? "No users found"
                : "No registered users yet"}
            </h3>

            <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
              {search
                ? "Try searching with another name or email."
                : "Users who register from the website Account page will appear here automatically."}
            </p>
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
          ADMIN USERS TABLE
      ====================================================== */}

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0B2031]">
        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck
                size={18}
                className="text-[#2196F3]"
              />

              <h2 className="font-semibold text-slate-950 dark:text-white">
                Admin Users
              </h2>
            </div>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Users who have access to the Admin Panel.
            </p>
          </div>

          <div className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-[#2196F3] dark:bg-[#2196F3]/10">
            {adminUsers.length} Admin
            {adminUsers.length === 1 ? "" : "s"}
          </div>
        </div>

        {/* ADMIN LOADING */}

        {adminLoading ? (
          <div className="flex min-h-48 flex-col items-center justify-center gap-3">
            <Loader2
              size={28}
              className="animate-spin text-[#2196F3]"
            />

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Loading admin users...
            </p>
          </div>
        ) : adminUsers.length === 0 ? (
          /* EMPTY ADMIN STATE */

          <div className="flex min-h-48 flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#2196F3] dark:bg-[#2196F3]/10">
              <ShieldCheck size={26} />
            </div>

            <h3 className="font-semibold text-slate-950 dark:text-white">
              No admin users found
            </h3>

            <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
              Click "Add Admin User" to create an admin account.
            </p>
          </div>
        ) : (
          /* ADMIN TABLE */

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px]">
              <thead className="bg-slate-50/80 dark:bg-[#061522]/70">
                <tr className="border-b border-slate-200 dark:border-white/10">
                  <TableHeading>Admin</TableHeading>
                  <TableHeading>Email</TableHeading>
                  <TableHeading>Status</TableHeading>
                  <TableHeading>Created</TableHeading>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Access
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {adminUsers.map((admin) => (
                  <tr
                    key={admin.id}
                    className="transition hover:bg-slate-50/70 dark:hover:bg-white/[0.025]"
                  >
                    {/* ADMIN */}

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2196F3] to-[#06466B] text-sm font-bold text-white">
                          {admin.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {admin.name}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-400">
                            Admin ID #{admin.id}
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

                        {admin.email}
                      </div>
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                          admin.isActive
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                            : "bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            admin.isActive
                              ? "bg-emerald-500"
                              : "bg-slate-400"
                          }`}
                        />

                        {admin.isActive
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>

                    {/* CREATED */}

                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                      {formatDate(admin.createdAt)}
                    </td>

                    {/* ACCESS */}

                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-[#2196F3] dark:bg-[#2196F3]/10">
                        <ShieldCheck size={14} />
                        Admin Access
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* =====================================================
          ADD ADMIN USER MODAL
      ====================================================== */}

      {isAdminModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeAdminModal();
            }
          }}
        >
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0B2031]">
            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    size={19}
                    className="text-[#2196F3]"
                  />

                  <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                    Add Admin User
                  </h2>
                </div>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Create an account that can access the Admin Panel.
                </p>
              </div>

              <button
                type="button"
                onClick={closeAdminModal}
                disabled={savingAdmin}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/5 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleAdminSubmit}
              className="p-6"
            >
              <div className="space-y-5">
                {/* NAME */}

                <div>
                  <label
                    htmlFor="admin-name"
                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Full Name
                  </label>

                  <input
                    id="admin-name"
                    type="text"
                    value={adminForm.name}
                    onChange={(event) =>
                      setAdminForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Enter full name"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#2196F3] focus:ring-2 focus:ring-[#2196F3]/10 dark:border-white/10 dark:bg-[#061522] dark:text-white"
                  />
                </div>

                {/* EMAIL */}

                <div>
                  <label
                    htmlFor="admin-email"
                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Admin Email
                  </label>

                  <input
                    id="admin-email"
                    type="email"
                    value={adminForm.email}
                    onChange={(event) =>
                      setAdminForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    placeholder="admin@example.com"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#2196F3] focus:ring-2 focus:ring-[#2196F3]/10 dark:border-white/10 dark:bg-[#061522] dark:text-white"
                  />
                </div>

                {/* PASSWORD */}

                <div>
                  <label
                    htmlFor="admin-password"
                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Password
                  </label>

                  <input
                    id="admin-password"
                    type="password"
                    value={adminForm.password}
                    onChange={(event) =>
                      setAdminForm((current) => ({
                        ...current,
                        password: event.target.value,
                      }))
                    }
                    placeholder="Minimum 6 characters"
                    minLength={6}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#2196F3] focus:ring-2 focus:ring-[#2196F3]/10 dark:border-white/10 dark:bg-[#061522] dark:text-white"
                  />
                </div>
              </div>

              {/* BUTTONS */}

              <div className="mt-7 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeAdminModal}
                  disabled={savingAdmin}
                  className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={savingAdmin}
                  className="inline-flex h-11 min-w-36 items-center justify-center gap-2 rounded-xl bg-[#2196F3] px-5 text-sm font-semibold text-white transition hover:bg-[#1976D2] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {savingAdmin ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                      Creating...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={17} />
                      Create Admin
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          EDIT PUBLIC USER MODAL
      ====================================================== */}

      {isEditModalOpen && editingUser && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeEditModal();
            }
          }}
        >
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0B2031]">
            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-white/10">
              <div>
                <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                  Edit User
                </h2>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Update the registered user's information.
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                disabled={savingUser}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/5 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleUserUpdate}
              className="p-6"
            >
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="edit-user-name"
                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Full Name
                  </label>

                  <input
                    id="edit-user-name"
                    type="text"
                    value={editForm.name}
                    onChange={(event) =>
                      setEditForm((current) => ({
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
                    htmlFor="edit-user-email"
                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Email Address
                  </label>

                  <input
                    id="edit-user-email"
                    type="email"
                    value={editForm.email}
                    onChange={(event) =>
                      setEditForm((current) => ({
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
                  onClick={closeEditModal}
                  disabled={savingUser}
                  className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={savingUser}
                  className="inline-flex h-11 min-w-32 items-center justify-center gap-2 rounded-xl bg-[#2196F3] px-5 text-sm font-semibold text-white transition hover:bg-[#1976D2] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {savingUser ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Edit3 size={16} />
                      Update User
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
  icon: ReactNode;
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
  children: ReactNode;
}) {
  return (
    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
      {children}
    </th>
  );
}