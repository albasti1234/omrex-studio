"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getAllBrands } from "../_data/brands";
import { useWishlist, useCompare } from "../_lib/contexts";
import { THEME as DEFAULT_THEME } from "../_lib/theme";
import { DNABarWithLabel } from "./DNABar";
import type { Fragrance } from "../_data/fragrances";

type Theme = typeof DEFAULT_THEME;

export function FragranceCard({
    fragrance,
    index,
    onQuickView,
    theme = DEFAULT_THEME
}: {
    fragrance: Fragrance;
    index: number;
    onQuickView: (f: Fragrance) => void;
    theme?: Theme;
}) {
    const brand = getAllBrands().find(b => b.id === fragrance.brandId);
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { toggleCompare, isInCompare } = useCompare();

    // Get ingredients for each category (up to 2 each = 4-6 total)
    const topIngredients = fragrance.ingredients.filter(i => i.category === "top").slice(0, 2);
    const heartIngredients = fragrance.ingredients.filter(i => i.category === "heart").slice(0, 2);
    const baseIngredients = fragrance.ingredients.filter(i => i.category === "base").slice(0, 1);

    const isWishlisted = isInWishlist(fragrance.id);
    const isComparing = isInCompare(fragrance.id);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
            className="h-full"
        >
            <motion.div
                className="group relative h-full overflow-hidden border transition-all duration-500"
                style={{ borderColor: theme.colors.border.subtle, background: theme.colors.bg.secondary }}
                whileHover={{
                    rotateY: 2,
                    rotateX: -2,
                    scale: 1.02,
                    boxShadow: `0 20px 40px -15px rgba(${theme.colors.accent.goldRgb}, 0.2)`
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {/* Image Container - Fixed Height */}
                <div className="relative h-64 overflow-hidden" style={{ background: theme.colors.bg.tertiary }}>
                    {/* Parallax Background */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                    >
                        {fragrance.image && fragrance.image.endsWith('.png') ? (
                            <Image
                                src={fragrance.image}
                                alt={fragrance.name}
                                fill
                                className="object-contain p-4"
                                sizes="(max-width: 768px) 100vw, 25vw"
                            />
                        ) : (
                            <span className="text-8xl font-light opacity-10" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {fragrance.name.charAt(0)}
                            </span>
                        )}
                    </motion.div>

                    {/* Ambient Glow */}
                    <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `radial-gradient(circle at center, rgba(${theme.colors.accent.goldRgb}, 0.15), transparent 60%)` }}
                    />

                    {/* Badges */}
                    <div className="absolute left-3 top-3 flex flex-col gap-2 z-10">
                        {fragrance.isNew && (
                            <motion.span
                                className="px-2 py-1 text-[0.5rem] font-semibold uppercase tracking-wider"
                                style={{ background: theme.colors.accent.gold, color: theme.colors.bg.primary }}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                New
                            </motion.span>
                        )}
                        {fragrance.isBestseller && (
                            <motion.span
                                className="px-2 py-1 text-[0.5rem] font-semibold uppercase tracking-wider"
                                style={{ background: theme.colors.accent.purple, color: "white" }}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                Bestseller
                            </motion.span>
                        )}
                    </div>

                    {/* Gender & Temp */}
                    <div className="absolute right-3 top-3 flex flex-col items-center gap-1 z-10">
                        <span className="text-xl">{fragrance.gender === "men" ? "♂" : fragrance.gender === "women" ? "♀" : "⚤"}</span>
                        <span className="text-xs" style={{ color: theme.colors.text.muted }}>
                            {fragrance.temperature === "cold" ? "❄️" : fragrance.temperature === "warm" ? "☀️" : "🌡️"}
                        </span>
                    </div>

                    {/* Action Buttons - Appear on Hover */}
                    <motion.div
                        className="absolute right-3 bottom-3 flex flex-col gap-2 z-10"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        {/* Wishlist */}
                        <motion.button
                            onClick={(e) => { e.preventDefault(); toggleWishlist(fragrance.id); }}
                            className="h-9 w-9 flex items-center justify-center rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                            style={{ background: isWishlisted ? theme.colors.accent.red : "rgba(0,0,0,0.5)" }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg className="h-4 w-4" fill={isWishlisted ? "white" : "none"} stroke="white" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </motion.button>

                        {/* Compare */}
                        <motion.button
                            onClick={(e) => { e.preventDefault(); toggleCompare(fragrance.id); }}
                            className="h-9 w-9 flex items-center justify-center rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                            style={{ background: isComparing ? theme.colors.accent.purple : "rgba(0,0,0,0.5)" }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg className="h-4 w-4" fill="none" stroke="white" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </motion.button>

                        {/* Quick View */}
                        <motion.button
                            onClick={(e) => { e.preventDefault(); onQuickView(fragrance); }}
                            className="h-9 w-9 flex items-center justify-center rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                            style={{ background: "rgba(0,0,0,0.5)" }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg className="h-4 w-4" fill="none" stroke="white" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </motion.button>
                    </motion.div>
                </div>

                {/* Info */}
                <div className="p-4">
                    {/* Brand */}
                    <span className="text-[0.6rem] uppercase tracking-wider" style={{ color: theme.colors.accent.gold }}>{brand?.name}</span>

                    {/* Name */}
                    <Link href={`/demos/velvet-perfumes/fragrances/${fragrance.slug}`}>
                        <h3 className="mt-1 text-sm font-medium truncate hover:text-white transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {fragrance.name}
                        </h3>
                    </Link>

                    {/* Year & Perfumer */}
                    <p className="text-[0.6rem] mb-3" style={{ color: theme.colors.text.muted }}>
                        {fragrance.year} • {fragrance.perfumer.split(" ").slice(-1)[0]}
                    </p>

                    {/* Enhanced DNA Bars */}
                    <div className="space-y-1.5 mb-3">
                        {topIngredients.map((ing, i) => (
                            <DNABarWithLabel key={`top-${i}`} name={ing.name} percentage={ing.percentage} category="top" />
                        ))}
                        {heartIngredients.map((ing, i) => (
                            <DNABarWithLabel key={`heart-${i}`} name={ing.name} percentage={ing.percentage} category="heart" />
                        ))}
                        {baseIngredients.map((ing, i) => (
                            <DNABarWithLabel key={`base-${i}`} name={ing.name} percentage={ing.percentage} category="base" />
                        ))}
                    </div>

                    {/* Seasons & Performance */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1">
                            {(["spring", "summer", "fall", "winter"] as const).map(season => (
                                <div
                                    key={season}
                                    className="h-2 w-2 rounded-full transition-all"
                                    style={{
                                        background: fragrance.seasons.includes(season) ? theme.colors.accent.gold : theme.colors.bg.tertiary,
                                    }}
                                    title={season}
                                />
                            ))}
                        </div>
                        <div className="flex items-center gap-2 text-[0.55rem] uppercase" style={{ color: theme.colors.text.muted }}>
                            <span>⏱️ {fragrance.longevity}h</span>
                            <span>📡 {fragrance.sillage}/10</span>
                        </div>
                    </div>

                    {/* Price & Rating */}
                    <div className="flex items-center justify-between pt-3" style={{ borderTop: `1px solid ${theme.colors.border.subtle}` }}>
                        <div className="flex items-center gap-1">
                            <span style={{ color: theme.colors.accent.gold }}>★</span>
                            <span className="text-xs" style={{ color: theme.colors.text.secondary }}>{fragrance.rating}</span>
                            <span className="text-[0.5rem]" style={{ color: theme.colors.text.muted }}>({fragrance.reviews})</span>
                        </div>
                        <span className="text-lg font-light" style={{ color: theme.colors.accent.gold }}>${fragrance.price}</span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
