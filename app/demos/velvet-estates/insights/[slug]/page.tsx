"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { use } from "react";
import VEShell from "../../_components/VEShell";
import VEIcon from "../../_components/VEIcon";
import { getInsightBySlug, INSIGHTS } from "../../_data/insights";
import { getAgentBySlug } from "../../_data/agents";

export default function InsightDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    const insight = getInsightBySlug(slug);

    if (!insight) {
        notFound();
    }

    // Find related insights (same category)
    const relatedInsights = INSIGHTS.filter(
        (i) => i.id !== insight.id && i.category === insight.category
    ).slice(0, 3);

    return (
        <VEShell>
            {/* Hero */}
            <section className="pt-32 pb-16 bg-ve-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-ve-primary via-ve-primary-light to-ve-primary" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute inset-0 ve-noise" />

                <div className="ve-container relative z-10">
                    <nav className="flex items-center gap-2 text-sm text-white/50 mb-8">
                        <Link
                            href="/demos/velvet-estates"
                            className="hover:text-white transition-colors"
                        >
                            Home
                        </Link>
                        <VEIcon name="chevron-right" className="w-3 h-3" />
                        <Link
                            href="/demos/velvet-estates/insights"
                            className="hover:text-white transition-colors"
                        >
                            Insights
                        </Link>
                        <VEIcon name="chevron-right" className="w-3 h-3" />
                        <span className="text-white truncate max-w-xs">{insight.title}</span>
                    </nav>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <span className="inline-block px-3 py-1 text-xs uppercase tracking-wider bg-ve-accent text-ve-primary rounded mb-6">
                            {insight.category}
                        </span>
                        <h1 className="ve-heading-2 text-white mb-6">{insight.title}</h1>
                        <p className="text-lg text-white/70 mb-8">{insight.excerpt}</p>
                        <div className="flex items-center gap-6 text-sm text-white/60">
                            <span>{insight.author}</span>
                            <span>•</span>
                            <span>{insight.authorTitle}</span>
                            <span>•</span>
                            <span>{insight.readTime} min read</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Article Content */}
            <section className="ve-section bg-ve-bg">
                <div className="ve-container-narrow">
                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="prose prose-lg prose-slate dark:prose-invert max-w-none"
                    >
                        {/* Placeholder content */}
                        <p className="text-ve-muted leading-relaxed mb-6">
                            {insight.content}
                        </p>
                        <p className="text-ve-muted leading-relaxed mb-6">
                            The Manhattan luxury real estate market continues to demonstrate
                            remarkable resilience and evolution. As we analyze current trends
                            and future projections, several key factors emerge that will shape
                            buying and selling decisions in the coming months.
                        </p>
                        <h2 className="ve-heading-3 text-ve-text mt-12 mb-4">
                            Market Overview
                        </h2>
                        <p className="text-ve-muted leading-relaxed mb-6">
                            Premium properties in Manhattan's most coveted neighborhoods
                            continue to attract both domestic and international buyers.
                            The combination of strong demand and limited inventory has
                            created a dynamic market environment.
                        </p>
                        <blockquote className="border-l-4 border-ve-accent pl-6 italic text-ve-muted my-8">
                            "Understanding the nuances of each neighborhood and micro-market
                            is essential for making informed investment decisions in today's
                            luxury real estate landscape."
                        </blockquote>
                        <h2 className="ve-heading-3 text-ve-text mt-12 mb-4">
                            Key Takeaways
                        </h2>
                        <ul className="space-y-3 text-ve-muted">
                            <li>Premium locations continue to outperform broader market trends</li>
                            <li>New development pipelines are moderating, supporting prices</li>
                            <li>International buyer activity is recovering to pre-pandemic levels</li>
                            <li>Smart home technology and sustainability features are increasingly important</li>
                        </ul>
                        <p className="text-ve-muted leading-relaxed mt-8">
                            For a detailed analysis of how these trends may impact your
                            real estate goals, we encourage you to schedule a consultation
                            with one of our market specialists.
                        </p>
                    </motion.article>

                    {/* Author */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 pt-8 border-t border-ve-border"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-ve-primary/20 flex items-center justify-center">
                                <VEIcon name="user" className="w-8 h-8 text-ve-muted" />
                            </div>
                            <div>
                                <div className="font-semibold text-ve-text">{insight.author}</div>
                                <div className="text-sm text-ve-muted">{insight.authorTitle}</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Share */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-8 flex items-center gap-4"
                    >
                        <span className="text-sm text-ve-muted">Share this article:</span>
                        <div className="flex gap-2">
                            <button className="w-10 h-10 flex items-center justify-center border border-ve-border rounded-full text-ve-muted hover:text-ve-accent hover:border-ve-accent transition-colors">
                                <VEIcon name="linkedin" className="w-4 h-4" />
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center border border-ve-border rounded-full text-ve-muted hover:text-ve-accent hover:border-ve-accent transition-colors">
                                <VEIcon name="twitter" className="w-4 h-4" />
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center border border-ve-border rounded-full text-ve-muted hover:text-ve-accent hover:border-ve-accent transition-colors">
                                <VEIcon name="email" className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Related Insights */}
            {relatedInsights.length > 0 && (
                <section className="ve-section bg-ve-surface">
                    <div className="ve-container">
                        <h2 className="ve-heading-3 text-ve-text mb-8">Related Articles</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {relatedInsights.map((related, i) => (
                                <motion.article
                                    key={related.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={`/demos/velvet-estates/insights/${related.slug}`}
                                        className="group block"
                                    >
                                        <div className="ve-card">
                                            <div className="relative aspect-[16/10] overflow-hidden bg-ve-primary/20 rounded-t-2xl">
                                                <div className="absolute inset-0 bg-gradient-to-br from-ve-primary/30 to-ve-primary/70" />
                                            </div>
                                            <div className="p-6">
                                                <span className="text-xs uppercase tracking-wider text-ve-accent">
                                                    {related.category}
                                                </span>
                                                <h3 className="font-serif font-semibold text-ve-text group-hover:text-ve-accent transition-colors mt-2">
                                                    {related.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </VEShell>
    );
}
