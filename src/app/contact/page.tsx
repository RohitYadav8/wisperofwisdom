"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock3, Mail, MapPin, Phone, Send } from "lucide-react";
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
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className="bg-white text-slate-900 transition-colors duration-300 dark:bg-[#061522] dark:text-white">
    

      {/* CONTACT CONTENT */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-24 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-[#2196F3]/5 blur-[120px] dark:bg-[#2196F3]/8"
        />

        <div className="relative z-10 mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
          {/* INTRO */}
          <div className="mx-auto max-w-[760px] text-center">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-serif text-[40px] font-normal leading-[1.08] tracking-[-0.035em] text-[#343A3F] dark:text-white sm:text-[48px] lg:text-[54px]"
            >
              Keep In Touch With Us
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: 0.08,
              }}
              className="mx-auto mt-5 max-w-[700px] text-[14px] leading-7 text-slate-500 dark:text-slate-400 sm:text-[15px]"
            >
              We&apos;d love to hear from you! Whether you have questions,
              feedback, or just want to share your thoughts about “Whispers of
              Wisdom,” feel free to reach out.
            </motion.p>
          </div>

          {/* CONTACT INFO */}
          <div className="mt-14 grid gap-8 md:grid-cols-3 lg:mt-16 lg:gap-10">
            {contactItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="rounded-[24px] border border-slate-200/80 bg-[#FCFCFA] p-7 shadow-[0_16px_50px_rgba(15,23,42,0.04)] transition-colors dark:border-white/[0.07] dark:bg-[#0B2031] dark:shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2196F3]/8 text-[#2196F3] dark:bg-[#2196F3]/12">
                      <Icon size={20} strokeWidth={1.6} />
                    </div>

                    <div>
                      <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#31383D] dark:text-white">
                        {item.title}
                      </h3>

                      <div className="mt-4 space-y-1.5">
                        {item.lines.map((line) => (
                          <p
                            key={line}
                            className="font-serif text-[15px] leading-7 text-slate-500 dark:text-slate-400"
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

          {/* MESSAGE FORM */}
          <div className="mx-auto mt-20 max-w-[820px] lg:mt-24">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center"
            >
              <h2 className="font-serif text-[40px] font-normal leading-[1.08] tracking-[-0.035em] text-[#343A3F] dark:text-white sm:text-[48px]">
                Send A Message
              </h2>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: 0.08,
              }}
              className="mt-10 rounded-[28px] border border-slate-200/80 bg-[#FCFCFA] p-6 shadow-[0_24px_70px_rgba(15,23,42,0.05)] dark:border-white/[0.07] dark:bg-[#0B2031] dark:shadow-[0_26px_70px_rgba(0,0,0,0.2)] sm:p-8 lg:p-10"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="h-14 w-full rounded-xl border border-slate-200 bg-white px-4 text-[14px] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#2196F3]/60 focus:ring-4 focus:ring-[#2196F3]/10 dark:border-white/10 dark:bg-[#071B29] dark:text-white dark:placeholder:text-slate-500"
                  />
                </div>

                <div className="relative">
                  <Mail
                    size={16}
                    strokeWidth={1.6}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-[14px] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#2196F3]/60 focus:ring-4 focus:ring-[#2196F3]/10 dark:border-white/10 dark:bg-[#071B29] dark:text-white dark:placeholder:text-slate-500"
                  />
                </div>
              </div>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Message"
                rows={7}
                className="mt-5 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-4 text-[14px] leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#2196F3]/60 focus:ring-4 focus:ring-[#2196F3]/10 dark:border-white/10 dark:bg-[#071B29] dark:text-white dark:placeholder:text-slate-500"
              />

              <div className="mt-7 flex justify-center">
                <motion.button
                  type="submit"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 22,
                  }}
                  className="inline-flex min-h-[50px] min-w-[150px] items-center justify-center gap-2 rounded-full bg-[#2196F3] px-7 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#1976D2]"
                >
                  Submit
                  <Send size={15} strokeWidth={1.8} />
                </motion.button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
}