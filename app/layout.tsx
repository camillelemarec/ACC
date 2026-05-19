import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import SiteLayout from "../components/SiteLayout";

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"]
});

const sans = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"]
});

export const metadata: Metadata = {
  title: "SARL Alain Coutant | Couverture & Patrimoine",
  description:
    "Entreprise familiale de couverture et patrimoine depuis 1886. L'homme et la matière, au cœur de chaque toit.",
  icons: {
    icon: "/images/path12.svg",
    shortcut: "/images/path12.svg",
    apple: "/images/path12.svg"
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
        className={`${serif.variable} ${sans.variable} bg-offwhite text-primary antialiased`}
      >
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}

