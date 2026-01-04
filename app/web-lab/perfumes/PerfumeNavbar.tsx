// app/web-lab/perfumes/PerfumeNavbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

type NavItemId = "collections" | "story" | "notes" | "craft" | "cart";

type NavItem = {
  id: NavItemId;
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: "collections", label: "Collection", href: "#collections" },
  { id: "story", label: "Story", href: "#story" },
  { id: "notes", label: "Notes", href: "#notes" },
  { id: "craft", label: "Craft", href: "#craft" },
  { id: "cart", label: "Cart", href: "#cart" },
];

export default function PerfumeNavbar() {
  const [active, setActive] = useState<NavItemId>("collections");

  function handleNavClick(item: NavItem) {
    setActive(item.id);
    if (typeof document !== "undefined") {
      const el = document.querySelector(item.href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <header
      className="sticky top-2 z-40 px-4 sm:px-6 lg:px-8"
      aria-label="Noir Essence navigation"
    >
      {/* ضوء خفيف تحت النافبار */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 -top-4 h-16 rounded-full bg-[radial-gradient(circle_at_center,rgba(248,250,252,0.28),transparent_70%)] opacity-60 blur-2xl"
      />

      <nav className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-white/10 bg-black/40 px-3 py-2 text-[0.8rem] text-slate-100 shadow-[0_24px_80px_rgba(0,0,0,0.85)] backdrop-blur-3xl">
        {/* left: back + brand mark */}
        <div className="flex items-center gap-3">
          {/* back to web lab */}
          <Link
            href="/web-lab"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[0.72rem] font-medium text-slate-100 shadow-[0_14px_45px_rgba(15,23,42,0.8)] backdrop-blur-2xl transition hover:border-cyan-300/80 hover:bg-cyan-500/10 hover:text-cyan-100"
          >
            <span className="relative flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-white/10 text-[0.8rem] text-slate-100">
              <span className="transition-transform group-hover:-translate-x-0.5">
                ↩
              </span>
              <span className="pointer-events-none absolute inset-0 rounded-full bg-cyan-400/40 opacity-0 blur group-hover:opacity-100" />
            </span>
            <span className="tracking-[0.18em] uppercase">
              Back to Web Lab
            </span>
          </Link>

          {/* brand pill */}
          <div className="hidden h-8 items-center gap-3 rounded-full bg-white/5 px-3 shadow-inner shadow-black/60 backdrop-blur-2xl sm:flex">
            <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-zinc-100 via-slate-300 to-amber-300 text-[0.7rem] font-semibold tracking-[0.16em] text-slate-900">
              N
              <span className="pointer-events-none absolute inset-0 rounded-full bg-amber-200/40 blur-[6px]" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[0.8rem] font-semibold text-slate-50">
                NOIR ESSENCE
              </span>
              <span className="text-[0.7rem] text-slate-300">
                Parfums · Limited Series
              </span>
            </div>
          </div>
        </div>

        {/* right: nav links */}
        <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item)}
                className="relative rounded-full px-3 py-1.5 transition"
              >
                {isActive && (
                  <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(250,250,250,0.25),transparent_70%)] shadow-[0_0_40px_rgba(248,250,252,0.55)]" />
                )}
                <span
                  className={`relative tracking-[0.24em] uppercase ${
                    isActive
                      ? "text-amber-100"
                      : "text-slate-300 hover:text-slate-100"
                  } text-[0.7rem]`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}