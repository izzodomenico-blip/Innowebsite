import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { RenderFrame } from "@/components/visuals/RenderFrame";
import { StructureAssembly } from "@/components/visuals/StructureAssembly";
import { structures, renders } from "@/content/site";

export function Structures() {
  return (
    <Section id="strutture">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow>Seconda linea di business</Eyebrow>
          <h2 className="mt-5 text-balance text-h2 font-semibold tracking-[-0.02em] text-white">
            Non solo movimentazione: strutture industriali.
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-lead text-zinc-400">
            Realizziamo strutture in carpenteria metallica per completare e
            valorizzare gli spazi produttivi e logistici.
          </p>

          <ul className="mt-10 divide-y divide-line border-y border-line">
            {structures.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title} className="flex gap-4 py-5">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line bg-white/[0.03] text-brand">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <RenderFrame
            label="Struttura metallica"
            meta="UNI EN 1090-1"
            className="aspect-[4/3]"
            src={renders.structures?.src}
            video={renders.structures?.video}
            poster={renders.structures?.poster}
            alt={renders.structures?.alt}
          >
            <StructureAssembly className="h-auto w-full max-w-md" />
          </RenderFrame>
        </Reveal>
      </div>
    </Section>
  );
}
