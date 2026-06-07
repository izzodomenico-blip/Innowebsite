/**
 * Schemi tecnici vettoriali in stile "blueprint" per il material handling.
 *
 * Illustrazioni originali (line-art con profondità: ombre di appoggio, shading
 * cilindrico dei rulli, sfumature metallo) pensate come segnaposto premium,
 * da affiancare o sostituire con render/foto reali tramite RenderFrame.
 * Tutti gli SVG sono decorativi (aria-hidden) e usano vector-effect non-scaling.
 */

const STROKE = 1.25;

interface SchematicProps {
  className?: string;
}

/** Modulo trasportatore a rulli (vista laterale) con rullo "esploso". */
export function ConveyorSchematic({ className }: SchematicProps) {
  const rollers = Array.from({ length: 11 }, (_, i) => 60 + i * 28);

  return (
    <svg
      viewBox="0 0 400 240"
      fill="none"
      className={className}
      aria-hidden="true"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <radialGradient id="conv-roller" cx="35%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="conv-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.01" />
        </linearGradient>
        <radialGradient id="conv-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ombra di appoggio */}
      <ellipse cx="200" cy="201" rx="168" ry="13" fill="url(#conv-shadow)" />

      {/* Flusso */}
      <g className="stroke-brand" strokeWidth={STROKE} vectorEffect="non-scaling-stroke">
        <line x1="150" y1="58" x2="250" y2="58" strokeDasharray="2 6" />
        <path d="M250 58 l-7 -4 M250 58 l-7 4" />
      </g>
      <text x="150" y="48" className="fill-brand font-mono" fontSize="9" letterSpacing="2">
        FLUSSO
      </text>

      {/* Collo / pacco trasportato */}
      <g strokeWidth={STROKE} vectorEffect="non-scaling-stroke">
        <rect x="120" y="86" width="72" height="26" rx="2" fill="url(#conv-metal)" className="stroke-white/30" />
        <line x1="120" y1="94" x2="192" y2="94" className="stroke-white/15" />
      </g>

      {/* Telaio del modulo */}
      <rect x="40" y="120" width="320" height="16" rx="2" fill="url(#conv-metal)" className="stroke-white/30" strokeWidth={STROKE} vectorEffect="non-scaling-stroke" />

      {/* Rulli con shading cilindrico */}
      <g strokeWidth={STROKE} vectorEffect="non-scaling-stroke">
        {rollers.map((x) => (
          <circle key={x} cx={x} cy={114} r={6.5} fill="url(#conv-roller)" className="stroke-white/25" />
        ))}
      </g>

      {/* Rullo motorizzato evidenziato + esploso con leader */}
      <g className="stroke-brand" strokeWidth={STROKE} vectorEffect="non-scaling-stroke">
        <circle cx="256" cy="114" r="6.5" className="fill-brand/10 stroke-brand" />
        <circle cx="300" cy="64" r="9" className="fill-brand/10 stroke-brand" />
        <line x1="300" y1="73" x2="280" y2="108" strokeDasharray="2 4" />
      </g>
      <text x="312" y="60" className="fill-zinc-400 font-mono" fontSize="9" letterSpacing="1.5">
        RULLO
      </text>
      <text x="312" y="72" className="fill-zinc-600 font-mono" fontSize="9" letterSpacing="1.5">
        MOTORIZZATO
      </text>

      {/* Motore / unità di azionamento */}
      <rect x="346" y="118" width="20" height="20" rx="2" fill="url(#conv-metal)" className="stroke-white/30" strokeWidth={STROKE} vectorEffect="non-scaling-stroke" />
      <text x="356" y="132" textAnchor="middle" className="fill-zinc-500 font-mono" fontSize="9">
        M
      </text>

      {/* Gambe di supporto */}
      <g className="stroke-white/25" strokeWidth={STROKE} vectorEffect="non-scaling-stroke">
        <line x1="72" y1="136" x2="72" y2="196" />
        <line x1="328" y1="136" x2="328" y2="196" />
        <line x1="62" y1="196" x2="82" y2="196" />
        <line x1="318" y1="196" x2="338" y2="196" />
      </g>

      {/* Linea di quota */}
      <g className="stroke-white/20" strokeWidth={STROKE} vectorEffect="non-scaling-stroke">
        <line x1="40" y1="224" x2="360" y2="224" />
        <line x1="40" y1="219" x2="40" y2="229" />
        <line x1="360" y1="219" x2="360" y2="229" />
      </g>
      <text x="200" y="221" textAnchor="middle" className="fill-zinc-600 font-mono" fontSize="9" letterSpacing="2">
        MODULO RCM
      </text>
    </svg>
  );
}

/** Cella di automazione modulare con stub di ingresso/uscita. */
export function CellSchematic({ className }: SchematicProps) {
  return (
    <svg
      viewBox="0 0 360 300"
      fill="none"
      className={className}
      aria-hidden="true"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <radialGradient id="cell-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cell-module" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.03" />
        </linearGradient>
        <radialGradient id="cell-roller" cx="35%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Glow dietro il modulo */}
      <circle cx="180" cy="165" r="80" fill="url(#cell-glow)" />

      {/* Envelope della cella */}
      <rect x="80" y="70" width="200" height="170" rx="6" className="stroke-white/20" strokeWidth={STROKE} strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />

      {/* Modulo centrale (manipolatore) */}
      <g className="stroke-brand" strokeWidth={STROKE} vectorEffect="non-scaling-stroke">
        <rect x="150" y="135" width="60" height="60" rx="4" fill="url(#cell-module)" />
        <circle cx="180" cy="165" r="12" />
        <line x1="180" y1="165" x2="204" y2="141" />
        <circle cx="204" cy="141" r="3.5" className="fill-brand/20" />
      </g>

      {/* Stub di ingresso (sinistra) */}
      <g className="stroke-white/25" strokeWidth={STROKE} vectorEffect="non-scaling-stroke">
        <rect x="20" y="160" width="60" height="12" rx="2" />
        <circle cx="32" cy="156" r="4" fill="url(#cell-roller)" />
        <circle cx="48" cy="156" r="4" fill="url(#cell-roller)" />
        <circle cx="64" cy="156" r="4" fill="url(#cell-roller)" />
      </g>
      <g className="stroke-brand" strokeWidth={STROKE} vectorEffect="non-scaling-stroke">
        <line x1="34" y1="140" x2="66" y2="140" strokeDasharray="2 6" />
        <path d="M66 140 l-6 -3 M66 140 l-6 3" />
      </g>
      <text x="24" y="132" className="fill-zinc-500 font-mono" fontSize="9" letterSpacing="1.5">
        IN
      </text>

      {/* Stub di uscita (destra) */}
      <g className="stroke-white/25" strokeWidth={STROKE} vectorEffect="non-scaling-stroke">
        <rect x="280" y="160" width="60" height="12" rx="2" />
        <circle cx="292" cy="156" r="4" fill="url(#cell-roller)" />
        <circle cx="308" cy="156" r="4" fill="url(#cell-roller)" />
        <circle cx="324" cy="156" r="4" fill="url(#cell-roller)" />
      </g>
      <g className="stroke-brand" strokeWidth={STROKE} vectorEffect="non-scaling-stroke">
        <line x1="290" y1="140" x2="322" y2="140" strokeDasharray="2 6" />
        <path d="M322 140 l-6 -3 M322 140 l-6 3" />
      </g>
      <text x="316" y="132" className="fill-zinc-500 font-mono" fontSize="9" letterSpacing="1.5">
        OUT
      </text>

      {/* Nodi sensore/controllo */}
      <g className="fill-brand/70">
        <circle cx="96" cy="86" r="2.5" />
        <circle cx="264" cy="86" r="2.5" />
        <circle cx="96" cy="224" r="2.5" />
        <circle cx="264" cy="224" r="2.5" />
      </g>

      {/* Etichetta cella */}
      <text x="180" y="262" textAnchor="middle" className="fill-zinc-500 font-mono" fontSize="10" letterSpacing="3">
        INNO.CELL
      </text>
    </svg>
  );
}

/** Soppalco / struttura in carpenteria metallica (telaio a due livelli). */
export function MezzanineSchematic({ className }: SchematicProps) {
  const columns = [60, 140, 220, 300];

  return (
    <svg
      viewBox="0 0 360 240"
      fill="none"
      className={className}
      aria-hidden="true"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <radialGradient id="mezz-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mezz-deck" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Ombra di appoggio */}
      <ellipse cx="190" cy="202" rx="155" ry="11" fill="url(#mezz-shadow)" />

      {/* Piani (deck) con sfumatura */}
      <rect x="60" y="46" width="240" height="8" fill="url(#mezz-deck)" />
      <rect x="60" y="116" width="240" height="8" fill="url(#mezz-deck)" />

      {/* Colonne e travi */}
      <g className="stroke-white/30" strokeWidth={STROKE} vectorEffect="non-scaling-stroke">
        {columns.map((x) => (
          <line key={x} x1={x} y1="50" x2={x} y2="200" />
        ))}
        <line x1="60" y1="50" x2="300" y2="50" />
        <line x1="60" y1="120" x2="300" y2="120" />
        <line x1="60" y1="200" x2="300" y2="200" />
      </g>

      {/* Controventatura a X (accento) */}
      <g className="stroke-brand" strokeWidth={STROKE} vectorEffect="non-scaling-stroke">
        <line x1="60" y1="120" x2="140" y2="200" />
        <line x1="140" y1="120" x2="60" y2="200" />
      </g>

      {/* Scala di accesso */}
      <g className="stroke-white/25" strokeWidth={STROKE} vectorEffect="non-scaling-stroke">
        <line x1="300" y1="120" x2="332" y2="200" />
        <line x1="310" y1="120" x2="342" y2="200" />
        <line x1="305" y1="135" x2="315" y2="135" />
        <line x1="312" y1="152" x2="322" y2="152" />
        <line x1="319" y1="169" x2="329" y2="169" />
        <line x1="326" y1="186" x2="336" y2="186" />
      </g>

      {/* Quota altezza */}
      <g className="stroke-white/20" strokeWidth={STROKE} vectorEffect="non-scaling-stroke">
        <line x1="40" y1="50" x2="40" y2="200" />
        <line x1="35" y1="50" x2="45" y2="50" />
        <line x1="35" y1="200" x2="45" y2="200" />
      </g>
      <text x="30" y="128" textAnchor="middle" className="fill-zinc-600 font-mono" fontSize="9" letterSpacing="1">
        H
      </text>

      <text x="180" y="228" textAnchor="middle" className="fill-zinc-600 font-mono" fontSize="9" letterSpacing="2">
        SOPPALCO / STRUTTURA
      </text>
    </svg>
  );
}
