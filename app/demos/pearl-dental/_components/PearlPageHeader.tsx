"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface PearlPageHeaderProps {
    kicker?: string;
    title: string;
    subtitle?: string;
    bgImage?: string; // Optional custom bg
}

export default function PearlPageHeader({ kicker, title, subtitle, bgImage }: PearlPageHeaderProps) {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-pd-text-main">
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0 opacity-40">
                {bgImage ? (
                    // In a real app, use next/image with fill. For now, using CSS for the gradient fallback if no image
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }} />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-pd-primary/20 via-pd-text-main to-pd-text-main" />
                )}
            </div>

            {/* Glass Overlay/Noise */}
            <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-10 pointer-events-none" />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-pd-text-main via-transparent to-transparent" />

            <div className="pd-container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-3xl"
                >
                    {kicker && (
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-[1px] w-8 bg-pd-accent/50" />
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-pd-accent">{kicker}</span>
                        </div>
                    )}

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-6 leading-[1.1]">
                        {title}
                    </h1>

                    {subtitle && (
                        <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl font-light">
                            {subtitle}
                        </p>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
