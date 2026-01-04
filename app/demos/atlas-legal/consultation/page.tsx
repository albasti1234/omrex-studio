"use client";

import React from "react";
import { motion } from "framer-motion";
import AtlasNav from "../_components/AtlasNav";
import AtlasFooter from "../_components/AtlasFooter";
import AtlasIcon from "../_components/AtlasIcon";
import AtlasBookingForm from "../_components/AtlasBookingForm";
import AtlasLiveChat from "../_components/AtlasLiveChat";

const BENEFITS = [
    "Free, no-obligation case evaluation",
    "Speak directly with an experienced attorney",
    "Confidential and privileged consultation",
    "Clear explanation of your legal options",
    "No fees unless we win (for personal injury)",
];

export default function ConsultationPage() {
    return (
        <>
            <AtlasNav />

            <main>
                {/* Hero */}
                <section className="pt-32 pb-16 bg-al-bg-dark relative overflow-hidden">
                    <div className="absolute inset-0 al-pattern-lines opacity-20" />
                    <div className="al-container relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center max-w-3xl mx-auto"
                        >
                            <div className="inline-flex items-center gap-4 mb-6">
                                <div className="h-px w-12 bg-al-gold" />
                                <span className="al-kicker mb-0">Free Consultation</span>
                                <div className="h-px w-12 bg-al-gold" />
                            </div>
                            <h1 className="al-heading-1 text-white mb-6">
                                Schedule Your
                                <br />
                                <span className="text-al-gold italic">Free Consultation</span>
                            </h1>
                            <p className="al-lead-light">
                                Take the first step toward resolving your legal matter. Our
                                experienced attorneys are ready to evaluate your case and explain
                                your options.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Benefits Bar */}
                <section className="py-6 bg-al-gold/10 border-y border-al-gold/20">
                    <div className="al-container">
                        <div className="flex flex-wrap justify-center gap-6">
                            {BENEFITS.map((benefit, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <AtlasIcon name="check" className="w-4 h-4 text-al-gold" />
                                    <span className="text-al-text-main">{benefit}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Booking Form */}
                <section className="al-section-light">
                    <div className="al-container">
                        <AtlasBookingForm />
                    </div>
                </section>

                {/* Trust Section */}
                <section className="py-16 bg-al-bg-warm">
                    <div className="al-container text-center">
                        <h3 className="text-lg font-serif font-semibold mb-8">
                            Trusted by Clients Nationwide
                        </h3>
                        <div className="flex flex-wrap justify-center gap-12 text-al-text-muted">
                            {[
                                "Super Lawyers",
                                "Best Lawyers in America",
                                "Chambers USA",
                                "Martindale-Hubbell AV",
                            ].map((brand, i) => (
                                <span
                                    key={i}
                                    className="text-sm font-serif italic opacity-60 hover:opacity-100 transition-opacity"
                                >
                                    {brand}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Alternative */}
                <section className="py-16 bg-al-bg-dark">
                    <div className="al-container text-center">
                        <h3 className="text-xl font-serif text-white mb-4">
                            Prefer to Speak With Us Directly?
                        </h3>
                        <p className="text-white/60 mb-6">
                            Call our office for immediate assistance.
                        </p>
                        <a
                            href="tel:+12125550100"
                            className="inline-flex items-center gap-3 text-2xl font-serif font-bold text-al-gold hover:text-al-gold-light transition-colors"
                        >
                            <AtlasIcon name="phone" className="w-6 h-6" />
                            (212) 555-0100
                        </a>
                    </div>
                </section>
            </main>

            <AtlasFooter />
            <AtlasLiveChat />
        </>
    );
}
