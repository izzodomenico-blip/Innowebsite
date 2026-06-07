import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MotionReveal } from "@/components/motion/Reveal";
import { MotionHeadline } from "@/components/motion/MotionHeadline";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}

/** Intestazione di sezione: eyebrow + titolo parola-per-parola + testo, in cascata. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      {eyebrow && (
        <MotionReveal>
          <Eyebrow align={align} className="mb-5">
            {eyebrow}
          </Eyebrow>
        </MotionReveal>
      )}
      <MotionHeadline
        as={as}
        text={title}
        className={cn(
          "text-balance font-semibold text-white",
          as === "h1"
            ? "text-display tracking-[-0.03em]"
            : "text-h2 tracking-[-0.02em]"
        )}
      />
      {description && (
        <MotionReveal delay={0.12}>
          <p
            className={cn(
              "mt-5 text-pretty text-lead text-zinc-400",
              centered && "mx-auto"
            )}
          >
            {description}
          </p>
        </MotionReveal>
      )}
    </div>
  );
}
