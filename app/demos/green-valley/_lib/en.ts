// English translations for Green Valley Restaurant
import type { Translations } from './ar';

export const en: Translations = {
    dir: 'ltr',
    lang: 'en',

    // Hero
    hero: {
        name: 'Green Valley Restaurant',
        tagline: 'Good food • Fair prices • Close to you',
        callBtn: 'Call Now',
        whatsappBtn: 'WhatsApp',
    },

    // Menu
    menu: {
        title: 'Our Menu',
        categories: {
            sandwiches: 'Sandwiches',
            meals: 'Meals',
            grills: 'Grills',
            pastries: 'Pastries',
            drinks: 'Drinks',
        },
        items: {
            sandwiches: [
                { name: 'Chicken Shawarma', price: 12 },
                { name: 'Beef Shawarma', price: 15 },
                { name: 'Falafel Sandwich', price: 8 },
                { name: 'Beef Burger', price: 18 },
                { name: 'Kebab Sandwich', price: 14 },
            ],
            meals: [
                { name: 'Chicken Shawarma Meal', price: 25 },
                { name: 'Beef Shawarma Meal', price: 30 },
                { name: 'Kebab Meal', price: 35 },
                { name: 'Mixed Grill Meal', price: 55 },
                { name: 'Fatteh Hummus', price: 20 },
            ],
            grills: [
                { name: 'Shish Tawook (6 pcs)', price: 35 },
                { name: 'Beef Kebab (6 pcs)', price: 40 },
                { name: 'Mixed Grill Platter', price: 65 },
                { name: 'Half Grilled Chicken', price: 45 },
            ],
            pastries: [
                { name: 'Cheese Fatayer', price: 10 },
                { name: 'Zaatar Fatayer', price: 8 },
                { name: 'Meat Fatayer', price: 12 },
                { name: 'Samosa (5 pcs)', price: 10 },
            ],
            drinks: [
                { name: 'Lemon Mint Juice', price: 10 },
                { name: 'Fresh Orange Juice', price: 12 },
                { name: 'Tea', price: 5 },
                { name: 'Water', price: 3 },
            ],
        },
        currency: 'AED',
    },

    // Why Us
    whyUs: {
        title: 'Why People Love Us',
        points: [
            { icon: '💰', text: 'Fair prices' },
            { icon: '🍽️', text: 'Generous portions' },
            { icon: '⚡', text: 'Fast service' },
        ],
        reviews: 'See what our customers say on Google Maps',
    },

    // Location
    location: {
        title: 'Location & Hours',
        address: 'Baniyas West - Abu Dhabi',
        hours: 'Daily 10 AM - 12 Midnight',
        mapsBtn: 'Open in Google Maps',
    },

    // Contact
    contact: {
        title: 'Contact Us',
        phone: '02-XXX-XXXX',
        note: 'Call or message us directly',
        callBtn: 'Call Now',
        whatsappBtn: 'WhatsApp Us',
    },

    // Footer
    footer: {
        copyright: '© 2025 Green Valley Restaurant',
        builtBy: 'Built by OMREX.STUDIO',
    },
};
