"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FRAGRANCES } from "../_data/fragrances";
import { getAllBrands } from "../_data/brands";
import { THEME as DEFAULT_THEME } from "../_lib/theme";
import { FragranceCard } from "./FragranceCard";
import { QuickViewModal } from "./QuickViewModal";
import { ComparePanel } from "./ComparePanel";
import type { Season, Gender, Fragrance } from "../_data/fragrances";

type Theme = typeof DEFAULT_THEME;

interface FragranceCatalogProps {
    activeGender?: Gender | "all";
    theme?: Theme;
    title?: string;
    description?: string;
}

export function FragranceCatalog({ 
    activeGender = "all", 
    theme = DEFAULT_THEME,
    title = "All Fragrances",
    description = `Explore ${FRAGRANCES.length} luxury fragrances from the world's most prestigious houses`
}: FragranceCatalogProps) {
    const brands = getAllBrands();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBrand, setSelectedBrand] = useState<string | "all">("all");
    const [selectedSeason, setSelectedSeason] = useState<Season | "all">("all");
    const [selectedOccasion, setSelectedOccasion] = useState<string | "all">("all");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
    
    // Additional filters from new data model
    const [selectedMood, setSelectedMood] = useState<string | "all">("all");
    const [selectedIntensity, setSelectedIntensity] = useState<string | "all">("all");

    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [quickViewFragrance, setQuickViewFragrance] = useState<Fragrance | null>(null);
    
    // Virtualization / Infinite Scroll
    const [visibleCount, setVisibleCount] = useState(12);

    // Derived Data
    const allMoods = useMemo(() => Array.from(new Set(FRAGRANCES.flatMap(f => f.mood || []))).sort(), []);
    const allOccasions = useMemo(() => Array.from(new Set(FRAGRANCES.flatMap(f => f.occasions))).sort(), []);

    // Filter Logic
    const filteredFragrances = useMemo(() => {
        return FRAGRANCES.filter(f => {
            // Gender
            if (activeGender !== "all" && f.gender !== activeGender) {
                // Allow unisex in gender-specific pages
                // If activeGender is 'men', allow 'men' AND 'unisex'
                if (f.gender !== "unisex") return false;
            }

            // Search
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                if (!f.name.toLowerCase().includes(q) && 
                    !f.brandId.toLowerCase().includes(q) && 
                    !f.ingredients.some(i => i.name.toLowerCase().includes(q))) return false;
            }

            // Filters
            if (selectedBrand !== "all" && f.brandId !== selectedBrand) return false;
            if (selectedSeason !== "all" && !f.seasons.includes(selectedSeason)) return false;
            if (selectedOccasion !== "all" && !f.occasions.includes(selectedOccasion)) return false;
            if (priceRange && (f.price < priceRange[0] || f.price > priceRange[1])) return false;
            
            // New Filters
            if (selectedMood !== "all" && (!f.mood || !f.mood.includes(selectedMood))) return false;
            if (selectedIntensity !== "all" && f.intensity !== selectedIntensity) return false;

            return true;
        });
    }, [activeGender, searchQuery, selectedBrand, selectedSeason, selectedOccasion, priceRange, selectedMood, selectedIntensity]);

    // Reset visible count when filters change
    useEffect(() => {
        setVisibleCount(12);
    }, [filteredFragrances.length, activeGender, selectedBrand, selectedSeason, selectedOccasion, selectedMood, selectedIntensity]);

    // Load More Handler
    const handleLoadMore = () => {
        setVisibleCount(prev => Math.min(prev + 12, filteredFragrances.length));
    };

    const visibleFragrances = filteredFragrances.slice(0, visibleCount);

    return (
        <div className="min-h-screen pb-20" style={{ background: theme.colors.bg.primary, color: theme.colors.text.primary }}>
            
            {/* Hero Section */}
            <section className="relative py-20 text-center overflow-hidden" style={{ background: theme.colors.bg.secondary }}>
                {/* Animated Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20"
                        style={{ background: `radial-gradient(circle, rgba(${theme.colors.accent.goldRgb}, 0.3), transparent 70%)`, filter: "blur(80px)" }}
                        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-15"
                        style={{ background: `radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent 70%)`, filter: "blur(60px)" }}
                        animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <span className="mb-6 inline-flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.4em]" style={{ color: theme.colors.accent.gold }}>
                        <span className="h-px w-12" style={{ background: theme.colors.accent.gold }} />
                        The Collection
                        <span className="h-px w-12" style={{ background: theme.colors.accent.gold }} />
                    </span>
                    <h1 className="mb-4 text-4xl font-extralight tracking-wide lg:text-6xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {title}
                    </h1>
                    <p className="mx-auto max-w-xl text-sm leading-relaxed" style={{ color: theme.colors.text.secondary }}>
                        {description}
                    </p>
                </motion.div>
            </section>

            {/* Header / Filter Bar */}
            <div className="sticky top-[73px] z-40 border-b backdrop-blur-md" 
                style={{ background: `rgba(${parseInt(theme.colors.bg.secondary.slice(1,3), 16)}, ${parseInt(theme.colors.bg.secondary.slice(3,5), 16)}, ${parseInt(theme.colors.bg.secondary.slice(5,7), 16)}, 0.8)`, borderColor: theme.colors.border.default }}>
                <div className="mx-auto max-w-7xl px-4 py-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        {/* Gender Tabs (Routes) */}
                        <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                            {[
                                { id: "all", label: "All Collection", href: "/demos/velvet-perfumes/fragrances" },
                                { id: "women", label: "For Her", href: "/demos/velvet-perfumes/fragrances/for-her" },
                                { id: "men", label: "For Him", href: "/demos/velvet-perfumes/fragrances/for-him" },
                                { id: "unisex", label: "Unisex", href: "/demos/velvet-perfumes/fragrances/unisex" },
                            ].map((tab) => (
                                <Link
                                    key={tab.id}
                                    href={tab.href}
                                    className={`whitespace-nowrap rounded-full px-6 py-2 text-sm uppercase tracking-wider transition-all ${
                                        activeGender === tab.id
                                            ? "font-semibold shadow-lg"
                                            : "hover:bg-white/5"
                                    }`}
                                    style={{
                                        background: activeGender === tab.id ? theme.colors.accent.gold : "transparent",
                                        color: activeGender === tab.id ? theme.colors.bg.primary : theme.colors.text.muted,
                                    }}
                                >
                                    {tab.label}
                                </Link>
                            ))}
                        </div>

                        {/* Search & Mobile Filter Toggle */}
                        <div className="flex items-center gap-3">
                            <div className="relative flex-1 md:w-64">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                                <input
                                    type="text"
                                    placeholder="Search specific notes..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full rounded-full border bg-transparent py-2 pl-10 pr-4 text-sm focus:outline-none"
                                    style={{ borderColor: theme.colors.border.default, color: theme.colors.text.primary }}
                                />
                            </div>
                            <button
                                onClick={() => setIsMobileFiltersOpen(true)}
                                className="flex md:hidden items-center justify-center rounded-full border p-2"
                                style={{ borderColor: theme.colors.border.default }}
                            >
                                <span className="text-xl">⚡</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="flex gap-8">
                    {/* Desktop Sidebar */}
                    <aside className="hidden w-64 shrink-0 space-y-8 md:block lg:w-72">
                        {/* Filters */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="font-serif text-lg">Filters</h3>
                                <button 
                                    onClick={() => {
                                        setSelectedBrand("all");
                                        setSelectedSeason("all");
                                        setSelectedOccasion("all");
                                        setSelectedMood("all");
                                        setSelectedIntensity("all");
                                        setPriceRange([0, 500]);
                                    }}
                                    className="text-xs uppercase hover:underline"
                                    style={{ color: theme.colors.text.muted }}
                                >
                                    Reset
                                </button>
                            </div>

                            {/* Brand */}
                            <div>
                                <h4 className="mb-2 text-xs uppercase tracking-wider" style={{ color: theme.colors.accent.gold }}>Brand</h4>
                                <select
                                    value={selectedBrand}
                                    onChange={(e) => setSelectedBrand(e.target.value)}
                                    className="w-full rounded border bg-transparent p-2 text-sm"
                                    style={{ borderColor: theme.colors.border.default }}
                                >
                                    <option value="all" className="bg-black">All Brands</option>
                                    {brands.map(b => (
                                        <option key={b.id} value={b.id} className="bg-black">{b.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Mood */}
                            <div>
                                <h4 className="mb-2 text-xs uppercase tracking-wider" style={{ color: theme.colors.accent.gold }}>Mood</h4>
                                <div className="flex flex-wrap gap-2">
                                    {allMoods.map(mood => (
                                        <button
                                            key={mood}
                                            onClick={() => setSelectedMood(selectedMood === mood ? "all" : mood)}
                                            className="px-3 py-1 text-[0.65rem] uppercase border rounded-full transition-all"
                                            style={{ 
                                                borderColor: selectedMood === mood ? theme.colors.accent.gold : theme.colors.border.default,
                                                background: selectedMood === mood ? theme.colors.accent.gold : "transparent",
                                                color: selectedMood === mood ? theme.colors.bg.primary : theme.colors.text.secondary
                                            }}
                                        >
                                            {mood}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Intensity */}
                            <div>
                                <h4 className="mb-2 text-xs uppercase tracking-wider" style={{ color: theme.colors.accent.gold }}>Intensity</h4>
                                <div className="space-y-2">
                                    {["intimate", "moderate", "strong", "eternal"].map(intensity => (
                                        <label key={intensity} className="flex items-center gap-2 text-sm cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name="intensity" 
                                                checked={selectedIntensity === intensity}
                                                onChange={() => setSelectedIntensity(selectedIntensity === intensity ? "all" : intensity)}
                                                onClick={() => { if(selectedIntensity === intensity) setSelectedIntensity("all") }}
                                                className="accent-amber-500"
                                            />
                                            <span className="capitalize">{intensity}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Season */}
                            <div>
                                <h4 className="mb-2 text-xs uppercase tracking-wider" style={{ color: theme.colors.accent.gold }}>Season</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {(["spring", "summer", "fall", "winter"] as Season[]).map(season => (
                                        <button
                                            key={season}
                                            onClick={() => setSelectedSeason(selectedSeason === season ? "all" : season)}
                                            className="px-3 py-2 text-xs border transition-all text-center capitalize"
                                            style={{ 
                                                borderColor: selectedSeason === season ? theme.colors.accent.gold : theme.colors.border.default,
                                                background: selectedSeason === season ? `rgba(${theme.colors.accent.goldRgb}, 0.1)` : "transparent"
                                            }}
                                        >
                                            {season}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Occasion */}
                            <div>
                                <h4 className="mb-2 text-xs uppercase tracking-wider" style={{ color: theme.colors.accent.gold }}>Occasion</h4>
                                <select
                                    value={selectedOccasion}
                                    onChange={(e) => setSelectedOccasion(e.target.value)}
                                    className="w-full rounded border bg-transparent p-2 text-sm"
                                    style={{ borderColor: theme.colors.border.default }}
                                >
                                    <option value="all" className="bg-black">All Occasions</option>
                                    {allOccasions.map(o => (
                                        <option key={o} value={o} className="bg-black">{o}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </aside>

                    {/* Grid */}
                    <div className="flex-1">
                        <div className="mb-6 flex items-center justify-between">
                            <span className="text-sm" style={{ color: theme.colors.text.muted }}>
                                Showing {visibleFragrances.length} of {filteredFragrances.length} results
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                            <AnimatePresence mode="popLayout">
                                {visibleFragrances.map((fragrance, index) => (
                                    <FragranceCard
                                        key={fragrance.id}
                                        fragrance={fragrance}
                                        index={index}
                                        onQuickView={setQuickViewFragrance}
                                        theme={theme}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                        
                        {/* Loading / Empty State */}
                        {filteredFragrances.length === 0 && (
                            <div className="py-20 text-center">
                                <p className="text-lg" style={{ color: theme.colors.text.muted }}>No fragrances found matching your criteria.</p>
                                <button 
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSelectedBrand("all");
                                    }}
                                    className="mt-4 text-sm underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}

                        {/* Infinite Scroll Trigger */}
                        {visibleCount < filteredFragrances.length && (
                            <motion.div 
                                className="mt-12 flex justify-center w-full"
                                onViewportEnter={handleLoadMore}
                            >
                                <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" style={{ borderColor: theme.colors.accent.gold }} />
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Sheet */}
            <AnimatePresence>
                {isMobileFiltersOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileFiltersOpen(false)} />
                        <motion.div
                            className="relative w-full max-w-md h-[85vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl p-6"
                            style={{ background: theme.colors.bg.secondary }}
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-serif">Filters</h3>
                                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2">✕</button>
                            </div>
                            
                            {/* Mobile Filter Content - Simplified Duplicate of Desktop */}
                            <div className="space-y-8">
                                {/* Brand */}
                                <div>
                                    <h4 className="mb-3 text-xs uppercase tracking-wider" style={{ color: theme.colors.accent.gold }}>Brand</h4>
                                    <select
                                        value={selectedBrand}
                                        onChange={(e) => setSelectedBrand(e.target.value)}
                                        className="w-full rounded border bg-transparent p-3"
                                        style={{ borderColor: theme.colors.border.default }}
                                    >
                                        <option value="all" className="bg-black">All Brands</option>
                                        {brands.map(b => (
                                            <option key={b.id} value={b.id} className="bg-black">{b.name}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                {/* Mood Mobile */}
                                <div>
                                    <h4 className="mb-3 text-xs uppercase tracking-wider" style={{ color: theme.colors.accent.gold }}>Mood</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {allMoods.map(mood => (
                                            <button
                                                key={mood}
                                                onClick={() => setSelectedMood(selectedMood === mood ? "all" : mood)}
                                                className="px-3 py-2 text-xs uppercase border rounded-full"
                                                style={{ 
                                                    borderColor: selectedMood === mood ? theme.colors.accent.gold : theme.colors.border.default,
                                                    background: selectedMood === mood ? theme.colors.accent.gold : "transparent",
                                                    color: selectedMood === mood ? theme.colors.bg.primary : theme.colors.text.secondary
                                                }}
                                            >
                                                {mood}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button 
                                    onClick={() => setIsMobileFiltersOpen(false)}
                                    className="w-full py-4 text-sm font-bold uppercase tracking-widest mt-8"
                                    style={{ background: theme.colors.accent.gold, color: theme.colors.bg.primary }}
                                >
                                    Show {filteredFragrances.length} Results
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Quick View Modal */}
            <AnimatePresence>
                {quickViewFragrance && (
                    <QuickViewModal
                        fragrance={quickViewFragrance}
                        onClose={() => setQuickViewFragrance(null)}
                        theme={theme}
                    />
                )}
            </AnimatePresence>
            
            <ComparePanel theme={theme} />
        </div>
    );
}
