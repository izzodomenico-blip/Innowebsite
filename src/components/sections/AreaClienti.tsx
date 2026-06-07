import Link from "next/link";
import { ArrowRight, KeyRound } from "lucide-react";
import { AnimatedButton } from "@/components/AnimatedButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { MotionHeadline } from "@/components/motion/MotionHeadline";
import { MotionReveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TechnicalFrame } from "@/components/visuals/TechnicalFrame";
import { DocsSchematic } from "@/components/visuals/DocsSchematic";
import { clientArea, docCategories } from "@/content/site";

export function AreaClienti() {
  return (
    <Section id="area-clienti">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <div>
          <Eyebrow>{clientArea.eyebrow}</Eyebrow>
          <MotionHeadline
            as="h2"
            text={clientArea.title}
            className="mt-5 text-balance text-h2 font-semibold tracking-[-0.02em] text-white"
          />
          <MotionReveal delay={0.1}>
            <p className="mt-5 max-w-xl text-pretty text-lead text-zinc-400">
              {clientArea.description}
            </p>
          </MotionReveal>

          <Stagger className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {docCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <StaggerItem key={cat.title} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line bg-white/[0.03] text-brand">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-zinc-300">{cat.title}</span>
                </StaggerItem>
              );
            })}
          </Stagger>

          <MotionReveal delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/area-clienti">
                <AnimatedButton size="lg" glow className="gap-2">
                  <KeyRound className="h-4 w-4" />
                  <span>Accedi all&apos;Area Clienti</span>
                </AnimatedButton>
              </Link>
              <Link href="/documentazione-digitale">
                <AnimatedButton variant="outline" size="lg" className="gap-2">
                  <span>Scopri la documentazione digitale</span>
                  <ArrowRight className="h-4 w-4" />
                </AnimatedButton>
              </Link>
            </div>
          </MotionReveal>
        </div>

        {/* Visual */}
        <MotionReveal delay={0.1}>
          <TechnicalFrame
            label="Documentazione"
            meta="QR · IT/EN"
            className="aspect-square"
          >
            <DocsSchematic className="h-auto w-full max-w-sm" />
          </TechnicalFrame>
        </MotionReveal>
      </div>
    </Section>
  );
}
