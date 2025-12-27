"use client";

import { useState, use } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, PRODUCTS, COLLECTIONS } from "../../_data/products";
import { useCart } from "../../_lib/cart-context";

// =============================================================================
// THEME
// =============================================================================

const THEME = {
    colors: {
        bg: {
            primary: "#070709",
            secondary: "#0c0c10",
        },
        accent: {
            gold: "#d4a853",
            goldLight: "#e8c47a",
            goldRgb: "212, 168, 83",
        },
        text: {
            primary: "#fafaf9",
            secondary: "#a8a29e",
            muted: "#78716c",
        },
        border: {
            subtle: "rgba(212,168,83,0.08)",
            default: "rgba(212,168,83,0.15)",
            hover: "rgba(212,168,83,0.35)",
        },
    },
} as const;

// =============================================================================
// PRODUCT PAGE
// =============================================================================

export default function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    const product = getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const { addItem, totalItems, toggleCart } = useCart();
    const [selectedSize, setSelectedSize] = useState(product.sizes[1]?.size || product.sizes[0].size);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);

    const selectedPrice = product.sizes.find((s) => s.size === selectedSize)?.price || product.price;
    const collection = COLLECTIONS.find((c) => c.id === product.collection);

    const handleAddToCart = () => {
        addItem(product, selectedSize, quantity);
    };

    // Related products
    const relatedProducts = PRODUCTS.filter(
        (p) => p.collection === product.collection && p.id !== product.id
    ).slice(0, 4);

    return (
        <>
            {/* Navbar */}
            <header
                className="fixed inset-x-0 top-0 z-50"
                style={{
                    background: `${THEME.colors.bg.primary}f0`,
                    backdropFilter: "blur(20px)",
                    borderBottom: `1px solid ${THEME.colors.border.subtle}`,
                }}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <Link href="/demos/velvet-perfumes">
                        <span
                            className="text-[1.4rem] font-extralight tracking-[0.25em]"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            VELVET
                        </span>
                    </Link>
                    <Link href="/demos/velvet-perfumes/cart" className="relative">
                        <svg className="h-5 w-5" fill="none" stroke={THEME.colors.text.secondary} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {totalItems > 0 && (
                            <span
                                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full text-[0.65rem] font-semibold"
                                style={{ background: THEME.colors.accent.gold, color: THEME.colors.bg.primary }}
                            >
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>
            </header>

            <main className="min-h-screen pt-24" style={{ background: THEME.colors.bg.primary }}>
                {/* Breadcrumb */}
                <div className="mx-auto max-w-7xl px-6 py-4">
                    <nav className="flex items-center gap-2 text-xs" style={{ color: THEME.colors.text.muted }}>
                        <Link href="/demos/velvet-perfumes" className="hover:text-white">Home</Link>
                        <span>/</span>
                        <Link href="/demos/velvet-perfumes/shop" className="hover:text-white">Shop</Link>
                        <span>/</span>
                        <span style={{ color: THEME.colors.text.secondary }}>{product.name}</span>
                    </nav>
                </div>

                {/* Product Section */}
                <div className="mx-auto max-w-7xl px-6 pb-20">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                        {/* Images */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Main Image */}
                            <div className="relative aspect-[3/4] overflow-hidden" style={{ background: THEME.colors.bg.secondary }}>
                                <Image
                                    src={product.images[activeImage] || product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                {/* Badges */}
                                <div className="absolute left-4 top-4 flex flex-col gap-2">
                                    {product.isNew && (
                                        <span className="vp-badge vp-badge-new">New</span>
                                    )}
                                    {product.isBestseller && (
                                        <span className="vp-badge vp-badge-bestseller">Bestseller</span>
                                    )}
                                </div>
                            </div>

                            {/* Thumbnail Gallery */}
                            {product.images.length > 1 && (
                                <div className="mt-4 flex gap-3">
                                    {product.images.map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveImage(i)}
                                            className="relative h-20 w-20 overflow-hidden border-2 transition-all"
                                            style={{
                                                borderColor: activeImage === i ? THEME.colors.accent.gold : THEME.colors.border.subtle,
                                            }}
                                        >
                                            <Image src={img} alt="" fill className="object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* Product Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {/* Collection */}
                            <Link
                                href={`/demos/velvet-perfumes/collections/${collection?.slug}`}
                                className="mb-4 inline-block text-[0.65rem] uppercase tracking-[0.3em]"
                                style={{ color: THEME.colors.accent.gold }}
                            >
                                {collection?.name}
                            </Link>

                            {/* Name */}
                            <h1
                                className="mb-4 text-3xl font-light lg:text-4xl"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                {product.name}
                            </h1>

                            {/* Rating */}
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="h-4 w-4"
                                            fill={i < Math.floor(product.rating) ? THEME.colors.accent.gold : "none"}
                                            stroke={THEME.colors.accent.gold}
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-sm" style={{ color: THEME.colors.text.muted }}>
                                    {product.rating} ({product.reviews} reviews)
                                </span>
                            </div>

                            {/* Price */}
                            <div className="mb-8">
                                <span className="text-3xl" style={{ color: THEME.colors.accent.gold }}>
                                    ${selectedPrice}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="mb-8 leading-relaxed" style={{ color: THEME.colors.text.secondary }}>
                                {product.description}
                            </p>

                            {/* Size Selector */}
                            <div className="mb-8">
                                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider">Size</h3>
                                <div className="flex gap-3">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size.size}
                                            onClick={() => setSelectedSize(size.size)}
                                            className="border px-6 py-3 text-sm transition-all"
                                            style={{
                                                borderColor: selectedSize === size.size ? THEME.colors.accent.gold : THEME.colors.border.default,
                                                background: selectedSize === size.size ? `rgba(${THEME.colors.accent.goldRgb}, 0.1)` : "transparent",
                                            }}
                                        >
                                            <span className="block">{size.size}</span>
                                            <span className="text-xs" style={{ color: THEME.colors.text.muted }}>${size.price}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity & Add to Cart */}
                            <div className="mb-8 flex gap-4">
                                {/* Quantity */}
                                <div className="flex items-center border" style={{ borderColor: THEME.colors.border.default }}>
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 py-3 hover:bg-white/5"
                                    >
                                        −
                                    </button>
                                    <span className="w-12 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-4 py-3 hover:bg-white/5"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Add to Cart */}
                                <button
                                    onClick={handleAddToCart}
                                    className="vp-btn vp-btn-primary flex-1 justify-center"
                                >
                                    Add to Cart — ${selectedPrice * quantity}
                                </button>
                            </div>

                            {/* Notes */}
                            <div className="border-t pt-8" style={{ borderColor: THEME.colors.border.subtle }}>
                                <h3 className="mb-6 text-xs font-semibold uppercase tracking-wider">Fragrance Notes</h3>
                                <div className="grid grid-cols-3 gap-6">
                                    {(["top", "heart", "base"] as const).map((noteType) => (
                                        <div key={noteType}>
                                            <h4 className="mb-3 text-[0.65rem] uppercase tracking-wider" style={{ color: THEME.colors.accent.gold }}>
                                                {noteType === "top" ? "Top Notes" : noteType === "heart" ? "Heart Notes" : "Base Notes"}
                                            </h4>
                                            <ul className="space-y-1">
                                                {product.notes[noteType].map((note) => (
                                                    <li key={note} className="text-sm" style={{ color: THEME.colors.text.secondary }}>
                                                        {note}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <section className="mt-24">
                            <h2
                                className="mb-8 text-center text-2xl font-light"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                You May Also Like
                            </h2>
                            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
                                {relatedProducts.map((p) => (
                                    <Link key={p.id} href={`/demos/velvet-perfumes/product/${p.slug}`}>
                                        <div className="group">
                                            <div className="relative aspect-[3/4] overflow-hidden" style={{ background: THEME.colors.bg.secondary }}>
                                                <Image
                                                    src={p.image}
                                                    alt={p.name}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="mt-3 text-center">
                                                <h3 className="text-sm">{p.name}</h3>
                                                <p className="text-sm" style={{ color: THEME.colors.accent.gold }}>${p.price}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </>
    );
}
