"use client";

import { FormEvent, useEffect, useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export function EnquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Website load hone ke baad popup open hoga
    setIsOpen(true);
  }, []);

  function handleClose() {
    setIsOpen(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // API connection next step me karenge
  }

  // ESC press karne par popup close
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            overflow-y-auto
            bg-black/55
            px-4
            py-6
            backdrop-blur-[2px]
          "
        >
          {/* POPUP */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 15,
              scale: 0.97,
            }}
            transition={{
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Enquiry form"
            className="
              relative
              w-full
              max-w-[620px]
              rounded-[12px]
              bg-white
              px-5
              pb-7
              pt-8
              shadow-[0_24px_80px_rgba(0,0,0,0.28)]

              sm:px-8
              sm:pb-8
              sm:pt-10

              dark:border
              dark:border-white/[0.08]
              dark:bg-[#0B2031]
              dark:shadow-[0_28px_90px_rgba(0,0,0,0.55)]
            "
          >                                                                       c              
            {/* CLOSE BUTTON */}

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close enquiry form"
              className="
                absolute
                right-4
                top-4
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                text-slate-400
                transition-colors
                duration-200
                hover:bg-slate-100
                hover:text-slate-700

                dark:text-slate-400
                dark:hover:bg-white/[0.07]
                dark:hover:text-white
              "
            >
              <X size={20} strokeWidth={2} />
            </button>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="mt-3"
            >
              {/* FIRST NAME + LAST NAME */}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="enquiry-first-name"
                    className="
                      mb-2
                      block
                      text-[13px]
                      font-medium
                      text-slate-700
                      dark:text-slate-300
                    "
                  >
                    First Name{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="enquiry-first-name"
                    name="firstName"
                    type="text"
                    required
                    className="
                      h-[44px]
                      w-full
                      rounded-[6px]
                      border
                      border-slate-300
                      bg-white
                      px-3
                      text-[14px]
                      text-slate-900
                      outline-none
                      transition-all
                      duration-200

                      focus:border-[#2196F3]
                      focus:ring-2
                      focus:ring-[#2196F3]/10

                      dark:border-white/[0.12]
                      dark:bg-[#071A28]
                      dark:text-white
                      dark:focus:border-[#2196F3]
                      dark:focus:ring-[#2196F3]/15
                    "
                  />
                </div>

                <div>
                  <label
                    htmlFor="enquiry-last-name"
                    className="
                      mb-2
                      block
                      text-[13px]
                      font-medium
                      text-slate-700
                      dark:text-slate-300
                    "
                  >
                    Last Name{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="enquiry-last-name"
                    name="lastName"
                    type="text"
                    required
                    className="
                      h-[44px]
                      w-full
                      rounded-[6px]
                      border
                      border-slate-300
                      bg-white
                      px-3
                      text-[14px]
                      text-slate-900
                      outline-none
                      transition-all
                      duration-200

                      focus:border-[#2196F3]
                      focus:ring-2
                      focus:ring-[#2196F3]/10

                      dark:border-white/[0.12]
                      dark:bg-[#071A28]
                      dark:text-white
                      dark:focus:border-[#2196F3]
                      dark:focus:ring-[#2196F3]/15
                    "
                  />
                </div>
              </div>

              {/* EMAIL + MOBILE */}

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="enquiry-email"
                    className="
                      mb-2
                      block
                      text-[13px]
                      font-medium
                      text-slate-700
                      dark:text-slate-300
                    "
                  >
                    Email{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="enquiry-email"
                    name="email"
                    type="email"
                    required
                    className="
                      h-[44px]
                      w-full
                      rounded-[6px]
                      border
                      border-slate-300
                      bg-white
                      px-3
                      text-[14px]
                      text-slate-900
                      outline-none
                      transition-all
                      duration-200

                      focus:border-[#2196F3]
                      focus:ring-2
                      focus:ring-[#2196F3]/10

                      dark:border-white/[0.12]
                      dark:bg-[#071A28]
                      dark:text-white
                      dark:focus:border-[#2196F3]
                      dark:focus:ring-[#2196F3]/15
                    "
                  />
                </div>

                <div>
                  <label
                    htmlFor="enquiry-mobile"
                    className="
                      mb-2
                      block
                      text-[13px]
                      font-medium
                      text-slate-700
                      dark:text-slate-300
                    "
                  >
                    Mobile / WhatsApp{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="enquiry-mobile"
                    name="mobile"
                    type="tel"
                    required
                    className="
                      h-[44px]
                      w-full
                      rounded-[6px]
                      border
                      border-slate-300
                      bg-white
                      px-3
                      text-[14px]
                      text-slate-900
                      outline-none
                      transition-all
                      duration-200

                      focus:border-[#2196F3]
                      focus:ring-2
                      focus:ring-[#2196F3]/10

                      dark:border-white/[0.12]
                      dark:bg-[#071A28]
                      dark:text-white
                      dark:focus:border-[#2196F3]
                      dark:focus:ring-[#2196F3]/15
                    "
                  />
                </div>
              </div>

              {/* ORGANISATION */}

              <div className="mt-5">
                <label
                  htmlFor="enquiry-organisation"
                  className="
                    mb-2
                    block
                    text-[13px]
                    font-medium
                    text-slate-700
                    dark:text-slate-300
                  "
                >
                  Organisation
                </label>

                <input
                  id="enquiry-organisation"
                  name="organisation"
                  type="text"
                  className="
                    h-[44px]
                    w-full
                    rounded-[6px]
                    border
                    border-slate-300
                    bg-white
                    px-3
                    text-[14px]
                    text-slate-900
                    outline-none
                    transition-all
                    duration-200

                    focus:border-[#2196F3]
                    focus:ring-2
                    focus:ring-[#2196F3]/10

                    dark:border-white/[0.12]
                    dark:bg-[#071A28]
                    dark:text-white
                    dark:focus:border-[#2196F3]
                    dark:focus:ring-[#2196F3]/15
                  "
                />
              </div>

              {/* QUESTION */}

              <div className="mt-5">
                <label
                  htmlFor="enquiry-question"
                  className="
                    mb-2
                    block
                    text-[13px]
                    font-medium
                    text-slate-700
                    dark:text-slate-300
                  "
                >
                  Any Question?
                </label>

                <textarea
                  id="enquiry-question"
                  name="question"
                  rows={4}
                  className="
                    min-h-[95px]
                    w-full
                    resize-none
                    rounded-[6px]
                    border
                    border-slate-300
                    bg-white
                    px-3
                    py-3
                    text-[14px]
                    text-slate-900
                    outline-none
                    transition-all
                    duration-200

                    focus:border-[#2196F3]
                    focus:ring-2
                    focus:ring-[#2196F3]/10

                    dark:border-white/[0.12]
                    dark:bg-[#071A28]
                    dark:text-white
                    dark:focus:border-[#2196F3]
                    dark:focus:ring-[#2196F3]/15
                  "
                />
              </div>

            

              <div className="mt-5 space-y-3">
                <label
                  className="
                    flex
                    cursor-pointer
                    items-start
                    gap-2.5
                    text-[12px]
                    leading-5
                    text-slate-600
                    dark:text-slate-400
                  "
                >
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    required
                    className="
                      mt-[3px]
                      h-4
                      w-4
                      shrink-0
                      accent-[#2196F3]
                    "
                  />

                  <span>
                    I agree to the Terms &amp; Conditions
                  </span>
                </label>

                <label
                  className="
                    flex
                    cursor-pointer
                    items-start
                    gap-2.5
                    text-[12px]
                    leading-5
                    text-slate-600
                    dark:text-slate-400
                  "
                >
                  <input
                    type="checkbox"
                    name="receiveUpdates"
                    className="
                      mt-[3px]
                      h-4
                      w-4
                      shrink-0
                      accent-[#2196F3]
                    "
                  />

                  <span>
                    I would like to receive updates
                  </span>
                </label>
              </div>

            

              <div className="mt-7 flex justify-center">
                <button
                  type="submit"
                  className="
                    inline-flex
                    min-h-[42px]
                    items-center
                    justify-center
                    rounded-[5px]
                    bg-[#2196F3]
                    px-8
                    text-[12px]
                    font-semibold
                    uppercase
                    tracking-[0.04em]
                    text-white
                    transition-all
                    duration-300

                    hover:bg-[#1976D2]

                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#2196F3]/30
                    focus:ring-offset-2

                    dark:focus:ring-offset-[#0B2031]
                  "
                >
                  Submit Enquiry
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}