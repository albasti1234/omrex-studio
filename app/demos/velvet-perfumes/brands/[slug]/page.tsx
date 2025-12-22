"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBrandBySlug } from "../../_data/brands";
import { getFragrancesByBrand, Fragrance } from "../../_data/fragrances";

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
// DNA BAR COMPONENT
// =============================================================================

function DNABar({ name, percentage, delay = 0 }: { name: string; percentage: number; delay?: number }) {
    return (
        <div className="flex items-center gap-3">
            <span className="w-20 text-xs truncate" style={{ color: THEME.colors.text.muted }}>{name}</span>
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: THEME.colors.bg.tertiary }}>
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${THEME.colors.accent.gold}, ${THEME.colors.accent.goldLight})` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay }}
                />
            </div>
            <span className="w-8 text-xs text-right" style={{ color: THEME.colors.accent.gold }}>{percentage}%</span>
        </div>
    );
}

// =============================================================================
// FRAGRANCE CARD
// =============================================================================

function FragranceCard({ fragrance, index }: { fragrance: Fragrance; index: number }) {
    const topIngredients = fragrance.ingredients.filter(i => i.category === "top").slice(0, 2);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link href={`/demos/velvet-perfumes/fragrances/${fragrance.slug}`}>
                <div
                    className="group relative overflow-hidden border transition-all duration-500"
                    style={{ borderColor: THEME.colors.border.subtle, background: THEME.colors.bg.secondary }}
                >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden" style={{ background: THEME.colors.bg.tertiary }}>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-6xl opacity-20" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {fragrance.name.charAt(0)}
                            </span>
                        </div>

                        {/* Badges */}
                        <div className="absolute left-3 top-3 flex flex-col gap-2">
                            {fragrance.isNew && (
                                <span className="px-2 py-1 text-[0.55rem] font-semibold uppercase tracking-wider" style={{ background: THEME.colors.accent.gold, color: THEME.colors.bg.primary }}>
                                    New
                                </span>
                            )}
                            {fragrance.isBestseller && (
                                <span className="px-2 py-1 text-[0.55rem] font-semibold uppercase tracking-wider" style={{ background: "#8b5cf6", color: "white" }}>
                                    Bestseller
                                </span>
                            )}
                        </div>

                        {/* Gender Badge */}
                        <div className="absolute right-3 top-3">
                            <span className="text-[0.6rem] uppercase tracking-wider px-2 py-1 border" style={{ borderColor: THEME.colors.border.default, color: THEME.colors.text.muted }}>
                                {fragrance.gender === "men" ? "♂" : fragrance.gender === "women" ? "♀" : "⚤"}
                            </span>
                        </div>

                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Info */}
                    <div className="p-5">
                        <h3 className="mb-1 text-base font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {fragrance.name}
                        </h3>
                        <p className="mb-3 text-xs" style={{ color: THEME.colors.text.muted }}>
                            {fragrance.year} • by {fragrance.perfumer.split(" ").slice(-1)[0]}
                        </p>

                        {/* Mini DNA Preview */}
                        <div className="space-y-2 mb-4">
                            {topIngredients.map((ing, i) => (
                                <DNABar key={ing.name} name={ing.name} percentage={ing.percentage} delay={i * 0.1} />
                            ))}
                        </div>

                        {/* Seasons */}
                        <div className="flex items-center gap-1 mb-4">
                            {(["spring", "summer", "fall", "winter"] as const).map((season) => (
                                <span
                                    key={season}
                                    className="h-2 w-2 rounded-full"
                                    style={{
                                        background: fragrance.seasons.includes(season) ? THEME.colors.accent.gold : THEME.colors.bg.tertiary,
                                        opacity: fragrance.seasons.includes(season) ? 1 : 0.3,
                                    }}
                                    title={season}
                                />
                            ))}
                            <span className="ml-2 text-[0.6rem] uppercase tracking-wider" style={{ color: THEME.colors.text.muted }}>
                                {fragrance.temperature}
                            </span>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${THEME.colors.border.subtle}` }}>
                            <div className="flex items-center gap-1">
                                <span className="text-sm" style={{ color: THEME.colors.accent.gold }}>★</span>
                                <span className="text-xs" style={{ color: THEME.colors.text.secondary }}>{fragrance.rating}</span>
                            </div>
                            <span className="text-lg font-light" style={{ color: THEME.colors.accent.gold }}>${fragrance.price}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

// =============================================================================
// BRAND PAGE
// =============================================================================

export default function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const brand = getBrandBySlug(slug);

    if (!brand) {
        notFound();
    }

    const fragrances = getFragrancesByBrand(brand.id);
    const menCount = fragrances.filter(f => f.gender === "men").length;
    const womenCount = fragrances.filter(f => f.gender === "women").length;
    const unisexCount = fragrances.filter(f => f.gender === "unisex").length;

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
                    </nav>
                </div>
            </header>

            <main className="min-h-screen pt-24" style={{ background: THEME.colors.bg.primary }}>
                {/* Brand Hero */}
                <section className="relative py-20 overflow-hidden" style={{ background: brand.accent }}>
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <span className="mb-4 inline-block text-[0.65rem] uppercase tracking-[0.4em] text-white/60">
                                Est. {brand.founded} • {brand.country}
                            </span>
                            <h1 className="mb-6 text-5xl font-extralight tracking-[0.1em] text-white lg:text-7xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {brand.name}
                            </h1>
                            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/80">
                                {brand.description}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Stats Bar */}
                <div className="py-8" style={{ background: THEME.colors.bg.secondary }}>
                    <div className="mx-auto max-w-4xl px-6">
                        <div className="flex items-center justify-center gap-12 text-center">
                            <div>
                                <span className="block text-2xl font-light" style={{ color: THEME.colors.accent.gold, fontFamily: "'Playfair Display', serif" }}>
                                    {fragrances.length}
                                </span>
                                <span className="text-xs uppercase tracking-wider" style={{ color: THEME.colors.text.muted }}>Fragrances</span>
                            </div>
                            <div className="h-8 w-px" style={{ background: THEME.colors.border.subtle }} />
                            <div>
                                <span className="block text-2xl font-light" style={{ color: THEME.colors.accent.gold, fontFamily: "'Playfair Display', serif" }}>
                                    {menCount}
                                </span>
                                <span className="text-xs uppercase tracking-wider" style={{ color: THEME.colors.text.muted }}>For Men</span>
                            </div>
                            <div className="h-8 w-px" style={{ background: THEME.colors.border.subtle }} />
                            <div>
                                <span className="block text-2xl font-light" style={{ color: THEME.colors.accent.gold, fontFamily: "'Playfair Display', serif" }}>
                                    {womenCount}
                                </span>
                                <span className="text-xs uppercase tracking-wider" style={{ color: THEME.colors.text.muted }}>For Women</span>
                            </div>
                            <div className="h-8 w-px" style={{ background: THEME.colors.border.subtle }} />
                            <div>
                                <span className="block text-2xl font-light" style={{ color: THEME.colors.accent.gold, fontFamily: "'Playfair Display', serif" }}>
                                    {unisexCount}
                                </span>
                                <span className="text-xs uppercase tracking-wider" style={{ color: THEME.colors.text.muted }}>Unisex</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fragrances Grid */}
                <div className="mx-auto max-w-7xl px-6 py-16">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {fragrances.map((fragrance, i) => (
                            <FragranceCard key={fragrance.id} fragrance={fragrance} index={i} />
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
