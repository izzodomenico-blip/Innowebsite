import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { contacts } from "@/content/site";

interface LegalPlaceholderProps {
  title: string;
  description: string;
}

/**
 * Pagina legale segnaposto: struttura pulita e nota onesta "da completare".
 * Nessun testo legale inventato. Le pagine sono noindex (vedi metadata).
 */
export function LegalPlaceholder({ title, description }: LegalPlaceholderProps) {
  return (
    <main className="flex min-h-screen flex-col bg-zinc-950 text-white">
      <header className="border-b border-line">
        <div className="mx-auto flex h-16 max-w-3xl items-center px-6">
          <Link
            href="/"
            className="inline-flex items-center transition-opacity hover:opacity-90"
          >
            <Image
              src="/logo-innotec.png"
              alt="INNO.TEC"
              width={769}
              height={180}
              className="h-10 w-auto"
            />
          </Link>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-24">
        <Eyebrow>Informativa</Eyebrow>
        <h1 className="mt-5 text-balance text-h2 font-semibold tracking-[-0.02em] text-white">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-lead text-zinc-400">
          {description}
        </p>
        <div className="mt-6 rounded-xl border border-line bg-white/[0.02] p-5">
          <p className="text-sm leading-relaxed text-zinc-400">
            Documento in fase di redazione: sarà completato con il consulente
            privacy / legale dell&apos;azienda. Per richieste relative ai dati
            personali scrivi a{" "}
            <a
              href={`mailto:${contacts.email}`}
              className="text-brand transition-colors hover:text-brand-soft"
            >
              {contacts.email}
            </a>
            .
          </p>
        </div>

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Torna alla home
        </Link>
      </div>
    </main>
  );
}
