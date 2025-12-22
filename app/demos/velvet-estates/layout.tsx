import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { ThemeProvider } from "./_lib/ThemeContext";
import "./velvet-estates.css";

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "Velvet Estates | Luxury Real Estate",
        template: "%s | Velvet Estates",
    },
    description:
        "Manhattan's premier luxury real estate brokerage. Discover exceptional properties in the world's most coveted neighborhoods.",
    keywords: [
        "luxury real estate",
        "Manhattan properties",
        "New York City homes",
        "penthouses",
        "townhouses",
        "high-end real estate",
    ],
};

export default function VelvetEstatesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider>
            <div
                className={`velvet-estates ${playfair.variable} ${inter.variable} min-h-screen`}
            >
                {children}
            </div>
        </ThemeProvider>
    );
}
