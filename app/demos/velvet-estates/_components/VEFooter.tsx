"use client";

import React from "react";
import Link from "next/link";
import VEIcon from "./VEIcon";

const FOOTER_LINKS = {
    properties: [
        { label: "Featured Listings", href: "/demos/velvet-estates/properties" },
        { label: "New Developments", href: "/demos/velvet-estates/properties?type=new" },
        { label: "Penthouses", href: "/demos/velvet-estates/properties?type=penthouse" },
        { label: "Townhouses", href: "/demos/velvet-estates/properties?type=townhouse" },
    ],
    neighborhoods: [
        { label: "Central Park", href: "/demos/velvet-estates/neighborhoods/central-park" },
        { label: "Upper East Side", href: "/demos/velvet-estates/neighborhoods/upper-east-side" },
        { label: "TriBeCa", href: "/demos/velvet-estates/neighborhoods/tribeca" },
        { label: "West Village", href: "/demos/velvet-estates/neighborhoods/west-village" },
    ],
    company: [
        { label: "About Us", href: "/demos/velvet-estates/about" },
        { label: "Our Agents", href: "/demos/velvet-estates/agents" },
        { label: "Insights", href: "/demos/velvet-estates/insights" },
        { label: "Investors", href: "/demos/velvet-estates/investors" },
    ],
    contact: [
        { label: "Contact", href: "/demos/velvet-estates/contact" },
        { label: "Schedule Viewing", href: "/demos/velvet-estates/contact" },
    ],
};

export default function VEFooter() {
    return (
        <footer className="bg-ve-primary text-white">
            {/* Main Footer */}
            <div className="ve-container py-20">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link
                            href="/demos/velvet-estates"
                            className="inline-flex items-center gap-3 mb-6"
                        >
                            <div className="w-12 h-12 flex items-center justify-center border border-ve-accent rounded-lg">
                                <VEIcon
                                    name="key"
                                    className="w-6 h-6 text-ve-accent"
                                />
                            </div>
                            <div>
                                <div className="text-xl font-serif font-bold tracking-wide leading-none">
                                    VELVET
                                </div>
                                <div className="text-[0.625rem] tracking-[0.2em] text-ve-accent uppercase">
                                    Estates
                                </div>
                            </div>
                        </Link>
                        <p className="text-white/60 max-w-sm mb-6 leading-relaxed">
                            Manhattan's premier luxury real estate brokerage. We connect
                            discerning buyers with the city's most exceptional properties.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 text-sm">
                            <a
                                href="tel:+12125550100"
                                className="flex items-center gap-3 text-white/60 hover:text-ve-accent transition-colors"
                            >
                                <VEIcon name="phone" className="w-4 h-4" />
                                (212) 555-0100
                            </a>
                            <a
                                href="mailto:inquiries@velvetestates.com"
                                className="flex items-center gap-3 text-white/60 hover:text-ve-accent transition-colors"
                            >
                                <VEIcon name="email" className="w-4 h-4" />
                                inquiries@velvetestates.com
                            </a>
                            <div className="flex items-center gap-3 text-white/60">
                                <VEIcon name="location" className="w-4 h-4 flex-shrink-0" />
                                <span>432 Park Avenue, Suite 1500<br />New York, NY 10022</span>
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                            Properties
                        </h3>
                        <ul className="space-y-3">
                            {FOOTER_LINKS.properties.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/60 hover:text-ve-accent transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                            Neighborhoods
                        </h3>
                        <ul className="space-y-3">
                            {FOOTER_LINKS.neighborhoods.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/60 hover:text-ve-accent transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            {FOOTER_LINKS.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/60 hover:text-ve-accent transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Social Links */}
                        <div className="flex gap-3 mt-6">
                            <a
                                href="#"
                                className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full text-white/60 hover:text-ve-accent hover:border-ve-accent transition-colors"
                                aria-label="LinkedIn"
                            >
                                <VEIcon name="linkedin" className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full text-white/60 hover:text-ve-accent hover:border-ve-accent transition-colors"
                                aria-label="Instagram"
                            >
                                <VEIcon name="instagram" className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full text-white/60 hover:text-ve-accent hover:border-ve-accent transition-colors"
                                aria-label="Twitter"
                            >
                                <VEIcon name="twitter" className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="ve-container py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
                        <p>
                            © {new Date().getFullYear()} Velvet Estates. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <Link href="#" className="hover:text-white/60 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="#" className="hover:text-white/60 transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="#" className="hover:text-white/60 transition-colors">
                                Fair Housing
                            </Link>
                        </div>
                        <p>
                            A demo by{" "}
                            <Link
                                href="/"
                                className="text-ve-accent hover:underline"
                            >
                                OMREX.STUDIO
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
