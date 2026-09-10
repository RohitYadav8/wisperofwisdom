"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
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
    <div
      className="
        relative
        min-h-screen
        overflow-hidden

        bg-[#F7FBFE]
        text-[#0F172A]

        transition-colors
        duration-300

        dark:bg-[#04131F]
        dark:text-white
      "
    >
      {/* =========================================
          PAGE GRID
      ========================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.52]

          dark:opacity-[0.16]
        "
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(15,23,42,0.055) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15,23,42,0.055) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* =========================================
          LIGHT THEME GLOWS
      ========================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -left-[180px]
          top-[120px]
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#2196F3]/16
          blur-[120px]

          dark:bg-[#2196F3]/9
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-[170px]
          top-[300px]
          h-[460px]
          w-[460px]
          rounded-full
          bg-[#90CAF9]/18
          blur-[130px]

          dark:bg-[#42A5F5]/8
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-160px]
          left-[-80px]
          h-[360px]
          w-[360px]
          rounded-full
          bg-[#64B5F6]/10
          blur-[110px]

          dark:bg-[#2196F3]/6
        "
      />

      {/* =========================================
          CONTENT
      ========================================= */}

      <section
        className="
          relative
          z-10
          px-5
          pb-20
          pt-14

          sm:px-8
          sm:pt-16

          lg:px-10
          lg:pb-24
          lg:pt-20
        "
      >
        <div className="mx-auto max-w-[1280px]">
          {/* =====================================
              TITLE
          ===================================== */}

          <div
            className="
              mb-12
              flex
              flex-col
              gap-6

              md:mb-14
              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h1
                className="
                  text-[44px]
                  font-semibold
                  leading-none
                  tracking-[-0.05em]

                  sm:text-[52px]
                  lg:text-[58px]

                  dark:text-white
                "
              >
                My Account
              </h1>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 84 }}
                transition={{
                  delay: 0.25,
                  duration: 0.6,
                }}
                className="
                  mt-5
                  h-[4px]
                  rounded-full
                  bg-[#2196F3]
                  shadow-[0_4px_14px_rgba(33,150,243,0.32)]

                  dark:bg-[#42A5F5]
                  dark:shadow-[0_4px_18px_rgba(66,165,245,0.35)]
                "
              />
            </motion.div>

            {/* =================================
                BREADCRUMB
            ================================= */}

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1,
                duration: 0.55,
              }}
              className="
                flex
                items-center
                gap-2.5
                text-[14px]
                italic
                text-slate-500

                dark:text-slate-400
              "
            >
              <Link
                href="/"
                className="
                  transition-colors
                  duration-200

                  hover:text-[#2196F3]

                  dark:hover:text-[#42A5F5]
                "
              >
                Home
              </Link>

              <span className="text-slate-300 dark:text-slate-600">/</span>

              <Link
                href="/shop"
                className="
                  transition-colors
                  duration-200

                  hover:text-[#2196F3]

                  dark:hover:text-[#42A5F5]
                "
              >
                Shop
              </Link>

              <span className="text-slate-300 dark:text-slate-600">/</span>

              <span
                className="
                  font-medium
                  text-[#2196F3]

                  dark:text-[#42A5F5]
                "
              >
                My Account
              </span>
            </motion.div>
          </div>

          {/* =====================================
              FORM GRID
          ===================================== */}

          <div
            className="
              grid
              gap-8

              lg:grid-cols-2
            "
          >
            {/* =================================
                LOGIN
            ================================= */}

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -5 }}
              className="
                group
                relative
                overflow-hidden
                rounded-[28px]

                border
                border-white/90

                bg-white/88

                p-6
                backdrop-blur-xl

                shadow-[0_24px_70px_rgba(15,23,42,0.11)]

                transition-all
                duration-500

                hover:shadow-[0_30px_90px_rgba(33,150,243,0.16)]

                sm:p-9
                lg:p-11

                dark:border-white/[0.09]
                dark:bg-[#081C2B]/94
                dark:shadow-[0_25px_75px_rgba(0,0,0,0.38)]
                dark:hover:border-[#42A5F5]/20
                dark:hover:shadow-[0_30px_90px_rgba(33,150,243,0.14)]
              "
            >
              {/* CARD GRID */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  opacity-[0.12]

                  dark:opacity-[0.06]
                "
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(33,150,243,0.15) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(33,150,243,0.15) 1px, transparent 1px)
                  `,
                  backgroundSize: "38px 38px",
                }}
              />

              {/* CARD GLOW */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-24
                  -top-24
                  h-60
                  w-60
                  rounded-full
                  bg-[#2196F3]/11
                  blur-[75px]

                  dark:bg-[#42A5F5]/10
                "
              />

              <div className="relative">
                <div className="mb-9">
                  <h2
                    className="
                      text-[34px]
                      font-semibold
                      tracking-[-0.04em]

                      sm:text-[40px]

                      dark:text-white
                    "
                  >
                    Login
                  </h2>

                  <div
                    className="
                      mt-4
                      h-[4px]
                      w-9
                      rounded-full
                      bg-[#2196F3]

                      dark:bg-[#42A5F5]
                    "
                  />
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  {/* USERNAME */}

                  <div>
                    <label
                      htmlFor="login-email"
                      className="
                        mb-2.5
                        block
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-[0.11em]
                        text-slate-700

                        dark:text-slate-300
                      "
                    >
                      Username or email address{" "}
                      <span className="text-[#2196F3]">*</span>
                    </label>

                    <div className="group/input relative">
                      <UserRound
                        size={18}
                        className="
                          pointer-events-none
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-slate-400

                          transition-colors

                          group-focus-within/input:text-[#2196F3]

                          dark:text-slate-500
                          dark:group-focus-within/input:text-[#42A5F5]
                        "
                      />

                      <input
                        id="login-email"
                        type="text"
                        required
                        autoComplete="username"
                        className="
                          h-[56px]
                          w-full
                          rounded-[12px]

                          border
                          border-slate-300/80

                          bg-[#FCFDFE]

                          pl-12
                          pr-4

                          text-sm
                          text-slate-900

                          outline-none

                          shadow-[0_5px_18px_rgba(15,23,42,0.05)]

                          transition-all
                          duration-300

                          hover:border-slate-400/70

                          focus:border-[#2196F3]
                          focus:bg-white
                          focus:ring-4
                          focus:ring-[#2196F3]/10
                          focus:shadow-[0_8px_26px_rgba(33,150,243,0.12)]

                          dark:border-white/10
                          dark:bg-[#0B2031]
                          dark:text-white
                          dark:shadow-none

                          dark:hover:border-white/20

                          dark:focus:border-[#42A5F5]
                          dark:focus:bg-[#0D2437]
                          dark:focus:ring-[#42A5F5]/10
                          dark:focus:shadow-[0_8px_28px_rgba(66,165,245,0.10)]
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
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-[0.11em]
                        text-slate-700

                        dark:text-slate-300
                      "
                    >
                      Password <span className="text-[#2196F3]">*</span>
                    </label>

                    <div className="group/input relative">
                      <LockKeyhole
                        size={18}
                        className="
                          pointer-events-none
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-slate-400

                          transition-colors

                          group-focus-within/input:text-[#2196F3]

                          dark:text-slate-500
                          dark:group-focus-within/input:text-[#42A5F5]
                        "
                      />

                      <input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        required
                        autoComplete="current-password"
                        className="
                          h-[56px]
                          w-full
                          rounded-[12px]

                          border
                          border-slate-300/80

                          bg-[#FCFDFE]

                          pl-12
                          pr-12

                          text-sm
                          text-slate-900

                          outline-none

                          shadow-[0_5px_18px_rgba(15,23,42,0.05)]

                          transition-all
                          duration-300

                          hover:border-slate-400/70

                          focus:border-[#2196F3]
                          focus:bg-white
                          focus:ring-4
                          focus:ring-[#2196F3]/10
                          focus:shadow-[0_8px_26px_rgba(33,150,243,0.12)]

                          dark:border-white/10
                          dark:bg-[#0B2031]
                          dark:text-white
                          dark:shadow-none

                          dark:hover:border-white/20

                          dark:focus:border-[#42A5F5]
                          dark:focus:bg-[#0D2437]
                          dark:focus:ring-[#42A5F5]/10
                          dark:focus:shadow-[0_8px_28px_rgba(66,165,245,0.10)]
                        "
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((current) => !current)
                        }
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
                          <EyeOff size={19} />
                        ) : (
                          <Eye size={19} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* REMEMBER + LOGIN */}

                  <div
                    className="
                      flex
                      flex-col
                      gap-5
                      pt-2

                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >
                    <label
                      className="
                        flex
                        cursor-pointer
                        items-center
                        gap-3

                        text-[12px]
                        font-semibold
                        uppercase
                        tracking-[0.06em]
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

                    <motion.button
                      type="submit"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="
                        group/button
                        flex
                        h-[50px]
                        items-center
                        justify-center
                        gap-3

                        rounded-[12px]

                        bg-gradient-to-r
                        from-[#2196F3]
                        to-[#1687E8]

                        px-8

                        text-[12px]
                        font-semibold
                        uppercase
                        tracking-[0.07em]
                        text-white

                        shadow-[0_12px_28px_rgba(33,150,243,0.30)]

                        transition-all
                        duration-300

                        hover:from-[#1976D2]
                        hover:to-[#2196F3]
                        hover:shadow-[0_16px_36px_rgba(33,150,243,0.36)]

                        dark:from-[#2196F3]
                        dark:to-[#42A5F5]
                        dark:shadow-[0_12px_30px_rgba(33,150,243,0.22)]

                        dark:hover:from-[#42A5F5]
                        dark:hover:to-[#2196F3]
                      "
                    >
                      Log In

                      <ArrowRight
                        size={16}
                        className="
                          transition-transform
                          duration-300

                          group-hover/button:translate-x-1
                        "
                      />
                    </motion.button>
                  </div>

                  <Link
                    href="#"
                    className="
                      inline-block
                      text-sm
                      font-medium
                      text-[#2196F3]

                      transition-colors

                      hover:text-[#1976D2]

                      dark:text-[#42A5F5]
                      dark:hover:text-[#64B5F6]
                    "
                  >
                    Lost your password?
                  </Link>
                </form>
              </div>
            </motion.div>

            {/* =================================
                REGISTER
            ================================= */}

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.08,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -5 }}
              className="
                group
                relative
                overflow-hidden
                rounded-[28px]

                border
                border-white/90

                bg-white/88

                p-6
                backdrop-blur-xl

                shadow-[0_24px_70px_rgba(15,23,42,0.11)]

                transition-all
                duration-500

                hover:shadow-[0_30px_90px_rgba(33,150,243,0.16)]

                sm:p-9
                lg:p-11

                dark:border-white/[0.09]
                dark:bg-[#081C2B]/94
                dark:shadow-[0_25px_75px_rgba(0,0,0,0.38)]
                dark:hover:border-[#42A5F5]/20
                dark:hover:shadow-[0_30px_90px_rgba(33,150,243,0.14)]
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  opacity-[0.12]

                  dark:opacity-[0.06]
                "
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(33,150,243,0.15) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(33,150,243,0.15) 1px, transparent 1px)
                  `,
                  backgroundSize: "38px 38px",
                }}
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-24
                  -right-24
                  h-60
                  w-60
                  rounded-full
                  bg-[#2196F3]/11
                  blur-[75px]

                  dark:bg-[#42A5F5]/10
                "
              />

              <div className="relative">
                <div className="mb-9">
                  <h2
                    className="
                      text-[34px]
                      font-semibold
                      tracking-[-0.04em]

                      sm:text-[40px]

                      dark:text-white
                    "
                  >
                    Register
                  </h2>

                  <div
                    className="
                      mt-4
                      h-[4px]
                      w-9
                      rounded-full
                      bg-[#2196F3]

                      dark:bg-[#42A5F5]
                    "
                  />
                </div>

                <form onSubmit={handleRegister} className="space-y-6">
                  {/* EMAIL */}

                  <div>
                    <label
                      htmlFor="register-email"
                      className="
                        mb-2.5
                        block
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-[0.11em]
                        text-slate-700

                        dark:text-slate-300
                      "
                    >
                      Email address{" "}
                      <span className="text-[#2196F3]">*</span>
                    </label>

                    <div className="group/input relative">
                      <Mail
                        size={18}
                        className="
                          pointer-events-none
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-slate-400

                          transition-colors

                          group-focus-within/input:text-[#2196F3]

                          dark:text-slate-500
                          dark:group-focus-within/input:text-[#42A5F5]
                        "
                      />

                      <input
                        id="register-email"
                        type="email"
                        required
                        autoComplete="email"
                        className="
                          h-[56px]
                          w-full
                          rounded-[12px]

                          border
                          border-slate-300/80

                          bg-[#FCFDFE]

                          pl-12
                          pr-4

                          text-sm
                          text-slate-900

                          outline-none

                          shadow-[0_5px_18px_rgba(15,23,42,0.05)]

                          transition-all
                          duration-300

                          hover:border-slate-400/70

                          focus:border-[#2196F3]
                          focus:bg-white
                          focus:ring-4
                          focus:ring-[#2196F3]/10
                          focus:shadow-[0_8px_26px_rgba(33,150,243,0.12)]

                          dark:border-white/10
                          dark:bg-[#0B2031]
                          dark:text-white
                          dark:shadow-none

                          dark:hover:border-white/20

                          dark:focus:border-[#42A5F5]
                          dark:focus:bg-[#0D2437]
                          dark:focus:ring-[#42A5F5]/10
                          dark:focus:shadow-[0_8px_28px_rgba(66,165,245,0.10)]
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
                      tracking-[0.06em]
                      text-slate-700

                      dark:text-slate-300
                    "
                  >
                    <input
                      type="checkbox"
                      defaultChecked
                      className="
                        mt-[2px]
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
                      href="#"
                      className="
                        font-medium
                        text-[#2196F3]

                        transition-colors

                        hover:text-[#1976D2]

                        dark:text-[#42A5F5]
                        dark:hover:text-[#64B5F6]
                      "
                    >
                      privacy policy
                    </Link>
                    .
                  </p>

                  {/* REGISTER */}

                  <motion.button
                    type="submit"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="
                      group/button
                      flex
                      h-[50px]
                      items-center
                      justify-center
                      gap-3

                      rounded-[12px]

                      bg-gradient-to-r
                      from-[#2196F3]
                      to-[#1687E8]

                      px-8

                      text-[12px]
                      font-semibold
                      uppercase
                      tracking-[0.07em]
                      text-white

                      shadow-[0_12px_28px_rgba(33,150,243,0.30)]

                      transition-all
                      duration-300

                      hover:from-[#1976D2]
                      hover:to-[#2196F3]
                      hover:shadow-[0_16px_36px_rgba(33,150,243,0.36)]

                      dark:from-[#2196F3]
                      dark:to-[#42A5F5]
                      dark:shadow-[0_12px_30px_rgba(33,150,243,0.22)]

                      dark:hover:from-[#42A5F5]
                      dark:hover:to-[#2196F3]
                    "
                  >
                    Register

                    <ArrowRight
                      size={16}
                      className="
                        transition-transform
                        duration-300

                        group-hover/button:translate-x-1
                      "
                    />
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}