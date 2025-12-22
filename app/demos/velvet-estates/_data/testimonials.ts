// Velvet Estates — Testimonials Data

export interface Testimonial {
    id: string;
    quote: string;
    author: string;
    title: string;
    location: string;
    image?: string;
    rating: number;
    featured: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
    {
        id: "1",
        quote: "Alexandra didn't just find us a home; she understood exactly what our family needed before we did. The Obsidian Penthouse exceeded every expectation.",
        author: "Jonathan M.",
        title: "Tech Entrepreneur",
        location: "Central Park South",
        rating: 5,
        featured: true,
    },
    {
        id: "2",
        quote: "Working with Velvet Estates felt like having a trusted friend who happened to have unparalleled access to Manhattan's finest properties. James's architectural knowledge was invaluable.",
        author: "Catherine & Robert L.",
        title: "Art Collectors",
        location: "Upper East Side",
        rating: 5,
        featured: true,
    },
    {
        id: "3",
        quote: "As an international buyer, I needed an advisor who understood both the market and the complexities of cross-border transactions. Sophia made the process seamless.",
        author: "Henri D.",
        title: "Private Equity Executive",
        location: "TriBeCa",
        rating: 5,
        featured: true,
    },
    {
        id: "4",
        quote: "The level of discretion and professionalism throughout our search was exactly what we needed. They respect that privacy is paramount at this level.",
        author: "Anonymous",
        title: "Family Office Principal",
        location: "Billionaires' Row",
        rating: 5,
        featured: false,
    },
    {
        id: "5",
        quote: "From our first conversation to closing, every interaction was thoughtful and efficient. They made selling our townhouse feel effortless.",
        author: "Margaret & David W.",
        title: "Finance Executives",
        location: "West Village",
        rating: 5,
        featured: true,
    },
    {
        id: "6",
        quote: "Marcus showed us Brooklyn through completely new eyes. We found a home we never would have discovered on our own.",
        author: "Jennifer T.",
        title: "Media Executive",
        location: "Brooklyn Heights",
        rating: 5,
        featured: false,
    },
];

// Helper functions
export function getFeaturedTestimonials(): Testimonial[] {
    return TESTIMONIALS.filter((t) => t.featured);
}
