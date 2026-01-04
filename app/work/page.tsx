"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// =============================================================================
// TYPES
// =============================================================================

type Project = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  categorySlug: string;
  overview: string;
  heroImage: string;
  accentColor: string;
  techStack: string[];
  stats: { value: string; label: string }[];
  isFeatured?: boolean;
};

type Category = {
  slug: string;
  label: string;
};

// =============================================================================
// THEME & CONSTANTS
// =============================================================================

const EASING = [0.16, 1, 0.3, 1] as const;

const THEME = {
  primary: "#f59e0b",
  primaryLight: "#fbbf24",
  primaryDark: "#d97706",
  primaryRgb: "245, 158, 11",
  text: {
    primary: "#f8fafc",
    secondary: "#a1a1aa",
    muted: "#71717a",
    dark: "#52525b",
  },
  bg: {
    dark: "#030303",
    card: "rgba(10, 10, 10, 0.6)",
  },
  border: {
    default: "rgba(255, 255, 255, 0.05)",
    hover: "rgba(245, 158, 11, 0.3)",
  },
  glow: {
    soft: "rgba(245, 158, 11, 0.1)",
    medium: "rgba(245, 158, 11, 0.2)",
  },
} as const;

// =============================================================================
// DATA - Projects
// =============================================================================

const CATEGORIES: Category[] = [
  { slug: "all", label: "All" },
  { slug: "restaurant", label: "Restaurant" },
  { slug: "healthcare", label: "Healthcare" },
  { slug: "luxury", label: "Luxury" },
  { slug: "saas", label: "SaaS" },
];

const PROJECTS: Project[] = [
  {
    id: "1",
    slug: "ember-kitchen",
    title: "Ember Kitchen",
    subtitle: "A cinematic dining experience brought to life online",
    category: "Restaurant",
    categorySlug: "restaurant",
    overview:
      "Complete digital transformation for an upscale restaurant, featuring immersive visuals, seamless reservations, and a menu that makes you hungry just looking at it.",
    heroImage: "/images/projects/ember-kitchen.jpg",
    accentColor: "#f97316",
    techStack: ["Next.js", "Framer Motion", "Tailwind"],
    stats: [
      { value: "340%", label: "More Reservations" },
      { value: "2.1s", label: "Load Time" },
      { value: "98%", label: "Satisfaction" },
    ],
    isFeatured: true,
  },
  {
    id: "2",
    slug: "pearl-dental",
    title: "Pearl Dental",
    subtitle: "Premium dental care deserves a premium presence",
    category: "Healthcare",
    categorySlug: "healthcare",
    overview:
      "A calming, trust-building website for a high-end dental clinic.",
    heroImage: "/images/projects/pearl-dental.jpg",
    accentColor: "#06b6d4",
    techStack: ["Next.js", "GSAP", "Sanity"],
    stats: [
      { value: "180%", label: "New Patients" },
      { value: "45%", label: "Less Bounce" },
      { value: "4.9★", label: "Rating" },
    ],
  },
  {
    id: "3",
    slug: "velvet-perfumes",
    title: "Velvet Perfumes",
    subtitle: "Luxury scents, luxurious experience",
    category: "Luxury",
    categorySlug: "luxury",
    overview:
      "An e-commerce experience as refined as the fragrances it sells.",
    heroImage: "/images/projects/velvet-perfumes.jpg",
    accentColor: "#a855f7",
    techStack: ["Next.js", "Three.js", "Stripe"],
    stats: [
      { value: "220%", label: "Sales Increase" },
      { value: "5min", label: "Avg. Session" },
      { value: "67%", label: "Return Rate" },
    ],
  },
  {
    id: "4",
    slug: "nexus-analytics",
    title: "Nexus Analytics",
    subtitle: "Data visualization that tells a story",
    category: "SaaS",
    categorySlug: "saas",
    overview:
      "A powerful analytics dashboard that makes complex data feel simple.",
    heroImage: "/images/projects/nexus-analytics.jpg",
    accentColor: "#3b82f6",
    techStack: ["React", "D3.js", "Node.js"],
    stats: [
      { value: "40%", label: "More Engagement" },
      { value: "2.5x", label: "Faster" },
      { value: "98%", label: "Satisfaction" },
    ],
  },
  {
    id: "5",
    slug: "aurora-spa",
    title: "Aurora Spa",
    subtitle: "Wellness begins with the first click",
    category: "Healthcare",
    categorySlug: "healthcare",
    overview:
      "A serene digital sanctuary for a luxury spa with online booking.",
    heroImage: "/images/projects/aurora-spa.jpg",
    accentColor: "#10b981",
    techStack: ["Next.js", "Prisma", "Tailwind"],
    stats: [
      { value: "290%", label: "Bookings" },
      { value: "3.2s", label: "Load Time" },
      { value: "92%", label: "Mobile Users" },
    ],
  },
  {
    id: "6",
    slug: "noir-coffee",
    title: "Noir Coffee",
    subtitle: "Artisan coffee, artisan website",
    category: "Restaurant",
    categorySlug: "restaurant",
    overview:
      "A dark, moody website for a specialty coffee roaster.",
    heroImage: "/images/projects/noir-coffee.jpg",
    accentColor: "#78716c",
    techStack: ["Next.js", "Contentful", "Vercel"],
    stats: [
      { value: "150%", label: "Online Orders" },
      { value: "4.8★", label: "Reviews" },
      { value: "35%", label: "Subscriptions" },
    ],
  },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function getProjectSize(index: number): "large" | "medium" | "small" {
  const pattern = ["large", "medium", "medium", "small", "large", "small"];
  return pattern[index % pattern.length] as "large" | "medium" | "small";
}

// =============================================================================
// CUSTOM HOOKS
// =============================================================================

function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return position;
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function SpotlightCard({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, ${THEME.glow.soft}, transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function AnimatedText({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) {
  return (
    <span>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 30, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + index * 0.025,
            ease: EASING,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// =============================================================================
// SECTION 1: WORK HERO
// =============================================================================

function WorkHero({
  activeFilter,
  onFilterChange,
  projectCount,
}: {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  projectCount: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-4 pb-12 pt-28 sm:px-6 sm:pt-36 lg:px-8"
    >
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-[10%] top-[20%] h-[500px] w-[500px] rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(${THEME.primaryRgb}, 0.06), transparent 60%)`,
            filter: "blur(80px)",
          }}
          animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <motion.div
          className="mb-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em]"
          style={{ color: THEME.text.dark }}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Link href="/" className="transition-colors hover:text-[#f59e0b]">
            Home
          </Link>
          <span>/</span>
          <span style={{ color: THEME.text.muted }}>Work</span>
        </motion.div>

        {/* Heading */}
        <div className="overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            <h1
              className="text-[2.5rem] font-semibold leading-[1.1] sm:text-[3.5rem] lg:text-[4rem]"
              style={{ color: THEME.text.primary }}
            >
              {isInView && <AnimatedText text="Selected work" delay={0.2} />}
              <br />
              <span className="text-gradient-gold">
                {isInView && <AnimatedText text="& case studies." delay={0.5} />}
              </span>
            </h1>
          </motion.div>
        </div>

        {/* Description */}
        <motion.p
          className="mt-6 max-w-xl text-lg"
          style={{ color: THEME.text.secondary }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Each project is a cinematic journey — crafted with intention,{" "}
          <span style={{ color: THEME.text.primary }} className="font-medium">
            animated with purpose
          </span>
          .
        </motion.p>

        {/* Filter + Count */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat, index) => (
              <motion.button
                key={cat.slug}
                onClick={() => onFilterChange(cat.slug)}
                className={`relative rounded-full px-5 py-2.5 text-[0.75rem] font-medium uppercase tracking-[0.15em] transition-all duration-300 ${
                  activeFilter === cat.slug
                    ? "text-[#f59e0b]"
                    : "text-[#71717a] hover:text-[#a1a1aa]"
                }`}
                style={{
                  background:
                    activeFilter === cat.slug
                      ? `rgba(${THEME.primaryRgb}, 0.15)`
                      : "rgba(255, 255, 255, 0.03)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.08 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeFilter === cat.slug && (
                  <motion.div
                    layoutId="activeWorkFilter"
                    className="absolute inset-0 rounded-full"
                    style={{ border: `1px solid rgba(${THEME.primaryRgb}, 0.4)` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </motion.button>
            ))}
          </div>

          <span
            className="text-[11px] uppercase tracking-[0.15em]"
            style={{ color: THEME.text.dark }}
          >
            <span style={{ color: THEME.primary }}>{projectCount}</span> projects
          </span>
        </motion.div>

        {/* Line */}
        <motion.div
          className="mt-10 h-px w-full"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(${THEME.primaryRgb}, 0.3) 50%, transparent)`,
          }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 1.3 }}
        />
      </div>
    </section>
  );
}

// =============================================================================
// SECTION 2: FEATURED PROJECT
// =============================================================================

function FeaturedProject({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-4, 4]);
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section ref={ref} className="relative px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Label */}
        <motion.div
          className="mb-8 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="relative flex h-2 w-2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span
              className="absolute h-2 w-2 rounded-full"
              style={{ background: THEME.primary }}
            />
            <span
              className="absolute h-2 w-2 animate-ping rounded-full opacity-75"
              style={{ background: THEME.primary }}
            />
          </motion.span>
          <span
            className="text-[11px] uppercase tracking-[0.3em]"
            style={{ color: THEME.primary }}
          >
            Featured Case Study
          </span>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1000 }}
        >
          <Link href={`/work/${project.slug}`}>
            <SpotlightCard
              className="rounded-3xl border bg-[#0a0a0a]"
              style={{ borderColor: `rgba(${THEME.primaryRgb}, 0.15)` }}
            >
              <motion.article
                className="group relative overflow-hidden rounded-3xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  rotateX: springRotateX,
                  rotateY: springRotateY,
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="grid lg:grid-cols-2">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[400px]">
                    <motion.div
                      className="absolute inset-0"
                      animate={{ scale: isHovered ? 1.05 : 1 }}
                      transition={{ duration: 0.7 }}
                    >
                      <Image
                        src={project.heroImage}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        quality={90}
                      />
                    </motion.div>

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a] opacity-0 lg:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent lg:hidden" />

                    {/* Scan line */}
                    <motion.div
                      className="absolute inset-x-0 h-[2px]"
                      style={{
                        background: `linear-gradient(90deg, transparent, rgba(${THEME.primaryRgb}, 0.5), transparent)`,
                      }}
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />

                    {/* View indicator */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                    >
                      <motion.div
                        className="flex h-20 w-20 items-center justify-center rounded-full border backdrop-blur-sm"
                        style={{
                          borderColor: `rgba(${THEME.primaryRgb}, 0.3)`,
                          background: `rgba(${THEME.primaryRgb}, 0.1)`,
                        }}
                        animate={{ scale: isHovered ? 1 : 0.8 }}
                      >
                        <span style={{ color: THEME.primary }} className="text-2xl">
                          ↗
                        </span>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="relative flex flex-col justify-center p-6 sm:p-8 lg:p-12">
                    <motion.span
                      className="mb-4 inline-block self-start rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em]"
                      style={{
                        background: `rgba(${THEME.primaryRgb}, 0.1)`,
                        border: `1px solid rgba(${THEME.primaryRgb}, 0.3)`,
                        color: THEME.primary,
                      }}
                    >
                      {project.category}
                    </motion.span>

                    <h3
                      className="text-[1.6rem] font-semibold sm:text-[2rem] lg:text-[2.5rem]"
                      style={{ color: THEME.text.primary }}
                    >
                      {project.title}
                    </h3>

                    <p
                      className="mt-2 text-[1rem] font-medium"
                      style={{ color: THEME.text.secondary }}
                    >
                      {project.subtitle}
                    </p>

                    <p
                      className="mt-4 text-[0.95rem] leading-relaxed"
                      style={{ color: THEME.text.muted }}
                    >
                      {project.overview}
                    </p>

                    {/* Stats */}
                    <div className="mt-8 flex flex-wrap gap-8">
                      {project.stats.map((stat) => (
                        <div key={stat.label}>
                          <div
                            className="text-[1.6rem] font-semibold"
                            style={{ color: THEME.primary }}
                          >
                            {stat.value}
                          </div>
                          <div
                            className="text-[0.7rem] uppercase tracking-[0.15em]"
                            style={{ color: THEME.text.dark }}
                          >
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                      className="mt-8"
                      animate={{ x: isHovered ? 8 : 0 }}
                    >
                      <span
                        className="inline-flex items-center gap-2 text-[0.85rem] font-medium"
                        style={{ color: THEME.primary }}
                      >
                        <span className="uppercase tracking-[0.15em]">
                          View Case Study
                        </span>
                        <motion.span animate={{ x: isHovered ? 4 : 0 }}>
                          →
                        </motion.span>
                      </span>
                    </motion.div>
                  </div>
                </div>
              </motion.article>
            </SpotlightCard>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// SECTION 3: PROJECTS GRID
// =============================================================================

function ProjectsGrid({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-10 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-1 w-1 rounded-full"
                style={{ background: THEME.primary }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
          <span
            className="text-[11px] uppercase tracking-[0.3em]"
            style={{ color: THEME.primary }}
          >
            All Projects
          </span>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:auto-rows-[260px] sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                size={getProjectSize(index)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-[300px] items-center justify-center rounded-2xl border border-dashed"
            style={{ borderColor: THEME.border.default }}
          >
            <p style={{ color: THEME.text.muted }}>
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  size,
}: {
  project: Project;
  index: number;
  size: "large" | "medium" | "small";
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const sizeClasses = {
    large: "sm:col-span-2 sm:row-span-2",
    medium: "sm:col-span-1 sm:row-span-2",
    small: "sm:col-span-1 sm:row-span-1",
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group relative overflow-hidden rounded-2xl ${sizeClasses[size]}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <Link href={`/work/${project.slug}`} className="block h-full">
        <div className="relative h-full">
          {/* Image */}
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.7, ease: EASING }}
          >
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 33vw, 50vw"
            />
          </motion.div>

          {/* Spotlight */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${project.accentColor}20, transparent 40%)`,
              opacity: isHovered ? 1 : 0,
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent" />

          {/* Accent line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[3px]"
            style={{ backgroundColor: project.accentColor }}
            initial={{ width: 0 }}
            animate={{ width: isHovered ? "100%" : 0 }}
            transition={{ duration: 0.4, ease: EASING }}
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-5">
            <motion.span
              className="mb-3 inline-block self-start rounded-full px-2.5 py-1 text-[9px] uppercase tracking-[0.15em] backdrop-blur-sm"
              style={{
                backgroundColor: `${project.accentColor}20`,
                color: project.accentColor,
                border: `1px solid ${project.accentColor}30`,
              }}
              animate={{ y: isHovered ? 0 : 5, opacity: isHovered ? 1 : 0.8 }}
            >
              {project.category}
            </motion.span>

            <h3
              className="text-[1.1rem] font-semibold transition-colors sm:text-[1.3rem]"
              style={{ color: isHovered ? THEME.primary : THEME.text.primary }}
            >
              {project.title}
            </h3>

            {size !== "small" && (
              <motion.p
                className="mt-2 text-[0.8rem]"
                style={{ color: THEME.text.secondary }}
                animate={{ y: isHovered ? 0 : 5, opacity: isHovered ? 1 : 0.7 }}
              >
                {project.subtitle}
              </motion.p>
            )}

            <motion.div
              className="mt-3 flex flex-wrap gap-2"
              animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
            >
              {project.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] uppercase"
                  style={{ color: THEME.text.muted }}
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Arrow */}
          <motion.div
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm"
            style={{
              backgroundColor: `${project.accentColor}20`,
              border: `1px solid ${project.accentColor}30`,
            }}
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.5,
              rotate: isHovered ? 0 : -45,
            }}
          >
            <span style={{ color: project.accentColor }}>↗</span>
          </motion.div>

          {/* Border */}
          <div
            className="absolute inset-0 rounded-2xl border transition-colors"
            style={{
              borderColor: isHovered
                ? `${project.accentColor}40`
                : THEME.border.default,
            }}
          />
        </div>
      </Link>
    </motion.article>
  );
}

// =============================================================================
// SECTION 4: CTA
// =============================================================================

function WorkCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section ref={ref} className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          onMouseMove={handleMouseMove}
          className="relative overflow-hidden rounded-[2.5rem] border bg-[#0a0a0a]"
          style={{ borderColor: `rgba(${THEME.primaryRgb}, 0.2)` }}
        >
          {/* Mouse gradient */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${THEME.primaryRgb}, 0.08), transparent 40%)`,
            }}
          />

          {/* Orbs */}
          <motion.div
            className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full blur-3xl"
            style={{ background: `rgba(${THEME.primaryRgb}, 0.15)` }}
            animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full blur-3xl"
            style={{ background: `rgba(${THEME.primaryRgb}, 0.1)` }}
            animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          <div className="relative px-6 py-16 text-center sm:px-12 sm:py-20">
            {/* Stars */}
            <motion.div
              className="absolute left-8 top-8 text-[2rem]"
              style={{ color: `rgba(${THEME.primaryRgb}, 0.2)` }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              ✦
            </motion.div>
            <motion.div
              className="absolute bottom-8 right-8 text-[2rem]"
              style={{ color: `rgba(${THEME.primaryRgb}, 0.2)` }}
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              ✦
            </motion.div>

            <motion.h2
              className="text-[1.8rem] font-semibold sm:text-[2.5rem]"
              style={{ color: THEME.text.primary }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              Have a project in mind?
              <br />
              <span className="text-gradient-gold">Let's talk.</span>
            </motion.h2>

            <motion.p
              className="mx-auto mt-4 max-w-md text-[1rem]"
              style={{ color: THEME.text.secondary }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              Every great project starts with a conversation.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <Link href="/brief">
                <motion.button
                  className="group relative overflow-hidden rounded-full px-8 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.15em]"
                  style={{
                    background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.primaryDark})`,
                    color: "#030303",
                    boxShadow: `0 0 40px rgba(${THEME.primaryRgb}, 0.3)`,
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: `0 0 60px rgba(${THEME.primaryRgb}, 0.5)`,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start your brief
                    <motion.span
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ✦
                    </motion.span>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              </Link>

              <Link href="/contact">
                <motion.button
                  className="rounded-full px-8 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.15em]"
                  style={{
                    border: `1px solid rgba(${THEME.primaryRgb}, 0.3)`,
                    color: THEME.text.primary,
                  }}
                  whileHover={{
                    scale: 1.02,
                    borderColor: `rgba(${THEME.primaryRgb}, 0.6)`,
                    background: `rgba(${THEME.primaryRgb}, 0.1)`,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get in touch →
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Animated border */}
          <div className="absolute inset-0 rounded-[2.5rem]">
            <svg className="h-full w-full">
              <rect
                className="h-full w-full fill-none"
                style={{ stroke: `rgba(${THEME.primaryRgb}, 0.2)` }}
                strokeWidth="1"
                rx="40"
                strokeDasharray="8 8"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;16"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </rect>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function WorkPage(): React.ReactElement {
  const mousePosition = useMousePosition();
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter - exclude featured from grid when viewing "all"
  const filteredProjects =
    activeFilter === "all"
      ? PROJECTS.filter((p) => !p.isFeatured)
      : PROJECTS.filter((p) => p.categorySlug === activeFilter);

  const featuredProject = PROJECTS.find((p) => p.isFeatured) || PROJECTS[0];

  const totalCount =
    activeFilter === "all"
      ? PROJECTS.length
      : PROJECTS.filter((p) => p.categorySlug === activeFilter).length;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303]">
      {/* Cursor Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${THEME.primaryRgb}, 0.03), transparent 40%)`,
        }}
      />

      {/* Film Grain */}
      <div
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Sections */}
      <WorkHero
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        projectCount={totalCount}
      />

      {activeFilter === "all" && <FeaturedProject project={featuredProject} />}

      <ProjectsGrid projects={filteredProjects} />

      <WorkCTA />
    </main>
  );
}