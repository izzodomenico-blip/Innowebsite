"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE } from "./Reveal";

interface MotionHeadlineProps {
  text: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  /** Effetto "mask-rise" (parola che sale da dietro un taglio). */
  mask?: boolean;
  /** Applica il gradiente premium (.text-gradient) parola per parola. */
  gradient?: boolean;
  /** Parole chiave da evidenziare in accento (match senza punteggiatura). */
  highlight?: string[];
  /** Ritardo aggiuntivo prima dell'avvio della cascata. */
  delay?: number;
  trigger?: "scroll" | "mount";
}

/**
 * Titolo con ingresso parola-per-parola (rise + fade, o mask-rise).
 * Non un semplice fade: ogni parola entra in sequenza.
 */
export function MotionHeadline({
  text,
  as = "h2",
  className,
  mask = false,
  gradient = false,
  highlight,
  delay = 0,
  trigger = "scroll",
}: MotionHeadlineProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    const cls = cn(className, gradient && "text-gradient");
    if (as === "h1") return <h1 className={cls}>{text}</h1>;
    if (as === "p") return <p className={cls}>{text}</p>;
    return <h2 className={cls}>{text}</h2>;
  }

  const MotionTag = as === "h1" ? motion.h1 : as === "p" ? motion.p : motion.h2;
  const words = text.split(" ");
  const norm = (s: string) => s.toLowerCase().replace(/[^0-9a-zàèéìòùç]/gi, "");
  const highlighted = new Set((highlight ?? []).map(norm));

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 + delay } },
  };
  const word: Variants = {
    hidden: { y: mask ? "115%" : "0.6em", opacity: mask ? 1 : 0 },
    show: {
      y: "0%",
      opacity: 1,
      transition: { duration: mask ? 0.7 : 0.6, ease: EASE },
    },
  };

  const activate =
    trigger === "mount"
      ? { animate: "show" as const }
      : {
          whileInView: "show" as const,
          viewport: { once: true, margin: "0px 0px -12% 0px" },
        };

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      {...activate}
    >
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span
            style={{
              display: "inline-block",
              overflow: mask ? "hidden" : "visible",
              verticalAlign: "top",
              paddingBottom: mask ? "0.12em" : undefined,
              marginBottom: mask ? "-0.12em" : undefined,
            }}
          >
            <motion.span
              className={cn(
                gradient && "text-gradient",
                highlighted.has(norm(w)) && "text-brand"
              )}
              style={{ display: "inline-block", willChange: "transform" }}
              variants={word}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </MotionTag>
  );
}
