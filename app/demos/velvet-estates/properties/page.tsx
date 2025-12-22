"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VEShell from "../_components/VEShell";
import VESectionHeader from "../_components/VESectionHeader";
import VEPropertyCard from "../_components/VEPropertyCard";
import VEButton from "../_components/VEButton";
import VESelect from "../_components/VESelect";
import VEInput from "../_components/VEInput";
import VEIcon from "../_components/VEIcon";
import VEModal from "../_components/VEModal";
import { VEPropertyCardSkeleton } from "../_components/VESkeleton";
import { PROPERTIES, Property } from "../_data/properties";
import { NEIGHBORHOODS } from "../_data/neighborhoods";

type ViewMode = "grid" | "map";
type SortOption = "price-high" | "price-low" | "newest" | "sqft";

const PROPERTY_TYPES = [
    { value: "", label: "All Types" },
    { value: "penthouse", label: "Penthouse" },
    { value: "apartment", label: "Apartment" },
    { value: "townhouse", label: "Townhouse" },
    { value: "villa", label: "Villa" },
    { value: "estate", label: "Estate" },
];

const BEDROOM_OPTIONS = [
    { value: "", label: "Any Beds" },
    { value: "1", label: "1+ Beds" },
    { value: "2", label: "2+ Beds" },
    { value: "3", label: "3+ Beds" },
    { value: "4", label: "4+ Beds" },
    { value: "5", label: "5+ Beds" },
];

const SORT_OPTIONS = [
    { value: "price-high", label: "Price: High to Low" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "newest", label: "Newest First" },
    { value: "sqft", label: "Largest First" },
];

export default function PropertiesPage() {
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [filters, setFilters] = useState({
        type: "",
        bedrooms: "",
        neighborhood: "",
        minPrice: "",
        maxPrice: "",
    });
    const [sort, setSort] = useState<SortOption>("price-high");
    const [quickViewProperty, setQuickViewProperty] = useState<Property | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Filter and sort properties
    const filteredProperties = useMemo(() => {
        let result = [...PROPERTIES];

        // Filter by type
        if (filters.type) {
            result = result.filter((p) => p.type === filters.type);
        }

        // Filter by bedrooms
        if (filters.bedrooms) {
            const minBeds = parseInt(filters.bedrooms);
            result = result.filter((p) => p.bedrooms >= minBeds);
        }

        // Filter by neighborhood
        if (filters.neighborhood) {
            result = result.filter((p) => p.neighborhood === filters.neighborhood);
        }

        // Sort
        switch (sort) {
            case "price-high":
                result.sort((a, b) => b.price - a.price);
                break;
            case "price-low":
                result.sort((a, b) => a.price - b.price);
                break;
            case "newest":
                result.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
                break;
            case "sqft":
                result.sort((a, b) => b.sqft - a.sqft);
                break;
        }

        return result;
    }, [filters, sort]);

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

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
                        <div className="ve-kicker text-white/60">Portfolio</div>
                        <h1 className="ve-heading-1 text-white mb-4">
                            Exceptional Properties
                        </h1>
                        <p className="ve-lead text-white/60">
                            Explore our curated collection of Manhattan's most distinguished
                            residences, from iconic penthouses to historic townhouses.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filters */}
            <section className="py-8 bg-ve-surface border-b border-ve-border sticky top-[72px] z-30">
                <div className="ve-container">
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Filters */}
                        <div className="flex-1 flex flex-wrap gap-3">
                            <VESelect
                                options={PROPERTY_TYPES}
                                value={filters.type}
                                onChange={(e) => handleFilterChange("type", e.target.value)}
                                className="w-36"
                            />
                            <VESelect
                                options={BEDROOM_OPTIONS}
                                value={filters.bedrooms}
                                onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
                                className="w-32"
                            />
                            <VESelect
                                options={[
                                    { value: "", label: "All Neighborhoods" },
                                    ...NEIGHBORHOODS.map((n) => ({
                                        value: n.slug,
                                        label: n.name,
                                    })),
                                ]}
                                value={filters.neighborhood}
                                onChange={(e) =>
                                    handleFilterChange("neighborhood", e.target.value)
                                }
                                className="w-44"
                            />
                            <VESelect
                                options={SORT_OPTIONS}
                                value={sort}
                                onChange={(e) => setSort(e.target.value as SortOption)}
                                className="w-44"
                            />
                        </div>

                        {/* View Toggle */}
                        <div className="flex items-center gap-2 border border-ve-border rounded-lg p-1">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 rounded ${viewMode === "grid"
                                        ? "bg-ve-accent text-white"
                                        : "text-ve-muted hover:text-ve-text"
                                    }`}
                                aria-label="Grid view"
                            >
                                <VEIcon name="grid" className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode("map")}
                                className={`p-2 rounded ${viewMode === "map"
                                        ? "bg-ve-accent text-white"
                                        : "text-ve-muted hover:text-ve-text"
                                    }`}
                                aria-label="Map view"
                            >
                                <VEIcon name="map" className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Results count */}
                    <div className="mt-4 text-sm text-ve-muted">
                        {filteredProperties.length} properties found
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="ve-section bg-ve-bg">
                <div className="ve-container">
                    {viewMode === "grid" ? (
                        <>
                            {isLoading ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {[...Array(6)].map((_, i) => (
                                        <VEPropertyCardSkeleton key={i} />
                                    ))}
                                </div>
                            ) : filteredProperties.length > 0 ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredProperties.map((property, i) => (
                                        <motion.div
                                            key={property.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05, duration: 0.5 }}
                                        >
                                            <div className="relative group">
                                                <VEPropertyCard property={property} />

                                                {/* Quick View Button */}
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setQuickViewProperty(property);
                                                    }}
                                                    className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-white/90 dark:bg-black/70 backdrop-blur-sm text-xs font-medium text-ve-text dark:text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-black"
                                                >
                                                    Quick View
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <VEIcon
                                        name="search"
                                        className="w-16 h-16 text-ve-muted mx-auto mb-4"
                                    />
                                    <h3 className="text-xl font-serif font-semibold text-ve-text mb-2">
                                        No Properties Found
                                    </h3>
                                    <p className="text-ve-muted mb-6">
                                        Try adjusting your filters to see more results.
                                    </p>
                                    <VEButton
                                        variant="outline"
                                        onClick={() =>
                                            setFilters({
                                                type: "",
                                                bedrooms: "",
                                                neighborhood: "",
                                                minPrice: "",
                                                maxPrice: "",
                                            })
                                        }
                                    >
                                        Clear Filters
                                    </VEButton>
                                </div>
                            )}
                        </>
                    ) : (
                        // Map View Placeholder
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Property List */}
                            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
                                {filteredProperties.map((property) => (
                                    <div
                                        key={property.id}
                                        className="flex gap-4 p-4 bg-ve-surface rounded-xl border border-ve-border hover:border-ve-accent transition-colors cursor-pointer"
                                        onClick={() => setQuickViewProperty(property)}
                                    >
                                        <div className="w-32 h-24 bg-ve-primary/20 rounded-lg flex-shrink-0" />
                                        <div>
                                            <div className="text-sm font-medium text-ve-accent">
                                                {property.priceFormatted}
                                            </div>
                                            <h3 className="font-serif font-semibold text-ve-text">
                                                {property.title}
                                            </h3>
                                            <p className="text-xs text-ve-muted mt-1">
                                                {property.bedrooms} beds • {property.bathrooms} baths •{" "}
                                                {property.sqft.toLocaleString()} SF
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Map Placeholder */}
                            <div className="bg-ve-surface rounded-2xl border border-ve-border h-[70vh] flex items-center justify-center">
                                <div className="text-center p-8">
                                    <VEIcon
                                        name="map"
                                        className="w-16 h-16 text-ve-muted mx-auto mb-4"
                                    />
                                    <h3 className="text-lg font-medium text-ve-text mb-2">
                                        Interactive Map
                                    </h3>
                                    <p className="text-sm text-ve-muted max-w-xs">
                                        Explore properties on an interactive map with neighborhood
                                        boundaries and nearby amenities.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Quick View Modal */}
            <VEModal
                isOpen={!!quickViewProperty}
                onClose={() => setQuickViewProperty(null)}
                size="xl"
            >
                {quickViewProperty && (
                    <div className="grid md:grid-cols-2">
                        {/* Image */}
                        <div className="aspect-square bg-ve-primary/20" />

                        {/* Content */}
                        <div className="p-8">
                            <div className="text-lg font-semibold text-ve-accent mb-2">
                                {quickViewProperty.priceFormatted}
                            </div>
                            <h2 className="ve-heading-3 text-ve-text mb-2">
                                {quickViewProperty.title}
                            </h2>
                            <p className="text-ve-muted flex items-center gap-1.5 mb-6">
                                <VEIcon name="location" className="w-4 h-4" />
                                {quickViewProperty.address}
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="text-center p-3 bg-ve-surface rounded-lg border border-ve-border">
                                    <VEIcon name="bed" className="w-5 h-5 text-ve-accent mx-auto mb-1" />
                                    <div className="font-semibold text-ve-text">
                                        {quickViewProperty.bedrooms}
                                    </div>
                                    <div className="text-xs text-ve-muted">Bedrooms</div>
                                </div>
                                <div className="text-center p-3 bg-ve-surface rounded-lg border border-ve-border">
                                    <VEIcon name="bath" className="w-5 h-5 text-ve-accent mx-auto mb-1" />
                                    <div className="font-semibold text-ve-text">
                                        {quickViewProperty.bathrooms}
                                    </div>
                                    <div className="text-xs text-ve-muted">Bathrooms</div>
                                </div>
                                <div className="text-center p-3 bg-ve-surface rounded-lg border border-ve-border">
                                    <VEIcon name="sqft" className="w-5 h-5 text-ve-accent mx-auto mb-1" />
                                    <div className="font-semibold text-ve-text">
                                        {quickViewProperty.sqft.toLocaleString()}
                                    </div>
                                    <div className="text-xs text-ve-muted">Sq Ft</div>
                                </div>
                            </div>

                            <p className="text-ve-muted text-sm mb-6 line-clamp-4">
                                {quickViewProperty.description}
                            </p>

                            <div className="flex gap-3">
                                <VEButton
                                    variant="primary"
                                    className="flex-1"
                                    onClick={() =>
                                        (window.location.href = `/demos/velvet-estates/properties/${quickViewProperty.slug}`)
                                    }
                                >
                                    View Details
                                </VEButton>
                                <VEButton
                                    variant="outline"
                                    icon={<VEIcon name="heart" className="w-4 h-4" />}
                                    iconPosition="left"
                                >
                                    Save
                                </VEButton>
                            </div>
                        </div>
                    </div>
                )}
            </VEModal>
        </VEShell>
    );
}
