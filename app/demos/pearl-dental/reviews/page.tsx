"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PearlNav from "../_components/PearlNav";
import PearlFooter from "../_components/PearlFooter";
import PearlPageHeader from "../_components/PearlPageHeader";
import PearlIcon from "../_components/PearlIcon";

const REVIEWS = [
  { text: "I've never felt so listened to at a doctor's office. The entire team knows my name, my preferences, and exactly how to make me comfortable.", author: "James T.", type: "Implant Patient" },
  { text: "The technology here is mind-blowing. Seeing my teeth in 3D helped me understand exactly why I needed the treatment.", author: "Maria G.", type: "General Care" },
  { text: "Finally, a dentist that respects my time. Efficient, digital, and beautiful results.", author: "David L.", type: "Invisalign" },
  { text: "The office looks like a boutique hotel. It completely changes the vibe of dental work.", author: "Sarah H.", type: "Cosmetic" },
];

export default function ReviewsPage() {
  return (
    <>
      <PearlNav />
      <main className="min-h-screen bg-pd-bg pb-24">
        <PearlPageHeader
          kicker="Patient Experience"
          title="Stories & Feedback"
          subtitle="We measure our success by your comfort and confidence. Here is what our community is saying."
        />

        <div className="pd-container mt-16 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6">
            {REVIEWS.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="pd-glass p-8 sm:p-12 flex flex-col"
              >
                <div className="flex text-pd-primary mb-6">
                  {[1, 2, 3, 4, 5].map(s => <PearlIcon key={s} name="star" className="w-5 h-5" />)}
                </div>
                <p className="text-xl text-pd-text-main italic font-light leading-relaxed mb-8 flex-grow">
                  "{r.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-pd-text-main/10 flex items-center justify-center font-bold text-pd-text-main">
                    {r.author[0]}
                  </div>
                  <div>
                    <div className="font-bold text-pd-text-main">{r.author}</div>
                    <div className="text-xs uppercase tracking-wider text-pd-text-muted">{r.type}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold mb-6">Share your story.</h3>
            <Link href="https://google.com" target="_blank" className="pd-btn pd-btn-secondary">
              Write a Google Review
            </Link>
          </div>
        </div>
      </main>
      <PearlFooter />
    </>
  );
}
