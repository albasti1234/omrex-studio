"use client";

import Link from "next/link";
import { WishlistProvider, CompareProvider } from "../_lib/contexts";
import { THEME } from "../_lib/theme";

export default function FragrancesLayout({ children }: { children: React.ReactNode }) {
    return (
        <WishlistProvider>
            <CompareProvider>
                {/* Navbar */}
                <header className="fixed inset-x-0 top-0 z-50" style={{ background: `${THEME.colors.bg.primary}f0`, backdropFilter: "blur(20px)", borderBottom: `1px solid ${THEME.colors.border.subtle}` }}>
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                        <Link href="/demos/velvet-perfumes">
                            <span className="text-[1.4rem] font-extralight tracking-[0.25em]" style={{ fontFamily: "'Playfair Display', serif", color: THEME.colors.text.primary }}>VELVET</span>
                        </Link>
                        <nav className="hidden items-center gap-10 lg:flex">
                            <Link href="/demos/velvet-perfumes/brands" className="text-[0.7rem] uppercase tracking-[0.2em]" style={{ color: THEME.colors.text.secondary }}>Brands</Link>
                            <Link href="/demos/velvet-perfumes/fragrances" className="text-[0.7rem] uppercase tracking-[0.2em]" style={{ color: THEME.colors.accent.gold }}>All Fragrances</Link>
                            <Link href="/demos/velvet-perfumes/cart" className="text-[0.7rem] uppercase tracking-[0.2em]" style={{ color: THEME.colors.text.secondary }}>Cart</Link>
                        </nav>
                    </div>
                </header>

                <main className="min-h-screen pt-24" style={{ background: THEME.colors.bg.primary }}>
                    {children}
                </main>
            </CompareProvider>
        </WishlistProvider>
    );
}
