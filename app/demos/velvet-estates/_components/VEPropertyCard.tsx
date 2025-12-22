"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import VEIcon from "./VEIcon";
import VEBadge from "./VEBadge";
import { Property } from "../_data/properties";

interface VEPropertyCardProps {
    property: Property;
    priority?: boolean;
}

export default function VEPropertyCard({
    property,
    priority = false,
}: VEPropertyCardProps) {
    return (
        <Link href={`/demos/velvet-estates/properties/${property.slug}`}>
            <motion.article
                className="ve-card group cursor-pointer"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-ve-surface">
                    {/* Property Image */}
                    <Image
                        src={property.images[0]}
                        alt={property.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={priority}
                    />

                    {/* Status badges */}
                    <div className="absolute top-4 left-4 flex gap-2 z-10">
                        {property.new && (
                            <VEBadge variant="accent">New</VEBadge>
                        )}
                        {property.status === "pending" && (
                            <VEBadge variant="warning">Pending</VEBadge>
                        )}
                        {property.status === "sold" && (
                            <VEBadge variant="default">Sold</VEBadge>
                        )}
                    </div>

                    {/* Favorite button */}
                    <button
                        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/80 dark:bg-black/40 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-white dark:hover:bg-black/60"
                        onClick={(e) => {
                            e.preventDefault();
                            // Handle favorite
                        }}
                        aria-label="Save property"
                    >
                        <VEIcon name="heart" className="w-4 h-4 text-ve-text dark:text-white" />
                    </button>

                    {/* Image overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Price */}
                    <div className="text-lg font-semibold text-ve-accent mb-2">
                        {property.priceFormatted}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-serif font-semibold text-ve-text group-hover:text-ve-accent transition-colors mb-1">
                        {property.title}
                    </h3>

                    {/* Address */}
                    <p className="text-sm text-ve-muted mb-4 flex items-center gap-1.5">
                        <VEIcon name="location" className="w-3.5 h-3.5 flex-shrink-0" />
                        {property.address}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-ve-muted">
                        <span className="flex items-center gap-1.5">
                            <VEIcon name="bed" className="w-4 h-4" />
                            {property.bedrooms} Beds
                        </span>
                        <span className="flex items-center gap-1.5">
                            <VEIcon name="bath" className="w-4 h-4" />
                            {property.bathrooms} Baths
                        </span>
                        <span className="flex items-center gap-1.5">
                            <VEIcon name="sqft" className="w-4 h-4" />
                            {property.sqft.toLocaleString()} SF
                        </span>
                    </div>
                </div>
            </motion.article>
        </Link>
    );
}
