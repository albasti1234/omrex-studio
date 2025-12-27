"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../_lib/cart-context";

// =============================================================================
// THEME
// =============================================================================

const THEME = {
    colors: {
        bg: { primary: "#0a0908", secondary: "#12110e", tertiary: "#1a1815" },
        accent: { gold: "#d4a853", goldRgb: "212, 168, 83" },
        text: { primary: "#fafaf9", secondary: "#a8a29e", muted: "#78716c" },
        border: { subtle: "rgba(212,168,83,0.08)", default: "rgba(212,168,83,0.15)", hover: "rgba(212,168,83,0.35)" },
    },
} as const;

// =============================================================================
// CART ITEM COMPONENT
// =============================================================================

function CartItemRow({ item, onUpdateQuantity, onRemove }: {
    item: { product: { id: string; name: string; collection: string; image: string }; quantity: number; size: string; price: number };
    onUpdateQuantity: (id: string, size: string, qty: number) => void;
    onRemove: (id: string, size: string) => void;
}) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex gap-4 sm:gap-6 p-4 sm:p-6 rounded-lg"
            style={{ background: THEME.colors.bg.secondary, border: `1px solid ${THEME.colors.border.subtle}` }}
        >
            {/* Product Image */}
            <div className="relative w-20 h-24 sm:w-28 sm:h-32 flex-shrink-0 rounded-md overflow-hidden" style={{ background: THEME.colors.bg.tertiary }}>
                <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-contain p-2"
                />
            </div>

            {/* Product Info */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.15em] mb-1" style={{ color: THEME.colors.accent.gold }}>
                        {item.product.collection}
                    </p>
                    <h3 className="text-base sm:text-lg font-light" style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}>
                        {item.product.name}
                    </h3>
                    <p className="text-sm mt-1" style={{ color: THEME.colors.text.muted }}>
                        Size: {item.size}
                    </p>
                </div>

                {/* Quantity & Remove */}
                <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity - 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                            style={{ background: THEME.colors.bg.tertiary, color: THEME.colors.text.primary, border: `1px solid ${THEME.colors.border.default}` }}
                        >
                            −
                        </button>
                        <span className="w-8 text-center" style={{ color: THEME.colors.text.primary }}>{item.quantity}</span>
                        <button
                            onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity + 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                            style={{ background: THEME.colors.bg.tertiary, color: THEME.colors.text.primary, border: `1px solid ${THEME.colors.border.default}` }}
                        >
                            +
                        </button>
                    </div>
                    <button
                        onClick={() => onRemove(item.product.id, item.size)}
                        className="text-sm underline transition-colors hover:opacity-80"
                        style={{ color: THEME.colors.text.muted }}
                    >
                        Remove
                    </button>
                </div>
            </div>

            {/* Price */}
            <div className="text-right">
                <p className="text-lg sm:text-xl font-light" style={{ color: THEME.colors.accent.gold, fontFamily: "'Playfair Display', serif" }}>
                    ${(item.price * item.quantity).toFixed(0)}
                </p>
                {item.quantity > 1 && (
                    <p className="text-xs mt-1" style={{ color: THEME.colors.text.muted }}>
                        ${item.price} each
                    </p>
                )}
            </div>
        </motion.div>
    );
}

// =============================================================================
// EMPTY CART
// =============================================================================

function EmptyCart() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
        >
            <div className="text-6xl mb-6" style={{ color: THEME.colors.text.muted }}>🛒</div>
            <h2
                className="text-2xl sm:text-3xl font-light mb-4"
                style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
            >
                Your cart is empty
            </h2>
            <p className="mb-8" style={{ color: THEME.colors.text.secondary }}>
                Discover our exquisite collection of fragrances
            </p>
            <Link
                href="/demos/velvet-perfumes/fragrances"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm uppercase tracking-[0.15em] transition-all"
                style={{ background: THEME.colors.accent.gold, color: THEME.colors.bg.primary }}
            >
                Browse Fragrances
                <span>→</span>
            </Link>
        </motion.div>
    );
}

// =============================================================================
// ORDER SUMMARY
// =============================================================================

function OrderSummary({ subtotal, shipping, tax, total }: { subtotal: number; shipping: number; tax: number; total: number }) {
    return (
        <div className="p-6 rounded-lg" style={{ background: THEME.colors.bg.secondary, border: `1px solid ${THEME.colors.border.subtle}` }}>
            <h3
                className="text-xl font-light mb-6 pb-4"
                style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif", borderBottom: `1px solid ${THEME.colors.border.subtle}` }}
            >
                Order Summary
            </h3>

            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span style={{ color: THEME.colors.text.secondary }}>Subtotal</span>
                    <span style={{ color: THEME.colors.text.primary }}>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span style={{ color: THEME.colors.text.secondary }}>Shipping</span>
                    <span style={{ color: THEME.colors.text.primary }}>
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span style={{ color: THEME.colors.text.secondary }}>Tax</span>
                    <span style={{ color: THEME.colors.text.primary }}>${tax.toFixed(2)}</span>
                </div>
            </div>

            <div
                className="flex justify-between mt-6 pt-4 text-lg"
                style={{ borderTop: `1px solid ${THEME.colors.border.subtle}` }}
            >
                <span style={{ color: THEME.colors.text.primary }}>Total</span>
                <span style={{ color: THEME.colors.accent.gold, fontFamily: "'Playfair Display', serif", fontSize: "1.5rem" }}>
                    ${total.toFixed(2)}
                </span>
            </div>

            <Link
                href="/demos/velvet-perfumes/checkout"
                className="w-full mt-6 py-4 text-sm uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all hover:opacity-90"
                style={{ background: THEME.colors.accent.gold, color: THEME.colors.bg.primary }}
            >
                Proceed to Checkout
                <span>→</span>
            </Link>

            <Link
                href="/demos/velvet-perfumes/fragrances"
                className="w-full mt-3 py-3 text-sm text-center block transition-colors hover:opacity-80"
                style={{ color: THEME.colors.text.secondary }}
            >
                Continue Shopping
            </Link>

            {/* Trust Badges */}
            <div className="mt-6 pt-4 flex items-center justify-center gap-4 text-xs" style={{ borderTop: `1px solid ${THEME.colors.border.subtle}`, color: THEME.colors.text.muted }}>
                <span>🔒 Secure Checkout</span>
                <span>✓ Free Returns</span>
            </div>
        </div>
    );
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function CartPage() {
    const { items, updateQuantity, removeItem, totalPrice } = useCart();

    const subtotal = totalPrice;
    const shipping = subtotal > 200 ? 0 : 15; // Free shipping over $200
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    return (
        <main className="min-h-screen" style={{ background: THEME.colors.bg.primary }}>
            {/* Header */}
            <div className="py-8 sm:py-12" style={{ background: THEME.colors.bg.secondary }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4">
                        <Link href="/demos/velvet-perfumes" className="text-2xl" style={{ color: THEME.colors.accent.gold }}>
                            ←
                        </Link>
                        <div>
                            <p className="text-[0.65rem] uppercase tracking-[0.25em] mb-1" style={{ color: THEME.colors.accent.gold }}>
                                ✦ Shopping Cart ✦
                            </p>
                            <h1
                                className="text-2xl sm:text-4xl font-light"
                                style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                            >
                                Your <span style={{ color: THEME.colors.accent.gold, fontStyle: "italic" }}>Selection</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {items.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-sm" style={{ color: THEME.colors.text.secondary }}>
                                    {items.length} {items.length === 1 ? "item" : "items"} in your cart
                                </span>
                            </div>

                            <AnimatePresence mode="popLayout">
                                {items.map((item) => (
                                    <CartItemRow
                                        key={`${item.product.id}-${item.size}`}
                                        item={item}
                                        onUpdateQuantity={updateQuantity}
                                        onRemove={removeItem}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-8">
                                <OrderSummary
                                    subtotal={subtotal}
                                    shipping={shipping}
                                    tax={tax}
                                    total={total}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
