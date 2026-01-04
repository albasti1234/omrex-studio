"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PearlNav from "../_components/PearlNav";
import PearlFooter from "../_components/PearlFooter";
import PearlPageHeader from "../_components/PearlPageHeader";
import PearlIcon from "../_components/PearlIcon";

const PARTNERS = [
  "Delta Dental", "Cigna", "Aetna", "MetLife", "BlueCross BlueShield", "UnitedHealthcare", "Guardian", "Humana"
];

export default function InsurancePage() {
  return (
    <>
      <PearlNav />
      <main className="min-h-screen bg-pd-bg pb-24">
        <PearlPageHeader
          kicker="Financial Clarity"
          title="Insurance & Billing"
          subtitle="We believe premium care should be accessible. Our heavy lifting with insurance providers ensures you get the maximum value from your plan."
        />

        <div className="pd-container mt-16">
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-pd-text-main text-white rounded-[2.5rem] p-10 lg:p-14 shadow-pd-lg relative overflow-hidden"
            >
              <div className="relative z-10">
                <h2 className="text-3xl font-semibold mb-6">We accept most PPO plans.</h2>
                <p className="text-white/70 mb-8 leading-relaxed text-lg">
                  Our dedicated treatment coordinators will perform a complimentary benefits check before your first visit, so you know exactly what is covered.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {PARTNERS.map(p => (
                    <div key={p} className="flex items-center gap-2 text-sm font-medium opacity-80">
                      <div className="w-1.5 h-1.5 rounded-full bg-pd-accent" />
                      {p}
                    </div>
                  ))}
                </div>
              </div>
              {/* Shine effect */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-pd-accent/20 blur-[80px]" />
            </motion.div>

            <div className="space-y-8 flex flex-col justify-center">
              <div className="pd-card p-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-pd-primary/10 flex items-center justify-center text-pd-primary shrink-0">
                    <PearlIcon name="calendar" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-pd-text-main mb-2">Benefit Renewal Checking</h3>
                    <p className="text-pd-text-muted">We track your annual maximums and renewal dates to help you prioritize treatments at the right time.</p>
                  </div>
                </div>
              </div>

              <div className="pd-card p-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-pd-primary/10 flex items-center justify-center text-pd-primary shrink-0">
                    <PearlIcon name="shield" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-pd-text-main mb-2">No-Surprise Financing</h3>
                    <p className="text-pd-text-muted">For cosmetic treatments not covered by insurance, we offer 0% interest financing options via CareCredit and LendingClub.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-6">Need us to verify your plan?</h3>
            <Link href="/demos/pearl-dental/booking" className="pd-btn pd-btn-primary">
              Book & Verify
            </Link>
          </div>
        </div>
      </main>
      <PearlFooter />
    </>
  );
}
