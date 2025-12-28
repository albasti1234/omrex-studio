'use client';

import { useState, createContext, useContext, useCallback, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { menuItems, categories, getTopPicks, filterItems, MenuItem } from '../_data/menu';

// ============================================================================
// TRANSLATIONS
// ============================================================================
const t = {
    meta: { title: 'Classfood Restaurant', description: 'Order delicious Indian & Arabic food' },
    hero: {
        tagline: 'Great Food • Fast Delivery • Fair Prices',
        rating: '4.9',
        reviews: '104 reviews',
        orderBtn: 'Order Now',
        callBtn: 'Call',
        locationBtn: 'Location',
        badge: 'Most Ordered Today',
        services: { delivery: 'Delivery', takeaway: 'Takeaway', dinein: 'Dine-in', halal: 'Halal' }
    },
    menu: {
        title: 'Our Menu',
        topPicks: 'Top Picks',
        search: 'Search for a dish...',
        filters: { under20: 'Under 20 AED', spicy: 'Spicy', veg: 'Vegetarian', sweet: 'Desserts', drinks: 'Drinks' },
        addBtn: 'Add',
        currency: 'AED',
        popular: 'Popular',
        new: 'New'
    },
    deal: { title: "Today's Deal", save: 'Save', oldPrice: 'Was', newPrice: 'Now' },
    cart: { title: 'Your Cart', empty: 'Cart is empty', subtotal: 'Subtotal', checkout: 'Checkout' },
    checkout: {
        title: 'Checkout', name: 'Name', phone: 'Phone', orderType: 'Order Type',
        pickup: 'Pickup', delivery: 'Delivery', notes: 'Notes (optional)',
        submit: 'Place Order', success: 'Order Received!', orderNumber: 'Order #', whatsapp: 'Send via WhatsApp'
    },
    experience: {
        title: 'Why Classfood?',
        items: [
            { icon: '⚡', title: 'Fast Service', desc: 'Your order ready in no time' },
            { icon: '🍽️', title: 'Great Variety', desc: 'Indian, Arabic & more' },
            { icon: '✅', title: '100% Halal', desc: 'All our food is halal' },
            { icon: '💰', title: 'Fair Prices', desc: 'Quality at great value' },
            { icon: '👨‍👩‍👧‍👦', title: 'Family Friendly', desc: 'Comfortable for everyone' },
            { icon: '🅿️', title: 'Free Parking', desc: 'Plenty of parking space' }
        ]
    },
    reviews: {
        title: 'Customer Reviews', disclaimer: '(sample quotes)',
        items: [
            { name: 'Ahmed M.', text: 'Best biriyani in the area! Great taste and generous portions.' },
            { name: 'Sara A.', text: 'Love their dosa, always fresh and quick service.' },
            { name: 'Mohammed R.', text: 'Excellent service and very reasonable prices.' }
        ]
    },
    location: { title: 'Location & Hours', address: 'Madinat Zayed Shopping Center, Abu Dhabi', floor: '2nd Floor - Food Court', hours: 'Daily 10 AM - 11 PM', mapsBtn: 'Open in Google Maps' },
    footer: { phone: '02 622 7669', disclaimer: 'This is a demo concept for presentation only', copyright: '© 2025 Classfood Restaurant' },
    lang: { switch: 'العربية' }
};

// ============================================================================
// CART CONTEXT
// ============================================================================
interface CartItem extends MenuItem { quantity: number; }
interface CartContextType {
    items: CartItem[];
    addItem: (item: MenuItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, qty: number) => void;
    total: number;
    itemCount: number;
    clearCart: () => void;
    justAdded: string | null;
}

const CartContext = createContext<CartContextType | null>(null);

function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [justAdded, setJustAdded] = useState<string | null>(null);

    const addItem = useCallback((item: MenuItem) => {
        setItems(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            return [...prev, { ...item, quantity: 1 }];
        });
        setJustAdded(item.id);
        setTimeout(() => setJustAdded(null), 500);
    }, []);

    const removeItem = useCallback((id: string) => setItems(prev => prev.filter(i => i.id !== id)), []);
    const updateQuantity = useCallback((id: string, qty: number) => {
        if (qty <= 0) setItems(prev => prev.filter(i => i.id !== id));
        else setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
    }, []);
    const clearCart = useCallback(() => setItems([]), []);
    const total = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);
    const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, total, itemCount, clearCart, justAdded }}>
            {children}
        </CartContext.Provider>
    );
}

function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
}

// ============================================================================
// MAIN PAGE
// ============================================================================
export default function ClassfoodEnglishPage() {
    return (
        <CartProvider>
            <html lang="en" dir="ltr">
                <body className="classfood-page bg-[#FAFAFA] text-gray-900">
                    <main className="min-h-screen overflow-x-hidden">
                        <Hero />
                        <DealOfDay />
                        <MenuHub />
                        <FoodGallery />
                        <Experience />
                        <Reviews />
                        <Location />
                        <Footer />
                    </main>
                    <FloatingCart />
                </body>
            </html>
        </CartProvider>
    );
}

// ============================================================================
// HERO SECTION - CINEMATIC
// ============================================================================
function Hero() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="relative h-[90vh] min-h-[600px] overflow-hidden bg-black">
            {/* Parallax Background Image */}
            <div
                className="absolute inset-0 scale-110"
                style={{ transform: `translateY(${scrollY * 0.3}px)` }}
            >
                <Image
                    src="/images/classfood/hero.png"
                    alt="Classfood Food Spread"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                />
            </div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

            {/* Steam Effects */}
            <div className="absolute top-1/3 right-1/4 opacity-60">
                <div className="cf-steam" style={{ animationDelay: '0s' }} />
                <div className="cf-steam" style={{ animationDelay: '0.7s', left: '20px' }} />
                <div className="cf-steam" style={{ animationDelay: '1.4s', left: '40px' }} />
            </div>

            {/* Language Toggle */}
            <div className="absolute top-6 right-6 z-20">
                <Link
                    href="/demos/classfood/ar"
                    className="cf-glass px-5 py-2.5 rounded-full text-white text-sm font-semibold hover:bg-white/20 transition-all"
                >
                    {t.lang.switch}
                </Link>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 px-6 max-w-6xl mx-auto">
                {/* Badge */}
                <div className="cf-slide-up mb-6" style={{ animationDelay: '0.2s' }}>
                    <span className="cf-badge cf-badge-popular">
                        🔥 {t.hero.badge}
                    </span>
                </div>

                {/* Rating */}
                <div className="cf-slide-up flex items-center gap-3 mb-4" style={{ animationDelay: '0.3s' }}>
                    <div className="flex text-yellow-400 text-2xl">★★★★★</div>
                    <span className="text-white font-bold text-xl">{t.hero.rating}</span>
                    <span className="text-white/60">({t.hero.reviews})</span>
                </div>

                {/* Title */}
                <h1 className="cf-slide-up cf-heading-xl text-white mb-4" style={{ animationDelay: '0.4s' }}>
                    {t.meta.title}
                </h1>

                {/* Tagline */}
                <p className="cf-slide-up text-white/80 text-lg md:text-xl mb-8 max-w-lg" style={{ animationDelay: '0.5s' }}>
                    {t.hero.tagline}
                </p>

                {/* Service Badges */}
                <div className="cf-slide-up flex flex-wrap gap-2 mb-8" style={{ animationDelay: '0.6s' }}>
                    {Object.values(t.hero.services).map((service, i) => (
                        <span key={i} className="cf-glass px-4 py-2 rounded-full text-white text-sm">
                            {service}
                        </span>
                    ))}
                </div>

                {/* CTAs */}
                <div className="cf-slide-up flex flex-col sm:flex-row gap-4" style={{ animationDelay: '0.7s' }}>
                    <a href="#menu" className="cf-btn-primary cf-pulse-glow text-lg text-center">
                        {t.hero.orderBtn}
                    </a>
                    <a href="tel:026227669" className="cf-btn-secondary text-center">
                        📞 {t.hero.callBtn}
                    </a>
                    <a href="#location" className="cf-btn-secondary text-center">
                        📍 {t.hero.locationBtn}
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 cf-float">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                    <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce" />
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// DEAL OF THE DAY
// ============================================================================
function DealOfDay() {
    const cart = useCart();
    const dealItem = menuItems.find(i => i.id === 'bi1'); // Grilled Chicken Biriyani
    if (!dealItem) return null;

    const discountPrice = (dealItem.price * 0.8).toFixed(0);

    return (
        <section className="py-12 px-6 bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-400">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Image */}
                    <div className="relative w-full md:w-1/2 aspect-square max-w-md">
                        <div className="absolute inset-4 rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/classfood/biriyani.png"
                                alt={dealItem.nameEn}
                                fill
                                className="object-cover"
                            />
                            {/* Sparkle Effects */}
                            <div className="cf-sparkle absolute top-8 right-8" style={{ animationDelay: '0s' }} />
                            <div className="cf-sparkle absolute top-16 left-12" style={{ animationDelay: '0.5s' }} />
                            <div className="cf-sparkle absolute bottom-12 right-16" style={{ animationDelay: '1s' }} />
                        </div>
                        {/* Discount Badge */}
                        <div className="absolute -top-2 -left-2 bg-red-500 text-white font-black text-xl w-20 h-20 rounded-full flex items-center justify-center shadow-xl -rotate-12">
                            -20%
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-white text-center md:text-left">
                        <span className="cf-badge cf-badge-deal mb-4 inline-block">
                            ⏰ {t.deal.title}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                            {dealItem.nameEn}
                        </h2>
                        <p className="text-white/80 text-lg mb-6 max-w-md">
                            {dealItem.descEn}
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                            <span className="text-white/60 line-through text-2xl">{dealItem.price} {t.menu.currency}</span>
                            <span className="text-5xl font-black">{discountPrice} {t.menu.currency}</span>
                        </div>
                        <button
                            onClick={() => cart.addItem({ ...dealItem, price: Number(discountPrice) })}
                            className="bg-white text-orange-600 font-bold text-lg py-4 px-10 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                        >
                            {t.menu.addBtn} 🛒
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// MENU HUB
// ============================================================================
function MenuHub() {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>({});
    const cart = useCart();

    const toggleFilter = (key: string) => setActiveFilters(prev => ({ ...prev, [key]: !prev[key] }));

    const displayItems = useMemo(() => {
        let items = activeCategory ? menuItems.filter(i => i.category === activeCategory) : getTopPicks();
        items = filterItems(items, { ...activeFilters, search: searchQuery } as any);
        return items;
    }, [activeCategory, activeFilters, searchQuery]);

    return (
        <section id="menu" className="py-16 px-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="cf-heading-lg text-gray-900 mb-4">{t.menu.title}</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full" />
            </div>

            {/* Search */}
            <div className="max-w-lg mx-auto mb-8">
                <div className="relative">
                    <input
                        type="text"
                        placeholder={t.menu.search}
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="cf-input pl-12"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">🔍</span>
                </div>
            </div>

            {/* Category Chips */}
            <div className="overflow-x-auto pb-4 mb-6 cf-hide-scrollbar">
                <div className="flex gap-3 min-w-max justify-center">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${activeCategory === null
                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                            : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
                            }`}
                    >
                        ⭐ {t.menu.topPicks}
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-6 py-3 rounded-full font-bold text-sm transition-all whitespace-nowrap ${activeCategory === cat.id
                                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
                                }`}
                        >
                            {cat.nameEn}
                        </button>
                    ))}
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
                {[
                    { key: 'under20', label: t.menu.filters.under20, icon: '💰' },
                    { key: 'spicy', label: t.menu.filters.spicy, icon: '🌶️' },
                    { key: 'veg', label: t.menu.filters.veg, icon: '🥬' },
                    { key: 'sweet', label: t.menu.filters.sweet, icon: '🍰' },
                    { key: 'drink', label: t.menu.filters.drinks, icon: '🥤' },
                ].map(f => (
                    <button
                        key={f.key}
                        onClick={() => toggleFilter(f.key)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeFilters[f.key]
                            ? 'bg-orange-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {f.icon} {f.label}
                    </button>
                ))}
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayItems.map((item, i) => (
                    <MenuCard key={item.id} item={item} index={i} onAdd={() => cart.addItem(item)} />
                ))}
            </div>

            {displayItems.length === 0 && (
                <div className="text-center py-16 text-gray-400">
                    <span className="text-6xl mb-4 block">🍽️</span>
                    <p className="text-xl">No results found</p>
                </div>
            )}
        </section>
    );
}

// ============================================================================
// MENU CARD - PREMIUM
// ============================================================================
const imageMap: Record<string, string> = {
    'bi1': '/images/classfood/biriyani.png',
    'bi2': '/images/classfood/biriyani.png',
    'do2': '/images/classfood/dosa.png',
    'do3': '/images/classfood/dosa.png',
    'b1': '/images/classfood/burger.png',
    'de1': '/images/classfood/kunafa.png',
    'm1': '/images/classfood/mojito.png',
    'c1': '/images/classfood/chaat.png',
    'c5': '/images/classfood/chaat.png',
};

function MenuCard({ item, index, onAdd }: { item: MenuItem; index: number; onAdd: () => void }) {
    const cart = useCart();
    const [showDetails, setShowDetails] = useState(false);
    const isAdded = cart.justAdded === item.id;
    const imageSrc = imageMap[item.id] || null;

    return (
        <>
            <div
                className="cf-card cf-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
            >
                {/* Image */}
                <div className="cf-card-image aspect-square relative">
                    {imageSrc ? (
                        <Image src={imageSrc} alt={item.nameEn} fill className="object-cover" />
                    ) : (
                        <div className="absolute inset-0 cf-img-placeholder flex items-center justify-center">
                            <span className="text-5xl opacity-40">🍽️</span>
                        </div>
                    )}
                    <div className="cf-card-overlay" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                        {item.popular && <span className="cf-badge cf-badge-popular text-[10px]">⭐ {t.menu.popular}</span>}
                        {item.spicy && <span className="cf-badge cf-badge-spicy text-[10px]">🌶️</span>}
                        {item.veg && <span className="cf-badge cf-badge-veg text-[10px]">🥬</span>}
                    </div>

                    {/* Quick Add Overlay */}
                    <button
                        onClick={onAdd}
                        className="absolute bottom-3 left-3 right-3 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all z-10"
                    >
                        {t.menu.addBtn}
                    </button>
                </div>

                {/* Info */}
                <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1 truncate">{item.nameEn}</h3>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-1">{item.descEn}</p>
                    <div className="flex items-center justify-between">
                        <p className="text-orange-600 font-black text-xl">
                            {item.price} <span className="text-sm font-medium text-gray-400">{t.menu.currency}</span>
                        </p>
                        <button
                            onClick={onAdd}
                            className={`cf-btn-add ${isAdded ? 'cf-cart-bounce bg-green-500' : ''}`}
                        >
                            {isAdded ? '✓' : '+'}
                        </button>
                    </div>
                </div>
            </div>

            {showDetails && <ItemDetailsSheet item={item} onClose={() => setShowDetails(false)} onAdd={onAdd} />}
        </>
    );
}

// ============================================================================
// ITEM DETAILS SHEET
// ============================================================================
function ItemDetailsSheet({ item, onClose, onAdd }: { item: MenuItem; onClose: () => void; onAdd: () => void }) {
    const imageSrc = imageMap[item.id] || null;

    return (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center" onClick={onClose}>
            <div className="absolute inset-0 bg-black/60 cf-fade-in" />
            <div
                className="relative bg-white w-full md:w-[28rem] md:rounded-3xl rounded-t-3xl p-6 cf-sheet-enter max-h-[85vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <div className="aspect-video rounded-2xl overflow-hidden mb-6 relative">
                    {imageSrc ? (
                        <Image src={imageSrc} alt={item.nameEn} fill className="object-cover" />
                    ) : (
                        <div className="absolute inset-0 cf-img-placeholder flex items-center justify-center">
                            <span className="text-7xl opacity-40">🍽️</span>
                        </div>
                    )}
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">{item.nameEn}</h3>
                <p className="text-orange-600 font-black text-3xl mb-4">{item.price} {t.menu.currency}</p>
                <p className="text-gray-600 mb-6">{item.descEn}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                    {item.spicy && <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold">🌶️ Spicy</span>}
                    {item.veg && <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold">🥬 Vegetarian</span>}
                    {item.sweet && <span className="bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold">🍰 Sweet</span>}
                </div>
                <div className="flex gap-3">
                    <button onClick={() => { onAdd(); onClose(); }} className="flex-1 cf-btn-primary text-lg">
                        {t.menu.addBtn}
                    </button>
                    <button onClick={onClose} className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-semibold transition-colors">
                        ✕
                    </button>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// FOOD GALLERY - INSTAGRAM STYLE
// ============================================================================
function FoodGallery() {
    const images = [
        '/images/classfood/biriyani.png',
        '/images/classfood/dosa.png',
        '/images/classfood/burger.png',
        '/images/classfood/kunafa.png',
        '/images/classfood/mojito.png',
        '/images/classfood/chaat.png',
    ];

    return (
        <section className="py-16 overflow-hidden">
            <div className="text-center mb-10 px-6">
                <h2 className="cf-heading-lg text-gray-900 mb-2">📸 From Our Kitchen</h2>
                <p className="text-gray-500">Fresh dishes prepared daily</p>
            </div>
            <div className="flex gap-4 animate-scroll cf-hide-scrollbar">
                {[...images, ...images].map((src, i) => (
                    <div key={i} className="flex-shrink-0 w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                        <Image src={src} alt={`Food ${i}`} width={320} height={320} className="object-cover w-full h-full hover:scale-110 transition-transform duration-500" />
                    </div>
                ))}
            </div>
            <style jsx>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 30s linear infinite;
                }
            `}</style>
        </section>
    );
}

// ============================================================================
// EXPERIENCE SECTION
// ============================================================================
function Experience() {
    return (
        <section className="py-16 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                <h2 className="cf-heading-lg text-gray-900 mb-12 text-center">{t.experience.title}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {t.experience.items.map((item, i) => (
                        <div
                            key={i}
                            className="cf-slide-up bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-8 text-center hover:shadow-xl transition-all hover:-translate-y-2"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            <span className="text-5xl mb-4 block">{item.icon}</span>
                            <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
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
function Reviews() {
    return (
        <section className="py-16 px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="cf-heading-lg text-gray-900 mb-2">{t.reviews.title}</h2>
                    <p className="text-gray-500 text-sm">{t.reviews.disclaimer}</p>
                    <div className="flex items-center justify-center gap-3 mt-4">
                        <span className="text-yellow-400 text-3xl">★★★★★</span>
                        <span className="text-3xl font-black text-gray-900">{t.hero.rating}</span>
                    </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {t.reviews.items.map((review, i) => (
                        <div key={i} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                            <p className="text-gray-700 text-lg mb-4 leading-relaxed">"{review.text}"</p>
                            <p className="font-bold text-gray-900">— {review.name}</p>
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
function Location() {
    return (
        <section id="location" className="py-16 px-6 bg-white">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="cf-heading-lg text-gray-900 mb-8">{t.location.title}</h2>
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-10 shadow-lg">
                    <p className="text-2xl font-bold text-gray-900 mb-3">📍 {t.location.address}</p>
                    <p className="text-gray-600 mb-2">{t.location.floor}</p>
                    <p className="text-gray-600 mb-8">🕐 {t.location.hours}</p>
                    <a
                        href="https://maps.google.com/?q=Madinat+Zayed+Shopping+Center+Abu+Dhabi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cf-btn-primary inline-block"
                    >
                        🗺️ {t.location.mapsBtn}
                    </a>
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// FOOTER
// ============================================================================
function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12 px-6">
            <div className="max-w-6xl mx-auto text-center">
                <h3 className="text-3xl font-black mb-4">{t.meta.title}</h3>
                <p className="text-xl mb-6">📞 {t.footer.phone}</p>
                <div className="flex justify-center gap-4 mb-8">
                    <Link href="/demos/classfood/ar" className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-full font-semibold transition-colors">العربية</Link>
                    <Link href="/demos/classfood/en" className="bg-orange-500 px-6 py-2 rounded-full font-semibold">English</Link>
                </div>
                <p className="text-gray-500 text-sm mb-2">{t.footer.disclaimer}</p>
                <p className="text-gray-600 text-sm">{t.footer.copyright}</p>
            </div>
        </footer>
    );
}

// ============================================================================
// FLOATING CART
// ============================================================================
function FloatingCart() {
    const cart = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);

    if (cart.itemCount === 0 && !isOpen) return null;

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 px-8 rounded-full shadow-2xl flex items-center gap-4 transition-all hover:shadow-3xl hover:scale-105 ${cart.justAdded ? 'cf-cart-bounce' : ''}`}
            >
                <span className="bg-white text-orange-600 w-8 h-8 rounded-full flex items-center justify-center font-black">
                    {cart.itemCount}
                </span>
                <span>{t.cart.title}</span>
                <span className="font-black">{cart.total.toFixed(0)} {t.menu.currency}</span>
            </button>

            {/* Cart Drawer */}
            {isOpen && (
                <div className="fixed inset-0 z-50" onClick={() => setIsOpen(false)}>
                    <div className="absolute inset-0 bg-black/60 cf-fade-in" />
                    <div
                        className="absolute bottom-0 md:right-0 md:top-0 bg-white w-full md:w-[420px] rounded-t-3xl md:rounded-none p-6 cf-sheet-enter max-h-[85vh] md:max-h-full overflow-y-auto"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-black text-gray-900">{t.cart.title}</h3>
                            <button onClick={() => setIsOpen(false)} className="text-3xl text-gray-400 hover:text-gray-600">✕</button>
                        </div>

                        {cart.items.length === 0 ? (
                            <div className="text-center py-16">
                                <span className="text-6xl mb-4 block">🛒</span>
                                <p className="text-gray-500">{t.cart.empty}</p>
                            </div>
                        ) : (
                            <div className="space-y-4 mb-6">
                                {cart.items.map(item => (
                                    <div key={item.id} className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4">
                                        <div className="w-20 h-20 rounded-xl cf-img-placeholder flex items-center justify-center flex-shrink-0 overflow-hidden">
                                            {imageMap[item.id] ? (
                                                <Image src={imageMap[item.id]} alt={item.nameEn} width={80} height={80} className="object-cover w-full h-full" />
                                            ) : (
                                                <span className="text-3xl opacity-40">🍽️</span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-gray-900 truncate">{item.nameEn}</h4>
                                            <p className="text-orange-600 font-bold">{item.price} {t.menu.currency}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => cart.updateQuantity(item.id, item.quantity - 1)}
                                                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-lg"
                                            >−</button>
                                            <span className="w-8 text-center font-bold text-lg">{item.quantity}</span>
                                            <button
                                                onClick={() => cart.updateQuantity(item.id, item.quantity + 1)}
                                                className="w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center font-bold text-lg"
                                            >+</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {cart.items.length > 0 && (
                            <div className="border-t pt-6">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-gray-600 font-semibold text-lg">{t.cart.subtotal}</span>
                                    <span className="text-3xl font-black text-gray-900">{cart.total.toFixed(0)} {t.menu.currency}</span>
                                </div>
                                <button
                                    onClick={() => { setIsOpen(false); setShowCheckout(true); }}
                                    className="w-full cf-btn-primary text-lg"
                                >
                                    {t.cart.checkout}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {showCheckout && <CheckoutSheet onClose={() => setShowCheckout(false)} />}
        </>
    );
}

// ============================================================================
// CHECKOUT SHEET
// ============================================================================
function CheckoutSheet({ onClose }: { onClose: () => void }) {
    const cart = useCart();
    const [formData, setFormData] = useState({ name: '', phone: '', orderType: 'pickup', notes: '' });
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setOrderNumber('CF' + Math.random().toString(36).substring(2, 8).toUpperCase());
        setOrderComplete(true);
    };

    const sendWhatsApp = () => {
        const phone = '971000000000';
        let msg = `🍽️ *New Order*%0A📦 ${orderNumber}%0A👤 ${formData.name}%0A📞 ${formData.phone}%0A📍 ${formData.orderType === 'pickup' ? t.checkout.pickup : t.checkout.delivery}%0A%0A*Order:*%0A`;
        cart.items.forEach(item => { msg += `• ${item.nameEn} x${item.quantity} - ${(item.price * item.quantity).toFixed(0)} AED%0A`; });
        msg += `%0A*${t.cart.subtotal}:* ${cart.total.toFixed(0)} AED`;
        if (formData.notes) msg += `%0A📝 ${formData.notes}`;
        window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center" onClick={onClose}>
            <div className="absolute inset-0 bg-black/60 cf-fade-in" />
            <div className="relative bg-white w-full md:w-[28rem] md:rounded-3xl rounded-t-3xl p-8 cf-sheet-enter max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                {orderComplete ? (
                    <div className="text-center py-8">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path className="cf-checkmark" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">{t.checkout.success}</h3>
                        <p className="text-orange-600 font-bold text-xl mb-8">{t.checkout.orderNumber}: {orderNumber}</p>
                        <button onClick={sendWhatsApp} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl text-lg mb-3 transition-colors">
                            💬 {t.checkout.whatsapp}
                        </button>
                        <button onClick={() => { cart.clearCart(); onClose(); }} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors">
                            ✕ Close
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <h3 className="text-2xl font-black text-gray-900 mb-8">{t.checkout.title}</h3>
                        <div className="space-y-5 mb-8">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">{t.checkout.name}</label>
                                <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="cf-input" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">{t.checkout.phone}</label>
                                <input type="tel" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="cf-input" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">{t.checkout.orderType}</label>
                                <div className="flex gap-3">
                                    <button type="button" onClick={() => setFormData({ ...formData, orderType: 'pickup' })} className={`flex-1 py-4 rounded-xl font-bold transition-all ${formData.orderType === 'pickup' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                                        {t.checkout.pickup}
                                    </button>
                                    <button type="button" onClick={() => setFormData({ ...formData, orderType: 'delivery' })} className={`flex-1 py-4 rounded-xl font-bold transition-all ${formData.orderType === 'delivery' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
                                        {t.checkout.delivery}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">{t.checkout.notes}</label>
                                <textarea value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} className="cf-input resize-none h-24" />
                            </div>
                        </div>
                        <div className="bg-orange-50 rounded-2xl p-5 mb-6 flex justify-between items-center">
                            <span className="font-bold text-gray-700">{t.cart.subtotal}</span>
                            <span className="text-3xl font-black text-orange-600">{cart.total.toFixed(0)} {t.menu.currency}</span>
                        </div>
                        <button type="submit" className="w-full cf-btn-primary text-lg">{t.checkout.submit}</button>
                    </form>
                )}
            </div>
        </div>
    );
}
