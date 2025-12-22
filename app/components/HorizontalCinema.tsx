"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// -------------------------------------------------------------
// TYPES & DATA
// -------------------------------------------------------------

type CinemaProject = {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly description: string;
  readonly imageSrc?: string;
  readonly imageAlt?: string;
  readonly href: string;
  readonly colorClass: string;      // ✅ اسم class من globals.css
  readonly colorRgb: string;        // ✅ RGB للأنماط المباشرة
  readonly year: string;
};

const CINEMA_PROJECTS: readonly CinemaProject[] = [
  {
    id: "nexus",
    title: "Nexus Analytics",
    category: "SaaS Platform",
    description: "Real-time analytics dashboard with cinematic data visualization.",
    imageSrc: "/images/projects/HorizantolCinema/project-1.jpg",
    imageAlt: "Nexus Analytics Dashboard",
    href: "/work/nexus-analytics",
    colorClass: "gradient-cyan",    // ✅
    colorRgb: "34 211 238",         // ✅
    year: "2024",
  },
  {
    id: "meridian",
    title: "Meridian Health",
    category: "Healthcare",
    description: "Premium clinic website with seamless appointment booking.",
    imageSrc: "/images/projects/HorizantolCinema/project-2.jpg",
    imageAlt: "Meridian Health Website",
    href: "/work/meridian-health",
    colorClass: "gradient-emerald", // ✅
    colorRgb: "16 185 129",         // ✅
    year: "2024",
  },
  {
    id: "velox",
    title: "Velox Launch",
    category: "Launch Page",
    description: "High-converting SaaS launch with waitlist integration.",
    imageSrc: "/images/projects/HorizantolCinema/project-3.jpg",
    imageAlt: "Velox Launch Page",
    href: "/work/velox-launch",
    colorClass: "gradient-violet",  // ✅
    colorRgb: "139 92 246",         // ✅
    year: "2024",
  },
  {
    id: "atlas",
    title: "Atlas Legal",
    category: "Law Firm",
    description: "Prestigious law firm with trust-first composition.",
    imageSrc: "/images/projects/HorizantolCinema/project-4.jpg",
    imageAlt: "Atlas Legal Website",
    href: "/work/atlas-legal",
    colorClass: "gradient-amber",   // ✅
    colorRgb: "245 158 11",         // ✅
    year: "2024",
  },
  {
    id: "ember",
    title: "Ember Kitchen",
    category: "Restaurant",
    description: "Immersive dining experience with smooth reservations.",
    imageSrc: "/images/projects/HorizantolCinema/project-5.jpg",
    imageAlt: "Ember Kitchen Website",
    href: "/work/ember-kitchen",
    colorClass: "gradient-rose",    // ✅
    colorRgb: "244 63 94",          // ✅
    year: "2023",
  },
  {
    id: "velvet",
    title: "velvet-perfumes",
    category: "store",
    description: "Immersive dining experience with smooth reservations.",
    imageSrc: "/images/projects/HorizantolCinema/project-6.jpg",
    imageAlt: "velvet-perfumes Website",
    href: "/work/velvet-perfumes",
    colorClass: "gradient-rose",    // ✅
    colorRgb: "244 63 94",          // ✅
    year: "2023",
  },
] as const;

const EASING = [0.16, 1, 0.3, 1] as const;

// -------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------

export default function HorizontalCinema(): React.ReactElement {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const { scrollXProgress } = useScroll({ container: scrollRef });
  const smoothProgress = useSpring(scrollXProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft;
      const cardWidth = scrollContainer.offsetWidth * 0.85;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, CINEMA_PROJECTS.length - 1));
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCard = (index: number) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    const cardWidth = scrollContainer.offsetWidth * 0.85;
    scrollContainer.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <motion.div
          className="absolute left-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(var(--color-accent-rgb), 0.06), transparent 50%)`,
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Section Header */}
      <motion.div
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASING }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--color-accent)]/50" />
              <span className="label">Featured Work</span>
            </div>
            
            <h2 className="heading-lg">
              Cinematic builds
              <br />
              <span className="text-gradient-gold">that convert.</span>
            </h2>
          </div>

          <Link 
            href="/work" 
            className="btn-secondary self-start sm:self-auto"
          >
            View all work
            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </motion.div>

      {/* Horizontal Scroll Container */}
      <motion.div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 sm:px-6 lg:px-8 pb-6 hide-scrollbar"
        style={{
          scrollPaddingLeft: "1rem",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Left Spacer */}
        <div className="shrink-0 w-[calc((100vw-1280px)/2)] max-w-[8rem] min-w-[1rem]" />

        {CINEMA_PROJECTS.map((project, index) => (
          <CinemaCard
            key={project.id}
            project={project}
            index={index}
            isActive={index === activeIndex}
            progress={smoothProgress}
          />
        ))}

        {/* Right Spacer */}
        <div className="shrink-0 w-[calc((100vw-1280px)/2)] max-w-[8rem] min-w-[1rem]" />
      </motion.div>

      {/* Progress Dots */}
      <motion.div
        className="mt-8 flex items-center justify-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {CINEMA_PROJECTS.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToCard(index)}
            className="relative h-2 rounded-full transition-all duration-500"
            style={{
              width: index === activeIndex ? "2rem" : "0.5rem",
              backgroundColor: index === activeIndex 
                ? "var(--color-accent)" 
                : "var(--color-text-muted)",
            }}
            aria-label={`Go to project ${index + 1}`}
          >
            {index === activeIndex && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: "var(--color-accent)" }}
                layoutId="activeDot"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
        
        <span className="ml-4 text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          {String(activeIndex + 1).padStart(2, "0")} / {String(CINEMA_PROJECTS.length).padStart(2, "0")}
        </span>
      </motion.div>

      {/* Scroll Hint (Mobile) */}
      <motion.div
        className="mt-6 flex items-center justify-center gap-2 text-[11px] text-[var(--color-text-muted)] sm:hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
      >
        <motion.span
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ←
        </motion.span>
        <span className="uppercase tracking-[0.2em]">Swipe to explore</span>
        <motion.span
          animate={{ x: [0, -8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          →
        </motion.span>
      </motion.div>
    </section>
  );
}

// -------------------------------------------------------------
// CINEMA CARD COMPONENT
// -------------------------------------------------------------

type CinemaCardProps = {
  readonly project: CinemaProject;
  readonly index: number;
  readonly isActive: boolean;
  readonly progress: ReturnType<typeof useSpring>;
};

function CinemaCard({ project, index, isActive, progress }: CinemaCardProps): React.ReactElement {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const total = Math.max(1, CINEMA_PROJECTS.length - 1);
  const center = index / total;

  // Parallax animations
  const imageY = useTransform(
    progress,
    [Math.max(0, center - 0.25), center, Math.min(1, center + 0.25)],
    [14, 0, -14]
  );

  const imageScale = useTransform(
    progress,
    [Math.max(0, center - 0.25), center, Math.min(1, center + 0.25)],
    [1.04, 1, 1.04]
  );

  return (
    <motion.div
      ref={cardRef}
      className="shrink-0 w-[85vw] max-w-[700px] snap-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={project.href}>
        <motion.article
          className="cinema-card group"  // ✅ استخدام class من globals.css
          animate={{
            scale: isActive ? 1 : 0.95,
            opacity: isActive ? 1 : 0.7,
          }}
          transition={{ duration: 0.4 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background Image */}
          <motion.div 
            className="absolute inset-0 will-change-transform"
            style={{ y: imageY, scale: imageScale }}
          >
            {project.imageSrc ? (
              <Image
                src={project.imageSrc}
                alt={project.imageAlt ?? project.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(min-width: 768px) 700px, 85vw"
                quality={90}
                priority={index === 0}
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-slate-900 to-black">
                <div className="absolute inset-0 opacity-30"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, rgba(${project.colorRgb}, 0.18), transparent 55%), radial-gradient(circle at 80% 70%, rgba(99,102,241,0.14), transparent 55%)`,
                  }}
                />
              </div>
            )}
          </motion.div>

          {/* Gradient Overlay */}
          <div className={`absolute inset-0 ${project.colorClass} mix-blend-overlay`} />
          <div className="cinema-card-overlay" />  {/* ✅ class من globals.css */}

          {/* Cinematic Bars */}
          <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-between p-6 sm:p-8">
            {/* Top Row */}
            <div className="flex items-start justify-between">
              <motion.span
                className="badge badge-accent backdrop-blur-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span 
                  className="h-1.5 w-1.5 rounded-full shadow-[0_0_8px]"
                  style={{
                    background: `rgb(${project.colorRgb})`,
                    boxShadow: `0 0 8px rgb(${project.colorRgb} / 0.8)`,
                  }}
                />
                {project.category}
              </motion.span>

              <span className="text-[11px] text-[var(--color-text-muted)]">
                {project.year}
              </span>
            </div>

            {/* Bottom Content */}
            <div>
              <motion.h3
                className="heading-md text-[var(--color-text-primary)] mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {project.title}
              </motion.h3>

              <motion.p
                className="body-md max-w-md mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {project.description}
              </motion.p>

              {/* View Project Button */}
              <div className="inline-flex items-center gap-2 text-[0.8rem] font-medium transition-transform duration-300 group-hover:translate-x-2"
                style={{ color: `rgb(${project.colorRgb})` }}
              >
                <span className="uppercase tracking-[0.15rem]">View Project</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </div>
          </div>

          {/* Border Glow - FIXED */}
          <motion.div
            className="absolute inset-0 rounded-3xl border-2"
            style={{
              borderColor: isHovered 
                ? `rgba(${project.colorRgb}, 0.4)` 
                : `rgba(${project.colorRgb}, 0)`,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Corner Accents */}
          <div 
            className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ borderColor: `rgba(${project.colorRgb}, 0.3)` }}
          />
          <div 
            className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ borderColor: `rgba(${project.colorRgb}, 0.3)` }}
          />
        </motion.article>
      </Link>
    </motion.div>
  );
}