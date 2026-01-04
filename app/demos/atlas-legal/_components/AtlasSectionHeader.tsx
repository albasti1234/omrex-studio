"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../_lib/i18n/LanguageContext";

interface AtlasSectionHeaderProps {
    kicker?: string;
    title: React.ReactNode;
    subtitle?: string;
    center?: boolean;
    light?: boolean;
}

export default function AtlasSectionHeader({
    kicker,
    title,
    subtitle,
    center = true,
    light = false,
}: AtlasSectionHeaderProps) {
    const { isRtl } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`mb-16 ${center ? "text-center" : ""}`}
        >
            {/* Kicker */}
            {kicker && (
                <div
                    className={`al-kicker ${center ? "justify-center" : ""}`}
                    style={{ flexDirection: isRtl && !center ? "row-reverse" : "row" }}
                >
                    {kicker}
                </div>
            )}

            {/* Title */}
            <h2
                className={`al-heading-2 ${light ? "text-white" : "text-atlas-text"}`}
            >
                {title}
            </h2>

            {/* Subtitle */}
            {subtitle && (
                <p
                    className={`al-lead mt-6 ${center ? "max-w-3xl mx-auto" : "max-w-2xl"} ${light ? "text-white/70" : "text-atlas-text/70 dark:text-atlas-muted"
                        }`}
                >
                    {subtitle}
                </p>
            )}

            {/* Decorative line */}
            {center && (
                <div className="al-gold-line-center mt-8" />
            )}
        </motion.div>
    );
}
