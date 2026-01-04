// =============================================================================
// VELVET PERFUMES - Products Data
// =============================================================================

export interface Product {
    id: string;
    slug: string;
    name: string;
    collection: string;
    price: number;
    originalPrice?: number;
    sizes: {
        size: string;
        price: number;
    }[];
    image: string;
    images: string[];
    description: string;
    notes: {
        top: string[];
        heart: string[];
        base: string[];
    };
    isNew: boolean;
    isBestseller: boolean;
    inStock: boolean;
    rating: number;
    reviews: number;
}

export interface Collection {
    id: string;
    slug: string;
    name: string;
    tagline: string;
    description: string;
    image: string;
    count: number;
    accent: string;
}

// Collections
export const COLLECTIONS: Collection[] = [
    {
        id: "oud",
        slug: "oud",
        name: "Oud Collection",
        tagline: "The Ancient Soul",
        description: "Deep, woody, and intoxicating fragrances featuring the finest Cambodian oud",
        image: "/images/velvet/collections/oud.jpg",
        count: 8,
        accent: "#8b4513",
    },
    {
        id: "floral",
        slug: "floral",
        name: "Floral Dreams",
        tagline: "Eternal Bloom",
        description: "Elegant blooms captured in glass, from Bulgarian roses to jasmine",
        image: "/images/velvet/collections/floral.jpg",
        count: 12,
        accent: "#db7093",
    },
    {
        id: "fresh",
        slug: "fresh",
        name: "Fresh Essence",
        tagline: "Morning Dew",
        description: "Crisp, clean, and invigorating scents for the modern soul",
        image: "/images/velvet/collections/fresh.jpg",
        count: 6,
        accent: "#20b2aa",
    },
    {
        id: "oriental",
        slug: "oriental",
        name: "Oriental Nights",
        tagline: "Mystery Unveiled",
        description: "Spicy warmth meets mystery in these enchanting compositions",
        image: "/images/velvet/collections/oriental.jpg",
        count: 10,
        accent: "#9932cc",
    },
    {
        id: "unisex",
        slug: "unisex",
        name: "Unisex Icons",
        tagline: "Beyond Boundaries",
        description: "Pure essence with no limits, designed for everyone",
        image: "/images/velvet/collections/unisex.jpg",
        count: 7,
        accent: "#d4a853",
    },
];

// Products
export const PRODUCTS: Product[] = [
    {
        id: "midnight-oud",
        slug: "midnight-oud",
        name: "Midnight Oud",
        collection: "oud",
        price: 320,
        sizes: [
            { size: "30ml", price: 180 },
            { size: "50ml", price: 250 },
            { size: "100ml", price: 320 },
        ],
        image: "/images/velvet/products/midnight-oud.jpg",
        images: [
            "/images/velvet/products/midnight-oud.jpg",
            "/images/velvet/products/midnight-oud-2.jpg",
            "/images/velvet/products/midnight-oud-3.jpg",
        ],
        description: "An intoxicating journey through ancient Cambodian forests, where precious oud meets warm amber and creamy sandalwood.",
        notes: {
            top: ["Saffron", "Bergamot"],
            heart: ["Oud", "Rose", "Jasmine"],
            base: ["Amber", "Sandalwood", "Musk"],
        },
        isNew: true,
        isBestseller: true,
        inStock: true,
        rating: 4.9,
        reviews: 127,
    },
    {
        id: "velvet-rose",
        slug: "velvet-rose",
        name: "Velvet Rose",
        collection: "floral",
        price: 280,
        sizes: [
            { size: "30ml", price: 150 },
            { size: "50ml", price: 215 },
            { size: "100ml", price: 280 },
        ],
        image: "/images/velvet/products/velvet-rose.jpg",
        images: [
            "/images/velvet/products/velvet-rose.jpg",
        ],
        description: "A romantic embrace of Bulgarian roses, wrapped in velvety petals and kissed by morning dew.",
        notes: {
            top: ["Pink Pepper", "Lychee"],
            heart: ["Bulgarian Rose", "Peony", "Raspberry"],
            base: ["Musk", "Patchouli", "Ambrox"],
        },
        isNew: false,
        isBestseller: true,
        inStock: true,
        rating: 4.8,
        reviews: 89,
    },
    {
        id: "noir-intense",
        slug: "noir-intense",
        name: "Noir Intense",
        collection: "oriental",
        price: 350,
        sizes: [
            { size: "30ml", price: 195 },
            { size: "50ml", price: 275 },
            { size: "100ml", price: 350 },
        ],
        image: "/images/velvet/products/noir-intense.jpg",
        images: [
            "/images/velvet/products/noir-intense.jpg",
        ],
        description: "Dark, mysterious, and utterly captivating. A bold statement for those who dare.",
        notes: {
            top: ["Black Pepper", "Cardamom"],
            heart: ["Leather", "Iris", "Violet"],
            base: ["Vetiver", "Benzoin", "Tonka"],
        },
        isNew: true,
        isBestseller: false,
        inStock: true,
        rating: 4.7,
        reviews: 45,
    },
    {
        id: "ocean-breeze",
        slug: "ocean-breeze",
        name: "Ocean Breeze",
        collection: "fresh",
        price: 220,
        sizes: [
            { size: "30ml", price: 120 },
            { size: "50ml", price: 170 },
            { size: "100ml", price: 220 },
        ],
        image: "/images/velvet/products/ocean-breeze.jpg",
        images: [
            "/images/velvet/products/ocean-breeze.jpg",
        ],
        description: "The scent of a Mediterranean morning, where sea salt meets citrus groves.",
        notes: {
            top: ["Sea Salt", "Bergamot", "Lemon"],
            heart: ["Marine Notes", "Lavender"],
            base: ["Driftwood", "White Musk"],
        },
        isNew: false,
        isBestseller: false,
        inStock: true,
        rating: 4.5,
        reviews: 62,
    },
    {
        id: "golden-amber",
        slug: "golden-amber",
        name: "Golden Amber",
        collection: "oriental",
        price: 295,
        sizes: [
            { size: "30ml", price: 165 },
            { size: "50ml", price: 230 },
            { size: "100ml", price: 295 },
        ],
        image: "/images/velvet/products/golden-amber.jpg",
        images: [
            "/images/velvet/products/golden-amber.jpg",
        ],
        description: "Liquid gold in a bottle. Warm, sensual, and eternally elegant.",
        notes: {
            top: ["Saffron", "Orange Blossom"],
            heart: ["Amber", "Jasmine", "Orris"],
            base: ["Vanilla", "Benzoin", "Sandalwood"],
        },
        isNew: false,
        isBestseller: true,
        inStock: true,
        rating: 4.9,
        reviews: 156,
    },
    {
        id: "white-jasmine",
        slug: "white-jasmine",
        name: "White Jasmine",
        collection: "floral",
        price: 245,
        sizes: [
            { size: "30ml", price: 135 },
            { size: "50ml", price: 190 },
            { size: "100ml", price: 245 },
        ],
        image: "/images/velvet/products/white-jasmine.jpg",
        images: [
            "/images/velvet/products/white-jasmine.jpg",
        ],
        description: "Indian jasmine at its finest, harvested at dawn for maximum intensity.",
        notes: {
            top: ["Green Notes", "Pear"],
            heart: ["Jasmine Sambac", "Tuberose", "Ylang"],
            base: ["Creamy Musk", "Sandalwood"],
        },
        isNew: false,
        isBestseller: false,
        inStock: true,
        rating: 4.6,
        reviews: 78,
    },
    {
        id: "royal-oud",
        slug: "royal-oud",
        name: "Royal Oud",
        collection: "oud",
        price: 450,
        sizes: [
            { size: "30ml", price: 250 },
            { size: "50ml", price: 350 },
            { size: "100ml", price: 450 },
        ],
        image: "/images/velvet/products/royal-oud.jpg",
        images: [
            "/images/velvet/products/royal-oud.jpg",
        ],
        description: "The pinnacle of oud perfumery. Rare, precious, and unforgettable.",
        notes: {
            top: ["Incense", "Pink Pepper"],
            heart: ["Laotian Oud", "Bulgarian Rose"],
            base: ["Mysore Sandalwood", "Amber", "Musk"],
        },
        isNew: true,
        isBestseller: false,
        inStock: true,
        rating: 5.0,
        reviews: 23,
    },
    {
        id: "citrus-noir",
        slug: "citrus-noir",
        name: "Citrus Noir",
        collection: "unisex",
        price: 235,
        sizes: [
            { size: "30ml", price: 130 },
            { size: "50ml", price: 180 },
            { size: "100ml", price: 235 },
        ],
        image: "/images/velvet/products/citrus-noir.jpg",
        images: [
            "/images/velvet/products/citrus-noir.jpg",
        ],
        description: "Fresh citrus with a dark twist. Day meets night in perfect harmony.",
        notes: {
            top: ["Bergamot", "Blood Orange", "Grapefruit"],
            heart: ["Neroli", "Black Tea"],
            base: ["Vetiver", "Cedar", "Leather"],
        },
        isNew: false,
        isBestseller: false,
        inStock: true,
        rating: 4.4,
        reviews: 41,
    },
];

// Helper functions
export const getProductBySlug = (slug: string): Product | undefined => {
    return PRODUCTS.find((p) => p.slug === slug);
};

export const getProductsByCollection = (collectionSlug: string): Product[] => {
    return PRODUCTS.filter((p) => p.collection === collectionSlug);
};

export const getCollectionBySlug = (slug: string): Collection | undefined => {
    return COLLECTIONS.find((c) => c.slug === slug);
};

export const getBestsellers = (): Product[] => {
    return PRODUCTS.filter((p) => p.isBestseller);
};

export const getNewArrivals = (): Product[] => {
    return PRODUCTS.filter((p) => p.isNew);
};
