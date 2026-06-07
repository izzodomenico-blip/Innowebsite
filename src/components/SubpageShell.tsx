import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { company, contacts } from "@/content/site";

/** Layout per le sottopagine: header con logo + footer minimale (no nav ad ancore). */
export function SubpageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-white">
      <header className="sticky top-0 z-50 border-b border-line bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center transition-opacity hover:opacity-90"
          >
            <Image
              src="/logo-innotec.png"
              alt="INNO.TEC"
              width={769}
              height={180}
              priority
              className="h-10 w-auto"
            />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna al sito
          </Link>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-line py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} {company.legalName}. Tutti i diritti
            riservati.
          </p>
          <div className="flex gap-5">
            <a
              href={`mailto:${contacts.email}`}
              className="transition-colors hover:text-zinc-300"
            >
              {contacts.email}
            </a>
            <Link href="/privacy" className="transition-colors hover:text-zinc-300">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
