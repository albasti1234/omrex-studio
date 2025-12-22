"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FRAGRANCES, Fragrance } from "../_data/fragrances";
import { getAllBrands } from "../_data/brands";

// =============================================================================
// THEME
// =============================================================================

const THEME = {
    colors: {
        bg: { primary: "#070709", secondary: "#0c0c10", tertiary: "#111118" },
        accent: {
            gold: "#d4a853",
            goldLight: "#e8c47a",
            goldRgb: "212, 168, 83",
            purple: "#a855f7",
            pink: "#ec4899",
        },
        text: { primary: "#fafaf9", secondary: "#a8a29e", muted: "#78716c" },
        border: { subtle: "rgba(212,168,83,0.08)", default: "rgba(212,168,83,0.15)" },
    },
} as const;

const CATEGORY_COLORS = {
    top: { main: "#a855f7", light: "rgba(168, 85, 247, 0.2)" },
    heart: { main: "#ec4899", light: "rgba(236, 72, 153, 0.2)" },
    base: { main: "#d4a853", light: "rgba(212, 168, 83, 0.2)" },
};

// =============================================================================
// DNA BAR
// =============================================================================

function DNABar({ name, percentage, category }: { name: string; percentage: number; category: "top" | "heart" | "base" }) {
    const color = CATEGORY_COLORS[category];

    return (
        <div className="flex items-center gap-2 mb-2">
            <span className="w-24 text-xs truncate" style={{ color: color.main }}>{name}</span>
            <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: color.light }}>
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: color.main }}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8 }}
                />
            </div>
            <span className="w-10 text-xs text-right" style={{ color: color.main }}>{percentage}%</span>
        </div>
    );
}

// =============================================================================
// COMPARE PAGE
// =============================================================================

export default function ComparePage() {
    const [compareIds, setCompareIds] = useState<string[]>([]);

    // Get compare list from URL or localStorage
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const ids = params.get("ids")?.split(",").filter(Boolean) || [];
        if (ids.length > 0) {
            setCompareIds(ids);
        }
    }, []);

    const fragrances = compareIds.map(id => FRAGRANCES.find(f => f.id === id)).filter(Boolean) as Fragrance[];

    const removeFromCompare = (id: string) => {
        setCompareIds(prev => prev.filter(x => x !== id));
    };

    return (
        <>
            {/* Navbar */}
            <header className="fixed inset-x-0 top-0 z-50" style={{ background: `${THEME.colors.bg.primary}f0`, backdropFilter: "blur(20px)", borderBottom: `1px solid ${THEME.colors.border.subtle}` }}>
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <Link href="/demos/velvet-perfumes">
                        <span className="text-[1.4rem] font-extralight tracking-[0.25em]" style={{ fontFamily: "'Playfair Display', serif" }}>VELVET</span>
                    </Link>
                    <Link href="/demos/velvet-perfumes/fragrances" className="text-xs uppercase tracking-wider" style={{ color: THEME.colors.accent.gold }}>
                        ← Back to Fragrances
                    </Link>
                </div>
            </header>

            <main className="min-h-screen pt-24" style={{ background: THEME.colors.bg.primary }}>
                {/* Hero */}
                <section className="py-12 text-center" style={{ background: THEME.colors.bg.secondary }}>
                    <h1 className="text-3xl font-extralight lg:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Compare Fragrances
                    </h1>
                    <p className="mt-2 text-sm" style={{ color: THEME.colors.text.muted }}>
                        Side by side comparison of {fragrances.length} fragrances
                    </p>
                </section>

                {fragrances.length === 0 ? (
                    <div className="py-20 text-center">
                        <p style={{ color: THEME.colors.text.muted }}>No fragrances selected for comparison</p>
                        <Link href="/demos/velvet-perfumes/fragrances" className="mt-4 inline-block text-sm underline" style={{ color: THEME.colors.accent.gold }}>
                            Browse Fragrances
                        </Link>
                    </div>
                ) : (
                    <div className="mx-auto max-w-7xl px-6 py-8">
                        {/* Comparison Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px]">
                                <thead>
                                    <tr>
                                        <th className="p-4 text-left text-xs uppercase tracking-wider" style={{ color: THEME.colors.text.muted, width: "150px" }}>
                                            Attribute
                                        </th>
                                        {fragrances.map(f => {
                                            const brand = getAllBrands().find(b => b.id === f.brandId);
                                            return (
                                                <th key={f.id} className="p-4 text-left" style={{ minWidth: "250px" }}>
                                                    <div className="relative">
                                                        <button
                                                            onClick={() => removeFromCompare(f.id)}
                                                            className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center rounded-full text-xs"
                                                            style={{ background: THEME.colors.bg.tertiary, color: THEME.colors.text.muted }}
                                                        >
                                                            ×
                                                        </button>
                                                        <span className="text-[0.6rem] uppercase tracking-wider block mb-1" style={{ color: THEME.colors.accent.gold }}>
                                                            {brand?.name}
                                                        </span>
                                                        <Link href={`/demos/velvet-perfumes/fragrances/${f.slug}`} className="text-lg font-light hover:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                                                            {f.name}
                                                        </Link>
                                                    </div>
                                                </th>
                                            );
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Price */}
                                    <tr style={{ borderTop: `1px solid ${THEME.colors.border.subtle}` }}>
                                        <td className="p-4 text-xs uppercase" style={{ color: THEME.colors.text.muted }}>Price</td>
                                        {fragrances.map(f => (
                                            <td key={f.id} className="p-4 text-lg font-light" style={{ color: THEME.colors.accent.gold }}>
                                                ${f.price}
                                            </td>
                                        ))}
                                    </tr>

                                    {/* Year */}
                                    <tr style={{ borderTop: `1px solid ${THEME.colors.border.subtle}` }}>
                                        <td className="p-4 text-xs uppercase" style={{ color: THEME.colors.text.muted }}>Year</td>
                                        {fragrances.map(f => (
                                            <td key={f.id} className="p-4">{f.year}</td>
                                        ))}
                                    </tr>

                                    {/* Gender */}
                                    <tr style={{ borderTop: `1px solid ${THEME.colors.border.subtle}` }}>
                                        <td className="p-4 text-xs uppercase" style={{ color: THEME.colors.text.muted }}>Gender</td>
                                        {fragrances.map(f => (
                                            <td key={f.id} className="p-4 capitalize">
                                                {f.gender === "men" ? "♂ Men" : f.gender === "women" ? "♀ Women" : "⚤ Unisex"}
                                            </td>
                                        ))}
                                    </tr>

                                    {/* Rating */}
                                    <tr style={{ borderTop: `1px solid ${THEME.colors.border.subtle}` }}>
                                        <td className="p-4 text-xs uppercase" style={{ color: THEME.colors.text.muted }}>Rating</td>
                                        {fragrances.map(f => (
                                            <td key={f.id} className="p-4">
                                                <span style={{ color: THEME.colors.accent.gold }}>★</span> {f.rating} ({f.reviews})
                                            </td>
                                        ))}
                                    </tr>

                                    {/* Longevity */}
                                    <tr style={{ borderTop: `1px solid ${THEME.colors.border.subtle}` }}>
                                        <td className="p-4 text-xs uppercase" style={{ color: THEME.colors.text.muted }}>Longevity</td>
                                        {fragrances.map(f => (
                                            <td key={f.id} className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 h-2 rounded-full max-w-[100px]" style={{ background: THEME.colors.bg.tertiary }}>
                                                        <div className="h-full rounded-full" style={{ width: `${f.longevity * 10}%`, background: THEME.colors.accent.gold }} />
                                                    </div>
                                                    <span>{f.longevity}h</span>
                                                </div>
                                            </td>
                                        ))}
                                    </tr>

                                    {/* Sillage */}
                                    <tr style={{ borderTop: `1px solid ${THEME.colors.border.subtle}` }}>
                                        <td className="p-4 text-xs uppercase" style={{ color: THEME.colors.text.muted }}>Sillage</td>
                                        {fragrances.map(f => (
                                            <td key={f.id} className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 h-2 rounded-full max-w-[100px]" style={{ background: THEME.colors.bg.tertiary }}>
                                                        <div className="h-full rounded-full" style={{ width: `${f.sillage * 10}%`, background: THEME.colors.accent.pink }} />
                                                    </div>
                                                    <span>{f.sillage}/10</span>
                                                </div>
                                            </td>
                                        ))}
                                    </tr>

                                    {/* Seasons */}
                                    <tr style={{ borderTop: `1px solid ${THEME.colors.border.subtle}` }}>
                                        <td className="p-4 text-xs uppercase" style={{ color: THEME.colors.text.muted }}>Seasons</td>
                                        {fragrances.map(f => (
                                            <td key={f.id} className="p-4">
                                                <div className="flex gap-2">
                                                    {f.seasons.includes("spring") && <span title="Spring">🌸</span>}
                                                    {f.seasons.includes("summer") && <span title="Summer">☀️</span>}
                                                    {f.seasons.includes("fall") && <span title="Fall">🍂</span>}
                                                    {f.seasons.includes("winter") && <span title="Winter">❄️</span>}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>

                                    {/* Top Notes */}
                                    <tr style={{ borderTop: `1px solid ${THEME.colors.border.subtle}` }}>
                                        <td className="p-4 text-xs uppercase" style={{ color: THEME.colors.accent.purple }}>Top Notes</td>
                                        {fragrances.map(f => (
                                            <td key={f.id} className="p-4">
                                                {f.ingredients.filter(i => i.category === "top").slice(0, 3).map(i => (
                                                    <DNABar key={i.name} name={i.name} percentage={i.percentage} category="top" />
                                                ))}
                                            </td>
                                        ))}
                                    </tr>

                                    {/* Heart Notes */}
                                    <tr style={{ borderTop: `1px solid ${THEME.colors.border.subtle}` }}>
                                        <td className="p-4 text-xs uppercase" style={{ color: THEME.colors.accent.pink }}>Heart Notes</td>
                                        {fragrances.map(f => (
                                            <td key={f.id} className="p-4">
                                                {f.ingredients.filter(i => i.category === "heart").slice(0, 3).map(i => (
                                                    <DNABar key={i.name} name={i.name} percentage={i.percentage} category="heart" />
                                                ))}
                                            </td>
                                        ))}
                                    </tr>

                                    {/* Base Notes */}
                                    <tr style={{ borderTop: `1px solid ${THEME.colors.border.subtle}` }}>
                                        <td className="p-4 text-xs uppercase" style={{ color: THEME.colors.accent.gold }}>Base Notes</td>
                                        {fragrances.map(f => (
                                            <td key={f.id} className="p-4">
                                                {f.ingredients.filter(i => i.category === "base").slice(0, 3).map(i => (
                                                    <DNABar key={i.name} name={i.name} percentage={i.percentage} category="base" />
                                                ))}
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
