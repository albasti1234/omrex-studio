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
  credentials: string[];
  approach: string[];
  faqs: { q: string; a: string }[];
};

const DOCTORS: Doctor[] = [
  {
    slug: "dr-sarah-mitchell",
    name: "Dr. Sarah Mitchell",
    title: "Lead Dentist",
    focus: ["Cosmetic", "Whitening", "Smile design"],
    bio: "Comfort-first care with natural aesthetics and patient confidence at the center.",
    credentials: ["Doctor of Dental Surgery (DDS)", "Cosmetic dentistry training", "Smile design workshops"],
    approach: [
      "Explains every step in plain language",
      "Prioritizes natural results and enamel safety",
      "Comfort pacing for anxious patients",
    ],
    faqs: [
      { q: "Do you do smile makeovers?", a: "Yes — we plan step-by-step, starting with health and moving toward aesthetics." },
      { q: "Is whitening safe?", a: "Professionally guided whitening with isolation and controlled strength is enamel-safe." },
    ],
  },
  {
    slug: "dr-ahmed-hassan",
    name: "Dr. Ahmed Hassan",
    title: "Implant & Restorative",
    focus: ["Implants", "Crowns", "Complex cases"],
    bio: "Precision planning, calm chairside energy, and long-term maintenance thinking.",
    credentials: ["Implant planning & placement", "Restorative design focus", "Advanced case planning"],
    approach: ["3D planning for accuracy", "Bite harmony + natural crown profiles", "Long-term maintenance guidance"],
    faqs: [
      { q: "How do you plan implants?", a: "We use imaging and evaluation to plan position, bone, and gum profile for stability." },
      { q: "Can I replace one tooth?", a: "Yes — single tooth implants are common and designed to match the natural smile." },
    ],
  },
  {
    slug: "dr-lina-rahman",
    name: "Dr. Lina Rahman",
    title: "Orthodontics",
    focus: ["Clear aligners", "Bite harmony", "Refinements"],
    bio: "Digital planning and predictable progress — with friendly check-ins.",
    credentials: ["Clear aligners planning", "Bite assessment", "Refinement protocols"],
    approach: ["Shows you the plan before starting", "Tracks progress with checkpoints", "Refines for comfort + accuracy"],
    faqs: [
      { q: "How long do aligners take?", a: "It depends on your case. Many plans are 3–12 months." },
      { q: "Do aligners hurt?", a: "You may feel pressure for 1–2 days when switching sets — usually mild." },
    ],
  },
  {
    slug: "dr-noor-khaled",
    name: "Dr. Noor Khaled",
    title: "Hygiene & Prevention",
    focus: ["Gum health", "Cleaning", "Education"],
    bio: "Gentle cleaning, prevention-first habits, and simple routines that actually stick.",
    credentials: ["Preventive care focus", "Gum health protocols", "Patient education"],
    approach: ["Gentle scaling + polishing", "Clear hygiene plan (no overwhelm)", "Prevention mindset for long-term health"],
    faqs: [
      { q: "How often should I get a cleaning?", a: "Most people benefit every 6 months; some need more frequent visits for gum health." },
      { q: "I bleed when I floss — is that normal?", a: "It can happen with gum inflammation. We’ll guide you to calm it down safely." },
    ],
  },
];

function Chip({ label }: { label: string }) {
  return (
    <span className="rounded-full border bg-white/70 px-3 py-1 text-xs font-medium text-slate-700" style={{ borderColor: THEME.border }}>
      {label}
    </span>
  );
}

export default function DoctorSlugPage({ params }: { params: { slug: string } }) {
  const doc = DOCTORS.find((d) => d.slug === params.slug);

  if (!doc) {
    return (
      <Shell
        eyebrow="Doctors"
        title="Doctor not found."
        lead="No worries — browse the team and pick the right specialist for your visit."
        actions={
          <Link
            href="/demos/pearl-dental/doctors"
            className="rounded-2xl border px-5 py-3 text-sm font-medium text-slate-900 hover:bg-slate-50"
            style={{ borderColor: THEME.border }}
          >
            Back to doctors
          </Link>
        }
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <SoftCard icon="👩‍⚕️" title="Meet the team" desc="Browse all doctors." href="/demos/pearl-dental/doctors" />
          <SoftCard icon="🦷" title="Services" desc="Explore what we do." href="/demos/pearl-dental/services" />
          <SoftCard icon="📅" title="Booking" desc="Book a visit." href="/demos/pearl-dental/booking" />
        </div>
      </Shell>
    );
  }

  return (
    <Shell
      eyebrow="Doctor"
      title={doc.name}
      lead={doc.bio}
      actions={
        <>
          <Link
            href="/demos/pearl-dental/booking"
            className="rounded-2xl px-5 py-3 text-sm font-medium text-white"
            style={{ background: `linear-gradient(135deg, ${THEME.accent}, ${THEME.accentDark})` }}
          >
            Book with {doc.name.split(" ")[1]}
          </Link>
          <Link
            href="/demos/pearl-dental/doctors"
            className="rounded-2xl border px-5 py-3 text-sm font-medium text-slate-900 hover:bg-slate-50"
            style={{ borderColor: THEME.border }}
          >
            All doctors
          </Link>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <section>
          <div className="rounded-3xl border bg-gradient-to-br from-white to-cyan-50 p-6" style={{ borderColor: "rgba(6,182,212,0.22)" }}>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">{doc.title}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Focus areas</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {doc.focus.map((f) => <Chip key={f} label={f} />)}
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border bg-white/70 p-6" style={{ borderColor: THEME.border }}>
              <h3 className="text-base font-semibold text-slate-900">Credentials</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {doc.credentials.map((c) => (
                  <li key={c} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full" style={{ background: THEME.accent }} />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border bg-white/70 p-6" style={{ borderColor: THEME.border }}>
              <h3 className="text-base font-semibold text-slate-900">Approach</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {doc.approach.map((a) => (
                  <li key={a} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full" style={{ background: THEME.accent }} />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-semibold text-slate-900">FAQs</h3>
            <div className="mt-4 grid gap-4">
              {doc.faqs.map((f) => (
                <div key={f.q} className="rounded-3xl border bg-white/70 p-5" style={{ borderColor: THEME.border }}>
                  <p className="text-sm font-semibold text-slate-900">{f.q}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-3xl border bg-white/70 p-5" style={{ borderColor: THEME.border }}>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">Next step</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">Book a calm visit.</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">Pick a service, choose a time, and we’ll handle the rest.</p>
            <div className="mt-4 grid gap-3">
              <Link
                href="/demos/pearl-dental/booking"
                className="rounded-2xl px-5 py-3 text-center text-sm font-medium text-white"
                style={{ background: `linear-gradient(135deg, ${THEME.accent}, ${THEME.accentDark})` }}
              >
                Book appointment
              </Link>
              <Link
                href="/demos/pearl-dental/contact"
                className="rounded-2xl border px-5 py-3 text-center text-sm font-medium text-slate-900 hover:bg-slate-50"
                style={{ borderColor: THEME.border }}
              >
                Ask a question
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border bg-gradient-to-br from-white to-slate-50 p-5" style={{ borderColor: THEME.border }}>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">Explore</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <Link
                href="/demos/pearl-dental/treatments"
                className="rounded-2xl border px-4 py-3 text-center text-sm font-medium text-slate-900 hover:bg-slate-50"
                style={{ borderColor: THEME.border }}
              >
                Treatments
              </Link>
              <Link
                href="/demos/pearl-dental/results"
                className="rounded-2xl border px-4 py-3 text-center text-sm font-medium text-slate-900 hover:bg-slate-50"
                style={{ borderColor: THEME.border }}
              >
                Results
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </Shell>
  );
}
