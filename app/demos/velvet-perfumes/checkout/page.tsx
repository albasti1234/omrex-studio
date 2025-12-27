"use client";

import { useState } from "react";
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
        success: "#22c55e",
        error: "#ef4444",
    },
} as const;

// =============================================================================
// TYPES
// =============================================================================

interface FormData {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
    phone: string;
    sameAsBilling: boolean;
    billingAddress: string;
    billingCity: string;
    billingCountry: string;
    billingPostalCode: string;
    cardNumber: string;
    cardExpiry: string;
    cardCvc: string;
    cardName: string;
}

// =============================================================================
// INPUT COMPONENT
// =============================================================================

function FormInput({ label, name, type = "text", value, onChange, placeholder, required = true, half = false }: {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    half?: boolean;
}) {
    return (
        <div className={half ? "w-1/2" : "w-full"}>
            <label className="block text-xs uppercase tracking-[0.1em] mb-2" style={{ color: THEME.colors.text.muted }}>
                {label} {required && <span style={{ color: THEME.colors.accent.gold }}>*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full px-4 py-3 text-sm outline-none transition-all focus:ring-1"
                style={{
                    background: THEME.colors.bg.tertiary,
                    border: `1px solid ${THEME.colors.border.default}`,
                    color: THEME.colors.text.primary,
                }}
            />
        </div>
    );
}

// =============================================================================
// ORDER SUMMARY SIDEBAR
// =============================================================================

function CheckoutSummary({ items, subtotal, shipping, tax, total }: {
    items: Array<{ product: { id: string; name: string; image: string }; quantity: number; size: string; price: number }>;
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
}) {
    return (
        <div className="p-6 rounded-lg" style={{ background: THEME.colors.bg.secondary, border: `1px solid ${THEME.colors.border.subtle}` }}>
            <h3 className="text-lg font-light mb-4 pb-3" style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif", borderBottom: `1px solid ${THEME.colors.border.subtle}` }}>
                Order Summary
            </h3>

            {/* Items */}
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                        <div className="relative w-14 h-16 flex-shrink-0 rounded overflow-hidden" style={{ background: THEME.colors.bg.tertiary }}>
                            <Image src={item.product.image} alt={item.product.name} fill className="object-contain p-1" />
                            <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs rounded-full" style={{ background: THEME.colors.accent.gold, color: THEME.colors.bg.primary }}>
                                {item.quantity}
                            </span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm" style={{ color: THEME.colors.text.primary }}>{item.product.name}</p>
                            <p className="text-xs" style={{ color: THEME.colors.text.muted }}>{item.size}</p>
                        </div>
                        <p className="text-sm" style={{ color: THEME.colors.text.primary }}>${(item.price * item.quantity).toFixed(0)}</p>
                    </div>
                ))}
            </div>

            <div className="space-y-2 text-sm pt-3" style={{ borderTop: `1px solid ${THEME.colors.border.subtle}` }}>
                <div className="flex justify-between">
                    <span style={{ color: THEME.colors.text.secondary }}>Subtotal</span>
                    <span style={{ color: THEME.colors.text.primary }}>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span style={{ color: THEME.colors.text.secondary }}>Shipping</span>
                    <span style={{ color: THEME.colors.text.primary }}>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                    <span style={{ color: THEME.colors.text.secondary }}>Tax</span>
                    <span style={{ color: THEME.colors.text.primary }}>${tax.toFixed(2)}</span>
                </div>
            </div>

            <div className="flex justify-between mt-4 pt-3 text-lg" style={{ borderTop: `1px solid ${THEME.colors.border.subtle}` }}>
                <span style={{ color: THEME.colors.text.primary }}>Total</span>
                <span style={{ color: THEME.colors.accent.gold, fontFamily: "'Playfair Display', serif", fontSize: "1.4rem" }}>
                    ${total.toFixed(2)}
                </span>
            </div>
        </div>
    );
}

// =============================================================================
// SUCCESS STATE
// =============================================================================

function OrderSuccess({ orderNumber, email }: { orderNumber: string; email: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-3xl"
                style={{ background: `rgba(34, 197, 94, 0.1)`, border: `2px solid ${THEME.colors.success}` }}
            >
                ✓
            </motion.div>

            <h2 className="text-3xl font-light mb-4" style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}>
                Thank You for Your Order!
            </h2>
            <p className="mb-2" style={{ color: THEME.colors.text.secondary }}>
                Order #{orderNumber}
            </p>
            <p className="mb-8" style={{ color: THEME.colors.text.muted }}>
                Confirmation sent to {email}
            </p>

            <div className="p-6 rounded-lg max-w-md mx-auto mb-8" style={{ background: THEME.colors.bg.secondary, border: `1px solid ${THEME.colors.border.subtle}` }}>
                <p className="text-sm" style={{ color: THEME.colors.text.secondary }}>
                    Your luxurious fragrances will be carefully packaged and shipped within 1-2 business days.
                    You will receive tracking information via email.
                </p>
            </div>

            <Link
                href="/demos/velvet-perfumes"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm uppercase tracking-[0.15em] transition-all"
                style={{ background: THEME.colors.accent.gold, color: THEME.colors.bg.primary }}
            >
                Continue Shopping
                <span>→</span>
            </Link>
        </motion.div>
    );
}

// =============================================================================
// MAIN CHECKOUT PAGE
// =============================================================================

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderNumber, setOrderNumber] = useState("");
    const [formData, setFormData] = useState<FormData>({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        country: "",
        postalCode: "",
        phone: "",
        sameAsBilling: true,
        billingAddress: "",
        billingCity: "",
        billingCountry: "",
        billingPostalCode: "",
        cardNumber: "",
        cardExpiry: "",
        cardCvc: "",
        cardName: "",
    });

    const subtotal = totalPrice;
    const shipping = subtotal > 200 ? 0 : 15;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || "";
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        return parts.length ? parts.join(" ") : value;
    };

    const formatExpiry = (value: string) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        if (v.length >= 2) {
            return v.substring(0, 2) + "/" + v.substring(2, 4);
        }
        return v;
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCardNumber(e.target.value);
        setFormData(prev => ({ ...prev, cardNumber: formatted }));
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatExpiry(e.target.value.replace("/", ""));
        setFormData(prev => ({ ...prev, cardExpiry: formatted }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2500));

        // Generate order number
        const orderNum = `VP-${Date.now().toString(36).toUpperCase()}`;
        setOrderNumber(orderNum);
        clearCart();
        setOrderComplete(true);
        setIsProcessing(false);
    };

    if (items.length === 0 && !orderComplete) {
        return (
            <main className="min-h-screen flex items-center justify-center" style={{ background: THEME.colors.bg.primary }}>
                <div className="text-center">
                    <p className="mb-4" style={{ color: THEME.colors.text.secondary }}>Your cart is empty</p>
                    <Link
                        href="/demos/velvet-perfumes/fragrances"
                        className="inline-flex items-center gap-2 px-6 py-3 text-sm uppercase tracking-[0.15em]"
                        style={{ background: THEME.colors.accent.gold, color: THEME.colors.bg.primary }}
                    >
                        Browse Fragrances
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen" style={{ background: THEME.colors.bg.primary }}>
            {/* Header */}
            <div className="py-6 sm:py-8" style={{ background: THEME.colors.bg.secondary }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4">
                        <Link href="/demos/velvet-perfumes/cart" className="text-xl" style={{ color: THEME.colors.accent.gold }}>
                            ←
                        </Link>
                        <div>
                            <p className="text-[0.6rem] uppercase tracking-[0.25em] mb-1" style={{ color: THEME.colors.accent.gold }}>
                                ✦ Secure Checkout ✦
                            </p>
                            <h1 className="text-xl sm:text-2xl font-light" style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}>
                                Complete Your <span style={{ color: THEME.colors.accent.gold, fontStyle: "italic" }}>Order</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <AnimatePresence mode="wait">
                    {orderComplete ? (
                        <OrderSuccess orderNumber={orderNumber} email={formData.email} />
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                        >
                            {/* Form */}
                            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
                                {/* Contact */}
                                <div className="p-6 rounded-lg" style={{ background: THEME.colors.bg.secondary, border: `1px solid ${THEME.colors.border.subtle}` }}>
                                    <h3 className="text-lg font-light mb-4" style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}>
                                        Contact Information
                                    </h3>
                                    <FormInput label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="your@email.com" />
                                </div>

                                {/* Shipping */}
                                <div className="p-6 rounded-lg" style={{ background: THEME.colors.bg.secondary, border: `1px solid ${THEME.colors.border.subtle}` }}>
                                    <h3 className="text-lg font-light mb-4" style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}>
                                        Shipping Address
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex gap-4">
                                            <FormInput label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} half />
                                            <FormInput label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} half />
                                        </div>
                                        <FormInput label="Address" name="address" value={formData.address} onChange={handleInputChange} placeholder="Street address" />
                                        <div className="flex gap-4">
                                            <FormInput label="City" name="city" value={formData.city} onChange={handleInputChange} half />
                                            <FormInput label="Postal Code" name="postalCode" value={formData.postalCode} onChange={handleInputChange} half />
                                        </div>
                                        <div className="flex gap-4">
                                            <FormInput label="Country" name="country" value={formData.country} onChange={handleInputChange} half />
                                            <FormInput label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} half required={false} />
                                        </div>
                                    </div>
                                </div>

                                {/* Payment */}
                                <div className="p-6 rounded-lg" style={{ background: THEME.colors.bg.secondary, border: `1px solid ${THEME.colors.border.subtle}` }}>
                                    <h3 className="text-lg font-light mb-4" style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}>
                                        Payment Details
                                    </h3>
                                    <div className="flex items-center gap-2 mb-4 p-3 rounded" style={{ background: THEME.colors.bg.tertiary }}>
                                        <span style={{ color: THEME.colors.accent.gold }}>🔒</span>
                                        <span className="text-xs" style={{ color: THEME.colors.text.muted }}>Your payment information is encrypted and secure</span>
                                    </div>
                                    <div className="space-y-4">
                                        <FormInput label="Name on Card" name="cardName" value={formData.cardName} onChange={handleInputChange} placeholder="John Doe" />
                                        <div>
                                            <label className="block text-xs uppercase tracking-[0.1em] mb-2" style={{ color: THEME.colors.text.muted }}>
                                                Card Number <span style={{ color: THEME.colors.accent.gold }}>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.cardNumber}
                                                onChange={handleCardNumberChange}
                                                placeholder="4242 4242 4242 4242"
                                                maxLength={19}
                                                required
                                                className="w-full px-4 py-3 text-sm outline-none"
                                                style={{ background: THEME.colors.bg.tertiary, border: `1px solid ${THEME.colors.border.default}`, color: THEME.colors.text.primary }}
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-1/2">
                                                <label className="block text-xs uppercase tracking-[0.1em] mb-2" style={{ color: THEME.colors.text.muted }}>
                                                    Expiry <span style={{ color: THEME.colors.accent.gold }}>*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.cardExpiry}
                                                    onChange={handleExpiryChange}
                                                    placeholder="MM/YY"
                                                    maxLength={5}
                                                    required
                                                    className="w-full px-4 py-3 text-sm outline-none"
                                                    style={{ background: THEME.colors.bg.tertiary, border: `1px solid ${THEME.colors.border.default}`, color: THEME.colors.text.primary }}
                                                />
                                            </div>
                                            <FormInput label="CVC" name="cardCvc" value={formData.cardCvc} onChange={handleInputChange} placeholder="123" half />
                                        </div>
                                    </div>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="w-full py-4 text-sm uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                                    style={{ background: THEME.colors.accent.gold, color: THEME.colors.bg.primary }}
                                >
                                    {isProcessing ? (
                                        <>
                                            <motion.span
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            >
                                                ⟳
                                            </motion.span>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Complete Order • ${total.toFixed(2)}
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-xs" style={{ color: THEME.colors.text.muted }}>
                                    Demo mode: Use card 4242 4242 4242 4242 with any future date and CVC
                                </p>
                            </form>

                            {/* Summary */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-8">
                                    <CheckoutSummary items={items} subtotal={subtotal} shipping={shipping} tax={tax} total={total} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
