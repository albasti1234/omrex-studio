// ============================================================
// 📁 PATH: app/demos/ember-kitchen/page.tsx
// ============================================================

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import EmberNavbar from "@/EmberComponents/EmberKitchen/EmberNavbar";
import EmberFooter from "@/EmberComponents/EmberKitchen/EmberFooter";
// -------------------------------------------------------------
// MAIN PAGE
// -------------------------------------------------------------

export default function EmberHomePage(): React.ReactElement {
  return (
    <main className="relative bg-[#0d0d0d]">
      <EmberNavbar />
      <HeroSection />
      <PhilosophySection />
      <SignatureDishes />
      <AmbianceSection />
      <ChefSection />
      <TestimonialsSection />
      <ReservationCTA />
      <EmberFooter />
    </main>
  );
}

// -------------------------------------------------------------
// HERO SECTION
// -------------------------------------------------------------

function HeroSection(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const [embers, setEmbers] = useState<Array<{ id: number; x: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const newEmbers = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 6,
    }));
    setEmbers(newEmbers);
  }, []);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1714] via-[#0d0d0d] to-[#2a2420]" />
        <div className="absolute inset-0 bg-[url('/images/ember/hero-bg.jpg')] bg-cover bg-center opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/70 via-[#0d0d0d]/40 to-[#0d0d0d]" />
        <div className="absolute inset-0 bg-[#ff6b35]/5 mix-blend-overlay" />
      </motion.div>

      {/* Floating Embers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {embers.map((ember) => (
          <motion.div
            key={ember.id}
            className="absolute w-1 h-1 rounded-full bg-[#ff6b35]"
            style={{ left: `${ember.x}%`, bottom: "-5%" }}
            animate={{
              y: [0, -800],
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: ember.duration,
              repeat: Infinity,
              delay: ember.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        boxShadow: "inset 0 0 200px 50px rgba(13,13,13,0.8)"
      }} />

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        style={{ opacity }}
      >
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="text-[#d4a574] text-2xl">✦</span>
        </motion.div>

        <motion.p
          className="font-elegant text-sm md:text-base tracking-[0.4em] uppercase text-[#d4a574] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Fine Dining Experience
        </motion.p>

        <div className="relative mt-0">
          {/* الصورة اللي ورا كلمة EMBER */}
          <motion.div
            className="
      pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[1100px] max-w-[95vw]-translate-x-1/2 -translate-y-1/2 bg-[url('/images/ember/ember-title-bg.jpg')] bg-cover bg-center opacity-60 blur-[0.2px]"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.9 }}
          />

          {/* العنوان */}
          <motion.h1
            className="relative z-10 font-display text-6xl md:text-8xl lg:text-9xl text-[#f5f0e8] tracking-[0.05em]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            EMBER
          </motion.h1>
        </div>


        <motion.div
          className="flex items-center gap-6 mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <span className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#d4a574]" />
          <span className="font-elegant text-xl md:text-2xl tracking-[0.5em] text-[#d4a574] uppercase">
            Kitchen
          </span>
          <span className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-[#d4a574]" />
        </motion.div>

        <motion.p
          className="mt-8 font-elegant text-lg md:text-xl text-[#f5f0e8]/70 italic max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          "Where fire meets artistry"
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <Link href="/demos/ember-kitchen/reservations">
            <motion.button
              className="btn-gold min-w-[200px]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Reserve a Table</span>
            </motion.button>
          </Link>
          <Link href="/demos/ember-kitchen/menu">
            <motion.button
              className="btn-outline-gold min-w-[200px]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Explore Menu</span>
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <span className="font-body text-[9px] tracking-[0.3em] uppercase text-[#d4a574]/60">
          Scroll to Explore
        </span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-[#d4a574] to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}

// -------------------------------------------------------------
// PHILOSOPHY SECTION
// -------------------------------------------------------------

function PhilosophySection(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden bg-[#0d0d0d]">
      <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-[#d4a574]/10" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-[#d4a574]/10" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#d4a574] text-lg">✦</span>
          <p className="font-body text-xs tracking-[0.4em] uppercase text-[#d4a574] mt-4 mb-4">
            Our Philosophy
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#f5f0e8]">
            The Art of Fire
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#1a1714]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#d4a574]/20 to-transparent" />
              <div className="absolute inset-4 border border-[#d4a574]/30 pointer-events-none" />
              <div className="absolute inset-0">
                <Image
                  src="/images/ember/art-of-fire.jpg"
                  alt="Open fire cuisine texture"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>

            </div>
            <motion.div
              className="absolute -bottom-8 -right-8 bg-[#1a1714] border border-[#d4a574]/30 px-8 py-6 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <span className="font-display text-4xl text-[#d4a574]">15+</span>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-[#f5f0e8]/60 mt-1">
                Years of Excellence
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="font-elegant text-2xl md:text-3xl text-[#f5f0e8]/90 leading-relaxed mb-8">
              At Ember, we believe that fire is not just a cooking method—it's
              a philosophy. Every flame tells a story, every dish is a journey.
            </p>

            <p className="font-body text-sm text-[#f5f0e8]/50 leading-relaxed mb-8">
              Our kitchen is built around the primal element that has brought
              humanity together since the beginning of time. We source the finest
              ingredients from local farms and international purveyors.
            </p>

            <div className="grid grid-cols-2 gap-8 mt-12">
              {[
                { number: "01", title: "Farm to Flame", desc: "Locally sourced" },
                { number: "02", title: "Open Fire", desc: "Traditional methods" },
                { number: "03", title: "Seasonal Menu", desc: "Fresh ingredients" },
                { number: "04", title: "Craft Cocktails", desc: "Fire-inspired" },
              ].map((item, index) => (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <span className="font-display text-3xl text-[#d4a574]/30">{item.number}</span>
                  <h4 className="font-display text-lg text-[#f5f0e8] mt-2">{item.title}</h4>
                  <p className="font-body text-xs text-[#f5f0e8]/40 mt-1">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// SIGNATURE DISHES
// -------------------------------------------------------------

const SIGNATURE_DISHES = [
  { id: 1, name: "Ember-Kissed Wagyu", description: "A5 Japanese Wagyu, bone marrow butter", price: "$165", tag: "Signature" },
  { id: 2, name: "Fire-Roasted Lobster", description: "Maine lobster, smoked paprika butter", price: "$89", tag: "Ocean" },
  { id: 3, name: "Smoked Duck Breast", description: "Cherry wood smoked, wild berry reduction", price: "$72", tag: "Land" },
  { id: 4, name: "Charred Octopus", description: "Spanish octopus, crispy potatoes, romesco", price: "$58", tag: "Ocean" },
];

function SignatureDishes(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 px-6 bg-[#1a1714]">
      <motion.div
        className="text-center mb-20 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="h-px w-12 bg-[#d4a574]/50" />
          <span className="text-[#d4a574] text-xs tracking-[0.4em] uppercase">Culinary Art</span>
          <span className="h-px w-12 bg-[#d4a574]/50" />
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#f5f0e8]">
          Signature Creations
        </h2>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {SIGNATURE_DISHES.map((dish, index) => (
            <motion.article
              key={dish.id}
              className="group relative bg-[#0d0d0d] border border-[#d4a574]/10 p-8 hover:border-[#d4a574]/30 transition-all duration-500"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <span className="absolute top-4 right-4 bg-[#d4a574] px-3 py-1 text-[9px] font-body tracking-[0.2em] uppercase text-[#0d0d0d]">
                {dish.tag}
              </span>

              <div className="flex items-end justify-between mt-8">
                <div>
                  <h3 className="font-display text-2xl text-[#f5f0e8] group-hover:text-[#d4a574] transition-colors">
                    {dish.name}
                  </h3>
                  <p className="font-elegant text-sm text-[#f5f0e8]/60 mt-2">
                    {dish.description}
                  </p>
                </div>
                <span className="font-display text-2xl text-[#d4a574]">{dish.price}</span>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link href="/demos/ember-kitchen/menu">
            <motion.button
              className="btn-outline-gold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Explore Full Menu</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// AMBIANCE SECTION
// -------------------------------------------------------------
const AMBIANCE_SPACES = [
  { title: "Main Dining", img: "/images/ember/spaces/main-dining.jpg" },
  { title: "Fire Bar", img: "/images/ember/spaces/fire-bar.jpg" },
  { title: "Private Room", img: "/images/ember/spaces/private-room.jpg" },
  { title: "Open Kitchen", img: "/images/ember/spaces/open-kitchen.jpg" },
  { title: "Terrace", img: "/images/ember/spaces/terrace.jpg" },
];

function AmbianceSection(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-[#0d0d0d]">
      <motion.div
        className="text-center mb-16 px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="text-[#d4a574] text-lg">✦</span>
        <p className="font-body text-xs tracking-[0.4em] uppercase text-[#d4a574] mt-4 mb-4">
          The Space
        </p>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#f5f0e8]">
          An Atmosphere of Warmth
        </h2>
      </motion.div>

      <div className="flex gap-6 px-6 overflow-x-auto hide-scrollbar">
        {AMBIANCE_SPACES.map((space, index) => (
          <motion.div
            key={space.title}
            className="relative flex-shrink-0 w-[70vw] md:w-[40vw] lg:w-[30vw] aspect-[4/3] bg-[#1a1714] group overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
          >
            {/* ✅ الصورة */}
            <Image
              src={space.img}
              alt={space.title}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.06]"
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, 70vw"
              priority={index === 0}
            />

            {/* overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4a574]/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 to-transparent" />

            {/* العنوان */}
            <div className="absolute bottom-6 left-6">
              <span className="font-display text-lg text-[#f5f0e8]">{space.title}</span>
            </div>

            {/* corner */}
            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#d4a574]/50 group-hover:w-12 group-hover:h-12 transition-all duration-300" />
          </motion.div>
        ))}

      </div>
    </section>
  );
}

// -------------------------------------------------------------
// CHEF SECTION
// -------------------------------------------------------------

function ChefSection(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 px-6 bg-[#1a1714]">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-[#d4a574]/50" />
              <span className="text-[#d4a574] text-xs tracking-[0.4em] uppercase">The Visionary</span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl text-[#f5f0e8] mb-6">
              Chef Marcus Chen
            </h2>

            <p className="font-elegant text-xl text-[#f5f0e8]/80 leading-relaxed mb-6">
              "Fire is the oldest form of alchemy. It transforms the ordinary into
              the extraordinary."
            </p>

            <p className="font-body text-sm text-[#f5f0e8]/50 leading-relaxed mb-8">
              With over two decades of experience in Michelin-starred kitchens across
              Europe and Asia, Chef Chen brings a unique perspective to Ember Kitchen.
            </p>

            <div className="flex flex-wrap gap-6">
              {[
                { icon: "★", text: "2 Michelin Stars" },
                { icon: "◆", text: "James Beard Nominee" },
                { icon: "✦", text: "Best Chef 2023" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <span className="text-[#d4a574]">{item.icon}</span>
                  <span className="font-body text-xs tracking-wider text-[#f5f0e8]/60">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-[3/4] bg-[#0d0d0d] overflow-hidden">
              <Image
                src="/images/ember/chef-marcus.jpg"
                alt="Chef Marcus Chen"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/60 to-transparent" />
              <div className="absolute inset-6 border border-[#d4a574]/20 pointer-events-none" />
            </div>

            <motion.div
              className="absolute -bottom-4 -left-4 bg-[#0d0d0d] px-6 py-4 border border-[#d4a574]/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <span className="font-elegant text-2xl italic text-[#d4a574]">Marcus Chen</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// TESTIMONIALS
// -------------------------------------------------------------

const TESTIMONIALS = [
  { id: 1, quote: "An extraordinary dining experience. The way they use fire to transform simple ingredients is magical.", author: "The New York Times" },
  { id: 2, quote: "Ember Kitchen redefines what fine dining can be. Intimate, warm, and absolutely delicious.", author: "Food & Wine Magazine" },
  { id: 3, quote: "The Wagyu here changed my life. This stands among the best restaurants in the world.", author: "James Morrison, Guest" },
];

function TestimonialsSection(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={ref} className="relative py-32 px-6 bg-[#0d0d0d] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <span className="font-display text-[300px] text-[#d4a574]/5">"</span>
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#d4a574] text-lg">✦</span>
          <p className="font-body text-xs tracking-[0.4em] uppercase text-[#d4a574] mt-4">
            Testimonials
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="text-[#d4a574]">★</span>
              ))}
            </div>
            <blockquote className="font-elegant text-2xl md:text-3xl lg:text-4xl text-[#f5f0e8] leading-relaxed mb-8">
              "{TESTIMONIALS[current].quote}"
            </blockquote>
            <cite className="font-body text-sm tracking-[0.2em] uppercase text-[#d4a574] not-italic">
              — {TESTIMONIALS[current].author}
            </cite>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-3 mt-12">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${current === index ? "bg-[#d4a574] w-8" : "bg-[#d4a574]/30"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// RESERVATION CTA
// -------------------------------------------------------------

function ReservationCTA(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden bg-[#1a1714]">
      <motion.div
        className="relative max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="text-[#d4a574] text-2xl">✦</span>

        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#f5f0e8] mt-6 mb-6">
          Begin Your Journey
        </h2>

        <p className="font-elegant text-lg text-[#f5f0e8]/70 mb-10 max-w-md mx-auto">
          Reserve your table and experience the warmth of Ember Kitchen
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/demos/ember-kitchen/reservations">
            <motion.button
              className="btn-gold min-w-[200px]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Reserve Now</span>
            </motion.button>
          </Link>
          <Link href="/demos/ember-kitchen/contact">
            <motion.button
              className="btn-outline-gold min-w-[200px]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Contact Us</span>
            </motion.button>
          </Link>
        </div>

        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div>
            <span className="font-body text-xs tracking-[0.2em] uppercase text-[#d4a574]">Call</span>
            <p className="font-elegant text-lg text-[#f5f0e8] mt-1">+1 (555) 123-4567</p>
          </div>
          <span className="hidden sm:block w-px h-8 bg-[#d4a574]/30" />
          <div>
            <span className="font-body text-xs tracking-[0.2em] uppercase text-[#d4a574]">Email</span>
            <p className="font-elegant text-lg text-[#f5f0e8] mt-1">hello@emberkitchen.com</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}