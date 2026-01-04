"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { use } from "react";
import VEShell from "../../_components/VEShell";
import VEButton from "../../_components/VEButton";
import VEIcon from "../../_components/VEIcon";
import VEPropertyCard from "../../_components/VEPropertyCard";
import { getAgentBySlug, AGENTS } from "../../_data/agents";
import { getPropertiesByAgent } from "../../_data/properties";

export default function AgentDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    const agent = getAgentBySlug(slug);

    if (!agent) {
        notFound();
    }

    const agentProperties = getPropertiesByAgent(agent.slug);

    return (
        <VEShell>
            {/* Hero */}
            <section className="pt-32 pb-16 bg-ve-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.55_0.03_270/0.1)_0%,_transparent_60%)]" />
                <div className="absolute inset-0 ve-noise" />

                <div className="ve-container relative z-10">
                    <nav className="flex items-center gap-2 text-sm text-white/50 mb-8">
                        <Link
                            href="/demos/velvet-estates"
                            className="hover:text-white transition-colors"
                        >
                            Home
                        </Link>
                        <VEIcon name="chevron-right" className="w-3 h-3" />
                        <Link
                            href="/demos/velvet-estates/agents"
                            className="hover:text-white transition-colors"
                        >
                            Agents
                        </Link>
                        <VEIcon name="chevron-right" className="w-3 h-3" />
                        <span className="text-white">{agent.name}</span>
                    </nav>

                    <div className="grid lg:grid-cols-3 gap-12 items-start">
                        {/* Photo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-1"
                        >
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-ve-primary-light">
                                <Image
                                    src={agent.image}
                                    alt={agent.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 33vw"
                                    priority
                                />
                            </div>
                        </motion.div>

                        {/* Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="lg:col-span-2"
                        >
                            <div className="text-sm uppercase tracking-widest text-ve-accent mb-2">
                                {agent.specialty}
                            </div>
                            <h1 className="ve-heading-1 text-white mb-2">{agent.name}</h1>
                            <p className="text-xl text-white/60 mb-8">{agent.title}</p>

                            <p className="text-white/70 leading-relaxed mb-8 max-w-2xl">
                                {agent.bio}
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 mb-8">
                                <div>
                                    <div className="text-3xl font-serif font-bold text-ve-accent">
                                        {agent.salesVolume}
                                    </div>
                                    <div className="text-sm text-white/50">Career Sales</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-serif font-bold text-ve-accent">
                                        {agent.yearsExperience}
                                    </div>
                                    <div className="text-sm text-white/50">Years Experience</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-serif font-bold text-ve-accent">
                                        {agent.languages.length}
                                    </div>
                                    <div className="text-sm text-white/50">Languages</div>
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href={`tel:${agent.phone}`}
                                    className="ve-btn ve-btn-accent"
                                >
                                    <VEIcon name="phone" className="w-4 h-4" />
                                    {agent.phone}
                                </a>
                                <a
                                    href={`mailto:${agent.email}`}
                                    className="ve-btn border border-white/30 text-white hover:border-white"
                                >
                                    <VEIcon name="email" className="w-4 h-4" />
                                    Email Me
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Details */}
            <section className="ve-section bg-ve-bg">
                <div className="ve-container">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Certifications & Languages */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-sm uppercase tracking-widest text-ve-muted mb-4">
                                    Languages
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {agent.languages.map((lang) => (
                                        <span
                                            key={lang}
                                            className="px-3 py-1.5 text-sm bg-ve-surface border border-ve-border rounded-full text-ve-text"
                                        >
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm uppercase tracking-widest text-ve-muted mb-4">
                                    Certifications
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {agent.certifications.map((cert) => (
                                        <span
                                            key={cert}
                                            className="px-3 py-1.5 text-sm bg-ve-accent-muted text-ve-accent rounded-full"
                                        >
                                            {cert}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Social Links */}
                            {(agent.socialLinks.linkedin || agent.socialLinks.instagram) && (
                                <div>
                                    <h3 className="text-sm uppercase tracking-widest text-ve-muted mb-4">
                                        Connect
                                    </h3>
                                    <div className="flex gap-3">
                                        {agent.socialLinks.linkedin && (
                                            <a
                                                href={agent.socialLinks.linkedin}
                                                className="w-10 h-10 flex items-center justify-center border border-ve-border rounded-full text-ve-muted hover:text-ve-accent hover:border-ve-accent transition-colors"
                                            >
                                                <VEIcon name="linkedin" className="w-4 h-4" />
                                            </a>
                                        )}
                                        {agent.socialLinks.instagram && (
                                            <a
                                                href={agent.socialLinks.instagram}
                                                className="w-10 h-10 flex items-center justify-center border border-ve-border rounded-full text-ve-muted hover:text-ve-accent hover:border-ve-accent transition-colors"
                                            >
                                                <VEIcon name="instagram" className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Current Listings */}
                        <div className="lg:col-span-2">
                            <h2 className="ve-heading-3 text-ve-text mb-8">
                                Current Listings
                            </h2>
                            {agentProperties.length > 0 ? (
                                <div className="grid md:grid-cols-2 gap-6">
                                    {agentProperties.map((property, i) => (
                                        <motion.div
                                            key={property.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            <VEPropertyCard property={property} />
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16 bg-ve-surface rounded-xl border border-ve-border">
                                    <VEIcon name="home" className="w-12 h-12 text-ve-muted mx-auto mb-4" />
                                    <p className="text-ve-muted">
                                        No current listings. Contact me for off-market opportunities.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Other Agents */}
            <section className="ve-section bg-ve-surface">
                <div className="ve-container">
                    <h2 className="ve-heading-3 text-ve-text mb-8 text-center">
                        Meet Other Agents
                    </h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {AGENTS.filter((a) => a.slug !== agent.slug)
                            .slice(0, 4)
                            .map((otherAgent) => (
                                <Link
                                    key={otherAgent.id}
                                    href={`/demos/velvet-estates/agents/${otherAgent.slug}`}
                                    className="text-center group"
                                >
                                    <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-ve-primary/20 group-hover:ring-2 ring-ve-accent transition-all">
                                        <Image
                                            src={otherAgent.image}
                                            alt={otherAgent.name}
                                            fill
                                            className="object-cover"
                                            sizes="80px"
                                        />
                                    </div>
                                    <div className="font-medium text-ve-text group-hover:text-ve-accent transition-colors">
                                        {otherAgent.name}
                                    </div>
                                    <div className="text-xs text-ve-muted">{otherAgent.title}</div>
                                </Link>
                            ))}
                    </div>
                </div>
            </section>
        </VEShell>
    );
}
