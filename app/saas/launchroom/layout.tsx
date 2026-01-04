import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { SaaSProvider } from "./_lib/SaaSContext";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "LunchRoom | Client Portal SaaS",
    description: "A high-end cinematic client portal experience.",
};

export default function LaunchRoomLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`${outfit.variable} ${inter.variable} font-sans bg-[#0F172A] text-slate-50 antialiased selection:bg-[#45D4BF]/20 selection:text-[#45D4BF] min-h-screen`}>
            {children}
        </div>
    );
}
