import type { Metadata } from "next";
import { Suspense } from "react";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "./globals.css";

const siteUrl = "https://www.murumaster.ee";
const ogImageUrl = `${siteUrl}/og-image.jpg`;
const title = "Murumaster – Aiatehnika rent Tallinnas ja Harjumaal";
const description =
  "Murutraktorite, võsalõikurite ja muu aiatehnika rent. Transport ja töö tegijaga teenus Tallinnas ja Harjumaal.";
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Murumaster",
  url: siteUrl,
  logo: `${siteUrl}/images/logo/murumaster-logo-transparent.png`,
  image: ogImageUrl,
  description,
  email: "muru.master.ee@gmail.com",
  areaServed: [
    "Tallinn",
    "Viimsi",
    "Pirita",
    "Rae",
    "Harku",
    "Saue",
    "Harjumaa",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Aiatehnika rent",
        areaServed: "Tallinn ja Harjumaa",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Niitmisteenus",
        areaServed: "Tallinn ja Harjumaa",
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Murumaster",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Murumaster aiatehnika rent Tallinnas ja Harjumaal",
      },
    ],
    locale: "et_EE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="et">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      </body>
    </html>
  );
}
