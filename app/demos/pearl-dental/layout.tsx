import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./pearl-dental.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pearl Dental — Artistry meets Precision",
  description:
    "A high-end dental studio experience focused on cosmetic excellence, comfort, and advanced technology.",
  openGraph: {
    title: "Pearl Dental — Artistry meets Precision",
    description:
      "A high-end dental studio experience focused on cosmetic excellence, comfort, and advanced technology.",
    type: "website",
  },
};

export default function PearlDentalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`pearl-dental ${inter.variable} font-sans antialiased text-pd-text-main bg-pd-bg selection:bg-pd-accent/20 selection:text-pd-primary`}>
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url('/images/noise.png')" }}></div>
      {children}
    </div>
  );
}
