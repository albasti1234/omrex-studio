"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const THEME = {
    colors: {
        bg: { primary: "#070709", secondary: "#0c0c10" },
        accent: { gold: "#d4a853", goldRgb: "212, 168, 83" },
        text: { primary: "#fafaf9", secondary: "#a8a29e", muted: "#78716c" },
        border: { subtle: "rgba(212,168,83,0.08)", default: "rgba(212,168,83,0.15)" },
    },
} as const;

const BOUTIQUES = [
    { city: "Paris", address: "24 Rue du Faubourg Saint-Honoré", country: "France", flagship: true },
    { city: "Dubai", address: "The Dubai Mall, Fashion Avenue", country: "UAE", flagship: true },
    { city: "New York", address: "680 Madison Avenue", country: "USA", flagship: false },
    { city: "London", address: "87 Mount Street, Mayfair", country: "UK", flagship: false },
    { city: "Tokyo", address: "Ginza Six, 6-10-1 Ginza", country: "Japan", flagship: false },
    { city: "Milan", address: "Via Montenapoleone 8", country: "Italy", flagship: false },
];

export default function BoutiquesPage() {
    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50" style={{ background: `${THEME.colors.bg.primary}f0`, backdropFilter: "blur(20px)", borderBottom: `1px solid ${THEME.colors.border.subtle}` }}>
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <Link href="/demos/velvet-perfumes">
                        <span className="text-[1.4rem] font-extralight tracking-[0.25em]" style={{ fontFamily: "'Playfair Display', serif" }}>VELVET</span>
                    </Link>
                    <nav className="hidden items-center gap-10 lg:flex">
                        <Link href="/demos/velvet-perfumes/collections" className="text-[0.7rem] uppercase tracking-[0.2em]" style={{ color: THEME.colors.text.secondary }}>Collections</Link>
                        <Link href="/demos/velvet-perfumes/shop" className="text-[0.7rem] uppercase tracking-[0.2em]" style={{ color: THEME.colors.text.secondary }}>Shop</Link>
                        <Link href="/demos/velvet-perfumes/boutiques" className="text-[0.7rem] uppercase tracking-[0.2em]" style={{ color: THEME.colors.accent.gold }}>Boutiques</Link>
                    </nav>
                </div>
            </header>

            <main className="min-h-screen pt-24" style={{ background: THEME.colors.bg.primary }}>
                <section className="py-16 text-center" style={{ background: THEME.colors.bg.secondary }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <span className="mb-4 inline-block text-[0.65rem] uppercase tracking-[0.4em]" style={{ color: THEME.colors.accent.gold }}>Visit Us</span>
                        <h1 className="text-4xl font-extralight tracking-wide lg:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>Our Boutiques</h1>
                        <p className="mx-auto mt-4 max-w-xl text-sm" style={{ color: THEME.colors.text.secondary }}>
                            Experience Velvet in person at one of our exclusive boutiques worldwide
                        </p>
                    </motion.div>
                </section>

                <div className="mx-auto max-w-5xl px-6 py-16">
                    <div className="grid gap-6 md:grid-cols-2">
                        {BOUTIQUES.map((boutique, i) => (
                            <motion.div
                                key={boutique.city}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="group border p-8 transition-all hover:border-opacity-100"
                                style={{ borderColor: THEME.colors.border.default, background: THEME.colors.bg.secondary }}
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="text-xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>{boutique.city}</h2>
                                        <p className="mt-1 text-xs uppercase tracking-wider" style={{ color: THEME.colors.text.muted }}>{boutique.country}</p>
                                    </div>
                                    {boutique.flagship && (
                                        <span className="text-[0.55rem] uppercase tracking-wider px-2 py-1" style={{ background: THEME.colors.accent.gold, color: THEME.colors.bg.primary }}>
                                            Flagship
                                        </span>
                                    )}
                                </div>
                                <p className="mt-4 text-sm" style={{ color: THEME.colors.text.secondary }}>{boutique.address}</p>
                                <button className="mt-6 text-xs uppercase tracking-wider transition-colors group-hover:text-white" style={{ color: THEME.colors.accent.gold }}>
                                    Get Directions →
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
