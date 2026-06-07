import { cn } from "@/lib/utils";

interface TechnicalFrameProps {
  children: React.ReactNode;
  /** Etichetta tecnica mono in alto a sinistra (es. "RCM-01 / SCHEMA"). */
  label?: string;
  /** Etichetta mono opzionale in basso a destra (es. "REV. 2025"). */
  meta?: string;
  className?: string;
}

/**
 * Contenitore "blueprint" per i visual tecnici.
 *
 * Funge anche da SLOT chiaro e intenzionale per render/foto reali futuri:
 * oggi ospita gli schemi SVG; in seguito i `children` potranno essere
 * sostituiti da un <Image> senza modificare il layout.
 */
export function TechnicalFrame({
  children,
  label,
  meta,
  className,
}: TechnicalFrameProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-line bg-ink-raised shadow-[inset_0_1px_0_0_rgb(255_255_255/0.05)]",
        className
      )}
    >
      {/* Griglia blueprint con dissolvenza ai bordi */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"
        aria-hidden="true"
      />
      {/* Bagliore radiale soffuso */}
      <div
        className="glow-radial-soft pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      {/* Tacche di registro agli angoli */}
      <Corner className="left-3 top-3 border-l border-t" />
      <Corner className="right-3 top-3 border-r border-t" />
      <Corner className="bottom-3 left-3 border-b border-l" />
      <Corner className="bottom-3 right-3 border-b border-r" />

      {label && (
        <span className="absolute left-4 top-4 z-10 rounded-md border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 backdrop-blur-sm">
          {label}
        </span>
      )}
      {meta && (
        <span className="absolute bottom-4 right-4 z-10 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">
          {meta}
        </span>
      )}

      <div className="relative z-[1] flex h-full w-full items-center justify-center p-6 sm:p-10">
        {children}
      </div>
    </div>
  );
}

function Corner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute h-5 w-5 border-brand/50",
        className
      )}
      aria-hidden="true"
    />
  );
}
