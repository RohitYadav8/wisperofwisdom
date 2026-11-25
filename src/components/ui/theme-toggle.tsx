"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@teispace/next-themes";

/* true in the browser, false during server render (avoids a hydration mismatch). */
const noop = () => () => {};
function useMounted() {
  return useSyncExternalStore(noop, () => true, () => false);
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return <div className="h-10 w-10" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--wow-line,rgba(11,34,51,0.1))] text-[var(--wow-ink-2,#334155)] transition hover:border-[var(--wow-ink,#0b2233)] hover:text-[var(--wow-ink,#0b2233)]"
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
