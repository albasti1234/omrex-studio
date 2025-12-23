"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FRAGRANCES } from "../../_data/fragrances";
import { getAllBrands } from "../../_data/brands";

// =============================================================================
// THEME - Mysterious Oriental
// =============================================================================

const THEME = {
    colors: {
        bg: { primary: "#06040a", secondary: "#0a0710", tertiary: "#120d18" },
        accent: {
            purple: "#9932cc",
            purpleRgb: "153, 50, 204",
            violet: "#ba55d3",
            magenta: "#da70d6",
            gold: "#d4a853",
        },
        text: { primary: "#faf5ff", secondary: "#c4b5d0", muted: "#8b7a98" },
        border: { subtle: "rgba(153,50,204,0.15)", hover: "rgba(218,112,214,0.4)" },
    },
} as const;

// Get Oriental fragrances
const ORIENTAL_FRAGRANCES = FRAGRANCES.filter(f =>
    f.ingredients.some(i =>
        i.name.toLowerCase().includes("saffron") ||
        i.name.toLowerCase().includes("cardamom") ||
        i.name.toLowerCase().includes("incense") ||
        i.name.toLowerCase().includes("amber") ||
        i.name.toLowerCase().includes("vanilla") ||
        i.name.toLowerCase().includes("tonka")
    ) || f.temperature === "cold" && f.seasons.includes("winter")
).slice(0, 8);

// =============================================================================
// MYSTICAL STARS
// =============================================================================

function MysticalStars() {
    const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

    useEffect(() => {
        setStars(
            Array.from({ length: 50 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 3 + 1,
                delay: Math.random() * 5,
            }))
        );
    }, []);

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {stars.map(s => (
                <motion.div
                    key={s.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                        width: s.size,
                        height: s.size,
                        background: THEME.colors.accent.violet,
                        boxShadow: `0 0 ${s.size * 3}px ${THEME.colors.accent.purple}`,
                    }}
                    animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        delay: s.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}

// =============================================================================
// INCENSE SMOKE
// =============================================================================

function IncenseSmoke() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{
                        left: `${20 + i * 15}%`,
                        bottom: 0,
                        width: 200 + i * 50,
                        height: 400 + i * 100,
                        background: `radial-gradient(ellipse at center bottom, rgba(${THEME.colors.accent.purpleRgb}, ${0.08 - i * 0.01}), transparent 70%)`,
                        filter: "blur(40px)",
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, 30 + i * 10, 0],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 15 + i * 3,
                        delay: i * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
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
                    src="/images/velvet/collections/oriental.jpg"
                    alt="Oriental Nights Collection"
                    fill
                    className="object-cover"
                    priority
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(to bottom, 
                            ${THEME.colors.bg.primary}50 0%, 
                            ${THEME.colors.bg.primary}80 50%, 
                            ${THEME.colors.bg.primary} 100%
                        )`,
                    }}
                />
            </motion.div>

            {/* Mystical Stars */}
            <MysticalStars />

            {/* Incense Smoke */}
            <IncenseSmoke />

            {/* Purple Glow */}
            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(ellipse at 50% 70%, rgba(${THEME.colors.accent.purpleRgb}, 0.15), transparent 60%)`,
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
                    <span className="text-lg">✨</span>
                    <span className="text-[0.65rem] uppercase tracking-[0.5em]" style={{ color: THEME.colors.accent.magenta }}>
                        Mystery Unveiled
                    </span>
                    <span className="text-lg">🌙</span>
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
                        Oriental
                    </span>
                    <span
                        className="mt-2 block text-[2rem] font-extralight italic tracking-[0.15em] sm:text-[3rem] lg:text-[4rem]"
                        style={{ color: THEME.colors.accent.purple, fontFamily: "'Playfair Display', serif" }}
                    >
                        Nights
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
                    When spice markets close and incense fills the air. Persian saffron meets
                    Indian cardamom in compositions of warmth and mystery. For nights that never end.
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
                            Enter
                        </span>
                        <div className="h-12 w-px" style={{ background: `linear-gradient(to bottom, ${THEME.colors.accent.purple}, transparent)` }} />
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
            <MysticalStars />

            <div className="relative z-10 mx-auto max-w-6xl px-6">
                <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                    {/* Text First */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1 }}
                    >
                        <span
                            className="mb-4 inline-block text-[0.6rem] uppercase tracking-[0.4em]"
                            style={{ color: THEME.colors.accent.purple }}
                        >
                            The Spice Route
                        </span>
                        <h2
                            className="mb-6 text-[2rem] font-extralight leading-tight sm:text-[2.5rem]"
                            style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                        >
                            Tales of{" "}
                            <span style={{ color: THEME.colors.accent.violet, fontStyle: "italic" }}>1001 Nights</span>
                        </h2>
                        <div className="space-y-5 text-base leading-relaxed" style={{ color: THEME.colors.text.secondary }}>
                            <p>
                                The Oriental fragrance family traces its roots to the ancient Silk Road, where
                                caravans carried precious spices, resins, and balsams from East to West.
                            </p>
                            <p>
                                Our Oriental collection honors this heritage with compositions featuring
                                saffron from Iran, cardamom from Guatemala, and precious amber from the Baltic.
                            </p>
                            <p style={{ color: THEME.colors.accent.magenta }}>
                                Warm, sensual, and utterly captivating. These are fragrances for the bold
                                and the daring—for those who leave a lasting impression.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="mt-10 flex gap-12">
                            {[
                                { value: "10+", label: "Fragrances" },
                                { value: "1001", label: "Nights" },
                                { value: "∞", label: "Mystery" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                >
                                    <span
                                        className="block text-2xl font-light"
                                        style={{ color: THEME.colors.accent.purple, fontFamily: "'Playfair Display', serif" }}
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
                            src="/images/velvet/collections/oriental.jpg"
                            alt="Oriental Spices"
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
                            style={{ borderColor: THEME.colors.accent.violet }}
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
// FRAGRANCE CARD
// =============================================================================

function FragranceCard({ fragrance, index }: { fragrance: typeof ORIENTAL_FRAGRANCES[0]; index: number }) {
    const brand = getAllBrands().find(b => b.id === fragrance.brandId);
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            <Link href={`/demos/velvet-perfumes/fragrances/${fragrance.slug}`}>
                <motion.div
                    className="group relative overflow-hidden"
                    style={{ background: THEME.colors.bg.tertiary, border: `1px solid ${THEME.colors.border.subtle}` }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    whileHover={{ y: -8 }}
                >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden" style={{ background: THEME.colors.bg.secondary }}>
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            animate={{ scale: hovered ? 1.05 : 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {fragrance.image.endsWith(".png") ? (
                                <Image
                                    src={fragrance.image}
                                    alt={fragrance.name}
                                    fill
                                    className="object-contain p-6"
                                />
                            ) : (
                                <span
                                    className="text-[6rem] font-light opacity-20"
                                    style={{ fontFamily: "'Playfair Display', serif", color: THEME.colors.accent.purple }}
                                >
                                    {fragrance.name.charAt(0)}
                                </span>
                            )}
                        </motion.div>

                        {/* Purple Glow */}
                        <motion.div
                            className="absolute inset-0"
                            style={{ background: `radial-gradient(circle at center, rgba(${THEME.colors.accent.purpleRgb}, 0.15), transparent 60%)` }}
                            animate={{ opacity: hovered ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    {/* Info */}
                    <div className="p-5">
                        <span className="text-[0.55rem] uppercase tracking-[0.2em]" style={{ color: THEME.colors.accent.magenta }}>
                            {brand?.name}
                        </span>
                        <h3
                            className="mt-1 text-lg font-light"
                            style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                        >
                            {fragrance.name}
                        </h3>

                        {/* Key Notes */}
                        <div className="mt-3 flex flex-wrap gap-2">
                            {fragrance.ingredients.slice(0, 3).map(ing => (
                                <span
                                    key={ing.name}
                                    className="px-2 py-0.5 text-[0.5rem] uppercase tracking-wider"
                                    style={{ background: THEME.colors.bg.secondary, color: THEME.colors.text.muted }}
                                >
                                    {ing.name}
                                </span>
                            ))}
                        </div>

                        {/* Price & Rating */}
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-xl font-light" style={{ color: THEME.colors.accent.purple }}>
                                ${fragrance.price}
                            </span>
                            <div className="flex items-center gap-1">
                                <span style={{ color: THEME.colors.accent.violet }}>★</span>
                                <span className="text-sm" style={{ color: THEME.colors.text.muted }}>
                                    {fragrance.rating}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Hover Border */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{ border: `1px solid ${THEME.colors.border.hover}` }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hovered ? 1 : 0 }}
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
            <MysticalStars />
            <IncenseSmoke />

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                {/* Header */}
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                >
                    <span className="mb-4 inline-block text-[0.6rem] uppercase tracking-[0.4em]" style={{ color: THEME.colors.accent.purple }}>
                        ✦ The Collection ✦
                    </span>
                    <h2
                        className="text-[2rem] font-extralight sm:text-[2.5rem]"
                        style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                    >
                        Discover Our{" "}
                        <span style={{ color: THEME.colors.accent.violet, fontStyle: "italic" }}>Spiced Treasures</span>
                    </h2>
                </motion.div>

                {/* Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {ORIENTAL_FRAGRANCES.map((fragrance, i) => (
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
                        style={{ border: `1px solid ${THEME.colors.border.subtle}`, color: THEME.colors.accent.purple }}
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

export default function OrientalCollectionPage() {
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
                            style={{ fontFamily: "'Playfair Display', serif", color: THEME.colors.accent.purple }}
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
