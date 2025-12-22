// app/components/SurfacePreviewSection.tsx

"use client";

import React from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASING,
      when: "beforeChildren",
      staggerChildren: 0.07,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASING },
  },
};

const tabletVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: EASING },
  },
};

function scrollToContact() {
  if (typeof document === "undefined") return;
  const el = document.getElementById("contact");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function SurfacePreviewSection() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-1, 1], [6, -6]);
  const rotateY = useTransform(mouseX, [-1, 1], [-8, 8]);
  const translateY = useTransform(mouseY, [-1, 1], [-6, 6]);
  const translateX = useTransform(mouseX, [-1, 1], [-4, 4]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    mouseX.set(x * 2 - 1);
    mouseY.set(y * 2 - 1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    // لا خلفية محلية ولا فيد—الخلفية تأتي من layout/hero فقط
    <section className="relative py-16 sm:py-20">
      <motion.div
        className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 sm:px-6 md:flex-row md:items-start md:gap-16 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* LEFT: نص / شرح */}
        <div className="relative z-10 max-w-xl md:flex-1">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-[#151F28] bg-[#020509]/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9CC9E8] shadow-[0_0_26px_rgba(0,0,0,0.9)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#9CC9E8] shadow-[0_0_12px_rgba(156,201,232,0.9)]" />
            OMREX.STUDIO
            <span className="rounded-full bg-[#050910]/90 px-2 py-0.5 text-[10px] font-normal text-slate-300">
              Cinematic surface preview
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="mt-6 text-balance text-3xl font-semibold leading-tight tracking-tight text-slate-50 sm:text-4xl lg:text-[2.45rem]"
          >
            Inside an{" "}
            <span className="bg-gradient-to-r from-[#E5EDF5] via-[#D9E6F3] to-[#9CC9E8] bg-clip-text text-transparent">
              OMREX cinematic surface
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-4 max-w-lg text-sm leading-relaxed text-slate-300/90 sm:text-[0.98rem]"
          >
            This is how your launch, SaaS product or studio site actually feels
            when it&apos;s live — a focused, cinematic surface built around a
            single story, not a generic template.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={scrollToContact}
              className="inline-flex items-center justify-center rounded-full bg-[#9CC9E8] px-6 py-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-[#020509] shadow-[0_0_32px_rgba(156,201,232,0.8)] transition hover:bg-[#E5EDF5]"
            >
              Start a cinematic build
              <span className="ml-1.5 text-[0.9rem]">✦</span>
            </button>

            <Link
              href="/work"
              className="inline-flex items-center justify-center rounded-full border border-[#151F28] bg-[#020509]/90 px-6 py-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-slate-200 transition hover:border-[#9CC9E8]/80 hover:text-[#E5EDF5]"
            >
              Open full work index
              <span className="ml-1.5 text-[0.9rem]">↗</span>
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap gap-4 text-[11px] text-slate-400"
          >
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#355E72] shadow-[0_0_10px_rgba(53,94,114,0.9)]" />
              <span>Launch &amp; product stories built as scenes.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9CC9E8] shadow-[0_0_10px_rgba(156,201,232,0.95)]" />
              <span>Dashboards &amp; surfaces that feel alive.</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: "تابلت" سينمائي 2D راكز */}
        <motion.div
          className="relative mt-4 w-full max-w-md md:mt-0 md:flex-1"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          variants={tabletVariants}
          animate={prefersReducedMotion ? { y: 0 } : { y: [-4, 4, -4] }}
          transition={
            prefersReducedMotion
              ? { duration: 0.4 }
              : { duration: 14, ease: "easeInOut", repeat: Infinity }
          }
        >
          {/* لا خلفيات للسكشن؛ فقط هالة خفيفة حول الجهاز نفسه */}
          <motion.div
            className="pointer-events-none absolute -inset-10 rounded-[3rem] bg-[radial-gradient(circle_at_top,_rgba(53,94,114,0.45),transparent_58%),radial-gradient(circle_at_bottom,_rgba(2,5,9,1),transparent_60%)] opacity-90"
            style={{ y: translateY, x: translateX }}
          />

          <motion.div
            className="relative rounded-[2.2rem] border border-[#151F28] bg-[#020509]/95 p-3 shadow-[0_32px_90px_rgba(0,0,0,0.95)]"
            style={{
              rotateX,
              rotateY,
              y: translateY,
              x: translateX,
              transformStyle: "preserve-3d",
            }}
          >
            {/* شريط المتصفح */}
            <div className="mb-3 flex items-center justify-between gap-3 rounded-2xl border border-[#151F28] bg-[#050910]/95 px-4 py-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-slate-600" />
                <span className="h-2 w-2 rounded-full bg-slate-500" />
                <span className="h-2 w-2 rounded-full bg-slate-400" />
                <span className="ml-3 text-[11px] font-medium text-slate-400">
                  omrex.studio / surface-preview
                </span>
              </div>
              <span className="rounded-full bg-[#020509] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                Live surface
              </span>
            </div>

            {/* الشاشة نفسها */}
            <div className="relative overflow-hidden rounded-[1.8rem] border border-[#151F28] bg-[#020509]">
              {/* gradient + grid داخل الجهاز (مسموح لأنها جزء من العنصر) */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(53,94,114,0.6),transparent_60%),radial-gradient(circle_at_bottom,_rgba(2,5,9,1),transparent_65%)]" />
              <div className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-screen [background-image:linear-gradient(to_right,rgba(148,163,184,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.28)_1px,transparent_1px)] [background-size:32px_32px]" />

              <div className="relative p-4 sm:p-5">
                {/* بلوك هيرو داخل الشاشة */}
                <div className="rounded-2xl border border-[#355E72]/45 bg-[#050910]/95 px-4 py-3 shadow-[0_0_40px_rgba(0,0,0,0.9)]">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8798A1]">
                    Cinematic launch surface
                  </p>
                  <p className="mt-2 text-[0.9rem] font-medium text-slate-100">
                    A focused entry scene that frames{" "}
                    <span className="bg-gradient-to-r from-[#E5EDF5] to-[#9CC9E8] bg-clip-text text-transparent">
                      one clear decision
                    </span>{" "}
                    for your visitor.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-[#152028] px-3 py-1 text-[10px] text-[#E5EDF5]">
                      <span className="mr-1 h-1.5 w-1.5 rounded-full bg-[#9CC9E8] shadow-[0_0_10px_rgba(156,201,232,0.9)]" />
                      Launch &amp; SaaS teams
                    </span>
                    <span className="inline-flex items-center rounded-full bg-[#020509] px-3 py-1 text-[10px] text-slate-300">
                      <span className="mr-1 h-1.5 w-1.5 rounded-full bg-[#355E72]" />
                      Structured like a film scene
                    </span>
                  </div>
                </div>

                {/* grid تحت – 3 كروت صغيرة */}
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {/* card 1 */}
                  <div className="rounded-2xl border border-[#151F28] bg-[#050910]/95 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      Selected work
                    </p>
                    <p className="mt-1 text-[11px] text-slate-300">
                      Launch pages and studio sites with act-based scrolling.
                    </p>
                    <div className="mt-2 h-10 rounded-xl bg-[radial-gradient(circle_at_left,_rgba(156,201,232,0.3),transparent_55%),radial-gradient(circle_at_right,_rgba(53,94,114,0.55),transparent_55%)]" />
                  </div>

                  {/* card 2 */}
                  <div className="rounded-2xl border border-[#151F28] bg-[#050910]/95 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      Web Lab
                    </p>
                    <p className="mt-1 text-[11px] text-slate-300">
                      Live law, clinic &amp; platform concepts built as real UI.
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] text-slate-300">
                      <span className="rounded-full bg-[#020509] px-2 py-1">Landing</span>
                      <span className="rounded-full bg-[#020509] px-2 py-1">Booking</span>
                      <span className="rounded-full bg-[#020509] px-2 py-1">Dashboard</span>
                    </div>
                  </div>

                  {/* card 3 */}
                  <div className="rounded-2xl border border-[#151F28] bg-[#050910]/95 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      Stack
                    </p>
                    <ul className="mt-2 space-y-1 text-[11px] text-slate-300">
                      <li>Next.js · TypeScript</li>
                      <li>Tailwind · Framer Motion</li>
                      <li>Product-grade front-end</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
