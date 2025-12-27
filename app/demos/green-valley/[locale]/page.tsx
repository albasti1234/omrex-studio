'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Menu data (shared, only labels come from translations)
const menuData = {
    sandwiches: [
        { id: 1, price: 12 },
        { id: 2, price: 15 },
        { id: 3, price: 8 },
        { id: 4, price: 18 },
        { id: 5, price: 14 },
    ],
    meals: [
        { id: 1, price: 25 },
        { id: 2, price: 30 },
        { id: 3, price: 35 },
        { id: 4, price: 55 },
        { id: 5, price: 20 },
    ],
    grills: [
        { id: 1, price: 35 },
        { id: 2, price: 40 },
        { id: 3, price: 65 },
        { id: 4, price: 45 },
    ],
    pastries: [
        { id: 1, price: 10 },
        { id: 2, price: 8 },
        { id: 3, price: 12 },
        { id: 4, price: 10 },
    ],
    drinks: [
        { id: 1, price: 10 },
        { id: 2, price: 12 },
        { id: 3, price: 5 },
        { id: 4, price: 3 },
    ],
};

// Menu item names per locale
const menuItemNames = {
    ar: {
        sandwiches: ['شاورما دجاج', 'شاورما لحم', 'فلافل ساندويش', 'برجر لحم', 'كباب ساندويش'],
        meals: ['وجبة شاورما دجاج', 'وجبة شاورما لحم', 'وجبة كباب', 'وجبة مشاوي مشكل', 'فتة حمص'],
        grills: ['شيش طاووق (6 قطع)', 'كباب لحم (6 قطع)', 'مشاوي مشكلة', 'دجاج مشوي نص'],
        pastries: ['فطيرة جبنة', 'فطيرة زعتر', 'فطيرة لحمة', 'سمبوسة (5 قطع)'],
        drinks: ['عصير ليمون نعناع', 'عصير برتقال', 'شاي', 'مياه'],
    },
    en: {
        sandwiches: ['Chicken Shawarma', 'Beef Shawarma', 'Falafel Sandwich', 'Beef Burger', 'Kebab Sandwich'],
        meals: ['Chicken Shawarma Meal', 'Beef Shawarma Meal', 'Kebab Meal', 'Mixed Grill Meal', 'Fatteh Hummus'],
        grills: ['Shish Tawook (6 pcs)', 'Beef Kebab (6 pcs)', 'Mixed Grill Platter', 'Half Grilled Chicken'],
        pastries: ['Cheese Fatayer', 'Zaatar Fatayer', 'Meat Fatayer', 'Samosa (5 pcs)'],
        drinks: ['Lemon Mint Juice', 'Fresh Orange Juice', 'Tea', 'Water'],
    },
} as const;

// Animation variants
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function GreenValleyPage() {
    const t = useTranslations();
    const locale = useLocale();
    const otherLocale = locale === 'ar' ? 'en' : 'ar';

    return (
        <main className="min-h-screen bg-[#0a0a0c]">
            {/* Language Switcher - Premium Style */}
            <Link
                href={`/demos/green-valley/${otherLocale}`}
                className="fixed top-6 z-50 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-emerald-900/30 hover:shadow-emerald-600/40 transition-all duration-300 border border-emerald-500/30"
                style={{ [locale === 'ar' ? 'left' : 'right']: '24px' }}
                aria-label={`Switch to ${otherLocale === 'ar' ? 'Arabic' : 'English'}`}
            >
                {t('langSwitch')}
            </Link>

            {/* Hero */}
            <HeroSection />

            {/* Gallery - Food Photos */}
            <GallerySection />

            {/* Menu */}
            <MenuSection locale={locale} />

            {/* Why Us */}
            <WhyUsSection />

            {/* Location */}
            <LocationSection />

            {/* Contact */}
            <ContactSection />

            {/* Footer */}
            <FooterSection />
        </main>
    );
}

// ============================================================================
// HERO SECTION - CINEMATIC REDESIGN
// ============================================================================

function HeroSection() {
    const t = useTranslations('hero');
    const locale = useLocale();
    const isRTL = locale === 'ar';

    return (
        <section className="relative h-screen w-full overflow-hidden bg-[#050507]">
            {/* Background Image - Cinematic Scale */}
            <div className="absolute inset-0 z-0 select-none">
                <motion.div
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 12, ease: "easeOut" }}
                    className="relative w-full h-full"
                >
                    <Image
                        src="/images/green-valley/hero.png"
                        alt="Green Valley Restaurant"
                        fill
                        priority
                        className="object-cover"
                        style={{ objectPosition: 'center 35%' }}
                        draggable={false}
                    />
                </motion.div>

                {/* Professional Gradients for Contrast */}
                {/* Base darkening for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/50 to-transparent opacity-90" />

                {/* Side gradient based on direction */}
                <div
                    className={`absolute inset-0 bg-gradient-to-r from-[#0a0a0c]/90 via-[#0a0a0c]/40 to-transparent z-1`}
                    style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
                />
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 z-20 flex items-center md:items-end pb-24 md:pb-32">
                <div className={`w-full px-6 md:px-20 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <div className="max-w-4xl mx-auto md:mx-0">

                        {/* Decorative Line */}
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 80, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className={`h-[4px] bg-emerald-500 rounded-full mb-8 ${isRTL ? 'ml-auto' : 'mr-auto'}`}
                        />

                        {/* Restaurant Name */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1] drop-shadow-lg tracking-tight"
                        >
                            {t('name')}
                        </motion.h1>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="text-lg sm:text-2xl text-gray-300 mb-12 max-w-2xl font-light leading-relaxed"
                        >
                            {t('tagline')}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className={`flex flex-col sm:flex-row gap-5 ${isRTL ? 'justify-start' : 'justify-start'}`}
                        >
                            <a
                                href="tel:+97126000000"
                                className="group relative px-8 py-4 bg-emerald-600 text-white rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/40 hover:-translate-y-1 active:translate-y-0"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-700 opacity-100 group-hover:opacity-0 transition-opacity" />
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="relative z-10 flex items-center justify-center gap-3 font-bold text-lg">
                                    <span className="text-xl">📞</span> {t('callBtn')}
                                </span>
                            </a>

                            <a
                                href="https://wa.me/97150000000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-emerald-500/30 backdrop-blur-md hover:-translate-y-1 active:translate-y-0"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3 font-bold text-lg">
                                    <span className="text-xl transition-transform group-hover:scale-110">💬</span> {t('whatsappBtn')}
                                </span>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block"
            >
                <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent relative overflow-hidden">
                    <motion.div
                        animate={{ y: [-30, 100] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-transparent via-emerald-500 to-transparent"
                    />
                </div>
            </motion.div>
        </section>
    );
}

// ============================================================================
// GALLERY SECTION - FOOD PHOTOS
// ============================================================================

const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=800&q=80', alt: { ar: 'وجبة كاملة', en: 'Full Meal' } }, // Middle Eastern Spread
    { src: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80', alt: { ar: 'أرز مع دجاج', en: 'Rice with Chicken' } }, // Chicken Rice
    { src: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=800&q=80', alt: { ar: 'كباب مشوي', en: 'Grilled Kebab' } }, // BBQ Meat
    { src: 'https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&w=800&q=80', alt: { ar: 'أرز مع لحم', en: 'Rice with Meat' } }, // Burger/Meat dish (swap for variety)
    { src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80', alt: { ar: 'برجر وبطاطس', en: 'Burger & Fries' } }, // Gourmet Burger
    { src: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80', alt: { ar: 'لحم مقلي', en: 'Fried Meat' } }, // Fried Chicken/Meat
    { src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', alt: { ar: 'خضار طازجة', en: 'Fresh Vegetables' } }, // Fresh Salad
    { src: 'https://images.unsplash.com/photo-1606756817349-41f4d96c414d?auto=format&fit=crop&w=800&q=80', alt: { ar: 'بصل مقرمش', en: 'Crispy Onions' } }, // Side dish / Fry texture
];

function GallerySection() {
    const locale = useLocale();

    return (
        <section className="py-16 px-4 bg-gradient-to-b from-[#0a0a0c] to-[#0f1510]">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto mb-4" />
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        {locale === 'ar' ? 'أطباقنا' : 'Our Dishes'}
                    </h2>
                    <p className="text-gray-400 text-sm">
                        {locale === 'ar' ? 'صور حقيقية من مطعمنا' : 'Real photos from our restaurant'}
                    </p>
                </motion.div>

                {/* Photo Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={image.src}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative aspect-square overflow-hidden rounded-xl bg-[#111118]"
                        >
                            <Image
                                src={image.src}
                                alt={image.alt[locale as 'ar' | 'en']}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            {/* Label */}
                            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-white text-sm font-medium text-center">
                                    {image.alt[locale as 'ar' | 'en']}
                                </p>
                            </div>
                            {/* Border glow on hover */}
                            <div className="absolute inset-0 border-2 border-emerald-500/0 group-hover:border-emerald-500/50 rounded-xl transition-colors duration-300" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// MENU SECTION - PREMIUM
// ============================================================================

// Category images
const categoryImages: Record<string, string> = {
    sandwiches: '/images/green-valley/menu/shawarma.png',
    meals: '/images/green-valley/menu/meal.png',
    grills: '/images/green-valley/menu/grills.png',
    pastries: '/images/green-valley/menu/fatayer.png',
    drinks: '/images/green-valley/menu/drinks.png',
};

function MenuSection({ locale }: { locale: string }) {
    const t = useTranslations('menu');
    const categories = Object.keys(menuData) as Array<keyof typeof menuData>;
    const itemNames = menuItemNames[locale as 'ar' | 'en'];
    const isRTL = locale === 'ar';

    return (
        <section className="py-20 px-4 bg-[#0a0a0c]" id="menu">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto mb-4" />
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        {t('title')}
                    </h2>
                    <div className="w-24 h-[1px] bg-emerald-500/30 mx-auto" />
                </motion.div>

                {/* Menu Categories */}
                {categories.map((category, catIndex) => (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: catIndex * 0.1 }}
                        className="mb-10"
                    >
                        {/* Category Title */}
                        <h3 className="text-xl font-bold text-emerald-400 mb-4 pb-2 border-b border-emerald-500/20 flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                            {t(`categories.${category}`)}
                        </h3>

                        {/* Menu Items */}
                        <div className="grid gap-3">
                            {menuData[category].map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`group flex items-center gap-3 py-2 px-3 bg-[#111118] rounded-xl border border-white/5 hover:border-emerald-500/30 transition-all duration-300 ${isRTL ? 'flex-row' : 'flex-row'}`}
                                >
                                    {/* Image */}
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[#1a1a22]">
                                        <Image
                                            src={categoryImages[category]}
                                            alt={itemNames[category][index]}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Name */}
                                    <span className="font-medium text-gray-200 group-hover:text-white transition-colors flex-1">
                                        {itemNames[category][index]}
                                    </span>

                                    {/* Price */}
                                    <span className="font-bold text-emerald-400 whitespace-nowrap bg-emerald-500/10 px-3 py-1 rounded-full text-sm">
                                        {item.price} {t('currency')}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

// ============================================================================
// WHY US SECTION - PREMIUM
// ============================================================================

function WhyUsSection() {
    const t = useTranslations('whyUs');

    const points = [
        { icon: '💰', key: 0 },
        { icon: '🍽️', key: 1 },
        { icon: '⚡', key: 2 },
    ];

    return (
        <section className="py-20 px-4 bg-gradient-to-b from-[#0a0a0c] to-[#0f1f15]">
            <div className="max-w-3xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto mb-4" />
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">
                        {t('title')}
                    </h2>
                </motion.div>

                {/* Points Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    {points.map((point, index) => (
                        <motion.div
                            key={point.key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="bg-[#111118] rounded-2xl p-8 border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 group"
                        >
                            <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform duration-300">
                                {point.icon}
                            </span>
                            <p className="font-bold text-white text-lg">
                                {t(`points.${point.key}.text`)}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Reviews Note */}
                <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                    <span className="text-yellow-500">⭐</span> {t('reviews')}
                </p>
            </div>
        </section>
    );
}

// ============================================================================
// LOCATION SECTION - PREMIUM
// ============================================================================

function LocationSection() {
    const t = useTranslations('location');

    return (
        <section className="py-20 px-4 bg-[#0a0a0c]">
            <div className="max-w-xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto mb-4" />
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
                        {t('title')}
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-[#111118] rounded-2xl p-8 border border-emerald-500/10"
                >
                    <p className="text-xl font-medium text-white mb-3 flex items-center justify-center gap-2">
                        📍 {t('address')}
                    </p>
                    <p className="text-gray-400 mb-8 flex items-center justify-center gap-2">
                        🕐 {t('hours')}
                    </p>

                    <motion.a
                        href="https://maps.google.com/?q=Baniyas+West+Abu+Dhabi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-8 rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={t('mapsBtn')}
                    >
                        🗺️ {t('mapsBtn')}
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}

// ============================================================================
// CONTACT SECTION - PREMIUM
// ============================================================================

function ContactSection() {
    const t = useTranslations('contact');

    return (
        <section className="py-20 px-4 bg-gradient-to-t from-emerald-900/20 to-[#0a0a0c]">
            <div className="max-w-xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto mb-4" />
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                        {t('title')}
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-3xl font-bold text-emerald-400 mb-4">
                        📞 {t('phone')}
                    </p>
                    <p className="text-gray-400 mb-8">
                        {t('note')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.a
                            href="tel:+97126000000"
                            className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-emerald-900/30"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            aria-label={t('callBtn')}
                        >
                            📞 {t('callBtn')}
                        </motion.a>
                        <motion.a
                            href="https://wa.me/97150000000"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#25D366] text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-[#25D366]/30"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            aria-label={t('whatsappBtn')}
                        >
                            💬 {t('whatsappBtn')}
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ============================================================================
// FOOTER - PREMIUM
// ============================================================================

function FooterSection() {
    const t = useTranslations('footer');

    return (
        <footer className="py-8 px-4 bg-[#050507] border-t border-white/5 text-center">
            <p className="text-gray-500 mb-2 text-sm">{t('copyright')}</p>
            <p>
                <a
                    href="https://omrex.studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-500 hover:text-emerald-400 text-sm transition-colors"
                >
                    {t('builtBy')}
                </a>
            </p>
        </footer>
    );
}
