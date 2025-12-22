// Velvet Estates — Insights/Blog Data

export interface Insight {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    image: string;
    author: string;
    authorTitle: string;
    publishedAt: string;
    readTime: number;
    featured: boolean;
}

export const INSIGHTS: Insight[] = [
    {
        id: "1",
        slug: "manhattan-luxury-market-outlook-2024",
        title: "Manhattan Luxury Market Outlook: What 2024 Holds",
        excerpt: "Our comprehensive analysis of trends shaping the ultra-luxury segment, from inventory dynamics to buyer preferences in the year ahead.",
        content: "The Manhattan luxury real estate market continues to demonstrate remarkable resilience...",
        category: "Market Analysis",
        image: "/images/velvet-estates/property-central-park.png",
        author: "Alexandra Stone",
        authorTitle: "Managing Director",
        publishedAt: "2024-01-15",
        readTime: 8,
        featured: true,
    },
    {
        id: "2",
        slug: "art-of-penthouse-living",
        title: "The Art of Penthouse Living: What Defines a True Crown Jewel",
        excerpt: "Beyond the views: exploring the architectural and lifestyle elements that separate exceptional penthouses from the merely elevated.",
        content: "A true penthouse is more than an apartment on the top floor...",
        category: "Lifestyle",
        image: "/images/velvet-estates/property-hudson-yards.png",
        author: "James Chen",
        authorTitle: "Senior Vice President",
        publishedAt: "2024-01-08",
        readTime: 6,
        featured: true,
    },
    {
        id: "3",
        slug: "investing-in-pre-war-cooperatives",
        title: "Investing in Pre-War Cooperatives: A Timeless Strategy",
        excerpt: "Why Manhattan's pre-war buildings continue to offer stability and appreciation that newer developments cannot match.",
        content: "Pre-war cooperatives represent a unique investment opportunity...",
        category: "Investment",
        image: "/images/velvet-estates/property-upper-east.png",
        author: "James Chen",
        authorTitle: "Senior Vice President",
        publishedAt: "2023-12-20",
        readTime: 10,
        featured: false,
    },
    {
        id: "4",
        slug: "hamptons-estate-guide",
        title: "The Complete Guide to Hamptons Estate Acquisition",
        excerpt: "Navigating the nuances of purchasing oceanfront property in New York's most exclusive summer destination.",
        content: "Acquiring a Hamptons estate requires a different approach...",
        category: "Buyer's Guide",
        image: "/images/velvet-estates/property-soho.png",
        author: "Sophia Laurent",
        authorTitle: "Executive Vice President",
        publishedAt: "2023-12-12",
        readTime: 12,
        featured: true,
    },
    {
        id: "5",
        slug: "smart-home-technology-luxury",
        title: "Smart Home Technology in Ultra-Luxury Residences",
        excerpt: "How the most sophisticated properties are integrating technology without compromising design or privacy.",
        content: "The integration of smart home technology has become an expectation...",
        category: "Technology",
        image: "/images/velvet-estates/property-tribeca.png",
        author: "Elena Vasquez",
        authorTitle: "Vice President",
        publishedAt: "2023-11-28",
        readTime: 7,
        featured: false,
    },
    {
        id: "6",
        slug: "international-buyer-guide-nyc",
        title: "International Buyer's Guide to NYC Real Estate",
        excerpt: "Essential considerations for non-US citizens investing in Manhattan's luxury market, from financing to taxation.",
        content: "New York remains the premier destination for international real estate investment...",
        category: "Buyer's Guide",
        image: "/images/velvet-estates/neighborhood-central-park.png",
        author: "Sophia Laurent",
        authorTitle: "Executive Vice President",
        publishedAt: "2023-11-15",
        readTime: 15,
        featured: false,
    },
    {
        id: "7",
        slug: "tribeca-neighborhood-evolution",
        title: "TriBeCa: The Evolution of Manhattan's Most Coveted Neighborhood",
        excerpt: "From industrial warehouses to $40M lofts: charting the remarkable transformation of downtown's family enclave.",
        content: "The story of TriBeCa is the story of New York's reinvention...",
        category: "Neighborhood",
        image: "/images/velvet-estates/neighborhood-tribeca.png",
        author: "Marcus Williams",
        authorTitle: "Vice President",
        publishedAt: "2023-10-30",
        readTime: 9,
        featured: false,
    },
    {
        id: "8",
        slug: "sustainable-luxury-real-estate",
        title: "Sustainable Luxury: The New Standard in High-End Real Estate",
        excerpt: "How environmental consciousness is reshaping buyer expectations and developer priorities in the luxury segment.",
        content: "Sustainability is no longer optional in luxury real estate...",
        category: "Trends",
        image: "/images/velvet-estates/property-chelsea.png",
        author: "Elena Vasquez",
        authorTitle: "Vice President",
        publishedAt: "2023-10-18",
        readTime: 8,
        featured: false,
    },
];

// Helper functions
export function getInsightBySlug(slug: string): Insight | undefined {
    return INSIGHTS.find((i) => i.slug === slug);
}

export function getFeaturedInsights(): Insight[] {
    return INSIGHTS.filter((i) => i.featured);
}

export function getInsightsByCategory(category: string): Insight[] {
    return INSIGHTS.filter((i) => i.category === category);
}
