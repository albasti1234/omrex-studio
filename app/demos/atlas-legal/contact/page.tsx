"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AtlasNav from "../_components/AtlasNav";
import AtlasFooter from "../_components/AtlasFooter";
import AtlasIcon from "../_components/AtlasIcon";
import AtlasSectionHeader from "../_components/AtlasSectionHeader";
import { useTranslation } from "../_lib/i18n/LanguageContext";
import { PRACTICE_AREAS } from "../_data/practice-areas";

export default function ContactPage() {
    const { t, isRtl, language } = useTranslation();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        caseType: "",
        message: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        setIsSubmitted(true);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <AtlasNav />

            <main className="pt-24">
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
                                {t("contact.kicker")}
                            </span>
                            <h1 className="al-heading-1 text-white mb-6">
                                {t("contact.title")}
                            </h1>
                            <p className="text-lg text-white/60 max-w-2xl mx-auto">
                                {t("contact.subtitle")}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Contact Content */}
                <section className="al-section-light">
                    <div className="al-container">
                        <div className="grid lg:grid-cols-2 gap-16">
                            {/* Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                <div className="bg-atlas-surface-elevated border border-atlas-border p-8 lg:p-10">
                                    <h2 className="al-heading-3 mb-6">
                                        {language === "ar"
                                            ? "أرسل لنا رسالة"
                                            : "Send Us a Message"}
                                    </h2>

                                    {isSubmitted ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-12"
                                        >
                                            <div className="w-16 h-16 mx-auto mb-6 bg-atlas-accent/10 flex items-center justify-center">
                                                <AtlasIcon
                                                    name="check"
                                                    className="w-8 h-8 text-atlas-accent"
                                                />
                                            </div>
                                            <h3 className="text-xl font-serif font-semibold mb-2">
                                                {language === "ar"
                                                    ? "شكراً لتواصلك"
                                                    : "Thank You"}
                                            </h3>
                                            <p className="text-atlas-muted">
                                                {t("contact.formSuccess")}
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            {/* Name */}
                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    {t("contact.formName")} *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="al-input"
                                                    placeholder={
                                                        language === "ar"
                                                            ? "أدخل اسمك الكامل"
                                                            : "Enter your full name"
                                                    }
                                                />
                                            </div>

                                            {/* Email & Phone */}
                                            <div className="grid sm:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">
                                                        {t("contact.formEmail")} *
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className="al-input"
                                                        placeholder="email@example.com"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">
                                                        {t("contact.formPhone")}
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        className="al-input"
                                                        placeholder="+1 (555) 000-0000"
                                                    />
                                                </div>
                                            </div>

                                            {/* Case Type */}
                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    {t("calc.caseType")}
                                                </label>
                                                <select
                                                    name="caseType"
                                                    value={formData.caseType}
                                                    onChange={handleChange}
                                                    className="al-select"
                                                >
                                                    <option value="">
                                                        {language === "ar"
                                                            ? "اختر نوع القضية"
                                                            : "Select case type"}
                                                    </option>
                                                    {PRACTICE_AREAS.map((area) => (
                                                        <option key={area.slug} value={area.slug}>
                                                            {language === "ar"
                                                                ? area.titleAr
                                                                : area.title}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Message */}
                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    {t("contact.formMessage")} *
                                                </label>
                                                <textarea
                                                    name="message"
                                                    required
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    className="al-textarea"
                                                    rows={5}
                                                    placeholder={
                                                        language === "ar"
                                                            ? "صف حالتك أو سؤالك..."
                                                            : "Describe your situation or question..."
                                                    }
                                                />
                                            </div>

                                            {/* Submit */}
                                            <button
                                                type="submit"
                                                className="al-btn al-btn-gold w-full"
                                            >
                                                {t("contact.formSubmit")}
                                                <AtlasIcon
                                                    name="arrow-right"
                                                    className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`}
                                                />
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </motion.div>

                            {/* Contact Info */}
                            <motion.div
                                initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="space-y-8"
                            >
                                {/* Office Info */}
                                <div className="bg-atlas-surface-elevated border border-atlas-border p-8">
                                    <h3 className="text-xl font-serif font-semibold mb-6">
                                        {t("contact.office")}
                                    </h3>

                                    <div className="space-y-6">
                                        {/* Address */}
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-atlas-accent">
                                                <AtlasIcon
                                                    name="location"
                                                    className="w-5 h-5 text-atlas-accent"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-semibold mb-1">
                                                    {language === "ar" ? "العنوان" : "Address"}
                                                </div>
                                                <div className="text-atlas-muted text-sm whitespace-pre-line">
                                                    {t("contact.address")}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hours */}
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-atlas-accent">
                                                <AtlasIcon
                                                    name="clock"
                                                    className="w-5 h-5 text-atlas-accent"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-semibold mb-1">
                                                    {t("contact.hours")}
                                                </div>
                                                <div className="text-atlas-muted text-sm whitespace-pre-line">
                                                    {t("contact.hoursValue")}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-atlas-accent">
                                                <AtlasIcon
                                                    name="phone"
                                                    className="w-5 h-5 text-atlas-accent"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-semibold mb-1">
                                                    {language === "ar" ? "الهاتف" : "Phone"}
                                                </div>
                                                <div className="text-atlas-muted text-sm">
                                                    <a
                                                        href="tel:+12125550100"
                                                        className="hover:text-atlas-accent transition-colors"
                                                    >
                                                        {t("nav.phone")}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-atlas-accent">
                                                <AtlasIcon
                                                    name="email"
                                                    className="w-5 h-5 text-atlas-accent"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-semibold mb-1">
                                                    {language === "ar"
                                                        ? "البريد الإلكتروني"
                                                        : "Email"}
                                                </div>
                                                <div className="text-atlas-muted text-sm">
                                                    <a
                                                        href="mailto:info@atlaslegal.com"
                                                        className="hover:text-atlas-accent transition-colors"
                                                    >
                                                        info@atlaslegal.com
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Map Placeholder */}
                                <div className="h-[300px] bg-[oklch(0.10_0.015_260)] flex items-center justify-center">
                                    <div className="text-center text-white/30">
                                        <AtlasIcon
                                            name="location"
                                            className="w-12 h-12 mx-auto mb-4"
                                        />
                                        <span className="uppercase tracking-widest text-xs">
                                            {language === "ar"
                                                ? "خريطة موقع المكتب"
                                                : "Office Location Map"}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>

            <AtlasFooter />
        </>
    );
}
