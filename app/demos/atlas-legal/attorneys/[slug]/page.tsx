"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import AtlasNav from "../../_components/AtlasNav";
import AtlasFooter from "../../_components/AtlasFooter";
import AtlasIcon from "../../_components/AtlasIcon";
import AtlasLiveChat from "../../_components/AtlasLiveChat";
import { ATTORNEYS, getAttorneyBySlug } from "../../_data/attorneys";
import { use } from "react";

export default function AttorneyDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    const attorney = getAttorneyBySlug(slug);

    if (!attorney) {
        notFound();
    }

    return (
        <>
            <AtlasNav />

            <main>
                {/* Hero */}
                <section className="pt-32 pb-20 bg-al-bg-dark relative overflow-hidden">
                    <div className="absolute inset-0 al-pattern-lines opacity-20" />
                    <div className="al-container relative z-10">
                        <div className="grid lg:grid-cols-3 gap-12">
                            {/* Photo */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="lg:col-span-1"
                            >
                                <div className="relative aspect-[3/4] overflow-hidden border-2 border-al-gold/30">
                                    <Image
                                        src={`/images/atlas-legal/${attorney.slug}.png`}
                                        alt={attorney.name}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                </div>
                            </motion.div>

                            {/* Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="lg:col-span-2"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-px w-12 bg-al-gold" />
                                    <span className="al-kicker mb-0">{attorney.title}</span>
                                </div>
                                <h1 className="al-heading-1 text-white mb-4">{attorney.name}</h1>
                                <p className="text-xl text-al-gold mb-6">{attorney.role}</p>
                                <p className="al-lead-light mb-8">{attorney.bio}</p>

                                {/* Contact */}
                                <div className="flex flex-wrap gap-4 mb-8">
                                    <a
                                        href={`mailto:${attorney.email}`}
                                        className="flex items-center gap-2 text-white/70 hover:text-al-gold transition-colors"
                                    >
                                        <AtlasIcon name="email" className="w-4 h-4" />
                                        {attorney.email}
                                    </a>
                                    <a
                                        href={`tel:${attorney.phone}`}
                                        className="flex items-center gap-2 text-white/70 hover:text-al-gold transition-colors"
                                    >
                                        <AtlasIcon name="phone" className="w-4 h-4" />
                                        {attorney.phone}
                                    </a>
                                    {attorney.linkedin && (
                                        <a
                                            href={attorney.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-white/70 hover:text-al-gold transition-colors"
                                        >
                                            <AtlasIcon name="linkedin" className="w-4 h-4" />
                                            LinkedIn
                                        </a>
                                    )}
                                </div>

                                <Link href="/demos/atlas-legal/consultation" className="al-btn al-btn-gold">
                                    Schedule Consultation
                                    <AtlasIcon name="arrow-right" className="w-5 h-5" />
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Details */}
                <section className="al-section-light">
                    <div className="al-container">
                        <div className="grid lg:grid-cols-3 gap-12">
                            {/* Education */}
                            <div>
                                <h3 className="text-lg font-serif font-semibold mb-6 flex items-center gap-3">
                                    <AtlasIcon name="document" className="w-5 h-5 text-al-gold" />
                                    Education
                                </h3>
                                <ul className="space-y-3">
                                    {attorney.education.map((edu, i) => (
                                        <li key={i} className="text-al-text-muted text-sm border-l-2 border-al-gold pl-4">
                                            {edu}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Bar Admissions */}
                            <div>
                                <h3 className="text-lg font-serif font-semibold mb-6 flex items-center gap-3">
                                    <AtlasIcon name="scales" className="w-5 h-5 text-al-gold" />
                                    Bar Admissions
                                </h3>
                                <ul className="space-y-2">
                                    {attorney.barAdmissions.map((bar, i) => (
                                        <li key={i} className="flex items-center gap-2 text-al-text-muted text-sm">
                                            <AtlasIcon name="check" className="w-4 h-4 text-al-gold" />
                                            {bar}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Awards */}
                            <div>
                                <h3 className="text-lg font-serif font-semibold mb-6 flex items-center gap-3">
                                    <AtlasIcon name="award" className="w-5 h-5 text-al-gold" />
                                    Recognition
                                </h3>
                                <ul className="space-y-2">
                                    {attorney.awards.map((award, i) => (
                                        <li key={i} className="flex items-center gap-2 text-al-text-muted text-sm">
                                            <AtlasIcon name="star" className="w-4 h-4 text-al-gold" />
                                            {award}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Practice Areas */}
                <section className="py-16 bg-al-bg-warm">
                    <div className="al-container">
                        <h3 className="text-lg font-serif font-semibold mb-6 text-center">
                            Practice Areas
                        </h3>
                        <div className="flex flex-wrap justify-center gap-3">
                            {attorney.practiceAreas.map((area) => (
                                <span
                                    key={area}
                                    className="px-5 py-2 bg-white border border-al-border text-sm font-medium"
                                >
                                    {area}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Other Attorneys */}
                <section className="al-section-light">
                    <div className="al-container">
                        <h3 className="text-center al-heading-3 mb-12">Other Attorneys</h3>
                        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {ATTORNEYS.filter((a) => a.slug !== slug)
                                .slice(0, 5)
                                .map((a) => (
                                    <Link
                                        key={a.slug}
                                        href={`/demos/atlas-legal/attorneys/${a.slug}`}
                                        className="group text-center"
                                    >
                                        <div className="relative aspect-square mb-3 bg-al-bg-dark overflow-hidden">
                                            <Image
                                                src={`/images/atlas-legal/${a.slug}.png`}
                                                alt={a.name}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="text-sm font-semibold group-hover:text-al-gold transition-colors">
                                            {a.name}
                                        </div>
                                        <div className="text-xs text-al-text-muted">{a.title}</div>
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
