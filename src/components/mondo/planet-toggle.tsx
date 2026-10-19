"use client";

import { Globe } from "@/components/mondo/globe";
import { ISSUES } from "@/components/mondo/issues";
import { loadMondoLayer, useMondo } from "@/components/mondo/mondo-provider";

export function PlanetToggle() {
  const { issue, next } = useMondo();

  const label = !issue
    ? "Open MONDO mode"
    : issue === ISSUES[ISSUES.length - 1]
      ? "Back to the normal site"
      : "Next issue";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={next}
      onPointerEnter={() => loadMondoLayer()}
      onFocus={() => loadMondoLayer()}
      className="mondo-planet rounded-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-rotate-12 hover:scale-110"
    >
      <Globe className="block size-4" />
    </button>
  );
}
