import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Murumaster - aiatehnika rent ja niitmisteenus",
  description:
    "Murumaster pakub aiatehnika renti ja niitmisteenust Tallinnas ja Harjumaal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="et">
      <body>{children}</body>
    </html>
  );
}
