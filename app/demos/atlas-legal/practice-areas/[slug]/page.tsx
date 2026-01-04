"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import AtlasNav from "../../_components/AtlasNav";
import AtlasFooter from "../../_components/AtlasFooter";
import AtlasIcon from "../../_components/AtlasIcon";
import AtlasSectionHeader from "../../_components/AtlasSectionHeader";
import AtlasLiveChat from "../../_components/AtlasLiveChat";
import { useTranslation } from "../../_lib/i18n/LanguageContext";
import {
    PRACTICE_AREAS,
    getPracticeAreaBySlug,
} from "../../_data/practice-areas";
import { ATTORNEYS } from "../../_data/attorneys";
import { use } from "react";

export default function PracticeAreaDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    const { t, isRtl, language } = useTranslation();
    const area = getPracticeAreaBySlug(slug);

    if (!area) {
        notFound();
    }

    // Get related attorneys
    const relatedAttorneys = ATTORNEYS.filter((a) =>
        a.practiceAreas.some((p) =>
            p.toLowerCase().includes(area.slug.split("-")[0].toLowerCase())
        )
    ).slice(0, 3);

    // Get localized content
    const title = language === "ar" ? area.titleAr : area.title;
    const description =
        language === "ar" ? area.fullDescriptionAr : area.fullDescription;
    const features = language === "ar" ? area.featuresAr : area.features;
    const caseTypes = language === "ar" ? area.caseTypesAr : area.caseTypes;

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
                        >
                            {/* Breadcrumb */}
                            <nav
                                aria-label="Breadcrumb"
                                className={`flex items-center gap-2 text-sm text-white/50 mb-8 ${isRtl ? "flex-row-reverse" : ""
                                    }`}
                            >
                                <Link
                                    href="/demos/atlas-legal"
                                    className="hover:text-atlas-accent transition-colors"
                                >
                                    {t("nav.home")}
                                </Link>
                                <AtlasIcon
                                    name={isRtl ? "chevron-left" : "chevron-right"}
                                    className="w-3 h-3"
                                />
                                <Link
                                    href="/demos/atlas-legal/practice-areas"
                                    className="hover:text-atlas-accent transition-colors"
                                >
                                    {t("nav.practiceAreas")}
                                </Link>
                                <AtlasIcon
                                    name={isRtl ? "chevron-left" : "chevron-right"}
                                    className="w-3 h-3"
                                />
                                <span className="text-atlas-accent">{title}</span>
                            </nav>

                            <div
                                className={`grid lg:grid-cols-2 gap-12 items-center ${isRtl ? "lg:flex-row-reverse" : ""
                                    }`}
                            >
                                <div>
                                    <div className="w-20 h-20 mb-8 flex items-center justify-center border-2 border-atlas-accent">
                                        <AtlasIcon
                                            name={area.icon as any}
                                            className="w-10 h-10 text-atlas-accent"
                                        />
                                    </div>
                                    <h1 className="al-heading-1 text-white mb-6">{title}</h1>
                                    <p className="text-lg text-white/70 leading-relaxed">
                                        {description}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-sm uppercase tracking-widest text-atlas-accent font-semibold">
                                        {language === "ar"
                                            ? "الخدمات التي نقدمها"
                                            : "Services We Provide"}
                                    </h3>
                                    {features.map((feature, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + i * 0.1 }}
                                            className={`flex items-center gap-3 p-4 border border-white/10 hover:border-atlas-accent/50 transition-colors ${isRtl ? "flex-row-reverse" : ""
                                                }`}
                                        >
                                            <AtlasIcon
                                                name="check"
                                                className="w-4 h-4 text-atlas-accent flex-shrink-0"
                                            />
                                            <span className="text-white/80">{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Case Types */}
                <section className="al-section-light">
                    <div className="al-container">
                        <AtlasSectionHeader
                            kicker={
                                language === "ar" ? "خبراتنا" : "Our Experience"
                            }
                            title={
                                language === "ar"
                                    ? `قضايا ${title} التي نتعامل معها`
                                    : `${area.title} Cases We Handle`
                            }
                            subtitle={
                                language === "ar"
                                    ? "مثّلنا بنجاح عملاء في مجموعة واسعة من القضايا ضمن هذا المجال."
                                    : "We have successfully represented clients in a wide variety of matters within this practice area."
                            }
                        />

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {caseTypes.map((caseType, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 bg-atlas-surface-elevated border border-atlas-border hover:border-atlas-accent hover:shadow-lg transition-all text-center"
                                >
                                    <AtlasIcon
                                        name="document"
                                        className="w-8 h-8 text-atlas-accent mx-auto mb-4"
                                    />
                                    <span className="font-serif font-semibold text-atlas-text">
                                        {caseType}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Related Attorneys */}
                {relatedAttorneys.length > 0 && (
                    <section className="al-section-warm">
                        <div className="al-container">
                            <AtlasSectionHeader
                                kicker={t("attorneys.kicker")}
                                title={
                                    language === "ar"
                                        ? `محامو ${title}`
                                        : `${area.title} Attorneys`
                                }
                            />

                            <div className="grid md:grid-cols-3 gap-8">
                                {relatedAttorneys.map((attorney, i) => (
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
                                            <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-[oklch(0.10_0.015_260)]">
                                                <div className="absolute inset-0 bg-gradient-to-br from-atlas-primary to-[oklch(0.08_0.015_260)] flex items-center justify-center">
                                                    <AtlasIcon
                                                        name="user"
                                                        className="w-16 h-16 text-white/20"
                                                    />
                                                </div>
                                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-atlas-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                            </div>
                                            <div className="text-center">
                                                <h3 className="text-lg font-serif font-semibold text-atlas-text group-hover:text-atlas-accent transition-colors">
                                                    {attorney.name}
                                                </h3>
                                                <p className="text-sm text-atlas-accent mt-1">
                                                    {language === "ar"
                                                        ? attorney.titleAr
                                                        : attorney.title}
                                                </p>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA */}
                <section className="py-20 bg-[oklch(0.10_0.015_260)]">
                    <div className="al-container text-center">
                        <h2 className="al-heading-3 text-white mb-4">
                            {language === "ar"
                                ? `هل تحتاج مساعدة في قضية ${title}؟`
                                : `Need Help With a ${area.title} Matter?`}
                        </h2>
                        <p className="text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
                            {language === "ar"
                                ? "تواصل معنا اليوم للحصول على استشارة سرية. سنقيّم قضيتك ونشرح خياراتك القانونية."
                                : "Contact us today for a confidential consultation. We'll evaluate your case and explain your legal options."}
                        </p>
                        <div
                            className={`flex flex-col sm:flex-row justify-center gap-4 ${isRtl ? "sm:flex-row-reverse" : ""
                                }`}
                        >
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
                            <a
                                href="tel:+12125550100"
                                className="al-btn al-btn-outline-light"
                            >
                                <AtlasIcon name="phone" className="w-5 h-5" />
                                {t("nav.phone")}
                            </a>
                        </div>
                    </div>
                </section>

                {/* Other Practice Areas */}
                <section className="al-section-light">
                    <div className="al-container">
                        <h3 className="text-center al-heading-3 text-atlas-text mb-12">
                            {language === "ar"
                                ? "مجالات تخصص أخرى"
                                : "Other Practice Areas"}
                        </h3>
                        <div
                            className={`flex flex-wrap justify-center gap-4 ${isRtl ? "flex-row-reverse" : ""
                                }`}
                        >
                            {PRACTICE_AREAS.filter((p) => p.slug !== slug).map((p) => (
                                <Link
                                    key={p.slug}
                                    href={`/demos/atlas-legal/practice-areas/${p.slug}`}
                                    className="px-6 py-3 border border-atlas-border hover:border-atlas-accent text-atlas-text hover:text-atlas-accent transition-all text-sm font-medium"
                                >
                                    {language === "ar" ? p.titleAr : p.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <AtlasFooter />
            <AtlasLiveChat />
        </>
    );
}
