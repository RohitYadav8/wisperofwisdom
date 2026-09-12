"use client";

import { FormEvent, useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";

export function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/admin/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
          rememberMe,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Invalid email or password.");
        return;
      }

      window.location.href = "/admin/dashboard";
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* EMAIL */}

      <div>
        <label
          htmlFor="email"
          className="
            mb-2
            block

            text-[13px]
            font-semibold

            text-[#334155]

            dark:text-slate-300
          "
        >
          Email
        </label>

        <div className="relative">
          <Mail
            size={18}
            className="
              absolute
              left-4
              top-1/2

              -translate-y-1/2

              text-slate-400
            "
          />

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter admin email"
            autoComplete="email"
            className="
              h-[52px]
              w-full

              rounded-[14px]

              border
              border-slate-200

              bg-white/75

              pl-12
              pr-4

              text-[14px]
              text-[#0F172A]

              outline-none

              transition-all
              duration-300

              placeholder:text-slate-400

              focus:border-[#2196F3]
              focus:ring-4
              focus:ring-[#2196F3]/10

              dark:border-white/10
              dark:bg-white/[0.05]
              dark:text-white
              dark:placeholder:text-slate-500

              dark:focus:border-[#42A5F5]/70
            "
          />
        </div>
      </div>

      {/* PASSWORD */}

      <div>
        <label
          htmlFor="password"
          className="
            mb-2
            block

            text-[13px]
            font-semibold

            text-[#334155]

            dark:text-slate-300
          "
        >
          Password
        </label>

        <div className="relative">
          <LockKeyhole
            size={18}
            className="
              absolute
              left-4
              top-1/2

              -translate-y-1/2

              text-slate-400
            "
          />

          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            autoComplete="current-password"
            className="
              h-[52px]
              w-full

              rounded-[14px]

              border
              border-slate-200

              bg-white/75

              pl-12
              pr-12

              text-[14px]
              text-[#0F172A]

              outline-none

              transition-all
              duration-300

              placeholder:text-slate-400

              focus:border-[#2196F3]
              focus:ring-4
              focus:ring-[#2196F3]/10

              dark:border-white/10
              dark:bg-white/[0.05]
              dark:text-white
              dark:placeholder:text-slate-500

              dark:focus:border-[#42A5F5]/70
            "
          />

          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={
              showPassword ? "Hide password" : "Show password"
            }
            className="
              absolute
              right-4
              top-1/2

              -translate-y-1/2

              text-slate-400

              transition-colors

              hover:text-[#2196F3]
            "
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>
      </div>

      {/* REMEMBER */}

      <label
        className="
          flex
          w-fit
          cursor-pointer
          items-center
          gap-2.5
        "
      >
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(event) =>
            setRememberMe(event.target.checked)
          }
          className="
            h-4
            w-4

            accent-[#2196F3]
          "
        />

        <span
          className="
            text-[13px]
            text-slate-500

            dark:text-slate-400
          "
        >
          Remember me
        </span>
      </label>

      {/* ERROR */}

      {error && (
        <div
          className="
            rounded-[12px]

            border
            border-red-200

            bg-red-50

            px-4
            py-3

            text-[13px]
            text-red-600

            dark:border-red-500/20
            dark:bg-red-500/10
            dark:text-red-300
          "
        >
          {error}
        </div>
      )}

      {/* LOGIN */}

      <button
        type="submit"
        disabled={loading}
        className="
          flex
          h-[52px]
          w-full

          items-center
          justify-center

          rounded-[14px]

          bg-[#2196F3]

          text-[12px]
          font-bold
          uppercase

          tracking-[0.15em]

          text-white

          shadow-[0_14px_32px_rgba(33,150,243,0.24)]

          transition-all
          duration-300

          hover:-translate-y-[1px]
          hover:bg-[#1976D2]
          hover:shadow-[0_17px_36px_rgba(33,150,243,0.32)]

          disabled:cursor-not-allowed
          disabled:opacity-60
          disabled:hover:translate-y-0
        "
      >
        {loading ? "Signing In..." : "Login"}
      </button>
    </form>
  );
}