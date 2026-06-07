import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

/** Etichetta di sezione: linea ciano + testo mono uppercase. */
export function Eyebrow({ children, align = "left", className }: EyebrowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3",
        align === "center" && "justify-center",
        className
      )}
    >
      <span className="h-px w-8 bg-brand/60" aria-hidden="true" />
      <span className="font-mono text-eyebrow uppercase tracking-[0.2em] text-brand">
        {children}
      </span>
    </div>
  );
}
