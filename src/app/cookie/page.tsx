import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/LegalPlaceholder";

export const metadata: Metadata = {
  title: "Cookie Policy",
  robots: { index: false, follow: false },
};

export default function CookiePage() {
  return (
    <LegalPlaceholder
      title="Cookie Policy"
      description="L'informativa sull'uso dei cookie e delle tecnologie di tracciamento sarà pubblicata qui."
    />
  );
}
