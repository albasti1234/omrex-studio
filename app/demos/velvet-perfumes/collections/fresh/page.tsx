"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FRAGRANCES } from "../../_data/fragrances";
import { getAllBrands } from "../../_data/brands";

// =============================================================================
// THEME - Fresh Mediterranean
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

// Get Fresh fragrances
const FRESH_FRAGRANCES = FRAGRANCES.filter(f =>
    f.ingredients.some(i =>
        i.name.toLowerCase().includes("bergamot") ||
        i.name.toLowerCase().includes("citrus") ||
        i.name.toLowerCase().includes("neroli") ||
        i.name.toLowerCase().includes("marine") ||
        i.name.toLowerCase().includes("lemon") ||
        i.name.toLowerCase().includes("grapefruit")
    ) || f.temperature === "warm" && f.seasons.includes("summer")
).slice(0, 8);

// =============================================================================
// WATER DROPLETS
// =============================================================================

function WaterDroplets() {
    const [droplets, setDroplets] = useState<Array<{ id: number; x: number; delay: number; size: number }>>([]);

    useEffect(() => {
        setDroplets(
            Array.from({ length: 35 }, (_, i) => ({
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
                    className="absolute rounded-full"
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
// WAVE ANIMATION
// =============================================================================

function WaveAnimation() {
    return (
        <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden opacity-20">
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-full"
                style={{
                    background: `linear-gradient(0deg, ${THEME.colors.accent.aqua}30, transparent)`,
                }}
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
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
                            ${THEME.colors.bg.primary}40 0%, 
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
                    background: `radial-gradient(ellipse at 50% 80%, rgba(${THEME.colors.accent.aquaRgb}, 0.12), transparent 60%)`,
                }}
            />

            {/* Wave Animation */}
            <WaveAnimation />

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
                    <span className="text-lg">🌊</span>
                    <span className="text-[0.65rem] uppercase tracking-[0.5em]" style={{ color: THEME.colors.accent.mint }}>
                        Morning Dew
                    </span>
                    <span className="text-lg">🍋</span>
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
                        Fresh
                    </span>
                    <span
                        className="mt-2 block text-[2rem] font-extralight italic tracking-[0.15em] sm:text-[3rem] lg:text-[4rem]"
                        style={{ color: THEME.colors.accent.aqua, fontFamily: "'Playfair Display', serif" }}
                    >
                        Essence
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
                    The first light of a Mediterranean morning. Calabrian bergamot meets sea breeze,
                    neroli dances with citrus groves. Pure, clean, invigorating.
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
                            Breathe
                        </span>
                        <div className="h-12 w-px" style={{ background: `linear-gradient(to bottom, ${THEME.colors.accent.aqua}, transparent)` }} />
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
                    background: `radial-gradient(ellipse at 30% 50%, rgba(${THEME.colors.accent.aquaRgb}, 0.06), transparent 50%)`,
                }}
            />

            <div className="relative z-10 mx-auto max-w-6xl px-6">
                <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1 }}
                        className="relative aspect-[4/5] overflow-hidden"
                    >
                        <Image
                            src="/images/velvet/collections/fresh.jpg"
                            alt="Fresh Citrus"
                            fill
                            className="object-cover"
                        />
                        <div
                            className="absolute inset-0"
                            style={{ background: `linear-gradient(135deg, transparent 50%, ${THEME.colors.bg.secondary} 100%)` }}
                        />
                        {/* Decorative Border */}
                        <motion.div
                            className="absolute inset-4 border"
                            style={{ borderColor: THEME.colors.accent.mint }}
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 0.3 } : {}}
                            transition={{ delay: 0.5 }}
                        />
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <span
                            className="mb-4 inline-block text-[0.6rem] uppercase tracking-[0.4em]"
                            style={{ color: THEME.colors.accent.aqua }}
                        >
                            The Riviera
                        </span>
                        <h2
                            className="mb-6 text-[2rem] font-extralight leading-tight sm:text-[2.5rem]"
                            style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                        >
                            Mediterranean{" "}
                            <span style={{ color: THEME.colors.accent.mint, fontStyle: "italic" }}>Soul</span>
                        </h2>
                        <div className="space-y-5 text-base leading-relaxed" style={{ color: THEME.colors.text.secondary }}>
                            <p>
                                The Italian Riviera at dawn—when bergamot groves meet the Tyrrhenian Sea.
                                Our Fresh collection captures that magic moment when the air is pure and
                                possibility feels endless.
                            </p>
                            <p>
                                We source our bergamot from Calabria, neroli from Tunisia, and marine
                                accords that evoke the crystalline waters of Portofino.
                            </p>
                            <p style={{ color: THEME.colors.accent.sky }}>
                                Perfect for warm days, office wear, or whenever you need that burst
                                of clean, invigorating energy.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="mt-10 flex gap-12">
                            {[
                                { value: "6+", label: "Fragrances" },
                                { value: "8h", label: "Longevity" },
                                { value: "32°C", label: "Best At" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                >
                                    <span
                                        className="block text-2xl font-light"
                                        style={{ color: THEME.colors.accent.aqua, fontFamily: "'Playfair Display', serif" }}
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
                </div>
            </div>
        </section>
    );
}

// =============================================================================
// FRAGRANCE CARD
// =============================================================================

function FragranceCard({ fragrance, index }: { fragrance: typeof FRESH_FRAGRANCES[0]; index: number }) {
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
                                    style={{ fontFamily: "'Playfair Display', serif", color: THEME.colors.accent.aqua }}
                                >
                                    {fragrance.name.charAt(0)}
                                </span>
                            )}
                        </motion.div>

                        {/* Aqua Glow */}
                        <motion.div
                            className="absolute inset-0"
                            style={{ background: `radial-gradient(circle at center, rgba(${THEME.colors.accent.aquaRgb}, 0.12), transparent 60%)` }}
                            animate={{ opacity: hovered ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    {/* Info */}
                    <div className="p-5">
                        <span className="text-[0.55rem] uppercase tracking-[0.2em]" style={{ color: THEME.colors.accent.mint }}>
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
                            <span className="text-xl font-light" style={{ color: THEME.colors.accent.aqua }}>
                                ${fragrance.price}
                            </span>
                            <div className="flex items-center gap-1">
                                <span style={{ color: THEME.colors.accent.mint }}>★</span>
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
            <WaterDroplets />

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                {/* Header */}
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                >
                    <span className="mb-4 inline-block text-[0.6rem] uppercase tracking-[0.4em]" style={{ color: THEME.colors.accent.aqua }}>
                        ✦ The Collection ✦
                    </span>
                    <h2
                        className="text-[2rem] font-extralight sm:text-[2.5rem]"
                        style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                    >
                        Discover Our{" "}
                        <span style={{ color: THEME.colors.accent.mint, fontStyle: "italic" }}>Fresh Escapes</span>
                    </h2>
                </motion.div>

                {/* Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {FRESH_FRAGRANCES.map((fragrance, i) => (
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
                            style={{ fontFamily: "'Playfair Display', serif", color: THEME.colors.accent.aqua }}
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
