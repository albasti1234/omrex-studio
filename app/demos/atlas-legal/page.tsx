"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import AtlasNav from "./_components/AtlasNav";
import AtlasFooter from "./_components/AtlasFooter";
import AtlasIcon from "./_components/AtlasIcon";
import AtlasSectionHeader from "./_components/AtlasSectionHeader";
import AtlasCard from "./_components/AtlasCard";
import AtlasLiveChat from "./_components/AtlasLiveChat";
import ParticleBackground from "./_components/ParticleBackground";
import AnimatedScales from "./_components/AnimatedScales";
import { useTranslation } from "./_lib/i18n/LanguageContext";
import { PRACTICE_AREAS } from "./_data/practice-areas";
import { ATTORNEYS } from "./_data/attorneys";
import {
    TESTIMONIALS,
    METHODOLOGY_STEPS,
    getFeaturedCaseStudies,
    getLocalizedText,
} from "./_lib/content";

// Animation variants for staggered reveals
const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    }),
};

export default function AtlasLegalHome() {
    const { t, isRtl, language } = useTranslation();

    // Stats configuration
    const STATS = [
        { value: "$2B+", labelKey: "stats.recovered" as const },
        { value: "98%", labelKey: "stats.successRate" as const },
        { value: "30+", labelKey: "stats.experience" as const },
        { value: "500+", labelKey: "stats.casesWon" as const },
    ];

    // Features for "Why Choose Us"
    const FEATURES = [
        {
            titleKey: "why.trackRecord" as const,
            descKey: "why.trackRecordDesc" as const,
            icon: "award",
        },
        {
            titleKey: "why.eliteTeam" as const,
            descKey: "why.eliteTeamDesc" as const,
            icon: "user",
        },
        {
            titleKey: "why.clientFirst" as const,
            descKey: "why.clientFirstDesc" as const,
            icon: "shield",
        },
        {
            titleKey: "why.noFee" as const,
            descKey: "why.noFeeDesc" as const,
            icon: "scales",
        },
    ];

    // FAQ items
    const FAQS = [
        { qKey: "faq.q1" as const, aKey: "faq.a1" as const },
        { qKey: "faq.q2" as const, aKey: "faq.a2" as const },
        { qKey: "faq.q3" as const, aKey: "faq.a3" as const },
        { qKey: "faq.q4" as const, aKey: "faq.a4" as const },
    ];

    const featuredCases = getFeaturedCaseStudies();

    return (
        <>
            <AtlasNav />

            <main className="overflow-x-hidden">
                {/* ════════════════════════════════════════════════════════════
                    HERO — Cinematic, Editorial, Commanding
                ════════════════════════════════════════════════════════════ */}
                <section className="al-section-hero bg-[oklch(0.10_0.015_260)]">
                    {/* Multi-layer background */}
                    <div className="absolute inset-0 z-0">
                        {/* Base gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#080e1a] via-[#0a1628] to-[#0d1a2d]" />

                        {/* Gold radial accent */}
                        <motion.div
                            className="absolute inset-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 2 }}
                            style={{
                                backgroundImage: `radial-gradient(ellipse 80% 50% at 70% 40%, rgba(180, 150, 90, 0.12) 0%, transparent 60%)`,
                            }}
                        />

                        {/* Animated shimmer */}
                        <motion.div
                            className="absolute inset-0 opacity-20"
                            animate={{
                                backgroundPosition: ["0% 0%", "100% 100%"],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "linear",
                            }}
                            style={{
                                backgroundImage: `linear-gradient(135deg, transparent 0%, transparent 40%, rgba(180, 150, 90, 0.06) 50%, transparent 60%, transparent 100%)`,
                                backgroundSize: "200% 200%",
                            }}
                        />

                        {/* Cinematic vignette */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(8,14,26,0.9)_100%)]" />
                    </div>

                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.10_0.015_260)] via-transparent to-[oklch(0.10_0.015_260)/50] z-[1]" />
                    <div
                        className={`absolute inset-0 bg-gradient-to-r ${isRtl ? "from-transparent via-[oklch(0.10_0.015_260)/30] to-[oklch(0.10_0.015_260)/80]" : "from-[oklch(0.10_0.015_260)/80] via-[oklch(0.10_0.015_260)/30] to-transparent"} z-[1]`}
                    />

                    {/* Decorative vertical lines */}
                    <div
                        className={`absolute ${isRtl ? "right-0" : "left-0"} top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-atlas-accent/40 to-transparent z-[2]`}
                    />
                    <div
                        className={`absolute ${isRtl ? "right-20" : "left-20"} top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-atlas-accent/20 to-transparent z-[2]`}
                    />

                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-atlas-accent/30 to-transparent z-[2]" />

                    {/* Subtle particles */}
                    <ParticleBackground
                        particleCount={25}
                        color="gold"
                        className="z-[2] opacity-30"
                    />

                    {/* Hero Content */}
                    <div className="al-container relative z-10 py-32 lg:py-40">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            {/* Text Content */}
                            <motion.div
                                initial={{ opacity: 0, x: isRtl ? 60 : -60 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 1.2,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className={isRtl ? "lg:order-2" : ""}
                            >
                                {/* Kicker */}
                                <motion.div
                                    className="flex items-center gap-4 mb-10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.8 }}
                                >
                                    <motion.div
                                        className={`h-[2px] bg-gradient-to-r ${isRtl ? "from-transparent to-atlas-accent" : "from-atlas-accent to-transparent"}`}
                                        initial={{ width: 0 }}
                                        animate={{ width: 80 }}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.8,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                    />
                                    <span className="uppercase tracking-[0.35em] text-[0.6875rem] font-bold text-atlas-accent">
                                        {t("hero.established")}
                                    </span>
                                </motion.div>

                                {/* Main Headline */}
                                <h1 className="al-heading-display text-white mb-8">
                                    {t("hero.title1")}
                                    <br />
                                    <motion.span
                                        className="text-atlas-accent italic inline-block"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6, duration: 0.8 }}
                                    >
                                        {t("hero.title2")}
                                    </motion.span>
                                </h1>

                                {/* Subheadline */}
                                <motion.p
                                    className="text-lg sm:text-xl text-white/60 max-w-xl leading-relaxed mb-12"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8, duration: 0.8 }}
                                >
                                    {t("hero.subtitle")}
                                </motion.p>

                                {/* CTAs */}
                                <motion.div
                                    className="flex flex-wrap gap-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1, duration: 0.8 }}
                                >
                                    <Link
                                        href="/demos/atlas-legal/consultation"
                                        className="al-btn al-btn-gold text-base group"
                                    >
                                        {t("hero.cta.consultation")}
                                        <AtlasIcon
                                            name="arrow-right"
                                            className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRtl ? "rotate-180 group-hover:-translate-x-1" : ""}`}
                                        />
                                    </Link>
                                    <Link
                                        href="/demos/atlas-legal/practice-areas"
                                        className="al-btn al-btn-outline-light text-base"
                                    >
                                        {t("hero.cta.explore")}
                                    </Link>
                                </motion.div>

                                {/* Stats Grid */}
                                <motion.div
                                    className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-20 pt-10 border-t border-white/10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.2, duration: 0.8 }}
                                >
                                    {STATS.map((stat, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1.3 + i * 0.1 }}
                                            className="group"
                                        >
                                            <div className="text-3xl sm:text-4xl font-serif font-bold text-atlas-accent group-hover:al-shimmer transition-all">
                                                {stat.value}
                                            </div>
                                            <div className="text-[0.625rem] sm:text-xs uppercase tracking-wider text-white/40 mt-2">
                                                {t(stat.labelKey)}
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>

                            {/* Hero Visual */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.2, delay: 0.4 }}
                                className={`relative hidden lg:block ${isRtl ? "lg:order-1" : ""}`}
                            >
                                <div className="relative aspect-[4/5] overflow-hidden">
                                    {/* Corner accents */}
                                    <div
                                        className={`absolute top-0 ${isRtl ? "right-0" : "left-0"} w-24 h-24 border-t-2 ${isRtl ? "border-r-2" : "border-l-2"} border-atlas-accent z-10`}
                                    />
                                    <div
                                        className={`absolute bottom-0 ${isRtl ? "left-0" : "right-0"} w-24 h-24 border-b-2 ${isRtl ? "border-l-2" : "border-r-2"} border-atlas-accent z-10`}
                                    />

                                    {/* Animated corner dots */}
                                    <motion.div
                                        className={`absolute top-0 ${isRtl ? "right-0" : "left-0"} w-2 h-2 bg-atlas-accent z-20`}
                                        animate={{ opacity: [1, 0.5, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                    <motion.div
                                        className={`absolute bottom-0 ${isRtl ? "left-0" : "right-0"} w-2 h-2 bg-atlas-accent z-20`}
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />

                                    {/* Main visual container */}
                                    <div className="absolute inset-6 overflow-hidden border border-white/5">
                                        {/* Hero Office Image */}
                                        <Image
                                            src="/images/atlas-legal/hero-office.png"
                                            alt="Atlas Legal Office"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                        {/* Ambient glow overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1422]/80 via-transparent to-[#0a1422]/30" />
                                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(180,150,90,0.15)_0%,_transparent_70%)]" />
                                    </div>

                                    {/* Experience badge */}
                                    <motion.div
                                        className={`absolute -bottom-6 ${isRtl ? "-left-6" : "-right-6"} w-28 h-28 bg-gradient-to-br from-atlas-accent to-atlas-accent2 flex flex-col items-center justify-center text-atlas-primary z-20`}
                                        initial={{ scale: 0, rotate: -10 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{
                                            delay: 1,
                                            duration: 0.6,
                                            type: "spring",
                                        }}
                                    >
                                        <span className="text-3xl font-serif font-bold">
                                            30+
                                        </span>
                                        <span className="text-[0.5rem] uppercase tracking-wider font-bold mt-0.5">
                                            {t("stats.experience")}
                                        </span>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
                    >
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "easeInOut",
                            }}
                            className="flex flex-col items-center gap-3 text-white/30 hover:text-white/50 transition-colors cursor-pointer"
                        >
                            <span className="text-[0.5625rem] uppercase tracking-[0.3em] font-medium">
                                {t("hero.scroll")}
                            </span>
                            <div className="w-px h-8 bg-gradient-to-b from-atlas-accent/50 to-transparent" />
                        </motion.div>
                    </motion.div>
                </section>

                {/* ════════════════════════════════════════════════════════════
                    TRUST BAR
                ════════════════════════════════════════════════════════════ */}
                <section className="py-8 border-y border-atlas-border bg-atlas-surface relative z-10">
                    <div className="al-container">
                        <div className="flex flex-wrap justify-center items-center gap-12 text-atlas-muted">
                            {[
                                "Super Lawyers",
                                "Best Lawyers in America",
                                "Chambers USA",
                                "The American Lawyer",
                                "Martindale-Hubbell",
                            ].map((brand, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 0.5 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-sm font-serif italic font-medium tracking-wide hover:opacity-80 transition-opacity cursor-default"
                                >
                                    {brand}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ════════════════════════════════════════════════════════════
                    PRACTICE AREAS — Editorial Grid
                ════════════════════════════════════════════════════════════ */}
                <section className="al-section-light al-pattern-grid">
                    <div className="al-container">
                        <AtlasSectionHeader
                            kicker={t("practice.kicker")}
                            title={
                                <>
                                    {t("practice.title1")}
                                    <br />
                                    {t("practice.title2")}
                                </>
                            }
                            subtitle={t("practice.subtitle")}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {PRACTICE_AREAS.map((area, i) => (
                                <AtlasCard
                                    key={area.slug}
                                    title={area.title}
                                    titleAr={area.titleAr}
                                    description={area.shortDescription}
                                    descriptionAr={area.shortDescriptionAr}
                                    icon={area.icon}
                                    href={`/demos/atlas-legal/practice-areas/${area.slug}`}
                                    index={i}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ════════════════════════════════════════════════════════════
                    METHODOLOGY / PROCESS — Timeline
                ════════════════════════════════════════════════════════════ */}
                <section className="al-section-dark relative overflow-hidden">
                    {/* Subtle pattern */}
                    <div className="absolute inset-0 al-pattern-lines opacity-5" />

                    <div className="al-container relative z-10">
                        <AtlasSectionHeader
                            light
                            kicker={t("methodology.kicker")}
                            title={t("methodology.title")}
                        />

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                            {METHODOLOGY_STEPS.map((step, i) => (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                    className="relative"
                                >
                                    {/* Step number */}
                                    <div className="text-6xl font-serif font-bold text-atlas-accent/20 mb-4">
                                        {String(step.id).padStart(2, "0")}
                                    </div>

                                    {/* Icon */}
                                    <div className="w-12 h-12 mb-4 flex items-center justify-center border border-atlas-accent">
                                        <AtlasIcon
                                            name={step.icon as any}
                                            className="w-5 h-5 text-atlas-accent"
                                        />
                                    </div>

                                    <h3 className="text-xl font-serif font-semibold text-white mb-3">
                                        {getLocalizedText(step.title, language)}
                                    </h3>
                                    <p className="text-white/60 text-sm leading-relaxed">
                                        {getLocalizedText(step.description, language)}
                                    </p>

                                    {/* Connector line (except last) */}
                                    {i < METHODOLOGY_STEPS.length - 1 && (
                                        <div
                                            className={`hidden lg:block absolute top-8 ${isRtl ? "left-0 -translate-x-full" : "right-0 translate-x-full"} w-full h-px bg-gradient-to-r from-atlas-accent/30 to-transparent`}
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ════════════════════════════════════════════════════════════
                    ABOUT / FIRM STORY
                ════════════════════════════════════════════════════════════ */}
                <section className="al-section-warm relative overflow-hidden">
                    <div
                        className={`absolute top-0 ${isRtl ? "left-0" : "right-0"} w-1/2 h-full bg-gradient-to-l ${isRtl ? "from-transparent to-atlas-accent-muted" : "from-atlas-accent-muted to-transparent"}`}
                    />

                    <div className="al-container relative z-10">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <AtlasSectionHeader
                                    center={false}
                                    kicker={t("about.kicker")}
                                    title={t("about.title")}
                                    subtitle={t("about.subtitle")}
                                />

                                <div className="space-y-5 mb-10">
                                    {[
                                        t("about.feature1"),
                                        t("about.feature2"),
                                        t("about.feature3"),
                                        t("about.feature4"),
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-start gap-4"
                                        >
                                            <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center border border-atlas-accent">
                                                <AtlasIcon
                                                    name="check"
                                                    className="w-3 h-3 text-atlas-accent"
                                                />
                                            </div>
                                            <span className="text-atlas-muted">
                                                {item}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>

                                <Link
                                    href="/demos/atlas-legal/about"
                                    className="al-btn al-btn-primary"
                                >
                                    {t("about.learnStory")}
                                    <AtlasIcon
                                        name="arrow-right"
                                        className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`}
                                    />
                                </Link>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {STATS.map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.15 }}
                                        className="p-8 bg-atlas-surface-elevated border border-atlas-border hover:border-atlas-accent/50 transition-colors group"
                                    >
                                        <div className="text-4xl lg:text-5xl font-serif font-bold text-atlas-accent group-hover:al-shimmer transition-all">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-atlas-muted mt-2 uppercase tracking-wider">
                                            {t(stat.labelKey)}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ════════════════════════════════════════════════════════════
                    FEATURED ATTORNEYS
                ════════════════════════════════════════════════════════════ */}
                <section className="al-section-light">
                    <div className="al-container">
                        <AtlasSectionHeader
                            kicker={t("attorneys.kicker")}
                            title={t("attorneys.title")}
                            subtitle={t("attorneys.subtitle")}
                        />

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {ATTORNEYS.slice(0, 3).map((attorney, i) => (
                                <motion.div
                                    key={attorney.slug}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                >
                                    <Link
                                        href={`/demos/atlas-legal/attorneys/${attorney.slug}`}
                                        className="group block"
                                    >
                                        <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-[oklch(0.10_0.015_260)]">
                                            <Image
                                                src={`/images/atlas-legal/${attorney.slug}.png`}
                                                alt={attorney.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                            <div className="absolute inset-0 bg-atlas-accent/0 group-hover:bg-atlas-accent/10 transition-colors duration-500" />
                                            <div
                                                className={`absolute bottom-0 inset-x-0 h-1 bg-atlas-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${isRtl ? "origin-right" : "origin-left"}`}
                                            />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="text-xl font-serif font-semibold group-hover:text-atlas-accent transition-colors">
                                                {attorney.name}
                                            </h3>
                                            <p className="text-sm text-atlas-accent mt-1">
                                                {attorney.title}
                                            </p>
                                            <p className="text-sm text-atlas-muted mt-1">
                                                {attorney.role}
                                            </p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Link
                                href="/demos/atlas-legal/attorneys"
                                className="al-btn al-btn-outline"
                            >
                                {t("attorneys.viewAll")}
                                <AtlasIcon
                                    name="arrow-right"
                                    className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`}
                                />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ════════════════════════════════════════════════════════════
                    WHY CHOOSE US
                ════════════════════════════════════════════════════════════ */}
                <section className="al-section-warm">
                    <div className="al-container">
                        <AtlasSectionHeader
                            kicker={t("why.kicker")}
                            title={t("why.title")}
                        />

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {FEATURES.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-center p-8 bg-atlas-surface-elevated border border-atlas-border hover:border-atlas-accent/50 transition-all group"
                                >
                                    <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center border border-atlas-accent group-hover:bg-atlas-accent/10 transition-colors">
                                        <AtlasIcon
                                            name={feature.icon as any}
                                            className="w-6 h-6 text-atlas-accent"
                                        />
                                    </div>
                                    <h3 className="text-lg font-serif font-semibold mb-3">
                                        {t(feature.titleKey)}
                                    </h3>
                                    <p className="text-sm text-atlas-muted leading-relaxed">
                                        {t(feature.descKey)}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ════════════════════════════════════════════════════════════
                    TESTIMONIALS
                ════════════════════════════════════════════════════════════ */}
                <section className="al-section-dark relative">
                    <div className="absolute inset-0 al-pattern-lines opacity-10" />

                    <div className="al-container relative z-10">
                        <AtlasSectionHeader
                            light
                            kicker={t("testimonials.kicker")}
                            title={t("testimonials.title")}
                        />

                        <div className="grid md:grid-cols-3 gap-8">
                            {TESTIMONIALS.map((testimonial, i) => (
                                <motion.div
                                    key={testimonial.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                    className="relative p-8 border border-white/10 hover:border-atlas-accent/30 transition-colors bg-white/[0.02]"
                                >
                                    {/* Quote mark */}
                                    <span
                                        className={`absolute top-4 ${isRtl ? "right-4" : "left-4"} text-6xl text-atlas-accent/15 font-serif leading-none`}
                                    >
                                        "
                                    </span>

                                    <div className="relative z-10">
                                        {/* Stars */}
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(testimonial.rating)].map((_, j) => (
                                                <AtlasIcon
                                                    key={j}
                                                    name="star"
                                                    className="w-4 h-4 text-atlas-accent fill-current"
                                                />
                                            ))}
                                        </div>

                                        <p className="text-white/80 italic leading-relaxed mb-6">
                                            {getLocalizedText(testimonial.text, language)}
                                        </p>

                                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                            <div>
                                                <div className="font-semibold text-white">
                                                    {getLocalizedText(
                                                        testimonial.author,
                                                        language
                                                    )}
                                                </div>
                                                <div className="text-xs text-white/50">
                                                    {getLocalizedText(
                                                        testimonial.role,
                                                        language
                                                    )}
                                                </div>
                                            </div>
                                            <div className={`${isRtl ? "text-left" : "text-right"}`}>
                                                <div className="text-atlas-accent font-bold">
                                                    {getLocalizedText(
                                                        testimonial.result,
                                                        language
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ════════════════════════════════════════════════════════════
                    FAQ
                ════════════════════════════════════════════════════════════ */}
                <section className="al-section-light">
                    <div className="al-container-narrow">
                        <AtlasSectionHeader title={t("faq.title")} />

                        <div className="space-y-4">
                            {FAQS.map((faq, i) => (
                                <motion.details
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group p-6 bg-atlas-surface-elevated border border-atlas-border open:border-atlas-accent open:shadow-lg transition-all cursor-pointer"
                                >
                                    <summary className="flex justify-between items-center list-none font-serif font-semibold text-lg">
                                        {t(faq.qKey)}
                                        <span
                                            className={`${isRtl ? "mr-4" : "ml-4"} flex-shrink-0 transition-transform group-open:rotate-180`}
                                        >
                                            <AtlasIcon
                                                name="chevron-down"
                                                className="w-5 h-5 text-atlas-accent"
                                            />
                                        </span>
                                    </summary>
                                    <p className="text-atlas-muted mt-4 leading-relaxed">
                                        {t(faq.aKey)}
                                    </p>
                                </motion.details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ════════════════════════════════════════════════════════════
                    CONTACT / LOCATION
                ════════════════════════════════════════════════════════════ */}
                <section className="al-section-warm">
                    <div className="al-container">
                        <div className="grid lg:grid-cols-2 gap-16">
                            {/* Map Placeholder */}
                            <div className="relative h-[400px] lg:h-auto bg-[oklch(0.10_0.015_260)] flex items-center justify-center">
                                <div className="text-center text-white/30">
                                    <AtlasIcon
                                        name="location"
                                        className="w-12 h-12 mx-auto mb-4"
                                    />
                                    <span className="uppercase tracking-widest text-xs">
                                        {language === "ar"
                                            ? "خريطة موقع المكتب"
                                            : "Office Location Map"}
                                    </span>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="p-8 lg:p-12 bg-atlas-surface-elevated border border-atlas-border">
                                <AtlasSectionHeader
                                    center={false}
                                    kicker={t("contact.kicker")}
                                    title={t("contact.title")}
                                    subtitle={t("contact.subtitle")}
                                />

                                <div className="space-y-6">
                                    {/* Address */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-atlas-accent">
                                            <AtlasIcon
                                                name="location"
                                                className="w-5 h-5 text-atlas-accent"
                                            />
                                        </div>
                                        <div>
                                            <div className="font-semibold mb-1">
                                                {t("contact.office")}
                                            </div>
                                            <div className="text-atlas-muted text-sm whitespace-pre-line">
                                                {t("contact.address")}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hours */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-atlas-accent">
                                            <AtlasIcon
                                                name="clock"
                                                className="w-5 h-5 text-atlas-accent"
                                            />
                                        </div>
                                        <div>
                                            <div className="font-semibold mb-1">
                                                {t("contact.hours")}
                                            </div>
                                            <div className="text-atlas-muted text-sm whitespace-pre-line">
                                                {t("contact.hoursValue")}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-atlas-accent">
                                            <AtlasIcon
                                                name="phone"
                                                className="w-5 h-5 text-atlas-accent"
                                            />
                                        </div>
                                        <div>
                                            <div className="font-semibold mb-1">
                                                {t("nav.contact")}
                                            </div>
                                            <div className="text-atlas-muted text-sm">
                                                <a
                                                    href="tel:+12125550100"
                                                    className="hover:text-atlas-accent transition-colors"
                                                >
                                                    {t("nav.phone")}
                                                </a>
                                                <br />
                                                <a
                                                    href="mailto:info@atlaslegal.com"
                                                    className="hover:text-atlas-accent transition-colors"
                                                >
                                                    info@atlaslegal.com
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA Buttons */}
                                <div className="mt-8 pt-8 border-t border-atlas-border flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href="/demos/atlas-legal/contact"
                                        className="al-btn al-btn-outline flex-1"
                                    >
                                        <AtlasIcon name="email" className="w-5 h-5" />
                                        {t("contact.contactUs")}
                                    </Link>
                                    <Link
                                        href="/demos/atlas-legal/consultation"
                                        className="al-btn al-btn-gold flex-1"
                                    >
                                        <AtlasIcon name="calendar" className="w-5 h-5" />
                                        {t("contact.bookConsultation")}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ════════════════════════════════════════════════════════════
                    FINAL CTA
                ════════════════════════════════════════════════════════════ */}
                <section className="py-32 relative overflow-hidden bg-[oklch(0.10_0.015_260)]">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--atlas-accent)_0%,_transparent_70%)] opacity-5" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-atlas-accent to-transparent" />

                    <div className="al-container relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="al-kicker justify-center">
                                {t("cta.kicker")}
                            </span>
                            <h2 className="al-heading-1 text-white mb-6">
                                {t("cta.title1")}
                                <br />
                                <span className="text-atlas-accent italic">
                                    {t("cta.title2")}
                                </span>
                            </h2>
                            <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
                                {t("cta.subtitle")}
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link
                                    href="/demos/atlas-legal/consultation"
                                    className="al-btn al-btn-gold text-base"
                                >
                                    {t("hero.cta.consultation")}
                                    <AtlasIcon
                                        name="arrow-right"
                                        className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`}
                                    />
                                </Link>
                                <a
                                    href="tel:+12125550100"
                                    className="al-btn al-btn-outline-light text-base"
                                >
                                    <AtlasIcon name="phone" className="w-5 h-5" />
                                    {t("cta.call")} {t("nav.phone")}
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <AtlasFooter />
            <AtlasLiveChat />
        </>
    );
}
