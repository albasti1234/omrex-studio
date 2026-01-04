"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// =============================================================================
// THEME - Romantic Floral
// =============================================================================

const THEME = {
    colors: {
        bg: { primary: "#080508", secondary: "#0d080c", tertiary: "#140d12" },
        accent: {
            rose: "#db7093",
            roseRgb: "219, 112, 147",
            petal: "#f8c8dc",
            blush: "#e8a0b8",
            gold: "#d4a853",
        },
        text: { primary: "#fdf8fa", secondary: "#c9b8c0", muted: "#8a7580" },
        border: { subtle: "rgba(219,112,147,0.12)", hover: "rgba(248,200,220,0.4)" },
    },
} as const;

// Curated Floral Fragrances with full data (matching oud collection format)
const FLORAL_FRAGRANCES = [
    {
        id: "rosa-elegance",
        name: "Rosa Elegance",
        brand: "Dior",
        price: 185,
        rating: 4.8,
        reviews: 1234,
        year: 2021,
        concentration: "Eau de Parfum",
        longevity: "8-10 hours",
        sillage: "Moderate",
        image: "/images/velvet/floral-fragrances/rosa-elegance.png",
        description: "A timeless rose composition with Bulgarian rose absolute and May rose. Romantic and elegant.",
        notes: { top: ["Bergamot", "Pink Pepper"], heart: ["Bulgarian Rose", "May Rose", "Peony"], base: ["Musk", "Sandalwood"] },
        story: "Inspired by the rose gardens of Grasse at dawn.",
        isNew: true,
        isBestseller: true,
    },
    {
        id: "jasmine-dream",
        name: "Jasmine Dream",
        brand: "Chanel",
        price: 220,
        rating: 4.9,
        reviews: 2156,
        year: 2019,
        concentration: "Eau de Parfum",
        longevity: "10+ hours",
        sillage: "Strong",
        image: "/images/velvet/floral-fragrances/jasmine-dream.png",
        description: "Intoxicating jasmine from Grasse, wrapped in soft white musk. Pure feminine elegance.",
        notes: { top: ["Orange Blossom", "Ylang-Ylang"], heart: ["Jasmine Absolute", "Tuberose"], base: ["White Musk", "Sandalwood"] },
        story: "The essence of moonlit jasmine gardens.",
        isNew: false,
        isBestseller: true,
    },
    {
        id: "peony-blush",
        name: "Peony Blush",
        brand: "Dior",
        price: 165,
        rating: 4.7,
        reviews: 987,
        year: 2023,
        concentration: "Eau de Toilette",
        longevity: "6-8 hours",
        sillage: "Moderate",
        image: "/images/velvet/floral-fragrances/peony-blush.png",
        description: "Fresh peony petals kissed by morning dew in a romantic garden. Light and airy.",
        notes: { top: ["Bergamot", "Lychee"], heart: ["Peony", "Rose"], base: ["White Musk", "Cedar"] },
        story: "Capturing the first bloom of spring.",
        isNew: true,
        isBestseller: false,
    },
    {
        id: "lilac-garden",
        name: "Lilac Garden",
        brand: "Jo Malone",
        price: 145,
        rating: 4.6,
        reviews: 654,
        year: 2020,
        concentration: "Cologne Intense",
        longevity: "6-8 hours",
        sillage: "Soft",
        image: "/images/velvet/floral-fragrances/lilac-garden.png",
        description: "Purple lilacs blooming in an English garden at springtime. Nostalgic and fresh.",
        notes: { top: ["Violet Leaf", "Green Notes"], heart: ["Lilac", "Iris"], base: ["Sandalwood", "Musk"] },
        story: "A walk through Kensington Gardens in May.",
        isNew: false,
        isBestseller: false,
    },
    {
        id: "magnolia-white",
        name: "Magnolia Blanc",
        brand: "Guerlain",
        price: 195,
        rating: 4.8,
        reviews: 1123,
        year: 2018,
        concentration: "Eau de Parfum",
        longevity: "8-10 hours",
        sillage: "Moderate",
        image: "/images/velvet/floral-fragrances/magnolia-white.png",
        description: "Pure white magnolia in its most elegant form, creamy and refined. Timeless beauty.",
        notes: { top: ["Citrus", "Ginger"], heart: ["Magnolia", "Tuberose"], base: ["Musk", "Vetiver"] },
        story: "The grand magnolia trees of the French Riviera.",
        isNew: false,
        isBestseller: true,
    },
    {
        id: "orchid-luxury",
        name: "Orchid Luxe",
        brand: "Tom Ford",
        price: 285,
        rating: 4.9,
        reviews: 1876,
        year: 2022,
        concentration: "Eau de Parfum",
        longevity: "12+ hours",
        sillage: "Strong",
        image: "/images/velvet/floral-fragrances/orchid-luxury.png",
        description: "Exotic orchid petals wrapped in sensual vanilla and amber. Opulent and seductive.",
        notes: { top: ["Black Truffle", "Ylang-Ylang"], heart: ["Black Orchid", "Lotus"], base: ["Vanilla", "Amber", "Sandalwood"] },
        story: "A midnight garden in Istanbul.",
        isNew: true,
        isBestseller: true,
    },
    {
        id: "tuberose-night",
        name: "Tuberose Nuit",
        brand: "Byredo",
        price: 210,
        rating: 4.7,
        reviews: 765,
        year: 2020,
        concentration: "Eau de Parfum",
        longevity: "10+ hours",
        sillage: "Moderate",
        image: "/images/velvet/floral-fragrances/tuberose-night.png",
        description: "Heady tuberose that blooms at midnight, mysterious and seductive. Intoxicating.",
        notes: { top: ["Bergamot", "Davana"], heart: ["Tuberose", "Jasmine"], base: ["Musk", "Cashmere Wood"] },
        story: "White flowers under the Moroccan stars.",
        isNew: false,
        isBestseller: false,
    },
    {
        id: "lily-fresh",
        name: "Lily Valley",
        brand: "Dior",
        price: 155,
        rating: 4.5,
        reviews: 543,
        year: 2019,
        concentration: "Eau de Toilette",
        longevity: "5-6 hours",
        sillage: "Soft",
        image: "/images/velvet/floral-fragrances/lily-fresh.png",
        description: "Fresh lily of the valley, the fragrance of spring mornings. Delicate and pure.",
        notes: { top: ["Green Leaves", "Citrus"], heart: ["Lily of the Valley", "Hyacinth"], base: ["White Cedar", "Musk"] },
        story: "May 1st in Paris—the Lily tradition.",
        isNew: false,
        isBestseller: false,
    },
];

// =============================================================================
// FLOATING PETALS
// =============================================================================

function FloatingPetals() {
    const [petals, setPetals] = useState<Array<{ id: number; x: number; delay: number; duration: number; size: number; rotation: number }>>([]);

    useEffect(() => {
        setPetals(
            Array.from({ length: 25 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                delay: Math.random() * 15,
                duration: Math.random() * 10 + 12,
                size: Math.random() * 15 + 8,
                rotation: Math.random() * 360,
            }))
        );
    }, []);

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {petals.map(p => (
                <motion.div
                    key={p.id}
                    className="absolute"
                    style={{
                        left: `${p.x}%`,
                        top: -20,
                        width: p.size,
                        height: p.size * 0.6,
                        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                        background: `linear-gradient(135deg, ${THEME.colors.accent.petal}, ${THEME.colors.accent.rose}80)`,
                        opacity: 0.6,
                    }}
                    animate={{
                        y: [0, 800],
                        x: [0, Math.sin(p.id) * 100],
                        rotate: [p.rotation, p.rotation + 360],
                        opacity: [0, 0.7, 0.7, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
}

// =============================================================================
// HERO SECTION
// =============================================================================

function HeroSection() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

    return (
        <section ref={ref} className="relative h-[100svh] overflow-hidden" style={{ background: THEME.colors.bg.primary }}>
            {/* Background Image */}
            <motion.div className="absolute inset-0" style={{ scale }}>
                <Image
                    src="/images/velvet/collections/floral.jpg"
                    alt="Floral Dreams Collection"
                    fill
                    className="object-cover"
                    priority
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(to bottom, 
                            ${THEME.colors.bg.primary}50 0%, 
                            ${THEME.colors.bg.primary}70 50%, 
                            ${THEME.colors.bg.primary} 100%
                        )`,
                    }}
                />
            </motion.div>

            {/* Floating Petals */}
            <FloatingPetals />

            {/* Rose Glow */}
            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(ellipse at 50% 60%, rgba(${THEME.colors.accent.roseRgb}, 0.12), transparent 60%)`,
                }}
            />

            {/* Content */}
            <motion.div
                className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
                style={{ opacity }}
            >
                {/* Pre-title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="mb-6 flex items-center gap-4"
                >
                    <span className="text-lg" style={{ color: THEME.colors.accent.petal }}>❀</span>
                    <span className="text-[0.65rem] uppercase tracking-[0.5em]" style={{ color: THEME.colors.accent.blush }}>
                        Eternal Bloom
                    </span>
                    <span className="text-lg" style={{ color: THEME.colors.accent.petal }}>❀</span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    className="mb-6"
                >
                    <span
                        className="block text-[3rem] font-extralight leading-none tracking-[0.02em] sm:text-[4.5rem] lg:text-[6rem]"
                        style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                    >
                        Floral
                    </span>
                    <span
                        className="mt-2 block text-[2rem] font-extralight italic tracking-[0.15em] sm:text-[3rem] lg:text-[4rem]"
                        style={{ color: THEME.colors.accent.rose, fontFamily: "'Playfair Display', serif" }}
                    >
                        Dreams
                    </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="max-w-xl text-base leading-relaxed sm:text-lg"
                    style={{ color: THEME.colors.text.secondary }}
                >
                    Where Bulgarian roses dance with Indian jasmine, and peony petals
                    unfold at dawn. A garden of eternal elegance captured in glass.
                </motion.p>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <motion.div
                        className="flex flex-col items-center gap-3"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <span className="text-[0.6rem] uppercase tracking-[0.3em]" style={{ color: THEME.colors.text.muted }}>
                            Discover
                        </span>
                        <div className="h-12 w-px" style={{ background: `linear-gradient(to bottom, ${THEME.colors.accent.rose}, transparent)` }} />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}

// =============================================================================
// STORY SECTION
// =============================================================================

function StorySection() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-20%" });

    return (
        <section ref={ref} className="relative py-32" style={{ background: THEME.colors.bg.secondary }}>
            {/* Ambient Glow */}
            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(ellipse at 70% 50%, rgba(${THEME.colors.accent.roseRgb}, 0.06), transparent 50%)`,
                }}
            />

            <div className="relative z-10 mx-auto max-w-6xl px-6">
                <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                    {/* Text First for variety */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1 }}
                    >
                        <span
                            className="mb-4 inline-block text-[0.6rem] uppercase tracking-[0.4em]"
                            style={{ color: THEME.colors.accent.rose }}
                        >
                            The Essence
                        </span>
                        <h2
                            className="mb-6 text-[2rem] font-extralight leading-tight sm:text-[2.5rem]"
                            style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                        >
                            Queen of{" "}
                            <span style={{ color: THEME.colors.accent.petal, fontStyle: "italic" }}>Flowers</span>
                        </h2>
                        <div className="space-y-5 text-base leading-relaxed" style={{ color: THEME.colors.text.secondary }}>
                            <p>
                                Rose has been called the "Queen of Flowers" for millennia. It takes approximately
                                10,000 roses to produce just one ounce of rose absolute—making it one of perfumery's
                                most precious ingredients.
                            </p>
                            <p>
                                Our floral collection celebrates not just the rose, but the entire garden: the
                                intoxicating jasmine of Grasse, the delicate peony, and the sweet lily of the valley.
                            </p>
                            <p style={{ color: THEME.colors.accent.blush }}>
                                Each composition is a love letter to femininity, elegance, and the timeless
                                beauty of nature's most romantic blooms.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="mt-10 flex gap-12">
                            {[
                                { value: "12+", label: "Fragrances" },
                                { value: "10K", label: "Roses/Oz" },
                                { value: "5am", label: "Harvest Time" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                >
                                    <span
                                        className="block text-2xl font-light"
                                        style={{ color: THEME.colors.accent.rose, fontFamily: "'Playfair Display', serif" }}
                                    >
                                        {stat.value}
                                    </span>
                                    <span className="mt-1 block text-[0.6rem] uppercase tracking-wider" style={{ color: THEME.colors.text.muted }}>
                                        {stat.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative aspect-[4/5] overflow-hidden"
                    >
                        <Image
                            src="/images/velvet/collections/floral.jpg"
                            alt="Floral Essence"
                            fill
                            className="object-cover"
                        />
                        <div
                            className="absolute inset-0"
                            style={{ background: `linear-gradient(225deg, transparent 50%, ${THEME.colors.bg.secondary} 100%)` }}
                        />
                        {/* Decorative Border */}
                        <motion.div
                            className="absolute inset-4 border"
                            style={{ borderColor: THEME.colors.accent.petal }}
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 0.3 } : {}}
                            transition={{ delay: 0.5 }}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// =============================================================================
// FRAGRANCE CARD - Matching Oud Collection Style
// =============================================================================

function FragranceCard({ fragrance, index }: { fragrance: typeof FLORAL_FRAGRANCES[0]; index: number }) {
    const [expanded, setExpanded] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
    };

    const handleMoreInfo = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setExpanded(!expanded);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            <div
                className="relative overflow-hidden rounded-sm"
                style={{
                    background: THEME.colors.bg.tertiary,
                    border: `1px solid ${THEME.colors.border.subtle}`,
                }}
            >
                {/* Image Section */}
                <div
                    className="relative aspect-square overflow-hidden"
                    style={{ background: THEME.colors.bg.primary }}
                >
                    <Image
                        src={fragrance.image}
                        alt={fragrance.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Rose Glow */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `radial-gradient(circle at center, rgba(${THEME.colors.accent.roseRgb}, 0.12), transparent 70%)`,
                        }}
                    />

                    {/* Brand Badge */}
                    <div className="absolute left-3 top-3">
                        <span
                            className="px-2.5 py-1 text-[0.5rem] font-semibold uppercase tracking-wider"
                            style={{
                                background: `linear-gradient(135deg, ${THEME.colors.accent.rose}, ${THEME.colors.accent.petal})`,
                                color: THEME.colors.bg.primary,
                            }}
                        >
                            {fragrance.brand}
                        </span>
                    </div>

                    {/* Rating */}
                    <div className="absolute right-3 top-3 flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: "rgba(0,0,0,0.5)" }}>
                        <span style={{ color: THEME.colors.accent.petal }}>★</span>
                        <span className="text-xs font-medium" style={{ color: THEME.colors.text.primary }}>
                            {fragrance.rating}
                        </span>
                    </div>

                    {/* Quick Stats - Longevity & Sillage */}
                    <div className="absolute bottom-3 left-3 right-3">
                        <div
                            className="flex justify-between text-[0.55rem] uppercase tracking-wider px-3 py-2 rounded-sm"
                            style={{ background: "rgba(0,0,0,0.6)", color: THEME.colors.text.muted }}
                        >
                            <span>⏱ {fragrance.longevity}</span>
                            <span>💨 {fragrance.sillage}</span>
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="p-4">
                    {/* Name & Price Row */}
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                            <h3
                                className="text-lg font-light truncate"
                                style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                            >
                                {fragrance.name}
                            </h3>
                            <span className="text-[0.55rem] uppercase tracking-wider" style={{ color: THEME.colors.text.muted }}>
                                {fragrance.concentration} • {fragrance.year}
                            </span>
                        </div>
                        <span
                            className="text-xl font-light flex-shrink-0"
                            style={{ color: THEME.colors.accent.rose, fontFamily: "'Playfair Display', serif" }}
                        >
                            ${fragrance.price}
                        </span>
                    </div>

                    {/* Description */}
                    <p
                        className="mt-3 text-xs leading-relaxed"
                        style={{ color: THEME.colors.text.secondary }}
                    >
                        {fragrance.description}
                    </p>

                    {/* Notes Pills */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                        {[...fragrance.notes.heart.slice(0, 2), ...fragrance.notes.base.slice(0, 1)].map(note => (
                            <span
                                key={note}
                                className="px-2 py-0.5 text-[0.5rem] uppercase tracking-wider rounded-sm"
                                style={{
                                    background: THEME.colors.bg.primary,
                                    color: THEME.colors.accent.blush,
                                    border: `1px solid ${THEME.colors.border.subtle}`,
                                }}
                            >
                                {note}
                            </span>
                        ))}
                    </div>

                    {/* Expandable Details */}
                    <AnimatePresence>
                        {expanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${THEME.colors.border.subtle}` }}>
                                    <p className="text-xs italic mb-4" style={{ color: THEME.colors.text.muted }}>
                                        &ldquo;{fragrance.story}&rdquo;
                                    </p>

                                    <div className="grid grid-cols-3 gap-2 text-center">
                                        <div className="p-2 rounded-sm" style={{ background: THEME.colors.bg.primary }}>
                                            <span className="block text-[0.5rem] uppercase tracking-wider mb-1" style={{ color: THEME.colors.accent.petal }}>Top</span>
                                            {fragrance.notes.top.map(n => (
                                                <span key={n} className="block text-[0.55rem]" style={{ color: THEME.colors.text.secondary }}>{n}</span>
                                            ))}
                                        </div>
                                        <div className="p-2 rounded-sm" style={{ background: THEME.colors.bg.primary }}>
                                            <span className="block text-[0.5rem] uppercase tracking-wider mb-1" style={{ color: THEME.colors.accent.rose }}>Heart</span>
                                            {fragrance.notes.heart.map(n => (
                                                <span key={n} className="block text-[0.55rem]" style={{ color: THEME.colors.text.secondary }}>{n}</span>
                                            ))}
                                        </div>
                                        <div className="p-2 rounded-sm" style={{ background: THEME.colors.bg.primary }}>
                                            <span className="block text-[0.5rem] uppercase tracking-wider mb-1" style={{ color: THEME.colors.accent.blush }}>Base</span>
                                            {fragrance.notes.base.map(n => (
                                                <span key={n} className="block text-[0.55rem]" style={{ color: THEME.colors.text.secondary }}>{n}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Action Buttons */}
                    <div className="mt-4 flex items-center gap-2">
                        <button
                            onClick={handleMoreInfo}
                            className="flex-1 py-2.5 text-[0.6rem] uppercase tracking-wider transition-colors rounded-sm"
                            style={{
                                background: "transparent",
                                border: `1px solid ${THEME.colors.border.subtle}`,
                                color: THEME.colors.accent.rose,
                            }}
                        >
                            {expanded ? "Less" : "More Info"}
                        </button>
                        <button
                            onClick={handleWishlist}
                            className="h-10 w-10 flex items-center justify-center rounded-sm transition-all"
                            style={{
                                background: isWishlisted ? THEME.colors.accent.rose : THEME.colors.bg.primary,
                                border: `1px solid ${THEME.colors.border.subtle}`
                            }}
                        >
                            <span style={{ color: isWishlisted ? THEME.colors.bg.primary : THEME.colors.text.muted }}>
                                {isWishlisted ? "♥" : "♡"}
                            </span>
                        </button>
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 py-2.5 text-[0.6rem] uppercase tracking-wider rounded-sm font-medium transition-all"
                            style={{
                                background: addedToCart ? THEME.colors.accent.blush : THEME.colors.accent.rose,
                                color: THEME.colors.bg.primary,
                            }}
                        >
                            {addedToCart ? "✓ Added!" : "Add to Cart"}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// =============================================================================
// FRAGRANCES SECTION
// =============================================================================

function FragrancesSection() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <section ref={ref} className="relative py-32" style={{ background: THEME.colors.bg.primary }}>
            <FloatingPetals />

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                {/* Header */}
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                >
                    <span className="mb-4 inline-block text-[0.6rem] uppercase tracking-[0.4em]" style={{ color: THEME.colors.accent.rose }}>
                        ❀ The Collection ❀
                    </span>
                    <h2
                        className="text-[2rem] font-extralight sm:text-[2.5rem]"
                        style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                    >
                        Discover Our{" "}
                        <span style={{ color: THEME.colors.accent.petal, fontStyle: "italic" }}>Floral Bouquets</span>
                    </h2>
                </motion.div>

                {/* Grid - Single column on mobile, 2 on tablet, 3 on desktop */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {FLORAL_FRAGRANCES.map((fragrance, i) => (
                        <FragranceCard key={fragrance.id} fragrance={fragrance} index={i} />
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 }}
                >
                    <Link
                        href="/demos/velvet-perfumes/fragrances"
                        className="inline-flex items-center gap-3 px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition-all hover:gap-5"
                        style={{ border: `1px solid ${THEME.colors.border.subtle}`, color: THEME.colors.accent.rose }}
                    >
                        View All Fragrances
                        <span>→</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function FloralCollectionPage() {
    return (
        <main style={{ background: THEME.colors.bg.primary }}>
            {/* Navbar */}
            <header
                className="fixed inset-x-0 top-0 z-50"
                style={{ background: `${THEME.colors.bg.primary}e0`, backdropFilter: "blur(20px)" }}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <Link href="/demos/velvet-perfumes">
                        <span
                            className="text-[1.4rem] font-extralight tracking-[0.25em]"
                            style={{ fontFamily: "'Playfair Display', serif", color: THEME.colors.text.primary }}
                        >
                            VELVET
                        </span>
                    </Link>
                    <nav className="flex items-center gap-8">
                        <Link
                            href="/demos/velvet-perfumes/collections"
                            className="text-[0.7rem] uppercase tracking-[0.2em]"
                            style={{ color: THEME.colors.text.secondary }}
                        >
                            Collections
                        </Link>
                        <Link
                            href="/demos/velvet-perfumes/fragrances"
                            className="text-[0.7rem] uppercase tracking-[0.2em]"
                            style={{ color: THEME.colors.text.secondary }}
                        >
                            Fragrances
                        </Link>
                    </nav>
                </div>
            </header>

            <HeroSection />
            <StorySection />
            <FragrancesSection />

            {/* Footer */}
            <footer className="py-12" style={{ background: THEME.colors.bg.secondary, borderTop: `1px solid ${THEME.colors.border.subtle}` }}>
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <Link href="/demos/velvet-perfumes">
                        <span
                            className="text-xl font-extralight tracking-[0.3em]"
                            style={{ fontFamily: "'Playfair Display', serif", color: THEME.colors.accent.rose }}
                        >
                            VELVET
                        </span>
                    </Link>
                    <p className="mt-4 text-xs" style={{ color: THEME.colors.text.muted }}>
                        © 2024 Velvet Perfumes. All rights reserved.
                    </p>
                </div>
            </footer>
        </main>
    );
}
