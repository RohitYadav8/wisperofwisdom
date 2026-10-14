
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";

type AccountMode = "register" | "login";

const inputClass =
  "h-12 w-full rounded-xl border border-[#D8DDE5] bg-white px-4 text-sm text-[#172536] outline-none transition placeholder:text-slate-400 focus:border-[#2196F3] focus:ring-4 focus:ring-[#2196F3]/10 dark:border-white/15 dark:bg-[#0B2031] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-[#42A5F5] dark:focus:ring-[#42A5F5]/10";

const buttonClass =
  "group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2196F3] px-5 text-sm font-semibold text-white shadow-lg shadow-[#2196F3]/20 transition hover:bg-[#1976D2] disabled:cursor-not-allowed disabled:opacity-60";

export default function AccountPage() {
  const router = useRouter();

  const [mode, setMode] = useState<AccountMode>("register");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");

  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");

  function changeMode(nextMode: AccountMode) {
    setMode(nextMode);
    setLoginError("");
    setRegisterError("");
    setLoginMessage("");
    setRegisterMessage("");
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");
    setLoginMessage("");
    setLoginLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail.trim().toLowerCase(),
          password: loginPassword,
          rememberMe,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoginError(data.message || "Login failed. Please try again.");
        return;
      }

      setLoginMessage(data.message || "Login successful.");
      router.refresh();
      router.push("/");
    } catch {
      setLoginError("Unable to connect to the server. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRegisterError("");
    setRegisterMessage("");

    const email = registerEmail.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setRegisterError("Please enter a valid email address.");
      return;
    }

    setRegisterLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newsletter }),
      });

      const data = await response.json();

      if (!response.ok) {
        setRegisterError(
          data.message || "Registration failed. Please try again."
        );
        return;
      }

      setRegisterMessage(
        data.message ||
          "Please check your email for a secure link to set your password."
      );
      setRegisterEmail("");
    } catch {
      setRegisterError("Unable to connect to the server. Please try again.");
    } finally {
      setRegisterLoading(false);
    }
  }

  return (
    <main className="relative isolate overflow-hidden bg-[#F7F6F1] px-4 py-10 text-[#172536] transition-colors duration-300 dark:bg-[#04131F] dark:text-white sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 -z-10 h-80 w-80 rounded-full bg-[#2196F3]/10 blur-[100px] dark:bg-[#2196F3]/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-[#B7DDF8]/40 blur-[110px] dark:bg-[#2196F3]/10"
      />

      <div className="mx-auto max-w-6xl">
        {/* Page heading */}
        <div className="mb-9 flex flex-col justify-between gap-4 border-b border-[#DCDDD7] pb-7 transition-colors dark:border-white/10 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#2196F3]">
              Whispers of Wisdom
            </p>
            <h1 className="font-serif text-4xl tracking-tight text-[#303331] dark:text-white sm:text-5xl">
              My Account
            </h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
              Your personal space for thoughtful reading and new discoveries.
            </p>
          </div>

          <nav aria-label="Breadcrumb" className="text-sm text-slate-500 dark:text-slate-400">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span>Shop</span>
            <span className="mx-2">/</span>
            <span className="font-medium text-[#2196F3]">My Account</span>
          </nav>
        </div>

        <div className="grid items-stretch gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          {/* Brand panel */}
          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl bg-[#071D2D] p-7 text-white shadow-xl shadow-slate-900/10 sm:p-10 lg:min-h-[560px]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 rounded-full border border-white/10"
            />

            <div className="relative">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2196F3]">
                <BookOpen size={23} />
              </div>

              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#64B5F6]">
                A world of wisdom
              </p>

              <h2 className="max-w-md font-serif text-3xl leading-tight sm:text-4xl">
                Every new chapter begins with a single step.
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
                Create your account and begin your journey with Whispers of Wisdom.
              </p>
            </div>

            <div className="relative mt-12 border-t border-white/15 pt-6">
              <div className="flex items-start gap-3">
                <ShieldCheck size={21} className="mt-0.5 shrink-0 text-[#64B5F6]" />
                <div>
                  <p className="text-sm font-semibold">Your account, your journey</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Secure access and a simple way to get started.
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Login and registration card */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="rounded-3xl border border-white bg-white p-5 shadow-[0_20px_70px_rgba(15,23,42,0.07)] transition-colors duration-300 dark:border-white/10 dark:bg-[#081C2B] dark:shadow-black/20 sm:p-8 lg:p-10"
          >
            {/* Tabs */}
            <div className="mb-8 grid grid-cols-2 rounded-xl bg-[#F3F5F7] p-1 dark:bg-[#0B2031]">
              <button
                type="button"
                onClick={() => changeMode("register")}
                aria-pressed={mode === "register"}
                className={`rounded-lg px-3 py-3 text-sm font-semibold transition ${
                  mode === "register"
                    ? "bg-white text-[#172536] shadow-sm dark:bg-[#18354A] dark:text-white"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                Create Account
              </button>

              <button
                type="button"
                onClick={() => changeMode("login")}
                aria-pressed={mode === "login"}
                className={`rounded-lg px-3 py-3 text-sm font-semibold transition ${
                  mode === "login"
                    ? "bg-white text-[#172536] shadow-sm dark:bg-[#18354A] dark:text-white"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                Login
              </button>
            </div>

            {mode === "register" ? (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#2196F3]">
                  Join our community
                </p>

                <h2 className="font-serif text-3xl text-[#172536] dark:text-white sm:text-4xl">
                  Create your account
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Enter your email address. We&apos;ll send you a secure link to set your password.
                </p>

                <form onSubmit={handleRegister} className="mt-8 space-y-5">
                  {registerError && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-300"
                    >
                      {registerError}
                    </div>
                  )}

                  {registerMessage && (
                    <div
                      role="status"
                      className="flex gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-800 dark:border-green-400/20 dark:bg-green-500/10 dark:text-green-300"
                    >
                      <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
                      <span>{registerMessage}</span>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="register-email"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-700 dark:text-slate-300"
                    >
                      Email address <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <Mail
                        size={18}
                        aria-hidden="true"
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        id="register-email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        maxLength={254}
                        placeholder="you@example.com"
                        value={registerEmail}
                        onChange={(event) => setRegisterEmail(event.target.value)}
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </div>

                  <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                    After registering, check your inbox for the password setup link.
                    You can create your password from that email.
                  </p>

                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-4 transition-colors dark:border-white/10 dark:bg-white/[0.03]">
                    <input
                      type="checkbox"
                      checked={newsletter}
                      onChange={(event) => setNewsletter(event.target.checked)}
                      className="mt-1 h-4 w-4 accent-[#2196F3]"
                    />
                    <span className="text-sm leading-5 text-slate-600 dark:text-slate-300">
                      Subscribe to our newsletter for updates and news.
                    </span>
                  </label>

                  <button type="submit" disabled={registerLoading} className={buttonClass}>
                    {registerLoading ? "Sending email..." : "Register with email"}
                    {!registerLoading && (
                      <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                    )}
                  </button>

                  <p className="text-center text-xs leading-5 text-slate-400 dark:text-slate-500">
                    By registering, you agree to our website terms and privacy policy.
                  </p>

                  <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => changeMode("login")}
                      className="font-semibold text-[#2196F3] hover:underline"
                    >
                      Login
                    </button>
                  </p>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#2196F3]">
                  Welcome back
                </p>

                <h2 className="font-serif text-3xl text-[#172536] dark:text-white sm:text-4xl">
                  Login to your account
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Enter your email and password to continue.
                </p>

                <form onSubmit={handleLogin} className="mt-8 space-y-5">
                  {loginError && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-300"
                    >
                      {loginError}
                    </div>
                  )}

                  {loginMessage && (
                    <div
                      role="status"
                      className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-400/20 dark:bg-green-500/10 dark:text-green-300"
                    >
                      {loginMessage}
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="login-email"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-700 dark:text-slate-300"
                    >
                      Email address
                    </label>

                    <div className="relative">
                      <Mail
                        size={18}
                        aria-hidden="true"
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        id="login-email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        placeholder="you@example.com"
                        value={loginEmail}
                        onChange={(event) => setLoginEmail(event.target.value)}
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="login-password"
                      className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-700 dark:text-slate-300"
                    >
                      Password
                    </label>

                    <div className="relative">
                      <LockKeyhole
                        size={18}
                        aria-hidden="true"
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        autoComplete="current-password"
                        required
                        placeholder="Enter your password"
                        value={loginPassword}
                        onChange={(event) => setLoginPassword(event.target.value)}
                        className={`${inputClass} pl-11 pr-12`}
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-400 transition hover:text-[#2196F3]"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(event) => setRememberMe(event.target.checked)}
                        className="h-4 w-4 accent-[#2196F3]"
                      />
                      Remember me
                    </label>

                    <button
                      type="button"
                      onClick={() => router.push("/account/forgot-password")}
                      className="text-sm font-medium text-[#2196F3] transition hover:text-[#1976D2]"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <button type="submit" disabled={loginLoading} className={buttonClass}>
                    {loginLoading ? "Logging in..." : "Login"}
                    {!loginLoading && (
                      <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                    )}
                  </button>

                  <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => changeMode("register")}
                      className="font-semibold text-[#2196F3] hover:underline"
                    >
                      Register
                    </button>
                  </p>
                </form>
              </motion.div>
            )}
          </motion.section>
        </div>
      </div>    
    </main>
  );
}
