"use client";

import { redirect } from "next/navigation";

export default function ForHerPage() {
    // Redirect to fragrances page with gender filter
    redirect("/demos/velvet-perfumes/fragrances?gender=women");
}
