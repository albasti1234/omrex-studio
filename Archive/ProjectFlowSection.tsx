// app/components/ProjectFlowSection.tsx


"use client";

import type { JSX } from "react";
import { motion } from "framer-motion";

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function StudioOSSection(): JSX.Element {
  return (
    <section id="studio-os" className="py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASING }}
          className="max-w-3xl"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-400/80">
            STUDIO OS
          </p>
          <h2 className="mt-3 text-balance text-2xl font-semibold leading-tight tracking-tight text-slate-50 sm:text-[1.9rem]">
            One desktop where launches, products and client flows work together.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-[0.95rem]">
            OMREX runs like a small operating system for serious websites. Launch
            pages, product stories and live client flows sit on the same glass
            desktop, ready to go live together.
          </p>
        </motion.div>

        {/* OS DESKTOP CARD */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASING, delay: 0.05 }}
          className="relative mt-10 rounded-[2.2rem] border border-slate-800 bg-slate-950/80 px-4 py-5 shadow-[0_30px_120px_rgba(0,0,0,0.96)] backdrop-blur-2xl sm:px-6 sm:py-6"
        >
          {/* subtle inner frame + grid */}
          <div className="pointer-events-none absolute inset-[2px] rounded-[2.05rem] border border-slate-800/70" />
          <div className="pointer-events-none absolute inset-0 rounded-[2.2rem] opacity-[0.06] mix-blend-soft-light [background-image:linear-gradient(to_right,rgba(15,23,42,0.9)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.9)_1px,transparent_1px)] [background-size:70px_70px]" />
          <div className="pointer-events-none absolute inset-0 rounded-[2.2rem] bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.22),transparent_65%)] opacity-90 mix-blend-screen" />

          {/* TOP BAR */}
          <div className="relative flex flex-wrap items-center justify-between gap-3 rounded-[1.4rem] border border-slate-800 bg-slate-950/85 px-4 py-2 text-[10px] text-slate-300">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
              <span className="uppercase tracking-[0.26em] text-slate-400">
                OMREX.STUDIO · DESKTOP
              </span>
            </div>
            <span className="hidden text-[9px] uppercase tracking-[0.2em] text-slate-500 sm:inline">
              Launch · Product · Client flows
            </span>
          </div>

          {/* CONTENT: LEFT TEXT + RIGHT WINDOWS */}
          <div className="relative mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.6fr)]">
            {/* LEFT – description */}
            <div className="space-y-3 text-[0.85rem] text-slate-300">
              <p>
                Pick a lane for each project: a sharp launch page, a deeper
                product story or a tab of live flows for real clients.
              </p>
              <p>
                Everything lives in the same cinematic system under the hero, so
                the site still feels like OMREX instead of three different
                templates stitched together.
              </p>

              <div className="mt-4 grid gap-2 text-[0.75rem] text-slate-400 sm:grid-cols-2">
                <InfoRow label="Desktop" value="Cinematic, one surface" />
                <InfoRow label="States" value="Launch · Product · Flows" />
                <InfoRow label="Built for" value="Real clients, not mockups" />
                <InfoRow label="Stack" value="Next.js · TS · Motion" />
              </div>
            </div>

            {/* RIGHT – stacked windows */}
            <div className="relative space-y-3">
              <OSWindow
                label="CLIENT FLOWS LAB"
                badge="FLOWS"
                glow
                lines={3}
                accent="rgba(56,189,248,0.95)"
              >
                <SlotRow title="Restaurant flow" status="Live preview" />
                <SlotRow title="Clinic flow" status="Config ready" />
                <SlotRow title="Law firm flow" status="Stable" />
              </OSWindow>

              <OSWindow
                label="LAUNCH ROOM"
                badge="ACTIVE"
                lines={2}
                accent="rgba(56,189,248,0.7)"
              />

              <OSWindow
                label="PRODUCT SURFACE"
                badge="CONFIG"
                lines={2}
                accent="rgba(56,189,248,0.7)"
              >
                <SlotRow title="Product story" status="Live preview" />
              </OSWindow>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* =============== SMALL SUB-COMPONENTS =============== */

type InfoRowProps = {
  label: string;
  value: string;
};

function InfoRow({ label, value }: InfoRowProps): JSX.Element {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2">
      <span className="text-[0.68rem] uppercase tracking-[0.22em] text-slate-500">
        {label}
      </span>
      <span className="text-[0.75rem] text-slate-200">{value}</span>
    </div>
  );
}

type OSWindowProps = {
  label: string;
  badge: string;
  lines?: number;
  glow?: boolean;
  accent?: string;
  children?: React.ReactNode;
};

function OSWindow({
  label,
  badge,
  lines = 3,
  glow = false,
  accent = "rgba(56,189,248,0.9)",
  children,
}: OSWindowProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASING }}
      className="relative rounded-[1.6rem] border border-slate-800 bg-slate-950/85 px-4 py-3 shadow-[0_18px_70px_rgba(0,0,0,0.9)]"
    >
      {glow && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-[10px] rounded-[1.9rem] opacity-80 blur-2xl"
          style={{
            background: `radial-gradient(circle_at_top, ${accent}, transparent 65%)`,
          }}
          initial={{ opacity: 0.5, scale: 0.98 }}
          animate={{ opacity: [0.5, 0.9, 0.5], scale: [0.98, 1.02, 0.98] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* header */}
      <div className="relative mb-3 flex items-center justify-between gap-2 text-[10px] text-slate-300">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          <span className="uppercase tracking-[0.22em] text-slate-400">
            {label}
          </span>
        </div>
        <span className="rounded-full border border-slate-700 bg-slate-900/80 px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-slate-400">
          {badge}
        </span>
      </div>

      {/* body */}
      <div className="relative space-y-1.5">
        {[...Array(lines)].map((_, i) => (
          <div
            key={i}
            className="h-1.5 rounded-full bg-slate-800/90"
          />
        ))}

        {children && <div className="mt-3 space-y-2">{children}</div>}
      </div>
    </motion.div>
  );
}

type SlotRowProps = {
  title: string;
  status: string;
};

function SlotRow({ title, status }: SlotRowProps): JSX.Element {
  return (
    <div className="flex items-center justify-between gap-2 rounded-full border border-slate-800 bg-slate-950/80 px-3 py-1.5 text-[0.75rem] text-slate-200">
      <span>{title}</span>
      <span className="text-[0.7rem] text-cyan-300">{status}</span>
    </div>
  );
}