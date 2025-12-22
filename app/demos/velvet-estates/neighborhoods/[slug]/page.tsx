"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { use } from "react";
import VEShell from "../../_components/VEShell";
import VEButton from "../../_components/VEButton";
import VEIcon from "../../_components/VEIcon";
import VEPropertyCard from "../../_components/VEPropertyCard";
import { getNeighborhoodBySlug, NEIGHBORHOODS } from "../../_data/neighborhoods";
import { getPropertiesByNeighborhood } from "../../_data/properties";

export default function NeighborhoodDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    const neighborhood = getNeighborhoodBySlug(slug);

    if (!neighborhood) {
        notFound();
    }

    const properties = getPropertiesByNeighborhood(neighborhood.slug);

    return (
        <VEShell>
            {/* Hero */}
            <section className="pt-32 pb-20 bg-ve-primary relative overflow-hidden min-h-[60vh] flex items-end">
                {/* Background Image */}
                <Image
                    src={neighborhood.image}
                    alt={neighborhood.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
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
                            href="/demos/velvet-estates/neighborhoods"
                            className="hover:text-white transition-colors"
                        >
                            Neighborhoods
                        </Link>
                        <VEIcon name="chevron-right" className="w-3 h-3" />
                        <span className="text-white">{neighborhood.name}</span>
                    </nav>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="text-sm uppercase tracking-widest text-ve-accent mb-2">
                            {neighborhood.vibe}
                        </div>
                        <h1 className="ve-heading-1 text-white mb-4">
                            {neighborhood.name}
                        </h1>
                        <p className="text-xl text-white/70 max-w-2xl mb-8">
                            {neighborhood.tagline}
                        </p>

                        {/* Quick Stats */}
                        <div className="flex flex-wrap gap-6">
                            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                                <div className="text-2xl font-serif font-bold text-ve-accent">
                                    {neighborhood.avgPrice}
                                </div>
                                <div className="text-xs text-white/60">Avg. Price</div>
                            </div>
                            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                                <div className="text-2xl font-serif font-bold text-ve-accent">
                                    {neighborhood.walkScore}
                                </div>
                                <div className="text-xs text-white/60">Walk Score</div>
                            </div>
                            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                                <div className="text-2xl font-serif font-bold text-ve-accent">
                                    {neighborhood.transitScore}
                                </div>
                                <div className="text-xs text-white/60">Transit Score</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* About */}
            <section className="ve-section bg-ve-bg">
                <div className="ve-container">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="ve-heading-3 text-ve-text mb-6">
                                About {neighborhood.name}
                            </h2>
                            <p className="ve-body leading-relaxed">
                                {neighborhood.description}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="ve-heading-3 text-ve-text mb-6">Highlights</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {neighborhood.highlights.map((highlight, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 p-4 bg-ve-surface rounded-lg border border-ve-border"
                                    >
                                        <VEIcon name="check" className="w-4 h-4 text-ve-accent flex-shrink-0" />
                                        <span className="text-ve-muted">{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Properties in this Neighborhood */}
            {properties.length > 0 && (
                <section className="ve-section bg-ve-surface">
                    <div className="ve-container">
                        <h2 className="ve-heading-3 text-ve-text mb-8">
                            Properties in {neighborhood.name}
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {properties.map((property, i) => (
                                <motion.div
                                    key={property.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <VEPropertyCard property={property} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Other Neighborhoods */}
            <section className="ve-section bg-ve-bg">
                <div className="ve-container">
                    <h2 className="ve-heading-3 text-ve-text mb-8 text-center">
                        Explore Other Neighborhoods
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {NEIGHBORHOODS.filter((n) => n.slug !== neighborhood.slug).map((n) => (
                            <Link
                                key={n.id}
                                href={`/demos/velvet-estates/neighborhoods/${n.slug}`}
                                className="px-5 py-3 bg-ve-surface border border-ve-border rounded-xl text-ve-text hover:border-ve-accent hover:text-ve-accent transition-colors"
                            >
                                {n.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </VEShell>
    );
}
