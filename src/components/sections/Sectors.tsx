import { SectionHeading } from "@/components/SectionHeading";
import { Section } from "@/components/ui/Section";
import { SpotlightCard } from "@/components/SpotlightCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectorMedia } from "@/components/visuals/SectorMedia";
import { sectors } from "@/content/site";

export function Sectors() {
  return (
    <Section id="settori" tone="raised">
      <SectionHeading
        eyebrow="Settori"
        title="Soluzioni per chi muove materiali ogni giorno."
        description="Conosciamo le esigenze dei settori in cui la movimentazione è il cuore del processo produttivo e logistico."
      />

      <Stagger className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
        {sectors.map((sector, index) => {
          const Icon = sector.icon;
          return (
            <StaggerItem key={sector.id} className="h-full">
              <SpotlightCard className="group h-full p-0">
                <div data-sector-card className="flex h-full flex-col">
                  {/* Media: video del settore o placeholder blueprint */}
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-ink-raised">
                    {sector.video ? (
                      <>
                        <SectorMedia
                          video={sector.video}
                          poster={sector.poster}
                          alt={sector.title}
                        />
                        <div
                          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-zinc-950/80 to-transparent"
                          aria-hidden="true"
                        />
                      </>
                    ) : (
                      <>
                        <div
                          className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
                          aria-hidden="true"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon className="h-12 w-12 text-white/15 transition-colors duration-500 group-hover:text-brand/30" />
                        </div>
                      </>
                    )}
                    <span className="absolute left-3 top-3 z-[1] rounded-md bg-black/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-200 backdrop-blur-sm">
                      S0{index + 1}
                    </span>
                  </div>

                  {/* Testo */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand/20 bg-brand/10 text-brand">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-h3 font-semibold text-white">
                        {sector.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                      {sector.description}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
