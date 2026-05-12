"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    if (typeof document === "undefined" || !document.startViewTransition) {
      setTheme(next);
      return;
    }
    document.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });
  };

  return (
    <Button
      variant="ghost"
      type="button"
      size="icon"
      className="px-2"
      onClick={toggle}
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] text-neutral-800 dark:hidden dark:text-neutral-200" />
      <MoonIcon className="hidden h-[1.2rem] w-[1.2rem] text-neutral-800 dark:block dark:text-neutral-200" />
    </Button>
  );
}
