"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getFragranceBySlug, FRAGRANCES, Fragrance, Ingredient } from "../../_data/fragrances";
import { getBrandBySlug } from "../../_data/brands";
import { useCart } from "../../_lib/cart-context";
import { THEME as DEFAULT_THEME, FOR_HER_THEME, FOR_HIM_THEME, UNISEX_THEME, Theme } from "../../_lib/theme";

const SEASON_ICONS: Record<string, string> = {
    spring: "🌸",
    summer: "☀️",
    fall: "🍂",
    winter: "❄️",
};

const OCCASION_LABELS: Record<string, string> = {
    casual: "Casual",
    formal: "Formal",
    "night-out": "Night Out",
    office: "Office",
    date: "Date Night",
    special: "Special",
};

// =============================================================================
// DNA CHART COMPONENT
// =============================================================================

function DNAChart({ ingredients, category, title, theme }: { ingredients: Ingredient[]; category: "top" | "heart" | "base"; title: string; theme: Theme }) {
    const filteredIngredients = ingredients.filter(i => i.category === category).sort((a, b) => b.percentage - a.percentage);

    // We can stick to category colors or use theme accent for base?
    // Let's use theme-aware colors where appropriate, or keep standard categories
    const categoryColors = {
        top: { bg: "rgba(168, 85, 247, 0.15)", bar: "#a855f7" },
        heart: { bg: "rgba(236, 72, 153, 0.15)", bar: "#ec4899" },
        base: { bg: `rgba(${theme.colors.accent.goldRgb}, 0.15)`, bar: theme.colors.accent.gold },
    };

    return (
        <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
                <div className="h-3 w-3 rounded-full" style={{ background: categoryColors[category].bar }} />
                <h4 className="text-xs font-semibold uppercase tracking-wider" style={{ color: theme.colors.text.primary }}>
                    {title}
                </h4>
            </div>
            <div className="space-y-3">
                {filteredIngredients.map((ing, i) => (
                    <motion.div
                        key={ing.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        className="group"
                    >
                        <div className="flex items-center gap-4">
                            <span className="w-28 text-sm truncate" style={{ color: theme.colors.text.secondary }}>
                                {ing.name}
                            </span>
                            <div className="flex-1 h-3 rounded-full overflow-hidden relative" style={{ background: categoryColors[category].bg }}>
                                <motion.div
                                    className="absolute inset-y-0 left-0 rounded-full"
                                    style={{ background: `linear-gradient(90deg, ${categoryColors[category].bar}, ${categoryColors[category].bar}80)` }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${ing.percentage}%` }}
                                    transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                                />
                            </div>
                            <span className="w-12 text-right text-sm font-medium" style={{ color: categoryColors[category].bar }}>
                                {ing.percentage}%
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// =============================================================================
// PERFORMANCE METER
// =============================================================================

function PerformanceMeter({ label, value, max = 10, theme }: { label: string; value: number; max?: number; theme: Theme }) {
    const percentage = (value / max) * 100;

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider" style={{ color: theme.colors.text.muted }}>{label}</span>
                <span className="text-sm font-medium" style={{ color: theme.colors.accent.gold }}>{value}/{max}</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: theme.colors.bg.tertiary }}>
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${theme.colors.accent.gold}, ${theme.colors.accent.goldLight})` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                />
            </div>
        </div>
    );
}

// =============================================================================
// FRAGRANCE DETAIL PAGE
// =============================================================================

export default function FragranceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const fragrance = getFragranceBySlug(slug);

    if (!fragrance) {
        notFound();
    }

    const theme = fragrance.gender === 'women' ? FOR_HER_THEME : 
                  fragrance.gender === 'men' ? FOR_HIM_THEME : 
                  UNISEX_THEME;

    const brand = getBrandBySlug(fragrance.brandId);
    const { addItem, totalItems, toggleCart } = useCart();
    const [selectedSize, setSelectedSize] = useState(fragrance.sizes[1]?.size || fragrance.sizes[0].size);
    const [quantity, setQuantity] = useState(1);
    const [showAddedNotification, setShowAddedNotification] = useState(false);

    const selectedPrice = fragrance.sizes.find(s => s.size === selectedSize)?.price || fragrance.price;

    // Convert fragrance data format for cart
    const cartProduct = {
        id: fragrance.id,
        slug: fragrance.slug,
        name: fragrance.name,
        collection: fragrance.brandId,
        price: fragrance.price,
        sizes: fragrance.sizes,
        image: fragrance.image,
        images: [fragrance.image],
        description: fragrance.description,
        notes: {
            top: fragrance.ingredients.filter(i => i.category === "top").map(i => i.name),
            heart: fragrance.ingredients.filter(i => i.category === "heart").map(i => i.name),
            base: fragrance.ingredients.filter(i => i.category === "base").map(i => i.name),
        },
        isNew: fragrance.isNew,
        isBestseller: fragrance.isBestseller,
        inStock: true,
        rating: fragrance.rating,
        reviews: fragrance.reviews,
    };

    const handleAddToCart = () => {
        addItem(cartProduct, selectedSize, quantity);
        setShowAddedNotification(true);
        setTimeout(() => setShowAddedNotification(false), 3000);
    };

    // Related fragrances from same brand
    const relatedFragrances = FRAGRANCES.filter(f => f.brandId === fragrance.brandId && f.id !== fragrance.id).slice(0, 4);

    return (
        <>
            {/* Navbar */}
            <header className="fixed inset-x-0 top-0 z-50" style={{ background: `${theme.colors.bg.primary}f0`, backdropFilter: "blur(20px)", borderBottom: `1px solid ${theme.colors.border.subtle}` }}>
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <Link href="/demos/velvet-perfumes">
                        <span className="text-[1.4rem] font-extralight tracking-[0.25em]" style={{ fontFamily: "'Playfair Display', serif", color: theme.colors.text.primary }}>VELVET</span>
                    </Link>
                    <Link href="/demos/velvet-perfumes/cart" className="relative">
                        <svg className="h-5 w-5" fill="none" stroke={theme.colors.text.secondary} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {totalItems > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full text-[0.65rem] font-semibold" style={{ background: theme.colors.accent.gold, color: theme.colors.bg.primary }}>
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>
            </header>

            {/* Added Notification */}
            <AnimatePresence>
                {showAddedNotification && (
                    <motion.div
                        className="fixed top-24 right-6 z-50 flex items-center gap-3 px-5 py-3 shadow-lg"
                        style={{ background: theme.colors.accent.gold, color: theme.colors.bg.primary }}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm font-medium">Added to cart</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="min-h-screen pt-24" style={{ background: theme.colors.bg.primary }}>
                {/* Breadcrumb */}
                <div className="mx-auto max-w-7xl px-6 py-4">
                    <nav className="flex items-center gap-2 text-xs" style={{ color: theme.colors.text.muted }}>
                        <Link href="/demos/velvet-perfumes" className="hover:text-white">Home</Link>
                        <span>/</span>
                        <Link href="/demos/velvet-perfumes/brands" className="hover:text-white">Brands</Link>
                        <span>/</span>
                        <Link href={`/demos/velvet-perfumes/brands/${brand?.slug}`} className="hover:text-white">{brand?.name}</Link>
                        <span>/</span>
                        <span style={{ color: theme.colors.text.secondary }}>{fragrance.name}</span>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-7xl px-6 pb-20">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">

                        {/* LEFT: Image + Quick Info */}
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                            {/* Image */}
                            <div className="relative aspect-square overflow-hidden mb-6" style={{ background: theme.colors.bg.secondary }}>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {fragrance.image && fragrance.image.endsWith('.png') ? (
                                        <Image
                                            src={fragrance.image}
                                            alt={fragrance.name}
                                            fill
                                            className="object-contain p-8"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            priority
                                        />
                                    ) : (
                                        <motion.span
                                            className="text-[12rem] font-light opacity-10"
                                            style={{ fontFamily: "'Playfair Display', serif", color: theme.colors.text.primary }}
                                            animate={{ rotate: [0, 5, -5, 0] }}
                                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            {fragrance.name.charAt(0)}
                                        </motion.span>
                                    )}
                                </div>

                                {/* Badges */}
                                <div className="absolute left-4 top-4 flex flex-col gap-2">
                                    {fragrance.isNew && (
                                        <span className="px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-wider" style={{ background: theme.colors.accent.gold, color: theme.colors.bg.primary }}>
                                            New Release
                                        </span>
                                    )}
                                    {fragrance.isBestseller && (
                                        <span className="px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-wider" style={{ background: theme.colors.accent.purple, color: "white" }}>
                                            Bestseller
                                        </span>
                                    )}
                                </div>

                                {/* Gender */}
                                <div className="absolute right-4 top-4 text-3xl" style={{ color: theme.colors.text.primary }}>
                                    {fragrance.gender === "men" ? "♂" : fragrance.gender === "women" ? "♀" : "⚤"}
                                </div>

                                {/* Ambient Glow */}
                                <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at center, rgba(${theme.colors.accent.goldRgb}, 0.08), transparent 70%)` }} />
                            </div>

                            {/* Season & Occasion Pills */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {fragrance.seasons.map(season => (
                                    <span key={season} className="flex items-center gap-1 px-3 py-1 text-xs border" style={{ borderColor: theme.colors.border.default, color: theme.colors.text.secondary }}>
                                        {SEASON_ICONS[season]} {season.charAt(0).toUpperCase() + season.slice(1)}
                                    </span>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {fragrance.occasions.map(occasion => (
                                    <span key={occasion} className="px-3 py-1 text-xs" style={{ background: theme.colors.bg.secondary, color: theme.colors.text.secondary }}>
                                        {OCCASION_LABELS[occasion]}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* RIGHT: Details */}
                        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                            {/* Brand */}
                            <Link href={`/demos/velvet-perfumes/brands/${brand?.slug}`} className="mb-2 inline-block text-[0.7rem] uppercase tracking-[0.3em]" style={{ color: theme.colors.accent.gold }}>
                                {brand?.name}
                            </Link>

                            {/* Name */}
                            <h1 className="mb-2 text-3xl font-light lg:text-4xl" style={{ fontFamily: "'Playfair Display', serif", color: theme.colors.text.primary }}>
                                {fragrance.name}
                            </h1>

                            {/* Year & Perfumer */}
                            <p className="mb-4 text-sm" style={{ color: theme.colors.text.muted }}>
                                {fragrance.year} • Created by {fragrance.perfumer}
                            </p>

                            {/* Rating */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="text-lg" style={{ color: i < Math.floor(fragrance.rating) ? theme.colors.accent.gold : theme.colors.bg.tertiary }}>
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <span className="text-sm" style={{ color: theme.colors.text.muted }}>
                                    {fragrance.rating} ({fragrance.reviews.toLocaleString()} reviews)
                                </span>
                            </div>

                            {/* Description */}
                            <p className="mb-8 leading-relaxed" style={{ color: theme.colors.text.secondary }}>
                                {fragrance.description}
                            </p>

                            {/* Performance */}
                            <div className="grid grid-cols-2 gap-6 mb-8 p-5" style={{ background: theme.colors.bg.secondary }}>
                                <PerformanceMeter label="Longevity" value={fragrance.longevity} theme={theme} />
                                <PerformanceMeter label="Sillage" value={fragrance.sillage} theme={theme} />
                            </div>

                            {/* Size Selector */}
                            <div className="mb-6">
                                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider" style={{ color: theme.colors.text.primary }}>Select Size</h3>
                                <div className="flex gap-3">
                                    {fragrance.sizes.map(size => (
                                        <button
                                            key={size.size}
                                            onClick={() => setSelectedSize(size.size)}
                                            className="flex flex-col items-center px-6 py-4 border transition-all"
                                            style={{
                                                borderColor: selectedSize === size.size ? theme.colors.accent.gold : theme.colors.border.default,
                                                background: selectedSize === size.size ? `rgba(${theme.colors.accent.goldRgb}, 0.1)` : "transparent",
                                                color: theme.colors.text.primary
                                            }}
                                        >
                                            <span className="text-sm font-medium">{size.size}</span>
                                            <span className="text-xs mt-1" style={{ color: theme.colors.text.muted }}>${size.price}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Add to Cart */}
                            <div className="flex gap-4 mb-8">
                                <div className="flex items-center border" style={{ borderColor: theme.colors.border.default, color: theme.colors.text.primary }}>
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-white/5">−</button>
                                    <span className="w-12 text-center">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 hover:bg-white/5">+</button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 flex items-center justify-center gap-3 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.15em] transition-all hover:translate-y-[-2px]"
                                    style={{ background: `linear-gradient(135deg, ${theme.colors.accent.gold}, ${theme.colors.accent.goldLight})`, color: theme.colors.bg.primary }}
                                >
                                    Add to Cart — ${selectedPrice * quantity}
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* DNA CHART SECTION */}
                    <motion.section
                        className="mt-16 p-8"
                        style={{ background: theme.colors.bg.secondary }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${theme.colors.border.default})` }} />
                            <h2 className="text-lg font-light tracking-wide" style={{ fontFamily: "'Playfair Display', serif", color: theme.colors.text.primary }}>
                                Fragrance DNA
                            </h2>
                            <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${theme.colors.border.default}, transparent)` }} />
                        </div>

                        <div className="grid gap-8 lg:grid-cols-3">
                            <DNAChart ingredients={fragrance.ingredients} category="top" title="Top Notes" theme={theme} />
                            <DNAChart ingredients={fragrance.ingredients} category="heart" title="Heart Notes" theme={theme} />
                            <DNAChart ingredients={fragrance.ingredients} category="base" title="Base Notes" theme={theme} />
                        </div>
                    </motion.section>

                    {/* Related Fragrances */}
                    {relatedFragrances.length > 0 && (
                        <section className="mt-16">
                            <h2 className="mb-8 text-center text-xl font-light" style={{ fontFamily: "'Playfair Display', serif", color: theme.colors.text.primary }}>
                                More from {brand?.name}
                            </h2>
                            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
                                {relatedFragrances.map(f => (
                                    <Link key={f.id} href={`/demos/velvet-perfumes/fragrances/${f.slug}`}>
                                        <div className="group">
                                            <div className="relative aspect-square overflow-hidden" style={{ background: theme.colors.bg.secondary }}>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    {f.image && f.image.endsWith('.png') ? (
                                                        <Image
                                                            src={f.image}
                                                            alt={f.name}
                                                            fill
                                                            className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                                                            sizes="25vw"
                                                        />
                                                    ) : (
                                                        <span className="text-4xl font-light opacity-20" style={{ fontFamily: "'Playfair Display', serif", color: theme.colors.text.primary }}>{f.name.charAt(0)}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="mt-3 text-center">
                                                <h3 className="text-sm" style={{ color: theme.colors.text.primary }}>{f.name}</h3>
                                                <p className="text-sm" style={{ color: theme.colors.accent.gold }}>${f.price}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="px-6 py-16 lg:px-8" style={{ background: theme.colors.bg.primary, borderTop: `1px solid ${theme.colors.border.subtle}` }}>
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-12 md:grid-cols-4">
                        {/* Brand */}
                        <div>
                            <h3 className="mb-5 text-[1.8rem] font-extralight tracking-[0.15em]" style={{ fontFamily: "'Playfair Display', serif", color: theme.colors.text.primary }}>
                                VELVET
                            </h3>
                            <p className="mb-6 text-[0.85rem] leading-relaxed" style={{ color: theme.colors.text.muted }}>
                                Luxury fragrances crafted for those who dare to be remembered.
                            </p>
                        </div>

                        {/* Shop */}
                        <div>
                            <h4 className="mb-5 text-[0.7rem] uppercase tracking-[0.25em]" style={{ color: theme.colors.text.primary }}>Shop</h4>
                            <ul className="space-y-3">
                                <li><Link href="/demos/velvet-perfumes/fragrances" className="text-[0.8rem] hover:text-[#d4a853]" style={{ color: theme.colors.text.muted }}>All Fragrances</Link></li>
                                <li><Link href="/demos/velvet-perfumes/brands/dior" className="text-[0.8rem] hover:text-[#d4a853]" style={{ color: theme.colors.text.muted }}>Dior</Link></li>
                                <li><Link href="/demos/velvet-perfumes/brands/chanel" className="text-[0.8rem] hover:text-[#d4a853]" style={{ color: theme.colors.text.muted }}>Chanel</Link></li>
                                <li><Link href="/demos/velvet-perfumes/brands/tom-ford" className="text-[0.8rem] hover:text-[#d4a853]" style={{ color: theme.colors.text.muted }}>Tom Ford</Link></li>
                            </ul>
                        </div>

                        {/* Brands */}
                        <div>
                            <h4 className="mb-5 text-[0.7rem] uppercase tracking-[0.25em]" style={{ color: theme.colors.text.primary }}>Brands</h4>
                            <ul className="space-y-3">
                                <li><Link href="/demos/velvet-perfumes/brands" className="text-[0.8rem] hover:text-[#d4a853]" style={{ color: theme.colors.text.muted }}>All Brands</Link></li>
                                <li><Link href="/demos/velvet-perfumes/brands/dior" className="text-[0.8rem] hover:text-[#d4a853]" style={{ color: theme.colors.text.muted }}>Dior</Link></li>
                                <li><Link href="/demos/velvet-perfumes/brands/chanel" className="text-[0.8rem] hover:text-[#d4a853]" style={{ color: theme.colors.text.muted }}>Chanel</Link></li>
                                <li><Link href="/demos/velvet-perfumes/brands/tom-ford" className="text-[0.8rem] hover:text-[#d4a853]" style={{ color: theme.colors.text.muted }}>Tom Ford</Link></li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h4 className="mb-5 text-[0.7rem] uppercase tracking-[0.25em]" style={{ color: theme.colors.text.primary }}>Company</h4>
                            <ul className="space-y-3">
                                <li><Link href="/demos/velvet-perfumes/our-story" className="text-[0.8rem] hover:text-[#d4a853]" style={{ color: theme.colors.text.muted }}>Our Story</Link></li>
                                <li><Link href="/demos/velvet-perfumes/boutiques" className="text-[0.8rem] hover:text-[#d4a853]" style={{ color: theme.colors.text.muted }}>Boutiques</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="mt-16 flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row" style={{ borderTop: `1px solid ${theme.colors.border.subtle}` }}>
                        <p className="text-[0.65rem]" style={{ color: theme.colors.text.muted }}>
                            © 2024 Velvet Perfumes. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
