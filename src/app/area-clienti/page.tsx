import type { Metadata } from "next";
import { SubpageShell } from "@/components/SubpageShell";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ClientAreaLoginForm } from "@/components/ClientAreaLoginForm";
import { contacts } from "@/content/site";

export const metadata: Metadata = {
  title: "Area Clienti",
  description:
    "Accesso riservato a macchine, manuali, dichiarazioni, documenti e assistenza INNO.TEC.",
  robots: { index: false, follow: false },
};

export default function AreaClientiPage() {
  return (
    <SubpageShell>
      <section className="relative overflow-hidden">
        <div
          className="glow-radial-top pointer-events-none absolute inset-x-0 top-0 h-80"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-md px-6 py-20 sm:py-28">
          <div className="text-center">
            <Eyebrow align="center">Area riservata</Eyebrow>
            <h1 className="mt-5 text-balance text-display-sm font-semibold tracking-[-0.02em] text-white">
              Area Clienti INNO.TEC
            </h1>
            <p className="mt-4 text-pretty text-lead text-zinc-400">
              Accesso riservato a macchine, manuali, documenti e assistenza.
            </p>
          </div>

          <div className="mt-10">
            <ClientAreaLoginForm />
          </div>

          <p className="mt-6 text-center text-sm text-zinc-500">
            Hai bisogno di accesso?{" "}
            <a
              href={`mailto:${contacts.email}`}
              className="font-medium text-brand transition-colors hover:text-brand-soft"
            >
              Contatta INNO.TEC
            </a>
          </p>
        </div>
      </section>
    </SubpageShell>
  );
}
