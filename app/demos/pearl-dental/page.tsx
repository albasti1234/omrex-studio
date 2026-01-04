"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import PearlNav from "./_components/PearlNav";
import PearlFooter from "./_components/PearlFooter";
import PearlIcon from "./_components/PearlIcon";
import PearlSectionHeader from "./_components/PearlSectionHeader";
import PearlCard from "./_components/PearlCard";

// ----------------------------------------------------------------------
// DATA
// ----------------------------------------------------------------------

const SERVICES = [
  { title: "Cosmetic Design", icon: "cosmetic" as const, desc: "Veneers, whitening, and full smile makeovers designed to match your facial aesthetics." },
  { title: "Implant Solutions", icon: "implants" as const, desc: "Permanent, natural-looking restoration for missing teeth using the highest grade materials." },
  { title: "Invisible Aligners", icon: "aligners" as const, desc: "Straighten your smile discreetly without the hassle of traditional metal braces." },
];

const FEATURES = [
  { title: "Anxiety-Free", desc: "Nitrous oxide & oral sedation options available." },
  { title: "Private Suites", desc: "Sound-isolated rooms with entertainment systems." },
  { title: "Hospital Sterility", desc: "Exceeding CDC infection control guidelines." },
];

const REVIEWS = [
  {
    text: "I used to dread the dentist. The team at Pearl changed entirely how I view my health. It feels more like a spa visit than a medical appointment.",
    author: "Emma R.",
    role: "Cosmetic Patient"
  },
  {
    text: "The level of technology here is insane. They scanned my teeth in seconds and I could see everything in 3D. No goop, no guessing.",
    author: "David L.",
    role: "Implant Patient"
  }
];

const DOCTORS = [
  { name: "Dr. Sarah Chen", role: "Cosmetic Specialist", img: "doctor-1.jpg" },
  { name: "Dr. James Wilson", role: "Implant Surgeon", img: "doctor-2.jpg" },
  { name: "Dr. Elena Rodriguez", role: "Orthodontist", img: "doctor-3.jpg" },
];

const FAQS = [
  { q: "Do you accept my insurance?", a: "We work with most major PPO providers including Delta, Cigna, Aetna, and MetLife. We'll verify your benefits before your first visit." },
  { q: "How long does a smile makeover take?", a: "Most transformations are completed in just 2-3 visits over a couple of weeks, depending on the complexity." },
  { q: "Is sedation dentistry safe?", a: "Absolutely. Our team is board-certified in sedation administration and we monitor your vitals throughout every procedure." },
];

// ----------------------------------------------------------------------
// COMPONENT
// ----------------------------------------------------------------------

export default function PearlDentalHome() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <>
      <PearlNav />

      <main className="overflow-x-hidden bg-pd-bg">

        {/* 1. HERO SECTION */}
        <section className="relative h-[95vh] min-h-[800px] flex items-center justify-center overflow-hidden bg-pd-text-main">
          {/* Parallax Background */}
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
            <Image
              src="/images/pearl-dental/hero.jpg"
              alt="Pearl Dental Studio High-End Interior"
              fill
              priority
              className="object-cover opacity-60"
              quality={90}
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-pd-text-main via-transparent to-pd-text-main/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-pd-text-main/90 via-pd-text-main/40 to-transparent" />
          </motion.div>

          {/* Content */}
          <div className="pd-container relative z-10 w-full pt-20">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border border-pd-text-main" />
                  ))}
                </div>
                <span className="text-white/80 text-xs font-medium tracking-wide">Trusted by 2,000+ patients</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="pd-heading-1 text-white mb-6"
              >
                Artistry meets <br />
                <span className="text-pd-accent italic font-serif pr-2">medical precision.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="pd-lead text-white/70 max-w-xl mb-10"
              >
                Experience a new standard of dental care where advanced technology, concierge hospitality, and aesthetic expertise converge.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/demos/pearl-dental/booking" className="pd-btn pd-btn-primary min-w-[200px]">
                  Book Consultation
                </Link>
                <Link href="/demos/pearl-dental/services" className="pd-btn pd-btn-outline min-w-[200px]">
                  Explore Services
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. TRUST BAND */}
        <section className="py-10 border-b border-pd-border bg-white">
          <div className="pd-container flex flex-wrap justify-between items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Logos would go here, text for now */}
            {['Forbes Health', 'Vogue Living', 'ADA Member', 'Invisalign Diamond'].map((brand, i) => (
              <span key={i} className="text-xl font-serif italic font-medium">{brand}</span>
            ))}
          </div>
        </section>

        {/* 3. SERVICES */}
        <section className="py-24 sm:py-32 relative">
          <div className="pd-container">
            <PearlSectionHeader
              kicker="Curated Care"
              title={<>Comprehensive dentistry,<br />elevated.</>}
              subtitle="Everything you need for a healthy, beautiful smile under one roof."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SERVICES.map((s, i) => (
                <PearlCard key={i} index={i} title={s.title} description={s.desc} icon={s.icon} />
              ))}
            </div>
          </div>
        </section>

        {/* 4. COMFORT & SAFETY */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="pd-container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden"
              >
                <Image
                  src="/images/pearl-dental/feature-comfort.jpg"
                  alt="Comfortable dental suite"
                  fill
                  className="object-cover"
                />
              </motion.div>

              <div className="space-y-8">
                <PearlSectionHeader
                  center={false}
                  kicker="The Experience"
                  title="Dental care that feels like self-care."
                  subtitle="We've replaced the clinical feel with a calming, spa-like environment designed to put you at ease."
                />

                <div className="space-y-6">
                  {FEATURES.map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="w-12 h-12 flex-shrink-0 rounded-full bg-pd-secondary/10 flex items-center justify-center text-pd-secondary">
                        <PearlIcon name="star" className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{f.title}</div>
                        <div className="text-pd-text-muted">{f.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. TECHNOLOGY */}
        <section className="py-24 bg-pd-text-main text-white relative">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pd-primary via-pd-text-main to-pd-text-main" />

          <div className="pd-container relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <PearlSectionHeader
                  center={false}
                  light
                  kicker="Advanced Diagnostics"
                  title="See what we see."
                  subtitle="We've replaced uncomfortable trays and guess-work with hospital-grade 3D imaging. Our digital workflow means faster results, precise fittings, and zero surprises."
                />
                <div className="flex gap-4 mt-8">
                  <div className="px-6 py-4 rounded-2xl bg-white/10 backdrop-blur border border-white/10">
                    <div className="text-3xl font-bold text-pd-accent mb-1">0%</div>
                    <div className="text-sm opacity-60">Radiation with Digital Scans</div>
                  </div>
                  <div className="px-6 py-4 rounded-2xl bg-white/10 backdrop-blur border border-white/10">
                    <div className="text-3xl font-bold text-pd-accent mb-1">10x</div>
                    <div className="text-sm opacity-60">More Detail than X-Rays</div>
                  </div>
                </div>
              </div>

              <div className="relative h-[400px] w-full bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden">
                <span className="text-white/20">Interactive 3D Scan Demo Preview</span>
                {/* Placeholder for actual 3D element or video */}
              </div>
            </div>
          </div>
        </section>

        {/* 6. INSURANCE */}
        <section className="py-20 bg-pd-primary/5">
          <div className="pd-container text-center">
            <h2 className="text-2xl font-semibold mb-8">We accept most major insurance providers</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {['Delta Dental', 'MetLife', 'Cigna', 'Aetna', 'BlueCross', 'UnitedHealthcare'].map((ins) => (
                <div key={ins} className="px-6 py-3 bg-white rounded-full shadow-sm border border-pd-border text-sm font-medium text-pd-text-muted">
                  {ins}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. RESULTS PREVIEW */}
        <section className="py-24">
          <div className="pd-container">
            <PearlSectionHeader
              kicker="Gallery"
              title="Real results."
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden group cursor-pointer">
                  <Image
                    src={`/images/pearl-dental/results-${i}.jpg`}
                    alt={`Patient Result ${i}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 bg-white/90 rounded-full text-xs font-bold uppercase tracking-widest">View Case</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/demos/pearl-dental/gallery" className="pd-btn pd-btn-secondary">View Full Gallery</Link>
            </div>
          </div>
        </section>

        {/* 8. DOCTORS */}
        <section className="py-24 bg-white">
          <div className="pd-container">
            <PearlSectionHeader
              kicker="Our Team"
              title="Meet your experts."
            />
            <div className="grid md:grid-cols-3 gap-8">
              {DOCTORS.map((doc, i) => (
                <div key={i} className="group">
                  <div className="relative aspect-[3/4] mb-6 rounded-3xl overflow-hidden bg-gray-100">
                    <Image
                      src={`/images/pearl-dental/${doc.img}`}
                      alt={doc.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{doc.name}</h3>
                  <p className="text-pd-text-muted">{doc.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* 10. REVIEWS */}
        <section className="py-24 bg-pd-bg">
          <div className="pd-container max-w-4xl">
            <div className="text-center mb-12">
              <div className="flex justify-center text-pd-primary gap-1 mb-4">
                {[1, 2, 3, 4, 5].map(i => <PearlIcon key={i} name="star" className="w-6 h-6 fill-current" />)}
              </div>
              <h2 className="pd-heading-2">Rated 5.0/5.0</h2>
              <p className="text-pd-text-muted mt-2">Based on 500+ patient reviews</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {REVIEWS.map((r, i) => (
                <div key={i} className="pd-glass p-8 relative">
                  <span className="text-6xl text-pd-primary/10 absolute top-4 left-4 font-serif">"</span>
                  <p className="text-lg italic mb-6 relative z-10">{r.text}</p>
                  <div>
                    <div className="font-bold">{r.author}</div>
                    <div className="text-sm text-pd-text-muted">{r.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11. FAQ */}
        <section className="py-24 bg-white">
          <div className="pd-container max-w-3xl">
            <PearlSectionHeader title="Common questions." center />
            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <details key={i} className="group p-6 rounded-2xl bg-pd-bg open:bg-white open:shadow-pd-lg transition-all border border-transparent open:border-pd-border cursor-pointer">
                  <summary className="flex justify-between items-center list-none font-semibold text-lg">
                    {faq.q}
                    <span className="ml-4 transition-transform group-open:rotate-180">
                      <PearlIcon name="arrow-right" className="rotate-90 w-5 h-5" />
                    </span>
                  </summary>
                  <p className="text-pd-text-muted mt-4 leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 12. LOCATION */}
        <section className="py-24 relative">
          <div className="pd-container">
            <div className="pd-glass w-full max-w-sm ml-auto p-8 relative z-10">
              <h3 className="text-2xl font-semibold mb-4">Visit Us</h3>
              <div className="space-y-4 text-pd-text-muted">
                <p>123 Medical Plaza, Suite 400<br />New York, NY 10001</p>
                <p>Mon-Fri: 8am - 6pm<br />Sat: By Appointment</p>
                <p>(555) 123-4567</p>
              </div>
              <Link href="/demos/pearl-dental/contact" className="pd-btn pd-btn-outline border-pd-primary text-pd-primary mt-6 w-full hover:bg-pd-primary hover:text-white">
                Get Directions
              </Link>
            </div>
          </div>
          {/* Map Placeholder */}
          <div className="absolute inset-0 bg-gray-200 grayscale contrast-75">
            <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold tracking-widest uppercase">
              Map Placeholder
            </div>
          </div>
        </section>

        {/* 13. FINAL CTA */}
        <section className="py-32 relative overflow-hidden bg-pd-primary text-white text-center">
          <div className="absolute inset-0 bg-[url('/images/pearl-dental/hero.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay" />
          <div className="pd-container relative z-10">
            <h2 className="pd-heading-1 mb-8 text-white">Ready for your new smile?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/demos/pearl-dental/booking" className="pd-btn bg-white text-pd-primary hover:bg-pd-accent hover:text-pd-text-main shadow-xl">
                Book Online
              </Link>
              <Link href="tel:5551234567" className="pd-btn pd-btn-outline border-white text-white hover:bg-white/10">
                Call (555) 123-4567
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PearlFooter />

      {/* 14. MOBILE STICKY CTA */}
      <motion.div
        className="fixed bottom-0 inset-x-0 p-4 bg-white border-t border-pd-border z-30 sm:hidden flex justify-between items-center gap-4"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 2 }}
      >
        <div className="text-sm font-medium">
          <span className="block text-pd-muted">Next Available:</span>
          Today, 2:00 PM
        </div>
        <Link href="/demos/pearl-dental/booking" className="px-6 py-3 bg-pd-primary text-white rounded-full font-bold text-sm shadow-md">
          Book Now
        </Link>
      </motion.div>
    </>
  );
}
