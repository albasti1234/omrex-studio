"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import VEShell from "../_components/VEShell";
import VESectionHeader from "../_components/VESectionHeader";
import VEIcon from "../_components/VEIcon";
import { INSIGHTS, getFeaturedInsights } from "../_data/insights";

export default function InsightsPage() {
    const featuredInsights = getFeaturedInsights();
    const otherInsights = INSIGHTS.filter((i) => !i.featured);

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
                        <div className="ve-kicker text-white/60">Knowledge</div>
                        <h1 className="ve-heading-1 text-white mb-4">
                            Market Insights
                        </h1>
                        <p className="ve-lead text-white/60">
                            Expert analysis, market trends, and insider perspectives
                            on Manhattan's luxury real estate landscape.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Featured Insights */}
            <section className="ve-section bg-ve-bg">
                <div className="ve-container">
                    <h2 className="ve-heading-3 text-ve-text mb-8">Featured</h2>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {featuredInsights.map((insight, i) => (
                            <motion.article
                                key={insight.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className={i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}
                            >
                                <Link
                                    href={`/demos/velvet-estates/insights/${insight.slug}`}
                                    className="group block h-full"
                                >
                                    <div
                                        className={`ve-card h-full ${i === 0 ? "p-0" : ""
                                            }`}
                                    >
                                        {/* Image */}
                                        <div
                                            className={`relative overflow-hidden bg-ve-primary/20 ${i === 0
                                                ? "aspect-[16/9] rounded-t-2xl"
                                                : "aspect-[16/10] rounded-t-2xl"
                                                }`}
                                        >
                                            <Image
                                                src={insight.image}
                                                alt={insight.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes={i === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                            <div className="absolute top-4 left-4">
                                                <span className="px-2 py-1 text-xs uppercase tracking-wider bg-ve-accent text-ve-primary rounded">
                                                    {insight.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <h3
                                                className={`font-serif font-semibold text-ve-text group-hover:text-ve-accent transition-colors mb-3 ${i === 0 ? "text-2xl" : "text-lg"
                                                    }`}
                                            >
                                                {insight.title}
                                            </h3>
                                            <p className="text-ve-muted text-sm line-clamp-2 mb-4">
                                                {insight.excerpt}
                                            </p>
                                            <div className="flex items-center gap-4 text-xs text-ve-muted">
                                                <span>{insight.author}</span>
                                                <span>•</span>
                                                <span>{insight.readTime} min read</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* All Insights */}
            <section className="ve-section bg-ve-surface">
                <div className="ve-container">
                    <h2 className="ve-heading-3 text-ve-text mb-8">All Articles</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {otherInsights.map((insight, i) => (
                            <motion.article
                                key={insight.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05, duration: 0.5 }}
                            >
                                <Link
                                    href={`/demos/velvet-estates/insights/${insight.slug}`}
                                    className="group block"
                                >
                                    <div className="ve-card">
                                        {/* Image */}
                                        <div className="relative aspect-[16/10] overflow-hidden bg-ve-primary/20 rounded-t-2xl">
                                            <Image
                                                src={insight.image}
                                                alt={insight.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <span className="text-xs uppercase tracking-wider text-ve-accent">
                                                {insight.category}
                                            </span>
                                            <h3 className="font-serif font-semibold text-ve-text group-hover:text-ve-accent transition-colors mt-2 mb-3">
                                                {insight.title}
                                            </h3>
                                            <p className="text-ve-muted text-sm line-clamp-2 mb-4">
                                                {insight.excerpt}
                                            </p>
                                            <div className="flex items-center gap-4 text-xs text-ve-muted">
                                                <span>{insight.author}</span>
                                                <span>•</span>
                                                <span>{insight.readTime} min read</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="ve-section-dark relative overflow-hidden">
                <div className="absolute inset-0 ve-noise" />
                <div className="ve-container relative z-10 text-center">
                    <h2 className="ve-heading-2 text-white mb-4">Stay Informed</h2>
                    <p className="ve-lead text-white/60 max-w-xl mx-auto mb-8">
                        Subscribe to receive our monthly market report and exclusive insights
                        directly in your inbox.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="ve-input flex-1"
                        />
                        <button type="submit" className="ve-btn ve-btn-accent">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </VEShell>
    );
}
