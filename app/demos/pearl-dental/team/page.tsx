"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PearlNav from "../_components/PearlNav";
import PearlFooter from "../_components/PearlFooter";
import PearlPageHeader from "../_components/PearlPageHeader";

const DOCTORS = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Cosmetic Director",
    bio: "Specializing in minimal-prep veneers and complete smile transformations.",
    img: "/images/pearl-dental/doctor-1.jpg" // Placeholder path, will fail if not exists, but layout handles it
  },
  {
    name: "Dr. Ahmed Hassan",
    role: "Implant Surgeon",
    bio: "Fellow of the International Congress of Oral Implantologists.",
    img: "/images/pearl-dental/doctor-2.jpg"
  },
  {
    name: "Dr. Lina Rahman",
    role: "lead Orthodontist",
    bio: "Expert in Invisalign clear aligner therapy for adults and teens.",
    img: "/images/pearl-dental/doctor-3.jpg"
  }
];

export default function TeamPage() {
  return (
    <>
      <PearlNav />
      <main className="min-h-screen bg-pd-bg pb-24">
        <PearlPageHeader
          kicker="The Talent"
          title="Clinical Team"
          subtitle="Our doctors are leaders in their field, combining decades of experience with a passion for artistic dentistry."
        />

        <div className="pd-container mt-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DOCTORS.map((doc, i) => (
              <motion.div
                key={doc.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative h-[500px] rounded-[2rem] overflow-hidden bg-pd-surface shadow-pd-md hover:shadow-pd-lg transition-all duration-500"
              >
                {/* Visual Placeholder (since we might not have real headshots yet) */}
                <div className="absolute inset-0 bg-gradient-to-br from-pd-text-main to-pd-primary opacity-10 group-hover:opacity-15 transition-opacity" />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="text-xs font-bold uppercase tracking-widest text-pd-accent mb-2 opacity-80">{doc.role}</div>
                  <h3 className="text-3xl font-semibold mb-3">{doc.name}</h3>
                  <p className="text-white/80 leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {doc.bio}
                  </p>
                  <Link href="/demos/pearl-dental/booking" className="inline-block border border-white/30 px-6 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-pd-primary transition-colors opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    Book Consultation
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 p-12 rounded-[3rem] bg-pd-text-main text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto text-white">
              <h2 className="text-3xl font-semibold mb-6">Join the Pearl team.</h2>
              <p className="text-white/70 mb-8">We are always looking for exceptional hygienists and assistants to join our growing studio.</p>
              <Link href="/demos/pearl-dental/contact" className="pd-btn bg-white text-pd-text-main hover:bg-pd-accent">View Careers</Link>
            </div>
            {/* Abstract Lines */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pd-accent via-transparent to-transparent" />
          </div>
        </div>
      </main>
      <PearlFooter />
    </>
  );
}
