"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import {
    motion,
    useInView,
    useScroll,
    useTransform,
    useMotionValue,
    useSpring,
    AnimatePresence,
} from "framer-motion";
import Image from "next/image";

// =============================================================================
// THEME - Intimate, Warm, Cinematic
// =============================================================================

const THEME = {
    colors: {
        bg: {
            primary: "#0c0a09",      // Warm black
            secondary: "#1c1917",    // Stone 900
            tertiary: "#292524",     // Stone 800
            card: "rgba(28, 25, 23, 0.8)",
        },
        accent: {
            gold: "#d4a574",         // Warm terracotta gold
            goldLight: "#e7c9a9",
            goldMuted: "#a68a5b",
            goldRgb: "212, 165, 116",
            wine: "#722f37",         // Deep wine red
            wineLight: "#8b3a42",
            wineRgb: "114, 47, 55",
        },
        text: {
            primary: "#faf9f7",      // Warm white
            secondary: "#d6d3d1",    // Stone 300
            muted: "#a8a29e",        // Stone 400
            dim: "#78716c",          // Stone 500
        },
        border: {
            subtle: "rgba(212, 165, 116, 0.1)",
            default: "rgba(212, 165, 116, 0.2)",
            hover: "rgba(212, 165, 116, 0.4)",
        },
    },
} as const;

const EASING = {
    smooth: [0.25, 0.1, 0.25, 1],
    out: [0.16, 1, 0.3, 1],
} as const;

// =============================================================================
// DATA
// =============================================================================

const SIGNATURE_DISHES = [
    {
        name: "Burrata al Tartufo",
        description: "Hand-pulled burrata, black truffle shavings, aged balsamic, micro basil",
        tag: "Chef's Signature",
        image: "/images/sera/dishes/burrata.jpg",
    },
    {
        name: "Tagliatelle al Ragù",
        description: "48-hour slow-cooked beef ragù, hand-cut pasta, pecorino foam",
        tag: "House Classic",
        image: "/images/sera/dishes/tagliatelle.jpg",
    },
    {
        name: "Branzino in Crosta",
        description: "Mediterranean sea bass, herb crust, lemon beurre blanc, seasonal vegetables",
        tag: "From the Sea",
        image: "/images/sera/dishes/branzino.jpg",
    },
    {
        name: "Ossobuco alla Milanese",
        description: "Braised veal shank, saffron risotto, gremolata",
        tag: "Slow & Low",
        image: "/images/sera/dishes/ossobuco.jpg",
    },
    {
        name: "Tiramisu Decostruito",
        description: "Our interpretation—mascarpone cloud, espresso pearls, cocoa dust",
        tag: "Sweet Finish",
        image: "/images/sera/dishes/tiramisu.jpg",
    },
];

const TESTIMONIALS = [
    {
        quote: "The kind of place you want to keep secret—but can't help telling everyone about.",
        source: "Recent Guest",
        rating: "4.8",
    },
    {
        quote: "Finally, Italian food in Dubai that doesn't feel like a theme park.",
        source: "Local Food Writer",
        rating: "4.9",
    },
];

const HOURS = {
    dinner: "6:00 PM – 11:30 PM",
    days: "Tuesday – Sunday",
    closed: "Monday",
    note: "Last seating at 10:30 PM",
};

// =============================================================================
// UTILITY HOOKS
// =============================================================================

// PERFORMANCE: Only track mouse on non-touch devices
function useMousePosition() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // ACCESSIBILITY: Detect touch devices to disable mouse effects
        const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
        setIsTouchDevice(isTouch);

        if (isTouch) return; // Skip mouse tracking on touch devices

        const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", handler);
        return () => window.removeEventListener("mousemove", handler);
    }, []);

    return { ...pos, isTouchDevice };
}

// ACCESSIBILITY: Respect prefers-reduced-motion
function useReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    return prefersReducedMotion;
}

// MOBILE: Check if device is mobile for performance optimization
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return isMobile;
}

// =============================================================================
// REUSABLE COMPONENTS
// =============================================================================

// Ambient Warm Glow - ACCESSIBILITY: Respects reduced motion
function AmbientGlow({ reducedMotion = false }: { reducedMotion?: boolean }) {
    // If reduced motion, show static glows
    if (reducedMotion) {
        return (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className="absolute -left-[20%] top-[20%] h-[500px] w-[500px] rounded-full opacity-20"
                    style={{
                        background: `radial-gradient(circle, rgba(${THEME.colors.accent.goldRgb}, 0.12), transparent 60%)`,
                        filter: "blur(80px)",
                    }}
                />
            </div>
        );
    }

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
                className="absolute -left-[20%] top-[20%] h-[500px] w-[500px] rounded-full opacity-30"
                style={{
                    background: `radial-gradient(circle, rgba(${THEME.colors.accent.goldRgb}, 0.12), transparent 60%)`,
                    filter: "blur(80px)",
                }}
                animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute -right-[10%] bottom-[20%] h-[400px] w-[400px] rounded-full opacity-20"
                style={{
                    background: `radial-gradient(circle, rgba(${THEME.colors.accent.wineRgb}, 0.15), transparent 60%)`,
                    filter: "blur(100px)",
                }}
                animate={{ x: [0, -40, 0], y: [0, -50, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            />
        </div>
    );
}

// Floating Particles (Candle-like) - PERFORMANCE: Reduced on mobile, disabled with reduced motion
// FIX: Render only on client to avoid hydration mismatch from Math.random()
function FloatingEmbers({ count = 20, reducedMotion = false, isMobile = false }: {
    count?: number;
    reducedMotion?: boolean;
    isMobile?: boolean;
}) {
    const [mounted, setMounted] = useState(false);

    // Only render on client to avoid hydration mismatch from Math.random()
    useEffect(() => {
        setMounted(true);
    }, []);

    // ACCESSIBILITY: Don't render particles if reduced motion is preferred
    if (reducedMotion || !mounted) return null;

    // PERFORMANCE: Significantly reduce particle count on mobile
    const actualCount = isMobile ? Math.min(count, 8) : count;

    // Generate particles with stable random values (only runs on client after mount)
    const particles = [...Array(actualCount)].map((_, i) => ({
        x: ((i * 17 + 13) % 100), // Pseudo-random but deterministic based on index
        y: 70 + ((i * 23 + 7) % 30),
        size: 1 + ((i * 11 + 3) % 20) / 10,
        duration: 15 + ((i * 19 + 5) % 20),
        delay: ((i * 13 + 11) % 10),
    }));

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        background: THEME.colors.accent.gold,
                        boxShadow: `0 0 ${p.size * 3}px rgba(${THEME.colors.accent.goldRgb}, 0.8)`,
                    }}
                    animate={{
                        y: [0, -200],
                        opacity: [0, 0.8, 0],
                        scale: [0.5, 1, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeOut",
                    }}
                />
            ))}
        </div>
    );
}

// Section Divider
function SectionDivider() {
    return (
        <div className="flex items-center justify-center gap-4 py-2">
            <motion.span
                className="h-px w-12"
                style={{ background: `linear-gradient(90deg, transparent, ${THEME.colors.accent.gold}40)` }}
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            />
            <span style={{ color: THEME.colors.accent.gold, fontSize: "0.6rem" }}>✦</span>
            <motion.span
                className="h-px w-12"
                style={{ background: `linear-gradient(90deg, ${THEME.colors.accent.gold}40, transparent)` }}
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            />
        </div>
    );
}

// Primary CTA Button
function ReserveButton({
    children,
    onClick,
    size = "default",
    fullWidth = false,
}: {
    children: React.ReactNode;
    onClick?: () => void;
    size?: "default" | "large";
    fullWidth?: boolean;
}) {
    return (
        <motion.button
            onClick={onClick}
            className={`group relative overflow-hidden font-medium uppercase tracking-[0.2em] ${size === "large" ? "px-10 py-5 text-[0.8rem]" : "px-8 py-4 text-[0.7rem]"
                } ${fullWidth ? "w-full" : ""}`}
            style={{
                background: `linear-gradient(135deg, ${THEME.colors.accent.gold}, ${THEME.colors.accent.goldMuted})`,
                color: THEME.colors.bg.primary,
            }}
            whileHover={{ scale: 1.02, boxShadow: `0 0 30px rgba(${THEME.colors.accent.goldRgb}, 0.4)` }}
            whileTap={{ scale: 0.98 }}
        >
            <span className="relative z-10">{children}</span>
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
            />
        </motion.button>
    );
}

// =============================================================================
// NAVBAR
// =============================================================================

function Navbar({ onReserveClick }: { onReserveClick: () => void }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <motion.header
            className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
                background: scrolled ? `${THEME.colors.bg.primary}f5` : "transparent",
                backdropFilter: scrolled ? "blur(20px)" : "none",
                borderBottom: scrolled ? `1px solid ${THEME.colors.border.subtle}` : "none",
            }}
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
                {/* Logo */}
                <motion.a
                    href="#"
                    className="text-[1.3rem] font-light tracking-[0.3em]"
                    style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                    whileHover={{ opacity: 0.8 }}
                >
                    SERA
                </motion.a>

                {/* CTA */}
                <motion.button
                    onClick={onReserveClick}
                    className="px-5 py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.2em] transition-all duration-300"
                    style={{
                        border: `1px solid ${THEME.colors.border.default}`,
                        color: THEME.colors.text.primary,
                        background: "transparent",
                    }}
                    whileHover={{
                        borderColor: THEME.colors.accent.gold,
                        background: `rgba(${THEME.colors.accent.goldRgb}, 0.1)`,
                    }}
                    whileTap={{ scale: 0.98 }}
                >
                    Reserve a Table
                </motion.button>
            </div>
        </motion.header>
    );
}

// =============================================================================
// SECTION 1: HERO
// =============================================================================

function HeroSection({ onReserveClick }: { onReserveClick: () => void }) {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

    return (
        <section
            ref={ref}
            className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
            style={{ background: THEME.colors.bg.primary }}
        >
            {/* Background Image */}
            <motion.div className="absolute inset-0" style={{ scale }}>
                <Image
                    src="/images/sera/hero.jpg"
                    alt="Sera Restaurant Interior"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(to bottom, 
              ${THEME.colors.bg.primary}60 0%, 
              ${THEME.colors.bg.primary}40 30%,
              ${THEME.colors.bg.primary}70 70%,
              ${THEME.colors.bg.primary} 100%
            )`,
                    }}
                />
            </motion.div>

            {/* Ambient Effects */}
            <AmbientGlow />
            <FloatingEmbers count={25} />

            {/* Vignette */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(12,10,9,0.7) 100%)" }}
            />

            {/* Content */}
            <motion.div
                className="relative z-10 px-6 text-center"
                style={{ opacity, y }}
            >
                {/* Pre-headline */}
                <motion.p
                    className="mb-6 text-[0.65rem] font-medium uppercase tracking-[0.5em]"
                    style={{ color: THEME.colors.accent.gold }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    Downtown Dubai
                </motion.p>

                {/* Main Headline */}
                <motion.h1
                    className="mb-6"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.7 }}
                >
                    <span
                        className="block text-[2.8rem] font-extralight leading-[1] tracking-[0.05em] sm:text-[4rem] lg:text-[5rem]"
                        style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                    >
                        A dinner
                    </span>
                    <span
                        className="mt-2 block text-[2.8rem] font-extralight italic leading-[1] sm:text-[4rem] lg:text-[5rem]"
                        style={{ color: THEME.colors.accent.gold, fontFamily: "'Playfair Display', serif" }}
                    >
                        worth the night.
                    </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    className="mx-auto mb-10 max-w-md text-[0.95rem] font-light leading-relaxed sm:text-[1.05rem]"
                    style={{ color: THEME.colors.text.secondary }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.9 }}
                >
                    Modern Italian. Intimate setting.
                    <br />
                    <span style={{ color: THEME.colors.text.primary }}>For the evening you'll remember.</span>
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.1 }}
                >
                    <ReserveButton onClick={onReserveClick} size="large">
                        Reserve a Table
                    </ReserveButton>
                </motion.div>

                {/* CONVERSION: Trust proof + urgency line near CTA */}
                <motion.div
                    className="mt-10 flex flex-col items-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.4 }}
                >
                    {/* Trust Proof Line */}
                    <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-[0.6rem]" style={{ color: THEME.colors.accent.gold }}>★</span>
                            ))}
                        </div>
                        <span className="text-[0.65rem]" style={{ color: THEME.colors.text.muted }}>
                            4.8 rating • Downtown Dubai • Evenings book fast
                        </span>
                    </div>

                    {/* Hours hint */}
                    <span className="text-[0.6rem] uppercase tracking-[0.15em]" style={{ color: THEME.colors.text.dim }}>
                        Dinner: 6:00 PM – 11:30 PM
                    </span>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                style={{ opacity }}
            >
                <motion.div
                    className="flex flex-col items-center gap-3"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span className="text-[0.55rem] uppercase tracking-[0.3em]" style={{ color: THEME.colors.text.dim }}>
                        Scroll
                    </span>
                    <div
                        className="h-10 w-px"
                        style={{ background: `linear-gradient(to bottom, ${THEME.colors.accent.gold}60, transparent)` }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}

// =============================================================================
// SECTION 2: PROOF / SOCIAL PROOF
// =============================================================================

function ProofSection() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            ref={ref}
            className="relative overflow-hidden px-6 py-24 sm:py-32"
            style={{ background: THEME.colors.bg.primary }}
        >
            <div className="relative z-10 mx-auto max-w-3xl text-center">
                <SectionDivider />

                {/* Testimonial */}
                <div className="relative mt-10 min-h-[180px]">
                    <AnimatePresence mode="wait">
                        {TESTIMONIALS.map(
                            (t, i) =>
                                i === activeIndex && (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.6 }}
                                        className="absolute inset-0"
                                    >
                                        <blockquote
                                            className="text-[1.3rem] font-light leading-relaxed sm:text-[1.6rem]"
                                            style={{
                                                color: THEME.colors.text.primary,
                                                fontFamily: "'Playfair Display', serif",
                                                fontStyle: "italic",
                                            }}
                                        >
                                            "{t.quote}"
                                        </blockquote>

                                        <div className="mt-6 flex items-center justify-center gap-4">
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, j) => (
                                                    <span key={j} className="text-[0.6rem]" style={{ color: THEME.colors.accent.gold }}>★</span>
                                                ))}
                                            </div>
                                            <span className="text-[0.7rem]" style={{ color: THEME.colors.text.muted }}>
                                                {t.rating} · {t.source}
                                            </span>
                                        </div>
                                    </motion.div>
                                )
                        )}
                    </AnimatePresence>
                </div>

                {/* Dots */}
                <div className="mt-8 flex justify-center gap-2">
                    {TESTIMONIALS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className="h-1.5 w-1.5 rounded-full transition-all duration-300"
                            style={{
                                background: i === activeIndex ? THEME.colors.accent.gold : THEME.colors.text.dim,
                                transform: i === activeIndex ? "scale(1.3)" : "scale(1)",
                            }}
                        />
                    ))}
                </div>

                {/* Trust Badges */}
                <motion.div
                    className="mt-12 flex flex-wrap items-center justify-center gap-8"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3 }}
                >
                    {[
                        { label: "Google", rating: "4.8" },
                        { label: "TripAdvisor", rating: "4.7" },
                    ].map((badge) => (
                        <div key={badge.label} className="flex items-center gap-2">
                            <span className="text-[0.65rem] uppercase tracking-[0.15em]" style={{ color: THEME.colors.text.dim }}>
                                {badge.label}
                            </span>
                            <span className="text-[0.75rem] font-medium" style={{ color: THEME.colors.accent.gold }}>
                                {badge.rating}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// =============================================================================
// SECTION 3: SIGNATURE DISHES
// =============================================================================

function DishesSection() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <section
            ref={ref}
            className="relative overflow-hidden px-6 py-24 sm:py-32"
            style={{ background: THEME.colors.bg.secondary }}
        >
            <AmbientGlow />
            <FloatingEmbers count={15} />

            <div className="relative z-10 mx-auto max-w-5xl">
                {/* Header */}
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <SectionDivider />
                    <h2
                        className="mt-6 text-[1.8rem] font-extralight sm:text-[2.2rem]"
                        style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                    >
                        From Our <span style={{ fontStyle: "italic", color: THEME.colors.accent.gold }}>Kitchen</span>
                    </h2>
                    <p className="mt-3 text-[0.85rem]" style={{ color: THEME.colors.text.muted }}>
                        A glimpse of what awaits. Full menu revealed at your table.
                    </p>
                </motion.div>

                {/* Dishes Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {SIGNATURE_DISHES.map((dish, i) => (
                        <motion.div
                            key={dish.name}
                            className="group relative overflow-hidden"
                            style={{
                                background: THEME.colors.bg.card,
                                border: `1px solid ${THEME.colors.border.subtle}`,
                            }}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            whileHover={{ borderColor: THEME.colors.border.hover }}
                        >
                            {/* Dish Image */}
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <Image
                                    src={dish.image}
                                    alt={dish.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                <div
                                    className="absolute inset-0"
                                    style={{ background: `linear-gradient(to top, ${THEME.colors.bg.primary}90, transparent 50%)` }}
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {/* Tag */}
                                <span
                                    className="mb-3 inline-block text-[0.55rem] uppercase tracking-[0.2em]"
                                    style={{ color: THEME.colors.accent.gold }}
                                >
                                    {dish.tag}
                                </span>

                                {/* Name */}
                                <h3
                                    className="mb-2 text-[1.1rem] font-light"
                                    style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                                >
                                    {dish.name}
                                </h3>

                                {/* Description */}
                                <p className="text-[0.8rem] leading-relaxed" style={{ color: THEME.colors.text.muted }}>
                                    {dish.description}
                                </p>
                            </div>

                            {/* Hover Glow */}
                            <motion.div
                                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                style={{
                                    background: `radial-gradient(circle at 50% 100%, rgba(${THEME.colors.accent.goldRgb}, 0.08), transparent 60%)`,
                                }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Note */}
                <motion.p
                    className="mt-10 text-center text-[0.75rem]"
                    style={{ color: THEME.colors.text.dim }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 }}
                >
                    Seasonal ingredients. Menu changes regularly.
                </motion.p>
            </div>
        </section>
    );
}

// =============================================================================
// SECTION 4: THE EXPERIENCE (Visual Break)
// =============================================================================

function ExperienceSection() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <section
            ref={ref}
            className="relative overflow-hidden"
            style={{ background: THEME.colors.bg.primary }}
        >
            {/* Full-width Image */}
            <div className="relative h-[50vh] min-h-[400px]">
                <Image
                    src="/images/sera/interior.jpg"
                    alt="Sera Interior"
                    fill
                    className="object-cover"
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(to bottom, ${THEME.colors.bg.primary} 0%, transparent 30%, transparent 70%, ${THEME.colors.bg.primary} 100%)`,
                    }}
                />

                {/* Overlaid Text */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center px-6 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                >
                    <div>
                        <p
                            className="text-[1.2rem] font-light leading-relaxed sm:text-[1.5rem] lg:text-[1.8rem]"
                            style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                        >
                            "Dimmed lights. <span style={{ color: THEME.colors.accent.gold }}>Soft jazz.</span>
                            <br />
                            The city fading into the background."
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// =============================================================================
// SECTION 5: LOCATION & HOURS
// =============================================================================

function LocationSection({ onReserveClick }: { onReserveClick: () => void }) {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <section
            ref={ref}
            className="relative overflow-hidden px-6 py-24 sm:py-32"
            style={{ background: THEME.colors.bg.secondary }}
        >
            <div className="relative z-10 mx-auto max-w-4xl">
                <div className="grid gap-12 md:grid-cols-2 md:gap-16">
                    {/* Location */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span
                            className="mb-4 inline-block text-[0.6rem] uppercase tracking-[0.3em]"
                            style={{ color: THEME.colors.accent.gold }}
                        >
                            Find Us
                        </span>

                        <h3
                            className="mb-4 text-[1.5rem] font-extralight sm:text-[1.8rem]"
                            style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                        >
                            Downtown Dubai
                        </h3>

                        <p className="mb-2 text-[0.9rem]" style={{ color: THEME.colors.text.secondary }}>
                            Near the Boulevard
                        </p>
                        <p className="text-[0.8rem]" style={{ color: THEME.colors.text.muted }}>
                            Valet parking available
                        </p>

                        {/* Map placeholder */}
                        <div
                            className="mt-6 flex h-32 items-center justify-center"
                            style={{ background: THEME.colors.bg.tertiary, border: `1px solid ${THEME.colors.border.subtle}` }}
                        >
                            <span className="text-[0.7rem]" style={{ color: THEME.colors.text.dim }}>
                                Location shared upon confirmation
                            </span>
                        </div>
                    </motion.div>

                    {/* Hours */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        <span
                            className="mb-4 inline-block text-[0.6rem] uppercase tracking-[0.3em]"
                            style={{ color: THEME.colors.accent.gold }}
                        >
                            Hours
                        </span>

                        <h3
                            className="mb-4 text-[1.5rem] font-extralight sm:text-[1.8rem]"
                            style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                        >
                            Dinner Service
                        </h3>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-[0.85rem]" style={{ color: THEME.colors.text.secondary }}>
                                    {HOURS.days}
                                </span>
                                <span className="text-[0.85rem]" style={{ color: THEME.colors.text.primary }}>
                                    {HOURS.dinner}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[0.85rem]" style={{ color: THEME.colors.text.secondary }}>
                                    {HOURS.closed}
                                </span>
                                <span className="text-[0.85rem]" style={{ color: THEME.colors.text.dim }}>
                                    Closed
                                </span>
                            </div>
                        </div>

                        <p className="mt-4 text-[0.75rem]" style={{ color: THEME.colors.text.dim }}>
                            {HOURS.note}
                        </p>

                        {/* CTA */}
                        <div className="mt-8">
                            <ReserveButton onClick={onReserveClick}>
                                Reserve a Table
                            </ReserveButton>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// =============================================================================
// SECTION 6: FINAL CTA
// =============================================================================

function FinalCTASection({ onReserveClick }: { onReserveClick: () => void }) {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <section
            ref={ref}
            className="relative overflow-hidden px-6 py-24 sm:py-32"
            style={{ background: THEME.colors.bg.primary }}
        >
            <AmbientGlow />
            <FloatingEmbers count={20} />

            <motion.div
                className="relative z-10 mx-auto max-w-2xl text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
            >
                <SectionDivider />

                <h2
                    className="mt-8 text-[1.8rem] font-extralight leading-tight sm:text-[2.5rem]"
                    style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                >
                    Your table is
                    <br />
                    <span style={{ fontStyle: "italic", color: THEME.colors.accent.gold }}>waiting.</span>
                </h2>

                <p className="mt-4 text-[0.95rem]" style={{ color: THEME.colors.text.secondary }}>
                    Limited seating. Book ahead for the best experience.
                </p>

                <div className="mt-10">
                    <ReserveButton onClick={onReserveClick} size="large">
                        Reserve a Table
                    </ReserveButton>
                </div>
            </motion.div>
        </section>
    );
}

// =============================================================================
// FOOTER
// =============================================================================

function Footer() {
    return (
        <footer
            className="px-6 py-12"
            style={{ background: THEME.colors.bg.secondary, borderTop: `1px solid ${THEME.colors.border.subtle}` }}
        >
            <div className="mx-auto max-w-4xl">
                {/* Main Footer */}
                <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
                    {/* Logo */}
                    <span
                        className="text-[1.2rem] font-light tracking-[0.3em]"
                        style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                    >
                        SERA
                    </span>

                    {/* Secondary CTAs */}
                    <div className="flex items-center gap-6">
                        <motion.a
                            href="tel:+97141234567"
                            className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.15em]"
                            style={{ color: THEME.colors.text.muted }}
                            whileHover={{ color: THEME.colors.accent.gold }}
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Call
                        </motion.a>

                        <motion.a
                            href="https://wa.me/97141234567"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.15em]"
                            style={{ color: THEME.colors.text.muted }}
                            whileHover={{ color: THEME.colors.accent.gold }}
                        >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            WhatsApp
                        </motion.a>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-10 flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row" style={{ borderTop: `1px solid ${THEME.colors.border.subtle}` }}>
                    <p className="text-[0.6rem]" style={{ color: THEME.colors.text.dim }}>
                        © 2024 Sera. Downtown Dubai.
                    </p>
                    <div className="flex gap-6">
                        {["Instagram", "Privacy"].map((item) => (
                            <motion.a
                                key={item}
                                href="#"
                                className="text-[0.6rem]"
                                style={{ color: THEME.colors.text.dim }}
                                whileHover={{ color: THEME.colors.accent.gold }}
                            >
                                {item}
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

// =============================================================================
// RESERVATION MODAL
// =============================================================================

function ReservationModal({
    isOpen,
    onClose
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [step, setStep] = useState<"form" | "success">("form");
    // CONVERSION: Default time to 8:00 PM (popular dinner time) and guests to 2 (couples)
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        date: "",
        time: "8:00 PM",
        guests: "2",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // CONVERSION: Dinner-only times (6PM-11PM in 30-min increments)
    const timeSlots = [
        "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
        "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM"
    ];

    const guestOptions = ["1", "2", "3", "4", "5", "6", "7", "8+"];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setStep("success");
    };

    const handleClose = () => {
        onClose();
        // Reset after animation
        setTimeout(() => {
            setStep("form");
            setFormData({ name: "", phone: "", date: "", time: "", guests: "2" });
        }, 300);
    };

    // Get minimum date (today)
    const today = new Date().toISOString().split("T")[0];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 z-50"
                        style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed inset-x-4 top-1/2 z-50 mx-auto max-w-md sm:inset-x-auto"
                        style={{
                            background: THEME.colors.bg.secondary,
                            border: `1px solid ${THEME.colors.border.default}`,
                        }}
                        initial={{ opacity: 0, y: "-40%", scale: 0.95 }}
                        animate={{ opacity: 1, y: "-50%", scale: 1 }}
                        exit={{ opacity: 0, y: "-40%", scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute right-4 top-4 p-2"
                            style={{ color: THEME.colors.text.muted }}
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {step === "form" ? (
                            <div className="p-8">
                                {/* Header */}
                                <div className="mb-8 text-center">
                                    <h3
                                        className="text-[1.5rem] font-extralight"
                                        style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                                    >
                                        Reserve a Table
                                    </h3>
                                    <p className="mt-2 text-[0.8rem]" style={{ color: THEME.colors.text.muted }}>
                                        Dinner service · Tuesday – Sunday
                                    </p>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Name */}
                                    <div>
                                        <label
                                            className="mb-2 block text-[0.65rem] uppercase tracking-[0.15em]"
                                            style={{ color: THEME.colors.text.muted }}
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Your name"
                                            className="w-full px-4 py-3 text-[0.85rem] outline-none transition-all duration-300"
                                            style={{
                                                background: THEME.colors.bg.primary,
                                                border: `1px solid ${THEME.colors.border.default}`,
                                                color: THEME.colors.text.primary,
                                            }}
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label
                                            className="mb-2 block text-[0.65rem] uppercase tracking-[0.15em]"
                                            style={{ color: THEME.colors.text.muted }}
                                        >
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+971 XX XXX XXXX"
                                            className="w-full px-4 py-3 text-[0.85rem] outline-none transition-all duration-300"
                                            style={{
                                                background: THEME.colors.bg.primary,
                                                border: `1px solid ${THEME.colors.border.default}`,
                                                color: THEME.colors.text.primary,
                                            }}
                                        />
                                    </div>

                                    {/* Date & Time Row */}
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Date */}
                                        <div>
                                            <label
                                                className="mb-2 block text-[0.65rem] uppercase tracking-[0.15em]"
                                                style={{ color: THEME.colors.text.muted }}
                                            >
                                                Date
                                            </label>
                                            <input
                                                type="date"
                                                required
                                                min={today}
                                                value={formData.date}
                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                className="w-full px-4 py-3 text-[0.85rem] outline-none transition-all duration-300"
                                                style={{
                                                    background: THEME.colors.bg.primary,
                                                    border: `1px solid ${THEME.colors.border.default}`,
                                                    color: THEME.colors.text.primary,
                                                    colorScheme: "dark",
                                                }}
                                            />
                                        </div>

                                        {/* Time */}
                                        <div>
                                            <label
                                                className="mb-2 block text-[0.65rem] uppercase tracking-[0.15em]"
                                                style={{ color: THEME.colors.text.muted }}
                                            >
                                                Time
                                            </label>
                                            <select
                                                required
                                                value={formData.time}
                                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                                className="w-full appearance-none px-4 py-3 text-[0.85rem] outline-none transition-all duration-300"
                                                style={{
                                                    background: THEME.colors.bg.primary,
                                                    border: `1px solid ${THEME.colors.border.default}`,
                                                    color: formData.time ? THEME.colors.text.primary : THEME.colors.text.muted,
                                                }}
                                            >
                                                <option value="">Select</option>
                                                {timeSlots.map((slot) => (
                                                    <option key={slot} value={slot}>{slot}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Guests */}
                                    <div>
                                        <label
                                            className="mb-2 block text-[0.65rem] uppercase tracking-[0.15em]"
                                            style={{ color: THEME.colors.text.muted }}
                                        >
                                            Guests
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {guestOptions.map((num) => (
                                                <button
                                                    key={num}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, guests: num })}
                                                    className="px-4 py-2 text-[0.8rem] transition-all duration-300"
                                                    style={{
                                                        background: formData.guests === num
                                                            ? `rgba(${THEME.colors.accent.goldRgb}, 0.2)`
                                                            : THEME.colors.bg.primary,
                                                        border: `1px solid ${formData.guests === num ? THEME.colors.accent.gold : THEME.colors.border.default}`,
                                                        color: formData.guests === num ? THEME.colors.accent.gold : THEME.colors.text.secondary,
                                                    }}
                                                >
                                                    {num}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CONVERSION: Button text changed from "Confirm Reservation" to "Request a Table" - less commitment */}
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="mt-6 w-full py-4 text-[0.75rem] font-medium uppercase tracking-[0.2em] transition-all duration-300"
                                        style={{
                                            background: isSubmitting
                                                ? THEME.colors.accent.goldMuted
                                                : `linear-gradient(135deg, ${THEME.colors.accent.gold}, ${THEME.colors.accent.goldMuted})`,
                                            color: THEME.colors.bg.primary,
                                            opacity: isSubmitting ? 0.7 : 1,
                                        }}
                                        whileHover={!isSubmitting ? { scale: 1.01 } : {}}
                                        whileTap={!isSubmitting ? { scale: 0.99 } : {}}
                                        aria-label="Request a table reservation"
                                    >
                                        {isSubmitting ? "Sending..." : "Request a Table"}
                                    </motion.button>
                                </form>

                                {/* CONVERSION: Microcopy to reduce friction - no payment, no account */}
                                <p className="mt-4 text-center text-[0.65rem]" style={{ color: THEME.colors.text.muted }}>
                                    No payment. No account. Just a quick confirmation.
                                </p>

                                {/* CONVERSION: Removed "within 30 minutes" guarantee - set realistic expectations */}
                                <p className="mt-2 text-center text-[0.6rem]" style={{ color: THEME.colors.text.dim }}>
                                    Limited seating on weekends.
                                </p>
                            </div>
                        ) : (
                            /* Success State */
                            <motion.div
                                className="p-8 text-center"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Checkmark */}
                                <motion.div
                                    className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
                                    style={{ background: `rgba(${THEME.colors.accent.goldRgb}, 0.15)` }}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                >
                                    <svg
                                        className="h-8 w-8"
                                        fill="none"
                                        stroke={THEME.colors.accent.gold}
                                        viewBox="0 0 24 24"
                                    >
                                        <motion.path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ delay: 0.4, duration: 0.4 }}
                                        />
                                    </svg>
                                </motion.div>

                                {/* CONVERSION: Updated confirmation message - realistic, no timing guarantees */}
                                <h3
                                    className="mb-2 text-[1.3rem] font-extralight"
                                    style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                                >
                                    Request received.
                                </h3>

                                <p className="mb-6 text-[0.9rem]" style={{ color: THEME.colors.text.secondary }}>
                                    Table for <span style={{ color: THEME.colors.accent.gold }}>{formData.guests}</span>
                                    {" "}on{" "}
                                    <span style={{ color: THEME.colors.accent.gold }}>
                                        {new Date(formData.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                                    </span>
                                    {" "}at{" "}
                                    <span style={{ color: THEME.colors.accent.gold }}>{formData.time}</span>
                                </p>

                                {/* CONVERSION: Updated confirmation copy - no timing guarantees */}
                                <p className="mb-8 text-[0.8rem]" style={{ color: THEME.colors.text.muted }}>
                                    We'll confirm shortly via WhatsApp or phone.
                                </p>

                                <div className="space-y-3">
                                    <p className="text-[0.7rem]" style={{ color: THEME.colors.text.dim }}>
                                        📍 Downtown Dubai · Near the Boulevard
                                    </p>
                                    <p className="text-[0.65rem]" style={{ color: THEME.colors.text.dim }}>
                                        Exact location sent upon confirmation
                                    </p>
                                </div>

                                <button
                                    onClick={handleClose}
                                    className="mt-8 px-8 py-3 text-[0.7rem] uppercase tracking-[0.15em] transition-all duration-300"
                                    style={{
                                        border: `1px solid ${THEME.colors.border.default}`,
                                        color: THEME.colors.text.secondary,
                                    }}
                                >
                                    Done
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function SeraRestaurantPage() {
    const { x: mouseX, y: mouseY, isTouchDevice } = useMousePosition();
    const reducedMotion = useReducedMotion();
    const isMobile = useIsMobile();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openReservation = () => setIsModalOpen(true);
    const closeReservation = () => setIsModalOpen(false);

    return (
        <main
            className="relative min-h-screen overflow-hidden"
            style={{ background: THEME.colors.bg.primary }}
        >
            {/* PERFORMANCE: Cursor glow only on non-touch devices */}
            {!isTouchDevice && !reducedMotion && (
                <div
                    className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(${THEME.colors.accent.goldRgb}, 0.03), transparent 40%)`,
                    }}
                />
            )}

            {/* Film Grain - subtle, doesn't affect performance much */}
            <div
                className="pointer-events-none fixed inset-0 z-40 opacity-[0.02]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
            />

            <Navbar onReserveClick={openReservation} />

            <HeroSection onReserveClick={openReservation} />
            <ProofSection />
            <DishesSection />
            <ExperienceSection />
            <LocationSection onReserveClick={openReservation} />
            <FinalCTASection onReserveClick={openReservation} />

            <Footer />

            <ReservationModal isOpen={isModalOpen} onClose={closeReservation} />
        </main>
    );
}