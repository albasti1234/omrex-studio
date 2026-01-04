'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { DEMO_WEBSITES, type DemoWebsite } from '@/data/demos';

// ============================================================================
// ALL PROJECTS PAGE - CINEMATIC
// ============================================================================

export default function AllProjectsPage() {
    const [activeCategory, setActiveCategory] = useState<string>('All');

    // Get unique categories
    const categories = useMemo(() => {
        const cats = ['All', ...new Set(DEMO_WEBSITES.map(d => d.category))];
        return cats;
    }, []);

    // Filter demos by category
    const filteredDemos = useMemo(() => {
        if (activeCategory === 'All') return DEMO_WEBSITES;
        return DEMO_WEBSITES.filter(d => d.category === activeCategory);
    }, [activeCategory]);

    return (
        <main className="min-h-screen bg-[#050507] text-white">
            {/* Hero Header */}
            <section className="relative pt-32 pb-16 px-6">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.1),transparent_50%)]" />

                <div className="max-w-6xl mx-auto text-center relative z-10">
                    {/* Decorative Line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        className="w-20 h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent mx-auto mb-8"
                    />

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
                        style={{ textShadow: '0 0 60px rgba(139,92,246,0.3)' }}
                    >
                        All Projects
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-lg max-w-xl mx-auto mb-12"
                    >
                        Explore our collection of cinematic web experiences
                    </motion.p>

                    {/* Category Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-3"
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                                        ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="px-6 pb-32">
                <div className="max-w-7xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredDemos.map((demo, index) => (
                                <ProjectCard key={demo.id} demo={demo} index={index} />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Empty State */}
                    {filteredDemos.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <p className="text-gray-500">No projects found in this category</p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Back to Home */}
            <section className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                <Link href="/">
                    <motion.button
                        className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-medium border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </motion.button>
                </Link>
            </section>
        </main>
    );
}

// ============================================================================
// PROJECT CARD
// ============================================================================

function ProjectCard({ demo, index }: { demo: DemoWebsite; index: number }) {
    const isLive = demo.status === 'live';

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <Link href={demo.route}>
                <motion.article
                    className="group relative bg-[#0a0a0c] rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500"
                    whileHover={{ y: -5 }}
                >
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                            src={demo.thumbnail}
                            alt={demo.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent" />

                        {/* Status Badge */}
                        <div className="absolute top-4 right-4">
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${isLive
                                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                    }`}
                            >
                                {isLive ? 'Live' : 'Coming Soon'}
                            </span>
                        </div>

                        {/* Color Accent */}
                        <div
                            className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ backgroundColor: demo.color.primary }}
                        />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {/* Category */}
                        <span
                            className="text-xs font-medium tracking-wider uppercase mb-2 block"
                            style={{ color: demo.color.primary }}
                        >
                            {demo.category}
                        </span>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-white/90 transition-colors">
                            {demo.title}
                        </h3>

                        {/* Subtitle */}
                        <p className="text-sm text-gray-500 mb-4">
                            {demo.subtitle}
                        </p>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2">
                            {demo.features.slice(0, 3).map((feature) => (
                                <span
                                    key={feature}
                                    className="px-2.5 py-1 bg-white/5 rounded-full text-xs text-gray-400"
                                >
                                    {feature}
                                </span>
                            ))}
                            {demo.features.length > 3 && (
                                <span className="px-2.5 py-1 bg-white/5 rounded-full text-xs text-gray-500">
                                    +{demo.features.length - 3}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Hover Arrow */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: demo.color.primary + '20' }}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                style={{ color: demo.color.primary }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </div>
                </motion.article>
            </Link>
        </motion.div>
    );
}
