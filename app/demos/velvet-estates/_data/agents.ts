// Velvet Estates — Agents Data

export interface Agent {
    id: string;
    slug: string;
    name: string;
    title: string;
    specialty: string;
    bio: string;
    image: string;
    email: string;
    phone: string;
    salesVolume: string;
    yearsExperience: number;
    languages: string[];
    featured: boolean;
    certifications: string[];
    socialLinks: {
        linkedin?: string;
        instagram?: string;
    };
}

export const AGENTS: Agent[] = [
    {
        id: "1",
        slug: "alexandra-stone",
        name: "Alexandra Stone",
        title: "Managing Director",
        specialty: "Ultra-Luxury Penthouses",
        bio: "With over two decades at the pinnacle of Manhattan real estate, Alexandra has cultivated relationships with the world's most discerning buyers. Her portfolio includes some of the city's most significant residential transactions, with a reputation for discretion and unparalleled market insight.",
        image: "/images/velvet-estates/agent-alexandra.png",
        email: "alexandra@velvetestates.com",
        phone: "(212) 555-0101",
        salesVolume: "$2.8B+",
        yearsExperience: 22,
        languages: ["English", "French", "Italian"],
        featured: true,
        certifications: ["CIPS", "GRI", "CLHMS"],
        socialLinks: {
            linkedin: "#",
            instagram: "#",
        },
    },
    {
        id: "2",
        slug: "james-chen",
        name: "James Chen",
        title: "Senior Vice President",
        specialty: "Historic Properties & Pre-War Classics",
        bio: "James brings architectural expertise and deep appreciation for New York's pre-war legacy to every transaction. A former architect turned real estate advisor, he connects collectors with the city's most significant historic residences.",
        image: "/images/velvet-estates/agent-james.png",
        email: "james@velvetestates.com",
        phone: "(212) 555-0102",
        salesVolume: "$1.5B+",
        yearsExperience: 15,
        languages: ["English", "Mandarin", "Cantonese"],
        featured: true,
        certifications: ["CIPS", "ABR"],
        socialLinks: {
            linkedin: "#",
        },
    },
    {
        id: "3",
        slug: "sophia-laurent",
        name: "Sophia Laurent",
        title: "Executive Vice President",
        specialty: "Waterfront Estates & International Buyers",
        bio: "Sophia's international background and fluency in five languages have made her the go-to advisor for global clients seeking premier properties in New York and the Hamptons. Her white-glove service extends from acquisition through interior design coordination.",
        image: "/images/velvet-estates/agent-sofia.png",
        email: "sophia@velvetestates.com",
        phone: "(212) 555-0103",
        salesVolume: "$2.1B+",
        yearsExperience: 18,
        languages: ["English", "French", "Spanish", "Portuguese", "Italian"],
        featured: true,
        certifications: ["CIPS", "CLHMS", "SRES"],
        socialLinks: {
            linkedin: "#",
            instagram: "#",
        },
    },
    {
        id: "4",
        slug: "marcus-williams",
        name: "Marcus Williams",
        title: "Vice President",
        specialty: "Brooklyn & Emerging Neighborhoods",
        bio: "Marcus has been at the forefront of Brooklyn's luxury market evolution. His intimate knowledge of the borough's diverse neighborhoods and emerging opportunities has helped clients discover extraordinary value in unexpected places.",
        image: "/images/velvet-estates/agent-marcus.png",
        email: "marcus@velvetestates.com",
        phone: "(212) 555-0104",
        salesVolume: "$890M+",
        yearsExperience: 12,
        languages: ["English", "Spanish"],
        featured: false,
        certifications: ["ABR", "GRI"],
        socialLinks: {
            instagram: "#",
        },
    },
    {
        id: "5",
        slug: "elena-vasquez",
        name: "Elena Vasquez",
        title: "Vice President",
        specialty: "New Developments & Investment Properties",
        bio: "Elena's background in finance and development gives her clients an analytical edge. She specializes in new construction opportunities, helping investors and end-users navigate the complexities of buying in Manhattan's newest towers.",
        image: "/images/velvet-estates/agent-victoria.png",
        email: "elena@velvetestates.com",
        phone: "(212) 555-0105",
        salesVolume: "$1.2B+",
        yearsExperience: 10,
        languages: ["English", "Spanish", "Portuguese"],
        featured: true,
        certifications: ["CIPS", "CCIM"],
        socialLinks: {
            linkedin: "#",
        },
    },
    {
        id: "6",
        slug: "david-park",
        name: "David Park",
        title: "Associate Vice President",
        specialty: "First-Time Luxury Buyers",
        bio: "David's patient, educational approach has made him a favorite among clients making their first significant real estate investment. He demystifies the buying process while ensuring clients find properties that exceed expectations.",
        image: "/images/velvet-estates/agent-marcus.png",
        email: "david@velvetestates.com",
        phone: "(212) 555-0106",
        salesVolume: "$450M+",
        yearsExperience: 8,
        languages: ["English", "Korean"],
        featured: false,
        certifications: ["ABR", "e-PRO"],
        socialLinks: {
            instagram: "#",
        },
    },
];

// Helper functions
export function getAgentBySlug(slug: string): Agent | undefined {
    return AGENTS.find((a) => a.slug === slug);
}

export function getFeaturedAgents(): Agent[] {
    return AGENTS.filter((a) => a.featured);
}
