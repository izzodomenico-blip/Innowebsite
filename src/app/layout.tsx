import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { company, siteUrl, keywords } from "@/content/site";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { JsonLd } from "@/components/JsonLd";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteTitle = `${company.name} — Material handling e automazione industriale`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  keywords,
  applicationName: company.name,
  authors: [{ name: company.legalName }],
  creator: company.legalName,
  publisher: company.legalName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: siteUrl,
    siteName: company.legalName,
    title: siteTitle,
    description: company.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: company.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${archivo.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
      style={{ colorScheme: "dark" }}
    >
      <body className="relative min-h-full flex flex-col bg-zinc-950 text-foreground">
        <SmoothScroll />
        {children}
        {/* Grana cinematografica sottile su tutto il sito */}
        <div className="grain-overlay" aria-hidden="true" />
        <JsonLd />
      </body>
    </html>
  );
}
