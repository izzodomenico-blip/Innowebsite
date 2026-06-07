import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { AnimatedButton } from "@/components/AnimatedButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { MotionHeadline } from "@/components/motion/MotionHeadline";
import { contacts } from "@/content/site";

const socials = [
  { label: "LinkedIn", href: contacts.social.linkedin },
  { label: "Instagram", href: contacts.social.instagram },
  { label: "Facebook", href: contacts.social.facebook },
];

export function ContactCta() {
  return (
    <Section id="contatti">
      <Reveal className="panel relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-16">
        <div
          className="glow-radial-top animate-glow-breathe pointer-events-none absolute inset-x-0 top-0 h-72"
          aria-hidden="true"
        />
        {/* Aurora di chiusura (drift lentissimo) */}
        <div
          className="cta-aurora pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.16),transparent_70%)] blur-2xl"
          aria-hidden="true"
        />

        <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Messaggio + CTA */}
          <div>
            <Eyebrow>Contatti</Eyebrow>
            <MotionHeadline
              as="h2"
              gradient
              text="Parliamo del tuo prossimo impianto."
              className="mt-5 text-balance text-display-sm font-semibold tracking-[-0.02em]"
            />
            <p className="mt-5 max-w-md text-pretty text-lead text-zinc-400">
              Raccontaci la tua esigenza di movimentazione o automazione: il
              nostro team tecnico ti risponde con una proposta su misura.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={`mailto:${contacts.email}`}>
                <AnimatedButton size="lg" glow className="gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Scrivici</span>
                </AnimatedButton>
              </a>
              <a href={contacts.phone.href}>
                <AnimatedButton variant="outline" size="lg" className="gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{contacts.phone.label}</span>
                </AnimatedButton>
              </a>
            </div>
          </div>

          {/* Recapiti reali */}
          <div className="rounded-2xl border border-line bg-ink/50 p-8">
            <dl className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="h-5 w-5 shrink-0 text-brand" />
                <div>
                  <dt className="font-mono text-eyebrow uppercase tracking-[0.18em] text-zinc-500">
                    Sede
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-zinc-300">
                    {contacts.address.street}
                    <br />
                    {contacts.address.city}, {contacts.address.country}
                  </dd>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="h-5 w-5 shrink-0 text-brand" />
                <div>
                  <dt className="font-mono text-eyebrow uppercase tracking-[0.18em] text-zinc-500">
                    Telefono
                  </dt>
                  <dd className="mt-1 text-sm text-zinc-300">
                    <a
                      href={contacts.phone.href}
                      className="transition-colors hover:text-white"
                    >
                      {contacts.phone.label}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="h-5 w-5 shrink-0 text-brand" />
                <div>
                  <dt className="font-mono text-eyebrow uppercase tracking-[0.18em] text-zinc-500">
                    Email
                  </dt>
                  <dd className="mt-1 text-sm text-zinc-300">
                    <a
                      href={`mailto:${contacts.email}`}
                      className="transition-colors hover:text-white"
                    >
                      {contacts.email}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  {social.label}
                  <ArrowUpRight className="h-3.5 w-3.5 text-zinc-600 transition-colors group-hover:text-brand" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
