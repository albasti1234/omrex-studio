"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import AtlasNav from "../_components/AtlasNav";
import AtlasFooter from "../_components/AtlasFooter";
import AtlasIcon from "../_components/AtlasIcon";
import AtlasSectionHeader from "../_components/AtlasSectionHeader";
import AnimatedScales from "../_components/AnimatedScales";
import { useTranslation } from "../_lib/i18n/LanguageContext";
import { ATTORNEYS } from "../_data/attorneys";
import {
    METHODOLOGY_STEPS,
    getLocalizedText,
} from "../_lib/content";

export default function AboutPage() {
    const { t, isRtl, language } = useTranslation();

    // Core values
    const VALUES = [
        {
            title: { en: "Integrity", ar: "النزاهة" },
            desc: {
                en: "We hold ourselves to the highest ethical standards in every case.",
                ar: "نلتزم بأعلى المعايير الأخلاقية في كل قضية.",
            },
            icon: "shield",
        },
        {
            title: { en: "Excellence", ar: "التميز" },
            desc: {
                en: "We pursue excellence in legal strategy, preparation, and execution.",
                ar: "نسعى للتميز في الاستراتيجية والإعداد والتنفيذ القانوني.",
            },
            icon: "award",
        },
        {
            title: { en: "Advocacy", ar: "الدفاع" },
            desc: {
                en: "We fight relentlessly for our clients' rights and interests.",
                ar: "ندافع بلا هوادة عن حقوق ومصالح موكلينا.",
            },
            icon: "gavel",
        },
        {
            title: { en: "Results", ar: "النتائج" },
            desc: {
                en: "We measure our success by the outcomes we achieve for clients.",
                ar: "نقيس نجاحنا بالنتائج التي نحققها لعملائنا.",
            },
            icon: "target",
        },
    ];

    // Timeline milestones
    const MILESTONES = [
        { year: "1994", event: { en: "Atlas Legal founded in Manhattan", ar: "تأسيس أطلس القانوني في مانهاتن" } },
        { year: "2000", event: { en: "Opened Washington D.C. office", ar: "افتتاح مكتب واشنطن العاصمة" } },
        { year: "2008", event: { en: "First $100M verdict achieved", ar: "تحقيق أول حكم بـ ١٠٠ مليون دولار" } },
        { year: "2015", event: { en: "Named Top 10 Trial Firm nationally", ar: "اختيارنا ضمن أفضل ١٠ مكاتب تقاضي وطنياً" } },
        { year: "2020", event: { en: "Surpassed $2B in client recoveries", ar: "تجاوز ملياري دولار في استردادات العملاء" } },
        { year: "2024", event: { en: "Celebrating 30 years of excellence", ar: "الاحتفال بـ ٣٠ عاماً من التميز" } },
    ];

    return (
        <>
            <AtlasNav />

            <main className="pt-24">
                {/* Hero Section */}
                <section className="py-20 bg-[oklch(0.10_0.015_260)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(180,150,90,0.08)_0%,_transparent_70%)]" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-atlas-accent/30 to-transparent" />

                    <div className="al-container relative z-10">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className={isRtl ? "lg:order-2" : ""}
                            >
                                <span className="al-kicker">{t("about.kicker")}</span>
                                <h1 className="al-heading-1 text-white mb-6">
                                    {t("about.pageTitle")}
                                </h1>
                                <p className="text-lg text-white/60 leading-relaxed mb-8">
                                    {t("about.pageSubtitle")}
                                </p>
                                <p className="text-white/50 leading-relaxed">
                                    {t("about.subtitle")}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className={`hidden lg:flex items-center justify-center ${isRtl ? "lg:order-1" : ""}`}
                            >
                                <AnimatedScales size={250} />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Mission & History */}
                <section className="al-section-light">
                    <div className="al-container">
                        <div className="grid md:grid-cols-2 gap-12">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-atlas-surface-elevated border border-atlas-border p-10"
                            >
                                <div className="w-14 h-14 mb-6 flex items-center justify-center border border-atlas-accent">
                                    <AtlasIcon
                                        name="target"
                                        className="w-6 h-6 text-atlas-accent"
                                    />
                                </div>
                                <h2 className="text-2xl font-serif font-semibold mb-4">
                                    {t("about.missionTitle")}
                                </h2>
                                <p className="text-atlas-muted leading-relaxed">
                                    {t("about.missionText")}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="bg-atlas-surface-elevated border border-atlas-border p-10"
                            >
                                <div className="w-14 h-14 mb-6 flex items-center justify-center border border-atlas-accent">
                                    <AtlasIcon
                                        name="clock"
                                        className="w-6 h-6 text-atlas-accent"
                                    />
                                </div>
                                <h2 className="text-2xl font-serif font-semibold mb-4">
                                    {t("about.historyTitle")}
                                </h2>
                                <p className="text-atlas-muted leading-relaxed">
                                    {t("about.historyText")}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section className="al-section-dark relative">
                    <div className="absolute inset-0 al-pattern-lines opacity-5" />

                    <div className="al-container relative z-10">
                        <AtlasSectionHeader
                            light
                            kicker={language === "ar" ? "قيمنا الأساسية" : "Core Values"}
                            title={
                                language === "ar"
                                    ? "المبادئ التي توجهنا"
                                    : "The Principles That Guide Us"
                            }
                        />

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {VALUES.map((value, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-center p-8 border border-white/10 hover:border-atlas-accent/30 transition-colors"
                                >
                                    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center border border-atlas-accent">
                                        <AtlasIcon
                                            name={value.icon as any}
                                            className="w-6 h-6 text-atlas-accent"
                                        />
                                    </div>
                                    <h3 className="text-xl font-serif font-semibold text-white mb-2">
                                        {getLocalizedText(value.title, language)}
                                    </h3>
                                    <p className="text-white/60 text-sm">
                                        {getLocalizedText(value.desc, language)}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Timeline */}
                <section className="al-section-light">
                    <div className="al-container">
                        <AtlasSectionHeader
                            kicker={language === "ar" ? "رحلتنا" : "Our Journey"}
                            title={
                                language === "ar"
                                    ? "ثلاثون عاماً من التميز"
                                    : "30 Years of Excellence"
                            }
                        />

                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-atlas-border hidden md:block" />

                            <div className="space-y-8 md:space-y-0">
                                {MILESTONES.map((milestone, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className={`flex flex-col md:flex-row items-center gap-4 md:gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                                    >
                                        <div
                                            className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} text-center`}
                                        >
                                            <div className="text-3xl font-serif font-bold text-atlas-accent mb-1">
                                                {milestone.year}
                                            </div>
                                            <p className="text-atlas-muted">
                                                {getLocalizedText(milestone.event, language)}
                                            </p>
                                        </div>

                                        {/* Center dot */}
                                        <div className="w-4 h-4 bg-atlas-accent flex-shrink-0 hidden md:block" />

                                        <div className="flex-1 hidden md:block" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Leadership Preview */}
                <section className="al-section-warm">
                    <div className="al-container">
                        <AtlasSectionHeader
                            kicker={t("attorneys.kicker")}
                            title={t("attorneys.title")}
                            subtitle={t("attorneys.subtitle")}
                        />

                        <div className="grid md:grid-cols-3 gap-8">
                            {ATTORNEYS.slice(0, 3).map((attorney, i) => (
                                <motion.div
                                    key={attorney.slug}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={`/demos/atlas-legal/attorneys/${attorney.slug}`}
                                        className="group block"
                                    >
                                        <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-[oklch(0.10_0.015_260)]">
                                            <Image
                                                src={`/images/atlas-legal/${attorney.slug}.png`}
                                                alt={attorney.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                            <div className="absolute inset-0 bg-atlas-accent/0 group-hover:bg-atlas-accent/10 transition-colors duration-500" />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="text-xl font-serif font-semibold group-hover:text-atlas-accent transition-colors">
                                                {attorney.name}
                                            </h3>
                                            <p className="text-sm text-atlas-accent mt-1">
                                                {attorney.title}
                                            </p>
                                            <p className="text-sm text-atlas-muted mt-1">
                                                {attorney.role}
                                            </p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Link
                                href="/demos/atlas-legal/attorneys"
                                className="al-btn al-btn-outline"
                            >
                                {t("attorneys.viewAll")}
                                <AtlasIcon
                                    name="arrow-right"
                                    className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`}
                                />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 bg-[oklch(0.10_0.015_260)] relative">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(180,150,90,0.08)_0%,_transparent_70%)]" />

                    <div className="al-container relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="al-heading-2 text-white mb-4">
                                {t("attorneys.ready")}
                            </h2>
                            <p className="text-white/60 max-w-xl mx-auto mb-8">
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
                        </motion.div>
                    </div>
                </section>
            </main>

            <AtlasFooter />
        </>
    );
}
