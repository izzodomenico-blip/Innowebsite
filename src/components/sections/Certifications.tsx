import { ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Section } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { certifications } from "@/content/site";

const values = [
  { label: "Metodo", text: "Processo ingegneristico tracciabile in ogni fase." },
  { label: "Competenza", text: "Meccanica, elettrica e software sotto lo stesso tetto." },
  { label: "Affidabilità", text: "Impianti che lavorano, con assistenza 24h." },
];

export function Certifications() {
  return (
    <Section id="affidabilita" tone="raised">
      <SectionHeading
        eyebrow="Affidabilità"
        title="Metodo, competenza, affidabilità."
        description="La qualità del nostro lavoro è certificata e verificabile, dalla sicurezza in cantiere alle strutture in acciaio."
      />

      <Stagger className="mt-14 grid gap-5 lg:grid-cols-2">
        {certifications.map((cert) => (
          <StaggerItem
            key={cert.code}
            className="flex items-center gap-5 rounded-2xl border border-line bg-white/[0.02] p-6"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-brand/20 bg-brand/10 text-brand">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="font-mono text-base font-medium tracking-tight text-white">
                {cert.code}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                {cert.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
        {values.map((value) => (
          <div key={value.label} className="bg-ink p-6">
            <p className="font-mono text-eyebrow uppercase tracking-[0.2em] text-brand">
              {value.label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {value.text}
            </p>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
