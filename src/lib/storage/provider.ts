import type { ISODateString } from "@/types/customer-area";

/**
 * Astrazione storage provider-agnostica (FASE G3).
 * Implementazione iniziale prevista su Supabase Storage; grazie a questa
 * interfaccia il passaggio futuro a S3/R2 non tocca la logica applicativa.
 * In DB si salva SEMPRE solo lo `storagePath` (non un URL del provider).
 *
 * NB: nessuna implementazione qui — solo il contratto. I documenti vivono in un
 * bucket PRIVATO e si accedono esclusivamente via signed URL a breve scadenza
 * emessi lato server dopo l'autorizzazione.
 */

export interface SignedUrl {
  url: string;
  expiresAt: ISODateString;
}

export interface UploadInput {
  /** Path nel bucket privato, es. `{customerId}/{machineId}/{documentId}/r03/manuale.pdf`. */
  path: string;
  body: ArrayBuffer | Blob;
  contentType: string;
}

export interface StorageProvider {
  /** Emette un signed URL a breve scadenza per il download/visualizzazione. */
  createSignedUrl(path: string, expiresInSeconds: number): Promise<SignedUrl>;
  /** Carica un file (uso admin). */
  upload(input: UploadInput): Promise<{ path: string }>;
  /** Rimuove un file (vincolato dalle regole di retention). */
  remove(path: string): Promise<void>;
}
