import { company, contacts, siteUrl } from "@/content/site";

/**
 * Dati strutturati schema.org (Organization).
 * SOLO dati reali e pubblici: nessun P.IVA/REA/capitale inventato.
 * Per un upgrade a LocalBusiness servono orari di apertura e geo-coordinate.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    alternateName: company.name,
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    email: contacts.email,
    telephone: contacts.phone.href.replace("tel:", ""),
    description: company.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: contacts.address.street,
      addressLocality: "Marcianise",
      addressRegion: "CE",
      postalCode: "81025",
      addressCountry: "IT",
    },
    areaServed: "IT",
    sameAs: [
      contacts.social.linkedin,
      contacts.social.instagram,
      contacts.social.facebook,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
