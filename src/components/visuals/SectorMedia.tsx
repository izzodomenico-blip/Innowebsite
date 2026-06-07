"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface SectorMediaProps {
  video: string;
  poster?: string;
  alt?: string;
}

/**
 * Video di un settore: massima fluidità, nessuna attesa.
 * - `preload="auto"` → bufferizzato in anticipo, parte istantaneo.
 * - Autoplay quando entra in vista (muto, in loop): è già in riproduzione
 *   appena lo vedi, senza bisogno di hover. Si mette in pausa fuori vista.
 * - reduced-motion: solo poster.
 */
export function SectorMedia({ video, poster, alt = "" }: SectorMediaProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) v.play().catch(() => {});
          else v.pause();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      poster={poster}
      muted
      loop
      playsInline
      preload="auto"
      aria-label={alt}
    >
      <source src={video} />
    </video>
  );
}
