"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE } from "./Reveal";

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
}

const base =
  "rounded-2xl border border-line bg-white/[0.02] p-6 hover:border-line-strong hover:bg-white/[0.04]";

/**
 * Card premium: entra in cascata (variants `item`, da usare in StaggerContainer)
 * e si solleva all'hover. Transform/opacity only.
 */
export function AnimatedCard({ className, children }: AnimatedCardProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={cn(base, "transition-colors duration-300", className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(base, "transition-colors duration-300", className)}
      variants={item}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}
