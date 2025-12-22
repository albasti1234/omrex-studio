"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const THEME = {
    colors: {
        bg: { primary: "#070709", secondary: "#0c0c10" },
        accent: { gold: "#d4a853", goldRgb: "212, 168, 83" },
        text: { primary: "#fafaf9", secondary: "#a8a29e", muted: "#78716c" },
        border: { subtle: "rgba(212,168,83,0.08)" },
    },
} as const;

export default function OurStoryPage() {
    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50" style={{ background: `${THEME.colors.bg.primary}f0`, backdropFilter: "blur(20px)", borderBottom: `1px solid ${THEME.colors.border.subtle}` }}>
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <Link href="/demos/velvet-perfumes">
                        <span className="text-[1.4rem] font-extralight tracking-[0.25em]" style={{ fontFamily: "'Playfair Display', serif" }}>VELVET</span>
                    </Link>
                    <nav className="hidden items-center gap-10 lg:flex">
                        <Link href="/demos/velvet-perfumes/collections" className="text-[0.7rem] uppercase tracking-[0.2em]" style={{ color: THEME.colors.text.secondary }}>Collections</Link>
                        <Link href="/demos/velvet-perfumes/shop" className="text-[0.7rem] uppercase tracking-[0.2em]" style={{ color: THEME.colors.text.secondary }}>Shop</Link>
                        <Link href="/demos/velvet-perfumes/our-story" className="text-[0.7rem] uppercase tracking-[0.2em]" style={{ color: THEME.colors.accent.gold }}>Our Story</Link>
                    </nav>
                </div>
            </header>

            <main className="min-h-screen pt-24" style={{ background: THEME.colors.bg.primary }}>
                <section className="py-20">
                    <div className="mx-auto max-w-4xl px-6 text-center">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <span className="mb-6 inline-block text-[0.65rem] uppercase tracking-[0.4em]" style={{ color: THEME.colors.accent.gold }}>Est. 2018</span>
                            <h1 className="mb-8 text-4xl font-extralight lg:text-6xl" style={{ fontFamily: "'Playfair Display', serif" }}>Our Story</h1>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="space-y-8 text-left">
                            <p className="text-lg leading-relaxed" style={{ color: THEME.colors.text.secondary }}>
                                Velvet Perfumes was born from a singular vision: to create fragrances that transcend the ordinary and become part of one&apos;s identity. Our founder, after decades in the luxury fragrance industry, sought to craft scents that tell stories.
                            </p>
                            <p className="leading-relaxed" style={{ color: THEME.colors.text.secondary }}>
                                We source the rarest ingredients from across the globe—Cambodian oud, Bulgarian roses, Persian saffron—and blend them with meticulous care in our atelier in Paris. Each bottle represents months of refinement, countless iterations, and an unwavering commitment to excellence.
                            </p>
                            <p className="leading-relaxed" style={{ color: THEME.colors.text.secondary }}>
                                Our philosophy is simple: a fragrance should not merely be worn, it should be experienced. It should evoke memories, spark emotions, and leave an indelible impression. This is the essence of Velvet.
                            </p>
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-16 grid gap-8 md:grid-cols-3">
                            {[
                                { number: "50+", label: "Unique Fragrances" },
                                { number: "12", label: "Countries" },
                                { number: "100K+", label: "Happy Customers" },
                            ].map((stat, i) => (
                                <div key={i} className="text-center">
                                    <span className="block text-4xl font-light" style={{ color: THEME.colors.accent.gold, fontFamily: "'Playfair Display', serif" }}>{stat.number}</span>
                                    <span className="mt-2 block text-xs uppercase tracking-wider" style={{ color: THEME.colors.text.muted }}>{stat.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            </main>
        </>
    );
}
