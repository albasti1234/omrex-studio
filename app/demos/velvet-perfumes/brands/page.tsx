"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BRANDS, getAllBrands } from "../_data/brands";
import { getFragrancesByBrand } from "../_data/fragrances";

// =============================================================================
// THEME
// =============================================================================

const THEME = {
    colors: {
        bg: { primary: "#070709", secondary: "#0c0c10", tertiary: "#111118" },
        accent: { gold: "#d4a853", goldLight: "#e8c47a", goldRgb: "212, 168, 83" },
        text: { primary: "#fafaf9", secondary: "#a8a29e", muted: "#78716c" },
        border: { subtle: "rgba(212,168,83,0.08)", default: "rgba(212,168,83,0.15)", hover: "rgba(212,168,83,0.35)" },
    },
} as const;

// =============================================================================
// BRANDS PAGE
// =============================================================================

export default function BrandsPage() {
    const brands = getAllBrands();

    return (
        <>
            {/* Navbar */}
            <header className="fixed inset-x-0 top-0 z-50" style={{ background: `${THEME.colors.bg.primary}f0`, backdropFilter: "blur(20px)", borderBottom: `1px solid ${THEME.colors.border.subtle}` }}>
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <Link href="/demos/velvet-perfumes">
                        <span className="text-[1.4rem] font-extralight tracking-[0.25em]" style={{ fontFamily: "'Playfair Display', serif" }}>VELVET</span>
                    </Link>
                    <nav className="hidden items-center gap-10 lg:flex">
                        <Link href="/demos/velvet-perfumes/brands" className="text-[0.7rem] uppercase tracking-[0.2em]" style={{ color: THEME.colors.accent.gold }}>Brands</Link>
                        <Link href="/demos/velvet-perfumes/fragrances" className="text-[0.7rem] uppercase tracking-[0.2em]" style={{ color: THEME.colors.text.secondary }}>All Fragrances</Link>
                        <Link href="/demos/velvet-perfumes/shop" className="text-[0.7rem] uppercase tracking-[0.2em]" style={{ color: THEME.colors.text.secondary }}>Shop</Link>
                    </nav>
                </div>
            </header>

            <main className="min-h-screen pt-24" style={{ background: THEME.colors.bg.primary }}>
                {/* Hero */}
                <section className="relative py-20 text-center overflow-hidden" style={{ background: THEME.colors.bg.secondary }}>
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-10" style={{ background: `radial-gradient(circle, rgba(${THEME.colors.accent.goldRgb}, 0.3), transparent 70%)`, filter: "blur(60px)" }} />
                        <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full opacity-10" style={{ background: `radial-gradient(circle, rgba(${THEME.colors.accent.goldRgb}, 0.2), transparent 70%)`, filter: "blur(50px)" }} />
                    </div>

                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10">
                        <span className="mb-6 inline-flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.4em]" style={{ color: THEME.colors.accent.gold }}>
                            <span className="h-px w-12" style={{ background: THEME.colors.accent.gold }} />
                            Maisons de Parfum
                            <span className="h-px w-12" style={{ background: THEME.colors.accent.gold }} />
                        </span>
                        <h1 className="mb-6 text-4xl font-extralight tracking-wide lg:text-6xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Luxury Houses
                        </h1>
                        <p className="mx-auto max-w-xl text-sm leading-relaxed" style={{ color: THEME.colors.text.secondary }}>
                            Explore the world&apos;s most prestigious perfume houses. Each brand tells a unique story of heritage, craftsmanship, and olfactory excellence.
                        </p>
                    </motion.div>
                </section>

                {/* Brands Grid */}
                <div className="mx-auto max-w-7xl px-6 py-20">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {brands.map((brand, i) => {
                            const fragrances = getFragrancesByBrand(brand.id);
                            return (
                                <motion.div
                                    key={brand.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.15 }}
                                >
                                    <Link href={`/demos/velvet-perfumes/brands/${brand.slug}`}>
                                        <div
                                            className="group relative overflow-hidden border transition-all duration-500 hover:border-opacity-100"
                                            style={{ borderColor: THEME.colors.border.default, background: THEME.colors.bg.secondary }}
                                        >
                                            {/* Brand Header */}
                                            <div className="relative aspect-[16/9] overflow-hidden" style={{ background: brand.accent }}>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span
                                                        className="text-4xl font-light tracking-[0.15em] text-white/90"
                                                        style={{ fontFamily: "'Playfair Display', serif" }}
                                                    >
                                                        {brand.name}
                                                    </span>
                                                </div>
                                                {/* Hover Overlay */}
                                                <div className="absolute inset-0 bg-black/0 transition-all group-hover:bg-black/20" />
                                            </div>

                                            {/* Brand Info */}
                                            <div className="p-6">
                                                <div className="mb-4 flex items-center justify-between">
                                                    <div>
                                                        <h2 className="text-xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                                                            {brand.name}
                                                        </h2>
                                                        <p className="text-xs uppercase tracking-wider" style={{ color: THEME.colors.text.muted }}>
                                                            Est. {brand.founded} • {brand.country}
                                                        </p>
                                                    </div>
                                                    <span
                                                        className="flex h-10 w-10 items-center justify-center rounded-full border transition-all group-hover:border-opacity-100 group-hover:bg-white/5"
                                                        style={{ borderColor: THEME.colors.border.default }}
                                                    >
                                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: THEME.colors.accent.gold }}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </span>
                                                </div>

                                                <p className="mb-4 text-sm leading-relaxed" style={{ color: THEME.colors.text.secondary }}>
                                                    {brand.description}
                                                </p>

                                                {/* Fragrance Preview */}
                                                <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${THEME.colors.border.subtle}` }}>
                                                    <span className="text-xs uppercase tracking-wider" style={{ color: THEME.colors.text.muted }}>
                                                        {fragrances.length} Fragrances
                                                    </span>
                                                    <div className="flex -space-x-2">
                                                        {fragrances.slice(0, 4).map((f, j) => (
                                                            <div
                                                                key={f.id}
                                                                className="h-8 w-8 rounded-full border-2 flex items-center justify-center text-[0.5rem] font-medium"
                                                                style={{ borderColor: THEME.colors.bg.secondary, background: THEME.colors.bg.tertiary }}
                                                            >
                                                                {f.name.charAt(0)}
                                                            </div>
                                                        ))}
                                                        {fragrances.length > 4 && (
                                                            <div
                                                                className="h-8 w-8 rounded-full border-2 flex items-center justify-center text-[0.5rem]"
                                                                style={{ borderColor: THEME.colors.bg.secondary, background: THEME.colors.accent.gold, color: THEME.colors.bg.primary }}
                                                            >
                                                                +{fragrances.length - 4}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* CTA Section */}
                <section className="py-20" style={{ background: THEME.colors.bg.secondary }}>
                    <div className="mx-auto max-w-4xl px-6 text-center">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <h2 className="mb-4 text-2xl font-light lg:text-3xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Explore All Fragrances
                            </h2>
                            <p className="mb-8 text-sm" style={{ color: THEME.colors.text.secondary }}>
                                Browse our complete collection of {30} luxury fragrances
                            </p>
                            <Link
                                href="/demos/velvet-perfumes/fragrances"
                                className="inline-flex items-center gap-3 px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition-all hover:translate-y-[-2px]"
                                style={{ background: `linear-gradient(135deg, ${THEME.colors.accent.gold}, ${THEME.colors.accent.goldLight})`, color: THEME.colors.bg.primary }}
                            >
                                View All Fragrances
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>
        </>
    );
}
