import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { SuppressHydrationWarning } from "./components/SuppressHydrationWarning";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "OMREX.STUDIO | Cinematic Web Surfaces",
  description: "One-person studio crafting cinematic, premium web experiences for SaaS, startups, and real businesses. Not templates — scenes.",
  keywords: ["web design", "cinematic websites", "SaaS design", "premium web development", "OMREX"],
  authors: [{ name: "OMREX.STUDIO" }],
  openGraph: {
    title: "OMREX.STUDIO | Cinematic Web Surfaces",
    description: "One-person studio crafting cinematic, premium web experiences.",
    url: "https://omrex.studio",
    siteName: "OMREX.STUDIO",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OMREX.STUDIO | Cinematic Web Surfaces",
    description: "One-person studio crafting cinematic, premium web experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="bg-[#050507] text-[#f8fafc] antialiased">
        <SuppressHydrationWarning />
        {/* Film grain overlay */}
        <div className="grain-overlay" aria-hidden="true" />

        {/* Scanlines effect */}
        <div className="scanlines" aria-hidden="true" />

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        {children}

        {/* Footer */}
        <Footer />

        {/* Vercel Speed Insights */}
        <SpeedInsights />
      </body>
    </html>
  );
}