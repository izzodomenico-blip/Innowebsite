"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/** Easing premium condiviso (coerente con --ease-premium). */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Trigger = "scroll" | "mount";

const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

interface MotionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Spostamento verticale iniziale in px. */
  y?: number;
  /** "scroll" (default) parte quando entra in viewport; "mount" al caricamento. */
  trigger?: Trigger;
}

/** Comparsa singola: fade + translateY, una sola volta. */
export function MotionReveal({
  children,
  className,
  delay = 0,
  y = 24,
  trigger = "scroll",
}: MotionRevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const activate =
    trigger === "mount"
      ? { animate: "show" as const }
      : { whileInView: "show" as const, viewport: VIEWPORT };

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay } },
      }}
      initial="hidden"
      {...activate}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  trigger?: Trigger;
}

/** Contenitore che fa entrare i figli (StaggerItem) in cascata. */
export function StaggerContainer({
  children,
  className,
  trigger = "scroll",
}: StaggerContainerProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const activate =
    trigger === "mount"
      ? { animate: "show" as const }
      : { whileInView: "show" as const, viewport: VIEWPORT };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      {...activate}
    >
      {children}
    </motion.div>
  );
}

/** Singolo elemento di uno StaggerContainer. */
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/* --- Alias retro-compatibili (FASE B) --- */
export const Reveal = MotionReveal;
export const Stagger = StaggerContainer;
