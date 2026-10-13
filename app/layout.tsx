import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import MediaProvider from "../components/MediaProvider";
import SiteLayout from "../components/SiteLayout";
import { getSignedMediaMap } from "../lib/b2/sign";

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
    icon: "/media/icon",
    shortcut: "/media/icon",
    apple: "/media/icon"
  }
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const urls = await getSignedMediaMap();

  return (
    <html lang="fr">
      <body
        className={`${cormorant.variable} font-serif bg-offwhite text-primary antialiased`}
      >
        <MediaProvider urls={urls}>
          <SiteLayout>{children}</SiteLayout>
        </MediaProvider>
      </body>
    </html>
  );
}

