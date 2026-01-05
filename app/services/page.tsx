"use client";

import { useState, useRef, useEffect } from "react";
import {
    motion,
    useInView,
    useScroll,
    useTransform,
    AnimatePresence,
} from "framer-motion";
import Link from "next/link";

// =============================================================================
// THEME - OMREX Amber/Gold
// =============================================================================

const THEME = {
    colors: {
        bg: {
            primary: "#050507",
            secondary: "#0a0a0c",
            tertiary: "#111113",
            card: "rgba(17, 17, 19, 0.8)",
        },
        accent: {
            primary: "#f59e0b",
            primaryLight: "#fbbf24",
            primaryDark: "#d97706",
            primaryRgb: "245, 158, 11",
        },
        text: {
            primary: "#f8fafc",
            secondary: "#a1a1aa",
            muted: "#71717a",
            dim: "#52525b",
        },
        border: {
            subtle: "rgba(245, 158, 11, 0.08)",
            default: "rgba(245, 158, 11, 0.15)",
            hover: "rgba(245, 158, 11, 0.3)",
        },
    },
} as const;


// =============================================================================
// DATA
// =============================================================================

const PACKAGES = [
    {
        id: "starter",
        name: "Starter",
        tagline: "Launch your brand online",
        price: 997,
        currency: "$",
        period: "",
        description: "Perfect for new businesses ready to establish their online presence with a powerful first impression.",
        delivery: "14 days",
        popular: false,
        features: [
            { text: "Single Landing Page", included: true },
            { text: "Mobile Responsive Design", included: true },
            { text: "Contact Form Integration", included: true },
            { text: "WhatsApp Button", included: true },
            { text: "Basic SEO Setup", included: true },
            { text: "Google Analytics", included: true },
            { text: "2 Revision Rounds", included: true },
            { text: "7 Days Support", included: true },
            { text: "Multi-page Website", included: false },
            { text: "Booking System", included: false },
            { text: "Custom Animations", included: false },
        ],
        idealFor: ["Freelancers", "New businesses", "Testing ideas", "Quick launch"],
        cta: "Get Started",
    },
    {
        id: "growth",
        name: "Growth",
        tagline: "Convert visitors into customers",
        price: 2497,
        currency: "$",
        period: "",
        description: "For established businesses ready to scale. A complete cinematic website designed to drive bookings and sales.",
        delivery: "3 weeks",
        popular: true,
        features: [
            { text: "5-7 Cinematic Pages", included: true },
            { text: "Custom Design (No Templates)", included: true },
            { text: "Mobile-First Development", included: true },
            { text: "Booking/Reservation System", included: true },
            { text: "Lead Capture Forms", included: true },
            { text: "WhatsApp Integration", included: true },
            { text: "SEO Optimization", included: true },
            { text: "Speed Optimization", included: true },
            { text: "Google Analytics + Search Console", included: true },
            { text: "3 Revision Rounds", included: true },
            { text: "30 Days Support", included: true },
        ],
        idealFor: ["Restaurants", "Clinics", "Salons", "Professional services"],
        cta: "Most Popular",
    },
    {
        id: "scale",
        name: "Scale",
        tagline: "Build your digital engine",
        price: 4997,
        currency: "$",
        period: "",
        description: "For businesses that demand excellence. Premium design with advanced functionality and custom features.",
        delivery: "5-6 weeks",
        popular: false,
        features: [
            { text: "10-15 Premium Pages", included: true },
            { text: "Premium Cinematic Design", included: true },
            { text: "Advanced Motion & Animations", included: true },
            { text: "Custom Web App Features", included: true },
            { text: "Admin Dashboard", included: true },
            { text: "Advanced Booking System", included: true },
            { text: "Payment Integration", included: true },
            { text: "Multi-language (EN/AR)", included: true },
            { text: "Advanced SEO & Performance", included: true },
            { text: "5 Revision Rounds", included: true },
            { text: "60 Days Priority Support", included: true },
        ],
        idealFor: ["Premium restaurants", "Hotel groups", "Multi-location clinics", "Growing companies"],
        cta: "Go Premium",
    },
];

const ADDONS = [
    { name: "Extra Page", price: 150, unit: "/page" },
    { name: "Blog Setup", price: 297, unit: "" },
    { name: "E-commerce Integration", price: 997, unit: "+" },
    { name: "Logo Design", price: 297, unit: "" },
    { name: "Copywriting (English)", price: 197, unit: "/page" },
    { name: "Copywriting (Arabic)", price: 247, unit: "/page" },
    { name: "Monthly Maintenance", price: 97, unit: "/month" },
    { name: "Priority Support", price: 197, unit: "/month" },
];

const PROCESS_STEPS = [
    {
        number: "01",
        title: "Discovery",
        description: "Free consultation to understand your goals, audience, and vision.",
        duration: "30 min call",
        icon: "💬",
    },
    {
        number: "02",
        title: "Strategy",
        description: "We plan the structure, user flow, and conversion points.",
        duration: "2-3 days",
        icon: "🎯",
    },
    {
        number: "03",
        title: "Design",
        description: "Cinematic visuals crafted to tell your brand story.",
        duration: "1 week",
        icon: "🎨",
    },
    {
        number: "04",
        title: "Development",
        description: "Clean code, fast loading, mobile-perfect implementation.",
        duration: "1-2 weeks",
        icon: "⚡",
    },
    {
        number: "05",
        title: "Launch",
        description: "Testing, optimization, and going live with full support.",
        duration: "2-3 days",
        icon: "🚀",
    },
];

const FAQS = [
    {
        question: "How long does it take to complete a website?",
        answer: "Depending on the package: Starter takes 14 days, Growth takes 3 weeks, and Scale takes 5-6 weeks. We always provide a timeline before starting.",
    },
    {
        question: "What do I need to provide?",
        answer: "Your logo (if you have one), brand colors, content/copy, and images. Don't worry if you don't have everything—we can help with copywriting and source professional images.",
    },
    {
        question: "What are the payment terms?",
        answer: "50% upfront to begin the project, and 50% before final delivery. For Scale packages, we can split into 3 payments: 40% - 30% - 30%.",
    },
    {
        question: "What if I'm not satisfied with the design?",
        answer: "Every package includes revision rounds. We work closely with you during the design phase to ensure you love the result before we move to development.",
    },
    {
        question: "Do you provide hosting?",
        answer: "We recommend and help you set up hosting on platforms like Vercel or Netlify (often free for small sites). We handle the technical setup as part of the project.",
    },
    {
        question: "Can I update the website myself after launch?",
        answer: "Yes! We can set up a simple content management system if needed, or provide training on how to make basic updates. Ongoing maintenance packages are also available.",
    },
    {
        question: "Do you work with clients outside Dubai?",
        answer: "Absolutely. We work with clients globally. Everything is done remotely with clear communication via video calls, WhatsApp, and email.",
    },
];

const PROBLEMS = [
    {
        icon: "📉",
        title: "Visitors leave without converting",
        description: "Your website gets traffic but no bookings, no calls, no sales.",
    },
    {
        icon: "🐌",
        title: "Slow and outdated",
        description: "Loading takes forever. Design looks like 2015. Mobile experience is broken.",
    },
    {
        icon: "🤷",
        title: "Doesn't reflect your brand",
        description: "Generic templates that look like everyone else. No story, no personality.",
    },
];

// =============================================================================
// UTILITY HOOKS
// =============================================================================

function useMousePosition() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", handler);
        return () => window.removeEventListener("mousemove", handler);
    }, []);
    return pos;
}

// =============================================================================
// REUSABLE COMPONENTS
// =============================================================================

function AmbientGlow() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
                className="absolute -left-[30%] top-[10%] h-[600px] w-[600px] rounded-full opacity-30"
                style={{
                    background: `radial-gradient(circle, rgba(${THEME.colors.accent.primaryRgb}, 0.1), transparent 60%)`,
                    filter: "blur(100px)",
                }}
                animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute -right-[20%] bottom-[20%] h-[500px] w-[500px] rounded-full opacity-20"
                style={{
                    background: `radial-gradient(circle, rgba(${THEME.colors.accent.primaryRgb}, 0.08), transparent 60%)`,
                    filter: "blur(100px)",
                }}
                animate={{ x: [0, -40, 0], y: [0, -50, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
            />
        </div>
    );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            className="mb-4 flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <span
                className="h-px w-8"
                style={{ background: `linear-gradient(90deg, transparent, ${THEME.colors.accent.primary}60)` }}
            />
            <span
                className="text-[0.65rem] font-medium uppercase tracking-[0.3em]"
                style={{ color: THEME.colors.accent.primary }}
            >
                {children}
            </span>
            <span
                className="h-px w-8"
                style={{ background: `linear-gradient(90deg, ${THEME.colors.accent.primary}60, transparent)` }}
            />
        </motion.div>
    );
}

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.h2
            className={`text-center text-[1.8rem] font-semibold leading-tight sm:text-[2.2rem] lg:text-[2.5rem] ${className}`}
            style={{ color: THEME.colors.text.primary }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
        >
            {children}
        </motion.h2>
    );
}

function PrimaryButton({
    children,
    href,
    size = "default",
    fullWidth = false,
    variant = "primary",
}: {
    children: React.ReactNode;
    href?: string;
    size?: "default" | "large";
    fullWidth?: boolean;
    variant?: "primary" | "secondary";
}) {
    const baseClasses = `group relative overflow-hidden font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${size === "large" ? "px-10 py-4 text-[0.75rem]" : "px-7 py-3.5 text-[0.7rem]"
        } ${fullWidth ? "w-full" : ""}`;

    const primaryStyles = {
        background: `linear-gradient(135deg, ${THEME.colors.accent.primary}, ${THEME.colors.accent.primaryDark})`,
        color: THEME.colors.bg.primary,
    };

    const secondaryStyles = {
        background: "transparent",
        border: `1px solid ${THEME.colors.border.default}`,
        color: THEME.colors.text.primary,
    };

    const content = (
        <motion.button
            className={baseClasses}
            style={variant === "primary" ? primaryStyles : secondaryStyles}
            whileHover={{
                scale: 1.02,
                boxShadow: variant === "primary" ? `0 0 30px rgba(${THEME.colors.accent.primaryRgb}, 0.4)` : "none",
                borderColor: variant === "secondary" ? THEME.colors.accent.primary : undefined,
            }}
            whileTap={{ scale: 0.98 }}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
            {variant === "primary" && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                />
            )}
        </motion.button>
    );

    return href ? <Link href={href}>{content}</Link> : content;
}

// =============================================================================
// HERO SECTION
// =============================================================================

function HeroSection() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

    return (
        <section
            ref={ref}
            className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-5 pt-24 sm:px-6"
            style={{ background: THEME.colors.bg.primary }}
        >
            <AmbientGlow />

            {/* Grid pattern */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(${THEME.colors.accent.primary}20 1px, transparent 1px), linear-gradient(90deg, ${THEME.colors.accent.primary}20 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            <motion.div className="relative z-10 mx-auto max-w-4xl text-center" style={{ opacity, y }}>
                {/* Badge */}
                <motion.div
                    className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2"
                    style={{
                        background: `rgba(${THEME.colors.accent.primaryRgb}, 0.1)`,
                        border: `1px solid ${THEME.colors.border.default}`,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <span
                        className="h-1.5 w-1.5 rounded-full animate-pulse"
                        style={{ background: THEME.colors.accent.primary }}
                    />
                    <span className="text-[0.7rem] font-medium" style={{ color: THEME.colors.accent.primary }}>
                        Services & Packages
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    className="mb-6 text-[2.5rem] font-bold leading-[1.1] sm:text-[3.5rem] lg:text-[4rem]"
                    style={{ color: THEME.colors.text.primary }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    Websites that work
                    <br />
                    <span style={{ color: THEME.colors.accent.primary }}>as hard as you do.</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    className="mx-auto mb-10 max-w-xl text-[1rem] leading-relaxed sm:text-[1.1rem]"
                    style={{ color: THEME.colors.text.secondary }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Not just beautiful. <span style={{ color: THEME.colors.text.primary }}>Profitable.</span>
                    <br />
                    Cinematic websites designed to convert visitors into customers.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <PrimaryButton href="#packages" size="large">
                        View Packages
                        <span>↓</span>
                    </PrimaryButton>
                    <PrimaryButton href="/brief" size="large" variant="secondary">
                        Start Your Brief
                    </PrimaryButton>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                    className="mt-12 flex flex-wrap items-center justify-center gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                >
                    {[
                        { label: "Fast Delivery", value: "2-6 weeks" },
                        { label: "Projects Done", value: "50+" },
                        { label: "Satisfaction", value: "100%" },
                    ].map((stat) => (
                        <div key={stat.label} className="flex items-center gap-2">
                            <span className="text-[0.9rem] font-semibold" style={{ color: THEME.colors.accent.primary }}>
                                {stat.value}
                            </span>
                            <span className="text-[0.75rem]" style={{ color: THEME.colors.text.muted }}>
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div
                    className="h-12 w-px"
                    style={{ background: `linear-gradient(to bottom, ${THEME.colors.accent.primary}60, transparent)` }}
                />
            </motion.div>
        </section>
    );
}

// =============================================================================
// PROBLEM SECTION
// =============================================================================

function ProblemSection() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <section
            ref={ref}
            className="relative overflow-hidden px-5 py-20 sm:px-6 sm:py-28"
            style={{ background: THEME.colors.bg.secondary }}
        >
            <div className="mx-auto max-w-5xl">
                <SectionLabel>The Problem</SectionLabel>
                <SectionTitle>
                    Your current website is{" "}
                    <span style={{ color: THEME.colors.accent.primary }}>costing you customers.</span>
                </SectionTitle>

                <div className="mt-12 grid gap-5 sm:grid-cols-3">
                    {PROBLEMS.map((problem, i) => (
                        <motion.div
                            key={problem.title}
                            className="relative overflow-hidden rounded-lg p-6"
                            style={{
                                background: THEME.colors.bg.card,
                                border: `1px solid ${THEME.colors.border.subtle}`,
                            }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            whileHover={{ borderColor: THEME.colors.border.hover, y: -4 }}
                        >
                            <span className="mb-4 block text-3xl">{problem.icon}</span>
                            <h3 className="mb-2 text-[1rem] font-semibold" style={{ color: THEME.colors.text.primary }}>
                                {problem.title}
                            </h3>
                            <p className="text-[0.85rem] leading-relaxed" style={{ color: THEME.colors.text.muted }}>
                                {problem.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    className="mt-10 text-center text-[1rem]"
                    style={{ color: THEME.colors.text.secondary }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4 }}
                >
                    Sound familiar?{" "}
                    <span style={{ color: THEME.colors.accent.primary }}>It doesn't have to be this way.</span>
                </motion.p>
            </div>
        </section>
    );
}

// =============================================================================
// PACKAGES SECTION
// =============================================================================

function PackagesSection() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <section
            id="packages"
            ref={ref}
            className="relative overflow-hidden px-5 py-20 sm:px-6 sm:py-28"
            style={{ background: THEME.colors.bg.primary }}
        >
            <AmbientGlow />

            <div className="relative z-10 mx-auto max-w-6xl">
                <SectionLabel>Packages</SectionLabel>
                <SectionTitle>
                    Choose your <span style={{ color: THEME.colors.accent.primary }}>growth plan.</span>
                </SectionTitle>
                <motion.p
                    className="mx-auto mt-4 max-w-xl text-center text-[0.95rem]"
                    style={{ color: THEME.colors.text.secondary }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.2 }}
                >
                    Transparent pricing. No hidden fees. Everything you need to launch and grow.
                </motion.p>

                {/* Packages Grid */}
                <div className="mt-12 grid gap-6 lg:grid-cols-3">
                    {PACKAGES.map((pkg, i) => (
                        <motion.div
                            key={pkg.id}
                            className={`relative overflow-hidden rounded-xl ${pkg.popular ? "lg:-mt-4 lg:mb-4" : ""}`}
                            style={{
                                background: THEME.colors.bg.card,
                                border: `1px solid ${pkg.popular ? THEME.colors.accent.primary : THEME.colors.border.subtle}`,
                            }}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            whileHover={{
                                borderColor: THEME.colors.border.hover,
                                boxShadow: pkg.popular
                                    ? `0 0 40px rgba(${THEME.colors.accent.primaryRgb}, 0.2)`
                                    : `0 0 30px rgba(${THEME.colors.accent.primaryRgb}, 0.1)`,
                            }}
                        >
                            {/* Popular badge */}
                            {pkg.popular && (
                                <div
                                    className="absolute -right-8 top-6 rotate-45 px-10 py-1 text-[0.6rem] font-bold uppercase tracking-wider"
                                    style={{
                                        background: THEME.colors.accent.primary,
                                        color: THEME.colors.bg.primary,
                                    }}
                                >
                                    Popular
                                </div>
                            )}

                            <div className="p-6 sm:p-8">
                                {/* Header */}
                                <div className="mb-6">
                                    <h3 className="text-[1.3rem] font-bold" style={{ color: THEME.colors.text.primary }}>
                                        {pkg.name}
                                    </h3>
                                    <p className="mt-1 text-[0.8rem]" style={{ color: THEME.colors.text.muted }}>
                                        {pkg.tagline}
                                    </p>
                                </div>

                                {/* Price */}
                                <div className="mb-6">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-[0.9rem]" style={{ color: THEME.colors.text.muted }}>
                                            {pkg.currency}
                                        </span>
                                        <span
                                            className="text-[2.5rem] font-bold leading-none"
                                            style={{ color: THEME.colors.accent.primary }}
                                        >
                                            {pkg.price.toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-[0.75rem]" style={{ color: THEME.colors.text.dim }}>
                                        Delivery: {pkg.delivery}
                                    </p>
                                </div>

                                {/* Description */}
                                <p className="mb-6 text-[0.85rem] leading-relaxed" style={{ color: THEME.colors.text.secondary }}>
                                    {pkg.description}
                                </p>

                                {/* CTA */}
                                <Link href="/brief" className="block">
                                    <motion.button
                                        className="w-full rounded-lg py-3.5 text-[0.75rem] font-semibold uppercase tracking-wider transition-all duration-300"
                                        style={{
                                            background: pkg.popular
                                                ? `linear-gradient(135deg, ${THEME.colors.accent.primary}, ${THEME.colors.accent.primaryDark})`
                                                : "transparent",
                                            color: pkg.popular ? THEME.colors.bg.primary : THEME.colors.text.primary,
                                            border: pkg.popular ? "none" : `1px solid ${THEME.colors.border.default}`,
                                        }}
                                        whileHover={{
                                            scale: 1.02,
                                            boxShadow: pkg.popular ? `0 0 25px rgba(${THEME.colors.accent.primaryRgb}, 0.4)` : "none",
                                            borderColor: !pkg.popular ? THEME.colors.accent.primary : undefined,
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {pkg.cta}
                                    </motion.button>
                                </Link>

                                {/* Divider */}
                                <div
                                    className="my-6 h-px"
                                    style={{ background: `linear-gradient(90deg, transparent, ${THEME.colors.border.default}, transparent)` }}
                                />

                                {/* Features */}
                                <ul className="space-y-3">
                                    {pkg.features.map((feature) => (
                                        <li key={feature.text} className="flex items-start gap-3">
                                            <span
                                                className="mt-0.5 text-[0.8rem]"
                                                style={{ color: feature.included ? THEME.colors.accent.primary : THEME.colors.text.dim }}
                                            >
                                                {feature.included ? "✓" : "—"}
                                            </span>
                                            <span
                                                className="text-[0.8rem]"
                                                style={{
                                                    color: feature.included ? THEME.colors.text.secondary : THEME.colors.text.dim,
                                                    textDecoration: feature.included ? "none" : "line-through",
                                                }}
                                            >
                                                {feature.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Ideal for */}
                                <div className="mt-6 pt-6" style={{ borderTop: `1px solid ${THEME.colors.border.subtle}` }}>
                                    <p className="mb-2 text-[0.65rem] uppercase tracking-wider" style={{ color: THEME.colors.text.dim }}>
                                        Ideal for
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {pkg.idealFor.map((item) => (
                                            <span
                                                key={item}
                                                className="rounded-full px-2.5 py-1 text-[0.65rem]"
                                                style={{
                                                    background: `rgba(${THEME.colors.accent.primaryRgb}, 0.1)`,
                                                    color: THEME.colors.text.muted,
                                                }}
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Payment note */}
                <motion.p
                    className="mt-10 text-center text-[0.8rem]"
                    style={{ color: THEME.colors.text.dim }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 }}
                >
                    💳 Payment: 50% upfront, 50% before delivery. All prices in USD.
                </motion.p>
            </div>
        </section>
    );
}

// =============================================================================
// ADD-ONS SECTION
// =============================================================================

function AddonsSection() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <section
            ref={ref}
            className="relative overflow-hidden px-5 py-20 sm:px-6 sm:py-28"
            style={{ background: THEME.colors.bg.secondary }}
        >
            <div className="mx-auto max-w-4xl">
                <SectionLabel>Add-ons</SectionLabel>
                <SectionTitle>
                    Need <span style={{ color: THEME.colors.accent.primary }}>something extra?</span>
                </SectionTitle>

                <div className="mt-12 grid gap-3 sm:grid-cols-2">
                    {ADDONS.map((addon, i) => (
                        <motion.div
                            key={addon.name}
                            className="flex items-center justify-between rounded-lg px-5 py-4"
                            style={{
                                background: THEME.colors.bg.card,
                                border: `1px solid ${THEME.colors.border.subtle}`,
                            }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            whileHover={{ borderColor: THEME.colors.border.hover }}
                        >
                            <span className="text-[0.85rem]" style={{ color: THEME.colors.text.secondary }}>
                                {addon.name}
                            </span>
                            <span className="text-[0.9rem] font-semibold" style={{ color: THEME.colors.accent.primary }}>
                                ${addon.price}
                                <span className="font-normal" style={{ color: THEME.colors.text.dim }}>
                                    {addon.unit}
                                </span>
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// =============================================================================
// PROCESS SECTION
// =============================================================================

function ProcessSection() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <section
            ref={ref}
            className="relative overflow-hidden px-5 py-20 sm:px-6 sm:py-28"
            style={{ background: THEME.colors.bg.primary }}
        >
            <AmbientGlow />

            <div className="relative z-10 mx-auto max-w-5xl">
                <SectionLabel>The Process</SectionLabel>
                <SectionTitle>
                    From idea to launch in{" "}
                    <span style={{ color: THEME.colors.accent.primary }}>weeks, not months.</span>
                </SectionTitle>

                <div className="mt-16">
                    {PROCESS_STEPS.map((step, i) => (
                        <motion.div
                            key={step.number}
                            className="relative flex gap-6 pb-12 last:pb-0"
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                        >
                            {/* Timeline line */}
                            {i !== PROCESS_STEPS.length - 1 && (
                                <div
                                    className="absolute left-[23px] top-14 h-[calc(100%-3.5rem)] w-px"
                                    style={{
                                        background: `linear-gradient(to bottom, ${THEME.colors.accent.primary}40, ${THEME.colors.border.subtle})`,
                                    }}
                                />
                            )}

                            {/* Number circle */}
                            <div
                                className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
                                style={{
                                    background: `linear-gradient(135deg, ${THEME.colors.accent.primary}20, ${THEME.colors.bg.tertiary})`,
                                    border: `1px solid ${THEME.colors.border.default}`,
                                }}
                            >
                                <span className="text-[0.8rem] font-bold" style={{ color: THEME.colors.accent.primary }}>
                                    {step.number}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="flex-1 pt-1">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="text-xl">{step.icon}</span>
                                    <h3 className="text-[1.1rem] font-semibold" style={{ color: THEME.colors.text.primary }}>
                                        {step.title}
                                    </h3>
                                    <span
                                        className="rounded-full px-2.5 py-0.5 text-[0.6rem] uppercase tracking-wider"
                                        style={{
                                            background: `rgba(${THEME.colors.accent.primaryRgb}, 0.1)`,
                                            color: THEME.colors.accent.primary,
                                        }}
                                    >
                                        {step.duration}
                                    </span>
                                </div>
                                <p className="mt-2 text-[0.9rem] leading-relaxed" style={{ color: THEME.colors.text.muted }}>
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// =============================================================================
// FAQ SECTION
// =============================================================================

function FAQSection() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section
            ref={ref}
            className="relative overflow-hidden px-5 py-20 sm:px-6 sm:py-28"
            style={{ background: THEME.colors.bg.secondary }}
        >
            <div className="mx-auto max-w-3xl">
                <SectionLabel>FAQ</SectionLabel>
                <SectionTitle>
                    Got <span style={{ color: THEME.colors.accent.primary }}>questions?</span>
                </SectionTitle>

                <div className="mt-12 space-y-3">
                    {FAQS.map((faq, i) => (
                        <motion.div
                            key={i}
                            className="overflow-hidden rounded-lg"
                            style={{
                                background: THEME.colors.bg.card,
                                border: `1px solid ${openIndex === i ? THEME.colors.border.hover : THEME.colors.border.subtle}`,
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                        >
                            <button
                                className="flex w-full items-center justify-between px-5 py-4 text-left"
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            >
                                <span className="pr-4 text-[0.9rem] font-medium" style={{ color: THEME.colors.text.primary }}>
                                    {faq.question}
                                </span>
                                <motion.span
                                    className="flex-shrink-0 text-lg"
                                    style={{ color: THEME.colors.accent.primary }}
                                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    +
                                </motion.span>
                            </button>

                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <p
                                            className="px-5 pb-5 text-[0.85rem] leading-relaxed"
                                            style={{ color: THEME.colors.text.muted }}
                                        >
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// =============================================================================
// CTA SECTION
// =============================================================================

function CTASection() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <section
            ref={ref}
            className="relative overflow-hidden px-5 py-24 sm:px-6 sm:py-32"
            style={{ background: THEME.colors.bg.primary }}
        >
            <AmbientGlow />

            {/* Decorative elements */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute left-1/4 top-1/4 text-6xl opacity-10"
                    style={{ color: THEME.colors.accent.primary }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                    ✦
                </motion.div>
                <motion.div
                    className="absolute right-1/4 bottom-1/4 text-4xl opacity-10"
                    style={{ color: THEME.colors.accent.primary }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                    ✦
                </motion.div>
            </div>

            <motion.div
                className="relative z-10 mx-auto max-w-2xl text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
            >
                <motion.span
                    className="mb-4 inline-block text-4xl"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    🚀
                </motion.span>

                <h2
                    className="mb-4 text-[2rem] font-bold leading-tight sm:text-[2.5rem]"
                    style={{ color: THEME.colors.text.primary }}
                >
                    Ready to see
                    <br />
                    <span style={{ color: THEME.colors.accent.primary }}>what's possible?</span>
                </h2>

                <p className="mb-10 text-[1rem]" style={{ color: THEME.colors.text.secondary }}>
                    Book a free discovery call. No pressure, no commitments.
                    <br />
                    Just a conversation about your goals.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <PrimaryButton href="/brief" size="large">
                        Start Your Brief
                        <span>✦</span>
                    </PrimaryButton>
                    <PrimaryButton href="/work" size="large" variant="secondary">
                        View Our Work
                    </PrimaryButton>
                </div>

                <p className="mt-8 text-[0.75rem]" style={{ color: THEME.colors.text.dim }}>
                    ⚡ Average response time: 2 hours
                </p>
            </motion.div>
        </section>
    );
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function ServicesPage() {
    const mousePos = useMousePosition();

    return (
        <main className="relative min-h-screen" style={{ background: THEME.colors.bg.primary }}>
            {/* Cursor glow */}
            <div
                className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${THEME.colors.accent.primaryRgb}, 0.03), transparent 40%)`,
                }}
            />

            {/* Film grain */}
            <div
                className="pointer-events-none fixed inset-0 z-40 opacity-[0.02]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
            />

            <HeroSection />
            <ProblemSection />
            <PackagesSection />
            <AddonsSection />
            <ProcessSection />
            <FAQSection />
            <CTASection />
        </main>
    );
}