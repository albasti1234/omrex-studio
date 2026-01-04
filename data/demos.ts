// ============================================================
// 📁 PATH: data/demos.ts
// ============================================================

export interface DemoWebsite {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  route: string;
  thumbnail: string;
  color: {
    primary: string;
    secondary: string;
  };
  features: string[];
  status: "live" | "coming-soon";
}

export const DEMO_WEBSITES: DemoWebsite[] = [
  {
    id: "ember-kitchen",
    title: "Ember Kitchen",
    subtitle: "Fine Dining Restaurant",
    description: "Luxury restaurant with reservations, menu, and gallery",
    category: "Restaurant",
    route: "/demos/ember-kitchen",
    thumbnail: "/images/demos/ember-kitchen.jpg",
    color: {
      primary: "#d4a574",
      secondary: "#1a1714",
    },
    features: ["Reservations", "Menu", "Gallery", "Contact"],
    status: "live",
  },
  {
    id: "velvet-perfumes",
    title: "Velvet Perfumes",
    subtitle: "Luxury Fragrance House",
    description: "Premium perfume brand with product showcase",
    category: "E-Commerce",
    route: "/demos/velvet-perfumes",
    thumbnail: "/images/demos/velvet-perfumes.jpg",
    color: {
      primary: "#8B5CF6",
      secondary: "#1a1625",
    },
    features: ["Products", "Collections", "About", "Contact"],
    status: "live",
  },
  {
    id: "pearl-dental",
    title: "Pearl Dental",
    subtitle: "Modern Dental Clinic",
    description: "Professional dental clinic with appointment booking",
    category: "Healthcare",
    route: "/demos/pearl-dental",
    thumbnail: "/images/demos/pearl-dental.jpg",
    color: {
      primary: "#06B6D4",
      secondary: "#0a1a1f",
    },
    features: ["Services", "Booking", "Team", "Contact"],
    status: "live",
  },
  {
    id: "atlas-legal",
    title: "Atlas Legal",
    subtitle: "Law Firm",
    description: "Professional law firm with case studies",
    category: "Legal",
    route: "/demos/atlas-legal",
    thumbnail: "/images/demos/atlas-legal.jpg",
    color: {
      primary: "#B8860B",
      secondary: "#1a1815",
    },
    features: ["Practice Areas", "Attorneys", "Cases", "Contact"],
    status: "live",
  },
  {
    id: "velvet-estates",
    title: "Velvet Estates",
    subtitle: "Luxury Real Estate",
    description: "Ultra high-end Manhattan real estate with cinematic design",
    category: "Real Estate",
    route: "/demos/velvet-estates",
    thumbnail: "/images/demos/velvet-estates.jpg",
    color: {
      primary: "#C4A052",
      secondary: "#0d0c0a",
    },
    features: ["Properties", "Agents", "Neighborhoods", "Insights"],
    status: "live",
  },
  {
    id: "sera-restaurant",
    title: "Sera Restaurant",
    subtitle: "Modern Italian Dining",
    description: "Intimate fine dining with warm cinematic atmosphere",
    category: "Restaurant",
    route: "/demos/sera-restaurant",
    thumbnail: "/images/demos/sera-restaurant.jpg",
    color: {
      primary: "#d4a574",
      secondary: "#0c0a09",
    },
    features: ["Reservation", "Menu", "Gallery", "Contact"],
    status: "live",
  },
  {
    id: "green-valley",
    title: "Green Valley",
    subtitle: "Local Arabic Restaurant",
    description: "Bilingual restaurant website (AR/EN) with cinematic design",
    category: "Restaurant",
    route: "/demos/green-valley",
    thumbnail: "/images/green-valley/hero.png",
    color: {
      primary: "#10B981",
      secondary: "#0a0a0c",
    },
    features: ["Bilingual", "Menu", "Gallery", "WhatsApp"],
    status: "live",
  },
  {
    id: "classfood",
    title: "Classfood",
    subtitle: "Casual Dining Restaurant",
    description: "Bilingual food ordering demo (AR/EN) with cart & WhatsApp integration",
    category: "Restaurant",
    route: "/demos/classfood/ar",
    thumbnail: "/images/classfood/hero.png",
    color: {
      primary: "#F97316",
      secondary: "#1F2937",
    },
    features: ["Bilingual", "Menu", "Cart", "WhatsApp"],
    status: "live",
  },
];

export const getLivedemos = () => DEMO_WEBSITES.filter((d) => d.status === "live");
export const getAllDemos = () => DEMO_WEBSITES;