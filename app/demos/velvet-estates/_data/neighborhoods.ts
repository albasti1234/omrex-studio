// Velvet Estates — Neighborhoods Data

export interface Neighborhood {
    id: string;
    slug: string;
    name: string;
    tagline: string;
    description: string;
    image: string;
    highlights: string[];
    avgPrice: string;
    propertyCount: number;
    vibe: string;
    transitScore: number;
    walkScore: number;
}

export const NEIGHBORHOODS: Neighborhood[] = [
    {
        id: "1",
        slug: "central-park",
        name: "Central Park",
        tagline: "Where Nature Meets Prestige",
        description: "Living along Central Park is the ultimate New York experience. These addresses have housed royalty, titans of industry, and cultural icons for over a century. The park's 843 acres of curated nature provide a private backyard for the world's most exclusive residences.",
        image: "/images/velvet-estates/neighborhood-central-park.png",
        highlights: [
            "Iconic park views",
            "White-glove buildings",
            "Museum Mile proximity",
            "World-class dining",
        ],
        avgPrice: "$15.2M",
        propertyCount: 3,
        vibe: "Timeless Prestige",
        transitScore: 95,
        walkScore: 98,
    },
    {
        id: "2",
        slug: "upper-east-side",
        name: "Upper East Side",
        tagline: "Refined Elegance, Enduring Value",
        description: "The Upper East Side remains New York's most distinguished residential enclave. Tree-lined streets, landmark townhouses, and grand pre-war cooperatives define a neighborhood where tradition and taste are paramount.",
        image: "/images/velvet-estates/neighborhood-upper-east.png",
        highlights: [
            "Pre-war architecture",
            "Top private schools",
            "Gallery Row",
            "Madison Avenue shopping",
        ],
        avgPrice: "$8.5M",
        propertyCount: 4,
        vibe: "Classic Manhattan",
        transitScore: 92,
        walkScore: 96,
    },
    {
        id: "3",
        slug: "tribeca",
        name: "TriBeCa",
        tagline: "Industrial Soul, Modern Luxury",
        description: "TriBeCa has evolved from industrial wasteland to the city's most coveted family neighborhood. Celebrity residents are drawn by massive loft spaces, cobblestone streets, and a village-like community atmosphere.",
        image: "/images/velvet-estates/neighborhood-tribeca.png",
        highlights: [
            "Loft living",
            "Film festival fame",
            "Farm-to-table restaurants",
            "Cobblestone charm",
        ],
        avgPrice: "$12.8M",
        propertyCount: 2,
        vibe: "Artistic Luxury",
        transitScore: 88,
        walkScore: 99,
    },
    {
        id: "4",
        slug: "west-village",
        name: "West Village",
        tagline: "Bohemian Spirit, Townhouse Dreams",
        description: "The West Village's winding streets and Federal-style townhouses create Manhattan's most romantic neighborhood. Jazz clubs, intimate restaurants, and hidden gardens define a lifestyle that feels worlds away from the city's bustle.",
        image: "/images/velvet-estates/neighborhood-west-village.png",
        highlights: [
            "Historic townhouses",
            "Jazz heritage",
            "Hidden gardens",
            "Whitney Museum",
        ],
        avgPrice: "$9.2M",
        propertyCount: 2,
        vibe: "Romantic Bohemian",
        transitScore: 95,
        walkScore: 100,
    },
    {
        id: "5",
        slug: "hamptons",
        name: "The Hamptons",
        tagline: "Oceanfront Grandeur",
        description: "New York's legendary summer playground offers more than seasonal escape. The Hamptons' oceanfront estates, farm-to-table culture, and world-class art scene attract year-round residents seeking the ultimate in coastal luxury.",
        image: "/images/velvet-estates/neighborhood-soho.png",
        highlights: [
            "Oceanfront estates",
            "Farm stands & vineyards",
            "World-class surfing",
            "Art collector community",
        ],
        avgPrice: "$28.5M",
        propertyCount: 1,
        vibe: "Coastal Elegance",
        transitScore: 35,
        walkScore: 45,
    },
    {
        id: "6",
        slug: "hudson-yards",
        name: "Hudson Yards",
        tagline: "The Future of Manhattan",
        description: "Hudson Yards represents New York's most ambitious development in generations. Cutting-edge architecture, integrated retail, and unrivaled amenities create a fully realized urban vision for 21st-century living.",
        image: "/images/velvet-estates/neighborhood-hudson-yards.png",
        highlights: [
            "The Vessel landmark",
            "Equinox Hotel",
            "High Line access",
            "The Shed arts center",
        ],
        avgPrice: "$18.5M",
        propertyCount: 2,
        vibe: "Futuristic Urban",
        transitScore: 98,
        walkScore: 94,
    },
];

// Helper functions
export function getNeighborhoodBySlug(slug: string): Neighborhood | undefined {
    return NEIGHBORHOODS.find((n) => n.slug === slug);
}
