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
    location: { title: 'Location & Hours', address: 'Bani Yas Cooperative Society', floor: 'Food Court - 2nd Floor - Bani Yas - EB9 - Abu Dhabi', hours: 'Daily 10 AM - 11 PM', mapsBtn: 'Open in Google Maps' },
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
            <div lang="en" dir="ltr" className="classfood-page bg-[#FAFAFA] text-gray-900">
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
            </div>
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
                <div className="cf-slide-up flex items-center gap-3" style={{ animationDelay: '0.7s' }}>
                    <a href="#menu" className="cf-btn-primary cf-pulse-glow text-lg flex-1 sm:flex-none text-center">
                        🛒 {t.hero.orderBtn}
                    </a>
                    <a href="tel:026227669" className="w-14 h-14 cf-glass rounded-full flex items-center justify-center text-2xl hover:bg-white/20 transition-all" aria-label="Call">
                        📞
                    </a>
                    <a href="#location" className="w-14 h-14 cf-glass rounded-full flex items-center justify-center text-2xl hover:bg-white/20 transition-all" aria-label="Location">
                        📍
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
        <section id="menu" className="py-16 px-6 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="cf-heading-lg text-white mb-4">{t.menu.title}</h2>
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
                            className="w-full bg-white border-2 border-gray-200 rounded-2xl py-4 px-6 pl-14 text-gray-900 placeholder:text-gray-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all shadow-sm"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 text-xl">🔍</span>
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
            </div>
        </section>
    );
}

// ============================================================================
// MENU CARD - PREMIUM
// ============================================================================
const imageMap: Record<string, string> = {
    // Top Picks - Unique cinematic images
    'm1': '/images/classfood/lemon_mojito.png',        // Lemon Mojito
    'm2': '/images/classfood/blue_rush_mojito.png',    // Blue Rush
    'm3': '/images/classfood/lemon_mojito.png',        // Passion Fruit (temp - uses lemon)
    'c1': '/images/classfood/papdi_chaat.png',         // Papdi Chaat
    'c5': '/images/classfood/pani_puri.png',           // Pani Puri (unique)
    'b1': '/images/classfood/nashville_burger.png',    // Nashville Hot Chicken
    'do2': '/images/classfood/masala_dosa.png',        // Masala Dosa
    'bi1': '/images/classfood/grilled_chicken_biriyani.png', // Grilled Chicken Biriyani
    'cr2': '/images/classfood/chicken_shawarma_crepe.png',   // Chicken Shawarma Crepe
    'de1': '/images/classfood/nutella_kunafa.png',     // Nutella Kunafa
    'j2': '/images/classfood/oreo_milkshake.png',      // Oreo Milkshake
    'cu1': '/images/classfood/butter_chicken.png',     // Butter Chicken
    'p3': '/images/classfood/negresco_pasta.png',      // Negresco Pasta
    // Other items can use existing images
    'bi2': '/images/classfood/biriyani.png',
    'do3': '/images/classfood/dosa.png',
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
        <section className="py-16 overflow-hidden bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-950">
            <div className="text-center mb-10 px-6">
                <h2 className="cf-heading-lg text-white mb-2">📸 From Our Kitchen</h2>
                <p className="text-zinc-400">Fresh dishes prepared daily</p>
            </div>
            <div className="flex gap-4 animate-scroll cf-hide-scrollbar">
                {[...images, ...images].map((src, i) => (
                    <div key={i} className="flex-shrink-0 w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                        <Image src={src} alt={`Food ${i}`} width={320} height={320} className="object-cover w-full h-full hover:scale-110 transition-transform duration-500" />
                    </div>
                ))}
            </div>
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
                    <p className="text-gray-600 mb-2 font-mono text-lg">{t.location.floor}</p>
                    <p className="text-gray-600 mb-8">🕐 {t.location.hours}</p>
                    <a
                        href="https://maps.google.com/?q=Classfood+Restaurant+Food+Court+coop+2nd+floor+Bani+Yas+Abu+Dhabi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-orange-500 text-white font-bold py-3 px-6 rounded-full"
                    >
                        🗺️ {t.location.mapsBtn}
                    </a>
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// FOOTER - PREMIUM REDESIGN
// ============================================================================
function Footer() {
    return (
        <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white py-16 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Top Section */}
                <div className="grid md:grid-cols-3 gap-10 mb-12">
                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <h3 className="text-3xl font-black mb-3 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">{t.meta.title}</h3>
                        <p className="text-gray-400 text-sm">{t.meta.description}</p>
                    </div>

                    {/* Contact */}
                    <div className="text-center">
                        <p className="text-gray-400 text-sm mb-2">Contact Us</p>
                        <a href="tel:026227669" className="text-2xl font-bold text-white hover:text-orange-400 transition-colors block mb-4">📞 {t.footer.phone}</a>
                        <a
                            href="https://maps.google.com/?q=Classfood+Restaurant+Food+Court+coop+2nd+floor+Bani+Yas+Abu+Dhabi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg hover:shadow-xl"
                        >
                            📍 View on Map
                        </a>
                    </div>

                    {/* Language */}
                    <div className="text-center md:text-right">
                        <p className="text-gray-400 text-sm mb-3">Language</p>
                        <div className="flex justify-center md:justify-end gap-3">
                            <Link href="/demos/classfood/ar" className="bg-gray-800 hover:bg-gray-700 px-5 py-2.5 rounded-full font-semibold text-sm transition-colors">العربية</Link>
                            <Link href="/demos/classfood/en" className="bg-orange-500 px-5 py-2.5 rounded-full font-semibold text-sm">English</Link>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 pt-8 text-center">
                    <p className="text-gray-500 text-sm mb-2">{t.footer.disclaimer}</p>
                    <p className="text-gray-600 text-xs">{t.footer.copyright}</p>
                </div>
            </div>
        </footer>
    );
}

// ============================================================================
// FLOATING CART - PREMIUM REDESIGN
// ============================================================================
function FloatingCart() {
    const cart = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);

    if (cart.itemCount === 0 && !isOpen) return null;

    const deliveryFee = 5;
    const grandTotal = cart.total + (cart.total > 0 ? deliveryFee : 0);

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-gradient-to-r from-orange-500 via-orange-500 to-red-500 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl flex items-center gap-4 transition-all hover:scale-105 group ${cart.justAdded ? 'cf-cart-bounce' : ''}`}
                style={{ boxShadow: '0 10px 40px rgba(249, 115, 22, 0.4)' }}
            >
                <div className="relative">
                    <span className="text-2xl">🛒</span>
                    <span className="absolute -top-2 -right-2 bg-white text-orange-600 w-5 h-5 rounded-full flex items-center justify-center font-black text-xs">
                        {cart.itemCount}
                    </span>
                </div>
                <div className="text-left">
                    <span className="block text-sm opacity-80">{t.cart.title}</span>
                    <span className="block text-xl font-black">{cart.total.toFixed(0)} {t.menu.currency}</span>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
            </button>

            {/* Cart Drawer - Premium */}
            {isOpen && (
                <div className="fixed inset-0 z-50" onClick={() => setIsOpen(false)}>
                    <div className="absolute inset-0 bg-black/70 cf-fade-in backdrop-blur-sm" />
                    <div
                        className="absolute bottom-0 md:right-0 md:top-0 bg-gradient-to-b from-white to-gray-50 w-full md:w-[440px] rounded-t-[2rem] md:rounded-none cf-sheet-enter max-h-[90vh] md:max-h-full overflow-hidden flex flex-col"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-6 pb-4 border-b bg-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900">{t.cart.title}</h3>
                                    <p className="text-gray-500 text-sm">{cart.itemCount} items</p>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 transition-colors">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {cart.items.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-5xl">🛒</span>
                                    </div>
                                    <p className="text-gray-500 text-lg">{t.cart.empty}</p>
                                    <p className="text-gray-400 text-sm mt-2">Add some delicious items!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cart.items.map((item, idx) => (
                                        <div key={item.id} className="cf-slide-up bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4" style={{ animationDelay: `${idx * 0.05}s` }}>
                                            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                                                {imageMap[item.id] ? (
                                                    <Image src={imageMap[item.id]} alt={item.nameEn} width={80} height={80} className="object-cover w-full h-full" />
                                                ) : (
                                                    <div className="w-full h-full cf-img-placeholder flex items-center justify-center"><span className="text-2xl opacity-50">🍽️</span></div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-gray-900 truncate">{item.nameEn}</h4>
                                                <p className="text-orange-600 font-black text-lg">{(item.price * item.quantity).toFixed(0)} <span className="text-sm font-medium text-gray-400">{t.menu.currency}</span></p>
                                            </div>
                                            <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
                                                <button onClick={() => cart.updateQuantity(item.id, item.quantity - 1)} className="w-9 h-9 rounded-full bg-white shadow-sm hover:bg-gray-50 flex items-center justify-center font-bold text-lg text-gray-600">−</button>
                                                <span className="w-8 text-center font-black text-lg">{item.quantity}</span>
                                                <button onClick={() => cart.updateQuantity(item.id, item.quantity + 1)} className="w-9 h-9 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">+</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer - Order Summary */}
                        {cart.items.length > 0 && (
                            <div className="p-6 pt-4 bg-white border-t shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
                                {/* Summary */}
                                <div className="bg-gray-50 rounded-2xl p-4 mb-4 space-y-3">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-bold">{cart.total.toFixed(0)} {t.menu.currency}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Delivery Fee</span>
                                        <span className="font-bold">{deliveryFee} {t.menu.currency}</span>
                                    </div>
                                    <div className="border-t pt-3 flex justify-between">
                                        <span className="text-lg font-bold text-gray-900">Total</span>
                                        <span className="text-2xl font-black text-orange-600">{grandTotal.toFixed(0)} {t.menu.currency}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => { setIsOpen(false); setShowCheckout(true); }}
                                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 rounded-2xl text-lg shadow-lg transition-all hover:shadow-xl flex items-center justify-center gap-2"
                                >
                                    <span>{t.cart.checkout}</span>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
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
// CHECKOUT SHEET - PREMIUM WITH PAYMENT METHODS
// ============================================================================
function CheckoutSheet({ onClose }: { onClose: () => void }) {
    const cart = useCart();
    const [formData, setFormData] = useState({ name: '', phone: '', orderType: 'pickup', paymentMethod: 'cash', notes: '' });
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');

    const deliveryFee = formData.orderType === 'delivery' ? 5 : 0;
    const grandTotal = cart.total + deliveryFee;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setOrderNumber('CF' + Math.random().toString(36).substring(2, 8).toUpperCase());
        setOrderComplete(true);
    };

    const sendWhatsApp = () => {
        const phone = '971000000000';
        const paymentText = formData.paymentMethod === 'cash' ? 'Cash on Delivery 💵' : 'Card Payment 💳';
        let msg = `🍽️ *New Order*%0A📦 ${orderNumber}%0A👤 ${formData.name}%0A📞 ${formData.phone}%0A📍 ${formData.orderType === 'pickup' ? t.checkout.pickup : t.checkout.delivery}%0A💳 ${paymentText}%0A%0A*Order:*%0A`;
        cart.items.forEach(item => { msg += `• ${item.nameEn} x${item.quantity} - ${(item.price * item.quantity).toFixed(0)} AED%0A`; });
        if (deliveryFee > 0) msg += `%0A🚚 Delivery Fee: ${deliveryFee} AED`;
        msg += `%0A%0A*Total:* ${grandTotal.toFixed(0)} AED`;
        if (formData.notes) msg += `%0A📝 ${formData.notes}`;
        window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center" onClick={onClose}>
            <div className="absolute inset-0 bg-black/70 cf-fade-in backdrop-blur-sm" />
            <div className="relative bg-white w-full md:w-[32rem] md:rounded-3xl rounded-t-[2rem] cf-sheet-enter max-h-[95vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>

                {orderComplete ? (
                    <div className="p-8 text-center">
                        {/* Success Animation */}
                        <div className="relative w-28 h-28 mx-auto mb-6">
                            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-30" />
                            <div className="relative w-28 h-28 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                                <svg className="w-14 h-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path className="cf-checkmark" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 mb-2">{t.checkout.success}</h3>
                        <p className="text-gray-500 mb-4">Thank you! We'll contact you shortly</p>

                        {/* Order Details Card */}
                        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-5 mb-6 text-left">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm text-gray-500">Order Number</span>
                                <span className="font-mono font-black text-orange-600 text-lg">{orderNumber}</span>
                            </div>
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm text-gray-500">Payment Method</span>
                                <span className="font-bold">{formData.paymentMethod === 'cash' ? '💵 Cash on Delivery' : '💳 Credit Card'}</span>
                            </div>
                            <div className="border-t pt-3 flex justify-between items-center">
                                <span className="font-bold">Total</span>
                                <span className="text-2xl font-black text-orange-600">{grandTotal.toFixed(0)} {t.menu.currency}</span>
                            </div>
                        </div>

                        <button onClick={sendWhatsApp} className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-2xl text-lg mb-3 transition-all shadow-lg flex items-center justify-center gap-2">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                            {t.checkout.whatsapp}
                        </button>
                        <button onClick={() => { cart.clearCart(); onClose(); }} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors">
                            Close
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="p-6 pb-4 border-b flex items-center justify-between">
                            <h3 className="text-2xl font-black text-gray-900">{t.checkout.title}</h3>
                            <button onClick={onClose} className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                            <div className="p-6 space-y-5">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">👤 {t.checkout.name}</label>
                                    <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="cf-input" placeholder="Enter your name" />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">📞 {t.checkout.phone}</label>
                                    <input type="tel" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="cf-input" placeholder="05X XXX XXXX" />
                                </div>

                                {/* Order Type */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">📍 {t.checkout.orderType}</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button type="button" onClick={() => setFormData({ ...formData, orderType: 'pickup' })} className={`py-4 rounded-2xl font-bold transition-all flex flex-col items-center gap-1 ${formData.orderType === 'pickup' ? 'bg-orange-500 text-white shadow-lg' : 'bg-gray-100 text-gray-700'}`}>
                                            <span className="text-2xl">🏪</span>
                                            <span>{t.checkout.pickup}</span>
                                        </button>
                                        <button type="button" onClick={() => setFormData({ ...formData, orderType: 'delivery' })} className={`py-4 rounded-2xl font-bold transition-all flex flex-col items-center gap-1 ${formData.orderType === 'delivery' ? 'bg-orange-500 text-white shadow-lg' : 'bg-gray-100 text-gray-700'}`}>
                                            <span className="text-2xl">🚚</span>
                                            <span>{t.checkout.delivery}</span>
                                            <span className="text-xs opacity-70">+5 {t.menu.currency}</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">💳 Payment Method</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button type="button" onClick={() => setFormData({ ...formData, paymentMethod: 'cash' })} className={`py-4 rounded-2xl font-bold transition-all flex flex-col items-center gap-1 border-2 ${formData.paymentMethod === 'cash' ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 bg-white text-gray-700'}`}>
                                            <span className="text-2xl">💵</span>
                                            <span>Cash on Delivery</span>
                                        </button>
                                        <button type="button" onClick={() => setFormData({ ...formData, paymentMethod: 'card' })} className={`py-4 rounded-2xl font-bold transition-all flex flex-col items-center gap-1 border-2 ${formData.paymentMethod === 'card' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-700'}`}>
                                            <span className="text-2xl">💳</span>
                                            <span>Credit Card</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Card Details - Only show when card is selected */}
                                {formData.paymentMethod === 'card' && (
                                    <div className="bg-blue-50 rounded-2xl p-4 space-y-4 border-2 border-blue-200">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">💳 Card Number</label>
                                            <input type="text" placeholder="1234 5678 9012 3456" className="cf-input text-center tracking-widest" maxLength={19} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">📅 Expiry Date</label>
                                                <input type="text" placeholder="MM/YY" className="cf-input text-center" maxLength={5} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">🔒 CVV</label>
                                                <input type="text" placeholder="123" className="cf-input text-center" maxLength={4} />
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500 text-center">🔐 Your data is encrypted and 100% secure</p>
                                    </div>
                                )}

                                {/* Notes */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">📝 {t.checkout.notes}</label>
                                    <textarea value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} className="cf-input resize-none h-20" placeholder="Any special instructions?" />
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-6 pt-4 bg-gray-50 border-t">
                                {/* Order Summary */}
                                <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm space-y-2">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal ({cart.itemCount} items)</span>
                                        <span className="font-bold">{cart.total.toFixed(0)} {t.menu.currency}</span>
                                    </div>
                                    {deliveryFee > 0 && (
                                        <div className="flex justify-between text-gray-600">
                                            <span>Delivery Fee</span>
                                            <span className="font-bold">{deliveryFee} {t.menu.currency}</span>
                                        </div>
                                    )}
                                    <div className="border-t pt-2 flex justify-between">
                                        <span className="text-lg font-bold text-gray-900">Total</span>
                                        <span className="text-2xl font-black text-orange-600">{grandTotal.toFixed(0)} {t.menu.currency}</span>
                                    </div>
                                </div>

                                <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 rounded-2xl text-lg shadow-lg transition-all flex items-center justify-center gap-2">
                                    <span>{t.checkout.submit}</span>
                                    <span className="text-xl">✓</span>
                                </button>

                                {/* Trust Badges */}
                                <div className="flex items-center justify-center gap-4 mt-4 text-gray-400 text-xs">
                                    <span>🔒 Secure Payment</span>
                                    <span>⚡ Fast Delivery</span>
                                    <span>✅ 100% Halal</span>
                                </div>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
