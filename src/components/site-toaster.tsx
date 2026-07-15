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
      // Width sized to hug the single "Copied…" toast copy with even padding.
      style={{ "--width": "288px" } as React.CSSProperties}
      toastOptions={{
        classNames: {
          toast:
            "!bg-background !text-foreground !border-border/80 !shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:!shadow-[0_8px_30px_rgba(0,0,0,0.6)] !p-4 !rounded-xl !justify-center",
          title: "!font-sans !text-sm !font-normal !text-muted-foreground !tracking-normal !text-center",
        },
      }}
    />
  );
}
