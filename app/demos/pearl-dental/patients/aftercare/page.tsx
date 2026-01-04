"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PearlNav from "../../_components/PearlNav";
import PearlFooter from "../../_components/PearlFooter";
import PearlPageHeader from "../../_components/PearlPageHeader";

export default function AftercarePage() {
  return (
    <>
      <PearlNav />
      <main className="min-h-screen bg-pd-bg pb-24">
        <PearlPageHeader
          kicker="Recovery"
          title="Post-Op Instructions"
          subtitle="Proper home care is just as important as the procedure itself. Follow these guides for a smooth recovery."
        />

        <div className="pd-container mt-16 max-w-3xl space-y-8">
          {[
            { title: "Extraction / Implants", content: "Bite on gauze for 30 mins. Do not rinse, stick, or use a straw for 24 hours. Minimal exercise for 2-3 days." },
            { title: "Deep Cleaning", content: "Sensitivity is normal. Avoid very hot or cold foods. Floss gently. Rinse with warm salt water after meals." },
            { title: "Composite Bonding", content: "Avoid staining foods (coffee, wine, berries) for 48 hours as the material cures fully. Do not bite fingernails." },
            { title: "Whitening", content: "Your teeth pores are open. Avoid 'The White Shirt Rule' - anything that would stain a white shirt will stain your teeth for 24h." },
          ].map((item, i) => (
            <div key={i} className="pd-card p-8">
              <h3 className="text-xl font-bold text-pd-text-main mb-3">{item.title}</h3>
              <p className="text-pd-text-muted leading-relaxed">{item.content}</p>
            </div>
          ))}

          <div className="p-8 bg-pd-primary/5 rounded-2xl border border-pd-primary/10 text-center mt-12">
            <p className="text-pd-text-main font-medium mb-4">Still have concerns?</p>
            <Link href="/demos/pearl-dental/contact" className="text-pd-primary font-bold hover:underline">Message the clinical team &rarr;</Link>
          </div>
        </div>
      </main>
      <PearlFooter />
    </>
  );
}
