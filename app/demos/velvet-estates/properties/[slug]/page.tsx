"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { use } from "react";
import VEShell from "../../_components/VEShell";
import VEButton from "../../_components/VEButton";
import VEIcon from "../../_components/VEIcon";
import VEInput from "../../_components/VEInput";
import VEPropertyCard from "../../_components/VEPropertyCard";
import { getPropertyBySlug, PROPERTIES, Property } from "../../_data/properties";
import { getAgentBySlug } from "../../_data/agents";
import { getNeighborhoodBySlug } from "../../_data/neighborhoods";

export default function PropertyDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    const property = getPropertyBySlug(slug);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    if (!property) {
        notFound();
    }

    const agent = getAgentBySlug(property.agent);
    const neighborhood = getNeighborhoodBySlug(property.neighborhood);

    // Get related properties (same neighborhood or type, excluding current)
    const relatedProperties = PROPERTIES.filter(
        (p) =>
            p.id !== property.id &&
            (p.neighborhood === property.neighborhood || p.type === property.type)
    ).slice(0, 3);

    return (
        <VEShell>
            {/* Breadcrumb */}
            <section className="pt-28 pb-4 bg-ve-bg border-b border-ve-border">
                <div className="ve-container">
                    <nav className="flex items-center gap-2 text-sm text-ve-muted">
                        <Link
                            href="/demos/velvet-estates"
                            className="hover:text-ve-accent transition-colors"
                        >
                            Home
                        </Link>
                        <VEIcon name="chevron-right" className="w-3 h-3" />
                        <Link
                            href="/demos/velvet-estates/properties"
                            className="hover:text-ve-accent transition-colors"
                        >
                            Properties
                        </Link>
                        <VEIcon name="chevron-right" className="w-3 h-3" />
                        <span className="text-ve-text">{property.title}</span>
                    </nav>
                </div>
            </section>

            {/* Main Content */}
            <section className="ve-section bg-ve-bg">
                <div className="ve-container">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Left Column - Gallery & Details */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Gallery */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4"
                            >
                                {/* Main Image */}
                                <div className="relative aspect-[16/10] bg-ve-primary/20 rounded-2xl overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-ve-primary/30 to-ve-primary/60" />

                                    {/* Image navigation */}
                                    {property.images.length > 1 && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    setActiveImageIndex((prev) =>
                                                        prev === 0 ? property.images.length - 1 : prev - 1
                                                    )
                                                }
                                                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/80 dark:bg-black/60 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-black transition-colors"
                                                aria-label="Previous image"
                                            >
                                                <VEIcon name="chevron-left" className="w-6 h-6 text-ve-text dark:text-white" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setActiveImageIndex((prev) =>
                                                        prev === property.images.length - 1 ? 0 : prev + 1
                                                    )
                                                }
                                                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/80 dark:bg-black/60 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-black transition-colors"
                                                aria-label="Next image"
                                            >
                                                <VEIcon name="chevron-right" className="w-6 h-6 text-ve-text dark:text-white" />
                                            </button>
                                        </>
                                    )}

                                    {/* Image counter */}
                                    <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm">
                                        {activeImageIndex + 1} / {property.images.length}
                                    </div>
                                </div>

                                {/* Thumbnails */}
                                {property.images.length > 1 && (
                                    <div className="flex gap-3 overflow-x-auto pb-2">
                                        {property.images.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setActiveImageIndex(i)}
                                                className={`flex-shrink-0 w-20 h-16 rounded-lg bg-ve-primary/20 overflow-hidden border-2 transition-colors ${i === activeImageIndex
                                                        ? "border-ve-accent"
                                                        : "border-transparent hover:border-ve-border"
                                                    }`}
                                            >
                                                <div className="w-full h-full bg-gradient-to-br from-ve-primary/30 to-ve-primary/60" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </motion.div>

                            {/* Property Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <p className="text-ve-muted flex items-center gap-1.5 mb-2">
                                    <VEIcon name="location" className="w-4 h-4" />
                                    {property.address}
                                </p>
                                <h1 className="ve-heading-2 text-ve-text mb-4">
                                    {property.title}
                                </h1>
                                <div className="text-2xl font-serif font-bold text-ve-accent mb-6">
                                    {property.priceFormatted}
                                </div>

                                {/* Key Stats */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                                    {[
                                        { icon: "bed", value: property.bedrooms, label: "Bedrooms" },
                                        { icon: "bath", value: property.bathrooms, label: "Bathrooms" },
                                        { icon: "sqft", value: property.sqft.toLocaleString(), label: "Sq Ft" },
                                        { icon: "car", value: property.parking, label: "Parking" },
                                    ].map((stat) => (
                                        <div
                                            key={stat.label}
                                            className="text-center p-4 bg-ve-surface rounded-xl border border-ve-border"
                                        >
                                            <VEIcon
                                                name={stat.icon as any}
                                                className="w-6 h-6 text-ve-accent mx-auto mb-2"
                                            />
                                            <div className="text-xl font-semibold text-ve-text">
                                                {stat.value}
                                            </div>
                                            <div className="text-xs text-ve-muted">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Description */}
                                <div className="prose prose-lg max-w-none">
                                    <h3 className="text-lg font-semibold text-ve-text mb-3">
                                        About This Property
                                    </h3>
                                    <p className="text-ve-muted leading-relaxed">
                                        {property.description}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Features */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h3 className="text-lg font-semibold text-ve-text mb-4">
                                    Property Features
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {property.features.map((feature, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-3 p-3 bg-ve-surface rounded-lg border border-ve-border"
                                        >
                                            <VEIcon name="check" className="w-4 h-4 text-ve-accent" />
                                            <span className="text-ve-muted">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Amenities */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h3 className="text-lg font-semibold text-ve-text mb-4">
                                    Building Amenities
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {property.amenities.map((amenity, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-3 p-3 bg-ve-surface rounded-lg border border-ve-border"
                                        >
                                            <VEIcon name="check" className="w-4 h-4 text-ve-accent" />
                                            <span className="text-ve-muted">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Floorplan Placeholder */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <h3 className="text-lg font-semibold text-ve-text mb-4">
                                    Floor Plan
                                </h3>
                                <div className="aspect-[16/9] bg-ve-surface rounded-xl border border-ve-border flex items-center justify-center">
                                    <div className="text-center">
                                        <VEIcon name="sqft" className="w-12 h-12 text-ve-muted mx-auto mb-2" />
                                        <p className="text-ve-muted">Floor plan available upon request</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Neighborhood */}
                            {neighborhood && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <h3 className="text-lg font-semibold text-ve-text mb-4">
                                        The Neighborhood
                                    </h3>
                                    <Link
                                        href={`/demos/velvet-estates/neighborhoods/${neighborhood.slug}`}
                                        className="block p-6 bg-ve-surface rounded-xl border border-ve-border hover:border-ve-accent transition-colors"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="text-xs uppercase tracking-widest text-ve-accent mb-1">
                                                    {neighborhood.vibe}
                                                </div>
                                                <h4 className="text-xl font-serif font-semibold text-ve-text mb-2">
                                                    {neighborhood.name}
                                                </h4>
                                                <p className="text-ve-muted text-sm line-clamp-2">
                                                    {neighborhood.tagline}
                                                </p>
                                            </div>
                                            <VEIcon name="arrow-right" className="w-5 h-5 text-ve-accent" />
                                        </div>
                                        <div className="flex gap-6 mt-4 text-sm">
                                            <span className="text-ve-muted">
                                                Walk Score: <strong className="text-ve-text">{neighborhood.walkScore}</strong>
                                            </span>
                                            <span className="text-ve-muted">
                                                Transit Score: <strong className="text-ve-text">{neighborhood.transitScore}</strong>
                                            </span>
                                        </div>
                                    </Link>
                                </motion.div>
                            )}
                        </div>

                        {/* Right Column - Sticky Booking Card */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="sticky top-32 space-y-6"
                            >
                                {/* Booking Card */}
                                <div className="bg-ve-surface rounded-2xl border border-ve-border p-6 shadow-ve-lg">
                                    <h3 className="text-lg font-semibold text-ve-text mb-6">
                                        Schedule a Private Viewing
                                    </h3>
                                    <form className="space-y-4">
                                        <VEInput placeholder="Full Name" />
                                        <VEInput type="email" placeholder="Email Address" />
                                        <VEInput type="tel" placeholder="Phone Number" />
                                        <VEInput type="date" placeholder="Preferred Date" />
                                        <VEButton variant="primary" className="w-full">
                                            Request Viewing
                                        </VEButton>
                                    </form>
                                    <p className="text-xs text-ve-muted text-center mt-4">
                                        Or call us at{" "}
                                        <a href="tel:+12125550100" className="text-ve-accent hover:underline">
                                            (212) 555-0100
                                        </a>
                                    </p>
                                </div>

                                {/* Agent Card */}
                                {agent && (
                                    <div className="bg-ve-surface rounded-2xl border border-ve-border p-6">
                                        <h3 className="text-sm uppercase tracking-widest text-ve-muted mb-4">
                                            Listed By
                                        </h3>
                                        <Link
                                            href={`/demos/velvet-estates/agents/${agent.slug}`}
                                            className="flex items-center gap-4 group"
                                        >
                                            <div className="w-16 h-16 rounded-full bg-ve-primary/20 flex items-center justify-center">
                                                <VEIcon name="user" className="w-8 h-8 text-ve-muted" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-ve-text group-hover:text-ve-accent transition-colors">
                                                    {agent.name}
                                                </div>
                                                <div className="text-sm text-ve-accent">{agent.title}</div>
                                            </div>
                                        </Link>
                                        <div className="mt-4 pt-4 border-t border-ve-border space-y-2 text-sm">
                                            <a
                                                href={`tel:${agent.phone}`}
                                                className="flex items-center gap-2 text-ve-muted hover:text-ve-accent transition-colors"
                                            >
                                                <VEIcon name="phone" className="w-4 h-4" />
                                                {agent.phone}
                                            </a>
                                            <a
                                                href={`mailto:${agent.email}`}
                                                className="flex items-center gap-2 text-ve-muted hover:text-ve-accent transition-colors"
                                            >
                                                <VEIcon name="email" className="w-4 h-4" />
                                                {agent.email}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {/* Share & Save */}
                                <div className="flex gap-3">
                                    <VEButton variant="outline" className="flex-1">
                                        <VEIcon name="heart" className="w-4 h-4" />
                                        Save
                                    </VEButton>
                                    <VEButton variant="outline" className="flex-1">
                                        <VEIcon name="share" className="w-4 h-4" />
                                        Share
                                    </VEButton>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Properties */}
            {relatedProperties.length > 0 && (
                <section className="ve-section bg-ve-surface">
                    <div className="ve-container">
                        <h2 className="ve-heading-3 text-ve-text mb-8">
                            Similar Properties
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {relatedProperties.map((p, i) => (
                                <motion.div
                                    key={p.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <VEPropertyCard property={p} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </VEShell>
    );
}
