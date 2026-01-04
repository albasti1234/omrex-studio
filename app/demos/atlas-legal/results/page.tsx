"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AtlasNav from "../_components/AtlasNav";
import AtlasFooter from "../_components/AtlasFooter";
import AtlasIcon from "../_components/AtlasIcon";
import AtlasSectionHeader from "../_components/AtlasSectionHeader";
import AtlasLiveChat from "../_components/AtlasLiveChat";

const RESULTS = [
    {
        amount: "$87M",
        type: "Verdict",
        category: "Medical Malpractice",
        description: "Record verdict against pharmaceutical company for defective drug causing liver failure.",
    },
    {
        amount: "$45M",
        type: "Settlement",
        category: "Personal Injury",
        description: "Settlement for construction worker injured due to contractor negligence.",
    },
    {
        amount: "$32M",
        type: "Verdict",
        category: "Product Liability",
        description: "Jury verdict against auto manufacturer for defective airbag deployment system.",
    },
    {
        amount: "$28M",
        type: "Settlement",
        category: "Wrongful Death",
        description: "Settlement for family of patient who died due to hospital system failures.",
    },
    {
        amount: "$15M",
        type: "Settlement",
        category: "Commercial Litigation",
        description: "Recovery for tech company in trade secret misappropriation case.",
    },
    {
        amount: "$12M",
        type: "Verdict",
        category: "Employment",
        description: "Jury verdict in executive wrongful termination and discrimination case.",
    },
];

const STATS = [
    { value: "$2B+", label: "Total Recovered" },
    { value: "500+", label: "Cases Won" },
    { value: "98%", label: "Success Rate" },
    { value: "50+", label: "Million Dollar Verdicts" },
];

export default function ResultsPage() {
    return (
        <>
            <AtlasNav />

            <main>
                {/* Hero */}
                <section className="pt-32 pb-20 bg-al-bg-dark relative overflow-hidden">
                    <div className="absolute inset-0 al-pattern-lines opacity-20" />
                    <div className="al-container relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-3xl"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-px w-12 bg-al-gold" />
                                <span className="al-kicker mb-0">Our Track Record</span>
                            </div>
                            <h1 className="al-heading-1 text-white mb-6">Case Results</h1>
                            <p className="al-lead-light">
                                Our results speak for themselves. We have recovered billions of
                                dollars for our clients in verdicts and settlements across the nation.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Stats */}
                <section className="py-16 bg-al-bg-warm">
                    <div className="al-container">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                            {STATS.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div className="text-4xl lg:text-5xl font-serif font-bold text-al-gold">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-al-text-muted uppercase tracking-wider mt-2">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Results */}
                <section className="al-section-light">
                    <div className="al-container">
                        <AtlasSectionHeader
                            kicker="Featured Recoveries"
                            title="Landmark Verdicts & Settlements"
                        />

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {RESULTS.map((result, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="al-card p-8"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="text-3xl font-serif font-bold text-al-gold">
                                                {result.amount}
                                            </div>
                                            <div className="text-sm text-al-text-muted">{result.type}</div>
                                        </div>
                                        <span className="px-3 py-1 bg-al-bg-warm border border-al-border text-xs font-medium">
                                            {result.category}
                                        </span>
                                    </div>
                                    <p className="text-al-text-muted text-sm leading-relaxed">
                                        {result.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Disclaimer */}
                <section className="py-12 bg-al-bg-warm">
                    <div className="al-container-narrow text-center">
                        <p className="text-xs text-al-text-muted leading-relaxed">
                            Prior results do not guarantee a similar outcome. Each case is unique
                            and must be evaluated on its own merits. Results depend on a variety of
                            factors unique to each case.
                        </p>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-al-bg-dark">
                    <div className="al-container text-center">
                        <h2 className="al-heading-3 text-white mb-4">
                            Ready to Discuss Your Case?
                        </h2>
                        <p className="al-lead-light max-w-xl mx-auto mb-8">
                            Contact us for a free, confidential consultation. Let our proven track
                            record work for you.
                        </p>
                        <Link href="/demos/atlas-legal/consultation" className="al-btn al-btn-gold">
                            Schedule Consultation
                            <AtlasIcon name="arrow-right" className="w-5 h-5" />
                        </Link>
                    </div>
                </section>
            </main>

            <AtlasFooter />
            <AtlasLiveChat />
        </>
    );
}
