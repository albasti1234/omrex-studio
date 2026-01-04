// ============================================================
// 📁 PATH: app/demos/ember-kitchen/layout.tsx
// ============================================================

import type { Metadata } from "next";
import "./ember-kitchen.css";

export const metadata: Metadata = {
  title: "Ember Kitchen | Fine Dining Experience",
  description:
    "Where fire meets artistry. An unforgettable culinary journey through flame-crafted cuisine in an intimate, luxurious setting.",
  keywords: ["fine dining", "restaurant", "luxury dining", "gourmet", "flame cooking"],
};

export default function EmberKitchenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="ember-kitchen-wrapper">{children}</div>;
}
