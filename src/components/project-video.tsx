"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  playbackRate?: number;
  className?: string;
}

export function ProjectVideo({ src, playbackRate, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (active && ref.current && playbackRate) {
      ref.current.playbackRate = playbackRate;
    }
  }, [active, playbackRate]);

  return (
    <video
      ref={ref}
      src={active ? src : undefined}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      className={className}
    />
  );
}
