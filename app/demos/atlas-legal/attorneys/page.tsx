"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import AtlasNav from "../_components/AtlasNav";
import AtlasFooter from "../_components/AtlasFooter";
import AtlasIcon from "../_components/AtlasIcon";
import AtlasSectionHeader from "../_components/AtlasSectionHeader";
import AtlasLiveChat from "../_components/AtlasLiveChat";
import { useTranslation } from "../_lib/i18n/LanguageContext";
import { ATTORNEYS } from "../_data/attorneys";
import { PRACTICE_AREAS, getPracticeAreaBySlug } from "../_data/practice-areas";

export default function AttorneysPage() {
    const { t, isRtl, language } = useTranslation();

    // Helper to get localized practice area name
    const getPracticeAreaName = (slug: string) => {
        const area = getPracticeAreaBySlug(slug);
        if (!area) return slug;
        return language === "ar" ? area.titleAr : area.title;
    };

    return (
        <>
            <AtlasNav />

            <main id="main-content" dir={isRtl ? "rtl" : "ltr"}>
                {/* Hero */}
                <section className="pt-32 pb-20 bg-[oklch(0.10_0.015_260)] relative overflow-hidden">
                    <div className="absolute inset-0 al-pattern-lines opacity-20" />
                    <div className="al-container relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-3xl"
                        >
                            <div
                                className={`flex items-center gap-4 mb-6 ${isRtl ? "flex-row-reverse" : ""
                                    }`}
                            >
                                <div className="h-px w-12 bg-atlas-accent" />
                                <span className="al-kicker mb-0">{t("attorneys.kicker")}</span>
                            </div>
                            <h1 className="al-heading-1 text-white mb-6">
                                {t("attorneys.title")}
                            </h1>
                            <p className="text-lg text-white/70 leading-relaxed">
                                {t("attorneys.subtitle")}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Attorneys Grid */}
                <section className="al-section-light">
                    <div className="al-container">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {ATTORNEYS.map((attorney, i) => (
                                <motion.article
                                    key={attorney.slug}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={`/demos/atlas-legal/attorneys/${attorney.slug}`}
                                        className="group block"
                                    >
                                        {/* Photo */}
                                        <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-[oklch(0.10_0.015_260)]">
                                            <Image
                                                src={`/images/atlas-legal/${attorney.slug}.png`}
                                                alt={attorney.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                            <div className="absolute inset-0 bg-atlas-accent/0 group-hover:bg-atlas-accent/10 transition-colors duration-500" />
                                            <div
                                                className={`absolute bottom-0 left-0 right-0 h-1 bg-atlas-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${isRtl ? "origin-right" : "origin-left"
                                                    }`}
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="text-center">
                                            <h2 className="text-xl font-serif font-semibold text-atlas-text group-hover:text-atlas-accent transition-colors">
                                                {attorney.name}
                                            </h2>
                                            <p className="text-sm text-atlas-accent mt-1">
                                                {language === "ar"
                                                    ? attorney.titleAr
                                                    : attorney.title}
                                            </p>
                                            <p className="text-sm text-atlas-text/60 dark:text-atlas-muted mt-1">
                                                {language === "ar"
                                                    ? attorney.roleAr
                                                    : attorney.role}
                                            </p>

                                            {/* Practice Areas Tags */}
                                            <div
                                                className={`flex flex-wrap justify-center gap-2 mt-4 ${isRtl ? "flex-row-reverse" : ""
                                                    }`}
                                            >
                                                {attorney.practiceAreas
                                                    .slice(0, 2)
                                                    .map((areaSlug) => (
                                                        <span
                                                            key={areaSlug}
                                                            className="text-xs px-3 py-1 bg-atlas-surface border border-atlas-border text-atlas-text/70"
                                                        >
                                                            {getPracticeAreaName(areaSlug)}
                                                        </span>
                                                    ))}
                                            </div>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-[oklch(0.10_0.015_260)]">
                    <div className="al-container text-center">
                        <h2 className="al-heading-3 text-white mb-4">
                            {t("attorneys.ready")}
                        </h2>
                        <p className="text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
                            {t("attorneys.readyDesc")}
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
                    </div>
                </section>
            </main>

            <AtlasFooter />
            <AtlasLiveChat />
        </>
    );
}
