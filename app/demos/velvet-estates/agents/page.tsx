"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import VEShell from "../_components/VEShell";
import VESectionHeader from "../_components/VESectionHeader";
import VEAgentCard from "../_components/VEAgentCard";
import VEIcon from "../_components/VEIcon";
import { AGENTS } from "../_data/agents";

export default function AgentsPage() {
    return (
        <VEShell>
            {/* Hero */}
            <section className="pt-32 pb-16 bg-ve-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.55_0.03_270/0.1)_0%,_transparent_60%)]" />
                <div className="absolute inset-0 ve-noise" />

                <div className="ve-container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <div className="ve-kicker text-white/60">Our Team</div>
                        <h1 className="ve-heading-1 text-white mb-4">
                            Expert Guidance
                        </h1>
                        <p className="ve-lead text-white/60">
                            Work with Manhattan's most trusted luxury real estate professionals.
                            Each of our agents brings decades of market expertise and an unwavering
                            commitment to client success.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Agents Grid */}
            <section className="ve-section bg-ve-bg">
                <div className="ve-container">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {AGENTS.map((agent, i) => (
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
                </div>
            </section>

            {/* Why Work With Us */}
            <section className="ve-section bg-ve-surface">
                <div className="ve-container">
                    <VESectionHeader
                        kicker="The Velvet Difference"
                        title="Why Work With Us"
                    />

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                title: "Unmatched Expertise",
                                description:
                                    "Our agents average 15+ years in luxury real estate, with deep knowledge of every Manhattan neighborhood.",
                            },
                            {
                                title: "Exclusive Access",
                                description:
                                    "Many of our transactions involve off-market properties, giving clients access to opportunities others never see.",
                            },
                            {
                                title: "Concierge Service",
                                description:
                                    "From initial consultation through closing and beyond, we provide seamless, white-glove service at every step.",
                            },
                        ].map((item, i) => (
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
                                    {item.title}
                                </h3>
                                <p className="text-ve-muted">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="ve-section-dark relative overflow-hidden">
                <div className="absolute inset-0 ve-noise" />
                <div className="ve-container relative z-10 text-center">
                    <h2 className="ve-heading-2 text-white mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="ve-lead text-white/60 max-w-xl mx-auto mb-8">
                        Connect with one of our specialists for a confidential consultation
                        about your real estate goals.
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
