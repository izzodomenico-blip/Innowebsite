"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Ampiezza del movimento in px (positivo = scorre più lento). */
  distance?: number;
}

/** Parallax verticale leggero, guidato dallo scroll. Solo transform (GPU). */
export function Parallax({ children, className, distance = 56 }: ParallaxProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [distance * -0.35, distance]
  );

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, willChange: "transform" }}>{children}</motion.div>
    </div>
  );
}
