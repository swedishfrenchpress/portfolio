"use client";

import { useEffect, useRef } from "react";

interface Props {
  src: string;
  playbackRate?: number;
  className?: string;
}

export function ProjectVideo({ src, playbackRate, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ref.current && playbackRate) {
      ref.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      className={className}
    />
  );
}
