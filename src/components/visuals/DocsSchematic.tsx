/**
 * Schema tecnico "documento + QR macchina" per l'Area Clienti / Documentazione.
 * Line-art blueprint coerente col resto. Decorativo (aria-hidden).
 */
const STROKE = 1.25;

export function DocsSchematic({ className }: { className?: string }) {
  const docLines = [96, 110, 124, 138, 152];

  return (
    <svg
      viewBox="0 0 360 300"
      fill="none"
      className={className}
      aria-hidden="true"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Documento / manuale */}
      <g strokeWidth={STROKE} vectorEffect="non-scaling-stroke">
        <rect x="40" y="52" width="156" height="206" rx="6" className="fill-white/[0.02] stroke-white/25" />
        <line x1="60" y1="74" x2="150" y2="74" className="stroke-white/30" />
        {docLines.map((y) => (
          <line key={y} x1="60" y1={y} x2="176" y2={y} className="stroke-white/15" />
        ))}
        <line x1="60" y1="166" x2="140" y2="166" className="stroke-white/15" />
        {/* Bollo CE / conformità */}
        <circle cx="72" cy="210" r="14" className="fill-brand/10 stroke-brand" />
        <path d="M66 210 l4 4 l8 -9" className="stroke-brand" />
        <line x1="96" y1="206" x2="170" y2="206" className="stroke-white/20" />
        <line x1="96" y1="216" x2="150" y2="216" className="stroke-white/15" />
      </g>
      <text x="40" y="44" className="fill-zinc-500 font-mono" fontSize="9" letterSpacing="1.5">
        DOC · REV. 03
      </text>

      {/* Card QR macchina */}
      <g strokeWidth={STROKE} vectorEffect="non-scaling-stroke">
        <rect x="186" y="120" width="138" height="138" rx="8" className="fill-ink-raised stroke-line-strong" />
      </g>

      {/* QR code stilizzato */}
      <g className="fill-brand">
        {/* finder patterns */}
        {[
          [202, 136],
          [284, 136],
          [202, 218],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <rect x={x} y={y} width="22" height="22" rx="2" className="fill-none stroke-brand" strokeWidth={STROKE} vectorEffect="non-scaling-stroke" />
            <rect x={x + 7} y={y + 7} width="8" height="8" rx="1" className="fill-brand" />
          </g>
        ))}
        {/* moduli */}
        {[
          [236, 140], [248, 140], [272, 152], [236, 164], [260, 164],
          [284, 176], [236, 188], [272, 188], [248, 200], [284, 212],
          [236, 224], [260, 236], [284, 236], [248, 248], [272, 224],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="9" height="9" rx="1" className={i % 4 === 0 ? "fill-brand" : "fill-white/35"} />
        ))}
        {/* linea di scansione */}
        <line x1="190" y1="124" x2="320" y2="124" className="doc-scan stroke-brand" strokeWidth={STROKE} vectorEffect="non-scaling-stroke" />
      </g>
      <text x="255" y="276" textAnchor="middle" className="fill-zinc-500 font-mono" fontSize="9" letterSpacing="2">
        QR MACCHINA
      </text>

      {/* Tag lingue */}
      <g>
        <rect x="150" y="60" width="46" height="18" rx="9" className="fill-ink-raised stroke-line" strokeWidth={STROKE} vectorEffect="non-scaling-stroke" />
        <text x="173" y="72" textAnchor="middle" className="fill-zinc-400 font-mono" fontSize="9" letterSpacing="1">
          IT · EN
        </text>
      </g>
    </svg>
  );
}
