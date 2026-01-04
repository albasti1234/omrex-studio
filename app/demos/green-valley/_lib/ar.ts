// Arabic translations for Green Valley Restaurant
export const ar = {
    dir: 'rtl' as 'rtl' | 'ltr',
    lang: 'ar' as 'ar' | 'en',

    // Hero
    hero: {
        name: 'مطعم قصر الوادي الأخضر',
        tagline: 'أكل طيب • أسعار مناسبة • قريب منك',
        callBtn: 'اتصل الآن',
        whatsappBtn: 'واتساب',
    },

    // Menu
    menu: {
        title: 'قائمة الطعام',
        categories: {
            sandwiches: 'ساندويشات',
            meals: 'وجبات',
            grills: 'مشاوي',
            pastries: 'فطاير',
            drinks: 'مشروبات',
        },
        items: {
            sandwiches: [
                { name: 'شاورما دجاج', price: 12 },
                { name: 'شاورما لحم', price: 15 },
                { name: 'فلافل ساندويش', price: 8 },
                { name: 'برجر لحم', price: 18 },
                { name: 'كباب ساندويش', price: 14 },
            ],
            meals: [
                { name: 'وجبة شاورما دجاج', price: 25 },
                { name: 'وجبة شاورما لحم', price: 30 },
                { name: 'وجبة كباب', price: 35 },
                { name: 'وجبة مشاوي مشكل', price: 55 },
                { name: 'فتة حمص', price: 20 },
            ],
            grills: [
                { name: 'شيش طاووق (6 قطع)', price: 35 },
                { name: 'كباب لحم (6 قطع)', price: 40 },
                { name: 'مشاوي مشكلة', price: 65 },
                { name: 'دجاج مشوي نص', price: 45 },
            ],
            pastries: [
                { name: 'فطيرة جبنة', price: 10 },
                { name: 'فطيرة زعتر', price: 8 },
                { name: 'فطيرة لحمة', price: 12 },
                { name: 'سمبوسة (5 قطع)', price: 10 },
            ],
            drinks: [
                { name: 'عصير ليمون نعناع', price: 10 },
                { name: 'عصير برتقال', price: 12 },
                { name: 'شاي', price: 5 },
                { name: 'مياه', price: 3 },
            ],
        },
        currency: 'درهم',
    },

    // Why Us
    whyUs: {
        title: 'ليش الناس تحبنا؟',
        points: [
            { icon: '💰', text: 'أسعار مناسبة' },
            { icon: '🍽️', text: 'كميات ممتازة' },
            { icon: '⚡', text: 'خدمة سريعة' },
        ],
        reviews: 'آراء زبائننا على Google Maps',
    },

    // Location
    location: {
        title: 'الموقع وأوقات العمل',
        address: 'بني ياس غرب - أبوظبي',
        hours: 'يومياً من 10 صباحاً - 12 منتصف الليل',
        mapsBtn: 'افتح الموقع على Google Maps',
    },

    // Contact
    contact: {
        title: 'تواصل معنا',
        phone: '02-XXX-XXXX',
        note: 'نستقبل الاتصال والطلبات مباشرة',
        callBtn: 'اتصل الآن',
        whatsappBtn: 'راسلنا واتساب',
    },

    // Footer
    footer: {
        copyright: '© 2025 مطعم قصر الوادي الأخضر',
        builtBy: 'صنع بواسطة OMREX.STUDIO',
    },
};

export type Translations = typeof ar;
