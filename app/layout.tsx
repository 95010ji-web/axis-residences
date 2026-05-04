import type { Metadata } from "next";
import { Archivo_Black, JetBrains_Mono, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const archivo = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Axis Residences — Premium Real Estate",
  description:
    "Discover luxury homes and premium properties. Axis Residences delivers exceptional real estate experiences with curated listings, expert guidance, and unmatched market knowledge.",
  keywords: "real estate, luxury homes, property listings, realtor, houses for sale, mortgage calculator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrains.variable} ${spaceMono.variable}`}>
      <body className="antialiased">
        <div className="noise-overlay" aria-hidden="true" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
