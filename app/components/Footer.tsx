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
    { href: "/demos", label: "Demos" },
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

// -------------------------------------------------------------
// MAIN COMPONENT - PREMIUM CINEMATIC
// -------------------------------------------------------------

export default function Footer(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="relative overflow-hidden">
      {/* Top Border - Animated Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[1px]">
        <motion.div
          className="h-full w-full"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #d4a855 50%, transparent 100%)',
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '200% 0%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main Glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212,168,85,0.08), transparent 60%)',
            filter: 'blur(100px)',
          }}
        />
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(212,168,85,0.03),transparent_60%)]" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(212,168,85,0.03),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="py-16 sm:py-20 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">

            {/* Left Side - Brand & CTA */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Logo */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-[#d4a855]/50 bg-[#0a0a0c]">
                  <span className="text-lg font-bold text-[#d4a855]">O</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-white tracking-wide">OMREX</span>
                  <span className="text-xl font-light text-[#d4a855]">.STUDIO</span>
                </div>
              </div>

              {/* Tagline */}
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Ready for something{' '}
                <span
                  className="inline-block"
                  style={{
                    background: 'linear-gradient(135deg, #f5d485 0%, #d4a855 50%, #b8923f 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  cinematic?
                </span>
              </h3>

              <p className="text-[#8a8580] max-w-sm text-sm mb-8">
                Premium web experiences that captivate audiences and convert visitors into customers.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/brief">
                  <motion.button
                    className="group relative px-8 py-4 rounded-full overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Animated Border */}
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
                      Start Brief <span className="group-hover:rotate-45 transition-transform">✦</span>
                    </span>
                  </motion.button>
                </Link>

                <Link href="/contact">
                  <motion.button
                    className="px-8 py-4 rounded-full border border-white/10 hover:border-[#d4a855]/40 text-white/80 hover:text-white font-medium text-sm uppercase tracking-widest transition-all duration-300 hover:bg-[#d4a855]/5"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center gap-2">
                      Get in Touch <span>→</span>
                    </span>
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Right Side - Links */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Watermark - smaller to prevent clipping */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-[0.015]">
                <span className="text-[8vw] font-bold text-white select-none tracking-widest">OMREX</span>
              </div>

              <div className="relative grid grid-cols-2 gap-8 sm:grid-cols-3">
                {/* Navigation */}
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d4a855] mb-5">
                    Navigation
                  </h4>
                  <ul className="space-y-3">
                    {FOOTER_LINKS.navigation.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-[#8a8580] hover:text-white transition-colors text-sm group inline-flex items-center gap-2"
                        >
                          <span className="w-0 group-hover:w-3 h-[1px] bg-[#d4a855] transition-all duration-300" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Legal */}
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d4a855] mb-5">
                    Legal
                  </h4>
                  <ul className="space-y-3">
                    {FOOTER_LINKS.legal.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-[#8a8580] hover:text-white transition-colors text-sm group inline-flex items-center gap-2"
                        >
                          <span className="w-0 group-hover:w-3 h-[1px] bg-[#d4a855] transition-all duration-300" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                <div className="col-span-2 sm:col-span-1">
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d4a855] mb-5">
                    Contact
                  </h4>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="mailto:omar.abosoud@outlook.com"
                        className="text-[#8a8580] hover:text-[#d4a855] transition-colors text-sm inline-flex items-center gap-2"
                      >
                        <span className="text-[#d4a855]">✉</span> Email us
                      </a>
                    </li>
                    <li className="text-[#5a5550] text-sm flex items-center gap-2">
                      <span className="text-[#d4a855]">🌍</span> Working Worldwide
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d4a855]/20 to-transparent" />

        {/* Bottom Section */}
        <motion.div
          className="py-8 flex flex-col items-center gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Social Links */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300"
                style={{
                  background: 'linear-gradient(145deg, rgba(20,20,30,0.8), rgba(10,10,15,0.9))',
                  border: '1px solid rgba(212,168,85,0.1)',
                }}
                aria-label={social.label}
              >
                <span className="text-[#8a8580] group-hover:text-[#d4a855] transition-colors text-sm">
                  {social.icon}
                </span>
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow: '0 0 20px rgba(212,168,85,0.3), inset 0 0 10px rgba(212,168,85,0.1)',
                  }}
                />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-[12px] text-[#5a5550]">
            <p>© {new Date().getFullYear()} OMREX.STUDIO — All rights reserved</p>
            <span className="hidden sm:block text-[#d4a855]/30">✦</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 hover:text-[#d4a855] transition-colors group"
            >
              <span>Back to top</span>
              <motion.span
                className="inline-block"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
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