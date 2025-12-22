"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import VEShell from "../_components/VEShell";
import VESectionHeader from "../_components/VESectionHeader";
import VEIcon from "../_components/VEIcon";

const TEAM = [
    {
        name: "Victoria Ashford",
        title: "Founder & CEO",
        bio: "With over 30 years in Manhattan real estate, Victoria founded Velvet Estates on the principle that luxury should be personal.",
        image: "/images/velvet-estates/agent-victoria.png",
    },
    {
        name: "Michael Rothstein",
        title: "President",
        bio: "Michael oversees strategic partnerships and new development relationships, bringing deep industry connections.",
        image: "/images/velvet-estates/agent-marcus.png",
    },
    {
        name: "Amanda Chen",
        title: "Director of Operations",
        bio: "Amanda ensures every client experience meets our exacting standards, from first contact through closing.",
        image: "/images/velvet-estates/agent-alexandra.png",
    },
];

const STATS = [
    { value: "$8.5B+", label: "Total Sales Volume" },
    { value: "950+", label: "Properties Sold" },
    { value: "25+", label: "Years of Excellence" },
    { value: "98%", label: "Client Satisfaction" },
];

const VALUES = [
    {
        title: "Discretion",
        description:
            "We understand that privacy is paramount. Every interaction is handled with complete confidentiality.",
    },
    {
        title: "Expertise",
        description:
            "Our team's unparalleled market knowledge ensures you have the insights needed to make informed decisions.",
    },
    {
        title: "Integrity",
        description:
            "We build relationships on trust, providing honest advice even when it means recommending patience.",
    },
    {
        title: "Excellence",
        description:
            "From our presentation materials to our negotiation strategies, every detail reflects our commitment to excellence.",
    },
];

export default function AboutPage() {
    return (
        <VEShell>
            {/* Hero */}
            <section className="pt-32 pb-20 bg-ve-primary relative overflow-hidden min-h-[70vh] flex items-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.55_0.03_270/0.1)_0%,_transparent_60%)]" />
                <div className="absolute inset-0 ve-noise" />

                <div className="ve-container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <div className="ve-kicker text-white/60">Our Story</div>
                        <h1 className="ve-display text-white mb-8">
                            A Legacy of{" "}
                            <span className="text-ve-accent">Excellence</span>
                        </h1>
                        <p className="ve-lead text-white/60">
                            For over two decades, Velvet Estates has been the trusted advisor
                            to those seeking Manhattan's most exceptional properties. We believe
                            that finding the right home is about understanding not just what you
                            need, but who you are.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-ve-surface border-b border-ve-border">
                <div className="ve-container">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {STATS.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl font-serif font-bold text-ve-accent mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-ve-muted uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="ve-section bg-ve-bg">
                <div className="ve-container">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="ve-kicker">Our Mission</div>
                            <h2 className="ve-heading-2 text-ve-text mb-6">
                                Connecting Extraordinary People with Extraordinary Properties
                            </h2>
                            <p className="ve-body mb-6">
                                At Velvet Estates, we don't just sell properties—we curate lifestyle
                                opportunities. Our approach combines deep market expertise with a
                                genuine understanding of our clients' aspirations.
                            </p>
                            <p className="ve-body">
                                Whether you're seeking a pied-à-terre overlooking Central Park, a
                                family townhouse in the West Village, or an investment portfolio of
                                Manhattan's finest addresses, our team brings the knowledge,
                                relationships, and discretion your goals demand.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-ve-primary/20"
                        >
                            <Image
                                src="/images/velvet-estates/hero-day.png"
                                alt="Velvet Estates office"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="ve-section bg-ve-surface">
                <div className="ve-container">
                    <VESectionHeader
                        kicker="Our Values"
                        title="What Sets Us Apart"
                    />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {VALUES.map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-ve-accent rounded-full">
                                    <span className="text-2xl font-serif font-bold text-ve-accent">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                </div>
                                <h3 className="text-lg font-serif font-semibold text-ve-text mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-ve-muted text-sm">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership */}
            <section className="ve-section bg-ve-bg">
                <div className="ve-container">
                    <VESectionHeader kicker="Leadership" title="Meet Our Team" />

                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {TEAM.map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-ve-primary/20">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                        sizes="128px"
                                    />
                                </div>
                                <h3 className="text-lg font-serif font-semibold text-ve-text">
                                    {member.name}
                                </h3>
                                <p className="text-sm text-ve-accent mb-3">{member.title}</p>
                                <p className="text-ve-muted text-sm">{member.bio}</p>
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
                            <button className="ve-btn ve-btn-outline">
                                Meet Our Agents
                                <VEIcon name="arrow-right" className="w-4 h-4" />
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="ve-section-dark relative overflow-hidden">
                <div className="absolute inset-0 ve-noise" />
                <div className="ve-container relative z-10 text-center">
                    <h2 className="ve-heading-2 text-white mb-4">
                        Ready to Begin?
                    </h2>
                    <p className="ve-lead text-white/60 max-w-xl mx-auto mb-8">
                        Whether you're buying, selling, or simply exploring, we're here
                        to guide you through Manhattan's luxury real estate landscape.
                    </p>
                    <Link href="/demos/velvet-estates/contact">
                        <button className="ve-btn ve-btn-accent">
                            Schedule Consultation
                            <VEIcon name="arrow-right" className="w-4 h-4" />
                        </button>
                    </Link>
                </div>
            </section>
        </VEShell>
    );
}
