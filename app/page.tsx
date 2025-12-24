"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
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
    dark: "#121215",
    card: "#1c1c20",
    cardHover: "#252528",
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

// ✅ Enhanced: Touch device detection
function useDeviceDetection() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
      setIsMobile(window.innerWidth < 768);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return { isTouchDevice, isMobile };
}

// ✅ Enhanced: Mouse position with touch support
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { isTouchDevice } = useDeviceDetection();

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isTouchDevice]);

  return { position, isTouchDevice };
}

// ✅ Enhanced: Reduce motion on mobile
function useShouldReduceMotion() {
  const prefersReducedMotion = useReducedMotion();
  const { isMobile } = useDeviceDetection();

  return prefersReducedMotion || isMobile;
}

// Count up animation
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

// ✅ Optimized: Spotlight Card with touch support
const SpotlightCard = memo(function SpotlightCard({
  children,
  className = "",
}: {
  readonly children: React.ReactNode;
  readonly className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { isTouchDevice } = useDeviceDetection();

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isTouchDevice || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, [isTouchDevice]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Spotlight - Desktop only */}
      {!isTouchDevice && (
        <motion.div
          className="pointer-events-none absolute -inset-px z-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${THEME.glow}, transparent 40%)`,
          }}
        />
      )}
      <div className="relative z-20">{children}</div>
    </div>
  );
});

// ✅ Optimized: Magnetic Button with touch support
const MagneticButton = memo(function MagneticButton({
  children,
  className = "",
  href,
  variant = "primary",
}: {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly href?: string;
  readonly variant?: "primary" | "secondary";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { isTouchDevice } = useDeviceDetection();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isTouchDevice || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  }, [isTouchDevice, x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const isPrimary = variant === "primary";

  const content = (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={isTouchDevice ? {} : { x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <button
        className={`group relative cursor-pointer overflow-hidden rounded-full px-8 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${isPrimary
          ? "bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#f59e0b] text-[#030303] shadow-[0_0_40px_rgba(245,158,11,0.3)] hover:shadow-[0_0_60px_rgba(245,158,11,0.5)]"
          : "border border-[#f59e0b]/30 bg-transparent text-[#f8fafc] hover:border-[#f59e0b]/60 hover:bg-[#f59e0b]/10"
          }`}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>

        {/* Shine effect - Desktop only */}
        {isPrimary && !isTouchDevice && (
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
    return <Link href={href}>{content}</Link>;
  }

  return content;
});

// ✅ NEW: Film Grain - Desktop only
const FilmGrain = memo(function FilmGrain() {
  const { isMobile } = useDeviceDetection();

  if (isMobile) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 opacity-[0.02]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  );
});

// ✅ NEW: Cursor Glow - Desktop only
const CursorGlow = memo(function CursorGlow({
  position
}: {
  position: { x: number; y: number }
}) {
  const { isTouchDevice } = useDeviceDetection();

  if (isTouchDevice) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(${THEME.primaryRgb}, 0.04), transparent 40%)`,
      }}
    />
  );
});

// =============================================================================
// SECTIONS
// =============================================================================

// -----------------------------------------------------------------------------
// Stats Section
// -----------------------------------------------------------------------------

function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { isMobile } = useDeviceDetection();

  return (
    <section ref={ref} className="relative px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
      {/* Background accent - Desktop only */}
      {!isMobile && (
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2"
            style={{
              background: `radial-gradient(ellipse at center, rgba(${THEME.primaryRgb}, 0.03), transparent 60%)`,
            }}
          />
        </div>
      )}

      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8 lg:gap-12">
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

const StatItem = memo(function StatItem({
  value,
  suffix,
  label,
  index,
  isInView,
}: {
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
  readonly index: number;
  readonly isInView: boolean;
}) {
  const { count, start } = useCountUp(value, 2000);
  const shouldReduceMotion = useShouldReduceMotion();

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => start(), shouldReduceMotion ? 0 : index * 200);
      return () => clearTimeout(timer);
    }
  }, [isInView, start, index, shouldReduceMotion]);

  return (
    <motion.div
      className="group relative text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : index * 0.1 }}
    >
      <div className="relative">
        <span
          className="block text-[2rem] font-semibold tabular-nums sm:text-[2.5rem] lg:text-[3rem]"
          style={{ color: THEME.text.primary }}
        >
          {Math.round(count)}
          {suffix}
        </span>
        <span
          className="mt-1 block text-[0.65rem] uppercase tracking-[0.15em] sm:text-[0.7rem] sm:tracking-[0.2em]"
          style={{ color: THEME.text.muted }}
        >
          {label}
        </span>
      </div>

      {/* Underline - shows on tap/hover */}
      <div
        className="mx-auto mt-3 h-[2px] w-0 transition-all duration-300 group-hover:w-16 sm:mt-4 sm:group-hover:w-20"
        style={{
          background: `linear-gradient(90deg, transparent, ${THEME.primary}, transparent)`,
        }}
      />
    </motion.div>
  );
});

// -----------------------------------------------------------------------------
// Services Section
// -----------------------------------------------------------------------------

function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeId, setActiveId] = useState<string | null>(null);
  const { isTouchDevice } = useDeviceDetection();
  const shouldReduceMotion = useShouldReduceMotion();

  const handleInteraction = useCallback((id: string) => {
    if (isTouchDevice) {
      setActiveId((prev) => (prev === id ? null : id));
    } else {
      setActiveId(id);
    }
  }, [isTouchDevice]);

  return (
    <section ref={ref} className="relative px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-12 text-center sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span
              className="h-px w-8 sm:w-12"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(${THEME.primaryRgb}, 0.5))`,
              }}
            />
            <span
              className="text-[10px] uppercase tracking-[0.25em] sm:text-[11px] sm:tracking-[0.3em]"
              style={{ color: THEME.primary }}
            >
              Services
            </span>
            <span
              className="h-px w-8 sm:w-12"
              style={{
                background: `linear-gradient(90deg, rgba(${THEME.primaryRgb}, 0.5), transparent)`,
              }}
            />
          </div>

          <h2
            className="text-[1.5rem] font-semibold sm:text-[1.8rem] lg:text-[2.2rem]"
            style={{ color: THEME.text.primary }}
          >
            What we <span className="text-gradient-gold">create</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.1 + index * 0.1 }}
              onMouseEnter={() => !isTouchDevice && setActiveId(service.id)}
              onMouseLeave={() => !isTouchDevice && setActiveId(null)}
              onClick={() => isTouchDevice && handleInteraction(service.id)}
            >
              <SpotlightCard
                className={`group h-full cursor-pointer rounded-2xl border p-5 transition-all duration-300 sm:p-6 ${activeId === service.id
                  ? "border-[#c47d08] bg-[#252528]"
                  : "border-[#3a3a3f] bg-[#1c1c20]"
                  }`}
              >
                {/* Icon */}
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border text-xl transition-all duration-300 sm:mb-6 sm:h-14 sm:w-14 sm:text-2xl"
                  style={{
                    borderColor:
                      activeId === service.id
                        ? `rgba(${THEME.primaryRgb}, 0.5)`
                        : "rgba(255,255,255,0.1)",
                    background:
                      activeId === service.id
                        ? `rgba(${THEME.primaryRgb}, 0.1)`
                        : "rgba(255,255,255,0.02)",
                    color:
                      activeId === service.id
                        ? THEME.primary
                        : THEME.text.secondary,
                    transform: activeId === service.id ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  {service.icon}
                </div>

                {/* Title */}
                <h3
                  className="mb-2 text-[1rem] font-semibold sm:mb-3 sm:text-[1.1rem]"
                  style={{ color: THEME.text.primary }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  className="mb-3 text-[0.8rem] leading-relaxed sm:mb-4 sm:text-[0.85rem]"
                  style={{ color: THEME.text.secondary }}
                >
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full px-2 py-0.5 text-[8px] uppercase tracking-[0.1em] sm:px-2.5 sm:py-1 sm:text-[9px]"
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
// Testimonials Section
// -----------------------------------------------------------------------------

function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const { isMobile } = useDeviceDetection();
  const shouldReduceMotion = useShouldReduceMotion();

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
      {/* Background glow - Desktop only */}
      {!isMobile && !shouldReduceMotion && (
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 sm:h-[600px] sm:w-[600px]"
          style={{
            background: `radial-gradient(circle, rgba(${THEME.primaryRgb}, 0.05), transparent 50%)`,
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      )}

      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          className="mb-10 text-center sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span
              className="h-px w-8 sm:w-12"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(${THEME.primaryRgb}, 0.5))`,
              }}
            />
            <span
              className="text-[10px] uppercase tracking-[0.25em] sm:text-[11px] sm:tracking-[0.3em]"
              style={{ color: THEME.primary }}
            >
              Testimonials
            </span>
            <span
              className="h-px w-8 sm:w-12"
              style={{
                background: `linear-gradient(90deg, rgba(${THEME.primaryRgb}, 0.5), transparent)`,
              }}
            />
          </div>

          <h2
            className="text-[1.5rem] font-semibold sm:text-[1.8rem] lg:text-[2.2rem]"
            style={{ color: THEME.text.primary }}
          >
            What clients <span className="text-gradient-gold">say</span>
          </h2>
        </motion.div>

        {/* ✅ FIX: Dynamic height instead of fixed */}
        <div className="relative min-h-[300px] sm:min-h-[280px]">
          <AnimatePresence mode="popLayout">
            {TESTIMONIALS.map((testimonial, index) => {
              const isActive = index === activeIndex;
              if (!isActive) return null;

              return (
                <motion.div
                  key={testimonial.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  <SpotlightCard className="h-full rounded-2xl border border-[#c47d08] bg-[#1c1c20] p-6 sm:rounded-3xl sm:p-8 lg:p-12">
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      {/* Quote icon */}
                      <div
                        className="mb-4 text-[2.5rem] leading-none sm:mb-6 sm:text-[4rem]"
                        style={{ color: `rgba(${THEME.primaryRgb}, 0.2)` }}
                      >
                        "
                      </div>

                      <blockquote
                        className="text-[0.95rem] leading-relaxed sm:text-[1.1rem] lg:text-[1.25rem]"
                        style={{ color: THEME.text.primary }}
                      >
                        {testimonial.quote}
                      </blockquote>

                      <div className="mt-6 flex items-center gap-3 sm:mt-8 sm:gap-4">
                        <div
                          className="relative h-11 w-11 overflow-hidden rounded-full border-2 sm:h-14 sm:w-14"
                          style={{ borderColor: `rgba(${THEME.primaryRgb}, 0.3)` }}
                        >
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <div
                            className="text-[0.9rem] font-semibold sm:text-base"
                            style={{ color: THEME.text.primary }}
                          >
                            {testimonial.author}
                          </div>
                          <div
                            className="text-[0.75rem] sm:text-[0.8rem]"
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

        {/* ✅ FIX: Larger touch targets for navigation dots */}
        <div className="mt-6 flex items-center justify-center gap-1 sm:mt-8 sm:gap-2">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="group relative flex h-11 w-11 items-center justify-center"
              aria-label={`Go to testimonial ${index + 1}`}
            >
              <span
                className="h-2.5 w-2.5 rounded-full transition-all duration-300 sm:h-3 sm:w-3"
                style={{
                  background: index === activeIndex ? THEME.primary : THEME.text.dark,
                  transform: index === activeIndex ? "scale(1.2)" : "scale(1)",
                }}
              />
              {index === activeIndex && !shouldReduceMotion && (
                <motion.span
                  className="absolute h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3"
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
// Process Section
// -----------------------------------------------------------------------------

function ProcessSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const { isTouchDevice, isMobile } = useDeviceDetection();
  const shouldReduceMotion = useShouldReduceMotion();

  const handleInteraction = useCallback((index: number) => {
    if (isTouchDevice) {
      setActiveStep((prev) => (prev === index ? null : index));
    } else {
      setActiveStep(index);
    }
  }, [isTouchDevice]);

  return (
    <section ref={ref} className="relative px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-12 text-center sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span
              className="h-px w-8 sm:w-12"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(${THEME.primaryRgb}, 0.5))`,
              }}
            />
            <span
              className="text-[10px] uppercase tracking-[0.25em] sm:text-[11px] sm:tracking-[0.3em]"
              style={{ color: THEME.primary }}
            >
              Process
            </span>
            <span
              className="h-px w-8 sm:w-12"
              style={{
                background: `linear-gradient(90deg, rgba(${THEME.primaryRgb}, 0.5), transparent)`,
              }}
            />
          </div>

          <h2
            className="text-[1.5rem] font-semibold sm:text-[1.8rem] lg:text-[2.2rem]"
            style={{ color: THEME.text.primary }}
          >
            How we <span className="text-gradient-gold">work</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line - Desktop only */}
          {!isMobile && (
            <motion.div
              className="absolute left-0 right-0 top-[60px] hidden h-[2px] lg:block"
              style={{
                background: `linear-gradient(90deg, transparent 10%, rgba(${THEME.primaryRgb}, 0.2) 30%, rgba(${THEME.primaryRgb}, 0.2) 70%, transparent 90%)`,
              }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: shouldReduceMotion ? 0 : 1.5, delay: 0.5 }}
            />
          )}

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.2 + index * 0.1 }}
                onMouseEnter={() => !isTouchDevice && setActiveStep(index)}
                onMouseLeave={() => !isTouchDevice && setActiveStep(null)}
                onClick={() => isTouchDevice && handleInteraction(index)}
              >
                <SpotlightCard
                  className={`group h-full cursor-pointer rounded-2xl border p-5 transition-all duration-300 sm:p-6 ${activeStep === index
                    ? "border-[#c47d08] bg-[#252528]"
                    : "border-[#3a3a3f] bg-[#1c1c20]"
                    }`}
                >
                  {/* Step indicator */}
                  <div className="relative mb-4 flex items-center justify-center sm:mb-6">
                    <div
                      className="relative flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-300 sm:h-16 sm:w-16"
                      style={{
                        borderColor:
                          activeStep === index
                            ? "#c47d08"
                            : "#3a3a3f",
                        background: "#1c1c20",
                        transform: activeStep === index ? "scale(1.1)" : "scale(1)",
                      }}
                    >
                      <span
                        className="text-xl transition-colors duration-300 sm:text-[1.5rem]"
                        style={{
                          color:
                            activeStep === index
                              ? THEME.primary
                              : THEME.text.secondary,
                        }}
                      >
                        {step.icon}
                      </span>
                    </div>

                    {/* Connection dot - Desktop only */}
                    {!isMobile && (
                      <div
                        className="absolute -bottom-3 left-1/2 hidden h-2 w-2 -translate-x-1/2 rounded-full transition-all duration-300 lg:block"
                        style={{
                          background: THEME.primary,
                          boxShadow:
                            activeStep === index
                              ? `0 0 15px rgba(${THEME.primaryRgb}, 0.8)`
                              : "none",
                        }}
                      />
                    )}
                  </div>

                  {/* Number */}
                  <div
                    className="mb-2 text-[2rem] font-bold transition-colors duration-300 sm:text-[2.5rem]"
                    style={{
                      color:
                        activeStep === index
                          ? `rgba(${THEME.primaryRgb}, 0.2)`
                          : "rgba(255,255,255,0.05)",
                    }}
                  >
                    {step.number}
                  </div>

                  <h3
                    className="mb-2 text-[1rem] font-semibold sm:text-[1.1rem]"
                    style={{ color: THEME.text.primary }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-[0.8rem] leading-relaxed sm:text-[0.85rem]"
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
// CTA Section
// -----------------------------------------------------------------------------

function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { isTouchDevice, isMobile } = useDeviceDetection();
  const shouldReduceMotion = useShouldReduceMotion();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, [isTouchDevice]);

  return (
    <section ref={ref} className="relative px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          onMouseMove={handleMouseMove}
          className="relative overflow-hidden rounded-2xl border border-[#c47d08] bg-[#1c1c20] sm:rounded-[2.5rem]"
        >
          {/* Mouse follow gradient - Desktop only */}
          {!isTouchDevice && (
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${THEME.primaryRgb}, 0.1), transparent 40%)`,
              }}
            />
          )}

          {/* Floating orbs - Desktop only, reduced motion respected */}
          {!isMobile && !shouldReduceMotion && (
            <>
              <motion.div
                className="pointer-events-none absolute -left-20 -top-20 h-32 w-32 rounded-full sm:h-40 sm:w-40"
                style={{
                  background: `rgba(${THEME.primaryRgb}, 0.15)`,
                  filter: "blur(40px)",
                }}
                animate={{ x: [0, 20, 0], y: [0, 15, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div
                className="pointer-events-none absolute -bottom-20 -right-20 h-32 w-32 rounded-full sm:h-40 sm:w-40"
                style={{
                  background: `rgba(${THEME.primaryRgb}, 0.1)`,
                  filter: "blur(40px)",
                }}
                animate={{ x: [0, -20, 0], y: [0, -15, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
              />
            </>
          )}

          <div className="relative px-5 py-12 text-center sm:px-12 sm:py-16 lg:py-20">
            {/* Decorative elements - Reduced on mobile */}
            {!isMobile && !shouldReduceMotion && (
              <>
                <motion.div
                  className="absolute left-6 top-6 text-xl sm:left-8 sm:top-8 sm:text-[2rem]"
                  style={{ color: `rgba(${THEME.primaryRgb}, 0.2)` }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  ✦
                </motion.div>
                <motion.div
                  className="absolute bottom-6 right-6 text-xl sm:bottom-8 sm:right-8 sm:text-[2rem]"
                  style={{ color: `rgba(${THEME.primaryRgb}, 0.2)` }}
                  animate={{ rotate: [360, 0] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  ✦
                </motion.div>
              </>
            )}

            <motion.h2
              className="text-[1.5rem] font-semibold sm:text-[1.8rem] lg:text-[2.5rem]"
              style={{ color: THEME.text.primary }}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              Ready to build something
              <br />
              <span className="text-gradient-gold">cinematic?</span>
            </motion.h2>

            <motion.p
              className="mx-auto mt-3 max-w-md text-[0.9rem] sm:mt-4 sm:text-[1rem]"
              style={{ color: THEME.text.secondary }}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              Let's create a web experience that stands out from the template crowd.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <MagneticButton href="/brief" variant="primary">
                Start your brief
                <span>✦</span>
              </MagneticButton>

              <MagneticButton href="/contact" variant="secondary">
                Get in touch
                <span>→</span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Animated border - Simplified on mobile */}
          {!isMobile && (
            <div className="absolute inset-0 rounded-[inherit]">
              <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <rect
                  className="h-full w-full fill-none"
                  style={{ stroke: `rgba(${THEME.primaryRgb}, 0.2)` }}
                  strokeWidth="1"
                  rx="40"
                  strokeDasharray="8 8"
                >
                  {!shouldReduceMotion && (
                    <animate
                      attributeName="stroke-dashoffset"
                      values="0;16"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  )}
                </rect>
              </svg>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function HomePage(): React.ReactElement {
  const { position: mousePosition, isTouchDevice } = useMousePosition();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303]">
      {/* ✅ Cursor Glow - Desktop only */}
      {!isTouchDevice && <CursorGlow position={mousePosition} />}

      {/* ✅ Film Grain - Desktop only */}
      <FilmGrain />

      {/* Sections */}
      <CinematicHero />
      <StatsSection />
      <ServicesSection />
      <ReadyWebsitesCinema />
      <ProcessSection />
      <CommunityReviews />
      <CTASection />
    </main>
  );
}