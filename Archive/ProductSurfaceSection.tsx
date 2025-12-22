// app/components/ProductSurfaceSection.tsx


"use client";

import type { JSX } from "react";
import { motion } from "framer-motion";

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ProductSurfaceSection(): JSX.Element {
  return (
    <section id="product" className="py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: EASING }}
          className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
        >
          {/* LEFT – DEVICE / DASHBOARD VIEW */}
          <div className="relative">
            {/* Dual shadow under the card */}
            <div
              aria-hidden={true}
              className="pointer-events-none absolute inset-x-4 -bottom-8 -z-20 h-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.7),transparent_70%)] blur-2xl opacity-80"
            />
            <div
              aria-hidden={true}
              className="pointer-events-none absolute inset-x-12 -bottom-12 -z-20 h-12 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.55),transparent_75%)] blur-3xl opacity-70"
            />

            {/* Halo behind the whole frame */}
            <div
              aria-hidden={true}
              className="pointer-events-none absolute inset-0 -z-10 scale-105 rounded-[2.8rem] bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.42),transparent_60%)] blur-3xl opacity-85"
            />

            {/* Main card */}
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: EASING, delay: 0.05 }}
              animate={{ y: [0, -7, 0] }}
              whileHover={{ y: -6 }}
              className="relative overflow-hidden rounded-[2.1rem] border border-slate-800 bg-slate-950/75 px-4 py-4 shadow-[0_36px_130px_rgba(0,0,0,0.98)] backdrop-blur-2xl sm:px-6 sm:py-6"
            >
              {/* Outer rim-light that breathes softly */}
              <motion.div
                aria-hidden={true}
                className="pointer-events-none absolute inset-[2px] rounded-[2rem] border border-cyan-400/30"
                initial={{ opacity: 0.6, scale: 0.99 }}
                animate={{
                  opacity: [0.6, 1, 0.6],
                  scale: [0.99, 1.015, 0.99],
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Micro reflection wash on the glass */}
              <div
                aria-hidden={true}
                className="pointer-events-none absolute -inset-[14px] rounded-[2.4rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.13)_0%,transparent_36%,transparent_70%,rgba(2,6,23,0.96)_100%)] opacity-25 mix-blend-screen"
              />

              {/* Inner frame line */}
              <div className="pointer-events-none absolute inset-[4px] rounded-[1.9rem] border border-slate-900/70" />

              {/* HUD top bar – thinner padding */}
              <div className="relative flex items-center justify-between gap-2 rounded-[1.35rem] border border-slate-800 bg-slate-950/92 px-3 py-1.5 text-[10px] text-slate-300">
                <div className="flex items-center gap-2">
                  {/* animated dots */}
                  <div className="flex items-center gap-1.5">
                    <PulseDot delay={0} />
                    <PulseDot delay={0.8} />
                    <PulseDot delay={1.6} />
                  </div>
                  <span className="uppercase tracking-[0.22em] text-slate-400">
                    OMREX · PRODUCT SURFACE
                  </span>
                </div>
                <span className="hidden text-[9px] uppercase tracking-[0.2em] text-slate-500 sm:inline">
                  Live dashboard preview
                </span>
              </div>

              {/* Device frame */}
              <div className="relative mt-4 rounded-[1.7rem] border border-slate-800 bg-slate-950/95 p-3 shadow-[0_20px_80px_rgba(0,0,0,0.9)]">
                {/* top browser bar */}
                <div className="flex items-center gap-1.5 rounded-[1.1rem] border border-slate-800/70 bg-slate-900/95 px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-slate-600" />
                  <span className="h-2 w-2 rounded-full bg-slate-700" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400/80 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                  <span className="ml-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                    Product dashboard
                  </span>
                </div>

                {/* Screen container */}
                <div className="relative mt-3 overflow-hidden rounded-[1.2rem] border border-slate-800/80">
                  <div className="relative aspect-[16/9] bg-slate-950">
                    {/* REAL IMAGE – adjust the path if needed */}
                    <div className="absolute inset-0">
                      <div className="h-full w-full bg-[url('/images/flow/product-dashboard.png')] bg-cover bg-center" />
                    </div>

                    {/* subtle teal tint without washing out */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.2),transparent_70%)] opacity-90 mix-blend-soft-light" />

                    {/* shimmer sweep – very soft */}
                    <motion.div
                      aria-hidden={true}
                      className="pointer-events-none absolute inset-y-[-5%] left-[-35%] w-[38%] bg-gradient-to-r from-transparent via-cyan-100/10 to-transparent"
                      animate={{ x: ["0%", "190%"] }}
                      transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    {/* bottom cinematic fade */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/55" />
                  </div>

                  {/* thin inner rim */}
                  <div className="pointer-events-none absolute inset-0 rounded-[1.2rem] border border-slate-900/80" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT – TEXT CONTENT */}
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-400/80">
              PRODUCT SURFACE
            </p>

            <h3 className="text-balance text-2xl font-semibold leading-tight tracking-tight text-slate-50 sm:text-[1.9rem]">
              Pages that feel like your{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                product
              </span>
              , not just a landing page.
            </h3>

            <p className="max-w-xl text-sm leading-relaxed text-slate-400 sm:text-[0.95rem]">
              Instead of flat screenshots, the page behaves like a small version
              of your app. Clean panels, simple flows and clear states so people
              understand your product in seconds, not minutes.
            </p>

            <ul className="mt-2 space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="mt-[6px] inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
                <span>
                  Sections behave like clickable surfaces, not static banners.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-[6px] inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
                <span>
                  Clear story around onboarding, pricing and key actions.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-[6px] inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
                <span>
                  Easy to grow into deeper case studies without starting over.
                </span>
              </li>
            </ul>

            <div className="mt-3 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-400">
              {["SaaS & tools", "Dashboards", "Internal platforms"].map(
                (chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-slate-800 bg-slate-900/90 px-3 py-1"
                  >
                    {chip}
                  </span>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Small animated dot used in the HUD top bar
 */
type PulseDotProps = {
  delay?: number;
};

function PulseDot({ delay = 0 }: PulseDotProps): JSX.Element {
  return (
    <motion.span
      className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"
      style={{
        boxShadow: "0 0 12px rgba(52,211,153,0.95)",
      }}
      initial={{ opacity: 0.5, scale: 0.9 }}
      animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.15, 0.9] }}
      transition={{
        duration: 2.4,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}