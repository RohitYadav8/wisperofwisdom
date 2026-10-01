"use client";

import { useState } from "react";

import {
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { motion } from "motion/react";

const contactItems = [
  {
    title: "Address",
    icon: MapPin,
    lines: [
      "Level 30, The Leadenhall Building, 122",
      "Leadenhall St, London EC3V 4AB",
    ],
  },
  {
    title: "Contact",
    icon: Phone,
    lines: [
      "Mobile: (+44) – 7454 – 675398",
      "Mail: hello@whispersofwisdom.co.uk",
    ],
  },
  {
    title: "Hour of Operation",
    icon: Clock3,
    lines: ["Monday – Friday: 09:00 – 17:00"],
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) {
      setError("");
    }

    if (success) {
      setSuccess("");
    }
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSuccess("");
    setError("");

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setError("Please complete all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/contact-submissions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message,
            source: "CONTACT",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to send your message."
        );
      }

      setSuccess(
        "Thank you! Your message has been sent successfully."
      );

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        bg-white
        text-slate-900
        transition-colors
        duration-300
        dark:bg-[#061522]
        dark:text-white
      "
    >
      {/* =========================================================
          CONTACT CONTENT
      ========================================================= */}

      <section
        className="
          relative
          overflow-hidden
          py-10

          sm:py-12

          lg:py-14
        "
      >
        {/* BACKGROUND GLOW */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-16
            h-[280px]
            w-[280px]
            -translate-x-1/2
            rounded-full
            bg-[#2196F3]/5
            blur-[100px]

            dark:bg-[#2196F3]/8
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-[1180px]
            px-5

            sm:px-8

            lg:px-12
          "
        >
          {/* =====================================================
              INTRO
          ===================================================== */}

          <div className="mx-auto max-w-[740px] text-center">
            <motion.h2
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                font-serif
                text-[36px]
                font-normal
                leading-[1.08]
                tracking-[-0.035em]
                text-[#343A3F]

                dark:text-white

                sm:text-[42px]

                lg:text-[48px]
              "
            >
              Keep In Touch With Us
            </motion.h2>

            <motion.p
              initial={{
                opacity: 0,
                y: 12,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: 0.06,
              }}
              className="
                mx-auto
                mt-3
                max-w-[680px]
                text-[13px]
                leading-6
                text-slate-500

                dark:text-slate-400

                sm:text-[14px]
              "
            >
              We&apos;d love to hear from you! Whether you have
              questions, feedback, or just want to share your
              thoughts about “Whispers of Wisdom,” feel free to
              reach out.
            </motion.p>
          </div>

          {/* =====================================================
              CONTACT INFORMATION
          ===================================================== */}

          <div
            className="
              mt-9
              grid
              gap-5

              md:grid-cols-3

              lg:mt-10
              lg:gap-6
            "
          >
            {contactItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.35,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    rounded-[20px]
                    border
                    border-slate-200/80
                    bg-[#FCFCFA]
                    p-5
                    shadow-[0_12px_38px_rgba(15,23,42,0.035)]
                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:shadow-[0_18px_45px_rgba(15,23,42,0.06)]

                    dark:border-white/[0.07]
                    dark:bg-[#0B2031]
                    dark:shadow-[0_16px_45px_rgba(0,0,0,0.16)]
                  "
                >
                  <div className="flex items-start gap-3">
                    {/* ICON */}

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#2196F3]/8
                        text-[#2196F3]

                        dark:bg-[#2196F3]/12
                      "
                    >
                      <Icon
                        size={18}
                        strokeWidth={1.6}
                      />
                    </div>

                    {/* CONTENT */}

                    <div className="min-w-0">
                      <h3
                        className="
                          text-[12px]
                          font-semibold
                          uppercase
                          tracking-[0.14em]
                          text-[#31383D]

                          dark:text-white
                        "
                      >
                        {item.title}
                      </h3>

                      <div className="mt-3 space-y-1">
                        {item.lines.map((line) => (
                          <p
                            key={line}
                            className="
                              font-serif
                              text-[14px]
                              leading-6
                              text-slate-500

                              dark:text-slate-400
                            "
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* =====================================================
              MESSAGE FORM
          ===================================================== */}

          <div
            className="
              mx-auto
              mt-12
              max-w-[820px]

              lg:mt-14
            "
          >
            {/* FORM HEADING */}

            <motion.div
              initial={{
                opacity: 0,
                y: 18,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.35,
              }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center"
            >
              <h2
                className="
                  font-serif
                  text-[36px]
                  font-normal
                  leading-[1.08]
                  tracking-[-0.035em]
                  text-[#343A3F]

                  dark:text-white

                  sm:text-[42px]
                  lg:text-[46px]
                "
              >
                Send A Message
              </h2>

              <div
                className="
                  mx-auto
                  mt-3
                  h-[2px]
                  w-12
                  rounded-full
                  bg-[#2196F3]
                "
              />
            </motion.div>

            {/* FORM */}

            <motion.form
              onSubmit={handleSubmit}
              initial={{
                opacity: 0,
                y: 18,
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
                duration: 0.55,
                delay: 0.06,
              }}
              className="
                mt-7
                rounded-[24px]
                border
                border-slate-200/80
                bg-[#FCFCFA]
                p-5
                shadow-[0_18px_55px_rgba(15,23,42,0.045)]

                dark:border-white/[0.07]
                dark:bg-[#0B2031]
                dark:shadow-[0_20px_55px_rgba(0,0,0,0.18)]

                sm:p-7

                lg:p-8
              "
            >
              {/* NAME + EMAIL */}

              <div
                className="
                  grid
                  gap-4

                  sm:grid-cols-2
                "
              >
                {/* NAME */}

                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    disabled={loading}
                    autoComplete="name"
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-4
                      text-[13px]
                      text-slate-800
                      outline-none
                      transition

                      placeholder:text-slate-400

                      focus:border-[#2196F3]/60
                      focus:ring-4
                      focus:ring-[#2196F3]/10

                      disabled:cursor-not-allowed
                      disabled:opacity-60

                      dark:border-white/10
                      dark:bg-[#071B29]
                      dark:text-white
                      dark:placeholder:text-slate-500
                    "
                  />
                </div>

                {/* EMAIL */}

                <div className="relative">
                  <Mail
                    size={15}
                    strokeWidth={1.6}
                    className="
                      pointer-events-none
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    disabled={loading}
                    autoComplete="email"
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      pl-11
                      pr-4
                      text-[13px]
                      text-slate-800
                      outline-none
                      transition

                      placeholder:text-slate-400

                      focus:border-[#2196F3]/60
                      focus:ring-4
                      focus:ring-[#2196F3]/10

                      disabled:cursor-not-allowed
                      disabled:opacity-60

                      dark:border-white/10
                      dark:bg-[#071B29]
                      dark:text-white
                      dark:placeholder:text-slate-500
                    "
                  />
                </div>
              </div>

              {/* MESSAGE */}

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Message"
                rows={5}
                required
                disabled={loading}
                className="
                  mt-4
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3.5
                  text-[13px]
                  leading-6
                  text-slate-800
                  outline-none
                  transition

                  placeholder:text-slate-400

                  focus:border-[#2196F3]/60
                  focus:ring-4
                  focus:ring-[#2196F3]/10

                  disabled:cursor-not-allowed
                  disabled:opacity-60

                  dark:border-white/10
                  dark:bg-[#071B29]
                  dark:text-white
                  dark:placeholder:text-slate-500
                "
              />

              {/* SUBMIT BUTTON */}

              <div className="mt-5 flex justify-center">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={
                    loading
                      ? undefined
                      : {
                          y: -2,
                        }
                  }
                  whileTap={
                    loading
                      ? undefined
                      : {
                          scale: 0.98,
                        }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 22,
                  }}
                  className="
                    inline-flex
                    min-h-[48px]
                    min-w-[155px]
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    bg-[#2196F3]
                    px-6
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-white
                    transition-colors

                    hover:bg-[#1976D2]

                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={15}
                        className="animate-spin"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Submit
                      <Send
                        size={15}
                        strokeWidth={1.8}
                      />
                    </>
                  )}
                </motion.button>
              </div>

              {/* SUCCESS */}

              {success && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 6,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
                    mt-4
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-center
                    text-xs
                    text-emerald-600

                    dark:text-emerald-400
                  "
                >
                  <CheckCircle2
                    size={16}
                    className="shrink-0"
                  />

                  <span>{success}</span>
                </motion.div>
              )}

              {/* ERROR */}

              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 6,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
                    mt-4
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-center
                    text-xs
                    text-red-500
                  "
                >
                  <AlertCircle
                    size={16}
                    className="shrink-0"
                  />

                  <span>{error}</span>
                </motion.div>
              )}
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
}