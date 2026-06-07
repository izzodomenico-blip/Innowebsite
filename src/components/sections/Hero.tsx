import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedButton } from "@/components/AnimatedButton";
import { Badge } from "@/components/ui/Badge";
import { MotionReveal } from "@/components/motion/Reveal";
import { MotionHeadline } from "@/components/motion/MotionHeadline";
import { Parallax } from "@/components/motion/Parallax";
import { RenderFrame } from "@/components/visuals/RenderFrame";
import { ConveyorAssembly } from "@/components/visuals/ConveyorAssembly";
import { company, certifications, renders } from "@/content/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Bagliore radiale superiore (respiro lento) */}
      <div
        className="glow-radial-top animate-glow-breathe pointer-events-none absolute inset-x-0 top-0 h-[640px]"
        aria-hidden="true"
      />
      {/* Griglia blueprint con drift lentissimo */}
      <div
        className="bg-grid bg-grid-drift pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_55%_45%_at_50%_0%,black,transparent_75%)] [-webkit-mask-image:radial-gradient(ellipse_55%_45%_at_50%_0%,black,transparent_75%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 sm:pt-28 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <MotionReveal trigger="mount">
            <Badge dot className="mb-6">
              Material handling &amp; automazione industriale
            </Badge>
          </MotionReveal>

          <MotionHeadline
            as="h1"
            mask
            gradient
            trigger="mount"
            delay={0.15}
            text="Diamo movimento all'industria."
            className="text-display text-balance font-semibold tracking-[-0.03em]"
          />

          <MotionReveal trigger="mount" delay={0.38}>
            <p className="mx-auto mt-7 max-w-2xl text-pretty text-lead text-zinc-400">
              {company.description}
            </p>
          </MotionReveal>

          <MotionReveal trigger="mount" delay={0.52}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="#soluzioni">
                <AnimatedButton size="lg" glow className="gap-2">
                  <span>Scopri le soluzioni</span>
                  <ArrowRight className="h-4 w-4" />
                </AnimatedButton>
              </Link>
              <Link href="#contatti">
                <AnimatedButton variant="outline" size="lg">
                  Contattaci
                </AnimatedButton>
              </Link>
            </div>
          </MotionReveal>

          <MotionReveal trigger="mount" delay={0.64}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-zinc-500">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600">
                Certificati
              </span>
              {certifications.map((cert) => (
                <span
                  key={cert.code}
                  className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-400"
                >
                  {cert.code}
                </span>
              ))}
            </div>
          </MotionReveal>
        </div>

        {/* Visual hero: il trasportatore si assembla (slot per render/foto reali) */}
        <MotionReveal className="mx-auto mt-16 max-w-5xl" delay={0.3}>
          <Parallax distance={48}>
            <RenderFrame
              meta="INNO.TEC"
              className="aspect-[16/10] sm:aspect-[16/9]"
              src={renders.heroConveyor?.src}
              video={renders.heroConveyor?.video}
              poster={renders.heroConveyor?.poster}
              alt={renders.heroConveyor?.alt}
              priority
            >
              <ConveyorAssembly className="h-auto w-full max-w-3xl" />
            </RenderFrame>
          </Parallax>
        </MotionReveal>
      </div>
    </section>
  );
}
