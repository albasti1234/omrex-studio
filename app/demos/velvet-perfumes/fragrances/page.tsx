"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { FRAGRANCES } from "../_data/fragrances";
import { getAllBrands } from "../_data/brands";
import { useCart } from "../_lib/cart-context";
import { WishlistProvider, useWishlist, CompareProvider, useCompare } from "../_lib/contexts";
import type { Season, Gender, Fragrance } from "../_data/fragrances";

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
            red: "#ef4444"
        },
        text: { primary: "#fafaf9", secondary: "#a8a29e", muted: "#78716c" },
        border: { subtle: "rgba(212,168,83,0.08)", default: "rgba(212,168,83,0.15)", hover: "rgba(212,168,83,0.35)" },
    },
} as const;

// Category colors for DNA bars
const CATEGORY_COLORS = {
    top: { main: "#a855f7", light: "rgba(168, 85, 247, 0.2)" },      // Purple
    heart: { main: "#ec4899", light: "rgba(236, 72, 153, 0.2)" },    // Pink
    base: { main: "#d4a853", light: "rgba(212, 168, 83, 0.2)" },     // Gold
};

// =============================================================================
// DNA BAR WITH LABEL
// =============================================================================

function DNABarWithLabel({ name, percentage, category }: { name: string; percentage: number; category: "top" | "heart" | "base" }) {
    const color = CATEGORY_COLORS[category];

    return (
        <div className="flex items-center gap-2">
            <span className="w-16 text-[0.55rem] uppercase tracking-wide truncate" style={{ color: color.main }}>
                {name}
            </span>
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: color.light }}>
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${color.main}, ${color.main}80)` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                />
            </div>
            <span className="text-[0.5rem] w-6 text-right" style={{ color: color.main }}>{percentage}%</span>
        </div>
    );
}

// =============================================================================
// QUICK VIEW MODAL
// =============================================================================

function QuickViewModal({ fragrance, onClose }: { fragrance: Fragrance; onClose: () => void }) {
    const brand = getAllBrands().find(b => b.id === fragrance.brandId);
    const { addItem } = useCart();
    const [selectedSize, setSelectedSize] = useState(fragrance.sizes[0]?.size);
    const topNotes = fragrance.ingredients.filter(i => i.category === "top").slice(0, 3);
    const heartNotes = fragrance.ingredients.filter(i => i.category === "heart").slice(0, 3);
    const baseNotes = fragrance.ingredients.filter(i => i.category === "base").slice(0, 3);

    const handleAddToCart = () => {
        const cartProduct = {
            id: fragrance.id,
            slug: fragrance.slug,
            name: fragrance.name,
            collection: fragrance.brandId,
            price: fragrance.price,
            sizes: fragrance.sizes,
            image: fragrance.image,
            images: [fragrance.image],
            description: fragrance.description,
            notes: {
                top: topNotes.map(n => n.name),
                heart: heartNotes.map(n => n.name),
                base: baseNotes.map(n => n.name),
            },
            isNew: fragrance.isNew,
            isBestseller: fragrance.isBestseller,
            inStock: true,
            rating: fragrance.rating,
            reviews: fragrance.reviews,
        };
        addItem(cartProduct, selectedSize, 1);
        onClose();
    };

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <motion.div
                className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                style={{ background: THEME.colors.bg.secondary }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 h-10 w-10 flex items-center justify-center"
                    style={{ color: THEME.colors.text.muted }}
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="grid md:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="relative aspect-square" style={{ background: THEME.colors.bg.tertiary }}>
                        <div className="absolute inset-0 flex items-center justify-center">
                            {fragrance.image && fragrance.image.endsWith('.png') ? (
                                <Image
                                    src={fragrance.image}
                                    alt={fragrance.name}
                                    fill
                                    className="object-contain p-6"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            ) : (
                                <motion.span
                                    className="text-[10rem] font-light opacity-15"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                    animate={{ rotate: [0, 3, -3, 0] }}
                                    transition={{ duration: 6, repeat: Infinity }}
                                >
                                    {fragrance.name.charAt(0)}
                                </motion.span>
                            )}
                        </div>
                        {/* Glow Effect */}
                        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at center, rgba(${THEME.colors.accent.goldRgb}, 0.1), transparent 70%)` }} />
                    </div>

                    {/* Info */}
                    <div className="p-8">
                        <span className="text-xs uppercase tracking-[0.2em]" style={{ color: THEME.colors.accent.gold }}>
                            {brand?.name}
                        </span>
                        <h2 className="mt-2 text-2xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {fragrance.name}
                        </h2>
                        <p className="mt-1 text-sm" style={{ color: THEME.colors.text.muted }}>
                            {fragrance.year} • by {fragrance.perfumer}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mt-4">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} style={{ color: i < Math.floor(fragrance.rating) ? THEME.colors.accent.gold : THEME.colors.bg.tertiary }}>★</span>
                                ))}
                            </div>
                            <span className="text-xs" style={{ color: THEME.colors.text.muted }}>({fragrance.reviews})</span>
                        </div>

                        {/* DNA Preview */}
                        <div className="mt-6 space-y-4">
                            <div>
                                <span className="text-[0.6rem] uppercase tracking-wider mb-2 block" style={{ color: THEME.colors.accent.purple }}>Top Notes</span>
                                <div className="space-y-1.5">
                                    {topNotes.map(n => <DNABarWithLabel key={n.name} name={n.name} percentage={n.percentage} category="top" />)}
                                </div>
                            </div>
                            <div>
                                <span className="text-[0.6rem] uppercase tracking-wider mb-2 block" style={{ color: THEME.colors.accent.pink }}>Heart Notes</span>
                                <div className="space-y-1.5">
                                    {heartNotes.map(n => <DNABarWithLabel key={n.name} name={n.name} percentage={n.percentage} category="heart" />)}
                                </div>
                            </div>
                            <div>
                                <span className="text-[0.6rem] uppercase tracking-wider mb-2 block" style={{ color: THEME.colors.accent.gold }}>Base Notes</span>
                                <div className="space-y-1.5">
                                    {baseNotes.map(n => <DNABarWithLabel key={n.name} name={n.name} percentage={n.percentage} category="base" />)}
                                </div>
                            </div>
                        </div>

                        {/* Size Selector */}
                        <div className="mt-6">
                            <span className="text-xs uppercase tracking-wider mb-3 block">Size</span>
                            <div className="flex gap-2">
                                {fragrance.sizes.map(s => (
                                    <button
                                        key={s.size}
                                        onClick={() => setSelectedSize(s.size)}
                                        className="px-4 py-2 text-sm border transition-all"
                                        style={{
                                            borderColor: selectedSize === s.size ? THEME.colors.accent.gold : THEME.colors.border.default,
                                            background: selectedSize === s.size ? `rgba(${THEME.colors.accent.goldRgb}, 0.1)` : "transparent"
                                        }}
                                    >
                                        {s.size} - ${s.price}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 py-3 text-xs uppercase tracking-wider font-semibold transition-all hover:translate-y-[-2px]"
                                style={{ background: `linear-gradient(135deg, ${THEME.colors.accent.gold}, ${THEME.colors.accent.goldLight})`, color: THEME.colors.bg.primary }}
                            >
                                Add to Cart
                            </button>
                            <Link
                                href={`/demos/velvet-perfumes/fragrances/${fragrance.slug}`}
                                className="px-6 py-3 text-xs uppercase tracking-wider border transition-all hover:bg-white/5"
                                style={{ borderColor: THEME.colors.border.default }}
                            >
                                Full Details
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// =============================================================================
// COMPARE PANEL
// =============================================================================

function ComparePanel() {
    const { compareList, clearCompare, toggleCompare } = useCompare();
    const fragrances = compareList.map(id => FRAGRANCES.find(f => f.id === id)).filter(Boolean) as Fragrance[];

    if (fragrances.length === 0) return null;

    return (
        <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 p-4"
            style={{ background: THEME.colors.bg.secondary, borderTop: `1px solid ${THEME.colors.border.default}` }}
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
        >
            <div className="mx-auto max-w-7xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <span className="text-sm" style={{ color: THEME.colors.text.muted }}>Compare ({fragrances.length}/3):</span>
                    <div className="flex gap-3">
                        {fragrances.map(f => (
                            <div key={f.id} className="flex items-center gap-2 px-3 py-2" style={{ background: THEME.colors.bg.tertiary }}>
                                <span className="text-sm">{f.name}</span>
                                <button onClick={() => toggleCompare(f.id)} className="text-red-400 hover:text-red-300">×</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex gap-3">
                    <button onClick={clearCompare} className="px-4 py-2 text-xs uppercase tracking-wider" style={{ color: THEME.colors.text.muted }}>
                        Clear
                    </button>
                    <Link
                        href={`/demos/velvet-perfumes/compare?ids=${compareList.join(",")}`}
                        className="px-6 py-2 text-xs uppercase tracking-wider"
                        style={{ background: THEME.colors.accent.gold, color: THEME.colors.bg.primary }}
                    >
                        Compare Now
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

// =============================================================================
// ENHANCED FRAGRANCE CARD
// =============================================================================

function FragranceCard({
    fragrance,
    index,
    onQuickView
}: {
    fragrance: Fragrance;
    index: number;
    onQuickView: (f: Fragrance) => void;
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
                style={{ borderColor: THEME.colors.border.subtle, background: THEME.colors.bg.secondary }}
                whileHover={{
                    rotateY: 2,
                    rotateX: -2,
                    scale: 1.02,
                    boxShadow: `0 20px 40px -15px rgba(${THEME.colors.accent.goldRgb}, 0.2)`
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {/* Image Container - Fixed Height */}
                <div className="relative h-64 overflow-hidden" style={{ background: THEME.colors.bg.tertiary }}>
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
                        style={{ background: `radial-gradient(circle at center, rgba(${THEME.colors.accent.goldRgb}, 0.15), transparent 60%)` }}
                    />

                    {/* Badges */}
                    <div className="absolute left-3 top-3 flex flex-col gap-2 z-10">
                        {fragrance.isNew && (
                            <motion.span
                                className="px-2 py-1 text-[0.5rem] font-semibold uppercase tracking-wider"
                                style={{ background: THEME.colors.accent.gold, color: THEME.colors.bg.primary }}
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
                                style={{ background: THEME.colors.accent.purple, color: "white" }}
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
                        <span className="text-xs" style={{ color: THEME.colors.text.muted }}>
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
                            style={{ background: isWishlisted ? THEME.colors.accent.red : "rgba(0,0,0,0.5)" }}
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
                            style={{ background: isComparing ? THEME.colors.accent.purple : "rgba(0,0,0,0.5)" }}
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
                    <span className="text-[0.6rem] uppercase tracking-wider" style={{ color: THEME.colors.accent.gold }}>{brand?.name}</span>

                    {/* Name */}
                    <Link href={`/demos/velvet-perfumes/fragrances/${fragrance.slug}`}>
                        <h3 className="mt-1 text-sm font-medium truncate hover:text-white transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {fragrance.name}
                        </h3>
                    </Link>

                    {/* Year & Perfumer */}
                    <p className="text-[0.6rem] mb-3" style={{ color: THEME.colors.text.muted }}>
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
                                        background: fragrance.seasons.includes(season) ? THEME.colors.accent.gold : THEME.colors.bg.tertiary,
                                    }}
                                    title={season}
                                />
                            ))}
                        </div>
                        <div className="flex items-center gap-2 text-[0.55rem] uppercase" style={{ color: THEME.colors.text.muted }}>
                            <span>⏱️ {fragrance.longevity}h</span>
                            <span>📡 {fragrance.sillage}/10</span>
                        </div>
                    </div>

                    {/* Price & Rating */}
                    <div className="flex items-center justify-between pt-3" style={{ borderTop: `1px solid ${THEME.colors.border.subtle}` }}>
                        <div className="flex items-center gap-1">
                            <span style={{ color: THEME.colors.accent.gold }}>★</span>
                            <span className="text-xs" style={{ color: THEME.colors.text.secondary }}>{fragrance.rating}</span>
                            <span className="text-[0.5rem]" style={{ color: THEME.colors.text.muted }}>({fragrance.reviews})</span>
                        </div>
                        <span className="text-lg font-light" style={{ color: THEME.colors.accent.gold }}>${fragrance.price}</span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// =============================================================================
// FRAGRANCES PAGE
// =============================================================================

export default function FragrancesPage() {
    const brands = getAllBrands();
    const [selectedBrand, setSelectedBrand] = useState<string>("all");
    const [selectedGender, setSelectedGender] = useState<Gender | "all">("all");
    const [selectedSeason, setSelectedSeason] = useState<Season | "all">("all");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
    const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "rating">("featured");
    const [quickViewFragrance, setQuickViewFragrance] = useState<Fragrance | null>(null);

    const searchParams = useSearchParams();

    useEffect(() => {
        const gender = searchParams.get("gender");
        if (gender && (gender === "men" || gender === "women" || gender === "unisex")) {
            if (selectedGender !== gender) {
                setSelectedGender(gender as Gender);
            }
        }
    }, [searchParams, selectedGender]);

    // Filtering
    let filtered = FRAGRANCES.filter(f => {
        if (selectedBrand !== "all" && f.brandId !== selectedBrand) return false;
        if (selectedGender !== "all" && f.gender !== selectedGender) return false;
        if (selectedSeason !== "all" && !f.seasons.includes(selectedSeason)) return false;
        if (f.price < priceRange[0] || f.price > priceRange[1]) return false;
        return true;
    });

    // Sorting
    if (sortBy === "price-low") filtered = [...filtered].sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") filtered = [...filtered].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

    const clearFilters = () => {
        setSelectedBrand("all");
        setSelectedGender("all");
        setSelectedSeason("all");
        setPriceRange([0, 500]);
    };

    const hasActiveFilters = selectedBrand !== "all" || selectedGender !== "all" || selectedSeason !== "all" || priceRange[0] > 0 || priceRange[1] < 500;

    return (
        <WishlistProvider>
            <CompareProvider>
                {/* Navbar */}
                <header className="fixed inset-x-0 top-0 z-50" style={{ background: `${THEME.colors.bg.primary}f0`, backdropFilter: "blur(20px)", borderBottom: `1px solid ${THEME.colors.border.subtle}` }}>
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                        <Link href="/demos/velvet-perfumes">
                            <span className="text-[1.4rem] font-extralight tracking-[0.25em]" style={{ fontFamily: "'Playfair Display', serif" }}>VELVET</span>
                        </Link>
                        <nav className="hidden items-center gap-10 lg:flex">
                            <Link href="/demos/velvet-perfumes/brands" className="text-[0.7rem] uppercase tracking-[0.2em]" style={{ color: THEME.colors.text.secondary }}>Brands</Link>
                            <Link href="/demos/velvet-perfumes/fragrances" className="text-[0.7rem] uppercase tracking-[0.2em]" style={{ color: THEME.colors.accent.gold }}>All Fragrances</Link>
                            <Link href="/demos/velvet-perfumes/cart" className="text-[0.7rem] uppercase tracking-[0.2em]" style={{ color: THEME.colors.text.secondary }}>Cart</Link>
                        </nav>
                    </div>
                </header>

                <main className="min-h-screen pt-24" style={{ background: THEME.colors.bg.primary }}>
                    {/* Hero with Video Background Effect */}
                    <section className="relative py-20 text-center overflow-hidden" style={{ background: THEME.colors.bg.secondary }}>
                        {/* Animated Background */}
                        <div className="absolute inset-0 pointer-events-none">
                            <motion.div
                                className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20"
                                style={{ background: `radial-gradient(circle, rgba(${THEME.colors.accent.goldRgb}, 0.3), transparent 70%)`, filter: "blur(80px)" }}
                                animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                                className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-15"
                                style={{ background: `radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent 70%)`, filter: "blur(60px)" }}
                                animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative z-10"
                        >
                            <span className="mb-6 inline-flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.4em]" style={{ color: THEME.colors.accent.gold }}>
                                <span className="h-px w-12" style={{ background: THEME.colors.accent.gold }} />
                                The Collection
                                <span className="h-px w-12" style={{ background: THEME.colors.accent.gold }} />
                            </span>
                            <h1 className="mb-4 text-4xl font-extralight tracking-wide lg:text-6xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                                All Fragrances
                            </h1>
                            <p className="mx-auto max-w-xl text-sm leading-relaxed" style={{ color: THEME.colors.text.secondary }}>
                                Explore {FRAGRANCES.length} luxury fragrances from the world&apos;s most prestigious houses
                            </p>
                        </motion.div>
                    </section>

                    {/* Filters Bar */}
                    <div className="sticky top-[73px] z-40 py-4" style={{ background: THEME.colors.bg.primary, borderBottom: `1px solid ${THEME.colors.border.subtle}` }}>
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="flex flex-wrap items-center gap-4">
                                {/* Brand Filter */}
                                <select
                                    value={selectedBrand}
                                    onChange={(e) => setSelectedBrand(e.target.value)}
                                    className="bg-transparent border px-4 py-2 text-sm"
                                    style={{ borderColor: THEME.colors.border.default, color: THEME.colors.text.primary }}
                                >
                                    <option value="all">All Brands</option>
                                    {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                                </select>

                                {/* Gender Filter */}
                                <select
                                    value={selectedGender}
                                    onChange={(e) => setSelectedGender(e.target.value as Gender | "all")}
                                    className="bg-transparent border px-4 py-2 text-sm"
                                    style={{ borderColor: THEME.colors.border.default, color: THEME.colors.text.primary }}
                                >
                                    <option value="all">All Genders</option>
                                    <option value="men">Men</option>
                                    <option value="women">Women</option>
                                    <option value="unisex">Unisex</option>
                                </select>

                                {/* Season Filter */}
                                <select
                                    value={selectedSeason}
                                    onChange={(e) => setSelectedSeason(e.target.value as Season | "all")}
                                    className="bg-transparent border px-4 py-2 text-sm"
                                    style={{ borderColor: THEME.colors.border.default, color: THEME.colors.text.primary }}
                                >
                                    <option value="all">All Seasons</option>
                                    <option value="spring">🌸 Spring</option>
                                    <option value="summer">☀️ Summer</option>
                                    <option value="fall">🍂 Fall</option>
                                    <option value="winter">❄️ Winter</option>
                                </select>

                                {/* Price Filter */}
                                <select
                                    value={`${priceRange[0]}-${priceRange[1]}`}
                                    onChange={(e) => {
                                        const [min, max] = e.target.value.split("-").map(Number);
                                        setPriceRange([min, max]);
                                    }}
                                    className="bg-transparent border px-4 py-2 text-sm"
                                    style={{ borderColor: THEME.colors.border.default, color: THEME.colors.text.primary }}
                                >
                                    <option value="0-500">All Prices</option>
                                    <option value="0-150">Under $150</option>
                                    <option value="150-250">$150 - $250</option>
                                    <option value="250-500">$250+</option>
                                </select>

                                {/* Sort */}
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                                    className="bg-transparent border px-4 py-2 text-sm ml-auto"
                                    style={{ borderColor: THEME.colors.border.default, color: THEME.colors.text.primary }}
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Top Rated</option>
                                </select>

                                {/* Clear Filters */}
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-xs uppercase tracking-wider underline"
                                        style={{ color: THEME.colors.accent.gold }}
                                    >
                                        Clear All
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mx-auto max-w-7xl px-6 py-4">
                        <p className="text-sm" style={{ color: THEME.colors.text.muted }}>
                            Showing {filtered.length} of {FRAGRANCES.length} fragrances
                        </p>
                    </div>

                    {/* Grid - Equal Height Cards */}
                    <div className="mx-auto max-w-7xl px-6 pb-32">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            <AnimatePresence mode="popLayout">
                                {filtered.map((fragrance, i) => (
                                    <FragranceCard
                                        key={fragrance.id}
                                        fragrance={fragrance}
                                        index={i}
                                        onQuickView={setQuickViewFragrance}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Empty State */}
                        {filtered.length === 0 && (
                            <div className="py-20 text-center">
                                <p style={{ color: THEME.colors.text.muted }}>No fragrances match your filters</p>
                                <button
                                    onClick={clearFilters}
                                    className="mt-4 text-sm underline"
                                    style={{ color: THEME.colors.accent.gold }}
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Compare Panel */}
                    <ComparePanel />
                </main>

                {/* Quick View Modal */}
                <AnimatePresence>
                    {quickViewFragrance && (
                        <QuickViewModal
                            fragrance={quickViewFragrance}
                            onClose={() => setQuickViewFragrance(null)}
                        />
                    )}
                </AnimatePresence>
            </CompareProvider>
        </WishlistProvider>
    );
}