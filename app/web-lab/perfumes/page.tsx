"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/* ------------------------------------------------------
   TYPES & DATA
-------------------------------------------------------*/

type Gender = "men" | "women" | "unisex";

type PerfumeNote = {
  name: string;
  intensity: number; // 0 - 100
};

type Perfume = {
  id: string;
  name: string;
  brand: string;
  gender: Gender;
  family: string;
  price: string;
  image: string;
  badge?: string;
  notes: PerfumeNote[];
  tags: string[];
};

type PerfumeBrand = {
  id: string;
  name: string;
  origin: string;
  style: string;
  signature: string;
  tags: string[];
};

const HERO_IMAGE = "/images/perfumes/hero-bottle.jpg"; // غيّرها لأي صورة إعلان عطر وايد

const PERFUMES: Perfume[] = [
  {
    id: "noir-vanille",
    name: "Noir Vanille",
    brand: "Noir Atelier",
    gender: "women",
    family: "Amber · Gourmand",
    price: "135 JD",
    image: "/images/perfumes/noir-vanille.jpg",
    badge: "Best seller",
    tags: ["Warm", "Evening", "Long-lasting"],
    notes: [
      { name: "Vanilla", intensity: 92 },
      { name: "Amber", intensity: 78 },
      { name: "Wood", intensity: 45 },
      { name: "Spice", intensity: 35 },
      { name: "Floral", intensity: 28 },
    ],
  },
  {
    id: "silk-rose",
    name: "Silk Rose",
    brand: "Maison Kayan",
    gender: "women",
    family: "Floral · Musky",
    price: "120 JD",
    image: "/images/perfumes/silk-rose.jpg",
    badge: "New",
    tags: ["Soft", "Daytime", "Signature"],
    notes: [
      { name: "Rose", intensity: 85 },
      { name: "Musk", intensity: 70 },
      { name: "Citrus", intensity: 35 },
      { name: "Powdery", intensity: 55 },
      { name: "Wood", intensity: 20 },
    ],
  },
  {
    id: "cedar-smoke",
    name: "Cedar Smoke",
    brand: "Noir Atelier",
    gender: "men",
    family: "Woody · Smoky",
    price: "140 JD",
    image: "/images/perfumes/cedar-smoke.jpg",
    badge: "Editor’s pick",
    tags: ["Smoky", "Night", "Bold"],
    notes: [
      { name: "Cedarwood", intensity: 88 },
      { name: "Incense", intensity: 80 },
      { name: "Leather", intensity: 60 },
      { name: "Spice", intensity: 50 },
      { name: "Citrus", intensity: 25 },
    ],
  },
  {
    id: "blue-fig",
    name: "Blue Fig",
    brand: "Atelier Kayan",
    gender: "men",
    family: "Fresh · Aromatic",
    price: "115 JD",
    image: "/images/perfumes/blue-fig.jpg",
    tags: ["Fresh", "Office", "All seasons"],
    notes: [
      { name: "Fig", intensity: 70 },
      { name: "Citrus", intensity: 65 },
      { name: "Herbal", intensity: 55 },
      { name: "Musk", intensity: 35 },
      { name: "Wood", intensity: 30 },
    ],
  },
  {
    id: "amber-lines",
    name: "Amber Lines",
    brand: "Linea Obscura",
    gender: "unisex",
    family: "Amber · Spicy",
    price: "150 JD",
    image: "/images/perfumes/amber-lines.jpg",
    badge: "Limited",
    tags: ["Unisex", "Warm", "Layering"],
    notes: [
      { name: "Amber", intensity: 88 },
      { name: "Spice", intensity: 72 },
      { name: "Vanilla", intensity: 60 },
      { name: "Wood", intensity: 55 },
      { name: "Citrus", intensity: 18 },
    ],
  },
  {
    id: "white-musk-veil",
    name: "White Musk Veil",
    brand: "Maison Kayan",
    gender: "unisex",
    family: "Clean · Musky",
    price: "95 JD",
    image: "/images/perfumes/white-musk-veil.jpg",
    tags: ["Skin scent", "Minimal", "Layering"],
    notes: [
      { name: "Musk", intensity: 90 },
      { name: "Powdery", intensity: 60 },
      { name: "Floral", intensity: 45 },
      { name: "Citrus", intensity: 30 },
      { name: "Wood", intensity: 18 },
    ],
  },
];

const BRANDS: PerfumeBrand[] = [
  {
    id: "maison-kayan",
    name: "Maison Kayan",
    origin: "Paris · Amman",
    style: "Soft cinematic florals with clean musks.",
    signature: "Silk Rose, White Musk Veil",
    tags: ["Modern", "Minimal", "Everyday"],
  },
  {
    id: "noir-atelier",
    name: "Noir Atelier",
    origin: "Dubai · Niche",
    style: "Dark gourmand scents that feel like late-night scenes.",
    signature: "Noir Vanille, Cedar Smoke",
    tags: ["Gourmand", "Smoky", "Intimate"],
  },
  {
    id: "linea-obscura",
    name: "Linea Obscura",
    origin: "Berlin",
    style: "Graphic amber lines and spice-heavy compositions.",
    signature: "Amber Lines",
    tags: ["Art-house", "Bold", "Unisex"],
  },
  {
    id: "atelier-kayan",
    name: "Atelier Kayan",
    origin: "Doha",
    style: "Fresh Mediterranean herbs layered with fruits.",
    signature: "Blue Fig",
    tags: ["Fresh", "Aromatic", "Daytime"],
  },
];

/* ------------------------------------------------------
   MAIN PAGE
-------------------------------------------------------*/

export default function PerfumesPage() {
  function scrollToId(id: string) {
    if (typeof document === "undefined") return;
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function jumpToGender(g: Gender) {
    const target =
      g === "women" ? "#for-her" : g === "men" ? "#for-him" : "#for-all";
    scrollToId(target);
  }

  const womenPerfumes = PERFUMES.filter((p) => p.gender === "women");
  const menPerfumes = PERFUMES.filter((p) => p.gender === "men");
  const unisexPerfumes = PERFUMES.filter((p) => p.gender === "unisex");

  return (
    <main
      id="top"
      className="min-h-screen bg-gradient-to-b from-[#020308] via-[#050312] to-[#060612] text-slate-50"
    >
      {/* HERO FULL-SCREEN */}
      <section className="relative min-h-[92vh] overflow-hidden">
        {/* الخلفية: صورة إعلان كاملة الشاشة */}
        <Image
          src={HERO_IMAGE}
          alt="Cinematic perfume campaign visual"
          fill
          priority
          className="object-cover object-[center_20%]"
        />

        {/* طبقة تظليل خفيفة عشان النص يقرأ */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/15"
        />

        {/* إضاءة سينمائية ناعمة */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(251,191,36,0.28),transparent_60%),radial-gradient(circle_at_80%_100%,rgba(244,114,182,0.3),transparent_60%)] mix-blend-screen opacity-70"
        />

        {/* خط 2.5D شبه متآكل يفصل المنطقة بدون كروت */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-[-10%] left-[45%] w-px bg-gradient-to-b from-transparent via-slate-100/80 to-transparent opacity-70"
          style={{
            boxShadow:
              "0 0 18px rgba(255,255,255,0.35), 0 0 40px rgba(0,0,0,0.9)",
            maskImage:
              "radial-gradient(circle at 15% 10%, transparent 0, black 35%), radial-gradient(circle at 60% 40%, transparent 0, black 45%), radial-gradient(circle at 30% 90%, transparent 0, black 40%)",
            WebkitMaskImage:
              "radial-gradient(circle at 15% 10%, transparent 0, black 35%), radial-gradient(circle at 60% 40%, transparent 0, black 45%), radial-gradient(circle at 30% 90%, transparent 0, black 40%)",
          }}
        />

        {/* محتوى الهيرو */}
        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-between px-4 py-10 sm:px-6 lg:px-8">
          {/* أعلى الهيرو – شارة صغيرة */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-[0.7rem] uppercase tracking-[0.22em] text-amber-100/90 shadow-[0_16px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(252,211,77,0.9)]" />
            <span>NOIR ESSENCE · FRAGRANCE SURFACE</span>
            <span className="rounded-full bg-white/5 px-2 py-0.5 text-[0.65rem] text-slate-100">
              Demo experience
            </span>
          </div>

          {/* منتصف الهيرو – النص الرئيسي */}
          <div className="mt-10 flex flex-1 flex-col justify-center gap-8 md:max-w-[44%]">
            <div className="space-y-4">
              <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-[2.7rem]">
                A{" "}
                <span className="bg-gradient-to-r from-amber-200 via-rose-200 to-fuchsia-300 bg-clip-text text-transparent">
                  cinematic perfume house
                </span>{" "}
                built like a night scene, not a catalog.
              </h1>

              <p className="max-w-xl text-[0.98rem] text-slate-200/90">
                One surface that works as a full store and a brand film at the
                same time: hero campaign image, note diagrams, women & men
                sections, and a story block you can talk through on calls.
              </p>

              {/* أزرار رئيسية – متجر + قصة */}
              <div className="flex flex-wrap gap-2 text-[0.78rem]">
                <button
                  type="button"
                  onClick={() => scrollToId("#collections")}
                  className="rounded-full bg-gradient-to-r from-amber-300 to-rose-300 px-5 py-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-slate-950 shadow-[0_0_32px_rgba(251,191,36,0.85)] hover:from-amber-200 hover:to-rose-200"
                >
                  Shop the collection
                </button>
                <button
                  type="button"
                  onClick={() => scrollToId("#story")}
                  className="rounded-full border border-white/30 bg-black/40 px-5 py-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-slate-100 hover:bg-black/70"
                >
                  Enter the story
                </button>
              </div>
            </div>

            {/* جندر سويشر + ميني نوت دياجرام */}
            <div className="flex flex-col gap-4">
              {/* جندر سويشر */}
              <div className="flex flex-wrap items-center gap-2 text-[0.8rem]">
                <span className="text-[0.75rem] text-slate-300">
                  Browse by palette:
                </span>
                <button
                  type="button"
                  onClick={() => jumpToGender("women")}
                  className="rounded-full bg-gradient-to-r from-rose-300 to-amber-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-950 shadow-[0_0_26px_rgba(244,114,182,0.7)] hover:from-rose-200 hover:to-amber-100"
                >
                  For her
                </button>
                <button
                  type="button"
                  onClick={() => jumpToGender("men")}
                  className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100 hover:bg-white/20"
                >
                  For him
                </button>
                <button
                  type="button"
                  onClick={() => jumpToGender("unisex")}
                  className="rounded-full border border-white/25 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100 hover:bg-white/10"
                >
                  Unisex
                </button>
              </div>

              {/* ميني كومبوزيشن بارز – يحسسك بريحة الهيرو */}
              <div className="w-full max-w-sm space-y-1.5 rounded-2xl bg-black/45 p-3 text-[0.75rem] shadow-[0_18px_70px_rgba(0,0,0,0.9)] backdrop-blur-xl">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[0.7rem] uppercase tracking-[0.22em] text-amber-100/90">
                    Featured composition
                  </span>
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-[0.68rem] text-slate-200">
                    Noir Vanille · Demo
                  </span>
                </div>
                <HeroNoteBar label="Vanilla" value={92} />
                <HeroNoteBar label="Amber" value={78} />
                <HeroNoteBar label="Smoked woods" value={54} />
              </div>
            </div>
          </div>

          {/* أسفل الهيرو – إشارة سكرول بسيطة */}
          <div className="mb-4 mt-10 flex items-center justify-between text-[0.7rem] text-slate-300/90">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
              Live-ready surface · plug in your real products later.
            </span>
            <span className="hidden items-center gap-1 sm:flex">
              <span className="h-6 w-px bg-gradient-to-b from-slate-200/70 to-transparent" />
              Scroll to collections
            </span>
          </div>
        </div>
      </section>

      {/* COLLECTIONS SECTION */}
      <section
        id="collections"
        className="mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 lg:px-8"
      >
        <header className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-amber-100/80">
              Collections
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
              Browse by mood, then see the notes clearly.
            </h2>
            <p className="mt-2 max-w-xl text-[0.85rem] text-slate-300">
              Women&apos;s, men&apos;s and unisex scents. Each card shows a mini
              “note bar” so clients instantly feel the composition: vanilla,
              woods, spice, citrus and more.
            </p>
          </div>
          <div className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[0.78rem] text-slate-200 shadow-[0_18px_60px_rgba(0,0,0,0.7)]">
            Built for:{" "}
            <span className="font-medium text-amber-200">
              luxury & niche perfumery
            </span>
          </div>
        </header>

        {/* For her */}
        <GenderRow
          id="for-her"
          label="For her"
          subtitle="Soft florals, warm vanilla and skin-close musks."
          perfumes={womenPerfumes}
        />

        {/* For him */}
        <GenderRow
          id="for-him"
          label="For him"
          subtitle="Woods, incense and aromatic freshness for everyday or evening."
          perfumes={menPerfumes}
        />

        {/* Unisex */}
        <GenderRow
          id="for-all"
          label="Unisex"
          subtitle="Scents built to be shared — amber, spice and clean musk."
          perfumes={unisexPerfumes}
        />
      </section>

      {/* BRANDS SECTION */}
      <section
        id="brands"
        className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8"
      >
        <header className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-amber-100/80">
              Houses & brands
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
              Anchor the store with real perfume houses.
            </h2>
            <p className="mt-2 max-w-xl text-[0.85rem] text-slate-300">
              Use this section for familiar names or your own in-house
              collections. Each card explains the style in one line and links
              naturally into the scents above.
            </p>
          </div>
        </header>

        <div className="grid gap-3 md:grid-cols-2">
          {BRANDS.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </section>

      {/* STORY / BRAND CINEMATIC BLOCK */}
      <section
        id="story"
        className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8"
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#090712] via-[#0b0818] to-[#0f091e] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.85)] sm:p-7">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(251,191,36,0.18),transparent_55%),radial-gradient(circle_at_90%_100%,rgba(244,114,182,0.26),transparent_55%)] opacity-80"
          />
          <div className="relative grid items-center gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="space-y-3">
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-amber-100/90">
                Brand story
              </p>
              <h2 className="text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">
                Built like a short film, not a catalog.
              </h2>
              <p className="text-[0.9rem] text-slate-200/95">
                This surface is meant to feel like the opening scene of a film:
                a single hero bottle, a quiet dark room, and just enough text to
                pull someone in. From here, the experience flows into
                collections, note diagrams and finally checkout — without ever
                feeling like a generic template.
              </p>
              <p className="text-[0.85rem] text-slate-300">
                In a real build, this block can hold your founder story, how you
                blend, or a cinematic scroll sequence explaining each
                collection.
              </p>
            </div>
            <div className="relative h-40 sm:h-48">
              <div className="absolute inset-0 rounded-[1.6rem] border border-white/15 bg-black/50" />
              <div className="absolute inset-[3px] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#050308] via-[#050309] to-[#020105]">
                <Image
                  src="/images/perfumes/story-still.jpg"
                  alt="Perfume still life cinematic scene"
                  fill
                  className="object-cover opacity-80"
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(251,191,36,0.22),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(147,51,234,0.3),transparent_55%)] mix-blend-screen" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[0.76rem] text-slate-100/90">
                  <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                    Scene 01 · Opening shot
                  </span>
                  <span className="rounded-full bg-black/60 px-2 py-1 text-[0.7rem]">
                    Replace with your own footage
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ------------------------------------------------------
   SMALL HERO NOTE BARS
-------------------------------------------------------*/

function HeroNoteBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-0.5">
      <div className="flex items-center justify-between text-[0.7rem] text-slate-200">
        <span>{label}</span>
        <span className="text-slate-400">{value}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-900/70">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-300 via-rose-300 to-fuchsia-300"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------
   COLLECTIONS UI
-------------------------------------------------------*/

function GenderRow(props: {
  id: string;
  label: string;
  subtitle: string;
  perfumes: Perfume[];
}) {
  const { id, label, subtitle, perfumes } = props;
  if (!perfumes.length) return null;

  return (
    <section id={id} className="mt-7 space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-[0.72rem] uppercase tracking-[0.24em] text-amber-100/80">
            {label}
          </p>
          <p className="text-[0.8rem] text-slate-300">{subtitle}</p>
        </div>
        <span className="text-[0.72rem] text-slate-300">
          {perfumes.length} scent{perfumes.length > 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {perfumes.map((p) => (
          <PerfumeCard key={p.id} perfume={p} />
        ))}
      </div>
    </section>
  );
}

function PerfumeCard({ perfume }: { perfume: Perfume }) {
  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/18 bg-white/5 text-[0.8rem] text-slate-100 shadow-[0_22px_80px_rgba(0,0,0,0.9)]"
    >
      {/* image */}
      <div className="relative h-40 overflow-hidden bg-black/40">
        <Image
          src={perfume.image}
          alt={perfume.name}
          fill
          className="object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute left-3 right-3 top-2 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[0.7rem]">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
            {perfume.brand}
          </span>
          {perfume.badge && (
            <span className="rounded-full bg-gradient-to-r from-amber-300 to-rose-300 px-2 py-0.5 text-[0.68rem] font-semibold text-slate-950">
              {perfume.badge}
            </span>
          )}
        </div>
        <div className="absolute bottom-2 left-3 text-[0.72rem] uppercase tracking-[0.18em] text-slate-200/90">
          {perfume.family}
        </div>
      </div>

      {/* content */}
      <div className="flex flex-1 flex-col gap-3 p-3">
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[0.9rem] font-semibold text-slate-50">
              {perfume.name}
            </h3>
            <span className="text-[0.78rem] text-amber-100">
              {perfume.price}
            </span>
          </div>
          <p className="mt-0.5 text-[0.72rem] text-slate-300">
            {perfume.gender === "women"
              ? "Women’s fragrance"
              : perfume.gender === "men"
              ? "Men’s fragrance"
              : "Unisex fragrance"}
          </p>
        </div>

        {/* notes bars */}
        <div className="space-y-1.5">
          {perfume.notes.slice(0, 4).map((note) => (
            <NoteBar key={note.name} note={note} />
          ))}
        </div>

        {/* tags + CTA */}
        <div className="mt-1 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {perfume.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-black/40 px-2 py-0.5 text-[0.68rem] text-slate-200"
              >
                {tag}
              </span>
            ))}
          </div>
          <button
            type="button"
            className="rounded-full bg-gradient-to-r from-amber-300 to-rose-300 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-950 hover:from-amber-200 hover:to-rose-200"
          >
            View & add
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function NoteBar({ note }: { note: PerfumeNote }) {
  return (
    <div className="space-y-0.5">
      <div className="flex items-center justify-between text-[0.7rem]">
        <span className="text-slate-200">{note.name}</span>
        <span className="text-slate-400">{note.intensity}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-black/40">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-300 via-rose-300 to-fuchsia-300"
          style={{ width: `${note.intensity}%` }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------
   BRANDS UI
-------------------------------------------------------*/

function BrandCard({ brand }: { brand: PerfumeBrand }) {
  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/14 bg-white/5 p-3 text-[0.8rem] text-slate-100 shadow-[0_22px_80px_rgba(0,0,0,0.85)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(251,191,36,0.22),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(244,114,182,0.26),transparent_55%)] opacity-60"
      />
      <div className="relative space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[0.9rem] font-semibold text-slate-50">
            {brand.name}
          </h3>
          <span className="rounded-full bg-black/40 px-2 py-0.5 text-[0.7rem] text-slate-200">
            {brand.origin}
          </span>
        </div>
        <p className="text-[0.78rem] text-slate-200/95">{brand.style}</p>
        <p className="text-[0.75rem] text-slate-300">
          Signature:{" "}
          <span className="text-amber-100">{brand.signature}</span>
        </p>
      </div>
      <div className="relative mt-2 flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1">
          {brand.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-black/40 px-2 py-0.5 text-[0.68rem] text-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          type="button"
          className="rounded-full border border-white/30 bg-black/40 px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-slate-100 hover:bg-black/60"
        >
          View scents
        </button>
      </div>
    </motion.article>
  );
}