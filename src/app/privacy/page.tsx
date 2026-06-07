import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/LegalPlaceholder";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <LegalPlaceholder
      title="Privacy Policy"
      description="L'informativa sul trattamento dei dati personali ai sensi del Regolamento (UE) 2016/679 (GDPR) sarà pubblicata qui."
    />
  );
}
