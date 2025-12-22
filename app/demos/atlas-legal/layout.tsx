import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./atlas-legal.css";
import { LanguageProvider } from "./_lib/i18n/LanguageContext";
import { ThemeProvider } from "./_lib/ThemeContext";
import LiveNotification from "./_components/LiveNotification";

// Premium Fonts: Playfair Display for headings, Inter for body
const playfair = Playfair_Display({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-playfair",
    weight: ["400", "500", "600", "700"],
});

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

// Default metadata (will be overridden by locale-specific metadata)
export const metadata: Metadata = {
    title: "Atlas Legal — Elite Representation, Exceptional Results",
    description:
        "A premier law firm delivering uncompromising legal excellence. Trusted by Fortune 500 companies and high-net-worth individuals for complex litigation and corporate matters.",
    keywords: [
        "law firm",
        "attorney",
        "legal services",
        "litigation",
        "corporate law",
        "trial lawyers",
        "personal injury",
        "legal representation",
    ],
    openGraph: {
        title: "Atlas Legal — Elite Representation, Exceptional Results",
        description:
            "A premier law firm delivering uncompromising legal excellence. Trusted by Fortune 500 companies and high-net-worth individuals.",
        type: "website",
        locale: "en_US",
        siteName: "Atlas Legal",
    },
    twitter: {
        card: "summary_large_image",
        title: "Atlas Legal — Elite Representation, Exceptional Results",
        description:
            "A premier law firm delivering uncompromising legal excellence.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function AtlasLegalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <LanguageProvider>
            <ThemeProvider>
                <div
                    className={`atlas-legal ${playfair.variable} ${inter.variable} font-sans antialiased bg-atlas-bg text-atlas-text transition-colors duration-300`}
                >
                    {/* Skip to content for accessibility */}
                    <a
                        href="#main-content"
                        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-atlas-accent focus:text-atlas-primary focus:outline-none"
                    >
                        Skip to main content
                    </a>

                    {/* Noise Texture Overlay for Premium Feel */}
                    <div
                        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.025] mix-blend-overlay al-pattern-noise"
                        aria-hidden="true"
                    />

                    {/* Gold Accent Line at Top */}
                    <div
                        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-atlas-accent to-transparent z-[60]"
                        aria-hidden="true"
                    />

                    {/* Live Notifications */}
                    <LiveNotification />

                    {/* Main Content */}
                    <main id="main-content">{children}</main>
                </div>
            </ThemeProvider>
        </LanguageProvider>
    );
}
