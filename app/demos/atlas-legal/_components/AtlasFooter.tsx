"use client";

import React from "react";
import Link from "next/link";
import AtlasIcon from "./AtlasIcon";
import { useTranslation } from "../_lib/i18n/LanguageContext";
import { PRACTICE_AREAS } from "../_data/practice-areas";

export default function AtlasFooter() {
    const { t, isRtl, language } = useTranslation();

    const practiceAreas = PRACTICE_AREAS.slice(0, 6);

    const firmLinks = [
        { label: t("footer.aboutUs"), href: "/demos/atlas-legal/about" },
        { label: t("footer.ourAttorneys"), href: "/demos/atlas-legal/attorneys" },
        { label: t("footer.caseResults"), href: "/demos/atlas-legal/results" },
        { label: t("footer.blogInsights"), href: "/demos/atlas-legal/blog" },
        { label: t("footer.careers"), href: "/demos/atlas-legal/contact" },
    ];

    const resourceLinks = [
        {
            label: t("footer.freeConsultation"),
            href: "/demos/atlas-legal/consultation",
        },
        { label: t("footer.contactUs"), href: "/demos/atlas-legal/contact" },
        { label: t("footer.faq"), href: "/demos/atlas-legal#faq" },
        { label: t("footer.privacyPolicy"), href: "/demos/atlas-legal/privacy" },
        { label: t("footer.termsOfService"), href: "/demos/atlas-legal/terms" },
    ];

    return (
        <footer
            className="bg-[oklch(0.10_0.015_260)] text-white relative"
            dir={isRtl ? "rtl" : "ltr"}
        >
            {/* Top gold accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-atlas-accent to-transparent" />

            {/* Main Footer Content */}
            <div className="al-container py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link
                            href="/demos/atlas-legal"
                            className="flex items-center gap-3 mb-6"
                            style={{ flexDirection: isRtl ? "row-reverse" : "row" }}
                        >
                            <div className="w-12 h-12 flex items-center justify-center border-2 border-atlas-accent">
                                <AtlasIcon
                                    name="scales"
                                    className="w-6 h-6 text-atlas-accent"
                                />
                            </div>
                            <div>
                                <div className="text-xl font-serif font-bold tracking-wide">
                                    {language === "ar" ? "أطلس" : "ATLAS"}
                                </div>
                                <div className="text-[0.625rem] tracking-[0.2em] text-atlas-accent uppercase">
                                    {language === "ar" ? "القانوني" : "Legal"}
                                </div>
                            </div>
                        </Link>

                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                            {t("footer.description")}
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {["linkedin", "twitter", "facebook"].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-10 h-10 flex items-center justify-center border border-white/20 hover:border-atlas-accent hover:bg-atlas-accent/10 transition-colors"
                                    aria-label={social}
                                >
                                    <AtlasIcon
                                        name={social as any}
                                        className="w-4 h-4 text-white/70"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Practice Areas */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-atlas-accent mb-6">
                            {t("footer.practiceAreas")}
                        </h4>
                        <ul className="space-y-3">
                            {practiceAreas.map((area) => (
                                <li key={area.slug}>
                                    <Link
                                        href={`/demos/atlas-legal/practice-areas/${area.slug}`}
                                        className="text-sm text-white/60 hover:text-atlas-accent transition-colors"
                                    >
                                        {language === "ar" ? area.titleAr : area.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* The Firm */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-atlas-accent mb-6">
                            {t("footer.theFirm")}
                        </h4>
                        <ul className="space-y-3">
                            {firmLinks.map((link, i) => (
                                <li key={i}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/60 hover:text-atlas-accent transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-atlas-accent mb-6">
                            {t("nav.contact")}
                        </h4>

                        <div className="space-y-4">
                            {/* Address */}
                            <div className="flex items-start gap-3">
                                <AtlasIcon
                                    name="location"
                                    className="w-4 h-4 text-atlas-accent mt-0.5 flex-shrink-0"
                                />
                                <div className="text-sm text-white/60 whitespace-pre-line">
                                    {t("contact.address")}
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center gap-3">
                                <AtlasIcon
                                    name="phone"
                                    className="w-4 h-4 text-atlas-accent flex-shrink-0"
                                />
                                <a
                                    href="tel:+12125550100"
                                    className="text-sm text-white/60 hover:text-atlas-accent transition-colors"
                                >
                                    {t("nav.phone")}
                                </a>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-3">
                                <AtlasIcon
                                    name="email"
                                    className="w-4 h-4 text-atlas-accent flex-shrink-0"
                                />
                                <a
                                    href="mailto:info@atlaslegal.com"
                                    className="text-sm text-white/60 hover:text-atlas-accent transition-colors"
                                >
                                    info@atlaslegal.com
                                </a>
                            </div>
                        </div>

                        {/* CTA */}
                        <Link
                            href="/demos/atlas-legal/consultation"
                            className="al-btn al-btn-gold mt-6 text-sm py-3 px-6"
                        >
                            {t("footer.freeConsultation")}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="al-container py-6">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                        {/* Copyright */}
                        <p className="text-xs text-white/40 text-center lg:text-left">
                            {t("footer.copyright")}
                        </p>

                        {/* Legal Links */}
                        <div className="flex flex-wrap justify-center gap-6">
                            {[
                                {
                                    label: t("footer.privacyPolicy"),
                                    href: "/demos/atlas-legal/privacy",
                                },
                                {
                                    label: t("footer.termsOfService"),
                                    href: "/demos/atlas-legal/terms",
                                },
                                {
                                    label: t("footer.disclaimer"),
                                    href: "/demos/atlas-legal/disclaimer",
                                },
                            ].map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.href}
                                    className="text-xs text-white/40 hover:text-atlas-accent transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <p className="text-[0.625rem] text-white/30 mt-6 leading-relaxed text-center max-w-4xl mx-auto">
                        {t("footer.legalDisclaimer")}
                    </p>
                </div>
            </div>
        </footer>
    );
}
