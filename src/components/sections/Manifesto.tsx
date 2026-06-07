import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { MotionReveal } from "@/components/motion/Reveal";
import { MotionHeadline } from "@/components/motion/MotionHeadline";
import { company } from "@/content/site";

export function Manifesto() {
  return (
    <Section id="manifesto" tone="blue">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <MotionReveal className="lg:col-span-4">
          <Eyebrow>Manifesto</Eyebrow>
          <p className="mt-6 font-mono text-sm leading-relaxed text-zinc-500">
            {company.vision}
          </p>
        </MotionReveal>

        <div className="lg:col-span-8">
          <MotionHeadline
            as="p"
            text={company.tagline}
            highlight={["velocizzare", "ottimizzare", "automatizzare"]}
            className="text-display-sm font-medium tracking-[-0.02em] text-white"
          />
          <MotionReveal delay={0.15}>
            <p className="mt-8 max-w-2xl text-pretty text-lead text-zinc-400">
              Progettiamo, costruiamo e installiamo sistemi di movimentazione
              automatizzata su misura. Uniamo competenza meccanica, integrazione
              software e un metodo ingegneristico che accompagna il cliente
              dall&apos;idea iniziale fino all&apos;impianto operativo — e oltre,
              con l&apos;assistenza.
            </p>
          </MotionReveal>
        </div>
      </div>
    </Section>
  );
}
