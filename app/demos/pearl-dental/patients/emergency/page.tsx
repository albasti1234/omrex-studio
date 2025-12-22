"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PearlNav from "../../_components/PearlNav";
import PearlFooter from "../../_components/PearlFooter";
import PearlPageHeader from "../../_components/PearlPageHeader";
import PearlIcon from "../../_components/PearlIcon";

export default function EmergencyPage() {
  return (
    <>
      <PearlNav />
      <main className="min-h-screen bg-pd-bg pb-24">
        <PearlPageHeader
          kicker="Urgent Care"
          title="Emergency Visits"
          subtitle="Dental pain shouldn't wait. We reserve same-day appointments for urgent cases to get you out of pain fast."
        />

        <div className="pd-container mt-16 max-w-4xl">
          <div className="flex flex-col md:flex-row gap-8 bg-red-50/50 rounded-[2rem] p-8 sm:p-12 border border-red-100 mb-12">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-500 shrink-0">
              <PearlIcon name="emergency" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-pd-text-main">Need immediate help?</h2>
              <p className="text-pd-text-muted mb-6 leading-relaxed">
                We consider the following to be emergencies: knocked out teeth, severe pain preventing sleep, significant swelling, or uncontrolled bleeding.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:3105550123" className="pd-btn pd-btn-primary bg-red-500 hover:bg-red-600 border-none text-white shadow-xl shadow-red-500/20">
                  Call Emergency Line
                </a>
                <Link href="/demos/pearl-dental/booking" className="pd-btn pd-btn-secondary">Check Online Availability</Link>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="pd-card p-8">
              <h3 className="font-bold text-lg mb-2">Broken Tooth?</h3>
              <p className="text-pd-text-muted text-sm">Rinse with warm water. If you have the piece, keep it in milk or saliva. Bring it with you.</p>
            </div>
            <div className="pd-card p-8">
              <h3 className="font-bold text-lg mb-2">Knocked Out?</h3>
              <p className="text-pd-text-muted text-sm">Hold by the crown (top), not the root. Try to reinsert if possible, otherwise store in milk. Time is critical (60 mins).</p>
            </div>
          </div>
        </div>
      </main>
      <PearlFooter />
    </>
  );
}
