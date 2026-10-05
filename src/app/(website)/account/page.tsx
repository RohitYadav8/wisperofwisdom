"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { motion } from "motion/react";

type AccountMode = "register" | "login";

export default function AccountPage() {
  const router = useRouter();

  // Register first when account page opens
  const [mode, setMode] = useState<AccountMode>("register");

  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const [loginMessage, setLoginMessage] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");

  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  const switchToLogin = () => {
    setMode("login");
    setLoginError("");
    setLoginMessage("");
    setRegisterError("");
    setRegisterMessage("");
  };

  const switchToRegister = () => {
    setMode("register");
    setLoginError("");
    setLoginMessage("");
    setRegisterError("");
    setRegisterMessage("");
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoginMessage("");
    setLoginError("");
    setLoginLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
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

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 700);
    } catch (error) {
      console.error("LOGIN_ERROR:", error);

      setLoginError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setRegisterMessage("");
    setRegisterError("");

    if (registerPassword !== confirmPassword) {
      setRegisterError("Passwords do not match.");
      return;
    }

    if (registerPassword.length < 6) {
      setRegisterError("Password must be at least 6 characters.");
      return;
    }

    setRegisterLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          password: registerPassword,
          newsletter,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setRegisterError(
          data.message || "Registration failed. Please try again."
        );
        return;
      }

      setRegisterMessage(
        data.message || "Account created successfully."
      );

      // Put registered email into login form
      setLoginEmail(registerEmail);

      // Clear registration fields
      setRegisterName("");
      setRegisterEmail("");
      setRegisterPassword("");
      setConfirmPassword("");

      // After successful registration, show Login
      setTimeout(() => {
        setMode("login");
        setRegisterMessage("");
        setLoginMessage(
          "Account created successfully. Please login."
        );
      }, 900);
    } catch (error) {
      console.error("REGISTER_ERROR:", error);

      setRegisterError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setRegisterLoading(false);
    }
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
      {/* PAGE GRID */}
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

      {/* BACKGROUND GLOW - LEFT */}
      <div
        className="
          pointer-events-none
          absolute
          -left-[190px]
          top-[70px]
          h-[430px]
          w-[430px]
          rounded-full
          bg-[#2196F3]/16
          blur-[120px]
          dark:bg-[#2196F3]/9
        "
      />

      {/* BACKGROUND GLOW - RIGHT */}
      <div
        className="
          pointer-events-none
          absolute
          -right-[180px]
          top-[240px]
          h-[470px]
          w-[470px]
          rounded-full
          bg-[#90CAF9]/18
          blur-[130px]
          dark:bg-[#42A5F5]/8
        "
      />

      {/* BACKGROUND GLOW - BOTTOM */}
      <div
        className="
          pointer-events-none
          absolute
          -bottom-[170px]
          -left-[90px]
          h-[370px]
          w-[370px]
          rounded-full
          bg-[#64B5F6]/10
          blur-[110px]
          dark:bg-[#2196F3]/6
        "
      />

      {/* ACCOUNT SECTION */}
      <section
        className="
          relative
          z-10
          px-5
          py-10
          sm:px-8
          sm:py-12
          lg:px-10
          lg:py-14
        "
      >
        <div className="mx-auto max-w-[760px]">
          {/* REGISTER */}
          {mode === "register" && (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-[24px]
                border
                border-white/90
                bg-white/90
                p-5
                backdrop-blur-xl
                shadow-[0_24px_70px_rgba(15,23,42,0.11)]
                transition-all
                duration-500
                hover:border-[#2196F3]/15
                hover:shadow-[0_32px_90px_rgba(33,150,243,0.16)]
                sm:p-7
                lg:p-8
                xl:p-9
                dark:border-white/[0.09]
                dark:bg-[#081C2B]/94
                dark:shadow-[0_25px_75px_rgba(0,0,0,0.38)]
                dark:hover:border-[#42A5F5]/20
                dark:hover:shadow-[0_32px_90px_rgba(33,150,243,0.14)]
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
                  -bottom-24
                  -right-24
                  h-64
                  w-64
                  rounded-full
                  bg-[#2196F3]/12
                  blur-[80px]
                  dark:bg-[#42A5F5]/10
                "
              />

              <div className="relative">
                {/* REGISTER TITLE */}
                <div className="mb-7">
                  <h2
                    className="
                      text-[32px]
                      font-semibold
                      tracking-[-0.045em]
                      text-[#0F172A]
                      sm:text-[38px]
                      dark:text-white
                    "
                  >
                    Create Account
                  </h2>

                  <div
                    className="
                      mt-3
                      h-[3px]
                      w-9
                      rounded-full
                      bg-[#2196F3]
                      shadow-[0_4px_14px_rgba(33,150,243,0.25)]
                      dark:bg-[#42A5F5]
                      dark:shadow-[0_4px_18px_rgba(66,165,245,0.25)]
                    "
                  />
                </div>

                <form
                  onSubmit={handleRegister}
                  className="space-y-5"
                >
                  {/* REGISTER ERROR */}
                  {registerError && (
                    <div
                      className="
                        rounded-[11px]
                        border
                        border-red-200
                        bg-red-50
                        px-4
                        py-3
                        text-sm
                        text-red-600
                        dark:border-red-400/20
                        dark:bg-red-500/10
                        dark:text-red-300
                      "
                    >
                      {registerError}
                    </div>
                  )}

                  {/* REGISTER SUCCESS */}
                  {registerMessage && (
                    <div
                      className="
                        rounded-[11px]
                        border
                        border-green-200
                        bg-green-50
                        px-4
                        py-3
                        text-sm
                        text-green-600
                        dark:border-green-400/20
                        dark:bg-green-500/10
                        dark:text-green-300
                      "
                    >
                      {registerMessage}
                    </div>
                  )}

                  {/* NAME */}
                  <div>
                    <label
                      htmlFor="register-name"
                      className="
                        mb-2
                        block
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.11em]
                        text-slate-700
                        dark:text-slate-300
                      "
                    >
                      Full name{" "}
                      <span className="text-[#2196F3]">*</span>
                    </label>

                    <div className="group/input relative">
                      <UserRound
                        size={17}
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
                        id="register-name"
                        type="text"
                        required
                        autoComplete="name"
                        value={registerName}
                        onChange={(event) =>
                          setRegisterName(event.target.value)
                        }
                        className="
                          h-[52px]
                          w-full
                          rounded-[11px]
                          border
                          border-slate-300/80
                          bg-[#FCFDFE]
                          pl-11
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
                        "
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label
                      htmlFor="register-email"
                      className="
                        mb-2
                        block
                        text-[10px]
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
                        size={17}
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
                        value={registerEmail}
                        onChange={(event) =>
                          setRegisterEmail(event.target.value)
                        }
                        className="
                          h-[52px]
                          w-full
                          rounded-[11px]
                          border
                          border-slate-300/80
                          bg-[#FCFDFE]
                          pl-11
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
                        "
                      />
                    </div>
                  </div>

                  {/* REGISTER PASSWORD */}
                  <div>
                    <label
                      htmlFor="register-password"
                      className="
                        mb-2
                        block
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.11em]
                        text-slate-700
                        dark:text-slate-300
                      "
                    >
                      Password{" "}
                      <span className="text-[#2196F3]">*</span>
                    </label>

                    <div className="group/input relative">
                      <LockKeyhole
                        size={17}
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
                        id="register-password"
                        type={
                          showRegisterPassword
                            ? "text"
                            : "password"
                        }
                        required
                        minLength={6}
                        autoComplete="new-password"
                        value={registerPassword}
                        onChange={(event) =>
                          setRegisterPassword(event.target.value)
                        }
                        className="
                          h-[52px]
                          w-full
                          rounded-[11px]
                          border
                          border-slate-300/80
                          bg-[#FCFDFE]
                          pl-11
                          pr-11
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
                        "
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowRegisterPassword(
                            (current) => !current
                          )
                        }
                        aria-label={
                          showRegisterPassword
                            ? "Hide password"
                            : "Show password"
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
                        {showRegisterPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* CONFIRM PASSWORD */}
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="
                        mb-2
                        block
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.11em]
                        text-slate-700
                        dark:text-slate-300
                      "
                    >
                      Confirm password{" "}
                      <span className="text-[#2196F3]">*</span>
                    </label>

                    <div className="group/input relative">
                      <LockKeyhole
                        size={17}
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
                        id="confirm-password"
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        required
                        minLength={6}
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                        className="
                          h-[52px]
                          w-full
                          rounded-[11px]
                          border
                          border-slate-300/80
                          bg-[#FCFDFE]
                          pl-11
                          pr-11
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
                        "
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            (current) => !current
                          )
                        }
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
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
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* PASSWORD INFO */}
                  <p
                    className="
                      text-[13px]
                      leading-6
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Password must be at least 6 characters long.
                  </p>

                  {/* NEWSLETTER */}
                  <label
                    className="
                      flex
                      cursor-pointer
                      items-start
                      gap-2.5
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.06em]
                      text-slate-700
                      dark:text-slate-300
                    "
                  >
                    <input
                      type="checkbox"
                      checked={newsletter}
                      onChange={(event) =>
                        setNewsletter(event.target.checked)
                      }
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
                      text-[13px]
                      leading-6
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Your personal data will be used to support
                    your experience throughout this website, to
                    manage access to your account, and for other
                    purposes described in our{" "}
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

                  {/* REGISTER BUTTON */}
                  <motion.button
                    type="submit"
                    disabled={registerLoading}
                    whileHover={
                      !registerLoading ? { y: -2 } : undefined
                    }
                    whileTap={
                      !registerLoading ? { scale: 0.97 } : undefined
                    }
                    className="
                      group/button
                      flex
                      h-[46px]
                      items-center
                      justify-center
                      gap-2.5
                      rounded-[11px]
                      bg-gradient-to-r
                      from-[#2196F3]
                      to-[#1687E8]
                      px-7
                      text-[11px]
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
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                      dark:from-[#2196F3]
                      dark:to-[#42A5F5]
                    "
                  >
                    {registerLoading
                      ? "Creating Account..."
                      : "Register"}

                    {!registerLoading && (
                      <ArrowRight
                        size={15}
                        className="
                          transition-transform
                          duration-300
                          group-hover/button:translate-x-1
                        "
                      />
                    )}
                  </motion.button>

                  {/* LOGIN SWITCH */}
                  <div
                    className="
                      border-t
                      border-slate-200
                      pt-5
                      text-center
                      dark:border-white/10
                    "
                  >
                    <p
                      className="
                        text-[13px]
                        text-slate-500
                        dark:text-slate-400
                      "
                    >
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={switchToLogin}
                        className="
                          font-semibold
                          text-[#2196F3]
                          transition-colors
                          hover:text-[#1976D2]
                          dark:text-[#42A5F5]
                          dark:hover:text-[#64B5F6]
                        "
                      >
                        Login
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* LOGIN */}
          {mode === "login" && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-[24px]
                border
                border-white/90
                bg-white/90
                p-5
                backdrop-blur-xl
                shadow-[0_24px_70px_rgba(15,23,42,0.11)]
                transition-all
                duration-500
                hover:border-[#2196F3]/15
                hover:shadow-[0_32px_90px_rgba(33,150,243,0.16)]
                sm:p-7
                lg:p-8
                xl:p-9
                dark:border-white/[0.09]
                dark:bg-[#081C2B]/94
                dark:shadow-[0_25px_75px_rgba(0,0,0,0.38)]
                dark:hover:border-[#42A5F5]/20
                dark:hover:shadow-[0_32px_90px_rgba(33,150,243,0.14)]
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
                  h-64
                  w-64
                  rounded-full
                  bg-[#2196F3]/12
                  blur-[80px]
                  dark:bg-[#42A5F5]/10
                "
              />

              <div className="relative">
                {/* LOGIN TITLE */}
                <div className="mb-7">
                  <h2
                    className="
                      text-[32px]
                      font-semibold
                      tracking-[-0.045em]
                      text-[#0F172A]
                      sm:text-[38px]
                      dark:text-white
                    "
                  >
                    Welcome Back
                  </h2>

                  <div
                    className="
                      mt-3
                      h-[3px]
                      w-9
                      rounded-full
                      bg-[#2196F3]
                      shadow-[0_4px_14px_rgba(33,150,243,0.25)]
                      dark:bg-[#42A5F5]
                      dark:shadow-[0_4px_18px_rgba(66,165,245,0.25)]
                    "
                  />
                </div>

                <form
                  onSubmit={handleLogin}
                  className="space-y-5"
                >
                  {/* LOGIN ERROR */}
                  {loginError && (
                    <div
                      className="
                        rounded-[11px]
                        border
                        border-red-200
                        bg-red-50
                        px-4
                        py-3
                        text-sm
                        text-red-600
                        dark:border-red-400/20
                        dark:bg-red-500/10
                        dark:text-red-300
                      "
                    >
                      {loginError}
                    </div>
                  )}

                  {/* LOGIN SUCCESS */}
                  {loginMessage && (
                    <div
                      className="
                        rounded-[11px]
                        border
                        border-green-200
                        bg-green-50
                        px-4
                        py-3
                        text-sm
                        text-green-600
                        dark:border-green-400/20
                        dark:bg-green-500/10
                        dark:text-green-300
                      "
                    >
                      {loginMessage}
                    </div>
                  )}

                  {/* EMAIL */}
                  <div>
                    <label
                      htmlFor="login-email"
                      className="
                        mb-2
                        block
                        text-[10px]
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
                        size={17}
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
                        type="email"
                        required
                        autoComplete="email"
                        value={loginEmail}
                        onChange={(event) =>
                          setLoginEmail(event.target.value)
                        }
                        className="
                          h-[52px]
                          w-full
                          rounded-[11px]
                          border
                          border-slate-300/80
                          bg-[#FCFDFE]
                          pl-11
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
                        "
                      />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label
                      htmlFor="login-password"
                      className="
                        mb-2
                        block
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.11em]
                        text-slate-700
                        dark:text-slate-300
                      "
                    >
                      Password{" "}
                      <span className="text-[#2196F3]">*</span>
                    </label>

                    <div className="group/input relative">
                      <LockKeyhole
                        size={17}
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
                        type={
                          showPassword ? "text" : "password"
                        }
                        required
                        autoComplete="current-password"
                        value={loginPassword}
                        onChange={(event) =>
                          setLoginPassword(event.target.value)
                        }
                        className="
                          h-[52px]
                          w-full
                          rounded-[11px]
                          border
                          border-slate-300/80
                          bg-[#FCFDFE]
                          pl-11
                          pr-11
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
                        "
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            (current) => !current
                          )
                        }
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
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

                  {/* REMEMBER + LOGIN */}
                  <div
                    className="
                      flex
                      flex-col
                      gap-4
                      pt-1
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
                        gap-2.5
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-[0.06em]
                        text-slate-600
                        dark:text-slate-300
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

                      Remember me
                    </label>

                    <motion.button
                      type="submit"
                      disabled={loginLoading}
                      whileHover={
                        !loginLoading ? { y: -2 } : undefined
                      }
                      whileTap={
                        !loginLoading
                          ? { scale: 0.97 }
                          : undefined
                      }
                      className="
                        group/button
                        flex
                        h-[46px]
                        items-center
                        justify-center
                        gap-2.5
                        rounded-[11px]
                        bg-gradient-to-r
                        from-[#2196F3]
                        to-[#1687E8]
                        px-7
                        text-[11px]
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
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                        dark:from-[#2196F3]
                        dark:to-[#42A5F5]
                      "
                    >
                      {loginLoading
                        ? "Logging In..."
                        : "Log In"}

                      {!loginLoading && (
                        <ArrowRight
                          size={15}
                          className="
                            transition-transform
                            duration-300
                            group-hover/button:translate-x-1
                          "
                        />
                      )}
                    </motion.button>
                  </div>

                  {/* LOST PASSWORD */}
                  <Link
                    href="#"
                    className="
                      inline-block
                      text-[13px]
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

                  {/* REGISTER SWITCH */}
                  <div
                    className="
                      border-t
                      border-slate-200
                      pt-5
                      text-center
                      dark:border-white/10
                    "
                  >
                    <p
                      className="
                        text-[13px]
                        text-slate-500
                        dark:text-slate-400
                      "
                    >
                      Don&apos;t have an account?{" "}
                      <button
                        type="button"
                        onClick={switchToRegister}
                        className="
                          font-semibold
                          text-[#2196F3]
                          transition-colors
                          hover:text-[#1976D2]
                          dark:text-[#42A5F5]
                          dark:hover:text-[#64B5F6]
                        "
                      >
                        Register
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}