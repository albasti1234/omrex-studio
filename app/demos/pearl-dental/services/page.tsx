"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PearlNav from "../_components/PearlNav";
import PearlFooter from "../_components/PearlFooter";
import PearlPageHeader from "../_components/PearlPageHeader";
import PearlIcon, { PearlIconName } from "../_components/PearlIcon";

const SERVICES = [
  {
    title: "Cosmetic Design",
    description: "Veneers, whitening, and full smile makeovers designed with facial aesthetics logic.",
    icon: "cosmetic",
    features: ["Digital Smile Design", "Porcelain Veneers", "Boutique Whitening"],
    link: "/demos/pearl-dental/treatments",
    grad: "from-purple-500/10 to-blue-500/10"
  },
  {
    title: "Restorative Care",
    description: "Rebuilding strength and function with materials that mimic natural enamel.",
    icon: "implants",
    features: ["Implants", "Ceramic Crowns", "Composite Bonding"],
    link: "/demos/pearl-dental/treatments",
    grad: "from-emerald-500/10 to-teal-500/10"
  },
  {
    title: "Orthodontics",
    description: "Aligning your smile discreetly with modern clear aligner technology.",
    icon: "aligners",
    features: ["Clear Aligners", "Retainers", "Bite Correction"],
    link: "/demos/pearl-dental/treatments",
    grad: "from-blue-500/10 to-cyan-500/10"
  },
  {
    title: "Preventive Wellness",
    description: "The foundation of health. Gentle cleanings and comprehensive screening.",
    icon: "prevention",
    features: ["Guided Biofilm Therapy", "Oral Cancer Screening", "3D Scanning"],
    link: "/demos/pearl-dental/technology",
    grad: "from-orange-500/10 to-amber-500/10"
  }
];

export default function ServicesPage() {
  return (
    <>
      <PearlNav />
      <main className="min-h-screen bg-pd-bg pb-24">
        <PearlPageHeader
          kicker="Clinical Excellence"
          title="Our Services"
          subtitle="A comprehensive suite of dental treatments delivered with hospitality-first service and surgical precision."
        />

        <section className="pd-container -mt-10 relative z-20">
          <div className="grid gap-6 md:grid-cols-2">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative bg-white rounded-[2rem] p-8 sm:p-12 shadow-pd-md hover:shadow-pd-lg border border-white/40 transition-all duration-500 overflow-hidden"
              >
                {/* Decoration */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-radial ${service.grad} blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-pd-bg flex items-center justify-center text-pd-primary mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm border border-pd-border">
                    <PearlIcon name={service.icon as PearlIconName} className="w-7 h-7" />
                  </div>

                  <h3 className="text-2xl font-bold text-pd-text-main mb-4">{service.title}</h3>
                  <p className="text-pd-text-muted leading-relaxed mb-8 text-lg font-light">
                    {service.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {service.features.map(feature => (
                      <div key={feature} className="flex items-center gap-3 text-sm font-medium text-pd-text-main/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-pd-primary/40" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Link
                    href={service.link}
                    className="inline-flex items-center gap-2 text-pd-primary font-semibold group-hover:translate-x-1 transition-transform"
                  >
                    View Details <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Visual Break */}
        <section className="pd-container mt-24">
          <div className="relative rounded-[2.5rem] overflow-hidden aspect-[21/9] shadow-pd-lg">
            <Image
              src="/images/pearl-dental/hero-main.png"
              alt="Clinic Interior"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl max-w-lg shadow-2xl">
                <h2 className="text-2xl font-semibold mb-4 text-pd-text-main">Not sure what you need?</h2>
                <p className="text-pd-text-muted mb-6">Our new patient examination is designed to give you clarity, not sales pressure.</p>
                <Link href="/demos/pearl-dental/booking" className="pd-btn pd-btn-primary w-full">Book First Visit</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <PearlFooter />
    </>
  );
}
