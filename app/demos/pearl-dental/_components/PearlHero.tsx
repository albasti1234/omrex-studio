"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function PearlHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div
      ref={ref}
      className="relative min-h-[90vh] flex items-end justify-center rounded-[32px] overflow-hidden bg-pd-text-main"
    >
      {/* Background Image Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y, opacity }}
      >
        <Image
          src="/images/pearl-dental/hero-smile.png"
          alt="Confident smile"
          fill
          className="object-cover object-center"
          priority
          quality={95}
        />
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.20_0.03_260)] via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.20_0.03_260)/0.7] via-transparent to-transparent" />
      </motion.div>

      {/* Floating Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-20 sm:pb-32 grid gap-12 lg:grid-cols-2 lg:items-end">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 text-white/90 text-sm font-medium mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pd-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pd-primary"></span>
            </span>
            Accepting new patients
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-white leading-[0.95] mb-6 drop-shadow-2xl">
            Confidence <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pd-primary-light to-white">
              designed.
            </span>
          </h1>

          <p className="text-lg text-white/80 max-w-xl leading-relaxed mb-8 font-light">
            Experience the new standard in dental care.
            Precision medicine meets spa-like comfort in the heart of the city.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/demos/pearl-dental/booking" className="pd-btn bg-white text-pd-text-main hover:bg-gray-100 hover:scale-105 border-none shadow-xl shadow-black/20">
              Book Appointment
            </Link>
            <Link href="/demos/pearl-dental/services" className="pd-btn bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-md">
              Our Services
            </Link>
          </div>
        </motion.div>

        {/* Floating Card Feature */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block justify-self-end"
        >
          <div className="w-[320px] rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-2xl shadow-black/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                ✨
              </div>
              <div>
                <div className="text-white font-semibold">Premium Care</div>
                <div className="text-white/60 text-xs uppercase tracking-wider">Guaranteed</div>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed border-t border-white/10 pt-4 mt-4">
              "The most comfortable dental experience of my life. I actually look forward to visiting."
            </p>
            <div className="mt-4 flex items-center gap-2 text-pd-primary-light text-sm font-medium">
              ★★★★★ <span className="text-white/40 text-xs ml-1">500+ Reviews</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </div>
  );
}
