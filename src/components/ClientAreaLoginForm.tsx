"use client";

import { Lock } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-line bg-ink/60 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-brand/40 focus:ring-2 focus:ring-brand/20";
const labelClass =
  "mb-2 block font-mono text-eyebrow uppercase tracking-[0.18em] text-zinc-500";

/**
 * Form di accesso MOCKUP: nessuna autenticazione, nessun backend, nessuno storage.
 * Il submit è bloccato (preventDefault) e il pulsante è disabilitato → le
 * credenziali non vengono mai raccolte, salvate o inviate.
 */
export function ClientAreaLoginForm() {
  return (
    <form
      autoComplete="off"
      onSubmit={(e) => e.preventDefault()}
      className="panel rounded-2xl p-6 sm:p-8"
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="ca-id" className={labelClass}>
            Email o codice cliente
          </label>
          <input
            id="ca-id"
            name="ca-id"
            type="text"
            autoComplete="off"
            placeholder="nome@azienda.it"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="ca-secret" className={labelClass}>
            Password o codice di accesso
          </label>
          <input
            id="ca-secret"
            name="ca-secret"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled
          aria-disabled="true"
          className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-line bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-zinc-400"
        >
          <Lock className="h-4 w-4" />
          Accesso in fase di attivazione
        </button>

        <p className="text-center text-xs leading-relaxed text-zinc-500">
          Anteprima dell&apos;Area Clienti: le credenziali non vengono raccolte,
          salvate né inviate.
        </p>
      </div>
    </form>
  );
}
