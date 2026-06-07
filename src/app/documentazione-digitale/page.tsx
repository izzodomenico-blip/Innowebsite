import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  KeyRound,
  QrCode,
  Download,
  History,
  Languages,
  Printer,
  Lock,
  FolderOpen,
} from "lucide-react";
import { SubpageShell } from "@/components/SubpageShell";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AnimatedButton } from "@/components/AnimatedButton";
import { docCategories } from "@/content/site";

export const metadata: Metadata = {
  title: "Documentazione digitale",
  description:
    "La documentazione tecnica INNO.TEC — manuali, dichiarazioni CE/UE, schemi, layout e ricambi — organizzata per macchina e accessibile dall'Area Clienti, con QR code dedicato per ogni impianto.",
  alternates: { canonical: "/documentazione-digitale" },
};

const features = [
  {
    icon: Download,
    title: "Download, stampa e salvataggio",
    text: "Scarica, stampa o salva i documenti quando ti servono.",
  },
  {
    icon: History,
    title: "Versioni e revisioni",
    text: "Sempre l'ultima versione, con lo storico delle revisioni.",
  },
  {
    icon: Languages,
    title: "Multilingua",
    text: "Documenti disponibili nelle lingue previste (es. IT / EN).",
  },
  {
    icon: Printer,
    title: "Copia cartacea su richiesta",
    text: "Nei casi previsti è possibile richiederne una copia cartacea.",
  },
  {
    icon: FolderOpen,
    title: "Organizzati per impianto",
    text: "Documenti raggruppati per macchina e impianto.",
  },
  {
    icon: Lock,
    title: "Accesso autorizzato",
    text: "I documenti sensibili sono accessibili solo agli utenti autorizzati.",
  },
];

export default function DocumentazioneDigitalePage() {
  return (
    <SubpageShell>
      {/* Intro */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div
          className="glow-radial-top pointer-events-none absolute inset-x-0 top-0 h-72"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-6 py-20 sm:py-24 lg:px-8">
          <Eyebrow>Documentazione digitale</Eyebrow>
          <h1 className="mt-5 text-balance text-display-sm font-semibold tracking-[-0.02em] text-white">
            La documentazione della tua macchina, sempre aggiornata.
          </h1>
          <p className="mt-5 text-pretty text-lead text-zinc-400">
            La documentazione tecnica INNO.TEC sarà accessibile dall&apos;Area
            Clienti, organizzata per macchina e impianto: manuali, dichiarazioni
            di conformità, schemi, layout e ricambi, sempre nella versione più
            recente.
          </p>
          <div className="mt-8">
            <Link href="/area-clienti">
              <AnimatedButton size="lg" glow className="gap-2">
                <KeyRound className="h-4 w-4" />
                <span>Accedi all&apos;Area Clienti</span>
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Categorie documenti */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        <h2 className="text-h2 font-semibold tracking-[-0.02em] text-white">
          Cosa trovi nella documentazione
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {docCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="rounded-2xl border border-line bg-white/[0.02] p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand/20 bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {cat.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {cat.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* QR code macchina */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="mx-auto flex max-w-3xl flex-col items-start gap-5 px-6 py-16 sm:py-20 lg:px-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-brand">
            <QrCode className="h-6 w-6" />
          </div>
          <h2 className="text-h2 font-semibold tracking-[-0.02em] text-white">
            QR code macchina
          </h2>
          <p className="text-pretty text-lead text-zinc-400">
            L&apos;obiettivo è che ogni macchina possa avere un QR code dedicato:
            inquadrandolo si raggiunge rapidamente la scheda dell&apos;impianto e
            la relativa documentazione nell&apos;Area Clienti. Una funzione che
            prevediamo di introdurre progressivamente.
          </p>
        </div>
      </section>

      {/* Funzionalità */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        <h2 className="text-h2 font-semibold tracking-[-0.02em] text-white">
          Come funziona
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="flex gap-4 rounded-2xl border border-line bg-white/[0.02] p-6"
              >
                <Icon className="h-5 w-5 shrink-0 text-brand" />
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                    {f.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link href="/area-clienti">
            <AnimatedButton size="lg" glow className="gap-2">
              <KeyRound className="h-4 w-4" />
              <span>Accedi all&apos;Area Clienti</span>
            </AnimatedButton>
          </Link>
          <Link href="/">
            <AnimatedButton variant="outline" size="lg" className="gap-2">
              <span>Torna al sito</span>
              <ArrowRight className="h-4 w-4" />
            </AnimatedButton>
          </Link>
        </div>
      </section>
    </SubpageShell>
  );
}
