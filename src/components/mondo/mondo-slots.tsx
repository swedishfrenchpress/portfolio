"use client";

import { useMondo } from "@/components/mondo/mondo-provider";

// The provider awaits the lazy layer before switching, so these render
// synchronously inside the view transition instead of popping in after it.

export function MondoTop() {
  const { issue, layer } = useMondo();
  if (!issue || !layer) return null;
  return <layer.MondoTop issue={issue} />;
}

export function MondoBottom() {
  const { issue, layer } = useMondo();
  if (!issue || !layer) return null;
  return <layer.MondoBottom />;
}
