"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAsDemo() {
    const cookieStore = await cookies();

    // Set a demo session cookie
    cookieStore.set("lr_demo_session", "active", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
    });

    redirect("/saas/launchroom/app");
}

export async function logoutDemo() {
    const cookieStore = await cookies();
    cookieStore.delete("lr_demo_session");
    redirect("/saas/launchroom/sign-in");
}
