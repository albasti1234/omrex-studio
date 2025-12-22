// app/web-lab/law/page.tsx
"use client";

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

const pageVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASING, when: "beforeChildren", staggerChildren: 0.08 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASING },
  },
};

type ConsultationFormState = {
  area: string;
  summary: string;
  date: string;
  time: string;
};

export default function LawLabPage() {
  const [formState, setFormState] = useState<ConsultationFormState>({
    area: "",
    summary: "",
    date: "",
    time: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Consultation request (demo):", formState);
    setSubmitted(true);
  };

  const isDisabled = !formState.area || !formState.summary || !formState.date || !formState.time;

  return (
    <motion.main
      className="min-h-screen bg-[#05070b] text-amber-50"
      variants={pageVariants}
      initial="hidden"
      animate="show"
    >
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pt-8">
        <Header />
        <Hero
          formState={formState}
          submitted={submitted}
          isDisabled={isDisabled}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <PracticeAreas />
        <MetricsStrip />
        <FirmOverview />
        <Footer />
      </div>
    </motion.main>
  );
}

/* ------------------------------ HEADER -------------------------------- */

function Header() {
  return (
    <header className="mb-10">
      <nav className="flex items-center justify-between border-b border-amber-100/10 pb-4">
        <span className="text-lg font-semibold tracking-[0.04em] text-amber-200">
          Aosat Legal Firm
        </span>
        <div className="hidden items-center gap-8 text-sm text-amber-100/70 md:flex">
          <button type="button" className="hover:text-amber-50">
            Home
          </button>
          <button type="button" className="hover:text-amber-50">
            Practice Areas
          </button>
          <button type="button" className="hover:text-amber-50">
            Our Lawyers
          </button>
          <button type="button" className="hover:text-amber-50">
            Case Results
          </button>
          <button type="button" className="hover:text-amber-50">
            Contact
          </button>
        </div>
        <button
          type="button"
          className="rounded-lg border border-amber-300/70 px-4 py-1.5 text-sm font-semibold text-amber-100 transition hover:bg-amber-300 hover:text-[#1b1409]"
        >
          Book Consultation
        </button>
      </nav>
    </header>
  );
}

/* ------------------------------- HERO --------------------------------- */

type HeroProps = {
  formState: ConsultationFormState;
  submitted: boolean;
  isDisabled: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
};

function Hero({
  formState,
  submitted,
  isDisabled,
  onChange,
  onSubmit,
}: HeroProps) {
  return (
    <section className="mb-12 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
      <motion.div variants={fadeUp} className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-amber-50 sm:text-4xl lg:text-5xl">
            Strategic Legal Counsel
            <br />
            for Serious Matters
          </h1>
          <p className="max-w-xl text-sm text-amber-100/80 sm:text-base">
            We provide experienced representation in litigation, corporate law
            and family law. Calm, precise guidance for high-stakes decisions.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-lg bg-amber-300 px-4 py-2 text-sm font-semibold text-[#1b1409] shadow-[0_0_24px_rgba(245,208,128,0.45)] transition hover:bg-amber-200"
          >
            Request Case Review
          </button>
          <button
            type="button"
            className="rounded-lg border border-amber-300/70 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-200/10"
          >
            View Practice Areas
          </button>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="space-y-4 rounded-2xl border border-amber-100/15 bg-gradient-to-br from-[#090b12] via-[#05070b] to-black p-4 shadow-[0_24px_80px_rgba(0,0,0,0.9)]"
      >
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="overflow-hidden rounded-xl border border-amber-100/20 bg-black/40 sm:w-40">
            <div className="relative aspect-[3/4]">
              <Image
                src="/images/lab/law-hero.jpg"
                alt="Senior partner portrait"
                fill
                className="object-cover"
                sizes="(min-width:1024px) 160px, 40vw"
              />
            </div>
            <div className="space-y-1 p-3 text-xs">
              <p className="font-semibold text-amber-50">Peter Lawson</p>
              <p className="text-amber-100/70">Senior Partner</p>
              <p className="text-[11px] text-amber-100/60">
                Litigation · Corporate · Advisory
              </p>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-sm font-semibold text-amber-50">
              Schedule a consultation
            </h2>
            <p className="mt-1 text-[11px] text-amber-100/70">
              Share a few details and proposed time. The firm will review your
              matter and respond promptly.
            </p>

            <form onSubmit={onSubmit} className="mt-3 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-[11px] text-amber-100/70">
                <span className="rounded-full bg-amber-300/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-200">
                  1. Details
                </span>
                <span>· 2. Schedule · 3. Confirm</span>
              </div>

              <div>
                <label
                  htmlFor="area"
                  className="mb-1 block text-[11px] font-medium text-amber-100/90"
                >
                  Area of law
                </label>
                <select
                  id="area"
                  name="area"
                  value={formState.area}
                  onChange={onChange}
                  className="w-full rounded-lg border border-amber-100/20 bg-black/40 px-3 py-2 text-xs text-amber-50 outline-none ring-amber-300/60 focus:ring-1"
                >
                  <option value="">Select one</option>
                  <option value="litigation">Litigation</option>
                  <option value="corporate">Corporate</option>
                  <option value="family">Family</option>
                  <option value="startup">Startup Advisory</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="summary"
                  className="mb-1 block text-[11px] font-medium text-amber-100/90"
                >
                  Short case summary
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  rows={3}
                  value={formState.summary}
                  onChange={onChange}
                  className="w-full rounded-lg border border-amber-100/20 bg-black/40 px-3 py-2 text-xs text-amber-50 outline-none ring-amber-300/60 placeholder:text-amber-100/40 focus:ring-1"
                  placeholder="Briefly describe your matter..."
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="date"
                    className="mb-1 block text-[11px] font-medium text-amber-100/90"
                  >
                    Preferred date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={formState.date}
                    onChange={onChange}
                    className="w-full rounded-lg border border-amber-100/20 bg-black/40 px-3 py-2 text-xs text-amber-50 outline-none ring-amber-300/60 focus:ring-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="time"
                    className="mb-1 block text-[11px] font-medium text-amber-100/90"
                  >
                    Preferred time
                  </label>
                  <input
                    id="time"
                    name="time"
                    type="time"
                    value={formState.time}
                    onChange={onChange}
                    className="w-full rounded-lg border border-amber-100/20 bg-black/40 px-3 py-2 text-xs text-amber-50 outline-none ring-amber-300/60 focus:ring-1"
                  />
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isDisabled}
                  className="w-full rounded-lg bg-amber-300 px-3 py-2 text-xs font-semibold text-[#1b1409] shadow-[0_0_24px_rgba(245,208,128,0.45)] transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:bg-amber-200/40 disabled:text-[#1b1409]/60 disabled:shadow-none"
                >
                  Submit for Review
                </button>
                {submitted && (
                  <p className="mt-1 text-[11px] text-emerald-400">
                    Your request has been received (demo only – see console).
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* --------------------------- PRACTICE AREAS --------------------------- */

const practiceAreas = [
  {
    title: "Corporate & M&A",
    description: "Handling mergers, acquisitions and corporate governance.",
    icon: "⚖️",
  },
  {
    title: "Litigation & Disputes",
    description: "Resolving complex commercial and civil disputes.",
    icon: "📜",
  },
  {
    title: "Family & Inheritance",
    description: "Guiding clients through family and estate matters.",
    icon: "🏛️",
  },
  {
    title: "Startup Advisory",
    description: "Supporting emerging businesses with legal strategy.",
    icon: "🚀",
  },
];

function PracticeAreas() {
  return (
    <section className="mb-10">
      <motion.div variants={fadeUp} className="mb-4">
        <h2 className="text-2xl font-semibold text-amber-50">Practice Areas</h2>
      </motion.div>
      <div className="grid gap-4 md:grid-cols-4">
        {practiceAreas.map((area) => (
          <motion.article
            key={area.title}
            variants={fadeUp}
            className="rounded-xl border border-amber-100/15 bg-gradient-to-br from-[#0b0d13] to-[#05070b] p-4 text-xs text-amber-100/80 shadow-[0_18px_60px_rgba(0,0,0,0.9)] transition hover:border-amber-300/60 hover:shadow-[0_24px_80px_rgba(0,0,0,1)]"
          >
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-amber-300/15 text-sm">
              {area.icon}
            </div>
            <h3 className="text-sm font-semibold text-amber-50">
              {area.title}
            </h3>
            <p className="mt-1 text-xs text-amber-100/80">
              {area.description}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------- METRICS STRIP --------------------------- */

function MetricsStrip() {
  return (
    <section className="mb-8 grid gap-4 border-t border-amber-100/10 pt-6 text-center text-xs text-amber-100/80 sm:grid-cols-3">
      <div>
        <p className="text-2xl font-semibold text-amber-300">150+</p>
        <p className="mt-1 text-amber-100/70">Resolved cases</p>
      </div>
      <div>
        <p className="text-2xl font-semibold text-amber-300">92%</p>
        <p className="mt-1 text-amber-100/70">Settlement rate</p>
      </div>
      <div>
        <p className="text-2xl font-semibold text-amber-300">20+</p>
        <p className="mt-1 text-amber-100/70">Years combined experience</p>
      </div>
    </section>
  );
}

/* --------------------------- FIRM OVERVIEW ---------------------------- */

function FirmOverview() {
  return (
    <section className="mb-10 grid gap-8 border-t border-amber-100/10 pt-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <motion.div variants={fadeUp} className="space-y-2 text-sm text-amber-100/80">
        <h3 className="text-base font-semibold text-amber-50">
          Aosat Legal Firm
        </h3>
        <p>
          A full-service law firm dedicated to achieving excellent results for
          clients while maintaining discretion and calm, strategic counsel at
          every step.
        </p>
        <p>
          This Web Lab demo models how a serious boutique firm can present its
          capabilities online – from first impression to structured intake.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="space-y-2 text-xs text-amber-100/70"
      >
        <p className="uppercase tracking-[0.24em] text-amber-100/50">
          Selected clients
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-amber-100/60">
          <span>WILLIANS</span>
          <span>HAWTHORNE</span>
          <span>SEIFER</span>
          <span>VG+R</span>
        </div>
      </motion.div>
    </section>
  );
}

/* -------------------------------- FOOTER ------------------------------ */

function Footer() {
  return (
    <footer className="mt-6 border-t border-amber-100/10 pt-6 text-xs text-amber-100/70">
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <p className="font-semibold text-amber-50">Aosat Legal Firm</p>
          <p className="mt-1 text-amber-100/70">
            Calm, strategic legal counsel for complex, high-stakes matters.
          </p>
        </div>
        <div>
          <p className="font-semibold text-amber-50">Links</p>
          <ul className="mt-1 space-y-1">
            <li>Practice Areas</li>
            <li>Our Lawyers</li>
            <li>Case Results</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-amber-50">Contact</p>
          <p className="mt-1">124 Justice Ave, Suite 400</p>
          <p>City, ST 12345</p>
          <p className="mt-1">Phone: (555) 123-4567</p>
          <p>Email: contact@aosatfirm.com</p>
          <p className="mt-2 text-amber-100/50">Licensed &amp; regulated.</p>
        </div>
      </div>
    </footer>
  );
}