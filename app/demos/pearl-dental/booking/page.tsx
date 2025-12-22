"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PearlNav from "../_components/PearlNav";
import PearlFooter from "../_components/PearlFooter";
import PearlPageHeader from "../_components/PearlPageHeader";

const REASONS = [
  { title: "New Patient Exam", time: "60 mins", fee: "$150 (or Insurance)" },
  { title: "Emergency Visit", time: "30 mins", fee: "$100 + Treatment" },
  { title: "Cosmetic Consult", time: "45 mins", fee: "Complimentary" },
  { title: "Hygiene / Cleaning", time: "60 mins", fee: "Insurance Based" },
];

export default function BookingPage() {
  return (
    <>
      <PearlNav />
      <main className="min-h-screen bg-pd-bg pb-24">
        <PearlPageHeader
          kicker="Scheduling"
          title="Reserve Your Visit"
          subtitle="Select a convenient time for your appointment. We respect your schedule and run strictly on time."
        />

        <div className="pd-container mt-16 max-w-4xl">
          <div className="bg-white rounded-[2rem] overflow-hidden shadow-pd-lg border border-pd-border flex flex-col md:flex-row">
            {/* Left: Options */}
            <div className="p-8 md:p-12 md:w-1/2 bg-pd-surface border-r border-pd-border">
              <h3 className="text-xl font-bold mb-6 text-pd-text-main">Appointment Type</h3>
              <div className="space-y-4">
                {REASONS.map(r => (
                  <label key={r.title} className="flex items-center gap-4 p-4 border border-pd-border rounded-xl cursor-pointer hover:border-pd-primary transition-colors bg-white">
                    <input type="radio" name="booking-type" className="w-5 h-5 accent-pd-primary" />
                    <div>
                      <div className="font-bold text-pd-text-main">{r.title}</div>
                      <div className="text-xs text-pd-text-muted">{r.time} • {r.fee}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Right: Calendar Placeholder */}
            <div className="p-8 md:p-12 md:w-1/2 flex flex-col items-center justify-center text-center bg-white">
              <div className="w-16 h-16 rounded-full bg-pd-primary/10 flex items-center justify-center text-2xl mb-4">📅</div>
              <h3 className="text-xl font-bold mb-2">Live Availability</h3>
              <p className="text-pd-text-muted mb-6 text-sm">Our real-time calendar is loading...</p>
              <button className="pd-btn pd-btn-primary w-full">Find Next Slot</button>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-pd-text-muted">
            Prefer to speak to a human? Call us at <a href="tel:3105550123" className="text-pd-primary font-bold outline-none hover:underline">310.555.0123</a>
          </div>
        </div>
      </main>
      <PearlFooter />
    </>
  );
}
