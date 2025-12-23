"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FRAGRANCES } from "../../_data/fragrances";
import { getAllBrands } from "../../_data/brands";

// =============================================================================
// THEME - Modern Unisex
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

// Get Unisex fragrances
const UNISEX_FRAGRANCES = FRAGRANCES.filter(f => f.gender === "unisex").slice(0, 8);

// =============================================================================
// GEOMETRIC PARTICLES
// =============================================================================

function GeometricParticles() {
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number; shape: string }>>([]);

    useEffect(() => {
        const shapes = ["◇", "○", "△", "□"];
        setParticles(
            Array.from({ length: 30 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 12 + 8,
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
                        opacity: 0.15,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, 180, 360],
                        opacity: [0.1, 0.3, 0.1],
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
                            ${THEME.colors.bg.primary}40 0%, 
                            ${THEME.colors.bg.primary}70 50%, 
                            ${THEME.colors.bg.primary} 100%
                        )`,
                    }}
                />
            </motion.div>

            {/* Geometric Particles */}
            <GeometricParticles />

            {/* Gradient Glow */}
            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(ellipse at 50% 60%, rgba(${THEME.colors.accent.goldRgb}, 0.1), transparent 60%)`,
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
                    <span className="h-px w-16" style={{ background: `linear-gradient(90deg, transparent, ${THEME.colors.accent.gold})` }} />
                    <span className="text-[0.65rem] uppercase tracking-[0.5em]" style={{ color: THEME.colors.accent.gold }}>
                        Beyond Boundaries
                    </span>
                    <span className="h-px w-16" style={{ background: `linear-gradient(90deg, ${THEME.colors.accent.gold}, transparent)` }} />
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
                        Unisex
                    </span>
                    <span
                        className="mt-2 block text-[2rem] font-extralight italic tracking-[0.15em] sm:text-[3rem] lg:text-[4rem]"
                        style={{ color: THEME.colors.accent.gold, fontFamily: "'Playfair Display', serif" }}
                    >
                        Icons
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
                    Pure essence knows no gender. These iconic compositions transcend traditional
                    boundaries—bold yet elegant, powerful yet refined. For those who define themselves.
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
                            Define
                        </span>
                        <div className="h-12 w-px" style={{ background: `linear-gradient(to bottom, ${THEME.colors.accent.gold}, transparent)` }} />
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
            <GeometricParticles />

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
                            src="/images/velvet/collections/unisex.jpg"
                            alt="Unisex Style"
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
                            style={{ borderColor: THEME.colors.accent.gold }}
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
                            style={{ color: THEME.colors.accent.gold }}
                        >
                            The Philosophy
                        </span>
                        <h2
                            className="mb-6 text-[2rem] font-extralight leading-tight sm:text-[2.5rem]"
                            style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                        >
                            Scent Has No{" "}
                            <span style={{ color: THEME.colors.accent.gold, fontStyle: "italic" }}>Gender</span>
                        </h2>
                        <div className="space-y-5 text-base leading-relaxed" style={{ color: THEME.colors.text.secondary }}>
                            <p>
                                The modern fragrance lover doesn't conform to outdated distinctions.
                                They seek compositions that express their unique identity—not a
                                pre-defined category.
                            </p>
                            <p>
                                Our Unisex Icons collection celebrates this freedom. Each fragrance
                                balances traditionally "masculine" and "feminine" notes in perfect
                                harmony: oud with rose, leather with jasmine, cedar with vanilla.
                            </p>
                            <p style={{ color: THEME.colors.accent.platinum }}>
                                Wear them as you are. Share them with anyone. These are fragrances
                                for humans, pure and simple.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="mt-10 flex gap-12">
                            {[
                                { value: "7+", label: "Icons" },
                                { value: "∀", label: "For All" },
                                { value: "1", label: "You" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                >
                                    <span
                                        className="block text-2xl font-light"
                                        style={{ color: THEME.colors.accent.gold, fontFamily: "'Playfair Display', serif" }}
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

function FragranceCard({ fragrance, index }: { fragrance: typeof UNISEX_FRAGRANCES[0]; index: number }) {
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
                                    style={{ fontFamily: "'Playfair Display', serif", color: THEME.colors.accent.gold }}
                                >
                                    {fragrance.name.charAt(0)}
                                </span>
                            )}
                        </motion.div>

                        {/* Gold Glow */}
                        <motion.div
                            className="absolute inset-0"
                            style={{ background: `radial-gradient(circle at center, rgba(${THEME.colors.accent.goldRgb}, 0.12), transparent 60%)` }}
                            animate={{ opacity: hovered ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                        />

                        {/* Unisex Badge */}
                        <div className="absolute left-3 top-3">
                            <span
                                className="px-2 py-1 text-[0.5rem] font-semibold uppercase tracking-wider"
                                style={{ background: THEME.colors.accent.gold, color: THEME.colors.bg.primary }}
                            >
                                ⚤ Unisex
                            </span>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                        <span className="text-[0.55rem] uppercase tracking-[0.2em]" style={{ color: THEME.colors.accent.gold }}>
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
                            <span className="text-xl font-light" style={{ color: THEME.colors.accent.gold }}>
                                ${fragrance.price}
                            </span>
                            <div className="flex items-center gap-1">
                                <span style={{ color: THEME.colors.accent.gold }}>★</span>
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
            <GeometricParticles />

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                {/* Header */}
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                >
                    <span className="mb-4 inline-block text-[0.6rem] uppercase tracking-[0.4em]" style={{ color: THEME.colors.accent.gold }}>
                        ✦ The Collection ✦
                    </span>
                    <h2
                        className="text-[2rem] font-extralight sm:text-[2.5rem]"
                        style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                    >
                        Discover Our{" "}
                        <span style={{ color: THEME.colors.accent.gold, fontStyle: "italic" }}>Timeless Icons</span>
                    </h2>
                </motion.div>

                {/* Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {UNISEX_FRAGRANCES.map((fragrance, i) => (
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
                            style={{ fontFamily: "'Playfair Display', serif", color: THEME.colors.accent.gold }}
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
