import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SiteLayout from "../components/SiteLayout";
import { asset } from "../lib/asset";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: "SARL Alain Coutant | Couverture & Patrimoine",
  description:
    "Entreprise familiale de couverture et patrimoine depuis 1886. L'homme et la matière, au cœur de chaque toit.",
  icons: {
    icon: asset("/images/path12.svg"),
    shortcut: asset("/images/path12.svg"),
    apple: asset("/images/path12.svg")
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${cormorant.variable} font-serif bg-offwhite text-primary antialiased`}
      >
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}

