"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import VEIcon from "./VEIcon";
import VEButton from "./VEButton";
import VEThemeToggle from "./VEThemeToggle";

const NAV_LINKS = [
    { label: "Properties", href: "/demos/velvet-estates/properties" },
    { label: "Neighborhoods", href: "/demos/velvet-estates/neighborhoods" },
    { label: "Agents", href: "/demos/velvet-estates/agents" },
    { label: "Insights", href: "/demos/velvet-estates/insights" },
    { label: "About", href: "/demos/velvet-estates/about" },
];

export default function VENav() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Check if link is active
    const isActiveLink = useCallback(
        (href: string) => {
            if (href === "/demos/velvet-estates") {
                return pathname === href;
            }
            return pathname.startsWith(href);
        },
        [pathname]
    );

    // Handle scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsMobileOpen(false);
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

    return (
        <>
            {/* Skip to main content */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:px-4 focus:py-2 focus:bg-ve-accent focus:text-white focus:font-semibold focus:rounded-lg"
            >
                Skip to main content
            </a>

            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                        ? "py-3 ve-glass shadow-ve-md"
                        : "py-5 bg-transparent"
                    }`}
            >
                <nav className="ve-container">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link
                            href="/demos/velvet-estates"
                            className="flex items-center gap-3 group relative z-10"
                        >
                            <div className="w-10 h-10 flex items-center justify-center border border-ve-accent bg-transparent group-hover:bg-ve-accent/10 transition-colors rounded-lg">
                                <VEIcon
                                    name="key"
                                    className="w-5 h-5 text-ve-accent"
                                />
                            </div>
                            <div>
                                <div className="text-lg font-serif font-bold text-ve-text tracking-wide leading-none">
                                    VELVET
                                </div>
                                <div className="text-[0.5625rem] tracking-[0.2em] text-ve-accent uppercase">
                                    Estates
                                </div>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative px-4 py-2 text-sm font-medium transition-colors ${isActiveLink(link.href)
                                            ? "text-ve-accent"
                                            : "text-ve-muted hover:text-ve-text"
                                        }`}
                                >
                                    {link.label}
                                    {isActiveLink(link.href) && (
                                        <motion.div
                                            layoutId="activeNavIndicator"
                                            className="absolute bottom-0 left-4 right-4 h-0.5 bg-ve-accent"
                                            transition={{
                                                type: "spring",
                                                stiffness: 380,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Right Side */}
                        <div className="hidden lg:flex items-center gap-3">
                            <VEThemeToggle />

                            <a
                                href="tel:+12125550100"
                                className="text-sm text-ve-muted hover:text-ve-accent transition-colors flex items-center gap-2"
                            >
                                <VEIcon name="phone" className="w-4 h-4" />
                                <span className="hidden xl:inline">(212) 555-0100</span>
                            </a>

                            <div className="h-6 w-px bg-ve-border mx-2" />

                            <Link href="/demos/velvet-estates/contact">
                                <VEButton variant="primary" size="sm">
                                    Schedule Viewing
                                </VEButton>
                            </Link>
                        </div>

                        {/* Mobile Controls */}
                        <div className="lg:hidden flex items-center gap-2">
                            <VEThemeToggle />

                            <button
                                onClick={() => setIsMobileOpen(!isMobileOpen)}
                                className="w-10 h-10 flex items-center justify-center text-ve-text hover:text-ve-accent transition-colors"
                                aria-label={isMobileOpen ? "Close menu" : "Open menu"}
                                aria-expanded={isMobileOpen}
                            >
                                <VEIcon
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
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-ve-surface-elevated lg:hidden overflow-y-auto"
                            role="dialog"
                            aria-modal="true"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsMobileOpen(false)}
                                className="absolute top-6 right-6 p-2 text-ve-muted hover:text-ve-text transition-colors z-50"
                                aria-label="Close menu"
                            >
                                <VEIcon name="close" className="w-7 h-7" />
                            </button>

                            <div className="pt-20 px-6 pb-8">
                                {/* Logo */}
                                <div className="mb-8 pb-6 border-b border-ve-border">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 flex items-center justify-center border border-ve-accent rounded-lg">
                                            <VEIcon
                                                name="key"
                                                className="w-6 h-6 text-ve-accent"
                                            />
                                        </div>
                                        <div>
                                            <div className="text-xl font-serif font-bold text-ve-text">
                                                VELVET
                                            </div>
                                            <div className="text-xs tracking-[0.2em] text-ve-accent uppercase">
                                                Estates
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Navigation Links */}
                                <nav aria-label="Mobile navigation">
                                    <ul className="space-y-1">
                                        <motion.li
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0 }}
                                        >
                                            <Link
                                                href="/demos/velvet-estates"
                                                onClick={() => setIsMobileOpen(false)}
                                                className={`block py-4 text-xl font-serif border-b border-ve-border transition-colors ${pathname === "/demos/velvet-estates"
                                                        ? "text-ve-accent"
                                                        : "text-ve-text hover:text-ve-accent"
                                                    }`}
                                            >
                                                Home
                                            </Link>
                                        </motion.li>
                                        {NAV_LINKS.map((link, i) => (
                                            <motion.li
                                                key={link.href}
                                                initial={{ opacity: 0, x: 30 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: (i + 1) * 0.05 }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    onClick={() => setIsMobileOpen(false)}
                                                    className={`block py-4 text-xl font-serif border-b border-ve-border transition-colors ${isActiveLink(link.href)
                                                            ? "text-ve-accent"
                                                            : "text-ve-text hover:text-ve-accent"
                                                        }`}
                                                >
                                                    {link.label}
                                                </Link>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </nav>

                                {/* CTA */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="mt-8 space-y-4"
                                >
                                    <a
                                        href="tel:+12125550100"
                                        className="flex items-center gap-3 text-ve-accent text-lg hover:opacity-80 transition-opacity"
                                    >
                                        <VEIcon name="phone" className="w-5 h-5" />
                                        <span>(212) 555-0100</span>
                                    </a>
                                    <Link
                                        href="/demos/velvet-estates/contact"
                                        onClick={() => setIsMobileOpen(false)}
                                        className="ve-btn ve-btn-primary w-full justify-center"
                                    >
                                        Schedule Viewing
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
