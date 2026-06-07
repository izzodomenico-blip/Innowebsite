"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * Bagliore di colore che "respira" allo scroll, dietro le sezioni-colore.
 * Entra/esce in dissolvenza ed esegue un leggero parallax verticale mentre la
 * sezione attraversa il viewport. Reduced-motion: non renderizza nulla (resta
 * solo il gradiente statico della sezione).
 */
export function SectionColorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [0, 1, 1, 0]
  );

  if (reduce) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        style={{ y, opacity }}
        className="absolute left-1/2 top-1/2 h-[70%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.18),transparent_68%)] blur-3xl"
      />
    </div>
  );
}
