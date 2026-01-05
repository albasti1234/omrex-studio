"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useCompare } from "../_lib/contexts";
import { FRAGRANCES } from "../_data/fragrances";
import { THEME as DEFAULT_THEME } from "../_lib/theme";
import type { Fragrance } from "../_data/fragrances";

type Theme = typeof DEFAULT_THEME;

export function ComparePanel({ theme = DEFAULT_THEME }: { theme?: Theme }) {
    const { compareList, clearCompare, toggleCompare } = useCompare();
    const fragrances = compareList.map(id => FRAGRANCES.find(f => f.id === id)).filter(Boolean) as Fragrance[];

    if (fragrances.length === 0) return null;

    return (
        <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 p-4"
            style={{ background: theme.colors.bg.secondary, borderTop: `1px solid ${theme.colors.border.default}` }}
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
        >
            <div className="mx-auto max-w-7xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <span className="text-sm" style={{ color: theme.colors.text.muted }}>Compare ({fragrances.length}/3):</span>
                    <div className="flex gap-3">
                        {fragrances.map(f => (
                            <div key={f.id} className="flex items-center gap-2 px-3 py-2" style={{ background: theme.colors.bg.tertiary }}>
                                <span className="text-sm">{f.name}</span>
                                <button onClick={() => toggleCompare(f.id)} className="text-red-400 hover:text-red-300">×</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex gap-3">
                    <button onClick={clearCompare} className="px-4 py-2 text-xs uppercase tracking-wider" style={{ color: theme.colors.text.muted }}>
                        Clear
                    </button>
                    <Link
                        href={`/demos/velvet-perfumes/compare?ids=${compareList.join(",")}`}
                        className="px-6 py-2 text-xs uppercase tracking-wider"
                        style={{ background: theme.colors.accent.gold, color: theme.colors.bg.primary }}
                    >
                        Compare Now
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
