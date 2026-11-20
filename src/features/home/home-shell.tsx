import { Fraunces, Inter } from "next/font/google";

const serif = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-wow-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-wow-sans",
  display: "swap",
});

/* Font CSS variables for the redesign (used by HomeShell and the website layout). */
export const wowFontVars = `${serif.variable} ${sans.variable}`;

/* Wraps a page with its fonts and colour tokens (.wow-home in globals.css). */
export function HomeShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={`wow-home ${wowFontVars} antialiased transition-colors duration-300`}>
      {children}
    </div>
  );
}
