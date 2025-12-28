'use client';

import { useState, createContext, useContext, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { menuItems, categories, getTopPicks, filterItems, MenuItem } from '../_data/menu';
import ar from '../_i18n/ar.json';

// Types
interface CartItem extends MenuItem {
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: MenuItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, qty: number) => void;
    total: number;
    itemCount: number;
    clearCart: () => void;
}

// Cart Context
const CartContext = createContext<CartContextType | null>(null);

function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = useCallback((item: MenuItem) => {
        setItems(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    }, []);

    const removeItem = useCallback((id: string) => {
        setItems(prev => prev.filter(i => i.id !== id));
    }, []);

    const updateQuantity = useCallback((id: string, qty: number) => {
        if (qty <= 0) {
            setItems(prev => prev.filter(i => i.id !== id));
        } else {
            setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
        }
    }, []);

    const clearCart = useCallback(() => setItems([]), []);

    const total = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);
    const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, total, itemCount, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
}

// Main Page
export default function ClassfoodArabicPage() {
    const t = ar;
    const lang = 'ar';
    const isRTL = true;

    return (
        <CartProvider>
            <html lang={lang} dir={isRTL ? 'rtl' : 'ltr'}>
                <body className="classfood-page bg-gray-50 text-gray-900 font-sans">
                    <main className="min-h-screen">
                        <Hero t={t} lang={lang} />
                        <MenuHub t={t} lang={lang} />
                        <Experience t={t} />
                        <Reviews t={t} />
                        <Location t={t} />
                        <Footer t={t} lang={lang} />
                    </main>
                    <FloatingCart t={t} lang={lang} />
                </body>
            </html>
        </CartProvider>
    );
}

// ============================================================================
// HERO SECTION
// ============================================================================

function Hero({ t, lang }: { t: typeof ar; lang: string }) {
    return (
        <section className="relative bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-400 text-white overflow-hidden">
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            </div>

            <div className="relative z-10 px-4 py-12 md:py-20 max-w-6xl mx-auto">
                {/* Language Toggle */}
                <div className="absolute top-4 left-4">
                    <Link
                        href="/demos/classfood/en"
                        className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/30 transition-colors"
                    >
                        {t.lang.switch}
                    </Link>
                </div>

                {/* Content */}
                <div className="text-center pt-8">
                    {/* Rating Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                        <span className="text-yellow-300 text-lg">â˜…</span>
                        <span className="font-bold">{t.hero.rating}</span>
                        <span className="text-white/80 text-sm">({t.hero.reviews})</span>
                    </div>

                    {/* Restaurant Name */}
                    <h1 className="text-4xl md:text-6xl font-black mb-4 drop-shadow-lg">
                        {t.meta.title}
                    </h1>

                    {/* Tagline */}
                    <p className="text-lg md:text-xl text-white/90 mb-8 max-w-md mx-auto">
                        {t.hero.tagline}
                    </p>

                    {/* Service Badges */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {Object.entries(t.hero.services).map(([key, value]) => (
                            <span key={key} className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                                {value}
                            </span>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <a
                            href="#menu"
                            className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                        >
                            {t.hero.orderBtn}
                        </a>
                        <div className="flex justify-center gap-3">
                            <a
                                href="tel:026227669"
                                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-4 px-6 rounded-full transition-colors"
                            >
                                ðŸ“ž {t.hero.callBtn}
                            </a>
                            <a
                                href="#location"
                                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-4 px-6 rounded-full transition-colors"
                            >
                                ðŸ“ {t.hero.locationBtn}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// MENU HUB
// ============================================================================

function MenuHub({ t, lang }: { t: typeof ar; lang: string }) {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilters, setActiveFilters] = useState<{ under20?: boolean; spicy?: boolean; veg?: boolean; sweet?: boolean; drink?: boolean }>({});
    const cart = useCart();

    const toggleFilter = (key: keyof typeof activeFilters) => {
        setActiveFilters(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const displayItems = useMemo(() => {
        let items = activeCategory ? menuItems.filter(i => i.category === activeCategory) : getTopPicks();
        items = filterItems(items, { ...activeFilters, search: searchQuery });
        return items;
    }, [activeCategory, activeFilters, searchQuery]);

    return (
        <section id="menu" className="py-10 px-4 max-w-6xl mx-auto">
            {/* Header */}
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">{t.menu.title}</h2>

            {/* Search */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder={t.menu.search}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full md:w-96 px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                />
            </div>

            {/* Category Chips */}
            <div className="overflow-x-auto pb-2 mb-4 cf-scrollbar">
                <div className="flex gap-2 min-w-max">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${activeCategory === null ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {t.menu.topPicks}
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors whitespace-nowrap ${activeCategory === cat.id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {lang === 'ar' ? cat.nameAr : cat.nameEn}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
                {[
                    { key: 'under20', label: t.menu.filters.under20 },
                    { key: 'spicy', label: t.menu.filters.spicy },
                    { key: 'veg', label: t.menu.filters.veg },
                    { key: 'sweet', label: t.menu.filters.sweet },
                    { key: 'drink', label: t.menu.filters.drinks },
                ].map(f => (
                    <button
                        key={f.key}
                        onClick={() => toggleFilter(f.key as keyof typeof activeFilters)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeFilters[f.key as keyof typeof activeFilters]
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayItems.map(item => (
                    <MenuCard key={item.id} item={item} t={t} lang={lang} onAdd={() => cart.addItem(item)} />
                ))}
            </div>

            {displayItems.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    {lang === 'ar' ? 'Ù„Ø§ ØªÙˆØ¬Ø¯ Ù†ØªØ§Ø¦Ø¬' : 'No results found'}
                </div>
            )}
        </section>
    );
}

function MenuCard({ item, t, lang, onAdd }: { item: MenuItem; t: typeof ar; lang: string; onAdd: () => void }) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <>
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
                {/* Image */}
                <div className="aspect-square relative bg-gradient-to-br from-orange-100 to-orange-200 overflow-hidden">
                    {item.image ? (
                        <Image src={item.image} alt={lang === 'ar' ? item.nameAr : item.nameEn} fill className="object-cover" />
                    ) : (
                        <div className="absolute inset-0 cf-img-placeholder flex items-center justify-center">
                            <span className="text-4xl opacity-50">ðŸ½ï¸</span>
                        </div>
                    )}
                    {/* Badges */}
                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                        {item.spicy && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">ðŸŒ¶ï¸</span>}
                        {item.veg && <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">ðŸ¥¬</span>}
                    </div>
                </div>

                {/* Info */}
                <div className="p-3">
                    <h3 className="font-bold text-gray-900 text-sm mb-1 truncate">
                        {lang === 'ar' ? item.nameAr : item.nameEn}
                    </h3>
                    <p className="text-orange-600 font-black text-lg mb-2">
                        {item.price} <span className="text-sm font-medium">{t.menu.currency}</span>
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={onAdd}
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg text-sm transition-colors"
                        >
                            {t.menu.addBtn}
                        </button>
                        <button
                            onClick={() => setShowDetails(true)}
                            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-sm transition-colors"
                        >
                            â„¹ï¸
                        </button>
                    </div>
                </div>
            </div>

            {/* Details Modal */}
            {showDetails && (
                <ItemDetailsSheet item={item} t={t} lang={lang} onClose={() => setShowDetails(false)} onAdd={onAdd} />
            )}
        </>
    );
}

function ItemDetailsSheet({ item, t, lang, onClose, onAdd }: { item: MenuItem; t: typeof ar; lang: string; onClose: () => void; onAdd: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center" onClick={onClose}>
            <div className="absolute inset-0 bg-black/50 cf-fade-in" />
            <div
                className="relative bg-white w-full md:w-96 md:rounded-2xl rounded-t-3xl p-6 cf-sheet-enter max-h-[80vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                {/* Image */}
                <div className="aspect-video rounded-xl overflow-hidden mb-4 cf-img-placeholder flex items-center justify-center">
                    <span className="text-6xl opacity-50">ðŸ½ï¸</span>
                </div>

                {/* Info */}
                <h3 className="text-2xl font-black text-gray-900 mb-2">
                    {lang === 'ar' ? item.nameAr : item.nameEn}
                </h3>
                <p className="text-orange-600 font-black text-2xl mb-4">
                    {item.price} {t.menu.currency}
                </p>
                <p className="text-gray-600 mb-6">
                    {lang === 'ar' ? item.descAr : item.descEn}
                </p>

                {/* Badges */}
                <div className="flex gap-2 mb-6">
                    {item.spicy && <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">ðŸŒ¶ï¸ {lang === 'ar' ? 'Ø­Ø§Ø±' : 'Spicy'}</span>}
                    {item.veg && <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">ðŸ¥¬ {lang === 'ar' ? 'Ù†Ø¨Ø§ØªÙŠ' : 'Vegetarian'}</span>}
                    {item.sweet && <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm">ðŸ° {lang === 'ar' ? 'Ø­Ù„Ùˆ' : 'Sweet'}</span>}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={() => { onAdd(); onClose(); }}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl text-lg transition-colors"
                    >
                        {t.menu.addBtn}
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-semibold transition-colors"
                    >
                        âœ•
                    </button>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// FLOATING CART
// ============================================================================

function FloatingCart({ t, lang }: { t: typeof ar; lang: string }) {
    const cart = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);

    if (cart.itemCount === 0 && !isOpen) return null;

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full shadow-xl flex items-center gap-3 transition-all hover:shadow-2xl cf-btn-glow"
            >
                <span className="bg-white text-orange-500 w-7 h-7 rounded-full flex items-center justify-center font-black text-sm">
                    {cart.itemCount}
                </span>
                <span>{t.cart.title}</span>
                <span className="font-black">{cart.total.toFixed(1)} {t.menu.currency}</span>
            </button>

            {/* Cart Drawer */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-end" onClick={() => setIsOpen(false)}>
                    <div className="absolute inset-0 bg-black/50 cf-fade-in" />
                    <div
                        className="relative bg-white w-full md:w-96 md:h-full rounded-t-3xl md:rounded-none p-6 cf-sheet-enter max-h-[85vh] overflow-y-auto"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-black text-gray-900">{t.cart.title}</h3>
                            <button onClick={() => setIsOpen(false)} className="text-2xl text-gray-400 hover:text-gray-600">âœ•</button>
                        </div>

                        {/* Items */}
                        {cart.items.length === 0 ? (
                            <p className="text-gray-500 text-center py-12">{t.cart.empty}</p>
                        ) : (
                            <div className="space-y-4 mb-6">
                                {cart.items.map(item => (
                                    <div key={item.id} className="flex items-center gap-4 bg-gray-50 rounded-xl p-3">
                                        <div className="w-16 h-16 rounded-lg cf-img-placeholder flex items-center justify-center flex-shrink-0">
                                            <span className="text-2xl opacity-50">ðŸ½ï¸</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-900 truncate">
                                                {lang === 'ar' ? item.nameAr : item.nameEn}
                                            </h4>
                                            <p className="text-orange-600 font-bold">{item.price} {t.menu.currency}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => cart.updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                                            >
                                                âˆ’
                                            </button>
                                            <span className="w-8 text-center font-bold">{item.quantity}</span>
                                            <button
                                                onClick={() => cart.updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center font-bold"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Subtotal & Checkout */}
                        {cart.items.length > 0 && (
                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-600 font-semibold">{t.cart.subtotal}</span>
                                    <span className="text-2xl font-black text-gray-900">{cart.total.toFixed(1)} {t.menu.currency}</span>
                                </div>
                                <button
                                    onClick={() => { setIsOpen(false); setShowCheckout(true); }}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl text-lg transition-colors"
                                >
                                    {t.cart.checkout}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Checkout Modal */}
            {showCheckout && <CheckoutSheet t={t} lang={lang} onClose={() => setShowCheckout(false)} />}
        </>
    );
}

// ============================================================================
// CHECKOUT
// ============================================================================

function CheckoutSheet({ t, lang, onClose }: { t: typeof ar; lang: string; onClose: () => void }) {
    const cart = useCart();
    const [formData, setFormData] = useState({ name: '', phone: '', orderType: 'pickup', notes: '' });
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const num = 'CF' + Math.random().toString(36).substring(2, 8).toUpperCase();
        setOrderNumber(num);
        setOrderComplete(true);
    };

    const sendWhatsApp = () => {
        const phone = '971000000000'; // Placeholder
        let message = `ðŸ½ï¸ *${lang === 'ar' ? 'Ø·Ù„Ø¨ Ø¬Ø¯ÙŠØ¯' : 'New Order'}*%0A`;
        message += `ðŸ“¦ ${orderNumber}%0A`;
        message += `ðŸ‘¤ ${formData.name}%0A`;
        message += `ðŸ“ž ${formData.phone}%0A`;
        message += `ðŸ“ ${formData.orderType === 'pickup' ? t.checkout.pickup : t.checkout.delivery}%0A%0A`;
        message += `*${lang === 'ar' ? 'Ø§Ù„Ø·Ù„Ø¨' : 'Order'}:*%0A`;
        cart.items.forEach(item => {
            message += `â€¢ ${lang === 'ar' ? item.nameAr : item.nameEn} x${item.quantity} - ${(item.price * item.quantity).toFixed(1)} AED%0A`;
        });
        message += `%0A*${t.cart.subtotal}:* ${cart.total.toFixed(1)} AED`;
        if (formData.notes) message += `%0AðŸ“ ${formData.notes}`;
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center" onClick={onClose}>
            <div className="absolute inset-0 bg-black/50 cf-fade-in" />
            <div
                className="relative bg-white w-full md:w-[28rem] md:rounded-2xl rounded-t-3xl p-6 cf-sheet-enter max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                {orderComplete ? (
                    // Success State
                    <div className="text-center py-8">
                        <div className="text-6xl mb-4">âœ…</div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">{t.checkout.success}</h3>
                        <p className="text-orange-600 font-bold text-xl mb-6">{t.checkout.orderNumber}: {orderNumber}</p>

                        {/* Order Summary */}
                        <div className="bg-gray-50 rounded-xl p-4 text-right mb-6">
                            {cart.items.map(item => (
                                <div key={item.id} className="flex justify-between py-1">
                                    <span>{item.quantity}x</span>
                                    <span>{lang === 'ar' ? item.nameAr : item.nameEn}</span>
                                </div>
                            ))}
                            <div className="border-t mt-2 pt-2 font-bold flex justify-between">
                                <span>{t.cart.subtotal}</span>
                                <span>{cart.total.toFixed(1)} {t.menu.currency}</span>
                            </div>
                        </div>

                        <button
                            onClick={sendWhatsApp}
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl text-lg mb-3 transition-colors"
                        >
                            ðŸ’¬ {t.checkout.whatsapp}
                        </button>
                        <button
                            onClick={() => { cart.clearCart(); onClose(); }}
                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
                        >
                            âœ• {lang === 'ar' ? 'Ø¥ØºÙ„Ø§Ù‚' : 'Close'}
                        </button>
                    </div>
                ) : (
                    // Form
                    <form onSubmit={handleSubmit}>
                        <h3 className="text-2xl font-black text-gray-900 mb-6">{t.checkout.title}</h3>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">{t.checkout.name}</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">{t.checkout.phone}</label>
                                <input
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">{t.checkout.orderType}</label>
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, orderType: 'pickup' })}
                                        className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${formData.orderType === 'pickup' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        {t.checkout.pickup}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, orderType: 'delivery' })}
                                        className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${formData.orderType === 'delivery' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        {t.checkout.delivery}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">{t.checkout.notes}</label>
                                <textarea
                                    value={formData.notes}
                                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none resize-none h-20"
                                />
                            </div>
                        </div>

                        {/* Total */}
                        <div className="flex justify-between items-center mb-4 p-4 bg-orange-50 rounded-xl">
                            <span className="font-semibold">{t.cart.subtotal}</span>
                            <span className="text-2xl font-black text-orange-600">{cart.total.toFixed(1)} {t.menu.currency}</span>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl text-lg transition-colors"
                        >
                            {t.checkout.submit}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

// ============================================================================
// EXPERIENCE SECTION
// ============================================================================

function Experience({ t }: { t: typeof ar }) {
    return (
        <section className="py-12 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 text-center">{t.experience.title}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {t.experience.items.map((item, i) => (
                        <div key={i} className="bg-orange-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                            <span className="text-4xl mb-3 block">{item.icon}</span>
                            <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// REVIEWS SECTION
// ============================================================================

function Reviews({ t }: { t: typeof ar }) {
    return (
        <section className="py-12 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">{t.reviews.title}</h2>
                    <p className="text-gray-500 text-sm">{t.reviews.disclaimer}</p>
                    <div className="flex items-center justify-center gap-2 mt-4">
                        <span className="text-yellow-500 text-3xl">â˜…â˜…â˜…â˜…â˜…</span>
                        <span className="text-2xl font-black text-gray-900">{t.hero.rating}</span>
                        <span className="text-gray-500">({t.hero.reviews})</span>
                    </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {t.reviews.items.map((review, i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                            <p className="text-gray-700 mb-4">"{review.text}"</p>
                            <p className="font-bold text-gray-900">â€” {review.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// LOCATION SECTION
// ============================================================================

function Location({ t }: { t: typeof ar }) {
    return (
        <section id="location" className="py-12 px-4 bg-white">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">{t.location.title}</h2>
                <div className="bg-orange-50 rounded-2xl p-8 mb-6">
                    <p className="text-xl font-bold text-gray-900 mb-2">ðŸ“ {t.location.address}</p>
                    <p className="text-gray-600 mb-4">{t.location.floor}</p>
                    <p className="text-gray-600 mb-6">ðŸ• {t.location.hours}</p>
                    <a
                        href="https://maps.google.com/?q=Madinat+Zayed+Shopping+Center+Abu+Dhabi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors"
                    >
                        ðŸ—ºï¸ {t.location.mapsBtn}
                    </a>
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// FOOTER
// ============================================================================

function Footer({ t, lang }: { t: typeof ar; lang: string }) {
    return (
        <footer className="bg-gray-900 text-white py-10 px-4">
            <div className="max-w-6xl mx-auto text-center">
                <h3 className="text-2xl font-black mb-4">{t.meta.title}</h3>
                <p className="text-lg mb-4">ðŸ“ž {t.footer.phone}</p>

                {/* Language Toggle */}
                <div className="flex justify-center gap-4 mb-6">
                    <Link
                        href="/demos/classfood/ar"
                        className={`px-4 py-2 rounded-full font-semibold transition-colors ${lang === 'ar' ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                    >
                        Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©
                    </Link>
                    <Link
                        href="/demos/classfood/en"
                        className={`px-4 py-2 rounded-full font-semibold transition-colors ${lang === 'en' ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                    >
                        English
                    </Link>
                </div>

                <p className="text-gray-500 text-sm mb-2">{t.footer.disclaimer}</p>
                <p className="text-gray-600 text-sm">{t.footer.copyright}</p>
            </div>
        </footer>
    );
}
