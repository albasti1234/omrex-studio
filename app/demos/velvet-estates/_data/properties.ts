// Velvet Estates — Properties Data

export interface Property {
    id: string;
    slug: string;
    title: string;
    address: string;
    neighborhood: string;
    price: number;
    priceFormatted: string;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    type: "penthouse" | "villa" | "apartment" | "townhouse" | "estate";
    status: "available" | "pending" | "sold";
    featured: boolean;
    new: boolean;
    description: string;
    features: string[];
    amenities: string[];
    images: string[];
    floorplan?: string;
    yearBuilt: number;
    parking: number;
    agent: string;
}

export const PROPERTIES: Property[] = [
    {
        id: "1",
        slug: "the-obsidian-penthouse",
        title: "The Obsidian Penthouse",
        address: "1 Central Park South, PH-1",
        neighborhood: "central-park",
        price: 45000000,
        priceFormatted: "$45,000,000",
        bedrooms: 5,
        bathrooms: 6,
        sqft: 8500,
        type: "penthouse",
        status: "available",
        featured: true,
        new: true,
        description: "A masterpiece of modern luxury, this penthouse offers 360-degree views of Central Park and the Manhattan skyline. Floor-to-ceiling windows flood the space with natural light, while custom finishes and smart home technology create an unparalleled living experience.",
        features: [
            "Private rooftop terrace",
            "360-degree skyline views",
            "Smart home automation",
            "Wine cellar",
            "Private elevator",
        ],
        amenities: [
            "24/7 Concierge",
            "Private spa",
            "Fitness center",
            "Screening room",
            "Chef's kitchen",
        ],
        images: [
            "/images/velvet-estates/property-central-park.png",
        ],
        yearBuilt: 2023,
        parking: 3,
        agent: "alexandra-stone",
    },
    {
        id: "2",
        slug: "maison-lumiere",
        title: "Maison Lumière",
        address: "834 Fifth Avenue, Apt 12A",
        neighborhood: "upper-east-side",
        price: 28500000,
        priceFormatted: "$28,500,000",
        bedrooms: 4,
        bathrooms: 5,
        sqft: 6200,
        type: "apartment",
        status: "available",
        featured: true,
        new: false,
        description: "An exquisite pre-war residence reimagined for contemporary living. Original architectural details blend seamlessly with modern luxury, creating a home of timeless elegance in one of Manhattan's most prestigious addresses.",
        features: [
            "Pre-war charm with modern updates",
            "Park views",
            "Library with fireplace",
            "Staff quarters",
            "Climate-controlled wine storage",
        ],
        amenities: [
            "White-glove service",
            "Private storage",
            "Gym",
            "Garden access",
            "Pet-friendly",
        ],
        images: [
            "/images/velvet-estates/property-upper-east.png",
        ],
        yearBuilt: 1928,
        parking: 2,
        agent: "james-chen",
    },
    {
        id: "3",
        slug: "the-glass-villa",
        title: "The Glass Villa",
        address: "15 Meadow Lane",
        neighborhood: "hamptons",
        price: 67000000,
        priceFormatted: "$67,000,000",
        bedrooms: 8,
        bathrooms: 10,
        sqft: 18000,
        type: "estate",
        status: "available",
        featured: true,
        new: true,
        description: "An architectural marvel on 4 acres of pristine oceanfront. This contemporary masterpiece features walls of glass that blur the line between indoor and outdoor living, with direct beach access and a 75-foot infinity pool.",
        features: [
            "Oceanfront location",
            "75-foot infinity pool",
            "Private beach access",
            "Tennis court",
            "Guest house",
        ],
        amenities: [
            "Home theater",
            "Spa & sauna",
            "8-car garage",
            "Staff quarters",
            "Outdoor kitchen",
        ],
        images: [
            "/images/velvet-estates/property-hudson-yards.png",
        ],
        yearBuilt: 2024,
        parking: 8,
        agent: "sophia-laurent",
    },
    {
        id: "4",
        slug: "tribeca-loft-collection",
        title: "TriBeCa Loft Collection",
        address: "443 Greenwich Street, Unit 8",
        neighborhood: "tribeca",
        price: 19800000,
        priceFormatted: "$19,800,000",
        bedrooms: 4,
        bathrooms: 4,
        sqft: 5800,
        type: "apartment",
        status: "pending",
        featured: false,
        new: false,
        description: "Industrial elegance meets refined luxury in this spectacular full-floor loft. Soaring 14-foot ceilings, original columns, and massive windows create a gallery-like atmosphere perfect for art collectors.",
        features: [
            "Full-floor layout",
            "14-foot ceilings",
            "Original columns",
            "Key-lock elevator",
            "Deeded storage",
        ],
        amenities: [
            "Doorman building",
            "Residents lounge",
            "Children's playroom",
            "Bike storage",
            "Package room",
        ],
        images: [
            "/images/velvet-estates/property-tribeca.png",
        ],
        yearBuilt: 2018,
        parking: 2,
        agent: "marcus-williams",
    },
    {
        id: "5",
        slug: "park-avenue-classic",
        title: "Park Avenue Classic",
        address: "1040 Park Avenue, 14B",
        neighborhood: "upper-east-side",
        price: 12500000,
        priceFormatted: "$12,500,000",
        bedrooms: 4,
        bathrooms: 4,
        sqft: 3800,
        type: "apartment",
        status: "available",
        featured: false,
        new: false,
        description: "Gracious Park Avenue living in a distinguished white-glove cooperative. This beautifully proportioned residence features elegant entertaining spaces, a chef's kitchen, and southern exposures.",
        features: [
            "Corner unit",
            "Southern exposures",
            "Formal dining room",
            "Butler's pantry",
            "Central air",
        ],
        amenities: [
            "Full-service building",
            "Laundry facilities",
            "Storage",
            "Gym",
            "Roof deck",
        ],
        images: [
            "/images/velvet-estates/property-gramercy.png",
        ],
        yearBuilt: 1952,
        parking: 1,
        agent: "alexandra-stone",
    },
    {
        id: "6",
        slug: "soho-artists-retreat",
        title: "SoHo Artist's Retreat",
        address: "92 Prince Street, 3F",
        neighborhood: "soho",
        price: 8900000,
        priceFormatted: "$8,900,000",
        bedrooms: 3,
        bathrooms: 3,
        sqft: 3200,
        type: "apartment",
        status: "available",
        featured: false,
        new: true,
        description: "A true SoHo loft with 12-foot ceilings, oversized windows, and cast-iron details. This sun-drenched space has been meticulously renovated while preserving its artistic character.",
        features: [
            "Cast-iron building",
            "12-foot ceilings",
            "Chef's kitchen",
            "Custom built-ins",
            "In-unit laundry",
        ],
        amenities: [
            "Pet-friendly",
            "Storage",
            "Bicycle room",
            "Roof access",
            "Video intercom",
        ],
        images: [
            "/images/velvet-estates/property-soho.png",
        ],
        yearBuilt: 1890,
        parking: 0,
        agent: "james-chen",
    },
    {
        id: "7",
        slug: "west-village-townhouse",
        title: "West Village Townhouse",
        address: "74 Charles Street",
        neighborhood: "west-village",
        price: 22000000,
        priceFormatted: "$22,000,000",
        bedrooms: 5,
        bathrooms: 5,
        sqft: 6500,
        type: "townhouse",
        status: "available",
        featured: true,
        new: false,
        description: "A rare 25-foot-wide townhouse on one of the Village's most coveted tree-lined blocks. Five floors of luxurious living include a private garden, rooftop terrace, and professional-grade kitchen.",
        features: [
            "Private garden",
            "Rooftop terrace",
            "Working fireplaces",
            "Original details",
            "Full-floor primary suite",
        ],
        amenities: [
            "Elevator",
            "Central air",
            "Radiant heat",
            "Smart home",
            "Security system",
        ],
        images: [
            "/images/velvet-estates/property-west-village.png",
        ],
        yearBuilt: 1846,
        parking: 1,
        agent: "sophia-laurent",
    },
    {
        id: "8",
        slug: "brooklyn-heights-duplex",
        title: "Brooklyn Heights Duplex",
        address: "2 Montague Terrace, Unit A/B",
        neighborhood: "brooklyn-heights",
        price: 7500000,
        priceFormatted: "$7,500,000",
        bedrooms: 4,
        bathrooms: 3,
        sqft: 3600,
        type: "apartment",
        status: "available",
        featured: false,
        new: false,
        description: "Commanding views of the Manhattan skyline and harbor from this spectacular duplex in one of Brooklyn's most prestigious addresses. Renovated with impeccable taste.",
        features: [
            "Skyline views",
            "Private terrace",
            "Wood-burning fireplace",
            "Home office",
            "Washer/dryer",
        ],
        amenities: [
            "Doorman",
            "Gym",
            "Common garden",
            "Storage",
            "Bike room",
        ],
        images: [
            "/images/velvet-estates/property-chelsea.png",
        ],
        yearBuilt: 1929,
        parking: 1,
        agent: "marcus-williams",
    },
    {
        id: "9",
        slug: "hudson-yards-sky-residence",
        title: "Hudson Yards Sky Residence",
        address: "35 Hudson Yards, 87A",
        neighborhood: "hudson-yards",
        price: 31000000,
        priceFormatted: "$31,000,000",
        bedrooms: 4,
        bathrooms: 5,
        sqft: 5200,
        type: "apartment",
        status: "available",
        featured: true,
        new: true,
        description: "Cloud-level living in Manhattan's most exciting new neighborhood. This corner residence offers unobstructed views from every room, with interiors by acclaimed designer Thomas Juul-Hansen.",
        features: [
            "Corner unit",
            "River views",
            "Designer interiors",
            "Smart home",
            "Private wine storage",
        ],
        amenities: [
            "Equinox Club access",
            "Pool",
            "Business center",
            "Children's room",
            "Private dining",
        ],
        images: [
            "/images/velvet-estates/property-hudson-yards.png",
        ],
        yearBuilt: 2019,
        parking: 2,
        agent: "elena-vasquez",
    },
    {
        id: "10",
        slug: "greenwich-village-gem",
        title: "Greenwich Village Gem",
        address: "29 Washington Square West, 8A",
        neighborhood: "greenwich-village",
        price: 15800000,
        priceFormatted: "$15,800,000",
        bedrooms: 3,
        bathrooms: 3,
        sqft: 2900,
        type: "apartment",
        status: "sold",
        featured: false,
        new: false,
        description: "Overlooking Washington Square Park, this gracious residence combines pre-war elegance with thoughtful modern updates. Rarely available in one of the city's most desirable locations.",
        features: [
            "Park views",
            "Pre-war details",
            "Fireplace",
            "High ceilings",
            "Gallery entry",
        ],
        amenities: [
            "Doorman",
            "Elevator",
            "Laundry",
            "Storage",
            "Pet-friendly",
        ],
        images: [
            "/images/velvet-estates/property-central-park.png",
        ],
        yearBuilt: 1929,
        parking: 0,
        agent: "alexandra-stone",
    },
    {
        id: "11",
        slug: "chelsea-gallery-loft",
        title: "Chelsea Gallery Loft",
        address: "547 West 27th Street, PH",
        neighborhood: "chelsea",
        price: 16500000,
        priceFormatted: "$16,500,000",
        bedrooms: 3,
        bathrooms: 3,
        sqft: 4500,
        type: "penthouse",
        status: "available",
        featured: false,
        new: false,
        description: "A penthouse loft in the heart of Chelsea's gallery district. Double-height ceilings, a private rooftop, and museum-quality walls make this the perfect home for art enthusiasts.",
        features: [
            "Double-height ceilings",
            "Private rooftop",
            "Gallery walls",
            "Chef's kitchen",
            "Home gym",
        ],
        amenities: [
            "Doorman",
            "High Line access",
            "Pet spa",
            "Roof deck",
            "Valet parking",
        ],
        images: [
            "/images/velvet-estates/property-chelsea.png",
        ],
        yearBuilt: 2016,
        parking: 2,
        agent: "james-chen",
    },
    {
        id: "12",
        slug: "billionaires-row-icon",
        title: "Billionaire's Row Icon",
        address: "432 Park Avenue, 96A",
        neighborhood: "midtown",
        price: 85000000,
        priceFormatted: "$85,000,000",
        bedrooms: 6,
        bathrooms: 7,
        sqft: 8255,
        type: "penthouse",
        status: "available",
        featured: true,
        new: false,
        description: "The pinnacle of New York luxury. This full-floor residence in the world's most iconic supertall offers 360-degree views from 1,396 feet, with unparalleled finishes and amenities.",
        features: [
            "Full-floor residence",
            "12.5-foot ceilings",
            "Private elevator landing",
            "Six en-suite bedrooms",
            "Staff quarters",
        ],
        amenities: [
            "Outdoor pool",
            "Private restaurant",
            "Spa",
            "Golf simulator",
            "Library",
        ],
        images: [
            "/images/velvet-estates/property-central-park.png",
        ],
        yearBuilt: 2015,
        parking: 3,
        agent: "sophia-laurent",
    },
];

// Helper functions
export function getPropertyBySlug(slug: string): Property | undefined {
    return PROPERTIES.find((p) => p.slug === slug);
}

export function getFeaturedProperties(): Property[] {
    return PROPERTIES.filter((p) => p.featured);
}

export function getPropertiesByNeighborhood(neighborhood: string): Property[] {
    return PROPERTIES.filter((p) => p.neighborhood === neighborhood);
}

export function getPropertiesByAgent(agentSlug: string): Property[] {
    return PROPERTIES.filter((p) => p.agent === agentSlug);
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(price);
}
