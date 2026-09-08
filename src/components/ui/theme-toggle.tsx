"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@teispace/next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-10" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        isDark ? "Switch to light mode" : "Switch to dark mode"
      }
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full

        border
        border-slate-200

        bg-white
        text-slate-700

        transition-all
        duration-300

        hover:border-sky-400
        hover:bg-sky-50
        hover:text-sky-600

        dark:border-white/10
        dark:bg-white/5
        dark:text-slate-200

        dark:hover:border-sky-400/50
        dark:hover:bg-sky-400/10
        dark:hover:text-sky-300
      "
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}