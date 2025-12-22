"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import VEShell from "./_components/VEShell";
import VESectionHeader from "./_components/VESectionHeader";
import VEPropertyCard from "./_components/VEPropertyCard";
import VEAgentCard from "./_components/VEAgentCard";
import VEButton from "./_components/VEButton";
import VEIcon from "./_components/VEIcon";
import VEInput from "./_components/VEInput";
import { getFeaturedProperties } from "./_data/properties";
import { getFeaturedAgents } from "./_data/agents";
import { NEIGHBORHOODS } from "./_data/neighborhoods";
import { getFeaturedTestimonials } from "./_data/testimonials";

// Timeline steps for buying experience
const BUYING_STEPS = [
    {
        step: "01",
        title: "Discovery Consultation",
        description:
            "Begin with a private consultation where we understand your vision, requirements, and timeline.",
    },
    {
        step: "02",
        title: "Curated Property Selection",
        description:
            "Receive a bespoke portfolio of properties matching your criteria, often including off-market opportunities.",
    },
    {
        step: "03",
        title: "Private Viewings",
        description:
            "Experience properties through carefully arranged private showings at your convenience.",
    },
    {
        step: "04",
        title: "Strategic Negotiation",
        description:
            "Our team leverages market intelligence and relationships to secure optimal terms.",
    },
    {
        step: "05",
        title: "Seamless Closing",
        description:
            "We coordinate every detail through closing, ensuring a flawless transaction.",
    },
];

// Simple chart data
const MARKET_DATA = [
    { label: "Q1", value: 82 },
    { label: "Q2", value: 91 },
    { label: "Q3", value: 87 },
    { label: "Q4", value: 95 },
];

export default function VelvetEstatesHomePage() {
    const featuredProperties = getFeaturedProperties().slice(0, 6);
    const featuredAgents = getFeaturedAgents();
    const testimonials = getFeaturedTestimonials();
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    return (
        <VEShell>
            {/* ═══════════════════════════════════════════════════════════════
                HERO SECTION — Cinematic Opening
            ═══════════════════════════════════════════════════════════════ */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/velvet-estates/hero-day.png"
                        alt="Luxury Manhattan penthouse"
                        fill
                        className="object-cover dark:hidden"
                        priority
                    />
                    <Image
                        src="/images/velvet-estates/hero-night.png"
                        alt="Luxury Manhattan penthouse at night"
                        fill
                        className="object-cover hidden dark:block"
                        priority
                    />
                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-br from-ve-primary/80 via-ve-primary/60 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.55_0.03_270/0.15)_0%,_transparent_60%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_oklch(0.70_0.08_80/0.08)_0%,_transparent_50%)]" />

                    {/* Grid pattern */}
                    <div className="absolute inset-0 ve-grid-pattern opacity-[0.03]" />

                    {/* Noise texture */}
                    <div className="absolute inset-0 ve-noise" />
                </div>

                {/* Content */}
                <div className="relative z-10 ve-container py-32 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="ve-kicker justify-center text-white/60 mb-8">
                            <span>Manhattan's Premier</span>
                        </div>

                        <h1 className="ve-display text-white mb-8 max-w-5xl mx-auto">
                            Exceptional Properties for{" "}
                            <span className="text-ve-accent">
                                Extraordinary Lives
                            </span>
                        </h1>

                        <p className="ve-lead text-white/60 max-w-2xl mx-auto mb-12">
                            Discover Manhattan's most coveted residences. From iconic
                            penthouses to historic townhouses, we connect discerning
                            buyers with properties of unparalleled distinction.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/demos/velvet-estates/properties">
                                <VEButton
                                    variant="accent"
                                    size="lg"
                                    icon={<VEIcon name="arrow-right" className="w-5 h-5" />}
                                >
                                    Explore Properties
                                </VEButton>
                            </Link>
                            <Link href="/demos/velvet-estates/contact">
                                <VEButton variant="outline" size="lg" className="border-white/30 text-white hover:border-white hover:text-white">
                                    Schedule Consultation
                                </VEButton>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
                    >
                        {[
                            { value: "$8.5B+", label: "Sales Volume" },
                            { value: "25+", label: "Years Experience" },
                            { value: "950+", label: "Properties Sold" },
                            { value: "98%", label: "Client Satisfaction" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl md:text-4xl font-serif font-bold text-ve-accent mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-white/50 uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
                    >
                        <motion.div className="w-1.5 h-3 bg-white/50 rounded-full mt-2" />
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                FEATURED PROPERTIES
            ═══════════════════════════════════════════════════════════════ */}
            <section className="ve-section bg-ve-bg">
                <div className="ve-container">
                    <VESectionHeader
                        kicker="Featured Listings"
                        title="Exceptional Properties"
                        subtitle="A curated selection of Manhattan's most distinguished residences, each representing the pinnacle of luxury living."
                    />

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProperties.map((property, i) => (
                            <motion.div
                                key={property.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                            >
                                <VEPropertyCard property={property} priority={i < 3} />
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <Link href="/demos/velvet-estates/properties">
                            <VEButton
                                variant="outline"
                                icon={<VEIcon name="arrow-right" className="w-4 h-4" />}
                            >
                                View All Properties
                            </VEButton>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SIGNATURE NEIGHBORHOODS
            ═══════════════════════════════════════════════════════════════ */}
            <section className="ve-section bg-ve-surface">
                <div className="ve-container">
                    <VESectionHeader
                        kicker="Neighborhoods"
                        title="Signature Addresses"
                        subtitle="From the grand avenues of the Upper East Side to the cobblestone charm of the West Village, discover New York's most prestigious enclaves."
                    />

                    <div className="grid lg:grid-cols-2 gap-8">
                        {NEIGHBORHOODS.slice(0, 4).map((neighborhood, i) => (
                            <motion.div
                                key={neighborhood.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                            >
                                <Link href={`/demos/velvet-estates/neighborhoods/${neighborhood.slug}`}>
                                    <div className="group relative h-80 overflow-hidden rounded-2xl bg-ve-primary cursor-pointer">
                                        {/* Neighborhood Image */}
                                        <Image
                                            src={neighborhood.image}
                                            alt={neighborhood.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                        {/* Hover effect */}
                                        <div className="absolute inset-0 bg-ve-accent/0 group-hover:bg-ve-accent/10 transition-colors duration-500" />

                                        {/* Content */}
                                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                            <div className="text-xs uppercase tracking-widest text-ve-accent mb-2">
                                                {neighborhood.vibe}
                                            </div>
                                            <h3 className="text-2xl font-serif font-semibold text-white mb-2 group-hover:text-ve-accent transition-colors">
                                                {neighborhood.name}
                                            </h3>
                                            <p className="text-white/60 text-sm mb-4 line-clamp-2">
                                                {neighborhood.tagline}
                                            </p>
                                            <div className="flex items-center gap-6 text-sm text-white/50">
                                                <span>Avg. {neighborhood.avgPrice}</span>
                                                <span>{neighborhood.propertyCount} Listings</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <Link href="/demos/velvet-estates/neighborhoods">
                            <VEButton
                                variant="outline"
                                icon={<VEIcon name="arrow-right" className="w-4 h-4" />}
                            >
                                Explore All Neighborhoods
                            </VEButton>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                CONCIERGE BUYING EXPERIENCE
            ═══════════════════════════════════════════════════════════════ */}
            <section className="ve-section-dark relative overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.55_0.03_270/0.08)_0%,_transparent_70%)]" />
                <div className="absolute inset-0 ve-noise" />

                <div className="ve-container relative z-10">
                    <VESectionHeader
                        kicker="Our Process"
                        title="The Concierge Experience"
                        subtitle="A seamless journey from discovery to closing, guided by expertise and refined through decades of experience."
                        dark
                    />

                    <div className="max-w-4xl mx-auto">
                        {BUYING_STEPS.map((step, i) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="relative flex gap-8 pb-12 last:pb-0"
                            >
                                {/* Timeline line */}
                                {i < BUYING_STEPS.length - 1 && (
                                    <div className="absolute left-6 top-14 w-px h-full bg-white/10" />
                                )}

                                {/* Step number */}
                                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-ve-accent text-ve-primary font-serif font-bold rounded-full">
                                    {step.step}
                                </div>

                                {/* Content */}
                                <div className="pt-2">
                                    <h3 className="text-xl font-serif font-semibold text-white mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-white/60 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                MARKET INTELLIGENCE
            ═══════════════════════════════════════════════════════════════ */}
            <section className="ve-section bg-ve-bg">
                <div className="ve-container">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <VESectionHeader
                                kicker="Market Insights"
                                title="Data-Driven Decisions"
                                subtitle="Our proprietary market intelligence provides clients with actionable insights to make informed investment decisions."
                                align="left"
                            />

                            <div className="space-y-6">
                                {[
                                    {
                                        label: "Manhattan Luxury Index",
                                        value: "+12%",
                                        description: "Year-over-year appreciation",
                                    },
                                    {
                                        label: "Average Days on Market",
                                        value: "45",
                                        description: "For properties over $10M",
                                    },
                                    {
                                        label: "Inventory Levels",
                                        value: "-8%",
                                        description: "Below historical average",
                                    },
                                ].map((metric, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-6 p-4 bg-ve-surface rounded-xl border border-ve-border"
                                    >
                                        <div className="text-3xl font-serif font-bold text-ve-accent">
                                            {metric.value}
                                        </div>
                                        <div>
                                            <div className="font-medium text-ve-text">
                                                {metric.label}
                                            </div>
                                            <div className="text-sm text-ve-muted">
                                                {metric.description}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <Link
                                href="/demos/velvet-estates/insights"
                                className="inline-flex items-center gap-2 mt-8 text-ve-accent hover:underline"
                            >
                                View Full Market Report
                                <VEIcon name="arrow-right" className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Simple Chart */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-ve-surface rounded-2xl p-8 border border-ve-border"
                        >
                            <h3 className="text-lg font-semibold text-ve-text mb-6">
                                Quarterly Performance Index
                            </h3>
                            <div className="flex items-end justify-between gap-4 h-48">
                                {MARKET_DATA.map((item, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${item.value}%` }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1, duration: 0.8 }}
                                            className="w-full bg-gradient-to-t from-ve-accent to-ve-accent2 rounded-t-lg"
                                        />
                                        <span className="text-sm text-ve-muted">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                AGENTS SPOTLIGHT
            ═══════════════════════════════════════════════════════════════ */}
            <section className="ve-section bg-ve-surface">
                <div className="ve-container">
                    <VESectionHeader
                        kicker="Our Team"
                        title="Expert Guidance"
                        subtitle="Work with Manhattan's most trusted luxury real estate professionals, each bringing decades of market expertise."
                    />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {featuredAgents.map((agent, i) => (
                            <motion.div
                                key={agent.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                            >
                                <VEAgentCard agent={agent} />
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <Link href="/demos/velvet-estates/agents">
                            <VEButton
                                variant="outline"
                                icon={<VEIcon name="arrow-right" className="w-4 h-4" />}
                            >
                                Meet All Agents
                            </VEButton>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                CLIENT STORIES (TESTIMONIALS)
            ═══════════════════════════════════════════════════════════════ */}
            <section className="ve-section-dark relative overflow-hidden">
                <div className="absolute inset-0 ve-noise" />

                <div className="ve-container relative z-10">
                    <VESectionHeader
                        kicker="Client Stories"
                        title="Trusted by the Discerning"
                        dark
                    />

                    <div className="max-w-4xl mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTestimonial}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="text-center"
                            >
                                <blockquote className="text-2xl md:text-3xl font-serif text-white leading-relaxed mb-8">
                                    "{testimonials[activeTestimonial].quote}"
                                </blockquote>
                                <div className="text-ve-accent font-medium">
                                    {testimonials[activeTestimonial].author}
                                </div>
                                <div className="text-white/50 text-sm mt-1">
                                    {testimonials[activeTestimonial].title} •{" "}
                                    {testimonials[activeTestimonial].location}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation dots */}
                        <div className="flex justify-center gap-2 mt-12">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveTestimonial(i)}
                                    className={`w-2 h-2 rounded-full transition-all ${i === activeTestimonial
                                        ? "bg-ve-accent w-8"
                                        : "bg-white/30 hover:bg-white/50"
                                        }`}
                                    aria-label={`View testimonial ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                FINAL CTA — BOOK A VIEWING
            ═══════════════════════════════════════════════════════════════ */}
            <section className="ve-section bg-ve-bg">
                <div className="ve-container">
                    <div className="max-w-4xl mx-auto bg-ve-surface rounded-3xl p-8 md:p-16 border border-ve-border shadow-ve-xl relative overflow-hidden">
                        {/* Background accent */}
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_oklch(0.70_0.08_80/0.08)_0%,_transparent_60%)]" />

                        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="ve-kicker">Begin Your Search</div>
                                <h2 className="ve-heading-2 text-ve-text mb-4">
                                    Ready to Find Your Next Home?
                                </h2>
                                <p className="ve-body">
                                    Connect with our team for a private consultation. We'll discuss
                                    your requirements and begin curating properties tailored to your
                                    vision.
                                </p>
                            </div>

                            <form className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <VEInput
                                        placeholder="First Name"
                                        aria-label="First Name"
                                    />
                                    <VEInput
                                        placeholder="Last Name"
                                        aria-label="Last Name"
                                    />
                                </div>
                                <VEInput
                                    type="email"
                                    placeholder="Email Address"
                                    aria-label="Email Address"
                                />
                                <VEInput
                                    type="tel"
                                    placeholder="Phone Number"
                                    aria-label="Phone Number"
                                />
                                <VEButton variant="primary" className="w-full">
                                    Schedule Consultation
                                </VEButton>
                                <p className="text-xs text-ve-muted text-center">
                                    By submitting, you agree to our privacy policy.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </VEShell>
    );
}
