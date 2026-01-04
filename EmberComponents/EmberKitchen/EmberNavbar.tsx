// ============================================================
// 📁 PATH: components/EmberKitchen/EmberNavbar.tsx
// ============================================================

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/demos/ember-kitchen", label: "Home" },
  { href: "/demos/ember-kitchen/menu", label: "Menu" },
  { href: "/demos/ember-kitchen/about", label: "Our Story" },
  { href: "/demos/ember-kitchen/gallery", label: "Gallery" },
  { href: "/demos/ember-kitchen/reservations", label: "Reservations" },
  { href: "/demos/ember-kitchen/contact", label: "Contact" },
];

export default function EmberNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-[#0d0d0d]/95 backdrop-blur-md py-4" 
            : "bg-transparent py-6"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/demos/ember-kitchen" className="group">
              <div className="flex flex-col items-center">
                <span className="text-[#d4a574] text-xs mb-1">✦</span>
                <span className="font-display text-2xl tracking-[0.15em] text-[#f5f0e8]">
                  EMBER
                </span>
                <span className="font-elegant text-[0.65rem] tracking-[0.35em] text-[#d4a574] uppercase mt-0.5">
                  Kitchen
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.slice(0, -1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative font-body text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[#f5f0e8]/70 hover:text-[#f5f0e8] transition-colors"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#d4a574] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Reserve Button */}
            <div className="hidden lg:block">
              <Link href="/demos/ember-kitchen/reservations">
                <motion.button
                  className="relative overflow-hidden border border-[#d4a574] px-6 py-3 text-[0.65rem] font-medium tracking-[0.25em] uppercase text-[#d4a574] hover:text-[#0d0d0d] transition-colors duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Reserve</span>
                  <div className="absolute inset-0 bg-[#d4a574] -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="block h-px w-6 bg-[#d4a574]" />
              <span className="block h-px w-4 bg-[#d4a574] ml-auto" />
              <span className="block h-px w-5 bg-[#d4a574] ml-auto" />
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-[#0d0d0d]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close Button */}
            <button
              className="absolute right-6 top-6 p-2 text-[#d4a574]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Logo */}
            <div className="absolute left-6 top-6">
              <span className="font-display text-xl tracking-[0.15em] text-[#f5f0e8]">EMBER</span>
            </div>

            {/* Navigation Links */}
            <div className="flex h-full flex-col items-center justify-center gap-8">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-display text-3xl tracking-[0.1em] text-[#f5f0e8] hover:text-[#d4a574] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Back to Portfolio */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <Link
                href="/work"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-body text-xs tracking-[0.2em] uppercase text-[#d4a574]/50 hover:text-[#d4a574]"
              >
                ← Back to Portfolio
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}