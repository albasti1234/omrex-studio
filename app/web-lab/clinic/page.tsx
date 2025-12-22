"use client";

import React, { useState } from "react";
import Image from "next/image";

/* --------------------------------------------- */
/*                  TYPES & DATA                 */
/* --------------------------------------------- */

type VisitReason =
  | "general"
  | "follow-up"
  | "cardio"
  | "derma"
  | "mental"
  | "child"
  | "other";

type VisitReasonOption = {
  id: VisitReason;
  label: string;
  description: string;
};

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  tags: string[];
  nextAvailable: string;
};

type TimeSlot = {
  id: string;
  label: string;
  period: "morning" | "afternoon" | "evening";
};

type BookingStep = 1 | 2 | 3;

const VISIT_REASONS: VisitReasonOption[] = [
  {
    id: "general",
    label: "General check-up",
    description: "Routine visit, blood pressure, yearly screening.",
  },
  {
    id: "follow-up",
    label: "Follow-up visit",
    description: "Returning for an issue already discussed.",
  },
  {
    id: "cardio",
    label: "Heart & chest concerns",
    description: "Chest pain, shortness of breath, palpitations.",
  },
  {
    id: "derma",
    label: "Skin & allergy",
    description: "Rash, itching, allergy checks and more.",
  },
  {
    id: "mental",
    label: "Mental health",
    description: "Anxiety, sleep, mood and emotional support.",
  },
  {
    id: "child",
    label: "Child visit",
    description: "Pediatrics · growth, vaccines, concerns.",
  },
  {
    id: "other",
    label: "Other",
    description: "Not sure or doesn’t fit any of the above.",
  },
];

const DOCTORS: Doctor[] = [
  {
    id: "lina",
    name: "Dr. Lina Amin",
    specialty: "Family Medicine",
    tags: ["Gentle", "Explains clearly"],
    nextAvailable: "Today · 4:30 PM",
  },
  {
    id: "omar",
    name: "Dr. Omar Hassan",
    specialty: "Cardiology",
    tags: ["Heart specialist", "Calm & precise"],
    nextAvailable: "Today · 5:10 PM",
  },
  {
    id: "samira",
    name: "Dr. Samira Khalil",
    specialty: "Dermatology",
    tags: ["Skin & allergy", "Detail-focused"],
    nextAvailable: "Tomorrow · 10:00 AM",
  },
  {
    id: "yousef",
    name: "Dr. Yousef Nassar",
    specialty: "Psychology",
    tags: ["Mental health", "Longer sessions"],
    nextAvailable: "Tomorrow · 3:00 PM",
  },
];

const TIME_SLOTS: TimeSlot[] = [
  { id: "10-00", label: "10:00 AM", period: "morning" },
  { id: "10-30", label: "10:30 AM", period: "morning" },
  { id: "11-00", label: "11:00 AM", period: "morning" },
  { id: "13-30", label: "1:30 PM", period: "afternoon" },
  { id: "14-00", label: "2:00 PM", period: "afternoon" },
  { id: "16-30", label: "4:30 PM", period: "evening" },
  { id: "17-10", label: "5:10 PM", period: "evening" },
  { id: "18-00", label: "6:00 PM", period: "evening" },
];

/* ---------- Types & Data for Services Section ---------- */

type ServiceFilter = "all" | "family" | "skin" | "heart" | "mind";

type ClinicService = {
  id: string;
  name: string;
  category: ServiceFilter;
  short: string;
  duration: string;
  price: string;
  icon: string;
  badge?: "Popular" | "New" | "Kids";
};

const CLINIC_SERVICES: ClinicService[] = [
  {
    id: "family-checkup",
    name: "Family check-up",
    category: "family",
    short: "General check-ups for adults & kids, blood pressure, routine labs.",
    duration: "25–30 min",
    price: "40–55 JD",
    icon: "👨‍👩‍👧‍👦",
    badge: "Popular",
  },
  {
    id: "chronic-followup",
    name: "Chronic condition follow-up",
    category: "family",
    short: "Regular visits for diabetes, hypertension & thyroid care.",
    duration: "20 min",
    price: "35–45 JD",
    icon: "📋",
  },
  {
    id: "skin-acne",
    name: "Skin & acne clinic",
    category: "skin",
    short: "Acne treatment plans, pigmentation & skin maintenance.",
    duration: "30–40 min",
    price: "50–70 JD",
    icon: "🧴",
    badge: "Popular",
  },
  {
    id: "skin-check",
    name: "Full skin check",
    category: "skin",
    short: "Moles, rashes & yearly prevention check for the whole body.",
    duration: "25–30 min",
    price: "55–75 JD",
    icon: "🩺",
  },
  {
    id: "heart-eval",
    name: "Heart evaluation",
    category: "heart",
    short: "ECG, risk assessment and follow-up for chest pain & shortness of breath.",
    duration: "30–40 min",
    price: "60–80 JD",
    icon: "❤️",
    badge: "New",
  },
  {
    id: "bp-clinic",
    name: "Blood pressure clinic",
    category: "heart",
    short: "Control plan, medications review & home monitoring guidance.",
    duration: "20 min",
    price: "35–45 JD",
    icon: "📈",
  },
  {
    id: "mind-anxiety",
    name: "Anxiety & sleep visit",
    category: "mind",
    short: "Calm, private visit to talk through anxiety, sleep & stress.",
    duration: "30–40 min",
    price: "50–65 JD",
    icon: "🧠",
    badge: "Popular",
  },
  {
    id: "mind-followup",
    name: "Mental health follow-up",
    category: "mind",
    short: "Ongoing follow-up for patients already on a treatment plan.",
    duration: "25–30 min",
    price: "45–60 JD",
    icon: "💬",
  },
  {
    id: "kids-check",
    name: "Kids well-being visit",
    category: "family",
    short: "Growth, vaccines review & development check in one calm visit.",
    duration: "25–30 min",
    price: "40–55 JD",
    icon: "🧸",
    badge: "Kids",
  },
  {
    id: "skin-procedures",
    name: "Minor skin procedures",
    category: "skin",
    short: "Cryotherapy, small lesion removal & other minor procedures.",
    duration: "30–45 min",
    price: "On examination",
    icon: "🔍",
  },
];

export default function ClinicPage() {
  const [step, setStep] = useState<BookingStep>(1);
  const [selectedReason, setSelectedReason] = useState<VisitReason | null>("general");
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>("lina");
  const [selectedSlotId, setSelectedSlotId] = useState<string>("16-30");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [preferredContact, setPreferredContact] = useState<"call" | "whatsapp" | "sms">(
    "whatsapp",
  );
  const [bookingDone, setBookingDone] = useState(false);

  // فلتر الخدمات
  const [activeFilter, setActiveFilter] = useState<ServiceFilter>("all");

  const selectedDoctor =
    DOCTORS.find((d) => d.id === selectedDoctorId) ?? DOCTORS[0];
  const selectedSlot =
    TIME_SLOTS.find((t) => t.id === selectedSlotId) ?? TIME_SLOTS[0];
  const selectedReasonObj =
    VISIT_REASONS.find((r) => r.id === selectedReason) ?? VISIT_REASONS[0];

  const visibleServices = CLINIC_SERVICES.filter((service) =>
    activeFilter === "all" ? true : service.category === activeFilter,
  );

  function goNext() {
    setBookingDone(false);
    setStep((prev) => {
      const n = (prev as number) + 1;
      if (n > 3) return 3 as BookingStep;
      return n as BookingStep;
    });
  }

  function goBack() {
    setBookingDone(false);
    setStep((prev) => {
      const n = (prev as number) - 1;
      if (n < 1) return 1 as BookingStep;
      return n as BookingStep;
    });
  }

  function handleConfirm() {
    setBookingDone(true);
  }

  function scrollToBooking() {
    if (typeof document === "undefined") return;
    const el = document.querySelector("#booking");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f6fbff] via-[#e4edf5] to-[#d3e1ee] text-slate-900">
      {/* HERO */}
      <section
        id="hero"
        className="relative -mx-4 mb-10 h-[420px] overflow-hidden bg-slate-300 sm:-mx-6 sm:h-[460px] lg:-mx-8 lg:h-[520px]"
      >
        <Image
          src="/images/clinic/hero-reception.jpg"
          alt="Bright reception at Kayan Clinic with calm white and soft cyan tones"
          fill
          priority
          className="object-cover object-[center_30%]"
        />

        {/* overlays */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/5 to-black/20" />

        {/* hero content */}
        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-between px-4 py-8 sm:px-6 lg:px-8">
          {/* top row */}
          <div className="flex items-center justify-between gap-4 text-[0.8rem]">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-cyan-100">
                KAYAN CLINIC
              </span>
              <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[0.68rem] text-cyan-100/90">
                Family · Heart · Skin · Mind
              </span>
            </div>
            <div className="hidden items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1 text-[0.75rem] text-slate-100 backdrop-blur sm:flex">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              <span>Open today · 09:00 – 21:00</span>
            </div>
          </div>

          {/* main text */}
          <div className="max-w-xl space-y-3">
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-white drop-shadow-[0_8px_25px_rgba(0,0,0,0.7)] sm:text-4xl lg:text-[2.7rem]">
              A calm, clear{" "}
              <span className="text-cyan-200">Kayan Clinic</span>{" "}
              experience.
            </h1>
            <p className="text-[0.95rem] text-slate-100/90 drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
              One simple page where patients see who you are, what you treat, and can
              book a visit in less than a minute — without feeling lost or rushed.
            </p>
            <div className="flex flex-wrap gap-2 text-[0.78rem]">
              <span className="rounded-full bg-slate-900/70 px-3 py-1 text-cyan-100 drop-shadow">
                Easy for patients to understand
              </span>
              <span className="rounded-full bg-slate-900/60 px-3 py-1 text-cyan-100 drop-shadow">
                Built like a real booking app
              </span>
            </div>
          </div>

          {/* stats + CTA */}
          <div className="mt-4 max-w-xl space-y-3">
            <div className="grid gap-3 text-[0.8rem] sm:grid-cols-3">
              <HeroStat
                label="Average confirmation"
                value="< 10 min"
                sub="From reception team"
              />
              <HeroStat
                label="New patients / month"
                value="180+"
                sub="From web & WhatsApp"
              />
              <HeroStat
                label="Patient rating"
                value="4.9 / 5"
                sub="Recent feedback"
              />
            </div>
            <button
              type="button"
              onClick={scrollToBooking}
              className="inline-flex items-center justify-center rounded-full bg-cyan-500/90 px-5 py-2 text-[0.85rem] font-semibold text-white shadow-[0_16px_45px_rgba(8,47,73,0.7)] backdrop-blur hover:bg-cyan-400"
            >
              Start booking in 3 steps
            </button>
          </div>
        </div>
      </section>

      {/* المحتوى تحت الهيرو */}
      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        {/* BOOKING SECTION */}
        <section id="booking" className="space-y-5">
  {/* 🔹 What can we help with – صار أول واحد فوق */}
  <div className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-sky-50 via-slate-50 to-cyan-50 p-4 shadow-[0_22px_80px_rgba(15,23,42,0.12)] sm:p-5">
    <div className="flex items-center justify-between gap-2">
      <div>
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-sky-700">
          What can we help with?
        </p>
        <p className="text-[0.85rem] text-slate-600">
          Pick the closest reason. You can always explain more at the end.
        </p>
      </div>
      <span className="hidden rounded-full bg-sky-100/80 px-3 py-1 text-[0.75rem] text-sky-700 sm:inline shadow-sm">
        Step {step} of 3
      </span>
    </div>

    <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {VISIT_REASONS.map((reason) => (
        <button
          key={reason.id}
          type="button"
          onClick={() => {
            setSelectedReason(reason.id);
            setStep(1);
          }}
          className={`flex h-full flex-col rounded-2xl border px-3 py-2.5 text-left text-[0.82rem] transition ${
            selectedReason === reason.id
              ? "border-sky-500 bg-white shadow-md shadow-sky-100"
              : "border-slate-200 bg-white/70 hover:border-sky-300 hover:bg-sky-50/60"
          }`}
        >
          <p className="font-semibold text-slate-800">{reason.label}</p>
          <p className="mt-1 text-[0.78rem] text-slate-600">
            {reason.description}
          </p>
        </button>
      ))}
    </div>
  </div>

  {/* 🔹 بعده الجريد: How booking works + Doctors + Booking form */}
  <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.05fr)]">
    {/* LEFT – how booking works + doctors */}
    <div className="space-y-5">
      {/* كيف بيشتغل الحجز */}
      <div className="rounded-3xl border border-slate-200/70 bg-slate-50/90 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.12)]">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-sky-700">
          How booking works
        </p>
        <p className="mt-2 text-[0.9rem] text-slate-700">
          No accounts, no passwords. Just three simple steps:
        </p>
        <ol className="mt-3 space-y-1.5 text-[0.85rem] text-slate-700">
          <li>1. Choose why you&apos;re visiting.</li>
          <li>2. Pick the doctor and time that work best for you.</li>
          <li>3. Share your name, phone number, and how we should contact you.</li>
        </ol>
        <p className="mt-3 text-[0.8rem] text-slate-500">
          This is a front-end demo — perfect to show clinic owners how their site
          could feel before connecting to any backend.
        </p>
      </div>

      {/* الأطباء = DOCTORS */}
      <div
        id="doctors"
        className="rounded-3xl border border-slate-200/70 bg-slate-50/90 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.12)]"
      >
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-sky-700">
          Today&apos;s doctors at Kayan
        </p>
        <div className="mt-3 grid gap-3 text-[0.8rem] sm:grid-cols-2">
          {DOCTORS.map((doc) => (
            <div
              key={doc.id}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 shadow-sm"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-100 text-[0.9rem] font-semibold text-cyan-800">
                {doc.name
                  .split(" ")
                  .map((p) => p[0])
                  .join("")}
              </div>
              <div>
                <p className="font-semibold text-slate-800">{doc.name}</p>
                <p className="text-[0.78rem] text-slate-600">
                  {doc.specialty}
                </p>
                <p className="mt-1 text-[0.75rem] text-slate-500">
                  Next available:{" "}
                  <span className="text-slate-800">
                    {doc.nextAvailable}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* RIGHT – web application للحجز (نفسه ما تغيّر) */}
    <div className="rounded-3xl border border-slate-200/80 bg-slate-50/95 p-4 shadow-[0_26px_80px_rgba(15,23,42,0.18)] sm:p-5">
      {/* العنوان */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-sky-700">
            Book a visit (demo)
          </p>
          <p className="mt-1 text-[0.85rem] text-slate-600">
            Fill this like a real patient. We&apos;ll walk through the full
            flow.
          </p>
        </div>
        <div className="hidden text-right text-[0.75rem] text-slate-500 sm:block">
          <p>Avg. form time</p>
          <p className="font-semibold text-slate-700">~ 45 seconds</p>
        </div>
      </div>

              {/* indicator للخطوات */}
              <BookingStepsBar step={step} />

              {/* محتوى الخطوات */}
              <div className="mt-4 space-y-4 text-[0.85rem]">
                {step === 1 && (
                  <div className="space-y-3">
                    <p className="text-slate-700">
                      You selected:{" "}
                      <span className="font-semibold text-sky-700">
                        {selectedReasonObj.label}
                      </span>
                    </p>
                    <p className="text-[0.8rem] text-slate-500">
                      If you&apos;re not sure, this is enough. The doctor will ask you
                      more when you arrive.
                    </p>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-[0.8rem] text-slate-700">
                        When you click{" "}
                        <span className="font-semibold text-sky-700">
                          Next
                        </span>
                        , we&apos;ll ask:
                      </p>
                      <ul className="mt-1 list-disc pl-5 text-[0.8rem] text-slate-600">
                        <li>Which doctor you prefer (or no preference).</li>
                        <li>Which time window fits your day.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="font-medium text-slate-700">
                        Choose a doctor
                      </p>
                      <p className="text-[0.8rem] text-slate-500">
                        If you don&apos;t mind, keep the first option — we&apos;ll pick
                        whoever is fastest for you.
                      </p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {DOCTORS.map((doc) => (
                          <button
                            key={doc.id}
                            type="button"
                            onClick={() => setSelectedDoctorId(doc.id)}
                            className={`flex h-full flex-col rounded-2xl border px-3 py-2 text-left text-[0.8rem] transition ${
                              selectedDoctorId === doc.id
                                ? "border-sky-500 bg-sky-50 shadow-md shadow-sky-100"
                                : "border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50/70"
                            }`}
                          >
                            <p className="font-semibold text-slate-800">
                              {doc.name}
                            </p>
                            <p className="text-[0.78rem] text-slate-600">
                              {doc.specialty}
                            </p>
                            <div className="mt-1 flex flex-wrap gap-1.5 text-[0.7rem] text-slate-500">
                              {doc.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="font-medium text-slate-700">
                        Pick a time window
                      </p>
                      <p className="text-[0.8rem] text-slate-500">
                        These are example slots. In a real system, they would come
                        from your booking tool.
                      </p>
                      <div className="flex flex-wrap gap-2 text-[0.8rem]">
                        {TIME_SLOTS.map((slot) => (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => setSelectedSlotId(slot.id)}
                            className={`rounded-full border px-3 py-1 ${
                              selectedSlotId === slot.id
                                ? "border-sky-600 bg-sky-600 text-white shadow-sm"
                                : "border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50"
                            }`}
                          >
                            {slot.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="text-[0.75rem] uppercase tracking-[0.18em] text-sky-700">
                          Full name
                        </label>
                        <input
                          type="text"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          placeholder="Your name"
                          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-[0.85rem] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
                        />
                      </div>
                      <div>
                        <label className="text-[0.75rem] uppercase tracking-[0.18em] text-sky-700">
                          Phone number
                        </label>
                        <input
                          type="tel"
                          value={patientPhone}
                          onChange={(e) => setPatientPhone(e.target.value)}
                          placeholder="+962 7x xxx xxxx"
                          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-[0.85rem] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[0.75rem] uppercase tracking-[0.18em] text-sky-700">
                        How should we contact you?
                      </label>
                      <div className="mt-2 flex flex-wrap gap-2 text-[0.8rem]">
                        <ContactChip
                          label="WhatsApp"
                          active={preferredContact === "whatsapp"}
                          onClick={() => setPreferredContact("whatsapp")}
                        />
                        <ContactChip
                          label="Phone call"
                          active={preferredContact === "call"}
                          onClick={() => setPreferredContact("call")}
                        />
                        <ContactChip
                          label="SMS"
                          active={preferredContact === "sms"}
                          onClick={() => setPreferredContact("sms")}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[0.75rem] uppercase tracking-[0.18em] text-sky-700">
                        Anything you&apos;d like to share? (optional)
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        placeholder="For example: medication you’re taking, how long you’ve felt this, or anything that helps us prepare."
                        className="mt-1 w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-[0.85rem] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
                      />
                    </div>

                    <div className="rounded-2xl border border-sky-100 bg-sky-50 p-3 text-[0.8rem] text-slate-700">
                      <p className="font-semibold text-sky-800">
                        Summary (what reception would see)
                      </p>
                      <p className="mt-1">
                        Visit reason:{" "}
                        <span className="font-medium">
                          {selectedReasonObj.label}
                        </span>
                        . Doctor:{" "}
                        <span className="font-medium">
                          {selectedDoctor.name}
                        </span>
                        . Time:{" "}
                        <span className="font-medium">
                          {selectedSlot.label}
                        </span>
                        . Contact by{" "}
                        <span className="font-medium">
                          {preferredContact === "whatsapp"
                            ? "WhatsApp"
                            : preferredContact === "call"
                            ? "phone call"
                            : "SMS"}
                        </span>
                        .
                      </p>
                      <p className="mt-1 text-slate-500">
                        In a real system, this would create a booking and send
                        confirmation messages.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* أزرار التنقل والتأكيد */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-3">
                <div className="flex items-center gap-2 text-[0.8rem]">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={step === 1}
                    className={`rounded-full px-4 py-1.5 text-[0.8rem] ${
                      step === 1
                        ? "cursor-not-allowed bg-slate-100 text-slate-400"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={step === 3}
                    className={`rounded-full px-4 py-1.5 text-[0.8rem] ${
                      step === 3
                        ? "cursor-not-allowed bg-slate-100 text-slate-400"
                        : "bg-sky-600 text-white hover:bg-sky-500"
                    }`}
                  >
                    Next
                  </button>
                  <span className="text-[0.75rem] text-slate-500">
                    Demo only · no real bookings created
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleConfirm}
                  className="rounded-full bg-emerald-500 px-5 py-1.5 text-[0.8rem] font-semibold text-white shadow-sm hover:bg-emerald-400"
                >
                  Send booking request
                </button>
              </div>

              {bookingDone && (
                <div className="mt-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-3 text-[0.8rem] text-emerald-800">
                  <p className="font-semibold">
                    Request received – in demo mode.
                  </p>
                  <p className="mt-1">
                    In production, this message would confirm that the Kayan
                    Clinic team has your details and will reach out shortly. Here
                    it exists to show the complete flow for clients.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 🔹 What can we help with – تحت الـ booking، full width */}
          <div className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-sky-50 via-slate-50 to-cyan-50 p-4 shadow-[0_22px_80px_rgba(15,23,42,0.12)] sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-sky-700">
                  What can we help with?
                </p>
                <p className="text-[0.85rem] text-slate-600">
                  Pick the closest reason. You can always explain more at the end.
                </p>
              </div>
              <span className="hidden rounded-full bg-sky-100/80 px-3 py-1 text-[0.75rem] text-sky-700 sm:inline shadow-sm">
                Step {step} of 3
              </span>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {VISIT_REASONS.map((reason) => (
                <button
                  key={reason.id}
                  type="button"
                  onClick={() => {
                    setSelectedReason(reason.id);
                    setStep(1);
                  }}
                  className={`flex h-full flex-col rounded-2xl border px-3 py-2.5 text-left text-[0.82rem] transition ${
                    selectedReason === reason.id
                      ? "border-sky-500 bg-white shadow-md shadow-sky-100"
                      : "border-slate-200 bg-white/70 hover:border-sky-300 hover:bg-sky-50/60"
                  }`}
                >
                  <p className="font-semibold text-slate-800">{reason.label}</p>
                  <p className="mt-1 text-[0.78rem] text-slate-600">
                    {reason.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section
          id="services"
          className="mt-12 space-y-4 rounded-3xl border border-slate-200/70 bg-slate-50/90 p-4 shadow-[0_22px_80px_rgba(15,23,42,0.16)] sm:p-5"
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.26em] text-sky-700">
                Clinic services
              </p>
              <h2 className="mt-1 text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
                Treatments explained in clear, simple language
              </h2>
              <p className="mt-2 max-w-xl text-[0.85rem] text-slate-600">
                We group visits into family medicine, skin, heart and mind —
                so patients can instantly see where they fit without medical
                jargon.
              </p>
            </div>
            <div className="rounded-2xl bg-sky-50 px-3 py-2 text-[0.8rem] text-sky-800 shadow-sm">
              <p className="font-medium">Patient-first layout</p>
              <p className="text-[0.72rem] text-sky-700/80">
                Easy enough for parents, clear enough for busy professionals.
              </p>
            </div>
          </div>

          {/* الفلاتر */}
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <ServiceFilterChip
              label="All visits"
              active={activeFilter === "all"}
              onClick={() => setActiveFilter("all")}
            />
            <ServiceFilterChip
              label="Family & kids"
              active={activeFilter === "family"}
              onClick={() => setActiveFilter("family")}
            />
            <ServiceFilterChip
              label="Skin"
              active={activeFilter === "skin"}
              onClick={() => setActiveFilter("skin")}
            />
            <ServiceFilterChip
              label="Heart"
              active={activeFilter === "heart"}
              onClick={() => setActiveFilter("heart")}
            />
            <ServiceFilterChip
              label="Mind"
              active={activeFilter === "mind"}
              onClick={() => setActiveFilter("mind")}
            />
          </div>

          {/* الكروت */}
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visibleServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <p className="mt-4 text-[0.78rem] text-slate-500">
            All durations & prices here are demo placeholders. In a real build,
            we plug in your clinic&apos;s live data and availability rules.
          </p>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="mt-10 grid gap-6 rounded-3xl border border-slate-200/70 bg-slate-50/95 p-4 text-[0.85rem] text-slate-800 shadow-[0_22px_80px_rgba(15,23,42,0.14)] sm:p-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
        >
          {/* left: info + طرق التواصل */}
          <div className="space-y-3">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.26em] text-sky-700">
              Contact & location
            </p>
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
              Easy to reach, easy to book.
            </h2>
            <p className="text-[0.85rem] text-slate-600">
              You can book from this page, send us a quick WhatsApp message, or
              call the reception team directly. Whichever is easier for you.
            </p>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/90 p-3 shadow-sm">
                <p className="text-[0.78rem] font-semibold text-slate-900">
                  Call & WhatsApp
                </p>
                <p className="mt-1 text-[0.85rem] text-slate-700">
                  +962 7x xxx xxxx
                </p>
                <p className="mt-1 text-[0.78rem] text-slate-500">
                  Daily 09:00 – 21:00 · Arabic & English
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-[0.78rem]">
                  <button
                    type="button"
                    className="rounded-full bg-emerald-500 px-3 py-1.5 font-semibold text-white shadow-sm hover:bg-emerald-400"
                  >
                    Message on WhatsApp
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-700 hover:border-sky-300 hover:bg-sky-50"
                  >
                    Call reception
                  </button>
                </div>
              </div>

              <div className="rounded-2xl bg-white/90 p-3 shadow-sm">
                <p className="text-[0.78rem] font-semibold text-slate-900">
                  Location
                </p>
                <p className="mt-1 text-[0.85rem] text-slate-700">
                  4th Floor, Kayan Medical Building
                </p>
                <p className="text-[0.85rem] text-slate-700">
                  Main Street, Amman, Jordan
                </p>
                <p className="mt-1 text-[0.78rem] text-slate-500">
                  Free parking available behind the building.
                </p>
                <button
                  type="button"
                  className="mt-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[0.78rem] text-sky-700 hover:border-sky-400 hover:bg-sky-50"
                >
                  Open in Google Maps
                </button>
              </div>
            </div>
          </div>

          {/* right: mini map / card شكل بصري بس */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-cyan-50 shadow-[0_18px_60px_rgba(15,23,42,0.14)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(45,212,191,0.25),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(148,163,184,0.25))]" />

            <div className="relative flex h-full flex-col justify-between p-4">
              <div>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-sky-700">
                  Map preview (demo)
                </p>
                <p className="mt-1 text-[0.85rem] text-slate-700">
                  In a real build, this area would show an interactive map or
                  directions card.
                </p>
              </div>

              <div className="mt-4 flex flex-col gap-2 text-[0.8rem] text-slate-700">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 shadow-sm">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 text-xs font-semibold text-white">
                    K
                  </span>
                  <span className="font-medium text-slate-900">
                    Kayan Clinic
                  </span>
                  <span className="text-[0.75rem] text-emerald-600">
                    Open · Closes 21:00
                  </span>
                </div>
                <p className="text-[0.78rem] text-slate-600">
                  Patients usually find us easily on Google Maps. We also send a
                  location pin with every confirmed booking.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* --------------------------------------------- */
/*               PRESENTATIONAL UI               */
/* --------------------------------------------- */

function HeroStat(props: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-white/25 bg-slate-900/45 px-3 py-2 text-white shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur-sm">
      <p className="text-[0.7rem] uppercase tracking-[0.18em] text-cyan-100/80">
        {props.label}
      </p>
      <p className="mt-1 text-[1.02rem] font-semibold text-white">
        {props.value}
      </p>
      <p className="text-[0.75rem] text-slate-100/85">{props.sub}</p>
    </div>
  );
}

function BookingStepsBar({ step }: { step: BookingStep }) {
  const steps = [
    { id: 1, label: "Reason" },
    { id: 2, label: "Doctor & time" },
    { id: 3, label: "Your details" },
  ];

  return (
    <div className="mt-3 flex items-center gap-3 text-[0.75rem]">
      {steps.map((s, index) => {
        const isActive = step === s.id;
        const isDone = step > s.id;
        return (
          <div key={s.id} className="flex flex-1 items-center gap-2">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full border text-[0.7rem] ${
                isActive
                  ? "border-sky-600 bg-sky-600 text-white"
                  : isDone
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-slate-50 text-slate-400"
              }`}
            >
              {isDone ? "✓" : s.id}
            </div>
            <span
              className={
                isActive
                  ? "font-semibold text-sky-700"
                  : isDone
                  ? "text-slate-700"
                  : "text-slate-400"
              }
            >
              {s.label}
            </span>
            {index < steps.length - 1 && (
              <div className="h-px flex-1 bg-gradient-to-r from-slate-200 via-slate-200 to-slate-100" />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ContactChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 ${
        active
          ? "border-sky-600 bg-sky-600 text-white shadow-sm"
          : "border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50"
      }`}
    >
      {label}
    </button>
  );
}

/* ---------- Services UI ---------- */

function ServiceFilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-[0.78rem] font-medium transition ${
        active
          ? "bg-sky-600 text-white shadow-[0_14px_40px_rgba(37,99,235,0.45)]"
          : "bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-sky-700"
      }`}
    >
      {label}
    </button>
  );
}

function ServiceCard({ service }: { service: ClinicService }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white/95 p-4 text-[0.82rem] text-slate-900 shadow-[0_22px_70px_rgba(15,23,42,0.14)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50 text-base">
            {service.icon}
          </div>
          <h3 className="text-[0.95rem] font-semibold text-slate-900">
            {service.name}
          </h3>
        </div>
        {service.badge && (
          <span
            className={`rounded-full border px-2 py-0.5 text-[0.7rem] font-semibold ${
              service.badge === "Popular" &&
              "border-emerald-400/60 bg-emerald-50 text-emerald-700"
            } ${
              service.badge === "New" &&
              "border-sky-400/60 bg-sky-50 text-sky-700"
            } ${
              service.badge === "Kids" &&
              "border-orange-400/60 bg-orange-50 text-orange-700"
            }`}
          >
            {service.badge}
          </span>
        )}
      </div>

      <p className="mt-2 text-[0.82rem] text-slate-600">
        {service.short}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-[0.75rem] text-slate-700">
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1">
          <span className="text-xs">⏱</span>
          {service.duration}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1">
          <span className="text-xs">💳</span>
          {service.price}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between text-[0.78rem]">
        <button
          type="button"
          className="rounded-full bg-slate-900 px-3 py-1.5 font-semibold text-slate-50 transition hover:bg-slate-800"
        >
          Book this visit
        </button>
        <button
          type="button"
          className="text-sky-700 hover:text-sky-600"
        >
          More details
        </button>
      </div>
    </article>
  );
}