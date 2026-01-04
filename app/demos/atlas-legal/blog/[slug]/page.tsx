"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import AtlasNav from "../../_components/AtlasNav";
import AtlasFooter from "../../_components/AtlasFooter";
import AtlasIcon from "../../_components/AtlasIcon";
import AtlasLiveChat from "../../_components/AtlasLiveChat";
import { BLOG_POSTS, getBlogPostBySlug } from "../../_data/blog-posts";
import { use } from "react";

export default function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    const post = getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // Get related posts
    const relatedPosts = BLOG_POSTS.filter(
        (p) => p.slug !== slug && p.category === post.category
    ).slice(0, 2);

    return (
        <>
            <AtlasNav />

            <main>
                {/* Hero */}
                <section className="pt-32 pb-16 bg-al-bg-dark relative overflow-hidden">
                    <div className="absolute inset-0 al-pattern-lines opacity-20" />
                    <div className="al-container relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            {/* Breadcrumb */}
                            <div className="flex items-center justify-center gap-2 text-sm text-white/50 mb-8">
                                <Link
                                    href="/demos/atlas-legal"
                                    className="hover:text-al-gold transition-colors"
                                >
                                    Home
                                </Link>
                                <AtlasIcon name="chevron-right" className="w-3 h-3" />
                                <Link
                                    href="/demos/atlas-legal/blog"
                                    className="hover:text-al-gold transition-colors"
                                >
                                    Blog
                                </Link>
                                <AtlasIcon name="chevron-right" className="w-3 h-3" />
                                <span className="text-al-gold">{post.category}</span>
                            </div>

                            {/* Meta */}
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <span className="px-3 py-1 bg-al-gold/20 text-al-gold text-xs font-medium">
                                    {post.category}
                                </span>
                                <span className="text-xs text-white/50">{post.readTime}</span>
                                <span className="text-xs text-white/50">{post.date}</span>
                            </div>

                            {/* Title */}
                            <h1 className="al-heading-2 text-white mb-8">{post.title}</h1>

                            {/* Author */}
                            <div className="flex items-center justify-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                    <AtlasIcon name="user" className="w-6 h-6 text-white/40" />
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold text-white">{post.author}</div>
                                    <div className="text-sm text-white/50">
                                        Atlas Legal Attorney
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Article Content */}
                <section className="al-section-light">
                    <div className="al-container-narrow">
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-semibold prose-h2:text-2xl prose-h3:text-xl prose-p:text-al-text-muted prose-p:leading-relaxed prose-strong:text-al-text-main prose-li:text-al-text-muted"
                        >
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: post.content
                                        .replace(/\n## /g, '<h2 class="mt-12 mb-4">')
                                        .replace(/\n### /g, '<h3 class="mt-8 mb-3">')
                                        .replace(/\n\n/g, "</p><p>")
                                        .replace(/\n- /g, "</p><ul><li>")
                                        .replace(/\n\d\. /g, "</p><ol><li>")
                                        .replace(
                                            /\*\*(.*?)\*\*/g,
                                            '<strong class="text-al-text-main">$1</strong>'
                                        ),
                                }}
                            />
                        </motion.article>

                        {/* Tags */}
                        <div className="mt-12 pt-8 border-t border-al-border">
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-4 py-2 bg-al-bg-warm border border-al-border text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Share */}
                        <div className="mt-8 flex items-center gap-4">
                            <span className="text-sm text-al-text-muted">Share:</span>
                            <a
                                href="#"
                                className="w-10 h-10 flex items-center justify-center border border-al-border hover:border-al-gold hover:text-al-gold transition-colors"
                            >
                                <AtlasIcon name="linkedin" className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 flex items-center justify-center border border-al-border hover:border-al-gold hover:text-al-gold transition-colors"
                            >
                                <AtlasIcon name="twitter" className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 bg-al-gold/10">
                    <div className="al-container text-center">
                        <h3 className="al-heading-3 mb-4">Need Legal Assistance?</h3>
                        <p className="al-lead max-w-xl mx-auto mb-8">
                            If you have questions about {post.category.toLowerCase()} matters,
                            our attorneys are here to help.
                        </p>
                        <Link
                            href="/demos/atlas-legal/consultation"
                            className="al-btn al-btn-gold"
                        >
                            Schedule Free Consultation
                            <AtlasIcon name="arrow-right" className="w-5 h-5" />
                        </Link>
                    </div>
                </section>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="al-section-light">
                        <div className="al-container">
                            <h3 className="al-heading-3 text-center mb-12">Related Articles</h3>
                            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                {relatedPosts.map((relatedPost) => (
                                    <Link
                                        key={relatedPost.slug}
                                        href={`/demos/atlas-legal/blog/${relatedPost.slug}`}
                                        className="al-card group p-6"
                                    >
                                        <span className="text-xs text-al-gold font-medium">
                                            {relatedPost.category}
                                        </span>
                                        <h4 className="text-lg font-serif font-semibold mt-2 group-hover:text-al-gold transition-colors">
                                            {relatedPost.title}
                                        </h4>
                                        <p className="text-sm text-al-text-muted mt-2 line-clamp-2">
                                            {relatedPost.excerpt}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <AtlasFooter />
            <AtlasLiveChat />
        </>
    );
}
