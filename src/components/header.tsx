"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { label: "index", href: "/" },
  { label: "projects", href: "/projects" },
  { label: "talks", href: "/talks" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="mb-16 flex items-center justify-end sm:mb-20">
      <nav className="flex items-center gap-4 text-sm sm:gap-5">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "plain transition-colors duration-200 hover:text-foreground",
              pathname === link.href
                ? "text-foreground"
                : "text-muted-foreground",
            )}
          >
            {link.label}
          </Link>
        ))}
        <ModeToggle />
      </nav>
    </header>
  );
}
