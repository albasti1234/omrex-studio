"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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

// Curated Floral Fragrances with matching images
const FLORAL_FRAGRANCES = [
    {
        id: "rosa-elegance",
        slug: "rosa-elegance",
        name: "Rosa Elegance",
        brandId: "dior",
        price: 185,
        image: "/images/velvet/floral-fragrances/rosa-elegance.png",
        description: "A timeless rose composition with Bulgarian rose absolute and May rose.",
        gender: "women" as const,
        rating: 4.8,
        reviews: 1234,
        isNew: true,
        isBestseller: true,
        ingredients: [
            { name: "Bulgarian Rose", percentage: 90, category: "heart" as const },
            { name: "May Rose", percentage: 85, category: "heart" as const },
            { name: "Peony", percentage: 70, category: "top" as const },
        ],
    },
    {
        id: "jasmine-dream",
        slug: "jasmine-dream",
        name: "Jasmine Dream",
        brandId: "chanel",
        price: 220,
        image: "/images/velvet/floral-fragrances/jasmine-dream.png",
        description: "Intoxicating jasmine from Grasse, wrapped in soft white musk.",
        gender: "women" as const,
        rating: 4.9,
        reviews: 2156,
        isNew: false,
        isBestseller: true,
        ingredients: [
            { name: "Jasmine", percentage: 95, category: "heart" as const },
            { name: "White Musk", percentage: 60, category: "base" as const },
            { name: "Orange Blossom", percentage: 50, category: "top" as const },
        ],
    },
    {
        id: "peony-blush",
        slug: "peony-blush",
        name: "Peony Blush",
        brandId: "dior",
        price: 165,
        image: "/images/velvet/floral-fragrances/peony-blush.png",
        description: "Fresh peony petals kissed by morning dew in a romantic garden.",
        gender: "women" as const,
        rating: 4.7,
        reviews: 987,
        isNew: true,
        isBestseller: false,
        ingredients: [
            { name: "Peony", percentage: 90, category: "heart" as const },
            { name: "Rose", percentage: 70, category: "heart" as const },
            { name: "Bergamot", percentage: 55, category: "top" as const },
        ],
    },
    {
        id: "lilac-garden",
        slug: "lilac-garden",
        name: "Lilac Garden",
        brandId: "jo-malone",
        price: 145,
        image: "/images/velvet/floral-fragrances/lilac-garden.png",
        description: "Purple lilacs blooming in an English garden at springtime.",
        gender: "women" as const,
        rating: 4.6,
        reviews: 654,
        isNew: false,
        isBestseller: false,
        ingredients: [
            { name: "Lilac", percentage: 85, category: "heart" as const },
            { name: "Violet Leaf", percentage: 60, category: "top" as const },
            { name: "Sandalwood", percentage: 50, category: "base" as const },
        ],
    },
    {
        id: "magnolia-white",
        slug: "magnolia-white",
        name: "Magnolia Blanc",
        brandId: "guerlain",
        price: 195,
        image: "/images/velvet/floral-fragrances/magnolia-white.png",
        description: "Pure white magnolia in its most elegant form, creamy and refined.",
        gender: "women" as const,
        rating: 4.8,
        reviews: 1123,
        isNew: false,
        isBestseller: true,
        ingredients: [
            { name: "Magnolia", percentage: 95, category: "heart" as const },
            { name: "Tuberose", percentage: 65, category: "heart" as const },
            { name: "Musk", percentage: 50, category: "base" as const },
        ],
    },
    {
        id: "orchid-luxury",
        slug: "orchid-luxury",
        name: "Orchid Luxe",
        brandId: "tom-ford",
        price: 285,
        image: "/images/velvet/floral-fragrances/orchid-luxury.png",
        description: "Exotic orchid petals wrapped in sensual vanilla and amber.",
        gender: "women" as const,
        rating: 4.9,
        reviews: 1876,
        isNew: true,
        isBestseller: true,
        ingredients: [
            { name: "Black Orchid", percentage: 90, category: "heart" as const },
            { name: "Vanilla", percentage: 75, category: "base" as const },
            { name: "Amber", percentage: 60, category: "base" as const },
        ],
    },
    {
        id: "tuberose-night",
        slug: "tuberose-night",
        name: "Tuberose Nuit",
        brandId: "byredo",
        price: 210,
        image: "/images/velvet/floral-fragrances/tuberose-night.png",
        description: "Heady tuberose that blooms at midnight, mysterious and seductive.",
        gender: "women" as const,
        rating: 4.7,
        reviews: 765,
        isNew: false,
        isBestseller: false,
        ingredients: [
            { name: "Tuberose", percentage: 95, category: "heart" as const },
            { name: "Jasmine", percentage: 70, category: "heart" as const },
            { name: "Musk", percentage: 55, category: "base" as const },
        ],
    },
    {
        id: "lily-fresh",
        slug: "lily-fresh",
        name: "Lily Valley",
        brandId: "dior",
        price: 155,
        image: "/images/velvet/floral-fragrances/lily-fresh.png",
        description: "Fresh lily of the valley, the fragrance of spring mornings.",
        gender: "women" as const,
        rating: 4.5,
        reviews: 543,
        isNew: false,
        isBestseller: false,
        ingredients: [
            { name: "Lily of the Valley", percentage: 90, category: "heart" as const },
            { name: "Green Leaves", percentage: 65, category: "top" as const },
            { name: "White Cedar", percentage: 45, category: "base" as const },
        ],
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
// FRAGRANCE CARD - Premium Floral Design
// =============================================================================

// Brand name mapping
const BRAND_NAMES: Record<string, string> = {
    "dior": "Dior",
    "chanel": "Chanel",
    "tom-ford": "Tom Ford",
    "jo-malone": "Jo Malone",
    "guerlain": "Guerlain",
    "byredo": "Byredo",
};

function FragranceCard({ fragrance, index }: { fragrance: typeof FLORAL_FRAGRANCES[0]; index: number }) {
    const [hovered, setHovered] = useState(false);
    const brandName = BRAND_NAMES[fragrance.brandId] || fragrance.brandId;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
        >
            <Link href={`/demos/velvet-perfumes/fragrances/${fragrance.slug}`}>
                <motion.div
                    className="group relative overflow-hidden rounded-xl"
                    style={{
                        background: `linear-gradient(145deg, ${THEME.colors.bg.tertiary}, ${THEME.colors.bg.secondary})`,
                        border: `1px solid ${THEME.colors.border.subtle}`
                    }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Image Container */}
                    <div
                        className="relative aspect-square overflow-hidden"
                        style={{
                            background: `radial-gradient(circle at 50% 50%, rgba(${THEME.colors.accent.roseRgb}, 0.08), ${THEME.colors.bg.secondary})`
                        }}
                    >
                        {/* Product Image */}
                        <motion.div
                            className="absolute inset-0"
                            animate={{ scale: hovered ? 1.08 : 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Image
                                src={fragrance.image}
                                alt={fragrance.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                            {/* Light overlay for text readability */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: `linear-gradient(to top, ${THEME.colors.bg.primary}80 0%, transparent 50%)`
                                }}
                            />
                        </motion.div>

                        {/* Rose Glow on Hover */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: `radial-gradient(ellipse at center, rgba(${THEME.colors.accent.roseRgb}, 0.2), transparent 70%)`
                            }}
                            animate={{ opacity: hovered ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                        />

                        {/* Badges */}
                        <div className="absolute left-3 top-3 flex gap-2">
                            {fragrance.isNew && (
                                <span
                                    className="px-2.5 py-1 text-[0.5rem] font-bold uppercase tracking-wider rounded-full"
                                    style={{
                                        background: `linear-gradient(135deg, ${THEME.colors.accent.rose}, ${THEME.colors.accent.petal})`,
                                        color: THEME.colors.bg.primary
                                    }}
                                >
                                    ✦ New
                                </span>
                            )}
                            {fragrance.isBestseller && !fragrance.isNew && (
                                <span
                                    className="px-2.5 py-1 text-[0.5rem] font-bold uppercase tracking-wider rounded-full"
                                    style={{
                                        background: THEME.colors.accent.gold,
                                        color: THEME.colors.bg.primary
                                    }}
                                >
                                    ★ Best
                                </span>
                            )}
                        </div>

                        {/* Floating Info on Hover */}
                        <motion.div
                            className="absolute bottom-3 left-3 right-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex flex-wrap gap-1">
                                {fragrance.ingredients.slice(0, 2).map(ing => (
                                    <span
                                        key={ing.name}
                                        className="px-2 py-0.5 text-[0.45rem] uppercase tracking-wider backdrop-blur-sm rounded-full"
                                        style={{
                                            background: 'rgba(255,255,255,0.1)',
                                            color: THEME.colors.accent.petal,
                                            border: `1px solid rgba(${THEME.colors.accent.roseRgb}, 0.3)`
                                        }}
                                    >
                                        {ing.name}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Info Section */}
                    <div className="p-4">
                        {/* Brand */}
                        <span
                            className="text-[0.5rem] font-medium uppercase tracking-[0.2em]"
                            style={{ color: THEME.colors.accent.blush }}
                        >
                            {brandName}
                        </span>

                        {/* Name */}
                        <h3
                            className="mt-1 text-base font-light leading-tight"
                            style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                        >
                            {fragrance.name}
                        </h3>

                        {/* Price & Rating Row */}
                        <div className="mt-3 flex items-center justify-between">
                            <span
                                className="text-lg font-light"
                                style={{ color: THEME.colors.accent.rose, fontFamily: "'Playfair Display', serif" }}
                            >
                                ${fragrance.price}
                            </span>
                            <div className="flex items-center gap-1">
                                <span style={{ color: THEME.colors.accent.petal }}>★</span>
                                <span className="text-xs" style={{ color: THEME.colors.text.muted }}>
                                    {fragrance.rating}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Hover Border Glow */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none rounded-xl"
                        style={{
                            border: `1px solid ${THEME.colors.accent.rose}`,
                            boxShadow: `0 0 20px rgba(${THEME.colors.accent.roseRgb}, 0.3)`
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.div>
            </Link>
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

                {/* Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
