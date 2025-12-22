"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PearlNav from "../_components/PearlNav";
import PearlFooter from "../_components/PearlFooter";
import PearlPageHeader from "../_components/PearlPageHeader";

const CASES = [
  { id: 1, title: "Full Smile Makeover", type: "Ceramic Veneers", desc: "Correcting alignment and brightness for a camera-ready smile." },
  { id: 2, title: "Single Tooth Restoration", type: "Bonding", desc: "Seamless repair of a chipped incisor using composite layering." },
  { id: 3, title: "Invisalign Correction", type: "Orthodontics", desc: "12-month alignment treatment without metal brackets." },
];

export default function ResultsPage() {
  return (
    <>
      <PearlNav />
      <main className="min-h-screen bg-pd-bg pb-24">
        <PearlPageHeader
          kicker="Before & After"
          title="Real Results"
          subtitle="Precision dentistry is invisible. Our goal is to enhance your natural features, not overwhelm them."
        />

        <div className="pd-container mt-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CASES.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-pd-border mb-6 shadow-pd-md group-hover:shadow-pd-lg transition-all border border-white">
                  {/* Placeholder for B/A interaction */}
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-pd-text-muted">
                    <span className="text-xs uppercase tracking-widest font-bold">Case Study Image</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-pd-primary">
                    {c.type}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-pd-text-main mb-2 group-hover:text-pd-primary transition-colors">{c.title}</h3>
                <p className="text-pd-text-muted leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link href="/demos/pearl-dental/booking" className="pd-btn pd-btn-secondary">
              Schedule Your Consultation
            </Link>
          </div>
        </div>
      </main>
      <PearlFooter />
    </>
  );
}
