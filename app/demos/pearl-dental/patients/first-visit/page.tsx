"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PearlNav from "../../_components/PearlNav";
import PearlFooter from "../../_components/PearlFooter";
import PearlPageHeader from "../../_components/PearlPageHeader";

export default function FirstVisitPage() {
  return (
    <>
      <PearlNav />
      <main className="min-h-screen bg-pd-bg pb-24">
        <PearlPageHeader
          kicker="New Patients"
          title="Your First Visit"
          subtitle="A relaxed 60-minute session dedicated to understanding your goals and establishing a baseline for your health."
        />

        <div className="pd-container mt-16 max-w-3xl">
          <div className="space-y-12">
            {[
              { step: "01", title: "Welcome & Tour", desc: "Arrive 10 minutes early to enjoy a coffee in our lounge and take a quick tour of the studio." },
              { step: "02", title: "Digital Imaging", desc: "We'll take a 3D wellness scan and high-resolution photos. No radiation heavy x-rays unless necessary." },
              { step: "03", title: "Doctor Exam", desc: "A comprehensive check of your teeth, gums, and jaw joints. You see what we see on the big screen." },
              { step: "04", title: "Hygiene", desc: "If time permits and gum health allows, we will proceed with a gentle Guided Biofilm Therapy cleaning." },
            ].map((s, i) => (
              <div key={s.step} className="flex gap-6 md:gap-12 items-start">
                <div className="text-4xl font-bold text-pd-border-strong tracking-tighter">{s.step}</div>
                <div className="pt-2">
                  <h3 className="text-2xl font-bold text-pd-text-main mb-3">{s.title}</h3>
                  <p className="text-pd-text-muted text-lg leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 pt-12 border-t border-pd-border flex justify-center">
            <Link href="/demos/pearl-dental/booking" className="pd-btn pd-btn-primary">Reserve New Patient Exam</Link>
          </div>
        </div>
      </main>
      <PearlFooter />
    </>
  );
}
