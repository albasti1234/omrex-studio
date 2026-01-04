"use client";

import React from "react";
import { motion } from "framer-motion";
import VEShell from "../_components/VEShell";
import VEInput from "../_components/VEInput";
import VESelect from "../_components/VESelect";
import VEButton from "../_components/VEButton";
import VEIcon from "../_components/VEIcon";

export default function ContactPage() {
    return (
        <VEShell>
            {/* Hero */}
            <section className="pt-32 pb-16 bg-ve-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.55_0.03_270/0.1)_0%,_transparent_60%)]" />
                <div className="absolute inset-0 ve-noise" />

                <div className="ve-container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <div className="ve-kicker text-white/60">Get in Touch</div>
                        <h1 className="ve-heading-1 text-white mb-4">
                            Let's Start a Conversation
                        </h1>
                        <p className="ve-lead text-white/60">
                            Whether you're ready to begin your search or simply exploring
                            possibilities, we're here to help you navigate Manhattan's
                            luxury real estate market.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="ve-section bg-ve-bg">
                <div className="ve-container">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="ve-heading-3 text-ve-text mb-8">
                                Schedule a Consultation
                            </h2>
                            <form className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <VEInput
                                        label="First Name"
                                        placeholder="John"
                                        required
                                    />
                                    <VEInput
                                        label="Last Name"
                                        placeholder="Smith"
                                        required
                                    />
                                </div>
                                <VEInput
                                    label="Email Address"
                                    type="email"
                                    placeholder="john@example.com"
                                    required
                                />
                                <VEInput
                                    label="Phone Number"
                                    type="tel"
                                    placeholder="(212) 555-0100"
                                />
                                <VESelect
                                    label="I'm Interested In"
                                    options={[
                                        { value: "", label: "Select an option" },
                                        { value: "buying", label: "Buying a Property" },
                                        { value: "selling", label: "Selling a Property" },
                                        { value: "investing", label: "Investment Opportunities" },
                                        { value: "other", label: "Other" },
                                    ]}
                                />
                                <VESelect
                                    label="Budget Range"
                                    options={[
                                        { value: "", label: "Select a range" },
                                        { value: "5-10", label: "$5M - $10M" },
                                        { value: "10-20", label: "$10M - $20M" },
                                        { value: "20-50", label: "$20M - $50M" },
                                        { value: "50+", label: "$50M+" },
                                    ]}
                                />
                                <div>
                                    <label className="block text-sm font-medium text-ve-text mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        className="ve-textarea"
                                        placeholder="Tell us about your real estate goals..."
                                        rows={4}
                                    />
                                </div>
                                <VEButton variant="primary" className="w-full">
                                    Submit Request
                                </VEButton>
                                <p className="text-xs text-ve-muted text-center">
                                    By submitting this form, you agree to our privacy policy.
                                    We will never share your information.
                                </p>
                            </form>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="ve-heading-3 text-ve-text mb-8">
                                    Contact Information
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 flex items-center justify-center bg-ve-accent-muted rounded-lg flex-shrink-0">
                                            <VEIcon name="location" className="w-5 h-5 text-ve-accent" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-ve-text">Office</h3>
                                            <p className="text-ve-muted">
                                                432 Park Avenue, Suite 1500<br />
                                                New York, NY 10022
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 flex items-center justify-center bg-ve-accent-muted rounded-lg flex-shrink-0">
                                            <VEIcon name="phone" className="w-5 h-5 text-ve-accent" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-ve-text">Phone</h3>
                                            <a
                                                href="tel:+12125550100"
                                                className="text-ve-muted hover:text-ve-accent transition-colors"
                                            >
                                                (212) 555-0100
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 flex items-center justify-center bg-ve-accent-muted rounded-lg flex-shrink-0">
                                            <VEIcon name="email" className="w-5 h-5 text-ve-accent" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-ve-text">Email</h3>
                                            <a
                                                href="mailto:inquiries@velvetestates.com"
                                                className="text-ve-muted hover:text-ve-accent transition-colors"
                                            >
                                                inquiries@velvetestates.com
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 flex items-center justify-center bg-ve-accent-muted rounded-lg flex-shrink-0">
                                            <VEIcon name="clock" className="w-5 h-5 text-ve-accent" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-ve-text">Hours</h3>
                                            <p className="text-ve-muted">
                                                Monday - Friday: 9am - 6pm<br />
                                                Saturday: By appointment<br />
                                                Sunday: Closed
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="aspect-video bg-ve-surface rounded-2xl border border-ve-border flex items-center justify-center">
                                <div className="text-center p-8">
                                    <VEIcon name="map" className="w-12 h-12 text-ve-muted mx-auto mb-4" />
                                    <p className="text-ve-muted">
                                        432 Park Avenue, New York
                                    </p>
                                </div>
                            </div>

                            {/* Social */}
                            <div>
                                <h3 className="font-semibold text-ve-text mb-4">Follow Us</h3>
                                <div className="flex gap-3">
                                    <a
                                        href="#"
                                        className="w-10 h-10 flex items-center justify-center border border-ve-border rounded-full text-ve-muted hover:text-ve-accent hover:border-ve-accent transition-colors"
                                    >
                                        <VEIcon name="linkedin" className="w-4 h-4" />
                                    </a>
                                    <a
                                        href="#"
                                        className="w-10 h-10 flex items-center justify-center border border-ve-border rounded-full text-ve-muted hover:text-ve-accent hover:border-ve-accent transition-colors"
                                    >
                                        <VEIcon name="instagram" className="w-4 h-4" />
                                    </a>
                                    <a
                                        href="#"
                                        className="w-10 h-10 flex items-center justify-center border border-ve-border rounded-full text-ve-muted hover:text-ve-accent hover:border-ve-accent transition-colors"
                                    >
                                        <VEIcon name="twitter" className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </VEShell>
    );
}
