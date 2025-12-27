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
        {/* Top Section - mobile: tighter padding */}
        <div className="py-12 sm:py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
            {/* Left Side - Brand & CTA - mobile: center text */}
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASING }}
            >
              {/* Logo - mobile: center */}
              <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
                <div className="relative flex h-10 w-10 items-center justify-center">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#f59e0b] to-[#d97706] opacity-20" />
                  <div className="absolute inset-[1px] rounded-lg bg-[#050507]" />
                  <span className="relative text-base font-bold text-[#f59e0b]">O</span>
                </div>
                <div>
                  <span className="text-lg font-semibold text-[#f8fafc]">OMREX.STUDIO</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#f8fafc] mb-4">
                Ready to build something
                <br />
                <span className="text-gradient-gold">cinematic?</span>
              </h3>

              <p className="text-[#a1a1aa] max-w-md mb-8 mx-auto lg:mx-0 text-sm sm:text-base">
                Let's create a web experience that stands out from the template crowd and actually converts.
              </p>

              {/* Buttons - mobile: full width, stacked */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link href="/brief">
                  <motion.button
                    className="btn-primary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Start Your Brief</span>
                    <span>✦</span>
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    className="btn-secondary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Get in Touch</span>
                    <span>→</span>
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Right Side - Links - mobile: 2 cols centered */}
            <motion.div
              className="grid grid-cols-2 gap-6 sm:gap-8 sm:grid-cols-3 text-center sm:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASING, delay: 0.2 }}
            >
              {/* Navigation */}
              <div>
                <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#f59e0b] mb-4">
                  Navigation
                </h4>
                <ul className="space-y-3">
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
                <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#f59e0b] mb-4">
                  Legal
                </h4>
                <ul className="space-y-3">
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
                <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#f59e0b] mb-4">
                  Contact
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="mailto:omar.abosoud@outlook.com"
                      className="text-[#a1a1aa] hover:text-[#f8fafc] transition-colors text-sm"
                    >
                      omar.abosoud@outlook.com
                    </a>
                    Working Worldwide
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom Section - mobile: center everything, more padding */}
        <motion.div
          className="py-6 sm:py-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-between sm:gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Copyright */}
          <p className="text-[12px] text-[#52525b]">
            © {new Date().getFullYear()} OMREX.STUDIO. All rights reserved.
          </p>

          {/* Social Links - mobile: larger touch targets */}
          <div className="flex items-center gap-3 sm:gap-4 order-first sm:order-none">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-11 w-11 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/10 text-[#71717a] transition-all hover:border-[#f59e0b]/50 hover:text-[#f59e0b]"
                aria-label={social.label}
              >
                <span className="text-sm">{social.icon}</span>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-full bg-[#f59e0b]/0 transition-all group-hover:bg-[#f59e0b]/10" />
              </a>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 text-[12px] text-[#52525b] hover:text-[#f59e0b] transition-colors"
          >
            <span>Back to top</span>
            <motion.span
              className="inline-block"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↑
            </motion.span>
          </button>
        </motion.div>
      </div>

      {/* Large background text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <div className="text-[15vw] font-bold text-white/[0.02] text-center leading-none select-none">
          OMREX
        </div>
      </div>
    </footer>
  );
}