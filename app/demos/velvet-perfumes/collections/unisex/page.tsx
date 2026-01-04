"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// =============================================================================
// THEME - Modern Unisex Gold/Silver
// =============================================================================

const THEME = {
    colors: {
        bg: { primary: "#070709", secondary: "#0b0b0f", tertiary: "#111115" },
        accent: {
            gold: "#d4a853",
            goldRgb: "212, 168, 83",
            silver: "#c0c0c0",
            platinum: "#e8e8e8",
        },
        text: { primary: "#fafafa", secondary: "#a0a0a0", muted: "#707070" },
        border: { subtle: "rgba(212,168,83,0.12)", hover: "rgba(212,168,83,0.4)" },
    },
} as const;

// =============================================================================
// CURATED UNISEX FRAGRANCES - With full data
// =============================================================================

const UNISEX_FRAGRANCES = [
    {
        id: "santal-royal",
        name: "Santal Royal",
        brand: "Guerlain",
        price: 285,
        rating: 4.9,
        reviews: 1543,
        year: 2020,
        concentration: "Eau de Parfum",
        longevity: "10+ hours",
        sillage: "Strong",
        image: "/images/velvet/unisex-fragrances/santal-royal.png",
        description: "Mysore sandalwood meets rose and incense. Regal and genderless elegance.",
        notes: { top: ["Bergamot", "Cinnamon"], heart: ["Sandalwood", "Rose", "Incense"], base: ["Musk", "Leather", "Amber"] },
        story: "The royal sandalwood plantations of Karnataka.",
        isNew: true,
        isBestseller: true,
    },
    {
        id: "leather-woods",
        name: "Leather & Woods",
        brand: "Le Labo",
        price: 265,
        rating: 4.8,
        reviews: 1876,
        year: 2018,
        concentration: "Eau de Parfum",
        longevity: "8-10 hours",
        sillage: "Moderate",
        image: "/images/velvet/unisex-fragrances/leather-woods.png",
        description: "Soft leather wrapped in cedar and vetiver. Urban sophistication.",
        notes: { top: ["Cardamom", "Pink Pepper"], heart: ["Leather", "Cedar"], base: ["Vetiver", "Musk", "Guaiac Wood"] },
        story: "A designer's studio in SoHo at midnight.",
        isNew: false,
        isBestseller: true,
    },
    {
        id: "oud-vetiver",
        name: "Oud & Vetiver",
        brand: "Byredo",
        price: 295,
        rating: 4.7,
        reviews: 1234,
        year: 2021,
        concentration: "Eau de Parfum",
        longevity: "10+ hours",
        sillage: "Strong",
        image: "/images/velvet/unisex-fragrances/oud-vetiver.png",
        description: "Smoky oud meets earthy vetiver. Raw and refined simultaneously.",
        notes: { top: ["Pepper", "Violet Leaf"], heart: ["Oud", "Rose"], base: ["Vetiver", "Smoky Accord", "Musk"] },
        story: "The ancient oud traders of the Arabian Peninsula.",
        isNew: false,
        isBestseller: false,
    },
    {
        id: "amber-elemi",
        name: "Amber & Elemi",
        brand: "Diptyque",
        price: 175,
        rating: 4.6,
        reviews: 987,
        year: 2019,
        concentration: "Eau de Toilette",
        longevity: "6-8 hours",
        sillage: "Moderate",
        image: "/images/velvet/unisex-fragrances/amber-elemi.png",
        description: "Resinous elemi and warm amber. A cocooning embrace.",
        notes: { top: ["Elemi", "Citrus"], heart: ["Amber", "Benzoin"], base: ["Vanilla", "Sandalwood", "Musk"] },
        story: "Candlelit evenings at the Palais Royal.",
        isNew: true,
        isBestseller: false,
    },
    {
        id: "iris-powder",
        name: "Iris Absolue",
        brand: "Aesop",
        price: 225,
        rating: 4.8,
        reviews: 1123,
        year: 2022,
        concentration: "Parfum",
        longevity: "12+ hours",
        sillage: "Moderate",
        image: "/images/velvet/unisex-fragrances/iris-powder.png",
        description: "Powdery iris root with violet and earth. Understated luxury.",
        notes: { top: ["Violet", "Grapefruit"], heart: ["Iris Root", "Rose"], base: ["Suede", "Sandalwood", "Musk"] },
        story: "The iris fields of Tuscany at sunset.",
        isNew: false,
        isBestseller: true,
    },
    {
        id: "tobacco-woods",
        name: "Tobacco Rouge",
        brand: "Mancera",
        price: 195,
        rating: 4.7,
        reviews: 876,
        year: 2020,
        concentration: "Eau de Parfum",
        longevity: "10+ hours",
        sillage: "Strong",
        image: "/images/velvet/unisex-fragrances/tobacco-woods.png",
        description: "Sweet tobacco leaf with spices and honey. Addictively warm.",
        notes: { top: ["Cinnamon", "Saffron"], heart: ["Tobacco", "Honey"], base: ["Vanilla", "Oud", "Amber"] },
        story: "A private cigar lounge in Havana.",
        isNew: false,
        isBestseller: false,
    },
    {
        id: "black-oud",
        name: "Black Oud",
        brand: "Montale",
        price: 165,
        rating: 4.5,
        reviews: 765,
        year: 2019,
        concentration: "Eau de Parfum",
        longevity: "12+ hours",
        sillage: "Strong",
        image: "/images/velvet/unisex-fragrances/black-oud.png",
        description: "Intense black oud with rose and patchouli. Dark and powerful.",
        notes: { top: ["Rose", "Mandarin"], heart: ["Agarwood", "Patchouli"], base: ["Musk", "Amber", "Leather"] },
        story: "The mysterious souks of Dubai at night.",
        isNew: true,
        isBestseller: false,
    },
];

// =============================================================================
// GEOMETRIC PARTICLES - Reduced for mobile
// =============================================================================

function GeometricParticles() {
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number; shape: string }>>([]);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        const shapes = ["◇", "○", "△", "□"];
        setParticles(
            Array.from({ length: isMobile ? 15 : 25 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 10 + 8,
                delay: Math.random() * 10,
                shape: shapes[Math.floor(Math.random() * shapes.length)],
            }))
        );
    }, []);

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    className="absolute flex items-center justify-center"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        fontSize: p.size,
                        color: p.id % 2 === 0 ? THEME.colors.accent.gold : THEME.colors.accent.silver,
                        opacity: 0.12,
                    }}
                    animate={{
                        y: [0, -25, 0],
                        rotate: [0, 180, 360],
                        opacity: [0.08, 0.2, 0.08],
                    }}
                    transition={{
                        duration: 8 + Math.random() * 4,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    {p.shape}
                </motion.div>
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
                    src="/images/velvet/collections/unisex.jpg"
                    alt="Unisex Icons Collection"
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

            {/* Geometric Particles */}
            <GeometricParticles />

            {/* Gold Glow */}
            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(ellipse at 50% 60%, rgba(${THEME.colors.accent.goldRgb}, 0.08), transparent 60%)`,
                }}
            />

            {/* Content */}
            <motion.div
                className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center"
                style={{ opacity }}
            >
                {/* Decorative Lines */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="mb-5 flex items-center gap-4"
                >
                    <span className="h-px w-12 sm:w-16" style={{ background: `linear-gradient(90deg, transparent, ${THEME.colors.accent.gold})` }} />
                    <span className="text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.4em] sm:tracking-[0.5em]" style={{ color: THEME.colors.accent.gold }}>
                        Beyond Boundaries
                    </span>
                    <span className="h-px w-12 sm:w-16" style={{ background: `linear-gradient(90deg, ${THEME.colors.accent.gold}, transparent)` }} />
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
                            textShadow: `0 0 40px rgba(${THEME.colors.accent.goldRgb}, 0.3)`,
                        }}
                    >
                        UNISEX
                    </span>
                    <span
                        className="mt-2 block text-[1.2rem] sm:text-[1.5rem] font-light italic tracking-[0.25em]"
                        style={{ color: THEME.colors.accent.gold, fontFamily: "'Playfair Display', serif" }}
                    >
                        Icons
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
                    Pure essence knows no gender. Bold yet elegant, powerful yet refined. For those who define themselves.
                </motion.p>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="mt-8 flex gap-8 sm:gap-14"
                >
                    {[
                        { value: "7", label: "Icons" },
                        { value: "∀", label: "For All" },
                        { value: "⚤", label: "Unisex" },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <span
                                className="block text-xl sm:text-2xl font-light"
                                style={{ color: THEME.colors.accent.gold, fontFamily: "'Playfair Display', serif" }}
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
                            Define
                        </span>
                        <motion.div
                            className="h-10 w-px"
                            style={{ background: `linear-gradient(to bottom, ${THEME.colors.accent.gold}, transparent)` }}
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
            <GeometricParticles />

            <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
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
                                src="/images/velvet/collections/unisex.jpg"
                                alt="Unisex Style"
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
                            style={{ borderColor: THEME.colors.accent.gold }}
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
                            style={{ color: THEME.colors.accent.gold }}
                        >
                            The Philosophy
                        </span>
                        <h2
                            className="mb-5 text-[1.8rem] sm:text-[2.5rem] font-extralight leading-tight"
                            style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                        >
                            Scent Has No{" "}
                            <span style={{ color: THEME.colors.accent.gold, fontStyle: "italic" }}>Gender</span>
                        </h2>

                        <div className="space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: THEME.colors.text.secondary }}>
                            <p>
                                The modern fragrance lover doesn&apos;t conform to outdated distinctions.
                                Each composition balances{" "}
                                <span style={{ color: THEME.colors.accent.gold }}>oud with rose, leather with jasmine</span>.
                            </p>
                            <p className="hidden sm:block">
                                Our Unisex Icons collection celebrates this freedom—bold yet elegant,
                                powerful yet refined.
                            </p>
                            <p style={{ color: THEME.colors.accent.platinum, fontStyle: "italic" }}>
                                &ldquo;Wear them as you are. These are fragrances for humans.&rdquo;
                            </p>
                        </div>

                        {/* Decorative Line */}
                        <motion.div
                            className="mt-6 h-px w-24"
                            style={{ background: `linear-gradient(90deg, ${THEME.colors.accent.gold}, transparent)` }}
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

function FragranceCard({ fragrance, index }: { fragrance: typeof UNISEX_FRAGRANCES[0]; index: number }) {
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

                    {/* Gold Glow */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `radial-gradient(circle at center, rgba(${THEME.colors.accent.goldRgb}, 0.1), transparent 70%)`,
                        }}
                    />

                    {/* Brand Badge */}
                    <div className="absolute left-3 top-3">
                        <span
                            className="px-2.5 py-1 text-[0.5rem] font-semibold uppercase tracking-wider"
                            style={{
                                background: THEME.colors.accent.gold,
                                color: THEME.colors.bg.primary,
                            }}
                        >
                            {fragrance.brand}
                        </span>
                    </div>

                    {/* Rating */}
                    <div className="absolute right-3 top-3 flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: "rgba(0,0,0,0.5)" }}>
                        <span style={{ color: THEME.colors.accent.gold }}>★</span>
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
                            style={{ color: THEME.colors.accent.gold, fontFamily: "'Playfair Display', serif" }}
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
                                    color: THEME.colors.accent.silver,
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
                                            <span className="block text-[0.5rem] uppercase tracking-wider mb-1" style={{ color: THEME.colors.accent.silver }}>Top</span>
                                            {fragrance.notes.top.map(n => (
                                                <span key={n} className="block text-[0.55rem]" style={{ color: THEME.colors.text.secondary }}>{n}</span>
                                            ))}
                                        </div>
                                        <div className="p-2 rounded-sm" style={{ background: THEME.colors.bg.primary }}>
                                            <span className="block text-[0.5rem] uppercase tracking-wider mb-1" style={{ color: THEME.colors.accent.gold }}>Heart</span>
                                            {fragrance.notes.heart.map(n => (
                                                <span key={n} className="block text-[0.55rem]" style={{ color: THEME.colors.text.secondary }}>{n}</span>
                                            ))}
                                        </div>
                                        <div className="p-2 rounded-sm" style={{ background: THEME.colors.bg.primary }}>
                                            <span className="block text-[0.5rem] uppercase tracking-wider mb-1" style={{ color: THEME.colors.accent.platinum }}>Base</span>
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
                                color: THEME.colors.accent.gold,
                            }}
                        >
                            {expanded ? "Less" : "More Info"}
                        </button>
                        <button
                            onClick={handleWishlist}
                            className="h-10 w-10 flex items-center justify-center rounded-sm transition-all"
                            style={{
                                background: isWishlisted ? THEME.colors.accent.gold : THEME.colors.bg.primary,
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
                                background: addedToCart ? THEME.colors.accent.silver : THEME.colors.accent.gold,
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
            <GeometricParticles />

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
                        style={{ background: `linear-gradient(90deg, transparent, ${THEME.colors.accent.gold}, transparent)` }}
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    />
                    <span className="text-[0.5rem] uppercase tracking-[0.4em]" style={{ color: THEME.colors.accent.silver }}>
                        ✦ The Collection ✦
                    </span>
                    <h2
                        className="mt-3 text-[1.6rem] sm:text-[2.5rem] font-extralight"
                        style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                    >
                        Discover{" "}
                        <span style={{ color: THEME.colors.accent.gold, fontStyle: "italic" }}>Timeless Icons</span>
                    </h2>
                    <p className="mt-2 mx-auto max-w-sm text-xs sm:text-sm" style={{ color: THEME.colors.text.muted }}>
                        Compositions that transcend boundaries—for those who define themselves
                    </p>
                </motion.div>

                {/* Grid - 3 columns on desktop */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {UNISEX_FRAGRANCES.map((fragrance, i) => (
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
                        style={{ border: `1px solid ${THEME.colors.border.subtle}`, color: THEME.colors.accent.gold }}
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

export default function UnisexCollectionPage() {
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
                    <span className="text-2xl">⚤</span>
                    <Link href="/demos/velvet-perfumes">
                        <span
                            className="mt-4 block text-lg font-extralight tracking-[0.3em]"
                            style={{ fontFamily: "'Playfair Display', serif", color: THEME.colors.accent.gold }}
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
