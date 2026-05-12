"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  text: string;
  delay?: number;
  className?: string;
}

/**
 * Hero-only effect: text emerges from behind a redaction bar that
 * retracts toward the right edge. Single, decisive first-paint beat.
 */
export function RedactedText({ text, delay = 0, className }: Props) {
  const reduce = useReducedMotion();

  return (
    <span className={cn("relative inline-block align-baseline", className)}>
      <span className="relative z-0">{text}</span>
      {!reduce && (
        <span
          aria-hidden
          className="redaction-bar absolute inset-0 z-10 bg-foreground"
          style={{
            animationDelay: `${delay}ms`,
          }}
        />
      )}
    </span>
  );
}
