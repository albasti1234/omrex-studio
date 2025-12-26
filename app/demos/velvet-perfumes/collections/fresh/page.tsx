"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// =============================================================================
// THEME - Fresh Mediterranean Aqua
// =============================================================================

const THEME = {
    colors: {
        bg: { primary: "#040608", secondary: "#060a0c", tertiary: "#0a1014" },
        accent: {
            aqua: "#20b2aa",
            aquaRgb: "32, 178, 170",
            sky: "#87ceeb",
            mint: "#98f5e1",
            gold: "#d4a853",
        },
        text: { primary: "#f5fbfa", secondary: "#a8c9c6", muted: "#6a8a88" },
        border: { subtle: "rgba(32,178,170,0.12)", hover: "rgba(152,245,225,0.4)" },
    },
} as const;

// =============================================================================
// CURATED FRESH FRAGRANCES - With full data
// =============================================================================

const FRESH_FRAGRANCES = [
    {
        id: "bergamot-sunrise",
        name: "Bergamot Sunrise",
        brand: "Acqua di Parma",
        price: 175,
        rating: 4.8,
        reviews: 1456,
        year: 2021,
        concentration: "Eau de Parfum",
        longevity: "8-10 hours",
        sillage: "Moderate",
        image: "/images/velvet/fresh-fragrances/bergamot-sunrise.png",
        description: "Calabrian bergamot burst at dawn, with neroli and white tea. Pure Mediterranean energy.",
        notes: { top: ["Calabrian Bergamot", "Pink Pepper"], heart: ["Neroli", "White Tea"], base: ["Musk", "Cedarwood"] },
        story: "The first rays of sun over the Amalfi coast.",
        isNew: true,
        isBestseller: true,
    },
    {
        id: "neroli-coast",
        name: "Neroli Portofino",
        brand: "Tom Ford",
        price: 285,
        rating: 4.9,
        reviews: 2341,
        year: 2011,
        concentration: "Eau de Parfum",
        longevity: "10+ hours",
        sillage: "Strong",
        image: "/images/velvet/fresh-fragrances/neroli-coast.png",
        description: "Sparkling citrus, orange blossom, and the Italian Riviera breeze. Iconic summer scent.",
        notes: { top: ["Sicilian Lemon", "Mandarin"], heart: ["Neroli", "Orange Blossom"], base: ["Amber", "Pittosforo"] },
        story: "Inspired by the colorful harbor of Portofino.",
        isNew: false,
        isBestseller: true,
    },
    {
        id: "marine-breeze",
        name: "Marine Odyssey",
        brand: "Issey Miyake",
        price: 125,
        rating: 4.7,
        reviews: 1876,
        year: 2020,
        concentration: "Eau de Toilette",
        longevity: "6-8 hours",
        sillage: "Moderate",
        image: "/images/velvet/fresh-fragrances/marine-breeze.png",
        description: "Crystal clear waters, sea salt, and ozonic accords. Like diving into the Mediterranean.",
        notes: { top: ["Sea Salt", "Ozonic Notes"], heart: ["Marine Accord", "Water Lily"], base: ["White Musk", "Driftwood"] },
        story: "The endless blue of the Aegean Sea.",
        isNew: false,
        isBestseller: false,
    },
    {
        id: "lemon-amalfi",
        name: "Limone di Amalfi",
        brand: "Acqua di Parma",
        price: 165,
        rating: 4.8,
        reviews: 1654,
        year: 2019,
        concentration: "Eau de Toilette",
        longevity: "6-8 hours",
        sillage: "Moderate",
        image: "/images/velvet/fresh-fragrances/lemon-amalfi.png",
        description: "Zesty Amalfi lemons, Italian herbs, and sun-warmed skin. La dolce vita bottled.",
        notes: { top: ["Sfusato Lemon", "Grapefruit"], heart: ["Basil", "Fig Leaves"], base: ["Musk", "Cedar"] },
        story: "The legendary lemon groves above Positano.",
        isNew: true,
        isBestseller: false,
    },
    {
        id: "grapefruit-fresh",
        name: "Pink Paradise",
        brand: "Jo Malone",
        price: 145,
        rating: 4.6,
        reviews: 987,
        year: 2022,
        concentration: "Cologne",
        longevity: "5-6 hours",
        sillage: "Soft",
        image: "/images/velvet/fresh-fragrances/grapefruit-fresh.png",
        description: "Juicy pink grapefruit with a hint of rhubarb. Bright, sparkling, and playful.",
        notes: { top: ["Pink Grapefruit", "Rhubarb"], heart: ["Rose Petals", "Mint"], base: ["White Musk", "Cedar"] },
        story: "A California sunrise in a bottle.",
        isNew: false,
        isBestseller: true,
    },
    {
        id: "mint-green",
        name: "Jardin Frais",
        brand: "Hermès",
        price: 195,
        rating: 4.7,
        reviews: 1234,
        year: 2018,
        concentration: "Eau de Toilette",
        longevity: "6-8 hours",
        sillage: "Soft",
        image: "/images/velvet/fresh-fragrances/mint-green.png",
        description: "Fresh garden herbs, green notes, and morning dew. An aromatic escape.",
        notes: { top: ["Spearmint", "Basil"], heart: ["Green Leaves", "Cardamom"], base: ["Vetiver", "White Musk"] },
        story: "The walled kitchen gardens of Provence.",
        isNew: false,
        isBestseller: false,
    },
    {
        id: "cucumber-water",
        name: "Eau Fraîche",
        brand: "Maison Margiela",
        price: 135,
        rating: 4.5,
        reviews: 765,
        year: 2021,
        concentration: "Eau de Toilette",
        longevity: "5-6 hours",
        sillage: "Soft",
        image: "/images/velvet/fresh-fragrances/cucumber-water.png",
        description: "Cool cucumber, melon water, and white florals. Ultimate spa freshness.",
        notes: { top: ["Cucumber", "Green Melon"], heart: ["Water Lily", "Iris"], base: ["White Musk", "Bamboo"] },
        story: "A zen moment in a Japanese garden.",
        isNew: true,
        isBestseller: false,
    },
];

// =============================================================================
// WATER DROPLETS - Reduced for mobile
// =============================================================================

function WaterDroplets() {
    const [droplets, setDroplets] = useState<Array<{ id: number; x: number; delay: number; size: number }>>([]);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        setDroplets(
            Array.from({ length: isMobile ? 15 : 30 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                delay: Math.random() * 8,
                size: Math.random() * 6 + 3,
            }))
        );
    }, []);

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {droplets.map(d => (
                <motion.div
                    key={d.id}
                    className="absolute"
                    style={{
                        left: `${d.x}%`,
                        top: -10,
                        width: d.size,
                        height: d.size * 1.5,
                        background: `linear-gradient(180deg, ${THEME.colors.accent.sky}60, ${THEME.colors.accent.aqua}80)`,
                        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                    }}
                    animate={{
                        y: [0, 600],
                        opacity: [0.8, 0.6, 0],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        delay: d.delay,
                        repeat: Infinity,
                        ease: "easeIn",
                    }}
                />
            ))}
        </div>
    );
}

// =============================================================================
// HERO SECTION - Mobile Optimized
// =============================================================================

function HeroSection() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

    return (
        <section ref={ref} className="relative h-[100svh] min-h-[600px] overflow-hidden" style={{ background: THEME.colors.bg.primary }}>
            {/* Background Image */}
            <motion.div className="absolute inset-0" style={{ scale }}>
                <Image
                    src="/images/velvet/collections/fresh.jpg"
                    alt="Fresh Essence Collection"
                    fill
                    className="object-cover"
                    priority
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(to bottom, 
                            ${THEME.colors.bg.primary}30 0%, 
                            ${THEME.colors.bg.primary}70 50%, 
                            ${THEME.colors.bg.primary} 100%
                        )`,
                    }}
                />
            </motion.div>

            {/* Water Droplets */}
            <WaterDroplets />

            {/* Aqua Glow */}
            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(ellipse at 50% 80%, rgba(${THEME.colors.accent.aquaRgb}, 0.1), transparent 60%)`,
                }}
            />

            {/* Content */}
            <motion.div
                className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center"
                style={{ opacity }}
            >
                {/* Decorative Line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="mb-5 h-px w-20 sm:w-28"
                    style={{ background: `linear-gradient(90deg, transparent, ${THEME.colors.accent.aqua}, transparent)` }}
                />

                {/* Pre-title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mb-3"
                >
                    <span className="text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.4em] sm:tracking-[0.5em]" style={{ color: THEME.colors.accent.mint }}>
                        🌊 Mediterranean Breeze 🍋
                    </span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mb-4"
                >
                    <span
                        className="block text-[4.5rem] sm:text-[6rem] lg:text-[8rem] font-extralight leading-none tracking-[0.08em]"
                        style={{
                            color: THEME.colors.text.primary,
                            fontFamily: "'Playfair Display', serif",
                            textShadow: `0 0 40px rgba(${THEME.colors.accent.aquaRgb}, 0.3)`,
                        }}
                    >
                        FRESH
                    </span>
                    <span
                        className="mt-2 block text-[1.2rem] sm:text-[1.5rem] font-light italic tracking-[0.25em]"
                        style={{ color: THEME.colors.accent.aqua, fontFamily: "'Playfair Display', serif" }}
                    >
                        Essence
                    </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="max-w-sm sm:max-w-lg text-sm sm:text-base leading-relaxed px-4"
                    style={{ color: THEME.colors.text.secondary }}
                >
                    Calabrian bergamot meets sea breeze. Neroli dances with citrus groves. Pure, clean, invigorating.
                </motion.p>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="mt-8 flex gap-8 sm:gap-14"
                >
                    {[
                        { value: "7", label: "Scents" },
                        { value: "32°C", label: "Best At" },
                        { value: "☀️", label: "Summer" },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <span
                                className="block text-xl sm:text-2xl font-light"
                                style={{ color: THEME.colors.accent.aqua, fontFamily: "'Playfair Display', serif" }}
                            >
                                {stat.value}
                            </span>
                            <span className="mt-0.5 block text-[0.5rem] sm:text-[0.55rem] uppercase tracking-[0.15em]" style={{ color: THEME.colors.text.muted }}>
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 sm:bottom-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <motion.div
                        className="flex flex-col items-center gap-2"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                    >
                        <span className="text-[0.5rem] uppercase tracking-[0.3em]" style={{ color: THEME.colors.text.muted }}>
                            Breathe
                        </span>
                        <motion.div
                            className="h-10 w-px"
                            style={{ background: `linear-gradient(to bottom, ${THEME.colors.accent.aqua}, transparent)` }}
                        />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}

// =============================================================================
// STORY SECTION - Mobile Optimized
// =============================================================================

function StorySection() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-5%" });

    return (
        <section ref={ref} className="relative py-16 sm:py-28" style={{ background: THEME.colors.bg.secondary }}>
            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(ellipse at 30% 50%, rgba(${THEME.colors.accent.aquaRgb}, 0.06), transparent 60%)`,
                }}
            />

            <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
                {/* Mobile: Stack, Desktop: Grid */}
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="relative order-2 lg:order-1"
                    >
                        <div className="relative aspect-[4/3] sm:aspect-[3/4] overflow-hidden">
                            <Image
                                src="/images/velvet/collections/fresh.jpg"
                                alt="Mediterranean Fresh"
                                fill
                                className="object-cover"
                            />
                            <div
                                className="absolute inset-0"
                                style={{ background: `linear-gradient(135deg, transparent 50%, ${THEME.colors.bg.secondary})` }}
                            />
                        </div>

                        {/* Decorative Border */}
                        <motion.div
                            className="absolute -inset-3 border hidden sm:block"
                            style={{ borderColor: THEME.colors.accent.mint }}
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 0.25 } : {}}
                            transition={{ delay: 0.3 }}
                        />
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="order-1 lg:order-2"
                    >
                        <span
                            className="mb-3 inline-block text-[0.5rem] uppercase tracking-[0.4em]"
                            style={{ color: THEME.colors.accent.aqua }}
                        >
                            The Riviera
                        </span>
                        <h2
                            className="mb-5 text-[1.8rem] sm:text-[2.5rem] font-extralight leading-tight"
                            style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                        >
                            Mediterranean{" "}
                            <span style={{ color: THEME.colors.accent.mint, fontStyle: "italic" }}>Soul</span>
                        </h2>

                        <div className="space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: THEME.colors.text.secondary }}>
                            <p>
                                The Italian Riviera at dawn—when bergamot groves meet the Tyrrhenian Sea.
                                Our Fresh collection captures that magic moment when the air is{" "}
                                <span style={{ color: THEME.colors.accent.aqua }}>pure and endless</span>.
                            </p>
                            <p className="hidden sm:block">
                                We source our bergamot from Calabria, neroli from Tunisia, and marine
                                accords that evoke the crystalline waters of Portofino.
                            </p>
                            <p style={{ color: THEME.colors.accent.sky, fontStyle: "italic" }}>
                                &ldquo;Perfect for warm days, office wear, or whenever you need that burst of clean energy.&rdquo;
                            </p>
                        </div>

                        {/* Decorative Line */}
                        <motion.div
                            className="mt-6 h-px w-24"
                            style={{ background: `linear-gradient(90deg, ${THEME.colors.accent.aqua}, transparent)` }}
                            initial={{ scaleX: 0 }}
                            animate={isInView ? { scaleX: 1 } : {}}
                            transition={{ delay: 0.6, duration: 0.8 }}
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

function FragranceCard({ fragrance, index }: { fragrance: typeof FRESH_FRAGRANCES[0]; index: number }) {
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

                    {/* Aqua Glow */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `radial-gradient(circle at center, rgba(${THEME.colors.accent.aquaRgb}, 0.12), transparent 70%)`,
                        }}
                    />

                    {/* Brand Badge */}
                    <div className="absolute left-3 top-3">
                        <span
                            className="px-2.5 py-1 text-[0.5rem] font-semibold uppercase tracking-wider"
                            style={{
                                background: `linear-gradient(135deg, ${THEME.colors.accent.aqua}, ${THEME.colors.accent.mint})`,
                                color: THEME.colors.bg.primary,
                            }}
                        >
                            {fragrance.brand}
                        </span>
                    </div>

                    {/* Rating */}
                    <div className="absolute right-3 top-3 flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: "rgba(0,0,0,0.5)" }}>
                        <span style={{ color: THEME.colors.accent.mint }}>★</span>
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
                            style={{ color: THEME.colors.accent.aqua, fontFamily: "'Playfair Display', serif" }}
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
                                    color: THEME.colors.accent.mint,
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
                                            <span className="block text-[0.5rem] uppercase tracking-wider mb-1" style={{ color: THEME.colors.accent.sky }}>Top</span>
                                            {fragrance.notes.top.map(n => (
                                                <span key={n} className="block text-[0.55rem]" style={{ color: THEME.colors.text.secondary }}>{n}</span>
                                            ))}
                                        </div>
                                        <div className="p-2 rounded-sm" style={{ background: THEME.colors.bg.primary }}>
                                            <span className="block text-[0.5rem] uppercase tracking-wider mb-1" style={{ color: THEME.colors.accent.aqua }}>Heart</span>
                                            {fragrance.notes.heart.map(n => (
                                                <span key={n} className="block text-[0.55rem]" style={{ color: THEME.colors.text.secondary }}>{n}</span>
                                            ))}
                                        </div>
                                        <div className="p-2 rounded-sm" style={{ background: THEME.colors.bg.primary }}>
                                            <span className="block text-[0.5rem] uppercase tracking-wider mb-1" style={{ color: THEME.colors.accent.mint }}>Base</span>
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
                                color: THEME.colors.accent.aqua,
                            }}
                        >
                            {expanded ? "Less" : "More Info"}
                        </button>
                        <button
                            onClick={handleWishlist}
                            className="h-10 w-10 flex items-center justify-center rounded-sm transition-all"
                            style={{
                                background: isWishlisted ? THEME.colors.accent.aqua : THEME.colors.bg.primary,
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
                                background: addedToCart ? THEME.colors.accent.mint : THEME.colors.accent.aqua,
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
    const isInView = useInView(ref, { once: true, margin: "-5%" });

    return (
        <section ref={ref} className="relative py-16 sm:py-24" style={{ background: THEME.colors.bg.primary }}>
            <WaterDroplets />

            <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    className="mb-10 sm:mb-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="mb-4 h-px mx-auto w-16"
                        style={{ background: `linear-gradient(90deg, transparent, ${THEME.colors.accent.aqua}, transparent)` }}
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    />
                    <span className="text-[0.5rem] uppercase tracking-[0.4em]" style={{ color: THEME.colors.accent.sky }}>
                        ✦ The Collection ✦
                    </span>
                    <h2
                        className="mt-3 text-[1.6rem] sm:text-[2.5rem] font-extralight"
                        style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                    >
                        Discover{" "}
                        <span style={{ color: THEME.colors.accent.aqua, fontStyle: "italic" }}>Fresh Escapes</span>
                    </h2>
                    <p className="mt-2 mx-auto max-w-sm text-xs sm:text-sm" style={{ color: THEME.colors.text.muted }}>
                        Sun-kissed citrus and crystalline waters from the Mediterranean coast
                    </p>
                </motion.div>

                {/* Grid - 3 columns on desktop */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {FRESH_FRAGRANCES.map((fragrance, i) => (
                        <FragranceCard key={fragrance.id} fragrance={fragrance} index={i} />
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 }}
                >
                    <Link
                        href="/demos/velvet-perfumes/fragrances"
                        className="inline-flex items-center gap-3 px-8 py-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] transition-all hover:gap-5"
                        style={{ border: `1px solid ${THEME.colors.border.subtle}`, color: THEME.colors.accent.aqua }}
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

export default function FreshCollectionPage() {
    return (
        <main className="relative" style={{ background: THEME.colors.bg.primary }}>
            {/* Navbar - Compact on mobile */}
            <header
                className="fixed inset-x-0 top-0 z-50"
                style={{ background: `${THEME.colors.bg.primary}e5`, backdropFilter: "blur(16px)" }}
            >
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
                    <Link href="/demos/velvet-perfumes">
                        <span
                            className="text-lg sm:text-xl font-extralight tracking-[0.25em]"
                            style={{ fontFamily: "'Playfair Display', serif", color: THEME.colors.text.primary }}
                        >
                            VELVET
                        </span>
                    </Link>
                    <nav className="flex items-center gap-5 sm:gap-8">
                        <Link
                            href="/demos/velvet-perfumes/collections"
                            className="text-[0.6rem] uppercase tracking-[0.15em]"
                            style={{ color: THEME.colors.text.secondary }}
                        >
                            Collections
                        </Link>
                        <Link
                            href="/demos/velvet-perfumes/fragrances"
                            className="text-[0.6rem] uppercase tracking-[0.15em] hidden sm:block"
                            style={{ color: THEME.colors.text.secondary }}
                        >
                            All
                        </Link>
                    </nav>
                </div>
            </header>

            <HeroSection />
            <StorySection />
            <FragrancesSection />

            {/* Footer - Compact */}
            <footer className="relative z-10 py-10 sm:py-14" style={{ background: THEME.colors.bg.secondary, borderTop: `1px solid ${THEME.colors.border.subtle}` }}>
                <div className="mx-auto max-w-6xl px-4 text-center">
                    <span className="text-2xl" style={{ color: THEME.colors.accent.aqua }}>🌊</span>
                    <Link href="/demos/velvet-perfumes">
                        <span
                            className="mt-4 block text-lg font-extralight tracking-[0.3em]"
                            style={{ fontFamily: "'Playfair Display', serif", color: THEME.colors.accent.aqua }}
                        >
                            VELVET
                        </span>
                    </Link>
                    <p className="mt-3 text-[0.6rem]" style={{ color: THEME.colors.text.muted }}>
                        © 2024 Velvet Perfumes
                    </p>
                </div>
            </footer>
        </main>
    );
}
