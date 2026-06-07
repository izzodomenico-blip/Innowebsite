import Image from "next/image";
import { TechnicalFrame } from "./TechnicalFrame";
import { VideoMedia } from "./VideoMedia";

interface RenderFrameProps {
  label?: string;
  meta?: string;
  className?: string;
  /** Render/foto reale (immagine). Es. "/renders/hero-conveyor.webp". */
  src?: string | null;
  /** Video reale (mp4/webm). Es. "/renders/structures.mp4". Ha priorità sull'immagine. */
  video?: string | null;
  /** Poster del video (immagine mostrata prima del play e in reduced-motion). */
  poster?: string | null;
  alt?: string;
  priority?: boolean;
  /** Fallback vettoriale mostrato finché non c'è un media reale. */
  children: React.ReactNode;
}

/**
 * Slot visivo "drop-in": mostra un video, altrimenti un'immagine, altrimenti
 * lo schema SVG (children). Attivazione da config `renders` in site.ts —
 * nessuna modifica ai componenti necessaria.
 */
export function RenderFrame({
  label,
  meta,
  className,
  src,
  video,
  poster,
  alt = "",
  priority = false,
  children,
}: RenderFrameProps) {
  return (
    <TechnicalFrame label={label} meta={meta} className={className}>
      {video ? (
        <VideoMedia src={video} poster={poster ?? undefined} />
      ) : src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={priority}
          className="object-contain"
        />
      ) : (
        children
      )}
    </TechnicalFrame>
  );
}
