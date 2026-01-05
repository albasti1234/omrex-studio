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

    // Get ingredients for each category (desktop: more, mobile: fewer)
    const topIngredients = fragrance.ingredients.filter(i => i.category === "top").slice(0, 2);
    const heartIngredients = fragrance.ingredients.filter(i => i.category === "heart").slice(0, 2);
    const baseIngredients = fragrance.ingredients.filter(i => i.category === "base").slice(0, 1);
    
    // Mobile: just top 3 notes as pills
    const mobileNotes = fragrance.ingredients.slice(0, 3);

    const isWishlisted = isInWishlist(fragrance.id);
    const isComparing = isInCompare(fragrance.id);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
            className="h-full"
        >
            <motion.div
                className="group relative h-full overflow-hidden border transition-all duration-500"
                style={{ borderColor: theme.colors.border.subtle, background: theme.colors.bg.secondary }}
                whileHover={{
                    scale: 1.02,
                    boxShadow: `0 20px 40px -15px rgba(${theme.colors.accent.goldRgb}, 0.2)`
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {/* ========== IMAGE CONTAINER ========== */}
                {/* Mobile: aspect-[4/5], Desktop: h-64 */}
                <div 
                    className="relative aspect-[4/5] sm:aspect-auto sm:h-64 overflow-hidden" 
                    style={{ background: theme.colors.bg.tertiary }}
                >
                    {/* Image with Hover Scale */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.6 }}
                    >
                        {fragrance.image && fragrance.image.endsWith('.png') ? (
                            <Image
                                src={fragrance.image}
                                alt={fragrance.name}
                                fill
                                className="object-cover sm:object-contain p-2 sm:p-4 scale-[1.05] sm:scale-100"
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                loading={index < 4 ? "eager" : "lazy"}
                            />
                        ) : (
                            <span className="text-6xl sm:text-8xl font-light opacity-10" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {fragrance.name.charAt(0)}
                            </span>
                        )}
                    </motion.div>

                    {/* Ambient Glow on Hover */}
                    <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `radial-gradient(circle at center, rgba(${theme.colors.accent.goldRgb}, 0.15), transparent 60%)` }}
                    />

                    {/* Badges - Absolute Overlay (Mobile: smaller) */}
                    <div className="absolute left-2 sm:left-3 top-2 sm:top-3 flex flex-col gap-1 sm:gap-2 z-10">
                        {fragrance.isNew && (
                            <span
                                className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[0.45rem] sm:text-[0.5rem] font-semibold uppercase tracking-wider"
                                style={{ background: theme.colors.accent.gold, color: theme.colors.bg.primary }}
                            >
                                New
                            </span>
                        )}
                        {fragrance.isBestseller && (
                            <span
                                className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[0.45rem] sm:text-[0.5rem] font-semibold uppercase tracking-wider"
                                style={{ background: theme.colors.accent.purple, color: "white" }}
                            >
                                ★ Best
                            </span>
                        )}
                    </div>

                    {/* Gender & Temperature Icons - Smaller on Mobile */}
                    <div className="absolute right-2 sm:right-3 top-2 sm:top-3 flex flex-col items-center gap-0.5 sm:gap-1 z-10">
                        <span className="text-base sm:text-xl">{fragrance.gender === "men" ? "♂" : fragrance.gender === "women" ? "♀" : "⚤"}</span>
                    </div>

                    {/* Action Buttons - Desktop Only Hover */}
                    <motion.div
                        className="absolute right-2 sm:right-3 bottom-2 sm:bottom-3 flex flex-col gap-1.5 sm:gap-2 z-10"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        {/* Wishlist */}
                        <motion.button
                            onClick={(e) => { e.preventDefault(); toggleWishlist(fragrance.id); }}
                            className="h-7 w-7 sm:h-9 sm:w-9 flex items-center justify-center rounded-full backdrop-blur-sm transition-all opacity-70 sm:opacity-0 group-hover:opacity-100"
                            style={{ background: isWishlisted ? theme.colors.accent.red : "rgba(0,0,0,0.5)" }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg className="h-3 w-3 sm:h-4 sm:w-4" fill={isWishlisted ? "white" : "none"} stroke="white" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </motion.button>

                        {/* Quick View - Desktop Only */}
                        <motion.button
                            onClick={(e) => { e.preventDefault(); onQuickView(fragrance); }}
                            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
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

                {/* ========== INFO SECTION ========== */}
                {/* Mobile: compact, Desktop: richer */}
                <div className="p-2.5 sm:p-4">
                    {/* Brand */}
                    <span className="text-[0.5rem] sm:text-[0.6rem] uppercase tracking-wider" style={{ color: theme.colors.accent.gold }}>{brand?.name}</span>

                    {/* Name - Line Clamp */}
                    <Link href={`/demos/velvet-perfumes/fragrances/${fragrance.slug}`} suppressHydrationWarning>
                        <h3 className="mt-0.5 sm:mt-1 text-xs sm:text-sm font-medium line-clamp-1 sm:line-clamp-2 hover:text-white transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {fragrance.name}
                        </h3>
                    </Link>

                    {/* Mobile: Note Pills (compact) */}
                    <div className="flex flex-wrap gap-1 mt-1.5 sm:hidden">
                        {mobileNotes.map((note, i) => (
                            <span 
                                key={i}
                                className="px-1.5 py-0.5 text-[0.45rem] rounded-full"
                                style={{ background: theme.colors.bg.tertiary, color: theme.colors.text.secondary }}
                            >
                                {note.name}
                            </span>
                        ))}
                    </div>

                    {/* Desktop: DNA Bars (hidden on mobile) */}
                    <div className="hidden sm:block">
                        {/* Year & Perfumer */}
                        <p className="text-[0.6rem] mb-3" style={{ color: theme.colors.text.muted }}>
                            {fragrance.year} • {fragrance.perfumer.split(" ").slice(-1)[0]}
                        </p>

                        {/* DNA Bars */}
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
                    </div>

                    {/* Price & Rating - Always Visible */}
                    <div className="flex items-center justify-between pt-2 sm:pt-3" style={{ borderTop: `1px solid ${theme.colors.border.subtle}` }}>
                        <div className="flex items-center gap-0.5 sm:gap-1">
                            <span className="text-xs sm:text-sm" style={{ color: theme.colors.accent.gold }}>★</span>
                            <span className="text-[0.6rem] sm:text-xs" style={{ color: theme.colors.text.secondary }}>{fragrance.rating}</span>
                        </div>
                        <span className="text-sm sm:text-lg font-light" style={{ color: theme.colors.accent.gold }}>${fragrance.price}</span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
