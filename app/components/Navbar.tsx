"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

// -------------------------------------------------------------
// CONSTANTS
// -------------------------------------------------------------

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

const EASING = [0.16, 1, 0.3, 1] as const;

const THEME = {
  primary: "#d4a855",
  primaryLight: "#e8c878",
  primaryDark: "#b8923f",
  primaryRgb: "212, 168, 85",
  secondary: "#cd7f32",
  bg: "#0a0a0c",
  bgElevated: "#12121a",
  text: {
    primary: "#faf8f5",
    secondary: "#b8b5b0",
    muted: "#8a8580",
    dim: "#5a5550",
  },
} as const;

// -------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------

export default function Navbar(): React.ReactElement | null {
  const pathname = usePathname();

  // ✅ FIX: All hooks BEFORE any conditional returns
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  // ✅ FIX: Conditional return AFTER all hooks
  if (pathname?.startsWith("/demos") || pathname?.startsWith("/saas")) {
    return null;
  }

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: isScrolled
            ? 'linear-gradient(180deg, rgba(10,10,12,0.95) 0%, rgba(10,10,12,0.85) 100%)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(212,168,85,0.15)' : 'none',
          boxShadow: isScrolled ? '0 10px 40px -10px rgba(0,0,0,0.5)' : 'none',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: EASING }}
      >
        {/* Top accent line - improved visibility */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, transparent 10%, ${THEME.primary}60 50%, transparent 90%)`,
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{
            opacity: isScrolled ? 1 : 0,
            scaleX: isScrolled ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* mobile: Safe area + container constraint */}
        <nav className="mx-auto max-w-[560px] sm:max-w-[640px] md:max-w-6xl px-4 sm:px-6 lg:px-8 safe-top">
          <div className="flex h-14 items-center justify-between sm:h-16 md:h-20">

            {/* ✅ IMPROVED: Logo */}
            <Link href="/" className="group relative z-10">
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Logo mark - More cinematic */}
                <div className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center">
                  {/* Outer glow */}
                  <motion.div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle, rgba(${THEME.primaryRgb}, 0.3), transparent 70%)`,
                      filter: "blur(8px)",
                    }}
                  />

                  {/* Border gradient */}
                  <div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.primaryDark})`,
                      padding: "1px",
                    }}
                  >
                    <div
                      className="h-full w-full rounded-lg"
                      style={{ background: THEME.bg }}
                    />
                  </div>

                  {/* Letter */}
                  <span
                    className="relative text-sm sm:text-base font-bold tracking-tight"
                    style={{ color: THEME.primary }}
                  >
                    O
                  </span>

                  {/* Corner accents */}
                  <span
                    className="absolute top-0 right-0 h-2 w-2 border-t border-r rounded-tr-lg opacity-60"
                    style={{ borderColor: THEME.primary }}
                  />
                  <span
                    className="absolute bottom-0 left-0 h-2 w-2 border-b border-l rounded-bl-lg opacity-60"
                    style={{ borderColor: THEME.primary }}
                  />
                </div>

                {/* Logo text */}
                <div className="flex flex-col leading-tight">
                  <span
                    className="text-[0.8rem] sm:text-[0.9rem] font-semibold tracking-[0.08em]"
                    style={{ color: THEME.text.primary }}
                  >
                    OMREX
                  </span>
                  <span
                    className="text-[0.5rem] sm:text-[0.55rem] uppercase tracking-[0.25em]"
                    style={{ color: THEME.text.muted }}
                  >
                    Studio
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-10 md:flex">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group relative py-2"
                  >
                    <span
                      className="text-[0.8rem] font-medium tracking-wide transition-colors duration-300"
                      style={{
                        color: isActive ? THEME.primary : THEME.text.secondary,
                      }}
                    >
                      {link.label}
                    </span>

                    {/* ✅ FIX: Single unified indicator */}
                    <motion.span
                      className="absolute -bottom-0 left-0 h-[2px] rounded-full"
                      style={{ background: THEME.primary }}
                      initial={{ width: 0, opacity: 0 }}
                      animate={{
                        width: isActive ? "100%" : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      whileHover={{ width: "100%", opacity: 0.6 }}
                      transition={{ duration: 0.3, ease: EASING }}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA - Premium Luxury Style */}
            <div className="hidden md:block">
              <Link href="/brief">
                <motion.button
                  className="group relative overflow-hidden rounded-full px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em]"
                  style={{
                    background: `linear-gradient(145deg, ${THEME.primary}, ${THEME.primaryDark})`,
                    color: '#0a0a0c',
                    border: '1px solid rgba(232, 200, 120, 0.3)',
                    boxShadow: '0 4px 20px rgba(212, 168, 85, 0.2), inset 0 1px 0 rgba(255,255,255,0.15)',
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 8px 35px rgba(212, 168, 85, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Brief
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      style={{ fontSize: '0.75rem' }}
                    >
                      ✦
                    </motion.span>
                  </span>

                  {/* Subtle shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              </Link>
            </div>

            {/* ✅ IMPROVED: Mobile Menu Button - Proper X animation, 44px touch target */}
            <button
              onClick={toggleMenu}
              // mobile: Ensure 44px minimum touch target
              className="relative z-50 flex h-11 w-11 min-w-[44px] min-h-[44px] items-center justify-center rounded-lg md:hidden focus-ring"
              style={{
                background: isMobileMenuOpen ? `rgba(${THEME.primaryRgb}, 0.1)` : "transparent",
                border: `1px solid ${isMobileMenuOpen ? `rgba(${THEME.primaryRgb}, 0.3)` : "transparent"}`,
              }}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="relative flex h-4 w-5 flex-col items-center justify-center" style={{ marginTop: '-2px' }}>
                <motion.span
                  className="absolute h-[2px] w-5 rounded-full"
                  style={{ background: isMobileMenuOpen ? THEME.primary : THEME.text.primary }}
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 0 : -5,
                  }}
                  transition={{ duration: 0.3, ease: EASING }}
                />
                <motion.span
                  className="absolute h-[2px] w-5 rounded-full"
                  style={{ background: isMobileMenuOpen ? THEME.primary : THEME.text.primary }}
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                    scaleX: isMobileMenuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute h-[2px] w-5 rounded-full"
                  style={{ background: isMobileMenuOpen ? THEME.primary : THEME.text.primary }}
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? 0 : 5,
                  }}
                  transition={{ duration: 0.3, ease: EASING }}
                />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu - mobile: Add role=dialog for accessibility */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `${THEME.bg}f8`,
                backdropFilter: "blur(30px)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Decorative orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute top-[20%] -left-24 h-64 w-64 rounded-full"
                style={{
                  background: `radial-gradient(circle, rgba(${THEME.primaryRgb}, 0.15), transparent 70%)`,
                  filter: "blur(60px)",
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-[20%] -right-24 h-64 w-64 rounded-full"
                style={{
                  background: `radial-gradient(circle, rgba(${THEME.primaryRgb}, 0.1), transparent 70%)`,
                  filter: "blur(60px)",
                }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 6, repeat: Infinity, delay: 1 }}
              />
            </div>

            {/* Menu Content */}
            <motion.nav
              className="relative flex h-full flex-col justify-center px-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {/* Navigation Links */}
              <div className="space-y-1">
                {NAV_LINKS.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
                    >
                      <Link
                        href={link.href}
                        // mobile: Ensure 44px min touch target for nav links
                        className="group flex items-center justify-between py-5 min-h-[52px]"
                        style={{
                          borderBottom: `1px solid rgba(255,255,255,0.05)`,
                        }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center gap-5">
                          {/* Number */}
                          <span
                            className="text-[0.7rem] font-medium tabular-nums"
                            style={{ color: isActive ? THEME.primary : THEME.text.dim }}
                          >
                            0{index + 1}
                          </span>

                          {/* Active bar */}
                          <motion.span
                            className="h-8 w-[3px] rounded-full"
                            style={{
                              background: isActive ? THEME.primary : "transparent",
                            }}
                            whileHover={{ background: `rgba(${THEME.primaryRgb}, 0.5)` }}
                          />

                          {/* Label */}
                          <span
                            className="text-[1.6rem] font-semibold tracking-tight transition-colors"
                            style={{
                              color: isActive ? THEME.primary : THEME.text.primary,
                            }}
                          >
                            {link.label}
                          </span>
                        </div>

                        <motion.span
                          className="text-lg"
                          style={{ color: THEME.text.dim }}
                          initial={{ x: 0 }}
                          whileHover={{ x: 5, color: THEME.primary }}
                          transition={{ duration: 0.2 }}
                        >
                          →
                        </motion.span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA Button */}
              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <Link
                  href="/brief"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <motion.div
                    // mobile: Full width button with proper touch target
                    className="flex w-full items-center justify-center gap-3 rounded-full py-4 min-h-[52px] text-[0.8rem] font-semibold uppercase tracking-[0.15em]"
                    style={{
                      background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.primaryDark})`,
                      color: THEME.bg,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start Your Brief
                    <span>✦</span>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Bottom info */}
              <motion.div
                className="absolute bottom-10 left-8 right-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div
                  className="flex items-center justify-between text-[0.6rem] uppercase tracking-[0.25em]"
                  style={{ color: THEME.text.dim }}
                >
                  <span>OMREX.STUDIO</span>
                  <div className="flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 rounded-full animate-pulse"
                      style={{ background: THEME.primary }}
                    />
                    <span>Cinematic Web</span>
                  </div>
                </div>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}