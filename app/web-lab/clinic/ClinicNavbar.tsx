"use client";

import Link from "next/link";
import { useState } from "react";

type NavItemId = "home" | "booking" | "services" | "doctors" | "contact";

type NavItem = {
  id: NavItemId;
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", href: "#hero" },
  { id: "booking", label: "Booking", href: "#booking" },
  { id: "services", label: "Services", href: "#services" },
  { id: "doctors", label: "Doctors", href: "#doctors" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export default function ClinicNavbar() {
  const [active, setActive] = useState<NavItemId>("home");

  function handleNavClick(item: NavItem) {
    setActive(item.id);

    if (typeof document !== "undefined") {
      const el = document.querySelector(item.href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  return (
    <header
      id="top"
      className="sticky top-1 sm:top-2 lg:top-3 z-40 px-4 sm:px-6 lg:px-8"
      aria-label="Kayan Clinic navigation"
    >
      {/* glow خفيف جداً تحت النافبار بدل شريط أبيض */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-20 sm:inset-x-24 lg:inset-x-32 -top-1 h-12 rounded-full bg-[radial-gradient(circle_at_center,rgba(148,163,184,0.35),transparent_70%)] opacity-25"
      />

      <nav className="relative mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-full border border-white/50 bg-white/10 px-3 py-1.5 text-sm text-slate-700 shadow-[0_18px_70px_rgba(15,23,42,0.38)] backdrop-blur-3xl">
        {/* left side: back button + clinic identity */}
        <div className="flex items-center gap-3">
          {/* back to web lab */}
          <Link
            href="/web-lab"
            className="group inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/20 px-3 py-1.5 text-[0.72rem] font-medium text-slate-700 shadow-[0_14px_40px_rgba(15,23,42,0.35)] backdrop-blur-2xl transition hover:border-cyan-400/80 hover:bg-cyan-50/40 hover:text-cyan-700"
          >
            <span className="relative flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-white/40 text-[0.8rem] text-slate-700">
              <span className="transition-transform group-hover:-translate-x-0.5">
                ←
              </span>
              <span className="pointer-events-none absolute inset-0 rounded-full bg-cyan-400/50 opacity-0 blur group-hover:opacity-100" />
            </span>
            <span className="tracking-[0.14em] uppercase">
              Back to Web Lab
            </span>
          </Link>

          {/* clinic identity */}
          <div className="hidden h-8 items-center gap-3 rounded-full bg-white/12 px-2.5 shadow-inner backdrop-blur-2xl sm:flex">
            <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-sky-600 text-xs font-semibold text-white shadow-[0_0_20px_rgba(34,211,238,0.9)]">
              K
              <span className="pointer-events-none absolute inset-0 rounded-full bg-cyan-300/40 blur-md" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[0.8rem] font-semibold text-slate-900">
                Kayan Clinic
              </span>
              <span className="text-[0.7rem] text-slate-500">
                Family · Heart · Skin · Mind
              </span>
            </div>
          </div>
        </div>

        {/* right side: nav links */}
        <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item)}
                className={`relative rounded-full px-3 py-1.5 text-[0.72rem] font-medium transition ${
                  isActive
                    ? "text-cyan-700"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {isActive && (
                  <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.45),transparent_70%)] shadow-[0_0_30px_rgba(56,189,248,0.6)]" />
                )}
                <span
                  className={`relative tracking-[0.18em] uppercase ${
                    isActive ? "font-semibold" : "font-medium"
                  }`}
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