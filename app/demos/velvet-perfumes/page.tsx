"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// =============================================================================
// THEME - Dark Mysterious Luxury
// =============================================================================

const THEME = {
  colors: {
    bg: {
      primary: "#0d0c0f",      // Brightened from #070709
      secondary: "#141318",    // Brightened from #0c0c10
      tertiary: "#1a1820",     // Brightened from #111118
      card: "rgba(20,19,24,0.85)",  // Brighter card background
      glass: "rgba(14,13,17,0.7)",  // Brighter glass effect
    },
    accent: {
      gold: "#e5b85a",         // Brighter gold
      goldLight: "#f0d08a",    // Brighter light gold
      goldMuted: "#c4a04a",    // Brighter muted gold
      goldRgb: "229, 184, 90",
      purple: "#9d6df7",       // Brighter purple
      purpleDeep: "#7c3aed",
      purpleRgb: "157, 109, 247",
      rose: "#d4267a",         // Brighter rose
    },
    text: {
      primary: "#ffffff",      // Pure white for max contrast
      secondary: "#c4c0bc",    // Brighter secondary text
      muted: "#9a958f",        // Brighter muted text
      dim: "#716c66",          // Brighter dim text
    },
    border: {
      subtle: "rgba(229,184,90,0.12)",   // More visible borders
      default: "rgba(229,184,90,0.22)",  // More visible
      hover: "rgba(229,184,90,0.45)",    // Brighter hover
    },
  },
} as const;

const EASING = {
  smooth: [0.25, 0.1, 0.25, 1],
  out: [0.16, 1, 0.3, 1],
  spring: { stiffness: 100, damping: 15 },
} as const;

// =============================================================================
// DATA
// =============================================================================

const COLLECTIONS = [
  {
    id: "oud",
    name: "Oud Collection",
    tagline: "The Ancient Soul",
    description: "Deep, woody, and intoxicating",
    image: "/images/velvet/collections/oud.jpg",
    count: 8,
    accent: "#8b4513",
  },
  {
    id: "floral",
    name: "Floral Dreams",
    tagline: "Eternal Bloom",
    description: "Elegant blooms captured in glass",
    image: "/images/velvet/collections/floral.jpg",
    count: 12,
    accent: "#db7093",
  },
  {
    id: "fresh",
    name: "Fresh Essence",
    tagline: "Morning Dew",
    description: "Crisp, clean, and invigorating",
    image: "/images/velvet/collections/fresh.jpg",
    count: 6,
    accent: "#20b2aa",
  },
  {
    id: "oriental",
    name: "Oriental Nights",
    tagline: "Mystery Unveiled",
    description: "Spicy warmth meets mystery",
    image: "/images/velvet/collections/oriental.jpg",
    count: 10,
    accent: "#9932cc",
  },
  {
    id: "unisex",
    name: "Unisex Icons",
    tagline: "Beyond Boundaries",
    description: "Pure essence, no limits",
    image: "/images/velvet/collections/unisex.jpg",
    count: 7,
    accent: "#d4a853",
  },
];

const FEATURED_SCENT = {
  id: "midnight-oud",
  name: "Midnight Oud",
  collection: "Oud Collection",
  price: 320,
  size: "100ml",
  image: "/images/velvet/products/midnight-oud.jpg",
  description: "An intoxicating journey through ancient Cambodian forests, where precious oud meets warm amber and creamy sandalwood.",
  notes: {
    top: ["Saffron", "Bergamot"],
    heart: ["Oud", "Rose", "Jasmine"],
    base: ["Amber", "Sandalwood", "Musk"],
  },
  isNew: true,
};

const PRODUCTS = [
  {
    id: "midnight-oud",
    name: "Midnight Oud",
    price: 320,
    image: "/images/velvet/products/midnight-oud.jpg",
    isNew: true,
    isBestseller: true,
  },
  {
    id: "velvet-rose",
    name: "Velvet Rose",
    price: 280,
    image: "/images/velvet/products/velvet-rose.jpg",
    isNew: false,
    isBestseller: true,
  },
  {
    id: "noir-intense",
    name: "Noir Intense",
    price: 350,
    image: "/images/velvet/products/noir-intense.jpg",
    isNew: true,
    isBestseller: false,
  },
  {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    price: 220,
    image: "/images/velvet/products/ocean-breeze.jpg",
    isNew: false,
    isBestseller: false,
  },
];

const INGREDIENTS = [
  { name: "Cambodian Oud", origin: "Cambodia", description: "Liquid gold of the forest" },
  { name: "Bulgarian Rose", origin: "Bulgaria", description: "Queen of flowers" },
  { name: "Persian Saffron", origin: "Iran", description: "Red gold threads" },
  { name: "Indian Sandalwood", origin: "Mysore", description: "Sacred wood" },
  { name: "Baltic Amber", origin: "Baltic Sea", description: "Fossilized sunlight" },
  { name: "Madagascar Vanilla", origin: "Madagascar", description: "Black orchid essence" },
];

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Midnight Oud is not just a fragrance—it's a statement. I've never received so many compliments.",
    author: "Alexandra M.",
    location: "Dubai, UAE",
    rating: 5,
  },
  {
    id: 2,
    quote: "The longevity is incredible. One spray in the morning, and I still smell divine at midnight.",
    author: "James K.",
    location: "London, UK",
    rating: 5,
  },
  {
    id: 3,
    quote: "Velvet Rose is pure elegance in a bottle. It's become my signature—people recognize me by it.",
    author: "Sofia L.",
    location: "Paris, France",
    rating: 5,
  },
];

// =============================================================================
// UTILITY HOOKS
// =============================================================================


function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

// =============================================================================
// REUSABLE COMPONENTS
// =============================================================================

// Animated Gradient Orbs
function AmbientOrbs({ variant = "default" }: { variant?: "default" | "purple" | "mixed" }) {
  const colors = {
    default: [THEME.colors.accent.goldRgb, THEME.colors.accent.goldRgb],
    purple: [THEME.colors.accent.purpleRgb, THEME.colors.accent.purpleRgb],
    mixed: [THEME.colors.accent.goldRgb, THEME.colors.accent.purpleRgb],
  };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-[20%] top-[10%] h-[600px] w-[600px] rounded-full opacity-30"
        style={{
          background: `radial-gradient(circle, rgba(${colors[variant][0]}, 0.15), transparent 70%)`,
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 80, 0],
          y: [0, 40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[10%] top-[50%] h-[500px] w-[500px] rounded-full opacity-20"
        style={{
          background: `radial-gradient(circle, rgba(${colors[variant][1]}, 0.12), transparent 70%)`,
          filter: "blur(100px)",
        }}
        animate={{
          x: [0, -60, 0],
          y: [0, -80, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />
    </div>
  );
}

// Smoke/Mist Effect
function SmokeLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${400 + i * 150}px`,
            height: `${400 + i * 150}px`,
            background: `radial-gradient(circle, rgba(${THEME.colors.accent.purpleRgb}, ${0.04 - i * 0.008}), transparent 60%)`,
            filter: "blur(60px)",
            left: `${10 + i * 20}%`,
            top: `${5 + i * 15}%`,
          }}
          animate={{
            x: [0, 60 + i * 20, 0],
            y: [0, 30 + i * 10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 18 + i * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 3,
          }}
        />
      ))}
    </div>
  );
}

// Golden Floating Particles
type Particle = {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
};

function GoldenParticles({
  count = 40,
  area = "full",
}: {
  count?: number;
  area?: "full" | "bottom";
}) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const list: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: area === "bottom" ? 60 + Math.random() * 40 : Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 15,
      drift: Math.random() * 40 - 20,
    }));

    setParticles(list);
  }, [count, area]);

  if (particles.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: THEME.colors.accent.gold,
            boxShadow: `0 0 ${p.size * 4}px rgba(${THEME.colors.accent.goldRgb}, 0.6)`,
          }}
          animate={{
            y: [0, -150, -300],
            x: [0, p.drift, p.drift * 1.5],
            opacity: [0, 0.9, 0],
            scale: [0.5, 1, 0.3],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

// Section Label Component
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="mb-6 flex items-center justify-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.span
        className="h-px w-12"
        style={{ background: `linear-gradient(90deg, transparent, ${THEME.colors.accent.gold})` }}
        initial={{ width: 0 }}
        whileInView={{ width: 48 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      <span
        className="text-[0.65rem] font-medium uppercase tracking-[0.4em]"
        style={{ color: THEME.colors.accent.gold }}
      >
        {children}
      </span>
      <motion.span
        className="h-px w-12"
        style={{ background: `linear-gradient(90deg, ${THEME.colors.accent.gold}, transparent)` }}
        initial={{ width: 0 }}
        whileInView={{ width: 48 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      />
    </motion.div>
  );
}

// Section Title Component
function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.h2
      className={`text-center text-[2rem] font-extralight leading-tight sm:text-[2.8rem] lg:text-[3.2rem] ${className}`}
      style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      {children}
    </motion.h2>
  );
}

// Magnetic Button
function MagneticButton({
  children,
  href,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const measureRef = useRef<HTMLElement | null>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  // ✅ Ref callbacks typed per element (fix TS)
  const setDivRef = (el: HTMLDivElement | null) => {
    measureRef.current = el;
  };
  const setButtonRef = (el: HTMLButtonElement | null) => {
    measureRef.current = el;
  };

  const styles = {
    primary: {
      background: `linear-gradient(135deg, ${THEME.colors.accent.gold}, ${THEME.colors.accent.goldMuted})`,
      color: THEME.colors.bg.primary,
      borderWidth: 0,
      borderStyle: "solid" as const,
      borderColor: "transparent",
    },
    secondary: {
      background: "transparent",
      color: THEME.colors.text.primary,
      borderWidth: 1,
      borderStyle: "solid" as const,
      borderColor: THEME.colors.border.default,
    },
    ghost: {
      background: "transparent",
      color: THEME.colors.accent.gold,
      borderWidth: 0,
      borderStyle: "solid" as const,
      borderColor: "transparent",
    },
  } as const;

  const baseClass =
    "relative inline-flex items-center gap-3 px-8 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.2em] overflow-hidden";

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = measureRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const sharedInner = (
    <>
      <span className="relative z-10">{children}</span>

      {variant === "primary" && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: hovered ? "100%" : "-100%" }}
          transition={{ duration: 0.6 }}
        />
      )}
    </>
  );

  // ✅ Link case (no legacyBehavior, no motion.a)
  if (href) {
    return (
      <motion.div
        ref={setDivRef}
        className="relative inline-block"
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link
          href={href}
          className={`${baseClass} ${className}`}
          style={{
            ...styles[variant],
            ...(variant === "secondary" && hovered
              ? {
                borderColor: THEME.colors.border.hover,
                background: `rgba(${THEME.colors.accent.goldRgb}, 0.05)`,
              }
              : {}),
          }}
        >
          {sharedInner}
        </Link>
      </motion.div>
    );
  }

  // ✅ Button case
  return (
    <motion.button
      ref={setButtonRef}
      type="button"
      className={`${baseClass} ${className}`}
      style={{ ...styles[variant], x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={
        variant === "secondary"
          ? { borderColor: THEME.colors.border.hover, background: `rgba(${THEME.colors.accent.goldRgb}, 0.05)` }
          : { scale: 1.02 }
      }
      whileTap={{ scale: 0.98 }}
    >
      {sharedInner}
    </motion.button>
  );
}



// =============================================================================
// NAVBAR
// =============================================================================

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);


  const navLinks = [
    { name: "Brands", href: "/demos/velvet-perfumes/brands" },
    { name: "Fragrances", href: "/demos/velvet-perfumes/fragrances" },
    { name: "Our Story", href: "/demos/velvet-perfumes/our-story" },
    { name: "Boutiques", href: "/demos/velvet-perfumes/boutiques" },
  ];

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          background: scrolled ? `${THEME.colors.bg.primary}f0` : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? `1px solid ${THEME.colors.border.subtle}` : "none",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          {/* Logo */}
          <Link href="/demos/velvet-perfumes" className="group relative z-10">
            <motion.div whileHover={{ opacity: 0.8 }}>
              <span
                className="text-[1.4rem] font-extralight tracking-[0.25em]"
                style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
              >
                VELVET
              </span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 lg:flex">
            {navLinks.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="group relative py-2"
                >
                  <span
                    className="text-[0.7rem] uppercase tracking-[0.2em] transition-colors duration-300"
                    style={{ color: THEME.colors.text.secondary }}
                  >
                    {item.name}
                  </span>
                  <motion.span
                    className="absolute -bottom-0 left-0 h-px w-full origin-left"
                    style={{ background: THEME.colors.accent.gold }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-5">
            {/* Search */}
            <motion.button
              className="hidden sm:block"
              aria-label="Search"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{ color: THEME.colors.text.secondary }}
            >
              <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.button>

            {/* Cart */}
            <Link href="/demos/velvet-perfumes/shop" className="relative" aria-label="Cart">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} style={{ color: THEME.colors.text.secondary }}>
                <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span
                  className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full text-[0.55rem] font-semibold"
                  style={{ background: THEME.colors.accent.gold, color: THEME.colors.bg.primary }}
                >
                  2
                </span>
              </motion.div>
            </Link>

            {/* Mobile Toggle */}
            <motion.button
              className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}

              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="h-px w-5 origin-center"
                style={{ background: THEME.colors.text.primary }}
                animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 4 : 0 }}
              />
              <motion.span
                className="h-px w-5"
                style={{ background: THEME.colors.text.primary }}
                animate={{ opacity: mobileOpen ? 0 : 1 }}
              />
              <motion.span
                className="h-px w-5 origin-center"
                style={{ background: THEME.colors.text.primary }}
                animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -4 : 0 }}
              />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center lg:hidden"
            style={{ background: THEME.colors.bg.primary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-[1.5rem] font-light tracking-[0.1em]"
                    style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// =============================================================================
// HERO SECTION
// =============================================================================

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -50]);

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden" style={{ background: THEME.colors.bg.primary }}>
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image src="/images/velvet/hero-bg.jpg" alt="Velvet Perfumes" fill sizes="100vw" className="object-cover" priority quality={95} />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to bottom, ${THEME.colors.bg.primary}25 0%, ${THEME.colors.bg.primary}40 70%, ${THEME.colors.bg.primary} 100%)` }}
        />
      </motion.div>

      {/* Ambient Effects */}
      <SmokeLayer />
      <GoldenParticles count={50} />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(3,3,4,0.35) 100%)" }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        style={{ opacity, y: textY }}
      >
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <span
            className="inline-flex items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.5em]"
            style={{ color: THEME.colors.accent.gold }}
          >
            <span className="h-px w-8" style={{ background: THEME.colors.accent.gold }} />
            Maison de Parfum
            <span className="h-px w-8" style={{ background: THEME.colors.accent.gold }} />
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7 }}
        >
          <span
            className="block text-[3.5rem] font-extralight leading-[0.95] tracking-[0.02em] sm:text-[5rem] lg:text-[7rem]"
            style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
          >
            Velvet
          </span>
          <span
            className="mt-2 block text-[2.5rem] font-extralight italic tracking-[0.15em] sm:text-[3.5rem] lg:text-[4.5rem]"
            style={{ color: THEME.colors.accent.gold, fontFamily: "'Playfair Display', serif" }}
          >
            Perfumes
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="mb-12 max-w-lg text-[1rem] font-light leading-relaxed sm:text-[1.15rem]"
          style={{ color: THEME.colors.text.secondary }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          Where every drop whispers a secret.
          <br />
          <span style={{ color: THEME.colors.text.primary }}>Discover your signature.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col gap-5 sm:flex-row sm:gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <MagneticButton href="/demos/velvet-perfumes/collections" variant="primary">
            Explore Collections
          </MagneticButton>
          <MagneticButton href="/demos/velvet-perfumes/bestsellers" variant="secondary">
            Shop Bestsellers
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ opacity }}
      >
        <motion.div
          className="flex flex-col items-center gap-4"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[0.6rem] uppercase tracking-[0.35em]" style={{ color: THEME.colors.text.muted }}>
            Discover
          </span>
          <motion.div
            className="h-16 w-px"
            style={{ background: `linear-gradient(to bottom, ${THEME.colors.accent.gold}, transparent)` }}
            animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Side Text */}
      <motion.div
        className="absolute left-8 top-1/2 hidden -translate-y-1/2 lg:block"
        style={{ writingMode: "vertical-rl" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[0.6rem] uppercase tracking-[0.4em]" style={{ color: THEME.colors.text.dim }}>
          Est. 2024 — Luxury Fragrances
        </span>
      </motion.div>

      <motion.div
        className="absolute right-8 top-1/2 hidden -translate-y-1/2 lg:block"
        style={{ writingMode: "vertical-rl" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[0.6rem] uppercase tracking-[0.4em]" style={{ color: THEME.colors.text.dim }}>
          Dubai — Paris — London
        </span>
      </motion.div>
    </section>
  );
}

// =============================================================================
// FEATURED SCENT SECTION
// =============================================================================

function FeaturedScentSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [activeNoteIndex, setActiveNoteIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const allNotes = [...FEATURED_SCENT.notes.top, ...FEATURED_SCENT.notes.heart, ...FEATURED_SCENT.notes.base];
  const noteCategories = [
    { label: "TOP", notes: FEATURED_SCENT.notes.top, color: "#FFD700" },
    { label: "HEART", notes: FEATURED_SCENT.notes.heart, color: "#FF69B4" },
    { label: "BASE", notes: FEATURED_SCENT.notes.base, color: "#8B4513" },
  ];

  // Note images mapping
  const NOTE_IMAGES: Record<string, string> = {
    Saffron: "/images/velvet/notes/saffron.jpg",
    Bergamot: "/images/velvet/notes/bergamot.jpg",
    Rose: "/images/velvet/notes/rose.jpg",
    Jasmine: "/images/velvet/notes/jasmine.jpg",
    Oud: "/images/velvet/notes/oud.jpg",
    Amber: "/images/velvet/notes/amber.jpg",
    Sandalwood: "/images/velvet/notes/sandalwood.jpg",
    Musk: "/images/velvet/notes/musk.jpg",
  };

  const activeNote = allNotes[activeNoteIndex];
  const activeNoteImage = activeNote ? NOTE_IMAGES[activeNote] : undefined;

  // Auto-rotate notes
  useEffect(() => {
    if (shouldReduceMotion || !isInView || allNotes.length === 0) return;
    const interval = setInterval(() => {
      setActiveNoteIndex((prev) => (prev + 1) % allNotes.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [shouldReduceMotion, isInView, allNotes.length]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
      style={{ background: THEME.colors.bg.primary }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(${THEME.colors.accent.goldRgb}, 0.05) 0%, transparent 60%)`,
        }}
      />

      {/* Golden particles - reduced */}
      <GoldenParticles count={isMobile ? 8 : 15} />

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Section Label */}
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3">
            <span
              className="h-px w-6 sm:w-10"
              style={{ background: `linear-gradient(90deg, transparent, ${THEME.colors.accent.gold})` }}
            />
            <span
              className="text-[0.6rem] sm:text-[0.65rem] font-medium uppercase tracking-[0.35em]"
              style={{ color: THEME.colors.accent.gold }}
            >
              ✦ The Signature ✦
            </span>
            <span
              className="h-px w-6 sm:w-10"
              style={{ background: `linear-gradient(90deg, ${THEME.colors.accent.gold}, transparent)` }}
            />
          </div>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Product Image - Smaller */}
          <motion.div
            className="relative mx-auto w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[320px]"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div
              className="relative aspect-[3/4] rounded-xl overflow-hidden"
              style={{
                background: `linear-gradient(145deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)`,
                border: `1px solid ${THEME.colors.border.subtle}`,
                boxShadow: `0 20px 60px -15px rgba(0,0,0,0.4), 0 0 40px -10px rgba(${THEME.colors.accent.goldRgb}, 0.15)`,
              }}
            >
              {/* Note Image Background - changes with active note */}
              <AnimatePresence mode="wait">
                {activeNoteImage && (
                  <motion.div
                    key={activeNoteImage}
                    className="absolute inset-0 z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={activeNoteImage}
                      alt={activeNote}
                      fill
                      sizes="320px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Glow */}
              <div
                className="absolute inset-0 z-1"
                style={{
                  background: `radial-gradient(ellipse 70% 80% at 50% 60%, rgba(${THEME.colors.accent.goldRgb}, 0.12) 0%, transparent 60%)`,
                }}
              />

              {/* Bottle Image */}
              <motion.div
                className="relative z-10 h-full w-full"
                animate={{ y: shouldReduceMotion ? 0 : [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src={FEATURED_SCENT.image}
                  alt={FEATURED_SCENT.name}
                  fill
                  sizes="320px"
                  className="object-contain p-4 sm:p-5"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* New Badge */}
            {FEATURED_SCENT.isNew && (
              <span
                className="inline-block mb-3 px-3 py-1 text-[0.5rem] sm:text-[0.55rem] font-bold uppercase tracking-[0.15em]"
                style={{
                  background: THEME.colors.accent.gold,
                  color: THEME.colors.bg.primary,
                }}
              >
                ★ New
              </span>
            )}

            {/* Collection */}
            <p
              className="mb-2 text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.25em]"
              style={{ color: THEME.colors.text.muted }}
            >
              {FEATURED_SCENT.collection}
            </p>

            {/* Product Name */}
            <h2
              className="mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span
                className="block text-[1.8rem] sm:text-[2.2rem] lg:text-[2.5rem] font-extralight leading-[1.1]"
                style={{ color: THEME.colors.text.primary }}
              >
                {FEATURED_SCENT.name.split(' ')[0]}
              </span>
              <span
                className="block text-[1.5rem] sm:text-[1.8rem] lg:text-[2rem] font-extralight italic mt-1"
                style={{ color: THEME.colors.accent.gold }}
              >
                {FEATURED_SCENT.name.split(' ').slice(1).join(' ')}
              </span>
            </h2>

            {/* Description */}
            <p
              className="mb-6 text-[0.85rem] sm:text-[0.9rem] leading-relaxed max-w-md mx-auto lg:mx-0"
              style={{ color: THEME.colors.text.secondary }}
            >
              {FEATURED_SCENT.description}
            </p>

            {/* Notes Pyramid - Compact */}
            <div className="mb-6 space-y-2">
              {noteCategories.map((category, catIndex) => (
                <div
                  key={category.label}
                  className="flex items-center gap-3 sm:gap-4 justify-center lg:justify-start"
                >
                  <div className="flex items-center gap-1.5 min-w-[55px] sm:min-w-[65px]">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: category.color }}
                    />
                    <span
                      className="text-[0.5rem] sm:text-[0.55rem] uppercase tracking-[0.1em]"
                      style={{ color: THEME.colors.text.dim }}
                    >
                      {category.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {category.notes.map((note, noteIndex) => {
                      const globalIndex = noteCategories
                        .slice(0, catIndex)
                        .reduce((acc, c) => acc + c.notes.length, 0) + noteIndex;
                      const isActive = globalIndex === activeNoteIndex;

                      return (
                        <span
                          key={note}
                          className="text-[0.75rem] sm:text-[0.8rem] cursor-pointer transition-all duration-300"
                          style={{
                            color: isActive ? THEME.colors.accent.gold : THEME.colors.text.primary,
                            textShadow: isActive ? `0 0 8px rgba(${THEME.colors.accent.goldRgb}, 0.4)` : 'none',
                          }}
                          onClick={() => setActiveNoteIndex(globalIndex)}
                        >
                          {note}{noteIndex < category.notes.length - 1 && " · "}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Price & CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
              <div className="text-center sm:text-left">
                <span
                  className="block text-[2rem] sm:text-[2.2rem] font-extralight leading-none"
                  style={{
                    color: THEME.colors.accent.gold,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  ${FEATURED_SCENT.price}
                </span>
                <span
                  className="text-[0.55rem] uppercase tracking-[0.1em]"
                  style={{ color: THEME.colors.text.muted }}
                >
                  {FEATURED_SCENT.size} / EDP
                </span>
              </div>

              <MagneticButton
                href={`/demos/velvet-perfumes/fragrances/${FEATURED_SCENT.id}`}
                variant="primary"
              >
                Discover →
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// COLLECTIONS SECTION
// =============================================================================

function CollectionsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-4 py-16 sm:py-24 lg:py-32 sm:px-6 lg:px-8"
      style={{ background: THEME.colors.bg.secondary }}
    >
      <GoldenParticles count={15} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionLabel>✦ Collections ✦</SectionLabel>
        <SectionTitle>
          Find Your <span style={{ fontStyle: "italic", color: THEME.colors.accent.gold }}>Essence</span>
        </SectionTitle>

        {/* Collections Grid - 2 cols on mobile */}
        <div className="mt-10 sm:mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          {COLLECTIONS.map((collection, i) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <CollectionCard collection={collection} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionCard({ collection, index }: { collection: (typeof COLLECTIONS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-30% 0px -30% 0px" });
  const [hovered, setHovered] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Auto-hover on mobile when in view
  const isActive = isMobile ? isInView : hovered;

  return (
    <Link href={`/demos/velvet-perfumes/collections/${collection.id}`}>
      <motion.div
        ref={ref}
        className="group relative aspect-[3/4] sm:aspect-[3/4] cursor-pointer overflow-hidden rounded-lg sm:rounded-xl"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={!isMobile ? { y: -6 } : {}}
        transition={{ duration: 0.3 }}
      >
        {/* Image - brighter */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isActive ? 1.08 : 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover"
          />
        </motion.div>

        {/* Gradient Overlay - Very light, only at bottom for text */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${THEME.colors.bg.primary}e0 0%, ${THEME.colors.bg.primary}40 25%, transparent 50%)`
          }}
        />

        {/* Accent Line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px]"
          style={{ background: collection.accent }}
          initial={{ width: "20%" }}
          animate={{ width: isActive ? "100%" : "20%" }}
          transition={{ duration: 0.4 }}
        />

        {/* Content - Compact for mobile */}
        <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
          <motion.p
            className="mb-0.5 sm:mb-1 text-[0.5rem] sm:text-[0.55rem] uppercase tracking-[0.15em]"
            style={{ color: THEME.colors.text.dim }}
            animate={{ opacity: isActive ? 1 : 0.6 }}
          >
            {collection.count} Fragrances
          </motion.p>

          <h3
            className="mb-0.5 sm:mb-1 text-[0.85rem] sm:text-[1.05rem] font-light leading-tight"
            style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
          >
            {collection.name}
          </h3>

          <p
            className="text-[0.55rem] sm:text-[0.65rem] hidden sm:block"
            style={{ color: THEME.colors.text.muted }}
          >
            {collection.tagline}
          </p>

          {/* Arrow - shows on active */}
          <motion.div
            className="mt-2 sm:mt-3 flex items-center gap-1.5"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
            transition={{ duration: 0.25 }}
          >
            <span
              className="text-[0.5rem] sm:text-[0.55rem] uppercase tracking-[0.15em]"
              style={{ color: THEME.colors.accent.gold }}
            >
              Explore
            </span>
            <span style={{ color: THEME.colors.accent.gold }} className="text-[0.7rem]">→</span>
          </motion.div>
        </div>

        {/* Border */}
        <motion.div
          className="absolute inset-0 rounded-lg sm:rounded-xl"
          style={{ border: `1px solid ${isActive ? THEME.colors.border.hover : THEME.colors.border.subtle}` }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </Link>
  );
}

// =============================================================================
// SHOP BY GENDER SECTION
// =============================================================================

function ShopByGenderSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const categories = [
    { id: "women", label: "For Her", subtitle: "Elegance Defined", image: "/images/velvet/for-her.jpg" },
    { id: "men", label: "For Him", subtitle: "Bold & Refined", image: "/images/velvet/for-him.jpg" },
    { id: "unisex", label: "Unisex", subtitle: "Beyond Boundaries", image: "/images/velvet/unisex.jpg" },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-6 py-32 lg:px-8"
      style={{ background: THEME.colors.bg.primary }}
    >
      <AmbientOrbs variant="purple" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionLabel>✦ Shop By ✦</SectionLabel>
        <SectionTitle>
          Discover Your <span style={{ fontStyle: "italic", color: THEME.colors.accent.gold }}>Match</span>
        </SectionTitle>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              <GenderCard category={cat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GenderCard({ category }: { category: { id: string; label: string; subtitle: string; image: string } }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/demos/velvet-perfumes/fragrances?gender=${category.id}`}>
      <motion.div
        className="group relative aspect-[4/5] cursor-pointer overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image src={category.image} alt={category.label} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        </motion.div>

        {/* Overlay - Lighter for better visibility */}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${THEME.colors.bg.primary}99 0%, transparent 50%)` }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.div animate={{ y: hovered ? -12 : 0 }} transition={{ duration: 0.4 }}>
            <h3
              className="text-[2rem] font-extralight tracking-[0.05em] sm:text-[2.5rem]"
              style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
            >
              {category.label}
            </h3>
            <p className="mt-1 text-[0.7rem] uppercase tracking-[0.25em]" style={{ color: THEME.colors.text.muted }}>
              {category.subtitle}
            </p>

            <motion.div
              className="mt-6 flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-[0.65rem] uppercase tracking-[0.2em]" style={{ color: THEME.colors.accent.gold }}>
                Shop Now
              </span>
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }} style={{ color: THEME.colors.accent.gold }}>
                →
              </motion.span>
            </motion.div>
          </motion.div>
        </div>

        {/* Border */}
        <div
          className="absolute inset-0 transition-all duration-300"
          style={{ border: `1px solid ${hovered ? THEME.colors.accent.gold : THEME.colors.border.subtle}` }}
        />
      </motion.div>
    </Link>
  );
}

// =============================================================================
// INGREDIENTS SECTION
// =============================================================================

function IngredientsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-6 py-32 lg:px-8"
      style={{ background: THEME.colors.bg.secondary }}
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionLabel>✦ The Finest ✦</SectionLabel>
        <SectionTitle>
          Sourced from <span style={{ fontStyle: "italic", color: THEME.colors.accent.gold }}>the World</span>
        </SectionTitle>

        <motion.p
          className="mx-auto mt-6 max-w-xl text-center text-[0.95rem]"
          style={{ color: THEME.colors.text.secondary }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          We travel the globe to source the rarest and most precious ingredients for our fragrances.
        </motion.p>

        {/* Ingredients Grid */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {INGREDIENTS.map((ing, i) => (
            <motion.div
              key={ing.name}
              className="group relative overflow-hidden p-6 text-center backdrop-blur-md"
              style={{ background: 'rgba(28,26,32,0.85)', border: `1px solid ${THEME.colors.border.default}` }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ borderColor: THEME.colors.border.hover, y: -5 }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle at 50% 50%, rgba(${THEME.colors.accent.goldRgb}, 0.08), transparent 70%)` }}
              />

              <h4 className="relative mb-2 text-[0.85rem] font-medium" style={{ color: THEME.colors.text.primary }}>
                {ing.name}
              </h4>
              <p className="relative text-[0.6rem] uppercase tracking-[0.15em]" style={{ color: THEME.colors.accent.gold }}>
                {ing.origin}
              </p>
              <p className="relative mt-2 text-[0.65rem]" style={{ color: THEME.colors.text.dim }}>
                {ing.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// TESTIMONIALS SECTION
// =============================================================================

function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();


  useEffect(() => {
    if (shouldReduceMotion || !isInView) {
      setActive(0);
      return;
    }

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [shouldReduceMotion, isInView]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-6 py-32 lg:px-8"
      style={{ background: THEME.colors.bg.primary }}
    >
      <AmbientOrbs variant="purple" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <SectionLabel>✦ Testimonials ✦</SectionLabel>
        <SectionTitle>
          What They <span style={{ fontStyle: "italic", color: THEME.colors.accent.gold }}>Say</span>
        </SectionTitle>

        {/* Testimonial Card */}
        <div className="relative mt-16 h-[320px]">
          <AnimatePresence mode="wait">
            {TESTIMONIALS.map(
              (t, i) =>
                i === active && (
                  <motion.div
                    key={t.id}
                    className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center backdrop-blur-md sm:p-12"
                    style={{ background: THEME.colors.bg.glass, border: `1px solid ${THEME.colors.border.subtle}` }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Stars */}
                    <div className="mb-6 flex gap-1.5">
                      {[...Array(t.rating)].map((_, j) => (
                        <motion.span
                          key={j}
                          style={{ color: THEME.colors.accent.gold }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: j * 0.1 }}
                        >
                          ★
                        </motion.span>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote
                      className="mb-8 max-w-lg text-[1.15rem] font-light leading-relaxed sm:text-[1.3rem]"
                      style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
                    >
                      "{t.quote}"
                    </blockquote>

                    {/* Author */}
                    <p className="text-[0.85rem] font-medium" style={{ color: THEME.colors.text.primary }}>
                      {t.author}
                    </p>
                    <p className="text-[0.65rem] uppercase tracking-[0.2em]" style={{ color: THEME.colors.text.muted }}>
                      {t.location}
                    </p>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="mt-8 flex justify-center gap-3">
          {TESTIMONIALS.map((_, i) => (
            <motion.button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              className="relative h-2 w-2 rounded-full"
              style={{ background: i === active ? THEME.colors.accent.gold : THEME.colors.text.dim }}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// NEWSLETTER SECTION
// =============================================================================

function NewsletterSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-6 py-32 lg:px-8"
      style={{ background: THEME.colors.bg.secondary }}
    >
      <GoldenParticles count={15} />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <SectionLabel>✦ Stay Connected ✦</SectionLabel>
          <SectionTitle>
            Join the <span style={{ fontStyle: "italic", color: THEME.colors.accent.gold }}>Inner Circle</span>
          </SectionTitle>

          <p className="mx-auto mt-6 max-w-md text-[0.95rem]" style={{ color: THEME.colors.text.secondary }}>
            Be the first to discover new releases, exclusive offers, and the stories behind our scents.
          </p>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <motion.div
              className="relative flex-1"
              animate={{ borderColor: focused ? THEME.colors.border.hover : THEME.colors.border.default }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Enter your email"
                className="w-full px-6 py-4 text-[0.85rem] outline-none transition-all duration-300"
                style={{
                  background: THEME.colors.bg.primary,
                  border: `1px solid ${focused ? THEME.colors.border.hover : THEME.colors.border.default}`,
                  color: THEME.colors.text.primary,
                }}
              />
            </motion.div>

            <MagneticButton variant="primary">Subscribe</MagneticButton>
          </form>

          <p className="mt-6 text-[0.65rem]" style={{ color: THEME.colors.text.dim }}>
            By subscribing, you agree to receive marketing communications from Velvet Perfumes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// FOOTER
// =============================================================================

function Footer() {
  const footerLinks = [
    {
      title: "Shop",
      links: [
        { name: "All Fragrances", href: "/demos/velvet-perfumes/fragrances" },
        { name: "Dior", href: "/demos/velvet-perfumes/brands/dior" },
        { name: "Chanel", href: "/demos/velvet-perfumes/brands/chanel" },
        { name: "Tom Ford", href: "/demos/velvet-perfumes/brands/tom-ford" },
        { name: "Gift Sets", href: "/demos/velvet-perfumes/shop" },
      ]
    },
    {
      title: "Brands",
      links: [
        { name: "All Brands", href: "/demos/velvet-perfumes/brands" },
        { name: "Dior", href: "/demos/velvet-perfumes/brands/dior" },
        { name: "Chanel", href: "/demos/velvet-perfumes/brands/chanel" },
        { name: "Tom Ford", href: "/demos/velvet-perfumes/brands/tom-ford" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "Our Story", href: "/demos/velvet-perfumes/our-story" },
        { name: "Boutiques", href: "/demos/velvet-perfumes/boutiques" },
        { name: "Sustainability", href: "#" },
        { name: "Careers", href: "#" },
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: "#" },
        { name: "FAQs", href: "#" },
        { name: "Shipping", href: "#" },
        { name: "Returns", href: "#" },
      ]
    },
  ];

  return (
    <footer className="px-6 py-20 lg:px-8" style={{ background: THEME.colors.bg.primary, borderTop: `1px solid ${THEME.colors.border.subtle}` }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3
              className="mb-5 text-[1.8rem] font-extralight tracking-[0.15em]"
              style={{ color: THEME.colors.text.primary, fontFamily: "'Playfair Display', serif" }}
            >
              VELVET
            </h3>
            <p className="mb-6 text-[0.85rem] leading-relaxed" style={{ color: THEME.colors.text.muted }}>
              Luxury fragrances crafted for those who dare to be remembered.
            </p>
            <div className="flex gap-5">
              {["IG", "FB", "TW"].map((s) => (
                <motion.a
                  key={s}
                  href="#"
                  className="text-[0.7rem] uppercase tracking-[0.1em]"
                  style={{ color: THEME.colors.text.muted }}
                  whileHover={{ color: THEME.colors.accent.gold }}
                >
                  {s}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="mb-5 text-[0.7rem] uppercase tracking-[0.25em]" style={{ color: THEME.colors.text.primary }}>
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[0.8rem] transition-colors hover:text-[#d4a853]"
                      style={{ color: THEME.colors.text.muted }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          className="mt-16 flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row"
          style={{ borderTop: `1px solid ${THEME.colors.border.subtle}` }}
        >
          <p className="text-[0.65rem]" style={{ color: THEME.colors.text.dim }}>
            © 2024 Velvet Perfumes. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="text-[0.65rem]"
                style={{ color: THEME.colors.text.dim }}
                whileHover={{ color: THEME.colors.accent.gold }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function VelvetPerfumesPage() {
  const shouldReduceMotion = useReducedMotion();
  const isCoarsePointer = useMediaQuery("(pointer: coarse)");
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shouldReduceMotion || isCoarsePointer) return;

    const el = glowRef.current;
    if (!el) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let raf = 0;

    const paint = () => {
      raf = 0;
      el.style.background = `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, rgba(${THEME.colors.accent.goldRgb}, 0.04), transparent 40%)`;
    };

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!raf) raf = window.requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [shouldReduceMotion, isCoarsePointer]);

  return (
    <main className="relative min-h-screen overflow-hidden" style={{ background: THEME.colors.bg.primary }}>
      {!shouldReduceMotion && !isCoarsePointer && (
        <div ref={glowRef} className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-500" />
      )}

      <div
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <Navbar />
      <HeroSection />
      <FeaturedScentSection />
      <CollectionsSection />
      <ShopByGenderSection />
      <IngredientsSection />
      <TestimonialsSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}