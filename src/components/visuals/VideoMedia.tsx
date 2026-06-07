"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface VideoMediaProps {
  src: string;
  poster?: string;
}

/**
 * Video di sezione: muto, inline, parte quando entra in viewport (reveal,
 * non in loop) e si ferma quando esce. In reduced-motion non parte e resta
 * sul poster (ultimo frame / struttura finita).
 */
export function VideoMedia({ src, poster }: VideoMediaProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video || reduce) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.12 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-contain"
      poster={poster}
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
    >
      <source src={src} />
    </video>
  );
}
