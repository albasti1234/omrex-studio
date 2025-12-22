"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PearlNav from "../_components/PearlNav";
import PearlFooter from "../_components/PearlFooter";
import PearlPageHeader from "../_components/PearlPageHeader";

const PRICING = [
  { item: "New Patient Comprehensive Exam", cost: "$150" },
  { item: "Periodic Exam", cost: "$75" },
  { item: "Adult Prophylaxis (Cleaning)", cost: "$110" },
  { item: "Bitewing X-Rays (4)", cost: "$85" },
  { item: "Full Mouth Series (X-Rays)", cost: "$175" },
  { item: "Panoramic X-Ray", cost: "$140" },
  { item: "Periapical X-Ray", cost: "$40" },
  { item: "Fluoride Varnish", cost: "$45" },
  { item: "Composite Filling (1 Surface)", cost: "$200 - $300" },
  { item: "Composite Filling (2 Surfaces)", cost: "$300 - $400" },
  { item: "Porcelain Crown", cost: "$1,600 - $2,000" },
  { item: "Root Canal (Anterior)", cost: "$1,100 - $1,300" },
  { item: "Root Canal (Molar)", cost: "$1,400 - $1,600" },
];

export default function PricingPage() {
  return (
    <>
      <PearlNav />
      <main className="min-h-screen bg-pd-bg pb-24">
        <PearlPageHeader
          kicker="Fee Schedule"
          title="Self-Pay Pricing"
          subtitle="Honest, up-front pricing for patients without insurance. No hidden facility fees."
        />

        <div className="pd-container mt-16 max-w-3xl">
          <div className="bg-white rounded-[2rem] overflow-hidden shadow-pd-lg border border-pd-border">
            <table className="w-full text-left">
              <thead className="bg-pd-surface border-b border-pd-border">
                <tr>
                  <th className="p-6 font-bold text-pd-text-muted uppercase text-xs tracking-wider">Procedure</th>
                  <th className="p-6 font-bold text-pd-text-muted uppercase text-xs tracking-wider text-right">Est. Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pd-border">
                {PRICING.map((p, i) => (
                  <tr key={p.item} className="hover:bg-pd-bg/50 transition-colors">
                    <td className="p-6 font-medium text-pd-text-main">{p.item}</td>
                    <td className="p-6 font-bold text-pd-primary text-right">{p.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-pd-text-muted text-sm mb-4">Prices subject to change based on clinical indication.</p>
            <Link href="/demos/pearl-dental/insurance" className="pd-btn pd-btn-secondary">Check Insurance Coverage</Link>
          </div>
        </div>
      </main>
      <PearlFooter />
    </>
  );
}
