"use client";

import { redirect } from "next/navigation";

export default function BestsellersPage() {
    // Redirect to fragrances page sorted by bestsellers
    redirect("/demos/velvet-perfumes/fragrances?filter=bestseller");
}
