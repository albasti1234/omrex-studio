// ============================================================
// 📁 PATH: app/demos/ember-kitchen/menu/page.tsx
// ============================================================

"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import EmberNavbar from "@/EmberComponents/EmberKitchen/EmberNavbar";
import EmberFooter from "@/EmberComponents/EmberKitchen/EmberFooter";

// Menu Data with Images
const MENU_DATA = [
  {
    category: "First Course",
    subtitle: "Begin your journey",
    items: [
      {
        name: "Burrata & Ember-Roasted Tomatoes",
        price: "$24",
        desc: "Creamy burrata, fire-blistered heirloom tomatoes, aged balsamic",
        image: "/images/ember/menu/burrata.jpg"
      },
      {
        name: "Tuna Tartare",
        price: "$28",
        desc: "Yellowfin tuna, avocado mousse, crispy shallots, soy-yuzu",
        image: "/images/ember/menu/tuna-tartare.jpg",
        tag: "Raw"
      },
      {
        name: "Foie Gras Torchon",
        price: "$36",
        desc: "House-made torchon, Sauternes gelée, brioche toast",
        image: "/images/ember/menu/foie-gras.jpg",
        signature: true
      },
      {
        name: "French Onion Soup",
        price: "$18",
        desc: "Caramelized onions, rich beef broth, Gruyère gratinée",
        image: "/images/ember/menu/french-onion.jpg"
      },
    ]
  },
  {
    category: "Main Course",
    subtitle: "Where fire meets artistry",
    items: [
      {
        name: "Ember-Kissed Wagyu Ribeye",
        price: "$165",
        desc: "A5 Japanese Wagyu, open flame seared, bone marrow butter, charred shallots",
        image: "/images/ember/menu/wagyu.jpg",
        signature: true,
        tag: "Chef's Signature"
      },
      {
        name: "Dry-Aged Tomahawk",
        price: "$145",
        desc: "45-day dry-aged prime beef, herb crust, red wine reduction",
        image: "/images/ember/menu/tomahawk.jpg",
        tag: "For Two"
      },
      {
        name: "Fire-Roasted Maine Lobster",
        price: "$89",
        desc: "Whole Maine lobster, smoked paprika butter, grilled lemon",
        image: "/images/ember/menu/lobster.jpg",
        signature: true
      },
      {
        name: "Smoked Duck Breast",
        price: "$72",
        desc: "Cherry wood smoked Magret duck, wild berry gastrique, root vegetables",
        image: "/images/ember/menu/duck.jpg"
      },
      {
        name: "Pan-Seared Chilean Sea Bass",
        price: "$62",
        desc: "Miso glaze, baby bok choy, shiitake mushrooms, ginger broth",
        image: "/images/ember/menu/sea-bass.jpg"
      },
    ]
  },
  {
    category: "From the Sea",
    subtitle: "Ocean treasures",
    items: [
      {
        name: "Charred Spanish Octopus",
        price: "$58",
        desc: "Crispy fingerling potatoes, chorizo, romesco, olive oil",
        image: "/images/ember/menu/octopus.jpg"
      },
      {
        name: "Seared Diver Scallops",
        price: "$52",
        desc: "U-10 scallops, cauliflower purée, brown butter, capers",
        image: "/images/ember/menu/scallops.jpg"
      },
      {
        name: "Grilled Branzino",
        price: "$56",
        desc: "Whole Mediterranean sea bass, herbs de Provence, lemon",
        image: "/images/ember/menu/branzino.jpg"
      },
    ]
  },
  {
    category: "Accompaniments",
    subtitle: "Perfect complements",
    items: [
      {
        name: "Truffle Fries",
        price: "$16",
        desc: "Hand-cut fries, black truffle oil, shaved Parmesan",
        image: "/images/ember/menu/truffle-fries.jpg"
      },
      {
        name: "Grilled Broccolini",
        price: "$14",
        desc: "Charred broccolini, Calabrian chili, garlic",
        image: "/images/ember/menu/broccolini.jpg",
        tag: "Vegan"
      },
      {
        name: "Roasted Bone Marrow",
        price: "$22",
        desc: "Split bones, herb gremolata, grilled sourdough",
        image: "/images/ember/menu/bone-marrow.jpg"
      },
      {
        name: "Creamed Spinach",
        price: "$12",
        desc: "Classic preparation, fresh nutmeg, cream",
        image: "/images/ember/menu/spinach.jpg"
      },
    ]
  },
  {
    category: "Sweet Endings",
    subtitle: "Indulgent finales",
    items: [
      {
        name: "Molten Chocolate Cake",
        price: "$18",
        desc: "Warm Valrhona chocolate, vanilla bean ice cream, gold leaf",
        image: "/images/ember/menu/chocolate-cake.jpg",
        signature: true
      },
      {
        name: "Crème Brûlée",
        price: "$14",
        desc: "Classic vanilla custard, caramelized sugar, fresh berries",
        image: "/images/ember/menu/creme-brulee.jpg"
      },
      {
        name: "Flambéed Bananas Foster",
        price: "$16",
        desc: "Caramelized bananas, dark rum, vanilla ice cream",
        image: "/images/ember/menu/bananas-foster.jpg",
        tag: "Tableside"
      },
      {
        name: "Artisan Cheese Selection",
        price: "$24",
        desc: "Three artisan cheeses, honeycomb, marcona almonds",
        image: "/images/ember/menu/cheese.jpg"
      },
    ]
  },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <main className="relative bg-[#0d0d0d]">
      <EmberNavbar />
      <MenuHero />
      <CategoryNav
        categories={MENU_DATA.map(s => s.category)}
        active={activeCategory}
        setActive={setActiveCategory}
      />
      <MenuContent />
      <PrivateDining />
      <EmberFooter />
    </main>
  );
}

function MenuHero() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative h-[50vh] min-h-[400px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#1a1714]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#d4a574]/10 to-transparent" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/70 via-transparent to-[#0d0d0d]" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.span
          className="text-[#d4a574] text-xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          ✦
        </motion.span>

        <motion.p
          className="font-body text-xs tracking-[0.4em] uppercase text-[#d4a574] mt-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Culinary Excellence
        </motion.p>

        <motion.h1
          className="font-display text-5xl md:text-7xl text-[#f5f0e8]"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Our Menu
        </motion.h1>

        <motion.div
          className="flex items-center gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4a574]" />
          <span className="font-elegant text-lg text-[#d4a574] italic">Seasonal Selection</span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4a574]" />
        </motion.div>
      </div>
    </section>
  );
}

function CategoryNav({
  categories,
  active,
  setActive
}: {
  categories: string[];
  active: number;
  setActive: (i: number) => void;
}) {
  const scrollToCategory = (index: number) => {
    setActive(index);
    const element = document.getElementById(`menu-section-${index}`);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-[#d4a574]/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-start gap-2 py-4 overflow-x-auto hide-scrollbar">
          {categories.map((cat, index) => (
            <button
              key={cat}
              onClick={() => scrollToCategory(index)}
              className={`relative px-4 py-2 font-body text-[11px] tracking-[0.15em] uppercase whitespace-nowrap transition-all ${active === index
                ? "text-[#d4a574]"
                : "text-[#f5f0e8]/50 hover:text-[#f5f0e8]/80"
                }`}
            >
              {cat}
              {active === index && (
                <motion.div
                  layoutId="menuCategoryIndicator"
                  className="absolute bottom-0 left-0 right-0 h-px bg-[#d4a574]"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function MenuContent() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {MENU_DATA.map((section, sectionIndex) => (
          <motion.div
            key={section.category}
            id={`menu-section-${sectionIndex}`}
            className="mb-24 scroll-mt-24"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
          >
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4a574]/50" />
                <span className="text-[#d4a574] text-lg">✦</span>
                <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4a574]/50" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-[#f5f0e8] mb-2">
                {section.category}
              </h2>
              <p className="font-elegant text-lg text-[#f5f0e8]/40 italic">
                {section.subtitle}
              </p>
            </div>

            {/* Menu Items */}
            <div className="space-y-6">
              {section.items.map((item, itemIndex) => (
                <MenuItem
                  key={item.name}
                  item={item}
                  index={itemIndex}
                  isInView={isInView}
                  delay={sectionIndex * 0.1 + itemIndex * 0.05}
                />
              ))}
            </div>

            {/* Section Divider */}
            {sectionIndex < MENU_DATA.length - 1 && (
              <div className="flex items-center justify-center gap-4 mt-16">
                <span className="h-px w-24 bg-gradient-to-r from-transparent to-[#d4a574]/20" />
                <span className="text-[#d4a574]/30 text-xs">✦</span>
                <span className="h-px w-24 bg-gradient-to-l from-transparent to-[#d4a574]/20" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function MenuItem({
  item,
  index,
  isInView,
  delay
}: {
  item: {
    name: string;
    price: string;
    desc: string;
    image: string;
    signature?: boolean;
    tag?: string;
  };
  index: number;
  isInView: boolean;
  delay: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      className="group relative"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-5 p-4 rounded-lg hover:bg-[#1a1714]/50 transition-colors duration-300">
        {/* Thumbnail Image */}
        <div className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="80px"
            className="object-cover"
          />

          {/* overlay/ستايلك الحالي فوق الصورة (زي ما هو) */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#d4a574]/10 to-transparent" />

          {item.signature && (
            <div className="absolute top-1 left-1">
              <span className="text-[#d4a574] text-xs">★</span>
            </div>
          )}

          <motion.div
            className="absolute inset-0 bg-[#d4a574]/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Tags */}
          {item.tag && (
            <span className="inline-block text-[9px] font-body tracking-[0.15em] uppercase text-[#d4a574] mb-1">
              {item.tag}
            </span>
          )}

          {/* Name & Price Row */}
          <div className="flex items-baseline justify-between gap-3 mb-1.5">
            <h3 className={`font-display text-lg leading-tight transition-colors duration-300 ${item.signature
              ? "text-[#d4a574]"
              : isHovered
                ? "text-[#d4a574]"
                : "text-[#f5f0e8]"
              }`}>
              {item.name}
            </h3>

            {/* Dotted line */}
            <div className="flex-1 border-b border-dotted border-[#d4a574]/20 mb-1 mx-1 min-w-[30px]" />

            {/* Price */}
            <span className="font-display text-lg text-[#d4a574] whitespace-nowrap">
              {item.price}
            </span>
          </div>

          {/* Description */}
          <p className="font-elegant text-sm text-[#f5f0e8]/50 leading-relaxed line-clamp-2">
            {item.desc}
          </p>
        </div>
      </div>

      {/* Left accent bar on hover */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 bg-[#d4a574] rounded-full"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isHovered ? "50%" : 0,
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.article>
  );
}

function PrivateDining() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 px-6 bg-[#1a1714] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4a574]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#d4a574]/5 rounded-full blur-3xl" />

      <motion.div
        className="relative max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="text-[#d4a574] text-xl">✦</span>

        <h2 className="font-display text-4xl md:text-5xl text-[#f5f0e8] mt-4 mb-4">
          Private Dining
        </h2>

        <p className="font-elegant text-lg text-[#f5f0e8]/60 mb-8 max-w-lg mx-auto">
          Host your special occasions in our intimate private dining room,
          accommodating up to 24 guests with customized menus.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 mb-10 text-sm">
          {["Customized Menus", "Dedicated Service", "Wine Pairing", "A/V Available"].map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <span className="text-[#d4a574]">✦</span>
              <span className="font-body text-[#f5f0e8]/60">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/demos/ember-kitchen/contact">
            <motion.button
              className="px-8 py-4 font-body text-xs tracking-[0.2em] uppercase text-[#0d0d0d] bg-[#d4a574] hover:bg-[#e8c9a0] transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Inquire Now
            </motion.button>
          </Link>
          <Link href="/demos/ember-kitchen/gallery">
            <motion.button
              className="px-8 py-4 font-body text-xs tracking-[0.2em] uppercase text-[#d4a574] border border-[#d4a574] hover:bg-[#d4a574] hover:text-[#0d0d0d] transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Space
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}