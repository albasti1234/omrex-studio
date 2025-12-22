"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

// -------------------------------------------------------------
// CONSTANTS
// -------------------------------------------------------------

const EASING = [0.16, 1, 0.3, 1] as const;

const SERVICES = [
  {
    id: "cinematic-sites",
    number: "01",
    title: "Cinematic Websites",
    description: "Full website design and development with cinematic animations, smooth transitions, and premium feel. Built to impress and convert.",
    features: ["Custom Design", "Framer Motion", "Next.js", "Responsive"],
    price: "Starting at $3,500",
    icon: "◈",
    color: "#f59e0b",
  },
  {
    id: "landing-pages",
    number: "02",
    title: "Launch Pages",
    description: "High-converting landing pages for product launches, SaaS, and campaigns. Focused on one goal: conversion.",
    features: ["Conversion Focused", "A/B Ready", "Fast Loading", "Analytics"],
    price: "Starting at $1,500",
    icon: "◇",
    color: "#fbbf24",
  },
  {
    id: "saas-interfaces",
    number: "03",
    title: "SaaS Interfaces",
    description: "Dashboard designs and marketing sites for SaaS products. Clean, functional, and beautiful.",
    features: ["Dashboard UI", "Marketing Site", "Components", "Dark Mode"],
    price: "Starting at $4,500",
    icon: "▹",
    color: "#d97706",
  },
  {
    id: "design-systems",
    number: "04",
    title: "Design Systems",
    description: "Comprehensive design systems with components, guidelines, and documentation for your team.",
    features: ["Components", "Guidelines", "Figma Files", "Documentation"],
    price: "Starting at $2,500",
    icon: "◎",
    color: "#78716c",
  },
];

// -------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------

export default function ServicesSection(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 sm:py-32 overflow-hidden" id="services">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.03),transparent_60%)] blur-3xl" />
        <div className="absolute top-1/4 right-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(120,113,108,0.03),transparent_60%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASING }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#f59e0b]/50" />
            <span className="label">Services</span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#f59e0b]/50" />
          </div>

          <h2 className="heading-lg mb-4">
            What I <span className="text-gradient-gold">build</span>
          </h2>

          <p className="body-md max-w-xl mx-auto">
            Specialized in crafting premium web experiences that stand out from the template crowd.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: EASING }}
        >
          <p className="text-[#71717a] mb-6">
            Not sure what you need? Let's discuss your project.
          </p>
          <Link href="/contact">
            <motion.button
              className="btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Schedule a Call</span>
              <span>→</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// SERVICE CARD
// -------------------------------------------------------------

type ServiceCardProps = {
  service: typeof SERVICES[number];
  index: number;
  isInView: boolean;
};

function ServiceCard({ service, index, isInView }: ServiceCardProps): React.ReactElement {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: EASING }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative"
    >
      <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#111113] p-6 sm:p-8 transition-all duration-500 hover:border-white/20">
        {/* Spotlight effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${service.color}10, transparent 40%)`,
          }}
        />

        {/* Top row */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5"
              animate={{
                borderColor: isHovered ? `${service.color}50` : "rgba(255,255,255,0.1)",
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xl" style={{ color: service.color }}>
                {service.icon}
              </span>
            </motion.div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#52525b]">
              {service.number}
            </span>
          </div>

          {/* Arrow */}
          <motion.div
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[#52525b]"
            animate={{
              borderColor: isHovered ? `${service.color}50` : "rgba(255,255,255,0.1)",
              color: isHovered ? service.color : "#52525b",
              x: isHovered ? 4 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            →
          </motion.div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-[#f8fafc] mb-3 group-hover:text-[#f59e0b] transition-colors">
          {service.title}
        </h3>

        <p className="text-[#a1a1aa] text-sm leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-6">
          {service.features.map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.1em] text-[#71717a]"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="pt-4 border-t border-white/5">
          <span className="text-sm text-[#f59e0b] font-medium">
            {service.price}
          </span>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px]"
          style={{ backgroundColor: service.color }}
          initial={{ width: 0 }}
          animate={{ width: isHovered ? "100%" : 0 }}
          transition={{ duration: 0.4, ease: EASING }}
        />
      </div>
    </motion.div>
  );
}