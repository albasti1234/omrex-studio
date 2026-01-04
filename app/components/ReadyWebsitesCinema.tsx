// ============================================================
// 📁 PATH: components/ReadyWebsitesCinema.tsx
// ============================================================

"use client";

import { useRef, useState, useEffect, useCallback, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { DEMO_WEBSITES, type DemoWebsite } from "@/data/demos";

// =============================================================================
// CONSTANTS
// =============================================================================

const CARD_WIDTH = 300; // Base width for mobile
const CARD_WIDTH_DESKTOP = 350;
const CARD_GAP = 20;
const SCROLL_CARD_WIDTH = CARD_WIDTH + CARD_GAP; // 320px

const EASING = [0.16, 1, 0.3, 1] as const;

// =============================================================================
// UTILITY: Throttle function
// =============================================================================

function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): T {
  let inThrottle = false;
  return ((...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  }) as T;
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function ReadyWebsitesCinema() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const allDemos = DEMO_WEBSITES;
  const activeDemo = allDemos[activeIndex] || allDemos[0];
  const activeRoute = activeDemo?.status === "live" ? activeDemo.route : "/demos";

  // ✅ Throttled scroll handler (runs max 10 times/second)
  const handleScroll = useCallback(
    throttle(() => {
      if (!scrollRef.current) return;
      const scrollLeft = scrollRef.current.scrollLeft;
      // Account for the first "Browse All" button width (~164px with padding)
      const adjustedScroll = scrollLeft - 164;
      const rawIndex = Math.round(adjustedScroll / SCROLL_CARD_WIDTH);
      const newIndex = Math.max(0, Math.min(rawIndex, allDemos.length - 1));
      setActiveIndex(newIndex);
    }, 100),
    [allDemos.length]
  );

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Scroll to specific card
  const scrollToCard = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollPosition = 164 + index * SCROLL_CARD_WIDTH;
    container.scrollTo({ left: scrollPosition, behavior: "smooth" });
  }, []);

  return (
    <section className="relative py-24 overflow-hidden bg-[#0a0a0a]">
      {/* Section Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-white/60 to-transparent" />
            <span className="text-white/40 text-xs font-medium tracking-[0.3em] uppercase">
              Explore
            </span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
                Ready{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/70">
                  Websites
                </span>
              </h2>
              <p className="text-white/40 text-sm mt-3 max-w-md">
                Full websites you can explore. Click any card to browse the complete demo.
              </p>
            </div>

            {/* Desktop: View All Link */}
            <Link
              href="/demos"
              className="hidden md:flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors group"
            >
              <span>View All Demos</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollRef}
        className="relative flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 sm:px-6 pb-4 hide-scrollbar"
        style={{ scrollPaddingLeft: "24px" }}
      >
        {/* First Button - Browse All */}
        <BrowseAllButton prefersReducedMotion={prefersReducedMotion} />

        {/* Demo Cards */}
        {allDemos.map((demo, index) => (
          <DemoCard
            key={demo.id}
            demo={demo}
            index={index}
            isActive={activeIndex === index}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}

        {/* Last Button - View Full Website */}
        <ViewFullButton
          activeDemo={activeDemo}
          activeRoute={activeRoute}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>

      {/* Progress Indicator */}
      <div className="relative z-10 flex justify-center gap-2 mt-8">
        {allDemos.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToCard(index)}
            className={`h-1 rounded-full transition-all duration-300 ${activeIndex === index
              ? "w-8 bg-white/60"
              : "w-2 bg-white/20 hover:bg-white/30"
              }`}
            aria-label={`Go to demo ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// =============================================================================
// BROWSE ALL BUTTON (Memoized)
// =============================================================================

const BrowseAllButton = memo(function BrowseAllButton({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean | null;
}) {
  return (
    <motion.div
      className="flex-shrink-0 snap-start flex items-center"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href="/demos">
        <motion.button
          className="group relative h-[280px] sm:h-[320px] w-[100px] sm:w-[140px] flex flex-col items-center justify-center gap-3 sm:gap-4 border border-white/10 hover:border-white/30 rounded-2xl bg-white/[0.02] transition-all duration-300"
          whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Icon */}
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 group-hover:bg-white/5 transition-all duration-300">
            <svg
              className="w-5 h-5 text-white/60 group-hover:text-white transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </div>

          {/* Text */}
          <div className="text-center">
            <span className="text-white/70 text-sm font-medium group-hover:text-white transition-colors">
              Browse
            </span>
            <span className="block text-white/40 text-xs mt-1">All Demos</span>
          </div>
        </motion.button>
      </Link>
    </motion.div>
  );
});

// =============================================================================
// VIEW FULL BUTTON (Memoized)
// =============================================================================

const ViewFullButton = memo(function ViewFullButton({
  activeDemo,
  activeRoute,
  prefersReducedMotion,
}: {
  activeDemo: DemoWebsite;
  activeRoute: string;
  prefersReducedMotion: boolean | null;
}) {
  const isLive = activeDemo?.status === "live";

  return (
    <motion.div
      className="flex-shrink-0 snap-start flex items-center pr-6"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={activeRoute}>
        <motion.button
          className="group relative h-[280px] sm:h-[320px] w-[120px] sm:w-[160px] flex flex-col items-center justify-center gap-3 sm:gap-4 border border-white/10 hover:border-white/40 rounded-2xl bg-white/[0.02] transition-all duration-300"
          whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Arrow Icon */}
          <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/50 group-hover:bg-white/10 transition-all duration-300">
            <svg
              className="w-6 h-6 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>

          {/* Text */}
          <div className="text-center px-4">
            <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">
              View Full
            </span>
            <span className="block text-white/50 text-xs mt-1">Website →</span>
          </div>

          {/* Active demo indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <span
              className="text-[10px] tracking-wider uppercase px-3 py-1 rounded-full border transition-colors"
              style={{
                borderColor: isLive ? `${activeDemo.color.primary}40` : "rgba(255,255,255,0.1)",
                color: isLive ? activeDemo.color.primary : "rgba(255,255,255,0.3)",
              }}
            >
              {activeDemo?.title || "Demo"}
            </span>
          </div>
        </motion.button>
      </Link>
    </motion.div>
  );
});

// =============================================================================
// DEMO CARD (Memoized + Optimized)
// =============================================================================

const DemoCard = memo(function DemoCard({
  demo,
  index,
  isActive,
  prefersReducedMotion,
}: {
  demo: DemoWebsite;
  index: number;
  isActive: boolean;
  prefersReducedMotion: boolean | null;
}) {
  const isComingSoon = demo.status === "coming-soon";

  const CardContent = (
    <article
      className={`group relative w-[280px] sm:w-[320px] md:w-[350px] h-[280px] sm:h-[320px] rounded-2xl overflow-hidden border transition-all duration-500 ${isActive
        ? "border-white/40 shadow-2xl"
        : "border-white/10 hover:border-white/30"
        } ${isComingSoon ? "cursor-default" : "cursor-pointer"}`}
      style={{
        backgroundColor: demo.color.secondary,
        boxShadow: isActive
          ? `0 25px 80px -20px ${demo.color.primary}40, 0 0 0 1px ${demo.color.primary}30`
          : 'none',
      }}
    >
      {/* ✅ Optimized Image with lazy loading and blur placeholder */}
      <div className="absolute inset-0">
        <Image
          src={demo.thumbnail}
          alt={`${demo.title} preview`}
          fill
          sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 350px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 320"><rect fill="${demo.color.secondary}" width="350" height="320"/></svg>`
          ).toString("base64")}`}
        />
      </div>

      {/* ✅ Simplified overlay - single gradient instead of multiple */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, ${demo.color.primary}15 100%)`,
        }}
      />

      {/* Coming Soon Badge */}
      {isComingSoon && (
        <div className="absolute top-4 right-4 z-20">
          <span className="text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full bg-black/50 text-white/60 backdrop-blur-sm border border-white/10">
            Coming Soon
          </span>
        </div>
      )}

      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-20">
        <span
          className="text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full backdrop-blur-sm"
          style={{
            backgroundColor: `${demo.color.primary}30`,
            color: demo.color.primary,
            border: `1px solid ${demo.color.primary}40`,
          }}
        >
          {demo.category}
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <h3 className="text-2xl font-light text-white mb-1 group-hover:text-white/90 transition-colors">
          {demo.title}
        </h3>

        <p className="text-white/50 text-sm mb-4">{demo.subtitle}</p>

        <div className="flex flex-wrap gap-2">
          {demo.features.slice(0, 3).map((feature) => (
            <span
              key={feature}
              className="text-[10px] tracking-wider uppercase px-2 py-1 rounded bg-white/10 text-white/50 border border-white/5"
            >
              {feature}
            </span>
          ))}
          {demo.features.length > 3 && (
            <span className="text-[10px] text-white/30">+{demo.features.length - 3}</span>
          )}
        </div>

        {/* Arrow indicator */}
        {!isComingSoon && (
          <div
            className="absolute bottom-6 right-6 w-10 h-10 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ borderColor: `${demo.color.primary}60` }}
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
              style={{ color: demo.color.primary }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        )}
      </div>

      {/* ✅ REMOVED: Heavy blur-3xl decorative element */}
      {/* ✅ REMOVED: Multiple gradient overlays */}
    </article>
  );

  // ✅ Simplified animation - only on initial view, not on hover for better performance
  return (
    <motion.div
      className="flex-shrink-0 snap-start"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      whileHover={prefersReducedMotion || isComingSoon ? {} : { y: -6 }}
    >
      {isComingSoon ? (
        <div>{CardContent}</div>
      ) : (
        <Link href={demo.route} prefetch={false}>
          {CardContent}
        </Link>
      )}
    </motion.div>
  );
});