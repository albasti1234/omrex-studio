"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Components
import CinematicHero from "./components/CinematicHero";
import ReadyWebsitesCinema from "./components/ReadyWebsitesCinema";
import CommunityReviews from "./components/CommunityReviews";

// =============================================================================
// CONSTANTS & THEME
// =============================================================================

const EASING = [0.16, 1, 0.3, 1] as const;
const SPRING_CONFIG = { stiffness: 150, damping: 15, mass: 0.1 };

// 🎨 AMBER/GOLD THEME COLORS
const THEME = {
  primary: "#f59e0b",
  primaryLight: "#fbbf24",
  primaryDark: "#d97706",
  primaryRgb: "245, 158, 11",
  accent: "#f59e0b",
  accentRgb: "245, 158, 11",
  glow: "rgba(245, 158, 11, 0.15)",
  glowStrong: "rgba(245, 158, 11, 0.3)",
  border: "rgba(245, 158, 11, 0.2)",
  borderHover: "rgba(245, 158, 11, 0.4)",
  text: {
    primary: "#f8fafc",
    secondary: "#a1a1aa",
    muted: "#71717a",
    dark: "#52525b",
  },
  bg: {
    dark: "#030303",
    card: "rgba(10, 10, 10, 0.6)",
    cardHover: "rgba(20, 20, 20, 0.8)",
  },
} as const;

// =============================================================================
// DATA
// =============================================================================

const STATS = [
  { value: 24, suffix: "+", label: "Projects Delivered" },
  { value: 18, suffix: "", label: "Happy Clients" },
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Client Retention" },
] as const;

const SERVICES = [
  {
    id: "websites",
    icon: "◈",
    title: "Cinematic Websites",
    description: "Immersive web experiences that captivate and convert. Not templates — custom scenes.",
    features: ["Custom Design", "Animations", "Responsive"],
  },
  {
    id: "saas",
    icon: "◎",
    title: "SaaS & Dashboards",
    description: "Beautiful interfaces for complex products. Data visualization that tells a story.",
    features: ["UI/UX Design", "Dashboard", "Analytics"],
  },
  {
    id: "branding",
    icon: "◇",
    title: "Brand Identity",
    description: "Visual identity systems that make your brand unforgettable and premium.",
    features: ["Logo Design", "Guidelines", "Assets"],
  },
  {
    id: "development",
    icon: "▹",
    title: "Development",
    description: "Clean, performant code that brings designs to life. Next.js, React, and more.",
    features: ["Next.js", "React", "TypeScript"],
  },
] as const;

const TESTIMONIALS = [
  {
    id: "t1",
    quote: "OMREX transformed our vision into a cinematic experience. The attention to detail made our product stand out completely.",
    author: "Sarah Chen",
    role: "CEO, TechVentures",
    avatar: "/images/avatars/avatar-1.jpg",
  },
  {
    id: "t2",
    quote: "Working with OMREX was a game-changer. They understood exactly what we needed and delivered beyond expectations.",
    author: "Michael Torres",
    role: "Founder, Velox",
    avatar: "/images/avatars/avatar-2.jpg",
  },
  {
    id: "t3",
    quote: "The best investment we made for our brand. Our website now truly reflects the premium quality of our services.",
    author: "Dr. Emily Watson",
    role: "Director, Meridian Health",
    avatar: "/images/avatars/avatar-3.jpg",
  },
] as const;

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery",
    description: "We dive deep into your brand, goals, and audience to understand your vision.",
    icon: "◎",
  },
  {
    number: "02",
    title: "Strategy",
    description: "We craft a cinematic direction and user experience that converts visitors.",
    icon: "◈",
  },
  {
    number: "03",
    title: "Design",
    description: "Every pixel is intentional. We create scenes, not just pages.",
    icon: "◇",
  },
  {
    number: "04",
    title: "Develop",
    description: "Clean, performant code that brings the cinematic vision to life.",
    icon: "▹",
  },
] as const;

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

function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const start = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);

    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(target * easeOut);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration, hasStarted]);

  return { count, start, hasStarted };
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

// -----------------------------------------------------------------------------
// Spotlight Card (Amber Theme)
// -----------------------------------------------------------------------------

type SpotlightCardProps = {
  readonly children: React.ReactNode;
  readonly className?: string;
};

function SpotlightCard({
  children,
  className = "",
}: SpotlightCardProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-300"
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${THEME.glow}, transparent 40%)`,
        }}
      />
      {/* Border glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${THEME.glow}, transparent 40%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "xor",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      <div className="relative z-20">{children}</div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Magnetic Button (Amber Theme)
// -----------------------------------------------------------------------------

type MagneticButtonProps = {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly href?: string;
  readonly variant?: "primary" | "secondary";
};

function MagneticButton({
  children,
  className = "",
  href,
  variant = "primary",
}: MagneticButtonProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isPrimary = variant === "primary";

  const buttonClasses = isPrimary
    ? `bg-gradient-to-r from-[${THEME.primary}] via-[${THEME.primaryLight}] to-[${THEME.primary}] text-[#030303] shadow-[0_0_40px_rgba(${THEME.primaryRgb},0.3)]`
    : `border border-[${THEME.primary}]/30 bg-transparent text-[${THEME.text.primary}] hover:border-[${THEME.primary}]/60 hover:bg-[${THEME.primary}]/10`;

  const content = (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <button
        className={`group relative overflow-hidden rounded-full px-8 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
          isPrimary
            ? "bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#f59e0b] text-[#030303] shadow-[0_0_40px_rgba(245,158,11,0.3)] hover:shadow-[0_0_60px_rgba(245,158,11,0.5)]"
            : "border border-[#f59e0b]/30 bg-transparent text-[#f8fafc] hover:border-[#f59e0b]/60 hover:bg-[#f59e0b]/10"
        }`}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>

        {/* Shine effect for primary */}
        {isPrimary && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
        )}
      </button>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="group">
        {content}
      </Link>
    );
  }

  return content;
}

// =============================================================================
// SECTIONS
// =============================================================================

// -----------------------------------------------------------------------------
// Stats Section (Amber Theme)
// -----------------------------------------------------------------------------

function StatsSection(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative px-4 py-20 sm:px-6 lg:px-8">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background: `radial-gradient(ellipse at center, rgba(${THEME.primaryRgb}, 0.03), transparent 60%)`,
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-12">
          {STATS.map((stat, index) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type StatItemProps = {
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
  readonly index: number;
  readonly isInView: boolean;
};

function StatItem({
  value,
  suffix,
  label,
  index,
  isInView,
}: StatItemProps): React.ReactElement {
  const { count, start } = useCountUp(value, 2000);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => start(), index * 200);
      return () => clearTimeout(timer);
    }
  }, [isInView, start, index]);

  return (
    <motion.div
      className="group relative text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 -z-10 rounded-2xl blur-2xl transition-all duration-500"
        style={{
          background: `rgba(${THEME.primaryRgb}, 0)`,
        }}
      />

      <div className="relative">
        <span
          className="block text-[2.5rem] font-semibold tabular-nums sm:text-[3rem]"
          style={{ color: THEME.text.primary }}
        >
          {Math.round(count)}
          {suffix}
        </span>
        <span
          className="mt-1 block text-[0.7rem] uppercase tracking-[0.2em]"
          style={{ color: THEME.text.muted }}
        >
          {label}
        </span>
      </div>

      {/* Underline animation */}
      <motion.div
        className="mx-auto mt-4 h-[2px] w-0"
        style={{
          background: `linear-gradient(90deg, transparent, ${THEME.primary}, transparent)`,
        }}
        whileHover={{ width: "80%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// Services Section (Amber Theme)
// -----------------------------------------------------------------------------

function ServicesSection(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section ref={ref} className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span
              className="h-px w-12"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(${THEME.primaryRgb}, 0.5))`,
              }}
            />
            <span
              className="text-[11px] uppercase tracking-[0.3em]"
              style={{ color: THEME.primary }}
            >
              Services
            </span>
            <span
              className="h-px w-12"
              style={{
                background: `linear-gradient(90deg, rgba(${THEME.primaryRgb}, 0.5), transparent)`,
              }}
            />
          </div>

          <h2
            className="text-[1.8rem] font-semibold sm:text-[2.2rem]"
            style={{ color: THEME.text.primary }}
          >
            What we <span className="text-gradient-gold">create</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <SpotlightCard
                className={`group h-full rounded-2xl border p-6 transition-all duration-300 ${
                  hoveredId === service.id
                    ? "border-[#f59e0b]/40 bg-[#0a0a0a]/80"
                    : "border-white/5 bg-[#0a0a0a]/40"
                }`}
              >
                {/* Icon */}
                <motion.div
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border text-2xl"
                  style={{
                    borderColor:
                      hoveredId === service.id
                        ? `rgba(${THEME.primaryRgb}, 0.5)`
                        : "rgba(255,255,255,0.1)",
                    background:
                      hoveredId === service.id
                        ? `rgba(${THEME.primaryRgb}, 0.1)`
                        : "rgba(255,255,255,0.02)",
                    color:
                      hoveredId === service.id
                        ? THEME.primary
                        : THEME.text.secondary,
                  }}
                  animate={{
                    scale: hoveredId === service.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {service.icon}
                </motion.div>

                {/* Title */}
                <h3
                  className="mb-3 text-[1.1rem] font-semibold"
                  style={{ color: THEME.text.primary }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  className="mb-4 text-[0.85rem] leading-relaxed"
                  style={{ color: THEME.text.secondary }}
                >
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full px-2.5 py-1 text-[9px] uppercase tracking-[0.1em]"
                      style={{
                        background: `rgba(${THEME.primaryRgb}, 0.1)`,
                        color: THEME.primary,
                        border: `1px solid rgba(${THEME.primaryRgb}, 0.2)`,
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Testimonials Section (Amber Theme)
// -----------------------------------------------------------------------------

function TestimonialsSection(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      {/* Background glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: `radial-gradient(circle, rgba(${THEME.primaryRgb}, 0.05), transparent 50%)`,
          filter: "blur(80px)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span
              className="h-px w-12"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(${THEME.primaryRgb}, 0.5))`,
              }}
            />
            <span
              className="text-[11px] uppercase tracking-[0.3em]"
              style={{ color: THEME.primary }}
            >
              Testimonials
            </span>
            <span
              className="h-px w-12"
              style={{
                background: `linear-gradient(90deg, rgba(${THEME.primaryRgb}, 0.5), transparent)`,
              }}
            />
          </div>

          <h2
            className="text-[1.8rem] font-semibold sm:text-[2.2rem]"
            style={{ color: THEME.text.primary }}
          >
            What clients <span className="text-gradient-gold">say</span>
          </h2>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="relative h-[380px] sm:h-[320px]">
          <AnimatePresence mode="popLayout">
            {TESTIMONIALS.map((testimonial, index) => {
              const isActive = index === activeIndex;
              const offset = index - activeIndex;

              return (
                <motion.div
                  key={testimonial.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{
                    opacity: isActive ? 1 : 0.3,
                    y: offset * 20,
                    scale: 1 - Math.abs(offset) * 0.05,
                    zIndex: TESTIMONIALS.length - Math.abs(offset),
                  }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5, ease: EASING }}
                >
                  <SpotlightCard
                    className="h-full rounded-3xl border border-[#f59e0b]/15 bg-[#0a0a0a]/80 p-8 backdrop-blur-xl sm:p-12"
                  >
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      {/* Quote icon */}
                      <motion.div
                        className="mb-6 text-[4rem] leading-none"
                        style={{ color: `rgba(${THEME.primaryRgb}, 0.2)` }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        "
                      </motion.div>

                      <blockquote
                        className="text-[1.1rem] leading-relaxed sm:text-[1.25rem]"
                        style={{ color: THEME.text.primary }}
                      >
                        {testimonial.quote}
                      </blockquote>

                      <div className="mt-8 flex items-center gap-4">
                        <div
                          className="relative h-14 w-14 overflow-hidden rounded-full border-2"
                          style={{ borderColor: `rgba(${THEME.primaryRgb}, 0.3)` }}
                        >
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.author}
                            fill
                            className="object-cover"
                          />
                          {/* Ring animation */}
                          <motion.div
                            className="absolute inset-0 rounded-full border-2"
                            style={{ borderColor: `rgba(${THEME.primaryRgb}, 0.5)` }}
                            animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                        <div className="text-left">
                          <div
                            className="font-semibold"
                            style={{ color: THEME.text.primary }}
                          >
                            {testimonial.author}
                          </div>
                          <div
                            className="text-[0.8rem]"
                            style={{ color: THEME.text.muted }}
                          >
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-center gap-4">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="group relative h-3 w-3"
            >
              <span
                className="absolute inset-0 rounded-full transition-all duration-300"
                style={{
                  background:
                    index === activeIndex ? THEME.primary : THEME.text.dark,
                }}
              />
              {index === activeIndex && (
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ background: THEME.primary }}
                  layoutId="activeTestimonial"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {/* Pulse on active */}
              {index === activeIndex && (
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ background: THEME.primary }}
                  animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Process Section (Amber Theme)
// -----------------------------------------------------------------------------

function ProcessSection(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span
              className="h-px w-12"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(${THEME.primaryRgb}, 0.5))`,
              }}
            />
            <span
              className="text-[11px] uppercase tracking-[0.3em]"
              style={{ color: THEME.primary }}
            >
              Process
            </span>
            <span
              className="h-px w-12"
              style={{
                background: `linear-gradient(90deg, rgba(${THEME.primaryRgb}, 0.5), transparent)`,
              }}
            />
          </div>

          <h2
            className="text-[1.8rem] font-semibold sm:text-[2.2rem]"
            style={{ color: THEME.text.primary }}
          >
            How we <span className="text-gradient-gold">work</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <motion.div
            className="absolute left-0 right-0 top-[60px] hidden h-[2px] lg:block"
            style={{
              background: `linear-gradient(90deg, transparent 10%, rgba(${THEME.primaryRgb}, 0.2) 30%, rgba(${THEME.primaryRgb}, 0.2) 70%, transparent 90%)`,
            }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <SpotlightCard
                  className={`group h-full rounded-2xl border p-6 transition-all duration-300 ${
                    hoveredStep === index
                      ? "border-[#f59e0b]/30 bg-[#0a0a0a]/80"
                      : "border-white/5 bg-[#0a0a0a]/40"
                  }`}
                >
                  {/* Step indicator */}
                  <div className="relative mb-6 flex items-center justify-center">
                    <motion.div
                      className="relative flex h-16 w-16 items-center justify-center rounded-full border"
                      style={{
                        borderColor:
                          hoveredStep === index
                            ? `rgba(${THEME.primaryRgb}, 0.5)`
                            : "rgba(255,255,255,0.1)",
                        background: "rgba(10,10,10,0.5)",
                      }}
                      animate={{
                        scale: hoveredStep === index ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Animated ring */}
                      {hoveredStep === index && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2"
                          style={{ borderColor: `rgba(${THEME.primaryRgb}, 0.5)` }}
                          initial={{ scale: 1, opacity: 1 }}
                          animate={{ scale: 1.5, opacity: 0 }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                      <span
                        className="text-[1.5rem]"
                        style={{
                          color:
                            hoveredStep === index
                              ? THEME.primary
                              : THEME.text.secondary,
                        }}
                      >
                        {step.icon}
                      </span>
                    </motion.div>

                    {/* Connection dot */}
                    <motion.div
                      className="absolute -bottom-3 left-1/2 hidden h-2 w-2 -translate-x-1/2 rounded-full lg:block"
                      style={{ background: THEME.primary }}
                      animate={{
                        scale: hoveredStep === index ? [1, 1.5, 1] : 1,
                        boxShadow:
                          hoveredStep === index
                            ? `0 0 20px rgba(${THEME.primaryRgb}, 0.8)`
                            : "none",
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: hoveredStep === index ? Infinity : 0,
                      }}
                    />
                  </div>

                  {/* Number */}
                  <motion.div
                    className="mb-2 text-[2.5rem] font-bold transition-colors"
                    style={{
                      color:
                        hoveredStep === index
                          ? `rgba(${THEME.primaryRgb}, 0.2)`
                          : "rgba(255,255,255,0.05)",
                    }}
                    animate={{ y: hoveredStep === index ? -5 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.number}
                  </motion.div>

                  <h3
                    className="mb-2 text-[1.1rem] font-semibold"
                    style={{ color: THEME.text.primary }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-[0.85rem] leading-relaxed"
                    style={{ color: THEME.text.secondary }}
                  >
                    {step.description}
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// CTA Section (Amber Theme)
// -----------------------------------------------------------------------------

function CTASection(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section ref={ref} className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          onMouseMove={handleMouseMove}
          className="relative overflow-hidden rounded-[2.5rem] border border-[#f59e0b]/20 bg-[#0a0a0a]/60 backdrop-blur-xl"
        >
          {/* Animated background gradient */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${THEME.primaryRgb}, 0.1), transparent 40%)`,
            }}
          />

          {/* Floating orbs */}
          <motion.div
            className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full blur-3xl"
            style={{ background: `rgba(${THEME.primaryRgb}, 0.2)` }}
            animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full blur-3xl"
            style={{ background: `rgba(${THEME.primaryRgb}, 0.15)` }}
            animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          <div className="relative px-6 py-16 text-center sm:px-12 sm:py-20">
            {/* Decorative elements */}
            <motion.div
              className="absolute left-8 top-8 text-[2rem]"
              style={{ color: `rgba(${THEME.primaryRgb}, 0.2)` }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              ✦
            </motion.div>
            <motion.div
              className="absolute bottom-8 right-8 text-[2rem]"
              style={{ color: `rgba(${THEME.primaryRgb}, 0.2)` }}
              animate={{ rotate: [360, 0] }}
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
              Ready to build something
              <br />
              <span className="text-gradient-gold">cinematic?</span>
            </motion.h2>

            <motion.p
              className="mx-auto mt-4 max-w-md text-[1rem]"
              style={{ color: THEME.text.secondary }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              Let's create a web experience that stands out from the template
              crowd.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <MagneticButton href="/brief" variant="primary">
                Start your brief
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✦
                </motion.span>
              </MagneticButton>

              <MagneticButton href="/contact" variant="secondary">
                Get in touch
                <span>→</span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Animated border */}
          <div className="absolute inset-0 rounded-[2.5rem]">
            <svg
              className="h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
            >
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

export default function HomePage(): React.ReactElement {
  const mousePosition = useMousePosition();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303]">
      {/* Global Cursor Glow - AMBER */}
      <div
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${THEME.primaryRgb}, 0.04), transparent 40%)`,
        }}
      />

      {/* Film Grain Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Sections */}
      <CinematicHero />
      <StatsSection />
      <ServicesSection />
      <ReadyWebsitesCinema />
      <ProcessSection />
      <CommunityReviews/>
      <CTASection />
    </main>
  );
}