"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PearlNav from "../_components/PearlNav";
import PearlFooter from "../_components/PearlFooter";
import PearlPageHeader from "../_components/PearlPageHeader";
import PearlIcon, { PearlIconName } from "../_components/PearlIcon";

const CATEGORIES = [
  {
    title: "General Dentistry",
    items: [
      { name: "Comprehensive Exams", price: "Insurance / $150", link: "/booking" },
      { name: "Guided Biofilm Hygiene", price: "Insurance / $200", link: "/booking" },
      { name: "White Fillings", price: "From $250", link: "/booking" },
      { name: "Root Canal Therapy", price: "Consultation Req.", link: "/booking" },
    ]
  },
  {
    title: "Cosmetic",
    items: [
      { name: "Porcelain Veneers", price: "From $1,400 / tooth", link: "/booking" },
      { name: "Pro Whitening", price: "$450", link: "/booking" },
      { name: "Composite Bonding", price: "From $400", link: "/booking" },
      { name: "Invisalign", price: "$4,500 - $6,500", link: "/booking" },
    ]
  },
  {
    title: "Surgical",
    items: [
      { name: "Titanium Implants", price: "From $2,200", link: "/booking" },
      { name: "Wisdom Teeth", price: "Insurance / Consult", link: "/booking" },
      { name: "Gum Grafting", price: "Consultation Req.", link: "/booking" },
    ]
  }
];

export default function TreatmentsPage() {
  return (
    <>
      <PearlNav />
      <main className="min-h-screen bg-pd-bg pb-24">
        <PearlPageHeader
          kicker="Menu of Care"
          title="Treatment Options"
          subtitle="Transparent options for every smile. We believe in educating you on your choices before starting any work."
        />

        <div className="pd-container mt-16 max-w-5xl">
          {CATEGORIES.map((cat, i) => (
            <div key={cat.title} className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-end gap-4 mb-8 border-b border-pd-border pb-4"
              >
                <h2 className="text-3xl font-semibold text-pd-text-main">{cat.title}</h2>
                <span className="text-sm font-medium text-pd-text-muted pb-1 mb-px">({cat.items.length} services)</span>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-4">
                {cat.items.map((item, j) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: j * 0.05, duration: 0.4 }}
                    className="pd-card p-6 flex flex-col hover:border-pd-primary/30 group cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-pd-text-main group-hover:text-pd-primary transition-colors">{item.name}</h3>
                      <PearlIcon name="arrow-right" className="w-5 h-5 text-pd-text-muted opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </div>
                    <div className="mt-auto pt-4 flex justify-between items-center text-sm font-medium">
                      <span className="text-pd-text-muted">{item.price}</span>
                      <span className="text-pd-primary uppercase tracking-wider text-xs">Book</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          {/* FAQ Teaser */}
          <div className="pd-glass p-12 text-center">
            <h3 className="text-2xl font-semibold mb-4">Have specific questions?</h3>
            <p className="text-pd-text-muted mb-8 max-w-xl mx-auto">
              Every mouth is unique. The prices listed above are estimates and can vary based on complexity.
              We always provide a detailed quote after your exam.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/demos/pearl-dental/contact" className="pd-btn pd-btn-secondary">Contact Coordinator</Link>
            </div>
          </div>
        </div>
      </main>
      <PearlFooter />
    </>
  );
}
