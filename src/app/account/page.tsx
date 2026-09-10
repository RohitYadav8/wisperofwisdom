"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { motion } from "motion/react";

export default function AccountPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main
      className="
        min-h-screen
        bg-white
        text-slate-900
        transition-colors
        duration-300

        dark:bg-[#061522]
        dark:text-white
      "
    >
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section
        className="
          border-b
          border-[#ebe8df]
          bg-[#f6f4ed]

          dark:border-white/10
          dark:bg-[#081a28]
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-[1200px]
            flex-col
            gap-4
            px-5
            py-14

            sm:px-8
            md:flex-row
            md:items-center
            md:justify-between
            md:py-16

            lg:px-10
          "
        >
          <motion.h1
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              text-[38px]
              font-medium
              leading-none
              tracking-[-0.02em]
              text-slate-800

              sm:text-[44px]

              dark:text-white
            "
          >
            My Account
          </motion.h1>

          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.1,
              duration: 0.55,
            }}
            className="
              flex
              items-center
              gap-2
              text-sm
              italic
              text-slate-500

              dark:text-slate-400
            "
          >
            <Link
              href="/"
              className="
                transition-colors
                hover:text-[#2196F3]
              "
            >
              Home
            </Link>

            <span>/</span>

            <Link
              href="/shop"
              className="
                transition-colors
                hover:text-[#2196F3]
              "
            >
              Shop
            </Link>

            <span>/</span>

            <span className="text-[#2196F3]">My Account</span>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          LOGIN + REGISTER
      ===================================================== */}

      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div
          className="
            mx-auto
            grid
            max-w-[1200px]
            gap-14

            lg:grid-cols-2
            lg:gap-20
          "
        >
          {/* =================================================
              LOGIN
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="mb-9">
              <p
                className="
                  mb-2
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#2196F3]
                "
              >
                Welcome Back
              </p>

              <h2
                className="
                  text-3xl
                  font-medium
                  tracking-[-0.02em]
                  text-slate-900

                  sm:text-[36px]

                  dark:text-white
                "
              >
                Login
              </h2>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* USERNAME */}

              <div>
                <label
                  htmlFor="login-email"
                  className="
                    mb-2.5
                    block
                    text-[12px]
                    font-semibold
                    uppercase
                    tracking-[0.08em]
                    text-slate-700

                    dark:text-slate-300
                  "
                >
                  Username or email address{" "}
                  <span className="text-[#2196F3]">*</span>
                </label>

                <div className="relative">
                  <UserRound
                    size={17}
                    className="
                      pointer-events-none
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400

                      dark:text-slate-500
                    "
                  />

                  <input
                    id="login-email"
                    type="text"
                    required
                    autoComplete="username"
                    className="
                      h-12
                      w-full
                      rounded-lg
                      border
                      border-slate-300
                      bg-white
                      pl-11
                      pr-4
                      text-sm
                      text-slate-900
                      outline-none
                      transition-all
                      duration-200

                      placeholder:text-slate-400

                      focus:border-[#2196F3]
                      focus:ring-4
                      focus:ring-[#2196F3]/10

                      dark:border-white/10
                      dark:bg-[#0B2031]
                      dark:text-white
                      dark:placeholder:text-slate-500
                      dark:focus:border-[#42A5F5]
                      dark:focus:ring-[#42A5F5]/10
                    "
                  />
                </div>
              </div>

              {/* PASSWORD */}

              <div>
                <label
                  htmlFor="login-password"
                  className="
                    mb-2.5
                    block
                    text-[12px]
                    font-semibold
                    uppercase
                    tracking-[0.08em]
                    text-slate-700

                    dark:text-slate-300
                  "
                >
                  Password <span className="text-[#2196F3]">*</span>
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={17}
                    className="
                      pointer-events-none
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400

                      dark:text-slate-500
                    "
                  />

                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    className="
                      h-12
                      w-full
                      rounded-lg
                      border
                      border-slate-300
                      bg-white
                      pl-11
                      pr-12
                      text-sm
                      text-slate-900
                      outline-none
                      transition-all
                      duration-200

                      focus:border-[#2196F3]
                      focus:ring-4
                      focus:ring-[#2196F3]/10

                      dark:border-white/10
                      dark:bg-[#0B2031]
                      dark:text-white
                      dark:focus:border-[#42A5F5]
                      dark:focus:ring-[#42A5F5]/10
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

                      dark:text-slate-500
                      dark:hover:text-[#42A5F5]
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

              {/* LOGIN ACTION */}

              <div
                className="
                  flex
                  flex-col
                  gap-5

                  sm:flex-row
                  sm:items-center
                "
              >
                <motion.button
                  type="submit"
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="
                    h-11
                    rounded-lg
                    bg-[#2196F3]
                    px-7
                    text-[12px]
                    font-semibold
                    uppercase
                    tracking-[0.05em]
                    text-white
                    transition-colors

                    hover:bg-[#1976D2]

                    dark:hover:bg-[#42A5F5]
                  "
                >
                  Log In
                </motion.button>

                <label
                  className="
                    flex
                    cursor-pointer
                    items-center
                    gap-3
                    text-[12px]
                    font-semibold
                    uppercase
                    tracking-[0.04em]
                    text-slate-600

                    dark:text-slate-300
                  "
                >
                  <input
                    type="checkbox"
                    className="
                      h-4
                      w-4
                      accent-[#2196F3]
                    "
                  />

                  Remember me
                </label>
              </div>

              <Link
                href="/lost-password"
                className="
                  inline-block
                  text-sm
                  text-[#2196F3]
                  transition-colors

                  hover:text-[#1976D2]

                  dark:text-[#42A5F5]
                "
              >
                Lost your password?
              </Link>
            </form>
          </motion.div>

          {/* =================================================
              REGISTER
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              delay: 0.08,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              border-t
              border-slate-200
              pt-12

              lg:border-l
              lg:border-t-0
              lg:pl-20
              lg:pt-0

              dark:border-white/10
            "
          >
            <div className="mb-9">
              <p
                className="
                  mb-2
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#2196F3]
                "
              >
                Create Account
              </p>

              <h2
                className="
                  text-3xl
                  font-medium
                  tracking-[-0.02em]
                  text-slate-900

                  sm:text-[36px]

                  dark:text-white
                "
              >
                Register
              </h2>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              {/* EMAIL */}

              <div>
                <label
                  htmlFor="register-email"
                  className="
                    mb-2.5
                    block
                    text-[12px]
                    font-semibold
                    uppercase
                    tracking-[0.08em]
                    text-slate-700

                    dark:text-slate-300
                  "
                >
                  Email address <span className="text-[#2196F3]">*</span>
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="
                      pointer-events-none
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400

                      dark:text-slate-500
                    "
                  />

                  <input
                    id="register-email"
                    type="email"
                    required
                    autoComplete="email"
                    className="
                      h-12
                      w-full
                      rounded-lg
                      border
                      border-slate-300
                      bg-white
                      pl-11
                      pr-4
                      text-sm
                      text-slate-900
                      outline-none
                      transition-all
                      duration-200

                      focus:border-[#2196F3]
                      focus:ring-4
                      focus:ring-[#2196F3]/10

                      dark:border-white/10
                      dark:bg-[#0B2031]
                      dark:text-white
                      dark:focus:border-[#42A5F5]
                      dark:focus:ring-[#42A5F5]/10
                    "
                  />
                </div>
              </div>

              <p
                className="
                  text-sm
                  leading-7
                  text-slate-500

                  dark:text-slate-400
                "
              >
                A link to set a new password will be sent to your email
                address.
              </p>

              {/* NEWSLETTER */}

              <label
                className="
                  flex
                  cursor-pointer
                  items-start
                  gap-3
                  text-[12px]
                  font-semibold
                  uppercase
                  tracking-[0.05em]
                  text-slate-700

                  dark:text-slate-300
                "
              >
                <input
                  type="checkbox"
                  defaultChecked
                  className="
                    mt-0.5
                    h-4
                    w-4
                    accent-[#2196F3]
                  "
                />

                Subscribe to our newsletter
              </label>

              {/* PRIVACY */}

              <p
                className="
                  text-sm
                  leading-7
                  text-slate-500

                  dark:text-slate-400
                "
              >
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account,
                and for other purposes described in our{" "}
                <Link
                  href="/privacy-policy"
                  className="
                    text-[#2196F3]
                    transition-colors

                    hover:text-[#1976D2]

                    dark:text-[#42A5F5]
                  "
                >
                  privacy policy
                </Link>
                .
              </p>

              {/* REGISTER */}

              <motion.button
                type="submit"
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="
                  h-11
                  rounded-lg
                  bg-[#2196F3]
                  px-7
                  text-[12px]
                  font-semibold
                  uppercase
                  tracking-[0.05em]
                  text-white
                  transition-colors

                  hover:bg-[#1976D2]

                  dark:hover:bg-[#42A5F5]
                "
              >
                Register
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}