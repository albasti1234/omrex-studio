// app/web-lab/restaurant/page.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type OrderType = "delivery" | "pickup" | "dine-in";

type DishCategory = "starters" | "mains" | "desserts" | "drinks" | "sides";

type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  tag?: string;
  category: DishCategory;
  spicy?: boolean;
  vegetarian?: boolean;
  bestSeller?: boolean;
  imageUrl?: string;
};

type CartItem = {
  dish: Dish;
  quantity: number;
};

const DISHES: Dish[] = [
  // Starters
  {
    id: "bruschetta",
    name: "Charred Tomato Bruschetta",
    description: "Grilled sourdough, marinated cherry tomatoes, basil oil.",
    price: 8,
    rating: 4.8,
    tag: "Signature starter",
    category: "starters",
    vegetarian: true,
    imageUrl: "/images/restaurant/bruschetta.jpg",
  },
  {
    id: "truffle-fries",
    name: "Truffle Parmesan Fries",
    description: "Hand-cut fries, white truffle oil, pecorino, rosemary salt.",
    price: 9,
    rating: 4.9,
    tag: "Most ordered",
    category: "starters",
    vegetarian: true,
    imageUrl: "/images/restaurant/truffle-fries.jpg",
  },
  {
    id: "burrata",
    name: "Creamy Burrata",
    description: "Heirloom tomatoes, grilled bread, balsamic glaze.",
    price: 12,
    rating: 4.7,
    category: "starters",
    vegetarian: true,
    imageUrl: "/images/restaurant/burrata.jpg",
  },

  // Mains
  {
    id: "margherita",
    name: "Wood-Fired Margherita",
    description: "San Marzano tomatoes, fior di latte, basil, olive oil.",
    price: 15,
    rating: 4.9,
    tag: "Neapolitan style",
    category: "mains",
    vegetarian: true,
    bestSeller: true,
    imageUrl: "/images/restaurant/margherita.jpg",
  },
  {
    id: "spicy-diavola",
    name: "Spicy Diavola Pizza",
    description: "Spicy salami, fior di latte, smoked chili honey.",
    price: 17,
    rating: 4.7,
    tag: "Spicy option",
    category: "mains",
    spicy: true,
    imageUrl: "/images/restaurant/diavola.jpg",
  },
  {
    id: "short-rib-pasta",
    name: "Slow-Braised Short Rib Pappardelle",
    description: "12-hour beef ragu, fresh pappardelle, gremolata.",
    price: 22,
    rating: 4.9,
    tag: "Chef’s special",
    category: "mains",
    bestSeller: true,
    imageUrl: "/images/restaurant/short-rib-pasta.jpg",
  },
  {
    id: "salmon",
    name: "Citrus Roasted Salmon",
    description: "Charred lemon, fennel salad, herb butter.",
    price: 24,
    rating: 4.6,
    category: "mains",
    imageUrl: "/images/restaurant/salmon.jpg",
  },

  // Desserts
  {
    id: "tiramisu",
    name: "Espresso Tiramisu",
    description: "Mascarpone, espresso-soaked ladyfingers, cocoa.",
    price: 10,
    rating: 5.0,
    tag: "House classic",
    category: "desserts",
    bestSeller: true,
    imageUrl: "/images/restaurant/tiramisu.jpg",
  },
  {
    id: "panna-cotta",
    name: "Vanilla Bean Panna Cotta",
    description: "Seasonal berries, balsamic glaze.",
    price: 9,
    rating: 4.7,
    category: "desserts",
    imageUrl: "/images/restaurant/panna-cotta.jpg",
  },

  // Drinks
  {
    id: "negroni",
    name: "Classic Negroni",
    description: "Gin, Campari, sweet vermouth, orange peel.",
    price: 14,
    rating: 4.8,
    category: "drinks",
    imageUrl: "/images/restaurant/negroni.jpg",
  },
  {
    id: "spritz",
    name: "Blood Orange Spritz",
    description: "Bitter orange, prosecco, soda, citrus.",
    price: 12,
    rating: 4.6,
    category: "drinks",
    imageUrl: "/images/restaurant/spritz.jpg",
  },
  {
    id: "mocktail",
    name: "Citrus Herb Cooler",
    description: "Non-alcoholic | Grapefruit, lime, rosemary.",
    price: 9,
    rating: 4.9,
    category: "drinks",
    imageUrl: "/images/restaurant/mocktail.jpg",
  },

  // Sides
  {
    id: "garlic-bread",
    name: "Garlic Herb Focaccia",
    description: "Warm, fluffy, brushed with garlic butter & herbs.",
    price: 7,
    rating: 4.8,
    category: "sides",
    vegetarian: true,
    imageUrl: "/images/restaurant/focaccia.jpg",
  },
  {
    id: "side-salad",
    name: "Market Green Salad",
    description: "Seasonal greens, citrus vinaigrette, toasted seeds.",
    price: 8,
    rating: 4.5,
    category: "sides",
    vegetarian: true,
    imageUrl: "/images/restaurant/green-salad.jpg",
  },
];

const featuredIds = ["short-rib-pasta", "margherita", "tiramisu", "mocktail"];
const featuredDishes = DISHES.filter((d) => featuredIds.includes(d.id));

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function RestaurantDemoPage() {
  const [orderType, setOrderType] = useState<OrderType>("delivery");
  const [activeMenuCategory, setActiveMenuCategory] =
    useState<DishCategory>("mains");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cutlery, setCutlery] = useState(true);
  const [leaveAtDoor, setLeaveAtDoor] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const [dietFilter, setDietFilter] = useState<"all" | "veg" | "spicy">("all");

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.quantity * item.dish.price,
    0,
  );

  const handleAddToCart = (dish: Dish) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { dish, quantity: 1 }];
    });
  };

  const handleChangeQuantity = (dishId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.dish.id === dishId
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleSubmitBooking: React.FormEventHandler<HTMLFormElement> = (
    e,
  ) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => setBookingSubmitted(false), 2600);
  };

  const filteredMenuDishes = DISHES.filter((d) => {
    if (d.category !== activeMenuCategory) return false;
    if (dietFilter === "veg" && !d.vegetarian) return false;
    if (dietFilter === "spicy" && !d.spicy) return false;
    return true;
  });

  return (
    <main className="min-h-screen bg-[#1a120e] pb-16 text-slate-900">
      {/* Top lab bar */}
      <div className="border-b border-[#3b2419] bg-[#110806]/95 px-4 py-2 text-xs uppercase tracking-[0.25em] text-amber-200/80 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <span className="flex items-center gap-2">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.85)]" />
            Web Lab · Restaurant Demo
          </span>
          <span className="hidden text-[0.7rem] text-amber-300/80 sm:inline">
            Front-end demo · no real orders
          </span>
        </div>
      </div>

      {/* Main container */}
      <div className="mx-auto mt-6 max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Page local nav */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-[0.8rem] text-amber-100/90">
          <div className="flex flex-wrap items-center gap-2">
            <PagePill href="#overview" label="Overview" />
            <PagePill href="#featured" label="Featured" />
            <PagePill href="#menu" label="Menu" />
            <PagePill href="#gallery" label="Gallery" />
            <PagePill href="#reserve" label="Reserve" />
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#2a160f] px-3 py-1 text-[0.75rem]">
            <span className="text-[0.8rem]">👀</span>
            <span>Client-facing restaurant preview experience</span>
          </div>
        </div>

        {/* Overview section */}
        <section
          id="overview"
          className="grid gap-6 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]"
        >
          {/* Left: hero & metrics & order type */}
          <div className="space-y-5">
            {/* Hero card */}
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
              <div className="relative overflow-hidden rounded-3xl border border-[#3b2419] bg-gradient-to-br from-[#2b160f] via-[#3b1b10] to-[#1a0c08] shadow-[0_32px_120px_rgba(0,0,0,0.95)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_5%_0%,rgba(248,250,252,0.25),transparent_55%),radial-gradient(circle_at_85%_90%,rgba(248,216,130,0.32),transparent_60%)] opacity-90" />
                <div className="relative p-4 sm:p-5">
                  {/* Top row: name + rating */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-[#2a160f]/90 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-amber-100">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[0.7rem] text-[#1b0f09]">
                          EK
                        </span>
                        Emberwood Kitchen
                      </div>
                      <h1 className="mt-3 text-xl font-semibold tracking-tight text-amber-50 sm:text-2xl">
                        Wood-fired Italian, built for delivery-first behavior.
                      </h1>
                      <p className="mt-1 text-xs font-medium uppercase tracking-[0.28em] text-amber-100/80">
                        Wood-fired plates · Natural wine · Late-night service
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="rounded-2xl bg-[#2a140d]/90 px-3 py-2 text-right text-xs text-amber-100">
                        <div className="flex items-center justify-end gap-1">
                          <span className="text-[0.8rem]">4.9</span>
                          <span className="text-amber-300">★★★★★</span>
                        </div>
                        <p className="text-[0.7rem] text-amber-100/80">
                          1.8k reviews
                        </p>
                      </div>
                      <div className="rounded-2xl bg-[#2a140d]/90 px-3 py-2 text-right text-[0.7rem] text-amber-100/90">
                        <p>Average prep time</p>
                        <p className="text-[0.85rem] font-semibold">
                          18–22 minutes
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Badges row */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-[0.75rem] text-amber-100/90">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#2a140d]/90 px-3 py-1">
                      <span className="text-[0.85rem]">🔥</span>
                      Wood-fired oven on all night
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#2a140d]/90 px-3 py-1">
                      <span className="text-[0.85rem]">⏱</span>
                      25–35 min typical delivery
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#2a140d]/90 px-3 py-1">
                      <span className="text-[0.85rem]">🚗</span>
                      Free delivery over $35
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#2a140d]/90 px-3 py-1">
                      <span className="text-[0.85rem]">🌿</span>
                      40% of menu vegetarian
                    </span>
                  </div>
                </div>
              </div>

              {/* Gallery teaser / hero images */}
              <div className="grid gap-3">
                <div className="relative h-32 w-full overflow-hidden rounded-2xl border border-[#3b2419] bg-[#1c0f0b] sm:h-40">
                  <Image
                    src="/images/restaurant/hero-woodfired.jpg"
                    alt="Wood-fired pizza in oven"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a0c08]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-3 text-xs text-amber-100">
                    <p className="font-semibold">Service in motion</p>
                    <p className="text-[0.7rem] text-amber-100/80">
                      Built like a live restaurant dashboard, not a static page.
                    </p>
                  </div>
                </div>
                <div className="grid h-28 grid-cols-2 gap-3 sm:h-32">
                  <div className="relative overflow-hidden rounded-2xl border border-[#3b2419] bg-[#1c0f0b]">
                    <Image
                      src="/images/restaurant/dining-room.jpg"
                      alt="Dining room"
                      fill
                      className="object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a0c08]/90 via-transparent to-transparent" />
                    <p className="absolute bottom-2 left-2 text-[0.7rem] text-amber-100/90">
                      Warm, low-light dining room
                    </p>
                  </div>
                  <div className="relative overflow-hidden rounded-2xl border border-[#3b2419] bg-[#1c0f0b]">
                    <Image
                      src="/images/restaurant/cocktail-bar.jpg"
                      alt="Cocktail bar"
                      fill
                      className="object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a0c08]/90 via-transparent to-transparent" />
                    <p className="absolute bottom-2 left-2 text-[0.7rem] text-amber-100/90">
                      Cocktail-forward bar
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sales / performance strip */}
            <div className="grid gap-3 rounded-3xl border border-[#3b2419] bg-[#140a07] p-4 text-[0.8rem] text-amber-100 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
              <div className="grid gap-3 sm:grid-cols-3">
                <MetricCard
                  label="Today’s orders"
                  value="184"
                  sub="Live service · dinner"
                />
                <MetricCard
                  label="Avg. order value"
                  value="$42.30"
                  sub="Incl. drinks"
                />
                <MetricCard
                  label="Returning guests"
                  value="64%"
                  sub="Last 30 days"
                />
              </div>
              {/* Fake sales graph */}
              <div className="rounded-2xl bg-[#1b0f0b] p-3">
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-amber-200/80">
                  Tonight’s pace (demo)
                </p>
                <p className="mt-1 text-[0.8rem]">
                  Service curve across the evening
                </p>
                <div className="mt-2 h-20 rounded-xl bg-[radial-gradient(circle_at_10%_0%,rgba(248,250,252,0.12),transparent_55%),radial-gradient(circle_at_90%_100%,rgba(248,216,130,0.35),transparent_60%)]" />
                <p className="mt-1 text-[0.7rem] text-amber-100/75">
                  In a full build this could plug into live sales data or a
                  back-of-house system.
                </p>
              </div>
            </div>

            {/* Order type selector */}
            <div className="flex flex-col gap-3 rounded-3xl border border-[#3b2419] bg-[#140a07] p-4 text-amber-100">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-amber-200/80">
                How would you like to order?
              </p>
              <div className="mt-1 grid grid-cols-3 gap-2 rounded-2xl bg-[#1b0f0b] p-1">
                {(
                  [
                    {
                      id: "delivery",
                      label: "Delivery",
                      icon: "🚗",
                    },
                    {
                      id: "pickup",
                      label: "Pickup",
                      icon: "🛍️",
                    },
                    {
                      id: "dine-in",
                      label: "Dine-in",
                      icon: "🍷",
                    },
                  ] as {
                    id: OrderType;
                    label: string;
                    icon: string;
                  }[]
                ).map((option) => {
                  const active = option.id === orderType;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setOrderType(option.id)}
                      className={[
                        "flex flex-col items-center justify-center rounded-xl px-2 py-2 text-[0.75rem] font-medium transition",
                        active
                          ? "bg-amber-500 text-[#28130e] shadow-[0_0_30px_rgba(245,158,11,0.7)]"
                          : "text-amber-100/80 hover:bg-[#2a140d]",
                      ].join(" ")}
                    >
                      <span className="text-base">{option.icon}</span>
                      <span>{option.label}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                {orderType === "delivery" && (
                  <motion.div
                    key="delivery"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3 text-[0.8rem]"
                  >
                    <div className="flex items-center justify-between gap-2 rounded-2xl bg-[#1c0f0b] px-3 py-2">
                      <div>
                        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-amber-200/80">
                          Est. delivery
                        </p>
                        <p>25–35 minutes · live tracking</p>
                      </div>
                      <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#04140c]">
                        Fast tonight
                      </span>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[0.7rem] uppercase tracking-[0.18em] text-amber-200/80">
                        Delivery address
                      </label>
                      <input
                        type="text"
                        placeholder="Enter street, building, apartment"
                        className="w-full rounded-xl border border-[#3b2419] bg-[#110806] px-3 py-2 text-[0.8rem] text-amber-50 placeholder:text-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-500/70"
                      />
                    </div>
                  </motion.div>
                )}

                {orderType === "pickup" && (
                  <motion.div
                    key="pickup"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3 text-[0.8rem]"
                  >
                    <div className="rounded-2xl bg-[#1c0f0b] px-3 py-2">
                      <p className="text-[0.7rem] uppercase tracking-[0.18em] text-amber-200/80">
                        Pickup window
                      </p>
                      <p>Ready in 15–20 minutes from order time.</p>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[0.7rem] uppercase tracking-[0.18em] text-amber-200/80">
                        Pickup name
                      </label>
                      <input
                        type="text"
                        placeholder="Name we’ll call out at the counter"
                        className="w-full rounded-xl border border-[#3b2419] bg-[#110806] px-3 py-2 text-[0.8rem] text-amber-50 placeholder:text-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-500/70"
                      />
                    </div>
                  </motion.div>
                )}

                {orderType === "dine-in" && (
                  <motion.div
                    key="dine-in"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3 text-[0.8rem]"
                  >
                    <div className="rounded-2xl bg-[#1c0f0b] px-3 py-2">
                      <p className="text-[0.7rem] uppercase tracking-[0.18em] text-amber-200/80">
                        Tonight’s availability
                      </p>
                      <p>We still have tables for small groups & couples.</p>
                    </div>
                    <p className="text-[0.8rem] text-amber-100/90">
                      Scroll down to the{" "}
                      <span className="font-semibold">“Reserve a table”</span>{" "}
                      section to complete your booking.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: cart / order summary */}
          <aside className="flex flex-col gap-4 rounded-3xl border border-[#3b2419] bg-[#140a07] p-4 text-amber-100">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.22em] text-amber-200/80">
                  Order summary
                </p>
                <p className="mt-1 text-[0.8rem]">
                  {cartCount === 0
                    ? "No items yet. Add a dish to get started."
                    : `${cartCount} item${cartCount > 1 ? "s" : ""} in your order.`}
                </p>
              </div>
              <span className="rounded-full bg-amber-500/90 px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-[#28130e]">
                {orderType === "delivery"
                  ? "Delivery"
                  : orderType === "pickup"
                  ? "Pickup"
                  : "Dine-in"}
              </span>
            </div>

            <div className="space-y-2">
              {cart.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#3b2419] bg-[#1b0f0b]/80 px-3 py-3 text-[0.8rem] text-amber-100/90">
                  Use{" "}
                  <span className="font-semibold">“Add to order”</span> on any
                  dish to see the order flow in action.
                </div>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.dish.id}
                      className="flex items-start justify-between gap-3 rounded-2xl bg-[#1b0f0b] px-3 py-2 text-[0.8rem]"
                    >
                      <div>
                        <p className="font-medium">{item.dish.name}</p>
                        <p className="text-[0.7rem] text-amber-100/70">
                          {item.dish.tag ?? "From the main menu"}
                        </p>
                        <div className="mt-1 flex items-center gap-2 text-[0.7rem] text-amber-100/80">
                          <span>{formatter.format(item.dish.price)}</span>
                          {item.dish.spicy && (
                            <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[0.65rem] text-red-300">
                              Spicy
                            </span>
                          )}
                          {item.dish.vegetarian && (
                            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[0.65rem] text-emerald-300">
                              Veg
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#2a140d] px-2 py-1">
                          <button
                            type="button"
                            onClick={() =>
                              handleChangeQuantity(item.dish.id, -1)
                            }
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3b2419] text-[0.85rem]"
                          >
                            −
                          </button>
                          <span className="text-[0.8rem]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleChangeQuantity(item.dish.id, 1)
                            }
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-[#28130e] text-[0.85rem]"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-[0.8rem] font-semibold">
                          {formatter.format(item.dish.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Options */}
            <div className="mt-2 space-y-2 border-t border-[#3b2419]/80 pt-3 text-[0.8rem]">
              <label className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl bg-[#1b0f0b] px-3 py-2">
                <div>
                  <p>Include cutlery & napkins</p>
                  <p className="text-[0.7rem] text-amber-100/70">
                    We skip them by default to reduce waste.
                  </p>
                </div>
                <Switch checked={cutlery} onChange={setCutlery} />
              </label>

              {orderType === "delivery" && (
                <label className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl bg-[#1b0f0b] px-3 py-2">
                  <div>
                    <p>Leave at door</p>
                    <p className="text-[0.7rem] text-amber-100/70">
                      No doorbell, we&apos;ll text when outside.
                    </p>
                  </div>
                  <Switch checked={leaveAtDoor} onChange={setLeaveAtDoor} />
                </label>
              )}

              <div className="space-y-1 pt-1">
                <label className="block text-[0.7rem] uppercase tracking-[0.18em] text-amber-200/80">
                  Order notes
                </label>
                <textarea
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="Extra instructions, allergies, delivery details..."
                  rows={3}
                  className="w-full resize-none rounded-xl border border-[#3b2419] bg-[#110806] px-3 py-2 text-[0.8rem] text-amber-50 placeholder:text-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-500/70"
                />
              </div>
            </div>

            {/* Totals */}
            <div className="mt-auto space-y-2 border-t border-[#3b2419]/80 pt-3 text-[0.8rem]">
              <div className="flex items-center justify-between">
                <span>Items subtotal</span>
                <span>{formatter.format(cartTotal)}</span>
              </div>
              <div className="flex items-center justify-between text-amber-100/80">
                <span>Service & fees (demo)</span>
                <span>{cartTotal > 0 ? formatter.format(4.5) : "$0.00"}</span>
              </div>
              {orderType === "delivery" && (
                <div className="flex items-center justify-between text-amber-100/80">
                  <span>Delivery</span>
                  <span>
                    {cartTotal >= 35 || cartTotal === 0
                      ? "$0.00"
                      : formatter.format(3.5)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between border-t border-[#3b2419]/80 pt-2 text-[0.9rem] font-semibold">
                <span>Estimated total</span>
                <span>
                  {formatter.format(
                    cartTotal === 0
                      ? 0
                      : cartTotal +
                          4.5 +
                          (orderType === "delivery" && cartTotal < 35
                            ? 3.5
                            : 0),
                  )}
                </span>
              </div>

              <button
                type="button"
                disabled={cart.length === 0}
                className={[
                  "mt-2 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-[0.8rem] font-semibold uppercase tracking-[0.22em] transition",
                  cart.length === 0
                    ? "cursor-not-allowed bg-[#3b2419] text-amber-300/60"
                    : "bg-amber-500 text-[#28130e] shadow-[0_18px_60px_rgba(245,158,11,0.8)] hover:bg-amber-400",
                ].join(" ")}
              >
                {cart.length === 0
                  ? "Add dishes to continue"
                  : "Review & place demo order"}
              </button>
              <p className="text-[0.7rem] text-amber-100/70">
                This is a front-end demo only — flows, states & copy are real,
                but no payment or orders are actually processed.
              </p>
            </div>
          </aside>
        </section>

        {/* Featured dishes */}
        <section id="featured" className="mt-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-amber-200/80">
                Featured dishes
              </p>
              <h2 className="text-lg font-semibold tracking-tight text-amber-50">
                Tonight’s Emberwood highlights
              </h2>
            </div>
            <p className="max-w-xs text-[0.78rem] text-amber-100/80">
              A tighter, curated surface that guests can use when they just want
              a fast, cinematic ordering path.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {featuredDishes.map((dish) => (
              <FeaturedDishCard
                key={dish.id}
                dish={dish}
                onAdd={() => handleAddToCart(dish)}
              />
            ))}
          </div>
        </section>

        {/* Full menu */}
        <section id="menu" className="mt-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-amber-200/80">
                Full menu
              </p>
              <h2 className="text-lg font-semibold tracking-tight text-amber-50">
                Scrollable, filterable menu — not a flat list
              </h2>
            </div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#3b2419] bg-[#140a07] px-3 py-1 text-[0.75rem] text-amber-100">
              <span className="text-[0.8rem]">🧪</span>
              <span>
                Designed for showcase — this is how your restaurant could feel
                inside Web Lab.
              </span>
            </div>
          </div>

          <div className="grid gap-4 rounded-3xl border border-[#3b2419] bg-[#140a07] p-4 md:grid-cols-[220px_minmax(0,1fr)]">
            {/* Categories sidebar */}
            <div className="space-y-3 border-b border-[#3b2419]/70 pb-3 text-[0.8rem] text-amber-100 md:border-b-0 md:border-r md:pb-0 md:pr-3">
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-amber-200/80">
                Categories
              </p>
              <div className="space-y-2">
                {(
                  [
                    ["starters", "Starters"],
                    ["mains", "Mains"],
                    ["sides", "Sides"],
                    ["desserts", "Desserts"],
                    ["drinks", "Drinks"],
                  ] as [DishCategory, string][]
                ).map(([id, label]) => {
                  const active = id === activeMenuCategory;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setActiveMenuCategory(id)}
                      className={[
                        "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition",
                        active
                          ? "bg-amber-500 text-[#28130e] shadow-[0_0_28px_rgba(245,158,11,0.8)]"
                          : "text-amber-100/80 hover:bg-[#2a140d]",
                      ].join(" ")}
                    >
                      <span>{label}</span>
                      <span className="text-[0.7rem] text-amber-100/80">
                        {
                          DISHES.filter((d) => d.category === id)
                            .length
                        }{" "}
                        items
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Filters */}
              <div className="mt-3 space-y-2">
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-amber-200/80">
                  Filters
                </p>
                <div className="flex flex-wrap gap-2">
                  <FilterChip
                    label="All dishes"
                    active={dietFilter === "all"}
                    onClick={() => setDietFilter("all")}
                  />
                  <FilterChip
                    label="Vegetarian"
                    active={dietFilter === "veg"}
                    onClick={() => setDietFilter("veg")}
                  />
                  <FilterChip
                    label="Spicy"
                    active={dietFilter === "spicy"}
                    onClick={() => setDietFilter("spicy")}
                  />
                </div>
                <p className="text-[0.7rem] text-amber-100/75">
                  Filters stack on top of category — guests can slice the menu
                  fast.
                </p>
              </div>
            </div>

            {/* Menu list */}
            <div className="space-y-3 text-[0.8rem] text-amber-100">
              {filteredMenuDishes.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#3b2419] bg-[#1b0f0b]/80 px-3 py-4 text-[0.8rem] text-amber-100/90">
                  No dishes match this combination yet. In a real build you
                  could show alt picks or upsell modules here.
                </div>
              ) : (
                filteredMenuDishes.map((dish) => (
                  <MenuDishRow
                    key={dish.id}
                    dish={dish}
                    onAdd={() => handleAddToCart(dish)}
                  />
                ))
              )}
            </div>
          </div>
        </section>

        {/* Gallery + reviews */}
        <section
          id="gallery"
          className="mt-10 grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
        >
          {/* Gallery */}
          <div className="space-y-3">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-amber-200/80">
                Atmosphere & plates
              </p>
              <h2 className="text-lg font-semibold tracking-tight text-amber-50">
                A gallery that feels like an evening at the restaurant
              </h2>
            </div>
            <div className="grid gap-3 rounded-3xl border border-[#3b2419] bg-[#140a07] p-3 sm:grid-cols-3">
              <GalleryTile
                src="/images/restaurant/gallery-plates.jpg"
                title="Plates from the pass"
                subtitle="Each main travels well for delivery."
              />
              <GalleryTile
                src="/images/restaurant/gallery-interior.jpg"
                title="Dining room"
                subtitle="Low light, warm textures, open kitchen."
              />
              <GalleryTile
                src="/images/restaurant/gallery-team.jpg"
                title="Service team"
                subtitle="Friendly, fast & detail-obsessed."
              />
            </div>
          </div>

          {/* Reviews */}
          <div className="space-y-3">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-amber-200/80">
                Guest reviews
              </p>
              <h2 className="text-lg font-semibold tracking-tight text-amber-50">
                Social proof, tailored for the restaurant surface
              </h2>
            </div>
            <div className="space-y-3 rounded-3xl border border-[#3b2419] bg-[#140a07] p-4 text-[0.8rem] text-amber-100">
              <div className="flex items-center justify-between gap-3 border-b border-[#3b2419]/70 pb-3">
                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.18em] text-amber-200/80">
                    Overall rating
                  </p>
                  <p className="mt-1 text-[1.2rem] font-semibold text-amber-50">
                    4.9 out of 5
                  </p>
                  <p className="text-[0.75rem] text-amber-100/80">
                    Based on 1,800+ recent reviews
                  </p>
                </div>
                <div className="text-right text-[0.8rem] text-amber-100/90">
                  <p className="text-amber-300">★★★★★</p>
                  <p>Food · 4.9</p>
                  <p>Service · 4.8</p>
                  <p>Atmosphere · 4.9</p>
                </div>
              </div>

              <ReviewCard
                name="Diane, local regular"
                text="The short rib pappardelle is ridiculous. Everything feels like it was plated for dine-in even when it arrives in delivery packaging."
              />
              <ReviewCard
                name="Omar, Friday-night delivery"
                text="They actually respect timing — food is hot, fries stay crispy, and the garlic focaccia survives the 20-minute ride."
              />
              <ReviewCard
                name="Maya, anniversary dinner"
                text="Cozy lighting, warm staff, and the tiramisu is the best I’ve had in the city. Feels like a little cinematic moment."
              />
            </div>
          </div>
        </section>

        {/* Reservation section */}
        <section
          id="reserve"
          className="mt-10 grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
        >
          <div className="space-y-4">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-amber-200/80">
              Reserve a table
            </p>
            <h2 className="text-lg font-semibold tracking-tight text-amber-50">
              Booking flow that behaves like a real product, not a basic form
            </h2>
            <p className="text-[0.85rem] text-amber-100/85">
              The goal here is to show clients how a fully interactive, polished
              restaurant surface could feel — guests can move from delivery to
              reservation without ever leaving the brand.
            </p>

            <ul className="mt-2 space-y-2 text-[0.8rem] text-amber-100/85">
              <li>· Inline confirmation state without breaking the layout.</li>
              <li>· Real inputs, constraints and flows — just no backend.</li>
              <li>· Ready to wire up to any booking platform when needed.</li>
            </ul>
          </div>

          <div className="relative">
            <form
              onSubmit={handleSubmitBooking}
              className="space-y-3 rounded-3xl border border-[#3b2419] bg-[#140a07] p-4 text-[0.8rem] text-amber-100 shadow-[0_26px_80px_rgba(0,0,0,0.9)]"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[0.7rem] uppercase tracking-[0.18em] text-amber-200/80">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    className="mt-1 w-full rounded-xl border border-[#3b2419] bg-[#110806] px-3 py-2 text-[0.8rem] text-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500/70"
                  />
                </div>
                <div>
                  <label className="block text-[0.7rem] uppercase tracking-[0.18em] text-amber-200/80">
                    Time
                  </label>
                  <input
                    type="time"
                    required
                    className="mt-1 w-full rounded-xl border border-[#3b2419] bg-[#110806] px-3 py-2 text-[0.8rem] text-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500/70"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[0.7rem] uppercase tracking-[0.18em] text-amber-200/80">
                    Guests
                  </label>
                  <select
                    required
                    className="mt-1 w-full rounded-xl border border-[#3b2419] bg-[#110806] px-3 py-2 text-[0.8rem] text-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500/70"
                  >
                    <option value="">Select</option>
                    <option>2 guests</option>
                    <option>3 guests</option>
                    <option>4 guests</option>
                    <option>5 guests</option>
                    <option>6 guests</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[0.7rem] uppercase tracking-[0.18em] text-amber-200/80">
                    Occasion (optional)
                  </label>
                  <select className="mt-1 w-full rounded-xl border border-[#3b2419] bg-[#110806] px-3 py-2 text-[0.8rem] text-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500/70">
                    <option>Just dinner</option>
                    <option>Birthday</option>
                    <option>Anniversary</option>
                    <option>Business</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[0.7rem] uppercase tracking-[0.18em] text-amber-200/80">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    className="mt-1 w-full rounded-xl border border-[#3b2419] bg-[#110806] px-3 py-2 text-[0.8rem] text-amber-50 placeholder:text-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-500/70"
                  />
                </div>
                <div>
                  <label className="block text-[0.7rem] uppercase tracking-[0.18em] text-amber-200/80">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 555 012 3456"
                    className="mt-1 w-full rounded-xl border border-[#3b2419] bg-[#110806] px-3 py-2 text-[0.8rem] text-amber-50 placeholder:text-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-500/70"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[0.7rem] uppercase tracking-[0.18em] text-amber-200/80">
                  Notes (optional)
                </label>
                <textarea
                  placeholder="Allergies, seating preference, or anything else."
                  rows={3}
                  className="mt-1 w-full resize-none rounded-xl border border-[#3b2419] bg-[#110806] px-3 py-2 text-[0.8rem] text-amber-50 placeholder:text-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-500/70"
                />
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-amber-500 px-4 py-2.5 text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-[#28130e] shadow-[0_18px_60px_rgba(245,158,11,0.8)] transition hover:bg-amber-400"
              >
                Confirm demo reservation
              </button>

              <AnimatePresence>
                {bookingSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="mt-2 rounded-2xl bg-emerald-500/10 px-3 py-2 text-[0.78rem] text-emerald-200"
                  >
                    <p className="font-semibold">
                      Reservation captured — in demo mode.
                    </p>
                    <p className="text-[0.7rem]">
                      In a real build this would send to your booking backend or
                      third-party system. Here it exists as a cinematic UX
                      preview for clients.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ---------- Small components ---------- */

function PagePill({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="rounded-full border border-[#3b2419] bg-[#160c08] px-3 py-1 text-[0.75rem] uppercase tracking-[0.22em] text-amber-100/90 transition hover:bg-amber-500 hover:text-[#28130e]"
    >
      {label}
    </a>
  );
}

function MetricCard(props: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl bg-[#1b0f0b] px-3 py-2.5">
      <p className="text-[0.7rem] uppercase tracking-[0.18em] text-amber-200/80">
        {props.label}
      </p>
      <p className="mt-1 text-[0.95rem] font-semibold text-amber-50">
        {props.value}
      </p>
      <p className="text-[0.7rem] text-amber-100/80">{props.sub}</p>
    </div>
  );
}

function FeaturedDishCard({
  dish,
  onAdd,
}: {
  dish: Dish;
  onAdd: () => void;
}) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="flex h-full flex-col overflow-hidden rounded-3xl border border-[#3b2419] bg-[#140a07] text-amber-100 shadow-[0_18px_60px_rgba(0,0,0,0.7)]"
    >
      <div className="relative h-28 w-full overflow-hidden border-b border-[#3b2419] sm:h-32">
        {dish.imageUrl ? (
          <Image
            src={dish.imageUrl}
            alt={dish.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_10%_0%,rgba(248,216,130,0.4),transparent_55%),radial-gradient(circle_at_90%_100%,rgba(185,100,60,0.5),transparent_60%)]" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a0c08]/90 via-transparent to-transparent" />
      </div>

      {/* 👇 هنا نضمن إن الكontent + الزر ياخدوا full height */}
      <div className="flex flex-1 flex-col p-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-[0.95rem] font-semibold tracking-tight text-amber-50">
              {dish.name}
            </h3>
            <p className="mt-1 text-[0.78rem] text-amber-100/80">
              {dish.description}
            </p>
          </div>
          <div className="text-right text-[0.75rem]">
            <p className="font-semibold">{formatter.format(dish.price)}</p>
            <p className="text-amber-100/80">
              {dish.rating.toFixed(1)} <span className="text-[0.7rem]">★</span>
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-[0.7rem]">
          {dish.tag && (
            <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-amber-200">
              {dish.tag}
            </span>
          )}
          {dish.bestSeller && (
            <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-red-200">
              Best seller
            </span>
          )}
          {dish.spicy && (
            <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-red-200">
              Spicy
            </span>
          )}
          {dish.vegetarian && (
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-200">
              Vegetarian
            </span>
          )}
        </div>

        {/* 👈 هون السحر: mt-auto تثبّت صف الزر تحت الكارت */}
        <div className="mt-auto pt-3">
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex w-full items-center justify-center rounded-full bg-amber-500 px-3 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-[#28130e] transition hover:bg-amber-400"
          >
            ADD TO ORDER
            <span className="ml-1 text-[0.85rem]">＋</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
function MenuDishRow({
  dish,
  onAdd,
}: {
  dish: Dish;
  onAdd: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-2xl bg-[#1b0f0b] px-3 py-3 text-[0.8rem] text-amber-100">
      <div className="flex gap-3">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-[#3b2419] bg-[#2a140d]">
          {dish.imageUrl ? (
            <Image
              src={dish.imageUrl}
              alt={dish.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(circle_at_10%_0%,rgba(248,216,130,0.3),transparent_55%),radial-gradient(circle_at_90%_100%,rgba(185,100,60,0.45),transparent_60%)]" />
          )}
        </div>
        <div>
          <p className="font-medium text-amber-50">{dish.name}</p>
          <p className="mt-1 text-[0.78rem] text-amber-100/80">
            {dish.description}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-[0.7rem] text-amber-100/80">
            <span>{formatter.format(dish.price)}</span>
            <span className="text-amber-200/80">
              · {dish.rating.toFixed(1)} ★
            </span>
            {dish.spicy && (
              <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-red-200">
                Spicy
              </span>
            )}
            {dish.vegetarian && (
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-200">
                Veg
              </span>
            )}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="mt-1 inline-flex items-center justify-center rounded-full bg-[#3b2419] px-3 py-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-amber-100 transition hover:bg-amber-500 hover:text-[#28130e]"
      >
        Add
      </button>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full px-3 py-1 text-[0.75rem] transition",
        active
          ? "bg-amber-500 text-[#28130e] shadow-[0_0_24px_rgba(245,158,11,0.7)]"
          : "bg-[#1b0f0b] text-amber-100/85 hover:bg-[#2a140d]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function GalleryTile(props: {
  src: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="relative h-36 overflow-hidden rounded-2xl border border-[#3b2419] bg-[#1b0f0b] sm:h-40">
      <Image src={props.src} alt={props.title} fill className="object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a0c08]/90 via-transparent to-transparent" />
      <div className="absolute bottom-2 left-2 right-2 text-[0.75rem] text-amber-100">
        <p className="font-semibold">{props.title}</p>
        <p className="text-[0.7rem] text-amber-100/85">{props.subtitle}</p>
      </div>
    </div>
  );
}

function ReviewCard({ name, text }: { name: string; text: string }) {
  return (
    <div className="rounded-2xl bg-[#1b0f0b] px-3 py-2.5">
      <p className="text-[0.75rem] text-amber-100/80">“{text}”</p>
      <p className="mt-1 text-[0.7rem] font-semibold text-amber-200/85">
        — {name}
      </p>
    </div>
  );
}

function Switch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={[
        "relative inline-flex h-6 w-11 items-center rounded-full border border-[#3b2419] bg-[#1b0f0b] transition",
        checked ? "bg-emerald-500/70" : "",
      ].join(" ")}
    >
      <span
        className={[
          "inline-block h-4 w-4 transform rounded-full bg-amber-50 shadow transition",
          checked ? "translate-x-5" : "translate-x-1",
        ].join(" ")}
      />
    </button>
  );
}