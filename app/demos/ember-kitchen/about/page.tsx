// ============================================================
// 📁 PATH: app/demos/ember-kitchen/about/page.tsx
// ============================================================

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import EmberNavbar from "@/EmberComponents/EmberKitchen/EmberNavbar";
import EmberFooter from "@/EmberComponents/EmberKitchen/EmberFooter";

export default function AboutPage(): React.ReactElement {
  return (
    <main className="relative bg-[#0d0d0d]">
      <EmberNavbar />
      <AboutHero />
      <OurStory />
      <Philosophy />
      <TheTeam />
      <Awards />
      <VisitCTA />
      <EmberFooter />
    </main>
  );
}

function AboutHero(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative h-[50vh] min-h-[400px] overflow-hidden bg-[#1a1714]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/60 via-transparent to-[#0d0d0d]" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.span className="text-[#d4a574] text-xl" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>✦</motion.span>
        <motion.p className="font-body text-xs tracking-[0.4em] uppercase text-[#d4a574] mt-4 mb-4" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>Est. 2020</motion.p>
        <motion.h1 className="font-display text-5xl md:text-7xl text-[#f5f0e8]" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>Our Story</motion.h1>
        <motion.div className="flex items-center gap-4 mt-6" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}>
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4a574]" />
          <span className="font-elegant text-lg text-[#d4a574] italic">A journey through fire</span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4a574]" />
        </motion.div>
      </div>
    </section>
  );
}

function OurStory(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div className="relative" initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <div className="relative aspect-[3/4] bg-[#1a1714] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#d4a574]/20 to-transparent" />
              <div className="absolute inset-4 border border-[#d4a574]/30" />
              <div className="absolute inset-0 flex items-center justify-center"><span className="text-[#d4a574]/10 text-[150px]">🔥</span></div>
            </div>
            <motion.div className="absolute -bottom-8 -right-8 bg-[#0d0d0d] p-8 max-w-xs border-l-2 border-[#d4a574]" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }}>
              <p className="font-elegant text-lg text-[#f5f0e8] italic">"Every flame tells a story. Ours began with a passion for transforming the ordinary into the extraordinary."</p>
              <p className="font-body text-xs tracking-wider text-[#d4a574] mt-4 uppercase">— Chef Marcus Chen</p>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="lg:pl-8">
            <span className="text-[#d4a574] text-lg">✦</span>
            <h2 className="font-display text-4xl md:text-5xl text-[#f5f0e8] mt-4 mb-6">Where It All Began</h2>
            <div className="space-y-6 font-elegant text-lg text-[#f5f0e8]/70 leading-relaxed">
              <p>Ember Kitchen was born from a simple yet profound belief: that fire is the oldest and most honest form of cooking. In 2020, amidst a world that seemed to be standing still, Chef Marcus Chen dared to ignite something new.</p>
              <p>Having spent two decades mastering his craft in Michelin-starred kitchens across Paris, Tokyo, and New York, Marcus returned to his roots—the primal element that first inspired him to cook: fire.</p>
            </div>
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-[#d4a574]/20">
              {[{ number: "2020", label: "Founded" }, { number: "2", label: "Michelin Stars" }, { number: "50K+", label: "Guests Served" }].map((stat, index) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}>
                  <span className="font-display text-3xl text-[#d4a574]">{stat.number}</span>
                  <p className="font-body text-xs tracking-wider text-[#f5f0e8]/40 mt-1 uppercase">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Philosophy(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const pillars = [
    { icon: "🔥", title: "Fire", description: "The heart of everything we do." },
    { icon: "🌱", title: "Provenance", description: "We know every farmer and forager." },
    { icon: "✨", title: "Craft", description: "Every dish is a labor of love." },
    { icon: "🤝", title: "Warmth", description: "You're family here." },
  ];

  return (
    <section ref={ref} className="relative py-32 px-6 bg-[#1a1714]">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-12 bg-[#d4a574]/50" />
            <span className="text-[#d4a574] text-xs tracking-[0.4em] uppercase">Our Beliefs</span>
            <span className="h-px w-12 bg-[#d4a574]/50" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-[#f5f0e8]">The Four Pillars</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div key={pillar.title} className="text-center p-8 border border-[#d4a574]/10 hover:border-[#d4a574]/30 transition-colors duration-500" initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}>
              <span className="text-4xl">{pillar.icon}</span>
              <h3 className="font-display text-2xl text-[#f5f0e8] mt-6 mb-4">{pillar.title}</h3>
              <p className="font-elegant text-[#f5f0e8]/50">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TheTeam(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const team = [
    { name: "Marcus Chen", role: "Executive Chef", bio: "Two decades of Michelin experience" },
    { name: "Sofia Rodriguez", role: "Pastry Chef", bio: "Award-winning pastry artist" },
    { name: "James Wright", role: "Head Sommelier", bio: "Master Sommelier" },
    { name: "Aiko Tanaka", role: "Sous Chef", bio: "Japanese precision and artistry" },
  ];

  return (
    <section ref={ref} className="relative py-32 px-6 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <span className="text-[#d4a574] text-lg">✦</span>
          <h2 className="font-display text-4xl md:text-5xl text-[#f5f0e8] mt-4">The Artisans</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div key={member.name} className="group" initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}>
              <div className="relative aspect-[3/4] bg-[#1a1714] overflow-hidden mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4a574]/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center"><span className="text-[#d4a574]/10 text-8xl">👤</span></div>
                <div className="absolute inset-4 border border-[#d4a574]/0 group-hover:border-[#d4a574]/50 transition-all duration-500" />
              </div>
              <h3 className="font-display text-xl text-[#f5f0e8] group-hover:text-[#d4a574] transition-colors">{member.name}</h3>
              <p className="font-body text-xs tracking-wider text-[#d4a574] uppercase mt-1">{member.role}</p>
              <p className="font-elegant text-sm text-[#f5f0e8]/50 mt-3">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Awards(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const awards = [
    { icon: "★★", title: "2 Michelin Stars", year: "2024" },
    { icon: "◆", title: "James Beard Nominee", year: "2023" },
    { icon: "🏆", title: "Best Fine Dining", year: "2023" },
    { icon: "✦", title: "Chef of the Year", year: "2022" },
  ];

  return (
    <section ref={ref} className="py-24 px-6 bg-[#1a1714]">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <h2 className="font-display text-4xl text-[#f5f0e8]">Awards & Recognition</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {awards.map((award, index) => (
            <motion.div key={award.title} className="text-center p-6 border border-[#d4a574]/10 hover:border-[#d4a574]/40 transition-all" initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}>
              <span className="text-2xl text-[#d4a574]">{award.icon}</span>
              <h3 className="font-display text-sm text-[#f5f0e8] mt-4 mb-1">{award.title}</h3>
              <p className="font-body text-xs text-[#f5f0e8]/40">{award.year}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisitCTA(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 px-6 bg-[#0d0d0d]">
      <motion.div className="relative max-w-4xl mx-auto text-center" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
        <span className="text-[#d4a574] text-2xl">✦</span>
        <h2 className="font-display text-4xl md:text-5xl text-[#f5f0e8] mt-6 mb-6">Experience the Warmth</h2>
        <p className="font-elegant text-xl text-[#f5f0e8]/60 mb-10 max-w-lg mx-auto">Join us for an evening of exceptional cuisine and warm hospitality</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/demos/ember-kitchen/reservations"><motion.button className="btn-gold min-w-[200px]" whileHover={{ scale: 1.02 }}><span>Reserve a Table</span></motion.button></Link>
          <Link href="/demos/ember-kitchen/contact"><motion.button className="btn-outline-gold min-w-[200px]" whileHover={{ scale: 1.02 }}><span>Get Directions</span></motion.button></Link>
        </div>
      </motion.div>
    </section>
  );
}