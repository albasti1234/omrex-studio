"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AtlasNav from "../_components/AtlasNav";
import AtlasFooter from "../_components/AtlasFooter";
import AtlasIcon from "../_components/AtlasIcon";
import AtlasSectionHeader from "../_components/AtlasSectionHeader";
import { useTranslation } from "../_lib/i18n/LanguageContext";
import { PRACTICE_AREAS } from "../_data/practice-areas";

export default function PracticeAreasPage() {
    const { t, isRtl, language } = useTranslation();

    return (
        <>
            <AtlasNav />

            <main id="main-content" className="pt-24" dir={isRtl ? "rtl" : "ltr"}>
                {/* Hero Section */}
                <section className="py-20 bg-[oklch(0.10_0.015_260)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(180,150,90,0.08)_0%,_transparent_70%)]" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-atlas-accent/30 to-transparent" />

                    <div className="al-container relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center"
                        >
                            <span className="al-kicker justify-center">
                                {t("practice.kicker")}
                            </span>
                            <h1 className="al-heading-1 text-white mb-6">
                                {t("practice.title1")} {t("practice.title2")}
                            </h1>
                            <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
                                {t("practice.subtitle")}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Practice Areas Grid */}
                <section className="al-section-light">
                    <div className="al-container">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {PRACTICE_AREAS.map((area, i) => (
                                <motion.div
                                    key={area.slug}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.6 }}
                                >
                                    <Link
                                        href={`/demos/atlas-legal/practice-areas/${area.slug}`}
                                        className="al-card block p-8 h-full group"
                                    >
                                        {/* Icon */}
                                        <div className="w-16 h-16 mb-6 flex items-center justify-center border border-atlas-accent group-hover:bg-atlas-accent/10 transition-colors">
                                            <AtlasIcon
                                                name={area.icon as any}
                                                className="w-7 h-7 text-atlas-accent"
                                            />
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-xl font-serif font-semibold text-atlas-text mb-3 group-hover:text-atlas-accent transition-colors">
                                            {language === "ar" ? area.titleAr : area.title}
                                        </h2>

                                        {/* Description - uses stronger text color for readability */}
                                        <p className="text-atlas-text/70 dark:text-atlas-muted text-sm leading-relaxed mb-6">
                                            {language === "ar"
                                                ? area.shortDescriptionAr
                                                : area.shortDescription}
                                        </p>

                                        {/* Features List */}
                                        <ul className="space-y-2 mb-6">
                                            {(language === "ar"
                                                ? area.featuresAr
                                                : area.features
                                            )
                                                .slice(0, 3)
                                                .map((feature, j) => (
                                                    <li
                                                        key={j}
                                                        className={`flex items-center gap-2 text-sm text-atlas-text/60 dark:text-atlas-muted ${isRtl ? "flex-row-reverse" : ""
                                                            }`}
                                                    >
                                                        <AtlasIcon
                                                            name="check"
                                                            className="w-3 h-3 text-atlas-accent flex-shrink-0"
                                                        />
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                        </ul>

                                        {/* Learn More */}
                                        <div
                                            className={`flex items-center gap-2 text-atlas-accent text-sm font-medium ${isRtl ? "flex-row-reverse" : ""
                                                }`}
                                        >
                                            <span>{t("practice.learnMore")}</span>
                                            <AtlasIcon
                                                name="arrow-right"
                                                className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRtl
                                                        ? "rotate-180 group-hover:-translate-x-1"
                                                        : ""
                                                    }`}
                                            />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Not Sure CTA */}
                <section className="al-section-warm">
                    <div className="al-container">
                        <div className="bg-[oklch(0.10_0.015_260)] p-12 lg:p-16 text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(180,150,90,0.1)_0%,_transparent_70%)]" />

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="relative z-10"
                            >
                                <h2 className="al-heading-2 text-white mb-4">
                                    {t("practice.notSure")}
                                </h2>
                                <p className="text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
                                    {t("practice.notSureDesc")}
                                </p>
                                <Link
                                    href="/demos/atlas-legal/consultation"
                                    className="al-btn al-btn-gold"
                                >
                                    {t("nav.consultation")}
                                    <AtlasIcon
                                        name="arrow-right"
                                        className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`}
                                    />
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>

            <AtlasFooter />
        </>
    );
}
