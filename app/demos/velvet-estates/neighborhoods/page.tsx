"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import VEShell from "../_components/VEShell";
import VESectionHeader from "../_components/VESectionHeader";
import VEIcon from "../_components/VEIcon";
import { NEIGHBORHOODS } from "../_data/neighborhoods";

export default function NeighborhoodsPage() {
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
                        <div className="ve-kicker text-white/60">Explore</div>
                        <h1 className="ve-heading-1 text-white mb-4">
                            Signature Neighborhoods
                        </h1>
                        <p className="ve-lead text-white/60">
                            From the grand avenues of the Upper East Side to the cobblestone
                            charm of the West Village, discover Manhattan's most coveted addresses.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Neighborhoods Grid */}
            <section className="ve-section bg-ve-bg">
                <div className="ve-container">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {NEIGHBORHOODS.map((neighborhood, i) => (
                            <motion.div
                                key={neighborhood.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                            >
                                <Link href={`/demos/velvet-estates/neighborhoods/${neighborhood.slug}`}>
                                    <div className="group relative h-96 overflow-hidden rounded-2xl bg-ve-primary cursor-pointer">
                                        {/* Placeholder gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-ve-primary via-ve-primary-light to-ve-primary" />

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                                        {/* Hover effect */}
                                        <div className="absolute inset-0 bg-ve-accent/0 group-hover:bg-ve-accent/10 transition-colors duration-500" />

                                        {/* Content */}
                                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                            <div className="text-xs uppercase tracking-widest text-ve-accent mb-2">
                                                {neighborhood.vibe}
                                            </div>
                                            <h2 className="text-3xl font-serif font-semibold text-white mb-2 group-hover:text-ve-accent transition-colors">
                                                {neighborhood.name}
                                            </h2>
                                            <p className="text-white/60 mb-4">
                                                {neighborhood.tagline}
                                            </p>

                                            {/* Highlights */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {neighborhood.highlights.slice(0, 3).map((h, j) => (
                                                    <span
                                                        key={j}
                                                        className="px-2 py-1 text-xs bg-white/10 backdrop-blur-sm rounded text-white/80"
                                                    >
                                                        {h}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex items-center gap-6 text-sm text-white/50">
                                                <span>Avg. {neighborhood.avgPrice}</span>
                                                <span>{neighborhood.propertyCount} Listings</span>
                                                <span className="flex items-center gap-1">
                                                    Walk Score: {neighborhood.walkScore}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Arrow */}
                                        <div className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                            <VEIcon name="arrow-right" className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </VEShell>
    );
}
