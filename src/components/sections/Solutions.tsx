import { SectionHeading } from "@/components/SectionHeading";
import { Section } from "@/components/ui/Section";
import { StaggerContainer } from "@/components/motion/Reveal";
import { AnimatedCard } from "@/components/motion/AnimatedCard";
import { services } from "@/content/site";

export function Solutions() {
  return (
    <Section id="soluzioni">
      <SectionHeading
        eyebrow="Soluzioni & servizi"
        title="Un unico partner, dall'idea all'assistenza."
        description="Seguiamo l'intero ciclo di vita dell'impianto: ingegneria, costruzione, installazione, collaudo e supporto, senza passaggi di consegne tra fornitori diversi."
      />

      <StaggerContainer className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <AnimatedCard
              key={service.title}
              className="group flex h-full flex-col"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white/[0.03] text-zinc-300 transition-colors duration-300 group-hover:border-brand/30 group-hover:text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs tracking-widest text-zinc-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-base font-semibold text-white">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {service.description}
              </p>
            </AnimatedCard>
          );
        })}
      </StaggerContainer>
    </Section>
  );
}
