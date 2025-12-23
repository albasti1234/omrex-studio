"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// =============================================================================
// THEME - Deep Oud Mystical Luxury
// =============================================================================

const THEME = {
    colors: {
        bg: { primary: "#030201", secondary: "#080604", tertiary: "#0d0a08" },
        accent: {
            gold: "#d4a853",
            goldRgb: "212, 168, 83",
            oud: "#8b4513",
            oudRgb: "139, 69, 19",
            amber: "#cf9f5d",
            rose: "#b76e79",
        },
        text: { primary: "#faf8f5", secondary: "#b5a89a", muted: "#7a6e5d" },
        border: { subtle: "rgba(139,69,19,0.15)", hover: "rgba(212,168,83,0.5)" },
    },
} as const;

// Famous Oud Fragrances Data
const OUD_FRAGRANCES = [
    {
        id: "tf-oud-wood",
        name: "Oud Wood",
        brand: "Tom Ford",
        price: 290,
        rating: 4.9,
        reviews: 3847,
        year: 2007,
        concentration: "Eau de Parfum",
        longevity: "10+ hours",
        sillage: "Strong",
        image: "/images/velvet/oud/oud-wood-bottle.png",
        description: "A composition of exotic oud, sandalwood, and rare rosewood. Warm and sensual with smoky spices.",
        notes: { top: ["Cardamom", "Chinese Pepper"], heart: ["Oud", "Rosewood"], base: ["Sandalwood", "Vetiver", "Tonka"] },
        story: "The fragrance that introduced oud to the Western world.",
    },
    {
        id: "creed-royal-oud",
        name: "Royal Oud",
        brand: "Creed",
        price: 445,
        rating: 4.8,
        reviews: 2156,
        year: 2011,
        concentration: "Eau de Parfum",
        longevity: "8-10 hours",
        sillage: "Moderate",
        image: "/images/velvet/oud/royal-oud.png",
        description: "A majestic blend of oud and Galbanum, enriched with pink pepper. Woody and regal.",
        notes: { top: ["Pink Pepper", "Lemon"], heart: ["Oud", "Galbanum", "Cedar"], base: ["Sandalwood", "Musk"] },
        story: "Created for royalty, embodying Arabian nobility.",
    },
    {
        id: "dior-oud-ispahan",
        name: "Oud Ispahan",
        brand: "Dior",
        price: 310,
        rating: 4.8,
        reviews: 1923,
        year: 2012,
        concentration: "Eau de Parfum",
        longevity: "8-12 hours",
        sillage: "Strong",
        image: "/images/velvet/oud/oud-ispahan-bottle.png",
        description: "The legendary Damask rose of Ispahan meets precious oud. Oriental rose of exceptional depth.",
        notes: { top: ["Saffron", "Rose"], heart: ["Oud", "Labdanum"], base: ["Amber", "Sandalwood"] },
        story: "Named after the historic Persian city.",
    },
    {
        id: "mfk-oud-satin",
        name: "Oud Satin Mood",
        brand: "MFK",
        price: 395,
        rating: 4.9,
        reviews: 2847,
        year: 2018,
        concentration: "Eau de Parfum",
        longevity: "10+ hours",
        sillage: "Moderate",
        image: "/images/velvet/oud/oud-satin-bottle.png",
        description: "A velvety blend of oud and Bulgarian rose, wrapped in violet and vanilla. Pure opulence.",
        notes: { top: ["Violet"], heart: ["Oud", "Bulgarian Rose"], base: ["Vanilla", "Benzoin"] },
        story: "Francis Kurkdjian's interpretation of oud as silk.",
    },
    {
        id: "armani-oud-royal",
        name: "Oud Royal",
        brand: "Armani Privé",
        price: 350,
        rating: 4.7,
        reviews: 1654,
        year: 2014,
        concentration: "EDP Intense",
        longevity: "12+ hours",
        sillage: "Beast Mode",
        image: "/images/velvet/oud/oud-velvet-bottle.png",
        description: "Pure oud intensity with saffron and myrrh. An opulent Arabian journey.",
        notes: { top: ["Saffron", "Cardamom"], heart: ["Oud", "Rose"], base: ["Myrrh", "Amber"] },
        story: "Giorgio Armani's tribute to the Middle East.",
    },
    {
        id: "arabian-elixir",
        name: "Oud Elixir",
        brand: "Arabian",
        price: 580,
        rating: 5.0,
        reviews: 892,
        year: 2020,
        concentration: "Parfum Extrait",
        longevity: "24+ hours",
        sillage: "Nuclear",
        image: "/images/velvet/oud/oud-elixir-bottle.png",
        description: "The purest form of oud. Aged 100-year Cambodian oud oil with ambergris.",
        notes: { top: ["Cambodian Oud"], heart: ["Aged Oud Oil"], base: ["Ambergris", "Sandalwood"] },
        story: "A collector's masterpiece—liquid gold.",
    },
];

// =============================================================================
// FLOATING INCENSE SMOKE (Reduced for mobile performance)
// =============================================================================

function IncenseSmoke() {
    const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number; size: number }>>([]);

    useEffect(() => {
        // Fewer particles on mobile for better performance
        const isMobile = window.innerWidth < 768;
        setParticles(
            Array.from({ length: isMobile ? 15 : 30 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                delay: Math.random() * 15,
                size: Math.random() * 120 + 60,
            }))
        );
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    className="absolute"
                    style={{
                        left: `${p.x}%`,
                        bottom: 0,
                        width: p.size,
                        height: p.size * 2.5,
                        background: `radial-gradient(ellipse at center bottom, rgba(${THEME.colors.accent.oudRgb}, 0.05), transparent 70%)`,
                        filter: "blur(30px)",
                    }}
                    animate={{
                        y: [0, -500],
                        opacity: [0, 0.3, 0],
                    }}
                    transition={{
                        duration: 18 + Math.random() * 8,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "easeOut",
                    }}
                />
            ))}
        </div>
    );
}

// =============================================================================
// GOLDEN DUST (Reduced for mobile)
// =============================================================================

function GoldenDust() {
    const [dust, setDust] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        setDust(
            Array.from({ length: isMobile ? 20 : 40 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 2.5 + 1,
                delay: Math.random() * 8,
            }))
        );
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            {dust.map(d => (
                <motion.div
                    key={d.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${d.x}%`,
                        top: `${d.y}%`,
                        width: d.size,
                        height: d.size,
                        background: THEME.colors.accent.gold,
                        boxShadow: `0 0 ${d.size * 2}px ${THEME.colors.accent.gold}`,
                    }}
                    animate={{
                        y: [0, -80, 0],
                        opacity: [0.1, 0.5, 0.1],
                    }}
                    transition={{
                        duration: 6 + Math.random() * 4,
                        delay: d.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
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
            {/* Background Image with Parallax */}
            <motion.div className="absolute inset-0" style={{ scale }}>
                <Image
                    src="/images/velvet/collections/oud.jpg"
                    alt="Oud Collection"
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

            {/* Ambient Golden Glow */}
            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(ellipse at 50% 40%, rgba(${THEME.colors.accent.goldRgb}, 0.1), transparent 60%)`,
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
                    style={{ background: `linear-gradient(90deg, transparent, ${THEME.colors.accent.gold}, transparent)` }}
                />

                {/* Pre-title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mb-3"
                >
                    <span className="text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.4em] sm:tracking-[0.5em]" style={{ color: THEME.colors.accent.amber }}>
                        ✦ Liquid Gold ✦
                    </span>
                </motion.div>

                {/* Main Title - BIGGER on mobile */}
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
                        OUD
                    </span>
                    <span
                        className="mt-2 block text-[1.2rem] sm:text-[1.5rem] font-light italic tracking-[0.25em]"
                        style={{ color: THEME.colors.accent.gold, fontFamily: "'Playfair Display', serif" }}
                    >
                        Collection
                    </span>
                </motion.h1>

                {/* Description - Shorter for mobile */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="max-w-sm sm:max-w-lg text-sm sm:text-base leading-relaxed px-4"
                    style={{ color: THEME.colors.text.secondary }}
                >
                    Ancient forests whisper secrets. Rare agarwood transforms into liquid gold.
                </motion.p>

                {/* Stats - Horizontal scroll on mobile */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="mt-8 flex gap-8 sm:gap-14"
                >
                    {[
                        { value: "$40K", label: "/Kg Oud" },
                        { value: "100+", label: "Years" },
                        { value: "6", label: "Icons" },
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
                            Scroll
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
            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(ellipse at 30% 50%, rgba(${THEME.colors.accent.oudRgb}, 0.06), transparent 60%)`,
                }}
            />

            <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
                {/* Mobile: Stack, Desktop: Grid */}
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">
                    {/* Image with Decorative Frame */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="relative order-2 lg:order-1"
                    >
                        <div className="relative aspect-[4/3] sm:aspect-[3/4] overflow-hidden">
                            <Image
                                src="/images/velvet/collections/oud.jpg"
                                alt="Ancient Oud Forests"
                                fill
                                className="object-cover"
                            />
                            <div
                                className="absolute inset-0"
                                style={{ background: `linear-gradient(135deg, transparent 50%, ${THEME.colors.bg.secondary})` }}
                            />
                        </div>

                        {/* Decorative Golden Frame - Hidden on very small screens */}
                        <motion.div
                            className="absolute -inset-3 border hidden sm:block"
                            style={{ borderColor: THEME.colors.accent.gold }}
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 0.25 } : {}}
                            transition={{ delay: 0.3 }}
                        />
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="order-1 lg:order-2"
                    >
                        <span
                            className="mb-3 inline-block text-[0.5rem] uppercase tracking-[0.4em]"
                            style={{ color: THEME.colors.accent.oud }}
                        >
                            The Legend
                        </span>
                        <h2
                            className="mb-5 text-[1.8rem] sm:text-[2.5rem] font-extralight leading-tight"
                            style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                        >
                            Born from{" "}
                            <span style={{ color: THEME.colors.accent.gold, fontStyle: "italic" }}>Suffering</span>
                            <br className="hidden sm:block" />
                            <span className="sm:hidden">, </span>
                            Transformed into{" "}
                            <span style={{ color: THEME.colors.accent.amber, fontStyle: "italic" }}>Gold</span>
                        </h2>

                        <div className="space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: THEME.colors.text.secondary }}>
                            <p>
                                When the Aquilaria tree is wounded by a specific mold, it transforms.
                                What was ordinary wood becomes <span style={{ color: THEME.colors.accent.gold }}>agarwood</span>—one of Earth&apos;s most precious substances.
                            </p>
                            <p className="hidden sm:block">
                                For 3,000+ years, oud has been treasured—burned in Japanese temples,
                                diffused in Arabian palaces, worn by Chinese emperors.
                            </p>
                            <p style={{ color: THEME.colors.accent.amber, fontStyle: "italic" }}>
                                &ldquo;Oud is not just scent. It is history, emotion, spirituality.&rdquo;
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
// MOBILE-OPTIMIZED FRAGRANCE CARD
// =============================================================================

function MobileFragranceCard({ fragrance, index }: { fragrance: typeof OUD_FRAGRANCES[0]; index: number }) {
    const [expanded, setExpanded] = useState(false);

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
                {/* Image Section - Tappable area */}
                <div
                    className="relative aspect-square overflow-hidden"
                    style={{ background: THEME.colors.bg.primary }}
                    onClick={() => setExpanded(!expanded)}
                >
                    <Image
                        src={fragrance.image}
                        alt={fragrance.name}
                        fill
                        className="object-contain p-6"
                        sizes="(max-width: 640px) 100vw, 50vw"
                    />

                    {/* Golden Glow */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `radial-gradient(circle at center, rgba(${THEME.colors.accent.goldRgb}, 0.12), transparent 70%)`,
                        }}
                    />

                    {/* Brand Badge */}
                    <div className="absolute left-3 top-3">
                        <span
                            className="px-2.5 py-1 text-[0.5rem] font-semibold uppercase tracking-wider"
                            style={{
                                background: `linear-gradient(135deg, ${THEME.colors.accent.gold}, ${THEME.colors.accent.oud})`,
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

                    {/* Quick Stats - Always visible on mobile */}
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
                                    color: THEME.colors.accent.amber,
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
                                            <span className="block text-[0.5rem] uppercase tracking-wider mb-1" style={{ color: THEME.colors.accent.rose }}>Top</span>
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
                                            <span className="block text-[0.5rem] uppercase tracking-wider mb-1" style={{ color: THEME.colors.accent.oud }}>Base</span>
                                            {fragrance.notes.base.map(n => (
                                                <span key={n} className="block text-[0.55rem]" style={{ color: THEME.colors.text.secondary }}>{n}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Action Buttons - Always visible for touch */}
                    <div className="mt-4 flex items-center gap-2">
                        <button
                            onClick={() => setExpanded(!expanded)}
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
                            className="h-10 w-10 flex items-center justify-center rounded-sm"
                            style={{ background: THEME.colors.bg.primary, border: `1px solid ${THEME.colors.border.subtle}` }}
                        >
                            <span style={{ color: THEME.colors.text.muted }}>♡</span>
                        </button>
                        <button
                            className="flex-1 py-2.5 text-[0.6rem] uppercase tracking-wider rounded-sm font-medium"
                            style={{
                                background: THEME.colors.accent.gold,
                                color: THEME.colors.bg.primary,
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// =============================================================================
// FRAGRANCES SECTION - Mobile Grid
// =============================================================================

function FragrancesSection() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-5%" });

    return (
        <section ref={ref} className="relative py-16 sm:py-24" style={{ background: THEME.colors.bg.primary }}>
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
                    <span className="text-[0.5rem] uppercase tracking-[0.4em]" style={{ color: THEME.colors.accent.oud }}>
                        ✦ Masterpieces ✦
                    </span>
                    <h2
                        className="mt-3 text-[1.6rem] sm:text-[2.5rem] font-extralight"
                        style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                    >
                        World&apos;s Finest{" "}
                        <span style={{ color: THEME.colors.accent.gold, fontStyle: "italic" }}>Oud</span>
                    </h2>
                    <p className="mt-2 mx-auto max-w-sm text-xs sm:text-sm" style={{ color: THEME.colors.text.muted }}>
                        Legendary compositions from the world&apos;s top perfume houses
                    </p>
                </motion.div>

                {/* Grid - Single column on mobile, 2 on tablet, 3 on desktop */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {OUD_FRAGRANCES.map((fragrance, i) => (
                        <MobileFragranceCard key={fragrance.id} fragrance={fragrance} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function OudCollectionPage() {
    return (
        <main className="relative" style={{ background: THEME.colors.bg.primary }}>
            {/* Atmospheric Effects */}
            <IncenseSmoke />
            <GoldenDust />

            {/* Navbar - Smaller on mobile */}
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
                    <span className="text-2xl" style={{ color: THEME.colors.accent.gold }}>✦</span>
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
