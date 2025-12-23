"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

// -------------------------------------------------------------
// CONSTANTS
// -------------------------------------------------------------

const FOOTER_LINKS = {
  navigation: [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

const SOCIAL_LINKS = [
  { href: "https://twitter.com/omrexstudio", label: "Twitter", icon: "𝕏" },
  { href: "https://instagram.com/omrexstudio", label: "Instagram", icon: "◎" },
  { href: "https://linkedin.com/company/omrexstudio", label: "LinkedIn", icon: "in" },
  { href: "https://dribbble.com/omrexstudio", label: "Dribbble", icon: "◉" },
];

const EASING = [0.16, 1, 0.3, 1] as const;

// -------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------

export default function Footer(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <footer ref={ref} className="relative border-t border-white/5">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] bg-[radial-gradient(circle,rgba(245,158,11,0.05),transparent_60%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top Section - mobile: compact padding */}
        <div className="py-8 sm:py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-8">
            {/* Left Side - Brand & CTA - mobile: left aligned layout */}
            <motion.div
              className="text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASING }}
            >
              {/* Row: Logo + Info on left, Buttons on right */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                {/* Left Column: Logo + Text */}
                <div className="flex-1">
                  {/* Logo */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-3">
                    <div className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center">
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#f59e0b] to-[#d97706] opacity-20" />
                      <div className="absolute inset-[1px] rounded-lg bg-[#050507]" />
                      <span className="relative text-sm sm:text-base font-bold text-[#f59e0b]">O</span>
                    </div>
                    <span className="text-sm sm:text-lg font-semibold text-[#f8fafc]">OMREX.STUDIO</span>
                  </div>

                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#f8fafc] mb-2">
                    Ready to build something <span className="text-gradient-gold">cinematic?</span>
                  </h3>

                  <p className="text-[#71717a] max-w-xs text-xs sm:text-sm">
                    Premium web experiences that convert.
                  </p>
                </div>

                {/* Right Column: Buttons - stacked vertically */}
                <div className="flex flex-col gap-2 sm:gap-3 sm:min-w-[160px]">
                  <Link href="/brief">
                    <motion.button
                      className="btn-primary w-full text-xs sm:text-sm py-2.5 sm:py-3"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Start Brief</span>
                      <span>✦</span>
                    </motion.button>
                  </Link>
                  <Link href="/contact">
                    <motion.button
                      className="btn-secondary w-full text-xs sm:text-sm py-2.5 sm:py-3"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Get in Touch</span>
                      <span>→</span>
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Links with OMREX watermark behind */}
            <div className="relative">
              {/* OMREX Watermark - behind links */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                <span className="text-[20vw] sm:text-[12vw] font-bold text-white/[0.02] select-none">OMREX</span>
              </div>

              <motion.div
                className="relative grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 text-left" initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: EASING, delay: 0.2 }}
              >
                {/* Navigation */}
                <div>
                  <h4 className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#f59e0b] mb-3 sm:mb-4">
                    Navigation
                  </h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {FOOTER_LINKS.navigation.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-[#a1a1aa] hover:text-[#f8fafc] transition-colors text-sm"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Legal */}
                <div>
                  <h4 className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#f59e0b] mb-3 sm:mb-4">
                    Legal
                  </h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {FOOTER_LINKS.legal.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-[#a1a1aa] hover:text-[#f8fafc] transition-colors text-sm"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Info */}
                <div className="col-span-2 sm:col-span-1">
                  <h4 className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#f59e0b] mb-3 sm:mb-4">
                    Contact
                  </h4>
                  <ul className="space-y-2 sm:space-y-3">
                    <li>
                      <a
                        href="mailto:omar.abosoud@outlook.com"
                        className="text-[#a1a1aa] hover:text-[#f59e0b] transition-colors text-xs sm:text-sm inline-flex items-center gap-1.5"
                      >
                        <span>✉</span> Email us
                      </a>
                    </li>
                    <li className="text-[#71717a] text-xs sm:text-sm">
                      🌍 Working Worldwide
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom Section - all items centered on mobile */}
        <motion.div
          className="py-5 sm:py-6 flex flex-col items-center gap-5 sm:gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Social Links - centered */}
          <div className="flex items-center justify-center gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-11 w-11 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 text-[#71717a] transition-all hover:border-[#f59e0b]/50 hover:text-[#f59e0b]"
                aria-label={social.label}
              >
                <span className="text-sm">{social.icon}</span>
                <div className="absolute inset-0 rounded-full bg-[#f59e0b]/0 transition-all group-hover:bg-[#f59e0b]/10" />
              </a>
            ))}
          </div>

          {/* Copyright + Back to top - row on desktop, stacked on mobile */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-[11px] sm:text-[12px] text-[#52525b]">
            <p>
              © {new Date().getFullYear()} OMREX.STUDIO
            </p>

            <span className="hidden sm:block">•</span>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-1.5 hover:text-[#f59e0b] transition-colors"
            >
              <span>Back to top</span>
              <motion.span
                className="inline-block"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↑
              </motion.span>
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}