"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AtlasIcon from "./AtlasIcon";
import { useTranslation } from "../_lib/i18n/LanguageContext";

interface AtlasCardProps {
    title: string;
    titleAr?: string;
    description: string;
    descriptionAr?: string;
    icon: string;
    href: string;
    index?: number;
}

export default function AtlasCard({
    title,
    titleAr,
    description,
    descriptionAr,
    icon,
    href,
    index = 0,
}: AtlasCardProps) {
    const { language, isRtl, t } = useTranslation();

    const displayTitle = language === "ar" && titleAr ? titleAr : title;
    const displayDesc =
        language === "ar" && descriptionAr ? descriptionAr : description;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
            }}
        >
            <Link href={href} className="al-card block p-8 h-full group">
                {/* Icon */}
                <div className="w-14 h-14 mb-6 flex items-center justify-center border border-atlas-accent group-hover:bg-atlas-accent/10 transition-colors">
                    <AtlasIcon
                        name={icon as any}
                        className="w-6 h-6 text-atlas-accent"
                    />
                </div>

                {/* Title */}
                <h3 className="text-xl font-serif font-semibold mb-3 group-hover:text-atlas-accent transition-colors">
                    {displayTitle}
                </h3>

                {/* Description */}
                <p className="text-atlas-muted text-sm leading-relaxed mb-6">
                    {displayDesc}
                </p>

                {/* Learn More Link */}
                <div
                    className={`flex items-center gap-2 text-atlas-accent text-sm font-medium ${isRtl ? "flex-row-reverse" : ""}`}
                >
                    <span>{t("practice.learnMore")}</span>
                    <AtlasIcon
                        name="arrow-right"
                        className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRtl ? "rotate-180 group-hover:-translate-x-1" : ""}`}
                    />
                </div>
            </Link>
        </motion.div>
    );
}
