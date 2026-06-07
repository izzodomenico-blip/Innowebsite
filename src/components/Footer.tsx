import Link from "next/link";
import Image from "next/image";
import { company, contacts, navigation } from "@/content/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t border-white/5 bg-zinc-950 py-16 text-zinc-400">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo-innotec.png"
                alt="INNO.TEC"
                width={769}
                height={180}
                className="h-8 w-auto"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
              Sistemi di material handling e automazione industriale: progettati,
              costruiti e installati su misura.
            </p>
          </div>

          {/* Navigazione */}
          <div>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              Esplora
            </h2>
            <ul className="space-y-2.5 text-sm">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="#contatti" className="transition-colors hover:text-white">
                  Contatti
                </Link>
              </li>
              <li>
                <Link
                  href="/area-clienti"
                  className="transition-colors hover:text-white"
                >
                  Area Clienti
                </Link>
              </li>
              <li>
                <Link
                  href="/documentazione-digitale"
                  className="transition-colors hover:text-white"
                >
                  Documentazione digitale
                </Link>
              </li>
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              Contatti
            </h2>
            <ul className="space-y-3 text-sm">
              <li className="leading-relaxed text-zinc-500">
                {contacts.address.street}
                <br />
                {contacts.address.city}
                <br />
                {contacts.address.country}
              </li>
              <li>
                <a
                  href={contacts.phone.href}
                  className="transition-colors hover:text-white"
                >
                  {contacts.phone.label}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contacts.email}`}
                  className="transition-colors hover:text-white"
                >
                  {contacts.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Società */}
          <div>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              Società
            </h2>
            <p className="text-sm leading-relaxed text-zinc-500">
              {company.legalName}
              <br />
              Sede: {contacts.address.city}
            </p>
            {/* TODO: P.IVA, C.F., REA e capitale sociale da fornire dal cliente. */}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/5 pt-8 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {company.legalName}. Tutti i diritti riservati.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="transition-colors hover:text-zinc-300">
              Privacy Policy
            </Link>
            <Link href="/cookie" className="transition-colors hover:text-zinc-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
