"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ConveyorSchematic } from "./Schematics";

const STROKE = 1.25;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const rollers = Array.from({ length: 11 }, (_, i) => 60 + i * 28);

const svgVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};
const frameDraw: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  show: { opacity: 1, scaleX: 1, transition: { duration: 0.7, ease: EASE } },
};
const rollersWrap: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};
const rollerPop: Variants = {
  hidden: { opacity: 0, scale: 0 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: EASE } },
};
const slideIn: Variants = {
  hidden: { opacity: 0, x: -18 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

/** Hero conveyor che si "assembla" al mount. Statico se reduced-motion. */
export function ConveyorAssembly({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  if (reduce) return <ConveyorSchematic className={className} />;

  return (
    <motion.svg
      viewBox="0 0 400 240"
      fill="none"
      className={className}
      aria-hidden="true"
      strokeLinecap="round"
      strokeLinejoin="round"
      variants={svgVariants}
      initial="hidden"
      animate="show"
    >
      <defs>
        <radialGradient id="conva-roller" cx="35%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="conva-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.01" />
        </linearGradient>
        <radialGradient id="conva-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ombra di appoggio */}
      <motion.ellipse cx="200" cy="201" rx="168" ry="13" fill="url(#conva-shadow)" variants={fade} />

      {/* Telaio (si disegna da sinistra) */}
      <motion.g
        variants={frameDraw}
        style={{ transformBox: "fill-box", transformOrigin: "left center" }}
      >
        <rect
          x="40"
          y="120"
          width="320"
          height="16"
          rx="2"
          fill="url(#conva-metal)"
          className="stroke-white/30"
          strokeWidth={STROKE}
          vectorEffect="non-scaling-stroke"
        />
      </motion.g>

      {/* Rulli (pop in sequenza) */}
      <motion.g variants={rollersWrap}>
        {rollers.map((x) => (
          <motion.circle
            key={x}
            cx={x}
            cy={114}
            r={6.5}
            fill="url(#conva-roller)"
            className="stroke-white/25"
            strokeWidth={STROKE}
            vectorEffect="non-scaling-stroke"
            variants={rollerPop}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        ))}
      </motion.g>

      {/* Pacco trasportato (entra da sinistra) */}
      <motion.g
        variants={slideIn}
        className="stroke-white/30"
        strokeWidth={STROKE}
        vectorEffect="non-scaling-stroke"
      >
        <rect x="120" y="86" width="72" height="26" rx="2" fill="url(#conva-metal)" />
        <line x1="120" y1="94" x2="192" y2="94" className="stroke-white/15" />
      </motion.g>

      {/* Motore / azionamento */}
      <motion.g variants={fade}>
        <rect
          x="346"
          y="118"
          width="20"
          height="20"
          rx="2"
          fill="url(#conva-metal)"
          className="stroke-white/30"
          strokeWidth={STROKE}
          vectorEffect="non-scaling-stroke"
        />
        <text x="356" y="132" textAnchor="middle" className="fill-zinc-500 font-mono" fontSize="9">
          M
        </text>
      </motion.g>

      {/* Gambe di supporto */}
      <motion.g
        variants={fade}
        className="stroke-white/25"
        strokeWidth={STROKE}
        vectorEffect="non-scaling-stroke"
      >
        <line x1="72" y1="136" x2="72" y2="196" />
        <line x1="328" y1="136" x2="328" y2="196" />
        <line x1="62" y1="196" x2="82" y2="196" />
        <line x1="318" y1="196" x2="338" y2="196" />
      </motion.g>

      {/* Rullo motorizzato evidenziato + esploso */}
      <motion.g variants={fade}>
        <circle cx="256" cy="114" r="6.5" className="fill-brand/10 stroke-brand" strokeWidth={STROKE} vectorEffect="non-scaling-stroke" />
        <circle cx="300" cy="64" r="9" className="fill-brand/10 stroke-brand" strokeWidth={STROKE} vectorEffect="non-scaling-stroke" />
        <line x1="300" y1="73" x2="280" y2="108" className="stroke-brand" strokeWidth={STROKE} strokeDasharray="2 4" vectorEffect="non-scaling-stroke" />
        <text x="312" y="60" className="fill-zinc-400 font-mono" fontSize="9" letterSpacing="1.5">
          RULLO
        </text>
        <text x="312" y="72" className="fill-zinc-600 font-mono" fontSize="9" letterSpacing="1.5">
          MOTORIZZATO
        </text>
      </motion.g>

      {/* Flusso */}
      <motion.g variants={fade}>
        <line x1="150" y1="58" x2="250" y2="58" className="stroke-brand" strokeWidth={STROKE} strokeDasharray="2 6" vectorEffect="non-scaling-stroke" />
        <path d="M250 58 l-7 -4 M250 58 l-7 4" className="stroke-brand" strokeWidth={STROKE} vectorEffect="non-scaling-stroke" />
        <text x="150" y="48" className="fill-brand font-mono" fontSize="9" letterSpacing="2">
          FLUSSO
        </text>
      </motion.g>

      {/* Linea di terra + quota */}
      <motion.g variants={fade}>
        <line x1="20" y1="205" x2="380" y2="205" className="stroke-white/10" strokeWidth={STROKE} strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
        <line x1="40" y1="224" x2="360" y2="224" className="stroke-white/20" strokeWidth={STROKE} vectorEffect="non-scaling-stroke" />
        <line x1="40" y1="219" x2="40" y2="229" className="stroke-white/20" strokeWidth={STROKE} vectorEffect="non-scaling-stroke" />
        <line x1="360" y1="219" x2="360" y2="229" className="stroke-white/20" strokeWidth={STROKE} vectorEffect="non-scaling-stroke" />
        <text x="200" y="221" textAnchor="middle" className="fill-zinc-600 font-mono" fontSize="9" letterSpacing="2">
          MODULO RCM
        </text>
      </motion.g>
    </motion.svg>
  );
}
