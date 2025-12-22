"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------
   TYPES
-------------------------------------------------------*/

type LabDemoId =
  | "restaurant"
  | "clinic"
  | "law"
  | "saas"
  | "studio"
  | "ecommerce"
  | "perfumes";

type ExperienceStatus = "live" | "in-review" | "prototype" | "paused";

type ConfidenceLevel = "High" | "Medium" | "Early";

type ExperienceCategoryId =
  | "customer"
  | "health"
  | "professional"
  | "saas"
  | "internal"
  | "launches";

type SectionId = "experiences" | "clients" | "sessions" | "requests" | "system";

type LabDemo = {
  id: LabDemoId;
  label: string;
  badge: string;
  short: string;
  description: string;
  href: string;
  image: string;
  accentFrom: string;
  accentTo: string;
  icon: string;
};

type ExperienceMeta = {
  id: LabDemoId;
  status: ExperienceStatus;
  industry: string;
  category: ExperienceCategoryId;
  lastDemo: string;
  confidence: ConfidenceLevel;
  sessions: number;
  conversion: string;
  notes: string;
  tags: string[];
};

type Client = {
  id: string;
  name: string;
  region: string;
  industry: string;
  activeSurface: LabDemoId;
  stage: "Lead" | "Discovery" | "In proposal" | "Signed";
  lastContact: string;
};

type LiveSession = {
  id: string;
  time: string;
  title: string;
  with: string;
  surface: LabDemoId;
  status: "Upcoming" | "In progress" | "Completed";
};

type RequestItem = {
  id: string;
  from: string;
  company: string;
  topic: string;
  preferredSurface: LabDemoId | "unsure";
  urgency: "Today" | "This week" | "Later";
  status: "Unread" | "Replied" | "Archived";
};

type SystemToggle = {
  id: string;
  label: string;
  description: string;
  group: "Demo safety" | "Visuals" | "Behavior";
};

/* ------------------------------------------------------
   CONSTANTS / DATA
-------------------------------------------------------*/

const BACKGROUND_IMAGE_URL = "/images/web-lab/web-lab-bg.jpg";

const EXPERIENCE_CATEGORIES: Record<
  ExperienceCategoryId,
  { label: string; description: string }
> = {
  customer: {
    label: "Customer surfaces",
    description: "Flows where end users buy, book or order.",
  },
  health: {
    label: "Health & clinics",
    description: "Calm, trustworthy booking and intake.",
  },
  professional: {
    label: "Legal & professional",
    description: "Serious, quiet, detail-obsessed entry points.",
  },
  saas: {
    label: "SaaS & dashboards",
    description: "Metric surfaces that behave like real products.",
  },
  internal: {
    label: "Internal tools",
    description: "Control rooms, studio OS and rituals.",
  },
  launches: {
    label: "Launch & campaigns",
    description: "Drops, launches and cinematic retail moments.",
  },
};

const LAB_DEMOS: LabDemo[] = [
  {
    id: "restaurant",
    label: "Restaurant ordering surface",
    badge: "Food & Hospitality",
    short: "Delivery, dine-in & reservations in one cinematic flow.",
    description:
      "A full restaurant surface with ordering, cart, prep times, and booking — built to feel like a live service dashboard.",
    href: "/web-lab/restaurant",
    image: "/images/web-lab/restaurant-lab.jpg",
    accentFrom: "from-amber-300/90",
    accentTo: "to-rose-300/90",
    icon: "🍽️",
  },
  {
    id: "clinic",
    label: "Clinic booking experience",
    badge: "Health & Clinics",
    short: "Patients move from symptoms to confirmed slot without friction.",
    description:
      "Symptom selection, practitioner choice and time slots in a calm, trustworthy flow built for clinics.",
    href: "/web-lab/clinic",
    image: "/images/web-lab/clinic-lab.jpg",
    accentFrom: "from-emerald-300/90",
    accentTo: "to-cyan-300/90",
    icon: "🏥",
  },
  {
    id: "law",
    label: "Law firm intake surface",
    badge: "Legal & Professional",
    short: "Case type, conflict check and first-call booking in one path.",
    description:
      "A serious, quiet intake experience for law firms that still feels modern and cinematic.",
    href: "/web-lab/law",
    image: "/images/web-lab/law-lab.jpg",
    accentFrom: "from-sky-300/90",
    accentTo: "to-indigo-300/90",
    icon: "⚖️",
  },
  {
    id: "saas",
    label: "SaaS dashboard preview",
    badge: "SaaS & Tools",
    short: "Dashboards that sell how the product behaves, not just UI.",
    description:
      "Metric surfaces, states and empty views that feel like a real product demo, ready for data.",
    href: "/web-lab/saas",
    image: "/images/web-lab/saas-lab.jpg",
    accentFrom: "from-cyan-300/90",
    accentTo: "to-fuchsia-300/90",
    icon: "📊",
  },
  {
    id: "studio",
    label: "Studio / brand OS",
    badge: "Studios & Teams",
    short: "Internal control room you’re not embarrassed to show on calls.",
    description:
      "An internal hub for teams, designed like a cinematic command center instead of a cluttered Notion board.",
    href: "/web-lab/studio-os",
    image: "/images/web-lab/studio-lab.jpg",
    accentFrom: "from-violet-300/90",
    accentTo: "to-sky-300/90",
    icon: "🎛️",
  },
  {
    id: "ecommerce",
    label: "E-commerce launch surface",
    badge: "Retail & DTC",
    short: "Launch drops and campaigns that feel like trailers.",
    description:
      "A launch page for products with inventory states, waitlists and drop timers — built to feel like a premiere.",
    href: "/web-lab/ecommerce",
    image: "/images/web-lab/ecommerce-lab.jpg",
    accentFrom: "from-rose-300/90",
    accentTo: "to-amber-300/90",
    icon: "🛒",
  },
  {
    id: "perfumes",
    label: "Perfume e-commerce surface",
    badge: "Fragrance & Beauty",
    short: "Dark, cinematic shopping for niche perfumes and luxury scents.",
    description:
      "A high-end perfume experience with a filmic hero, rich product storytelling, soft motion and a smooth cart & checkout flow.",
    href: "/web-lab/perfumes",
    image: "/images/web-lab/perfumes-lab.jpg", // تأكد تضيف الصورة بالمشروع
    accentFrom: "from-amber-200/90",
    accentTo: "to-fuchsia-300/90",
    icon: "✨",
  },
];

const EXPERIENCES_META: ExperienceMeta[] = [
  {
    id: "restaurant",
    status: "live",
    industry: "Food & Hospitality",
    category: "customer",
    lastDemo: "2 hours ago · Omar / Bistro Nova",
    confidence: "High",
    sessions: 27,
    conversion: "64%",
    notes: "Best when they care about delivery, upsell and reservations living in one place.",
    tags: ["Delivery-first", "Cart logic", "Booking"],
  },
  {
    id: "clinic",
    status: "in-review",
    industry: "Health & Clinics",
    category: "health",
    lastDemo: "Yesterday · Dr. Sara / Urban Clinic",
    confidence: "Medium",
    sessions: 14,
    conversion: "41%",
    notes: "Lead with trust & clarity. Highlight calm colors and low-stress booking.",
    tags: ["Calm", "Forms", "Availability"],
  },
  {
    id: "law",
    status: "prototype",
    industry: "Legal & Professional",
    category: "professional",
    lastDemo: "This week · Ali / Horizon Law",
    confidence: "Early",
    sessions: 7,
    conversion: "38%",
    notes: "Use when they complain about outdated PDFs and email threads.",
    tags: ["Serious", "Intake", "Long-form"],
  },
  {
    id: "saas",
    status: "live",
    industry: "SaaS & Platforms",
    category: "saas",
    lastDemo: "3 days ago · Laila / MetricsOS",
    confidence: "High",
    sessions: 32,
    conversion: "72%",
    notes: "Perfect for showing product thinking, not just UI skins.",
    tags: ["Metrics", "States", "Dashboards"],
  },
  {
    id: "studio",
    status: "prototype",
    industry: "Studios & Teams",
    category: "internal",
    lastDemo: "Last week · Faris / Brand Studio",
    confidence: "Medium",
    sessions: 11,
    conversion: "55%",
    notes: "Use when they want to see internal rituals and OS-style thinking.",
    tags: ["Internal", "Rituals", "Team"],
  },
  {
    id: "ecommerce",
    status: "in-review",
    industry: "Retail & DTC",
    category: "launches",
    lastDemo: "4 days ago · Noura / Ember Goods",
    confidence: "Medium",
    sessions: 9,
    conversion: "47%",
    notes: "Great when they care about drops, inventory states and hype, without feeling noisy.",
    tags: ["Drops", "Inventory", "Waitlists"],
  },
  {
    id: "perfumes",
    status: "prototype",
    industry: "Fragrance & Beauty",
    category: "launches",
    lastDemo: "Today · Noura / Atelier Kayan",
    confidence: "Medium",
    sessions: 5,
    conversion: "52%",
    notes:
      "Built for high-end perfume brands: cinematic hero, rich scent storytelling and a smooth cart & checkout.",
    tags: ["Luxury retail", "Story-first", "E-commerce"],
  },
];

const CLIENTS: Client[] = [
  {
    id: "c1",
    name: "Bistro Nova",
    region: "Dubai · UAE",
    industry: "Restaurant group",
    activeSurface: "restaurant",
    stage: "In proposal",
    lastContact: "Today · 09:40",
  },
  {
    id: "c2",
    name: "Urban Clinic",
    region: "Riyadh · KSA",
    industry: "Multi-specialty clinic",
    activeSurface: "clinic",
    stage: "Discovery",
    lastContact: "Yesterday · 16:10",
  },
  {
    id: "c3",
    name: "Horizon Law",
    region: "Amman · Jordan",
    industry: "Law firm",
    activeSurface: "law",
    stage: "Lead",
    lastContact: "2 days ago",
  },
  {
    id: "c4",
    name: "MetricsOS",
    region: "Remote · EU/US",
    industry: "B2B SaaS",
    activeSurface: "saas",
    stage: "Signed",
    lastContact: "This week",
  },
  {
    id: "c5",
    name: "Ember Goods",
    region: "Kuwait City",
    industry: "DTC retail",
    activeSurface: "ecommerce",
    stage: "In proposal",
    lastContact: "This week",
  },
  {
    id: "c6",
    name: "Atelier Kayan",
    region: "Doha · Qatar",
    industry: "Niche fragrance house",
    activeSurface: "perfumes",
    stage: "Lead",
    lastContact: "Today",
  },
];

const SESSIONS: LiveSession[] = [
  {
    id: "s1",
    time: "Today · 11:30",
    title: "Restaurant + drops overview",
    with: "Bistro Nova team",
    surface: "restaurant",
    status: "Upcoming",
  },
  {
    id: "s2",
    time: "Today · 16:00",
    title: "Clinic booking & intake",
    with: "Urban Clinic partners",
    surface: "clinic",
    status: "Upcoming",
  },
  {
    id: "s3",
    time: "Tomorrow · 10:00",
    title: "Law firm intake walk-through",
    with: "Horizon Law partners",
    surface: "law",
    status: "Upcoming",
  },
  {
    id: "s4",
    time: "Tomorrow · 14:00",
    title: "SaaS dashboard story",
    with: "MetricsOS product team",
    surface: "saas",
    status: "Upcoming",
  },
  {
    id: "s5",
    time: "This week · 19:30",
    title: "Perfume launch surface walkthrough",
    with: "Atelier Kayan founder",
    surface: "perfumes",
    status: "Upcoming",
  },
];

const REQUESTS: RequestItem[] = [
  {
    id: "r1",
    from: "Lina",
    company: "Atlas Fitness",
    topic: "Membership, class booking & on-boarding",
    preferredSurface: "restaurant",
    urgency: "This week",
    status: "Unread",
  },
  {
    id: "r2",
    from: "Omar",
    company: "Northbridge Law",
    topic: "Serious intake surface for litigation team",
    preferredSurface: "law",
    urgency: "Today",
    status: "Replied",
  },
  {
    id: "r3",
    from: "Noura",
    company: "Ember Goods",
    topic: "Launch surface for quarterly drops",
    preferredSurface: "ecommerce",
    urgency: "This week",
    status: "Unread",
  },
  {
    id: "r4",
    from: "Tareq",
    company: "Skyline Studio",
    topic: "Internal hub for team and clients",
    preferredSurface: "studio",
    urgency: "Later",
    status: "Archived",
  },
  {
    id: "r5",
    from: "Maha",
    company: "Noir Essence",
    topic: "Cinematic perfume e-commerce & brand story",
    preferredSurface: "perfumes",
    urgency: "This week",
    status: "Unread",
  },
];

const SYSTEM_TOGGLES: SystemToggle[] = [
  {
    id: "safe-mode",
    label: "Demo-safe data",
    description: "Only show invented brands and fake names during calls.",
    group: "Demo safety",
  },
  {
    id: "mask-locations",
    label: "Mask locations",
    description: "Hide precise city names on shared screens.",
    group: "Demo safety",
  },
  {
    id: "cinematic-glow",
    label: "Cinematic glow",
    description: "Keep radial glows and soft gradients on.",
    group: "Visuals",
  },
  {
    id: "reduced-motion",
    label: "Reduced motion",
    description: "Turn down transitions if the client is on a weak device.",
    group: "Visuals",
  },
  {
    id: "auto-notes",
    label: "Auto-save demo notes",
    description: "Keep a small log of what you clicked on during a call.",
    group: "Behavior",
  },
  {
    id: "session-timers",
    label: "Soft session timers",
    description: "Show a tiny timer so you don’t overrun their calendar.",
    group: "Behavior",
  },
];

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "experiences", label: "Experiences" },
  { id: "clients", label: "Clients" },
  { id: "sessions", label: "Live sessions" },
  { id: "requests", label: "Requests" },
  { id: "system", label: "System" },
];

/* ------------------------------------------------------
   MAIN PAGE
-------------------------------------------------------*/

export default function WebLabPage() {
  const [activeSection, setActiveSection] = useState<SectionId>("experiences");
  const [selectedDemoId, setSelectedDemoId] = useState<LabDemoId>("restaurant");
  const [statusFilter, setStatusFilter] = useState<ExperienceStatus | "all">("all");
  const [activeRequestId, setActiveRequestId] = useState<string | null>(
    REQUESTS[0]?.id ?? null,
  );
  const [systemState, setSystemState] = useState<Record<string, boolean>>({
    "safe-mode": true,
    "mask-locations": true,
    "cinematic-glow": true,
    "reduced-motion": false,
    "auto-notes": true,
    "session-timers": true,
  });

  const selectedDemo = LAB_DEMOS.find((d) => d.id === selectedDemoId)!;
  const selectedMeta = EXPERIENCES_META.find((m) => m.id === selectedDemoId)!;

  const filteredExperiences = EXPERIENCES_META.filter((meta) =>
    statusFilter === "all" ? true : meta.status === statusFilter,
  );

  const groupedByCategory: Record<ExperienceCategoryId, ExperienceMeta[]> = {
    customer: [],
    health: [],
    professional: [],
    saas: [],
    internal: [],
    launches: [],
  };
  filteredExperiences.forEach((meta) => {
    groupedByCategory[meta.category].push(meta);
  });

  const activeRequest =
    REQUESTS.find((r) => r.id === activeRequestId) ?? REQUESTS[0];

  return (
    <main className="relative min-h-screen overflow-hidden text-slate-50">
      <WebLabBackground />

      {/* Floating app shell */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-20">
        {/* Subtle glow under whole app */}
        <div className="pointer-events-none absolute inset-x-8 top-10 h-64 rounded-[4rem] bg-[radial-gradient(circle_at_10%_0%,rgba(248,250,252,0.55),transparent_60%),radial-gradient(circle_at_90%_100%,rgba(251,113,133,0.5),transparent_60%)] opacity-60 blur-3xl" />

        {/* TOP BAR */}
        <header className="relative flex flex-wrap items-center justify-between gap-3 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-[0.8rem] shadow-[0_18px_80px_rgba(15,23,42,0.75)] backdrop-blur-2xl sm:px-4">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500/90 via-indigo-400/90 to-sky-400/90 text-[1rem] shadow-[0_0_24px_rgba(147,51,234,0.9)]">
              <span className="-translate-y-px text-[0.9rem]">WL</span>
            </div>
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.28em] text-slate-100/80">
                Omrex · Web Lab OS
              </p>
              <p className="text-[0.8rem] text-slate-50">
                Floating control room for every cinematic surface in your site.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[0.72rem] text-slate-100/90 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
              Demo-safe
            </div>
            <div className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[0.72rem] text-slate-100/90">
              <span className="text-[0.8rem]">Next call in</span>
              <span className="font-semibold text-slate-50">18 min</span>
            </div>
          </div>
        </header>

        {/* MAIN GRID APP */}
        <div className="relative grid gap-4 lg:grid-cols-[230px_minmax(0,2.1fr)_minmax(0,1.4fr)]">
          {/* LEFT NAV COLUMN */}
          <aside className="flex flex-col gap-4 rounded-[1.8rem] border border-white/25 bg-white/10 p-3 text-[0.8rem] shadow-[0_24px_90px_rgba(15,23,42,0.85)] backdrop-blur-2xl">
            {/* Tabs */}
            <div className="space-y-2">
              <p className="text-[0.7rem] uppercase tracking-[0.24em] text-slate-100/80">
                App sections
              </p>
              <nav className="grid gap-1">
                {SECTIONS.map((section) => {
                  const active = section.id === activeSection;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSection(section.id)}
                      className={[
                        "flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-left transition",
                        active
                          ? "bg-gradient-to-r from-fuchsia-400/95 via-indigo-400/95 to-sky-400/95 text-slate-950 shadow-[0_0_30px_rgba(129,140,248,0.9)]"
                          : "bg-white/10 text-slate-100/90 hover:bg-white/20",
                      ].join(" ")}
                    >
                      <span>{section.label}</span>
                      {section.id === "experiences" && (
                        <span
                          className={[
                            "rounded-full px-2 py-0.5 text-[0.68rem]",
                            active
                              ? "bg-black/10 text-slate-900"
                              : "bg-black/30 text-slate-100/90",
                          ].join(" ")}
                        >
                          {LAB_DEMOS.length} surfaces
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Status filters */}
            {activeSection === "experiences" && (
              <div className="space-y-2 rounded-2xl bg-white/10 p-2.5">
                <p className="text-[0.7rem] uppercase tracking-[0.24em] text-slate-100/80">
                  Filter by status
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(
                    [
                      ["all", "All"],
                      ["live", "Live"],
                      ["in-review", "In review"],
                      ["prototype", "Prototype"],
                      ["paused", "Paused"],
                    ] as [ExperienceStatus | "all", string][]
                  ).map(([id, label]) => {
                    const active = statusFilter === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setStatusFilter(id)}
                        className={[
                          "rounded-full px-3 py-1 text-[0.72rem] transition",
                          active
                            ? "bg-sky-400 text-slate-950 shadow-[0_0_24px_rgba(56,189,248,0.9)]"
                            : "bg-black/20 text-slate-100/90 hover:bg-black/40",
                        ].join(" ")}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Small summary widget */}
            <div className="space-y-2 rounded-2xl bg-white/10 p-2.5">
              <p className="text-[0.7rem] uppercase tracking-[0.24em] text-slate-100/80">
                Today overview
              </p>
              <div className="space-y-1.5 text-[0.78rem] text-slate-100/90">
                <div className="flex items-center justify-between">
                  <span>Demo sessions</span>
                  <span className="font-semibold text-slate-50">6 booked</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Live surfaces</span>
                  <span className="font-semibold text-emerald-300">4 ready</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Industries</span>
                  <span className="font-semibold text-slate-50">6 active</span>
                </div>
              </div>
            </div>

            {/* Tiny activity */}
            <div className="space-y-2 rounded-2xl bg-white/10 p-2.5">
              <p className="text-[0.7rem] uppercase tracking-[0.24em] text-slate-100/80">
                Recent notes
              </p>
              <ul className="space-y-1.5 text-[0.75rem] text-slate-100/85">
                <li>· Restaurant surface hits hardest for delivery-first groups.</li>
                <li>· Law intake works when they complain about PDFs.</li>
                <li>· Perfume surface is perfect for luxury, story-first brands.</li>
              </ul>
            </div>
          </aside>

          {/* CENTER COLUMN */}
          <section className="flex flex-col gap-3 rounded-[1.8rem] border border-white/25 bg-white/10 p-3 text-[0.8rem] shadow-[0_26px_110px_rgba(15,23,42,0.9)] backdrop-blur-2xl">
            <AnimatePresence mode="wait">
              {activeSection === "experiences" && (
                <motion.div
                  key="experiences"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col gap-3"
                >
                  <ExperiencesHeader />

                  {/* Category rows – كل كاتيجوري grid بكرتين في السطر */}
                  <div className="space-y-3">
                    {(Object.keys(
                      EXPERIENCE_CATEGORIES,
                    ) as ExperienceCategoryId[]).map((categoryId) => {
                      const items = groupedByCategory[categoryId];
                      if (!items || items.length === 0) return null;
                      return (
                        <ExperienceCategoryRow
                          key={categoryId}
                          categoryId={categoryId}
                          metas={items}
                          onSelectDemo={setSelectedDemoId}
                          selectedDemoId={selectedDemoId}
                        />
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {activeSection === "clients" && (
                <motion.div
                  key="clients"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col gap-3"
                >
                  <ClientsHeader />
                  <ClientsGrid
                    clients={CLIENTS}
                    setSelectedDemoId={setSelectedDemoId}
                  />
                </motion.div>
              )}

              {activeSection === "sessions" && (
                <motion.div
                  key="sessions"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col gap-3"
                >
                  <SessionsHeader />
                  <SessionsTimeline sessions={SESSIONS} />
                </motion.div>
              )}

              {activeSection === "requests" && (
                <motion.div
                  key="requests"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col gap-3"
                >
                  <RequestsHeader />
                  <RequestsInbox
                    requests={REQUESTS}
                    activeRequestId={activeRequestId}
                    onSelectRequest={setActiveRequestId}
                  />
                </motion.div>
              )}

              {activeSection === "system" && (
                <motion.div
                  key="system"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col gap-3"
                >
                  <SystemHeader />
                  <SystemPanel
                    toggles={SYSTEM_TOGGLES}
                    state={systemState}
                    onChange={(id) =>
                      setSystemState((prev) => ({ ...prev, [id]: !prev[id] }))
                    }
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* RIGHT COLUMN – detail panel */}
          <aside className="flex flex-col gap-3 rounded-[1.8rem] border border-white/25 bg-white/10 p-3 text-[0.8rem] shadow-[0_24px_110px_rgba(15,23,42,0.95)] backdrop-blur-2xl">
            <DetailHeader demo={selectedDemo} meta={selectedMeta} />

            <DetailPreviewCard demo={selectedDemo} meta={selectedMeta} />

            <DetailActions demo={selectedDemo} />

            <DetailStats meta={selectedMeta} />

            {activeSection === "requests" && activeRequest && (
              <RequestDetailCard request={activeRequest} />
            )}

            {activeSection === "sessions" && (
              <NextSessionsMini sessions={SESSIONS} />
            )}

            {activeSection === "system" && (
              <SystemMiniSummary systemState={systemState} />
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}

/* ------------------------------------------------------
   BACKGROUND LAYER
-------------------------------------------------------*/

function WebLabBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Image
        src={BACKGROUND_IMAGE_URL}
        alt="Web Lab background"
        fill
        priority
        className="object-cover"
      />
    </div>
  );
}

/* ------------------------------------------------------
   EXPERIENCES SECTION COMPONENTS
-------------------------------------------------------*/

function ExperiencesHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/20 pb-2.5">
      <div>
        <p className="text-[0.7rem] uppercase tracking-[0.24em] text-slate-100/80">
          Experiences
        </p>
        <p className="text-[0.85rem] text-slate-50">
          Every card is a different cinematic surface you can drop a client into.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className="hidden rounded-full bg-white/10 px-3 py-1 text-[0.72rem] text-slate-100/85 sm:inline">
          Designed to feel like a small product, not a gallery.
        </span>
        <button
          type="button"
          className="rounded-full bg-white/20 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-slate-900 hover:bg-white/30"
        >
          New surface
        </button>
      </div>
    </div>
  );
}

function ExperienceCategoryRow(props: {
  categoryId: ExperienceCategoryId;
  metas: ExperienceMeta[];
  selectedDemoId: LabDemoId;
  onSelectDemo: (id: LabDemoId) => void;
}) {
  const { categoryId, metas, selectedDemoId, onSelectDemo } = props;
  const categoryInfo = EXPERIENCE_CATEGORIES[categoryId];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-[0.72rem] uppercase tracking-[0.24em] text-slate-100/80">
            {categoryInfo.label}
          </p>
          <p className="text-[0.78rem] text-slate-100/85">
            {categoryInfo.description}
          </p>
        </div>
        <span className="text-[0.72rem] text-slate-100/70">
          {metas.length} surface{metas.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* 2 cards per row على الديسكتوب */}
      <div className="grid gap-2.5 md:grid-cols-2">
        {metas.map((meta) => {
          const demo = LAB_DEMOS.find((d) => d.id === meta.id)!;
          const active = selectedDemoId === meta.id;
          return (
            <motion.button
              key={meta.id}
              type="button"
              onClick={() => onSelectDemo(meta.id)}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className={[
                "relative flex flex-col overflow-hidden rounded-2xl border px-2.5 py-2.5 text-left",
                active
                  ? "border-sky-300/90 bg-gradient-to-br from-sky-400/35 via-fuchsia-500/25 to-indigo-400/30 shadow-[0_0_40px_rgba(56,189,248,0.9)]"
                  : "border-white/20 bg-white/15 hover:bg-white/25",
              ].join(" ")}
            >
              <div className="flex items-start gap-2">
                <div className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl bg-black/20 text-sm">
                  {demo.icon}
                </div>
                <div className="flex-1 space-y-0.5">
                  <p className="text-[0.8rem] font-semibold text-slate-50">
                    {demo.label}
                  </p>
                  <p className="text-[0.72rem] text-slate-100/85 line-clamp-2">
                    {demo.short}
                  </p>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[0.68rem] text-slate-100/90">
                <StatusBadge status={meta.status} />
                <span className="rounded-full bg-black/20 px-2 py-0.5">
                  {meta.industry}
                </span>
                <span className="rounded-full bg-black/20 px-2 py-0.5">
                  Confidence: {meta.confidence}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between text-[0.7rem] text-slate-100/85">
                <span className="truncate">{meta.lastDemo}</span>
                <span className="text-slate-50">
                  {meta.sessions} sessions · {meta.conversion}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------
   CLIENTS SECTION
-------------------------------------------------------*/

function ClientsHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/20 pb-2.5">
      <div>
        <p className="text-[0.7rem] uppercase tracking-[0.24em] text-slate-100/80">
          Clients
        </p>
        <p className="text-[0.85rem] text-slate-50">
          A simple, demo-safe view of who you&apos;re building for.
        </p>
      </div>
      <span className="rounded-full bg-white/10 px-3 py-1 text-[0.72rem] text-slate-100/85">
        No CRMs, just enough context to talk well on calls.
      </span>
    </div>
  );
}

function ClientsGrid(props: {
  clients: Client[];
  setSelectedDemoId: (id: LabDemoId) => void;
}) {
  const { clients, setSelectedDemoId } = props;
  return (
    <div className="grid gap-2.5 md:grid-cols-2">
      {clients.map((client) => {
        const surface = LAB_DEMOS.find((d) => d.id === client.activeSurface)!;
        return (
          <motion.div
            key={client.id}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="flex flex-col gap-2 rounded-2xl border border-white/20 bg-white/15 p-2.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[0.8rem] font-semibold text-slate-50">
                  {client.name}
                </p>
                <p className="text-[0.72rem] text-slate-100/80">
                  {client.industry} · {client.region}
                </p>
              </div>
              <StageBadge stage={client.stage} />
            </div>
            <div className="flex items-center justify-between gap-2 text-[0.75rem] text-slate-100/85">
              <button
                type="button"
                onClick={() => setSelectedDemoId(client.activeSurface)}
                className="inline-flex items-center gap-1 rounded-full bg-black/25 px-2.5 py-1 text-[0.7rem] hover:bg-black/40"
              >
                <span className="text-[0.85rem]">{surface.icon}</span>
                <span>{surface.badge}</span>
              </button>
              <span className="text-[0.7rem] text-slate-100/75">
                Last contact: {client.lastContact}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------
   SESSIONS SECTION
-------------------------------------------------------*/

function SessionsHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/20 pb-2.5">
      <div>
        <p className="text-[0.7rem] uppercase tracking-[0.24em] text-slate-100/80">
          Live demo sessions
        </p>
        <p className="text-[0.85rem] text-slate-50">
          All the calls where this lab becomes real in front of people.
        </p>
      </div>
      <span className="rounded-full bg-white/10 px-3 py-1 text-[0.72rem] text-slate-100/85">
        This isn&apos;t a calendar — just the cinematic highlights.
      </span>
    </div>
  );
}

function SessionsTimeline(props: { sessions: LiveSession[] }) {
  const { sessions } = props;
  return (
    <div className="space-y-2">
      {sessions.map((session) => {
        const demo = LAB_DEMOS.find((d) => d.id === session.surface)!;
        return (
          <div
            key={session.id}
            className="flex items-start gap-2 rounded-2xl border border-white/20 bg-white/15 px-2.5 py-2"
          >
            <div className="mt-0.5 h-6 w-6 flex-shrink-0 rounded-full bg-black/30 text-center text-[0.8rem] leading-6">
              {demo.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[0.8rem] font-semibold text-slate-50">
                  {session.title}
                </p>
                <SessionStatusBadge status={session.status} />
              </div>
              <p className="text-[0.72rem] text-slate-100/80">
                {session.with} · {session.time}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------
   REQUESTS SECTION
-------------------------------------------------------*/

function RequestsHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/20 pb-2.5">
      <div>
        <p className="text-[0.7rem] uppercase tracking-[0.24em] text-slate-100/80">
          Requests inbox
        </p>
        <p className="text-[0.85rem] text-slate-50">
          Real enquiries, routed into whichever cinematic surface fits best.
        </p>
      </div>
      <span className="rounded-full bg-white/10 px-3 py-1 text-[0.72rem] text-slate-100/85">
        Light, simple inbox — not a full CRM.
      </span>
    </div>
  );
}

function RequestsInbox(props: {
  requests: RequestItem[];
  activeRequestId: string | null;
  onSelectRequest: (id: string) => void;
}) {
  const { requests, activeRequestId, onSelectRequest } = props;

  return (
    <div className="grid gap-2 md:grid-cols-2">
      {requests.map((req) => {
        const active = req.id === activeRequestId;
        const demo =
          req.preferredSurface === "unsure"
            ? null
            : LAB_DEMOS.find((d) => d.id === req.preferredSurface)!;

        return (
          <button
            key={req.id}
            type="button"
            onClick={() => onSelectRequest(req.id)}
            className={[
              "flex flex-col gap-1.5 rounded-2xl border px-2.5 py-2 text-left",
              active
                ? "border-fuchsia-300/90 bg-gradient-to-br from-fuchsia-500/35 via-sky-400/20 to-indigo-400/25 shadow-[0_0_30px_rgba(244,114,182,0.9)]"
                : "border-white/20 bg-white/15 hover:bg-white/25",
            ].join(" ")}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[0.8rem] font-semibold text-slate-50">
                  {req.company}
                </p>
                <p className="text-[0.72rem] text-slate-100/80">
                  {req.from} · {req.topic}
                </p>
              </div>
              <RequestStatusBadge status={req.status} />
            </div>

            <div className="mt-1 flex items-center justify-between gap-2 text-[0.7rem] text-slate-100/85">
              <span>Urgency: {req.urgency}</span>
              {demo ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-black/25 px-2 py-0.5">
                  <span className="text-[0.85rem]">{demo.icon}</span>
                  <span>{demo.badge}</span>
                </span>
              ) : (
                <span className="rounded-full bg-black/25 px-2 py-0.5">
                  Surface: to decide
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------
   SYSTEM SECTION
-------------------------------------------------------*/

function SystemHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/20 pb-2.5">
      <div>
        <p className="text-[0.7rem] uppercase tracking-[0.24em] text-slate-100/80">
          System layer
        </p>
        <p className="text-[0.85rem] text-slate-50">
          How this whole lab behaves across all pages and calls.
        </p>
      </div>
      <span className="rounded-full bg-white/10 px-3 py-1 text-[0.72rem] text-slate-100/85">
        These toggles affect the whole experience, not just this page.
      </span>
    </div>
  );
}

function SystemPanel(props: {
  toggles: SystemToggle[];
  state: Record<string, boolean>;
  onChange: (id: string) => void;
}) {
  const { toggles, state, onChange } = props;

  const groups = ["Demo safety", "Visuals", "Behavior"] as const;

  return (
    <div className="space-y-3">
      {groups.map((group) => (
        <div key={group} className="space-y-1.5 rounded-2xl bg-white/12 p-2.5">
          <p className="text-[0.7rem] uppercase tracking-[0.24em] text-slate-100/80">
            {group}
          </p>
          <div className="space-y-1.5">
            {toggles
              .filter((t) => t.group === group)
              .map((toggle) => (
                <button
                  key={toggle.id}
                  type="button"
                  onClick={() => onChange(toggle.id)}
                  className="flex w-full items-center justify-between rounded-xl bg-black/20 px-2.5 py-2 text-left hover:bg-black/35"
                >
                  <div>
                    <p className="text-[0.78rem] text-slate-50">
                      {toggle.label}
                    </p>
                    <p className="text-[0.7rem] text-slate-100/80">
                      {toggle.description}
                    </p>
                  </div>
                  <Switch checked={!!state[toggle.id]} />
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------
   RIGHT COLUMN – DETAIL PANEL
-------------------------------------------------------*/

function DetailHeader(props: { demo: LabDemo; meta: ExperienceMeta }) {
  const { demo, meta } = props;
  return (
    <div className="flex items-start justify-between gap-2 border-b border-white/20 pb-2.5">
      <div className="space-y-1">
        <p className="text-[0.7rem] uppercase tracking-[0.24em] text-slate-100/80">
          Selected surface
        </p>
        <p className="text-[0.9rem] font-semibold text-slate-50">
          {demo.label}
        </p>
        <p className="text-[0.75rem] text-slate-100/85">{demo.description}</p>
      </div>
      <span className="rounded-full bg-white/10 px-3 py-1 text-[0.72rem] text-slate-100/85">
        {meta.industry}
      </span>
    </div>
  );
}

function DetailPreviewCard(props: { demo: LabDemo; meta: ExperienceMeta }) {
  const { demo, meta } = props;
  return (
    <div className="relative h-32 overflow-hidden rounded-2xl border border-white/25">
      <div
        className={[
          "pointer-events-none absolute inset-x-[-10%] top-[-20%] h-24 bg-gradient-to-r opacity-80 mix-blend-screen",
          demo.accentFrom,
          demo.accentTo,
        ].join(" ")}
      />
      <Image src={demo.image} alt={demo.label} fill className="object-cover opacity-85" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent" />
      <div className="absolute left-3 right-3 top-2 flex items-center justify-between text-[0.68rem]">
        <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 uppercase tracking-[0.18em] text-slate-100/90">
          <span className="text-[0.85rem]">{demo.icon}</span>
          {demo.badge}
        </span>
        <StatusBadge status={meta.status} />
      </div>
      <div className="absolute bottom-2 left-3 right-3 text-[0.7rem] text-slate-50">
        <p className="font-semibold">How to use this on a call</p>
        <p className="text-[0.7rem] text-slate-100/85">
          Start with the hero, move through 2–3 interactions, then tie it back to
          their actual workflow.
        </p>
      </div>
    </div>
  );
}

function DetailActions(props: { demo: LabDemo }) {
  const { demo } = props;
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <a
        href={demo.href}
        className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-fuchsia-500 via-indigo-400 to-sky-400 px-3 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-slate-950 shadow-[0_0_30px_rgba(129,140,248,0.95)] hover:from-fuchsia-400 hover:via-indigo-300 hover:to-sky-300"
      >
        Open client demo
        <span className="ml-1 text-[0.9rem]">↗</span>
      </a>
      <button
        type="button"
        className="rounded-2xl bg-white/20 px-3 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-slate-900 hover:bg-white/30"
      >
        Copy talking points
      </button>
    </div>
  );
}

function DetailStats(props: { meta: ExperienceMeta }) {
  const { meta } = props;
  return (
    <div className="space-y-2 rounded-2xl bg-white/12 p-2.5 text-[0.78rem] text-slate-100/90">
      <div className="flex items-center justify-between">
        <span>Last demo</span>
        <span className="text-slate-50">{meta.lastDemo}</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Sessions · 30 days</span>
        <span className="text-slate-50">{meta.sessions}</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Hit rate</span>
        <span className="text-slate-50">{meta.conversion}</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Confidence</span>
        <span className="text-slate-50">{meta.confidence}</span>
      </div>
      <div className="flex flex-wrap gap-1.5 pt-1 text-[0.68rem]">
        {meta.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-black/25 px-2 py-0.5 text-slate-100/85"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function RequestDetailCard(props: { request: RequestItem }) {
  const { request } = props;
  return (
    <div className="space-y-1.5 rounded-2xl bg-white/12 p-2.5 text-[0.78rem] text-slate-100/90">
      <p className="text-[0.7rem] uppercase tracking-[0.24em] text-slate-100/80">
        Selected request
      </p>
      <p className="text-[0.8rem] font-semibold text-slate-50">
        {request.company} — {request.topic}
      </p>
      <p className="text-[0.75rem] text-slate-100/85">
        From {request.from}. Urgency: {request.urgency}.
      </p>
      <p className="text-[0.72rem] text-slate-100/80">
        In a real build this would sync with your email or CRM — here it&apos;s just a
        cinematic preview.
      </p>
    </div>
  );
}

function NextSessionsMini(props: { sessions: LiveSession[] }) {
  const { sessions } = props;
  const nextTwo = sessions.slice(0, 2);
  return (
    <div className="space-y-1.5 rounded-2xl bg-white/12 p-2.5 text-[0.78rem] text-slate-100/90">
      <p className="text-[0.7rem] uppercase tracking-[0.24em] text-slate-100/80">
        Coming up
      </p>
      {nextTwo.map((session) => (
        <div key={session.id} className="flex items-center justify-between gap-2">
          <span className="text-[0.75rem] text-slate-50">
            {session.title}
          </span>
          <span className="text-[0.7rem] text-slate-100/80">
            {session.time}
          </span>
        </div>
      ))}
    </div>
  );
}

function SystemMiniSummary(props: { systemState: Record<string, boolean> }) {
  const { systemState } = props;
  return (
    <div className="space-y-1.5 rounded-2xl bg-white/12 p-2.5 text-[0.78rem] text-slate-100/90">
      <p className="text-[0.7rem] uppercase tracking-[0.24em] text-slate-100/80">
        System snapshot
      </p>
      <p className="text-[0.75rem]">
        Demo-safe: {systemState["safe-mode"] ? "On" : "Off"} · Cinematic glow:{" "}
        {systemState["cinematic-glow"] ? "On" : "Off"} · Auto-notes:{" "}
        {systemState["auto-notes"] ? "On" : "Off"}.
      </p>
      <p className="text-[0.72rem] text-slate-100/80">
        All of this could eventually wire into a real admin panel — here it simply
        proves you think at the system level.
      </p>
    </div>
  );
}

/* ------------------------------------------------------
   SMALL REUSABLE UI PIECES
-------------------------------------------------------*/

function StatusBadge(props: { status: ExperienceStatus }) {
  const { status } = props;
  const label =
    status === "live"
      ? "Live"
      : status === "in-review"
      ? "In review"
      : status === "prototype"
      ? "Prototype"
      : "Paused";

  const base =
    status === "live"
      ? "bg-emerald-400 text-slate-950"
      : status === "in-review"
      ? "bg-amber-300 text-slate-900"
      : status === "prototype"
      ? "bg-fuchsia-400 text-slate-950"
      : "bg-slate-500 text-slate-50";

  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em]",
        base,
      ].join(" ")}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
      {label}
    </span>
  );
}

function StageBadge(props: { stage: Client["stage"] }) {
  const { stage } = props;
  const map: Record<Client["stage"], string> = {
    Lead: "bg-slate-400/90 text-slate-900",
    Discovery: "bg-sky-400/90 text-slate-900",
    "In proposal": "bg-amber-300/90 text-slate-900",
    Signed: "bg-emerald-400/90 text-slate-950",
  };
  return (
    <span
      className={[
        "rounded-full px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em]",
        map[stage],
      ].join(" ")}
    >
      {stage}
    </span>
  );
}

function SessionStatusBadge(props: { status: LiveSession["status"] }) {
  const { status } = props;
  const label = status;
  const map: Record<LiveSession["status"], string> = {
    Upcoming: "bg-sky-400/90 text-slate-900",
    "In progress": "bg-emerald-400/90 text-slate-950",
    Completed: "bg-slate-400/90 text-slate-900",
  };
  return (
    <span
      className={[
        "rounded-full px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em]",
        map[status],
      ].join(" ")}
    >
      {label}
    </span>
  );
}

function RequestStatusBadge(props: { status: RequestItem["status"] }) {
  const { status } = props;
  const map: Record<RequestItem["status"], string> = {
    Unread: "bg-fuchsia-400/90 text-slate-950",
    Replied: "bg-emerald-400/90 text-slate-950",
    Archived: "bg-slate-400/90 text-slate-900",
  };
  return (
    <span
      className={[
        "rounded-full px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em]",
        map[status],
      ].join(" ")}
    >
      {status}
    </span>
  );
}

function Switch(props: { checked: boolean }) {
  const { checked } = props;
  return (
    <div
      className={[
        "relative inline-flex h-5 w-9 items-center rounded-full border border-white/40 bg-black/30 transition",
        checked ? "bg-emerald-400/90" : "",
      ].join(" ")}
    >
      <span
        className={[
          "inline-block h-4 w-4 transform rounded-full bg-white shadow transition",
          checked ? "translate-x-4" : "translate-x-0.5",
        ].join(" ")}
      />
    </div>
  );
}