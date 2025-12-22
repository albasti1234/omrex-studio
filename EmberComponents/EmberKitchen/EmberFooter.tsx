// ============================================================
// 📁 PATH: components/EmberKitchen/EmberFooter.tsx
// ============================================================

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function EmberFooter() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <footer ref={ref} className="relative bg-[#0d0d0d] pt-24 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1714] to-transparent opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        {/* CTA Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#d4a574] text-xs tracking-[0.4em] uppercase">Join Us</span>
          <h2 className="font-display text-4xl md:text-5xl text-[#f5f0e8] mt-4 mb-6">
            Reserve Your Table
          </h2>
          <Link href="/demos/ember-kitchen/reservations">
            <motion.button
              className="px-8 py-4 font-body text-xs font-medium tracking-[0.2em] uppercase text-[#0d0d0d] bg-[#d4a574] hover:bg-[#e8c9a0] transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Make a Reservation
            </motion.button>
          </Link>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className="h-px w-24 bg-[#d4a574]/30" />
          <span className="text-[#d4a574]">✦</span>
          <span className="h-px w-24 bg-[#d4a574]/30" />
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <span className="text-[#d4a574] text-xs">✦</span>
              <h3 className="font-display text-2xl tracking-[0.15em] text-[#f5f0e8] mt-2">
                EMBER
              </h3>
              <span className="font-elegant text-xs tracking-[0.3em] text-[#d4a574] uppercase">
                Kitchen
              </span>
            </div>
            <p className="font-elegant text-sm text-[#f5f0e8]/50 leading-relaxed">
              Where fire meets artistry. An unforgettable journey through 
              flame-crafted cuisine.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-body text-xs tracking-[0.25em] uppercase text-[#d4a574] mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/demos/ember-kitchen/menu", label: "Our Menu" },
                { href: "/demos/ember-kitchen/about", label: "Our Story" },
                { href: "/demos/ember-kitchen/gallery", label: "Gallery" },
                { href: "/demos/ember-kitchen/reservations", label: "Reservations" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-elegant text-[#f5f0e8]/60 hover:text-[#f5f0e8] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs tracking-[0.25em] uppercase text-[#d4a574] mb-6">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/demos/ember-kitchen/contact"
                  className="font-elegant text-[#f5f0e8]/60 hover:text-[#f5f0e8] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/demos/ember-kitchen/contact"
                  className="font-elegant text-[#f5f0e8]/60 hover:text-[#f5f0e8] transition-colors"
                >
                  Private Events
                </Link>
              </li>
              <li>
                <Link
                  href="/demos/ember-kitchen/contact"
                  className="font-elegant text-[#f5f0e8]/60 hover:text-[#f5f0e8] transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Visit */}
          <div>
            <h4 className="font-body text-xs tracking-[0.25em] uppercase text-[#d4a574] mb-6">
              Visit Us
            </h4>
            <div className="space-y-4 font-elegant text-[#f5f0e8]/60">
              <p>
                123 Culinary Avenue<br />
                Downtown District<br />
                New York, NY 10001
              </p>
              <p>
                <span className="text-[#d4a574]">T:</span> +1 (555) 123-4567
              </p>
              <p>
                <span className="text-[#d4a574]">E:</span> hello@emberkitchen.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#d4a574]/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-[#f5f0e8]/40 tracking-wider">
              © 2024 Ember Kitchen. All rights reserved.
            </p>
            <Link 
              href="/work" 
              className="font-body text-xs text-[#d4a574]/60 hover:text-[#d4a574] transition-colors"
            >
              ← Back to Portfolio
            </Link>
            <p className="font-elegant text-xs text-[#f5f0e8]/30 italic">
              Crafted by <span className="text-[#d4a574]">OMREX.STUDIO</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}