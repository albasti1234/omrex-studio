// =============================================================================
// VELVET PERFUMES - Brands Data
// =============================================================================

export interface Brand {
    id: string;
    slug: string;
    name: string;
    logo?: string;
    description: string;
    country: string;
    founded: number;
    fragranceCount: number;
    accent: string;
}

export const BRANDS: Brand[] = [
    {
        id: "dior",
        slug: "dior",
        name: "Dior",
        description: "French luxury fashion house renowned for its iconic fragrances that blend sophistication with modern elegance. From the legendary Sauvage to the timeless Miss Dior.",
        country: "France",
        founded: 1947,
        fragranceCount: 10,
        accent: "#1a1a1a",
    },
    {
        id: "chanel",
        slug: "chanel",
        name: "Chanel",
        description: "The epitome of French luxury, Chanel has been creating legendary fragrances since 1921. Home of the world's most famous perfume, N°5.",
        country: "France",
        founded: 1910,
        fragranceCount: 10,
        accent: "#0d0d0d",
    },
    {
        id: "tom-ford",
        slug: "tom-ford",
        name: "Tom Ford",
        description: "Bold, luxurious, and unapologetically sensual. Tom Ford fragrances push boundaries with rare ingredients and provocative compositions.",
        country: "USA",
        founded: 2006,
        fragranceCount: 10,
        accent: "#2d1f1a",
    },
];

// Helper functions
export const getBrandBySlug = (slug: string): Brand | undefined => {
    return BRANDS.find((b) => b.slug === slug);
};

export const getAllBrands = (): Brand[] => {
    return BRANDS;
};
