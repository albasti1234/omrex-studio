"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import VEShell from "../_components/VEShell";
import VESectionHeader from "../_components/VESectionHeader";
import VEButton from "../_components/VEButton";
import VEIcon from "../_components/VEIcon";

const INVESTMENT_STATS = [
    { value: "$2.8B", label: "Assets Under Management" },
    { value: "47%", label: "Average IRR" },
    { value: "12", label: "Active Developments" },
    { value: "100%", label: "Capital Returned" },
];

const INVESTMENT_HIGHLIGHTS = [
    {
        title: "Strategic Acquisitions",
        description:
            "We identify undervalued assets in prime locations with significant appreciation potential through rezoning, repositioning, or redevelopment.",
    },
    {
        title: "Development Partnerships",
        description:
            "Partner with Manhattan's top developers on exclusive pre-construction opportunities, accessing preferred pricing and unit selection.",
    },
    {
        title: "Portfolio Management",
        description:
            "Our team provides complete asset management services, from tenant relations to capital improvements, maximizing your investment returns.",
    },
    {
        title: "1031 Exchange Solutions",
        description:
            "Navigate tax-deferred exchanges with our specialized team, identifying suitable replacement properties within tight timelines.",
    },
];

const TRACK_RECORD = [
    {
        project: "The Sterling Tower",
        type: "New Development",
        invested: "$85M",
        returned: "$142M",
        irr: "54%",
    },
    {
        project: "Hudson Yards Portfolio",
        type: "Acquisition",
        invested: "$120M",
        returned: "$189M",
        irr: "41%",
    },
    {
        project: "West Village Collection",
        type: "Repositioning",
        invested: "$45M",
        returned: "$78M",
        irr: "62%",
    },
];

export default function InvestorsPage() {
    return (
        <VEShell>
            {/* Hero */}
            <section className="pt-32 pb-20 bg-ve-primary relative overflow-hidden min-h-[70vh] flex items-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.70_0.08_80/0.08)_0%,_transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_oklch(0.55_0.03_270/0.1)_0%,_transparent_50%)]" />
                <div className="absolute inset-0 ve-noise" />

                <div className="ve-container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <div className="ve-kicker text-white/60">Investment Opportunities</div>
                        <h1 className="ve-display text-white mb-8">
                            Building Wealth Through{" "}
                            <span className="text-ve-accent">Real Estate</span>
                        </h1>
                        <p className="ve-lead text-white/60 mb-12">
                            Access exclusive investment opportunities in Manhattan's most
                            prestigious real estate markets. Our institutional-quality approach
                            delivers exceptional risk-adjusted returns for qualified investors.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/demos/velvet-estates/contact">
                                <VEButton variant="accent" size="lg">
                                    Request Investor Package
                                    <VEIcon name="arrow-right" className="w-5 h-5" />
                                </VEButton>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-ve-surface border-b border-ve-border">
                <div className="ve-container">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {INVESTMENT_STATS.map((stat, i) => (
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

            {/* Investment Approach */}
            <section className="ve-section bg-ve-bg">
                <div className="ve-container">
                    <VESectionHeader
                        kicker="Our Approach"
                        title="Strategic Real Estate Investment"
                        subtitle="We combine deep market expertise with disciplined underwriting to identify and execute institutional-quality real estate investments."
                    />

                    <div className="grid md:grid-cols-2 gap-8">
                        {INVESTMENT_HIGHLIGHTS.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 bg-ve-surface rounded-2xl border border-ve-border"
                            >
                                <div className="w-12 h-12 flex items-center justify-center bg-ve-accent-muted rounded-lg mb-6">
                                    <span className="text-lg font-serif font-bold text-ve-accent">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                </div>
                                <h3 className="text-xl font-serif font-semibold text-ve-text mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-ve-muted">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Track Record */}
            <section className="ve-section bg-ve-surface">
                <div className="ve-container">
                    <VESectionHeader
                        kicker="Track Record"
                        title="Proven Performance"
                        subtitle="A selection of recent investments demonstrating our disciplined approach and strong returns."
                    />

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                            <thead>
                                <tr className="border-b border-ve-border">
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-ve-text">
                                        Project
                                    </th>
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-ve-text">
                                        Type
                                    </th>
                                    <th className="text-right py-4 px-4 text-sm font-semibold text-ve-text">
                                        Capital Invested
                                    </th>
                                    <th className="text-right py-4 px-4 text-sm font-semibold text-ve-text">
                                        Capital Returned
                                    </th>
                                    <th className="text-right py-4 px-4 text-sm font-semibold text-ve-text">
                                        IRR
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {TRACK_RECORD.map((project, i) => (
                                    <motion.tr
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="border-b border-ve-border hover:bg-ve-bg transition-colors"
                                    >
                                        <td className="py-4 px-4 font-medium text-ve-text">
                                            {project.project}
                                        </td>
                                        <td className="py-4 px-4 text-ve-muted">{project.type}</td>
                                        <td className="py-4 px-4 text-right text-ve-muted">
                                            {project.invested}
                                        </td>
                                        <td className="py-4 px-4 text-right text-ve-muted">
                                            {project.returned}
                                        </td>
                                        <td className="py-4 px-4 text-right font-semibold text-ve-accent">
                                            {project.irr}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Investment Process */}
            <section className="ve-section-dark relative overflow-hidden">
                <div className="absolute inset-0 ve-noise" />
                <div className="ve-container relative z-10">
                    <VESectionHeader
                        kicker="Our Process"
                        title="From Introduction to Investment"
                        dark
                    />

                    <div className="max-w-4xl mx-auto">
                        {[
                            {
                                step: "01",
                                title: "Initial Consultation",
                                description:
                                    "We begin with a confidential discussion of your investment objectives, risk tolerance, and preferred hold periods.",
                            },
                            {
                                step: "02",
                                title: "Qualification & Documentation",
                                description:
                                    "Complete accredited investor verification and receive access to our investor portal with detailed opportunity memoranda.",
                            },
                            {
                                step: "03",
                                title: "Due Diligence",
                                description:
                                    "Review comprehensive underwriting packages, financial projections, and risk assessments for each opportunity.",
                            },
                            {
                                step: "04",
                                title: "Capital Commitment",
                                description:
                                    "Execute subscription documents and fund your investment through our secure escrow process.",
                            },
                            {
                                step: "05",
                                title: "Ongoing Reporting",
                                description:
                                    "Receive quarterly performance reports, annual K-1s, and regular asset management updates.",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative flex gap-8 pb-12 last:pb-0"
                            >
                                {i < 4 && (
                                    <div className="absolute left-6 top-14 w-px h-full bg-white/10" />
                                )}
                                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-ve-accent text-ve-primary font-serif font-bold rounded-full">
                                    {item.step}
                                </div>
                                <div className="pt-2">
                                    <h3 className="text-xl font-serif font-semibold text-white mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-white/60">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="ve-section bg-ve-bg">
                <div className="ve-container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="ve-heading-2 text-ve-text mb-4">
                            Ready to Learn More?
                        </h2>
                        <p className="ve-lead mb-8">
                            Request our investor package to receive detailed information on current
                            opportunities and our investment philosophy.
                        </p>
                        <Link href="/demos/velvet-estates/contact">
                            <VEButton variant="primary" size="lg">
                                Request Investor Package
                                <VEIcon name="arrow-right" className="w-5 h-5" />
                            </VEButton>
                        </Link>
                        <p className="text-sm text-ve-muted mt-6">
                            For accredited investors only. Past performance does not guarantee future results.
                        </p>
                    </div>
                </div>
            </section>
        </VEShell>
    );
}
