"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { COLLECTIONS } from "../_data/products";

// =============================================================================
// THEME
// =============================================================================

const THEME = {
    colors: {
        bg: {
            primary: "#070709",
            secondary: "#0c0c10",
        },
        accent: {
            gold: "#d4a853",
            goldRgb: "212, 168, 83",
        },
        text: {
            primary: "#fafaf9",
            secondary: "#a8a29e",
            muted: "#78716c",
        },
        border: {
            subtle: "rgba(212,168,83,0.08)",
            default: "rgba(212,168,83,0.15)",
        },
    },
} as const;

// =============================================================================
// COLLECTIONS PAGE
// =============================================================================

export default function CollectionsPage() {
    return (
        <>
            {/* Navbar */}
            <header
                className="fixed inset-x-0 top-0 z-50"
                style={{
                    background: `${THEME.colors.bg.primary}f0`,
                    backdropFilter: "blur(20px)",
                    borderBottom: `1px solid ${THEME.colors.border.subtle}`,
                }}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <Link href="/demos/velvet-perfumes">
                        <span
                            className="text-[1.4rem] font-extralight tracking-[0.25em]"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            VELVET
                        </span>
                    </Link>
                    <nav className="hidden items-center gap-10 lg:flex">
                        <Link href="/demos/velvet-perfumes/collections" className="text-[0.7rem] uppercase tracking-[0.2em]" style={{ color: THEME.colors.accent.gold }}>
                            Collections
                        </Link>
                        <Link href="/demos/velvet-perfumes/shop" className="text-[0.7rem] uppercase tracking-[0.2em]" style={{ color: THEME.colors.text.secondary }}>
                            Shop
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="min-h-screen pt-24" style={{ background: THEME.colors.bg.primary }}>
                {/* Hero */}
                <section className="py-16 text-center" style={{ background: THEME.colors.bg.secondary }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span
                            className="mb-4 inline-block text-[0.65rem] uppercase tracking-[0.4em]"
                            style={{ color: THEME.colors.accent.gold }}
                        >
                            Explore
                        </span>
                        <h1
                            className="text-4xl font-extralight tracking-wide lg:text-5xl"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Our Collections
                        </h1>
                        <p className="mx-auto mt-4 max-w-xl text-sm" style={{ color: THEME.colors.text.secondary }}>
                            Each collection tells a unique story, crafted with the finest ingredients
                        </p>
                    </motion.div>
                </section>

                {/* Collections Grid */}
                <div className="mx-auto max-w-7xl px-6 py-16">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {COLLECTIONS.map((collection, i) => (
                            <motion.div
                                key={collection.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                            >
                                <Link href={`/demos/velvet-perfumes/fragrances?collection=${collection.slug}`}>
                                    <div className="group relative aspect-[4/5] overflow-hidden" style={{ background: THEME.colors.bg.secondary }}>
                                        {/* Image */}
                                        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                                            <Image
                                                src={collection.image}
                                                alt={collection.name}
                                                fill
                                                className="object-cover opacity-60"
                                            />
                                        </div>

                                        {/* Gradient Overlay */}
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                background: `linear-gradient(to top, ${THEME.colors.bg.primary} 0%, transparent 60%)`,
                                            }}
                                        />

                                        {/* Content */}
                                        <div className="absolute bottom-0 left-0 right-0 p-8">
                                            <span
                                                className="mb-2 block text-[0.6rem] uppercase tracking-[0.3em]"
                                                style={{ color: collection.accent }}
                                            >
                                                {collection.tagline}
                                            </span>
                                            <h2
                                                className="mb-2 text-2xl font-light"
                                                style={{ fontFamily: "'Playfair Display', serif" }}
                                            >
                                                {collection.name}
                                            </h2>
                                            <p className="mb-4 text-sm" style={{ color: THEME.colors.text.secondary }}>
                                                {collection.description}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs" style={{ color: THEME.colors.text.muted }}>
                                                    {collection.count} fragrances
                                                </span>
                                                <span style={{ color: THEME.colors.accent.gold }}>→</span>
                                            </div>
                                        </div>

                                        {/* Border on hover */}
                                        <div
                                            className="absolute inset-0 border opacity-0 transition-opacity group-hover:opacity-100"
                                            style={{ borderColor: THEME.colors.border.default }}
                                        />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
