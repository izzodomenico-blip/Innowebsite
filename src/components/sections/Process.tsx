import { SectionHeading } from "@/components/SectionHeading";
import { Section } from "@/components/ui/Section";
import { ProcessTimeline } from "./ProcessTimeline";

export function Process() {
  return (
    <Section id="metodo" tone="raised">
      <SectionHeading
        eyebrow="Come lavoriamo"
        title="Un metodo, sei fasi, zero passaggi a vuoto."
        description="Dalla prima analisi all'assistenza continua, ogni progetto segue un percorso ingegneristico chiaro e tracciabile."
      />
      <ProcessTimeline />
    </Section>
  );
}
