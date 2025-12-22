// app/web-lab/restaurant/menu/page.tsx
"use client";

import React, { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";

type ServiceMode = "dine-in" | "delivery" | "pickup";

type DishCategory =
  | "starters"
  | "mains"
  | "pasta"
  | "pizza"
  | "desserts"
  | "drinks";

type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: DishCategory;
  image: string;
  isSpicy?: boolean;
  isVegan?: boolean;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  rating: number;
  reviewsCount: number;
  tags: string[];
  isChefSpecial?: boolean;
  isFeatured?: boolean;
};

const DISHES: Dish[] = [
  {
    id: "truffle-burrata-bruschetta",
    name: "Truffle Burrata Bruschetta",
    description:
      "Grilled sourdough topped with creamy burrata, roasted cherry tomatoes, basil oil and shaved black truffle.",
    price: 14,
    category: "starters",
    image: "/images/restaurant/dishes/truffle-burrata-bruschetta.jpg",
    isVegetarian: true,
    rating: 4.9,
    reviewsCount: 127,
    tags: ["Signature", "For sharing"],
    isChefSpecial: true,
    isFeatured: true,
  },
  {
    id: "coal-fired-ribeye",
    name: "Coal-Fired Ribeye Steak",
    description:
      "300g dry-aged ribeye, grilled over oak and charcoal, roasted garlic butter and sea salt.",
    price: 36,
    category: "mains",
    image: "/images/restaurant/dishes/coal-fired-ribeye.jpg",
    rating: 4.9,
    reviewsCount: 203,
    tags: ["Best seller", "Medium-rare recommended"],
    isChefSpecial: true,
    isFeatured: true,
  },
  {
    id: "spicy-diavola-pizza",
    name: "Spicy Diavola Pizza",
    description:
      "Wood-fired sourdough base, fior di latte, spicy ‘nduja, smoked pepperoni, chili honey.",
    price: 19,
    category: "pizza",
    image: "/images/restaurant/dishes/spicy-diavola-pizza.jpg",
    isSpicy: true,
    rating: 4.8,
    reviewsCount: 156,
    tags: ["Spicy", "Wood-fired"],
    isFeatured: true,
  },
  {
    id: "lemon-butter-sea-bass",
    name: "Lemon Butter Sea Bass",
    description:
      "Pan-seared sea bass, charred lemon, fennel salad and herb butter sauce.",
    price: 28,
    category: "mains",
    image: "/images/restaurant/dishes/lemon-butter-sea-bass.jpg",
    rating: 4.7,
    reviewsCount: 89,
    tags: ["Light", "Seafood"],
  },
  {
    id: "truffle-mushroom-tagliatelle",
    name: "Truffle Mushroom Tagliatelle",
    description:
      "Fresh egg pasta, wild mushrooms, parmesan cream and white truffle oil.",
    price: 22,
    category: "pasta",
    image: "/images/restaurant/dishes/truffle-mushroom-tagliatelle.jpg",
    isVegetarian: true,
    rating: 4.8,
    reviewsCount: 142,
    tags: ["Comfort food", "Rich & creamy"],
  },
  {
    id: "charred-broccolini",
    name: "Charred Broccolini & Almonds",
    description:
      "Grilled broccolini, toasted almonds, lemon zest and chili flakes.",
    price: 11,
    category: "starters",
    image: "/images/restaurant/dishes/charred-broccolini.jpg",
    isVegan: true,
    isGlutenFree: true,
    rating: 4.6,
    reviewsCount: 64,
    tags: ["Vegan", "Sides"],
  },
  {
    id: "classic-tiramisu",
    name: "Classic Espresso Tiramisu",
    description:
      "Layers of espresso-soaked savoiardi, mascarpone cream and cocoa.",
    price: 10,
    category: "desserts",
    image: "/images/restaurant/dishes/classic-tiramisu.jpg",
    isVegetarian: true,
    rating: 4.9,
    reviewsCount: 178,
    tags: ["House-made", "Italian classic"],
    isFeatured: true,
  },
  {
    id: "molten-chocolate-cake",
    name: "Molten Dark Chocolate Cake",
    description:
      "Warm fondant with liquid 70% chocolate center, vanilla bean ice cream.",
    price: 12,
    category: "desserts",
    image: "/images/restaurant/dishes/molten-chocolate-cake.jpg",
    isVegetarian: true,
    rating: 4.8,
    reviewsCount: 132,
    tags: ["For sharing", "Rich"],
  },
  {
    id: "roasted-garlic-focaccia",
    name: "Roasted Garlic Focaccia",
    description:
      "House-baked focaccia, confit garlic, rosemary and sea salt flakes.",
    price: 8,
    category: "starters",
    image: "/images/restaurant/dishes/roasted-garlic-focaccia.jpg",
    isVegetarian: true,
    rating: 4.7,
    reviewsCount: 97,
    tags: ["Bread", "For sharing"],
  },
  {
    id: "house-spritz",
    name: "Citrus & Rosemary Spritz",
    description:
      "Light, sparkling spritz with citrus, rosemary and a bitter finish.",
    price: 13,
    category: "drinks",
    image: "/images/restaurant/dishes/citrus-rosemary-spritz.jpg",
    rating: 4.6,
    reviewsCount: 51,
    tags: ["Signature drink", "Low-alcohol"],
  },
  {
    id: "verona-negroni",
    name: "Smoked Verona Negroni",
    description:
      "Smoked classic negroni, orange peel and house-blend bitters.",
    price: 15,
    category: "drinks",
    image: "/images/restaurant/dishes/smoked-verona-negroni.jpg",
    rating: 4.8,
    reviewsCount: 73,
    tags: ["Bold", "Aperitivo"],
  },
];

const CATEGORY_LABELS: Record<DishCategory, string> = {
  starters: "Starters",
  mains: "Mains",
  pasta: "Fresh Pasta",
  pizza: "Sourdough Pizza",
  desserts: "Desserts",
  drinks: "Drinks & Cocktails",
};

const CATEGORY_ORDER: DishCategory[] = [
  "starters",
  "mains",
  "pasta",
  "pizza",
  "desserts",
  "drinks",
];

export default function RestaurantMenuPage(): ReactNode {
  const [serviceMode, setServiceMode] = useState<ServiceMode>("dine-in");
  const [activeCategory, setActiveCategory] = useState<DishCategory | "all">(
    "all",
  );

  const categoriesWithDishes = useMemo(() => {
    const filtered =
      activeCategory === "all"
        ? DISHES
        : DISHES.filter((dish) => dish.category === activeCategory);

    const byCategory = new Map<DishCategory, Dish[]>();
    CATEGORY_ORDER.forEach((cat) => byCategory.set(cat, []));

    filtered.forEach((dish) => {
      const list = byCategory.get(dish.category);
      if (list) list.push(dish);
      else byCategory.set(dish.category, [dish]);
    });

    return CATEGORY_ORDER
      .map((cat) => ({
        category: cat,
        dishes: byCategory.get(cat) ?? [],
      }))
      .filter((group) => group.dishes.length > 0);
  }, [activeCategory]);

  const featuredDishes = useMemo(
    () => DISHES.filter((d) => d.isFeatured || d.isChefSpecial),
    [],
  );

  return (
    <main className="min-h-screen bg-[#0b0705] text-amber-50">
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        {/* Top bar / title */}
        <header className="flex flex-col gap-6 border-b border-white/5 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-500/80">
              OMREX WEB LAB · RESTAURANT DEMO
            </p>
            <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-amber-50 sm:text-4xl lg:text-[2.8rem]">
              The Ember Room · Full Menu
            </h1>
            <p className="mt-3 max-w-xl text-sm text-amber-100/70">
              Wood-fired kitchen, coal-grilled mains and house-made pasta.
              Choose your service mode and explore the full menu exactly how a
              real guest would.
            </p>
            <p className="mt-2 text-xs font-medium text-amber-300/80">
              Tonight: open · 6:00 PM – 11:30 PM · last kitchen order 11:00 PM
            </p>
          </div>

          {/* Service mode selector */}
          <div className="flex flex-col gap-3 text-xs sm:text-[0.8rem]">
            <span className="uppercase tracking-[0.25em] text-amber-500/80">
              Service mode
            </span>
            <div className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-black/40 p-1">
              <ServiceModePill
                label="Dine-in"
                value="dine-in"
                active={serviceMode === "dine-in"}
                onClick={() => setServiceMode("dine-in")}
              />
              <ServiceModePill
                label="Delivery"
                value="delivery"
                active={serviceMode === "delivery"}
                onClick={() => setServiceMode("delivery")}
              />
              <ServiceModePill
                label="Pickup"
                value="pickup"
                active={serviceMode === "pickup"}
                onClick={() => setServiceMode("pickup")}
              />
            </div>
            <p className="text-[11px] text-amber-100/70">
              {serviceMode === "dine-in" &&
                "Dining room experience · full menu including specials."}
              {serviceMode === "delivery" &&
                "Only travel-friendly dishes · packaging fee may apply."}
              {serviceMode === "pickup" &&
                "Order ahead and pick up at the host stand."}
            </p>
          </div>
        </header>

        {/* Featured row */}
        {featuredDishes.length > 0 && (
          <section className="mt-8 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-400">
                Featured tonight
              </h2>
              <span className="text-[11px] text-amber-100/70">
                Chef&apos;s picks · limited availability
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {featuredDishes.map((dish) => (
                <FeaturedDishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </section>
        )}

        {/* Category filters */}
        <section className="mt-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-400">
              Browse by category
            </h2>
            <div className="flex flex-wrap gap-2 text-[11px]">
              <CategoryPill
                label="All"
                active={activeCategory === "all"}
                onClick={() => setActiveCategory("all")}
              />
              {CATEGORY_ORDER.map((cat) => (
                <CategoryPill
                  key={cat}
                  label={CATEGORY_LABELS[cat]}
                  active={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Menu sections */}
        <section className="mt-6 space-y-10">
          {categoriesWithDishes.map(({ category, dishes }) => (
            <div key={category} className="space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
                  {CATEGORY_LABELS[category]}
                </h3>
                <span className="h-px flex-1 bg-gradient-to-r from-amber-500/50 via-amber-500/10 to-transparent" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {dishes.map((dish) => (
                  <DishRow key={dish.id} dish={dish} />
                ))}
              </div>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}

/* ---------------------------------- */
/* Service mode pill                  */
/* ---------------------------------- */

type ServiceModePillProps = {
  label: string;
  value: ServiceMode;
  active: boolean;
  onClick: () => void;
};

function ServiceModePill({ label, active, onClick }: ServiceModePillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative inline-flex items-center justify-center rounded-full px-4 py-1.5",
        "text-[0.72rem] font-semibold uppercase tracking-[0.22em]",
        "transition-all duration-200",
        active
          ? "bg-amber-500 text-black shadow-[0_0_24px_rgba(245,158,11,0.6)]"
          : "bg-transparent text-amber-200 hover:bg-white/5",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

/* ---------------------------------- */
/* Category pill                      */
/* ---------------------------------- */

type CategoryPillProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function CategoryPill({ label, active, onClick }: CategoryPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full border px-3 py-1",
        "transition-all duration-150 text-[11px]",
        active
          ? "border-amber-400 bg-amber-500 text-black shadow-[0_0_18px_rgba(245,158,11,0.6)]"
          : "border-white/10 bg-black/40 text-amber-100 hover:border-amber-400/60 hover:text-amber-50",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

/* ---------------------------------- */
/* Featured dish card (top row)       */
/* ---------------------------------- */

function FeaturedDishCard({ dish }: { dish: Dish }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-white/5 via-black/40 to-black shadow-[0_24px_70px_rgba(0,0,0,0.9)]">
      <div className="relative h-40 w-full overflow-hidden sm:h-44">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          sizes="(min-width: 1024px) 320px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute left-3 right-3 top-3 flex items-center justify-between text-[11px]">
          <span className="rounded-full bg-black/70 px-2 py-0.5 text-amber-100/90">
            {dish.isChefSpecial ? "Chef’s special" : "Featured dish"}
          </span>
          <span className="rounded-full bg-black/70 px-2 py-0.5 text-amber-200">
            ★ {dish.rating.toFixed(1)} · {dish.reviewsCount}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-4 py-3 text-sm">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-medium text-amber-50">{dish.name}</h3>
          <span className="text-[13px] font-semibold text-amber-300">
            ${dish.price.toFixed(2)}
          </span>
        </div>

        <p className="text-xs text-amber-100/75">{dish.description}</p>

        <div className="mt-1 flex flex-wrap gap-1.5 text-[10px] text-amber-100/80">
          {dish.isSpicy && (
            <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-red-300">
              Spicy
            </span>
          )}
          {dish.isVegan && (
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-300">
              Vegan
            </span>
          )}
          {dish.isVegetarian && !dish.isVegan && (
            <span className="rounded-full bg-lime-500/10 px-2 py-0.5 text-lime-300">
              Vegetarian
            </span>
          )}
          {dish.isGlutenFree && (
            <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-sky-300">
              Gluten free
            </span>
          )}
          {dish.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/5 px-2 py-0.5 text-amber-100/80"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* زرار ثابت تحت الكارت */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              console.log("[demo] add to order:", dish.id);
            }}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-amber-500 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-black shadow-[0_12px_32px_rgba(245,158,11,0.7)] transition hover:bg-amber-400"
          >
            ADD TO ORDER +
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-white/12 bg-black/60 px-3 py-1.5 text-[11px] font-medium text-amber-100 hover:border-amber-300/70 hover:text-amber-50"
          >
            Details
          </button>
        </div>
      </div>
    </article>
  );
}

/* ---------------------------------- */
/* Dish row (sections below)          */
/* ---------------------------------- */

type DishRowProps = {
  dish: Dish;
};

function DishRow({ dish }: DishRowProps) {
  return (
    <article className="flex gap-3 rounded-2xl border border-white/7 bg-black/40 p-3 shadow-[0_14px_40px_rgba(0,0,0,0.7)] sm:gap-4 sm:p-4">
      {/* image */}
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl sm:h-28 sm:w-28">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          sizes="140px"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        {dish.isChefSpecial && (
          <span className="absolute left-2 top-2 rounded-full bg-black/75 px-2 py-0.5 text-[10px] font-medium text-amber-200">
            Chef&apos;s pick
          </span>
        )}
      </div>

      {/* content */}
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-amber-50">
              {dish.name}
            </h3>
            <p className="mt-1 text-xs text-amber-100/75">
              {dish.description}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[13px] font-semibold text-amber-300">
              ${dish.price.toFixed(2)}
            </span>
            <span className="text-[10px] text-amber-100/70">
              ★ {dish.rating.toFixed(1)} · {dish.reviewsCount}
            </span>
          </div>
        </div>

        {/* tags */}
        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10px] text-amber-100/80">
          {dish.isSpicy && (
            <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-red-300">
              Spicy
            </span>
          )}
          {dish.isVegan && (
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-300">
              Vegan
            </span>
          )}
          {dish.isVegetarian && !dish.isVegan && (
            <span className="rounded-full bg-lime-500/10 px-2 py-0.5 text-lime-300">
              Vegetarian
            </span>
          )}
          {dish.isGlutenFree && (
            <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-sky-300">
              Gluten free
            </span>
          )}
          {dish.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/5 px-2 py-0.5 text-amber-100/80"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* button row */}
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => {
              console.log("[demo] add to order:", dish.id);
            }}
            className="inline-flex items-center justify-center rounded-full bg-amber-500 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-black shadow-[0_10px_28px_rgba(245,158,11,0.7)] transition hover:bg-amber-400"
          >
            ADD TO ORDER +
          </button>
          <span className="text-[10px] text-amber-200/80">
            ~{" "}
            {dish.category === "mains" || dish.category === "pizza"
              ? "20–25 min"
              : dish.category === "pasta"
              ? "15–20 min"
              : "10–15 min"}
          </span>
        </div>
      </div>
    </article>
  );
}