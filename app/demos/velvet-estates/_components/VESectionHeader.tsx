"use client";

import React from "react";
import { motion } from "framer-motion";

interface VESectionHeaderProps {
    kicker?: string;
    title: React.ReactNode;
    subtitle?: string;
    align?: "left" | "center";
    dark?: boolean;
}

export default function VESectionHeader({
    kicker,
    title,
    subtitle,
    align = "center",
    dark = false,
}: VESectionHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`mb-16 ${align === "center" ? "text-center" : ""}`}
        >
            {/* Kicker */}
            {kicker && (
                <div
                    className={`ve-kicker ${align === "center" ? "justify-center" : ""}`}
                >
                    {kicker}
                </div>
            )}

            {/* Title */}
            <h2
                className={`ve-heading-2 text-balance ${dark ? "text-white" : "text-ve-text"
                    }`}
            >
                {title}
            </h2>

            {/* Subtitle */}
            {subtitle && (
                <p
                    className={`ve-lead mt-6 ${align === "center" ? "max-w-3xl mx-auto" : "max-w-2xl"
                        } ${dark ? "text-white/60" : ""}`}
                >
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
}
