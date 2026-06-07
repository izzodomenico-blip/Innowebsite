import { NextResponse, type NextRequest } from "next/server";

/**
 * Preview noindex.
 *
 * Aggiunge `X-Robots-Tag: noindex, nofollow` SOLO quando il sito è servito da un
 * host Netlify (`*.netlify.app`): copre il sottodominio di default e i deploy
 * preview / branch deploy. Il **dominio ufficiale** (che NON finisce in
 * `.netlify.app`) non viene toccato e resta indicizzabile.
 *
 * Decisione per host (non per build context) così la regola vale anche quando il
 * deploy "production" di Netlify è ancora solo sul sottodominio. Nessuna
 * dipendenza aggiunta, nessun impatto su design/contenuti/siteUrl.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const response = NextResponse.next();

  if (host.endsWith(".netlify.app")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  // Tutte le route tranne gli asset statici interni di Next.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
