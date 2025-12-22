"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const EASING = [0.16, 1, 0.3, 1] as const;

const THEME = {
  accent: "#06b6d4",
  accentDark: "#0891b2",
  pearl: "#f8fafc",
  pearl2: "#ecfeff",
  ink: "#0f172a",
  muted: "#475569",
  border: "rgba(15, 23, 42, 0.08)",
  shadow: "0 24px 80px rgba(15, 23, 42, 0.08)",
} as const;

function Shell({
  title,
  eyebrow,
  lead,
  children,
  actions,
}: {
  title: string;
  eyebrow?: string;
  lead?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <main className="min-h-screen bg-[radial-gradient(1200px_circle_at_20%_-10%,rgba(6,182,212,0.14),transparent_45%),radial-gradient(900px_circle_at_95%_10%,rgba(6,182,212,0.10),transparent_40%),linear-gradient(to_bottom,#ffffff,#f8fafc)]">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-24 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASING }}
          className="mb-10"
        >
          {eyebrow ? (
            <div
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-slate-600"
              style={{
                borderColor: THEME.border,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(248,250,252,0.8))",
                boxShadow: "0 12px 40px rgba(15,23,42,0.06)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: THEME.accent }}
              />
              <span>{eyebrow}</span>
            </div>
          ) : null}

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            {title}
          </h1>

          {lead ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {lead}
            </p>
          ) : null}

          {actions ? <div className="mt-6 flex flex-wrap gap-3">{actions}</div> : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASING, delay: 0.1 }}
          className="rounded-3xl border bg-white/80 p-6 backdrop-blur-xl sm:p-8"
          style={{ borderColor: THEME.border, boxShadow: THEME.shadow }}
        >
          {children}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASING }}
          className="mt-12 rounded-3xl border bg-white/70 p-6 backdrop-blur-xl sm:p-8"
          style={{
            borderColor: THEME.border,
            boxShadow: "0 18px 70px rgba(15,23,42,0.06)",
          }}
        >
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">
                Ready when you are
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                Book a calm, premium visit — in under a minute.
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
                Choose a service, pick a time, and we’ll handle the rest. If you’re using insurance,
                start with our verification step.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/demos/pearl-dental/booking"
                className="rounded-2xl px-5 py-3 text-sm font-medium text-white shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99]"
                style={{
                  background: `linear-gradient(135deg, ${THEME.accent}, ${THEME.accentDark})`,
                }}
              >
                Book now
              </Link>
              <Link
                href="/demos/pearl-dental/insurance"
                className="rounded-2xl border px-5 py-3 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50"
                style={{ borderColor: THEME.border }}
              >
                Insurance
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="rounded-2xl border bg-white/70 px-4 py-3"
      style={{ borderColor: THEME.border }}
    >
      <p className="text-lg font-semibold text-slate-900">{value}</p>
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
    </div>
  );
}

function SoftCard({
  title,
  desc,
  icon,
  href,
  meta,
}: {
  title: string;
  desc: string;
  icon: string;
  href?: string;
  meta?: string;
}) {
  const reduce = useReducedMotion();
  const card = (
    <motion.div
      whileHover={reduce ? undefined : { y: -3 }}
      transition={{ duration: 0.25, ease: EASING }}
      className="group rounded-3xl border bg-white/70 p-5 backdrop-blur-xl"
      style={{ borderColor: THEME.border }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div
            className="grid h-11 w-11 place-items-center rounded-2xl border bg-white"
            style={{ borderColor: "rgba(6,182,212,0.25)" }}
          >
            <span className="text-lg">{icon}</span>
          </div>
          <div>
            <h3 className="text-base font-semibold tracking-tight text-slate-900">{title}</h3>
            {meta ? (
              <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">{meta}</p>
            ) : null}
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
          </div>
        </div>
        {href ? (
          <div
            className="grid h-9 w-9 place-items-center rounded-2xl border text-slate-500 transition-colors group-hover:text-slate-900"
            style={{ borderColor: THEME.border }}
            aria-hidden
          >
            ↗
          </div>
        ) : null}
      </div>
    </motion.div>
  );

  return href ? <Link href={href} className="block">{card}</Link> : card;
}

type Doctor = {
  slug: string;
  name: string;
  title: string;
  focus: string[];
  bio: string;
};

const DOCTORS: Doctor[] = [
  {
    slug: "dr-sarah-mitchell",
    name: "Dr. Sarah Mitchell",
    title: "Lead Dentist",
    focus: ["Cosmetic", "Whitening", "Smile design"],
    bio: "Comfort-first approach with a strong focus on natural aesthetics and patient confidence.",
  },
  {
    slug: "dr-ahmed-hassan",
    name: "Dr. Ahmed Hassan",
    title: "Implant & Restorative",
    focus: ["Implants", "Crowns", "Complex cases"],
    bio: "Precision-driven planning with a calm chairside style and long-term maintenance mindset.",
  },
  {
    slug: "dr-lina-rahman",
    name: "Dr. Lina Rahman",
    title: "Orthodontics",
    focus: ["Clear aligners", "Bite harmony", "Refinements"],
    bio: "Digital planning, predictable outcomes, and a friendly approach to progress check-ins.",
  },
  {
    slug: "dr-noor-khaled",
    name: "Dr. Noor Khaled",
    title: "Hygiene & Prevention",
    focus: ["Gum health", "Cleaning", "Education"],
    bio: "Gentle cleanings, clear hygiene plans, and a prevention-first philosophy for long-term health.",
  },
];

export default function DoctorsPage() {
  return (
    <Shell
      eyebrow="Doctors"
      title="Meet the team behind the calm."
      lead="Premium care is a feeling — and it starts with people who listen, explain, and work with precision."
      actions={
        <>
          <Link
            href="/demos/pearl-dental/booking"
            className="rounded-2xl px-5 py-3 text-sm font-medium text-white"
            style={{ background: `linear-gradient(135deg, ${THEME.accent}, ${THEME.accentDark})` }}
          >
            Book a visit
          </Link>
          <Link
            href="/demos/pearl-dental/reviews"
            className="rounded-2xl border px-5 py-3 text-sm font-medium text-slate-900 hover:bg-slate-50"
            style={{ borderColor: THEME.border }}
          >
            Reviews
          </Link>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <section className="grid gap-4 sm:grid-cols-2">
          {DOCTORS.map((d) => (
            <SoftCard
              key={d.slug}
              icon="👩‍⚕️"
              title={d.name}
              meta={d.title}
              desc={d.bio}
              href={`/demos/pearl-dental/doctors/${d.slug}`}
            />
          ))}
        </section>

        <aside className="space-y-4">
          <div
            className="rounded-3xl border bg-gradient-to-br from-white to-cyan-50 p-6"
            style={{ borderColor: "rgba(6,182,212,0.22)" }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">Our style</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Calm communication</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              We explain the “why”, not just the “what”. You stay informed, comfortable, and in control.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <StatPill value="Clear" label="Explanations" />
              <StatPill value="Gentle" label="Pacing" />
              <StatPill value="Precise" label="Planning" />
            </div>
          </div>

          <div className="rounded-3xl border bg-white/70 p-5" style={{ borderColor: THEME.border }}>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">Looking for a service?</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Browse services and treatments, then book the right slot.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Link
                href="/demos/pearl-dental/services"
                className="rounded-2xl border px-4 py-3 text-center text-sm font-medium text-slate-900 hover:bg-slate-50"
                style={{ borderColor: THEME.border }}
              >
                Services
              </Link>
              <Link
                href="/demos/pearl-dental/treatments"
                className="rounded-2xl border px-4 py-3 text-center text-sm font-medium text-slate-900 hover:bg-slate-50"
                style={{ borderColor: THEME.border }}
              >
                Treatments
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </Shell>
  );
}
