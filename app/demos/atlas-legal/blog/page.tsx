"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AtlasNav from "../_components/AtlasNav";
import AtlasFooter from "../_components/AtlasFooter";
import AtlasIcon from "../_components/AtlasIcon";
import AtlasSectionHeader from "../_components/AtlasSectionHeader";
import AtlasLiveChat from "../_components/AtlasLiveChat";
import { BLOG_POSTS } from "../_data/blog-posts";

const CATEGORIES = ["All", "Corporate Law", "Personal Injury", "Family Law", "Criminal Defense"];

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = React.useState("All");

    const filteredPosts =
        activeCategory === "All"
            ? BLOG_POSTS
            : BLOG_POSTS.filter((post) => post.category === activeCategory);

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
                                <span className="al-kicker mb-0">Insights & Resources</span>
                            </div>
                            <h1 className="al-heading-1 text-white mb-6">Legal Blog</h1>
                            <p className="al-lead-light">
                                Expert insights, legal updates, and practical guidance from our
                                attorneys. Stay informed about the issues that matter most.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Category Filter */}
                <section className="py-6 bg-white border-b border-al-border sticky top-0 z-20">
                    <div className="al-container">
                        <div className="flex flex-wrap justify-center gap-2">
                            {CATEGORIES.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-5 py-2 text-sm font-medium transition-all ${activeCategory === category
                                            ? "bg-al-primary text-white"
                                            : "bg-al-bg-warm border border-al-border text-al-text-muted hover:border-al-gold"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Blog Posts Grid */}
                <section className="al-section-light">
                    <div className="al-container">
                        <div className="grid md:grid-cols-2 gap-8">
                            {filteredPosts.map((post, i) => (
                                <motion.article
                                    key={post.slug}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="al-card group"
                                >
                                    <Link href={`/demos/atlas-legal/blog/${post.slug}`}>
                                        {/* Image Placeholder */}
                                        <div className="h-48 bg-al-bg-dark flex items-center justify-center">
                                            <AtlasIcon name="document" className="w-12 h-12 text-white/20" />
                                        </div>

                                        <div className="p-8">
                                            {/* Meta */}
                                            <div className="flex items-center gap-4 mb-4">
                                                <span className="px-3 py-1 bg-al-gold/10 text-al-gold text-xs font-medium">
                                                    {post.category}
                                                </span>
                                                <span className="text-xs text-al-text-muted">
                                                    {post.readTime}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h2 className="text-xl font-serif font-semibold mb-3 group-hover:text-al-gold transition-colors line-clamp-2">
                                                {post.title}
                                            </h2>

                                            {/* Excerpt */}
                                            <p className="text-al-text-muted text-sm mb-6 line-clamp-3">
                                                {post.excerpt}
                                            </p>

                                            {/* Author */}
                                            <div className="flex items-center justify-between pt-4 border-t border-al-border">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-al-bg-dark flex items-center justify-center">
                                                        <AtlasIcon name="user" className="w-5 h-5 text-white/40" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-semibold">{post.author}</div>
                                                        <div className="text-xs text-al-text-muted">{post.date}</div>
                                                    </div>
                                                </div>
                                                <AtlasIcon
                                                    name="arrow-right"
                                                    className="w-5 h-5 text-al-gold opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all"
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                        </div>

                        {filteredPosts.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-al-text-muted">
                                    No posts found in this category.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Newsletter CTA */}
                <section className="py-20 bg-al-bg-dark">
                    <div className="al-container text-center">
                        <h2 className="al-heading-3 text-white mb-4">Stay Informed</h2>
                        <p className="al-lead-light max-w-xl mx-auto mb-8">
                            Subscribe to receive legal updates and insights directly to your
                            inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="al-input-dark flex-1"
                            />
                            <button className="al-btn al-btn-gold">Subscribe</button>
                        </div>
                    </div>
                </section>
            </main>

            <AtlasFooter />
            <AtlasLiveChat />
        </>
    );
}
