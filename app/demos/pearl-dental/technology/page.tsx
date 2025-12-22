"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PearlNav from "../_components/PearlNav";
import PearlFooter from "../_components/PearlFooter";
import PearlPageHeader from "../_components/PearlPageHeader";
import PearlIcon from "../_components/PearlIcon";

export default function TechnologyPage() {
  return (
    <>
      <PearlNav />
      <main className="min-h-screen bg-pd-bg pb-24">
        <PearlPageHeader
          kicker="Modern Workflow"
          title="Digital Dentistry"
          subtitle="We invest in technology that improves clinical outcomes and patient comfort. No gimmicks, just better care."
        />

        <div className="pd-container space-y-24 mt-16">

          {/* Feature 1: Scanners */}
          <section className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square lg:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-pd-lg border-2 border-white bg-white"
            >
              <Image
                src="/images/pearl-dental/feature-tech.png"
                alt="3D Scanning Technology"
                fill
                className="object-cover"
              />
            </motion.div>
            <div className="space-y-6">
              <span className="pd-kicker">Impression Free</span>
              <h2 className="pd-heading-2">3D Intraoral Scanning.</h2>
              <p className="pd-lead">
                Say goodbye to gooey impression materials. Our 3D scanners capture thousands of images per second to build a precise digital model of your teeth in minutes.
              </p>
              <ul className="space-y-4">
                {["Instant digital visualization", "Higher accuracy for crowns & aligners", "Zero gag reflex"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-pd-text-main font-medium">
                    <div className="w-6 h-6 rounded-full bg-pd-primary/10 flex items-center justify-center text-pd-primary">
                      <PearlIcon name="star" className="w-3 h-3" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Feature 2: CBCT (Reversed) */}
          <section className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <span className="pd-kicker">Diagnostic Clarity</span>
              <h2 className="pd-heading-2">Low-Dose CBCT.</h2>
              <p className="pd-lead">
                Standard X-rays only tell half the story. Our 3D Cone Beam Computed Tomography allows us to see nerves, bone structure, and airways with sub-millimeter precision.
              </p>
              <p className="text-pd-text-muted">
                Essential for safe implant placement and complex root canal treatments. We can plan your entire surgery virtually before we ever begin.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square lg:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-pd-lg border-2 border-white order-1 lg:order-2 bg-pd-surface"
            >
              {/* Fallback visual if no specific image yet */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pd-text-main to-pd-primary flex items-center justify-center">
                <PearlIcon name="shield" className="w-32 h-32 text-white/20" />
                <div className="absolute bottom-8 left-8 right-8 text-white text-center opacity-60 text-sm tracking-widest uppercase">
                  Volumetric Imaging Visualization
                </div>
              </div>
            </motion.div>
          </section>

          {/* Feature 3: Laser */}
          <section className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square lg:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-pd-lg border-2 border-white bg-white"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />
                <PearlIcon name="whitening" className="w-24 h-24 text-pd-primary/40 relative z-10" />
              </div>
            </motion.div>
            <div className="space-y-6">
              <span className="pd-kicker">Soft Tissue</span>
              <h2 className="pd-heading-2">Precision Laser.</h2>
              <p className="pd-lead">
                For gum contouring and deep cleaning, lasers offer a sterile, silent, and largely painless alternative to traditional tools. Healing times are significantly faster.
              </p>
              <div className="pd-glass p-6">
                <p className="italic text-pd-text-muted">"I didn't even need numbing for my gum treatment. It was incredible." — Sarah J.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <PearlFooter />
    </>
  );
}
