"use client";

import { motion } from "framer-motion";
import { CATEGORY_COLORS } from "../_lib/theme";

export function DNABarWithLabel({ name, percentage, category }: { name: string; percentage: number; category: "top" | "heart" | "base" }) {
    const color = CATEGORY_COLORS[category];

    return (
        <div className="flex items-center gap-2">
            <span className="w-16 text-[0.55rem] uppercase tracking-wide truncate" style={{ color: color.main }}>
                {name}
            </span>
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: color.light }}>
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${color.main}, ${color.main}80)` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                />
            </div>
            <span className="text-[0.5rem] w-6 text-right" style={{ color: color.main }}>{percentage}%</span>
        </div>
    );
}
