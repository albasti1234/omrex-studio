// -------------------------------------------------------------
// PROJECTS DATA - OMREX.STUDIO
// -------------------------------------------------------------

export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type ProjectStat = {
  value: string;
  label: string;
  icon: string;
};

export type ProjectTestimonial = {
  quote: string;
  author: string;
  role: string;
  avatar: string;
};

export type Project = {
  // Basic Info
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  categorySlug: string;
  year: string;
  duration: string;
  
  // Hero
  heroImage: string;
  heroVideo?: string;
  
  // Colors
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  
  // Content
  overview: string;
  challenge: string;
  solution: string;
  
  // Results
  stats: ProjectStat[];
  
  // Testimonial
  testimonial: ProjectTestimonial;
  
  // Tech Stack
  techStack: string[];
  
  // Gallery
  images: ProjectImage[];
  
  // Features
  features: string[];
  
  // Links
  liveUrl?: string;
  
  // Navigation
  nextProject?: string;
  prevProject?: string;
};

// -------------------------------------------------------------
// ALL PROJECTS
// -------------------------------------------------------------

export const PROJECTS: Project[] = [
  // ============================================================
  // 1. EMBER KITCHEN - Fine Dining Restaurant
  // ============================================================
  {
    id: "ember-kitchen",
    slug: "ember-kitchen",
    title: "Ember Kitchen",
    subtitle: "Fine Dining Experience",
    category: "Restaurant",
    categorySlug: "restaurant",
    year: "2024",
    duration: "6 weeks",
    
    heroImage: "/images/projects/ember/hero.jpg",
    
    accentColor: "#f97316",
    gradientFrom: "#f97316",
    gradientTo: "#ea580c",
    
    overview: "Ember Kitchen is a premium fine dining restaurant that needed a digital presence as refined as their culinary experience. The website needed to evoke warmth, sophistication, and the artistry of their cuisine while making reservations seamless.",
    
    challenge: "The restaurant industry is saturated with template websites that fail to capture the unique essence of each establishment. Ember Kitchen needed to stand out in a competitive market while providing practical functionality for reservations and menu browsing. The challenge was balancing artistic expression with user-friendly navigation.",
    
    solution: "We created a cinematic web experience that mirrors the restaurant's ambiance. Rich, warm tones complement stunning food photography, while smooth animations guide visitors through an immersive journey. The reservation system is elegantly integrated, and the menu presentation turns browsing into an appetizing experience.",
    
    stats: [
      { value: "340%", label: "More Reservations", icon: "📈" },
      { value: "4.2s", label: "Avg. Session Time", icon: "⏱" },
      { value: "68%", label: "Mobile Bookings", icon: "📱" },
      { value: "2.8x", label: "Return Visitors", icon: "🔄" },
    ],
    
    testimonial: {
      quote: "Our website finally matches the quality of our food. The increase in reservations speaks for itself - guests tell us they booked because the website made them hungry.",
      author: "Marcus Chen",
      role: "Executive Chef & Owner",
      avatar: "/images/avatars/marcus.jpg",
    },
    
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS", "Sanity CMS", "OpenTable API"],
    
    images: [
      { src: "/images/projects/ember/gallery-1.jpg", alt: "Homepage hero section", caption: "Cinematic hero with ambient video background" },
      { src: "/images/projects/ember/gallery-2.jpg", alt: "Menu presentation", caption: "Interactive menu with dish details" },
      { src: "/images/projects/ember/gallery-3.jpg", alt: "Reservation system", caption: "Seamless booking experience" },
      { src: "/images/projects/ember/gallery-4.jpg", alt: "About section", caption: "Chef's story and restaurant history" },
      { src: "/images/projects/ember/gallery-5.jpg", alt: "Mobile responsive", caption: "Optimized for all devices" },
    ],
    
    features: [
      "Cinematic hero with video background",
      "Interactive menu with filtering",
      "Real-time reservation system",
      "Chef's table booking",
      "Private events inquiry",
      "Instagram feed integration",
      "Gift card purchasing",
      "Newsletter with exclusive offers",
    ],
    
    liveUrl: "/demos/ember-kitchen",
    nextProject: "velvet-perfumes",
    prevProject: "brew-co",
  },

  // ============================================================
  // 2. VELVET PERFUMES - Luxury E-commerce
  // ============================================================
  {
    id: "velvet-perfumes",
    slug: "velvet-perfumes",
    title: "Velvet Perfumes",
    subtitle: "Luxury Fragrance E-commerce",
    category: "E-commerce",
    categorySlug: "ecommerce",
    year: "2024",
    duration: "8 weeks",
    
    heroImage: "/images/projects/velvet/hero.jpg",
    
    accentColor: "#a855f7",
    gradientFrom: "#a855f7",
    gradientTo: "#7c3aed",
    
    overview: "Velvet Perfumes is a luxury fragrance house that crafts bespoke scents. They needed an e-commerce platform that communicates exclusivity while providing a smooth shopping experience. Every interaction needed to feel as luxurious as their products.",
    
    challenge: "Selling luxury fragrances online is challenging - customers can't smell the product. The website needed to convey scent through visuals, storytelling, and an immersive experience. Additionally, the checkout process needed to feel premium, not transactional.",
    
    solution: "We designed a sensory digital experience using rich visuals, elegant animations, and compelling scent stories. Each fragrance has its own narrative page with ingredient breakdowns and mood boards. The shopping experience feels like entering a high-end boutique.",
    
    stats: [
      { value: "$180K", label: "Monthly Revenue", icon: "💰" },
      { value: "42%", label: "Conversion Rate Up", icon: "📊" },
      { value: "3.8min", label: "Time on Product", icon: "⏱" },
      { value: "28%", label: "Repeat Customers", icon: "💎" },
    ],
    
    testimonial: {
      quote: "OMREX understood that we're not just selling perfume - we're selling an experience. The website captures the essence of our brand perfectly. Sales have exceeded all projections.",
      author: "Isabella Romano",
      role: "Founder & Perfumer",
      avatar: "/images/avatars/isabella.jpg",
    },
    
    techStack: ["Next.js", "Shopify Storefront API", "Framer Motion", "Tailwind CSS", "Stripe", "Klaviyo"],
    
    images: [
      { src: "/images/projects/velvet/gallery-1.jpg", alt: "Homepage showcase", caption: "Immersive product showcase" },
      { src: "/images/projects/velvet/gallery-2.jpg", alt: "Product detail page", caption: "Scent story and ingredients" },
      { src: "/images/projects/velvet/gallery-3.jpg", alt: "Collection grid", caption: "Elegant product browsing" },
      { src: "/images/projects/velvet/gallery-4.jpg", alt: "Shopping cart", caption: "Premium checkout experience" },
      { src: "/images/projects/velvet/gallery-5.jpg", alt: "Mobile experience", caption: "Luxury on every device" },
    ],
    
    features: [
      "Immersive product storytelling",
      "Scent profile quiz",
      "Virtual fragrance consultation",
      "Subscription service",
      "Gift wrapping options",
      "International shipping",
      "Loyalty rewards program",
      "Personalized recommendations",
    ],
    
    liveUrl: "https://velvet-perfumes.demo.omrex.studio",
    nextProject: "pearl-dental",
    prevProject: "ember-kitchen",
  },

  // ============================================================
  // 3. PEARL DENTAL - Healthcare Clinic
  // ============================================================
  {
    id: "pearl-dental",
    slug: "pearl-dental",
    title: "Pearl Dental",
    subtitle: "Modern Dental Care",
    category: "Healthcare",
    categorySlug: "healthcare",
    year: "2024",
    duration: "5 weeks",
    
    heroImage: "/images/projects/pearl/hero.jpg",
    
    accentColor: "#06b6d4",
    gradientFrom: "#06b6d4",
    gradientTo: "#0891b2",
    
    overview: "Pearl Dental is a modern dental clinic focused on patient comfort and cutting-edge treatments. They needed a website that would ease dental anxiety while showcasing their advanced technology and friendly team.",
    
    challenge: "Many people have dental anxiety, and clinical-looking websites can amplify those fears. Pearl Dental needed to project professionalism and expertise while feeling warm and welcoming. The booking system needed to be simple enough for patients of all ages.",
    
    solution: "We created a calming, modern design with soft colors and reassuring imagery. The website highlights the team's friendly approach and state-of-the-art facilities. The booking system is intuitive, with clear service descriptions and transparent pricing.",
    
    stats: [
      { value: "89%", label: "Online Bookings", icon: "📅" },
      { value: "156%", label: "New Patients", icon: "👥" },
      { value: "4.9★", label: "Patient Rating", icon: "⭐" },
      { value: "45%", label: "Less No-Shows", icon: "✅" },
    ],
    
    testimonial: {
      quote: "Patients often mention how the website made them feel comfortable before even walking through our doors. The online booking has transformed our practice efficiency.",
      author: "Dr. Sarah Mitchell",
      role: "Lead Dentist & Owner",
      avatar: "/images/avatars/sarah.jpg",
    },
    
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS", "Calendly API", "Twilio SMS"],
    
    images: [
      { src: "/images/projects/pearl/gallery-1.jpg", alt: "Homepage design", caption: "Welcoming first impression" },
      { src: "/images/projects/pearl/gallery-2.jpg", alt: "Services section", caption: "Clear treatment information" },
      { src: "/images/projects/pearl/gallery-3.jpg", alt: "Team profiles", caption: "Meet the friendly team" },
      { src: "/images/projects/pearl/gallery-4.jpg", alt: "Booking system", caption: "Easy appointment scheduling" },
      { src: "/images/projects/pearl/gallery-5.jpg", alt: "Patient portal", caption: "Secure patient access" },
    ],
    
    features: [
      "Calming, anxiety-reducing design",
      "Online appointment booking",
      "Treatment cost estimator",
      "Virtual consultations",
      "Patient portal access",
      "SMS appointment reminders",
      "Insurance verification",
      "Before/after gallery",
    ],
    
    liveUrl: "https://pearl-dental.demo.omrex.studio",
    nextProject: "atlas-legal",
    prevProject: "velvet-perfumes",
  },

  // ============================================================
  // 4. ATLAS LEGAL - Law Firm
  // ============================================================
  {
    id: "atlas-legal",
    slug: "atlas-legal",
    title: "Atlas Legal",
    subtitle: "Prestigious Law Firm",
    category: "Professional",
    categorySlug: "professional",
    year: "2024",
    duration: "6 weeks",
    
    heroImage: "/images/projects/atlas/hero.jpg",
    
    accentColor: "#f59e0b",
    gradientFrom: "#f59e0b",
    gradientTo: "#d97706",
    
    overview: "Atlas Legal is a prestigious law firm specializing in corporate and commercial law. They required a digital presence that conveys authority, trustworthiness, and decades of expertise while remaining approachable to potential clients.",
    
    challenge: "Law firm websites often feel either too sterile or too aggressive. Atlas Legal needed to project strength and competence without intimidating potential clients. The website also needed to clearly communicate complex practice areas and make initial consultations easy to schedule.",
    
    solution: "We designed a sophisticated website with a strong visual hierarchy that guides visitors through the firm's expertise. Deep, confident colors and refined typography establish authority, while case results and attorney profiles build trust. The consultation booking process is straightforward and confidential.",
    
    stats: [
      { value: "215%", label: "Consultation Requests", icon: "📞" },
      { value: "78%", label: "Qualified Leads", icon: "✓" },
      { value: "3.2x", label: "Site Traffic", icon: "📈" },
      { value: "#1", label: "Local SEO Rank", icon: "🏆" },
    ],
    
    testimonial: {
      quote: "Our new website positions us as the premier firm in our market. The quality of inquiries has improved dramatically - clients come to us already confident in our capabilities.",
      author: "James Harrison",
      role: "Managing Partner",
      avatar: "/images/avatars/james.jpg",
    },
    
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS", "Contentful CMS", "Calendly"],
    
    images: [
      { src: "/images/projects/atlas/gallery-1.jpg", alt: "Firm homepage", caption: "Commanding first impression" },
      { src: "/images/projects/atlas/gallery-2.jpg", alt: "Practice areas", caption: "Clear expertise presentation" },
      { src: "/images/projects/atlas/gallery-3.jpg", alt: "Attorney profiles", caption: "Team credentials showcase" },
      { src: "/images/projects/atlas/gallery-4.jpg", alt: "Case results", caption: "Proven track record" },
      { src: "/images/projects/atlas/gallery-5.jpg", alt: "Contact page", caption: "Confidential consultation booking" },
    ],
    
    features: [
      "Authority-building design",
      "Practice area deep-dives",
      "Attorney bio pages",
      "Case results showcase",
      "Confidential contact forms",
      "Resource library",
      "Client portal access",
      "Multi-language support",
    ],
    
    liveUrl: "https://atlas-legal.demo.omrex.studio",
    nextProject: "nexus-analytics",
    prevProject: "pearl-dental",
  },

  // ============================================================
  // 5. NEXUS ANALYTICS - SaaS Dashboard
  // ============================================================
  {
    id: "nexus-analytics",
    slug: "nexus-analytics",
    title: "Nexus Analytics",
    subtitle: "SaaS Analytics Platform",
    category: "Web Application",
    categorySlug: "webapp",
    year: "2024",
    duration: "10 weeks",
    
    heroImage: "/images/projects/nexus/hero.jpg",
    
    accentColor: "#3b82f6",
    gradientFrom: "#3b82f6",
    gradientTo: "#1d4ed8",
    
    overview: "Nexus Analytics is a powerful business intelligence platform that transforms complex data into actionable insights. The project included both the marketing website and the full dashboard interface with real-time data visualization.",
    
    challenge: "Data analytics platforms often overwhelm users with information. Nexus needed an interface that makes complex data accessible and actionable, while the marketing site needed to clearly communicate value to non-technical decision makers.",
    
    solution: "We designed a clean, intuitive dashboard with progressive disclosure - simple overviews that drill down into detailed analytics. The marketing website uses compelling visualizations to demonstrate value, with interactive demos that let prospects experience the product before signing up.",
    
    stats: [
      { value: "40%", label: "User Engagement Up", icon: "📊" },
      { value: "2.5x", label: "Faster Insights", icon: "⚡" },
      { value: "92%", label: "User Satisfaction", icon: "😊" },
      { value: "58%", label: "Faster Onboarding", icon: "🚀" },
    ],
    
    testimonial: {
      quote: "The dashboard redesign transformed how our users interact with data. Support tickets dropped 60% because the interface is so intuitive. It's exactly what we envisioned.",
      author: "David Park",
      role: "CEO, Nexus Analytics",
      avatar: "/images/avatars/david.jpg",
    },
    
    techStack: ["Next.js", "TypeScript", "Framer Motion", "Recharts", "D3.js", "Tailwind CSS", "Supabase"],
    
    images: [
      { src: "/images/projects/nexus/gallery-1.jpg", alt: "Dashboard overview", caption: "Clean, intuitive main dashboard" },
      { src: "/images/projects/nexus/gallery-2.jpg", alt: "Analytics charts", caption: "Beautiful data visualizations" },
      { src: "/images/projects/nexus/gallery-3.jpg", alt: "Reports section", caption: "Comprehensive reporting" },
      { src: "/images/projects/nexus/gallery-4.jpg", alt: "Settings panel", caption: "User-friendly configuration" },
      { src: "/images/projects/nexus/gallery-5.jpg", alt: "Marketing website", caption: "Conversion-focused landing page" },
    ],
    
    features: [
      "Real-time data dashboards",
      "Interactive charts & graphs",
      "Custom report builder",
      "Team collaboration tools",
      "Export & scheduling",
      "API integrations",
      "Role-based access",
      "Dark/light mode",
    ],
    
    liveUrl: "https://nexus-analytics.demo.omrex.studio",
    nextProject: "quantum-dashboard",
    prevProject: "atlas-legal",
  },

  // ============================================================
  // 6. QUANTUM DASHBOARD - Admin Panel
  // ============================================================
  {
    id: "quantum-dashboard",
    slug: "quantum-dashboard",
    title: "Quantum Dashboard",
    subtitle: "Enterprise Admin Panel",
    category: "Web Application",
    categorySlug: "webapp",
    year: "2024",
    duration: "8 weeks",
    
    heroImage: "/images/projects/quantum/hero.jpg",
    
    accentColor: "#8b5cf6",
    gradientFrom: "#8b5cf6",
    gradientTo: "#6d28d9",
    
    overview: "Quantum Dashboard is a comprehensive admin panel template designed for enterprise applications. It provides a complete toolkit for managing users, content, analytics, and system settings with a beautiful, modern interface.",
    
    challenge: "Admin panels are often an afterthought - functional but ugly. Quantum needed to prove that back-end tools can be both powerful and beautiful. The interface needed to handle complex workflows while remaining intuitive for daily use.",
    
    solution: "We created a component-rich admin system with meticulous attention to UI details. Every interaction is smooth, every state is considered. The modular architecture allows teams to customize and extend functionality while maintaining design consistency.",
    
    stats: [
      { value: "200+", label: "Components", icon: "🧩" },
      { value: "50+", label: "Page Templates", icon: "📄" },
      { value: "99.9%", label: "Uptime", icon: "⚡" },
      { value: "4.8★", label: "Developer Rating", icon: "⭐" },
    ],
    
    testimonial: {
      quote: "Quantum Dashboard saved us months of development time. The components are beautifully crafted and the code quality is exceptional. Our team actually enjoys using the admin panel now.",
      author: "Alex Rivera",
      role: "CTO, TechFlow",
      avatar: "/images/avatars/alex.jpg",
    },
    
    techStack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "Prisma", "PostgreSQL", "NextAuth"],
    
    images: [
      { src: "/images/projects/quantum/gallery-1.jpg", alt: "Main dashboard", caption: "Overview with key metrics" },
      { src: "/images/projects/quantum/gallery-2.jpg", alt: "User management", caption: "Complete user administration" },
      { src: "/images/projects/quantum/gallery-3.jpg", alt: "Data tables", caption: "Advanced table functionality" },
      { src: "/images/projects/quantum/gallery-4.jpg", alt: "Form components", caption: "Beautiful form elements" },
      { src: "/images/projects/quantum/gallery-5.jpg", alt: "Settings pages", caption: "Comprehensive settings" },
    ],
    
    features: [
      "Complete component library",
      "User management system",
      "Role & permissions",
      "Advanced data tables",
      "Form validation",
      "File management",
      "Notification system",
      "Activity logging",
    ],
    
    liveUrl: "https://quantum-dashboard.demo.omrex.studio",
    nextProject: "skyline-properties",
    prevProject: "nexus-analytics",
  },

  // ============================================================
  // 7. SKYLINE PROPERTIES - Real Estate
  // ============================================================
  {
    id: "skyline-properties",
    slug: "skyline-properties",
    title: "Skyline Properties",
    subtitle: "Luxury Real Estate",
    category: "Real Estate",
    categorySlug: "realestate",
    year: "2024",
    duration: "7 weeks",
    
    heroImage: "/images/projects/skyline/hero.jpg",
    
    accentColor: "#10b981",
    gradientFrom: "#10b981",
    gradientTo: "#059669",
    
    overview: "Skyline Properties is a luxury real estate agency specializing in premium properties across the UAE. They needed a sophisticated platform that showcases their exclusive listings while providing powerful search and filtering capabilities.",
    
    challenge: "Real estate websites are often cluttered with too many listings and poor photography. Skyline needed to present properties as aspirational lifestyle opportunities, not just square footage. The search needed to be powerful yet simple.",
    
    solution: "We designed an immersive property showcase with cinematic imagery and virtual tour integration. The search system uses intuitive filters while the map integration helps buyers understand locations. Each listing tells a lifestyle story, not just property specs.",
    
    stats: [
      { value: "285%", label: "Lead Generation", icon: "📈" },
      { value: "4.5min", label: "Avg. Time on Site", icon: "⏱" },
      { value: "73%", label: "Virtual Tour Views", icon: "🏠" },
      { value: "12", label: "Avg. Days to Sell", icon: "📅" },
    ],
    
    testimonial: {
      quote: "Our properties have never looked better online. Clients often say they felt like they'd already visited the home before the actual viewing. Inquiries from serious buyers have tripled.",
      author: "Omar Hassan",
      role: "Founder & Lead Agent",
      avatar: "/images/avatars/omar.jpg",
    },
    
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS", "Mapbox", "Matterport API", "Sanity CMS"],
    
    images: [
      { src: "/images/projects/skyline/gallery-1.jpg", alt: "Homepage showcase", caption: "Featured properties hero" },
      { src: "/images/projects/skyline/gallery-2.jpg", alt: "Property listing", caption: "Immersive property details" },
      { src: "/images/projects/skyline/gallery-3.jpg", alt: "Search interface", caption: "Powerful search & filters" },
      { src: "/images/projects/skyline/gallery-4.jpg", alt: "Map view", caption: "Interactive location mapping" },
      { src: "/images/projects/skyline/gallery-5.jpg", alt: "Virtual tour", caption: "360° property tours" },
    ],
    
    features: [
      "Cinematic property galleries",
      "360° virtual tours",
      "Advanced property search",
      "Interactive map view",
      "Mortgage calculator",
      "Agent profiles",
      "Saved searches & alerts",
      "WhatsApp integration",
    ],
    
    liveUrl: "https://skyline-properties.demo.omrex.studio",
    nextProject: "brew-co",
    prevProject: "quantum-dashboard",
  },

  // ============================================================
  // 8. BREW & CO - Coffee Shop
  // ============================================================
  {
    id: "brew-co",
    slug: "brew-co",
    title: "Brew & Co",
    subtitle: "Specialty Coffee Experience",
    category: "Restaurant",
    categorySlug: "restaurant",
    year: "2024",
    duration: "4 weeks",
    
    heroImage: "/images/projects/brew/hero.jpg",
    
    accentColor: "#78716c",
    gradientFrom: "#78716c",
    gradientTo: "#57534e",
    
    overview: "Brew & Co is a specialty coffee shop that takes their craft seriously. They needed a website that reflects their artisanal approach to coffee while driving foot traffic and online orders.",
    
    challenge: "Coffee shops are everywhere, and most websites look the same. Brew & Co needed to communicate their unique approach to sourcing and brewing while making online ordering and loyalty rewards seamless.",
    
    solution: "We created a warm, inviting design that tells the story of each coffee origin. The online ordering system is streamlined for both pickup and delivery, and the loyalty program encourages repeat visits. The aesthetic captures the cozy atmosphere of the physical shop.",
    
    stats: [
      { value: "180%", label: "Online Orders", icon: "☕" },
      { value: "2.4K", label: "Loyalty Members", icon: "👥" },
      { value: "34%", label: "Repeat Orders", icon: "🔄" },
      { value: "4.9★", label: "Customer Rating", icon: "⭐" },
    ],
    
    testimonial: {
      quote: "The website captures exactly what we're about - quality coffee in a welcoming space. Online orders have become a significant revenue stream we didn't have before.",
      author: "Emma & Jake Wilson",
      role: "Co-Founders",
      avatar: "/images/avatars/emma.jpg",
    },
    
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS", "Square API", "Sanity CMS"],
    
    images: [
      { src: "/images/projects/brew/gallery-1.jpg", alt: "Homepage design", caption: "Warm, inviting homepage" },
      { src: "/images/projects/brew/gallery-2.jpg", alt: "Menu section", caption: "Beautiful menu presentation" },
      { src: "/images/projects/brew/gallery-3.jpg", alt: "Online ordering", caption: "Seamless order process" },
      { src: "/images/projects/brew/gallery-4.jpg", alt: "Coffee origins", caption: "Bean sourcing stories" },
      { src: "/images/projects/brew/gallery-5.jpg", alt: "Loyalty program", caption: "Rewards program interface" },
    ],
    
    features: [
      "Artisanal brand storytelling",
      "Online ordering system",
      "Loyalty rewards program",
      "Bean subscription service",
      "Store locator",
      "Gift cards",
      "Event booking",
      "Instagram integration",
    ],
    
    liveUrl: "https://brew-co.demo.omrex.studio",
    nextProject: "ember-kitchen",
    prevProject: "skyline-properties",
  },
];

// -------------------------------------------------------------
// HELPER FUNCTIONS
// -------------------------------------------------------------

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === "all") return PROJECTS;
  return PROJECTS.filter((p) => p.categorySlug === category);
}

export function getAllCategories(): { slug: string; label: string }[] {
  const categories = new Set(PROJECTS.map((p) => p.categorySlug));
  const categoryLabels: Record<string, string> = {
    restaurant: "Restaurants",
    ecommerce: "E-commerce",
    healthcare: "Healthcare",
    professional: "Professional",
    webapp: "Web Applications",
    realestate: "Real Estate",
  };
  
  return [
    { slug: "all", label: "All Projects" },
    ...Array.from(categories).map((slug) => ({
      slug,
      label: categoryLabels[slug] || slug,
    })),
  ];
}

export function getAdjacentProjects(currentSlug: string): { prev: Project | null; next: Project | null } {
  const currentIndex = PROJECTS.findIndex((p) => p.slug === currentSlug);
  
  return {
    prev: currentIndex > 0 ? PROJECTS[currentIndex - 1] : PROJECTS[PROJECTS.length - 1],
    next: currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : PROJECTS[0],
  };
}  