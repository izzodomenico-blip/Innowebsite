import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { MotionHeadline } from "@/components/motion/MotionHeadline";
import { RenderFrame } from "@/components/visuals/RenderFrame";
import { CellAssembly } from "@/components/visuals/CellAssembly";
import { innocell, renders } from "@/content/site";

export function InnoCell() {
  return (
    <Section id="inno-cell" tone="cool">
      <Reveal className="panel relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-16">
        {/* Glow di prodotto su due angoli */}
        <div
          className="glow-radial-soft pointer-events-none absolute -right-24 -top-24 h-96 w-96"
          aria-hidden="true"
        />
        <div
          className="glow-radial-soft pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 opacity-60"
          aria-hidden="true"
        />

        <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div>
            <Badge className="mb-6 border-brand/25 text-brand">
              Prodotto di punta
            </Badge>

            <p className="font-mono text-sm uppercase tracking-[0.3em] text-zinc-500">
              {innocell.name}
            </p>
            <MotionHeadline
              as="h2"
              gradient
              text={innocell.title}
              className="mt-3 text-balance text-display-sm font-semibold tracking-[-0.02em]"
            />
            <p className="mt-5 max-w-xl text-pretty text-lead text-zinc-400">
              {innocell.description}
            </p>

            <Stagger className="mt-9 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              {innocell.features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <StaggerItem key={feature.title} className="flex gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-brand/20 bg-brand/10 text-brand">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                        {feature.description}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>

            <Link
              href="#contatti"
              className="mt-10 inline-flex items-center gap-2 font-medium text-brand transition-colors hover:text-brand-soft"
            >
              Richiedi informazioni su {innocell.name}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Visual */}
          <RenderFrame
            label="Schema cella"
            meta={innocell.name}
            className="aspect-square"
            src={renders.innocell?.src}
            video={renders.innocell?.video}
            poster={renders.innocell?.poster}
            alt={renders.innocell?.alt}
          >
            <CellAssembly className="h-auto w-full max-w-sm" />
          </RenderFrame>
        </div>
      </Reveal>
    </Section>
  );
}
