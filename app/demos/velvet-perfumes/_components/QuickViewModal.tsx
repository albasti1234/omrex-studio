"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getAllBrands } from "../_data/brands";
import { useCart } from "../_lib/cart-context";
import { THEME as DEFAULT_THEME } from "../_lib/theme";
import { DNABarWithLabel } from "./DNABar";
import type { Fragrance } from "../_data/fragrances";

type Theme = typeof DEFAULT_THEME;

export function QuickViewModal({ fragrance, onClose, theme = DEFAULT_THEME }: { fragrance: Fragrance; onClose: () => void; theme?: Theme }) {
    const brand = getAllBrands().find(b => b.id === fragrance.brandId);
    const { addItem } = useCart();
    const [selectedSize, setSelectedSize] = useState(fragrance.sizes[0]?.size);
    const topNotes = fragrance.ingredients.filter(i => i.category === "top").slice(0, 3);
    const heartNotes = fragrance.ingredients.filter(i => i.category === "heart").slice(0, 3);
    const baseNotes = fragrance.ingredients.filter(i => i.category === "base").slice(0, 3);

    const handleAddToCart = () => {
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
                top: topNotes.map(n => n.name),
                heart: heartNotes.map(n => n.name),
                base: baseNotes.map(n => n.name),
            },
            isNew: fragrance.isNew,
            isBestseller: fragrance.isBestseller,
            inStock: true,
            rating: fragrance.rating,
            reviews: fragrance.reviews,
        };
        addItem(cartProduct, selectedSize, 1);
        onClose();
    };

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <motion.div
                className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                style={{ background: theme.colors.bg.secondary }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 h-10 w-10 flex items-center justify-center"
                    style={{ color: theme.colors.text.muted }}
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="grid md:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="relative aspect-square" style={{ background: theme.colors.bg.tertiary }}>
                        <div className="absolute inset-0 flex items-center justify-center">
                            {fragrance.image && fragrance.image.endsWith('.png') ? (
                                <Image
                                    src={fragrance.image}
                                    alt={fragrance.name}
                                    fill
                                    className="object-contain p-6"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            ) : (
                                <motion.span
                                    className="text-[10rem] font-light opacity-15"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                    animate={{ rotate: [0, 3, -3, 0] }}
                                    transition={{ duration: 6, repeat: Infinity }}
                                >
                                    {fragrance.name.charAt(0)}
                                </motion.span>
                            )}
                        </div>
                        {/* Glow Effect */}
                        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at center, rgba(${theme.colors.accent.goldRgb}, 0.1), transparent 70%)` }} />
                    </div>

                    {/* Info */}
                    <div className="p-8">
                        <span className="text-xs uppercase tracking-[0.2em]" style={{ color: theme.colors.accent.gold }}>
                            {brand?.name}
                        </span>
                        <h2 className="mt-2 text-2xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {fragrance.name}
                        </h2>
                        <p className="mt-1 text-sm" style={{ color: theme.colors.text.muted }}>
                            {fragrance.year} • by {fragrance.perfumer}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mt-4">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} style={{ color: i < Math.floor(fragrance.rating) ? theme.colors.accent.gold : theme.colors.bg.tertiary }}>★</span>
                                ))}
                            </div>
                            <span className="text-xs" style={{ color: theme.colors.text.muted }}>({fragrance.reviews})</span>
                        </div>

                        {/* DNA Preview */}
                        <div className="mt-6 space-y-4">
                            <div>
                                <span className="text-[0.6rem] uppercase tracking-wider mb-2 block" style={{ color: theme.colors.accent.purple }}>Top Notes</span>
                                <div className="space-y-1.5">
                                    {topNotes.map(n => <DNABarWithLabel key={n.name} name={n.name} percentage={n.percentage} category="top" />)}
                                </div>
                            </div>
                            <div>
                                <span className="text-[0.6rem] uppercase tracking-wider mb-2 block" style={{ color: theme.colors.accent.pink }}>Heart Notes</span>
                                <div className="space-y-1.5">
                                    {heartNotes.map(n => <DNABarWithLabel key={n.name} name={n.name} percentage={n.percentage} category="heart" />)}
                                </div>
                            </div>
                            <div>
                                <span className="text-[0.6rem] uppercase tracking-wider mb-2 block" style={{ color: theme.colors.accent.gold }}>Base Notes</span>
                                <div className="space-y-1.5">
                                    {baseNotes.map(n => <DNABarWithLabel key={n.name} name={n.name} percentage={n.percentage} category="base" />)}
                                </div>
                            </div>
                        </div>

                        {/* Size Selector */}
                        <div className="mt-6">
                            <span className="text-xs uppercase tracking-wider mb-3 block">Size</span>
                            <div className="flex gap-2">
                                {fragrance.sizes.map(s => (
                                    <button
                                        key={s.size}
                                        onClick={() => setSelectedSize(s.size)}
                                        className="px-4 py-2 text-sm border transition-all"
                                        style={{
                                            borderColor: selectedSize === s.size ? theme.colors.accent.gold : theme.colors.border.default,
                                            background: selectedSize === s.size ? `rgba(${theme.colors.accent.goldRgb}, 0.1)` : "transparent"
                                        }}
                                    >
                                        {s.size} - ${s.price}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 py-3 text-xs uppercase tracking-wider font-semibold transition-all hover:translate-y-[-2px]"
                                style={{ background: `linear-gradient(135deg, ${theme.colors.accent.gold}, ${theme.colors.accent.goldLight})`, color: theme.colors.bg.primary }}
                            >
                                Add to Cart
                            </button>
                            <Link
                                href={`/demos/velvet-perfumes/fragrances/${fragrance.slug}`}
                                className="px-6 py-3 text-xs uppercase tracking-wider border transition-all hover:bg-white/5"
                                style={{ borderColor: theme.colors.border.default }}
                            >
                                Full Details
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
