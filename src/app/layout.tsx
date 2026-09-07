import type { Metadata } from "next";

import "./globals.css";

import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";
import { ThemeProvider } from "../providers/theme-provider";

export const metadata: Metadata = {
  title: "Whispers of Wisdom",
  description:
    "Discover a new perspective for a better you with Whispers of Wisdom.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="
          min-h-screen
          bg-[#faf9f6]
          text-slate-900
          antialiased
          transition-colors duration-300

          dark:bg-[#061522]
          dark:text-white
        "
      >
        <ThemeProvider>
          <Navbar />

          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}