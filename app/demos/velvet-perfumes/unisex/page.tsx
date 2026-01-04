"use client";

import { redirect } from "next/navigation";

export default function UnisexPage() {
    // Redirect to fragrances page with unisex filter
    redirect("/demos/velvet-perfumes/fragrances?gender=unisex");
}
