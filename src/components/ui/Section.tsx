import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** "raised" applica una tinta di superficie leggermente più chiara. */
  tone?: "base" | "raised";
  /** Mostra il divider 1px sfumato in alto (default true). */
  divider?: boolean;
  containerClassName?: string;
}

/**
 * Wrapper di sezione: ritmo verticale, container e divider uniformi.
 * Centralizza il "layout system" del sito in un solo punto.
 */
export function Section({
  id,
  tone = "base",
  divider = true,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-24 sm:py-28 lg:py-32",
        divider && "hairline-top",
        tone === "raised" && "bg-white/[0.015]",
        className
      )}
      {...props}
    >
      <div
        className={cn("mx-auto max-w-7xl px-6 lg:px-8", containerClassName)}
      >
        {children}
      </div>
    </section>
  );
}
