"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AtlasIcon from "./AtlasIcon";
import { useTranslation } from "../_lib/i18n/LanguageContext";
import { useTheme } from "../_lib/ThemeContext";
import { PRACTICE_AREAS } from "../_data/practice-areas";

export default function AtlasNav() {
    const { t, isRtl, language, setLanguage } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    // Navigation links with translation keys
    const NAV_LINKS = [
        { labelKey: "nav.home" as const, href: "/demos/atlas-legal" },
        {
            labelKey: "nav.practiceAreas" as const,
            href: "/demos/atlas-legal/practice-areas",
            dropdown: PRACTICE_AREAS.slice(0, 6).map((p) => ({
                label: p.title,
                labelAr: p.titleAr || p.title,
                href: `/demos/atlas-legal/practice-areas/${p.slug}`,
            })),
        },
        { labelKey: "nav.about" as const, href: "/demos/atlas-legal/about" },
        { labelKey: "nav.team" as const, href: "/demos/atlas-legal/attorneys" },
        { labelKey: "nav.contact" as const, href: "/demos/atlas-legal/contact" },
    ];

    // Check if link is active
    const isActiveLink = useCallback(
        (href: string) => {
            if (href === "/demos/atlas-legal") {
                return pathname === href;
            }
            return pathname.startsWith(href);
        },
        [pathname]
    );

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on language change
    useEffect(() => {
        setIsMobileOpen(false);
    }, [language]);

    // Close mobile menu on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsMobileOpen(false);
                setActiveDropdown(null);
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileOpen]);

    // Toggle language
    const handleToggleLanguage = () => {
        setLanguage(language === "en" ? "ar" : "en");
    };

    return (
        <>
            {/* Skip to main content link */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-atlas-accent focus:text-atlas-primary focus:font-semibold"
            >
                {t("a11y.skipToContent")}
            </a>

            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                        ? "py-3 bg-[oklch(0.10_0.015_260/0.92)] backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
                        : "py-5 bg-transparent"
                    }`}
                dir={isRtl ? "rtl" : "ltr"}
            >
                <nav className="al-container">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link
                            href="/demos/atlas-legal"
                            className="flex items-center gap-3 group relative z-10"
                        >
                            <div className="w-11 h-11 flex items-center justify-center border-2 border-atlas-accent bg-transparent group-hover:bg-atlas-accent/10 transition-all duration-300">
                                <AtlasIcon
                                    name="scales"
                                    className="w-5 h-5 text-atlas-accent"
                                />
                            </div>
                            <div className="hidden sm:block">
                                <div className="text-lg font-serif font-bold text-white tracking-wide leading-none">
                                    {language === "ar" ? "أطلس" : "ATLAS"}
                                </div>
                                <div className="text-[0.5625rem] tracking-[0.2em] text-atlas-accent uppercase mt-0.5">
                                    {language === "ar" ? "القانوني" : "Legal"}
                                </div>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {NAV_LINKS.map((link) => (
                                <div
                                    key={link.labelKey}
                                    className="relative"
                                    onMouseEnter={() =>
                                        link.dropdown && setActiveDropdown(link.labelKey)
                                    }
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <Link
                                        href={link.href}
                                        className={`relative px-4 py-2 text-sm font-medium flex items-center gap-1.5 transition-colors duration-300 ${isActiveLink(link.href)
                                                ? "text-atlas-accent"
                                                : "text-white/80 hover:text-white"
                                            }`}
                                    >
                                        {t(link.labelKey)}
                                        {link.dropdown && (
                                            <AtlasIcon
                                                name="chevron-down"
                                                className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === link.labelKey
                                                        ? "rotate-180"
                                                        : ""
                                                    }`}
                                            />
                                        )}
                                        {/* Active indicator */}
                                        {isActiveLink(link.href) && (
                                            <motion.div
                                                layoutId="activeNav"
                                                className="absolute bottom-0 left-4 right-4 h-0.5 bg-atlas-accent"
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 380,
                                                    damping: 30,
                                                }}
                                            />
                                        )}
                                    </Link>

                                    {/* Dropdown */}
                                    <AnimatePresence>
                                        {link.dropdown &&
                                            activeDropdown === link.labelKey && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className={`absolute top-full pt-3 w-72 ${isRtl ? "right-0" : "left-0"
                                                        }`}
                                                >
                                                    <div className="bg-[oklch(0.08_0.015_260/0.98)] backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40 p-2">
                                                        {link.dropdown.map((item, i) => (
                                                            <Link
                                                                key={item.href}
                                                                href={item.href}
                                                                className={`block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 ${isRtl ? "text-right" : "text-left"
                                                                    }`}
                                                            >
                                                                {language === "ar"
                                                                    ? item.labelAr
                                                                    : item.label}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        {/* Right Side - Theme, Language, Phone, CTA */}
                        <div className="hidden lg:flex items-center gap-3">
                            {/* Theme Switcher */}
                            <button
                                onClick={toggleTheme}
                                className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-atlas-accent border border-white/10 hover:border-atlas-accent/50 transition-all duration-300"
                                aria-label={t("a11y.toggleDarkMode")}
                                title={theme === "light" ? t("theme.dark") : t("theme.light")}
                            >
                                <AtlasIcon
                                    name={theme === "light" ? "moon" : "sun"}
                                    className="w-4 h-4"
                                />
                            </button>

                            {/* Language Switcher */}
                            <button
                                onClick={handleToggleLanguage}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-white/60 hover:text-atlas-accent border border-white/10 hover:border-atlas-accent/50 transition-all duration-300"
                                aria-label={t("a11y.switchLanguage")}
                            >
                                <AtlasIcon name="globe" className="w-4 h-4" />
                                <span>{language === "en" ? "العربية" : "English"}</span>
                            </button>

                            {/* Divider */}
                            <div className="h-8 w-px bg-white/20" />

                            {/* Phone */}
                            <a
                                href="tel:+12125550100"
                                className="text-sm text-white/60 hover:text-atlas-accent transition-colors flex items-center gap-2"
                            >
                                <AtlasIcon name="phone" className="w-4 h-4" />
                                <span className="hidden xl:inline">{t("nav.phone")}</span>
                            </a>

                            {/* CTA Button */}
                            <Link
                                href="/demos/atlas-legal/consultation"
                                className="al-btn al-btn-gold text-sm py-2.5 px-5"
                            >
                                {t("nav.consultation")}
                            </Link>
                        </div>

                        {/* Mobile Controls */}
                        <div className="lg:hidden flex items-center gap-2">
                            {/* Theme Switcher Mobile */}
                            <button
                                onClick={toggleTheme}
                                className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-atlas-accent transition-colors"
                                aria-label={t("a11y.toggleDarkMode")}
                            >
                                <AtlasIcon
                                    name={theme === "light" ? "moon" : "sun"}
                                    className="w-5 h-5"
                                />
                            </button>

                            {/* Language Switcher Mobile */}
                            <button
                                onClick={handleToggleLanguage}
                                className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-atlas-accent transition-colors"
                                aria-label={t("a11y.switchLanguage")}
                            >
                                <AtlasIcon name="globe" className="w-5 h-5" />
                            </button>

                            {/* Menu Toggle */}
                            <button
                                onClick={() => setIsMobileOpen(!isMobileOpen)}
                                className="w-10 h-10 flex items-center justify-center text-white hover:text-atlas-accent transition-colors"
                                aria-label={
                                    isMobileOpen ? t("a11y.closeMenu") : t("a11y.openMenu")
                                }
                                aria-expanded={isMobileOpen}
                            >
                                <AtlasIcon
                                    name={isMobileOpen ? "close" : "menu"}
                                    className="w-6 h-6"
                                />
                            </button>
                        </div>
                    </div>
                </nav>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                            onClick={() => setIsMobileOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: isRtl ? "-100%" : "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: isRtl ? "-100%" : "100%" }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className={`fixed inset-y-0 ${isRtl ? "left-0" : "right-0"
                                } z-50 w-full max-w-sm bg-[oklch(0.08_0.015_260)] lg:hidden overflow-y-auto`}
                            dir={isRtl ? "rtl" : "ltr"}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Mobile navigation"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsMobileOpen(false)}
                                className={`absolute top-6 ${isRtl ? "left-6" : "right-6"
                                    } p-2 text-white/60 hover:text-white transition-colors z-50`}
                                aria-label={t("a11y.closeMenu")}
                            >
                                <AtlasIcon name="close" className="w-7 h-7" />
                            </button>

                            <div className="pt-20 px-6 pb-8">
                                {/* Logo in Mobile */}
                                <div className="mb-8 pb-6 border-b border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 flex items-center justify-center border-2 border-atlas-accent">
                                            <AtlasIcon
                                                name="scales"
                                                className="w-6 h-6 text-atlas-accent"
                                            />
                                        </div>
                                        <div>
                                            <div className="text-xl font-serif font-bold text-white">
                                                {language === "ar" ? "أطلس" : "ATLAS"}
                                            </div>
                                            <div className="text-xs tracking-[0.2em] text-atlas-accent uppercase">
                                                {language === "ar" ? "القانوني" : "Legal"}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Navigation Links */}
                                <nav aria-label="Mobile navigation">
                                    <ul className="space-y-1">
                                        {NAV_LINKS.map((link, i) => (
                                            <motion.li
                                                key={link.labelKey}
                                                initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    onClick={() => setIsMobileOpen(false)}
                                                    className={`block py-4 text-xl font-serif border-b border-white/10 transition-colors ${isActiveLink(link.href)
                                                            ? "text-atlas-accent"
                                                            : "text-white/90 hover:text-atlas-accent"
                                                        }`}
                                                >
                                                    {t(link.labelKey)}
                                                </Link>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </nav>

                                {/* Contact and CTA */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="mt-8 space-y-4"
                                >
                                    <a
                                        href="tel:+12125550100"
                                        className="flex items-center gap-3 text-atlas-accent text-lg hover:opacity-80 transition-opacity"
                                    >
                                        <AtlasIcon name="phone" className="w-5 h-5" />
                                        <span>{t("nav.phone")}</span>
                                    </a>
                                    <Link
                                        href="/demos/atlas-legal/consultation"
                                        onClick={() => setIsMobileOpen(false)}
                                        className="al-btn al-btn-gold w-full justify-center text-base"
                                    >
                                        {t("nav.consultation")}
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
