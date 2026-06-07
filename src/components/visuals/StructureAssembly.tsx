"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const STROKE = 1.25;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: "0px 0px -15% 0px" } as const;

const svg: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};
const colWrap: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const colRise: Variants = {
  hidden: { opacity: 0, scaleY: 0 },
  show: { opacity: 1, scaleY: 1, transition: { duration: 0.55, ease: EASE } },
};
const gableRise: Variants = {
  hidden: { opacity: 0, scaleY: 0.5 },
  show: { opacity: 1, scaleY: 1, transition: { duration: 0.6, ease: EASE } },
};
const cladDescend: Variants = {
  hidden: { opacity: 0, y: -16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const originBottom = {
  transformBox: "fill-box" as const,
  transformOrigin: "bottom" as const,
};
const originBottomCenter = {
  transformBox: "fill-box" as const,
  transformOrigin: "bottom center" as const,
};

/**
 * Tensostruttura / capannone a portale che si assembla allo scroll e poi
 * viene rivestito dai pannelli (telaio → struttura coperta), come nelle
 * reference. Statico se reduced-motion.
 */
export function StructureAssembly({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  const motionProps = reduce
    ? {}
    : ({ variants: svg, initial: "hidden", whileInView: "show", viewport: VIEWPORT } as const);

  return (
    <motion.svg
      viewBox="0 0 360 260"
      fill="none"
      className={className}
      aria-hidden="true"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...motionProps}
    >
      <defs>
        <radialGradient id="str-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="str-roof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="str-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Ombra di appoggio */}
      <motion.ellipse cx="180" cy="218" rx="150" ry="9" fill="url(#str-shadow)" variants={fade} />

      {/* Colonne che salgono */}
      <motion.g
        className="stroke-white/30"
        strokeWidth={STROKE}
        vectorEffect="non-scaling-stroke"
        variants={colWrap}
      >
        <motion.line x1="100" y1="120" x2="100" y2="216" variants={colRise} style={originBottom} />
        <motion.line x1="260" y1="120" x2="260" y2="216" variants={colRise} style={originBottom} />
      </motion.g>

      {/* Gable: capriata a portale che si solleva */}
      <motion.g
        className="stroke-white/30"
        strokeWidth={STROKE}
        vectorEffect="non-scaling-stroke"
        variants={gableRise}
        style={originBottomCenter}
      >
        <line x1="100" y1="120" x2="180" y2="76" />
        <line x1="260" y1="120" x2="180" y2="76" />
        <line x1="100" y1="120" x2="260" y2="120" />
        <line x1="180" y1="120" x2="180" y2="76" />
        <line x1="140" y1="120" x2="180" y2="76" />
        <line x1="220" y1="120" x2="180" y2="76" />
      </motion.g>

      {/* Montanti, girt e piastre di base */}
      <motion.g
        className="stroke-white/25"
        strokeWidth={STROKE}
        vectorEffect="non-scaling-stroke"
        variants={fade}
      >
        <line x1="180" y1="120" x2="180" y2="216" />
        <line x1="100" y1="168" x2="260" y2="168" />
        <line x1="90" y1="216" x2="110" y2="216" />
        <line x1="250" y1="216" x2="270" y2="216" />
      </motion.g>

      {/* Controventatura a X (accento) */}
      <motion.g
        className="stroke-brand"
        strokeWidth={STROKE}
        vectorEffect="non-scaling-stroke"
        variants={fade}
      >
        <line x1="100" y1="120" x2="260" y2="216" />
        <line x1="260" y1="120" x2="100" y2="216" />
      </motion.g>

      {/* Rivestimento: i pannelli calano a coprire il telaio */}
      <motion.g variants={cladDescend}>
        <polygon
          points="100,120 180,76 260,120"
          fill="url(#str-roof)"
          className="stroke-white/15"
          strokeWidth={STROKE}
          vectorEffect="non-scaling-stroke"
        />
        <rect
          x="100"
          y="120"
          width="160"
          height="96"
          fill="url(#str-wall)"
          className="stroke-white/15"
          strokeWidth={STROKE}
          vectorEffect="non-scaling-stroke"
        />
      </motion.g>

      {/* Quota + etichetta */}
      <motion.g variants={fade}>
        <g className="stroke-white/20" strokeWidth={STROKE} vectorEffect="non-scaling-stroke">
          <line x1="300" y1="76" x2="300" y2="216" />
          <line x1="295" y1="76" x2="305" y2="76" />
          <line x1="295" y1="216" x2="305" y2="216" />
        </g>
        <text x="300" y="150" textAnchor="middle" className="fill-zinc-600 font-mono" fontSize="9">
          H
        </text>
        <text x="180" y="240" textAnchor="middle" className="fill-zinc-600 font-mono" fontSize="9" letterSpacing="2">
          TENSOSTRUTTURA
        </text>
      </motion.g>
    </motion.svg>
  );
}
