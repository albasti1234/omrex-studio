"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";

// Components
import CinematicHero from "./components/CinematicHero";
import ReadyWebsitesCinema from "./components/ReadyWebsitesCinema";
import CommunityReviews from "./components/CommunityReviews";

// =============================================================================
// CONSTANTS & THEME
// =============================================================================

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
// Stats Section - PREMIUM CINEMATIC
// -----------------------------------------------------------------------------

const STATS_ICONS = ['◈', '◎', '◇', '✦'] as const;

function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative px-4 py-20 sm:py-28 sm:px-6 lg:px-8 overflow-hidden">
      {/* Cinematic Background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212,168,85,0.06), transparent 50%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] uppercase tracking-[0.4em] text-[#d4a855] font-medium">
            ✦ Our Impact ✦
          </span>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 lg:gap-8">
          {STATS.map((stat, index) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              icon={STATS_ICONS[index]}
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
  icon,
  index,
  isInView,
}: {
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
  readonly icon: string;
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
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Glass Card */}
      <div
        className="relative p-6 sm:p-8 rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-[1.02]"
        style={{
          background: 'linear-gradient(145deg, rgba(20,20,30,0.8) 0%, rgba(10,10,15,0.9) 100%)',
          boxShadow: '0 20px 60px -15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
          border: '1px solid rgba(212,168,85,0.1)',
        }}
      >
        {/* Hover Glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(212,168,85,0.1) 0%, transparent 60%)',
          }}
        />

        {/* Animated Border on Hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            border: '1px solid rgba(212,168,85,0.3)',
          }}
        />

        {/* Icon */}
        <motion.div
          className="text-center mb-4"
          animate={isInView ? { rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 2, delay: index * 0.2 + 0.5, repeat: 0 }}
        >
          <span
            className="text-2xl sm:text-3xl transition-all duration-300 group-hover:scale-110 inline-block"
            style={{
              color: '#d4a855',
              filter: 'drop-shadow(0 0 15px rgba(212,168,85,0.4))'
            }}
          >
            {icon}
          </span>
        </motion.div>

        {/* Number */}
        <div className="text-center">
          <span
            className="block text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem] font-bold tabular-nums leading-none"
            style={{
              background: 'linear-gradient(135deg, #f5d485 0%, #d4a855 50%, #b8923f 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 10px rgba(212,168,85,0.2))'
            }}
          >
            {Math.round(count)}{suffix}
          </span>

          {/* Label */}
          <span
            className="mt-2 block text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.2em] text-[#8a8580]"
          >
            {label}
          </span>
        </div>

        {/* Bottom Accent Line */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-3/4 transition-all duration-500"
          style={{
            background: 'linear-gradient(90deg, transparent, #d4a855, transparent)',
          }}
        />
      </div>
    </motion.div>
  );
});

// -----------------------------------------------------------------------------
// Services Section - LUXURY 3D DESIGN
// -----------------------------------------------------------------------------

function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeId, setActiveId] = useState<string | null>(null);
  const { isTouchDevice } = useDeviceDetection();
  const shouldReduceMotion = useShouldReduceMotion();

  return (
    <section ref={ref} className="relative px-4 py-20 sm:py-32 sm:px-6 lg:px-8 overflow-hidden">
      {/* Cinematic Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08),transparent_60%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Premium Header */}
        <motion.div
          className="mb-16 text-center sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-4 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-[#f59e0b] font-medium">
              ✦ Our Expertise ✦
            </span>
            <span className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent" />
          </motion.div>

          <h2 className="text-[2rem] font-bold sm:text-[2.5rem] lg:text-[3.5rem] leading-tight">
            <span className="text-white">Crafting </span>
            <span className="bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#d97706] bg-clip-text text-transparent">
              Digital Experiences
            </span>
          </h2>
          <p className="mt-4 text-[#a1a1aa] text-base sm:text-lg max-w-2xl mx-auto">
            Premium services designed to elevate your brand to cinematic heights
          </p>
        </motion.div>

        {/* 3D Luxury Cards Grid */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              activeId={activeId}
              setActiveId={setActiveId}
              isTouchDevice={isTouchDevice}
              shouldReduceMotion={shouldReduceMotion}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ServiceCard with auto-hover on mobile when scrolling into view
const ServiceCard = memo(function ServiceCard({
  service,
  index,
  activeId,
  setActiveId,
  isTouchDevice,
  shouldReduceMotion,
  isInView,
}: {
  service: typeof SERVICES[number];
  index: number;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  isTouchDevice: boolean;
  shouldReduceMotion: boolean;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, {
    margin: "-40% 0px -40% 0px",
    once: false
  });

  useEffect(() => {
    if (isTouchDevice && cardInView) {
      setActiveId(service.id);
    }
  }, [cardInView, isTouchDevice, service.id, setActiveId]);

  const isActive = activeId === service.id;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: shouldReduceMotion ? 0 : 0.15 * index,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseEnter={() => !isTouchDevice && setActiveId(service.id)}
      onMouseLeave={() => !isTouchDevice && setActiveId(null)}
      className="group perspective-1000"
    >
      <motion.div
        className="relative h-full rounded-3xl overflow-hidden cursor-pointer"
        style={{
          background: 'linear-gradient(155deg, #16161f 0%, #0c0c12 50%, #0a0810 100%)',
          boxShadow: isActive
            ? '0 30px 100px -15px rgba(212,168,85,0.25), 0 0 0 1px rgba(212,168,85,0.4), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 60px rgba(212,168,85,0.15)'
            : '0 25px 80px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.03)',
          transform: isActive ? 'translateY(-10px) scale(1.015)' : 'translateY(0) scale(1)',
          transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div
          className={`absolute inset-0 rounded-3xl transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: 'radial-gradient(ellipse at top left, rgba(212,168,85,0.12) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(205,127,50,0.08) 0%, transparent 50%)',
          }}
        />
        <div className="relative z-10 p-6 sm:p-8">
          <motion.div
            className="mb-6 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-2xl relative"
            animate={isActive ? { y: -5, rotate: 5 } : { y: 0, rotate: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              background: isActive
                ? 'linear-gradient(145deg, rgba(212,168,85,0.2) 0%, rgba(184,146,63,0.1) 100%)'
                : 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
              boxShadow: isActive
                ? '0 20px 50px -12px rgba(212,168,85,0.35), inset 0 0 30px rgba(212,168,85,0.08)'
                : '0 10px 40px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
              border: isActive ? '1px solid rgba(212,168,85,0.35)' : '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <span
              className="text-3xl sm:text-4xl transition-all duration-300"
              style={{
                color: isActive ? '#fbbf24' : '#a1a1aa',
                filter: isActive ? 'drop-shadow(0 0 20px rgba(245,158,11,0.6))' : 'none'
              }}
            >
              {service.icon}
            </span>
          </motion.div>
          <h3 className={`text-xl sm:text-2xl font-bold mb-3 transition-colors duration-300 ${isActive ? 'text-[#fbbf24]' : 'text-white'}`}>
            {service.title}
          </h3>
          <p className="text-[#9ca3af] text-sm sm:text-base leading-relaxed mb-5">
            {service.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {service.features.map((feature) => (
              <span
                key={feature}
                className="px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-medium uppercase tracking-wider transition-all duration-300"
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(217,119,6,0.1) 100%)'
                    : 'rgba(255,255,255,0.05)',
                  color: isActive ? '#fbbf24' : '#71717a',
                  border: isActive ? '1px solid rgba(245,158,11,0.3)' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-500"
          style={{
            background: isActive
              ? 'linear-gradient(90deg, transparent, #f59e0b, transparent)'
              : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            boxShadow: isActive ? '0 0 30px rgba(245,158,11,0.5)' : 'none',
          }}
        />
      </motion.div>
    </motion.div>
  );
});

// -----------------------------------------------------------------------------
// Process Section - LUXURY TIMELINE DESIGN
// -----------------------------------------------------------------------------

function ProcessSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const { isTouchDevice } = useDeviceDetection();
  const shouldReduceMotion = useShouldReduceMotion();

  return (
    <section ref={ref} className="relative px-4 py-20 sm:py-32 sm:px-6 lg:px-8 overflow-hidden">
      {/* Cinematic Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.06),transparent_50%)] blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.05),transparent_50%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Premium Header */}
        <motion.div
          className="mb-16 text-center sm:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-4 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-[#f59e0b] font-medium">
              ✦ Our Process ✦
            </span>
            <span className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent" />
          </motion.div>

          <h2 className="text-[2rem] font-bold sm:text-[2.5rem] lg:text-[3.5rem] leading-tight">
            <span className="text-white">The Journey to </span>
            <span className="bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#d97706] bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>
          <p className="mt-4 text-[#a1a1aa] text-base sm:text-lg max-w-2xl mx-auto">
            A refined process that transforms your vision into cinematic reality
          </p>
        </motion.div>

        {/* Luxury Timeline Cards */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, index) => (
            <ProcessCard
              key={step.number}
              step={step}
              index={index}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              isTouchDevice={isTouchDevice}
              shouldReduceMotion={shouldReduceMotion}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ProcessCard with auto-hover on mobile
const ProcessCard = memo(function ProcessCard({
  step,
  index,
  activeStep,
  setActiveStep,
  isTouchDevice,
  shouldReduceMotion,
  isInView,
}: {
  step: typeof PROCESS_STEPS[number];
  index: number;
  activeStep: number | null;
  setActiveStep: (index: number | null) => void;
  isTouchDevice: boolean;
  shouldReduceMotion: boolean;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, {
    margin: "-40% 0px -40% 0px",
    once: false
  });

  useEffect(() => {
    if (isTouchDevice && cardInView) {
      setActiveStep(index);
    }
  }, [cardInView, isTouchDevice, index, setActiveStep]);

  const isActive = activeStep === index;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: shouldReduceMotion ? 0 : 0.2 * index,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseEnter={() => !isTouchDevice && setActiveStep(index)}
      onMouseLeave={() => !isTouchDevice && setActiveStep(null)}
      className="group relative"
    >
      {/* Connection Line - Desktop */}
      {index < PROCESS_STEPS.length - 1 && (
        <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] z-0">
          <motion.div
            className="h-full"
            style={{
              background: 'linear-gradient(90deg, rgba(245,158,11,0.4), rgba(245,158,11,0.1))',
            }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
          />
        </div>
      )}

      <motion.div
        className="relative h-full rounded-3xl overflow-hidden cursor-pointer"
        style={{
          background: 'linear-gradient(165deg, #18182a 0%, #0e0e18 50%, #0a0a10 100%)',
          boxShadow: isActive
            ? '0 35px 120px -25px rgba(212,168,85,0.3), 0 0 0 1px rgba(212,168,85,0.45), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 80px rgba(212,168,85,0.12)'
            : '0 30px 90px -25px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.02)',
          transform: isActive ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
          transition: 'all 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-700"
          style={{
            background: isActive
              ? 'linear-gradient(90deg, transparent 5%, #d4a855 25%, #e8c878 50%, #d4a855 75%, transparent 95%)'
              : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
            boxShadow: isActive ? '0 0 50px rgba(212,168,85,0.5), 0 0 20px rgba(212,168,85,0.3)' : 'none',
          }}
        />
        <div className="relative z-10 p-6 sm:p-8">
          <div
            className="absolute top-4 right-4 text-[4rem] sm:text-[5rem] font-black leading-none select-none transition-all duration-600"
            style={{
              color: isActive ? 'rgba(212,168,85,0.12)' : 'rgba(255,255,255,0.02)',
              textShadow: isActive ? '0 0 80px rgba(212,168,85,0.25)' : 'none',
            }}
          >
            {step.number}
          </div>
          <motion.div
            className="mb-6 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-2xl relative"
            animate={isActive ? { y: -6, scale: 1.08 } : { y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: isActive
                ? 'linear-gradient(150deg, rgba(212,168,85,0.22) 0%, rgba(184,146,63,0.1) 100%)'
                : 'linear-gradient(150deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
              boxShadow: isActive
                ? '0 25px 60px -15px rgba(212,168,85,0.4), inset 0 -2px 25px rgba(212,168,85,0.1), 0 0 0 1px rgba(212,168,85,0.3)'
                : '0 12px 45px -12px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px rgba(255,255,255,0.04)',
            }}
          >
            <span
              className="text-4xl sm:text-5xl transition-all duration-500"
              style={{
                color: isActive ? '#e8c878' : '#6a6560',
                filter: isActive ? 'drop-shadow(0 0 30px rgba(212,168,85,0.6))' : 'none',
              }}
            >
              {step.icon}
            </span>
          </motion.div>
          <h3
            className="text-xl sm:text-2xl font-bold mb-3 transition-colors duration-400"
            style={{ color: isActive ? '#e8c878' : '#faf8f5' }}
          >
            {step.title}
          </h3>
          <p className="text-[#8a8580] text-sm sm:text-base leading-relaxed">
            {step.description}
          </p>
        </div>
        <div
          className="absolute bottom-0 right-0 w-28 h-28 transition-opacity duration-600"
          style={{
            background: 'radial-gradient(circle at bottom right, rgba(212,168,85,0.08), transparent 65%)',
            opacity: isActive ? 1 : 0,
          }}
        />
      </motion.div>
    </motion.div>
  );
});

// -----------------------------------------------------------------------------
// CTA Section - PREMIUM CINEMATIC
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
    <section ref={ref} className="relative px-4 py-20 sm:py-28 sm:px-6 lg:px-8">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212,168,85,0.06), transparent 50%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="mx-auto max-w-4xl relative z-10">
        {/* Animated Border Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Animated Gradient Border */}
          <motion.div
            className="absolute -inset-[1px] rounded-2xl sm:rounded-[2.5rem] overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #d4a855 0%, #8b6914 25%, #d4a855 50%, #f5d485 75%, #d4a855 100%)',
              backgroundSize: '200% 200%',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Main Card */}
          <div
            className="relative overflow-hidden rounded-2xl sm:rounded-[2.5rem]"
            style={{
              background: 'linear-gradient(145deg, rgba(16,16,22,0.98) 0%, rgba(10,10,14,0.99) 100%)',
            }}
            onMouseMove={handleMouseMove}
          >
            {/* Mouse follow gradient - Desktop only */}
            {!isTouchDevice && (
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212,168,85,0.08), transparent 40%)`,
                }}
              />
            )}

            {/* Top Glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(212,168,85,0.08) 0%, transparent 50%)',
              }}
            />

            {/* Floating orbs - Desktop only */}
            {!isMobile && !shouldReduceMotion && (
              <>
                <motion.div
                  className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full"
                  style={{
                    background: 'rgba(212,168,85,0.1)',
                    filter: 'blur(60px)',
                  }}
                  animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full"
                  style={{
                    background: 'rgba(212,168,85,0.08)',
                    filter: 'blur(60px)',
                  }}
                  animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                />
              </>
            )}

            <div className="relative px-6 py-14 text-center sm:px-14 sm:py-20 lg:py-24">
              {/* Decorative Stars */}
              {!isMobile && !shouldReduceMotion && (
                <>
                  <motion.div
                    className="absolute left-8 top-8 text-2xl"
                    style={{ color: 'rgba(212,168,85,0.3)' }}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    ✦
                  </motion.div>
                  <motion.div
                    className="absolute bottom-8 right-8 text-2xl"
                    style={{ color: 'rgba(212,168,85,0.3)' }}
                    animate={{ rotate: [360, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    ✦
                  </motion.div>
                </>
              )}

              <motion.h2
                className="text-2xl font-bold sm:text-3xl lg:text-4xl text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Ready to build something
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #f5d485 0%, #d4a855 50%, #b8923f 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  cinematic?
                </span>
              </motion.h2>

              <motion.p
                className="mx-auto mt-4 max-w-md text-[#8a8580] text-sm sm:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Let&apos;s create a web experience that stands out from the template crowd.
              </motion.p>

              <motion.div
                className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row relative z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {/* Primary CTA */}
                <Link href="/brief">
                  <motion.button
                    className="group relative px-8 py-4 rounded-full overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, #d4a855, #f5d485, #d4a855, #8b6914, #d4a855)',
                        backgroundSize: '200% 200%',
                      }}
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                    <div className="absolute inset-[1px] rounded-full bg-[#0d0b08]" />
                    <span className="relative z-10 flex items-center gap-2 text-[#d4a855] font-semibold text-sm uppercase tracking-widest">
                      Start your brief <span className="group-hover:rotate-45 transition-transform">✦</span>
                    </span>
                  </motion.button>
                </Link>

                {/* Secondary CTA */}
                <Link href="/contact">
                  <motion.button
                    className="px-8 py-4 rounded-full border border-[#d4a855]/30 hover:border-[#d4a855]/60 text-white/80 hover:text-white font-medium text-sm uppercase tracking-widest transition-all duration-300 hover:bg-[#d4a855]/5"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center gap-2">
                      Get in touch <span>→</span>
                    </span>
                  </motion.button>
                </Link>
              </motion.div>
            </div>
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