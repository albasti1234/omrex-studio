'use client';

import { useState, createContext, useContext, useCallback, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { menuItems, categories, getTopPicks, filterItems, MenuItem } from '../_data/menu';

// ============================================================================
// TRANSLATIONS
// ============================================================================
const t = {
    meta: { title: 'مطعم كلاس فود', description: 'اطلب أشهى الأطباق الهندية والعربية' },
    hero: {
        tagline: 'أكل طيب • توصيل سريع • أسعار مناسبة',
        rating: '4.9',
        reviews: '104 تقييم',
        orderBtn: 'اطلب الآن',
        callBtn: 'اتصل',
        locationBtn: 'الموقع',
        badge: 'الأكثر طلباً اليوم',
        services: { delivery: 'توصيل', takeaway: 'استلام', dinein: 'طعام محلي', halal: 'حلال' }
    },
    menu: {
        title: 'قائمة الطعام',
        topPicks: 'الأكثر طلباً',
        search: 'ابحث عن طبق...',
        filters: { under20: 'أقل من 20 درهم', spicy: 'حار', veg: 'نباتي', sweet: 'حلويات', drinks: 'مشروبات' },
        addBtn: 'أضف',
        currency: 'درهم',
        popular: 'الأكثر طلباً',
        new: 'جديد'
    },
    deal: { title: 'عرض اليوم', save: 'وفر', oldPrice: 'السعر القديم', newPrice: 'السعر الجديد' },
    cart: { title: 'سلة الطلب', empty: 'السلة فارغة', subtotal: 'المجموع', checkout: 'إتمام الطلب' },
    checkout: {
        title: 'إتمام الطلب', name: 'الاسم', phone: 'رقم الهاتف', orderType: 'نوع الطلب',
        pickup: 'استلام من المطعم', delivery: 'توصيل', notes: 'ملاحظات (اختياري)',
        submit: 'تأكيد الطلب', success: 'تم استلام طلبك!', orderNumber: 'رقم الطلب', whatsapp: 'إرسال عبر واتساب'
    },
    experience: {
        title: 'لماذا كلاس فود؟',
        items: [
            { icon: '⚡', title: 'خدمة سريعة', desc: 'طلبك جاهز بأسرع وقت' },
            { icon: '🍽️', title: 'تنوع كبير', desc: 'هندي، عربي، وأكثر' },
            { icon: '✅', title: 'حلال 100%', desc: 'كل أكلنا حلال' },
            { icon: '💰', title: 'أسعار مناسبة', desc: 'جودة عالية بسعر معقول' },
            { icon: '👨‍👩‍👧‍👦', title: 'مناسب للعائلات', desc: 'بيئة مريحة للجميع' },
            { icon: '🅿️', title: 'مواقف مجانية', desc: 'موقف سيارات واسع' }
        ]
    },
    reviews: {
        title: 'آراء الزبائن', disclaimer: '(نماذج توضيحية)',
        items: [
            { name: 'أحمد م.', text: 'أفضل برياني في المنطقة! الطعم ممتاز والكمية كبيرة.' },
            { name: 'سارة ع.', text: 'أحب الدوسا عندهم، دايماً طازجة وسريعة.' },
            { name: 'محمد ر.', text: 'خدمة ممتازة والأسعار معقولة جداً.' }
        ]
    },
    location: { title: 'الموقع وأوقات العمل', address: 'مدينة زايد للتسوق، أبوظبي', floor: 'الطابق الثاني - فود كورت', hours: 'يومياً من 10 صباحاً - 11 مساءً', mapsBtn: 'افتح في خرائط قوقل' },
    footer: { phone: '02 622 7669', disclaimer: 'هذا نموذج تجريبي للعرض فقط', copyright: '© 2025 مطعم كلاس فود' },
    lang: { switch: 'English' }
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
export default function ClassfoodArabicPage() {
    return (
        <CartProvider>
            <html lang="ar" dir="rtl">
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
            <div className="absolute top-1/3 left-1/4 opacity-60">
                <div className="cf-steam" style={{ animationDelay: '0s' }} />
                <div className="cf-steam" style={{ animationDelay: '0.7s', left: '20px' }} />
                <div className="cf-steam" style={{ animationDelay: '1.4s', left: '40px' }} />
            </div>

            {/* Language Toggle */}
            <div className="absolute top-6 left-6 z-20">
                <Link
                    href="/demos/classfood/en"
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
                                alt={dealItem.nameAr}
                                fill
                                className="object-cover"
                            />
                            {/* Sparkle Effects */}
                            <div className="cf-sparkle absolute top-8 right-8" style={{ animationDelay: '0s' }} />
                            <div className="cf-sparkle absolute top-16 left-12" style={{ animationDelay: '0.5s' }} />
                            <div className="cf-sparkle absolute bottom-12 right-16" style={{ animationDelay: '1s' }} />
                        </div>
                        {/* Discount Badge */}
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white font-black text-xl w-20 h-20 rounded-full flex items-center justify-center shadow-xl rotate-12">
                            -20%
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-white text-center md:text-right">
                        <span className="cf-badge cf-badge-deal mb-4 inline-block">
                            ⏰ {t.deal.title}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                            {dealItem.nameAr}
                        </h2>
                        <p className="text-white/80 text-lg mb-6 max-w-md">
                            {dealItem.descAr}
                        </p>
                        <div className="flex items-center justify-center md:justify-end gap-4 mb-6">
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
                        className="cf-input pr-12"
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
                            {cat.nameAr}
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
                    <p className="text-xl">لا توجد نتائج</p>
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
                        <Image src={imageSrc} alt={item.nameAr} fill className="object-cover" />
                    ) : (
                        <div className="absolute inset-0 cf-img-placeholder flex items-center justify-center">
                            <span className="text-5xl opacity-40">🍽️</span>
                        </div>
                    )}
                    <div className="cf-card-overlay" />

                    {/* Badges */}
                    <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
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
                    <h3 className="font-bold text-gray-900 mb-1 truncate">{item.nameAr}</h3>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-1">{item.descAr}</p>
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
                        <Image src={imageSrc} alt={item.nameAr} fill className="object-cover" />
                    ) : (
                        <div className="absolute inset-0 cf-img-placeholder flex items-center justify-center">
                            <span className="text-7xl opacity-40">🍽️</span>
                        </div>
                    )}
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">{item.nameAr}</h3>
                <p className="text-orange-600 font-black text-3xl mb-4">{item.price} {t.menu.currency}</p>
                <p className="text-gray-600 mb-6">{item.descAr}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                    {item.spicy && <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold">🌶️ حار</span>}
                    {item.veg && <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold">🥬 نباتي</span>}
                    {item.sweet && <span className="bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold">🍰 حلو</span>}
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
                <h2 className="cf-heading-lg text-gray-900 mb-2">📸 من مطبخنا</h2>
                <p className="text-gray-500">أطباق طازجة كل يوم</p>
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
                    <Link href="/demos/classfood/ar" className="bg-orange-500 px-6 py-2 rounded-full font-semibold">العربية</Link>
                    <Link href="/demos/classfood/en" className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-full font-semibold transition-colors">English</Link>
                </div>
                <p className="text-gray-500 text-sm mb-2">{t.footer.disclaimer}</p>
                <p className="text-gray-600 text-sm">{t.footer.copyright}</p>
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
                <div className="text-right">
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
                                    <p className="text-gray-500 text-sm">{cart.itemCount} عناصر</p>
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
                                    <p className="text-gray-400 text-sm mt-2">أضف بعض الأطباق اللذيذة!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cart.items.map((item, idx) => (
                                        <div key={item.id} className="cf-slide-up bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4" style={{ animationDelay: `${idx * 0.05}s` }}>
                                            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                                                {imageMap[item.id] ? (
                                                    <Image src={imageMap[item.id]} alt={item.nameAr} width={80} height={80} className="object-cover w-full h-full" />
                                                ) : (
                                                    <div className="w-full h-full cf-img-placeholder flex items-center justify-center"><span className="text-2xl opacity-50">🍽️</span></div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-gray-900 truncate">{item.nameAr}</h4>
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
                                        <span>المجموع الفرعي</span>
                                        <span className="font-bold">{cart.total.toFixed(0)} {t.menu.currency}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>رسوم التوصيل</span>
                                        <span className="font-bold">{deliveryFee} {t.menu.currency}</span>
                                    </div>
                                    <div className="border-t pt-3 flex justify-between">
                                        <span className="text-lg font-bold text-gray-900">الإجمالي</span>
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
        const paymentText = formData.paymentMethod === 'cash' ? 'دفع عند الاستلام 💵' : 'دفع بالبطاقة 💳';
        let msg = `🍽️ *طلب جديد*%0A📦 ${orderNumber}%0A👤 ${formData.name}%0A📞 ${formData.phone}%0A📍 ${formData.orderType === 'pickup' ? t.checkout.pickup : t.checkout.delivery}%0A💳 ${paymentText}%0A%0A*الطلب:*%0A`;
        cart.items.forEach(item => { msg += `• ${item.nameAr} x${item.quantity} - ${(item.price * item.quantity).toFixed(0)} AED%0A`; });
        if (deliveryFee > 0) msg += `%0A🚚 رسوم التوصيل: ${deliveryFee} AED`;
        msg += `%0A%0A*الإجمالي:* ${grandTotal.toFixed(0)} AED`;
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
                        <p className="text-gray-500 mb-4">شكراً لك! سنتواصل معك قريباً</p>

                        {/* Order Details Card */}
                        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-5 mb-6 text-right">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm text-gray-500">رقم الطلب</span>
                                <span className="font-mono font-black text-orange-600 text-lg">{orderNumber}</span>
                            </div>
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm text-gray-500">طريقة الدفع</span>
                                <span className="font-bold">{formData.paymentMethod === 'cash' ? '💵 دفع عند الاستلام' : '💳 بطاقة ائتمان'}</span>
                            </div>
                            <div className="border-t pt-3 flex justify-between items-center">
                                <span className="font-bold">الإجمالي</span>
                                <span className="text-2xl font-black text-orange-600">{grandTotal.toFixed(0)} {t.menu.currency}</span>
                            </div>
                        </div>

                        <button onClick={sendWhatsApp} className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-2xl text-lg mb-3 transition-all shadow-lg flex items-center justify-center gap-2">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                            {t.checkout.whatsapp}
                        </button>
                        <button onClick={() => { cart.clearCart(); onClose(); }} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors">
                            إغلاق
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
                                    <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="cf-input" placeholder="أدخل اسمك" />
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
                                    <label className="block text-sm font-bold text-gray-700 mb-2">💳 طريقة الدفع</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button type="button" onClick={() => setFormData({ ...formData, paymentMethod: 'cash' })} className={`py-4 rounded-2xl font-bold transition-all flex flex-col items-center gap-1 border-2 ${formData.paymentMethod === 'cash' ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 bg-white text-gray-700'}`}>
                                            <span className="text-2xl">💵</span>
                                            <span>دفع عند الاستلام</span>
                                        </button>
                                        <button type="button" onClick={() => setFormData({ ...formData, paymentMethod: 'card' })} className={`py-4 rounded-2xl font-bold transition-all flex flex-col items-center gap-1 border-2 ${formData.paymentMethod === 'card' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-700'}`}>
                                            <span className="text-2xl">💳</span>
                                            <span>بطاقة ائتمان</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Notes */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">📝 {t.checkout.notes}</label>
                                    <textarea value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} className="cf-input resize-none h-20" placeholder="أي تعليمات خاصة؟" />
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-6 pt-4 bg-gray-50 border-t">
                                {/* Order Summary */}
                                <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm space-y-2">
                                    <div className="flex justify-between text-gray-600">
                                        <span>المجموع الفرعي ({cart.itemCount} عناصر)</span>
                                        <span className="font-bold">{cart.total.toFixed(0)} {t.menu.currency}</span>
                                    </div>
                                    {deliveryFee > 0 && (
                                        <div className="flex justify-between text-gray-600">
                                            <span>رسوم التوصيل</span>
                                            <span className="font-bold">{deliveryFee} {t.menu.currency}</span>
                                        </div>
                                    )}
                                    <div className="border-t pt-2 flex justify-between">
                                        <span className="text-lg font-bold text-gray-900">الإجمالي</span>
                                        <span className="text-2xl font-black text-orange-600">{grandTotal.toFixed(0)} {t.menu.currency}</span>
                                    </div>
                                </div>

                                <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 rounded-2xl text-lg shadow-lg transition-all flex items-center justify-center gap-2">
                                    <span>{t.checkout.submit}</span>
                                    <span className="text-xl">✓</span>
                                </button>

                                {/* Trust Badges */}
                                <div className="flex items-center justify-center gap-4 mt-4 text-gray-400 text-xs">
                                    <span>🔒 دفع آمن</span>
                                    <span>⚡ توصيل سريع</span>
                                    <span>✅ حلال 100%</span>
                                </div>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
