"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

export function SiteToaster() {
  const { resolvedTheme } = useTheme();
  return (
    <Toaster
      position="top-center"
      duration={2800}
      theme={(resolvedTheme as "light" | "dark") ?? "light"}
      toastOptions={{
        classNames: {
          toast:
            "!bg-background !text-foreground !border-border/80 !shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:!shadow-[0_8px_30px_rgba(0,0,0,0.6)] !p-4 !min-h-[68px] !rounded-xl",
          title: "!font-pixel !font-bold !text-base !tracking-tight",
          description: "!font-sans !text-sm !text-muted-foreground !mt-0.5",
        },
      }}
    />
  );
}
