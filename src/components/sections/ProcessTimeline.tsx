"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { processSteps, type ProcessStep } from "@/content/site";
import { EASE } from "@/components/motion/Reveal";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

function StepNode({
  step,
  index,
  total,
  progress,
  reduce,
}: {
  step: ProcessStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const start = total > 1 ? index / total : 0;
  const end = total > 1 ? (index + 0.85) / total : 0.5;
  const ringOpacity = useTransform(progress, [start, end], [0, 1]);
  const ringScale = useTransform(progress, [start, end], [0.6, 1]);

  return (
    <motion.li className="relative" variants={reduce ? undefined : item}>
      <div className="relative z-[1] flex h-12 w-12 items-center justify-center rounded-full border border-line-strong bg-ink font-mono text-sm text-brand">
        {!reduce && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full ring-2 ring-brand/70"
            style={{ opacity: ringOpacity, scale: ringScale }}
          />
        )}
        <span className="relative">{step.number}</span>
      </div>
      <h3 className="mt-5 text-base font-semibold text-white">{step.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
        {step.description}
      </p>
    </motion.li>
  );
}

export function ProcessTimeline() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const headLeft = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const total = processSteps.length;
  const nodes = processSteps.map((step, index) => (
    <StepNode
      key={step.number}
      step={step}
      index={index}
      total={total}
      progress={scrollYProgress}
      reduce={reduce ?? false}
    />
  ));

  const gridClass =
    "grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-6";

  return (
    <div ref={ref} className="relative mt-16">
      {/* Connettore base (desktop) */}
      <div
        className="absolute left-0 right-0 top-6 hidden h-px bg-line lg:block"
        aria-hidden="true"
      />
      {/* Connettore di avanzamento che si disegna allo scroll (desktop) */}
      {!reduce && (
        <motion.div
          className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-gradient-to-r from-brand/80 to-brand/30 lg:block"
          style={{ scaleX: lineScaleX }}
          aria-hidden="true"
        />
      )}
      {/* Testa luminosa che guida la linea (flusso) */}
      {!reduce && (
        <motion.div
          className="absolute top-6 hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand shadow-[0_0_14px_3px_rgba(34,211,238,0.55)] lg:block"
          style={{ left: headLeft }}
          aria-hidden="true"
        />
      )}

      {reduce ? (
        <ol className={gridClass}>{nodes}</ol>
      ) : (
        <motion.ol
          className={gridClass}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        >
          {nodes}
        </motion.ol>
      )}
    </div>
  );
}
