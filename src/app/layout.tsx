import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

import "./globals.css";

import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";
import { ThemeProvider } from "../providers/theme-provider";

/* =====================================================
   FONTS
===================================================== */

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

/* =====================================================
   METADATA
===================================================== */

export const metadata: Metadata = {
  title: "Whispers of Wisdom",
  description:
    "Discover a new perspective for a better you with Whispers of Wisdom.",
};

/* =====================================================
   ROOT LAYOUT
===================================================== */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${cormorant.variable}
          ${dmSans.variable}

          min-h-screen
          bg-[#fffdf6]
          font-sans
          text-slate-900
          antialiased

          transition-colors
          duration-300

          dark:bg-[#061522]
          dark:text-white
        `}
      >
        <ThemeProvider>
          {/* =====================================================
              GLOBAL BACKGROUND
          ===================================================== */}

          <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
            {/* =====================================================
                LIGHT THEME
            ===================================================== */}

            {/* BLUE + YELLOW BASE GRADIENT */}

            <div
              className="
                absolute
                inset-0

                bg-[linear-gradient(135deg,#fffdf4_0%,#fff8d8_20%,#f8fbf8_42%,#ebf7ff_70%,#dff3ff_100%)]

                dark:hidden
              "
            />

            {/* TOP LEFT YELLOW GLOW */}

            <div
              className="
                absolute
                -left-[220px]
                -top-[240px]

                h-[650px]
                w-[650px]

                rounded-full

                bg-[#FFD54F]/25

                blur-[150px]

                dark:hidden
              "
            />

            {/* TOP RIGHT BLUE GLOW */}

            <div
              className="
                absolute
                -right-[230px]
                -top-[200px]

                h-[680px]
                w-[680px]

                rounded-full

                bg-[#42A5F5]/22

                blur-[150px]

                dark:hidden
              "
            />

            {/* MIDDLE LEFT BLUE GLOW */}

            <div
              className="
                absolute
                -left-[280px]
                top-[35%]

                h-[620px]
                w-[620px]

                rounded-full

                bg-[#81D4FA]/15

                blur-[170px]

                dark:hidden
              "
            />

            {/* CENTER YELLOW GLOW */}

            <div
              className="
                absolute
                left-[35%]
                top-[38%]

                h-[480px]
                w-[580px]

                rounded-full

                bg-[#FFE082]/10

                blur-[170px]

                dark:hidden
              "
            />

            {/* BOTTOM RIGHT YELLOW */}

            <div
              className="
                absolute
                -right-[250px]
                bottom-[-260px]

                h-[680px]
                w-[680px]

                rounded-full

                bg-[#FFD54F]/16

                blur-[170px]

                dark:hidden
              "
            />

            {/* BOTTOM LEFT BLUE */}

            <div
              className="
                absolute
                -left-[180px]
                bottom-[-300px]

                h-[650px]
                w-[650px]

                rounded-full

                bg-[#42A5F5]/12

                blur-[170px]

                dark:hidden
              "
            />

            {/* =====================================================
                DARK THEME
            ===================================================== */}

            {/* DARK BASE */}

            <div
              className="
                absolute
                inset-0
                hidden

                bg-[radial-gradient(circle_at_top_right,#0B3550_0%,#061B2A_34%,#041522_72%)]

                dark:block
              "
            />

            {/* DARK TOP BLUE GLOW */}

            <div
              className="
                absolute
                -right-[240px]
                -top-[260px]

                hidden

                h-[700px]
                w-[700px]

                rounded-full

                bg-[#2196F3]/12

                blur-[160px]

                dark:block
              "
            />

            {/* DARK LEFT GLOW */}

            <div
              className="
                absolute
                -left-[280px]
                top-[36%]

                hidden

                h-[620px]
                w-[620px]

                rounded-full

                bg-cyan-400/[0.06]

                blur-[170px]

                dark:block
              "
            />

            {/* DARK BOTTOM GLOW */}

            <div
              className="
                absolute
                bottom-[-300px]
                right-[20%]

                hidden

                h-[650px]
                w-[650px]

                rounded-full

                bg-[#2196F3]/[0.07]

                blur-[170px]

                dark:block
              "
            />
          </div>

          {/* =====================================================
              GLOBAL NAVBAR
          ===================================================== */}

          <Navbar />

          {/* =====================================================
              PAGE CONTENT
          ===================================================== */}

          <main className="relative min-h-screen">
            {children}
          </main>

          {/* =====================================================
              GLOBAL FOOTER
          ===================================================== */}

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}