"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimationControls,
  AnimatePresence,
  MotionValue,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// =============================================================================
// CONSTANTS & CONFIGURATION
// =============================================================================

const EASING = [0.16, 1, 0.3, 1] as const;
const EASING_SMOOTH = [0.4, 0, 0.2, 1] as const;
const SPRING_GENTLE = { stiffness: 40, damping: 15, mass: 0.5 };
const SPRING_SNAPPY = { stiffness: 300, damping: 30 };
// Timing for entrance sequence
const TIMING = {
  curtainStart: 500,
  curtainDuration: 1800,
  contentDelay: 1600,
  staggerDelay: 120,
} as const;

// Particle configuration
const DUST_PARTICLES = 35;
const SPARK_PARTICLES = 12;

// =============================================================================
// TYPES
// =============================================================================

type DustParticle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
  rise: number;
};

type SparkParticle = {
  id: number;
  startX: number;
  startY: number;
  size: number;
  duration: number;
  delay: number;
  angle: number;
  distance: number;
};

type CurtainFold = {
  id: number;
  offset: number;
  depth: number;
  width: number;
};

// =============================================================================
// PARTICLE GENERATORS
// =============================================================================

function generateDustParticles(count: number): DustParticle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 120 + 10,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 25,
    delay: Math.random() * 10,
    drift: Math.random() * 60 - 30,
    opacity: Math.random() * 0.5 + 0.2,
    rise: Math.random() * 100, // ⬅️ الإضافة الوحيدة
  }));
}

function generateSparkParticles(count: number): SparkParticle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    startX: 45 + Math.random() * 10,
    startY: 40 + Math.random() * 20,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 8 + 3,
    angle: Math.random() * 360,
    distance: Math.random() * 150 + 50,
  }));
}

function generateCurtainFolds(count: number): CurtainFold[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    offset: (i / count) * 100,
    depth: Math.sin((i / count) * Math.PI * 3) * 0.5 + 0.5,
    width: 100 / count,
  }));
}

// =============================================================================
// CUSTOM HOOKS
// =============================================================================

function useMouseParallax(strength: number = 20) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, SPRING_GENTLE);
  const springY = useSpring(y, SPRING_GENTLE);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    x.set(((e.clientX - centerX) / centerX) * strength);
    y.set(((e.clientY - centerY) / centerY) * strength);
  }, [x, y, strength]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return { x: springX, y: springY };
}

function useSequencedEntrance() {
  const [phase, setPhase] = useState<"loading" | "curtains" | "reveal" | "complete">("loading");

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    timers.push(setTimeout(() => setPhase("curtains"), TIMING.curtainStart));
    timers.push(setTimeout(() => setPhase("reveal"), TIMING.curtainStart + TIMING.curtainDuration));
    timers.push(setTimeout(() => setPhase("complete"), TIMING.curtainStart + TIMING.curtainDuration + 1500));

    return () => timers.forEach(clearTimeout);
  }, []);

  return phase;
}

// mobile: Check if device is mobile/touch for performance optimization
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

// -----------------------------------------------------------------------------
// Realistic Curtain with Folds
// -----------------------------------------------------------------------------

type CurtainProps = {
  side: "left" | "right";
  isOpen: boolean;
  folds: CurtainFold[];
};

function RealisticCurtain({ side, isOpen, folds }: CurtainProps): React.ReactElement {
  const isLeft = side === "left";

  return (
    <motion.div
      className={`absolute top-0 z-20 h-full w-[55%] ${isLeft ? "left-0 origin-left" : "right-0 origin-right"}`}
      initial={{ scaleX: 1 }}
      animate={{ scaleX: isOpen ? 0 : 1 }}
      transition={{
        duration: TIMING.curtainDuration / 1000,
        ease: EASING,
      }}
    >
      {/* Main curtain body */}
      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          background: isLeft
            ? "linear-gradient(90deg, #080808 0%, #0f0f0f 60%, #1a1a1a 85%, #0a0a0a 100%)"
            : "linear-gradient(-90deg, #080808 0%, #0f0f0f 60%, #1a1a1a 85%, #0a0a0a 100%)",
        }}
      >
        {/* Velvet texture overlay */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Curtain folds */}
        {folds.map((fold) => (
          <motion.div
            key={fold.id}
            className="absolute top-0 h-full"
            style={{
              left: `${fold.offset}%`,
              width: `${fold.width + 1}%`,
              background: `linear-gradient(90deg, 
                rgba(0,0,0,${0.3 + fold.depth * 0.4}) 0%, 
                rgba(40,40,40,${0.1 + fold.depth * 0.2}) 30%,
                rgba(60,60,60,${0.05 + fold.depth * 0.1}) 50%,
                rgba(40,40,40,${0.1 + fold.depth * 0.2}) 70%,
                rgba(0,0,0,${0.3 + fold.depth * 0.4}) 100%
              )`,
            }}
            animate={{
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 4 + fold.id * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Gold trim on inner edge */}
        <div
          className={`absolute top-0 h-full w-[3px] ${isLeft ? "right-0" : "left-0"}`}
          style={{
            background: "linear-gradient(180deg, transparent 0%, rgba(245,158,11,0.4) 20%, rgba(217,119,6,0.6) 50%, rgba(245,158,11,0.4) 80%, transparent 100%)",
            boxShadow: isLeft
              ? "0 0 20px rgba(245,158,11,0.3), 0 0 40px rgba(245,158,11,0.1)"
              : "0 0 20px rgba(245,158,11,0.3), 0 0 40px rgba(245,158,11,0.1)",
          }}
        />

        {/* Gold decorative rope */}
        <motion.div
          className={`absolute top-[15%] h-[70%] w-[6px] ${isLeft ? "right-4" : "left-4"}`}
          style={{
            background: "linear-gradient(180deg, rgba(245,158,11,0.1) 0%, rgba(245,158,11,0.4) 30%, rgba(217,119,6,0.5) 50%, rgba(245,158,11,0.4) 70%, rgba(245,158,11,0.1) 100%)",
            borderRadius: "3px",
          }}
          animate={{
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Inner shadow for depth */}
        <div
          className="absolute inset-0"
          style={{
            boxShadow: isLeft
              ? "inset -60px 0 80px rgba(0,0,0,0.8)"
              : "inset 60px 0 80px rgba(0,0,0,0.8)",
          }}
        />
      </div>
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// Advanced Spotlight System
// -----------------------------------------------------------------------------

type SpotlightSystemProps = {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  isActive: boolean;
};

function SpotlightSystem({ mouseX, mouseY, isActive }: SpotlightSystemProps): React.ReactElement {
  // Main spotlight following mouse
  const spotlightBg = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(900px ellipse at ${50 + Number(x) * 3}% ${50 + Number(y) * 3}%, rgba(245, 158, 11, 0.15), transparent 60%)`
  );

  // Secondary accent light
  const accentBg = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(600px circle at ${30 - Number(x) * 2}% ${70 - Number(y) * 2}%, rgba(217, 119, 6, 0.08), transparent 50%)`
  );

  return (
    <>
      {/* Main warm spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        style={{ background: spotlightBg }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 1.5 }}
      />

      {/* Secondary accent light */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        style={{ background: accentBg }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.7 : 0 }}
        transition={{ duration: 2, delay: 0.5 }}
      />

      {/* Top stage light */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[50%]"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245,158,11,0.06), transparent 70%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 2, delay: 0.3 }}
      />

      {/* Lens flare effect */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[20%] z-10 h-32 w-32 -translate-x-1/2"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: isActive ? [0, 0.6, 0.3] : 0,
          scale: isActive ? [0.5, 1.2, 1] : 0.5,
        }}
        transition={{ duration: 2, delay: 1.5 }}
      />
    </>
  );
}

// -----------------------------------------------------------------------------
// Dust Particles
// -----------------------------------------------------------------------------

type DustSystemProps = {
  particles: DustParticle[];
  isActive: boolean;
};

function DustSystem({ particles, isActive }: DustSystemProps): React.ReactElement {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: `radial-gradient(circle, rgba(245,158,11,${particle.opacity}) 0%, rgba(217,119,6,${particle.opacity * 0.5}) 50%, transparent 70%)`,
            boxShadow: `0 0 ${particle.size * 3}px rgba(245,158,11,${particle.opacity * 0.5})`,
          }}
          animate={isActive ? {
            y: [0, -200 - particle.rise, -400], // ⬅️ استخدم rise بدل Math.random()
            x: [0, particle.drift, particle.drift * 1.5],
            opacity: [0, particle.opacity, particle.opacity * 0.8, 0],
            scale: [0.5, 1, 0.8, 0.3],
          } : { opacity: 0 }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Spark Particles (from spotlight)
// -----------------------------------------------------------------------------

type SparkSystemProps = {
  particles: SparkParticle[];
  isActive: boolean;
};

function SparkSystem({ particles, isActive }: SparkSystemProps): React.ReactElement {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {particles.map((particle) => {
        const endX = particle.startX + Math.cos(particle.angle * Math.PI / 180) * particle.distance / 10;
        const endY = particle.startY + Math.sin(particle.angle * Math.PI / 180) * particle.distance / 10;

        return (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.startX}%`,
              top: `${particle.startY}%`,
              background: "radial-gradient(circle, #fbbf24 0%, #f59e0b 40%, transparent 70%)",
              borderRadius: "50%",
              boxShadow: "0 0 10px #f59e0b, 0 0 20px rgba(245,158,11,0.5)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={isActive ? {
              x: [`0%`, `${(endX - particle.startX) * 10}%`],
              y: [`0%`, `${(endY - particle.startY) * 10}%`],
              opacity: [0, 1, 1, 0],
              scale: [0, 1.5, 1, 0],
            } : { opacity: 0 }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Animated Title with Letter Effects
// -----------------------------------------------------------------------------

type AnimatedTitleProps = {
  isVisible: boolean;
};

function AnimatedTitle({ isVisible }: AnimatedTitleProps): React.ReactElement {
  const titleText = "OMREX";
  const subtitleText = ".STUDIO";

  return (
    <motion.h1 className="relative mb-6 select-none">
      {/* Main title */}
      <span className="block text-[2rem] font-bold leading-[1] tracking-tight xs:text-[2.8rem] sm:text-[4rem] lg:text-[5.5rem]">
        {/* OMREX */}
        <span className="relative inline-block">
          {titleText.split("").map((char, i) => (
            <motion.span
              key={i}
              className="relative inline-block text-[#f8fafc]"
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={isVisible ? {
                opacity: 1,
                y: 0,
                rotateX: 0,
              } : {}}
              transition={{
                duration: 0.8,
                delay: TIMING.contentDelay / 1000 + i * 0.08,
                ease: EASING,
              }}
              style={{
                textShadow: "0 0 40px rgba(245,158,11,0.3), 0 0 80px rgba(245,158,11,0.1)",
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>

        {/* .STUDIO with gold gradient */}
        <span className="relative inline-block">
          {subtitleText.split("").map((char, i) => (
            <motion.span
              key={i}
              className="relative inline-block"
              style={{
                background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 30px rgba(245,158,11,0.4))",
              }}
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={isVisible ? {
                opacity: 1,
                y: 0,
                rotateX: 0,
              } : {}}
              transition={{
                duration: 0.8,
                delay: TIMING.contentDelay / 1000 + (titleText.length + i) * 0.08,
                ease: EASING,
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      </span>

      {/* Animated underline */}
      <motion.div
        className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent"
        initial={{ width: 0, opacity: 0 }}
        animate={isVisible ? { width: "100%", opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: TIMING.contentDelay / 1000 + 0.8, ease: EASING }}
      />

      {/* Glow pulse behind title */}
      <motion.div
        className="absolute left-1/2 top-1/2 -z-10 h-[200%] w-[150%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "radial-gradient(ellipse at center, rgba(245,158,11,0.1) 0%, transparent 50%)",
          filter: "blur(40px)",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? {
          opacity: [0, 0.6, 0.4],
          scale: [0.8, 1.1, 1],
        } : {}}
        transition={{ duration: 2, delay: TIMING.contentDelay / 1000 + 0.5 }}
      />
    </motion.h1>
  );
}

// -----------------------------------------------------------------------------
// Magnetic CTA Button
// -----------------------------------------------------------------------------

type MagneticButtonProps = {
  children: React.ReactNode;
  href: string;
  variant: "primary" | "secondary";
  isVisible: boolean;
  delay: number;
};

function MagneticButton({ children, href, variant, isVisible, delay }: MagneticButtonProps): React.ReactElement {
  const buttonRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, SPRING_SNAPPY);
  const springY = useSpring(y, SPRING_SNAPPY);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: EASING }}
    >
      <Link href={href}>
        <motion.div
          ref={buttonRef}
          className="relative"
          style={{ x: springX, y: springY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.button
            className={`group relative overflow-hidden rounded-full px-5 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] transition-all duration-500 sm:px-8 sm:py-4 sm:text-[0.7rem] md:px-10 md:py-5 md:text-[0.75rem] cursor-pointer ${isPrimary
              ? "bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#f59e0b] text-[#030303] shadow-[0_0_50px_rgba(245,158,11,0.4)]"
              : "border border-[#f59e0b]/40 bg-transparent text-[#f8fafc] hover:border-[#f59e0b]/80 hover:bg-[#f59e0b]/10"
              }`}
            whileHover={{
              boxShadow: isPrimary
                ? "0 0 80px rgba(245,158,11,0.6), 0 0 120px rgba(245,158,11,0.3)"
                : "0 0 40px rgba(245,158,11,0.2)",
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              {children}
            </span>

            {/* Animated shine effect */}
            {isPrimary && (
              <motion.div
                className="absolute inset-0 z-0"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                }}
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            )}

            {/* Border glow for secondary */}
            {!isPrimary && (
              <motion.div
                className="absolute inset-0 -z-10 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(circle at center, rgba(245,158,11,0.15), transparent 70%)",
                }}
              />
            )}
          </motion.button>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// Cinematic Letterbox Bars
// -----------------------------------------------------------------------------

type LetterboxProps = {
  isVisible: boolean;
};

function Letterbox({ isVisible }: LetterboxProps): React.ReactElement {
  return (
    <>
      {/* Top bar - mobile: reduced height */}
      <motion.div
        className="absolute left-0 right-0 top-0 z-30 h-10 bg-[#030303] sm:h-14 lg:h-20"
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.8, ease: EASING, delay: 0.3 }}
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(245,158,11,0.3) 20%, rgba(245,158,11,0.5) 50%, rgba(245,158,11,0.3) 80%, transparent 100%)",
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Bottom bar - mobile: reduced height */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-30 h-10 bg-[#030303] sm:h-14 lg:h-20"
        initial={{ y: 100 }}
        animate={{ y: isVisible ? 0 : 100 }}
        transition={{ duration: 0.8, ease: EASING, delay: 0.3 }}
      >
        <motion.div
          className="absolute left-0 right-0 top-0 h-[1px]"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(245,158,11,0.3) 20%, rgba(245,158,11,0.5) 50%, rgba(245,158,11,0.3) 80%, transparent 100%)",
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </motion.div>
    </>
  );
}

// -----------------------------------------------------------------------------
// Film Grain Overlay
// -----------------------------------------------------------------------------

function FilmGrain(): React.ReactElement {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-50"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity: 0.035,
      }}
      animate={{
        opacity: [0.03, 0.04, 0.03],
      }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

// -----------------------------------------------------------------------------
// Vignette Effect
// -----------------------------------------------------------------------------

function Vignette(): React.ReactElement {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-20"
      style={{
        background: `radial-gradient(ellipse at center, transparent 50%, rgba(3,3,3,0.15) 80%, rgba(3,3,3,0.35) 100%)`,
      }}
    />
  );
}

// -----------------------------------------------------------------------------
// Corner Cinematic Details
// -----------------------------------------------------------------------------

type CinematicDetailsProps = {
  isVisible: boolean;
};

function CinematicDetails({ isVisible }: CinematicDetailsProps): React.ReactElement {
  return (
    <>
      {/* Top Left - Logo/Brand */}
      <motion.div
        className="absolute left-6 top-20 z-40 hidden lg:left-10 lg:top-24 lg:block"
        initial={{ opacity: 0, x: -30 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, delay: 2.5, ease: EASING }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="h-px w-10 bg-gradient-to-r from-[#f59e0b]/60 to-transparent"
            animate={{ width: [40, 60, 40] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#52525b]">
            Est. 2024
          </span>
        </div>
      </motion.div>

      {/* Top Right - Location */}
      <motion.div
        className="absolute right-6 top-20 z-40 hidden lg:right-10 lg:top-24 lg:block"
        initial={{ opacity: 0, x: 30 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, delay: 2.5, ease: EASING }}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#52525b]">
            Jordan → Worldwide
          </span>
          <motion.div
            className="h-px w-10 bg-gradient-to-l from-[#f59e0b]/60 to-transparent"
            animate={{ width: [40, 60, 40] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>
      </motion.div>

      {/* Bottom Left - Recording indicator */}
      <motion.div
        className="absolute bottom-20 left-6 z-40 hidden lg:bottom-24 lg:left-10 lg:block"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2.8 }}
      >
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#52525b]">
          <motion.span
            className="h-2 w-2 rounded-full bg-[#f59e0b]"
            animate={{
              opacity: [1, 0.3, 1],
              boxShadow: [
                "0 0 10px rgba(245,158,11,0.8)",
                "0 0 5px rgba(245,158,11,0.4)",
                "0 0 10px rgba(245,158,11,0.8)",
              ]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span>REC</span>
          <span className="text-[#f59e0b]">●</span>
          <span>4K</span>
        </div>
      </motion.div>

      {/* Bottom Right - Scene info */}
      <motion.div
        className="absolute bottom-20 right-6 z-40 hidden lg:bottom-24 lg:right-10 lg:block"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2.8 }}
      >
        <div className="text-right font-mono text-[9px] uppercase tracking-[0.2em]">
          <div className="text-[#52525b]">Scene 01 / 01</div>
          <motion.div
            className="text-[#f59e0b]"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            The Grand Entrance
          </motion.div>
        </div>
      </motion.div>

      {/* Frame corners */}
      <motion.div
        className="absolute left-6 top-20 z-40 hidden h-8 w-8 border-l-2 border-t-2 border-[#f59e0b]/20 lg:left-10 lg:top-24 lg:block"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 2.6 }}
      />
      <motion.div
        className="absolute right-6 top-20 z-40 hidden h-8 w-8 border-r-2 border-t-2 border-[#f59e0b]/20 lg:right-10 lg:top-24 lg:block"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 2.6 }}
      />
      <motion.div
        className="absolute bottom-20 left-6 z-40 hidden h-8 w-8 border-b-2 border-l-2 border-[#f59e0b]/20 lg:bottom-24 lg:left-10 lg:block"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 2.6 }}
      />
      <motion.div
        className="absolute bottom-20 right-6 z-40 hidden h-8 w-8 border-b-2 border-r-2 border-[#f59e0b]/20 lg:bottom-24 lg:right-10 lg:block"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 2.6 }}
      />
    </>
  );
}

// -----------------------------------------------------------------------------
// Scroll Indicator
// -----------------------------------------------------------------------------

type ScrollIndicatorProps = {
  isVisible: boolean;
  onClick: () => void;
};

function ScrollIndicator({ isVisible, onClick }: ScrollIndicatorProps): React.ReactElement {
  return (
    <motion.div
      // mobile: Hide scroll indicator on small screens to prevent overlap with CTA
      className="absolute bottom-28 left-1/2 z-40 -translate-x-1/2 cursor-pointer lg:bottom-32 hidden md:block"
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : {}}
      transition={{ duration: 1, delay: 3 }}
      onClick={onClick}
    >
      <motion.div
        className="flex flex-col items-center gap-4"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#71717a]">
          Scroll to explore
        </span>

        <div className="relative flex h-12 w-7 items-start justify-center rounded-full border border-[#f59e0b]/30 p-2">
          <motion.div
            className="h-2 w-1.5 rounded-full bg-gradient-to-b from-[#f59e0b] to-[#d97706]"
            animate={{
              y: [0, 16, 0],
              opacity: [1, 0.5, 1],
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              boxShadow: "0 0 10px rgba(245,158,11,0.6)",
            }}
          />

          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(245,158,11,0)",
                "0 0 0 8px rgba(245,158,11,0.1)",
                "0 0 0 0 rgba(245,158,11,0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function CinematicHeroPro(): React.ReactElement {
  const containerRef = useRef<HTMLElement>(null);
  const phase = useSequencedEntrance();
  const { x: mouseX, y: mouseY } = useMouseParallax(15);
  const [mounted, setMounted] = useState(false);
  // mobile: Detect mobile for reducing particles and disabling parallax
  const isMobile = useIsMobile();

  // FIX: useTransform must be called unconditionally (React hooks rule)
  // We always compute the transforms but only apply them on non-mobile
  const transformedX = useTransform(mouseX, (v) => v * -0.5);
  const transformedY = useTransform(mouseY, (v) => v * -0.5);

  useEffect(() => {
    setMounted(true);
  }, []);
  // Pre-generated particles for consistency (client-only)
  // mobile: Reduce particle count by 70% on mobile for performance
  const dustParticles = useMemo(
    () => (mounted ? generateDustParticles(isMobile ? Math.floor(DUST_PARTICLES * 0.3) : DUST_PARTICLES) : []),
    [mounted, isMobile]
  );

  const sparkParticles = useMemo(
    () => (mounted ? generateSparkParticles(isMobile ? Math.floor(SPARK_PARTICLES * 0.3) : SPARK_PARTICLES) : []),
    [mounted, isMobile]
  );

  const curtainFolds = useMemo(() => generateCurtainFolds(12), []);

  // Derived states
  const curtainsOpen = phase !== "loading" && phase !== "curtains";
  const contentVisible = phase === "reveal" || phase === "complete";
  const effectsActive = phase === "complete";

  // Video handling
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Scroll handler
  const scrollToContent = useCallback(() => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }, []);

  return (
    <section
      ref={containerRef}
      // mobile: 85svh for CTA visibility, desktop: h-screen for full viewport + proper centering
      className="relative h-[85svh] md:h-screen w-full overflow-hidden bg-[#030303]"
    >
      {/* ============================================= */}
      {/* BACKGROUND LAYER */}
      {/* ============================================= */}

      {/* Background Image بدل الفيديو */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease: EASING_SMOOTH }}
      >
        <Image
          src="/images/hero/hero-bg.jpg"
          alt="Cinematic hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top sm:object-center"
          style={{ filter: 'brightness(0.9)' }}
        />

        {/* ONE light overlay only - for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(3,3,3,0.15) 0%, transparent 40%, transparent 60%, rgba(3,3,3,0.3) 100%)'
          }}
        />
      </motion.div>


      {/* Fallback gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(245,158,11,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_80%_50%,rgba(217,119,6,0.04),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_20%_80%,rgba(251,191,36,0.03),transparent_40%)]" />
      </div>

      {/* ============================================= */}
      {/* CINEMATIC CURTAINS */}
      {/* ============================================= */}

      <RealisticCurtain side="left" isOpen={curtainsOpen} folds={curtainFolds} />
      <RealisticCurtain side="right" isOpen={curtainsOpen} folds={curtainFolds} />

      {/* ============================================= */}
      {/* LETTERBOX BARS */}
      {/* ============================================= */}

      <Letterbox isVisible={curtainsOpen} />

      {/* ============================================= */}
      {/* LIGHTING & EFFECTS */}
      {/* ============================================= */}

      <SpotlightSystem mouseX={mouseX} mouseY={mouseY} isActive={effectsActive} />
      <DustSystem particles={dustParticles} isActive={contentVisible} />
      <SparkSystem particles={sparkParticles} isActive={effectsActive} />

      {/* ============================================= */}
      {/* MAIN CONTENT */}
      {/* ============================================= */}

      {/* mobile: Add pt-20 to clear navbar, disable parallax on touch devices */}
      <div className="relative z-30 flex h-full items-center justify-center px-4 pt-16 pb-8 sm:pt-0 sm:pb-0 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          style={isMobile ? undefined : {
            x: transformedX,
            y: transformedY,
          }}
        >
          {/* Studio Badge */}
          <motion.div
            // mobile: Reduce margin on mobile
            className="mb-4 sm:mb-8 inline-flex items-center gap-2 sm:gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={contentVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: TIMING.contentDelay / 1000, ease: EASING }}
          >
            <motion.span
              className="h-px w-10 bg-gradient-to-r from-transparent to-[#f59e0b]/60"
              animate={{ width: [40, 60, 40] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#f59e0b]">
              ✦ Cinematic Web Studio ✦
            </span>
            <motion.span
              className="h-px w-10 bg-gradient-to-l from-transparent to-[#f59e0b]/60"
              animate={{ width: [40, 60, 40] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            />
          </motion.div>

          {/* Main Title */}
          <AnimatedTitle isVisible={contentVisible} />

          {/* Tagline */}
          <motion.div
            // mobile: Reduce bottom margin on mobile
            className="mb-6 sm:mb-12"
            initial={{ opacity: 0 }}
            animate={contentVisible ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: TIMING.contentDelay / 1000 + 1, ease: EASING }}
          >
            {/* mobile: text-balance and smaller text on mobile */}
            <p className="mx-auto max-w-xl text-balance text-base leading-relaxed text-[#a1a1aa] sm:text-[1.1rem] md:text-[1.3rem]">
              We don't build websites.
            </p>
            <p className="mx-auto max-w-xl text-balance text-base font-medium leading-relaxed text-[#f8fafc] sm:text-[1.1rem] md:text-[1.3rem]">
              We craft <span className="text-gradient-gold">cinematic scenes</span>.
            </p>
            <motion.p
              className="mx-auto mt-3 sm:mt-4 max-w-md text-[0.8rem] sm:text-[0.85rem] text-[#71717a]"
              initial={{ opacity: 0 }}
              animate={contentVisible ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: TIMING.contentDelay / 1000 + 1.3 }}
            >
              Premium web surfaces for SaaS, startups & real businesses
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <MagneticButton
              href="/brief"
              variant="primary"
              isVisible={contentVisible}
              delay={TIMING.contentDelay / 1000 + 1.5}
            >
              Enter the Studio
              <motion.span
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                ✦
              </motion.span>
            </MagneticButton>

            <MagneticButton
              href="/work"
              variant="secondary"
              isVisible={contentVisible}
              delay={TIMING.contentDelay / 1000 + 1.7}
            >
              View Showreel
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      {/* ============================================= */}
      {/* SCROLL INDICATOR */}
      {/* ============================================= */}

      <ScrollIndicator isVisible={effectsActive} onClick={scrollToContent} />

      {/* ============================================= */}
      {/* CINEMATIC DETAILS */}
      {/* ============================================= */}

      <CinematicDetails isVisible={effectsActive} />

      {/* ============================================= */}
      {/* OVERLAYS */}
      {/* ============================================= */}

      <Vignette />
      <FilmGrain />
    </section>
  );
}