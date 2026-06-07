"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { CellSchematic } from "./Schematics";

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
const grow: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};
const pop: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
};
const slideL: Variants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};
const slideR: Variants = {
  hidden: { opacity: 0, x: 16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};
const nodesWrap: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const nodePop: Variants = {
  hidden: { opacity: 0, scale: 0 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: EASE } },
};

const centerOrigin = {
  transformBox: "fill-box" as const,
  transformOrigin: "center" as const,
};

/** Cella INNO.CELL che si compone allo scroll. Statico se reduced-motion. */
export function CellAssembly({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  if (reduce) return <CellSchematic className={className} />;

  return (
    <motion.svg
      viewBox="0 0 360 300"
      fill="none"
      className={className}
      aria-hidden="true"
      strokeLinecap="round"
      strokeLinejoin="round"
      variants={svg}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      <defs>
        <radialGradient id="cella-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cella-module" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.03" />
        </linearGradient>
        <radialGradient id="cella-roller" cx="35%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Glow dietro il modulo */}
      <motion.circle cx="180" cy="165" r="80" fill="url(#cella-glow)" variants={fade} />

      {/* Envelope della cella */}
      <motion.rect
        x="80"
        y="70"
        width="200"
        height="170"
        rx="6"
        className="stroke-white/20"
        strokeWidth={STROKE}
        strokeDasharray="4 6"
        vectorEffect="non-scaling-stroke"
        variants={grow}
        style={centerOrigin}
      />

      {/* Modulo centrale (manipolatore) */}
      <motion.g
        className="stroke-brand"
        strokeWidth={STROKE}
        vectorEffect="non-scaling-stroke"
        variants={pop}
        style={centerOrigin}
      >
        <rect x="150" y="135" width="60" height="60" rx="4" fill="url(#cella-module)" />
        <circle cx="180" cy="165" r="12" />
        <line x1="180" y1="165" x2="204" y2="141" />
        <circle cx="204" cy="141" r="3.5" className="fill-brand/20" />
      </motion.g>

      {/* Stub di ingresso (sinistra) */}
      <motion.g variants={slideL}>
        <g className="stroke-white/25" strokeWidth={STROKE} vectorEffect="non-scaling-stroke">
          <rect x="20" y="160" width="60" height="12" rx="2" />
          <circle cx="32" cy="156" r="4" fill="url(#cella-roller)" />
          <circle cx="48" cy="156" r="4" fill="url(#cella-roller)" />
          <circle cx="64" cy="156" r="4" fill="url(#cella-roller)" />
        </g>
        <g className="stroke-brand" strokeWidth={STROKE} vectorEffect="non-scaling-stroke">
          <line x1="34" y1="140" x2="66" y2="140" strokeDasharray="2 6" />
          <path d="M66 140 l-6 -3 M66 140 l-6 3" />
        </g>
        <text x="24" y="132" className="fill-zinc-500 font-mono" fontSize="9" letterSpacing="1.5">
          IN
        </text>
      </motion.g>

      {/* Stub di uscita (destra) */}
      <motion.g variants={slideR}>
        <g className="stroke-white/25" strokeWidth={STROKE} vectorEffect="non-scaling-stroke">
          <rect x="280" y="160" width="60" height="12" rx="2" />
          <circle cx="292" cy="156" r="4" fill="url(#cella-roller)" />
          <circle cx="308" cy="156" r="4" fill="url(#cella-roller)" />
          <circle cx="324" cy="156" r="4" fill="url(#cella-roller)" />
        </g>
        <g className="stroke-brand" strokeWidth={STROKE} vectorEffect="non-scaling-stroke">
          <line x1="290" y1="140" x2="322" y2="140" strokeDasharray="2 6" />
          <path d="M322 140 l-6 -3 M322 140 l-6 3" />
        </g>
        <text x="316" y="132" className="fill-zinc-500 font-mono" fontSize="9" letterSpacing="1.5">
          OUT
        </text>
      </motion.g>

      {/* Nodi sensore/controllo */}
      <motion.g className="fill-brand/70" variants={nodesWrap}>
        <motion.circle cx="96" cy="86" r="2.5" variants={nodePop} style={centerOrigin} />
        <motion.circle cx="264" cy="86" r="2.5" variants={nodePop} style={centerOrigin} />
        <motion.circle cx="96" cy="224" r="2.5" variants={nodePop} style={centerOrigin} />
        <motion.circle cx="264" cy="224" r="2.5" variants={nodePop} style={centerOrigin} />
      </motion.g>

      {/* Impulsi di flusso attivi (entrata via framer, viaggio via CSS) */}
      <motion.g className="fill-brand" variants={fade}>
        <circle
          cx="26"
          cy="166"
          r="2.6"
          className="flow-pulse"
          style={{ ["--flow-dist" as string]: "40px" } as CSSProperties}
        />
        <circle
          cx="286"
          cy="166"
          r="2.6"
          className="flow-pulse-delayed"
          style={{ ["--flow-dist" as string]: "40px" } as CSSProperties}
        />
      </motion.g>

      {/* Etichetta cella */}
      <motion.text
        x="180"
        y="262"
        textAnchor="middle"
        className="fill-zinc-500 font-mono"
        fontSize="10"
        letterSpacing="3"
        variants={fade}
      >
        INNO.CELL
      </motion.text>
    </motion.svg>
  );
}
