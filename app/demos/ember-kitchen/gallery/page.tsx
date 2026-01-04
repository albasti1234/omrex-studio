// ============================================================
// 📁 PATH: app/demos/ember-kitchen/gallery/page.tsx
// ============================================================

"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import EmberNavbar from "@/EmberComponents/EmberKitchen/EmberNavbar";
import EmberFooter from "@/EmberComponents/EmberKitchen/EmberFooter"

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "ambiance", label: "Ambiance" },
  { id: "cuisine", label: "Cuisine" },
  { id: "drinks", label: "Cocktails" },
];

const GALLERY_ITEMS = [
  { id: 1, title: "Main Dining Room", category: "ambiance", size: "large", image: "/images/ember/spaces/main-dining.jpg" },
  { id: 2, title: "Open Kitchen", category: "ambiance", size: "tall", image: "/images/ember/spaces/open-kitchen.jpg" },
  { id: 3, title: "Ember-Kissed Wagyu", category: "cuisine", size: "medium", image: "/images/ember/menu/wagyu.jpg" },
  { id: 4, title: "Fire Bar", category: "ambiance", size: "medium", image: "/images/ember/spaces/fire-bar.jpg" },
  { id: 5, title: "Signature Cocktail", category: "drinks", size: "tall", image: "/images/ember/gallery/signature-cocktail.jpg" },
  { id: 6, title: "Lobster Dish", category: "cuisine", size: "large", image: "/images/ember/menu/lobster.jpg" },
  { id: 7, title: "Wine Selection", category: "drinks", size: "medium", image: "/images/ember/gallery/wine-selection.jpg" },
  { id: 8, title: "Private Dining", category: "ambiance", size: "wide", image: "/images/ember/spaces/private-room.jpg" },
  { id: 9, title: "Duck Breast", category: "cuisine", size: "medium", image: "/images/ember/menu/duck.jpg" },
  { id: 10, title: "Old Fashioned", category: "drinks", size: "medium", image: "/images/ember/gallery/old-fashioned.jpg" },
  { id: 11, title: "Dessert Plating", category: "cuisine", size: "tall", image: "/images/ember/menu/chocolate-cake.jpg" },
  { id: 12, title: "Terrace View", category: "ambiance", size: "large", image: "/images/ember/spaces/terrace.jpg" },
];

export default function GalleryPage(): React.ReactElement {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredItems = activeCategory === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <main className="relative bg-[#0d0d0d]">
      <EmberNavbar />
      <GalleryHero />
      <CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <GalleryGrid items={filteredItems} onSelect={setSelectedImage} />
      <InstagramCTA />
      <EmberFooter />

      <AnimatePresence>
        {selectedImage !== null && (
          <Lightbox item={GALLERY_ITEMS.find((i) => i.id === selectedImage)!} onClose={() => setSelectedImage(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}

function GalleryHero(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative h-[40vh] min-h-[350px] overflow-hidden bg-[#1a1714]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/70 via-transparent to-[#0d0d0d]" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.span className="text-[#d4a574] text-xl" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>✦</motion.span>
        <motion.p className="font-body text-xs tracking-[0.4em] uppercase text-[#d4a574] mt-4 mb-4" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>Visual Journey</motion.p>
        <motion.h1 className="font-display text-5xl md:text-7xl text-[#f5f0e8]" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>Gallery</motion.h1>
      </div>
    </section>
  );
}

function CategoryFilter({ activeCategory, setActiveCategory }: { activeCategory: string; setActiveCategory: (cat: string) => void }): React.ReactElement {
  return (
    <section className="py-12 px-6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {CATEGORIES.map((category) => (
          <motion.button key={category.id} onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-3 font-body text-xs tracking-[0.2em] uppercase border transition-all duration-300 ${activeCategory === category.id ? "bg-[#d4a574] border-[#d4a574] text-[#0d0d0d]" : "border-[#d4a574]/30 text-[#f5f0e8]/60 hover:border-[#d4a574]"}`}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            {category.label}
          </motion.button>
        ))}
      </div>
    </section>
  );
}

function GalleryGrid({ items, onSelect }: { items: typeof GALLERY_ITEMS; onSelect: (id: number) => void }): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "large": return "col-span-2 row-span-2";
      case "tall": return "col-span-1 row-span-2";
      case "wide": return "col-span-2 row-span-1";
      default: return "col-span-1 row-span-1";
    }
  };

  return (
    <section ref={ref} className="px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]" layout>
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.article key={item.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`relative overflow-hidden cursor-pointer group ${getSizeClasses(item.size)}`} onClick={() => onSelect(item.id)}>
                {/* Actual Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-4 left-4">
                  <span className="font-body text-[9px] tracking-[0.2em] uppercase text-[#d4a574]">{item.category}</span>
                  <h3 className="font-display text-lg text-[#f5f0e8] mt-1">{item.title}</h3>
                </div>
                <motion.div className="absolute inset-0 border-2 border-[#d4a574] opacity-0 group-hover:opacity-100 transition-opacity" />
                <motion.div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#d4a574]/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[#d4a574]">+</span>
                </motion.div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function Lightbox({ item, onClose }: { item: typeof GALLERY_ITEMS[0]; onClose: () => void }): React.ReactElement {
  return (
    <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0d0d0d]/95 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.button className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-[#f5f0e8]/60 hover:text-[#d4a574] transition-colors" whileHover={{ scale: 1.1 }}>
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" /></svg>
      </motion.button>

      <motion.div className="relative max-w-4xl w-full mx-6 aspect-[4/3] bg-[#1a1714] overflow-hidden" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} onClick={(e) => e.stopPropagation()}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 90vw, 900px"
        />
        <div className="absolute inset-6 border border-[#d4a574]/30 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#0d0d0d] to-transparent">
          <span className="font-body text-[10px] tracking-[0.2em] uppercase text-[#d4a574]">{item.category}</span>
          <h3 className="font-display text-2xl text-[#f5f0e8] mt-1">{item.title}</h3>
        </div>
      </motion.div>
    </motion.div>
  );
}

function InstagramCTA(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-6 bg-[#1a1714]">
      <motion.div className="max-w-2xl mx-auto text-center" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
        <span className="text-[#d4a574] text-xl">✦</span>
        <h2 className="font-display text-3xl md:text-4xl text-[#f5f0e8] mt-4 mb-4">Follow Our Journey</h2>
        <p className="font-elegant text-lg text-[#f5f0e8]/50 mb-8">Join us on Instagram for behind-the-scenes moments</p>
        <motion.a href="https://instagram.com/emberkitchen" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 border border-[#d4a574] text-[#d4a574] font-body text-xs tracking-[0.2em] uppercase hover:bg-[#d4a574] hover:text-[#0d0d0d] transition-all"
          whileHover={{ scale: 1.02 }}>
          <span>@emberkitchen</span>
        </motion.a>
      </motion.div>
    </section>
  );
}